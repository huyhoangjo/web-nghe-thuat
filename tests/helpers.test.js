import assert from 'assert';
import { filterPaintings, calculateCartTotal, generateZaloLink } from '../js/helpers.js';

const mockPaintings = [
  { id: '1', title: 'Tranh A', category: 'phong-canh', price: 8000000, size: '50x50' },
  { id: '2', title: 'Tranh B', category: 'truu-tuong', price: 15000000, size: '80x80' },
  { id: '3', title: 'Tranh C', category: 'phong-canh', price: 25000000, size: '100x100' }
];

console.log('--- Chạy kiểm thử Helpers ---');

// Test 1: Lọc theo category
const categoryFiltered = filterPaintings(mockPaintings, 'phong-canh', 'all');
assert.strictEqual(categoryFiltered.length, 2);
assert.strictEqual(categoryFiltered[0].title, 'Tranh A');
console.log('✓ Test 1 đạt: Lọc theo category thành công');

// Test 2: Lọc theo mức giá
const priceFiltered = filterPaintings(mockPaintings, 'all', '10m-20m');
assert.strictEqual(priceFiltered.length, 1);
assert.strictEqual(priceFiltered[0].title, 'Tranh B');
console.log('✓ Test 2 đạt: Lọc theo mức giá thành công');

// Test 3: Tính tổng giỏ hàng
const cart = [
  { title: 'Tranh A', price: 8000000, quantity: 1 },
  { title: 'Tranh B', price: 15000000, quantity: 1 }
];
const total = calculateCartTotal(cart);
assert.strictEqual(total, 23000000);
console.log('✓ Test 3 đạt: Tính tổng giỏ hàng thành công');

// Test 4: Tạo link Zalo
const link = generateZaloLink('0901234567', cart);
assert.ok(link.includes('zalo.me/0901234567'));
assert.ok(link.includes(encodeURIComponent('Tranh A')));
console.log('✓ Test 4 đạt: Tạo link Zalo thành công');

// Test 5: Các chốt chặn phòng thủ (Defensive guards)
assert.deepStrictEqual(filterPaintings(null, 'all', 'all'), []);
assert.deepStrictEqual(filterPaintings(undefined, 'all', 'all'), []);
assert.strictEqual(calculateCartTotal(null), 0);
assert.strictEqual(calculateCartTotal(undefined), 0);
assert.strictEqual(generateZaloLink(null, cart), '');
assert.strictEqual(generateZaloLink(undefined, cart), '');
assert.strictEqual(generateZaloLink(123456789, cart), '');
console.log('✓ Test 5 đạt: Các chốt chặn phòng thủ hoạt động đúng');

console.log('--- TẤT CẢ KIỂM THỬ ĐÃ ĐẠT! ---');
