<script setup lang="ts">
interface FilterOption {
  label: string
  slug: string
}

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const filters: FilterOption[] = [
  { label: 'Tất cả', slug: 'all' },
  { label: 'Unpopular Opinion', slug: 'unpopular_opinion' },
  { label: 'How-To', slug: 'how_to' },
  { label: 'Lesson Learned', slug: 'lesson_learned' },
  { label: 'Tool Stack', slug: 'tool_stack' },
  { label: 'Before/After', slug: 'before_after' },
  { label: 'Myth Busting', slug: 'myth_busting' },
  { label: 'Personal Story', slug: 'personal_story' },
]

function selectFilter(slug: string) {
  emit('update:modelValue', slug)
}
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
    <button
      v-for="filter in filters"
      :key="filter.slug"
      type="button"
      class="font-mono text-xs px-3 py-1.5 transition-colors cursor-pointer whitespace-nowrap border select-none"
      :style="{ borderRadius: 'var(--radius-full)' }"
      :class="[
        props.modelValue === filter.slug
          ? 'bg-[var(--p-primary)] text-[var(--p-on-primary)] border-[var(--p-primary)]'
          : 'bg-transparent text-[var(--p-on-surface-variant)] border-[var(--p-outline-variant)] hover:bg-[var(--p-surface-container-high)] hover:text-[var(--p-on-surface)]'
      ]"
      @click="selectFilter(filter.slug)"
    >
      {{ filter.label }}
    </button>
  </div>
</template>
