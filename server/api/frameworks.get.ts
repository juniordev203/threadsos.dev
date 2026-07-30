import type { Framework } from '~/types/database'

// Static fallback data matching seed data in 001_initial_schema.sql
const FALLBACK_FRAMEWORKS: Framework[] = [
  {
    id: '1',
    slug: 'unpopular_opinion',
    name_vi: 'Quan điểm trái chiều',
    name_en: 'Unpopular Opinion',
    description: 'Đưa ra quan điểm đi ngược số đông, gây tranh luận và buộc người đọc phải suy nghĩ lại.',
    icon: 'lucide:flame',
    color: '#EF4444',
    structure_preview: 'HOOK (quan điểm gây sốc) → BODY (lý do + bằng chứng) → CTA (câu hỏi mở)',
    example_output: 'Đa số dev học React trước. Sai.\n\nReact dạy bạn cách nghĩ theo component. Nhưng nó KHÔNG dạy bạn web fundamentals.\n\nHTML, CSS, vanilla JS — 3 thứ này mới là nền móng. Bỏ qua nó, bạn sẽ code được nhưng không hiểu mình đang code gì.\n\nTôi từng thuê 1 dev React 3 năm kinh nghiệm. Anh ấy không biết cách center một div bằng CSS thuần.\n\nHọc framework sau, learn the web first.\n\nBạn có đồng ý không?',
    brain_dump_prompts: [
      'Một "sự thật" trong ngành mà bạn nghĩ là hoàn toàn sai lầm?',
      'Điều gì khiến bạn bực mình khi thấy mọi người cứ tin và làm theo?',
      'Bạn đã từng chứng minh điều ngược lại bằng kinh nghiệm thực tế chưa? Kể ngắn gọn.',
    ],
    sort_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'lesson_learned',
    name_vi: 'Sai lầm & Bài học',
    name_en: 'Lesson Learned',
    description: 'Chia sẻ sai lầm thực tế và bài học xương máu rút ra — nội dung dễ viral vì rất "thật".',
    icon: 'lucide:book-open',
    color: '#F59E0B',
    structure_preview: 'HOOK (thừa nhận sai lầm) → BODY (2-3 bài học) → CTA (lời khuyên)',
    example_output: 'Năm ngoái tôi mất 3 tháng build 1 sản phẩm không ai dùng.\n\nSai ở đâu?\n\n1. Không nói chuyện với khách hàng trước khi code\n2. Build tính năng mình thích, không phải tính năng người dùng cần\n3. Chờ "hoàn hảo" mới launch — kết quả: không bao giờ launch\n\nBài học đắt nhất: Validate trước, build sau. 1 cuộc gọi 15 phút với khách hàng tiết kiệm 3 tháng code.\n\nBạn từng mắc sai lầm nào tương tự?',
    brain_dump_prompts: [
      'Sai lầm lớn nhất bạn từng mắc trong công việc/ngành là gì?',
      'Bạn đã mất bao nhiêu thời gian, tiền bạc, hay cơ hội vì sai lầm đó?',
      'Nếu quay lại, bạn sẽ làm khác điều gì? (2-3 điều cụ thể)',
    ],
    sort_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    slug: 'how_to',
    name_vi: 'Hướng dẫn từng bước',
    name_en: 'How-To Guide',
    description: 'Hướng dẫn ngắn gọn, actionable — người đọc có thể làm theo ngay sau khi đọc.',
    icon: 'lucide:list-checks',
    color: '#10B981',
    structure_preview: 'HOOK (kết quả hứa hẹn) → BODY (3 bước cụ thể) → CTA (kêu gọi hành động)',
    example_output: 'Cách tôi viết 1 bài Threads viral trong 15 phút:\n\nBước 1: Mở note app, viết 1 câu gây tò mò nhất về chủ đề bạn giỏi. Không cần hay, cần "sốc".\n\nBước 2: Liệt kê 3 điều bạn biết mà người mới không biết. Viết ngắn, mỗi điều 1-2 dòng.\n\nBước 3: Kết bằng 1 câu hỏi. Không phải "bạn nghĩ sao?" — mà là câu hỏi buộc người ta phải comment.\n\n15 phút. Không cần talent. Cần đúng quy trình.\n\nThử ngay đi, tag tôi khi bạn đăng bài nhé.',
    brain_dump_prompts: [
      'Bạn muốn hướng dẫn người đọc đạt được kết quả gì cụ thể?',
      'Liệt kê 3 bước quan trọng nhất để đạt kết quả đó (viết ngắn gọn).',
      'Có mẹo nhỏ nào mà ít người biết giúp làm nhanh/tốt hơn không?',
    ],
    sort_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    slug: 'tool_stack',
    name_vi: 'Công cụ & Tài nguyên',
    name_en: 'Tool Stack',
    description: 'Chia sẻ bộ công cụ thực tế — dạng bài lưu nhiều nhất trên Threads.',
    icon: 'lucide:wrench',
    color: '#6366F1',
    structure_preview: 'HOOK (vấn đề cần giải quyết) → BODY (2-3 tools + công dụng) → CTA (lưu/chia sẻ)',
    example_output: '3 công cụ AI miễn phí mà dev nào cũng nên biết:\n\n1/ Cursor — Code editor có AI built-in. Viết code nhanh gấp 3 lần VS Code thuần. Miễn phí cho plan cơ bản.\n\n2/ v0.dev — Paste design vào, nó generate ra React component. Tiết kiệm cả buổi chiều styling.\n\n3/ Supabase — Backend-as-a-Service miễn phí. Auth, Database, Storage — setup 10 phút thay vì 2 ngày.\n\nTôi dùng 3 cái này hàng ngày. Nó thay đổi hoàn toàn tốc độ ship sản phẩm của tôi.\n\nBạn đang dùng tool AI nào? Drop xuống comment 👇',
    brain_dump_prompts: [
      'Bạn muốn giới thiệu công cụ giải quyết vấn đề gì?',
      'Liệt kê 2-3 công cụ bạn thực sự dùng hàng ngày (tên + công dụng 1 câu).',
      'Công cụ nào trong danh sách khiến bạn tiết kiệm nhiều thời gian nhất? Vì sao?',
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
    description: 'So sánh trước/sau khi áp dụng kiến thức — storytelling mạnh mẽ, dễ tạo cảm xúc.',
    icon: 'lucide:arrow-right-left',
    color: '#EC4899',
    structure_preview: 'BEFORE (bức tranh tệ) → TURNING POINT (điểm chuyển) → AFTER (kết quả) → CTA',
    example_output: '6 tháng trước, tôi code 12 tiếng/ngày mà project không bao giờ xong.\n\nĐiểm chuyển: Tôi đọc được 1 bài về "2-hour rule" — mỗi ngày chỉ code deep work 2 tiếng, còn lại dành cho planning và review.\n\nKết quả sau 6 tháng:\n- Ship 3 side projects (trước đó 0)\n- Không burnout\n- Code ít hơn 70% nhưng output gấp đôi\n\nKhông phải làm nhiều hơn. Mà là làm đúng thứ, đúng lúc.\n\nBạn đang ở giai đoạn "before" hay "after"?',
    brain_dump_prompts: [
      'Trước khi thay đổi, tình trạng của bạn tệ như thế nào? (cụ thể)',
      'Điều gì đã khiến bạn quyết định thay đổi? (khoảnh khắc turning point)',
      'Sau khi thay đổi, kết quả cụ thể bạn đạt được là gì? (con số, sự kiện)',
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
    description: 'Phá vỡ niềm tin sai lầm phổ biến — tạo "aha moment" cho người đọc.',
    icon: 'lucide:shield-alert',
    color: '#F97316',
    structure_preview: 'HOOK (niềm tin sai) → BODY (sự thật + bằng chứng) → CTA (thay đổi góc nhìn)',
    example_output: '"Phải có ý tưởng độc đáo mới nên khởi nghiệp."\n\nSai. Hoàn toàn sai.\n\nAirbnb — cho thuê nệm hơi trong phòng khách. Dropbox — sync file lên cloud. Uber — gọi taxi bằng app.\n\nKhông có ý tưởng nào "độc đáo". Tất cả đều là ý tưởng cũ, execution mới.\n\n90% startup thành công không phải vì ý tưởng. Mà vì founder chịu khó làm cái mà người khác lười làm.\n\nNgừng chờ "eureka moment". Bắt đầu với vấn đề bạn đang gặp hàng ngày.\n\nLời khuyên tệ nhất bạn từng nghe về khởi nghiệp là gì?',
    brain_dump_prompts: [
      'Niềm tin sai lầm phổ biến nhất trong ngành/lĩnh vực của bạn là gì?',
      'Sự thật thực tế là gì? Bạn có ví dụ hoặc số liệu nào chứng minh không?',
      'Nếu mọi người biết sự thật này sớm hơn, họ sẽ tránh được hậu quả gì?',
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
    description: 'Kể câu chuyện cá nhân giàu cảm xúc — xây dựng kết nối sâu với người đọc.',
    icon: 'lucide:heart',
    color: '#8B5CF6',
    structure_preview: 'HOOK (khoảnh khắc cảm xúc) → BODY (hành trình + bài học) → CTA (khích lệ)',
    example_output: '2 năm trước, tôi ngồi trong quán cafe lúc 11 giờ đêm, laptop gần hết pin, tài khoản còn 200k.\n\nTôi vừa bị sa thải. Không tiết kiệm. Không plan B.\n\nĐêm đó tôi quyết định: thay vì tìm việc mới, tôi sẽ tự xây sản phẩm của mình.\n\n6 tháng ăn mì gói. 6 tháng code từ 6h sáng đến 12h đêm. 6 tháng không ai tin tôi sẽ thành công.\n\nHôm nay sản phẩm đó có 2,000 người dùng trả phí.\n\nKhông phải tôi giỏi. Tôi chỉ không có đường lui.\n\nNếu bạn đang ở đáy — tin tôi, đáy là nơi tốt nhất để bật lên 🔥',
    brain_dump_prompts: [
      'Khoảnh khắc khó khăn/đáng nhớ nhất bạn muốn kể là gì? (càng cụ thể càng tốt)',
      'Bạn đã vượt qua nó bằng cách nào? Có ai giúp bạn không?',
      'Bài học lớn nhất bạn rút ra được từ trải nghiệm này là gì?',
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
