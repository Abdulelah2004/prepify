const axios = require("axios");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

const DEEPSEEK_API_BASE_URL = "https://api.deepseek.com/v1";
const DEEPSEEK_MODEL = "deepseek-chat";

/*
====================================================
PERMANENT LLM-SAFE JSON PARSER
Handles ALL real-world AI formatting problems:
- ```json blocks
- markdown fences
- extra explanations
- invisible characters
- text before/after JSON
====================================================
*/
function parseStrictJSON(text) {
  if (!text) {
    throw new Error("Empty AI response");
  }

  try {
    let cleaned = text;

    // Remove markdown code blocks
    cleaned = cleaned
      .replace(/```json\s*/gi, "")
      .replace(/```/g, "")
      .trim();

    // Locate JSON start
    const firstObject = cleaned.indexOf("{");
    const firstArray = cleaned.indexOf("[");

    let start =
      firstObject === -1
        ? firstArray
        : firstArray === -1
        ? firstObject
        : Math.min(firstObject, firstArray);

    // Locate JSON end
    const lastObject = cleaned.lastIndexOf("}");
    const lastArray = cleaned.lastIndexOf("]");

    let end = Math.max(lastObject, lastArray);

    if (start === -1 || end === -1) {
      throw new Error("No JSON detected in AI response");
    }

    // Extract only JSON portion
    cleaned = cleaned.substring(start, end + 1);

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("\n========== RAW AI RESPONSE ==========\n");
    console.error(text);
    console.error("\n=====================================\n");
    throw new Error("AI did not return valid JSON.");
  }
}

// ===============================
// Generate Interview Questions
// ===============================
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await axios.post(
      `${DEEPSEEK_API_BASE_URL}/chat/completions`,
      {
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: "system",
            content:
              "Return ONLY valid JSON. No markdown. No explanations. JSON must be directly parsable.",
          },
          { role: "user", content: prompt },
        ],
        stream: false,
        max_tokens: 2500,
        temperature: 0.3,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
      }
    );

    const rawText = response?.data?.choices?.[0]?.message?.content;

    const data = parseStrictJSON(rawText);

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "DeepSeek generateInterviewQuestions error:",
      error.message
    );
    return res.status(500).json({
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

// ===============================
// Generate Concept Explanation
// ===============================
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await axios.post(
      `${DEEPSEEK_API_BASE_URL}/chat/completions`,
      {
        model: DEEPSEEK_MODEL,
        messages: [
          {
            role: "system",
            content:
              "Return ONLY valid JSON. No markdown. No explanations. JSON must be directly parsable.",
          },
          { role: "user", content: prompt },
        ],
        stream: false,
        max_tokens: 1500,
        temperature: 0.3,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
      }
    );

    const rawText = response?.data?.choices?.[0]?.message?.content;

    const data = parseStrictJSON(rawText);

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "DeepSeek generateConceptExplanation error:",
      error.message
    );
    return res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};