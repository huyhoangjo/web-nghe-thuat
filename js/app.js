import { getDatabase } from './database.js';
import { filterWorks, searchArchive, formatDate } from './helpers.js';

// Global state
let db = {};
let currentLang = localStorage.getItem('artistic_archive_lang') || 'en';
let currentView = 'home';

// Sub-filters state
let currentWorksChapter = 'all';
let currentFNCategory = 'all';
let currentArcCategory = 'all';
let currentCVCategory = 'all';

// Translation strings mapping
const UI_TRANSLATIONS = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navWorks: "Works",
    navJournal: "Journal / Fragments",
    navFieldNotes: "Field Notes",
    navPublications: "Publications",
    navArchive: "Archive",
    navCV: "CV / Timeline",
    navContact: "Contact",
    
    chapterAll: "All Evolution",
    chapter1: "Ch 1: Emerging Presence",
    chapter2: "Ch 2: Departure",
    chapter3: "Ch 3: Fragile Bodies",
    chapter4: "Ch 4: Temporary Presence",
    chapter5: "Ch 5: Inner Gravity",
    chapter6: "Ch 6: The Origin of No-Self",

    sectionHomeLabel: "Living Artistic Archive",
    sectionAboutLabel: "Artistic Practice & Biography",
    sectionWorksLabel: "Portfolio of Work",
    sectionJournalLabel: "Memory Fragments",
    sectionFNLabel: "Origins & Exploration",
    sectionPubLabel: "Printed Words & Essays",
    sectionArcLabel: "Studio Documents",
    sectionCVLabel: "Professional Journey",
    sectionContactLabel: "Connect",

    aboutMediumsLabel: "Research Interests & Mediums",
    aboutBioText: `
      <p>Ngo Thi Thuy Duyen is a Vietnamese contemporary artist whose practice spans painting, installation, performance, and textile art. Rather than viewing art as a static display, her work centers on art as a continuous process of becoming, memory curation, and fragile exploration.</p>
      <p>She investigates themes of migration, consciousness, feminine vulnerability, and transformation, often integrating traditional Dó paper, stitching, and organic materials. Her work serves as a living repository of thoughts, encounters, and spaces traveled.</p>
    `,
    aboutPracticeTags: ["Painting", "Installation", "Performance", "Feminine Consciousness", "Migration & Memory", "Dó Paper & Stitching"],

    worksTitle: "Selected Works",
    journalTitle: "Fragments of Consciousness",
    fnTitle: "Field Notes & Observations",
    pubTitle: "Exhibition Publications",
    arcTitle: "The Living Archive",
    cvTitle: "Curriculum Vitae",
    contactTitle: "Get in Touch",
    
    contactIntro: "For inquiries regarding curatorial projects, exhibitions, or research collaborations, please write to the studio.",
    contactEmail: "duyen.hoian@gmail.com",
    contactInstagram: "@ngo.thi.thuy.duyen",

    labelName: "Your Name *",
    labelEmail: "Your Email *",
    labelMsg: "Your Message / Inquiry *",
    submitBtn: "Send Message",
    contactSuccess: "Thank you. Your message has been sent to the artist's archive log.",

    searchPlaceholder: "Search archive (Medium, Year, Travel, etc.)...",
    noResults: "No items match your search criteria.",
    relatedJournals: "Related Journal / Fragments",
    relatedNotes: "Related Field Notes",

    specsMaterial: "Material",
    specsDimensions: "Dimensions",
    specsYear: "Year",
    specsStatus: "Status",
    statusAvailable: "Available in Studio",
    statusSold: "Sold / Private Collection",
    statusExhibited: "Exhibited / Museum Collection",

    cvSolo: "Solo Exhibitions",
    cvGroup: "Group Exhibitions",
    cvResidency: "Residencies",
    cvTalk: "Artist Talks",
    cvAward: "Awards & Grants",
    cvAll: "All Events",

    fnAll: "All Notes",
    fnTravel: "Travel Notes",
    fnLanguage: "Language Notes",
    fnObservation: "Observations",

    arcAll: "All Archives",
    arcSketches: "Sketches & Drawings",
    arcStudio: "Studio Atmosphere",
    arcProcess: "Work in Progress",
    arcPosters: "Posters & Invites",

    footerCopyright: "Ngo Thi Thuy Duyen © 2026. All Rights Reserved.",
    footerConcept: "Designed as a Living Artistic Archive. Every trace is temporary."
  },
  vi: {
    navHome: "Trang chủ",
    navAbout: "Giới thiệu",
    navWorks: "Tác phẩm",
    navJournal: "Nhật ký / Ký ức",
    navFieldNotes: "Ghi chép điền dã",
    navPublications: "Ấn phẩm",
    navArchive: "Lưu trữ",
    navCV: "Dòng thời gian CV",
    navContact: "Liên hệ",
    
    chapterAll: "Tất cả giai đoạn",
    chapter1: "Chương 1: Sự Hiện Diện Mới Nổi",
    chapter2: "Chương 2: Ra Đi",
    chapter3: "Chương 3: Cơ Thể Mong Manh",
    chapter4: "Chương 4: Hiện Diện Tạm Thời",
    chapter5: "Chương 5: Trọng Lực Nội Tâm",
    chapter6: "Chương 6: Cội Nguồn của Vô Ngã",

    sectionHomeLabel: "Lưu Trữ Nghệ Thuật Sống",
    sectionAboutLabel: "Thực hành Nghệ thuật & Tiểu sử",
    sectionWorksLabel: "Danh mục Tác phẩm",
    sectionJournalLabel: "Mảnh Vỡ Ký Ức",
    sectionFNLabel: "Cội Nguồn & Khám Phá",
    sectionPubLabel: "Bài viết & Tiểu luận",
    sectionArcLabel: "Tài liệu Xưởng vẽ",
    sectionCVLabel: "Hành trình Chuyên môn",
    sectionContactLabel: "Kết nối",

    aboutMediumsLabel: "Định hướng Nghiên cứu & Chất liệu",
    aboutBioText: `
      <p>Ngô Thị Thủy Duyên là một nghệ sĩ đương đại Việt Nam với thực hành đa dạng bao gồm hội họa, sắp đặt, trình diễn và nghệ thuật dệt. Thay vì coi nghệ thuật là sự trưng bày tĩnh, tác phẩm của cô tập trung vào nghệ thuật như một quá trình liên tục biến chuyển, lưu trữ ký ức và khám phá mong manh.</p>
      <p>Cô khảo cứu các chủ đề về di cư, tâm thức, sự dễ tổn thương của nữ giới và sự biến đổi, thường tích hợp giấy Dó truyền thống, đường chỉ khâu và các vật liệu hữu cơ. Tác phẩm của cô đóng vai trò như một kho lưu trữ sống về những suy tưởng, những cuộc gặp gỡ và không gian cô đã đi qua.</p>
    `,
    aboutPracticeTags: ["Hội họa", "Sắp đặt", "Trình diễn", "Ý thức nữ giới", "Di cư & Ký ức", "Giấy Dó & Chỉ khâu"],

    worksTitle: "Tác Phẩm Tuyển Chọn",
    journalTitle: "Những Mảnh Vỡ Tâm Thức",
    fnTitle: "Ghi Chép Điền Dã",
    pubTitle: "Ấn Phẩm Triển Lãm",
    arcTitle: "Lưu Trữ Quá Trình",
    cvTitle: "Sơ Yếu Lý Lịch Nghệ Thuật",
    contactTitle: "Liên Hệ",
    
    contactIntro: "Mọi yêu cầu về dự án giám tuyển, triển lãm hoặc hợp tác nghiên cứu nghệ thuật, xin vui lòng gửi thư cho xưởng vẽ.",
    contactEmail: "duyen.hoian@gmail.com",
    contactInstagram: "@ngo.thi.thuy.duyen",

    labelName: "Họ và tên *",
    labelEmail: "Email *",
    labelMsg: "Nội dung lời nhắn / Câu hỏi *",
    submitBtn: "Gửi Lời Nhắn",
    contactSuccess: "Cảm ơn bạn. Lời nhắn của bạn đã được ghi lại vào hệ thống lưu trữ.",

    searchPlaceholder: "Tìm kiếm (Chất liệu, Năm, Chuyến đi...)...",
    noResults: "Không tìm thấy kết quả nào phù hợp.",
    relatedJournals: "Bài viết nhật ký liên quan",
    relatedNotes: "Ghi chép điền dã liên quan",

    specsMaterial: "Chất liệu",
    specsDimensions: "Kích thước",
    specsYear: "Năm",
    specsStatus: "Trạng thái",
    statusAvailable: "Sẵn có tại Xưởng",
    statusSold: "Đã bán / Bộ sưu tập tư nhân",
    statusExhibited: "Đang trưng bày / Bộ sưu tập bảo tàng",

    cvSolo: "Triển lãm cá nhân",
    cvGroup: "Triển lãm nhóm",
    cvResidency: "Lưu trú nghệ thuật",
    cvTalk: "Trò chuyện nghệ sĩ",
    cvAward: "Giải thưởng & Tài trợ",
    cvAll: "Tất cả sự kiện",

    fnAll: "Tất cả ghi chép",
    fnTravel: "Ghi chép du hành",
    fnLanguage: "Ghi chép ngôn ngữ",
    fnObservation: "Quan sát trực tiếp",

    arcAll: "Tất cả tư liệu",
    arcSketches: "Phác thảo & Bản vẽ",
    arcStudio: "Không gian xưởng vẽ",
    arcProcess: "Quá trình thực hành",
    arcPosters: "Áp phích & Thư mời",

    footerCopyright: "Ngô Thị Thủy Duyên © 2026. Mọi quyền được bảo lưu.",
    footerConcept: "Thiết kế như một Lưu Trữ Nghệ Thuật Sống. Mỗi dấu vết đều là tạm thời."
  }
};

