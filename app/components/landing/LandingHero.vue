<script setup lang="ts">
</script>

<template>
  <section class="flex min-h-screen flex-col items-center justify-center px-4">
    <div class="max-w-2xl text-center">
      <!-- Tag Badge -->
      <span
        class="mb-6 inline-block rounded px-3 py-1.5 font-mono text-xs font-medium tracking-wider"
        style="border: 1px solid var(--p-outline-variant); color: var(--p-on-surface-variant);"
      >
        DÀNH CHO CREATOR TRÊN THREADS
      </span>

      <!-- Headline -->
      <h1 class="text-display-xl mb-4" style="color: var(--p-on-background);">
        Biến ý tưởng thô thành bài Threads chất lượng trong 3 phút.
      </h1>

      <!-- Subtitle -->
      <p class="text-body-lg mx-auto mb-8 max-w-lg" style="color: var(--p-on-surface-variant);">
        AI Growth OS giúp Creator tạo nội dung Threads chuyên nghiệp — sẵn sàng copy và đăng.
      </p>

      <!-- CTA Button -->
      <NuxtLink to="/auth">
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
      </NuxtLink>

      <!-- Sub-text -->
      <p class="text-label-sm mt-3" style="color: var(--p-on-surface-variant);">
        Không cần thẻ tín dụng
      </p>
    </div>
  </section>
</template>
