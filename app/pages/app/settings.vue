<script setup lang="ts">
import type { Niche, Tone } from '~/types/database'

definePageMeta({ layout: 'app' })
useSeoMeta({ title: 'Cài đặt — AI Growth OS' })

// Form state with mock defaults
const selectedNiche = ref<Niche>('technology')
const bio = ref('Senior Frontend Engineer & Content Creator. Chia sẻ về Tech, AI & DX.')
const selectedTone = ref<Tone>('practical')
const currentTheme = ref<'dark' | 'light'>('dark')
const showSaveSuccess = ref(false)

const nicheOptions: { slug: Niche; label: string }[] = [
  { slug: 'technology', label: 'Technology' },
  { slug: 'marketing', label: 'Marketing' },
  { slug: 'design', label: 'Design' },
  { slug: 'business', label: 'Business' },
  { slug: 'freelance', label: 'Freelance' },
  { slug: 'startup', label: 'Startup' },
  { slug: 'education', label: 'Education' },
  { slug: 'other', label: 'Other' },
]

const toneOptions: { slug: Tone; title: string; description: string }[] = [
  {
    slug: 'practical',
    title: 'Thực chiến & Thẳng thắn',
    description: 'Đi thẳng vào vấn đề, ngắt dòng dồn dập, bài học xương máu.'
  },
  {
    slug: 'friendly',
    title: 'Gần gũi & Trực diện',
    description: 'Trò chuyện chân thành như bạn bè, ngôn từ tự nhiên.'
  },
  {
    slug: 'analytical',
    title: 'Chuyên sâu & Số liệu',
    description: 'Phân tích dựa trên dữ liệu, logic, cấu trúc thông tin rõ ràng.'
  },
  {
    slug: 'storytelling',
    title: 'Kể chuyện & Chia sẻ',
    description: 'Mở đầu bằng câu chuyện cá nhân, dẫn dắt giàu cảm xúc.'
  }
]

function setTheme(theme: 'dark' | 'light') {
  currentTheme.value = theme
  if (import.meta.client) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.classList.remove('light')
    }
  }
}

onMounted(() => {
  if (import.meta.client) {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light' || document.documentElement.classList.contains('light')
    currentTheme.value = isLight ? 'light' : 'dark'
  }
})

function handleSave() {
  showSaveSuccess.value = true
  setTimeout(() => {
    showSaveSuccess.value = false
  }, 2500)
}
</script>

