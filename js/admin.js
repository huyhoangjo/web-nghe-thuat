import { getDatabase, saveDatabase, resetDatabaseToSeed } from './database.js';

// State
let db = {};
let activeCategory = 'works';

// DOM Elements
const loginPanel = document.getElementById('login-panel');
const dashboardPanel = document.getElementById('dashboard-panel');
const loginForm = document.getElementById('login-form');
const passcodeField = document.getElementById('passcode');
const logoutBtn = document.getElementById('logout-btn');

const adminMenuTabs = document.getElementById('admin-menu-tabs');
const titleEl = document.getElementById('admin-category-title');
const descEl = document.getElementById('admin-category-desc');

const tableHead = document.getElementById('admin-table-head');
const tableBody = document.getElementById('admin-table-body');

const formPanel = document.getElementById('admin-form-panel');
const formTitle = document.getElementById('form-title');
const crudForm = document.getElementById('crud-form');
const formFieldsContainer = document.getElementById('form-fields-container');
const editIdField = document.getElementById('edit-id');

const cancelEditBtn = document.getElementById('cancel-edit-btn');
const addNewBtn = document.getElementById('add-new-btn');
const resetDbBtn = document.getElementById('reset-db-btn');

// Initial auth verification
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
  dashboardPanel.style.display = 'grid';
  db = getDatabase();
  renderCategory();
}

// Category mappings for headings
const CATEGORIES_INFO = {
  works: { title: "Works Management", desc: "Configure works details, dimensions, and evolutionary chapters." },
  journal: { title: "Journal / Fragments Management", desc: "Manage poetic diary entries, poems, and memory fragments." },
  fieldNotes: { title: "Field Notes Management", desc: "Manage research notes, cultural encounters, and travel records." },
  publications: { title: "Publications Management", desc: "Register exhibition catalogues, essays, and PDF links." },
  archive: { title: "Archive Management", desc: "Manage sketches, studio atmosphere documents, and process details." },
  cv: { title: "CV Timeline Management", desc: "Structure artist curriculum vitae achievements by category and year." }
};

// Render the active category listing
function renderCategory() {
  const info = CATEGORIES_INFO[activeCategory];
  titleEl.textContent = info.title;
  descEl.textContent = info.desc;
  
  closeForm();
  renderTable();
}

