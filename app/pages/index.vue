<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'AI Growth OS for Threads — Biến ý tưởng thô thành bài Threads chất lượng',
  description: 'Biến ý tưởng thô thành bài Threads chất lượng cao trong 3 phút. Không cần thẻ tín dụng.',
})
</script>

<template>
  <main class="bg-grid flex min-h-screen flex-col items-center justify-center px-4">
    <div class="max-w-2xl text-center">
      <!-- Tag -->
      <span
        class="text-label-md mb-6 inline-block rounded px-3 py-1.5"
        style="border: 1px solid var(--p-outline-variant); color: var(--p-on-surface-variant);"
      >
        DÀNH CHO CREATOR TRÊN THREADS
      </span>

      <!-- Headline -->
      <h1 class="text-display-xl mb-4" style="color: var(--p-on-background);">
        Biến ý tưởng thô thành bài Threads chất lượng trong 3 phút.
      </h1>

      <!-- Sub -->
      <p class="text-body-lg mb-8" style="color: var(--p-on-surface-variant);">
        AI Growth OS giúp Creator tạo nội dung Threads chuyên nghiệp — sẵn sàng copy và đăng.
      </p>

      <!-- CTA -->
      <button
        class="card-hover cursor-pointer px-8 py-3 text-base font-semibold"
        style="
          background-color: var(--p-primary);
          color: var(--p-on-primary);
          border-radius: var(--radius-md);
          border: 1px solid transparent;
        "
      >
        Bắt đầu tạo bài viết →
      </button>

      <p class="text-label-sm mt-3" style="color: var(--p-on-surface-variant);">
        Không cần thẻ tín dụng
      </p>
    </div>
  </main>
</template>
