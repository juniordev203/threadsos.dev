<script setup lang="ts">
const props = withDefaults(defineProps<{
  content: string
  username?: string
  timestamp?: string
}>(), {
  username: '@creator',
  timestamp: 'Vừa xong'
})

const userInitials = computed(() => {
  const cleanName = props.username.replace(/^@/, '').trim()
  if (!cleanName) return 'CR'
  return cleanName.slice(0, 2).toUpperCase()
})
</script>

<template>
  <div class="bg-[var(--p-surface-container)] border border-[var(--p-outline-variant)] rounded-[var(--radius-lg)] p-[20px] shadow-sm flex flex-col justify-between">
    <div>
      <!-- Top row: Avatar & User info -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-[var(--p-surface-container-high)] border border-[var(--p-outline-variant)] flex items-center justify-center font-mono font-medium text-sm text-[var(--p-on-surface)] shrink-0">
          {{ userInitials }}
        </div>
        <div class="flex flex-col">
          <span class="font-medium text-sm text-[var(--p-on-surface)] leading-tight">
            {{ username }}
          </span>
          <span class="text-xs text-[var(--p-on-surface-variant)] mt-0.5">
            {{ timestamp }}
          </span>
        </div>
      </div>

      <!-- Post Content -->
      <div class="mt-3 text-sm leading-relaxed text-[var(--p-on-surface)] whitespace-pre-wrap font-sans">
        {{ content }}
      </div>
    </div>

    <!-- Action Bar -->
    <div class="flex items-center gap-6 mt-4 pt-4 border-t border-[var(--p-outline-variant)]">
      <button
        type="button"
        title="Like"
        class="text-[var(--p-on-surface-variant)] hover:text-[var(--p-on-surface)] transition-colors cursor-pointer"
      >
        <Icon name="lucide:heart" class="w-4 h-4" />
      </button>
      <button
        type="button"
        title="Comment"
        class="text-[var(--p-on-surface-variant)] hover:text-[var(--p-on-surface)] transition-colors cursor-pointer"
      >
        <Icon name="lucide:message-circle" class="w-4 h-4" />
      </button>
      <button
        type="button"
        title="Repost"
        class="text-[var(--p-on-surface-variant)] hover:text-[var(--p-on-surface)] transition-colors cursor-pointer"
      >
        <Icon name="lucide:repeat" class="w-4 h-4" />
      </button>
      <button
        type="button"
        title="Share"
        class="text-[var(--p-on-surface-variant)] hover:text-[var(--p-on-surface)] transition-colors cursor-pointer"
      >
        <Icon name="lucide:send" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
