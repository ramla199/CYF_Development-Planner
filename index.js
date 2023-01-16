const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, "client/build")));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

// app.use(express.static(path.join(__dirname, 'build')));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// app.get("/", (req, res) => {
//   res.json({ message: "Hello World!" });
// });

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./client/build"));
// });

//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
