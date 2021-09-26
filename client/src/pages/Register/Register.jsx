import axios from "axios";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Register.scss";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const history = useHistory();

	const emailRef = useRef();
	const passwordRef = useRef();
	const usernameRef = useRef();

	const handleFinish = async (e) => {
		e.preventDefault();
		setEmail(emailRef.current.value);
		setPassword(passwordRef.current.value);
		setUsername(usernameRef.current.value);

		try {
			await axios.post("auth/register", { email, username, password });
			toast.success(
				"Registeration successfull! Please login to continue."
			);
			history.push("/login");
		} catch (err) {
			const { data, status } = err.response;
			if (status >= 500) toast.error("Server Error!");
			else toast.error(data);
		}
	};
	return (
		<>
			<ToastContainer />
			<div className="w-full h-screen flex justify-center items-center registerWrapper">
				<div className="mainContainer">
					<div className="contentBox"></div>
					<div className="formBox">
						<form onSubmit={handleFinish}>
							<h2 className="heading">Create your Account</h2>
							<div className="inputContainer">
								<label className="inputLabel">Username</label>
								<input
									className="input w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
									type="text"
									placeholder="Enter your username"
									ref={usernameRef}
									// value={usernameRef.current.value}
								/>
							</div>
							<div className="inputContainer">
								<label className="inputLabel">Email</label>
								<input
									className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
									type="email"
									placeholder="Enter your email"
									ref={emailRef}
									// value={emailRef.current.value}
								/>
							</div>
							<div className="inputContainer">
								<label className="inputLabel">Password</label>
								<input
									className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
									type="password"
									placeholder="Enter your password"
									ref={passwordRef}
									// value={passwordRef.current.value}
								/>
							</div>
							<div className="flex flex-col items-center">
								<a
									className=" w-full font-semibold shadow-sm rounded-lg py-3 bg-red-600 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-red-700 focus:shadow-sm focus:shadow-outline mt-5"
									onClick={handleFinish}
									href="/"
								>
									<span className="ml-4">Register</span>
								</a>
							</div>
						</form>
						<div>
							<h6 className="already">
								Alredy have an Account?
								<Link className="alreadyLink" to={`/login`}>
									{" "}
									Log In
								</Link>
							</h6>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
