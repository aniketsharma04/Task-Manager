import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ToastContainer
					position={"top-right"}
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					stacked
					limit={3}
					toastStyle={{
						border: "1px solid #dadadaaa",
						textTransform: "capitalize",
					}}
				/>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
