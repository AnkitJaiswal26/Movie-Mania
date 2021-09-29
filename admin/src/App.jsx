import React, { useContext } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Login/Login";
import { AuthContext } from "./context/authContext/auth.context";
import ListList from "./pages/ListList/ListList";
import List from "./pages/List/List";
import NewList from "./pages/newList/NewList";
import { ToastContainer } from "react-toastify";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<Router>
			<Switch>
				<Route path="/login">
					{user ? <Redirect to="/" /> : <Login />}
				</Route>
				{user ? (
					<>
						<ToastContainer />
						<Topbar />
						<div className="container">
							<Sidebar />
							<Route exact path="/">
								<Home />
							</Route>
							<Route path="/users">
								<UserList />
							</Route>
							<Route path="/user/:userId">
								<User />
							</Route>
							<Route path="/newUser">
								<NewUser />
							</Route>
							<Route path="/movies">
								<ProductList />
							</Route>
							<Route path="/movie/:movieId">
								<Product />
							</Route>
							<Route path="/newMovie">
								<NewProduct />
							</Route>
							<Route path="/lists">
								<ListList />
							</Route>
							<Route path="/list/:listId">
								<List />
							</Route>
							<Route path="/newlist">
								<NewList />
							</Route>
						</div>
					</>
				) : (
					<Redirect to="/login" />
				)}
			</Switch>
		</Router>
	);
}

export default App;
