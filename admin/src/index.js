import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/authContext/auth.context";
import { ListContextProvider } from "./context/listContext/list.context";
import { MovieContextProvider } from "./context/movieContext/movie.context";
import { UserContextProvider } from "./context/userContext/user.context";

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<UserContextProvider>
				<MovieContextProvider>
					<ListContextProvider>
						<App />
					</ListContextProvider>
				</MovieContextProvider>
			</UserContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
