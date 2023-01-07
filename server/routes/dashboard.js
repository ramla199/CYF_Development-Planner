const router = require("express").Router();
const pool = require("../database");

router.get("/", async (req, res) => {
  try {
    // res.json(req.user);

    const user = await pool.query(
      "SELECT username FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

router.use("/feedbacks", require("./feedbacks"));

router.use("/messages", require("./messages"));

module.exports = router;