// Render dynamic tables
function renderTable() {
  tableHead.innerHTML = '';
  tableBody.innerHTML = '';

  const items = db[activeCategory] || [];

  if (activeCategory === 'works') {
    tableHead.innerHTML = `
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>Chapter</th>
        <th>Details (Material / Size / Year)</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    `;
    items.forEach(work => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${work.image}" class="admin-thumbnail" alt="${work.titleEn}"></td>
        <td><strong>EN:</strong> ${work.titleEn}<br><strong>VI:</strong> ${work.titleVi}</td>
        <td>Chapter ${work.chapter}</td>
        <td>${work.materialEn}<br>${work.dimensions} | ${work.year}</td>
        <td><span style="font-weight:600; font-size:0.75rem; text-transform:uppercase;">${work.status}</span></td>
        <td>
          <div class="admin-actions">
            <button class="admin-action-btn edit-btn" data-id="${work.id}" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="admin-action-btn delete-btn" data-id="${work.id}" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });

  } else if (activeCategory === 'journal') {
    tableHead.innerHTML = `
      <tr>
        <th>Date & Location</th>
        <th>Title (EN / VI)</th>
        <th>Snippet</th>
        <th>Actions</th>
      </tr>
    `;
    items.forEach(entry => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${entry.date}<br>${entry.locationEn} / ${entry.locationVi}</td>
        <td><strong>EN:</strong> ${entry.titleEn}<br><strong>VI:</strong> ${entry.titleVi}</td>
        <td style="max-width:300px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${entry.contentEn}</td>
        <td>
          <div class="admin-actions">
            <button class="admin-action-btn edit-btn" data-id="${entry.id}" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="admin-action-btn delete-btn" data-id="${entry.id}" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });

  } else if (activeCategory === 'fieldNotes') {
    tableHead.innerHTML = `
      <tr>
        <th>Category</th>
        <th>Origin Location</th>
        <th>Title (EN / VI)</th>
        <th>Actions</th>
      </tr>
    `;
    items.forEach(note => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span style="text-transform:uppercase; font-size:0.75rem; font-weight:600;">${note.category}</span></td>
        <td>${note.locationEn}, ${note.countryEn}</td>
        <td><strong>EN:</strong> ${note.titleEn}<br><strong>VI:</strong> ${note.titleVi}</td>
        <td>
          <div class="admin-actions">
            <button class="admin-action-btn edit-btn" data-id="${note.id}" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="admin-action-btn delete-btn" data-id="${note.id}" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });

  } else if (activeCategory === 'publications') {
    tableHead.innerHTML = `
      <tr>
        <th>Cover</th>
        <th>Title (EN / VI)</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    `;
    items.forEach(pub => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${pub.coverImage}" class="admin-thumbnail" alt="${pub.titleEn}"></td>
        <td><strong>EN:</strong> ${pub.titleEn}<br><strong>VI:</strong> ${pub.titleVi}</td>
        <td>${pub.descriptionEn}</td>
        <td>
          <div class="admin-actions">
            <button class="admin-action-btn edit-btn" data-id="${pub.id}" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="admin-action-btn delete-btn" data-id="${pub.id}" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });

  } else if (activeCategory === 'archive') {
    tableHead.innerHTML = `
      <tr>
        <th>Image</th>
        <th>Category</th>
        <th>Title (EN / VI)</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    `;
    items.forEach(arc => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${arc.image}" class="admin-thumbnail" alt="${arc.titleEn}"></td>
        <td><span style="text-transform:uppercase; font-size:0.75rem; font-weight:600;">${arc.category}</span></td>
        <td><strong>EN:</strong> ${arc.titleEn}<br><strong>VI:</strong> ${arc.titleVi}</td>
        <td>${arc.date}</td>
        <td>
          <div class="admin-actions">
            <button class="admin-action-btn edit-btn" data-id="${arc.id}" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="admin-action-btn delete-btn" data-id="${arc.id}" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });

  } else if (activeCategory === 'cv') {
    tableHead.innerHTML = `
      <tr>
        <th>Category</th>
        <th>Year</th>
        <th>Title (EN / VI)</th>
        <th>Location</th>
        <th>Actions</th>
      </tr>
    `;
    items.forEach(event => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span style="text-transform:uppercase; font-size:0.75rem; font-weight:600;">${event.category}</span></td>
        <td>${event.year}</td>
        <td><strong>EN:</strong> ${event.titleEn}<br><strong>VI:</strong> ${event.titleVi}</td>
        <td>${event.locationEn}</td>
        <td>
          <div class="admin-actions">
            <button class="admin-action-btn edit-btn" data-id="${event.id}" title="Edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="admin-action-btn delete-btn" data-id="${event.id}" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Bind Edit/Delete buttons
  tableBody.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      openForm(id);
    });
  });

  tableBody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      deleteEntry(id);
    });
  });
}

// Open Editor Form Panel
function openForm(id = '') {
  editIdField.value = id;
  formTitle.textContent = id ? "Edit Entry / Chỉnh Sửa Mục" : "Add New Entry / Thêm Mục Mới";
  
  const item = id ? db[activeCategory].find(x => x.id === id) : null;
  generateFormFields(item);
  
  formPanel.style.display = 'block';
  formPanel.scrollIntoView({ behavior: 'smooth' });
}

function closeForm() {
  editIdField.value = '';
  formFieldsContainer.innerHTML = '';
  formPanel.style.display = 'none';
}

