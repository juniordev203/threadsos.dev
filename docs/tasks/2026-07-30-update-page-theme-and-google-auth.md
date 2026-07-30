# Spec: Update Page Theme (White Background, No Grid Lines) & Google Auth Button

- **Date:** 2026-07-30
- **Status:** Pending Review

---

## 1. Goal & Scope

### Goal
- Change default page background to clean white (`#FFFFFF`) and completely eliminate grid background pattern/lines (`bg-grid`) across pages (specifically homepage and auth page).
- Make the "Continue with Google" button on the auth page functional with loading state and insert the official Google SVG icon.

### Scope
- **In Scope:**
  - `app/assets/css/main.css`: Update `:root` design tokens to clean white background (`#FFFFFF`) and remove background grid lines (`.bg-grid`).
  - `app/components/landing/LandingHero.vue`: Remove `bg-grid` class.
  - `app/pages/auth.vue`: Remove `bg-grid` class, add official 4-color Google SVG icon, add click handler with loading state, and handle Clerk Google SSO redirect with fallback to `/onboarding`.
- **Out of Scope:**
  - Modifying Supabase database schema or external Clerk dashboard settings.

---

## 2. Technical Design & Affected Components

### [MODIFY] [main.css](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/assets/css/main.css)
- Set `:root` background token `--p-background: #FFFFFF` and default text tokens to dark foreground colors (`--p-on-background: #1A1C1C`, `--p-surface-container-lowest: #FFFFFF`, etc.).
- Update `.bg-grid` definition to remove line background patterns.

### [MODIFY] [LandingHero.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/components/landing/LandingHero.vue)
- Remove `bg-grid` class from `<section>`.

### [MODIFY] [auth.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/pages/auth.vue)
- Remove `bg-grid` class from outer container.
- Embed Google 4-color SVG icon inside "Continue with Google" button.
- Add `isGoogleLoading` state and `@click="handleGoogleSignIn"`.
- Invoke Clerk Google SSO (`oauth_google`) with fallback navigation to `/onboarding`.

---

## 3. Granular Commit Plan

1. `style(theme): [Spec 1.1] set default white background and remove grid lines`
   - Modify `app/assets/css/main.css` to use `#FFFFFF` background for `:root` and remove `.bg-grid` lines.
   - Remove `bg-grid` class in `app/components/landing/LandingHero.vue`.

2. `feat(auth): [Spec 2.1] add Google icon and click handler to Continue with Google button`
   - Modify `app/pages/auth.vue`: remove `bg-grid`, add Google SVG icon, add `isGoogleLoading` spinner, and handle Google OAuth redirect.

---

## 4. Verification Plan

### Automated Checks
- Run `npm run build` or `npx nuxi check` to verify TypeScript types and Vue template compilation without errors.

### Manual Verification
- Open homepage (`/`) and auth page (`/auth`) to verify background is solid white without grid lines.
- Open `/auth` page and test clicking "Continue with Google" button: check Google icon rendering, loading spinner, and redirect behavior.
