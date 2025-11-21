// Add to script.js for real-time stock updates
async function updateStockDisplay() {
    try {
        const response = await fetch(`https://api.airtable.com/v0/${CONFIG.AIRTABLE.BASE_ID}/${CONFIG.AIRTABLE.PRODUCTS_TABLE}`, {
            headers: { 'Authorization': `Bearer ${CONFIG.AIRTABLE.API_KEY}` }
        });
        
        const data = await response.json();
        
        data.records.forEach(record => {
            const productId = record.fields['Product ID'];
            const newStock = record.fields['Current Stock'];
            
            // Update product in memory
            const product = products.find(p => p.id === productId);
            if (product) {
                product.stock = newStock;
                
                // Update UI
                const stockElement = document.querySelector(`[data-product-id="${productId}"] .stock`);
                if (stockElement) {
                    stockElement.textContent = `Stock: ${newStock}`;
                }
            }
        });
    } catch (error) {
        console.error('Stock update failed:', error);
    }
}

// Auto-refresh every 30 seconds
setInterval(updateStockDisplay, 30000);