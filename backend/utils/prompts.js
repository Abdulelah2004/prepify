const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions,
) => `
You are an AI trained to generate technical interview questions and answers.

Tasks:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, add a small code block inside.
- Keep formatting very clean.
- Return a pure JSON array like:
[
  {
    "question": "Question here?",
    "answer": "Answer here."
  },
  ...
]

Important: Do NOT add any extra text. Only return valid JSON.
`;

const conceptExplainPrompt = (question) => `
You are a senior software engineer explaining a concept to a beginner developer.

Question:
"${question}"

Instructions:

1. Explain the concept clearly.
2. Keep the explanation between 80 and 140 words.
3. Code examples are optional.
4. If you include code, include ONLY ONE code snippet.
5. The code snippet MUST appear on its own lines using this exact Markdown format:

\`\`\`javascript
// example code
\`\`\`

6. Never write code inline inside a sentence.
7. Never write things like "Code Example: javascript const..."
8. Never generate more than one code block.

Return ONLY valid JSON:

{
  "title": "Short concept title",
  "explanation": "Explanation text with at most one fenced code block."
}

No text outside JSON.
`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };
