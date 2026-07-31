<script setup lang="ts">
import type { Framework } from '~/types/database'

export interface HistoryThread {
  id: string
  rawInput: string
  framework: string
  generatedText: string
  createdAt: string
}

const props = defineProps<{
  thread: HistoryThread
  frameworkInfo?: Framework
}>()

const emit = defineEmits<{
  (e: 'copy', thread: HistoryThread): void
  (e: 'reload', thread: HistoryThread): void
}>()

const isCopied = ref(false)

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
    class="card-hover border flex flex-col justify-between break-inside-avoid mb-6 overflow-hidden"
    :style="{
      borderColor: 'var(--p-outline-variant)',
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--p-surface)'
    }"
  >
    <!-- Top header: Framework badge + date -->
    <div 
      class="flex items-center justify-between px-4 py-3 border-b border-[var(--p-outline-variant)] bg-[var(--p-surface-container-low)]"
    >
      <div 
        v-if="frameworkInfo"
        class="font-mono text-xs px-2.5 py-1 flex items-center gap-1.5 font-medium"
        :style="{
          borderRadius: 'var(--radius-md)',
          backgroundColor: `${frameworkInfo.color}15`,
          color: frameworkInfo.color
        }"
      >
        <Icon :name="frameworkInfo.icon" class="w-3.5 h-3.5" />
        {{ frameworkInfo.name_vi }}
      </div>
      <div v-else class="font-mono text-xs px-2.5 py-1 border border-[var(--p-outline-variant)] rounded-[var(--radius-md)] text-[var(--p-on-surface-variant)]">
        GENERAL
      </div>
      
      <span class="text-[11px] font-medium text-[var(--p-on-surface-variant)] uppercase tracking-wider">
        {{ props.thread.createdAt }}
      </span>
    </div>

    <!-- Body: Full generated text -->
    <div class="p-5">
      <!-- Mute raw input slightly if needed, or just show it small -->
      <div class="mb-4 pb-3 border-b border-dashed border-[var(--p-outline-variant)]" v-if="props.thread.rawInput">
        <p class="text-[11px] font-mono text-[var(--p-on-surface-variant)] uppercase mb-1">
          Ý tưởng gốc:
        </p>
        <p class="text-sm text-[var(--p-on-surface)] line-clamp-2 italic">
          "{{ props.thread.rawInput }}"
        </p>
      </div>

      <p
        class="text-[14px] leading-relaxed whitespace-pre-line"
        :style="{ color: 'var(--p-on-surface)' }"
      >
        {{ props.thread.generatedText }}
      </p>
    </div>

    <!-- Bottom actions -->
    <div class="flex items-center justify-between p-3 border-t border-[var(--p-outline-variant)] bg-[var(--p-surface-container-low)]">
      <button
        type="button"
        class="font-mono text-xs px-3 py-1.5 cursor-pointer transition-colors select-none hover:text-[var(--p-primary)] flex items-center gap-1"
        :style="{
          color: 'var(--p-on-surface-variant)'
        }"
        @click="handleReload"
      >
        <Icon name="lucide:refresh-cw" class="w-3.5 h-3.5" />
        Tái sử dụng
      </button>

      <button
        type="button"
        class="font-mono text-xs px-3 py-1.5 border cursor-pointer transition-colors select-none flex items-center justify-center gap-1.5"
        :style="{
          borderColor: isCopied ? 'transparent' : 'var(--p-outline-variant)',
          borderRadius: 'var(--radius-md)',
          color: isCopied ? 'white' : 'var(--p-on-surface)',
          backgroundColor: isCopied ? 'var(--p-primary)' : 'var(--p-surface)'
        }"
        @click="handleCopy"
      >
        <Icon :name="isCopied ? 'lucide:check' : 'lucide:copy'" class="w-3.5 h-3.5" />
        {{ isCopied ? 'Đã copy' : 'Copy bài' }}
      </button>
    </div>
  </div>
</template>
