# NGO THI THUY DUYEN - Living Artistic Archive
## Tài liệu Thiết kế chi tiết (Master Design Specification)

*   **Phiên bản**: 1.0
*   **Ngày tạo**: 2026-07-14
*   **Trạng thái**: Đã phê duyệt nguyên lý hệ thống - Đang chờ kiểm duyệt chi tiết

---

## 1. Tầm nhìn Dự án (Project Vision)
Thiết kế và phát triển một không gian lưu trữ trực tuyến chất lượng bảo tàng cho nghệ sĩ đương đại Việt Nam **Ngô Thị Thùy Duyên**.
*   Không phải trang web thương mại hay portfolio thông thường.
*   Tập trung vào sự chậm rãi, tĩnh lặng và sự kết nối giữa các tác phẩm, nhật ký suy tưởng và ghi chép thực địa.
*   Giao diện biến mất để làm nổi bật tác phẩm nghệ thuật.

---

## 2. Hệ thống Giao diện & Trực quan (UI/UX Design System Tokens)

### 2.1. Bảng màu (Color Palette - Light Mode)
*   **Primary Background**: `#F8F7F4` (Màu giấy ấm/trắng ngà của bảo tàng).
*   **Secondary Background**: `#F2F1ED` (Màu be xám nhẹ để phân vùng nội dung).
*   **Surface**: `#FFFFFF` (Màu trắng thuần cho các khối thẻ/hộp thoại nổi).
*   **Primary Text**: `#1C1C1C` (Màu than tối - Charcoal, tránh màu đen tuyệt đối để giảm mỏi mắt).
*   **Secondary Text**: `#505050` (Dùng cho nội dung mô tả, phụ mục).
*   **Muted Text**: `#7A7A7A` (Dùng cho thông tin phụ, ngày tháng, siêu dữ liệu).
*   **Borders**: `#E5E5E5` (Light), `#D5D5D5` (Medium) để vẽ đường kẻ ngăn cách tối giản như mục lục sách nghệ thuật.

### 2.2. Phông chữ (Typography)
*   **Tiêu đề lớn, Tuyên bố nghệ thuật, Trích dẫn**: Sử dụng font Serif cổ điển sang trọng.
    *   *Lựa chọn*: **Cormorant Garamond** (Google Fonts) hoặc **EB Garamond**.
*   **Điều hướng, Nội dung bài viết, Meta data**: Sử dụng font Sans-serif hiện đại, dễ đọc.
    *   *Lựa chọn*: **Inter** (Google Fonts).

### 2.3. Quy tắc Layout & Nhịp điệu (Whitespace & Grids)
*   **Grid**: 12 cột trên Desktop, 8 cột trên Tablet, 4 cột trên Mobile.
*   **Chiều rộng tối đa (Max Width)**:
    *   Nội dung đọc bài viết: `760px` (để dòng chữ không bị quá dài, giữ trải nghiệm đọc thoải mái).
    *   Thư viện tác phẩm: `1440px`.
*   **Khoảng trắng (Whitespace)**: Sử dụng các khoảng đệm rộng (`py-16`, `py-24`, `space-y-12`) tạo nhịp điệu thở, sự tĩnh lặng như khoảng trống trong phòng triển lãm.

---

## 3. Kiến trúc Nội dung & Điều hướng (Information Architecture)

