const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection success!");
});

//User router
const userRouter = require("./routes/user.js");
app.use("/user", userRouter);

//Achievements router
const achievementsRouter = require("./routes/achievements.js");
app.use("/achievements", achievementsRouter);



const physicalStandardsRouter = require("./routes/physicalStandards.js");
app.use("/physicalStandards", physicalStandardsRouter);



const port = process.env.PORT || 5000;

app.listen(port, (error) => {
  console.log(`Server running on port ${port}`);
});
