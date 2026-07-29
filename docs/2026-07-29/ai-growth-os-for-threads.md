# Product Requirement Document (PRD) — AI Growth OS for Threads

> **Phiên bản:** v3.0 (Lean MVP — Phase 1)  
> **Trạng thái:** APPROVED / Ready to Build  
> **Ngày cập nhật:** 2026-07-29  

---

## 1. Bản chất sản phẩm

AI Growth OS Phase 1 là một **Web App** giúp Creator biến kiến thức, kinh nghiệm, ý tưởng thô thành bài Threads chất lượng cao — sẵn sàng để copy-paste và đăng.

Không có Telegram Bot. Không có Chrome Extension. Không có Auto-Publish.  
Chỉ có **một giao diện đẹp, thông minh, và tạo ra giá trị ngay lập tức.**

---

## 2. Nguyên tắc thiết kế sản phẩm

1. **Đơn giản tuyệt đối.** User mở app, nhập ý tưởng, bấm Generate, nhận bài viết. Không có bước thừa.
2. **Không bao giờ để User nhìn vào ô trống.** Nếu User không biết viết gì, app phải gợi ý ý tưởng dựa trên dữ liệu thực tế (không phải gợi ý ngẫu nhiên).
3. **Output phải trông như bài Threads thật.** User nhìn vào Preview, cảm thấy tự tin, bấm Copy, mở Threads, Paste, Đăng. Xong.

---

## 3. User Flow duy nhất

```text
Mở App
  │
  ├─ [Có ý tưởng] → Nhập vào ô Input
  │
  ├─ [Không có ý tưởng] → Chọn từ Gợi ý Thông minh (Smart Suggestions)
  │
  ▼
Bấm "Generate"
  │
  ▼
AI xử lý (3-8 giây)
  │
  ▼
Hiển thị Output: Bài Threads hoàn chỉnh (Preview Mode)
  │
  ├─ Hài lòng → Bấm "Copy" → Mở Threads → Paste → Đăng
  │
  ├─ Chưa hài lòng → Bấm "Regenerate" (Sinh lại phiên bản khác)
  │
  └─ Muốn chỉnh sửa → Edit trực tiếp trên Preview → Copy
```

---

## 4. Hai tính năng cốt lõi

### 4.1 Tính năng 1: Smart Suggestions (Gợi ý Ý tưởng Thông minh)

**Mục tiêu:** Phá vỡ rào cản "Hôm nay viết gì?" bằng các gợi ý có cơ sở, không phải gợi ý suông.

**Cách xây dựng hệ thống gợi ý:**

Gợi ý được chia thành 3 tầng, từ cụ thể đến mở rộng:

#### Tầng 1 — Frameworks đã chứng minh hiệu quả trên Threads
Đây là các "công thức viết bài" đã được kiểm chứng tạo ra tương tác cao trên Threads. Được nghiên cứu và đúc kết từ hàng ngàn bài viết viral thực tế:

| Framework | Mô tả | Ví dụ gợi ý |
| :--- | :--- | :--- |
| **Unpopular Opinion** | Quan điểm trái chiều gây tranh luận | *"Một sự thật phũ phàng về [lĩnh vực của bạn] mà không ai muốn nghe?"* |
| **Mistake / Lesson Learned** | Chia sẻ sai lầm + bài học rút ra | *"Sai lầm lớn nhất bạn từng mắc khi mới bắt đầu [công việc/lĩnh vực]?"* |
| **Step-by-Step / How-To** | Hướng dẫn ngắn gọn, actionable | *"Hướng dẫn [một kỹ năng] trong 5 bước cho người mới bắt đầu?"* |
| **Tool Stack / Resource List** | Liệt kê công cụ/tài nguyên hữu ích | *"3 công cụ miễn phí bạn ước mình biết sớm hơn?"* |
| **Before vs After** | So sánh trước/sau khi áp dụng kiến thức | *"Bạn đã thay đổi cách làm việc như thế nào sau khi học [X]?"* |
| **Myth Busting** | Bóc trần hiểu lầm phổ biến | *"Điều mà 90% người mới tin là đúng nhưng thực ra hoàn toàn sai?"* |
| **Personal Story** | Câu chuyện cá nhân gây cảm xúc | *"Khoảnh khắc nào khiến bạn muốn bỏ cuộc nhưng cuối cùng đã không bỏ?"* |

#### Tầng 2 — Câu hỏi khiêu khích (Brain-Dump Prompts)
Khi user chọn một Framework, hệ thống đưa ra 2-3 câu hỏi cụ thể hơn để kích hoạt suy nghĩ:

> *VD: User chọn "Mistake / Lesson Learned"*  
> → Hệ thống hỏi: *"Lần gần nhất bạn mất thời gian/tiền bạc vì một quyết định sai là khi nào? Bạn đã làm gì khác sau đó?"*

