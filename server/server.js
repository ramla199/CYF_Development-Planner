const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const pool = require("./database");

//middleware

app.use(express.json()); //req.body
app.use(cors());

//ROUTES//

//test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//get all feedbacks (mentor dashboard)
app.get("/feedbacks", async (req, res) => {
  try {
    const allFeedbacks = await pool.query("SELECT * FROM feedbacks");
    res.json(allFeedbacks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

// get one feedback (mentor dashboard)
app.get("/feedbacks/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const feedback = await pool.query(
      "SELECT * FROM feedbacks WHERE feedback_id = $1",
      [id]
    );
    res.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

//insert feedback (mentor dashboard)

app.post("/feedbacks", async (req, res) => {
  try {
    // console.log(req.body);
    const { feedbackText } = req.body;
    const newEntry = await pool.query(
      "INSERT INTO feedbacks (feedback_text) VALUES ($1) RETURNING *",
      [feedbackText]
    );
    res.json(newEntry.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

//edit feedback (mentor dashboard)
app.put("/feedbacks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;
    const updateFeedback = await pool.query(
      "UPDATE feedbacks SET feedback_text = $1 WHERE feedback_id = $2",
      [feedback, id]
    );
    res.json("updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

//delete feedback (mentor dashboard)
app.delete("/feedbacks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;
    const deleteFeedback = await pool.query(
      "DELETE FROM feedbacks WHERE feedback_id= $1",
      [id]
    );
    res.json("deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

app.get("/messages", async (req, res) => {
  try {
    const allMessages = await pool.query("SELECT * FROM messages");
    res.json(allMessages.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

app.get("/messages/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const feedback = await pool.query(
      "SELECT * FROM messages WHERE message_id = $1",
      [id]
    );
    res.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

app.post("/messages", async (req, res) => {
  try {
    console.log(req.body);
    const { messageText } = req.body;
    const newMessage = await pool.query(
      "INSERT INTO messages (message_text) VALUES ($1) RETURNING *",
      [messageText]
    );
    res.json(newMessage.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

app.put("/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const updateFeedback = await pool.query(
      "UPDATE messages SET message_text = $1 WHERE message_id = $2",
      [message, id]
    );
    res.json("updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

app.delete("/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const deleteMessage = await pool.query(
      "DELETE FROM messages WHERE message_id= $1",
      [id]
    );
    res.json("deleted");
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
