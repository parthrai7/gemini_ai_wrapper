const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", (req, res) => {
  res.send("Namaste! Backend is running.");
});

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error(err);
    return "Error generating content.";
  }
};

app.post("/api/content", async (req, res) => {
  try {
    const { question } = req.body;
    const result = await generate(question);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
    console.log("Backend server is running on port 5000");
  });
  