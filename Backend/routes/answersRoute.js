const express = require("express");
const {
  createAnswer,
  getAnswers,
  getAnswersUser,
  deleteAnswer,
} = require("../controller/answersController");
const AuthMiddleWare = require("../middleware/AuthMiddleWare");

const router = express.Router();

// POST: Create an answer
router.post("/createAnswer",AuthMiddleWare, createAnswer);

// GET: Get all answers for a question
router.get("/allAnswers", getAnswers);
router.get("/:userId", getAnswersUser);
router.get("/:questionId", getAnswersUser);

router.delete("/deleteAnswer", deleteAnswer);

module.exports = router;
