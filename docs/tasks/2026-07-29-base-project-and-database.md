# Task Spec #1: Dựng Base Project & Database

> **Trạng thái:** ✅ COMPLETED  
> **Ngày tạo:** 2026-07-29  
> **Tham chiếu:** [PRD v3.0](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/docs/2026-07-29/ai-growth-os-for-threads.md) · [UI/UX Spec v1.1](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/docs/2026-07-29/ui-ux-design-spec.md) · [Stitch Design System](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/docs/design-stitch/design-system.md)

---

## 1. Mục tiêu & Scope

### Mục tiêu
Thiết lập **nền tảng kỹ thuật hoàn chỉnh** cho dự án AI Growth OS for Threads — bao gồm cấu trúc thư mục chuẩn Nuxt 3, Design System CSS tokens (Monochrome Geist), schema database Supabase, cấu hình môi trường, và các tiện ích server cơ bản — để mọi task tiếp theo có thể bắt tay code feature ngay.

### In-Scope
- [x] Scaffold cấu trúc thư mục chuẩn (`app/`, `server/`, `types/`)
- [x] Cấu hình Nuxt 3: modules, runtime config, google-fonts, Tailwind CSS
- [x] Tạo Design System CSS tokens (CSS custom properties từ Stitch/UI spec)
- [x] Tạo Supabase project & database schema (4 bảng chính)
- [x] File `.env.example` và cấu hình `runtimeConfig`
- [x] Tạo `.gitignore` chuẩn
- [x] Supabase client utility cho server routes (`server/utils/supabase.ts`)
- [x] SQL migration file lưu trong repo

### Out-of-Scope
- ❌ Xây dựng UI components (sẽ làm ở task tiếp theo)
- ❌ Tích hợp OpenAI API
- ❌ Auth flow hoàn chỉnh (chỉ chuẩn bị cấu trúc)
- ❌ Triển khai deployment (Vercel/Cloudflare)

---

## 2. Thiết kế Kỹ thuật

### 2.1 Quyết định Auth: Clerk vs Supabase Auth

> [!IMPORTANT]
> **PRD gốc ghi Supabase Auth**, nhưng `package.json` hiện tại đã cài `@clerk/nuxt`. Cần quyết định:
>
> **Phương án A (Giữ Clerk):** Clerk xử lý Auth, Supabase chỉ làm Database thuần. Ưu điểm: Clerk có UI Auth sẵn rất đẹp, hỗ trợ Google OAuth out-of-the-box, tách biệt Auth khỏi DB.
>
> **Phương án B (Chuyển sang Supabase Auth):** Dùng Supabase Auth tích hợp, bỏ Clerk. Ưu điểm: Ít dependency hơn, Auth + DB cùng 1 nhà cung cấp, RLS (Row Level Security) tích hợp chặt chẽ.
>
> **Đề xuất: Giữ Clerk (Phương án A)** vì đã cài sẵn và Clerk có DX tốt hơn cho MVP. Supabase chỉ đóng vai trò database. Bảng `users` sẽ dùng `clerk_user_id` làm foreign key liên kết.

### 2.2 Database Schema (Supabase PostgreSQL)

