import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Creates and returns a Supabase client configured with server-side credentials.
 * Uses `useRuntimeConfig()` to read env variables securely from Nitro runtime.
 *
 * @example
 * ```ts
 * // In a server route: server/api/threads.get.ts
 * export default defineEventHandler(async () => {
 *   const client = useSupabaseServer()
 *   const { data } = await client.from('generated_threads').select('*')
 *   return data
 * })
 * ```
 */
export function useSupabaseServer(): SupabaseClient {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.supabaseServiceRoleKey

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      '[useSupabaseServer] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. ' +
      'Check your .env file and runtimeConfig in nuxt.config.ts.',
    )
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
