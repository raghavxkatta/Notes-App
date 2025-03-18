import OpenAI from 'openai';
import dotenv from 'dotenv';
import process from 'process';
dotenv.config();

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;