// Initialize Application
function init() {
  db = getDatabase();
  
  setupRouting();
  setupEventListeners();
  translateUI();
  handleRoute();
}

// Setup Event Listeners
function setupEventListeners() {
  const langToggleBtn = document.getElementById('lang-toggle');
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    localStorage.setItem('artistic_archive_lang', currentLang);
    langToggleBtn.textContent = currentLang === 'en' ? 'VI' : 'EN';
    translateUI();
    renderCurrentView();
  });

  // Search overlay toggle
  const searchToggleBtn = document.getElementById('search-toggle-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');

  searchToggleBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.placeholder = UI_TRANSLATIONS[currentLang].searchPlaceholder;
    searchInput.focus();
  });

  searchCloseBtn.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    document.getElementById('search-results-container').innerHTML = '';
  });

  searchInput.addEventListener('input', handleSearch);

  // Close search on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchOverlay.classList.remove('active');
      searchInput.value = '';
      document.getElementById('search-results-container').innerHTML = '';
      const dialog = document.getElementById('details-dialog');
      if (dialog && dialog.open) {
        dialog.close();
      }
    }
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(UI_TRANSLATIONS[currentLang].contactSuccess);
      contactForm.reset();
    });
  }
}

// Router State setup
function setupRouting() {
  window.addEventListener('hashchange', handleRoute);
}

