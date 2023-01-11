const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const pool = require("./database");
// const authorization = require("./middleware/authorization");

// Middleware

app.use(express.json()); //req.body
app.use(cors());

//ROUTES//

// Test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Does this username exist?
app.get("/auth/login/:email/:password", async (req, res) => {
  try {
    const { email, password } = req.params;
    const theUser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 AND user_password = $2", [email, password]
    );   
     res.status(200).json(theUser.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error: " + err.message);
  }
});

// Get all feedbacks (Mentor Dashboard)
app.get("/feedbacks", async (req, res) => {
  try {
    const allFeedbacks = await pool.query("SELECT * FROM feedbacks");
    res.json(allFeedbacks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error: " + err.message);
  }
});

// Get one feedback (Mentor Dashboard)
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
    res.status(500).json("Server error: " + err.message);
  }
});

// Insert feedback (Mentor Dashboard)

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
    res.status(500).json("Server error: " + err.message);
  }
});

// Edit feedback (Mentor Dashboard)
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
    res.status(500).json("Server error: " + err.message);
  }
});

// Delete feedback (Mentor Dashboard)
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
    res.status(500).json("Server error: " + err.message);
  }
});

app.get("/messages", async (req, res) => {
  try {
    const allMessages = await pool.query("SELECT * FROM messages");
    res.json(allMessages.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error: " + err.message);
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
    res.status(500).json("Server error: " + err.message);
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
    res.status(500).json("Server error: " + err.message);
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
    res.status(500).json("Server error: " + err.message);
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
    res.status(500).json("Server error: " + err.message);
  }
});


// Does the user have any plans?
// Ordered from the latest to the oldest
app.get("/plans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thePlans = await pool.query(
      `SELECT * FROM plans 
              WHERE username = $1
              ORDER BY amended_timestamp DESC`,
      [id]
    );
    res.json(thePlans.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error: " + err.message);
  }
});

// Delete the plan
app.delete("/plans/:id", async (req, res) => {
  //res.send("DELETE Request Called");
  try {
    const { id } = req.params;
    console.log(1000,id) // DG
    const thePlan = await pool.query(
      `DELETE FROM plans 
              WHERE plan_serial_id = $1
              RETURNING *`,
      [id]
    );
    res.json(thePlan.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error: " + err.message);
  }
});

// Register route

app.use("/auth", require("./routes/jwtAuth"));

// Dashboard route

app.use("/dashboard", require("./routes/dashboard"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
