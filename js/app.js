import mockPaintings from './mock-paintings.js';
import { filterPaintings, calculateCartTotal, generateZaloLink } from './helpers.js';

// Global state variables
let paintings = [];
let cart = [];
const artistZaloPhone = '0901234567';

// DOM elements
const galleryGrid = document.getElementById('gallery-grid');
const categorySelect = document.getElementById('category-select');
const priceSelect = document.getElementById('price-select');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const zaloCheckoutBtn = document.getElementById('zalo-checkout-btn');
const detailsDialog = document.getElementById('details-dialog');
const contactForm = document.getElementById('contact-form');

// Initialize application state
function init() {
  // Load database from LocalStorage or seed with mockPaintings
  const storedPaintings = localStorage.getItem('paintings_db');
  if (storedPaintings) {
    paintings = JSON.parse(storedPaintings);
  } else {
    paintings = mockPaintings;
    localStorage.setItem('paintings_db', JSON.stringify(paintings));
  }

  // Load cart from LocalStorage
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }

  // Setup event listeners
  categorySelect.addEventListener('change', renderGallery);
  priceSelect.addEventListener('change', renderGallery);
  zaloCheckoutBtn.addEventListener('click', checkoutZalo);
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Set up intersection observer for reveal effect
  setupScrollReveal();

  // Initial renders
  renderGallery();
  updateCartUI();
}

// Render Gallery based on filters
function renderGallery() {
  const selectedCategory = categorySelect.value;
  const selectedPrice = priceSelect.value;

  const filtered = filterPaintings(paintings, selectedCategory, selectedPrice);

  galleryGrid.innerHTML = '';
  if (filtered.length === 0) {
    galleryGrid.innerHTML = `<div class="placeholder" style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">Không tìm thấy tác phẩm nào khớp với bộ lọc.</div>`;
    return;
  }

  filtered.forEach(painting => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(painting.price);
    const isSold = painting.sold;

    const card = document.createElement('div');
    card.className = 'art-card reveal-on-scroll active'; // trigger visible
    card.innerHTML = `
      <img src="${painting.image}" alt="${painting.title}" class="art-card-image" data-id="${painting.id}">
      <h3 class="art-card-title">${painting.title}</h3>
      <p class="art-card-meta">${painting.material} | ${painting.size}</p>
      <div class="art-card-footer">
        <span class="art-card-price ${isSold ? 'sold-out' : ''}">${formattedPrice}</span>
        ${isSold 
          ? `<button class="btn-card-action btn-sold" disabled>Đã bán</button>`
          : `<button class="btn-card-action btn-add-cart" data-id="${painting.id}">Thêm vào giỏ</button>`
        }
      </div>
    `;
    galleryGrid.appendChild(card);
  });

  // Bind click details to images
  document.querySelectorAll('.art-card-image').forEach(img => {
    img.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      showDetails(id);
    });
  });

  // Bind click add to cart
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      addToCart(id);
    });
  });
}

