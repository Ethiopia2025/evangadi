const dbConnection = require("../db/dbConfig");

// Function to create an answer
async function createAnswer(req, res) {
  const { userId, questionId, answer } = req.body;

  if (!userId || !questionId || !answer) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Optional: Check if the answer already exists (if you want uniqueness per user & question)
    const [existing] = await dbConnection.query(
      "SELECT * FROM answers WHERE userId = ? AND questionId = ?",
      [userId, questionId]
    );

    if (existing.length > 0) {
      return res.status(409).json({ msg: "Answer already exists" }); // 409 Conflict
    }

    // Insert new answer
    const [result] = await dbConnection.query(
      "INSERT INTO answers (userId, questionId, answer) VALUES (?, ?, ?)",
      [userId, questionId, answer]
    );

    return res.status(201).json({
      msg: "Answer submitted successfully",
      answerId: result.insertId, // return new answerId
    });
  } catch (error) {
    console.error("Error creating answer:", error);
    res.status(500).json({ msg: "Server error" });
  }
}



// Function to get answers for a question
async function getAnswers(req, res) {
  try {
    const [answers] = await dbConnection.query(
      "SELECT * FROM answers ORDER BY answerId DESC"
    );

    return res.status(200).json({ answers });

   
  } catch (error) {
    console.error("Error fetching answers:", error);
    return res.status(500).json({ msg: "Server error" });
  }
}

 async function deleteAnswer(req, res) {
   const { answerId} = req.body;

   if (!answerId) {
     return res.status(400).json({ msg: "answerId and userId are required" });
   }

   try {
     // Check if answer exists and belongs to the user
     const [answer] = await dbConnection.query(
       "SELECT * FROM answers WHERE answerId = ?",
       [answerId]
     );

     if (answer.length === 0) {
       return res.status(404).json({ msg: "Answer not found" });
     }

     // Delete the answer
     await dbConnection.query(
       "DELETE FROM answers WHERE answerId = ?",
       [answerId]
     );

    return res.status(200).json({ msg: "Answer deleted successfully" });
   } catch (error) {
     console.error("Error deleting answer:", error);
    return res.status(500).json({ msg: "Server error" });
   }
 }

module.exports = { createAnswer, getAnswers, deleteAnswer };
