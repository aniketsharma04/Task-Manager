const getHeader = () => {
	const token = localStorage.getItem("token");
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
};

export default getHeader;
