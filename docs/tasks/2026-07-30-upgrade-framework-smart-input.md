# Nâng cấp hệ thống Framework & Smart Input Guidance

## Goal & Scope

### Vấn đề hiện tại
Trang Generate hiện tại có 3 điểm yếu nghiêm trọng:

1. **Framework selector quá đơn giản**: Chỉ là các pill button với tên tiếng Anh, không giải thích framework là gì, khi nào nên dùng, output trông như thế nào. User chọn mà không hiểu mình đang chọn gì.
2. **Input guidance gần như không có**: Chỉ có 3 câu gợi ý hardcode, không thay đổi theo framework hay niche. User phải tự nghĩ ý tưởng từ đầu → input chất lượng thấp → output tệ.
3. **Brain Dump Prompts tồn tại trong API nhưng KHÔNG ĐƯỢC SỬ DỤNG**: Mỗi framework đã có `brain_dump_prompts` trong `frameworks.get.ts`, nhưng `EditorInputPanel.vue` hoàn toàn bỏ qua chúng.

### Mục tiêu
Biến trang Generate từ "textarea trống + nút bấm" thành một **hệ thống dẫn dắt thông minh** giúp user tạo input chất lượng cao trước khi AI xử lý.

### Phạm vi
- ✅ Redesign Framework Selector (cards + examples)
- ✅ Smart Brain Dump guided input flow
- ✅ Tích hợp Niche Topics API vào trang Generate
- ✅ Framework structure education (hiển thị cấu trúc output)
- ✅ Nâng cấp `brain_dump_prompts` cho tất cả 7 frameworks
- ❌ Không thêm framework mới (tập trung chất lượng 7 cái hiện có)
- ❌ Không thay đổi Generate API / prompt engineering (đã upgrade ở task trước)

---

## User Review Required

> [!IMPORTANT]
> **Quyết định UX chính**: Tôi đề xuất thay thế flow hiện tại (chọn framework → gõ tự do → generate) bằng flow mới: **chọn framework → trả lời 2-3 câu hỏi gợi ý → AI tự ghép thành raw input → user review/chỉnh sửa → generate**. Đây là thay đổi lớn nhất, xin bạn review kỹ.

> [!WARNING]
> **Breaking change nhỏ**: Component `EditorInputPanel.vue` sẽ được viết lại gần như hoàn toàn. Nếu có custom CSS hoặc logic nào bạn muốn giữ, hãy báo trước.

---

## Open Questions

> [!IMPORTANT]
> 1. **Ngôn ngữ hiển thị**: Framework hiện có cả `name_vi` và `name_en`. Trên UI nên hiển thị tiếng Việt chính (ví dụ "Quan điểm trái chiều") kèm tên tiếng Anh nhỏ phía dưới, hay giữ nguyên tiếng Anh như hiện tại?
> 2. **Số lượng brain dump prompts**: Mỗi framework nên có bao nhiêu câu hỏi gợi ý? Tôi đề xuất **3 câu** (đủ để dẫn dắt, không quá nhiều gây mệt).
> 3. **Example outputs**: Mỗi framework nên có 1 bài mẫu ngắn (khoảng 100 từ) để user hình dung output. Bạn có muốn tự viết các bài mẫu này hay để tôi tạo?

---

## Proposed Changes

### Component 1: Framework Data Layer (Server)

Nâng cấp dữ liệu framework với nhiều thông tin hơn để UI có thể hiển thị phong phú.

---

#### [MODIFY] [frameworks.get.ts](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/server/api/frameworks.get.ts)

Mở rộng `FALLBACK_FRAMEWORKS` với các trường mới cho mỗi framework:

