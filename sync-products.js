const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Load config
const CONFIG = {
    AIRTABLE: {
        BASE_ID: 'appJCtiPQFAnDB09k',
        API_KEY: 'patU6popFbTUeRffY.5be688e9a4cdff9af1ff208cecafa3479f485d24e6971fa2b1dd6a970b31f192',
        PRODUCTS_TABLE: 'Products',
        PRODUCT_FIELDS: {
            PRODUCT_ID: 'Product ID',
            NAME: 'Product Name',
            CATEGORY: 'Category',
            CURRENT_STOCK: 'Current Stock',
            SELLING_PRICE: 'Selling Price',
            DESCRIPTION: 'Description'
        }
    }
};

async function syncProducts() {
    try {
        console.log('Fetching products from Airtable...');
        
        const response = await fetch(`https://api.airtable.com/v0/${CONFIG.AIRTABLE.BASE_ID}/${CONFIG.AIRTABLE.PRODUCTS_TABLE}`, {
            headers: {
                'Authorization': `Bearer ${CONFIG.AIRTABLE.API_KEY}`
            }
        });
        
        const data = await response.json();
        
        const products = data.records.map(record => ({
            id: record.fields[CONFIG.AIRTABLE.PRODUCT_FIELDS.PRODUCT_ID],
            name: record.fields[CONFIG.AIRTABLE.PRODUCT_FIELDS.NAME],
            price: record.fields[CONFIG.AIRTABLE.PRODUCT_FIELDS.SELLING_PRICE],
            stock: record.fields[CONFIG.AIRTABLE.PRODUCT_FIELDS.CURRENT_STOCK] || 0,
            category: record.fields[CONFIG.AIRTABLE.PRODUCT_FIELDS.CATEGORY],
            image: record.fields['Images']?.[0]?.url || 'https://via.placeholder.com/200x200?text=' + encodeURIComponent(record.fields[CONFIG.AIRTABLE.PRODUCT_FIELDS.NAME]),
            hoverImage: record.fields['Images']?.[1]?.url,
            description: record.fields[CONFIG.AIRTABLE.PRODUCT_FIELDS.DESCRIPTION] || ''
        }));
        
        // Write products to JSON file
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
        
        console.log(`✅ Synced ${products.length} products from Airtable`);
        console.log('Products saved to products.json');
        
        // Debug: Show first product's raw data
        if (data.records.length > 0) {
            console.log('First product fields:', Object.keys(data.records[0].fields));
            console.log('Image field data:', data.records[0].fields.Image || data.records[0].fields['Image']);
        }
        
    } catch (error) {
        console.error('❌ Error syncing products:', error.message);
    }
}

syncProducts();