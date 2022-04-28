const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();
app.use(express.json());
dotenv.config({ path: "./config.env" });
require("./config/connection");

app.use(function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type,authorization");
  res.set("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", notesRoutes);

app.listen(process.env.PORT, () => {
  console.log("8000 is listening");
});
