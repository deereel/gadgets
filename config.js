// Configuration file for integrations
const CONFIG = {
    // Airtable Configuration
    AIRTABLE: {
        BASE_ID: 'YOUR_AIRTABLE_BASE_ID',
        API_KEY: 'YOUR_AIRTABLE_API_KEY',
        PRODUCTS_TABLE: 'Products',
        STOCK_MOVEMENTS_TABLE: 'Stock Movements',
        PRODUCT_FIELDS: {
            PRODUCT_ID: 'Product ID',
            NAME: 'Name',
            CATEGORY: 'Category',
            CURRENT_STOCK: 'Current Stock',
            COST_PRICE: 'Cost Price',
            SELLING_PRICE: 'Selling Price',
            LOW_STOCK_THRESHOLD: 'Low Stock Threshold',
            LAST_UPDATED: 'Last Updated',
            NOTES: 'Notes'
        },
        MOVEMENT_FIELDS: {
            PRODUCT: 'Product',
            MOVEMENT_TYPE: 'Movement Type',
            QUANTITY: 'Quantity',
            DATE: 'Date',
            DESCRIPTION: 'Description'
        }
    },
    
    // Google Forms Configuration
    GOOGLE_FORMS: {
        STOCK_MANAGEMENT_FORM_ID: 'YOUR_STOCK_MANAGEMENT_FORM_ID'
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