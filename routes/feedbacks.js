const router = require("express").Router();
const pool = require("../db");

// get all feedbacks
router.get("/", async (req, res) => {
  try {
    const { userId } = req.params;
    const allUserFeedbacks = await pool.query(
      "SELECT * FROM feedbacks WHERE user_id = $1",
      [userId]
    );
    res.json(allUserFeedbacks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

// get one feedback

router.get("/:id", async (req, res) => {
  const { feedbackId } = req.params;
  const selectedFeedback = await pool.query(
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
      "INSERT INTO feedbacks (feedback_text) VALUES ($1) RETURNING *",
      [feedbackText]
    );
    res.json(newFeedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

//edit feedback
router.put("/:id", async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { feedback } = req.body;
    const updateFeedback = await pool.query(
      "UPDATE feedbacks SET feedback_text = $1 WHERE feedback_id = $2",
      [feedback, feedbackId]
    );
    res.json("updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

// delete feedback

router.delete("/:id", async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { feedback } = req.body;
    const deleteFeedback = await pool.query(
      "DELETE FROM feedbacks WHERE feedback_id = $1",
      [feedbackId]
    );
    res.json("deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
