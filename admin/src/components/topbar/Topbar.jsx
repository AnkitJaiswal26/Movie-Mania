import React, { useContext } from "react";
import "./topbar.scss";
import { AuthContext } from "../../context/authContext/authContext";
import { logout } from "../../context/authContext/authActions";
import logo from "../../logo.png";

export default function Topbar() {
	const { user, dispatch } = useContext(AuthContext);
	return (
		<div className="topbar">
			<div className="topbarWrapper">
				<div className="topLeft">
					<span className="logo">
						<img src={logo} alt="" />
					</span>
				</div>
				<div className="topRight">
					<img
						src={
							user.profilePhoto ||
							"https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
						}
						alt=""
						className="topAvatar"
					/>
					<div
						className="topbarIconContainer"
						onClick={() => dispatch(logout())}
						style={{ marginLeft: "20px" }}
					>
						Logout
					</div>
				</div>
			</div>
		</div>
	);
}
