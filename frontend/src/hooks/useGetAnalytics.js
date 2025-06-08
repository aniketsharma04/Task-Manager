import { useEffect } from "react";
import { toast } from "react-toastify";
import getHeader from "../utils/header";
const useGetAnalytics = (setAnalytics) => {
	const getAnalytics = () => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/analytics`, {
			method: "GET",
			headers: getHeader(),
		})
			.then((response) => response.json())
			.then((json) => {
				if (json?.message === "success") {
					setAnalytics(json.data);
				} else {
					toast.error("Something went wrong");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				toast.error("Something went wrong");
			});
	};
	useEffect(() => {
		getAnalytics();
	}, []);
};

export default useGetAnalytics;
