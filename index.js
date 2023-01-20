const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const authorize = require("./middleware/authorize");
const PORT = process.env.PORT || 5000;
const pool = require("./db.js");

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

// I need the current value of the port number
// So I retrieve it at the point that Login is successful
// It will be stored in local-storage for the usage of Plans and Feedbacks
app.get("/port-value", function (req, res) {
  res.send(PORT);
});

// app.get("/*", function (req, res, next) {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   next();
// });

// Plans EndPoints - Later, will refactor through middleware - ./routes/dashboard

// Does the user have any plans?
// Ordered from the newest to the oldest
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
  try {
    const { id } = req.params;
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

// Write a new plan
app.post("/plans/writeplan", async (request, result) => {
  try {
    // Destructuring
    const {
      username,
      created_timestamp,
      amended_timestamp,
      splan,
      mplan,
      aplan,
      rplan,
      tplan,
      preamble,
    } = request.body;

    // Insert New Record
    const query = `INSERT INTO plans (username, created_timestamp,  amended_timestamp,
                                splan, mplan, aplan, rplan, tplan, preamble) 
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                                RETURNING *`;

    const newPlan = await pool.query(query, [username, created_timestamp, amended_timestamp,
                       splan, mplan, aplan, rplan, tplan, preamble]); 
    result.json(newPlan.rows);
  } catch (error) {
            console.error(error.message);
            result.status(500).json("Server error: " + error.message);
  }
});

// Update a plan
app.put("/plans/updateplan", async (request, result) => {
  try {
    // Destructuring
    const {
      username,
      created_timestamp,
      amended_timestamp,
      splan,
      mplan,
      aplan,
      rplan,
      tplan,
      preamble,
    } = request.body;

    // Update Record
    const query = `UPDATE plans
                          SET amended_timestamp = $1,
                          splan = $2, mplan = $3, aplan = $4, rplan = $5, tplan = $6,
                              preamble = $7
                          WHERE username = $8 and created_timestamp = $9`; 

    pool.query(
      query,
      [
        amended_timestamp,
        splan,
        mplan,
        aplan,
        rplan,
        tplan,
        preamble,
        username,
        created_timestamp,
      ],
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
    result.status(200).send("Plan updated.");
  } catch (error) {
          console.error(error.message);
          result.status(500).json("Server error: " + error.message);
  }
});


app.get("/mentors", async (req, res) => {
  try {
    const theMentors = await pool.query(
      `SELECT * FROM users 
              WHERE user_role = 'mentor'
              ORDER BY user_lname, user_fname`
    );
    res.json(theMentors.rows);
  } catch (err) {
          console.error(err.message);
          res.status(500).json("Server error: " + err.message);
  }
});


// Get all the feedback requests for the current mentor
app.get("/feedback_requests/:id", async (req, res) => {
  try {
    const { id } = req.params;


    console.log(id, req.params)
    const feedback = await pool.query(
      `SELECT * FROM feedback_requests 
             WHERE username = $1
             ORDER BY created_timestamp DESC`,
      [id]
    );
    res.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error: " + err.message);
  }
});


// Write a feedback request
app.post("/feedback_requests/write", async (request, result) => {
  try {
    // Destructuring
    const { plan_serial_id, user_id, requester_username, mentor_username, timestamp } =
      request.body;

    // Insert New Record
    const query = `INSERT INTO feedback_requests (feedback_req_plan_serial_id, 
                                                  feedback_req_requester_username,
                                                  feedback_req_mentor_username, 
                                                  feedback_req_timestamp) 
                                VALUES ($1, $2, $3, $4)
                                RETURNING *`;

    const newRequest = await pool.query(query, [
      plan_serial_id,
      requester_username,
      mentor_username,
      timestamp,
    ]); 
    result.json(newRequest.rows);
  } catch (error) {
        console.error(error.message);
        result.status(500).json("Server error: " + error.message);
  }
});


//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", authorize, require("./routes/dashboard"));

// app.use("/feedbacks", require("./routes/feedbacks"));

// app.use("/messages", require("./routes/messages"));
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
