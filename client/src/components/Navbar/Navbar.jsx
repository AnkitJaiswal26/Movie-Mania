// import { ArrowDropDown } from "@material-ui/icons";
import { useContext, useState } from "react";
import "./Navbar.scss";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/auth.context";
import { logout } from "../../authContext/auth.action";
import { LocalDiningOutlined } from "@material-ui/icons";
import logo from '../../logo.png'

const Navbar = () => {
	const history = useHistory();
	const [isScrolled, setIsScrolled] = useState(false);
	const { user, dispatch } = useContext(AuthContext);

	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true);
		return () => (window.onscroll = null);
	};
	return (
		<div className={isScrolled ? "navbar scrolled" : "navbar"}>
			<div className="container">
				<div className="left">
					<img
						src={logo}
						alt=""
					/>
					<Link to="/" className="link">
						<span>Home</span>
					</Link>
					<Link to="/series" className="link">
						<span className="navbarmainLinks">Series</span>
					</Link>
					<Link to="/movies" className="link">
						<span className="navbarmainLinks">Movies</span>
					</Link>
				</div>
				<div className="right">
					<img
						src={
							user.profilePicture ||
							"https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
						}
						alt=""
					/>
					<span
						className="navbarmainLinks"
						onClick={() => {
							dispatch(logout());
							history.push("/login");
						}}
					>
						Logout
					</span>
					{/* <div className="profile">
						<ArrowDropDown className="icon" />
						<div className="options">
							<span>Settings</span>
							<span
								onClick={() => {
									dispatch(logout());
									history.push("/login");
								}}
							>
								Logout
							</span>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
