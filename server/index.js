const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

dotenv.config({ path: path.join(__dirname, "./config/config.env") });
connectDB();

app.use(express.json());

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const moviesRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/lists", listRoute);

port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
