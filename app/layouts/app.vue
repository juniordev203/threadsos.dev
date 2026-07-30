<template>
  <div class="min-h-screen" style="background-color: var(--p-background); color: var(--p-on-background);">
    <AppHeader />
    <main class="pb-16 md:pb-0">
      <slot />
    </main>
    <AppMobileNav />
  </div>
</template>
