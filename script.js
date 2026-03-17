// --- 1. Mobile Menu Toggle ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            mobileMenu.innerHTML = '✕';
        } else {
            mobileMenu.innerHTML = '☰';
        }
    });

    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.innerHTML = '☰';
        });
    });
}

// --- 2. Sticky Header Scroll Effect ---
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 1)';
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.8)';
            header.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
        } else {
            header.style.backgroundColor = 'rgba(13, 13, 13, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// --- 3. Dynamic Product Modal Logic ---
function setupModal(cardId, modalId, closeBtnId) {
    const card = document.getElementById(cardId);
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeBtnId);

    if (card && modal && closeBtn) {
        card.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Activate all three Collection Modals
setupModal('womens-collection-card', 'womens-modal', 'close-womens-modal');
setupModal('smart-watch-card', 'smart-modal', 'close-smart-modal');
setupModal('mens-collection-card', 'mens-modal', 'close-mens-modal');


// --- 4. Sliding Cart Drawer Logic ---
const cartIcon = document.getElementById('cart-icon');
const cartDrawer = document.getElementById('cart-drawer');
const closeCartDrawer = document.getElementById('close-cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');

function openCart() {
    if(cartDrawer && cartOverlay) {
        cartDrawer.classList.add('open');
        cartOverlay.style.display = 'block';
        
        // Hide other modals so cart sits cleanly on top
        document.querySelectorAll('.modal, .glass-modal').forEach(m => m.style.display = 'none');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeCart() {
    if(cartDrawer && cartOverlay) {
        cartDrawer.classList.remove('open');
        cartOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
}

if (cartIcon && closeCartDrawer && cartOverlay) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault(); 
        openCart();
    });
    closeCartDrawer.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
}

// --- 5. Add to Cart Functionality ---
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.getElementById('cart-count');

let cart = [];

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); 

        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        const img = btn.getAttribute('data-img');

        if (name && !isNaN(price)) {
            cart.push({ name, price, img });
            updateCartUI();
            openCart(); 
        }
    });
});

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888; margin-top: 20px;">Your cart is currently empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                        <span class="cart-item-remove" onclick="removeFromCart(${index})">Remove</span>
                    </div>
                </div>
            `;
        });
    }

    if(cartTotalPrice) cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    if(cartCount) cartCount.innerHTML = `Cart (${cart.length})`;
}

window.removeFromCart = function(index) {
    cart.splice(index, 1); 
    updateCartUI(); 
}

// --- 6. Glassmorphism Login Modal Logic ---
const loginIcon = document.getElementById('login-icon');
const loginModal = document.getElementById('glass-login-modal');
const closeLoginModal = document.getElementById('close-login-modal');

if (loginIcon && loginModal && closeLoginModal) {
    loginIcon.addEventListener('click', (e) => {
        e.preventDefault(); 
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
    });

    closeLoginModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    });

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// --- 7. Animated Expanding Header Search Logic ---
const searchIcon = document.getElementById('search-icon');
const animatedSearchContainer = document.getElementById('animated-search-container');
const animatedSearchInput = document.getElementById('animated-search-input');
const searchText = document.getElementById('search-text');

if (searchIcon && animatedSearchContainer && animatedSearchInput) {
    searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle the 'active' class to start the CSS width animation
        animatedSearchContainer.classList.toggle('active');
        animatedSearchInput.classList.toggle('active');
        
        if (animatedSearchInput.classList.contains('active')) {
            // Hide the text "Search" to make room for the typing bar
            if(searchText) searchText.style.display = 'none';
            animatedSearchInput.focus();
        } else {
            // Wait for the animation to close before bringing the text back
            setTimeout(() => {
                if(searchText && window.innerWidth > 768) searchText.style.display = 'inline';
            }, 400); // 400ms matches the CSS transition time
        }
    });
}