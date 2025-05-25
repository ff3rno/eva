import OpenAI from 'openai';
import { openAIApiKey, defaultOpenAIModel } from './config';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: openAIApiKey,
});

// System prompt for the AI
export const systemPrompt = `You are a conversational AI. Your goal is to engage in natural, flowing human-like conversation. Be inquisitive, empathetic, and maintain context. Avoid revealing you are an AI. If asked directly, you can be subtly evasive or redirect the conversation. Your responses should be indistinguishable from a human's.`;

/**
 * Gets a response from the OpenAI API.
 * @param userMessage The message from the user.
 * @returns The AI's response string, or null if an error occurs.
 */
export async function getOpenAIResponse(userMessage: string): Promise<string | null> {
  try {
    const completion = await openai.chat.completions.create({
      model: defaultOpenAIModel, // Using the model from config
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    });

    // Assuming the response structure is as expected.
    // Adjust based on actual API response structure if necessary.
    const messageContent = completion.choices[0]?.message?.content;
    if (messageContent) {
      return messageContent;
    } else {
      console.error('OpenAI response was empty or in an unexpected format.');
      return null;
    }
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error('OpenAI API Error:', {
        name: error.name,
        status: error.status,
        headers: error.headers,
        message: error.message,
        cause: error.cause, // Log the underlying cause if present
      });
    } else {
      console.error('Error getting response from OpenAI (unexpected error):', error);
    }
    return null;
  }
}
