const express = require("express");
const router = express.Router();
const Movie = require("../models/Movies");
const List = require("../models/List");
const verify = require("../verifyToken");

router.post("/", verify, async (req, res) => {
	if (req.user.isAdmin) {
		const newList = new List(req.body);
		try {
			const savedList = await newList.save();
			return res.status(201).json(savedList);
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed!");
	}
});

router.delete("/:id", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			await List.findByIdAndDelete(req.params.id);
			return res.status(201).json("List has been deleted successfully!");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed!");
	}
});

router.get("/", verify, async (req, res) => {
	const typeQuery = req.query.type;
	const genreQuery = req.query.genre;
	let list = [];
	try {
		if (typeQuery) {
			if (genreQuery) {
				list = await List.aggregate([
					{ $sample: { size: 10 } },
					{ $match: { type: typeQuery, genre: genreQuery } },
				]);
			} else {
				list = await List.aggregate([
					{ $sample: { size: 10 } },
					{ $match: { type: typeQuery } },
				]);
			}
		} else {
			list = await List.aggregate([{ $sample: { size: 10 } }]);
		}
		res.status(200).json(list);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
