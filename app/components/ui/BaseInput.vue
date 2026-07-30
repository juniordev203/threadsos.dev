<script setup lang="ts">
export interface BaseInputProps {
  modelValue?: string
  placeholder?: string
  maxLength?: number
  rows?: number
  label?: string
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  modelValue: '',
  placeholder: '',
  maxLength: undefined,
  rows: undefined,
  label: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-label-sm text-[var(--p-on-surface-variant)] select-none">
      {{ label }}
    </label>

    <div class="relative w-full">
      <textarea
        v-if="rows !== undefined"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :rows="rows"
        class="w-full bg-[var(--p-surface-container-high)] border border-[var(--p-outline-variant)] rounded-[6px] px-4 py-[14px] font-sans text-[15px] text-[var(--p-on-surface)] placeholder:[var(--p-on-surface-variant)] focus:outline-none focus:border-[var(--p-primary)] focus:shadow-[0_0_0_1px_var(--p-primary)] transition-colors resize-y"
        @input="handleInput"
      />
      <input
        v-else
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxLength"
        class="w-full bg-[var(--p-surface-container-high)] border border-[var(--p-outline-variant)] rounded-[6px] px-4 py-[14px] font-sans text-[15px] text-[var(--p-on-surface)] placeholder:[var(--p-on-surface-variant)] focus:outline-none focus:border-[var(--p-primary)] focus:shadow-[0_0_0_1px_var(--p-primary)] transition-colors"
        @input="handleInput"
      />

      <div
        v-if="maxLength !== undefined"
        class="mt-1 text-right font-mono text-[12px] text-[var(--p-secondary)] select-none"
      >
        {{ (modelValue || '').length }}/{{ maxLength }}
      </div>
    </div>
  </div>
</template>
