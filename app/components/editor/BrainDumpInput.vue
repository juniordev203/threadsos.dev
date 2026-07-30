<script setup lang="ts">
import type { Framework } from '~/types/database'

const props = defineProps<{
  framework: Framework
}>()

const emit = defineEmits<{
  (e: 'compose', rawInput: string): void
  (e: 'switch-to-freeform'): void
}>()

// State cho các câu trả lời tương ứng với brain_dump_prompts
const answers = ref<string[]>([])

// Reset answers khi đổi framework
watch(() => props.framework.slug, () => {
  answers.value = new Array(props.framework.brain_dump_prompts.length).fill('')
}, { immediate: true })

// Emit text đã được compose từ các câu trả lời
function handleCompose() {
  const hasContent = answers.value.some(a => a.trim().length > 0)
  if (!hasContent) return

  let composedText = ''
  props.framework.brain_dump_prompts.forEach((prompt, idx) => {
    const answer = answers.value[idx]?.trim()
    if (answer) {
      // Add prompt context + answer for LLM to better understand
      composedText += `[${prompt}]\n${answer}\n\n`
    }
  })
  
  emit('compose', composedText.trim())
}
</script>

<template>
  <div class="flex flex-col gap-5 p-5 bg-[var(--p-surface-container-low)] rounded-[var(--radius-lg)] border border-[var(--p-outline-variant)]">
    <div class="flex items-center justify-between border-b border-[var(--p-outline-variant)] pb-3">
      <div class="font-mono text-[11px] tracking-wider font-semibold uppercase flex items-center gap-2" :style="`color: ${framework.color}`">
        <Icon name="lucide:brain-circuit" class="w-4 h-4" />
        Brain Dump — {{ framework.name_en }}
      </div>
      <button 
        type="button" 
        class="text-xs font-mono text-[var(--p-on-surface-variant)] hover:text-[var(--p-on-surface)] flex items-center gap-1 transition-colors cursor-pointer"
        @click="emit('switch-to-freeform')"
      >
        <Icon name="lucide:align-left" class="w-3.5 h-3.5" />
        Tự viết
      </button>
    </div>

    <div class="flex flex-col gap-4">
      <div 
        v-for="(prompt, idx) in framework.brain_dump_prompts" 
        :key="idx"
        class="flex flex-col gap-2"
      >
        <label :for="`prompt-${idx}`" class="text-sm font-medium text-[var(--p-on-surface)] leading-snug">
          {{ prompt }}
        </label>
        <textarea
          :id="`prompt-${idx}`"
          v-model="answers[idx]"
          rows="2"
          placeholder="Nhập câu trả lời của bạn..."
          class="w-full bg-[var(--p-surface)] border border-[var(--p-outline-variant)] rounded-[var(--radius-md)] p-3 text-sm font-sans text-[var(--p-on-surface)] placeholder-[var(--p-on-surface-variant)] focus:outline-none focus:border-[var(--p-primary)] focus:ring-1 focus:ring-[var(--p-primary)] resize-none transition-colors"
        />
      </div>
    </div>

    <div class="pt-2">
      <button
        type="button"
        class="h-10 px-4 bg-[var(--p-primary)] text-[var(--p-on-primary)] font-medium text-sm rounded-[var(--radius-md)] card-hover flex items-center justify-center gap-2 cursor-pointer transition-colors"
        @click="handleCompose"
      >
        <Icon name="lucide:wand-2" class="w-4 h-4" />
        <span>Ghép thành ý tưởng</span>
      </button>
    </div>
  </div>
</template>
