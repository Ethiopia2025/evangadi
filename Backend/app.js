require("dotenv").config(); // load .env
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

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
    await app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    // ✅ fixed variable name
    console.log("Database connection failed:", error.message);
  }
}
go();
