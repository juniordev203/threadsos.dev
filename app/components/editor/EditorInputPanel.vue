<script setup lang="ts">
import type { FrameworkSlug } from '~/types/database'

interface FrameworkOption {
  slug: FrameworkSlug
  label: string
}

const FRAMEWORKS: FrameworkOption[] = [
  { slug: 'unpopular_opinion', label: 'Unpopular Opinion' },
  { slug: 'lesson_learned', label: 'Lesson Learned' },
  { slug: 'how_to', label: 'How To' },
  { slug: 'tool_stack', label: 'Tool Stack' },
  { slug: 'before_after', label: 'Before & After' },
  { slug: 'myth_busting', label: 'Myth Busting' },
  { slug: 'personal_story', label: 'Personal Story' },
]

const SUGGESTIONS = [
  'Sai lầm lớn nhất của bạn khi mới bắt đầu xây dựng thương hiệu cá nhân là gì?',
  '3 công cụ AI giúp bạn tiết kiệm 10 giờ làm việc mỗi tuần?',
  'Một tư duy sai lầm trong ngành của bạn mà ít người dám nói ra?'
]

const props = withDefaults(defineProps<{
  modelValue?: string
  framework?: string
}>(), {
  modelValue: '',
  framework: 'unpopular_opinion'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:framework', slug: string): void
  (e: 'generate', value: string): void
  (e: 'select-framework', slug: string): void
}>()

const localInput = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
})

const selectedFramework = computed({
  get: () => props.framework || 'unpopular_opinion',
  set: (slug: string) => {
    emit('update:framework', slug)
    emit('select-framework', slug)
  }
})

const currentFrameworkLabel = computed(() => {
  const found = FRAMEWORKS.find(f => f.slug === selectedFramework.value)
  return found ? found.label.toUpperCase() : 'UNPOPULAR OPINION'
})

function selectFramework(slug: FrameworkSlug) {
  selectedFramework.value = slug
}

function applySuggestion(suggestionText: string) {
  localInput.value = suggestionText
}

function handleGenerate() {
  emit('generate', localInput.value)
}
</script>

<template>
  <div class="flex flex-col gap-6 p-6">
    <!-- Framework Selector Section -->
    <div class="flex flex-col gap-3">
      <div class="font-mono text-xs tracking-wider text-[var(--p-on-surface-variant)] uppercase">
        [FRAMEWORK: {{ currentFrameworkLabel }}]
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="fw in FRAMEWORKS"
          :key="fw.slug"
          type="button"
          class="font-mono text-xs px-3 py-1.5 rounded-[var(--radius-sm)] border transition-colors cursor-pointer"
          :class="[
            selectedFramework === fw.slug
              ? 'bg-[var(--p-primary)] text-[var(--p-on-primary)] border-[var(--p-primary)] font-medium'
              : 'bg-[var(--p-surface-container-high)] text-[var(--p-on-surface)] border-[var(--p-outline-variant)] hover:border-[var(--p-outline)]'
          ]"
          @click="selectFramework(fw.slug)"
        >
          {{ fw.label }}
        </button>
      </div>
    </div>

    <!-- Textarea Input Section -->
    <div class="flex flex-col gap-2 relative">
      <label class="font-mono text-xs text-[var(--p-on-surface-variant)] uppercase">
        Ý TƯỞNG CỦA BẠN
      </label>
      <div class="relative">
        <textarea
          v-model="localInput"
          placeholder="Bạn muốn viết về điều gì?"
          rows="7"
          class="w-full bg-[var(--p-surface-container-high)] border border-[var(--p-outline-variant)] rounded-[var(--radius-md)] p-[14px_16px] text-[15px] font-sans text-[var(--p-on-surface)] placeholder-[var(--p-on-surface-variant)] focus:outline-none focus:border-[var(--p-primary)] resize-none transition-colors min-h-[200px]"
        />
        <div class="absolute bottom-3 right-4 font-mono text-xs text-[var(--p-on-surface-variant)] pointer-events-none">
          {{ localInput.length }} ký tự
        </div>
      </div>
    </div>

    <!-- Smart Suggestions Placeholder -->
    <div class="flex flex-col gap-3">
      <div class="font-mono text-xs tracking-wider text-[var(--p-on-surface-variant)] uppercase">
        💡 CÂU HỎI KÍCH THÍCH Ý TƯỞNG
      </div>
      <div class="flex flex-col gap-2.5">
        <div
          v-for="(suggestion, idx) in SUGGESTIONS"
          :key="idx"
          class="p-3 bg-[var(--p-surface-container-low)] border border-[var(--p-outline-variant)] rounded-[var(--radius-md)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-[var(--p-on-surface)]"
        >
          <span>{{ suggestion }}</span>
          <button
            type="button"
            class="text-xs font-mono text-[var(--p-primary)] hover:underline whitespace-nowrap self-end sm:self-auto cursor-pointer"
            @click="applySuggestion(suggestion)"
          >
            Dùng câu này →
          </button>
        </div>
      </div>
    </div>

    <!-- Generate Button -->
    <button
      type="button"
      class="w-full h-[48px] bg-[var(--p-primary)] text-[var(--p-on-primary)] font-semibold text-base rounded-[var(--radius-md)] card-hover flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2"
      @click="handleGenerate"
    >
      Generate Thread ⚡
    </button>
  </div>
</template>
