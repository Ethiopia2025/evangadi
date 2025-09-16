const express = require("express");
const bcrypt = require("bcrypt");
const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken")
async function register(req, res) {
  const { userName, firstName, lastName, email, password } = req.body;

  if (!userName || !firstName || !lastName || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All fields are required" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT userName, userId FROM users WHERE userName = ? OR email = ?",
      [userName, email]
    );

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "User already registered" });
    }

    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Password must be at least 8 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (userName, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)",
      [userName, firstName, lastName, email, hashedPassword]
    );

    return res.status(StatusCodes.CREATED).json({ msg: "User registered" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
}


// async function login(req, res) {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400).json({ msg: "all fields must be filled" });
//   }
//   try {
//     const [user] = await dbConnection.query(
//       "SELECT userName, userid, password from  users where email = ?",

//       [email]
//     );
//     if (user.length == 0) {
//       return res.status(400).json({ msg: "invalid credential " });
//     } else res.json({ msg: "user existed" });
//     const isMatch = await bcrypt.compare(password, user[0].password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "wrong password" });
//     } else {
//       return res.json({ user });
//     }

//     const userName = user[0].userName;
//     const userId = user[0].userId;
//    const token = jwt.sign({userName,userId},"secret", {expire:"20d"});
//    return res.statues(400).json({msg:" user login successful",token})
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ msg: "something went wrong" });
//   }
// }
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields must be filled" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT userName, userId, password FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials or you are not registered" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const { userName, userId } = user[0];
    const token = jwt.sign({ userName, userId }, process.env.SECRET_KEY, {
      expiresIn: "20d",
    });

    return res.status(200).json({
      msg: "User login successful",
      token,
      userName, userId, email 
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

async function deleteUser(req, res) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ msg: "userId is required" });
  }

  try {
    // Step 1: Delete answers posted by the user
    await dbConnection.query("DELETE FROM answers WHERE userId = ?", [userId]);

    // Step 2: Delete questions created by the user
    await dbConnection.query("DELETE FROM questions WHERE userId = ?", 
      [ userId]);

    // Step 3: Delete the user
    const [result] = await dbConnection.query(
      "DELETE FROM users WHERE userId = ?",
      [userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({
      msg: "User and all related questions/answers deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ msg: "Server error" });
  }
}



function checkUser(req, res) {
  const userName = req.user.userName;
  const userId = req.user.userId;
  return res.status(StatusCodes.OK).json({ msg: "valid user", userName, userId });
}


module.exports = { register, login, checkUser, deleteUser };
