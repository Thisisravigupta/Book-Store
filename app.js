const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const cors = require("cors");
const path = require("path");

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


const CONNECTION_STRING = `mongodb+srv://admin:NJ9UTDqtVgS8H0xm@book-store.pjk1ced.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_STRING)
  .then(() => console.log("Connected"))
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
