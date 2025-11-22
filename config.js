// Configuration file for integrations
const CONFIG = {
    // Airtable Configuration
    AIRTABLE: {
        BASE_ID: 'appJCtiPQFAnDB09k',
        API_KEY: 'patU6popFbTUeRffY.5be688e9a4cdff9af1ff208cecafa3479f485d24e6971fa2b1dd6a970b31f192',
        PRODUCTS_TABLE: 'Products',
        STOCK_MOVEMENTS_TABLE: 'Stock Movements',
        ORDERS_TABLE: 'Orders',
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
        PRODUCT_CREATION_FORM_ID: '1UHWVRtRfqLKsOmfaAbtDBFxWl3DPHi1_iHcRiHTu7Rc',
        STOCK_MANAGEMENT_FORM_ID: '1E8GfVYXTA5bECAy8FLXHUa9QdnNXKKpMQ-4Nwo9R4wU'
    },
    
    // Google Sheets Configuration
    GOOGLE_SHEETS: {
        SPREADSHEET_ID: '1Zzi0zBYQLXlJ9MYbGYtY49nOKYndtb3cOgjXfV98xXA',
        STOCK_MOVEMENTS_SHEET: 'Stock_Movements',
        ORDERS_SHEET: 'Orders'
    },
    
    // Make.com Configuration
    MAKE_COM: {
        ORDER_WEBHOOK: 'https://hook.eu2.make.com/e8ylb499kfc2tmrpz75z7aqfnr5qeajj'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}