require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoute = require("./routes/authRoute");
const sessionRoute = require("./routes/sessionRoute");
const questionRoute = require("./routes/questionRoute");

const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("./controllers/aiController");

const { protect } = require("./middlewares/authMiddleware");

const app = express();

/* ======================
   DATABASE CONNECTION
====================== */
connectDB();

/* ======================
   MIDDLEWARES
====================== */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* ======================
   ROOT ROUTE (FIXES Cannot GET /)
====================== */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Prepify API is running",
  });
});

/* ======================
   API ROUTES
====================== */
app.use("/api/auth", authRoute);
app.use("/api/session", sessionRoute);
app.use("/api/questions", questionRoute);

/* ======================
   AI ROUTES (CORRECT HTTP METHODS)
====================== */
app.post(
  "/api/ai/generate-questions",
  protect,
  generateInterviewQuestions
);

app.post(
  "/api/ai/generate-explanation",
  protect,
  generateConceptExplanation
);

/* ======================
   404 HANDLER
====================== */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/* ======================
   SERVER START
====================== */
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});