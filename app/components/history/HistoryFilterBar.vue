<script setup lang="ts">
import type { Framework } from '~/types/database'

const props = defineProps<{
  modelValue: string
  frameworks: Framework[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function selectFilter(slug: string) {
  emit('update:modelValue', slug)
}
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto py-1 custom-scrollbar pb-3 snap-x">
    <button
      type="button"
      class="font-mono text-xs px-3 py-1.5 transition-colors cursor-pointer whitespace-nowrap border select-none snap-start flex items-center gap-1.5"
      :style="{ borderRadius: 'var(--radius-full)' }"
      :class="[
        props.modelValue === 'all'
          ? 'bg-[var(--p-primary)] text-[var(--p-on-primary)] border-[var(--p-primary)]'
          : 'bg-transparent text-[var(--p-on-surface-variant)] border-[var(--p-outline-variant)] hover:bg-[var(--p-surface-container-high)] hover:text-[var(--p-on-surface)]'
      ]"
      @click="selectFilter('all')"
    >
      <Icon name="lucide:layout-grid" class="w-3.5 h-3.5" />
      Tất cả
    </button>

    <button
      v-for="fw in frameworks"
      :key="fw.slug"
      type="button"
      class="font-mono text-xs px-3 py-1.5 transition-colors cursor-pointer whitespace-nowrap border select-none snap-start flex items-center gap-1.5"
      :style="{ 
        borderRadius: 'var(--radius-full)',
        backgroundColor: props.modelValue === fw.slug ? fw.color : ''
      }"
      :class="[
        props.modelValue === fw.slug
          ? 'border-transparent text-white'
          : 'bg-transparent text-[var(--p-on-surface-variant)] border-[var(--p-outline-variant)] hover:bg-[var(--p-surface-container-high)] hover:text-[var(--p-on-surface)]'
      ]"
      @click="selectFilter(fw.slug)"
    >
      <Icon :name="fw.icon" class="w-3.5 h-3.5" />
      {{ fw.name_vi }}
    </button>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--p-outline-variant);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--p-outline);
}
</style>
