import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AuthContextProvider } from "./authContext/auth.context";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
