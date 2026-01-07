// 山代温泉開湯1300年 - Instagram Gallery
// Lightweight, dependency-free gallery rendering

const state = {
  posts: [],
  filter: 'すべて'
};

const selectors = {
  galleryContainer: '#galleryContainer',
  loading: '#loading',
  modal: '#modal',
  modalClose: '#modalClose',
  modalShare: '#modalShare',
  modalImage: '#modalImage',
  modalCategory: '#modalCategory',
  modalTitle: '#modalTitle',
  modalDescription: '#modalDescription',
  modalTags: '#modalTags',
  modalInstagramLink: '#modalInstagramLink'
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  setupFilterButtons();
  setupModal();
  loadPosts();
}

async function loadPosts() {
  try {
    const data = await fetchPosts();
    state.posts = data.posts || data;
    renderGallery(state.posts);
    hideLoading();
  } catch (error) {
    console.error('Error loading posts:', error);
    showError('投稿の読み込みに失敗しました。ページをリロードしてください。');
  }
}

async function fetchPosts() {
  const basePath = window.location.pathname.replace(/[^/]*$/, '');
  const candidates = [
    new URL('posts.json', window.location.href).toString(),
    `${window.location.origin}${basePath}posts.json`
  ];

  let lastError;
  for (const url of candidates) {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to load posts: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

function renderGallery(posts) {
  const container = document.querySelector(selectors.galleryContainer);
  if (!container) return;

  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  posts.forEach((post, index) => {
    const item = createGalleryItem(post, index);
    fragment.appendChild(item);
  });

  container.appendChild(fragment);
  setupImageObserver();
  setupRevealObserver();
}

function createGalleryItem(post, index) {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.dataset.category = post.category;
  item.dataset.index = index;

  const img = document.createElement('img');
  img.className = 'gallery-image';
  img.alt = post.title;
  img.loading = 'lazy';
  img.decoding = 'async';

  if (index < 6) {
    img.src = post.imageUrl;
  } else {
    img.dataset.src = post.imageUrl;
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ELoading...%3C/text%3E%3C/svg%3E';
  }

  const info = document.createElement('div');
  info.className = 'gallery-info';

  const category = document.createElement('span');
  category.className = 'gallery-category';
  category.textContent = post.category;

  const title = document.createElement('h3');
  title.className = 'gallery-title';
  title.textContent = post.title;

  const description = document.createElement('p');
  description.className = 'gallery-description';
  description.textContent = post.description;

  info.appendChild(category);
  info.appendChild(title);
  info.appendChild(description);

  item.appendChild(img);
  item.appendChild(info);

  item.addEventListener('click', () => openModal(post));

  return item;
}

function setupImageObserver() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.gallery-image[data-src]').forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
    return;
  }

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      });
    },
    { rootMargin: '100px' }
  );

  document.querySelectorAll('.gallery-image[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}

function setupRevealObserver() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.classList.add('is-visible');
    });
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.gallery-item').forEach((item) => {
    revealObserver.observe(item);
  });
}

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      applyFilter(category);
    });
  });
}

function applyFilter(category) {
  state.filter = category;
  const items = document.querySelectorAll('.gallery-item');

  items.forEach((item) => {
    const itemCategory = item.dataset.category;
    const shouldShow = category === 'すべて' || itemCategory === category;

    if (shouldShow) {
      item.classList.remove('hidden');
      item.removeAttribute('aria-hidden');
    } else {
      item.classList.add('hidden');
      item.setAttribute('aria-hidden', 'true');
    }
  });
}

function setupModal() {
  const modal = document.querySelector(selectors.modal);
  const closeBtn = document.querySelector(selectors.modalClose);
  const shareBtn = document.querySelector(selectors.modalShare);

  if (!modal || !closeBtn || !shareBtn) return;

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
  shareBtn.addEventListener('click', sharePost);
}

function openModal(post) {
  const modal = document.querySelector(selectors.modal);
  const modalImage = document.querySelector(selectors.modalImage);
  const modalCategory = document.querySelector(selectors.modalCategory);
  const modalTitle = document.querySelector(selectors.modalTitle);
  const modalDescription = document.querySelector(selectors.modalDescription);
  const modalTags = document.querySelector(selectors.modalTags);
  const modalInstagramLink = document.querySelector(selectors.modalInstagramLink);

  if (!modal) return;

  modalImage.src = post.imageUrl;
  modalImage.alt = post.title;
  modalCategory.textContent = post.category;
  modalTitle.textContent = post.title;
  modalDescription.textContent = post.description;

  modalTags.innerHTML = '';
  if (post.tags && post.tags.length > 0) {
    post.tags.forEach((tag) => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'modal-tag';
      tagSpan.textContent = `#${tag}`;
      modalTags.appendChild(tagSpan);
    });
  }

  modalInstagramLink.href = post.instagramUrl;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.querySelector(selectors.modal);
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

async function sharePost() {
  const title = document.querySelector(selectors.modalTitle)?.textContent || '';
  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: `山代温泉開湯1300年 - ${title}`,
        url
      });
    } catch (error) {
      console.warn('Share failed:', error);
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
    alert('URLをコピーしました！');
  } catch (error) {
    console.warn('Clipboard failed:', error);
  }
}

function hideLoading() {
  const loading = document.querySelector(selectors.loading);
  if (!loading) return;
  loading.style.display = 'none';
}

function showError(message) {
  const loading = document.querySelector(selectors.loading);
  if (!loading) return;
  loading.innerHTML = `
    <div style="color: #e74c3c; padding: 2rem;">
      <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
      <p style="font-size: 1.2rem; font-weight: 600;">${message}</p>
    </div>
  `;
}
