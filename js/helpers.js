const vndFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

export function filterPaintings(paintings, category, priceRange) {
  if (!Array.isArray(paintings)) return [];
  return paintings.filter(painting => {
    if (!painting) return false;
    // Lọc theo category
    if (category && category !== 'all' && painting.category !== category) {
      return false;
    }
    // Lọc theo price range
    if (priceRange && priceRange !== 'all') {
      const price = painting.price;
      if (typeof price !== 'number' || Number.isNaN(price)) return false;
      if (priceRange === 'under-10m' && price >= 10000000) return false;
      if (priceRange === '10m-20m' && (price < 10000000 || price > 20000000)) return false;
      if (priceRange === 'over-20m' && price <= 20000000) return false;
    }
    return true;
  });
}

function getValidQuantity(quantity) {
  let qty = 1;
  if (typeof quantity === 'number' && !Number.isNaN(quantity)) {
    qty = quantity;
  } else if (typeof quantity === 'string' && quantity.trim() !== '') {
    const parsed = Number(quantity);
    if (!Number.isNaN(parsed)) {
      qty = parsed;
    }
  }
  qty = Math.max(0, qty);
  return qty;
}

export function calculateCartTotal(cartItems) {
  if (!Array.isArray(cartItems)) return 0;
  return cartItems.reduce((total, item) => {
    if (!item || typeof item.price !== 'number' || Number.isNaN(item.price)) return total;
    const qty = getValidQuantity(item.quantity);
    return total + (item.price * qty);
  }, 0);
}

export function generateZaloLink(phoneNumber, cartItems) {
  if (!phoneNumber || typeof phoneNumber !== 'string') return '';
  if (!Array.isArray(cartItems) || cartItems.length === 0) return '';
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  if (!cleanPhone) return '';
  
  const validItems = cartItems.filter(item => 
    item && 
    typeof item.title === 'string' && 
    item.title.trim() !== '' && 
    typeof item.price === 'number' && 
    !Number.isNaN(item.price)
  );
  if (validItems.length === 0) return '';
  
  let message = "Chào họa sĩ Minh Trí, tôi muốn đặt mua các tác phẩm:\n";
  validItems.forEach((item, index) => {
    const qty = getValidQuantity(item.quantity);
    if (qty <= 0) return;
    const formattedPrice = vndFormatter.format(item.price);
    const size = item.size || 'N/A';
    const qtySuffix = qty > 1 ? ` x ${qty}` : '';
    message += `${index + 1}. ${item.title} (${size}, ${formattedPrice})${qtySuffix}\n`;
  });
  
  const total = calculateCartTotal(validItems);
  const formattedTotal = vndFormatter.format(total);
  message += `Tổng giá trị: ${formattedTotal}\nXin vui lòng tư vấn thêm cho tôi!`;
  
  return `https://zalo.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
