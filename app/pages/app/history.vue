<script setup lang="ts">
import { useUser } from '@clerk/vue'
import HistoryFilterBar from '~/components/history/HistoryFilterBar.vue'
import HistoryPostCard from '~/components/history/HistoryPostCard.vue'
import type { Framework } from '~/types/database'

definePageMeta({ layout: 'app' })
useSeoMeta({ title: 'Lịch sử — AI Growth OS' })

const activeFilter = ref('all')
const isLoading = ref(true)

const { getThreadHistory, getFrameworks } = useApi()
const { user } = useUser()

const apiThreads = ref<any[]>([])
const frameworks = ref<Framework[]>([])

onMounted(async () => {
  try {
    const fws = await getFrameworks()
    if (fws && fws.length > 0) {
      frameworks.value = fws
    }

    if (user.value?.id) {
      const data = await getThreadHistory(user.value.id)
      if (data && data.length > 0) {
        apiThreads.value = data.map(t => ({
          id: t.id,
          rawInput: t.raw_input,
          framework: t.framework || 'unpopular_opinion',
          generatedText: t.generated_text,
          createdAt: new Date(t.created_at).toLocaleDateString('vi-VN', {
            hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
          }),
        }))
      }
    }
  } catch (err) {
    console.warn('[History Page] Error fetching data:', err)
  } finally {
    isLoading.value = false
  }
})

const filteredThreads = computed(() => {
  if (activeFilter.value === 'all') return apiThreads.value
  return apiThreads.value.filter(t => t.framework === activeFilter.value)
})

function getFrameworkInfo(slug: string) {
  return frameworks.value.find(f => f.slug === slug)
}

function handleReload(thread: any) {
  // Option: Use Pinia or local storage to pass data to Generate page,
  // or simply pass the ID if the generate page can fetch it.
  // For now, we will just navigate there and let them start fresh or we can pass text.
  navigateTo({
    path: '/app/generate',
    // Could pass thread.id if generate page supports loading it
  })
}

function goGenerate() {
  navigateTo('/app/generate')
}

</script>

<template>
  <div class="max-w-[1280px] mx-auto px-6 py-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold tracking-tight text-[var(--p-on-background)]">
        Kho lưu trữ nội dung
      </h1>
      
      <button
        v-if="apiThreads.length > 0"
        type="button"
        class="h-10 px-4 bg-[var(--p-primary)] text-[var(--p-on-primary)] font-medium text-sm rounded-[var(--radius-md)] flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm card-hover"
        @click="goGenerate"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        Viết bài mới
      </button>
    </div>

    <HistoryFilterBar v-model="activeFilter" :frameworks="frameworks" />

    <!-- Loading State -->
    <div v-if="isLoading" class="mt-8 flex items-center justify-center py-20">
      <div class="w-10 h-10 border-2 border-[var(--p-primary)] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Content State -->
    <template v-else>
      <div
        v-if="filteredThreads.length > 0"
        class="mt-8 columns-1 md:columns-2 lg:columns-3 gap-6"
      >
        <HistoryPostCard
          v-for="thread in filteredThreads"
          :key="thread.id"
          :thread="thread"
          :framework-info="getFrameworkInfo(thread.framework)"
          @reload="handleReload"
        />
      </div>

      <!-- Empty State -->
      <div
        v-else-if="apiThreads.length === 0"
        class="mt-8 border border-dashed text-center py-24 px-4 flex flex-col items-center justify-center animate-in fade-in duration-500"
        :style="{
          borderColor: 'var(--p-outline-variant)',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--p-surface-container-low)'
        }"
      >
        <div class="w-20 h-20 bg-[var(--p-surface-container-high)] rounded-full flex items-center justify-center mb-6 shadow-sm border border-[var(--p-outline-variant)] text-[var(--p-on-surface-variant)]">
          <Icon name="lucide:book-dashed" class="w-10 h-10" />
        </div>
        <h3 class="text-lg font-semibold text-[var(--p-on-background)] mb-2">Chưa có bài viết nào</h3>
        <p class="text-sm mb-6 max-w-[320px] leading-relaxed text-[var(--p-on-surface-variant)]">
          Mọi bài viết bạn tạo ra bằng AI sẽ được lưu trữ an toàn tại đây để bạn có thể xem lại và tái sử dụng bất cứ lúc nào.
        </p>
        <button
          type="button"
          class="h-11 px-6 bg-[var(--p-primary)] text-[var(--p-on-primary)] font-medium text-sm rounded-[var(--radius-md)] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          @click="goGenerate"
        >
          <Icon name="lucide:sparkles" class="w-4 h-4" />
          Tạo bài viết đầu tiên ngay
        </button>
      </div>
      
      <!-- Filter Empty State -->
      <div
        v-else
        class="mt-8 border text-center py-16 px-4 flex flex-col items-center justify-center"
        :style="{
          borderColor: 'var(--p-outline-variant)',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--p-surface-container)'
        }"
      >
        <Icon name="lucide:filter-x" class="w-8 h-8 text-[var(--p-on-surface-variant)] mb-3" />
        <p class="text-sm font-medium mb-4 text-[var(--p-on-surface)]">
          Không có bài viết nào thuộc framework này.
        </p>
        <button
          type="button"
          class="font-mono text-xs px-4 py-2 border cursor-pointer transition-colors bg-[var(--p-surface)] hover:bg-[var(--p-surface-container-high)] text-[var(--p-on-surface)]"
          :style="{
            borderColor: 'var(--p-outline-variant)',
            borderRadius: 'var(--radius-md)',
          }"
          @click="activeFilter = 'all'"
        >
          Xóa bộ lọc
        </button>
      </div>
    </template>
  </div>
</template>
