<script setup lang="ts">
import type { Framework } from '~/types/database'

const props = defineProps<{
  framework: Framework
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'select', slug: string): void
}>()

function onSelect() {
  emit('select', props.framework.slug)
}
</script>

<template>
  <button
    type="button"
    class="framework-card text-left transition-all duration-200 cursor-pointer flex flex-col p-4 w-full relative overflow-hidden group min-w-[240px] md:min-w-0"
    :class="[
      isSelected ? 'is-selected ring-1 ring-inset' : 'hover:bg-[var(--p-surface-container-high)] border border-[var(--p-outline-variant)]'
    ]"
    :style="isSelected ? `border-color: ${framework.color}; background-color: ${framework.color}0a; box-shadow: inset 0 0 0 1px ${framework.color}` : ''"
    @click="onSelect"
  >
    <div class="flex items-start gap-3 mb-3">
      <div 
        class="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 shadow-sm"
        :class="isSelected ? 'text-white' : 'bg-[var(--p-surface-container-high)] text-[var(--p-on-surface-variant)] group-hover:text-[var(--p-on-surface)]'"
        :style="isSelected ? `background-color: ${framework.color}` : ''"
      >
        <Icon :name="framework.icon || 'lucide:layout-template'" class="w-5 h-5" />
      </div>
      <div class="flex flex-col">
        <span class="font-semibold text-[15px] leading-tight text-[var(--p-on-surface)]">
          {{ framework.name_vi }}
        </span>
        <span class="font-mono text-[11px] text-[var(--p-on-surface-variant)] uppercase tracking-wider mt-0.5">
          {{ framework.name_en }}
        </span>
      </div>
    </div>
    
    <div class="text-[13px] text-[var(--p-on-surface-variant)] font-sans leading-relaxed flex-1 line-clamp-2 mb-3">
      {{ framework.description }}
    </div>

    <div class="mt-auto pt-3 border-t border-dashed border-[var(--p-outline-variant)]">
      <div class="text-[11px] font-mono tracking-tight text-[var(--p-on-surface-variant)]">
        <span class="font-semibold" :style="isSelected ? `color: ${framework.color}` : ''">CẤU TRÚC:</span>
        {{ framework.structure_preview }}
      </div>
    </div>
  </button>
</template>

<style scoped>
.framework-card {
  border-radius: var(--radius-lg);
  background-color: var(--p-surface);
}
</style>
