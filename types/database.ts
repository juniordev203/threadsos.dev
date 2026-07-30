/**
 * AI Growth OS for Threads — Database TypeScript Interfaces
 * Mirrors the Supabase PostgreSQL schema in `supabase/migrations/001_initial_schema.sql`
 */

// ============================================
// Enums / Union Types
// ============================================

/** Niche options available during onboarding */
export type Niche =
  | 'technology'
  | 'marketing'
  | 'design'
  | 'business'
  | 'freelance'
  | 'startup'
  | 'education'
  | 'other'

/** Tone of voice options */
export type Tone =
  | 'practical'   // Thực chiến & Thẳng thắn
  | 'friendly'    // Gần gũi & Trực diện
  | 'analytical'  // Chuyên sâu & Số liệu
  | 'storytelling' // Kể chuyện & Chia sẻ

/** Framework slugs matching the `frameworks` table */
export type FrameworkSlug =
  | 'unpopular_opinion'
  | 'lesson_learned'
  | 'how_to'
  | 'tool_stack'
  | 'before_after'
  | 'myth_busting'
  | 'personal_story'

// ============================================
// Table Interfaces
// ============================================

/** Row type for `user_profiles` table */
export interface UserProfile {
  id: string
  clerk_user_id: string
  display_name: string | null
  avatar_url: string | null
  niche: Niche
  bio: string | null
  tone: Tone
  onboarding_done: boolean
  created_at: string
  updated_at: string
}

/** Row type for `generated_threads` table */
export interface GeneratedThread {
  id: string
  user_id: string
  raw_input: string
  framework: FrameworkSlug | null
  generated_text: string
  edited_text: string | null
  is_copied: boolean
  created_at: string
}

/** Row type for `frameworks` table */
export interface Framework {
  id: string
  slug: FrameworkSlug
  name_vi: string
  name_en: string
  description: string | null
  icon: string
  color: string
  structure_preview: string
  example_output: string
  brain_dump_prompts: string[]
  sort_order: number
  is_active: boolean
  created_at: string
}

/** Row type for `niche_topics` table */
export interface NicheTopic {
  id: string
  niche: Niche
  topic_vi: string
  topic_en: string | null
  is_active: boolean
  created_at: string
}

// ============================================
// Insert DTOs (for creating new rows)
// ============================================

export interface CreateUserProfile {
  clerk_user_id: string
  display_name?: string
  avatar_url?: string
  niche: Niche
  bio?: string
  tone?: Tone
}

export interface CreateGeneratedThread {
  user_id: string
  raw_input: string
  framework?: FrameworkSlug
  generated_text: string
}
