import getHeader from "../utils/header";
import {
	setBacklog,
	setTodo,
	setInProgress,
	setDone,
} from "../redux/slices/taskSlice";
import { setLoading } from "../redux/slices/stateSlice";
import { toast } from "react-toastify";

const useAllTaskFilter = (dispatch, days) => {
	dispatch(setLoading(true));
	fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/all?days=${days}`, {
		method: "GET",
		headers: getHeader(),
	})
		.then((response) => response.json())
		.then((json) => {
			if (json?.message === "success") {
				dispatch(setBacklog(json.data.backlog));
				dispatch(setTodo(json.data.todo));
				dispatch(setInProgress(json.data.inProgress));
				dispatch(setDone(json.data.done));
			}
			dispatch(setLoading(false));
		})
		.catch((error) => {
			console.error("Error:", error);
			toast.error("Something went wrong");
			dispatch(setLoading(false));
		});
};

export default useAllTaskFilter;
