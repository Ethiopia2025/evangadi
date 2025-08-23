const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function AuthMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authorization invalid" });
  }

 const token = authHeader.split(" ")[1];

  try {
    const {userName, userId} = jwt.verify(token, process.env.SECRET_KEY);
    // return res.status(StatusCodes.okay).json({ userName, userId });
    req.user = { userName, userId };
    next()
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authorization invalid" });
  }
}
module.exports = AuthMiddleWare;