```sql
-- ============================================
-- TABLE 1: user_profiles
-- Lưu thông tin Onboarding của user (liên kết qua Clerk user ID)
-- ============================================
CREATE TABLE user_profiles (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id   TEXT NOT NULL UNIQUE,          -- Clerk external user ID
  display_name    TEXT,
  avatar_url      TEXT,
  niche           TEXT NOT NULL,                 -- 'technology', 'marketing', 'design', ...
  bio             TEXT,                          -- Mô tả ngắn bản thân
  tone            TEXT NOT NULL DEFAULT 'practical', -- 'practical', 'friendly', 'analytical', 'storytelling'
  onboarding_done BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE 2: generated_threads
-- Lưu bài viết Threads đã sinh (History)
-- ============================================
CREATE TABLE generated_threads (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  raw_input       TEXT NOT NULL,                 -- Input gốc từ user
  framework       TEXT,                          -- 'unpopular_opinion', 'lesson_learned', 'how_to', ...
  generated_text  TEXT NOT NULL,                 -- Bài Threads đã sinh
  edited_text     TEXT,                          -- Bài sau khi user chỉnh sửa (nullable)
  is_copied       BOOLEAN DEFAULT FALSE,         -- User đã copy chưa
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE 3: frameworks
-- Danh sách Content Frameworks (seed data, admin-managed)
-- ============================================
CREATE TABLE frameworks (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,           -- 'unpopular_opinion', 'lesson_learned', ...
  name_vi         TEXT NOT NULL,                 -- Tên hiển thị tiếng Việt
  name_en         TEXT NOT NULL,                 -- Tên hiển thị tiếng Anh
  description     TEXT,
  brain_dump_prompts JSONB DEFAULT '[]',          -- Mảng câu hỏi gợi ý cho framework này
  sort_order      INT DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE 4: niche_topics
-- Chủ đề Evergreen theo Niche (Tầng 3 Smart Suggestions)
-- ============================================
CREATE TABLE niche_topics (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  niche           TEXT NOT NULL,                 -- 'technology', 'marketing', ...
  topic_vi        TEXT NOT NULL,                 -- Chủ đề tiếng Việt
  topic_en        TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_generated_threads_user ON generated_threads(user_id);
CREATE INDEX idx_generated_threads_created ON generated_threads(created_at DESC);
CREATE INDEX idx_frameworks_slug ON frameworks(slug);
CREATE INDEX idx_niche_topics_niche ON niche_topics(niche);
```

### 2.3 Cấu trúc Thư mục Target

```
threadsos.dev/
├── app/
│   ├── app.vue                  [MODIFY] Thêm NuxtLayout + NuxtPage
│   ├── assets/
│   │   └── css/
│   │       └── main.css         [NEW] Design System tokens + Tailwind base
│   ├── components/              [NEW] Thư mục rỗng (placeholder)
│   ├── composables/             [NEW] Thư mục rỗng (placeholder)
│   ├── layouts/
│   │   └── default.vue          [NEW] Layout mặc định
│   └── pages/
│       └── index.vue            [NEW] Landing page placeholder
├── server/
│   └── utils/
│       └── supabase.ts          [NEW] Supabase client utility
├── types/
│   └── database.ts              [NEW] TypeScript interfaces cho DB schema
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql [NEW] SQL migration file
├── .env.example                 [NEW] Template biến môi trường
├── .gitignore                   [NEW] Gitignore chuẩn Nuxt 3
└── nuxt.config.ts               [MODIFY] Runtime config, CSS, Google Fonts config
```

### 2.4 Các file bị ảnh hưởng

- `[MODIFY]` [nuxt.config.ts](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/nuxt.config.ts) — Thêm runtimeConfig, css, google-fonts config
- `[MODIFY]` [app/app.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/app.vue) — Thêm NuxtLayout + NuxtPage
- `[NEW]` `app/assets/css/main.css` — Design System CSS custom properties
- `[NEW]` `app/layouts/default.vue` — Default layout shell
- `[NEW]` `app/pages/index.vue` — Landing page placeholder
- `[NEW]` `server/utils/supabase.ts` — Supabase server client
- `[NEW]` `types/database.ts` — DB TypeScript interfaces
- `[NEW]` `supabase/migrations/001_initial_schema.sql` — SQL migration
- `[NEW]` `.env.example` — Environment variables template
- `[NEW]` `.gitignore` — Standard Nuxt 3 gitignore

---

## 3. Kế hoạch Commits (Granular Commit Plan)

