# Prompt Thiết Kế Web Triển Lãm \& Bán Tranh Cá Nhân

Thiết kế một website portfolio nghệ thuật cá nhân dạng triển lãm tranh trực tuyến kết hợp bán tranh, phong cách tối giản, sang trọng, tập trung làm nổi bật tác phẩm.

## 1\. Định hướng thẩm mỹ

* **Phong cách:** Gallery hiện đại, tối giản (minimalist), nền trắng/kem hoặc tối màu (dark mode nghệ thuật) tùy chọn
* **Typography:** Font serif thanh lịch cho tiêu đề, font sans-serif dễ đọc cho nội dung
* **Bố cục:** Nhiều khoảng trắng (white space), lấy tranh làm trung tâm, không rối mắt
* **Hiệu ứng:** Chuyển động mượt khi hover, fade-in khi scroll, lightbox phóng to tranh

## 2\. Cấu trúc trang (Sections)

### Trang chủ (Hero)

* Ảnh/tranh nổi bật toàn màn hình
* Tên họa sĩ, câu giới thiệu ngắn
* Nút "Khám phá bộ sưu tập"

### Giới thiệu (About)

* Tiểu sử họa sĩ
* Quá trình sáng tác
* Triết lý nghệ thuật
* Ảnh chân dung

### Bộ sưu tập / Triển lãm (Gallery)

* Lưới ảnh (grid) hiển thị các bức tranh
* Mỗi tranh gồm:

  * Hình ảnh chất lượng cao
  * Tên tranh
  * Chất liệu \& kích thước
  * Nội dung/ý nghĩa tranh (mô tả cảm hứng sáng tác)
  * Giá bán
  * Trạng thái (còn hàng / đã bán)
* Bộ lọc theo: chủ đề, kích thước, mức giá, năm sáng tác
* Click vào tranh → mở trang chi tiết hoặc modal với ảnh phóng to, mô tả đầy đủ, nút "Thêm vào giỏ" / "Liên hệ mua"

### Trang chi tiết tác phẩm

* Ảnh lớn (có thể zoom)
* Câu chuyện đằng sau bức tranh
* Thông tin kỹ thuật
* Giá
* Nút mua hàng/đặt hàng

### Giỏ hàng \& Thanh toán

* Giỏ hàng đơn giản
* Hỗ trợ thanh toán online hoặc form liên hệ đặt mua

### Triển lãm/Sự kiện

* Lịch triển lãm đã/sắp diễn ra

### Liên hệ

* Form liên hệ
* Mạng xã hội, email
* Có thể tích hợp đặt lịch xem tranh trực tiếp

## 3\. Yêu cầu chức năng

* Responsive trên mobile/tablet/desktop
* Tốc độ tải nhanh, tối ưu hình ảnh
* Có thể quản lý (thêm/sửa/xóa tranh, giá, trạng thái) qua trang admin đơn giản
* Tích hợp thanh toán (VNPay/Momo/Stripe/PayPal) hoặc liên hệ qua Zalo/Messenger
* SEO cơ bản cho từng tác phẩm

## 

