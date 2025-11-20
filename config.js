// Configuration file for integrations
const CONFIG = {
    // Airtable Configuration
    AIRTABLE: {
        BASE_ID: 'YOUR_AIRTABLE_BASE_ID',
        API_KEY: 'YOUR_AIRTABLE_API_KEY',
        TABLE_NAME: 'Inventory',
        FIELDS: {
            NAME: 'Name',
            PRICE: 'Price',
            STOCK: 'Stock',
            IMAGE: 'Image',
            DESCRIPTION: 'Description',
            SKU: 'SKU'
        }
    },
    
    // Google Forms Configuration
    GOOGLE_FORMS: {
        STOCK_IN_FORM_ID: 'YOUR_STOCK_IN_FORM_ID',
        STOCK_OUT_FORM_ID: 'YOUR_STOCK_OUT_FORM_ID'
    },
    
    // Google Sheets Configuration
    GOOGLE_SHEETS: {
        SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',
        STOCK_MOVEMENTS_SHEET: 'Stock_Movements',
        ORDERS_SHEET: 'Orders'
    },
    
    // Make.com Configuration
    MAKE_COM: {
        ORDER_WEBHOOK: 'YOUR_MAKE_COM_ORDER_WEBHOOK_URL',
        STOCK_UPDATE_WEBHOOK: 'YOUR_MAKE_COM_STOCK_WEBHOOK_URL'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}