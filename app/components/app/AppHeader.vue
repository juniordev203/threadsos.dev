<script setup lang="ts">
const route = useRoute()

const isGenerateActive = computed(() => route.path === '/app/generate' || route.path.startsWith('/app/generate/'))
const isHistoryActive = computed(() => route.path === '/app/history' || route.path.startsWith('/app/history/'))
</script>

<template>
  <header
    class="sticky top-0 z-50 h-16 w-full"
    style="background-color: var(--p-surface); border-bottom: 1px solid var(--p-outline-variant);"
  >
    <div class="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">
      <!-- LEFT: Logo -->
      <NuxtLink
        to="/"
        class="font-mono text-sm font-bold tracking-wider transition-colors hover:opacity-80"
        style="color: var(--p-on-background);"
      >
        AI GROWTH OS
      </NuxtLink>

      <!-- CENTER: Nav Links -->
      <nav class="hidden items-center gap-8 md:flex h-full">
        <NuxtLink
          to="/app/generate"
          class="flex items-center text-sm font-medium transition-colors h-full"
          :class="[
            isGenerateActive ? 'border-b-2 pb-px' : 'hover:text-[var(--p-on-surface)]'
          ]"
          :style="{
            color: isGenerateActive ? 'var(--p-on-background)' : 'var(--p-on-surface-variant)',
            borderColor: isGenerateActive ? 'var(--p-primary)' : 'transparent'
          }"
        >
          Generate
        </NuxtLink>
        <NuxtLink
          to="/app/history"
          class="flex items-center text-sm font-medium transition-colors h-full"
          :class="[
            isHistoryActive ? 'border-b-2 pb-px' : 'hover:text-[var(--p-on-surface)]'
          ]"
          :style="{
            color: isHistoryActive ? 'var(--p-on-background)' : 'var(--p-on-surface-variant)',
            borderColor: isHistoryActive ? 'var(--p-primary)' : 'transparent'
          }"
        >
          History
        </NuxtLink>
      </nav>

      <!-- RIGHT: User Profile Settings -->
      <NuxtLink
        to="/app/settings"
        class="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:opacity-80"
        style="background-color: var(--p-surface-container-high); border: 1px solid var(--p-outline-variant);"
      >
        <span class="font-mono text-sm font-medium" style="color: var(--p-on-surface);">U</span>
      </NuxtLink>
    </div>
  </header>
</template>
