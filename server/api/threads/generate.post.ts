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

    const frameworkInstructions: Record<string, string> = {
      unpopular_opinion: `Framework: UNPOPULAR OPINION (Quan điểm trái chiều)
- Câu 1: Đưa ra một quan điểm đi ngược lại với số đông hoặc phá vỡ niềm tin cũ.
- Câu 2-4: Giải thích TẠI SAO số đông lại sai, và thực tế (dựa trên kinh nghiệm) là gì.
- CTA: Đặt câu hỏi mở để người đọc tự suy ngẫm hoặc tranh luận.`,
      lesson_learned: `Framework: LESSON LEARNED (Bài học xương máu)
- Câu 1: Nói về một sai lầm lớn hoặc thất bại mà bạn đã trải qua.
- Câu 2-4: Nêu rõ 2-3 bài học đắt giá rút ra được từ sai lầm đó (viết dạng gạch đầu dòng ngắn).
- CTA: Lời khuyên chân thành để người khác không lặp lại sai lầm này.`,
      how_to: `Framework: HOW TO (Hướng dẫn từng bước)
- Câu 1: Chỉ ra một kết quả cụ thể mà người đọc muốn đạt được.
- Câu 2-5: Liệt kê 3 bước rõ ràng, ngắn gọn và cực kỳ thực tế để đạt được điều đó.
- CTA: Kêu gọi họ bắt đầu thực hiện ngay hôm nay.`,
      tool_stack: `Framework: TOOL STACK (Bộ công cụ)
- Câu 1: Giới thiệu vấn đề cần giải quyết và mồi nhử bằng công cụ.
- Câu 2-4: Chia sẻ 2-3 công cụ thực sự hữu ích, nêu rõ công dụng cốt lõi của từng cái (rất ngắn).
- CTA: Kêu gọi lưu lại bài viết hoặc hỏi họ đang dùng công cụ nào.`,
      before_after: `Framework: BEFORE & AFTER (Trước & Sau)
- Câu 1: Mô tả bức tranh tồi tệ hoặc khó khăn lúc trước (Before).
- Câu 2-3: Mô tả khoảnh khắc chuyển giao (turning point).
- Câu 4-5: Bức tranh tươi sáng hiện tại (After).
- CTA: Chia sẻ thông điệp truyền động lực.`,
      myth_busting: `Framework: MYTH BUSTING (Phá vỡ lầm tưởng)
- Câu 1: Nêu ra 1 "Sự thật giả dối" mà ngành nào cũng tin.
- Câu 2-4: Phơi bày sự thật bằng logic hoặc số liệu/kinh nghiệm thực tế.
- CTA: Kêu gọi mọi người thức tỉnh và thay đổi góc nhìn.`,
      personal_story: `Framework: PERSONAL STORY (Câu chuyện cá nhân)
- Câu 1: Mở đầu bằng một khoảnh khắc cụ thể, giàu cảm xúc trong quá khứ.
- Câu 2-4: Kể ngắn gọn hành trình vượt khó và bài học cốt lõi.
- CTA: Khuyến khích những ai đang ở hoàn cảnh tương tự.`
    }

    const fwInstruction = frameworkInstructions[framework] || frameworkInstructions['unpopular_opinion']

    const systemPrompt = `Bạn là một chuyên gia sáng tạo nội dung Threads hàng đầu (Top 1% Creator).
User Profile:
- Lĩnh vực: ${niche}
- Giọng văn: ${tone} (BẮT BUỘC tuân thủ đúng tone này, viết như người thật đang trò chuyện trên Threads).
- Giới thiệu bản thân: ${bio}

NHIỆM VỤ CỐT LÕI:
Viết 1 bài Threads ĐỘC LẬP dựa trên ý tưởng thô của user.

CẤU TRÚC BẮT BUỘC:
${fwInstruction}

QUY TẮC ANTI-AI (RẤT QUAN TRỌNG - NẾU VI PHẠM SẼ BỊ PHẠT):
1. TUYỆT ĐỐI KHÔNG dùng từ nối sáo rỗng của AI: "Tuy nhiên", "Hơn nữa", "Tóm lại", "Trong thế giới ngày nay", "Hãy nhớ rằng", "Thực tế là", "Bên cạnh đó", "Đừng ngần ngại", "Chìa khóa ở đây là", "Thử tưởng tượng".
2. KHÔNG bắt đầu bằng: "Dưới đây là bài viết của bạn", "Chào bạn", "Tuyệt vời". Đi thẳng vào HOOK của bài viết ngay lập tức.
3. Độ dài: Tối đa 250 từ. Viết câu ngắn, ngắt dòng liên tục cho dễ đọc trên mobile.
4. Emoji: Dùng tối đa 2 emoji cho toàn bộ bài. Không lạm dụng.
5. Giọng điệu: Viết tự nhiên, đời thường, hơi "đời" và sắc bén.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Ý tưởng thô: ${rawInput}\n\nHãy viết bài Threads ngay:` },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    generatedText = completion.choices[0]?.message?.content?.trim() || ''
    
    // Fallback in case OpenAI returns weird prefixes
    generatedText = generatedText.replace(/^Dưới đây là.*?:/i, '').trim()
  } catch (err: unknown) {
    console.warn('[Generate Thread API] OpenAI API fallback:', err)
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
