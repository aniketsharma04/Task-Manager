import getHeader from "../utils/header";
import { toast } from "react-toastify";
import {
	setCategoryName,
	setUpdateCategoryM,
} from "../redux/slices/stateSlice";
import {
	addBacklogTask,
	addDoneTask,
	addInProgressTask,
	addTodoTask,
	deleteBacklogTask,
	deleteDoneTask,
	deleteInProgressTask,
	deleteTodoTask,
} from "../redux/slices/taskSlice";
const useUpdateCategory = (
	e,
	setLoad,
	dispatch,
	taskId,
	newCategory,
	oldCategory
) => {
	setLoad("Loading...");
	e.target.disabled = true;
	fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/category/${taskId}`, {
		method: "PUT",
		headers: getHeader(),
		body: JSON.stringify({
			category: newCategory,
		}),
	})
		.then((response) => response.json())
		.then((json) => {
			setLoad("");
			e.target.disabled = false;
			if (json?.message === "success") {
				toast.success("Changed the status of task");
				dispatch(setUpdateCategoryM(false));
				dispatch(setCategoryName(""));
				if (json.data.category == "to-do") {
					dispatch(addTodoTask(json.data));
				} else if (json.data.category == "backlog") {
					dispatch(addBacklogTask(json.data));
				} else if (json.data.category == "in-progress") {
					dispatch(addInProgressTask(json.data));
				} else {
					dispatch(addDoneTask(json.data));
				}
				if (oldCategory == "to-do") {
					dispatch(deleteTodoTask(json.data));
				} else if (oldCategory == "backlog") {
					dispatch(deleteBacklogTask(json.data));
				} else if (oldCategory == "in-progress") {
					dispatch(deleteInProgressTask(json.data));
				} else {
					dispatch(deleteDoneTask(json.data));
				}
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

export default useUpdateCategory;