// Generate bilingual input fields dynamically based on category
function generateFormFields(item = null) {
  formFieldsContainer.innerHTML = '';

  if (activeCategory === 'works') {
    // Generate relation checkboxes options
    let journalCheckboxes = '';
    const journalList = db.journal || [];
    journalList.forEach(j => {
      const checked = item && item.relatedJournalIds && item.relatedJournalIds.includes(j.id) ? 'checked' : '';
      journalCheckboxes += `
        <label><input type="checkbox" name="work-related-journals" value="${j.id}" ${checked}> ${j.titleEn}</label>
      `;
    });

    let notesCheckboxes = '';
    const notesList = db.fieldNotes || [];
    notesList.forEach(fn => {
      const checked = item && item.relatedNoteIds && item.relatedNoteIds.includes(fn.id) ? 'checked' : '';
      notesCheckboxes += `
        <label><input type="checkbox" name="work-related-notes" value="${fn.id}" ${checked}> ${fn.titleEn}</label>
      `;
    });

    formFieldsContainer.innerHTML = `
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Title (English) *</label>
          <input type="text" id="w-titleEn" class="admin-field" required value="${item ? item.titleEn : ''}">
        </div>
        <div class="admin-input-group">
          <label>Material (English) *</label>
          <input type="text" id="w-materialEn" class="admin-field" required value="${item ? item.materialEn : ''}">
        </div>
        <div class="admin-input-group">
          <label>Evolution Chapter (1-6) *</label>
          <select id="w-chapter" class="admin-field" required>
            <option value="1" ${item && item.chapter == 1 ? 'selected' : ''}>Ch 1: Emerging Presence</option>
            <option value="2" ${item && item.chapter == 2 ? 'selected' : ''}>Ch 2: Departure</option>
            <option value="3" ${item && item.chapter == 3 ? 'selected' : ''}>Ch 3: Fragile Bodies</option>
            <option value="4" ${item && item.chapter == 4 ? 'selected' : ''}>Ch 4: Temporary Presence</option>
            <option value="5" ${item && item.chapter == 5 ? 'selected' : ''}>Ch 5: Inner Gravity</option>
            <option value="6" ${item && item.chapter == 6 ? 'selected' : ''}>Ch 6: The Origin of No-Self</option>
          </select>
        </div>
        <div class="admin-input-group">
          <label>Dimensions *</label>
          <input type="text" id="w-dimensions" class="admin-field" required value="${item ? item.dimensions : ''}" placeholder="e.g. 100 x 100 cm">
        </div>
        <div class="admin-input-group">
          <label>Creation Year *</label>
          <input type="number" id="w-year" class="admin-field" required value="${item ? item.year : 2026}">
        </div>
        <div class="admin-input-group">
          <label>Status *</label>
          <select id="w-status" class="admin-field" required>
            <option value="available" ${item && item.status == 'available' ? 'selected' : ''}>Available in Studio</option>
            <option value="sold" ${item && item.status == 'sold' ? 'selected' : ''}>Sold</option>
            <option value="exhibited" ${item && item.status == 'exhibited' ? 'selected' : ''}>Exhibited / Museum Collection</option>
          </select>
        </div>
        <div class="admin-input-group">
          <label>Story Details (English) *</label>
          <textarea id="w-descriptionEn" class="admin-field admin-textarea" required>${item ? item.descriptionEn : ''}</textarea>
        </div>
        <div class="admin-input-group">
          <label>Image Upload / URL *</label>
          <input type="text" id="w-image" class="admin-field" required value="${item ? item.image : ''}" placeholder="Enter image URL or choose file below">
          <input type="file" id="w-image-file" accept="image/*" style="font-size:0.8rem; margin-top:0.5rem;">
          <div class="admin-image-preview-container" id="w-image-preview-container" style="${item ? 'display:block' : ''}">
            <img src="${item ? item.image : ''}" id="w-image-preview" class="admin-image-preview">
          </div>
        </div>
      </div>
      
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Tiêu đề (Tiếng Việt) *</label>
          <input type="text" id="w-titleVi" class="admin-field" required value="${item ? item.titleVi : ''}">
        </div>
        <div class="admin-input-group">
          <label>Chất liệu (Tiếng Việt) *</label>
          <input type="text" id="w-materialVi" class="admin-field" required value="${item ? item.materialVi : ''}">
        </div>
        <div class="admin-input-group">
          <label>Mô tả câu chuyện (Tiếng Việt) *</label>
          <textarea id="w-descriptionVi" class="admin-field admin-textarea" required style="min-height:220px;">${item ? item.descriptionVi : ''}</textarea>
        </div>
        <div class="admin-input-group">
          <label>Link Related Memories (Liên kết Nhật ký)</label>
          <div class="admin-relations-picker">${journalCheckboxes}</div>
        </div>
        <div class="admin-input-group" style="margin-top:0.5rem;">
          <label>Link Related Trips (Liên kết Ghi chép Điền dã)</label>
          <div class="admin-relations-picker">${notesCheckboxes}</div>
        </div>
      </div>
    `;

    setupImageFileReader('w-image', 'w-image-file', 'w-image-preview-container', 'w-image-preview');

  } else if (activeCategory === 'journal') {
    formFieldsContainer.innerHTML = `
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Title (English) *</label>
          <input type="text" id="j-titleEn" class="admin-field" required value="${item ? item.titleEn : ''}">
        </div>
        <div class="admin-input-group">
          <label>Date (YYYY-MM-DD) *</label>
          <input type="date" id="j-date" class="admin-field" required value="${item ? item.date : ''}">
        </div>
        <div class="admin-input-group">
          <label>Location (English) *</label>
          <input type="text" id="j-locationEn" class="admin-field" required value="${item ? item.locationEn : ''}">
        </div>
        <div class="admin-input-group">
          <label>Poetic Content (English) *</label>
          <textarea id="j-contentEn" class="admin-field admin-textarea" required style="min-height:200px;">${item ? item.contentEn : ''}</textarea>
        </div>
        <div class="admin-input-group">
          <label>Accompanying Image (URL / Upload)</label>
          <input type="text" id="j-image" class="admin-field" value="${item && item.image ? item.image : ''}" placeholder="Optional URL">
          <input type="file" id="j-image-file" accept="image/*" style="font-size:0.8rem; margin-top:0.5rem;">
          <div class="admin-image-preview-container" id="j-image-preview-container" style="${item && item.image ? 'display:block' : ''}">
            <img src="${item && item.image ? item.image : ''}" id="j-image-preview" class="admin-image-preview">
          </div>
        </div>
      </div>
      
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Tiêu đề (Tiếng Việt) *</label>
          <input type="text" id="j-titleVi" class="admin-field" required value="${item ? item.titleVi : ''}">
        </div>
        <div class="admin-input-group">
          <label>Địa điểm (Tiếng Việt) *</label>
          <input type="text" id="j-locationVi" class="admin-field" required value="${item ? item.locationVi : ''}">
        </div>
        <div class="admin-input-group">
          <label>Nội dung thơ ca (Tiếng Việt) *</label>
          <textarea id="j-contentVi" class="admin-field admin-textarea" required style="min-height:360px;">${item ? item.contentVi : ''}</textarea>
        </div>
      </div>
    `;

    setupImageFileReader('j-image', 'j-image-file', 'j-image-preview-container', 'j-image-preview');

  } else if (activeCategory === 'fieldNotes') {
    formFieldsContainer.innerHTML = `
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Title (English) *</label>
          <input type="text" id="fn-titleEn" class="admin-field" required value="${item ? item.titleEn : ''}">
        </div>
        <div class="admin-input-group">
          <label>Category *</label>
          <select id="fn-category" class="admin-field" required>
            <option value="travel" ${item && item.category == 'travel' ? 'selected' : ''}>Travel / Du hành</option>
            <option value="language" ${item && item.category == 'language' ? 'selected' : ''}>Language / Ngôn ngữ</option>
            <option value="observation" ${item && item.category == 'observation' ? 'selected' : ''}>Observation / Quan sát</option>
          </select>
        </div>
        <div class="admin-input-group">
          <label>Date (YYYY-MM-DD) *</label>
          <input type="date" id="fn-date" class="admin-field" required value="${item ? item.date : ''}">
        </div>
        <div class="admin-input-group">
          <label>City/Location (English) *</label>
          <input type="text" id="fn-locationEn" class="admin-field" required value="${item ? item.locationEn : ''}">
        </div>
        <div class="admin-input-group">
          <label>Country (English) *</label>
          <input type="text" id="fn-countryEn" class="admin-field" required value="${item ? item.countryEn : ''}" placeholder="e.g. Turkey">
        </div>
        <div class="admin-input-group">
          <label>Content (English) *</label>
          <textarea id="fn-contentEn" class="admin-field admin-textarea" required style="min-height:150px;">${item ? item.contentEn : ''}</textarea>
        </div>
        <div class="admin-input-group">
          <label>Tư liệu đi kèm (URL / Upload)</label>
          <input type="text" id="fn-image" class="admin-field" value="${item && item.image ? item.image : ''}" placeholder="Optional URL">
          <input type="file" id="fn-image-file" accept="image/*" style="font-size:0.8rem; margin-top:0.5rem;">
          <div class="admin-image-preview-container" id="fn-image-preview-container" style="${item && item.image ? 'display:block' : ''}">
            <img src="${item && item.image ? item.image : ''}" id="fn-image-preview" class="admin-image-preview">
          </div>
        </div>
      </div>
      
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Tiêu đề (Tiếng Việt) *</label>
          <input type="text" id="fn-titleVi" class="admin-field" required value="${item ? item.titleVi : ''}">
        </div>
        <div class="admin-input-group">
          <label>Thành phố/Địa điểm (Tiếng Việt) *</label>
          <input type="text" id="fn-locationVi" class="admin-field" required value="${item ? item.locationVi : ''}">
        </div>
        <div class="admin-input-group">
          <label>Quốc gia (Tiếng Việt) *</label>
          <input type="text" id="fn-countryVi" class="admin-field" required value="${item ? item.countryVi : ''}" placeholder="Ví dụ: Thổ Nhĩ Kỳ">
        </div>
        <div class="admin-input-group">
          <label>Nội dung ghi chép (Tiếng Việt) *</label>
          <textarea id="fn-contentVi" class="admin-field admin-textarea" required style="min-height:360px;">${item ? item.contentVi : ''}</textarea>
        </div>
      </div>
    `;

    setupImageFileReader('fn-image', 'fn-image-file', 'fn-image-preview-container', 'fn-image-preview');

  } else if (activeCategory === 'publications') {
    formFieldsContainer.innerHTML = `
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Title (English) *</label>
          <input type="text" id="p-titleEn" class="admin-field" required value="${item ? item.titleEn : ''}">
        </div>
        <div class="admin-input-group">
          <label>PDF URL / Link</label>
          <input type="text" id="p-pdfUrl" class="admin-field" value="${item && item.pdfUrl ? item.pdfUrl : ''}">
        </div>
        <div class="admin-input-group">
          <label>Description (English) *</label>
          <textarea id="p-descriptionEn" class="admin-field admin-textarea" required>${item ? item.descriptionEn : ''}</textarea>
        </div>
        <div class="admin-input-group">
          <label>Cover Image (URL / Upload) *</label>
          <input type="text" id="p-coverImage" class="admin-field" required value="${item ? item.coverImage : ''}">
          <input type="file" id="p-coverImage-file" accept="image/*" style="font-size:0.8rem; margin-top:0.5rem;">
          <div class="admin-image-preview-container" id="p-coverImage-preview-container" style="${item ? 'display:block' : ''}">
            <img src="${item ? item.coverImage : ''}" id="p-coverImage-preview" class="admin-image-preview">
          </div>
        </div>
      </div>
      
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Tiêu đề (Tiếng Việt) *</label>
          <input type="text" id="p-titleVi" class="admin-field" required value="${item ? item.titleVi : ''}">
        </div>
        <div class="admin-input-group">
          <label>Mô tả tóm tắt (Tiếng Việt) *</label>
          <textarea id="p-descriptionVi" class="admin-field admin-textarea" required style="min-height:220px;">${item ? item.descriptionVi : ''}</textarea>
        </div>
      </div>
    `;

    setupImageFileReader('p-coverImage', 'p-coverImage-file', 'p-coverImage-preview-container', 'p-coverImage-preview');

  } else if (activeCategory === 'archive') {
    formFieldsContainer.innerHTML = `
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Title (English) *</label>
          <input type="text" id="a-titleEn" class="admin-field" required value="${item ? item.titleEn : ''}">
        </div>
        <div class="admin-input-group">
          <label>Category *</label>
          <select id="a-category" class="admin-field" required>
            <option value="sketches" ${item && item.category == 'sketches' ? 'selected' : ''}>Sketches & Drawings / Phác thảo</option>
            <option value="studio" ${item && item.category == 'studio' ? 'selected' : ''}>Studio Atmosphere / Xưởng vẽ</option>
            <option value="process" ${item && item.category == 'process' ? 'selected' : ''}>Work in Progress / Quá trình</option>
            <option value="posters" ${item && item.category == 'posters' ? 'selected' : ''}>Posters & Invites / Áp phích</option>
          </select>
        </div>
        <div class="admin-input-group">
          <label>Date / Year *</label>
          <input type="text" id="a-date" class="admin-field" required value="${item ? item.date : ''}" placeholder="e.g. 2024 / 2025-05">
        </div>
        <div class="admin-input-group">
          <label>Description (English)</label>
          <textarea id="a-descriptionEn" class="admin-field admin-textarea">${item && item.descriptionEn ? item.descriptionEn : ''}</textarea>
        </div>
        <div class="admin-input-group">
          <label>Image Archive (URL / Upload) *</label>
          <input type="text" id="a-image" class="admin-field" required value="${item ? item.image : ''}">
          <input type="file" id="a-image-file" accept="image/*" style="font-size:0.8rem; margin-top:0.5rem;">
          <div class="admin-image-preview-container" id="a-image-preview-container" style="${item ? 'display:block' : ''}">
            <img src="${item ? item.image : ''}" id="a-image-preview" class="admin-image-preview">
          </div>
        </div>
      </div>
      
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Tiêu đề (Tiếng Việt) *</label>
          <input type="text" id="a-titleVi" class="admin-field" required value="${item ? item.titleVi : ''}">
        </div>
        <div class="admin-input-group">
          <label>Chi tiết lưu trữ (Tiếng Việt)</label>
          <textarea id="a-descriptionVi" class="admin-field admin-textarea" style="min-height:220px;">${item && item.descriptionVi ? item.descriptionVi : ''}</textarea>
        </div>
      </div>
    `;

    setupImageFileReader('a-image', 'a-image-file', 'a-image-preview-container', 'a-image-preview');

  } else if (activeCategory === 'cv') {
    formFieldsContainer.innerHTML = `
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Event Name (English) *</label>
          <input type="text" id="c-titleEn" class="admin-field" required value="${item ? item.titleEn : ''}">
        </div>
        <div class="admin-input-group">
          <label>Category *</label>
          <select id="c-category" class="admin-field" required>
            <option value="solo" ${item && item.category == 'solo' ? 'selected' : ''}>Solo Exhibition / Triển lãm cá nhân</option>
            <option value="group" ${item && item.category == 'group' ? 'selected' : ''}>Group Exhibition / Triển lãm nhóm</option>
            <option value="residency" ${item && item.category == 'residency' ? 'selected' : ''}>Artist Residency / Lưu trú</option>
            <option value="talk" ${item && item.category == 'talk' ? 'selected' : ''}>Artist Talk / Trò chuyện nghệ sĩ</option>
            <option value="award" ${item && item.category == 'award' ? 'selected' : ''}>Award & Grant / Giải thưởng</option>
          </select>
        </div>
        <div class="admin-input-group">
          <label>Year *</label>
          <input type="number" id="c-year" class="admin-field" required value="${item ? item.year : 2026}">
        </div>
        <div class="admin-input-group">
          <label>Location / Details (English) *</label>
          <input type="text" id="c-locationEn" class="admin-field" required value="${item ? item.locationEn : ''}">
        </div>
      </div>
      
      <div class="admin-form-col">
        <div class="admin-input-group">
          <label>Tên sự kiện (Tiếng Việt) *</label>
          <input type="text" id="c-titleVi" class="admin-field" required value="${item ? item.titleVi : ''}">
        </div>
        <div class="admin-input-group">
          <label>Địa điểm / Chi tiết (Tiếng Việt) *</label>
          <input type="text" id="c-locationVi" class="admin-field" required value="${item ? item.locationVi : ''}">
        </div>
      </div>
    `;
  }
}

