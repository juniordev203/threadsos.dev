<script setup lang="ts">
const features = [
  {
    icon: '◇',
    title: 'Gợi ý Thông minh',
    description: '7 frameworks đã chứng minh hiệu quả trên Threads, kết hợp câu hỏi kích hoạt ý tưởng.',
  },
  {
    icon: '⚡',
    title: 'Sinh bài Tự động',
    description: 'AI biến ý tưởng thô thành bài Threads hoàn chỉnh với Hook, Body, CTA.',
  },
  {
    icon: '◎',
    title: 'Preview Chân thực',
    description: 'Xem trước bài viết đúng giao diện Threads. Copy và đăng ngay.',
  },
]
</script>

<template>
  <section class="mx-auto max-w-[1280px] px-6 py-24">
    <h2 class="text-headline-lg mb-16 text-center" style="color: var(--p-on-background);">
      Tại sao chọn AI Growth OS?
    </h2>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="card-hover p-6"
        style="
          border: 1px solid var(--p-outline-variant);
          border-radius: var(--radius-lg);
        "
      >
        <div class="text-headline-lg mb-4">{{ feature.icon }}</div>
        <h3 class="text-headline-md mb-2" style="color: var(--p-on-background);">
          {{ feature.title }}
        </h3>
        <p class="text-body-sm" style="color: var(--p-on-surface-variant);">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>
</template>
