
const express = require("express");
const router = express.Router();


const AuthMiddleWare = require("../middleware/AuthMiddleWare");
const { register, login,deleteUser, checkUser} = require("../controller/userController") 


router.post("/register", register );

router.post("/login", login);

router.delete("/deleteUser", deleteUser);

router.get("/check",AuthMiddleWare, checkUser);


module.exports = router




