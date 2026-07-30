<script setup lang="ts">
const currentStep = ref(1)
const niche = ref('')
const bio = ref('')
const tone = ref('')

const stepIndicatorText = computed(() => {
  return `STEP 0${currentStep.value}/03`
})

const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1:
      return 'Chọn lĩnh vực của bạn'
    case 2:
      return 'Mô tả bản thân'
    case 3:
      return 'Chọn giọng văn'
    default:
      return ''
  }
})

const progressWidth = computed(() => {
  switch (currentStep.value) {
    case 1:
      return '33%'
    case 2:
      return '66%'
    case 3:
      return '100%'
    default:
      return '33%'
  }
})

const isNextDisabled = computed(() => {
  if (currentStep.value === 1) {
    return !niche.value
  }
  if (currentStep.value === 2) {
    return !bio.value.trim()
  }
  if (currentStep.value === 3) {
    return !tone.value
  }
  return false
})

function handleNext() {
  if (isNextDisabled.value) return

  if (currentStep.value < 3) {
    currentStep.value++
  } else {
    navigateTo('/app/generate')
  }
}

function handleBack() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
</script>

<template>
  <div class="min-h-screen w-full flex flex-col" style="background-color: var(--p-background); color: var(--p-on-background);">
    <!-- Top thin progress bar line -->
    <div class="w-full h-[2px] bg-[var(--p-surface-container-high)] relative">
      <div
        class="h-full transition-all duration-300 ease-out"
        style="background-color: var(--p-primary);"
        :style="{ width: progressWidth }"
      />
    </div>

    <!-- Main Container -->
    <main class="w-full max-w-[600px] mx-auto px-6 pt-12 pb-16 flex-1 flex flex-col justify-between">
      <div>
        <!-- Step Header -->
        <div class="mb-8">
          <span class="font-mono text-xs tracking-wider uppercase block mb-2" style="color: var(--p-on-surface-variant);">
            {{ stepIndicatorText }}
          </span>
          <h1 class="text-headline-md font-bold" style="color: var(--p-on-surface);">
            {{ stepTitle }}
          </h1>
        </div>

        <!-- Step Components -->
        <div class="step-content">
          <OnboardingNiche v-if="currentStep === 1" v-model="niche" />
          <OnboardingBio v-else-if="currentStep === 2" v-model="bio" />
          <OnboardingTone v-else-if="currentStep === 3" v-model="tone" />
        </div>
      </div>

      <!-- Bottom Navigation Buttons -->
      <div class="mt-12 pt-6 flex items-center justify-between" style="border-top: 1px solid var(--p-outline-variant);">
        <div>
          <button
            v-if="currentStep > 1"
            type="button"
            class="btn-secondary px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer"
            @click="handleBack"
          >
            Quay lại
          </button>
        </div>

        <button
          type="button"
          class="btn-primary px-6 py-2.5 text-sm font-semibold transition-all duration-150 cursor-pointer"
          :disabled="isNextDisabled"
          @click="handleNext"
        >
          {{ currentStep === 3 ? 'Hoàn thành' : 'Tiếp tục' }}
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.btn-primary {
  background-color: var(--p-primary);
  color: var(--p-on-primary);
  border-radius: var(--radius-md);
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
  transform: translate(-1px, -1px);
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: transparent;
  color: var(--p-on-surface);
  border: 1px solid var(--p-outline-variant);
  border-radius: var(--radius-md);
}

.btn-secondary:hover {
  background-color: var(--p-surface-container-high);
  border-color: var(--p-outline);
}
</style>
