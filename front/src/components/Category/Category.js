import React from "react";

import "./category.scss";

const Category = (props) => {
	const { categories } = props;

	return (
		<section>
			<ul className="categories">
				{categories && categories.map((cat) => <li key={cat}>{cat}</li>)}
			</ul>
		</section>
	);
};

export default Category;