User chỉ cần trả lời bằng ngôn ngữ tự nhiên (gõ vài dòng), không cần viết đẹp. AI sẽ lo phần còn lại.

#### Tầng 3 — Trending Topics theo Niche
Hệ thống lưu sẵn một danh sách các chủ đề "thường xanh" (Evergreen Topics) theo từng Niche phổ biến (Tech, Marketing, Freelance, Design...). User chọn Niche khi đăng ký, hệ thống gợi ý các chủ đề phù hợp.

Danh sách này được cập nhật thủ công định kỳ (2 tuần/lần) bởi Founder dựa trên quan sát xu hướng Threads.

---

### 4.2 Tính năng 2: Thread Generator (Sinh bài viết)

**Input:** Đoạn text thô từ user (vài dòng ý tưởng, trải nghiệm, hoặc câu trả lời từ Brain-Dump).

**Output:** Bài Threads hoàn chỉnh, sẵn sàng đăng.

**Quy trình xử lý AI bên trong (ẩn với user):**

```text
[Raw Input từ User]
        │
        ▼
  Bước 1: Xác định Framework phù hợp nhất
  (AI tự phân loại: Story? Opinion? How-To? Listicle?)
        │
        ▼
  Bước 2: Sinh bài viết theo cấu trúc chuẩn Threads
  ┌─────────────────────────────────┐
  │  HOOK (2 dòng đầu — quyết định │
  │  80% người đọc có dừng lại     │
  │  hay lướt qua)                  │
  │                                 │
  │  BODY (Nội dung chính — giá    │
  │  trị, câu chuyện, bài học)      │
  │                                 │
  │  CTA (Kêu gọi hành động —     │
  │  Follow / Comment / Save)       │
  └─────────────────────────────────┘
        │
        ▼
  Bước 3: Anti-AI Humanizer (Làm sạch dấu vết AI)
  - Xóa từ cấm: "Tuy nhiên", "Hơn nữa", "Tóm lại",
    "Trong thế giới ngày nay", "Hãy khám phá"...
  - Giới hạn emoji (< 2)
  - Đa dạng hóa độ dài câu (câu ngắn xen câu dài)
        │
        ▼
[Output: Bài Threads hoàn chỉnh]
```

**Hiển thị Output:**
- Giao diện Preview mô phỏng giao diện Threads thật (avatar, username, nội dung, nút tương tác).
- Nút **"Copy to Clipboard"** nổi bật.
- Nút **"Regenerate"** để sinh phiên bản khác (góc nhìn khác, hook khác).
- Cho phép **Edit trực tiếp** trên Preview trước khi Copy.

---

## 5. Thiết kế UI/UX

### 5.1 Nguyên tắc giao diện
- **Clean & Minimal.** Không có sidebar phức tạp, không có dashboard phân tích. Một màn hình chính duy nhất.
- **Split-Screen Layout:** Bên trái là Input (ô nhập + gợi ý). Bên phải là Output (Preview bài Threads).
- **Dark Mode mặc định** (Phù hợp thẩm mỹ Creator, giảm mỏi mắt khi dùng ban đêm).
- **Responsive.** Hoạt động tốt trên cả Desktop và Mobile (Creator hay dùng điện thoại).

### 5.2 Các màn hình

**Màn hình 1 — Onboarding (Chỉ hiện lần đầu)**
- Chọn Niche (Tech, Marketing, Freelance, Design, Business...).
- Mô tả ngắn về bản thân (1-2 câu, VD: *"Fullstack Developer 3 năm kinh nghiệm, đam mê Nuxt.js"*).
- Chọn Tone giọng văn (Hài hước / Nghiêm túc / Thực chiến / Nhẹ nhàng).

**Màn hình 2 — Trang chính (Main Screen)**
- **Panel trái:**
  - Ô Input lớn (placeholder: *"Bạn muốn viết về điều gì?"*).
  - Bên dưới: Carousel các Smart Suggestions (gợi ý Framework + câu hỏi kích hoạt).
  - Nút **"Generate Thread"**.
- **Panel phải:**
  - Preview bài Threads (hoặc trạng thái trống khi chưa Generate).
  - Nút Copy / Regenerate / Edit.

**Màn hình 3 — History (Lịch sử bài đã sinh)**
- Danh sách các bài Threads đã tạo trước đó.
- Cho phép xem lại, copy lại, hoặc dùng làm gốc để Regenerate.

---

## 6. Tech Stack (Tối giản & Thực tế cho Solo Dev)

