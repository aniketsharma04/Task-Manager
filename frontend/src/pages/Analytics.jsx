import React, { useState } from "react";
import "../css/Analytics.css";
import useGetAnalytics from "../hooks/useGetAnalytics";
import Loading from "../components/Loading";
const Analytics = () => {
	const [analytics, setAnalytics] = useState(null);
	useGetAnalytics(setAnalytics);

	return analytics == null ? (
		<Loading />
	) : (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<div className="header-user">
					<h3>Analytics</h3>
				</div>
			</div>
			<div className="analytics-container">
				<div className="analytics-box">
					<div className="analytics-task">
						<div>
							<div className="analytics-circle"></div>
							<span>Backlog Tasks</span>
						</div>
						<span>{analytics?.backlog}</span>
					</div>
					<div className="analytics-task">
						<div>
							<div className="analytics-circle"></div>
							<span>To-do Tasks</span>
						</div>
						<span>{analytics?.todo}</span>
					</div>
					<div className="analytics-task">
						<div>
							<div className="analytics-circle"></div>
							<span>In-Progress Tasks</span>
						</div>
						<span>{analytics?.inProgress}</span>
					</div>
					<div className="analytics-task">
						<div>
							<div className="analytics-circle"></div>
							<span>Completed Tasks</span>
						</div>
						<span>{analytics?.done}</span>
					</div>
				</div>
				<div className="analytics-box">
					<div className="analytics-task">
						<div>
							<div className="analytics-circle"></div>
							<span>Low Priority</span>
						</div>
						<span>{analytics?.low}</span>
					</div>
					<div className="analytics-task">
						<div>
							<div className="analytics-circle"></div>
							<span>Moderate Priority</span>
						</div>
						<span>{analytics?.moderate}</span>
					</div>
					<div className="analytics-task">
						<div>
							<div className="analytics-circle"></div>
							<span>High Priority</span>
						</div>
						<span>{analytics?.high}</span>
					</div>
					<div className="analytics-task">
						<div>
							<div className="analytics-circle"></div>
							<span>Due Date Tasks</span>
						</div>
						<span>{analytics?.dueDate}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Analytics;
