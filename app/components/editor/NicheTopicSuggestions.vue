<script setup lang="ts">
import type { NicheTopic } from '~/types/database'

const props = defineProps<{
  niche: string
}>()

const emit = defineEmits<{
  (e: 'select-topic', topic: string): void
}>()

const { getNicheTopics } = useApi()

const topics = ref<NicheTopic[]>([])
const isLoading = ref(true)

watch(() => props.niche, async (newNiche) => {
  if (!newNiche) return
  isLoading.value = true
  try {
    topics.value = await getNicheTopics(newNiche)
  } catch (error) {
    console.error('Failed to fetch niche topics:', error)
  } finally {
    isLoading.value = false
  }
}, { immediate: true })

const getDisplayNiche = computed(() => {
  const map: Record<string, string> = {
    technology: 'CÔNG NGHỆ',
    marketing: 'MARKETING',
    design: 'THIẾT KẾ',
    business: 'KINH DOANH',
    freelance: 'FREELANCE',
    startup: 'STARTUP',
    education: 'GIÁO DỤC',
    other: 'CHỦ ĐỀ CỦA BẠN',
  }
  return map[props.niche] || 'LĨNH VỰC CỦA BẠN'
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="font-mono text-xs tracking-wider text-[var(--p-on-surface-variant)] uppercase flex items-center gap-1.5">
      <Icon name="lucide:lightbulb" class="w-4 h-4 text-[var(--p-primary)]" />
      GỢI Ý Ý TƯỞNG THEO LĨNH VỰC <span class="font-bold text-[var(--p-on-surface)]">[{{ getDisplayNiche }}]</span>
    </div>

    <div v-if="isLoading" class="flex flex-col gap-2.5">
      <div v-for="i in 3" :key="i" class="h-12 bg-[var(--p-surface-container)] rounded-[var(--radius-md)] animate-pulse" />
    </div>

    <div v-else-if="topics.length > 0" class="flex flex-col gap-2.5">
      <div
        v-for="topic in topics"
        :key="topic.id"
        class="group p-3 bg-[var(--p-surface-container-low)] border border-[var(--p-outline-variant)] hover:border-[var(--p-primary)] rounded-[var(--radius-md)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-[var(--p-on-surface)] transition-colors cursor-pointer"
        @click="emit('select-topic', topic.topic_vi)"
      >
        <span class="leading-snug">{{ topic.topic_vi }}</span>
        <button
          type="button"
          class="text-xs font-mono text-[var(--p-on-surface-variant)] group-hover:text-[var(--p-primary)] flex items-center gap-1 whitespace-nowrap self-end sm:self-auto transition-colors"
        >
          Dùng <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>
