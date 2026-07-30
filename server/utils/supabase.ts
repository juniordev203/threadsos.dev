import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Creates and returns a Supabase client configured with server-side credentials.
 * Returns null if credentials are not configured, preventing 500 server crashes.
 */
export function useSupabaseServer(): SupabaseClient | null {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.supabaseServiceRoleKey || config.public.supabaseAnonKey

  if (!supabaseUrl || !supabaseKey) {
    console.warn('[useSupabaseServer] SUPABASE_URL or SUPABASE_KEY missing in environment.')
    return null
  }

  try {
    return createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  } catch (err) {
    console.warn('[useSupabaseServer] Failed to initialize Supabase client:', err)
    return null
  }
}
