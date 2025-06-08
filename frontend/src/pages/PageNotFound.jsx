import React from "react";
import "../css/Page_Not_Found.css";
import { Link } from "react-router-dom";
const PageNotFound = () => {
	return (
		<div className="page_not_found">
			<h2>Page Not Found</h2>
			<h1>404</h1>
			<Link to={"/"} className="page_not_found_link">
				Back
			</Link>
		</div>
	);
};

export default PageNotFound;