```diff
 {
   id: '1',
   slug: 'unpopular_opinion',
   name_vi: 'Quan điểm trái chiều',
   name_en: 'Unpopular Opinion',
   description: 'Quan điểm trái chiều gây tranh luận',
+  icon: 'lucide:flame',
+  color: '#EF4444',
+  structure_preview: 'HOOK (quan điểm gây sốc) → BODY (lý do + bằng chứng) → CTA (câu hỏi mở)',
+  example_output: 'Đa số dev học React trước. Sai.\n\nReact dạy bạn cách nghĩ theo component. Nhưng nó KHÔNG dạy bạn web fundamentals.\n\nHTML, CSS, vanilla JS — 3 thứ này mới là nền móng. Bỏ qua nó, bạn sẽ code được nhưng không hiểu mình đang code gì.\n\nTôi từng thuê 1 dev React 3 năm kinh nghiệm. Anh ấy không biết cách center một div bằng CSS thuần.\n\nHọc framework sau, learn the web first.\n\nBạn có đồng ý không?',
   brain_dump_prompts: [
-    'Một sự thật phũ phàng về lĩnh vực của bạn mà không ai muốn nghe?',
-    'Điều gì mà đa số mọi người tin là đúng nhưng bạn nghĩ ngược lại?',
+    'Một "sự thật" trong ngành mà bạn nghĩ là hoàn toàn sai lầm?',
+    'Điều gì khiến bạn bực mình khi thấy mọi người cứ tin và làm theo?',
+    'Bạn đã từng chứng minh điều ngược lại bằng kinh nghiệm thực tế chưa? Kể ngắn gọn.',
   ],
   ...
 }
```

Thay đổi tương tự cho cả 7 frameworks. Mỗi framework sẽ có:
- `icon`: Lucide icon name phù hợp với tính chất framework
- `color`: Màu accent để phân biệt trực quan
- `structure_preview`: Mô tả ngắn cấu trúc output (HOOK → BODY → CTA)
- `example_output`: Bài mẫu thực tế (~100-150 từ)
- `brain_dump_prompts`: Nâng lên 3 câu hỏi, viết lại sắc nét hơn

**Danh sách icon + color cho 7 frameworks:**

| Framework | Icon | Color | Ý nghĩa |
|-----------|------|-------|----------|
| Unpopular Opinion | `lucide:flame` | `#EF4444` (đỏ) | Gây tranh cãi, nóng |
| Lesson Learned | `lucide:book-open` | `#F59E0B` (vàng) | Bài học, kinh nghiệm |
| How To | `lucide:list-checks` | `#10B981` (xanh lá) | Hướng dẫn, checklist |
| Tool Stack | `lucide:wrench` | `#6366F1` (tím) | Công cụ, kỹ thuật |
| Before & After | `lucide:arrow-right-left` | `#EC4899` (hồng) | So sánh, chuyển đổi |
| Myth Busting | `lucide:shield-alert` | `#F97316` (cam) | Cảnh báo, phá bỏ |
| Personal Story | `lucide:heart` | `#8B5CF6` (tím nhạt) | Cảm xúc, cá nhân |

---

#### [MODIFY] [database.ts](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/types/database.ts)

Thêm các trường mới vào interface `Framework`:

```diff
 export interface Framework {
   id: string
   slug: FrameworkSlug
   name_vi: string
   name_en: string
   description: string | null
+  icon: string
+  color: string
+  structure_preview: string
+  example_output: string
   brain_dump_prompts: string[]
   sort_order: number
   is_active: boolean
   created_at: string
 }
```

---

### Component 2: Smart Input Panel (Frontend Core)

Đây là thay đổi lớn nhất — redesign hoàn toàn `EditorInputPanel.vue`.

---

#### [MODIFY] [EditorInputPanel.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/components/editor/EditorInputPanel.vue)

**Viết lại component** với 3 phần chính:

##### Phần 1: Framework Selector Cards (thay thế pill buttons)

```
┌─────────────────────────────────────────────┐
│ 🔥 Unpopular Opinion                       │
│ Quan điểm trái chiều                        │
│ ─────────────────────                       │
│ HOOK → BODY (lý do) → CTA (câu hỏi mở)   │
└─────────────────────────────────────────────┘
```

