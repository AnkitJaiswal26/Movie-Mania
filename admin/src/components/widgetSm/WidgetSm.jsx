import { useState, useEffect, useContext } from "react";
import "./widgetSm.scss";
import { Visibility } from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/authContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function WidgetSm() {
	const [newUsers, setNewUsers] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const getNewUsers = async () => {
			console.log(user.accessToken)
			try {
				const res = await axios.get("/users?new=true", {
					headers: {
						token: `Bearer ${user.accessToken}`,
					},
				});
				setNewUsers(res.data);
			} catch (err) {
				toast.error(err);
			}
		};
		getNewUsers();
	}, []);

	return (
		<div className="widgetSm">
			<span className="widgetSmTitle">New Join Members</span>
			<ul className="widgetSmList">
				{newUsers.map((user) => (
					<li className="widgetSmListItem">
						<img
							src={user.profilePic || ""}
							alt=""
							className="widgetSmImg"
						/>
						<div className="widgetSmUser">
							<span className="widgetSmUsername">
								{user.username}
							</span>
						</div>
						<div className="widgetSmUser">
							<span className="widgetSmUsername">
								{user.email}
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
