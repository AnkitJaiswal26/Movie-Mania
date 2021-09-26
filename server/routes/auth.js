const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.SECRET_KEY
		).toString(),
	});

	try {
		const user = await newUser.save();
		res.json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/login", (req, res) => {
	try {
		const user = User.findOne({ email: req.body.email }).exec(
			(err, user) => {
				if (err || !user) {
					res.status(401).json(
						"User does not exists with this email!"
					);
				}

				const bytes = CryptoJS.AES.decrypt(
					user.password,
					process.env.SECRET_KEY
				);
				const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
				if (originalPassword !== req.body.password) {
					res.status(401).json("Wrong Credentials!");
				}

				const accessToken = jwt.sign(
					{ id: user._id, isAdmin: user.isAdmin },
					process.env.SECRET_KEY,
					{ expiresIn: "5d" }
				);
				const { password, ...info } = user._doc;
				res.status(200).json({
					...info,
					accessToken,
				});
			}
		);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