- Mỗi framework là 1 card hiển thị: icon + tên Việt + tên Anh nhỏ + `structure_preview`
- Card được chọn sẽ highlight với `color` của framework đó
- Layout: horizontal scroll trên mobile, grid 2 cột trên desktop
- Click vào card → mở rộng phần Brain Dump bên dưới

##### Phần 2: Brain Dump Guided Input (thay thế textarea trống)

Khi user chọn framework, hiển thị 3 câu hỏi gợi ý (`brain_dump_prompts`) dưới dạng input fields:

```
┌─────────────────────────────────────────────┐
│ [BRAIN DUMP — UNPOPULAR OPINION]            │
│                                              │
│ Q1: Một "sự thật" trong ngành mà bạn nghĩ  │
│     là hoàn toàn sai lầm?                   │
│ ┌─────────────────────────────────────┐     │
│ │ Học React trước khi học web cơ bản  │     │
│ └─────────────────────────────────────┘     │
│                                              │
│ Q2: Điều gì khiến bạn bực mình khi thấy    │
│     mọi người cứ tin và làm theo?           │
│ ┌─────────────────────────────────────┐     │
│ │ Dev 3 năm không biết CSS thuần      │     │
│ └─────────────────────────────────────┘     │
│                                              │
│ Q3: Bạn đã chứng minh điều ngược lại       │
│     bằng kinh nghiệm thực tế chưa?         │
│ ┌─────────────────────────────────────┐     │
│ │ Tôi thuê dev React, anh ấy không   │     │
│ │ center được div bằng CSS...         │     │
│ └─────────────────────────────────────┘     │
│                                              │
│ [✨ Ghép thành ý tưởng]  [Tự viết ↓]       │
└─────────────────────────────────────────────┘
```

- Mỗi câu hỏi là 1 input field nhỏ (1-2 dòng)
- Nút **"Ghép thành ý tưởng"**: Tự động nối các câu trả lời thành 1 đoạn raw input
- Nút **"Tự viết"**: Chuyển sang textarea tự do (cho user quen)
- Smooth animation khi chuyển đổi giữa 2 mode

##### Phần 3: Niche Topic Suggestions (thay thế 3 câu hardcode)

Sử dụng API `/api/niche-topics` để hiển thị gợi ý theo niche của user:

```
┌─────────────────────────────────────────────┐
│ 💡 GỢI Ý THEO LĨNH VỰC CỦA BẠN           │
│                                              │
│ • Xu hướng AI & Lập trình 2026    [Dùng →] │
│ • Kinh nghiệm tự học Fullstack    [Dùng →] │
│ • Tại sao nên dùng Nuxt 3         [Dùng →] │
└─────────────────────────────────────────────┘
```

- Fetch topics từ API dựa trên `userProfile.niche`
- Click "Dùng" → auto-fill vào brain dump Q1

---

#### [MODIFY] [generate.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/pages/app/generate.vue)

- Truyền thêm `frameworks` data (fetch từ API) xuống `EditorInputPanel`
- Truyền `userNiche` để component fetch niche topics
- Xử lý brain dump → raw input conversion trước khi gọi API

---

#### [NEW] [FrameworkCard.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/components/editor/FrameworkCard.vue)

Component con cho mỗi framework card trong selector:
- Props: `framework: Framework`, `isSelected: boolean`
- Emit: `select`
- Hiển thị: icon, name_vi, name_en, structure_preview
- Selected state: border color = framework.color, subtle background tint

---

#### [NEW] [BrainDumpInput.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/components/editor/BrainDumpInput.vue)

Component cho phần Brain Dump guided input:
- Props: `prompts: string[]`, `framework: Framework`
- Emit: `compose(rawInput: string)`, `switch-to-freeform`
- State: `answers: string[]` (mảng câu trả lời cho mỗi prompt)
- Method: `composeRawInput()` — nối các answers thành 1 đoạn text có ý nghĩa

