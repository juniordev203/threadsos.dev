# Spec: Replace Emojis with Icons & Update Google Auth

- **Date:** 2026-07-30
- **Status:** Done

---

## 1. Goal & Scope

### Goal
- Replace all emojis (⚡️, 📋, 🔄, ✏️, ◇, ◎, ✓) used as icons across the application with standard Nuxt icons (`@nuxt/icon` using the `lucide` icon set).
- Keep the existing Google SVG icon in the login button.
- Refactor the Google login implementation in `auth.vue` to use production-standard Clerk Nuxt composables (`useSignIn`) and create a proper SSO callback page.

### Scope
- **In Scope:**
  - Install and configure `@nuxt/icon`.
  - Replace emojis with `<Icon name="lucide:..." />` across all components and pages.
  - Refactor `app/pages/auth.vue` to use `useSignIn()`.
  - Create `app/pages/sso-callback.vue` to handle the OAuth redirect with `<AuthenticateWithRedirectCallback />`.

---

## 2. Technical Design & Affected Components

### [MODIFY] package.json & nuxt.config.ts
- Add `@nuxt/icon` as a dev dependency and to Nuxt modules list.

### [MODIFY] UI Components (Replacing Emojis)
- `app/components/editor/EditorInputPanel.vue`: Replace ⚡.
- `app/components/editor/EditorPreviewPanel.vue`: Replace ◇, 📋, 🔄, ✏️.
- `app/components/history/HistoryPostCard.vue`: Replace ✓.
- `app/components/landing/LandingFeatures.vue`: Replace ◇, ⚡, ◎.
- `app/components/app/AppMobileNav.vue`: Replace ✏️, 📋.
- `app/components/onboarding/OnboardingTone.vue`: Replace ✓.
- `app/pages/app/settings.vue`: Replace ✓.

### [MODIFY] [auth.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/pages/auth.vue)
- Import and use `const { isLoaded, signIn } = useSignIn()`.
- Refactor `handleGoogleSignIn` to use `signIn.value.authenticateWithRedirect()`.

### [NEW] [sso-callback.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/pages/sso-callback.vue)
- Create new page to handle the OAuth redirect using `<AuthenticateWithRedirectCallback />`.

---

## 3. Granular Commit Plan

1. `build: [Spec 1.1] install and configure @nuxt/icon`
2. `refactor(ui): [Spec 1.2] replace emojis with lucide icons across the app`
3. `feat(auth): [Spec 2.1] refactor Google login to production standard and add sso-callback page`

---

## 4. Verification Plan

- Run `pnpm dev` and manually verify that icons load properly (no missing icons).
- Verify the Google Auth flow redirects to Google and back successfully.
- Run `pnpm build` to ensure no build errors.
