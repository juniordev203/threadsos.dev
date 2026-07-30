<script setup lang="ts">
const route = useRoute()

const tabs = [
  { label: 'Tạo bài', icon: 'lucide:edit-2', to: '/app/generate' },
  { label: 'Lịch sử', icon: 'lucide:list', to: '/app/history' },
  { label: 'Cài đặt', icon: 'lucide:settings', to: '/app/settings' },
]

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 h-14 md:hidden"
    style="background-color: var(--p-surface); border-top: 1px solid var(--p-outline-variant);"
  >
    <div class="flex h-full items-center justify-around">
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="flex flex-col items-center justify-center gap-1 transition-colors"
        :style="{
          color: isActive(tab.to) ? 'var(--p-on-background)' : 'var(--p-on-surface-variant)'
        }"
      >
        <Icon :name="tab.icon" class="w-5 h-5" />
        <span class="font-mono text-[11px] font-medium leading-none">{{ tab.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
