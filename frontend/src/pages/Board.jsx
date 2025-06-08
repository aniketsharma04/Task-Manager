import React, { useEffect, useState } from "react";
import Backlog from "./Backlog";
import ToDo from "./ToDo";
import InProgress from "./InProgress";
import Done from "./Done";
import { VscCollapseAll } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import "../css/Task.css";
import { useDispatch, useSelector } from "react-redux";
import { generateDate } from "../utils/generateDate";
import { LuUsers2 } from "react-icons/lu";
import {
	setAddPeopleM,
	setTaskCardM,
	setTaskFilterP,
} from "../redux/slices/stateSlice";
import { TaskFilter } from "../components/PopUp";
import useAllTask from "../hooks/useAllTask";
const Board = () => {
	const [backlogCollapse, setBacklogCollapse] = useState(false);
	const [todoCollapse, setTodoCollapse] = useState(false);
	const [progressCollapse, setProgressCollapse] = useState(false);
	const [doneCollapse, setDoneCollapse] = useState(false);
	const auth = useSelector((store) => store.auth);
	const taskFilter = useSelector((store) => store.state.taskFilterP);
	const taskFilterName = useSelector((store) => store.state.taskFilterName);
	const dispatch = useDispatch();

	const handleClickOutside = (event) => {
		if (taskFilter && !event?.target.closest(".popup-box")) {
			dispatch(setTaskFilterP(false));
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [taskFilter]);

	useAllTask();

	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<div className="header-user">
					<h3>Welcome! {auth.name.split(" ")[0]}</h3>
					<h4>{generateDate()}</h4>
				</div>
				<div className="header-board">
					<div>
						<h2>Board</h2>
						<span
							className="add-people"
							onClick={() => dispatch(setAddPeopleM(true))}
						>
							<LuUsers2 />
							<span>Add People</span>
						</span>
					</div>
					<span className="header-time relative">
						<span onClick={() => dispatch(setTaskFilterP(true))}>
							<p>{taskFilterName}</p>
							<IoIosArrowDown />
						</span>
						{taskFilter && <TaskFilter />}
					</span>
				</div>
			</div>
			<div className="dashboard-column">
				<div className="column">
					<h4>
						<span>Backlog</span>{" "}
						<VscCollapseAll
							fontSize={18}
							cursor={"pointer"}
							onClick={() => setBacklogCollapse(!backlogCollapse)}
						/>
					</h4>
					<Backlog backlogCollapse={backlogCollapse} />
				</div>
				<div className="column">
					<h4>
						<span>To Do</span>
						<span>
							<AiOutlinePlus
								fontSize={18}
								cursor={"pointer"}
								onClick={() => dispatch(setTaskCardM(true))}
							/>
							<VscCollapseAll
								fontSize={18}
								cursor={"pointer"}
								onClick={() => setTodoCollapse(!todoCollapse)}
							/>
						</span>
					</h4>
					<ToDo todoCollapse={todoCollapse} />
				</div>
				<div className="column">
					<h4>
						<span>In Progress</span>{" "}
						<VscCollapseAll
							fontSize={18}
							cursor={"pointer"}
							onClick={() =>
								setProgressCollapse(!progressCollapse)
							}
						/>
					</h4>
					<InProgress progressCollapse={progressCollapse} />
				</div>
				<div className="column">
					<h4>
						<span>Done</span>{" "}
						<VscCollapseAll
							fontSize={18}
							cursor={"pointer"}
							onClick={() => setDoneCollapse(!doneCollapse)}
						/>
					</h4>
					<Done doneCollapse={doneCollapse} />
				</div>
			</div>
		</div>
	);
};

export default Board;
