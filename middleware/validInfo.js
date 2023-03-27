module.exports = function (req, res, next) {
  const { fname, lname, email, username, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  // This seems like a slightly strange function? What's it for / trying to do? Why does it live in this file?
  if (req.path === "/register") {
    //  console.log(!email.length);
    //  console.log(req.body)
    // I don't see fname or lname defined anywhere?
    if (![fname, lname, username, email, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  }

  next();
};
