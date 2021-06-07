import React, { useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { searchItemsAction } from "../../actions/itemsAction";
import Resultado from "./Resultado";
import Category from "../Category/Category";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const ResultadoList = () => {
	const { items, error, loading } = useSelector((state) => state.items);

	const { search, q } = useLocation();
	const dispatch = useDispatch();

	const loadItemList = useCallback(
		(str) => {
			dispatch(searchItemsAction(str));
		},
		[dispatch]
	);

	useEffect(() => {
		if (search) loadItemList(decodeURI(search.split("=")[1]));
		else if (q) loadItemList(decodeURI(q.split("=")[1]));
	}, [search, q, loadItemList]);

	return (
		<section>
			{loading ? (
				<Loader />
			) : (
				<>
					<Category categories={items.categories} />
					<div className="div-container">
						{error && <Error error={error} />}
						{items.items &&
							(items.items.length === 0 ? (
								<p style={{ padding: "32px 16px" }}>
									{items.error
										? items.error
										: "Sin resultados, realiza una nueva búsqueda."}
								</p>
							) : (
								items.items.map((el) => <Resultado key={el.id} item={el} />)
							))}
					</div>
				</>
			)}
		</section>
	);
};

export default ResultadoList;
