import { GoogleGenAI } from "@google/genai";
// import { GEMINI_MODEL_NAME } from '../constants'; // No longer used here

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY is not defined. Gemini API features will be unavailable.");
}

// The generateStory function is not used in the new StoryTime top page.
// It's kept here structurally but won't be called by the main App.
// If story generation features are added later, this can be reimplemented.
export const generateStory = async (prompt: string): Promise<string> => {
  console.warn("generateStory is called but not implemented for the current view.");
  if (!ai) {
    // throw new Error("Gemini API client is not initialized. Is the API_KEY configured correctly?");
    return Promise.reject("Gemini API client is not initialized.");
  }
  if (!prompt) {
    return Promise.reject("Prompt cannot be empty.");
  }
  // Placeholder: In a real scenario, you might want to return a specific message
  // or handle this according to how other parts of the app might (not) use it.
  return Promise.resolve("Story generation is not active in this view.");
};