// Show Art Piece Details in dialog using View Transitions API where supported
function showDetails(id) {
  const painting = paintings.find(p => p.id === id);
  if (!painting) return;

  const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(painting.price);
  const isSold = painting.sold;

  const contentMarkup = `
    <button class="dialog-close-btn" id="dialog-close-btn"><i class="fa-solid fa-xmark"></i></button>
    <img src="${painting.image}" alt="${painting.title}" class="dialog-image">
    <div class="dialog-info">
      <p class="dialog-artist">${painting.artist}</p>
      <h2>${painting.title}</h2>
      <div class="dialog-specs">
        <span><strong>Chất liệu:</strong> ${painting.material}</span>
        <span><strong>Kích thước:</strong> ${painting.size}</span>
        <span><strong>Năm sáng tác:</strong> ${painting.year}</span>
        <span><strong>Trạng thái:</strong> ${isSold ? 'Đã bán (Trưng bày)' : 'Sẵn sàng bán'}</span>
      </div>
      <p class="dialog-story">"${painting.description}"</p>
      <div class="dialog-footer">
        <span class="dialog-price">${formattedPrice}</span>
        ${isSold 
          ? `<button class="btn-primary btn-sold" disabled style="background-color: var(--border-color); color: var(--text-muted); cursor: not-allowed;">Tác phẩm đã bán</button>`
          : `<button class="btn-primary" id="dialog-add-to-cart" data-id="${painting.id}">Thêm Vào Giỏ Hàng</button>`
        }
      </div>
    </div>
  `;

  const setupDialog = () => {
    const dialogContent = document.getElementById('dialog-content');
    dialogContent.innerHTML = contentMarkup;
    
    // Bind close action
    document.getElementById('dialog-close-btn').addEventListener('click', () => {
      detailsDialog.close();
    });

    // Close when clicking outside dialog backdrop
    detailsDialog.onclick = (e) => {
      if (e.target === detailsDialog) {
        detailsDialog.close();
      }
    };

    // Bind add cart from dialog
    const addToCartBtn = document.getElementById('dialog-add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        addToCart(painting.id);
        detailsDialog.close();
      });
    }

    detailsDialog.showModal();
  };

  // Modern View Transitions API usage
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      setupDialog();
    });
  } else {
    setupDialog();
  }
}

// Add Item to Cart
function addToCart(id) {
  const painting = paintings.find(p => p.id === id);
  if (!painting || painting.sold) return;

  const exists = cart.find(item => item.id === id);
  if (!exists) {
    cart.push({ ...painting, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  // Open the Popover Cart Drawer to let the user see it
  const cartDrawer = document.getElementById('cart-drawer');
  if (cartDrawer && typeof cartDrawer.showPopover === 'function') {
    cartDrawer.showPopover();
  }
}

// Remove Item from Cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

// Update Cart UI Counts & items list
function updateCartUI() {
  // Update badge count
  cartCount.textContent = cart.length;

  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<div class="cart-empty">Giỏ hàng trống. Hãy chọn tác phẩm bạn yêu thích!</div>`;
    cartTotalPrice.textContent = '0 ₫';
    zaloCheckoutBtn.disabled = true;
    zaloCheckoutBtn.style.opacity = '0.5';
    zaloCheckoutBtn.style.cursor = 'not-allowed';
    return;
  }

  zaloCheckoutBtn.disabled = false;
  zaloCheckoutBtn.style.opacity = '1';
  zaloCheckoutBtn.style.cursor = 'pointer';

  cart.forEach(item => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price);
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.title}</h4>
        <span class="cart-item-price">${formattedPrice}</span>
      </div>
      <button class="cart-item-remove" data-id="${item.id}"><i class="fa-regular fa-trash-can"></i></button>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  // Rebind trash events
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      removeFromCart(id);
    });
  });

  // Update total
  const total = calculateCartTotal(cart);
  cartTotalPrice.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
}

// Trigger Zalo message redirects
function checkoutZalo() {
  const link = generateZaloLink(artistZaloPhone, cart);
  if (link) {
    window.open(link, '_blank');
    
    // Clear cart after checkout trigger
    cart = [];
    localStorage.removeItem('cart');
    updateCartUI();
  }
}

// Form contact submission handler
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('c-name').value;
  const phone = document.getElementById('c-phone').value;
  const date = document.getElementById('c-date').value;
  const message = document.getElementById('c-message').value;

  let alertMessage = `Cảm ơn ${name}! Tôi đã nhận được yêu cầu liên hệ từ bạn.\nSĐT: ${phone}`;
  if (date) {
    alertMessage += `\nLịch hẹn xem tranh đề xuất: ${date}`;
  }
  alertMessage += `\nNội dung lời nhắn: "${message}"\nTôi sẽ chủ động liên hệ lại sớm nhất.`;
  alert(alertMessage);
  contactForm.reset();
}

// Scroll reveal animations observer
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Run initial configurations
document.addEventListener('DOMContentLoaded', init);
