import { GoogleGenAI } from '@google/genai'

/**
 * Creates and returns a GoogleGenAI client configured with server-side API key.
 * Reads key securely from Nitro runtimeConfig.
 */
export function useGemini(): GoogleGenAI {
  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey

  if (!apiKey) {
    throw new Error(
      '[useGemini] Missing GEMINI_API_KEY. Check your .env file and runtimeConfig in nuxt.config.ts.',
    )
  }

  return new GoogleGenAI({ apiKey })
}
