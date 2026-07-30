import type { GeneratedThread } from '~/types/database'

interface GenerateRequestBody {
  raw_input: string
  framework?: string
  niche?: string
  tone?: string
  bio?: string
  user_id?: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<GenerateRequestBody>(event)

  if (!body || !body.raw_input?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing raw_input field',
    })
  }

  const rawInput = body.raw_input.trim()
  const framework = body.framework || 'unpopular_opinion'
  const tone = body.tone || 'practical'
  const niche = body.niche || 'technology'
  const bio = body.bio || ''
  let generatedText = ''

  try {
    const openai = useOpenAI()

    const systemPrompt = `Bạn là một chuyên gia sáng tạo nội dung Threads hàng đầu.
User Profile: Lĩnh vực=${niche}, Giọng văn=${tone}, Mô tả=${bio}.
Framework: ${framework}.

Nhiệm vụ: Viết 1 bài Threads hoàn chỉnh từ ý tưởng thô của user.

CẤU TRÚC CHUẨN THREADS:
1. HOOK (2 dòng đầu): Ngắn gọn, kích thích tò mò, tạo thói quen dừng đọc.
2. BODY: Trình bày nội dung chính, bài học, kinh nghiệm. Dùng câu ngắn xen kẽ câu dài.
3. CTA: Kêu gọi tương tác tự nhiên (Hỏi ý kiến / Kêu gọi chia sẻ).

QUY TẮC ANTI-AI HUMANIZER (BẮT BUỘC):
- KHÔNG dùng từ nối AI: "Tuy nhiên", "Hơn nữa", "Tóm lại", "Trong thế giới ngày nay", "Hãy khám phá", "Bên cạnh đó".
- Tối đa 2 emoji trong toàn bài.
- Giọng văn ${tone}: Viết như người thật đang trò chuyện, không hoa mỹ rỗng tuếch.
- Tối đa 250 từ.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Ý tưởng thô: ${rawInput}` },
      ],
      temperature: 0.7,
      max_tokens: 600,
    })

    generatedText = completion.choices[0]?.message?.content?.trim() || ''
  } catch (err: unknown) {
    console.warn('[Generate Thread API] OpenAI API fallback:', err)
    // Fallback local generator if OpenAI API fails or key is missing
    generatedText = generateFallbackThread(rawInput, framework, tone)
  }

  // Optionally save to Supabase if user_id provided
  let savedThread: GeneratedThread | null = null
  if (body.user_id) {
    try {
      const supabase = useSupabaseServer()
      if (supabase) {
        const { data } = await supabase
          .from('generated_threads')
          .insert({
            user_id: body.user_id,
            raw_input: rawInput,
            framework,
            generated_text: generatedText,
          })
          .select()
          .single()

        if (data) {
          savedThread = data as GeneratedThread
        }
      }
    } catch {
      // Ignore DB save error on fallback
    }
  }


  return {
    thread: savedThread || {
      id: 'local-' + Date.now(),
      user_id: body.user_id || 'anonymous',
      raw_input: rawInput,
      framework,
      generated_text: generatedText,
      edited_text: null,
      is_copied: false,
      created_at: new Date().toISOString(),
    },
  }
})

/**
 * Fallback local generator when OpenAI API is not available
 */
function generateFallbackThread(input: string, framework: string, tone: string): string {
  const tonePrefix = tone === 'friendly' ? 'Chào mọi người, ' : ''
  
  if (framework === 'unpopular_opinion') {
    return `${tonePrefix}Quan điểm trái chiều: ${input}\n\nĐa số mọi người đang tiếp cận vấn đề này sai cách. Họ tập trung vào ngọn mà quên mất gốc rễ.\n\nSau khi thử nghiệm thực tế, tôi nhận ra điều quan trọng nhất không phải làm nhiều hơn, mà là làm đúng thứ ngay từ đầu.\n\nBạn nghĩ sao về góc nhìn này? Đổ comment bên dưới nhé.`
  }

  if (framework === 'lesson_learned') {
    return `${tonePrefix}Sai lầm lớn nhất của tôi liên quan đến "${input}":\n\nTôi từng mất rất nhiều thời gian vì tự mày mò mà không hỏi người đi trước.\n\nBài học rút ra:\n1. Tập trung vào cốt lõi\n2. Đo lường kết quả liên tục\n3. Sửa sai ngay khi phát hiện\n\nĐừng mắc lại sai lầm này giống tôi.`
  }

  return `${tonePrefix}Ý tưởng về ${input}:\n\nĐây là câu chuyện và góc nhìn thực tế mà tôi muốn chia sẻ.\n\nNhiều người nghĩ khó, nhưng khi chia nhỏ ra từng bước thì mọi thứ trở nên đơn giản hơn nhiều.\n\nBạn có đang gặp vấn đề tương tự không?`
}
