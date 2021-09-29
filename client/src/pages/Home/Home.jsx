import "./Home.scss";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Featured from "../../components/Featured/Featured";
import List from "../../components/List/List";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../authContext/auth.context";

const Home = ({ type }) => {
	const [lists, setLists] = useState([]);
	const [genre, setGenre] = useState(null);

	const [newMovies, setNewMovies] = useState([]);

	const { user } = useContext(AuthContext);

	useEffect(() => {
		const getRandomLists = async () => {
			try {
				if (type !== undefined) {
					const res = await axios.get(
						`lists${"?type=movies"}&${
							genre ? "genre=" + genre : ""
						}`,
						{
							headers: {
								token: `Bearer ${user.accessToken}`,
							},
						}
					);
					setLists(res.data);
				}
			} catch (err) {
				// console.log(err.response)
				toast.error(err.response.data);
			}
		};
		getRandomLists();
	}, [type, genre]);

	useEffect(() => {
		const getNewMoviesList = async () => {
			try {
				const res = await axios.get(`movies?new=true`, {
					headers: {
						token: `Bearer ${user.accessToken}`,
					},
				});
				setNewMovies(res.data);
			} catch (err) {
				toast.error(err.response.data);
			}
		};
		getNewMoviesList();
	}, [newMovies]);
	return (
		<div className="home">
			<Navbar />
			<Featured type={type} setGenre={setGenre} />
			<List
				list={{
					title: "Newly Added Movies",
					genre: "Action",
					type: "movie",
					content: newMovies.map((movie) => movie._id),
				}}
			/>
			{lists.map((list) => (
				<List list={list} />
			))}
		</div>
	);
};

export default Home;
