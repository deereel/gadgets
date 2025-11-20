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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
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

// Load products from Airtable
async function loadProducts() {
    try {
        // Mock data for demo - replace with actual Airtable API call
        const mockProducts = [
            {
                id: '1',
                name: 'Smartphone Pro',
                price: 699,
                stock: 15,
                image: 'https://via.placeholder.com/200x200?text=Smartphone',
                description: 'Latest smartphone with advanced features'
            },
            {
                id: '2',
                name: 'Wireless Headphones',
                price: 199,
                stock: 8,
                image: 'https://via.placeholder.com/200x200?text=Headphones',
                description: 'Premium wireless headphones'
            },
            {
                id: '3',
                name: 'Smart Watch',
                price: 299,
                stock: 12,
                image: 'https://via.placeholder.com/200x200?text=Watch',
                description: 'Fitness tracking smart watch'
            }
        ];
        
        products = mockProducts;
        displayProducts(products);
        loading.style.display = 'none';
        
        // Uncomment below for actual Airtable integration
        /*
        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`
            }
        });
        
        const data = await response.json();
        products = data.records.map(record => ({
            id: record.id,
            name: record.fields.Name,
            price: record.fields.Price,
            stock: record.fields.Stock,
            image: record.fields.Image?.[0]?.url || 'https://via.placeholder.com/200x200',
            description: record.fields.Description
        }));
        
        displayProducts(products);
        loading.style.display = 'none';
        */
    } catch (error) {
        console.error('Error loading products:', error);
        loading.textContent = 'Error loading products';
    }
}

// Display products
function displayProducts(products) {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price}</div>
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
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = total.toFixed(2);
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

// Checkout process
async function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    try {
        // Send order to Make.com webhook for processing
        const orderData = {
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            timestamp: new Date().toISOString()
        };
        
        // Replace with your Make.com webhook URL
        const webhookUrl = 'YOUR_MAKE_COM_WEBHOOK_URL';
        
        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        alert('Order placed successfully!');
        cart = [];
        updateCartUI();
        closeCart();
        
        // Refresh products to update stock
        loadProducts();
        
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Error processing order. Please try again.');
    }
}