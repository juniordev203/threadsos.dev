# Task Spec: [Tên Task / Feature / Bugfix]

> **Trạng thái:** DRAFT / IN_PROGRESS / COMPLETED  
> **Ngày tạo:** YYYY-MM-DD  
> **Người thực hiện:** Developer / Agent  

---

## 1. Mục tiêu & Scope (Goal & Scope)

### Mục tiêu
- Mô tả chi tiết vấn đề cần giải quyết hoặc tính năng cần phát triển.

### In-Scope
- [ ] Tính năng A
- [ ] Refactor module B

### Out-of-Scope
- ❌ Tính năng X (sẽ làm ở Phase sau)

---

## 2. Thiết kế Kỹ thuật (Technical Design)

### Các file bị ảnh hưởng (Affected Files)
- `[NEW]` [path/to/new-file.ts](file:///path/to/new-file.ts)
- `[MODIFY]` [path/to/existing-file.ts](file:///path/to/existing-file.ts)
- `[DELETE]` [path/to/old-file.ts](file:///path/to/old-file.ts)

### Chi tiết thay đổi (Change Details)
- **Data Models / State:**
- **API / Components:**
- **GitNexus Impact Analysis:** (Liệt kê kết quả `impact()` nếu có thay đổi symbol quan trọng).

---

## 3. Kế hoạch Commits (Granular Commit Plan)

Mỗi commit đại diện cho một bước nhỏ hoàn chỉnh và có thể kiểm tra độc lập.

- [ ] **Commit 1:** `feat(<scope>): [Spec 1.1] <Tiêu đề commit 1>`
  - **Mô tả:** [Làm việc gì trong commit me]
  - **Files:** `path/to/file1.ts`
- [ ] **Commit 2:** `feat(<scope>): [Spec 1.2] <Tiêu đề commit 2>`
  - **Mô tả:** [Làm việc gì trong commit này]
  - **Files:** `path/to/file2.ts`

---

## 4. Kế hoạch Kiểm thử (Verification Plan)

### Automated Checks
- `npm run build` / `npx nuxi typecheck`
- `npx gitnexus detect_changes`

### Manual Checks
- [ ] Check 1: Giao diện hiển thị đúng...
- [ ] Check 2: Thao tác copy bài viết hoạt động...