### 3.1. Các Trang Chính & Routing
*   `/` (Home): Tác phẩm biểu tượng (Hero artwork), tuyên ngôn nghệ thuật ngắn, điều hướng tối giản và dòng chảy tác phẩm mới nổi bật.
*   `/about` (Giới thiệu): Tiểu sử nghệ sĩ, chân dung, quá trình thực hành nghệ thuật (Artistic practice).
*   `/works` (Tác phẩm): Được sắp xếp theo **6 Chương nghệ thuật (6 Chapters)** thay vì sắp xếp theo năm:
    *   **Chương 1: Emerging Presence** (Sự hiện diện mới nổi - Tác phẩm sắp đặt & trình diễn 2003-2009)
    *   **Chương 2: Departure** (Khởi hành - Loạt tranh về tình mẫu tử, sự trở thành 2008-2009)
    *   **Chương 3: Fragile Bodies** (Cơ thể mong manh - Di cư, căn tính nữ 2011-2012)
    *   **Chương 4: Temporary Presence** (Hiện diện tạm thời - Loạt tranh vẽ "Trước khi trời đổ mưa")
    *   **Chương 5: Inner Gravity** (Trọng lực nội tại - Sự hư vô, ý thức 2013)
    *   **Chương 6: The Origin of No-Self** (Nguồn gốc của Vô ngã - Chất liệu giấy Dó, khâu vá và sự chữa lành 2013-2014)
*   `/journal` (Nhật ký): Các dòng suy tưởng, bài thơ, ghi chép cá nhân.
*   `/field-notes` (Ghi chép thực địa): Ký ức về các chuyến đi (Thổ Nhĩ Kỳ, Hàn Quốc, Đài Loan, Huế, Sài Gòn).
*   `/publications` (Ấn phẩm): Các bài viết nghiên cứu, bài viết của Nobuo Takamori, phóng sự đặc biệt.
*   `/cv` (Lịch sử triển lãm): Dòng thời gian các triển lãm cá nhân, triển lãm nhóm, lưu trú nghệ thuật.
*   `/contact` (Liên hệ): Email, Instagram và liên kết xã hội tối giản.

### 3.2. Liên kết Hai chiều (Bidirectional Relationships)
Mỗi tác phẩm sẽ kết nối động với các ghi chép thực địa hoặc bài viết liên quan. Ví dụ:
*   Trang tác phẩm "Before the rain" sẽ hiển thị link dẫn tới bài viết nhật ký "Trước khi trời đổ mưa" viết năm 2013.
*   Trang tác phẩm thuộc chương lưu trú Đài Loan sẽ hiển thị link dẫn tới ghi chép thực địa "Sewing days at Howl Space".

---

## 4. Giải pháp Kỹ thuật & Thực hiện (Technical Specs)

### 4.1. Công nghệ Sử dụng
*   **Framework**: Next.js 15 (App Router, Server-rendered mặc định).
*   **Ngôn ngữ**: TypeScript (đảm bảo kiểu dữ liệu an toàn, không sử dụng `any`).
*   **Styling**: Tailwind CSS với cấu hình tùy chỉnh màu sắc và font theo Design Tokens ở Mục 2.
*   **Hiệu ứng**: Framer Motion cho các hiệu ứng chuyển trang êm dịu, cuộn mượt và phóng to ảnh (Lightbox) không giật lag.
*   **Image**: Next/Image tối ưu dung lượng, tự động sinh placeholder mờ để đảm bảo tốc độ tải tối đa.

### 4.2. Cấu trúc cơ sở dữ liệu tĩnh (`lib/data/posts.json`)
Dữ liệu Blogger sau khi parse sẽ được lọc sạch mã HTML rác, lưu trữ có cấu trúc để hiển thị lên UI một cách mượt mà nhất. Lớp `lib/repositories` sẽ xử lý các tác vụ lọc và phân trang dữ liệu.

---

## 5. Kế hoạch Kiểm thử & Bàn giao (Verification & Done Criteria)
*   **Tương thích**: Chạy mượt mà trên Mobile, Tablet và Desktop.
*   **Hiệu suất**: Điểm Lighthouse tối thiểu đạt 95 trên tất cả các mục (Performance, Accessibility, Best Practices, SEO).
*   **Tiêu chuẩn hoàn thiện (Definition of Done)**:
    1. Không còn lỗi TypeScript hoặc ESLint.
    2. Toàn bộ hình ảnh nghệ thuật từ Blogger được hiển thị đúng tỷ lệ, sắc nét và được lazy-load.
    3. Giao diện song ngữ (Anh/Việt) hiển thị nhất quán, font chữ hiển thị chuẩn hóa tiếng Việt không bị lỗi font serif.
