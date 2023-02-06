const router = require("express").Router();
const pool = require("../db");

//all user's feedbacks

router.get("/", async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT users.username, feedbacks.feedback_id, feedbacks.feedback_text FROM users LEFT JOIN feedbacks ON users.user_id = feedbacks.user_id WHERE users.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// get one feedback

router.get("/:id", async (req, res) => {
  const { feedbackId } = req.params;
  const selectedFeedback = await pool.query(
    // There should probably be an auth check here to make sure the user is allowed to see the particular feedback?
    "SELECT * FROM feedbacks WHERE feedback_id = $1",
    [feedbackId]
  );
  res.json(selectedFeedback.rows);
  try {
  } catch (err) {
    console.error(err.message);
  }
});

// insert feedback

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { feedbackText } = req.body;
    const newFeedback = await pool.query(
      "INSERT INTO feedbacks (user_id, feedback_text) VALUES ($1, $2) RETURNING *",
      [req.user.id, feedbackText]
    );

    res.json(newFeedback.rows[0]);
  } catch (err) {
    console.error(err.message);
    // Should probably respond with a 500 status too?
  }
});

//edit feedback
router.put("/:id", async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { feedbackText } = req.body;
    const updateFeedback = await pool.query(
      "UPDATE feedbacks SET feedback_text = $1 WHERE feedback_id = $2 AND user_id = $3 RETURNING *",
      [feedbackText, feedbackId, req.user.id]
    );

    if (updateFeedback.rows.length === 0) {
      return res.json("This feedback is not yours");
    }

    res.json("feedback updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

// delete feedback

router.delete("/:id", async (req, res) => {
  try {
    const { feedbackId } = req.params;

    const deleteFeedback = await pool.query(
      "DELETE FROM feedbacks WHERE feedback_id = $1 AND user_id = $2 RETURNING *",
      [feedbackId, req.user.id]
    );

    if (deleteFeedback.rows.length === 0) {
      return res.json("this feedback is not yours");
    }
    res.json("feedback deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
