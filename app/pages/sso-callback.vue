<script setup lang="ts">
useSeoMeta({ title: 'Đang xác thực... — AI Growth OS' })
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-[var(--p-background)]">
    <!-- Optional Loading State -->
    <ClerkLoading>
      <div class="flex flex-col items-center gap-4">
        <div class="h-10 w-10 animate-spin rounded-full border-4 border-[var(--p-outline-variant)] border-t-[var(--p-primary)]"></div>
        <p class="font-mono text-sm text-[var(--p-on-surface-variant)]">Đang xử lý đăng nhập...</p>
      </div>
    </ClerkLoading>

    <!-- Handle SSO Callback -->
    <ClerkLoaded>
      <AuthenticateWithRedirectCallback />
    </ClerkLoaded>
  </div>
</template>
