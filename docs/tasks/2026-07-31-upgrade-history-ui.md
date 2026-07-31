# Nâng cấp giao diện Lịch sử bài viết (History UI)

## Goal & Scope

Trang History hiện tại đang ở trạng thái khá cơ bản:
1. Bị hardcode `user_demo_123` thay vì dùng ID của user thật (Clerk).
2. UI dạng Grid cơ bản, cắt chữ (line-clamp-3) chưa mang lại cảm giác đọc "đã".
3. Filter bar còn thô sơ, chưa dùng dữ liệu Framework xịn (có icon, color) mà ta vừa làm ở task trước.
4. Trạng thái trống (Empty State) còn đơn điệu.

**Mục tiêu**:
Biến trang History thành một kho lưu trữ bài viết xịn xò (premium archive), giúp user dễ dàng đọc lại, quản lý và tái sử dụng nội dung đã tạo.

**Phạm vi**:
- ✅ Sửa lỗi fetch data (lấy đúng `user.id` từ Clerk thay vì hardcode).
- ✅ Nâng cấp `HistoryFilterBar` để lấy dữ liệu Framework động từ API (hiển thị màu sắc/icon).
- ✅ Nâng cấp `HistoryPostCard` để hiển thị đẹp hơn, không cắt cụt quá nhiều chữ, dùng Masonry Layout (hoặc CSS columns) để hiển thị mượt mà các card có độ dài khác nhau.
- ✅ Thiết kế lại trạng thái Empty State để điều hướng user sang trang Generate.
- ❌ Không làm tính năng Search/Pagination ở scope này (để giữ hệ thống nhanh gọn).

---

## User Review Required

> [!IMPORTANT]
> **Quyết định UX: Masonry Layout**
> Do các bài Threads có độ dài ngắn khác nhau, tôi đề xuất sử dụng **Masonry Layout** (giống Pinterest) bằng CSS columns thay vì Grid thông thường. Điều này giúp các card xếp khít vào nhau theo chiều dọc rất đẹp mắt và hiện đại. Bạn có đồng ý với phong cách layout này không?

> [!WARNING]
> Trang History đang dùng `mockThreads` (dữ liệu giả) khi API lỗi hoặc trống. Tôi sẽ **xóa hoàn toàn dữ liệu giả này** để hệ thống phản ánh đúng 100% dữ liệu thực của bạn trong Database.

---

## Proposed Changes

### 1. Fix Data Layer & Core Layout

#### [MODIFY] [history.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/pages/app/history.vue)
- Xóa mảng `mockThreads` hardcode.
- Import `useUser` từ `@clerk/vue` để lấy `user.value.id` cho hàm `getThreadHistory()`.
- Lấy danh sách Frameworks từ `getFrameworks()` để truyền xuống `HistoryFilterBar` và `HistoryPostCard`.
- Áp dụng CSS `columns-1 md:columns-2 lg:columns-3 gap-6` (Masonry layout) để bọc danh sách card.
- Thêm Loading skeleton state khi đang fetch data.

### 2. Nâng cấp Filter Bar

#### [MODIFY] [HistoryFilterBar.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/components/history/HistoryFilterBar.vue)
- Không hardcode mảng `filters` nữa. Nhận prop `frameworks` từ API.
- Render filter button có chứa `Icon` và khi active thì dùng màu `color` của framework đó.

### 3. Nâng cấp Post Card

#### [MODIFY] [HistoryPostCard.vue](file:///Users/apple/Junior@203/source-code/personal/threadsos.dev/app/components/history/HistoryPostCard.vue)
- Đổi từ `line-clamp-3` thành hiển thị trọn vẹn (hoặc line-clamp-10) để đọc mượt hơn trong layout Masonry.
- Áp dụng badge Framework có Icon và màu sắc tương ứng.
- Layout footer nút bấm (Copy, Reload) đẹp hơn, gọn hơn.

### 4. Premium Empty State

- Thay thế khung rỗng hiện tại bằng một illustration icon to, kèm nút CTA "Tạo bài viết đầu tiên" chuyển hướng thẳng sang trang Generate.

---

## Verification Plan

### Automated Tests
- `pnpm build` để đảm bảo không lỗi type/syntax.

### Manual Verification
1. Truy cập `/app/history`.
2. Kiểm tra fetch đúng dữ liệu của user đang đăng nhập (không còn thấy bài test hardcode).
3. Thử nghiệm bộ lọc Filter Bar (hiển thị màu và icon đúng).
4. Xác nhận layout Masonry hoạt động tốt khi đổi kích thước màn hình.
5. Thử nghiệm trạng thái chưa có bài viết nào (Empty State).
