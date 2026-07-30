<script setup lang="ts">
export interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <button
    type="button"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--p-primary)]',
      // Size variants
      size === 'sm' && 'px-3 py-1.5 text-xs',
      size === 'md' && 'px-5 py-2.5 text-sm',
      size === 'lg' && 'px-8 py-3 text-base',
      // Style variants
      variant === 'primary' && 'bg-[var(--p-primary)] text-[var(--p-on-primary)] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[2px_2px_0px_var(--p-primary)] active:translate-x-0 active:translate-y-0 active:shadow-none',
      variant === 'secondary' && 'bg-transparent border border-[var(--p-outline-variant)] text-[var(--p-on-surface)] hover:bg-[var(--p-surface-container-high)] hover:border-[var(--p-outline)]',
      variant === 'ghost' && 'bg-transparent border-0 text-[var(--p-secondary)] hover:text-[var(--p-on-surface)] hover:bg-[var(--p-surface-container)]',
      // Disabled & Loading states
      (disabled || loading) && 'opacity-70 pointer-events-none',
      loading && 'cursor-wait',
      disabled && 'cursor-not-allowed',
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="inline-flex items-center gap-2">
      <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Loading...</span>
    </span>
    <slot v-else />
  </button>
</template>