// Image preview file reader
function setupImageFileReader(urlFieldId, fileFieldId, previewContainerId, previewImgId) {
  const urlField = document.getElementById(urlFieldId);
  const fileField = document.getElementById(fileFieldId);
  const previewContainer = document.getElementById(previewContainerId);
  const previewImg = document.getElementById(previewImgId);

  urlField.addEventListener('input', () => {
    if (urlField.value) {
      previewImg.src = urlField.value;
      previewContainer.style.display = 'block';
    } else {
      previewContainer.style.display = 'none';
    }
  });

  fileField.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      urlField.value = evt.target.result;
      previewImg.src = evt.target.result;
      previewContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });
}

// Form Submission handling Save / Update Entry
function handleFormSubmit(e) {
  e.preventDefault();
  const id = editIdField.value;

  let newEntry = {};

  if (activeCategory === 'works') {
    const journals = Array.from(document.querySelectorAll('input[name="work-related-journals"]:checked')).map(el => el.value);
    const notes = Array.from(document.querySelectorAll('input[name="work-related-notes"]:checked')).map(el => el.value);

    newEntry = {
      id: id || `work_${Date.now()}`,
      titleEn: document.getElementById('w-titleEn').value,
      titleVi: document.getElementById('w-titleVi').value,
      chapter: Number(document.getElementById('w-chapter').value),
      materialEn: document.getElementById('w-materialEn').value,
      materialVi: document.getElementById('w-materialVi').value,
      dimensions: document.getElementById('w-dimensions').value,
      year: Number(document.getElementById('w-year').value),
      image: document.getElementById('w-image').value,
      descriptionEn: document.getElementById('w-descriptionEn').value,
      descriptionVi: document.getElementById('w-descriptionVi').value,
      status: document.getElementById('w-status').value,
      relatedJournalIds: journals,
      relatedNoteIds: notes
    };

  } else if (activeCategory === 'journal') {
    newEntry = {
      id: id || `journal_${Date.now()}`,
      titleEn: document.getElementById('j-titleEn').value,
      titleVi: document.getElementById('j-titleVi').value,
      contentEn: document.getElementById('j-contentEn').value,
      contentVi: document.getElementById('j-contentVi').value,
      date: document.getElementById('j-date').value,
      locationEn: document.getElementById('j-locationEn').value,
      locationVi: document.getElementById('j-locationVi').value,
      image: document.getElementById('j-image').value || undefined
    };

  } else if (activeCategory === 'fieldNotes') {
    newEntry = {
      id: id || `note_${Date.now()}`,
      category: document.getElementById('fn-category').value,
      titleEn: document.getElementById('fn-titleEn').value,
      titleVi: document.getElementById('fn-titleVi').value,
      contentEn: document.getElementById('fn-contentEn').value,
      contentVi: document.getElementById('fn-contentVi').value,
      date: document.getElementById('fn-date').value,
      locationEn: document.getElementById('fn-locationEn').value,
      locationVi: document.getElementById('fn-locationVi').value,
      countryEn: document.getElementById('fn-countryEn').value,
      countryVi: document.getElementById('fn-countryVi').value,
      image: document.getElementById('fn-image').value || undefined
    };

  } else if (activeCategory === 'publications') {
    newEntry = {
      id: id || `pub_${Date.now()}`,
      titleEn: document.getElementById('p-titleEn').value,
      titleVi: document.getElementById('p-titleVi').value,
      descriptionEn: document.getElementById('p-descriptionEn').value,
      descriptionVi: document.getElementById('p-descriptionVi').value,
      pdfUrl: document.getElementById('p-pdfUrl').value || undefined,
      coverImage: document.getElementById('p-coverImage').value
    };

  } else if (activeCategory === 'archive') {
    newEntry = {
      id: id || `arc_${Date.now()}`,
      category: document.getElementById('a-category').value,
      titleEn: document.getElementById('a-titleEn').value,
      titleVi: document.getElementById('a-titleVi').value,
      image: document.getElementById('a-image').value,
      date: document.getElementById('a-date').value,
      descriptionEn: document.getElementById('a-descriptionEn').value || undefined,
      descriptionVi: document.getElementById('a-descriptionVi').value || undefined
    };

  } else if (activeCategory === 'cv') {
    newEntry = {
      id: id || `cv_${Date.now()}`,
      category: document.getElementById('c-category').value,
      year: Number(document.getElementById('c-year').value),
      titleEn: document.getElementById('c-titleEn').value,
      titleVi: document.getElementById('c-titleVi').value,
      locationEn: document.getElementById('c-locationEn').value,
      locationVi: document.getElementById('c-locationVi').value
    };
  }

  if (id) {
    const idx = db[activeCategory].findIndex(x => x.id === id);
    if (idx !== -1) {
      db[activeCategory][idx] = newEntry;
    }
  } else {
    db[activeCategory].push(newEntry);
  }

  saveDatabase(db);
  closeForm();
  renderTable();
  alert("Log saved successfully! / Lưu thông tin thành công!");
}

