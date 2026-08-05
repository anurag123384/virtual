import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const geminiResponse = async (command, assistantName, userName) => {
  const prompt = `
You are an intelligent virtual assistant named "${assistantName || "Assistant"}".

The user's name is "${userName || "User"}".

Your task is to understand the user's command and ALWAYS respond ONLY with valid JSON.

Response format:

{
  "type":"general | google-search | youtube-search | youtube-play | get-time | get-date | get-day | get-month | calculator-open | instagram-open | facebook-open | weather-show",
  "userInput":"original user input",
  "response":"short response"
}

Rules:
1. Return ONLY JSON.
2. Never return markdown.
3. Never use \`\`\`.
4. Never explain anything.
5. Keep response under 25 words.

User Command:
${command}
`;

  try {
    const completion = await groq.chat.completions.create({
     model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error(error?.message || "Groq request failed");
  }
};

export default geminiResponse;