function handleRoute() {
  const hash = window.location.hash.substring(1) || 'home';
  // Parse sub-route params if any (e.g. works/chapter/1)
  const parts = hash.split('/');
  currentView = parts[0];
  
  if (currentView === 'works' && parts[1] === 'chapter') {
    currentWorksChapter = parts[2] || 'all';
  } else if (currentView === 'fieldNotes' && parts[1] === 'category') {
    currentFNCategory = parts[2] || 'all';
  } else if (currentView === 'archive' && parts[1] === 'category') {
    currentArcCategory = parts[2] || 'all';
  } else if (currentView === 'cv' && parts[1] === 'category') {
    currentCVCategory = parts[2] || 'all';
  }

  // Active navigation link highlighting
  updateActiveNavLink();
  
  // Transition between pages
  document.querySelectorAll('.view-container').forEach(container => {
    container.classList.remove('active');
  });

  const activeContainer = document.getElementById(`view-${currentView}`);
  if (activeContainer) {
    activeContainer.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderCurrentView();
  }
}

function updateActiveNavLink() {
  const navMenu = document.getElementById('nav-menu');
  navMenu.querySelectorAll('a').forEach(link => {
    const linkHash = link.getAttribute('href').substring(1);
    if (linkHash === currentView || (currentView === 'works' && linkHash === 'works') || (currentView === 'fieldNotes' && linkHash === 'fieldNotes') || (currentView === 'archive' && linkHash === 'archive') || (currentView === 'cv' && linkHash === 'cv')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Global UI Translation
function translateUI() {
  const t = UI_TRANSLATIONS[currentLang];
  
  // Navigation Menu Links
  const navMenu = document.getElementById('nav-menu');
  navMenu.innerHTML = `
    <li><a href="#home">${t.navHome}</a></li>
    <li><a href="#about">${t.navAbout}</a></li>
    <li><a href="#works">${t.navWorks}</a></li>
    <li><a href="#journal">${t.navJournal}</a></li>
    <li><a href="#fieldNotes">${t.navFieldNotes}</a></li>
    <li><a href="#publications">${t.navPublications}</a></li>
    <li><a href="#archive">${t.navArchive}</a></li>
    <li><a href="#cv">${t.navCV}</a></li>
    <li><a href="#contact">${t.navContact}</a></li>
  `;
  updateActiveNavLink();

  // Section Labels
  document.getElementById('home-featured-label').textContent = t.navWorks;
  document.getElementById('about-practice-label').textContent = t.sectionAboutLabel;
  document.getElementById('works-section-label').textContent = t.sectionWorksLabel;
  document.getElementById('journal-section-label').textContent = t.sectionJournalLabel;
  document.getElementById('fn-section-label').textContent = t.sectionFNLabel;
  document.getElementById('pub-section-label').textContent = t.sectionPubLabel;
  document.getElementById('arc-section-label').textContent = t.sectionArcLabel;
  document.getElementById('cv-section-label').textContent = t.sectionCVLabel;
  document.getElementById('contact-section-label').textContent = t.sectionContactLabel;

  // Titles
  document.getElementById('about-title').textContent = t.navAbout;
  document.getElementById('works-title').textContent = t.worksTitle;
  document.getElementById('journal-title').textContent = t.journalTitle;
  document.getElementById('fn-title').textContent = t.fnTitle;
  document.getElementById('pub-title').textContent = t.pubTitle;
  document.getElementById('arc-title').textContent = t.arcTitle;
  document.getElementById('cv-title').textContent = t.cvTitle;
  document.getElementById('contact-title').textContent = t.contactTitle;

  // Subtitles & Text Blocks
  document.getElementById('about-bio-content').innerHTML = t.aboutBioText;
  document.getElementById('about-mediums-label').textContent = t.aboutMediumsLabel;
  
  const practiceList = document.getElementById('about-practice-list');
  practiceList.innerHTML = '';
  t.aboutPracticeTags.forEach(tag => {
    const li = document.createElement('li');
    li.className = 'practice-tag';
    li.textContent = tag;
    practiceList.appendChild(li);
  });

  document.getElementById('contact-text-p').textContent = t.contactIntro;
  document.getElementById('contact-links-list').innerHTML = `
    <a href="mailto:${t.contactEmail}">${t.contactEmail}</a>
    <a href="https://instagram.com/ngo.thi.thuy.duyen" target="_blank">${t.contactInstagram}</a>
  `;

  // Contact Form Labels
  document.getElementById('label-name').textContent = t.labelName;
  document.getElementById('label-email').textContent = t.labelEmail;
  document.getElementById('label-msg').textContent = t.labelMsg;
  document.getElementById('contact-submit-btn').textContent = t.submitBtn;

  // Footer
  document.getElementById('footer-copyright').textContent = t.footerCopyright;
  document.getElementById('footer-concept').textContent = t.footerConcept;
}

// Render Active Section Content
function renderCurrentView() {
  switch (currentView) {
    case 'home':
      renderHome();
      break;
    case 'works':
      renderWorks();
      break;
    case 'journal':
      renderJournal();
      break;
    case 'fieldNotes':
      renderFieldNotes();
      break;
    case 'publications':
      renderPublications();
      break;
    case 'archive':
      renderArchive();
      break;
    case 'cv':
      renderCV();
      break;
    case 'contact':
      // Static form, nothing to dynamic render
      break;
  }
}

// RENDER: HOME
function renderHome() {
  const featuredWork = db.works && db.works.length > 0 ? db.works[0] : null;
  const t = UI_TRANSLATIONS[currentLang];

  const statementQuote = currentLang === 'en' 
    ? "Tracing what remains after time has passed through us."
    : "Dấu vết còn lại sau khi thời gian đi qua chúng ta.";
  const statementSub = currentLang === 'en'
    ? "A living archive of memory, fragility and transformation."
    : "Một lưu trữ sống về ký ức, sự mong manh và chuyển đổi.";

  document.getElementById('home-statement-quote').textContent = `"${statementQuote}"`;
  document.getElementById('home-statement-sub').textContent = statementSub;

  if (featuredWork) {
    document.getElementById('home-hero-image').src = featuredWork.image;
    document.getElementById('home-hero-title').textContent = currentLang === 'en' ? featuredWork.titleEn : featuredWork.titleVi;

    const featContainer = document.getElementById('home-featured-content');
    featContainer.innerHTML = `
      <div class="artwork-display">
        <img src="${featuredWork.image}" alt="${currentLang === 'en' ? featuredWork.titleEn : featuredWork.titleVi}" class="work-card-img" data-id="${featuredWork.id}" style="cursor:pointer;">
      </div>
      <div class="artwork-info-minimal">
        <p class="section-label">${t.chapterAll} - Ch ${featuredWork.chapter}</p>
        <h3>${currentLang === 'en' ? featuredWork.titleEn : featuredWork.titleVi}</h3>
        <p class="meta">${currentLang === 'en' ? featuredWork.materialEn : featuredWork.materialVi} | ${featuredWork.dimensions} | ${featuredWork.year}</p>
        <p class="description">${currentLang === 'en' ? featuredWork.descriptionEn : featuredWork.descriptionVi}</p>
        <button class="read-more-btn" data-id="${featuredWork.id}">${currentLang === 'en' ? 'Enter Archive Item' : 'Xem Chi Tiết Tư Liệu'}</button>
      </div>
    `;

    // Bind click events
    featContainer.querySelectorAll('[data-id], .read-more-btn').forEach(el => {
      el.addEventListener('click', () => {
        showDetails(featuredWork.id);
      });
    });
  }
}

// RENDER: WORKS
function renderWorks() {
  const t = UI_TRANSLATIONS[currentLang];
  
  // Render chapters sub-navigation
  const chaptersNav = document.getElementById('works-chapters-nav');
  chaptersNav.innerHTML = `
    <li><button class="${currentWorksChapter === 'all' ? 'active' : ''}" data-chapter="all">${t.chapterAll}</button></li>
    <li><button class="${currentWorksChapter === '1' ? 'active' : ''}" data-chapter="1">${t.chapter1}</button></li>
    <li><button class="${currentWorksChapter === '2' ? 'active' : ''}" data-chapter="2">${t.chapter2}</button></li>
    <li><button class="${currentWorksChapter === '3' ? 'active' : ''}" data-chapter="3">${t.chapter3}</button></li>
    <li><button class="${currentWorksChapter === '4' ? 'active' : ''}" data-chapter="4">${t.chapter4}</button></li>
    <li><button class="${currentWorksChapter === '5' ? 'active' : ''}" data-chapter="5">${t.chapter5}</button></li>
    <li><button class="${currentWorksChapter === '6' ? 'active' : ''}" data-chapter="6">${t.chapter6}</button></li>
  `;

  // Bind click handlers to sub-nav buttons
  chaptersNav.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ch = e.target.getAttribute('data-chapter');
      currentWorksChapter = ch;
      window.location.hash = ch === 'all' ? '#works' : `#works/chapter/${ch}`;
    });
  });

  const filtered = filterWorks(db.works, currentWorksChapter);
  const grid = document.getElementById('works-grid');
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 4rem; color: var(--text-muted);">${t.noResults}</div>`;
    return;
  }

  filtered.forEach(work => {
    const card = document.createElement('div');
    card.className = 'work-card';
    card.innerHTML = `
      <div class="work-card-img-wrapper">
        <img src="${work.image}" alt="${currentLang === 'en' ? work.titleEn : work.titleVi}">
      </div>
      <h4>${currentLang === 'en' ? work.titleEn : work.titleVi}</h4>
      <p>${currentLang === 'en' ? work.materialEn : work.materialVi} | ${work.year}</p>
    `;
    card.addEventListener('click', () => showDetails(work.id));
    grid.appendChild(card);
  });
}

