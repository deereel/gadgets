# Setup Guide - Gadgets E-commerce Integration

## Quick Setup Steps

### 1. Airtable Setup
1. Create a new Airtable base
2. Create a table named "Inventory" with fields:
   - Name (Single line text)
   - Price (Number)
   - Stock (Number)
   - Image (Attachment)
   - Description (Long text)
   - SKU (Single line text)
3. Get your Base ID and API key from Airtable
4. Update `config.js` with your credentials

### 2. Google Forms Setup
1. Create two Google Forms:
   - **Stock In Form** with fields: Product Name, Quantity Added, Date, Notes
   - **Stock Out Form** with fields: Product Name, Quantity Removed, Reason, Date
2. Get form IDs from the URLs
3. Update `config.js` and `admin.html` with form IDs

### 3. Google Sheets Setup
1. Create a Google Sheet with tabs:
   - Stock_Movements (for form responses)
   - Orders (for order tracking)
2. Connect your Google Forms to this sheet
3. Update `config.js` with spreadsheet ID

### 4. Make.com Automation Setup
1. Create scenarios for:
   - Order processing (webhook → update Airtable stock)
   - Stock synchronization (Google Sheets → Airtable)
2. Get webhook URLs from Make.com
3. Update `config.js` with webhook URLs

### 5. Configuration
Update all placeholder values in `config.js`:
```javascript
const CONFIG = {
    AIRTABLE: {
        BASE_ID: 'appXXXXXXXXXXXXXX',
        API_KEY: 'keyXXXXXXXXXXXXXX',
        // ... other settings
    }
    // ... other integrations
};
```

### 6. Launch
1. Open `index.html` in a web browser
2. Use `admin.html` for inventory management
3. Test all integrations from the admin panel

## Integration Flow
1. **Inventory** → Airtable stores all product data
2. **Stock Updates** → Google Forms capture stock changes
3. **Data Storage** → Google Sheets store form responses
4. **Automation** → Make.com syncs data between systems
5. **Orders** → Website sends orders to Make.com for processing

## Security Notes
- Keep API keys secure
- Use environment variables in production
- Implement proper authentication for admin panel
- Consider CORS settings for API calls