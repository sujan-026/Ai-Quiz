import Together from "together-ai";

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};

const together = new Together({
  apiKey: "9961a879648a62e8418f43e2a70ce28046f652894e2924a1c1e5d030beafaf16"
});

export const generateQuizQuestions = async (
  category: string,
  level: number
): Promise<QuizQuestion[]> => {
  const systemPrompt = `When creating a quiz, begin by carefully interpreting the category to establish the appropriate scope and context for your questions. Next, tailor the difficulty so it grows progressively—from fundamental, Level 1 questions that test basic knowledge, through Level 2 items requiring analysis and application, to Level 3 prompts demanding critical thinking and in-depth understanding. Generate ten engaging, accurate questions that employ a mix of formats—multiple choice, true/false, and open-ended—to appeal to diverse learning styles, and ensure each question's difficulty increases as the user advances. For each item, provide a clear, concise answer, including explanations or justifications where the content is complex. Maintain a consistent style and format throughout, avoid bias, and be culturally sensitive; consider enriching the experience with multimedia elements such as images or videos where appropriate. Finally, present the complete question set alongside their answers and clearly indicate the overall difficulty level based on the user's score and progression.

You are also a quiz generator. Given a subject category and a difficulty level (1=basic, 2=intermediate, 3=advanced), produce exactly 10 *distinct* questions in JSON array form. **Do not repeat the same question or concept**, and do not simply rephrase—each must cover a different fact or idea. Each question object must have:
  - "question": string
  - "options": array of 4 strings
  - "correctAnswer": integer index (0-3)
  - optional "explanation": string for why the answer is correct

Output only valid JSON, for example:

[
  {
    "question": "…",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 2,
    "explanation": "…"
  },
  …
]
`;

  const userPrompt = `Category: ${category}
Level: ${level}

Generate 10 quiz questions accordingly.`;

  const resp = await together.chat.completions.create({
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    stream: false,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user",   content: userPrompt },
    ],
  });

  const jsonText = resp.choices[0]?.message?.content?.trim();
  if (!jsonText) {
    throw new Error("No content returned from AI");
  }

  try {
    const questions = JSON.parse(jsonText) as QuizQuestion[];
    if (questions.length !== 10) {
      console.warn(`Expected 10 questions, but got ${questions.length}`);
    }
    return questions;
  } catch (err) {
    console.error("Failed to parse quiz JSON:", jsonText);
    throw new Error("Invalid JSON format returned by AI");
  }
};