// RENDER: JOURNAL
function renderJournal() {
  const list = document.getElementById('journal-list');
  list.innerHTML = '';

  if (!db.journal || db.journal.length === 0) {
    list.innerHTML = `<div style="text-align:center; padding: 4rem; color: var(--text-muted);">${UI_TRANSLATIONS[currentLang].noResults}</div>`;
    return;
  }

  // Sort by date descending
  const sorted = [...db.journal].sort((a, b) => new Date(b.date) - new Date(a.date));

  sorted.forEach(entry => {
    const post = document.createElement('article');
    post.className = 'journal-post';
    post.id = `journal-${entry.id}`;
    
    const formattedDate = formatDate(entry.date, currentLang);
    const location = currentLang === 'en' ? entry.locationEn : entry.locationVi;

    post.innerHTML = `
      <div class="date-loc">${formattedDate} — ${location}</div>
      <h3>${currentLang === 'en' ? entry.titleEn : entry.titleVi}</h3>
      <div class="content">${currentLang === 'en' ? entry.contentEn : entry.contentVi}</div>
      ${entry.image ? `<img src="${entry.image}" alt="${currentLang === 'en' ? entry.titleEn : entry.titleVi}">` : ''}
    `;
    list.appendChild(post);
  });
}

// RENDER: FIELD NOTES
function renderFieldNotes() {
  const t = UI_TRANSLATIONS[currentLang];
  
  // Render sub-categories nav
  const catNav = document.getElementById('fn-categories-nav');
  catNav.innerHTML = `
    <li><button class="${currentFNCategory === 'all' ? 'active' : ''}" data-cat="all">${t.fnAll}</button></li>
    <li><button class="${currentFNCategory === 'travel' ? 'active' : ''}" data-cat="travel">${t.fnTravel}</button></li>
    <li><button class="${currentFNCategory === 'language' ? 'active' : ''}" data-cat="language">${t.fnLanguage}</button></li>
    <li><button class="${currentFNCategory === 'observation' ? 'active' : ''}" data-cat="observation">${t.fnObservation}</button></li>
  `;

  catNav.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.target.getAttribute('data-cat');
      currentFNCategory = cat;
      window.location.hash = cat === 'all' ? '#fieldNotes' : `#fieldNotes/category/${cat}`;
    });
  });

  const filtered = !db.fieldNotes ? [] : db.fieldNotes.filter(n => currentFNCategory === 'all' || n.category === currentFNCategory);
  const grid = document.getElementById('fn-grid');
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 4rem; color: var(--text-muted);">${t.noResults}</div>`;
    return;
  }

  filtered.forEach(note => {
    const card = document.createElement('div');
    card.className = 'field-note-card';
    card.id = `note-${note.id}`;
    
    const formattedDate = formatDate(note.date, currentLang);
    const location = currentLang === 'en' ? note.locationEn : note.locationVi;
    const country = currentLang === 'en' ? note.countryEn : note.countryVi;
    const catLabel = t[`fn${note.category.charAt(0).toUpperCase() + note.category.slice(1)}`] || note.category;

    card.innerHTML = `
      <div class="meta">${catLabel} | ${formattedDate} — ${location}, ${country}</div>
      <h4>${currentLang === 'en' ? note.titleEn : note.titleVi}</h4>
      <p>${currentLang === 'en' ? note.contentEn : note.contentVi}</p>
      ${note.image ? `<img src="${note.image}" alt="${currentLang === 'en' ? note.titleEn : note.titleVi}">` : ''}
    `;
    grid.appendChild(card);
  });
}

