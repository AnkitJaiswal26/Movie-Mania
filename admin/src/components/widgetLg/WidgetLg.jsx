import "./widgetLg.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext/auth.context";
import { toast } from "react-toastify";

export default function WidgetLg() {
	const [newMovies, setNewMovies] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const getNewMovies = async () => {
			try {
				const res = await axios.get("/movies?new=true", {
					headers: {
						token: `Bearer ${user.accessToken}`,
					},
				});
				setNewMovies(res.data);
			} catch (err) {
				toast.error(err);
			}
		};
		getNewMovies();
	},[]);

	return (
		<div className="widgetLg">
			<h3 className="widgetLgTitle">Latest transactions</h3>
			<table className="widgetLgTable">
				<tbody>
					<tr className="widgetLgTr">
						<th className="widgetLgTh">Movie</th>
						<th className="widgetLgTh">Title</th>
						<th className="widgetLgTh">Genre</th>
						<th className="widgetLgTh">Limit</th>
					</tr>
					{newMovies.map((movie) => (
						<tr className="widgetLgTr">
							<td className="widgetLgUser">
								<img
									src={movie.imgSm}
									alt=""
									className="widgetLgImg"
								/>
								<span className="widgetLgName">
									{movie.title}
								</span>
							</td>
							<td className="widgetLgDate">{movie.genre}</td>
							<td className="widgetLgAmount">{movie.limit}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
