import React, { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/auth.context";
import { ToastContainer } from "react-toastify";
import "./Login.scss";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isFetching, dispatch } = useContext(AuthContext);
	const handleLogin = (e) => {
		e.preventDefault();
		login({ email, password }, dispatch);
	};
	return (
		<>
			<ToastContainer />
			<div className="w-full h-screen flex justify-center items-center loginWrapper">
				<div className="mainContainer">
					<div className="formBox">
						<form onSubmit={handleLogin}>
							<h2 className="heading">Admin Login</h2>

							<div className="inputContainer">
								<label className="inputLabel">Email</label>
								<input
									className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
									type="email"
									placeholder="Enter your email"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</div>
							<div className="inputContainer">
								<label className="inputLabel">Password</label>
								<input
									className="w-full px-5 py-2 sm:rounded-md font-medium bg-gray-100 placeholder-gray-500 text-sm border focus:outline-none focus:border-gray-400 focus:bg-white"
									type="password"
									placeholder="Enter your password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									value={password}
								/>
							</div>
							<div className="flex flex-col items-center">
								<a
									aria-disabled={isFetching}
									className="w-full font-semibold shadow-sm rounded-lg py-3 bg-red-600 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow hover:bg-red-700 focus:shadow-sm focus:shadow-outline mt-5"
									onClick={handleLogin}
									href="/"
								>
									<span className="ml-4">Log In</span>
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
