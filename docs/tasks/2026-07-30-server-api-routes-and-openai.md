# Task Spec #3: Server API Routes + OpenAI Thread Generation

> **Trạng thái:** ✅ COMPLETED  
> **Ngày tạo:** 2026-07-30  
> **Tham chiếu:** [PRD v3.0 §4.2](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/docs/2026-07-29/ai-growth-os-for-threads.md) · [DB Schema](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/supabase/migrations/001_initial_schema.sql) · [DB Types](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/types/database.ts)

---

## 1. Mục tiêu & Scope

### Mục tiêu
Xây dựng **toàn bộ server API routes** (Nitro/H3) kết nối Supabase database + OpenAI GPT-4o-mini để biến ý tưởng thô thành bài Threads hoàn chỉnh, rồi **wire frontend** để gọi API thật thay vì mock data.

### In-Scope
- [x] API: User profiles (create/get/update — liên kết Clerk)
- [x] API: Frameworks (list active frameworks + brain-dump prompts)
- [x] API: Niche Topics (list by niche)
- [x] API: Thread Generation (OpenAI GPT-4o-mini với prompt engineering)
- [x] API: History (list user threads / get single thread)
- [x] Composable: `useApi()` — client-side fetch wrapper
- [x] Wire: Onboarding → create profile API
- [x] Wire: Editor → generate thread API
- [x] Wire: History → list threads API

### Out-of-Scope
- ❌ Clerk middleware/auth guard (sẽ làm khi có credentials thật)
- ❌ Rate limiting / abuse protection
- ❌ Image upload

---

## 2. Thiết kế Kỹ thuật

### 2.1 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/user/profile` | Tạo user profile (onboarding) |
| `GET` | `/api/user/profile` | Lấy profile by clerk_user_id (query param) |
| `PUT` | `/api/user/profile` | Cập nhật profile (settings) |
| `GET` | `/api/frameworks` | Danh sách frameworks (active) |
| `GET` | `/api/niche-topics` | Danh sách topics theo niche (query param) |
| `POST` | `/api/threads/generate` | Sinh bài Threads bằng OpenAI |
| `GET` | `/api/threads` | Lịch sử threads của user (query: user_id, framework filter) |
| `GET` | `/api/threads/[id]` | Chi tiết 1 thread |
| `PUT` | `/api/threads/[id]` | Cập nhật edited_text / is_copied |

### 2.2 OpenAI Prompt Engineering

System prompt cho Thread Generator (PRD §4.2):
```
Bạn là một chuyên gia sáng tạo nội dung Threads.
User profile: Niche = {niche}, Tone = {tone}, Bio = {bio}.
Framework: {framework_name}.

Viết 1 bài Threads hoàn chỉnh từ ý tưởng thô của user. Tuân thủ:

1. HOOK (2 dòng đầu): Câu mở đầu gây tò mò, khiến người đọc dừng lại.
2. BODY: Nội dung giá trị, câu chuyện, bài học. Xen kẽ câu ngắn-dài.
3. CTA: Kêu gọi hành động (Follow/Comment/Save).

ANTI-AI RULES:
- KHÔNG dùng: "Tuy nhiên", "Hơn nữa", "Tóm lại", "Trong thế giới ngày nay", "Hãy khám phá"
- Tối đa 2 emoji
- Giọng {tone}: tự nhiên, như người thật viết
- Độ dài: 150-280 từ (tối ưu cho Threads)
```

### 2.3 File Structure
```
server/
├── api/
│   ├── user/
│   │   └── profile.ts          [NEW] GET/POST/PUT handler
│   ├── frameworks.get.ts       [NEW] GET handler
│   ├── niche-topics.get.ts     [NEW] GET handler
│   └── threads/
│       ├── generate.post.ts    [NEW] POST — OpenAI generation
│       ├── index.get.ts        [NEW] GET — list threads
│       └── [id].ts             [NEW] GET/PUT single thread
├── utils/
│   ├── supabase.ts             [EXISTS] 
│   └── openai.ts               [NEW] OpenAI client utility
app/
├── composables/
│   └── useApi.ts               [NEW] Client-side API wrapper
├── pages/
│   ├── onboarding.vue          [MODIFY] Wire to profile API
│   └── app/
│       ├── generate.vue        [MODIFY] Wire to generate API
│       ├── history.vue         [MODIFY] Wire to threads list API
│       └── settings.vue        [MODIFY] Wire to profile update API
```

---

## 3. Kế hoạch Commits

### Commit 3.1: `feat(server): [Spec 3.1] add OpenAI client utility`
- **Files:** `server/utils/openai.ts`, `package.json` (add `openai` package)

### Commit 3.2: `feat(api): [Spec 3.2] add user profile API routes`
- **Files:** `server/api/user/profile.ts`

### Commit 3.3: `feat(api): [Spec 3.3] add frameworks and niche-topics API routes`
- **Files:** `server/api/frameworks.get.ts`, `server/api/niche-topics.get.ts`

### Commit 3.4: `feat(api): [Spec 3.4] add thread generation API with OpenAI`
- **Files:** `server/api/threads/generate.post.ts`

### Commit 3.5: `feat(api): [Spec 3.5] add thread history API routes`
- **Files:** `server/api/threads/index.get.ts`, `server/api/threads/[id].ts`

### Commit 3.6: `feat(app): [Spec 3.6] add useApi composable and wire frontend pages`
- **Files:** `app/composables/useApi.ts`, modify `onboarding.vue`, `generate.vue`, `history.vue`, `settings.vue`

---

## 4. Verification Plan
- `pnpm run build` — Build pass
- API routes return proper JSON responses
- Thread generation returns well-structured Threads content
- Frontend pages call real APIs (graceful fallback if no Supabase creds)
