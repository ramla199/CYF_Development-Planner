const router = require("express").Router();
const pool = require("../db");

// get all user messages
router.get("/", async (req, res) => {
  try {
    const allMessages = await pool.query(
      "SELECT users.username, messages.message_id, messages.message_text FROM users LEFT JOIN messages ON users.user_id = messages.user_id WHERE users.user_id = $1",
      [req.user.id]
    );
    res.json(allMessages.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

// get a message
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

// insert a message
router.post("/", async (req, res) => {
  try {
    const { messageText } = req.body;
    const newMessage = await pool.query(
      "INSERT INTO messages (user_id, message_text) VALUES ($1, $2) RETURNING *",
      [req.user.id, messageText]
    );
    res.json(newMessage.rows[0]);
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
      "UPDATE messages SET message_text = $1 WHERE message_id=$2 AND user_id = $3",
      [message, messageId, req.user.id]
    );
    res.json(" message updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

//delete a message

router.delete("/:id", async (req, res) => {
  try {
    const { messageId } = req.params;
    const { message } = req.body;
    const deleteMessage = await pool.query(
      "DELETE FROM messages WHERE message_id = $1 AND user_id = $2 RETURNING *",
      [messageId, req.user.id]
    );
    res.json("deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
