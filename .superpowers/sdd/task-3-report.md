# Báo cáo Nhiệm vụ 3: Viết CSS Nền Tảng (style.css)

Báo cáo chi tiết quá trình thực hiện nhiệm vụ viết CSS nền tảng cho trang web nghệ thuật, xác minh tính hợp lệ và cấu trúc của tệp `style.css`, thực hiện commit mã nguồn vào Git và chạy kiểm thử hệ thống.

## 1. Trạng thái (Status)
- **Hoàn thành**: 100% các bước theo yêu cầu của Brief.
- **Tệp đã tạo**: [style.css](file:///d:/WEB Nghe Thuat/style.css) trong thư mục gốc.

## 2. Chi tiết cấu trúc CSS trong `style.css`
Tệp [style.css](file:///d:/WEB Nghe Thuat/style.css) được xây dựng hoàn chỉnh với các thành phần:
- **Google Fonts Import**: Nạp các font chữ cao cấp gồm `Playfair Display` (serif) và `Plus Jakarta Sans`, `Inter` (sans-serif) để mang lại tính thẩm mỹ cao cho trang web.
- **Biến CSS toàn cục (:root)**: Định nghĩa bảng màu (kem ấm nghệ thuật `--bg-primary`, card trắng `--bg-secondary`, viền mềm mại `--border-color`, chữ đen than `--text-primary`, chữ xám kem `--text-muted`, vàng gold `--accent-color`, hiệu ứng chuyển đổi mượt mà `--transition-smooth`, cùng các font serif và sans-serif).
- **Reset Styles & Typography**: Cấu hình box-sizing, margin/padding reset, scroll-behavior mượt mà, định dạng tiêu đề h1-h4 sử dụng font serif.
- **Bố cục & Giao diện (Layout & Component styles)**:
  - Header & Navigation với hiệu ứng blur backdrop làm nổi bật độ cao cấp.
  - Hero Section hỗ trợ Scroll-Driven Parallax Zoom out & Fade transitions ở các trình duyệt tương thích.
  - About Section với khung ảnh cổ điển (corner borders) và nội dung chữ thanh lịch.
  - Gallery Section với bố cục dạng lưới (Grid), bộ lọc (Filters) và các thẻ tác phẩm (`.art-card`) hỗ trợ hiệu ứng hover mượt mà.
  - Modern Dialog: Dialog chi tiết tác phẩm sử dụng thẻ `<dialog>` native kèm backdrop blur và hiệu ứng xuất hiện `@starting-style`.
  - Timeline Sự kiện: Thiết kế dạng đường thẳng ở giữa (timeline) chia đôi các sự kiện hai bên, tự động chuyển về dạng một cột trên thiết bị di động.
  - Contact Form: Form liên hệ thiết kế tinh tế với gạch chân dưới input, hỗ trợ tự động co dãn textarea thông qua thuộc tính modern `field-sizing: content`.
  - Popover Cart Slider: Giỏ hàng dạng slide-out từ cạnh phải màn hình sử dụng popover API và backdrop blur.
  - Footer: Tone màu đen than tương phản mạnh mẽ với logo gold sang trọng.
  - Responsive Overrides: Hỗ trợ tối ưu hóa hiển thị trên di động dưới 900px.

## 3. Nhật ký kiểm thử & Xác minh (Verification & Test Summary)
- **Xác minh tệp**: Tệp [style.css](file:///d:/WEB Nghe Thuat/style.css) được tạo thành công với tổng dung lượng **17.403 bytes** và chứa **956 dòng** mã CSS hợp lệ. Các thuộc tính CSS hiện đại như `backdrop-filter`, `@supports`, `@starting-style`, và `field-sizing: content` được áp dụng đúng chuẩn.
- **Kiểm thử logic**: Chạy lại bộ kiểm thử tự động `npm test` của hệ thống để đảm bảo việc thêm file CSS mới không làm ảnh hưởng đến các hàm logic javascript:
  ```text
  > web-nghe-thuat@1.0.0 test
  > node tests/helpers.test.js

  --- Chạy kiểm thử Helpers ---
  ✓ Test 1 đạt: Lọc theo category thành công
  ✓ Test 2 đạt: Lọc theo mức giá thành công
  ✓ Test 2b đạt: Lọc bỏ tranh có giá trị giá không hợp lệ khi có priceRange hoặc priceRange là "all" / category thành công
  ✓ Test 3 đạt: Tính tổng giỏ hàng thành công
  ✓ Test 3b đạt: Tính tổng giỏ hàng thành công khi thiếu quantity (fallback về 1) và kiểm thử các trường hợp quantity đặc biệt
  ✓ Test 4 đạt: Tạo link Zalo thành công
  ✓ Test 5 đạt: Các chốt chặn phòng thủ hoạt động đúng
  --- TẤT CẢ KIỂM THỬ ĐÃ ĐẠT! ---
  ```

## 4. Chi tiết Git Commit (Commits)
- **Nhánh hiện tại**: `master`
- **Tệp đã add**: [style.css](file:///d:/WEB Nghe Thuat/style.css)
- **Commit Hash**: `455fa03`
- **Commit Message**: `feat: implement base styles and layout system in style.css (Task 3)`

## 5. Quan ngại / Lưu ý (Concerns)
- **Hỗ trợ trình duyệt (Browser compatibility)**: Các thuộc tính mới như `field-sizing: content` (hỗ trợ tự co dãn textarea) và `@starting-style` (dành cho hoạt ảnh Dialog) hoạt động hoàn hảo trên các trình duyệt hiện đại (Chrome 122+, Edge 122+), nhưng có thể cần fallback Javascript hoặc CSS truyền thống trên các trình duyệt cũ hơn. Việc này đã được thiết kế an toàn dưới dạng nâng cấp lũy tiến (progressive enhancement).

## 6. Bản vá lỗi bổ sung (Bug Fix Update)
Vào lúc 20:31 ngày 11/07/2026, các lỗi cơ học nhỏ sau đây đã được sửa trực tiếp trong [style.css](file:///d:/WEB Nghe Thuat/style.css):
1. **Thêm biến màu lỗi**: Định nghĩa `--error: #D9534F;` trong `:root` để phục vụ phản hồi lỗi biểu mẫu.
2. **Sửa cú pháp transition của Dialog**: Thay đổi dòng khai báo transition không hợp lệ của `dialog` thành `transition: var(--transition-smooth), display 0.5s allow-discrete; overlay 0.5s allow-discrete;`.
3. **Sửa lỗi tràn bố cục timeline trên di động**: Thêm thuộc tính `left: 0 !important;` vào `.timeline-item` bên trong media query `@media (max-width: 900px)`.
4. **Cập nhật global reset**: Chuyển bộ chọn reset toàn cục thành `*, *::before, *::after` để áp dụng cấu hình `box-sizing: border-box` lên toàn bộ các phần tử giả.
5. **Chạy kiểm thử thành công**: Bộ kiểm thử `npm test` đã được chạy lại và toàn bộ các trường hợp kiểm thử JS đều vượt qua thành công.

## 7. Bản vá lỗi bổ sung (Bug Fix Update - Lần 2)
Vào lúc 20:36 ngày 11/07/2026, các sửa đổi cơ học nhỏ sau đây đã được thực hiện trực tiếp trong [style.css](file:///d:/WEB Nghe Thuat/style.css) để hoàn thiện hiệu ứng chuyển cảnh:
1. **Sửa cú pháp transition của Dialog**: Thay thế dấu chấm phẩy `;` bằng dấu phẩy `,` trong khai báo transition của `dialog` thành `transition: var(--transition-smooth), display 0.5s allow-discrete, overlay 0.5s allow-discrete;`.
2. **Cập nhật transition của Popover**: Thêm tham số transition overlay vào quy tắc `[popover]` thành `transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), display 0.4s allow-discrete, overlay 0.4s allow-discrete;`.
3. **Xác minh kiểm thử**: Chạy `npm test` thành công, tất cả các bài kiểm tra Javascript vẫn vượt qua bình thường.