// RENDER: PUBLICATIONS
function renderPublications() {
  const grid = document.getElementById('pub-grid');
  grid.innerHTML = '';

  if (!db.publications || db.publications.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 4rem; color: var(--text-muted);">${UI_TRANSLATIONS[currentLang].noResults}</div>`;
    return;
  }

  db.publications.forEach(pub => {
    const card = document.createElement('div');
    card.className = 'publication-card';
    card.innerHTML = `
      <img src="${pub.coverImage}" alt="${currentLang === 'en' ? pub.titleEn : pub.titleVi}">
      <h4>${currentLang === 'en' ? pub.titleEn : pub.titleVi}</h4>
      <p>${currentLang === 'en' ? pub.descriptionEn : pub.descriptionVi}</p>
      ${pub.pdfUrl ? `<a href="${pub.pdfUrl}" class="read-more-btn" style="align-self: flex-start;">${currentLang === 'en' ? 'Open PDF File' : 'Mở Tài Liệu PDF'}</a>` : ''}
    `;
    grid.appendChild(card);
  });
}

// RENDER: ARCHIVE
function renderArchive() {
  const t = UI_TRANSLATIONS[currentLang];

  const catNav = document.getElementById('arc-categories-nav');
  catNav.innerHTML = `
    <li><button class="${currentArcCategory === 'all' ? 'active' : ''}" data-cat="all">${t.arcAll}</button></li>
    <li><button class="${currentArcCategory === 'sketches' ? 'active' : ''}" data-cat="sketches">${t.arcSketches}</button></li>
    <li><button class="${currentArcCategory === 'studio' ? 'active' : ''}" data-cat="studio">${t.arcStudio}</button></li>
    <li><button class="${currentArcCategory === 'process' ? 'active' : ''}" data-cat="process">${t.arcProcess}</button></li>
    <li><button class="${currentArcCategory === 'posters' ? 'active' : ''}" data-cat="posters">${t.arcPosters}</button></li>
  `;

  catNav.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.target.getAttribute('data-cat');
      currentArcCategory = cat;
      window.location.hash = cat === 'all' ? '#archive' : `#archive/category/${cat}`;
    });
  });

  const filtered = !db.archive ? [] : db.archive.filter(item => currentArcCategory === 'all' || item.category === currentArcCategory);
  const grid = document.getElementById('arc-grid');
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 4rem; color: var(--text-muted);">${t.noResults}</div>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'archive-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${currentLang === 'en' ? item.titleEn : item.titleVi}">
      <h4>${currentLang === 'en' ? item.titleEn : item.titleVi}</h4>
      <p>${item.date} ${item.descriptionEn ? `| ${currentLang === 'en' ? item.descriptionEn : item.descriptionVi}` : ''}</p>
    `;
    grid.appendChild(card);
  });
}

// RENDER: CV
function renderCV() {
  const t = UI_TRANSLATIONS[currentLang];

  const catNav = document.getElementById('cv-categories-nav');
  catNav.innerHTML = `
    <li><button class="${currentCVCategory === 'all' ? 'active' : ''}" data-cat="all">${t.cvAll}</button></li>
    <li><button class="${currentCVCategory === 'solo' ? 'active' : ''}" data-cat="solo">${t.cvSolo}</button></li>
    <li><button class="${currentCVCategory === 'group' ? 'active' : ''}" data-cat="group">${t.cvGroup}</button></li>
    <li><button class="${currentCVCategory === 'residency' ? 'active' : ''}" data-cat="residency">${t.cvResidency}</button></li>
    <li><button class="${currentCVCategory === 'talk' ? 'active' : ''}" data-cat="talk">${t.cvTalk}</button></li>
    <li><button class="${currentCVCategory === 'award' ? 'active' : ''}" data-cat="award">${t.cvAward}</button></li>
  `;

  catNav.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = e.target.getAttribute('data-cat');
      currentCVCategory = cat;
      window.location.hash = cat === 'all' ? '#cv' : `#cv/category/${cat}`;
    });
  });

  const filtered = !db.cv ? [] : db.cv.filter(event => currentCVCategory === 'all' || event.category === currentCVCategory);
  
  // Sort CV by year descending
  const sorted = filtered.sort((a, b) => b.year - a.year);

  const timeline = document.getElementById('cv-timeline');
  timeline.innerHTML = '';

  if (sorted.length === 0) {
    timeline.innerHTML = `<div style="text-align:center; padding: 4rem; color: var(--text-muted);">${t.noResults}</div>`;
    return;
  }

  sorted.forEach(event => {
    const item = document.createElement('div');
    item.className = 'cv-timeline-item';
    item.innerHTML = `
      <div class="cv-year">${event.year}</div>
      <div class="cv-title">${currentLang === 'en' ? event.titleEn : event.titleVi}</div>
      <div class="cv-location">${currentLang === 'en' ? event.locationEn : event.locationVi}</div>
    `;
    timeline.appendChild(item);
  });
}

