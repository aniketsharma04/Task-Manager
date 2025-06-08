import getHeader from "../utils/header";
import { toast } from "react-toastify";
import { setTaskDeleteM } from "../redux/slices/stateSlice";
import {
	deleteBacklogTask,
	deleteDoneTask,
	deleteInProgressTask,
	deleteTodoTask,
} from "../redux/slices/taskSlice";
const useDeleteTask = (e, setLoad, dispatch, id) => {
	setLoad("Loading...");
	e.target.disabled = true;
	fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/${id}`, {
		method: "DELETE",
		headers: getHeader(),
	})
		.then((response) => response.json())
		.then((json) => {
			setLoad("");
			e.target.disabled = false;
			if (json?.message === "success") {
				toast.success("Task Deleted Successfully");
				if (json.data.category == "to-do") {
					dispatch(deleteTodoTask(json.data));
				} else if (json.data.category == "backlog") {
					dispatch(deleteBacklogTask(json.data));
				} else if (json.data.category == "in-progress") {
					dispatch(deleteInProgressTask(json.data));
				} else {
					dispatch(deleteDoneTask(json.data));
				}
				dispatch(setTaskDeleteM(false));
			} else {
				toast.error(json?.message);
			}
		})
		.catch((error) => {
			console.error("Error:", error);
			setLoad("");
			toast.error("Something went wrong");
			e.target.disabled = false;
		});
};

export default useDeleteTask;
