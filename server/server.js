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

app.get("/messages", async (req, res) => {
  try {
    const allUserMessages = await pool.query(
      "SELECT * FROM messages WHERE user_id = $1"
    );
    res.json(allUserMessages.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

//register route

app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
