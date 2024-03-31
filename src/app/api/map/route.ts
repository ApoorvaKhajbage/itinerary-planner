import OpenAI, { ClientOptions } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY!; // Provide a default value for OPENAI_API_KEY

const openai = new OpenAI(apiKey as ClientOptions); // Cast apiKey to ClientOptions

export default async function handler(req: any, re: any) {
try {
    const gpt4Completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: "You only return in json a coordinates key with a value in this format {43."
            }
        ]
    })
} catch (error:any) {
    
}

}
