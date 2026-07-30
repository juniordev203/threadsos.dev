import type { Framework, NicheTopic, UserProfile, GeneratedThread, CreateUserProfile } from '~/types/database'

export function useApi() {
  /**
   * Fetch active frameworks list
   */
  async function getFrameworks(): Promise<Framework[]> {
    const res = await $fetch<{ frameworks: Framework[] }>('/api/frameworks')
    return res.frameworks
  }

  /**
   * Fetch topics by niche
   */
  async function getNicheTopics(niche: string): Promise<NicheTopic[]> {
    const res = await $fetch<{ topics: NicheTopic[] }>('/api/niche-topics', {
      params: { niche },
    })
    return res.topics
  }

  /**
   * Fetch user profile by Clerk user ID
   */
  async function getUserProfile(clerkUserId: string): Promise<UserProfile | null> {
    const res = await $fetch<{ profile: UserProfile | null }>('/api/user/profile', {
      params: { clerk_user_id: clerkUserId },
    })
    return res.profile
  }

  /**
   * Save or update user profile during onboarding
   */
  async function saveUserProfile(data: CreateUserProfile): Promise<UserProfile> {
    const res = await $fetch<{ profile: UserProfile }>('/api/user/profile', {
      method: 'POST',
      body: data,
    })
    return res.profile
  }

  /**
   * Update user profile settings
   */
  async function updateUserProfile(data: Partial<UserProfile> & { clerk_user_id: string }): Promise<UserProfile> {
    const res = await $fetch<{ profile: UserProfile }>('/api/user/profile', {
      method: 'PUT',
      body: data,
    })
    return res.profile
  }

  /**
   * Generate thread via OpenAI API
   */
  async function generateThread(params: {
    raw_input: string
    framework?: string
    niche?: string
    tone?: string
    bio?: string
    user_id?: string
  }): Promise<GeneratedThread> {
    const res = await $fetch<{ thread: GeneratedThread }>('/api/threads/generate', {
      method: 'POST',
      body: params,
    })
    return res.thread
  }

  /**
   * Fetch user thread history
   */
  async function getThreadHistory(userId: string, framework?: string): Promise<GeneratedThread[]> {
    const res = await $fetch<{ threads: GeneratedThread[] }>('/api/threads', {
      params: { user_id: userId, framework },
    })
    return res.threads
  }

  return {
    getFrameworks,
    getNicheTopics,
    getUserProfile,
    saveUserProfile,
    updateUserProfile,
    generateThread,
    getThreadHistory,
  }
}
