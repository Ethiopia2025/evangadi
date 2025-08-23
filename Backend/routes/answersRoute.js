const express = require("express");
const {
  createAnswer,
  getAnswers,
  deleteAnswer,
} = require("../controller/answersController");
const AuthMiddleWare = require("../middleware/AuthMiddleWare");

const router = express.Router();

// POST: Create an answer
router.post("/createAnswer",AuthMiddleWare, createAnswer);

// GET: Get all answers for a question
router.get("/allAnswers", getAnswers);

router.delete("/deleteAnswer", deleteAnswer);

module.exports = router;
