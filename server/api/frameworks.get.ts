import type { Framework } from '~/types/database'

// Static fallback data matching seed data in 001_initial_schema.sql
const FALLBACK_FRAMEWORKS: Framework[] = [
  {
    id: '1',
    slug: 'unpopular_opinion',
    name_vi: 'Quan điểm trái chiều',
    name_en: 'Unpopular Opinion',
    description: 'Quan điểm trái chiều gây tranh luận',
    brain_dump_prompts: [
      'Một sự thật phũ phàng về lĩnh vực của bạn mà không ai muốn nghe?',
      'Điều gì mà đa số mọi người tin là đúng nhưng bạn nghĩ ngược lại?',
    ],
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'lesson_learned',
    name_vi: 'Sai lầm & Bài học',
    name_en: 'Mistake / Lesson Learned',
    description: 'Chia sẻ sai lầm và bài học rút ra',
    brain_dump_prompts: [
      'Sai lầm lớn nhất bạn từng mắc khi mới bắt đầu?',
      'Lần gần nhất bạn mất thời gian/tiền bạc vì một quyết định sai là khi nào?',
    ],
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'how_to',
    name_vi: 'Hướng dẫn từng bước',
    name_en: 'Step-by-Step / How-To',
    description: 'Hướng dẫn ngắn gọn, actionable',
    brain_dump_prompts: [
      'Hướng dẫn một kỹ năng trong 5 bước cho người mới bắt đầu?',
      'Quy trình bạn dùng hàng ngày để làm việc hiệu quả hơn?',
    ],
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'tool_stack',
    name_vi: 'Công cụ & Tài nguyên',
    name_en: 'Tool Stack / Resource List',
    description: 'Liệt kê công cụ/tài nguyên hữu ích',
    brain_dump_prompts: [
      '3 công cụ miễn phí bạn ước mình biết sớm hơn?',
      'Stack công nghệ bạn dùng hàng ngày là gì?',
    ],
    sort_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    slug: 'before_after',
    name_vi: 'Trước & Sau',
    name_en: 'Before vs After',
    description: 'So sánh trước/sau khi áp dụng kiến thức',
    brain_dump_prompts: [
      'Bạn đã thay đổi cách làm việc như thế nào sau khi học được điều gì đó?',
      'Kết quả trước và sau khi áp dụng phương pháp mới?',
    ],
    sort_order: 5,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    slug: 'myth_busting',
    name_vi: 'Bóc trần sự thật',
    name_en: 'Myth Busting',
    description: 'Bóc trần hiểu lầm phổ biến',
    brain_dump_prompts: [
      'Điều mà 90% người mới tin là đúng nhưng thực ra hoàn toàn sai?',
      'Lời khuyên phổ biến nào mà bạn nghĩ là sai?',
    ],
    sort_order: 6,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    slug: 'personal_story',
    name_vi: 'Câu chuyện cá nhân',
    name_en: 'Personal Story',
    description: 'Câu chuyện cá nhân gây cảm xúc',
    brain_dump_prompts: [
      'Khoảnh khắc nào khiến bạn muốn bỏ cuộc nhưng cuối cùng đã không bỏ?',
      'Câu chuyện nào thay đổi cách bạn nhìn nhận công việc?',
    ],
    sort_order: 7,
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

export default defineEventHandler(async () => {
  try {
    const supabase = useSupabaseServer()
    const { data, error } = await supabase
      .from('frameworks')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return { frameworks: FALLBACK_FRAMEWORKS }
    }

    return { frameworks: data as Framework[] }
  } catch {
    // Return fallback frameworks if Supabase is unconfigured
    return { frameworks: FALLBACK_FRAMEWORKS }
  }
})
