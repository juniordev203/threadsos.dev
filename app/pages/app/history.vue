<script setup lang="ts">
definePageMeta({ layout: 'app' })
useSeoMeta({ title: 'Lịch sử — AI Growth OS' })

const activeFilter = ref('all')

// Mock data for display
const mockThreads = [
  { id: '1', rawInput: 'Sai lầm khi học code', framework: 'lesson_learned', generatedText: 'Năm đầu tiên học code, tôi mắc 1 sai lầm cực kỳ phổ biến: Cố gắng học mọi thứ cùng lúc.\n\nHTML, CSS, JavaScript, React, Node.js, Python, Docker... Tôi nhảy từ tutorial này sang tutorial khác mà không hoàn thành cái nào.\n\nSau 6 tháng, tôi không thể build được một ứng dụng hoàn chỉnh.\n\nBài học: Chọn 1 stack, đi sâu, build project thật. Kiến thức rộng sẽ đến sau.', createdAt: '2 giờ trước' },
  { id: '2', rawInput: '3 công cụ AI miễn phí', framework: 'tool_stack', generatedText: '3 công cụ AI miễn phí mà tôi ước mình biết sớm hơn:\n\n1. Cursor — Code editor có AI tích hợp, viết code nhanh gấp 3 lần.\n2. v0.dev — Biến mô tả text thành UI component React trong vài giây.\n3. NotebookLM — Biến tài liệu PDF dài thành podcast audio tóm tắt.\n\nCả 3 đều miễn phí. Bạn đang dùng tool nào? Drop comment 👇', createdAt: '5 giờ trước' },
  { id: '3', rawInput: 'Quan điểm về hustle culture', framework: 'unpopular_opinion', generatedText: 'Unpopular opinion: Hustle culture không giúp bạn thành công.\n\nNó chỉ giúp bạn kiệt sức nhanh hơn.\n\nTôi đã từng làm việc 14 tiếng/ngày trong 2 năm. Kết quả? Burnout nặng, mất motivation hoàn toàn.\n\nBây giờ tôi làm 6 tiếng/ngày tập trung cao độ. Output tốt hơn gấp đôi.\n\nBí quyết không phải làm nhiều hơn. Mà là làm đúng việc.', createdAt: '1 ngày trước' },
]

const filteredThreads = computed(() => {
  if (activeFilter.value === 'all') return mockThreads
  return mockThreads.filter(t => t.framework === activeFilter.value)
})

function handleReload(thread: (typeof mockThreads)[0]) {
  navigateTo({
    path: '/app/generate',
    query: { id: thread.id }
  })
}
</script>

<template>
  <div class="max-w-[1280px] mx-auto px-6 py-8">
    <h1 class="text-headline-lg mb-6" :style="{ color: 'var(--p-on-background)' }">
      Lịch sử bài viết
    </h1>

    <HistoryFilterBar v-model="activeFilter" />

    <div
      v-if="filteredThreads.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
    >
      <HistoryPostCard
        v-for="thread in filteredThreads"
        :key="thread.id"
        :thread="thread"
        @reload="handleReload"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="border text-center py-16 px-4 mt-6 flex flex-col items-center justify-center"
      :style="{
        borderColor: 'var(--p-outline-variant)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--p-surface-container)'
      }"
    >
      <p class="text-body-sm mb-2" :style="{ color: 'var(--p-on-surface-variant)' }">
        Không có bài viết nào phù hợp với bộ lọc này.
      </p>
      <button
        type="button"
        class="font-mono text-xs px-3 py-1.5 border cursor-pointer mt-2"
        :style="{
          borderColor: 'var(--p-outline-variant)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--p-on-surface)'
        }"
        @click="activeFilter = 'all'"
      >
        Xem tất cả bài viết
      </button>
    </div>
  </div>
</template>
