import { TbDots } from "react-icons/tb";
import TaskBox from "../components/TaskBox";
import { useSelector } from "react-redux";

const Backlog = ({ backlogCollapse }) => {
	const backlog = useSelector((store) => store.task.backlog);
	return (
		<div className="task-container">
			{backlog?.map((task, index) => (
				<TaskBox
					key={index}
					task={task}
					backlogCollapse={backlogCollapse}
				/>
			))}
		</div>
	);
};

export default Backlog;
