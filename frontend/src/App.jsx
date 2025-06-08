import React, { Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Register_Login from "./pages/Register_Login";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addAuth } from "./redux/slices/authSlice";
import { setLoading } from "./redux/slices/stateSlice";
import { TaskCardPublic } from "./components/Model";
import getHeader from "./utils/header";
import { toast } from "react-toastify";

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const loading = useSelector((store) => store.state.loading);
	const auth = useSelector((store) => store.auth);
	const token = localStorage.getItem("token");
	const getAuthUser = () => {
		dispatch(setLoading(true));
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
			method: "GET",
			headers: getHeader(),
		})
			.then((res) => res.json())
			.then((json) => {
				dispatch(setLoading(false));
				if (json?.data) {
					dispatch(addAuth(json.data));
					navigate("/");
				} else {
					navigate("/login");
					toast.error("You are not logged in");
				}
			})
			.catch((err) => {
				toast.error("Something went wrong");
				dispatch(setLoading(false));
			});
	};

	useEffect(() => {
		if (token && !auth) {
			getAuthUser();
		}
	}, [token, pathname, auth]);

	return (
		<div className="app-container">
			{loading && <Loading />}
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route path="/login" element={<Register_Login />} />
					<Route path="/task/:id" element={<TaskCardPublic />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
