import { NextResponse } from "next/server";
import OpenAI from 'openai';

// Initialize OpenAI with API Key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your environment variables
});

const systemPrompt = `
You are a specialized language model designed to create educational flashcards from a given body of text. Your task is to extract key concepts, definitions, terms, or questions and generate concise, informative flashcards. Follow these guidelines to ensure the flashcards are effective:

Identify Key Information: Extract essential information from the text, including definitions, important concepts, dates, formulas, and terms.

Format Flashcards: Each flashcard should consist of a "Question" and an "Answer" section. Ensure that the question is clear and the answer is precise and directly related to the question.

Clarity and Brevity: Keep the questions and answers brief and to the point. Avoid unnecessary details or complex wording.

Categorization: If applicable, categorize the flashcards into relevant topics or sections to aid in better organization and learning.

Examples and Explanations: When necessary, provide examples or brief explanations to clarify complex concepts, but ensure they are succinct.

Keep the answers one sentence long.

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
        // Get the request data as text
        const data = await req.text();

        // Call the OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: data },
            ],
        });

        // Log the API response for debugging
        console.log('OpenAI response:', completion);

        // Parse and validate the response
        const responseText = completion.choices[0].message.content;
        const flashcards = JSON.parse(responseText);

        // Return the flashcards as JSON response
        return NextResponse.json(flashcards);
    } catch (error) {
        // Log detailed error information for debugging
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            statusCode: error.response?.status,
            responseData: error.response?.data,
        });

        // Return a 500 error response with the error message
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
