<script setup lang="ts">
import type { Niche } from '~/types/database'

interface Props {
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

interface Option {
  value: Niche
  label: string
}

const options: Option[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'design', label: 'Design' },
  { value: 'business', label: 'Business' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'startup', label: 'Startup' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' }
]

function selectNiche(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="niche-card p-4 text-center cursor-pointer font-medium text-sm transition-colors duration-150"
      :class="{ 'is-selected': props.modelValue === option.value }"
      @click="selectNiche(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.niche-card {
  border-radius: var(--radius-md);
  border: 1px solid var(--p-outline-variant);
  background-color: transparent;
  color: var(--p-on-surface);
}

.niche-card:hover:not(.is-selected) {
  background-color: var(--p-surface-container-high);
}

.niche-card.is-selected {
  border-color: var(--p-primary);
  background-color: var(--p-primary);
  color: var(--p-on-primary);
}
</style>