### Commit 1: `chore(setup): [Spec 1.1] add .gitignore and .env.example`
- **Mô tả:** Tạo `.gitignore` chuẩn Nuxt 3 (node_modules, .nuxt, .output, .env, dist) và `.env.example` với template biến môi trường (Supabase URL/Key, Clerk keys, OpenAI key).
- **Files:** `.gitignore`, `.env.example`

### Commit 2: `feat(config): [Spec 1.2] configure nuxt runtime, CSS, and Google Fonts`
- **Mô tả:** Cập nhật `nuxt.config.ts` với `runtimeConfig` (Supabase URL, Supabase Anon Key, OpenAI Key), trỏ CSS entry point đến `main.css`, cấu hình Google Fonts (Geist, JetBrains Mono).
- **Files:** `nuxt.config.ts`

### Commit 3: `feat(design): [Spec 1.3] create Monochrome Design System CSS tokens`
- **Mô tả:** Tạo `app/assets/css/main.css` chứa toàn bộ CSS custom properties của Design System (color palette dark/light, typography scale, spacing, radius, grid-line pattern) theo đúng Stitch Design System spec.
- **Files:** `app/assets/css/main.css`

### Commit 4: `feat(app): [Spec 1.4] scaffold app structure with layout and pages`
- **Mô tả:** Cập nhật `app.vue` để dùng `<NuxtLayout>` + `<NuxtPage>`. Tạo `app/layouts/default.vue` (layout shell cơ bản). Tạo `app/pages/index.vue` (placeholder landing page). Tạo thư mục rỗng `app/components/` và `app/composables/` với file `.gitkeep`.
- **Files:** `app/app.vue`, `app/layouts/default.vue`, `app/pages/index.vue`, `app/components/.gitkeep`, `app/composables/.gitkeep`

### Commit 5: `feat(db): [Spec 1.5] add Supabase schema, types, and migration`
- **Mô tả:** Tạo `supabase/migrations/001_initial_schema.sql` chứa 4 bảng (`user_profiles`, `generated_threads`, `frameworks`, `niche_topics`) + indexes. Tạo `types/database.ts` với TypeScript interfaces tương ứng.
- **Files:** `supabase/migrations/001_initial_schema.sql`, `types/database.ts`

### Commit 6: `feat(server): [Spec 1.6] add Supabase server client utility`
- **Mô tả:** Cài đặt `@supabase/supabase-js`. Tạo `server/utils/supabase.ts` khởi tạo Supabase client dùng `runtimeConfig` cho server routes.
- **Files:** `server/utils/supabase.ts`, `package.json` (thêm dependency)

---

## 4. Kế hoạch Kiểm thử (Verification Plan)

### Automated Checks
- `pnpm install` — Cài đặt dependencies mới thành công
- `pnpm run build` — Build production thành công, không lỗi TypeScript
- `npx nuxi typecheck` — Type check pass
- `npx gitnexus detect_changes` — Kiểm tra scope thay đổi

### Manual Checks
- [ ] Chạy `pnpm run dev` → App khởi động thành công trên `localhost:3000`
- [ ] Truy cập `localhost:3000` → Hiển thị trang placeholder với background Monochrome
- [ ] CSS custom properties load đúng (kiểm tra DevTools)
- [ ] File `.env.example` có đầy đủ các biến cần thiết
- [ ] SQL migration file syntax đúng (chạy thử trên Supabase Dashboard)

---

## 5. Open Questions

> [!IMPORTANT]
> **Q1 — Auth Provider:** Giữ **Clerk** (đã cài sẵn) hay chuyển sang **Supabase Auth**? Tôi đề xuất giữ Clerk. Xem phân tích ở mục 2.1.

> [!NOTE]
> **Q2 — Supabase Project:** Bạn đã tạo Supabase project chưa? Nếu chưa, tôi sẽ chỉ tạo migration file trong repo và bạn chạy SQL trên Supabase Dashboard sau. Nếu đã có, hãy cung cấp URL và Anon Key để cấu hình `.env`.
