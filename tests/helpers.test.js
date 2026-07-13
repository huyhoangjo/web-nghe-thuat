import assert from 'assert';
import { filterWorks, searchArchive, formatDate } from '../js/helpers.js';

console.log('--- Chạy kiểm thử Helpers Mới ---');

const mockDb = {
  works: [
    { id: 'w1', titleEn: 'Skin', titleVi: 'Da', chapter: 3, materialEn: 'Silk', year: 2025 },
    { id: 'w2', titleEn: 'Void', titleVi: 'Hư Không', chapter: 5, materialEn: 'Charcoal', year: 2026 }
  ],
  journal: [
    { id: 'j1', titleEn: 'Dreaming Istanbul', titleVi: 'Mơ Istanbul', locationEn: 'Turkey' }
  ],
  fieldNotes: [
    { id: 'fn1', countryEn: 'Turkey', titleEn: 'Note on Clay' }
  ]
};

// Test 1: Lọc Works theo Chapter
const ch3 = filterWorks(mockDb.works, 3);
assert.strictEqual(ch3.length, 1);
assert.strictEqual(ch3[0].id, 'w1');
console.log('✓ Test 1 đạt: Lọc tác phẩm theo chương thành công');

// Test 2: Tìm kiếm Archive
const searchResults = searchArchive(mockDb, 'Istanbul');
assert.strictEqual(searchResults.length, 1);
assert.strictEqual(searchResults[0].type, 'journal');
console.log('✓ Test 2 đạt: Tìm kiếm trong lưu trữ thành công');

// Test 3: Định dạng ngày tháng
const formattedEn = formatDate('2025-03-05', 'en');
const formattedVi = formatDate('2025-03-05', 'vi');
assert.ok(formattedEn.includes('Mar') || formattedEn.includes('March'));
assert.ok(formattedVi.includes('Tháng 3'));
console.log('✓ Test 3 đạt: Định dạng ngày tháng song ngữ thành công');

console.log('--- TẤT CẢ KIỂM THỬ ĐÃ ĐẠT! ---');
