# 🎯 GitHub Copilot Cheat Sheet for This Project

Quick reference for AI-assisted development in the Agri-Tech Platform.

---

## 🏃 Quick Start Prompts

### Django Backend

```python
# 1. CREATE A NEW MODEL
# Type this comment and let Copilot complete:
# Create a Review model with:
# - rating (1-5 stars)
# - comment text
# - reviewer (foreign key to User)
# - reviewed_item (generic foreign key)
# - created_at timestamp

# 2. CREATE API ENDPOINT
# In views.py, type:
# Create a viewset for managing farmer reviews with:
# - List all reviews for a farmer
# - Create review (authenticated users only)
# - Average rating calculation
# - Filter by rating range

# 3. SERIALIZER PATTERN
# In serializers.py, type:
class ReviewSerializer
    # Include all fields
    # Add read-only average_rating
    # Validate rating is between 1-5
```

### React Frontend

```javascript
// 1. CREATE A COMPONENT
// Type this comment and Copilot completes:
/**
 * ProductFilterSidebar
 * Filters: category, price range, location, rating
 * Props: onFilterChange, initialFilters
 * State: selected filters
 * Effects: apply filters on change
 */

// 2. API HOOK
// Type:
const useFetchProducts = (filters) => {
  // Fetch products from API with filters
  // Handle loading, error states
  // Debounce filter changes
  // Return { products, loading, error, refetch }
}

// 3. FORM HANDLING
const ProductForm = () => {
  // Form state for: name, description, price, category, image
  // Validation: required fields, price > 0, image format
  // Submit: POST to /api/products/ with FormData
  // Handle success/error with toast notifications
}
```

---

## 💡 Common Patterns

### 1. CRUD Operations Template

```python
# Backend: Type the class name, Copilot fills the rest
class ProductViewSet(viewsets.ModelViewSet):
    """Complete CRUD for products"""
    # Copilot adds: queryset, serializer, permissions, filters
```

```javascript
// Frontend: Type the service structure
export const productService = {
  getAll: (params) => // Copilot completes
  getById: (id) =>
  create: (data) =>
  update: (id, data) =>
  delete: (id) =>
}
```

### 2. Authentication Pattern

```python
# Backend views.py
# Create login endpoint that:
# - Validates credentials
# - Returns JWT tokens
# - Sets refresh token in httpOnly cookie
# - Returns user data
```

```javascript
// Frontend AuthContext.jsx
// Create auth context with:
// - login, logout, register functions
// - Current user state
// - Token management
// - Protected route wrapper
```

### 3. Real-time Updates

```javascript
// Type:
const useWebSocket = (url, onMessage) => {
  // WebSocket connection with reconnect logic
  // Handle connection, message, error, close events
  // Auto-reconnect with exponential backoff
  // Cleanup on unmount
}
```

---

## 🎨 UI Component Patterns

### Card Component

```javascript
// Type: "Create a responsive card component for products"
const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  // Copilot generates:
  // - Image with fallback
  // - Title and description
  // - Price formatting
  // - Action buttons
  // - Responsive grid layout
}
```

### Modal Pattern

```javascript
// Type: "Create a reusable modal component"
const Modal = ({ isOpen, onClose, title, children, footer }) => {
  // Copilot generates:
  // - Backdrop with click-to-close
  // - ESC key handling
  // - Body scroll lock
  // - Animation transitions
  // - Accessible (focus trap)
}
```

### Form Input Pattern

```javascript
// Type: "Create a form input with validation"
const FormInput = ({ label, name, type, value, onChange, error, ...props }) => {
  // Copilot generates:
  // - Label with htmlFor
  // - Input with all props
  // - Error message display
  // - Proper styling classes
}
```

---

## 🔐 Security Patterns

```python
# Type: "Add rate limiting to API endpoint"
from rest_framework.throttling import AnonRateThrottle

# Copilot suggests throttle classes and settings

# Type: "Add permission check for owner only"
from rest_framework.permissions import BasePermission

# Copilot creates IsOwnerOrReadOnly permission
```

```javascript
// Type: "Sanitize user input to prevent XSS"
import DOMPurify from 'dompurify'

// Copilot suggests sanitization function
```

---

## 🧪 Testing Patterns

### Backend Tests

```python
# Type: "Create test for product creation API"
class ProductAPITestCase(TestCase):
    def setUp(self):
        # Copilot creates test data
    
    def test_create_product_as_authenticated_farmer(self):
        # Copilot generates:
        # - Authentication
        # - POST request
        # - Assertions
    
    def test_unauthenticated_user_cannot_create_product(self):
        # Copilot generates permission test
```

### Frontend Tests

