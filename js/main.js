// 山代温泉開湯1300年 - Instagram Gallery
// Optimized for performance with lazy loading

// グローバル変数
let allPosts = [];
let currentFilter = 'すべて';
let isAnimating = false;
const FALLBACK_IMAGE =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"%3E%3Crect fill="%23f0f0f0" width="800" height="800"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage unavailable%3C/text%3E%3C/svg%3E';

// DOMContentLoaded イベント
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// アプリケーション初期化
function initApp() {
    loadPosts();
    setupFilterButtons();
    setupModal();
    setupScrollAnimation();
}

// 投稿データの読み込み
async function loadPosts() {
    try {
        const response = await fetch('posts.json');
        if (!response.ok) {
            throw new Error('Failed to load posts');
        }
        const data = await response.json();
        // posts.jsonの構造が { "posts": [...] } の場合に対応
        allPosts = data.posts || data;
        renderGallery(allPosts);
        hideLoading();
    } catch (error) {
        console.error('Error loading posts:', error);
        showError('投稿の読み込みに失敗しました。ページをリロードしてください。');
    }
}

// ギャラリーのレンダリング（Lazy Loading対応）
function renderGallery(posts) {
    const container = document.getElementById('galleryContainer');
    container.innerHTML = '';
    
    posts.forEach((post, index) => {
        const item = createGalleryItem(post, index);
        container.appendChild(item);
    });
    
    // GSAP アニメーションの初期化
    initializeGSAPAnimations();
}

// ギャラリーアイテムの作成（Lazy Loading対応）
function createGalleryItem(post, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.category = post.category;
    item.dataset.index = index;
    
    // 画像要素（Lazy Loading対応）
    const img = document.createElement('img');
    img.className = 'gallery-image';
    img.alt = post.title;
    img.decoding = 'async';
    img.onerror = () => {
        if (img.src !== FALLBACK_IMAGE) {
            img.src = FALLBACK_IMAGE;
        }
    };
    
    // Lazy loading属性を追加（パフォーマンス改善）
    img.loading = 'lazy';
    
    // 最初の数枚は即座に読み込み、それ以降は遅延読み込み
    if (index < 3) {
        img.src = post.imageUrl;
    } else {
        img.dataset.src = post.imageUrl;
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ELoading...%3C/text%3E%3C/svg%3E';
        
        // Intersection Observer で遅延読み込み（未対応の場合は即時読み込み）
        const isObserved = observeImage(img);
        if (!isObserved) {
            img.src = post.imageUrl;
            img.removeAttribute('data-src');
        }
    }
    
    // 情報セクション
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
    
    // クリックイベント
    item.addEventListener('click', () => openModal(post));
    
    return item;
}

// Intersection Observer で画像の遅延読み込み
let imageObserver;

function observeImage(img) {
    if (!('IntersectionObserver' in window)) {
        return false;
    }
    if (!imageObserver) {
        imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // 50px手前で読み込み開始
        });
    }
    
    imageObserver.observe(img);
    return true;
}

// フィルターボタンのセットアップ
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // アクティブボタンの更新
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // フィルター適用
            applyFilter(category);
        });
    });
}

// フィルター適用
function applyFilter(category) {
    currentFilter = category;
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (category === 'すべて' || itemCategory === category) {
            item.classList.remove('hidden');
            // GSAP でフェードイン
            if (typeof gsap !== 'undefined') {
                gsap.to(item, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3
                });
            }
        } else {
            item.classList.add('hidden');
            if (typeof gsap !== 'undefined') {
                gsap.to(item, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3
                });
            }
        }
    });
}

// モーダルのセットアップ
function setupModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('modalClose');
    const shareBtn = document.getElementById('modalShare');
    
    // 閉じるボタン
    closeBtn.addEventListener('click', closeModal);
    
    // モーダル背景クリックで閉じる
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // シェアボタン
    shareBtn.addEventListener('click', sharePost);
}

// モーダルを開く
function openModal(post) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const modalInstagramLink = document.getElementById('modalInstagramLink');
    
    // コンテンツ設定
    modalImage.src = post.imageUrl;
    modalImage.alt = post.title;
    modalCategory.textContent = post.category;
    modalTitle.textContent = post.title;
    modalDescription.textContent = post.description;
    
    // タグ
    modalTags.innerHTML = '';
    if (post.tags && post.tags.length > 0) {
        post.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'modal-tag';
            tagSpan.textContent = `#${tag}`;
            modalTags.appendChild(tagSpan);
        });
    }
    
    // Instagramリンク
    modalInstagramLink.href = post.instagramUrl;
    
    // モーダル表示
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// モーダルを閉じる
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 投稿をシェア
function sharePost() {
    const title = document.getElementById('modalTitle').textContent;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: `山代温泉開湯1300年 - ${title}`,
            url: url
        }).catch(err => console.log('Share failed:', err));
    } else {
        // フォールバック: URLをコピー
        copyToClipboard(url);
        alert('URLをコピーしました！');
    }
}

// クリップボードにコピー
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// GSAPアニメーションの初期化
function initializeGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded yet');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // ギャラリーアイテムのアニメーション
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.05
        });
    });
}

// スクロールアニメーションのセットアップ
function setupScrollAnimation() {
    const wrapper = document.getElementById('galleryWrapper');
    const container = document.getElementById('galleryContainer');
    
    if (!wrapper || !container) return;
    
    // マウスホイールで横スクロール
    wrapper.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > 0) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
    }, { passive: false });
}

// ローディング表示を隠す
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        if (typeof gsap !== 'undefined') {
            gsap.to(loading, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    loading.style.display = 'none';
                }
            });
        } else {
            loading.style.display = 'none';
        }
    }
}

// エラー表示
function showError(message) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.innerHTML = `
            <div style="color: #e74c3c; padding: 2rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p style="font-size: 1.2rem; font-weight: 600;">${message}</p>
            </div>
        `;
    }
}

// パフォーマンス最適化: デバウンス関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ウィンドウリサイズ時の処理（デバウンス付き）
window.addEventListener('resize', debounce(() => {
    // 必要に応じてレイアウト調整
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}, 250));
