<script setup lang="ts">
import EditorInputPanel from '~/components/editor/EditorInputPanel.vue'
import EditorPreviewPanel from '~/components/editor/EditorPreviewPanel.vue'

definePageMeta({ layout: 'app' })
useSeoMeta({ title: 'Generate — AI Growth OS' })

const inputText = ref('')
const generatedContent = ref('')
const isGenerating = ref(false)
const selectedFramework = ref('unpopular_opinion')

const { generateThread } = useApi()

const handleGenerate = async () => {
  if (!inputText.value.trim()) return
  isGenerating.value = true
  try {
    const thread = await generateThread({
      raw_input: inputText.value,
      framework: selectedFramework.value,
    })
    generatedContent.value = thread.generated_text
  } catch (err) {
    console.error('[Generate Page] Error:', err)
  } finally {
    isGenerating.value = false
  }
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
