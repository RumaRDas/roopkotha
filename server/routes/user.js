const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
  res.json({
    data: "Hit user API endpoint ...... ",
  });
});

module.exports = router;
