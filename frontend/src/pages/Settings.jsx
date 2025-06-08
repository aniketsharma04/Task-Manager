import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkValidSignUpFrom } from "../utils/validate";
import { PiEye, PiEyeClosedLight } from "react-icons/pi";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAuth } from "../redux/slices/authSlice";
import getHeader from "../utils/header";

const Settings = () => {
	const auth = useSelector((store) => store.auth);
	const [name, setName] = useState(auth.name);
	const [email, setEmail] = useState(auth.email);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [load, setLoad] = useState("");
	const [isShowO, setIsShowO] = useState(false);
	const [isShowN, setIsShowN] = useState(false);
	const dashboardSection = useSelector(
		(store) => store.state.dashboardSection
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleName = (name) => {
		name = name.charAt(0).toUpperCase() + name.slice(1);
		setName(name);
	};

	const handlePasswordOld = (oldPassword) => {
		oldPassword = oldPassword.trim();
		setOldPassword(oldPassword);
	};
	const handlePasswordNew = (newPassword) => {
		newPassword = newPassword.trim();
		setNewPassword(newPassword);
	};
	// Update
	const updateUser = (e) => {
		toast.loading("Wait until you SignUp");
		e.target.disabled = true;
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/update`, {
			method: "PUT",
			headers: getHeader(),
			body: JSON.stringify({
				name: name,
				email: email,
				oldPassword: oldPassword,
				newPassword: newPassword,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				setLoad("");
				e.target.disabled = false;
				toast.dismiss();
				if (json?.message === "success") {
					toast.success("Update Successfully");
					localStorage.removeItem("token");
					dispatch(removeAuth());
					navigate("/login");
				} else {
					toast.error(json?.message);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				setLoad("");
				toast.dismiss();
				toast.error("Something went wrong");
				e.target.disabled = false;
			});
	};

	const handleUpdate = (e) => {
		if (name && email && newPassword && oldPassword) {
			const validError = checkValidSignUpFrom(name, email, newPassword);
			if (validError) {
				toast.error(validError);
				return;
			}
			setLoad("Loading...");
			updateUser(e);
		} else {
			toast.error("All fields are required");
		}
	};
	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<div className="header-user">
					<h3>Settings</h3>
				</div>
			</div>
			<div>
				<form className="form_box form_box_s">
					<div className="input_p_box">
						<span className="hide_show_btn_s">
							<CiUser fontSize={22} />
						</span>
						<input
							className=""
							type="text"
							placeholder="Name"
							name="name"
							value={name}
							onChange={(e) => handleName(e.target.value)}
							required
						/>
					</div>
					<div className="input_p_box">
						<span className="hide_show_btn_s">
							<CiMail fontSize={22} />
						</span>
						<input
							className=""
							type="email"
							placeholder="Email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="input_p_box">
						<span className="hide_show_btn_s">
							<CiLock fontSize={22} />
						</span>
						<input
							className=""
							type={isShowO ? "text" : "password"}
							placeholder="Old Password"
							name="oldPassword"
							value={oldPassword}
							onChange={(e) => handlePasswordOld(e.target.value)}
						/>
						<span
							onClick={() => setIsShowO(!isShowO)}
							className="hide_show_btn"
						>
							{isShowO ? (
								<PiEyeClosedLight fontSize={22} />
							) : (
								<PiEye fontSize={22} />
							)}
						</span>
					</div>
					<div className="input_p_box">
						<span className="hide_show_btn_s">
							<CiLock fontSize={22} />
						</span>
						<input
							className=""
							type={isShowN ? "text" : "password"}
							placeholder="New Password"
							name="newPassword"
							value={newPassword}
							onChange={(e) => handlePasswordNew(e.target.value)}
						/>
						<span
							onClick={() => setIsShowN(!isShowN)}
							className="hide_show_btn"
						>
							{isShowN ? (
								<PiEyeClosedLight fontSize={22} />
							) : (
								<PiEye fontSize={22} />
							)}
						</span>
					</div>
					<button
						onClick={(e) => {
							e.preventDefault();
							handleUpdate(e);
						}}
						className="update_button"
					>
						{load == "" ? "Update" : load}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Settings;
