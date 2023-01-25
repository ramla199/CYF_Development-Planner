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
app.get("/port-value", function (request, result) {
  result.send(PORT);
});


// app.get("/*", function (req, res, next) {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   next();
// });


// Plans EndPoints - TODO: refactor through middleware - ./routes/dashboard


// Does the student have any plans?
// Return all the student's Plans - Ordered from the newest to the oldest
app.get("/plans/:username", async (request, result) => {
  try {
    const { username } = request.params;
    const thePlans = await pool.query(
      `SELECT * FROM plans 
              WHERE username = $1
              ORDER BY amended_timestamp DESC`,
      [username]
    );
    result.json(thePlans.rows);
  } catch (err) {
        console.error(err.message);
        result.status(500).json("Server error: " + err.message);
  }
});


// Fetch a 'Plan' record using the Plan Id
app.get("/planbyid/:id", async (request, result) => {
  try {
    const { id } = request.params;
    const thePlan = await pool.query(
      `SELECT * FROM plans 
              WHERE plan_serial_id  = $1`,
      [id]
    );
    result.json(thePlan.rows);
  } catch (err) {
        console.error(err.message);
        result.status(500).json("Server error: " + err.message);
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

    // Insert New 'Plan' Record
    const query = `INSERT INTO plans (username, created_timestamp,  amended_timestamp,
                                splan, mplan, aplan, rplan, tplan, preamble) 
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                                RETURNING *`;

    await pool.query(query, [username, created_timestamp, amended_timestamp,
                       splan, mplan, aplan, rplan, tplan, preamble]);
    result.status(200).send("New Plan written successfully.");
  } catch (error) {
            console.error(error.message);
            result.status(500).json("Server error: " + error.message);
  }
});


// Update a 'Plan' record
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


// Delete the plan
app.delete("/plans/:id", async (request, result) => {
  try {
    const { id } = request.params;
    await pool.query(
      `DELETE FROM plans 
              WHERE plan_serial_id = $1
              RETURNING *`,
      [id]
    );
    result.status(200).send("Plan record successfully deleted.");
  } catch (err) {
        console.error(err.message);
        result.status(500).json("Server error: " + err.message);
  }
});


// Mentors handling EndPoints 

// Select all the mentors
app.get("/mentors", async (request, result) => {
  try {
    const theMentors = await pool.query(
      `SELECT * FROM users 
              WHERE user_role = 'mentor'
              ORDER BY user_lname, user_fname`
    );
    result.json(theMentors.rows);
  } catch (err) {
          console.error(err.message);
          result.status(500).json("Server error: " + err.message);
  }
});


// Feedback Requests EndPoints 

// Get all the feedback requests for the current mentor
app.get("/feedback_requests/:username", async (request, result) => {
  try {
    const { username } = request.params;
    const feedback = await pool.query(
      `SELECT feedback_req_id, feedback_req_plan_serial_id,
              feedback_req_mentor_username,
              feedback_req_student_username, 
              feedback_req_timestamp,
              user_fname, user_lname, preamble 
                  FROM feedback_requests
                  INNER JOIN users 
                      ON feedback_req_student_username = users.username
                  INNER JOIN plans
                      ON feedback_req_plan_serial_id = plans.plan_serial_id
             WHERE feedback_req_mentor_username = $1 
             ORDER BY feedback_req_timestamp DESC`,
      [username]
    );
    result.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    result.status(500).json("Server error: " + err.message);
  }
});


// Write a 'Feedback Request' record
app.post("/feedback_requests/write", async (request, result) => {
  try {
    // Destructuring
    const { plan_serial_id, mentor_username, student_username, timestamp } =
      request.body;

    // Insert New Record
    const query = `INSERT INTO feedback_requests (feedback_req_plan_serial_id, 
                                                  feedback_req_mentor_username,
                                                  feedback_req_student_username, 
                                                  feedback_req_timestamp) 
                                VALUES ($1, $2, $3, $4)
                                RETURNING *`;

    await pool.query(query, [
      plan_serial_id,
      mentor_username,
      student_username,
      timestamp,
    ]); 
    result.status(200).send("Feedback Request record successfully written.");
  } catch (error) {
        console.error(error.message);
        result.status(500).json("Server error: " + error.message);
  }
});


// Delete the 'Feedback Request'
app.delete("/feedback_requests/:id", async (request, result) => {
  try {
    const { id } = request.params;
    await pool.query(
      `DELETE FROM feedback_requests 
              WHERE feedback_req_id = $1`,
      [id]
    );
    result.status(200).send("Feedback Request record successfully deleted.");
  } catch (err) {
    console.error(err.message);
    result.status(500).json("Server error: " + err.message);
  }
});


