# UI/UX Design Specification — AI Growth OS for Threads

> **Phiên bản:** v1.1 (Monochrome & Geist Design System)  
> **Tài liệu liên quan:** `ai-growth-os-for-threads.md` (PRD v3.0)  
> **Ngày cập nhật:** 2026-07-29  

---

## Mục lục

1. [Design Philosophy](#1-design-philosophy)
2. [Design System — Nền tảng Visual](#2-design-system)
3. [Cấu trúc tổng thể App](#3-cấu-trúc-tổng-thể-app)
4. [Màn hình 0 — Landing Page](#4-màn-hình-0--landing-page)
5. [Màn hình 1 — Auth (Đăng ký / Đăng nhập)](#5-màn-hình-1--auth)
6. [Màn hình 2 — Onboarding (Chỉ hiện 1 lần)](#6-màn-hình-2--onboarding)
7. [Màn hình 3 — Main Screen (Trang chính)](#7-màn-hình-3--main-screen)
8. [Màn hình 4 — History (Lịch sử)](#8-màn-hình-4--history)
9. [Màn hình 5 — Settings](#9-màn-hình-5--settings)
10. [Micro-interactions & Animations](#10-micro-interactions--animations)
11. [Responsive Design (Mobile)](#11-responsive-design-mobile)
12. [Empty States & Error States](#12-empty-states--error-states)

---

## 1. Design Philosophy

### Ba nguyên tắc thị giác cốt lõi

**1. Monochrome High-Contrast (Đen Trắng Tối Giản & Sắc Nét)**  
Loại bỏ hoàn toàn các màu sắc sặc sỡ và gradient màu tím/violet. Sử dụng phong cách thẩm mỹ Đen - Trắng - Xám tương phản cao (Monochrome), mang cảm giác chuyên nghiệp, hiện đại, tối giản như các công cụ cao cấp (Vercel, GitHub, Raycast).

**2. Focus over Features (Tập trung hơn Tính năng)**  
Toàn bộ giao diện dồn sức vào 1 hành động chính: Nhập ý tưởng → Bấm Generate → Nhận bài viết. Mọi yếu tố thừa đều bị loại bỏ.

**3. Confidence by Design (Thiết kế tạo sự tự tin)**  
Output hiển thị chân thực như giao diện Threads gốc. Khi nhìn thấy bài viết nằm gọn gàng trên bản Preview đơn sắc sắc nét, người dùng cảm thấy tự tin và muốn đăng ngay.

---

## 2. Design System

Hệ thống thiết kế đồng bộ hoàn toàn với hệ thống CSS Tokens chuẩn của dự án (`Geist` font + Monochrome Palette).

### 2.1 Color Palette

#### Bảng màu Dark Mode (Mặc định)

```
Background Layer
─────────────────────────────────────────
--p-background        : #0C0C0C   ← Nền ngoài cùng
--p-surface           : #0C0C0C   ← Nền surface chính
--p-surface-dim       : #1A1A1A   ← Sub-surface mờ
--p-surface-bright    : #1F1F1F   ← Bright surface
--p-surface-container : #1F1F1F   ← Card, Container
--p-surface-container-high: #262626← Input, Dropdown, Hover state
--p-surface-container-highest: #2E2E2E ← Elevated elements

Borders & Lines
─────────────────────────────────────────
--p-outline           : #8A8485   ← Border phân cách rõ
--p-outline-variant   : #3D3839   ← Border mờ mặc định
--p-grid-line         : #262626   ← Đường lưới nền

Text & Foregrounds
─────────────────────────────────────────
--p-on-background     : #F2F2F2   ← Text chính (Trắng kem)
--p-on-surface        : #F2F2F2   ← Text trên surface
--p-on-surface-variant: #B5B0B1   ← Label, Subtext, Placeholder
--p-primary           : #F5F5F5   ← Primary action background (Nền trắng)
--p-on-primary         : #0C0C0C   ← Primary action text (Text đen)
--p-secondary         : #A3A3A3   ← Secondary text / Neutral accent
--p-code-bg           : #161616   ← Code/Mono background
```

#### Bảng màu Light Mode

```
Background Layer
─────────────────────────────────────────
--p-background        : #F9F9F9
--p-surface           : #F9F9F9
--p-surface-container : #EEEEEE
--p-surface-container-high: #E8E8E8

Borders & Lines
─────────────────────────────────────────
--p-outline           : #7E7576
--p-outline-variant   : #CFC4C5
--p-grid-line         : #E2E2E2

Text & Foregrounds
─────────────────────────────────────────
--p-on-background     : #1A1C1C
--p-on-surface        : #1A1C1C
--p-on-surface-variant: #4C4546
--p-primary           : #000000   ← Primary action (Nền đen)
--p-on-primary         : #FFFFFF   ← Primary action text (Text trắng)
--p-secondary         : #5E5E5E
```

---

### 2.2 Typography

Hệ thống Font sử dụng chuẩn **Geist Sans** và **JetBrains Mono** của dự án.

```
Font Families
─────────────────────────────────────────
Primary Sans : "Geist", ui-sans-serif, system-ui, sans-serif
Monospace    : "JetBrains Mono", ui-monospace, monospace

Type Scale & Styles
─────────────────────────────────────────
Display XL   : 48px (768px+: 72px) / 700 / -0.04em  ← Hero Headline
Headline LG  : 32px (768px+: 40px) / 600 / -0.02em  ← Section H1
Headline MD  : 24px / 600 / line-height 1.3         ← H2, Card Title
Body LG      : 18px / 400 / line-height 1.6         ← Text lớn
Body MD      : 16px / 400 / line-height 1.6         ← Nội dung chính
Label (Mono) : 12px / 500 / JetBrains Mono          ← Tags, Metadata, Code
Code (Mono)  : 14px / 400 / JetBrains Mono          ← Output code/snippets
```

---

### 2.3 Spacing & Radius (Monochrome Sharp Aesthetics)

```
Spacing Unit : Base 4px Grid (4px, 8px, 12px, 16px, 24px, 32px, 48px)

Radius System:
  Sản phẩm sử dụng thiết kế sắc nét hoặc vuông bo nhẹ:
  --radius-sm  : 0px / 4px
  --radius-md  : 4px / 8px  ← Buttons, Inputs
  --radius-lg  : 8px / 12px ← Cards, Preview Panels
  --radius-full: 9999px     ← Avatar, Pill Badges
```

---

### 2.4 Component Library (Core Components - Đen Trắng)

#### Button System

```
PRIMARY BUTTON (Đen/Trắng Tương phản Cao):
  Dark Mode  : Background #F5F5F5, Text #0C0C0C, Font SemiBold 14px
  Light Mode : Background #000000, Text #FFFFFF, Font SemiBold 14px
  Border     : 1px solid transparent
  Hover      : Invert / Opacity 0.9 + translate(-2px, -2px)
  Active     : translate(0px, 0px)
  Loading    : Spinner trắng/đen, Opacity 0.7

SECONDARY BUTTON:
  Background : transparent
  Border     : 1px solid var(--p-outline-variant)
  Text       : var(--p-on-surface)
  Hover      : Background var(--p-surface-container-high), Border var(--p-outline)

GHOST BUTTON:
  Background : transparent
  Border     : 1px solid transparent
  Text       : var(--p-secondary)
  Hover      : Text var(--p-on-surface), Background var(--p-surface-container)
```

#### Input & Textarea

```
Background   : var(--p-surface-container-high)
Border       : 1px solid var(--p-outline-variant)
Radius       : 6px
Padding      : 14px 16px
Font         : Geist Sans 15px Regular, var(--p-on-surface)
Placeholder  : var(--p-on-surface-variant)

Focus State:
  Border     : 1px solid var(--p-primary)
  Box-shadow : 0 0 0 1px var(--p-primary)

Character Count:
  Font       : JetBrains Mono 12px, var(--p-secondary)
```

#### Monochrome Badge / Tag

```
Thiết kế đơn sắc hoàn toàn (Monochrome Tags):
Background   : var(--p-surface-container-high)
Border       : 1px solid var(--p-outline-variant)
Text         : var(--p-on-surface)
Font         : JetBrains Mono 12px Medium
Padding      : 4px 10px
Radius       : 4px

Trạng thái Selected:
  Background : var(--p-primary)
  Text       : var(--p-on-primary)
  Border     : 1px solid var(--p-primary)
```

---

## 3. Cấu trúc Tổng thể App

### Navigation Architecture

```
/ (Landing Page)
├── /auth (Login / Register)
├── /onboarding (Khởi tạo profile 1 lần)
└── /app
    ├── /app/generate (Trang chính - Split Screen)
    ├── /app/history  (Lịch sử bài viết)
    └── /app/settings (Cài đặt cá nhân)
```

### Top Navigation Bar (Header)

```
Height       : 64px
Background   : var(--p-surface)
Border-bottom: 1px solid var(--p-outline-variant)
Position     : sticky top-0, z-index: 50

LEFT  : Logo Đen Trắng "AI GROWTH OS" (Geist Mono 14px Bold + Icon hình khối sắc nét)
CENTER: Nav Links — "Generate" | "History" (Ghost Style, Active: Underline trắng/đen)
RIGHT : [User Avatar Circle / Monogram] → Dropdown Settings
```

---

## 4. Màn hình 0 — Landing Page

### Layout & Hero Section

```
┌─────────────────────────────────────────────────────────┐
│                        HERO                              │
│             (Full Height, Grid Background)              │
│                                                          │
│  [TAG MONO: "DÀNH CHO CREATOR TRÊN THREADS"]             │
│                                                          │
│  Biến ý tưởng thô thành bài Threads                     │
│  chất lượng trong 3 phút.                                │
│                                                          │
│  [Mô tả đơn sắc 1 dòng]                                 │
│                                                          │
│  [Nút Primary CTA: "Bắt đầu tạo bài viết →"]            │
│  [Text phụ: "Không cần thẻ tín dụng"]                  │
│                                                          │
│  [Hero Visual: Mockup Đen Trắng giao diện App]           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Chi tiết Visual:**
- Background có họa tiết đường lưới nhạt `var(--p-grid-line)` kích thước 24px x 24px đúng chuẩn `main.css` của dự án.
- Chữ Headline dùng font `Geist` size 48px (Mobile) / 72px (Desktop), đậm, tương phản cao.

---

## 5. Màn hình 1 — Auth (Đăng ký / Đăng nhập)

```
Layout    : Full screen với background đường lưới đen trắng
Center    : Card Đen Trắng (Width 440px, Border 1px solid var(--p-outline-variant), Bg var(--p-surface-container-lowest))

Cấu trúc:
  [Logo + AI GROWTH OS]
  Title   : "Chào mừng trở lại" (Geist 24px Bold)
  Button  : [Google Icon] Continue with Google (Secondary Button Style)
  Divider : ────── hoặc ──────
  Input   : Email & Password (Monochrome Style)
  Button  : [Đăng nhập] (Primary Button Solid Black/White)
```

---

## 6. Màn hình 2 — Onboarding (3 Bước Tối giản)

### Wizard Header
- Progress bar: Đường kẻ đơn sắc 2px chạy ngang top (`var(--p-primary)`).
- Text chỉ hướng: `STEP 01/03` (JetBrains Mono 12px).

### Step 1: Chọn Niche (Chủ đề)
- Grid 8 ô Niche: Technology, Marketing, Design, Business, Freelance, Startup, Education, Other.
- Border 1px solid `var(--p-outline-variant)`.
- **Selected State:** Nền `var(--p-primary)`, Chữ `var(--p-on-primary)`, Border sắc nét.

### Step 2: Mô tả bản thân
- Textarea đơn sắc 3 dòng.
- Box gợi ý (Info Box): Nền `var(--p-surface-container-high)`, Border trái 2px `var(--p-primary)`.

### Step 3: Chọn Tone giọng văn
- 4 Card dạng dãy ngang/dọc:
  1. *Thực chiến & Thẳng thắn*
  2. *Gần gũi & Trực diện*
  3. *Chuyên sâu & Số liệu*
  4. *Kể chuyện & Chia sẻ*
- Trạng thái chọn: Khung viền đậm `var(--p-primary)` + Dấu tích đơn sắc.

---

## 7. Màn hình 3 — Main Screen (Trang chính - Split Screen)

### Layout Split-Screen (Desktop ≥ 1024px)

```
┌────────────────────────────────────────────────────────────────┐
│ TOP NAV (64px)                                                  │
├───────────────────────────┬────────────────────────────────────┤
│ INPUT PANEL (50% Width)   │ PREVIEW PANEL (50% Width)          │
│                           │                                    │
│ [Framework Selector Badge]│ [Threads Preview Card]             │
│ [Textarea Input]          │                                    │
│ [Smart Suggestions]       │ [Copy / Regenerate / Edit Toolbar] │
│ [Generate Button]         │                                    │
└───────────────────────────┴────────────────────────────────────┘
```

### 7.1 Panel Trái — Input Area

1. **Framework Selector:**
   - Dropdown chọn Framework đơn sắc.
   - Badge hiển thị dạng Mono: `[FRAMEWORK: UNPOPULAR OPINION]`.
2. **Textarea:**
   - Background `var(--p-surface-container-high)`.
   - Font `Geist Sans` 15px.
   - Character counter góc dưới dạng Mono `JetBrains Mono`.
3. **Smart Suggestions (Gợi ý Thông minh):**
   - Tiêu đề: `💡 CÂU HỎI KÍCH THÍCH Ý TƯỞNG` (JetBrains Mono).
   - Danh sách các câu hỏi gợi ý dạng Card đơn sắc.
   - Click "Dùng câu này →" để tự động chèn vào Textarea.
4. **Generate Button:**
   - Button rộng 100%, chiều cao 48px.
   - Font Geist 16px Bold.
   - Nền `var(--p-primary)`, Text `var(--p-on-primary)`.

### 7.2 Panel Phải — Threads Post Preview

1. **Giao diện Mô phỏng Threads (Monochrome Threads Preview):**
   - Card hiển thị với avatar đơn sắc, username, timestamp.
   - Nội dung giữ nguyên các ngắt dòng, khoảng trắng.
   - Bar tương tác phía dưới: `❤️  💬  🔁  🔖` (Biểu tượng nét mảnh đơn sắc).
2. **Toolbar Hành Động:**
   - **[Nút Copy]:** Primary Style. Khi click thành công đổi thành `✓ ĐÃ COPY` (Background trắng/đen giữ 2.5s).
   - **[Nút Viết lại (Regenerate)]:** Secondary Style với icon xoay đơn sắc.
   - **[Nút Chỉnh sửa (Edit)]:** Ghost Style. Chuyển bài viết thành khung gõ trực tiếp để sửa nhanh trước khi copy.

---

## 8. Màn hình 4 — History (Lịch sử bài viết)

- **Filter Bar:** Thanh lọc các bài viết cũ theo Framework dạng các nút Mono Pill đơn sắc (`[Tất cả]`, `[How-To]`, `[Opinion]`).
- **Grid Bài viết cũ:**
  - Card nền `var(--p-surface-container)`, viền 1px `var(--p-outline-variant)`.
  - Nút thao tác nhanh trên từng card: `[Copy]` và `[Tải lại vào Editor]`.

---

## 9. Màn hình 5 — Settings (Cài đặt)

- Giao diện thiết lập đơn sắc rõ ràng.
- Chỉnh sửa Niche, Bio ngắn, và Tone giọng văn.
- Cho phép toggle chuyển đổi giữa **Dark Mode** (#0C0C0C) và **Light Mode** (#F9F9F9).

---

## 10. Micro-interactions & Polish

- **Hover Effect (`card-hover` từ project):**
  Khi hover các Card chính, Card sẽ dịch chuyển nhẹ `translate(-2px, -2px)` và hiện bóng đổ viền cứng đơn sắc `box-shadow: 2px 2px 0px var(--p-primary)`.
- **Button Click State:** Nút lún xuống nhẹ `translate(0, 0)` khi active.
- **Copy Feedback:** Toast notification đơn sắc xuất hiện ở góc dưới bên phải: `[✓ Đã sao chép bài viết vào Clipboard]`.

---

## 11. Responsive Mobile (< 768px)

- Chuyển từ Split-screen 2 cột thành 1 cột dọc cuộn trang.
- **Bottom Navigation Bar (Mobile):** Cố định dưới chân màn hình với 3 tab: `[Tạo bài]`, `[Lịch sử]`, `[Cài đặt]`.
- Nút **Generate** được ghim cố định (Sticky) ở ngay phía trên Bottom Tab Bar khi cuộn trang.

---

## 12. Tóm tắt Quy chuẩn Visual cho Developer

| Yếu tố | Quy định |
| :--- | :--- |
| **Màu Accent** | **KHÔNG CÓ**. Chỉ dùng Đen `#000000` / `#0C0C0C` và Trắng `#FFFFFF` / `#F5F5F5` cùng các tông Xám trung tính. |
| **Font Chính** | `Geist` (Sans-serif) cho toàn bộ tiêu đề & nội dung. |
| **Font Phụ** | `JetBrains Mono` cho Labels, Badges, Code, và Metadata. |
| **Đường viền (Borders)** | Sắc nét, 1px solid `var(--p-outline-variant)`. |
| **Giao diện Threads** | Mô phỏng chính xác layout đơn sắc của Threads app. |
