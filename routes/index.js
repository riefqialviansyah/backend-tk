const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my API",
    github: "https://github.com/riefqialviansyah",
  });
});

router.use("/user", require("./userRoute"));
router.use("/product", require("./productRoute"));

module.exports = router;
