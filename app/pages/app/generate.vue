<script setup lang="ts">
import { useUser } from '@clerk/vue'
import type { Framework } from '~/types/database'
import EditorInputPanel from '~/components/editor/EditorInputPanel.vue'
import EditorPreviewPanel from '~/components/editor/EditorPreviewPanel.vue'

definePageMeta({ layout: 'app' })
useSeoMeta({ title: 'Generate — AI Growth OS' })

const inputText = ref('')
const generatedContent = ref('')
const isGenerating = ref(false)
const selectedFrameworkSlug = ref('unpopular_opinion')

const { getFrameworks, getUserProfile, generateThread } = useApi()
const { user } = useUser()

const frameworks = ref<Framework[]>([])
const userNiche = ref('technology')

// Fetch active frameworks & user niche on mount
onMounted(async () => {
  try {
    const [fws, profile] = await Promise.all([
      getFrameworks(),
      user.value?.id ? getUserProfile(user.value.id) : Promise.resolve(null)
    ])
    if (fws && fws.length > 0) {
      frameworks.value = fws
    }
    if (profile?.niche) {
      userNiche.value = profile.niche
    }
  } catch (err) {
    console.error('[Generate Page] Initialization error:', err)
  }
})

const currentFramework = computed(() => {
  return frameworks.value.find(f => f.slug === selectedFrameworkSlug.value)
})

const handleGenerate = async () => {
  if (!inputText.value.trim()) return
  isGenerating.value = true
  try {
    const thread = await generateThread({
      raw_input: inputText.value,
      framework: selectedFrameworkSlug.value,
      niche: userNiche.value,
      user_id: user.value?.id
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
    <div class="border-b lg:border-b-0 lg:border-r border-[var(--p-outline-variant)] h-full max-h-[calc(100vh-64px)]">
      <EditorInputPanel
        v-model="inputText"
        v-model:framework="selectedFrameworkSlug"
        :frameworks="frameworks"
        :user-niche="userNiche"
        @generate="handleGenerate"
      />
    </div>

    <!-- Right Preview Panel -->
    <div class="h-full max-h-[calc(100vh-64px)] overflow-y-auto">
      <EditorPreviewPanel
        :content="generatedContent"
        :is-loading="isGenerating"
        :selected-framework="currentFramework"
        @regenerate="handleGenerate"
      />
    </div>
  </div>
</template>
