import mockPaintings from './mock-paintings.js';

// Elements
const loginPanel = document.getElementById('login-panel');
const dashboardPanel = document.getElementById('dashboard-panel');
const loginForm = document.getElementById('login-form');
const passcodeField = document.getElementById('passcode');
const logoutBtn = document.getElementById('logout-btn');

const paintingsListBody = document.getElementById('paintings-list-body');
const crudForm = document.getElementById('crud-form');
const editIdField = document.getElementById('edit-id');
const pTitle = document.getElementById('p-title');
const pCategory = document.getElementById('p-category');
const pMaterial = document.getElementById('p-material');
const pSize = document.getElementById('p-size');
const pPrice = document.getElementById('p-price');
const pYear = document.getElementById('p-year');
const pImageUrl = document.getElementById('p-image-url');
const pImageFile = document.getElementById('p-image-file');
const pImagePreview = document.getElementById('p-image-preview');
const imagePreviewContainer = document.getElementById('image-preview-container');
const pSold = document.getElementById('p-sold');

const formTitle = document.getElementById('form-title');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

let paintings = [];

// Check local storage session login
function checkAuth() {
  const sessionToken = sessionStorage.getItem('admin_authenticated');
  if (sessionToken === 'true') {
    showDashboard();
  } else {
    showLogin();
  }
}

function showLogin() {
  loginPanel.style.display = 'block';
  dashboardPanel.style.display = 'none';
}

function showDashboard() {
  loginPanel.style.display = 'none';
  dashboardPanel.style.display = 'block';
  loadPaintings();
  renderPaintingsTable();
}

function loadPaintings() {
  const stored = localStorage.getItem('paintings_db');
  if (stored) {
    paintings = JSON.parse(stored);
  } else {
    paintings = mockPaintings;
    localStorage.setItem('paintings_db', JSON.stringify(paintings));
  }
}

// Render administrative listings table
function renderPaintingsTable() {
  paintingsListBody.innerHTML = '';
  paintings.forEach(painting => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(painting.price);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${painting.image}" class="admin-thumbnail" alt="${painting.title}"></td>
      <td><strong>${painting.title}</strong><br><span style="font-size: 0.75rem; color: var(--text-muted);">${painting.id}</span></td>
      <td>${painting.material}<br><strong>${formattedPrice}</strong></td>
      <td><span style="font-weight: 600; color: ${painting.sold ? '#ff3b30' : '#34c759'};">${painting.sold ? 'Đã bán' : 'Sẵn sàng'}</span></td>
      <td>
        <div class="action-icons">
          <button class="action-btn edit-btn" data-id="${painting.id}" title="Sửa"><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="action-btn delete-btn" data-id="${painting.id}" title="Xóa"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </td>
    `;
    paintingsListBody.appendChild(row);
  });

  // Bind Actions
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      startEdit(id);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      deletePainting(id);
    });
  });
}

// Edit Painting setup values
function startEdit(id) {
  const painting = paintings.find(p => p.id === id);
  if (!painting) return;

  editIdField.value = painting.id;
  pTitle.value = painting.title;
  pCategory.value = painting.category;
  pMaterial.value = painting.material;
  pSize.value = painting.size;
  pPrice.value = painting.price;
  pYear.value = painting.year;
  pImageUrl.value = painting.image;
  pSold.checked = painting.sold;
  document.getElementById('p-description').value = painting.description || '';

  // Show image preview
  pImagePreview.src = painting.image;
  imagePreviewContainer.style.display = 'block';

  // Toggle edit titles UI
  formTitle.textContent = "Chỉnh Sửa Tác Phẩm";
  cancelEditBtn.style.display = 'inline-block';
}

function cancelEdit() {
  crudForm.reset();
  editIdField.value = '';
  imagePreviewContainer.style.display = 'none';
  formTitle.textContent = "Thêm Tác Phẩm Mới";
  cancelEditBtn.style.display = 'none';
}

// Submit Form adding/editing items
function handleFormSubmit(e) {
  e.preventDefault();
  const id = editIdField.value;
  const title = pTitle.value;
  const category = pCategory.value;
  const material = pMaterial.value;
  const size = pSize.value;
  const price = Number(pPrice.value);
  const year = Number(pYear.value);
  const image = pImageUrl.value;
  const sold = pSold.checked;
  const description = document.getElementById('p-description').value;

  if (!image) {
    alert("Vui lòng tải ảnh lên hoặc dán liên kết URL ảnh tác phẩm!");
    return;
  }

  if (id) {
    // Edit existing painting
    const index = paintings.findIndex(p => p.id === id);
    if (index !== -1) {
      paintings[index] = { id, title, artist: "Họa sĩ Minh Trí", category, material, size, price, description, year, image, sold };
    }
  } else {
    // Add new painting
    const newId = 'p_' + Date.now();
    paintings.push({
      id: newId,
      title,
      artist: "Họa sĩ Minh Trí",
      category,
      material,
      size,
      price,
      description,
      year,
      image,
      sold
    });
  }

  // Save database
  localStorage.setItem('paintings_db', JSON.stringify(paintings));
  cancelEdit();
  renderPaintingsTable();
  alert("Lưu thông tin tác phẩm thành công!");
}

// Delete painting item
function deletePainting(id) {
  if (confirm("Bạn có chắc chắn muốn xóa tác phẩm nghệ thuật này ra khỏi danh sách triển lãm?")) {
    paintings = paintings.filter(p => p.id !== id);
    localStorage.setItem('paintings_db', JSON.stringify(paintings));
    renderPaintingsTable();
    cancelEdit();
  }
}

// Convert uploaded file into base64 image data string
function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    pImageUrl.value = evt.target.result;
    pImagePreview.src = evt.target.result;
    imagePreviewContainer.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

// Listen for inputs to change preview
pImageUrl.addEventListener('input', () => {
  if (pImageUrl.value) {
    pImagePreview.src = pImageUrl.value;
    imagePreviewContainer.style.display = 'block';
  } else {
    imagePreviewContainer.style.display = 'none';
  }
});

// Setup authentication submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (passcodeField.value === '1234') {
    sessionStorage.setItem('admin_authenticated', 'true');
    showDashboard();
  } else {
    alert("Mật khẩu không chính xác. Hãy nhập '1234' để đăng nhập quản trị!");
  }
});

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('admin_authenticated');
  showLogin();
});

// Bind general elements
crudForm.addEventListener('submit', handleFormSubmit);
pImageFile.addEventListener('change', handleImageUpload);
cancelEditBtn.addEventListener('click', cancelEdit);

// Run initialization checks
checkAuth();
