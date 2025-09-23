require("dotenv").config(); // load .env
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.DB_PORT || 8000;

app.use(cors());
app.use(express.json());

const dbConnection = require("./db/dbConfig");
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const answersRoutes = require("./routes/answersRoute"); // ✅ fixed

// Routes
app.use("/api/answers", answersRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/users", userRoutes);


async function go() {
  try {
    const [result] = await dbConnection.execute("SELECT 'test'"); // ✅ fixed SQL
    console.log("Database connection successful:", result);
     app.listen(PORT, "0.0.0.0", () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    // ✅ fixed variable name
    console.log("Database connection failed:", error.message);
  }
}
go();
