<script setup lang="ts">
useSeoMeta({ title: 'Đăng nhập — AI Growth OS' })
</script>

<template>
  <div class="bg-grid flex min-h-screen items-center justify-center px-4">
    <div
      class="w-full max-w-[440px] p-8"
      style="background-color: var(--p-surface-container-lowest, var(--p-surface)); border: 1px solid var(--p-outline-variant); border-radius: var(--radius-lg);"
    >
      <div class="mb-6 text-center">
        <p class="font-mono text-sm font-bold tracking-wider" style="color: var(--p-on-background);">AI GROWTH OS</p>
      </div>
      <h1 class="text-headline-md mb-6 text-center">Chào mừng trở lại</h1>
      <p class="text-body-sm mb-4 text-center" style="color: var(--p-on-surface-variant);">Đăng nhập để tiếp tục tạo nội dung Threads chất lượng.</p>
      <!-- Clerk SignIn component placeholder -->
      <div class="flex flex-col gap-3">
        <button
          class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium transition-colors"
          style="border: 1px solid var(--p-outline-variant); color: var(--p-on-surface); background: transparent;"
        >
          Continue with Google
        </button>
        <div class="flex items-center gap-3 py-2">
          <div class="h-px flex-1" style="background: var(--p-outline-variant);" />
          <span class="text-label-sm" style="color: var(--p-on-surface-variant);">hoặc</span>
          <div class="h-px flex-1" style="background: var(--p-outline-variant);" />
        </div>
        <input
          type="email"
          placeholder="Email"
          class="w-full rounded-md px-4 py-3 text-sm outline-none transition-all"
          style="background: var(--p-surface-container-high); border: 1px solid var(--p-outline-variant); color: var(--p-on-surface);"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          class="w-full rounded-md px-4 py-3 text-sm outline-none transition-all"
          style="background: var(--p-surface-container-high); border: 1px solid var(--p-outline-variant); color: var(--p-on-surface);"
        />
        <button
          class="card-hover w-full cursor-pointer rounded-md px-4 py-3 text-sm font-semibold transition-all"
          style="background: var(--p-primary); color: var(--p-on-primary);"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  </div>
</template>
