<script setup lang="ts">
import type { Framework } from '~/types/database'
import FrameworkCard from './FrameworkCard.vue'
import BrainDumpInput from './BrainDumpInput.vue'
import NicheTopicSuggestions from './NicheTopicSuggestions.vue'

const props = withDefaults(defineProps<{
  modelValue?: string
  framework?: string
  frameworks?: Framework[]
  userNiche?: string
}>(), {
  modelValue: '',
  framework: 'unpopular_opinion',
  frameworks: () => [],
  userNiche: 'technology'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:framework', slug: string): void
  (e: 'generate', value: string): void
  (e: 'select-framework', slug: string): void
}>()

const localInput = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
})

const selectedFrameworkSlug = computed({
  get: () => props.framework || 'unpopular_opinion',
  set: (slug: string) => {
    emit('update:framework', slug)
    emit('select-framework', slug)
  }
})

const currentFramework = computed(() => {
  return props.frameworks.find(f => f.slug === selectedFrameworkSlug.value) || props.frameworks[0]
})

// State for toggling between Brain Dump and Freeform Textarea
const isBrainDumpMode = ref(true)

function selectFramework(slug: string) {
  selectedFrameworkSlug.value = slug
  isBrainDumpMode.value = true // Auto switch to brain dump when framework changes
}

function handleCompose(composedText: string) {
  localInput.value = composedText
  isBrainDumpMode.value = false // Switch to textarea for user review/edit
}

function handleTopicSelect(topic: string) {
  localInput.value = topic
  isBrainDumpMode.value = false // Switch to textarea
}

function handleGenerate() {
  emit('generate', localInput.value)
}
</script>

<template>
  <div class="flex flex-col gap-8 p-6 lg:p-8 h-full overflow-y-auto custom-scrollbar">
    
    <!-- 1. Framework Selector Section -->
    <div class="flex flex-col gap-4">
      <div class="font-mono text-xs tracking-wider text-[var(--p-on-surface-variant)] uppercase flex items-center justify-between">
        <span>1. CHỌN FRAMEWORK BÀI VIẾT</span>
      </div>
      
      <!-- Horizontal scroll on mobile, grid on desktop -->
      <div class="flex overflow-x-auto lg:grid lg:grid-cols-2 gap-3 pb-2 lg:pb-0 snap-x">
        <FrameworkCard
          v-for="fw in frameworks"
          :key="fw.slug"
          :framework="fw"
          :is-selected="selectedFrameworkSlug === fw.slug"
          class="snap-start"
          @select="selectFramework"
        />
      </div>
    </div>

    <!-- 2. Input Section -->
    <div class="flex flex-col gap-4" v-if="currentFramework">
      <div class="font-mono text-xs tracking-wider text-[var(--p-on-surface-variant)] uppercase flex items-center justify-between">
        <span>2. PHÁT TRIỂN Ý TƯỞNG</span>
        
        <!-- Toggle Mode Buttons (Only show when not in Brain Dump mode) -->
        <button 
          v-if="!isBrainDumpMode"
          type="button" 
          class="text-[11px] text-[var(--p-primary)] hover:underline flex items-center gap-1 cursor-pointer"
          @click="isBrainDumpMode = true"
        >
          <Icon name="lucide:brain-circuit" class="w-3.5 h-3.5" />
          Dùng Brain Dump
        </button>
      </div>

      <!-- Mode A: Brain Dump Guided Input -->
      <div v-show="isBrainDumpMode" class="animate-in fade-in slide-in-from-top-4 duration-300">
        <BrainDumpInput
          :framework="currentFramework"
          @compose="handleCompose"
          @switch-to-freeform="isBrainDumpMode = false"
        />
      </div>

      <!-- Mode B: Freeform Textarea -->
      <div v-show="!isBrainDumpMode" class="flex flex-col gap-2 relative animate-in fade-in duration-300">
        <div class="relative">
          <textarea
            v-model="localInput"
            placeholder="Review ý tưởng của bạn trước khi AI xử lý..."
            rows="6"
            class="w-full bg-[var(--p-surface-container-high)] border border-[var(--p-outline-variant)] rounded-[var(--radius-md)] p-[16px] text-[15px] font-sans text-[var(--p-on-surface)] placeholder-[var(--p-on-surface-variant)] focus:outline-none focus:border-[var(--p-primary)] resize-none transition-colors min-h-[160px]"
          />
          <div class="absolute bottom-3 right-4 font-mono text-xs text-[var(--p-on-surface-variant)] pointer-events-none">
            {{ localInput.length }} ký tự
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Niche Suggestions -->
    <div class="pt-2 border-t border-[var(--p-outline-variant)]">
      <NicheTopicSuggestions
        :niche="userNiche"
        @select-topic="handleTopicSelect"
      />
    </div>

    <!-- Generate Button (Sticky at bottom if needed, or just normal flow) -->
    <div class="mt-4">
      <button
        type="button"
        class="w-full h-[52px] bg-[var(--p-primary)] text-[var(--p-on-primary)] font-semibold text-[15px] rounded-[var(--radius-md)] card-hover flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!localInput.trim() && !isBrainDumpMode"
        @click="handleGenerate"
      >
        Tạo bài viết với AI <Icon name="lucide:sparkles" class="w-5 h-5" />
      </button>
    </div>

  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
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
