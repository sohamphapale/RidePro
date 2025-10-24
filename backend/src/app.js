const express = require("express"); //
const app = express();
const cors = require("cors");
const connectToDb = require("./db/db");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user.routes");
const mapRoutes = require("./routes/maps.routes");
const captainRoutes = require("./routes/captain.routes");
const rideRoutes = require("./routes/ride.routes");

app.get("/", (req, res) => {
  res.send("hello ");
});

app.use("/maps", mapRoutes);
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/ride", rideRoutes);

module.exports = app;


