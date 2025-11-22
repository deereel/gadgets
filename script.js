// Configuration
const AIRTABLE_BASE_ID = 'YOUR_AIRTABLE_BASE_ID';
const AIRTABLE_API_KEY = 'YOUR_AIRTABLE_API_KEY';
const AIRTABLE_TABLE_NAME = 'Inventory';

// Cart functionality
let cart = [];
let products = [];

// DOM elements
const productsGrid = document.getElementById('products');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModal = document.querySelector('.close');
const cartButton = document.querySelector('.cart');
const loading = document.getElementById('loading');

// Real-time product updates
async function updateProducts() {
    try {
        const response = await fetch(`https://api.airtable.com/v0/${CONFIG.AIRTABLE.BASE_ID}/${CONFIG.AIRTABLE.PRODUCTS_TABLE}`, {
            headers: { 'Authorization': `Bearer ${CONFIG.AIRTABLE.API_KEY}` }
        });
        
        const data = await response.json();
        const newProducts = data.records.map(record => ({
            id: record.fields['Product ID'],
            name: record.fields['Product Name'],
            price: record.fields['Selling Price'],
            stock: record.fields['Current Stock'] || 0,
            category: record.fields['Category'],
            image: record.fields['Images']?.[0]?.url || 'https://via.placeholder.com/200x200?text=' + encodeURIComponent(record.fields['Product Name']),
            hoverImage: record.fields['Images']?.[1]?.url,
            description: record.fields['Description'] || ''
        }));
        
        // Check if products changed
        const productsChanged = JSON.stringify(products) !== JSON.stringify(newProducts);
        
        if (productsChanged) {
            products = newProducts;
            displayProducts(products);
            console.log('Products updated from Airtable');
        }
    } catch (error) {
        console.error('Real-time product update failed:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    
    // Start real-time updates after initial load
    setTimeout(() => {
        setInterval(updateProducts, 30000); // Every 30 seconds
        console.log('Real-time product updates started');
    }, 5000);
});

// Setup event listeners
function setupEventListeners() {
    cartButton.addEventListener('click', openCart);
    closeModal.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', checkout);
    
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCart();
    });
}

// Load products from JSON file
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (response.ok) {
            products = await response.json();
            displayProducts(products);
            loading.style.display = 'none';
        } else {
            throw new Error('Products file not found');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        loading.textContent = 'No products found. Run "npm run sync" to fetch from Airtable.';
    }
}


// Display products
function displayProducts(products) {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" 
                 ${product.hoverImage ? `onmouseover="this.src='${product.hoverImage}'" onmouseout="this.src='${product.image}'"` : ''}>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">₦${product.price.toLocaleString()}</div>
            <div class="stock">Stock: ${product.stock}</div>
            <button class="add-to-cart" onclick="addToCart('${product.id}')" 
                    ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        }
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>
                <button onclick="changeQuantity('${item.id}', -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity('${item.id}', 1)">+</button>
            </span>
            <span>₦${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = total.toLocaleString();
}

// Change quantity
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.id !== productId);
        } else if (item.quantity > product.stock) {
            item.quantity = product.stock;
        }
        
        updateCartUI();
    }
}

// Open cart modal
function openCart() {
    cartModal.style.display = 'block';
    updateCartUI();
}

// Close cart modal
function closeCart() {
    cartModal.style.display = 'none';
}

// Generate order ID
function generateOrderId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const time = String(date.getTime()).slice(-6);
    return `ORD-${year}${month}${day}-${time}`;
}

// Checkout process
async function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Get customer details
    const customerName = prompt('Enter your name:');
    const customerPhone = prompt('Enter your phone number:');
    
    if (!customerName || !customerPhone) {
        alert('Customer details are required!');
        return;
    }
    
    try {
        // Send all items in single order
        const orderData = {
            order_id: generateOrderId(),
            customer_name: customerName,
            customer_phone: customerPhone,
            items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                notes: `${item.name} - Qty: ${item.quantity}`
            }))
        };
        
        const response = await fetch(CONFIG.MAKE_COM.ORDER_WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // No JSON response expected from Make.com
        // Just check if webhook call was successful
        
        alert('Order placed successfully!');
        cart = [];
        updateCartUI();
        closeCart();
        
        // Refresh products to update stock
        setTimeout(() => loadProducts(), 2000);
        
        // Set up auto-refresh every 2 minutes
        if (!window.autoRefreshInterval) {
            window.autoRefreshInterval = setInterval(() => {
                loadProducts();
                console.log('Auto-refreshed products');
            }, 120000);
        }
        
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Error processing order. Please try again.');
    }
}