// Show Art Piece Details Lightbox (Relational Links resolving)
function showDetails(id) {
  const work = db.works.find(w => w.id === id);
  if (!work) return;

  const t = UI_TRANSLATIONS[currentLang];
  const dialog = document.getElementById('details-dialog');

  let statusText = t.statusAvailable;
  if (work.status === 'sold') statusText = t.statusSold;
  if (work.status === 'exhibited') statusText = t.statusExhibited;

  // Resolve related items
  let relationsHtml = '';
  
  if (work.relatedJournalIds && work.relatedJournalIds.length > 0) {
    relationsHtml += `<h4>${t.relatedJournals}</h4>`;
    work.relatedJournalIds.forEach(jid => {
      const entry = db.journal.find(j => j.id === jid);
      if (entry) {
        relationsHtml += `<a href="#journal" class="dialog-relation-link" data-link="journal-${jid}">${currentLang === 'en' ? entry.titleEn : entry.titleVi}</a>`;
      }
    });
  }

  if (work.relatedNoteIds && work.relatedNoteIds.length > 0) {
    relationsHtml += `<h4 style="margin-top:1rem;">${t.relatedNotes}</h4>`;
    work.relatedNoteIds.forEach(nid => {
      const note = db.fieldNotes.find(fn => fn.id === nid);
      if (note) {
        relationsHtml += `<a href="#fieldNotes" class="dialog-relation-link" data-link="note-${nid}">${currentLang === 'en' ? note.titleEn : note.titleVi}</a>`;
      }
    });
  }

  const markup = `
    <button class="dialog-close-btn" id="dialog-close-btn"><i class="fa-solid fa-xmark"></i></button>
    <img src="${work.image}" alt="${currentLang === 'en' ? work.titleEn : work.titleVi}" class="dialog-image">
    <div class="dialog-info">
      <p class="chapter-badge">Ch ${work.chapter} / ${t.chapterAll}</p>
      <h2>${currentLang === 'en' ? work.titleEn : work.titleVi}</h2>
      
      <div class="dialog-specs">
        <span><strong>${t.specsMaterial}:</strong> ${currentLang === 'en' ? work.materialEn : work.materialVi}</span>
        <span><strong>${t.specsDimensions}:</strong> ${work.dimensions}</span>
        <span><strong>${t.specsYear}:</strong> ${work.year}</span>
        <span><strong>${t.specsStatus}:</strong> ${statusText}</span>
      </div>
      
      <p class="dialog-story">${currentLang === 'en' ? work.descriptionEn : work.descriptionVi}</p>
      
      ${relationsHtml ? `<div class="dialog-relations">${relationsHtml}</div>` : ''}
    </div>
  `;

  const setupDialog = () => {
    const dialogContent = document.getElementById('dialog-content');
    dialogContent.innerHTML = markup;

    // Bind Close
    document.getElementById('dialog-close-btn').addEventListener('click', () => {
      dialog.close();
    });

    dialog.onclick = (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    };

    // Bind Relation Links to close modal and scroll to targets
    dialogContent.querySelectorAll('.dialog-relation-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const targetId = link.getAttribute('data-link');
        
        dialog.close();
        window.location.hash = href;
        
        // Timeout to allow routing transition to finish before scrolling
        setTimeout(() => {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.style.outline = '1px solid var(--text-charcoal)';
            setTimeout(() => { targetEl.style.outline = 'none'; }, 2000);
          }
        }, 650);
      });
    });

    dialog.showModal();
  };

  if (document.startViewTransition) {
    document.startViewTransition(() => {
      setupDialog();
    });
  } else {
    setupDialog();
  }
}

