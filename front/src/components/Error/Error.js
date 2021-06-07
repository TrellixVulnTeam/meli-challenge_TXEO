import React from "react";

const Error = (props) => {
	const { error } = props;
	return (
		<p style={{ padding: "32px 16px", backgroundColor: "#FFFFFF" }}>{error}</p>
	);
};

export default Error;
