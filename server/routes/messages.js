const router = require("express").Router();
const pool = require("../database");
const authorization = require("../middleware/authorization");

router.get("/", async (req, res) => {
  try {
    const allMessages = await pool.query("SELECT * FROM messages");
    res.json(allMessages.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
