import type { NicheTopic } from '~/types/database'

const FALLBACK_TOPICS: Record<string, string[]> = {
  technology: [
    'Xu hướng AI & Lập trình năm 2026',
    'Kinh nghiệm tự học Fullstack từ số 0',
    'Tại sao nên dùng Nuxt 3 cho dự án tiếp theo',
  ],
  marketing: [
    'Chiến lược xây dựng thương hiệu cá nhân trên Threads',
    'Cách viết Content Hook giữ chân 80% người đọc',
    'Tăng trưởng Organic không tốn chi phí Ads',
  ],
  design: [
    'Nguyên tắc thiết kế UI Minimalist & Monochrome',
    'Tối ưu UX cho ứng dụng di động',
    'Cách xây dựng Design System nhất quán',
  ],
  business: [
    'Mô hình kinh doanh Solopreneur & Micro-SaaS',
    'Quản lý tài chính cá nhân cho founder',
    'Cách tìm kiếm 100 khách hàng đầu tiên',
  ],
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const niche = (query.niche as string) || 'technology'

  try {
    const supabase = useSupabaseServer()
    const { data, error } = await supabase
      .from('niche_topics')
      .select('*')
      .eq('niche', niche)
      .eq('is_active', true)

    if (error || !data || data.length === 0) {
      const fallbackList = FALLBACK_TOPICS[niche] || FALLBACK_TOPICS.technology
      return {
        topics: fallbackList.map((t, idx) => ({
          id: String(idx + 1),
          niche,
          topic_vi: t,
          topic_en: null,
          is_active: true,
          created_at: new Date().toISOString(),
        })) as NicheTopic[],
      }
    }

    return { topics: data as NicheTopic[] }
  } catch {
    const fallbackList = FALLBACK_TOPICS[niche] || FALLBACK_TOPICS.technology
    return {
      topics: fallbackList.map((t, idx) => ({
        id: String(idx + 1),
        niche,
        topic_vi: t,
        topic_en: null,
        is_active: true,
        created_at: new Date().toISOString(),
      })) as NicheTopic[],
    }
  }
})
