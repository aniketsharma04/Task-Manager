import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkValidSignInFrom, checkValidSignUpFrom } from "../utils/validate";
import { PiEye, PiEyeClosedLight } from "react-icons/pi";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addAuth } from "../redux/slices/authSlice";
import AuthImage from "../assets/AuthImage.png";
import "../css/Register_Login.css";

const Register_Login = () => {
	const [isRegister, setIsRegister] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCPassword] = useState("");
	const [load, setLoad] = useState("");
	const [isShow, setIsShow] = useState(false);
	const [isShowC, setIsShowC] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Login
	const logInUser = (e) => {
		toast.loading("Wait until you SignIn");
		e.target.disabled = true;
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				setLoad("");
				e.target.disabled = false;
				toast.dismiss();
				if (json.token) {
					localStorage.setItem("token", json.token);
					dispatch(addAuth(json.data));
					navigate("/");
					toast.success(json?.message);
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
	const handleLogin = (e) => {
		if (email && password) {
			const validError = checkValidSignInFrom(email, password);
			if (validError) {
				toast.error(validError);
				return;
			}
			setLoad("Loading...");
			logInUser(e);
		} else {
			toast.error("All fields are required");
		}
	};

	// Signup
	const registerUser = (e) => {
		toast.loading("Wait until you SignUp");
		e.target.disabled = true;
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				setLoad("");
				e.target.disabled = false;
				toast.dismiss();
				if (json.token) {
					setIsRegister(false);
					setPassword("");
					setCPassword("");
					toast.success(json?.message);
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
	const handleRegister = (e) => {
		if (name && email && password) {
			const validError = checkValidSignUpFrom(name, email, password);
			if (validError) {
				toast.error(validError);
				return;
			}
			if (password != cpassword) {
				toast.error("Passwords don't match");
				return;
			}
			setLoad("Loading...");
			registerUser(e);
		} else {
			toast.error("All fields are required");
		}
	};
	const handleName = (name) => {
		name = name.charAt(0).toUpperCase() + name.slice(1);
		setName(name);
	};

	const handlePassword = (password) => {
		password = password.trim();
		setPassword(password);
	};
	return (
		<div className="register_login_box">
			<div className="img_box">
				<div className="authimage_box">
					<div className="authimage_back"></div>
					<img
						src={AuthImage}
						alt="AuthImage"
						className="authimage"
					/>
				</div>
				<h2>Welcome aboard my friend</h2>
				<span>just a couple of clicks and we start</span>
			</div>
			<form className="form_box">
				<h2 className="">{isRegister ? "Register" : "Login"}</h2>
				{isRegister && (
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
				)}
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
						type={isShow ? "text" : "password"}
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => handlePassword(e.target.value)}
					/>
					<span
						onClick={() => setIsShow(!isShow)}
						className="hide_show_btn"
					>
						{isShow ? (
							<PiEyeClosedLight fontSize={22} />
						) : (
							<PiEye fontSize={22} />
						)}
					</span>
				</div>
				{isRegister && (
					<div className="input_p_box">
						<span className="hide_show_btn_s">
							<CiLock fontSize={22} />
						</span>
						<input
							className=""
							type={isShowC ? "text" : "password"}
							placeholder="Confirm Password"
							value={cpassword}
							onChange={(e) => setCPassword(e.target.value)}
						/>
						<span
							onClick={() => setIsShowC(!isShowC)}
							className="hide_show_btn"
						>
							{isShowC ? (
								<PiEyeClosedLight fontSize={22} />
							) : (
								<PiEye fontSize={22} />
							)}
						</span>
					</div>
				)}
				<button
					onClick={(e) => {
						e.preventDefault();
						if (isRegister) {
							handleRegister(e);
						} else {
							handleLogin(e);
						}
					}}
					className="submit_button"
				>
					{load == "" ? `${isRegister ? "Register" : "Login"}` : load}
				</button>
				<p className="auth_change">
					{isRegister ? "Have an account ?" : "Have no account yet?"}
				</p>
				<button
					type="button"
					className="button_change"
					onClick={() => setIsRegister(!isRegister)}
				>
					{isRegister ? "Login" : "Register"}
				</button>
				{/* </div> */}
			</form>
		</div>
	);
};

export default Register_Login;
