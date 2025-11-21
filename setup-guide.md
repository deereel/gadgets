# Setup Guide - Gadgets E-commerce Integration

## Complete Workflow Integration

### 1. Airtable Setup
Create a new Airtable base with three tables:

**TABLE 1: Products**
- Product Name (Single line text)
- Category (Single select: Smartphones, Headphones, Watches, etc.)
- Cost Price (Number, optional)
- Selling Price (Number)
- Low Stock Threshold (Number)
- Current Stock (Number, default = 0)
- Product ID (Formula: `UPPER(LEFT({Category}, 3)) & "-" & LEFT(RECORD_ID(), 6)`)
- Description (Long text, optional)

**TABLE 2: Stock Movements**
- Product (Linked record → Products)
- Movement Type (Single select: Stock In, Stock Out)
- Quantity (Number)
- Description (Long text)
- Date (Created time, auto)

**TABLE 3: Orders** (Optional but recommended)
- Order ID (Single line text)
- Product (Linked record → Products)
- Quantity (Number)
- Total Price (Number)
- Customer Name (Single line text)
- Customer Phone (Single line text)
- Notes (Long text)
- Order Date (Created time)

Get your Base ID and API key from Airtable and update `config.js`

### 2. Google Forms Setup
1. Create one Google Form with fields:
   - **Product Name** (Short answer)
   - **Movement Type** (Dropdown: "Stock In", "Stock Out")
   - **Quantity** (Number)
   - **Notes / Description** (Long answer, optional)
2. Get form ID from the URL
3. Update `config.js` and `admin.html` with form ID

### 3. Google Sheets Setup
1. Create a Google Sheet with tabs:
   - Stock_Movements (for form responses)
   - Orders (for order tracking)
2. Connect your Google Forms to this sheet
3. Update `config.js` with spreadsheet ID

### 4. Make.com Automation Setup
Create three scenarios:

**SCENARIO 1: Product Creation**
- Trigger: Google Sheets → Watch New Rows (Products_Form tab)
- Action: Airtable → Create Record in Products table
- Maps: Product Name, Category, Cost Price, Selling Price, Low Stock Threshold, Description

**SCENARIO 2: Stock Movement Processing**
- Trigger: Google Sheets → Watch New Rows (Stock_Movements tab)
- Search: Find product by Product ID
- Router: Stock In/Out logic with negative stock prevention
- Update: Product Current Stock
- Log: Create Stock Movement record

**SCENARIO 3: Order Processing (NEW)**
- Trigger: Custom Webhook (for website orders)
- Search: Find product by Product ID
- Filter: Check stock availability
- Update: Reduce Current Stock
- Log: Create Stock Movement ("Stock Out")
- Create: Order record
- Response: Return success/failure to website

Get webhook URLs and update `config.js`

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