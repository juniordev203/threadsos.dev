<script setup lang="ts">
export interface BaseBadgeProps {
  selected?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<BaseBadgeProps>(), {
  selected: false,
  clickable: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center font-mono text-[12px] font-medium px-[10px] py-[4px] rounded-[4px] select-none border',
      selected
        ? 'bg-[var(--p-primary)] text-[var(--p-on-primary)] border-[var(--p-primary)]'
        : 'bg-[var(--p-surface-container-high)] text-[var(--p-on-surface)] border-[var(--p-outline-variant)]',
      clickable && 'cursor-pointer transition-colors hover:border-[var(--p-outline)]',
    ]"
    @click="handleClick"
  >
    <slot />
  </span>
</template>
