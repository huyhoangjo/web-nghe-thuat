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

// Test 2b: Lọc các tranh có giá không hợp lệ (NaN, undefined, etc.) khi có priceRange
const invalidPricePaintings = [
  { id: '1', title: 'Tranh Hợp Lệ', category: 'phong-canh', price: 15000000 },
  { id: '2', title: 'Tranh NaN Price', category: 'phong-canh', price: NaN },
  { id: '3', title: 'Tranh Undefined Price', category: 'phong-canh' },
  { id: '4', title: 'Tranh String Price', category: 'phong-canh', price: '15000000' }
];
const filteredInvalid = filterPaintings(invalidPricePaintings, 'all', '10m-20m');
assert.strictEqual(filteredInvalid.length, 1);
assert.strictEqual(filteredInvalid[0].title, 'Tranh Hợp Lệ');
console.log('✓ Test 2b đạt: Lọc bỏ tranh có giá trị giá không hợp lệ khi có priceRange thành công');

// Test 3: Tính tổng giỏ hàng
const cart = [
  { title: 'Tranh A', price: 8000000, quantity: 1 },
  { title: 'Tranh B', price: 15000000, quantity: 1 }
];
const total = calculateCartTotal(cart);
assert.strictEqual(total, 23000000);
console.log('✓ Test 3 đạt: Tính tổng giỏ hàng thành công');

// Test 3b: Tính tổng giỏ hàng khi thiếu quantity ở một mặt hàng (fallback về 1)
const cartMissingQuantity = [
  { title: 'Tranh A', price: 8000000, quantity: 2 },
  { title: 'Tranh B', price: 15000000 }
];
const totalMissingQuantity = calculateCartTotal(cartMissingQuantity);
assert.strictEqual(totalMissingQuantity, 31000000);
console.log('✓ Test 3b đạt: Tính tổng giỏ hàng thành công khi thiếu quantity (fallback về 1)');

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

// Test thêm cho các trường hợp đặc biệt ở Task 2
const cartWithInvalidItems = [
  { title: 'Tranh A', price: 8000000, quantity: 1 },
  null,
  undefined,
  { title: 'Tranh B', price: NaN, quantity: 1 },
  { title: 'Tranh C', price: 'invalid', quantity: 1 },
  { title: 'Tranh D', price: 15000000, quantity: 1 }
];
assert.strictEqual(calculateCartTotal(cartWithInvalidItems), 23000000);

assert.strictEqual(generateZaloLink('', cart), '');
assert.strictEqual(generateZaloLink('abc', cart), '');
assert.strictEqual(generateZaloLink('  ', cart), '');

const cartWithNullAndMissingSize = [
  null,
  { title: 'Tranh A', price: 8000000, quantity: 1 },
  { title: '', price: 10000000, quantity: 1 },
  { title: 'Tranh B', price: 15000000 }
];
const linkWithEdgeCases = generateZaloLink('0901234567', cartWithNullAndMissingSize);
assert.ok(linkWithEdgeCases.includes(encodeURIComponent('Tranh A')));
assert.ok(linkWithEdgeCases.includes(encodeURIComponent('Tranh B')));
assert.ok(linkWithEdgeCases.includes(encodeURIComponent('N/A')));
assert.ok(linkWithEdgeCases.includes(encodeURIComponent('23.000.000')));

const cartWithNoValidItems = [
  null,
  { title: '', price: 10000000 },
  { title: 'Tranh A', price: NaN }
];
assert.strictEqual(generateZaloLink('0901234567', cartWithNoValidItems), '');

console.log('✓ Test 5 đạt: Các chốt chặn phòng thủ hoạt động đúng');

console.log('--- TẤT CẢ KIỂM THỬ ĐÃ ĐẠT! ---');
