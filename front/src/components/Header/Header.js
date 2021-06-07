import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./header.scss";

import searchIcon from "../../assets/imgs/ic_Search.png";

const Header = () => {
	const history = useHistory();
	const { pathname } = useLocation();
	const { searchText } = useSelector((state) => state.items);
	const [searchTxt, setSearchTxt] = useState("");

	const submitForm = (e) => {
		e.preventDefault();

		if (searchTxt.trim() !== "") {
			let searchtxtNm = searchTxt
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");
			history.push(`/items?search=${searchtxtNm}`);
		}
	};

	useEffect(() => {
		if (pathname === "/") setSearchTxt("");
		else setSearchTxt(searchText);
	}, [pathname, searchText]);

	return (
		<header role="banner" className="pt-20 pb-20">
			<div className="container">
				<Link className="header-image" to="/" tabIndex="0">
					Mercado Libre
				</Link>
				<form
					className="form-search"
					action="action_page.php"
					role="search"
					onSubmit={submitForm}
				>
					<input
						type="text"
						placeholder="Nunca dejes de buscar"
						name="search"
						tabIndex="1"
						className="input-search"
						onChange={(e) => setSearchTxt(e.target.value)}
						value={searchTxt}
					/>
					<button type="submit" tabIndex="2" className="input-button">
						<img src={searchIcon} alt="Buscar" />
					</button>
				</form>
			</div>
		</header>
	);
};

export default Header;
