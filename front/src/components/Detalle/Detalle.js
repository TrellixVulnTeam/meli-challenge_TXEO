import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Category from "../Category/Category";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { searchItemDetailsAction } from "../../actions/itemsAction";
import { formatPrice } from "../../common/common";

import "./detalle.scss";

const Detalle = () => {
	const { itemDetail, error, loading } = useSelector((state) => state.items);
	const { id } = useParams();
	const dispatch = useDispatch();

	const loadItemDetails = useCallback(
		(id) => {
			dispatch(searchItemDetailsAction(id));
		},
		[dispatch]
	);

	useEffect(() => {
		if (id) loadItemDetails(id);
	}, [id, loadItemDetails]);

	return (
		<section>
			{loading ? (
				<Loader />
			) : (
				<>
					<Category categories={itemDetail.categories} />
					{itemDetail?.status === 200 ? (
						itemDetail.item && (
							<div className="div-container">
								<div className="div-detalle-prod">
									<div className="div-product">
										<img
											src={itemDetail.item.pictures[0].url}
											alt="iPhone"
											className="img-detalle"
										/>
										<div className="div-texto">
											<p className="p-vendidos">
												{itemDetail.item.condition === "new"
													? "Nuevo"
													: itemDetail.item.condition === "used"
													? "Usado"
													: itemDetail.item.condition}{" "}
												- {itemDetail.item.sold_quantity} vendidos
											</p>
											<h1 className="h1-title">{itemDetail.item.title}</h1>
											<p className="p-price">
												$ {formatPrice(itemDetail.item.price.amount)}
												<sup>
													{itemDetail.item.price.decimals
														? itemDetail.item.price.decimals
														: "00"}
												</sup>
											</p>
											<button className="btn">Comprar</button>
										</div>
									</div>
									{itemDetail.item.description && (
										<div className="div-description">
											<h2 className="h2-descripcion">
												Descripción del producto
											</h2>
											<p className="p-descripcion">
												{itemDetail.item.description}
											</p>
										</div>
									)}
								</div>
							</div>
						)
					) : itemDetail?.status === 404 ? (
						<Error error="Id del producto no existe, intenta con otro." />
					) : (
						<Error error={error||itemDetail.error} />
					)}
				</>
			)}
		</section>
	);
};

export default Detalle;
