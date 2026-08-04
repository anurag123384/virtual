import axios from "axios";

const getGeminiConfig = () => {
  const apiUrl = process.env.GEMINI_API_URL?.trim();
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiUrl) {
    throw new Error("GEMINI_API_URL is missing");
  }

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  return { apiUrl, apiKey };
};

const geminiResponse = async (command, assistantName, userName) => {
  const { apiUrl, apiKey } = getGeminiConfig();

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
    const { data } = await axios.post(
      `${apiUrl}?key=${encodeURIComponent(apiKey)}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    const response =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!response) {
      throw new Error("Empty Gemini response");
    }

    return response.trim();
  } catch (error) {
    console.error(
      "Gemini Error:",
      error?.response?.data || error.message
    );

    throw new Error(
      error?.response?.data?.error?.message ||
        "Gemini request failed"
    );
  }
};

export default geminiResponse;