<template>
  <div class="max-w-[600px] mx-auto px-6 py-8">
    <h1 class="text-headline-lg mb-8" :style="{ color: 'var(--p-on-background)' }">
      Cài đặt
    </h1>

    <form class="space-y-8" @submit.prevent="handleSave">
      <!-- Section 1: Niche -->
      <div class="space-y-3">
        <label class="block text-label-md" :style="{ color: 'var(--p-on-surface-variant)' }">
          Lĩnh vực
        </label>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            v-for="item in nicheOptions"
            :key="item.slug"
            type="button"
            class="font-mono text-xs px-3 py-2 border transition-colors cursor-pointer text-center select-none"
            :style="{ borderRadius: 'var(--radius-full)' }"
            :class="[
              selectedNiche === item.slug
                ? 'bg-[var(--p-primary)] text-[var(--p-on-primary)] border-[var(--p-primary)] font-medium'
                : 'bg-transparent text-[var(--p-on-surface)] border-[var(--p-outline-variant)] hover:bg-[var(--p-surface-container-high)]'
            ]"
            @click="selectedNiche = item.slug"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <!-- Section 2: Bio -->
      <div class="space-y-3">
        <label class="block text-label-md" :style="{ color: 'var(--p-on-surface-variant)' }">
          Mô tả bản thân
        </label>
        <textarea
          v-model="bio"
          rows="3"
          placeholder="Nhập vài dòng giới thiệu bản thân hoặc phong cách làm việc..."
          class="w-full text-body-sm p-3.5 border outline-none transition-colors resize-none"
          :style="{
            backgroundColor: 'var(--p-surface-container-high)',
            borderColor: 'var(--p-outline-variant)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--p-on-surface)'
          }"
        />
      </div>

      <!-- Section 3: Tone -->
      <div class="space-y-3">
        <label class="block text-label-md" :style="{ color: 'var(--p-on-surface-variant)' }">
          Giọng văn
        </label>
        <div class="grid grid-cols-1 gap-3">
          <div
            v-for="tone in toneOptions"
            :key="tone.slug"
            class="p-4 border cursor-pointer transition-colors select-none"
            :style="{
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--p-surface-container)'
            }"
            :class="[
              selectedTone === tone.slug
                ? 'border-[var(--p-primary)] ring-1 ring-[var(--p-primary)]'
                : 'border-[var(--p-outline-variant)] hover:border-[var(--p-outline)]'
            ]"
            @click="selectedTone = tone.slug"
          >
            <div class="flex items-center justify-between">
              <span class="font-sans text-sm font-semibold" :style="{ color: 'var(--p-on-surface)' }">
                {{ tone.title }}
              </span>
              <span
                v-if="selectedTone === tone.slug"
                class="font-mono text-xs px-2 py-0.5 border"
                :style="{
                  backgroundColor: 'var(--p-primary)',
                  color: 'var(--p-on-primary)',
                  borderColor: 'var(--p-primary)',
                  borderRadius: 'var(--radius-full)'
                }"
              >
                ✓ Đã chọn
              </span>
            </div>
            <p class="text-body-sm mt-1" :style="{ color: 'var(--p-on-surface-variant)' }">
              {{ tone.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Section 4: Theme Toggle -->
      <div class="space-y-3">
        <label class="block text-label-md" :style="{ color: 'var(--p-on-surface-variant)' }">
          Giao diện
        </label>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="flex-1 font-mono text-xs py-2.5 px-4 border cursor-pointer transition-colors text-center select-none"
            :style="{ borderRadius: 'var(--radius-md)' }"
            :class="[
              currentTheme === 'dark'
                ? 'bg-[var(--p-primary)] text-[var(--p-on-primary)] border-[var(--p-primary)] font-medium'
                : 'bg-transparent text-[var(--p-on-surface)] border-[var(--p-outline-variant)] hover:bg-[var(--p-surface-container-high)]'
            ]"
            @click="setTheme('dark')"
          >
            Dark Mode
          </button>
          <button
            type="button"
            class="flex-1 font-mono text-xs py-2.5 px-4 border cursor-pointer transition-colors text-center select-none"
            :style="{ borderRadius: 'var(--radius-md)' }"
            :class="[
              currentTheme === 'light'
                ? 'bg-[var(--p-primary)] text-[var(--p-on-primary)] border-[var(--p-primary)] font-medium'
                : 'bg-transparent text-[var(--p-on-surface)] border-[var(--p-outline-variant)] hover:bg-[var(--p-surface-container-high)] font-normal'
            ]"
            @click="setTheme('light')"
          >
            Light Mode
          </button>
        </div>
      </div>

      <!-- Save Button -->
      <div class="pt-4 flex items-center gap-4">
        <button
          type="submit"
          class="w-full font-sans text-sm font-semibold py-3 px-6 cursor-pointer transition-all active:translate-y-0 hover:-translate-y-0.5 select-none"
          :style="{
            backgroundColor: 'var(--p-primary)',
            color: 'var(--p-on-primary)',
            borderRadius: 'var(--radius-md)'
          }"
        >
          Lưu thay đổi
        </button>
      </div>

      <p
        v-if="showSaveSuccess"
        class="text-center font-mono text-xs transition-opacity"
        :style="{ color: 'var(--p-primary)' }"
      >
        ✓ Đã lưu thay đổi cài đặt thành công!
      </p>
    </form>
  </div>
</template>
