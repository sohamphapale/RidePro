const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user.routes");
const { compare } = require("bcrypt");

app.get("/", (req, res) => {
  res.send("hello ");
});
app.use("/users", userRoutes);

module.exports = app;
