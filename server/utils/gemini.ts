import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Creates and returns a GoogleGenerativeAI client configured with server-side API key.
 * Reads key securely from Nitro runtimeConfig.
 */
export function useGemini(): GoogleGenerativeAI {
  const config = useRuntimeConfig()
  const apiKey = config.geminiApiKey

  if (!apiKey) {
    throw new Error(
      '[useGemini] Missing GEMINI_API_KEY. Check your .env file and runtimeConfig in nuxt.config.ts.',
    )
  }

  return new GoogleGenerativeAI(apiKey)
}
