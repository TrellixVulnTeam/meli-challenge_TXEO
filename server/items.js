const express = require("express");
const router = express.Router();
const axios = require("axios");

const url = "https://api.mercadolibre.com";

router.get("/", function (req, res) {
	const { search } = req.query;

	axios
		.get(`${url}/sites/MLA/search?q=${search}`)
		.then((response) => {
			const { results, filters } = response.data;

			if (results && results.length !== 0) {
				let items = [];
				let categories = [];
				for (let i = 0; i < 4; i++) {
					if (results[i]) {
						const {
							id,
							title,
							thumbnail,
							condition,
							shipping,
							currency_id,
							price,
							address,
						} = results[i];
						let priceObj = {
							currency: currency_id,
							amount: Number(price.toString().split(".")[0]),
							decimals: Number(price.toString().split(".")[1]),
						};
						let item = {
							id,
							title,
							price: priceObj,
							picture: thumbnail,
							condition,
							free_shipping: shipping.free_shipping,
							state: address.state_name,
						};
						items.push(item);
					}
				}

				if (filters) {
					filters.forEach((el) => {
						if (el.id === "category") {
							if (el.values[0]) {
								categories = el.values[0].path_from_root.map((cat) => cat.name);
							}
						}
					});
				}

				res.send({ status: 200, categories, items });
			} else {
				res.send({ status: 200, categories: [], items: [] });
			}
		})
		.catch((error) => {
			//console.log(error);
			res.send({
				status: error.response.status,
				error: error.message,
			});
		});
});

router.get("/:id", function (req, res) {
	let { id } = req.params;

	axios
		.get(`${url}/items/${id}`)
		.then((res1) => {
			return axios.all([
				res1,
				axios
					.get(`${url}/items/${id}/description`)
					.then((res2) => {
						return res2;
					})
					.catch((error) => {
						return error;
					}),
				axios
					.get(`${url}/users/${res1.data.seller_id}`)
					.then((res3) => {
						return res3;
					})
					.catch((error) => {
						return error;
					}),
				axios
					.get(`${url}/categories/${res1.data.category_id}`)
					.then((res4) => {
						return res4;
					})
					.catch((error) => {
						return error;
					}),
			]);
		})
		.then(
			axios.spread((res1, res2, res3, res4) => {
				const {
					id,
					title,
					pictures,
					condition,
					shipping,
					sold_quantity,
					price,
					currency_id,
				} = res1.data;
				let priceObj = {
					currency: currency_id,
					amount: Number(price.toString().split(".")[0]),
					decimals: Number(price.toString().split(".")[1]),
				};

				const { plain_text } = res2.data || {};
				const { nickname } = res3.data || {};
				const { path_from_root } = res4.data || {};
				let author = { name: nickname ? nickname : "" };
				let item = {
					id,
					title,
					price: priceObj,
					pictures,
					condition,
					free_shipping: shipping.free_shipping,
					sold_quantity,
					description: plain_text ? plain_text : "",
				};
				let categories = path_from_root
					? path_from_root.map((el) => el.name)
					: [];

				res.send({ status: 200, author, categories, item });
			})
		)
		.catch((error) => {
			//console.log(error);
			res.send({
				status: error.response.status,
				error: error.message,
			});
		});
});

module.exports = router;
