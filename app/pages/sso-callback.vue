<script setup lang="ts">
useSeoMeta({ title: 'Đang xác thực... — AI Growth OS' })

const { isSignedIn, isLoaded } = useAuth()

// Auto-redirect watch when user is signed in
watch([isLoaded, isSignedIn], ([loaded, signedIn]) => {
  if (loaded && signedIn) {
    navigateTo('/onboarding')
  }
}, { immediate: true })

// Fallback safety timeout: ensure user is never stuck on sso-callback page
onMounted(() => {
  setTimeout(() => {
    navigateTo('/onboarding')
  }, 2500)
})
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-[var(--p-background)] p-4">
    <div class="flex flex-col items-center gap-4 text-center">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-[var(--p-outline-variant)] border-t-[var(--p-primary)]"></div>
      <div class="flex flex-col gap-1">
        <p class="font-mono text-sm font-semibold text-[var(--p-on-background)]">Đang hoàn tất đăng nhập...</p>
        <p class="text-xs text-[var(--p-on-surface-variant)]">Hệ thống đang chuyển hướng bạn đến trang Onboarding</p>
      </div>
    </div>

    <ClientOnly>
      <ClerkLoaded>
        <AuthenticateWithRedirectCallback signInForceRedirectUrl="/onboarding" signUpForceRedirectUrl="/onboarding" />
      </ClerkLoaded>
    </ClientOnly>
  </div>
</template>
