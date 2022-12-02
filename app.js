const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/books", router);

// static files
app.use(express.static(path.join(__dirname, "../Frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
});

dotenv.config({ path: "./config.env" });
const CONNECTION_STRING = process.env.MONGO_URL;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log("Connected"))
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