```javascript
// Type: "Test ProductCard component"
import { render, screen, fireEvent } from '@testing-library/react'

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    // Copilot generates:
    // - Mock data
    // - Render component
    // - Assertions
  })
  
  it('calls onAddToCart when button clicked', () => {
    // Copilot generates click test
  })
})
```

---

## 📊 Common Queries

### Get Copilot to Generate SQL Migrations

```python
# In models.py, after changing a model:
# Type: "python manage.py makemigrations"
# Then: "python manage.py migrate"
# Copilot can suggest migration commands
```

### API Documentation

```python
# Type: "Add OpenAPI documentation"
from drf_spectacular.utils import extend_schema

# Copilot suggests decorators and parameters
```

---

## 🚀 Performance Optimization

```python
# Type: "Add database query optimization"
from django.db.models import Prefetch, select_related

# Copilot suggests:
# - select_related for FK
# - prefetch_related for M2M
# - Query annotation and aggregation
```

```javascript
// Type: "Implement infinite scroll"
const useInfiniteScroll = (fetchMore, hasMore) => {
  // Copilot generates:
  // - Intersection Observer
  // - Load more trigger
  // - Loading states
}

// Type: "Add image lazy loading"
const LazyImage = ({ src, alt, placeholder }) => {
  // Copilot generates lazy loading logic
}
```

---

## 🎯 Context-Aware Tips

### 1. Keep Related Files Open
- `models.py` + `serializers.py` = Copilot suggests matching serializers
- `views.py` + `urls.py` = Copilot suggests URL patterns
- Component + Test file = Copilot suggests test cases

### 2. Use Descriptive Variable Names
```javascript
// ❌ Bad: const d = new Date()
// ✅ Good: const orderCreatedAt = new Date()
// Copilot better understands context with good names
```

### 3. Write Intent Comments First
```python
# ✅ Write this first:
# Calculate total order price including:
# - Base product prices
# - 15% VAT
# - Delivery fee based on distance
# - Apply discount code if valid

# Then let Copilot implement it
def calculate_order_total(order):
    # Copilot fills in the logic
```

---

## 🎨 Styling Shortcuts

```javascript
// Type: "Add responsive navbar with mobile menu"
// Copilot generates Bootstrap/Tailwind classes

// Type: "Create a loading spinner component"
// Copilot suggests CSS animations

// Type: "Add dark mode toggle"
// Copilot creates theme switching logic
```

---

## 🐛 Debugging with Copilot

```python
# Type: "Add debug logging for order processing"
import logging
logger = logging.getLogger(__name__)

# Copilot suggests strategic log points
```

```javascript
// Type: "Add error boundary for React component"
// Copilot generates ErrorBoundary class
```

---

## 📝 Documentation Generation

```python
# Type triple quotes and Copilot generates docstrings:
def process_payment(order_id, payment_method):
    """
    # Copilot completes with:
    # - Function description
    # - Parameters
    # - Returns
    # - Raises
    # - Example usage
    """
```

---

## 🔄 Refactoring Patterns

```javascript
// Select repeated code and type:
// "Extract this into a reusable function"
// Copilot suggests the refactored version

// Type: "Convert this class component to functional with hooks"
// Copilot does the conversion
```

---

## 🎯 Project-Specific Shortcuts

### For This Agri-Tech Platform:

```javascript
// Marketplace feature
// Type: "Product search with filters for agricultural marketplace"
// Copilot knows the domain

// Order tracking
// Type: "Real-time order tracking component for delivery"
// Copilot suggests appropriate UI

// Rating system
// Type: "Star rating component for farmer reviews"
// Copilot generates interactive rating
```

---

## ⚡ Speed Hacks

1. **Multi-cursor editing** + Copilot = Batch similar changes
2. **Tab to accept** = Instant code
3. **Alt + ]** = Next suggestion
4. **Alt + [** = Previous suggestion
5. **Ctrl + Enter** = Open Copilot panel for more suggestions

---

## 🎓 Learning as You Go

When unsure, type questions as comments:

```javascript
// How do I make this component accessible?
// Copilot shows ARIA attributes

// What's the best way to handle form validation?
// Copilot demonstrates validation patterns

// How to prevent SQL injection in this query?
// Copilot shows parameterized queries
```

---

## 🌟 Golden Rules

1. ✅ **Be specific** in comments and names
2. ✅ **Review suggestions** - Copilot makes mistakes
3. ✅ **Iterate** - Accept, test, refine
4. ✅ **Stay consistent** - Use established patterns
5. ✅ **Trust but verify** - Always test AI-generated code

---

## 📖 Related Guides

- [Full AI Development Guide](./AI_RAPID_DEVELOPMENT_GUIDE.md)
- [System Logic Flow](./Readlogicflow.md)
- [Main README](./README.md)

---

**Pro Tip:** The more context Copilot has (open files, clear intent, good names), the better its suggestions! 🚀
