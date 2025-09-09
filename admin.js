// ================
// ADMIN DASHBOARD
// ================

// Check if user is logged in
if (!localStorage.getItem('adminAuth')) {
  window.location.href = 'login.html';
}

// Load data from localStorage (or initialize if empty)
let data = JSON.parse(localStorage.getItem('owldev_data')) || {
  portfolio: [],
  marketplace: []
};

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('adminAuth');
  window.location.href = 'index.html';
});

// Render Portfolio Items
function renderPortfolio() {
  const container = document.getElementById('portfolio-list');
  container.innerHTML = '';

  if (data.portfolio.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-secondary);">No portfolio items yet. Add one!</p>`;
    return;
  }

  data.portfolio.forEach(item => {
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x220/cccccc/333333?text=Image+Not+Found'" />
      <input type="text" value="${item.title || ''}" data-id="${item.id}" class="edit-title" placeholder="Title" />
      <textarea class="edit-desc" data-id="${item.id}" placeholder="Description">${item.description || ''}</textarea>
      <input type="text" value="${(item.tags || []).join(', ')}" data-id="${item.id}" class="edit-tags" placeholder="Tags (comma separated)" />
      <input type="text" value="${item.image || ''}" data-id="${item.id}" class="edit-image" placeholder="Image URL" />
      <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
        <button class="save-btn" data-id="${item.id}" style="background: #10b981;">Save</button>
        <button class="delete-btn" data-id="${item.id}" style="background: #ef4444;">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach event listeners
  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', savePortfolioItem);
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', deletePortfolioItem);
  });
}

// Render Marketplace Items
function renderMarketplace() {
  const container = document.getElementById('marketplace-list');
  container.innerHTML = '';

  if (data.marketplace.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-secondary);">No marketplace items yet. Add one!</p>`;
    return;
  }

  data.marketplace.forEach(item => {
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x220/cccccc/333333?text=Image+Not+Found'" />
      <input type="text" value="${item.title || ''}" data-id="${item.id}" class="edit-title" placeholder="Title" />
      <textarea class="edit-desc" data-id="${item.id}" placeholder="Description">${item.description || ''}</textarea>
      <input type="text" value="${item.price || ''}" data-id="${item.id}" class="edit-price" placeholder="Price (e.g. $10)" />
      <input type="text" value="${item.image || ''}" data-id="${item.id}" class="edit-image" placeholder="Image URL" />
      <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
        <button class="save-btn" data-id="${item.id}" style="background: #10b981;">Save</button>
        <button class="delete-btn" data-id="${item.id}" style="background: #ef4444;">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach event listeners
  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', saveMarketplaceItem);
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteMarketplaceItem);
  });
}

// Save Portfolio Item
function savePortfolioItem(e) {
  const id = parseInt(e.target.dataset.id);
  const card = e.target.closest('.admin-card');

  const updatedItem = {
    id: id,
    title: card.querySelector('.edit-title').value.trim() || 'Untitled',
    description: card.querySelector('.edit-desc').value.trim() || 'No description',
    image: card.querySelector('.edit-image').value.trim() || 'https://via.placeholder.com/400x220/cccccc/333333?text=No+Image',
    tags: card.querySelector('.edit-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag)
  };

  // Update in array
  const index = data.portfolio.findIndex(p => p.id === id);
  if (index !== -1) {
    data.portfolio[index] = updatedItem;
  }

  saveData();
  alert('✅ Portfolio item saved!');
}

// Delete Portfolio Item
function deletePortfolioItem(e) {
  const id = parseInt(e.target.dataset.id);
  data.portfolio = data.portfolio.filter(p => p.id !== id);
  saveData();
  renderPortfolio();
  alert('🗑️ Portfolio item deleted.');
}

// Save Marketplace Item
function saveMarketplaceItem(e) {
  const id = parseInt(e.target.dataset.id);
  const card = e.target.closest('.admin-card');

  const updatedItem = {
    id: id,
    title: card.querySelector('.edit-title').value.trim() || 'Untitled',
    description: card.querySelector('.edit-desc').value.trim() || 'No description',
    price: card.querySelector('.edit-price').value.trim() || 'Free',
    image: card.querySelector('.edit-image').value.trim() || 'https://via.placeholder.com/400x220/cccccc/333333?text=No+Image',
    note: "Interested? DM me on Discord: owl_coder" // Always keep this note
  };

  // Update in array
  const index = data.marketplace.findIndex(m => m.id === id);
  if (index !== -1) {
    data.marketplace[index] = updatedItem;
  }

  saveData();
  alert('✅ Marketplace item saved!');
}

// Delete Marketplace Item
function deleteMarketplaceItem(e) {
  const id = parseInt(e.target.dataset.id);
  data.marketplace = data.marketplace.filter(m => m.id !== id);
  saveData();
  renderMarketplace();
  alert('🗑️ Marketplace item deleted.');
}

// Add New Portfolio Item
document.getElementById('add-portfolio-btn').addEventListener('click', () => {
  const newId = data.portfolio.length > 0 ? Math.max(...data.portfolio.map(p => p.id)) + 1 : 1;

  data.portfolio.push({
    id: newId,
    title: "New Portfolio Item",
    description: "Describe your creation...",
    image: "https://via.placeholder.com/400x220/cccccc/333333?text=New+Item",
    tags: ["New", "Item"]
  });

  saveData();
  renderPortfolio();
  alert('✨ New portfolio item added!');
});

// Add New Marketplace Item
document.getElementById('add-marketplace-btn').addEventListener('click', () => {
  const newId = data.marketplace.length > 0 ? Math.max(...data.marketplace.map(m => m.id)) + 1 : 1;

  data.marketplace.push({
    id: newId,
    title: "New Marketplace Item",
    description: "Describe your asset...",
    image: "https://via.placeholder.com/400x220/cccccc/333333?text=New+Item",
    price: "$0",
    note: "Interested? DM me on Discord: owl_coder"
  });

  saveData();
  renderMarketplace();
  alert('✨ New marketplace item added!');
});

// Save Data to localStorage (this is what index.html reads from!)
function saveData() {
  localStorage.setItem('owldev_data', JSON.stringify(data));
}

// Apply theme toggle (reuse from main site)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  body.classList.remove(`${currentTheme}-theme`);
  body.classList.add(`${newTheme}-theme`);
  
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (icon) {
    if (theme === 'dark') {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  }
}

// Initial Render
renderPortfolio();
renderMarketplace();

// Add minimal admin card styling
const style = document.createElement('style');
style.textContent = `
  .admin-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .admin-card {
    background: var(--card-bg);
    border-radius: 1rem;
    padding: 1.25rem;
    box-shadow: var(--shadow);
  }

  .admin-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }

  .admin-card input,
  .admin-card textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: inherit;
  }

  .admin-card button {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 0.3rem;
    color: white;
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.2s;
  }

  .admin-card button:hover {
    opacity: 0.9;
  }

  /* Responsive */
  @media (max-width: 600px) {
    .admin-card {
      padding: 1rem;
    }
  }
`;
document.head.appendChild(style);
