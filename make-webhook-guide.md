# Make.com Order Webhook Setup Guide

## Order Processing Webhook Configuration

### Step 1: Create Order Processing Scenario

1. **Add Webhook Trigger**
   - Module: Custom Webhook
   - Name: `website-order`
   - Copy the generated webhook URL to `config.js`

### Step 2: Search Product in Airtable

2. **Add Airtable Search**
   - Module: Airtable → Search Records
   - Table: Products
   - Formula: `{Product ID} = "{{1.product_id}}"`
   - Returns: Record ID, Current Stock, Product info

### Step 3: Stock Availability Check

3. **Add Filter**
   - Condition: `Current Stock >= Quantity`
   - If false: Return error response

### Step 4: Update Product Stock

4. **Add Airtable Update**
   - Module: Airtable → Update Record
   - Record ID: `{{2.records[1].id}}`
   - Current Stock: `{{2.records[1].fields.Current Stock}} - {{1.quantity}}`

### Step 5: Log Stock Movement

5. **Add Stock Movement Log**
   - Module: Airtable → Create Record
   - Table: Stock Movements
   - Fields:
     - Product: `{{2.records[1].id}}`
     - Movement Type: "Stock Out"
     - Quantity: `{{1.quantity}}`
     - Description: `"Order Placement - {{1.customer_name}}"`

### Step 6: Create Order Record

6. **Add Order Creation**
   - Module: Airtable → Create Record
   - Table: Orders
   - Fields:
     - Order ID: `{{1.order_id}}`
     - Product: `{{2.records[1].id}}`
     - Quantity: `{{2.quantity}}`
     - Total Price: `{{2.quantity}} * {{3.records[1].fields.Selling Price}}`
     - Customer Name: `{{1.customer_name}}`
     - Customer Phone: `{{1.customer_phone}}`
     - Notes: `{{2.notes}}`

### Step 7: Return Response (Optional)

7. **Skip webhook response for now**
   - Make.com will automatically return a 200 OK status
   - Your website will show success if no HTTP error occurs
   - You can add custom responses later if needed

## Expected Webhook Data Format

Your website sends this JSON to the webhook:

```json
{
  "order_id": "ORD-20241201-123456",
  "customer_name": "John Doe",
  "customer_phone": "08012345678",
  "items": [
    {
      "product_id": "GAD-recEis",
      "quantity": 2,
      "notes": "Samsung Galaxy A20 - Qty: 2"
    },
    {
      "product_id": "GAD-recKqW",
      "quantity": 1,
      "notes": "Oraimo Smart Clipper - Qty: 1"
    }
  ]
}
```

## Testing the Webhook

1. Use the webhook URL in your browser or Postman
2. Send a POST request with the JSON above
3. Check Airtable for updated stock and new records
4. Verify the response format