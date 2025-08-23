const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

// POST - ask question
async function askQuestion(req, res) {
  const { userId, title, description, tag } = req.body;

  if (!userId || !title || !description) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const questionId = uuidv4();

      const [existing] = await dbConnection.query(
          "SELECT * FROM questions WHERE userId = ?  OR title = ?",
          [userId, title]
        );
    
        if (existing.length > 0) {
          return res.status(409).json({ msg: "Question already exists" }); // 409 Conflict
        }

   const [result ] = await dbConnection.query(
      "INSERT INTO questions (questionId, userId, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionId, userId, title, description, tag]
    );

    return res.status(201).json({ msg: "Question created successfully", questionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}

// GET - all questions
async function getAllQuestions(req, res) {
  try {
    const [rows] = await dbConnection.query(
      "SELECT * FROM questions ORDER BY id DESC"
    );
     if (rows.length === 0)
       return res.status(404).json({ msg: "Questions not found" });
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
   return res.status(500).json({ msg: "Server error" });
  }
}

// GET - single question
async function getSingleQuestion(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await dbConnection.query(
      "SELECT * FROM questions WHERE id = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ msg: "Question not found" });
   return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
   return res.status(500).json({ msg: "Server error" });
  }
}


async function deleteQuestion(req, res) {
  const { questionId} = req.body;

  try {
    // First delete all answers linked to this question (or user's questions)
    await dbConnection.query("DELETE FROM answers WHERE questionId = ?", [
      questionId,
    ]);

    // Now delete the question
    await dbConnection.query(
      "DELETE FROM questions WHERE questionId = ?",
      [questionId]
    );

   return res.status(200).json({ msg: "Question and related answers deleted" });
  } catch (error) {
    console.error("Error deleting question:", error);
   return res.status(500).json({ msg: "Server error", error });
  }
}




module.exports = {
  askQuestion,
  getAllQuestions,
  getSingleQuestion,
  deleteQuestion,
};

// // controllers/question.js
// const dbConnection = require("../db/dbConfig");
// const { v4: uuidv4 } = require("uuid");

// async function askQuestion(req, res) {
//   const { userId, title, description, tag } = req.body;

//   if (!userId || !title || !description) {
//     return res.status(400).json({ msg: "All fields are required" });
//   }
//   try {
//   const questionId = uuidv4();

//     const [result] = await dbConnection.query(
//       "INSERT INTO questions (userId, title, description, tag) VALUES (?, ?, ?, ?)",
//       [userId, title, description, tag]
//     );

//    return res.status(201).json({
//       msg: "Question posted successfully",
//        questionId,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Something went wrong" });
//   }
// }

// module.exports = { askQuestion };

// // function login(req, res) {
// //   res.send("login");
// // }

// // function checkUser(req, res) {
// //   res.send("checkUser");
// // }

// // module.exports = { register, login, checkUser };
