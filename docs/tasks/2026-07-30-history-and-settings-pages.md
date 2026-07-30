# Task Spec #2.7: Build History and Settings Pages

> **Trạng thái:** IN_PROGRESS  
> **Ngày tạo:** 2026-07-30  
> **Tham chiếu:** [UI/UX Spec v1.1](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/docs/2026-07-29/ui-ux-design-spec.md) Section 8 (History) & Section 9 (Settings)

---

## 1. Mục tiêu & Scope

### Mục tiêu
Xây dựng các component Lịch sử bài viết (`HistoryFilterBar.vue`, `HistoryPostCard.vue`), hoàn thiện trang Lịch sử (`/app/history`) và trang Cài đặt (`/app/settings`).

### In-Scope
- `app/components/history/HistoryFilterBar.vue`: Thanh lọc theo framework dạng horizontal scrollable pills.
- `app/components/history/HistoryPostCard.vue`: Card hiển thị bài viết đã lưu với các nút Copy và Tải lại.
- `app/pages/app/history.vue`: Trang lịch sử bài viết hiển thị tiêu đề, FilterBar, Grid bài viết và Empty state khi không có kết quả.
- `app/pages/app/settings.vue`: Trang cài đặt người dùng với các section Niche (Grid 2x4), Bio (Textarea), Tone (4 radio cards), Theme Toggle (Dark/Light) và nút Lưu thay đổi.

### Out-of-Scope
- Chưa kết nối Supabase API thực tế (sử dụng mock state/mock data theo spec).

---

## 2. Thiết kế Kỹ thuật

### 2.1 File Changes
- `[NEW]` `docs/tasks/2026-07-30-history-and-settings-pages.md`
- `[NEW]` `app/components/history/HistoryFilterBar.vue`
- `[NEW]` `app/components/history/HistoryPostCard.vue`
- `[MODIFY]` `app/pages/app/history.vue`
- `[MODIFY]` `app/pages/app/settings.vue`

---

## 3. Kế hoạch Verification

- Kiểm tra typecheck / build (`npx nuxi typecheck` hoặc Nuxt build).
- Kiểm tra tính đúng đắn của props, state, styling (monochrome design tokens) theo quy định trong `main.css`.
