import { lazy } from "react";
import Navbar from "./Navbar";
const Board = lazy(() => import("./Board.jsx"));
const Analytics = lazy(() => import("./Analytics.jsx"));
const Settings = lazy(() => import("./Settings.jsx"));
import { useSelector } from "react-redux";
import "../css/Dashboard.css";
import {
	AddedPeople,
	AddPeople,
	Logout,
	TaskCard,
	TaskDelete,
	UpdateCategory,
} from "../components/Model";

const Dashboard = () => {
	const state = useSelector((store) => store.state);
	return (
		<>
			<Navbar />
			{state.dashboardSection == "board" && <Board />}
			{state.dashboardSection == "analytics" && <Analytics />}
			{state.dashboardSection == "settings" && <Settings />}
			{state.addPeopleM && <AddPeople />}
			{state.addedPeopleM && <AddedPeople />}
			{state.logoutM && <Logout />}
			{state.taskDeleteM && <TaskDelete />}
			{state.taskCardM && <TaskCard />}
			{state.updateCategoryM && <UpdateCategory />}
		</>
	);
};

export default Dashboard;
