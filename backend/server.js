require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const cors = require("cors");
app.use(cors({
  origin: "*" // allow frontend requests
}));