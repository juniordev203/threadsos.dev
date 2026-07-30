<script setup lang="ts">
import ThreadsPostCard from './ThreadsPostCard.vue'
import type { Framework } from '~/types/database'

const props = withDefaults(defineProps<{
  content?: string
  isLoading?: boolean
  selectedFramework?: Framework
}>(), {
  content: '',
  isLoading: false,
  selectedFramework: undefined
})

const emit = defineEmits<{
  (e: 'copy'): void
  (e: 'regenerate'): void
  (e: 'edit'): void
}>()

const isCopied = ref(false)

async function handleCopy() {
  if (!props.content) return
  try {
    await navigator.clipboard.writeText(props.content)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
  emit('copy')
}

function handleRegenerate() {
  emit('regenerate')
}

function handleEdit() {
  emit('edit')
}
</script>

<template>
  <div class="flex flex-col h-full min-h-[400px] p-6 bg-[var(--p-surface)] justify-between">
    <!-- State 1: Loading State -->
    <div
      v-if="isLoading"
      class="flex-1 flex flex-col items-center justify-center p-8 gap-4 border border-dashed border-[var(--p-outline-variant)] rounded-[var(--radius-lg)]"
    >
      <div class="w-12 h-12 rounded-full border-2 border-[var(--p-primary)] border-t-transparent animate-spin" />
      <p class="text-sm font-sans text-[var(--p-on-surface-variant)] animate-pulse">
        Đang tạo bài viết...
      </p>
    </div>

    <!-- State 2: Framework Example State (When no content but framework selected) -->
    <div
      v-else-if="!content && selectedFramework?.example_output"
      class="flex-1 flex flex-col gap-4 animate-in fade-in duration-300"
    >
      <div class="font-mono text-xs tracking-wider text-[var(--p-on-surface-variant)] uppercase flex items-center justify-between">
        <span class="flex items-center gap-1.5">
          <Icon name="lucide:eye" class="w-4 h-4" /> 
          VÍ DỤ BÀI VIẾT: {{ selectedFramework.name_vi }}
        </span>
      </div>
      
      <!-- Show example with opacity to differentiate from real generated content -->
      <div class="opacity-60 grayscale-[20%] pointer-events-none select-none">
        <ThreadsPostCard :content="selectedFramework.example_output" />
      </div>
      
      <div class="mt-auto pt-4 text-center">
        <p class="text-sm font-sans text-[var(--p-on-surface-variant)]">
          Hoàn thành ý tưởng bên trái để tạo bài viết của riêng bạn ✨
        </p>
      </div>
    </div>

    <!-- State 3: Empty State (No content, no framework example) -->
    <div
      v-else-if="!content"
      class="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3 border border-dashed border-[var(--p-outline-variant)] rounded-[var(--radius-lg)]"
    >
      <div class="text-4xl text-[var(--p-outline)] select-none">
        <Icon name="lucide:sparkles" class="w-10 h-10" />
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-sm font-sans text-[var(--p-on-surface-variant)]">
          Bài viết của bạn sẽ xuất hiện ở đây
        </p>
      </div>
    </div>

    <!-- State 4: Content Preview State -->
    <div v-else class="flex flex-col justify-between h-full gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="font-mono text-xs tracking-wider text-[var(--p-primary)] uppercase font-semibold flex items-center gap-1.5">
        <Icon name="lucide:check-circle-2" class="w-4 h-4" /> 
        ĐÃ TẠO XONG
      </div>
      <ThreadsPostCard :content="content" />

      <!-- Action Toolbar -->
      <div class="flex items-center gap-3 pt-2">
        <!-- Copy Button (Primary) -->
        <button
          type="button"
          class="flex-1 h-10 px-4 bg-[var(--p-primary)] text-[var(--p-on-primary)] font-medium text-sm rounded-[var(--radius-md)] card-hover flex items-center justify-center gap-2 cursor-pointer transition-colors"
          @click="handleCopy"
        >
          <Icon :name="isCopied ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4" />
          <span>{{ isCopied ? 'Đã copy' : 'Copy' }}</span>
        </button>

        <!-- Viết lại Button (Secondary) -->
        <button
          type="button"
          class="h-10 px-4 bg-transparent border border-[var(--p-outline-variant)] text-[var(--p-on-surface)] hover:bg-[var(--p-surface-container-high)] hover:border-[var(--p-outline)] font-medium text-sm rounded-[var(--radius-md)] flex items-center justify-center gap-2 cursor-pointer transition-colors"
          @click="handleRegenerate"
        >
          <Icon name="lucide:refresh-cw" class="w-4 h-4" />
          <span>Viết lại</span>
        </button>

        <!-- Chỉnh sửa Button (Ghost) -->
        <button
          type="button"
          class="h-10 px-4 bg-transparent text-[var(--p-secondary)] hover:text-[var(--p-on-surface)] hover:bg-[var(--p-surface-container)] font-medium text-sm rounded-[var(--radius-md)] flex items-center justify-center gap-2 cursor-pointer transition-colors"
          @click="handleEdit"
        >
          <Icon name="lucide:edit-2" class="w-4 h-4" />
          <span>Chỉnh sửa</span>
        </button>
      </div>
    </div>
  </div>
</template>
