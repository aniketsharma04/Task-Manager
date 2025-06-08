import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import stateSlice from "./slices/stateSlice";
import taskSlice from "./slices/taskSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		state: stateSlice,
		task: taskSlice,
	},
});

export default store;
