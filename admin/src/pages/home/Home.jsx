import { useState, useMemo, useEffect } from "react";
import Chart from "../../components/chart/Chart";
import "./home.scss";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from 'axios'

export default function Home() {
	const MONTHS = useMemo(
		() => [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		],
		[]
	);

	const [userStats, setUserStats] = useState([]);

	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await axios.get("/users/stats", {
					headers: {
						token: "Bearer ",
					},
				});
        const statsList = res.data.sort((a, b) => {
          return a._id - b._id;
        })
				statsList.map((item) =>
					setUserStats((prev) => [
						...prev,
						{ name: MONTHS[item._id - 1], "New User": item.total },
					])
				);
			} catch (err) {
				console.log(err);
			}
		};
		getStats();
	}, [MONTHS]);

	return (
		<div className="home">
			<Chart
				data={userStats}
				title="User Analytics"
				grid
				dataKey="New User"
			/>
			<div className="homeWidgets">
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
}
