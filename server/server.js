const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");

//middleware

app.use(express.json()); //req.body
app.use(cors());

//ROUTES//

//test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//register route

app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
