<script setup lang="ts">
import type { Tone } from '~/types/database'

interface Props {
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

interface ToneOption {
  value: Tone
  title: string
  description: string
}

const toneOptions: ToneOption[] = [
  {
    value: 'practical',
    title: 'Thực chiến & Thẳng thắn',
    description: 'Đi thẳng vào vấn đề, chia sẻ kinh nghiệm thực tế.'
  },
  {
    value: 'friendly',
    title: 'Gần gũi & Trực diện',
    description: 'Nói chuyện như bạn bè, dễ hiểu và gần gũi.'
  },
  {
    value: 'analytical',
    title: 'Chuyên sâu & Số liệu',
    description: 'Phân tích sâu, dẫn chứng bằng số liệu cụ thể.'
  },
  {
    value: 'storytelling',
    title: 'Kể chuyện & Chia sẻ',
    description: 'Dẫn dắt bằng câu chuyện cá nhân, tạo cảm xúc.'
  }
]

function selectTone(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      v-for="option in toneOptions"
      :key="option.value"
      class="tone-card relative cursor-pointer p-5 transition-all duration-150"
      :class="{ 'is-selected': props.modelValue === option.value }"
      @click="selectTone(option.value)"
    >
      <div v-if="props.modelValue === option.value" class="checkmark absolute top-4 right-4">
        <Icon name="lucide:check" class="w-5 h-5 font-bold" />
      </div>
      <h3 class="text-base font-semibold mb-1" style="color: var(--p-on-surface);">
        {{ option.title }}
      </h3>
      <p class="text-sm" style="color: var(--p-on-surface-variant);">
        {{ option.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.tone-card {
  border: 1px solid var(--p-outline-variant);
  border-radius: var(--radius-lg);
  background-color: var(--p-surface-container);
}

.tone-card:hover:not(.is-selected) {
  background-color: var(--p-surface-container-high);
  border-color: var(--p-outline);
}

.tone-card.is-selected {
  border: 2px solid var(--p-primary);
  background-color: var(--p-surface-container-high);
}

.checkmark {
  color: var(--p-primary);
}
</style>
