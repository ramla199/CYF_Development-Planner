const express = require("express");

const app = express();
const cors = require("cors");
const path = require("path");
const pool = require("./db");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "/client/build")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
