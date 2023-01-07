const router = require("express").Router();
const pool = require("../database");
const authorization = require("../middleware/authorization");

//get all feedbacks (mentor dashboard)
router.get("/", async (req, res) => {
  try {
    const allFeedbacks = await pool.query("SELECT * FROM feedbacks");
    res.json(allFeedbacks.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

// get one feedback (mentor dashboard)
router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;
