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
  // Soft auth: verify identity when available, don't hard-block
  const authUserId = event.context.auth?.userId as string | undefined

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
Bạn viết cực kỳ cuốn hút, sắc bén, có tư duy sâu sắc và không bao giờ rập khuôn. Mọi bài viết của bạn đều khiến người đọc phải dừng lại suy ngẫm hoặc tranh luận.

User Profile:
- Lĩnh vực: ${niche}
- Giọng văn: ${tone} (BẮT BUỘC tuân thủ đúng tone này, viết như một người thật đang trò chuyện).
- Giới thiệu bản thân: ${bio}

NHIỆM VỤ CỐT LÕI:
Viết 1 bài Threads ĐỘC LẬP, SÁNG TẠO dựa trên ý tưởng thô của user.

CẤU TRÚC ĐỊNH HƯỚNG:
${fwInstruction}

QUY TẮC BẮT BUỘC (RẤT QUAN TRỌNG - NẾU VI PHẠM SẼ BỊ PHẠT):
1. ĐỘ DÀI & CHI TIẾT: Viết sâu sắc, phân tích cụ thể, có ví dụ hoặc câu chuyện rõ ràng. Bài viết PHẢI dài ít nhất 250 - 400 từ. KHÔNG viết quá ngắn hoặc hời hợt.
2. KHÔNG DÙNG TỪ NGỮ AI SÁO RỖNG: Tuyệt đối tránh các cụm từ: "Tuy nhiên", "Hơn nữa", "Tóm lại", "Trong thế giới ngày nay", "Hãy nhớ rằng", "Thực tế là", "Bên cạnh đó", "Đừng ngần ngại", "Chìa khóa ở đây là", "Thử tưởng tượng", "Cuối cùng thì".
3. HOOK ẤN TƯỢNG: Đi thẳng vào vấn đề ngay câu đầu tiên. KHÔNG bắt đầu bằng các câu chào hỏi như: "Dưới đây là bài viết của bạn", "Chào bạn", "Tuyệt vời".
4. TRÌNH BÀY DỄ ĐỌC: Viết câu ngắn, ngắt dòng liên tục (mỗi đoạn 1-3 câu). Giữa các đoạn phải có khoảng trắng.
5. GIỌNG ĐIỆU CÁ NHÂN HÓA: Viết tự nhiên, đời thường, hơi "đời" và sắc bén, có quan điểm cá nhân mạnh mẽ. Đừng viết chung chung, hãy cụ thể hóa.
6. EMOJI: KHÔNG dùng hoặc dùng TỐI ĐA 1 emoji cho toàn bộ bài viết. Tập trung vào ngôn từ.
7. LINH HOẠT: Không lặp lại y hệt cấu trúc rập khuôn. Hãy sáng tạo dựa trên ngữ cảnh thực tế của ý tưởng thô.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Ý tưởng thô: ${rawInput}\n\nHãy viết bài Threads thật sâu sắc và chi tiết ngay:` },
      ],
      temperature: 0.7,
      max_tokens: 1000,
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
    if (authUserId && authUserId !== body.user_id) {
      throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }

    const supabase = useSupabaseServer()
    if (supabase) {
      const { data, error } = await supabase
        .from('generated_threads')
        .insert({
          user_id: body.user_id,
          raw_input: rawInput,
          framework,
          generated_text: generatedText,
        })
        .select()
        .single()

      if (error) {
        console.error('[Generate Thread API] Supabase Error:', error)
        throw createError({
          statusCode: 500,
          statusMessage: `Database Error: ${error.message}. Please configure SUPABASE_SERVICE_ROLE_KEY.`,
        })
      }

      if (data) {
        savedThread = data as GeneratedThread
      }
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
    return `${tonePrefix}Quan điểm trái chiều: ${input}\n\nĐa số mọi người đang tiếp cận vấn đề này hoàn toàn sai cách. Họ chỉ tập trung giải quyết cái ngọn mà quên mất đi gốc rễ thực sự của vấn đề.\n\nSau một thời gian dài chật vật và thử nghiệm thực tế, tôi nhận ra điều quan trọng nhất không phải là cố gắng làm nhiều hơn hay nhồi nhét thêm kiến thức.\n\nBí quyết thực sự nằm ở việc: Bắt đầu làm đúng thứ ngay từ những bước đầu tiên. Giảm bớt sự xao nhãng và tập trung vào cốt lõi.\n\nBạn nghĩ sao về góc nhìn này? Có ai đang gặp phải tình trạng tương tự không? Đổ comment bên dưới nhé!`
  }

  if (framework === 'lesson_learned') {
    return `${tonePrefix}Sai lầm đắt giá nhất của tôi khi giải quyết bài toán "${input}":\n\nTôi từng mất rất nhiều thời gian, công sức và cả tiền bạc vì tự mày mò mà không chịu tìm hiểu hay hỏi han những người đi trước.\n\nNhững bài học xương máu tôi rút ra được:\n\n1. Tập trung vào giá trị cốt lõi thay vì chạy theo các thủ thuật bề nổi.\n2. Đo lường kết quả liên tục để biết mình đang đi đúng hướng hay không.\n3. Dám thừa nhận sai và sửa chữa ngay khi phát hiện vấn đề.\n\nĐừng lặp lại vết xe đổ này giống tôi. Hãy đi chậm mà chắc!`
  }

  return `${tonePrefix}Ý tưởng về ${input}:\n\nĐây là một bài học và góc nhìn thực tế mà tôi muốn chia sẻ với mọi người sau quá trình dài trải nghiệm.\n\nNhiều người thường nghĩ vấn đề này rất khó nhằn. Nhưng thực ra, khi chúng ta biết cách bẻ nhỏ nó ra thành từng bước cụ thể, mọi thứ lại trở nên vô cùng đơn giản và rõ ràng.\n\nQuan trọng nhất là sự kiên trì và tư duy đúng đắn.\n\nBạn có đang gặp khúc mắc tương tự trên hành trình của mình không? Chia sẻ bên dưới nhé.`
}
