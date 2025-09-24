require("dotenv").config();
const express = require("express");
const cors =  require('cors');

const PORT = process.env.PORT || 3000;  // ✅ use Render's PORT

const app = express();
app.use(
  cors({
    origin: "https://startling-pegasus-903308.netlify.app", // your Netlify URL
    credentials: true,
  })
);

//middleware to parse json data from request body
app.use(express.json());


//dbConnection
const db = require("./db/dbConfig");

//user routes middleware file
const userRoute = require("./routes/userRoute");

//question routes middleware file
const questionRoute = require("./routes/questionRoute");

//answer routes middleware file
const answersRoute = require("./routes/answersRoute");


//user routes middleware
app.use("/api/users", userRoute);

//questions routes middleware 
app.use("/api/question", questionRoute);

//answers routes middleware 
app.use("/api/answer", answersRoute);

// Test endpoint
app.get("/testing", (req, res) => {
  res.json({ 
    message: "Hello from Evangadi Backend!",
  });
});
async function start() {
  try {
    await db.execute("select 'test'");
    app.listen(PORT, "0.0.0.0", () => {
      console.log("✅ Database connection established");
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start:", error.message);
  }
}

// Global error logging (to see hidden crashes)
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

start();


// require("dotenv").config(); // load .env
// const express = require("express");
// const cors = require("cors");
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// const dbConnection = require("./db/dbConfig");
// const userRoutes = require("./routes/userRoute");
// const questionRoutes = require("./routes/questionRoute");
// const answersRoutes = require("./routes/answersRoute"); // ✅ fixed

// // Routes
// app.use("/api/answers", answersRoutes);
// app.use("/api/question", questionRoutes);
// app.use("/api/users", userRoutes);


// async function go() {
//   try {
//     const [result] = await dbConnection.execute("SELECT 'test'"); // ✅ fixed SQL
//     console.log("Database connection successful:", result);
//      app.listen(PORT, "0.0.0.0", () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     // ✅ fixed variable name
//     console.log("Database connection failed:", error.message);
//   }
// }
// go();
