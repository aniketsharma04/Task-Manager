import { PiCodesandboxLogoDuotone } from "react-icons/pi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import "../css/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutM, updateDashboardSection } from "../redux/slices/stateSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
	const dispatch = useDispatch();
	const dashboardSection = useSelector(
		(store) => store.state.dashboardSection
	);

	return (
		<div className="navbar">
			<Link to={"/"} className="nav-logo">
				<PiCodesandboxLogoDuotone fontSize={22} />
				<span>Pro Manage</span>
			</Link>
			<div className="nav-links">
				<div>
					<span
						onClick={() =>
							dispatch(updateDashboardSection("board"))
						}
						className={`nav-link ${
							dashboardSection == "board" && "nav-active"
						}`}
					>
						<MdOutlineSpaceDashboard fontSize={22} />
						<span>Board</span>
					</span>
					<span
						onClick={() =>
							dispatch(updateDashboardSection("analytics"))
						}
						className={`nav-link ${
							dashboardSection == "analytics" && "nav-active"
						}`}
					>
						<GoDatabase fontSize={22} />
						<span>Analytics</span>
					</span>
					<span
						onClick={() =>
							dispatch(updateDashboardSection("settings"))
						}
						className={`nav-link ${
							dashboardSection == "settings" && "nav-active"
						}`}
					>
						<IoSettingsOutline fontSize={22} />
						<span>Settings</span>
					</span>
				</div>
				<div className="nav-logout">
					<span
						className="nav-log"
						onClick={() => dispatch(setLogoutM(true))}
					>
						<IoLogOutOutline fontSize={22} />
						<span>Log out</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
