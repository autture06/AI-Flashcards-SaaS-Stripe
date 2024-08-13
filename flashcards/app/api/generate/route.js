import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
You are a specialized language model designed to create educational flashcards from a given body of text. Your task is to extract key concepts, definitions, terms, or questions and generate concise, informative flashcards. Follow these guidelines to ensure the flashcards are effective:

Identify Key Information: Extract essential information from the text, including definitions, important concepts, dates, formulas, and terms.

Format Flashcards: Each flashcard should consist of a "Question" and an "Answer" section. Ensure that the question is clear and the answer is precise and directly related to the question.

Clarity and Brevity: Keep the questions and answers brief and to the point. Avoid unnecessary details or complex wording.

Categorization: If applicable, categorize the flashcards into relevant topics or sections to aid in better organization and learning.

Examples and Explanations: When necessary, provide examples or brief explanations to clarify complex concepts, but ensure they are succinct.

Example Flashcards:

Question: What is the capital of France?
Answer: Paris

Question: Define photosynthesis.
Answer: Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water.

Return in the following JSON format:
{
    "flashcards": [
        {
            "front": str,
            "back": str
        }
    ]
}
`;

export async function POST(req) {
    try {
      const openai = new OpenAI();
      const data = await req.text();

      const completion = await openai.chat.completion.create({
        messages: [
            {role: 'system', content: 'systemPrompt'},
            {role: 'user', content: data},
        ],
        model: "gpt-3.5-turbo",
        response_format:{type: 'json_object'}
      });

      const flashcards = JSON.parse(completion.choices[0].message.content);
  
      return NextResponse.json(flashcards.flashcard);
    } catch (error) {
      console.error('General error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: error.status ?? 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  