import { useSelector } from "react-redux";
import TaskBox from "../components/TaskBox";

const ToDo = ({ todoCollapse }) => {
	const todo = useSelector((store) => store.task.todo);
	return (
		<div className="task-container">
			{todo?.map((task, index) => (
				<TaskBox key={index} task={task} todoCollapse={todoCollapse} />
			))}
		</div>
	);
};

export default ToDo;
