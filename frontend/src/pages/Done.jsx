import { useSelector } from "react-redux";
import TaskBox from "../components/TaskBox";

const Done = ({ doneCollapse }) => {
	const done = useSelector((store) => store.task.done);
	return (
		<div className="task-container">
			{done?.map((task, index) => (
				<TaskBox key={index} task={task} doneCollapse={doneCollapse} />
			))}
		</div>
	);
};

export default Done;
