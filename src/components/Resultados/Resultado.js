import React from "react";

import { useHistory } from "react-router-dom";

import { formatPrice } from "../../common/common";
import "./resultado.scss";
import Icon from "../../assets/imgs/ic_shipping.png";

const Resultado = ({ item }) => {
	const { id, title, price, picture, state, free_shipping } = item;
	const { amount, currency, decimals } = price;

	const history = useHistory();

	const seeDetails = (id) => {
		history.push(`/items/${id}`);
	};

	return (
		<div className="div-resultado">
			<div className="div-resultado-inner" onClick={() => seeDetails(id)}>
				<img src={picture} alt={title} className="img-resultado" />
				<div className="div-detalle">
					<div className="div-description">
						<p className="p-price">
							$ {formatPrice(amount)}
							<sup>{decimals}</sup>
							<sub>{currency}</sub>
							{free_shipping && (
								<img src={Icon} alt="Envío gratis" className="img-icon" />
							)}
						</p>
						<p className="p-description">{title}</p>
					</div>
					<div className="div-ciudad">
						<p className="p-ciudad">{state}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Resultado;
