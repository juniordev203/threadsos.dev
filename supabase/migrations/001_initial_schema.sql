-- ============================================
-- AI Growth OS for Threads — Initial Database Schema
-- Migration: 001_initial_schema
-- Date: 2026-07-29
-- ============================================

-- ============================================
-- TABLE 1: user_profiles
-- Lưu thông tin Onboarding của user (liên kết qua Clerk user ID)
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id   TEXT NOT NULL UNIQUE,
  display_name    TEXT,
  avatar_url      TEXT,
  niche           TEXT NOT NULL,
  bio             TEXT,
  tone            TEXT NOT NULL DEFAULT 'practical',
  onboarding_done BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE 2: generated_threads
-- Lưu bài viết Threads đã sinh (History)
-- ============================================
CREATE TABLE IF NOT EXISTS generated_threads (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  raw_input       TEXT NOT NULL,
  framework       TEXT,
  generated_text  TEXT NOT NULL,
  edited_text     TEXT,
  is_copied       BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE 3: frameworks
-- Danh sách Content Frameworks (seed data, admin-managed)
-- ============================================
CREATE TABLE IF NOT EXISTS frameworks (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  name_vi         TEXT NOT NULL,
  name_en         TEXT NOT NULL,
  description     TEXT,
  brain_dump_prompts JSONB DEFAULT '[]',
  sort_order      INT DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE 4: niche_topics
-- Chủ đề Evergreen theo Niche (Tầng 3 Smart Suggestions)
-- ============================================
CREATE TABLE IF NOT EXISTS niche_topics (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  niche           TEXT NOT NULL,
  topic_vi        TEXT NOT NULL,
  topic_en        TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_user_profiles_clerk ON user_profiles(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_generated_threads_user ON generated_threads(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_threads_created ON generated_threads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_frameworks_slug ON frameworks(slug);
CREATE INDEX IF NOT EXISTS idx_niche_topics_niche ON niche_topics(niche);

-- ============================================
-- SEED DATA: Frameworks (7 content frameworks from PRD)
-- ============================================
INSERT INTO frameworks (slug, name_vi, name_en, description, brain_dump_prompts, sort_order) VALUES
  ('unpopular_opinion', 'Quan điểm trái chiều', 'Unpopular Opinion',
   'Quan điểm trái chiều gây tranh luận',
   '["Một sự thật phũ phàng về lĩnh vực của bạn mà không ai muốn nghe?", "Điều gì mà đa số mọi người tin là đúng nhưng bạn nghĩ ngược lại?"]',
   1),

  ('lesson_learned', 'Sai lầm & Bài học', 'Mistake / Lesson Learned',
   'Chia sẻ sai lầm và bài học rút ra',
   '["Sai lầm lớn nhất bạn từng mắc khi mới bắt đầu?", "Lần gần nhất bạn mất thời gian/tiền bạc vì một quyết định sai là khi nào?"]',
   2),

  ('how_to', 'Hướng dẫn từng bước', 'Step-by-Step / How-To',
   'Hướng dẫn ngắn gọn, actionable',
   '["Hướng dẫn một kỹ năng trong 5 bước cho người mới bắt đầu?", "Quy trình bạn dùng hàng ngày để làm việc hiệu quả hơn?"]',
   3),

  ('tool_stack', 'Công cụ & Tài nguyên', 'Tool Stack / Resource List',
   'Liệt kê công cụ/tài nguyên hữu ích',
   '["3 công cụ miễn phí bạn ước mình biết sớm hơn?", "Stack công nghệ bạn dùng hàng ngày là gì?"]',
   4),

  ('before_after', 'Trước & Sau', 'Before vs After',
   'So sánh trước/sau khi áp dụng kiến thức',
   '["Bạn đã thay đổi cách làm việc như thế nào sau khi học được điều gì đó?", "Kết quả trước và sau khi áp dụng phương pháp mới?"]',
   5),

  ('myth_busting', 'Bóc trần sự thật', 'Myth Busting',
   'Bóc trần hiểu lầm phổ biến',
   '["Điều mà 90% người mới tin là đúng nhưng thực ra hoàn toàn sai?", "Lời khuyên phổ biến nào mà bạn nghĩ là sai?"]',
   6),

  ('personal_story', 'Câu chuyện cá nhân', 'Personal Story',
   'Câu chuyện cá nhân gây cảm xúc',
   '["Khoảnh khắc nào khiến bạn muốn bỏ cuộc nhưng cuối cùng đã không bỏ?", "Câu chuyện nào thay đổi cách bạn nhìn nhận công việc?"]',
   7)
ON CONFLICT (slug) DO NOTHING;
