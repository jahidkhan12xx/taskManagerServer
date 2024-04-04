const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Authorization Failed" });
  }

  try {
    // Verify token using your secret key
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    req.userId = decoded._id; // Attach the decoded user information to the request object
    next(); // Call next middleware
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
