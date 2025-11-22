# Gadgets E-commerce Store

Complete e-commerce website with automated inventory management using Airtable, Google Forms, and Make.com.

## Features

- **Real-time inventory** - Stock updates every 30 seconds from Airtable
- **Automated order processing** - Orders automatically update inventory and create records
- **Multi-image support** - Product images with hover effects
- **Shopping cart** - Full cart functionality with quantity management
- **Stock management** - Google Forms integration for manual stock adjustments
- **Order tracking** - Complete audit trail in Airtable

## Quick Start

```bash
# Install dependencies
npm install

# Sync products from Airtable
npm run sync

# Start local server
npm run serve
```

Open `http://localhost:3000` in your browser.

## Configuration

1. Update `config.js` with your credentials:
   - Airtable Base ID and API Key
   - Make.com webhook URL
   - Google Forms/Sheets IDs

2. Set up Make.com webhook following `make-webhook-guide.md`

## Airtable Structure

**Products Table:**
- Product ID (Formula)
- Product Name
- Category
- Current Stock
- Selling Price
- Images (Attachment - 2 images per product)

**Stock Movements Table:**
- Product (Linked)
- Movement Type (Stock In/Out)
- Quantity
- Description
- Date

**Orders Table:**
- Order ID
- Product (Linked)
- Quantity
- Total Price
- Customer Name
- Customer Phone

## Workflow

1. **Products** → Synced from Airtable to website
2. **Orders** → Website → Make.com → Airtable (stock reduction + order logging)
3. **Stock Updates** → Google Forms → Make.com → Airtable
4. **Real-time Updates** → Website checks Airtable every 30 seconds

## Commands

- `npm run sync` - Pull products from Airtable
- `npm run serve` - Start web server
- `npm run auto-sync` - Auto-sync every 5 minutes

## Files

- `index.html` - Main storefront
- `admin.html` - Admin panel with Google Forms
- `script.js` - Frontend functionality with real-time updates
- `sync-products.js` - Airtable sync script
- `config.js` - Configuration settings
- `setup-guide.md` - Complete setup instructions
- `make-webhook-guide.md` - Make.com webhook configuration