| Thành phần | Công nghệ | Lý do chọn |
| :--- | :--- | :--- |
| **Frontend** | Nuxt 3 (Vue.js) | Quen thuộc với Founder, SSR tốt cho SEO Landing Page |
| **Styling** | Tailwind CSS + Nuxt UI | Ship nhanh, component sẵn, responsive tốt |
| **Backend / API** | Nuxt Server Routes (Nitro) | Không cần backend riêng, tất cả trong 1 repo |
| **Database** | Supabase (PostgreSQL) | Free tier rộng, Auth sẵn, Realtime nếu cần sau |
| **AI / LLM** | OpenAI API (GPT-4o-mini) | Cân bằng giữa chất lượng văn bản và chi phí |
| **Hosting** | Vercel hoặc Cloudflare Pages | Deploy nhanh, Free tier đủ cho MVP |

**Chi phí vận hành ước tính:** < $10/tháng cho giai đoạn đầu (Supabase Free + Vercel Free + ~$5-8 OpenAI API).

---

## 7. Phạm vi MVP (Scope) — Rõ ràng và Cứng

### ✅ Làm (In Scope)
- [x] Onboarding: Chọn Niche, mô tả bản thân, chọn Tone.
- [x] Smart Suggestions: Gợi ý Framework + Brain-Dump Prompts.
- [x] Thread Generator: Input thô → Output bài Threads hoàn chỉnh.
- [x] Anti-AI Filter: Lọc từ cấm, đa dạng cấu trúc câu.
- [x] Preview giống giao diện Threads + Copy to Clipboard.
- [x] Regenerate (Sinh lại phiên bản khác).
- [x] Edit trực tiếp trên Preview.
- [x] History: Lưu lại các bài đã tạo.

### ❌ Không làm ở Phase 1 (Out of Scope)
- ❌ Telegram Bot / Zalo Bot.
- ❌ Chrome Extension (Highlight Save / Outbound Copilot).
- ❌ Tích hợp Threads API (Auto-Publish / Auto-Schedule).
- ❌ Analytics Dashboard.
- ❌ AI Growth Coach.
- ❌ Vector Database / RAG.
- ❌ Voice Input (Whisper AI).
- ❌ Multi-platform (X, LinkedIn).
- ❌ Team Workspace.

---

## 8. Lộ trình phát triển (Solo Dev Timeline)

**Quỹ thời gian:** ~12.5 giờ/tuần (1.5h/ngày thường + 2.5h/ngày cuối tuần).

| Tuần | Công việc | Giờ ước tính |
| :--- | :--- | :--- |
| **Tuần 1** | Setup dự án (Nuxt 3, Supabase, Tailwind, Auth), Thiết kế UI Onboarding + Main Screen | 12h |
| **Tuần 2** | Xây dựng Smart Suggestions Engine (Data Framework + Brain-Dump Prompts), UI Carousel gợi ý | 12h |
| **Tuần 3** | Thread Generator Core: Tích hợp OpenAI API, Prompt Engineering (Hook/Body/CTA), Anti-AI Filter | 12h |
| **Tuần 4** | Preview Component (mô phỏng Threads UI), Copy/Regenerate/Edit, History Page | 12h |
| **Tuần 5** | Polish UI/UX, Responsive Mobile, Fix bugs, Landing Page | 12h |
| **Tuần 6** | Testing end-to-end, Dogfooding (tự dùng để viết 5-10 bài Threads thật), Soft Launch | 12h |
| **Tổng** | | **~72 giờ (~6 tuần)** |

---

## 9. Chiến lược Kiểm chứng (Validation)

1. **Dogfooding:** Founder tự dùng sản phẩm để đăng Threads mỗi ngày trong 2 tuần. Theo dõi Views và Followers.
2. **Tiêu chí thành công Phase 1:**
   - Founder có thể sinh 1 bài Threads chất lượng trong dưới 3 phút (từ lúc mở app đến lúc copy).
   - Bài viết sinh ra đọc tự nhiên, không bị nhận diện là AI.
   - Sau 2 tuần Dogfooding, tài khoản Threads có tín hiệu tăng trưởng dương (view tăng, follower tăng).
3. **Nếu Phase 1 thành công** → Mở rộng sang Phase 2 (Analytics, Threads API Auto-Publish, Chrome Extension...).

---

## 10. Tầm nhìn Phase 2+ (Sau khi Phase 1 được kiểm chứng)

Chỉ triển khai khi Phase 1 đã **chứng minh được giá trị thực tế:**

- **Phase 2:** Threads API Auto-Publish + Lịch đăng bài + Analytics cơ bản.
- **Phase 3:** Chrome Extension Copilot (Outbound Engagement) + AI Growth Coach.
- **Phase 4:** Multi-platform (X, LinkedIn) + Team Workspace + Paid Plans.

> Mỗi Phase chỉ được bắt đầu khi Phase trước đó đã tạo ra kết quả đo lường được.
