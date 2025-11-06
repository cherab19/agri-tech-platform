NB:all mocked data should be removed

🌾 logical flow (from Public UI Perspective) of the system                                                                                        🧍‍♂️ Vendor’s UI Flow (Buyer Cooperative)
Step 1: Browse Marketplace

Page: Marketplace / Products

Vendor sees all products listed by verified farmers.

Filters: crop type, quality, location, price range.

Clicks on a product → opens Product Details Page.

🖼️ UI Elements:

Product cards with image, name, price/kg, seller info, rating.

"View Details" button

Step 2: View Product Details

Shows full info:

Farmer cooperative name & location

Product details (price, available stock, grade, packaging, harvest date)

Ratings, reviews

"Order Now" button

🖼️ UI Elements:

Quantity input box

Delivery location selector

"Estimated delivery fee: calculated automatically"

🔐 AUTHENTICATION GATE (Critical Security Step)
Step 2.5: Authentication Redirect

Action: Vendor clicks "Order Now" button on Product Details Page

System Logic:

Checks if user is authenticated

If NOT authenticated: Redirects to Login Page

If authenticated: Proceeds directly to Step 3 (Place Order)

🖼️ UI Elements on Login Page:

"Please login to place your order"

Cooperative ID/Email field

Password field

"Login" button

"Forgot Password?" link

Data Persistence: System temporarily saves the product, quantity, and delivery preferences to restore after login

Login Success Logic:

text
User submits credentials → System verifies against cooperative database → 
If successful: Redirects to Step 3 (Place Order page) with saved product data pre-filled →
If failed: Shows "Invalid credentials. Please try again."
Step 3: Place Order (Post-Authentication)

Page: Order Summary / Place Order

Vendor sees pre-filled information from Step 2:

Selected product and quantity

Delivery location

Vendor can modify: Quantity, Delivery address, Delivery date

The system calculates total cost:

Total = (Price × Quantity) + Estimated Delivery Fee

🖼️ UI Elements:

"Confirm Order" button

Summary box showing total cost, farmer info, delivery estimate

"Welcome back, [Cooperative Name]!" confirmation message

When clicked → backend creates order (status = Pending Payment). Redirects vendor to Payment Page.

Step 4: Payment Page

Vendor sees secure payment form.

Options: Telebirr / Chapa / Bank / Card / Wallet Balance

After successful payment:

Order status → "Payment Held in Escrow"

Redirects to Order Details Page

🖼️ UI Elements:

Payment methods section

Spinner/loading state

"Payment Successful – Driver will be assigned soon" message

Step 5: Order Tracking Page

Once payment confirmed:

UI shows "Awaiting Driver Assignment"

A progress bar: Pending Payment → Driver Assigned → Picked Up → In Transit → Delivered

Auto-refreshes when a driver is assigned.

🖼️ UI Elements:

Live status timeline

"Driver Assigned" card with driver name, phone, truck type, ETA

Button: "View Driver on Map"

Step 6: Delivery Tracking

Map view showing truck's live GPS movement.

"In Transit" status highlighted.

Estimated arrival countdown.

🖼️ UI Elements:

Map (Google Maps / OpenStreetMap)

Status badges: 🟢 In Transit, 🔴 Delayed, ⚪ Delivered

Step 7: Delivery Confirmation

When the driver marks "Delivered":

Vendor sees "Goods Delivered" notification.

Vendor inspects goods and clicks:

✅ "Confirm Delivery" (if all good)

⚠️ "Raise Issue" (if there's a problem)

🖼️ UI Elements:

Delivery confirmation modal

Rating stars for farmer & driver

Step 8: Payment Released & Rating

If vendor confirms:

Platform releases payment from escrow to farmer & driver.

Order status → "Completed"

Vendor prompted to rate both:

🌾 Farmer (product quality)

🚚 Driver (delivery service)

🖼️ UI Elements:

"Thank you" message

Rating form

Invoice / Receipt download button

Step 9: Order History Page

Vendor can view all past orders:

Status, date, total, rating, delivery history.

Filters: Completed / Pending / Disputed.

🖼️ UI Elements:

Order table

Status badge colors (green = completed, yellow = in transit, red = dispute)                                                 👩‍🌾 Farmer’s UI Flow (Seller Cooperative)
1. Product Listing Page

Farmers add new products (with images, price, quantity).

See all their active listings and inventory.

2. New Order Notification

Farmer gets notification:

“Vendor X ordered 100 quintals of maize. Awaiting payment.”

3. Payment Confirmation

When vendor pays → status = “Payment Held in Escrow”.

Farmer sees:

“Payment confirmed – waiting for driver assignment.”

4. Driver Assigned

Farmer sees driver details (name, phone, truck plate).

Prepares goods for pickup.

5. Pickup Confirmation

When driver arrives:

Farmer confirms pickup with “Confirm Pickup” button 



Order → “In Transit”.

6. Completion

After vendor confirms delivery →

Farmer receives “Payment Released” message.

Can check transaction receipt. 

🚚 Driver’s UI Flow
1. Available Deliveries Page

Driver sees nearby open jobs (based on location & capacity).

Each shows:

Pickup & drop-off locations

Cargo type

Distance & pay

2. Accept Delivery Job

Driver taps “Accept” → becomes assigned.

Sees full route map + contact info.

3. Pickup Confirmation

When arriving at farmer’s location:

Click “Picked Up”



4. Delivery

On arrival, click “Delivered”.



5. Payment

After vendor confirmation:

System releases delivery fee to driver . 

🧑‍💼 Admin Dashboard (Management UI)

Monitor all orders (status timeline).

Approve disputes or refunds.

Track escrow balance and commissions.

See live analytics:

Active drivers

Top-selling products                                                                                                                                      
