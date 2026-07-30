import type { GeneratedThread } from '~/types/database'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing thread ID',
    })
  }

  const supabase = useSupabaseServer()

  // --- GET: Fetch single thread ---
  if (method === 'GET') {
    const { data, error } = await supabase
      .from('generated_threads')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Thread not found',
      })
    }

    return { thread: data as GeneratedThread }
  }

  // --- PUT: Update thread (edited_text or is_copied) ---
  if (method === 'PUT') {
    const body = await readBody<Partial<GeneratedThread>>(event)

    const { data, error } = await supabase
      .from('generated_threads')
      .update({
        edited_text: body.edited_text,
        is_copied: body.is_copied,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      })
    }

    return { thread: data as GeneratedThread }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  })
})
