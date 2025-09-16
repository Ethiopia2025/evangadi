const express = require("express");
const router = express.Router();

// import your controller functions
const {
  askQuestion,
  getAllQuestions,
  getSingleQuestion,
  deleteQuestion,
} = require("../controller/questionController");
const AuthMiddleWare = require("../middleware/AuthMiddleWare");

// POST /questions → create a new question
router.post("/askQuestion",AuthMiddleWare, askQuestion);

// GET /questions → get all questions
router.get("/allQuestions", getAllQuestions);

// GET /questions/:id → get one question by id
router.get("/:questionId", getSingleQuestion);

// POST /questions → create a new question
router.delete("/delete",  deleteQuestion);

module.exports = router;

