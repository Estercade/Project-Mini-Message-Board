const express = require('express');
const router = express.Router();

router.use("/", (req, res, next) => {
  res.render("form", { title: "New Message", links: req.links })
  next();
})

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
})

module.exports = router;