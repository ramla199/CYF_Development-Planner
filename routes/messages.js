const router = require("express").Router();
const pool = require("../db");
const authorize = require("../middleware/authorize");

// get all user messages
router.get("/", async (req, res) => {
  try {
    const { userId } = req.params;
    const allMessages = await pool.query(
      "SELECT * FROM messages WHERE user_id = $1",
      [userId]
    );
    res.json(allMessages.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

// get an individual message
router.get("/:id", async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await pool.query(
      "SELECT * FROM messages WHERE message_id = $1",
      [messageId]
    );
    res.json(message.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// insert a new message
router.post("/", async (req, res) => {
  try {
    const { messageText } = req.body;
    const newMessage = await pool.query(
      "INSERT INTO messages (message_text) VALUES ($1) RETURNING *",
      [messageText]
    );
    res.json(newMessage.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

//update a message
router.put("/:id", async (req, res) => {
  try {
    const { messageId } = req.params;
    const { message } = req.body;
    const updateMessage = await pool.query(
      "UPDATE messages SET message_text = $1 WHERE message_id=$2",
      [message, messageId]
    );
    res.json("updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("serevr error");
  }
});

//delete a message

router.delete("/:id", async (req, res) => {
  try {
    const { messageId } = req.params;
    const { message } = req.body;
    const deleteMessage = await pool.query(
      "DELETE FROM messages WHERE message_id = $1",
      [messageId]
    );
    res.json("deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