// Delete log entry
function deleteEntry(id) {
  const confirmMsg = "Are you sure you want to delete this log from the archive? / Bạn có chắc chắn muốn xóa tệp này ra khỏi lưu trữ?";
  if (confirm(confirmMsg)) {
    db[activeCategory] = db[activeCategory].filter(x => x.id !== id);
    saveDatabase(db);
    renderTable();
  }
}

// Reset Database Seed
function resetDatabase() {
  const confirmMsg = "Warning: This will clear all custom edits and restore original seed data. Proceed? / Cảnh báo: Thao tác này sẽ xóa mọi chỉnh sửa và khôi phục dữ liệu mẫu gốc. Tiếp tục?";
  if (confirm(confirmMsg)) {
    db = resetDatabaseToSeed();
    renderTable();
    alert("Database restored! / Dữ liệu đã được khôi phục!");
  }
}

// Setup active category tabs selection
adminMenuTabs.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Tab highlighting
    adminMenuTabs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    
    // Support SVG path clicks matching the parent button
    const targetBtn = e.target.closest('button');
    targetBtn.classList.add('active');
    
    activeCategory = targetBtn.getAttribute('data-tab');
    renderCategory();
  });
});

// Auth Form Listeners
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (passcodeField.value === '1234') {
    sessionStorage.setItem('admin_authenticated', 'true');
    showDashboard();
  } else {
    alert("Incorrect passcode! / Mật khẩu chưa chính xác!");
  }
});

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('admin_authenticated');
  showLogin();
});

addNewBtn.addEventListener('click', () => openForm());
cancelEditBtn.addEventListener('click', closeForm);
crudForm.addEventListener('submit', handleFormSubmit);
resetDbBtn.addEventListener('click', resetDatabase);

// Run initialization
checkAuth();