// SEARCH OVERLAY HANDLE
function handleSearch(e) {
  const query = e.target.value;
  const container = document.getElementById('search-results-container');
  container.innerHTML = '';

  if (!query || query.trim() === '') {
    return;
  }

  const matches = searchArchive(db, query, currentLang);

  if (matches.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 2rem; color: var(--text-muted);">${UI_TRANSLATIONS[currentLang].noResults}</div>`;
    return;
  }

  matches.forEach(match => {
    const item = match.item;
    const resultItem = document.createElement('div');
    resultItem.className = 'search-result-item';

    let badge = match.type;
    let title = '';
    let snippet = '';
    let targetHash = '#home';

    if (match.type === 'work') {
      badge = UI_TRANSLATIONS[currentLang].navWorks;
      title = currentLang === 'en' ? item.titleEn : item.titleVi;
      snippet = `${currentLang === 'en' ? item.materialEn : item.materialVi} | ${item.year}`;
      targetHash = `#works`;
    } else if (match.type === 'journal') {
      badge = UI_TRANSLATIONS[currentLang].navJournal;
      title = currentLang === 'en' ? item.titleEn : item.titleVi;
      snippet = formatDate(item.date, currentLang);
      targetHash = `#journal`;
    } else if (match.type === 'fieldNote') {
      badge = UI_TRANSLATIONS[currentLang].navFieldNotes;
      title = currentLang === 'en' ? item.titleEn : item.titleVi;
      snippet = `${formatDate(item.date, currentLang)} — ${currentLang === 'en' ? item.locationEn : item.locationVi}`;
      targetHash = `#fieldNotes`;
    } else if (match.type === 'archive') {
      badge = UI_TRANSLATIONS[currentLang].navArchive;
      title = currentLang === 'en' ? item.titleEn : item.titleVi;
      snippet = item.date;
      targetHash = `#archive`;
    }

    resultItem.innerHTML = `
      <span class="type-badge">${badge}</span>
      <h4>${title}</h4>
      <p>${snippet}</p>
    `;

    resultItem.addEventListener('click', () => {
      // Close search overlay
      document.getElementById('search-overlay').classList.remove('active');
      document.getElementById('search-input').value = '';
      
      // Navigate to page
      window.location.hash = targetHash;

      // Scroll to specific item if possible
      setTimeout(() => {
        if (match.type === 'work') {
          showDetails(item.id);
        } else {
          const elementId = match.type === 'journal' ? `journal-${item.id}` : `note-${item.id}`;
          const targetEl = document.getElementById(elementId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.style.outline = '1px solid var(--text-charcoal)';
            setTimeout(() => { targetEl.style.outline = 'none'; }, 2000);
          }
        }
      }, 700);
    });

    container.appendChild(resultItem);
  });
}

// Initial load triggers
document.addEventListener('DOMContentLoaded', init);
export { UI_TRANSLATIONS };
