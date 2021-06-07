export const formatPrice = (price) => {
	let arrprice = price.toString().split("").reverse();
	let formated = [];
	for (let i = 0; i < arrprice.length; i++) {
		if (i % 3 === 0 && i !== 0) {
			formated.push(",");
		}
		formated.push(arrprice[i]);
	}
	return formated.reverse().join("");
};