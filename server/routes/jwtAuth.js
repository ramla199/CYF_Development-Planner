const router = require("express").Router();
const pool = require("../database");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//register new user
router.post("/register", validInfo, async (req, res) => {
  try {
    // 1. destructure the req.body (name, email, password)
    const { fname, lname, username, email, password, role } = req.body;
    console.log(fname, lname, username, password, email, role);

    // 2. check if user exists (if user exists throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email= $1", [
      email,
    ]);

    // res.json(user.rows);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    // // 3. bcrypt the user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. insert new user inside the database

    const newUser = await pool.query(
      "INSERT INTO users (user_fname, user_lname, username, user_email, user_password, user_role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [fname, lname, username, email, bcryptPassword, role]
    );
    // res.json(newUser.rows);

    // 5. generate jwt token

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// //login route

router.post("/login", validInfo, async (req, res) => {
  try {
    // 1. destructure the req.body

    const { email, password } = req.body;

    //     // 2. check if user doesn't exist (if not then throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Credentials incorrect");
    }
    // res.json(user.rows);

    // 3. check if incoming password is the same as the database password

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    //returns boolean
    // console.log(validPassword);

    // res.json(user.rows);
    if (!validPassword) {
      return res.status(401).json("credentials incorrect");
    }

    // 4. generate jwt token

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//verify the user
router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
