import OpenAI from 'openai'

/**
 * Creates and returns an OpenAI client configured with server-side API key.
 * Reads key securely from Nitro runtimeConfig.
 */
export function useOpenAI(): OpenAI {
  const config = useRuntimeConfig()
  const apiKey = config.openaiApiKey

  if (!apiKey) {
    throw new Error(
      '[useOpenAI] Missing OPENAI_API_KEY. Check your .env file and runtimeConfig in nuxt.config.ts.',
    )
  }

  return new OpenAI({ apiKey })
}
