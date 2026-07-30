<script setup lang="ts">
export interface HistoryThread {
  id: string
  rawInput: string
  framework: string
  generatedText: string
  createdAt: string
}

const props = defineProps<{
  thread: HistoryThread
}>()

const emit = defineEmits<{
  (e: 'copy', thread: HistoryThread): void
  (e: 'reload', thread: HistoryThread): void
}>()

const isCopied = ref(false)

const formattedFramework = computed(() => {
  if (!props.thread.framework) return 'GENERAL'
  return props.thread.framework.replace(/_/g, ' ').toUpperCase()
})

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(props.thread.generatedText)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
    emit('copy', props.thread)
  } catch (err) {
    console.error('Failed to copy text:', err)
  }
}

function handleReload() {
  emit('reload', props.thread)
}
</script>

<template>
  <div
    class="card-hover border flex flex-col justify-between"
    :style="{
      borderColor: 'var(--p-outline-variant)',
      padding: '20px',
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--p-surface-container)'
    }"
  >
    <div>
      <!-- Top header: Framework badge + date -->
      <div class="flex items-center justify-between gap-2">
        <span
          class="font-mono text-xs px-2 py-0.5 border"
          :style="{
            borderRadius: 'var(--radius-sm)',
            borderColor: 'var(--p-outline-variant)',
            backgroundColor: 'var(--p-surface-container-high)',
            color: 'var(--p-on-surface)'
          }"
        >
          {{ formattedFramework }}
        </span>
        <span class="text-label-sm" :style="{ color: 'var(--p-on-surface-variant)' }">
          {{ props.thread.createdAt }}
        </span>
      </div>

      <!-- Body: Truncated generatedText -->
      <p
        class="text-body-sm mt-3 line-clamp-3 whitespace-pre-line"
        :style="{ color: 'var(--p-on-surface)' }"
      >
        {{ props.thread.generatedText }}
      </p>
    </div>

    <!-- Bottom actions -->
    <div class="flex items-center gap-2 mt-4">
      <button
        type="button"
        class="font-mono text-xs px-3 py-1.5 border cursor-pointer transition-colors select-none flex items-center justify-center gap-1.5"
        :style="{
          borderColor: 'var(--p-outline-variant)',
          borderRadius: 'var(--radius-md)',
          color: isCopied ? 'var(--p-on-primary)' : 'var(--p-on-surface)',
          backgroundColor: isCopied ? 'var(--p-primary)' : 'transparent'
        }"
        @click="handleCopy"
      >
        <Icon :name="isCopied ? 'lucide:check' : 'lucide:copy'" class="w-3.5 h-3.5" />
        {{ isCopied ? 'Đã copy' : 'Copy' }}
      </button>

      <button
        type="button"
        class="font-mono text-xs px-3 py-1.5 cursor-pointer transition-colors select-none hover:underline"
        :style="{
          borderRadius: 'var(--radius-md)',
          color: 'var(--p-on-surface-variant)'
        }"
        @click="handleReload"
      >
        Tải lại
      </button>
    </div>
  </div>
</template>
