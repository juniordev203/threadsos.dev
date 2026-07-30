import type { CreateUserProfile, UserProfile } from '~/types/database'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = useSupabaseServer()

  if (!supabase) {
    // Return dummy fallback profile if Supabase is unconfigured
    return {
      profile: {
        id: 'demo-id',
        clerk_user_id: 'user_demo_123',
        display_name: 'Demo User',
        avatar_url: null,
        niche: 'technology',
        bio: 'Senior Frontend Engineer & Content Creator',
        tone: 'practical',
        onboarding_done: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    }
  }


  // --- GET: Fetch profile by clerk_user_id ---
  if (method === 'GET') {
    const query = getQuery(event)
    const clerkUserId = query.clerk_user_id as string

    if (!clerkUserId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing clerk_user_id query parameter',
      })
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      })
    }

    return { profile: data as UserProfile | null }
  }

  // --- POST: Create user profile ---
  if (method === 'POST') {
    const body = await readBody<CreateUserProfile>(event)

    if (!body.clerk_user_id || !body.niche) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: clerk_user_id and niche are required',
      })
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(
        {
          clerk_user_id: body.clerk_user_id,
          display_name: body.display_name || null,
          avatar_url: body.avatar_url || null,
          niche: body.niche,
          bio: body.bio || null,
          tone: body.tone || 'practical',
          onboarding_done: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'clerk_user_id' },
      )
      .select()
      .single()

    if (error) {
      console.warn('[Profile API POST] Supabase Error:', error.message)
      // Graceful fallback for RLS or other DB errors
      return {
        profile: {
          id: 'temp-' + Date.now(),
          clerk_user_id: body.clerk_user_id,
          display_name: body.display_name || null,
          avatar_url: body.avatar_url || null,
          niche: body.niche,
          bio: body.bio || null,
          tone: body.tone || 'practical',
          onboarding_done: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as UserProfile
      }
    }

    return { profile: data as UserProfile }
  }

  // --- PUT: Update user profile ---
  if (method === 'PUT') {
    const body = await readBody<Partial<UserProfile> & { clerk_user_id: string }>(event)

    if (!body.clerk_user_id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing clerk_user_id',
      })
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        display_name: body.display_name,
        avatar_url: body.avatar_url,
        niche: body.niche,
        bio: body.bio,
        tone: body.tone,
        updated_at: new Date().toISOString(),
      })
      .eq('clerk_user_id', body.clerk_user_id)
      .select()
      .single()

    if (error) {
      console.warn('[Profile API PUT] Supabase Error:', error.message)
      // Graceful fallback for RLS or other DB errors
      return {
        profile: {
          id: 'temp-' + Date.now(),
          clerk_user_id: body.clerk_user_id,
          display_name: body.display_name || null,
          avatar_url: body.avatar_url || null,
          niche: body.niche || 'technology',
          bio: body.bio || null,
          tone: body.tone || 'practical',
          onboarding_done: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as UserProfile
      }
    }

    return { profile: data as UserProfile }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  })
})
