import "./App.scss";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Watch from "./pages/Watch/Watch";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { AuthContext } from "./authContext/auth.context";
import { useContext } from "react";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import Movies from "./pages/Movies/Movies";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					{user ? <Home /> : <Redirect to="/register" />}
				</Route>
				<Route path="/register">
					{!user ? <Register /> : <Redirect to="/" />}
				</Route>
				<Route path="/login">
					{!user ? <Login /> : <Redirect to="/" />}
				</Route>
				{user ? (
					<>
						<ToastContainer />
						<Route path="/movie">
							<Home type="movie" />
						</Route>
						<Route path="/movies">
							<Movies />
						</Route>
						<Route path="/series">
							<Home type="series" />
						</Route>
						<Route path="/watch">
							<Watch />
						</Route>
					</>
				) : (
					<Redirect to="/login" />
				)}
			</Switch>
		</Router>
	);
}

export default App;
