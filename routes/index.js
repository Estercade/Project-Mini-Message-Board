const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const messages = [
    {
      id: uuidv4(),
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      id: uuidv4(),
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
];

router.get("/", async (req, res, next) => {
  res.render("index", { title: "Mini Messageboard", messages: messages, links: req.links })
  next();
})

router.post("/new", async (req, res) => {
  messages.push({ id: uuidv4(), text: req.body.messageText, user: req.body.messageUser, added: new Date() });
  res.redirect("/");
})

// retrieve and render message details
router.get("/messages/:messageId", async (req, res) => {
  let targetMessage = null;
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].id === req.params.messageId) {
      targetMessage = messages[i];
      break;
    }
  }
  res.render("messageDetails", { title: "View message details", message: targetMessage, links: req.links })
})

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
})

module.exports = router;