---

#### [NEW] [NicheTopicSuggestions.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/components/editor/NicheTopicSuggestions.vue)

Component hiển thị gợi ý topic theo niche:
- Props: `niche: string`
- Emit: `select-topic(topic: string)`
- Tự fetch từ `/api/niche-topics?niche={niche}` khi mount
- Hiển thị danh sách topic với nút "Dùng →"

---

### Component 3: Framework Example Preview

---

#### [MODIFY] [EditorPreviewPanel.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/components/editor/EditorPreviewPanel.vue)

Thêm state mới: **Framework Example** — hiển thị khi user chưa generate nhưng đã chọn framework:

```diff
 <!-- State 2: Empty State → Framework Example State -->
 <div v-else-if="!content">
-  <!-- Icon sparkles + "Bài viết sẽ xuất hiện ở đây" -->
+  <!-- Nếu có selectedFramework → hiển thị example_output trong ThreadsPostCard -->
+  <!-- Label: "Ví dụ bài viết theo framework [tên]" -->
+  <!-- Mờ đi 50% opacity để phân biệt với bài thật -->
+  <!-- Nếu không có framework → giữ empty state cũ -->
 </div>
```

Điều này giúp user **hình dung output trước khi viết** → chọn framework phù hợp hơn.

---

## Granular Commit Plan

### Commit 1: Data layer — Mở rộng Framework data
```
feat(api): [Spec 1.1] extend Framework interface with icon, color, structure_preview, example_output
```
- `types/database.ts`: Thêm 4 trường mới vào `Framework` interface
- `server/api/frameworks.get.ts`: Cập nhật toàn bộ 7 FALLBACK_FRAMEWORKS với data mới + brain_dump_prompts nâng cấp

### Commit 2: UI Components — FrameworkCard + BrainDumpInput + NicheTopicSuggestions
```
feat(ui): [Spec 1.2] create FrameworkCard, BrainDumpInput, NicheTopicSuggestions components
```
- `app/components/editor/FrameworkCard.vue`: [NEW]
- `app/components/editor/BrainDumpInput.vue`: [NEW]
- `app/components/editor/NicheTopicSuggestions.vue`: [NEW]

### Commit 3: Core — Redesign EditorInputPanel
```
feat(generate): [Spec 1.3] redesign EditorInputPanel with smart guided input flow
```
- `app/components/editor/EditorInputPanel.vue`: [REWRITE]
- `app/pages/app/generate.vue`: [MODIFY] — truyền frameworks data + userNiche

### Commit 4: Preview — Framework example in EditorPreviewPanel
```
feat(preview): [Spec 1.4] show framework example output in preview panel
```
- `app/components/editor/EditorPreviewPanel.vue`: [MODIFY]

### Commit 5: Polish — Animations & responsive
```
style(generate): [Spec 1.5] add transitions, responsive layout, dark mode polish
```
- CSS transitions cho framework selection, brain dump toggle
- Mobile responsive cho framework cards (horizontal scroll)
- Dark mode verification

---

## Verification Plan

### Build Check
```bash
pnpm build
```

### Manual Verification
1. Mở trang `/app/generate` trên browser
2. Kiểm tra 7 framework cards hiển thị đầy đủ (icon, tên Việt, tên Anh, cấu trúc)
3. Click chọn framework → Brain Dump prompts xuất hiện đúng theo framework
4. Trả lời 3 câu hỏi → Bấm "Ghép thành ý tưởng" → Kiểm tra raw input được tạo ra
5. Bấm "Tự viết" → Chuyển sang textarea tự do
6. Kiểm tra niche topic suggestions hiển thị đúng theo niche của user
7. Kiểm tra preview panel hiển thị example output khi chọn framework (trước khi generate)
8. Generate bài → Kiểm tra output hiển thị đúng
9. Test responsive trên mobile viewport
10. Test dark mode

### GitNexus
```bash
# Trước mỗi commit
detect_changes()
```
