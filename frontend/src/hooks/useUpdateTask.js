import getHeader from "../utils/header";
import { toast } from "react-toastify";
import { setTaskCardM, setTaskM } from "../redux/slices/stateSlice";
import {
	deleteBacklogTask,
	deleteDoneTask,
	deleteInProgressTask,
	deleteTodoTask,
	updateBacklogTask,
	updateDoneTask,
	updateInProgressTask,
	updateTodoTask,
} from "../redux/slices/taskSlice";
const useUpdateTask = (
	e,
	setLoad,
	title,
	priority,
	checklist,
	assign,
	dueDate,
	dispatch,
	id
) => {
	setLoad("Loading...");
	e.target.disabled = true;
	fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/${id}`, {
		method: "PUT",
		headers: getHeader(),
		body: JSON.stringify({
			title: title,
			priority: priority,
			checklist: checklist,
			assign: assign,
			dueDate: dueDate,
		}),
	})
		.then((response) => response.json())
		.then((json) => {
			setLoad("");
			e.target.disabled = false;
			if (json?.message === "success") {
				toast.success("Task Updated Successfully");
				if (json?.removeAssignCategory == "to-do") {
					dispatch(deleteTodoTask(json.data));
				} else if (json?.removeAssignCategory == "in-progress") {
					dispatch(deleteInProgressTask(json.data));
				} else if (json?.removeAssignCategory == "backlog") {
					dispatch(deleteBacklogTask(json.data));
				} else if (json?.removeAssignCategory == "done") {
					dispatch(deleteDoneTask(json.data));
				} else {
					if (json.data.category == "to-do") {
						dispatch(updateTodoTask(json.data));
					} else if (json.data.category == "backlog") {
						dispatch(updateBacklogTask(json.data));
					} else if (json.data.category == "in-progress") {
						dispatch(updateInProgressTask(json.data));
					} else {
						dispatch(updateDoneTask(json.data));
					}
				}
				dispatch(setTaskCardM(false));
				dispatch(setTaskM(""));
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

export default useUpdateTask;
