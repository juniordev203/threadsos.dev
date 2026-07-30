# Task Spec #2.3: App Layout, Header, Navigation, and Stub Pages

> **Trạng thái:** IN_PROGRESS  
> **Ngày tạo:** 2026-07-30  
> **Tham chiếu:** [UI/UX Spec v1.1](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/docs/2026-07-29/ui-ux-design-spec.md) Section 3 (Navigation Architecture)

---

## 1. Mục tiêu & Scope

### Mục tiêu
Tạo layout ứng dụng chính (`app.vue`), các component điều hướng (`AppHeader.vue`, `AppMobileNav.vue`), các trang stub trong ứng dụng (`/app/generate`, `/app/history`, `/app/settings`) và trang đăng nhập (`/app/auth` / `auth.vue`).

### In-Scope
- `app/components/app/AppHeader.vue`: Header desktop sắc nét 64px, logo, nav links ("Generate", "History"), user avatar button.
- `app/components/app/AppMobileNav.vue`: Bottom navigation bar cố định trên mobile (56px) với 3 tab ("Tạo bài", "Lịch sử", "Cài đặt").
- `app/layouts/app.vue`: Layout chính tích hợp Header, Main slot và Mobile Nav.
- `app/pages/app/generate.vue`: Stub page cho Main Editor.
- `app/pages/app/history.vue`: Stub page cho History.
- `app/pages/app/settings.vue`: Stub page cho Settings.
- `app/pages/auth.vue`: Auth login page UI placeholder với Clerk Google & Email options.

### Out-of-Scope
- Chức năng gọi API sinh bài hay lưu DB.
- Tích hợp Clerk auth logic thực tế.

---

## 2. Thiết kế Kỹ thuật

### 2.1 File Changes
- `[NEW]` `app/components/app/AppHeader.vue`
- `[NEW]` `app/components/app/AppMobileNav.vue`
- `[NEW]` `app/layouts/app.vue`
- `[NEW]` `app/pages/app/generate.vue`
- `[NEW]` `app/pages/app/history.vue`
- `[NEW]` `app/pages/app/settings.vue`
- `[NEW]` `app/pages/auth.vue`

---

## 3. Kế hoạch Verification

- Kiểm tra typecheck Nuxt / TypeScript build (`npx nuxi typecheck` hoặc `npm run build`).
- Đảm bảo tất cả file được tạo đúng cấu trúc yêu cầu.
