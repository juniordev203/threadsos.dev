<script setup lang="ts">
interface Props {
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="space-y-4">
    <textarea
      :value="props.modelValue"
      rows="3"
      placeholder="VD: Fullstack Developer 3 năm kinh nghiệm, đam mê Nuxt.js"
      class="bio-textarea w-full transition-colors outline-none resize-y"
      @input="onInput"
    />

    <div class="info-box">
      <p class="text-body-sm" style="color: var(--p-on-surface-variant);">
        Mô tả ngắn giúp AI hiểu phong cách và lĩnh vực của bạn để tạo nội dung phù hợp hơn.
      </p>
    </div>
  </div>
</template>

<style scoped>
.bio-textarea {
  background-color: var(--p-surface-container-high);
  border: 1px solid var(--p-outline-variant);
  border-radius: 6px;
  padding: 14px 16px;
  font-size: 15px;
  color: var(--p-on-surface);
}

.bio-textarea::placeholder {
  color: var(--p-on-surface-variant);
}

.bio-textarea:focus {
  border-color: var(--p-primary);
  box-shadow: 0 0 0 1px var(--p-primary);
}

.info-box {
  background-color: var(--p-surface-container-high);
  border-left: 2px solid var(--p-primary);
  padding: 12px 16px;
  border-radius: var(--radius-sm);
}
</style>
