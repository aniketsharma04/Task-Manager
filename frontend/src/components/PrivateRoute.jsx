import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const auth = useSelector((store) => store.auth);

	if (!auth) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default PrivateRoute;
