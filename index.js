const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

//ROUTES//

// // Does this username exist?
// app.get("/auth/login/:email/:password", async (req, res) => {
//   try {
//     const { email, password } = req.params;
//     const theUser = await pool.query(
//       "SELECT * FROM users WHERE user_email = $1 AND user_password = $2",
//       [email, password]
//     );
//     res.status(200).json(theUser.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json("Server error: " + err.message);
//   }
// });

// // Does the user have any plans?
// // Ordered from the latest to the oldest
// app.get("/plans/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const thePlans = await pool.query(
//       `SELECT * FROM plans
//               WHERE username = $1
//               ORDER BY amended_timestamp DESC`,
//       [id]
//     );
//     res.json(thePlans.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json("Server error: " + err.message);
//   }
// });

// // Delete the plan
// app.delete("/plans/:id", async (req, res) => {
//   //res.send("DELETE Request Called");
//   try {
//     const { id } = req.params;
//     console.log(1000, id); // DG
//     const thePlan = await pool.query(
//       `DELETE FROM plans
//               WHERE plan_serial_id = $1
//               RETURNING *`,
//       [id]
//     );
//     res.json(thePlan.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json("Server error: " + err.message);
//   }
// });

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
