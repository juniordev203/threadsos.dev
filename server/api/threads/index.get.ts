import type { GeneratedThread } from '~/types/database'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = query.user_id as string
  const framework = query.framework as string

  if (!userId) {
    return { threads: [] }
  }

  try {
    const supabase = useSupabaseServer()
    if (!supabase) return { threads: [] }

    let req = supabase
      .from('generated_threads')

      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (framework && framework !== 'all') {
      req = req.eq('framework', framework)
    }

    const { data, error } = await req

    if (error) {
      return { threads: [] }
    }

    return { threads: data as GeneratedThread[] }
  } catch {
    return { threads: [] }
  }
})