// Feedbacks EndPoints 

// Fetch a 'Feedback' record using the Feedback Id
app.get("/feedbacks/:id", async (request, result) => {
  try {
    const { id } = request.params;
    const theFeedback = await pool.query(
      `SELECT * FROM feedbacks
              WHERE feedback_id = $1`,
      [id]
    );
    result.json(theFeedback.rows);
  } catch (err) {
        console.error(err.message);
        result.status(500).json("Server error: " + err.message);
  }
});


// Get all the feedbacks that have been created by the current mentor but not yet sent
app.get("/feedbacks/notsent/:username", async (request, result) => {
  try {
    const { username } = request.params;
    const feedback = await pool.query(
      `SELECT feedback_id, feedback_plan_serial_id,
              feedback_mentor_username,
              feedback_student_username, 
              feedback_request_timestamp,
              user_fname, user_lname, preamble 
                  FROM feedbacks
                  INNER JOIN users 
                      ON feedback_student_username = users.username
                  INNER JOIN plans
                      ON feedback_plan_serial_id = plans.plan_serial_id
             WHERE feedback_mentor_username = $1 
               AND feedback_sent = 'no'
             ORDER BY feedback_request_timestamp DESC`,
      [username]
    );
    result.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    result.status(500).json("Server error: " + err.message);
  }
});


// Get all the feedbacks that have been sent to the current student
app.get("/feedbacks/sent/:username", async (request, result) => {
  try {
    const { username } = request.params;
    const feedback = await pool.query(
      `SELECT feedback_id, feedback_plan_serial_id,
              feedback_mentor_username,
              feedback_student_username,
              feedback_text, 
              feedback_request_timestamp,
              user_fname, user_lname, preamble 
                  FROM feedbacks
                  INNER JOIN users 
                      ON feedback_mentor_username = users.username
                  INNER JOIN plans
                      ON feedback_plan_serial_id = plans.plan_serial_id
             WHERE feedback_student_username = $1 
               AND feedback_sent = 'yes'
             ORDER BY feedback_request_timestamp DESC`,
      [username]
    );
    result.json(feedback.rows);
  } catch (err) {
    console.error(err.message);
    result.status(500).json("Server error: " + err.message);
  }
});


// Write a 'Feedback' record
app.post("/feedbacks/write", async (request, result) => {
  try {
    // Destructuring
    const {
      mentor_username,
      student_username,
      request_timestamp,
      sent_timestamp,
      feedbackText,
      thePlanSerialId,
      sent,
    } = request.body;

    // Insert New Record
    const query = `INSERT INTO feedbacks (feedback_mentor_username,
                                          feedback_student_username,
                                          feedback_request_timestamp, 
                                          feedback_sent_timestamp,
                                          feedback_text,
                                          feedback_plan_serial_id,
                                          feedback_sent) 
                                VALUES ($1, $2, $3, $4, $5, $6, $7)
                                RETURNING *`;

    await pool.query(query, [
      mentor_username,
      student_username,
      request_timestamp,
      sent_timestamp,
      feedbackText,
      thePlanSerialId,
      sent,
    ]); 
    result.status(200).send("Feedback record successfully written.");
  } catch (error) {
        console.error(error.message);
        result.status(500).json("Server error: " + error.message);
  }
});


// Update a 'Feedback' record
app.put("/feedbacks/updatefeedback", async (request, result) => {
  try {
    // Destructuring
    const {
      feedback_id,
      sentTimestamp,
      feedbackText,
      isSent,
    } = request.body;
    console.log(sentTimestamp);
    console.log(request.body)

    // Update Record
    const query = `UPDATE feedbacks
                          SET feedback_text = $1,
                              feedback_sent_timestamp = $2,
                              feedback_sent = $3
                          WHERE feedback_id = $4`; 

    pool.query(
      query,
      [
        feedbackText,
        sentTimestamp,
        isSent,
        feedback_id,
      ],
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
    result.status(200).send("Feedback updated.");
  } catch (error) {
          console.error(error.message);
          result.status(500).json("Server error: " + error.message);
  }
});


// Delete the 'Feedback'
app.delete("/feedbacks/:id", async (request, result) => {
  try {
    const { id } = request.params;
    await pool.query(
      `DELETE FROM feedbacks 
              WHERE feedback_id = $1`,
      [id]
    );
    result.status(200).send("Feedback record successfully deleted.");
  } catch (err) {
    console.error(err.message);
    result.status(500).json("Server error: " + err.message);
  }
});


// Routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", authorize, require("./routes/dashboard"));

// app.use("/feedbacks", require("./routes/feedbacks"));

// app.use("/messages", require("./routes/messages"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
