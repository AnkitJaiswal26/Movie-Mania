const express = require("express");
const router = express.Router();
const Movie = require("../models/Movies");
const verify = require("../verifyToken");

router.post("/", verify, async (req, res) => {
	if (req.user.isAdmin) {
		const newMovie = new Movie(req.body);
		try {
			const savedMovie = await newMovie.save();
			return res.status(201).json(savedMovie);
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can update only your account");
	}
});

router.put("/:id", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const updatedMovie = await Movie.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			);
			return res.status(200).json(updatedMovie);
		} catch (err) {
			console.log(err)
			return res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can update only your account");
	}
});

router.delete("/:id", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			await Movie.findByIdAndDelete(req.params.id);
			return res.status(200).json("Movie has been deleted successfully!");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can update only your account");
	}
});

router.get("/find/:id", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const movie = await Movie.findById(req.params.id);
			return res.status(200).json(movie);
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can update only your account");
	}
});

router.get("/random", verify, async (req, res) => {
	const type = req.query.type;
	let movie;
	if (req.user.isAdmin) {
		try {
			if (type === "series") {
				movie = await Movie.aggregate([
					{ $match: { isSeries: true } },
					{ $sample: { size: 1 } },
				]);
			} else{
                movie = await Movie.aggregate([
					{ $match: { isSeries: false } },
					{ $sample: { size: 1 } },
				]);
            }
            res.status(200).json(movie);
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can update only your account");
	}
});

router.get("/", verify, async (req, res) => {
	const query = req.query.new;
	if (req.user.isAdmin) {
		try {
			const movies = query
				? await Movie.find().sort({ _id: -1 }).limit(10)
				: await Movie.find();
			return res.status(200).json(movies);
		} catch (err) {
			return res.status(401).json(err);
		}
	} else {
		return res.status(401).json("You can not allowed to see all users!");
	}
	// if (req.user.isAdmin) {
	// 	try {
	// 		const movies = await Movie.find();
	// 		return res.status(200).json(movies.reverse());
	// 	} catch (err) {
	// 		return res.status(500).json(err);
	// 	}
	// } else {
	// 	res.status(403).json("You can update only your account");
	// }
});

module.exports = router;
