const router = require("express").Router();
const pool = require("../db");

//all user's feedbacks

router.get("/", async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

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

// get all feedbacks

// router.get("/", async (req, res) => {
//   try {
//     const allUserFeedbacks = await pool.query(
//       "SELECT * FROM feedbacks WHERE user_id = $1",
//       [req.user.id]
//     );
//     res.json(allUserFeedbacks.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json("server error");
//   }
// });

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
    // console.log(req.body);
    const { feedbackText } = req.body;
    const newFeedback = await pool.query(
      "INSERT INTO feedbacks (user_id, feedback_text) VALUES ($1, $2) RETURNING *",
      [req.user.id, feedbackText]
    );

    res.json(newFeedback.rows[0]);
  } catch (err) {

        console.error(err.message);
        res.status(500).json("server error");

  }
});

//edit feedback
router.put("/:id", async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { feedbackText } = req.body;
    const updateFeedback = await pool.query(
      "UPDATE feedbacks SET feedback_text = $1 WHERE feedback_id = $2 AND user_id = $3",
      [feedbackText, feedbackId, req.user.id]
    );
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
    res.json("feedback deleted");
  } catch (err) {
        console.error(err.message);
  }
});

module.exports = router;
