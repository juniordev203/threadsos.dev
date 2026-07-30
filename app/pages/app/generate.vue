<script setup lang="ts">
import EditorInputPanel from '~/components/editor/EditorInputPanel.vue'
import EditorPreviewPanel from '~/components/editor/EditorPreviewPanel.vue'

definePageMeta({ layout: 'app' })
useSeoMeta({ title: 'Generate — AI Growth OS' })

const inputText = ref('')
const generatedContent = ref('')
const isGenerating = ref(false)
const selectedFramework = ref('unpopular_opinion')

const handleGenerate = () => {
  if (!inputText.value.trim()) return
  isGenerating.value = true
  // Mock generation for now
  setTimeout(() => {
    generatedContent.value = `Hook đầu tiên thu hút:\n\n${inputText.value}\n\nĐây là nội dung được AI sinh ra dựa trên ý tưởng của bạn. Bài viết được tối ưu theo cấu trúc Threads: Hook → Body → CTA.\n\n💡 Bạn nghĩ sao? Để lại comment nhé!`
    isGenerating.value = false
  }, 2000)
}
</script>

<template>
  <div class="w-full min-h-[calc(100vh-64px)] bg-[var(--p-background)] grid grid-cols-1 lg:grid-cols-2">
    <!-- Left Input Panel -->
    <div class="border-b lg:border-b-0 lg:border-r border-[var(--p-outline-variant)]">
      <EditorInputPanel
        v-model="inputText"
        v-model:framework="selectedFramework"
        @generate="handleGenerate"
      />
    </div>

    <!-- Right Preview Panel -->
    <div>
      <EditorPreviewPanel
        :content="generatedContent"
        :is-loading="isGenerating"
        @regenerate="handleGenerate"
      />
    </div>
  </div>
</template>
