import { storageService } from '../services/storage/localStorage';

// Supported languages
export const SUPPORTED_LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  am: { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', dir: 'ltr' },
  om: { code: 'om', name: 'Afaan Oromo', nativeName: 'Afaan Oromoo', dir: 'ltr' },
  so: { code: 'so', name: 'Somali', nativeName: 'Soomaali', dir: 'ltr' }
};

// Default language
export const DEFAULT_LANGUAGE = 'en';

// Translation strings
export const TRANSLATIONS = {
  en: {
    // Common
    'common.app_name': 'Agar Agritech',
    'common.welcome': 'Welcome',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.actions': 'Actions',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.quantity': 'Quantity',
    'common.price': 'Price',
    'common.total': 'Total',
    'common.subtotal': 'Subtotal',
    'common.discount': 'Discount',
    'common.tax': 'Tax',
    'common.shipping': 'Shipping',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.how_it_works': 'How It Works',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.dashboard': 'Dashboard',
    'nav.products': 'Products',
    'nav.orders': 'Orders',
    'nav.deliveries': 'Deliveries',
    'nav.history': 'History',
    'nav.settings': 'Settings',
    'nav.profile': 'Profile',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.forgot_password': 'Forgot Password?',
    'auth.reset_password': 'Reset Password',
    'auth.remember_me': 'Remember me',
    'auth.no_account': "Don't have an account?",
    'auth.has_account': 'Already have an account?',
    'auth.login_success': 'Login successful!',
    'auth.logout_success': 'Logout successful!',
    'auth.invalid_credentials': 'Invalid email or password',
    
    // Roles
    'role.farmer': 'Farmer',
    'role.vendor': 'Vendor',
    'role.driver': 'Driver',
    'role.admin': 'Administrator',
    
    // Farmer specific
    'farmer.products': 'My Products',
    'farmer.add_product': 'Add Product',
    'farmer.edit_product': 'Edit Product',
    'farmer.product_name': 'Product Name',
    'farmer.product_type': 'Product Type',
    'farmer.product_description': 'Description',
    'farmer.availability': 'Availability',
    'farmer.available': 'Available',
    'farmer.unavailable': 'Unavailable',
    'farmer.incoming_orders': 'Incoming Orders',
    'farmer.accept_order': 'Accept Order',
    'farmer.decline_order': 'Decline Order',
    'farmer.mark_ready': 'Mark Ready for Pickup',
    'farmer.transactions': 'Transactions',
    'farmer.earnings': 'Earnings',
    
    // Vendor specific
    'vendor.marketplace': 'Marketplace',
    'vendor.browse_products': 'Browse Products',
    'vendor.shopping_cart': 'Shopping Cart',
    'vendor.checkout': 'Checkout',
    'vendor.delivery_tracking': 'Delivery Tracking',
    'vendor.order_history': 'Order History',
    'vendor.add_to_cart': 'Add to Cart',
    'vendor.proceed_to_checkout': 'Proceed to Checkout',
    'vendor.continue_shopping': 'Continue Shopping',
    'vendor.delivery_address': 'Delivery Address',
    'vendor.select_driver': 'Select Driver',
    'vendor.payment_method': 'Payment Method',
    
    // Driver specific
    'driver.assigned_deliveries': 'Assigned Deliveries',
    'driver.delivery_history': 'Delivery History',
    'driver.update_status': 'Update Status',
    'driver.current_location': 'Current Location',
    'driver.vehicle_info': 'Vehicle Information',
    'driver.earnings': 'Earnings',
    'driver.rating': 'Rating',
    'driver.go_online': 'Go Online',
    'driver.go_offline': 'Go Offline',
    
    // Order status
    'order.status.pending': 'Pending',
    'order.status.confirmed': 'Confirmed',
    'order.status.ready': 'Ready for Pickup',
    'order.status.picked_up': 'Picked Up',
    'order.status.in_transit': 'In Transit',
    'order.status.delivered': 'Delivered',
    'order.status.cancelled': 'Cancelled',
    'order.status.declined': 'Declined',
    
    // Payment
    'payment.pay': 'Pay',
    'payment.payment_success': 'Payment Successful',
    'payment.payment_failed': 'Payment Failed',
    'payment.amount': 'Amount',
    'payment.reference': 'Reference',
    'payment.transaction_id': 'Transaction ID',
    'payment.telebirr': 'TeleBirr',
    'payment.cash_on_delivery': 'Cash on Delivery',
    
    // Messages
    'message.order_placed': 'Order placed successfully!',
    'message.order_updated': 'Order updated successfully!',
    'message.product_added': 'Product added successfully!',
    'message.product_updated': 'Product updated successfully!',
    'message.product_deleted': 'Product deleted successfully!',
    'message.delivery_updated': 'Delivery status updated!',
    'message.profile_updated': 'Profile updated successfully!',
    
    // Errors
    'error.network': 'Network error. Please check your connection.',
    'error.unauthorized': 'Please login to continue.',
    'error.forbidden': 'You do not have permission.',
    'error.not_found': 'Resource not found.',
    'error.server_error': 'Server error. Please try again.',
    'error.validation': 'Please check your input.',
    
    // Form validation
    'validation.required': 'This field is required',
    'validation.email': 'Please enter a valid email',
    'validation.phone': 'Please enter a valid phone number',
    'validation.password_length': 'Password must be at least 6 characters',
    'validation.password_match': 'Passwords do not match',
    'validation.min_value': 'Value must be greater than {min}',
    'validation.max_value': 'Value must be less than {max}',
  },
  
  am: {
    // Common
    'common.app_name': 'አጋር አግሪቴክ',
    'common.welcome': 'እንኳን ደህና መጡ',
    'common.loading': 'በመጫን ላይ...',
    'common.error': 'ስህተት',
    'common.success': 'በተሳካ ሁኔታ',
    'common.save': 'አስቀምጥ',
    'common.cancel': 'ተወ',
    'common.delete': 'ሰርዝ',
    'common.edit': 'አርትዕ',
    'common.view': 'ተመልከት',
    'common.add': 'አክል',
    'common.search': 'ፈልግ',
    'common.filter': 'ማጣሪያ',
    'common.clear': 'አጽዳ',
    'common.actions': 'ድርጊቶች',
    'common.status': 'ሁኔታ',
    'common.date': 'ቀን',
    'common.time': 'ሰዓት',
    'common.quantity': 'ብዛት',
    'common.price': 'ዋጋ',
    'common.total': 'ጠቅላላ',
    'common.subtotal': 'ንዑስ ጠቅላላ',
    
    // Navigation
    'nav.home': 'መነሻ ገጽ',
    'nav.about': 'ስለ እኛ',
    'nav.how_it_works': 'እንዴት እንደሚሰራ',
    'nav.services': 'አገልግሎቶች',
    'nav.contact': 'አግኙን',
    'nav.login': 'ግባ',
    'nav.logout': 'ውጣ',
    'nav.dashboard': 'ዳሽቦርድ',
    
    // Add more Amharic translations as needed...
  },
  
  om: {
    // Common
    'common.app_name': 'Agar Agritech',
    'common.welcome': 'Baga Nagaan Dhuftan',
    'common.loading': 'Osoo Dhiyaatu...',
    'common.error': 'Dogoggora',
    'common.success': 'Milkaa\'inaan',
    'common.save': 'Qabsi',
    'common.cancel': 'Dhiisi',
    'common.delete': 'Haqu',
    'common.edit': 'Gulaali',
    'common.view': 'Ilaali',
    
    // Add more Afaan Oromo translations as needed...
  },
 
};

// Language context and utilities
class I18n {
  constructor() {
    this.currentLanguage = this.getStoredLanguage() || DEFAULT_LANGUAGE;
    this.listeners = new Set();
  }

  getStoredLanguage() {
    return storageService.getLanguage();
  }

  setStoredLanguage(language) {
    storageService.setLanguage(language);
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  setLanguage(language) {
    if (!SUPPORTED_LANGUAGES[language]) {
      console.warn(`Language "${language}" is not supported`);
      return;
    }

    this.currentLanguage = language;
    this.setStoredLanguage(language);
    this.notifyListeners();
    
    // Update document direction
    document.documentElement.dir = SUPPORTED_LANGUAGES[language].dir;
    document.documentElement.lang = language;
  }

  t(key, params = {}) {
    const translation = TRANSLATIONS[this.currentLanguage]?.[key] || 
                       TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || 
                       key;

    // Replace parameters in translation string
    return translation.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match;
    });
  }

  formatNumber(number, options = {}) {
    return new Intl.NumberFormat(this.currentLanguage, options).format(number);
  }

  formatCurrency(amount, currency = 'ETB') {
    return new Intl.NumberFormat(this.currentLanguage, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };

    return new Date(date).toLocaleDateString(this.currentLanguage, defaultOptions);
  }

  formatTime(date, options = {}) {
    const defaultOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...options
    };

    return new Date(date).toLocaleTimeString(this.currentLanguage, defaultOptions);
  }

  // Subscribe to language changes
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }

  // Get all supported languages
  getSupportedLanguages() {
    return Object.values(SUPPORTED_LANGUAGES);
  }

  // Check if language is RTL
  isRTL(language = this.currentLanguage) {
    return SUPPORTED_LANGUAGES[language]?.dir === 'rtl';
  }

  // Initialize i18n
  initialize() {
    const storedLanguage = this.getStoredLanguage();
    if (storedLanguage && SUPPORTED_LANGUAGES[storedLanguage]) {
      this.setLanguage(storedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (SUPPORTED_LANGUAGES[browserLang]) {
        this.setLanguage(browserLang);
      } else {
        this.setLanguage(DEFAULT_LANGUAGE);
      }
    }
  }
}

// Create singleton instance
export const i18n = new I18n();

// React hook for using translations
export const useTranslation = () => {
  const [currentLang, setCurrentLang] = React.useState(i18n.getCurrentLanguage());

  React.useEffect(() => {
    const unsubscribe = i18n.subscribe(setCurrentLang);
    return unsubscribe;
  }, []);

  const t = (key, params) => i18n.t(key, params);
  const setLanguage = (language) => i18n.setLanguage(language);

  return {
    t,
    currentLanguage: currentLang,
    setLanguage,
    supportedLanguages: i18n.getSupportedLanguages()
  };
};

// Higher-order component for class components
export const withTranslation = (Component) => {
  return function WithTranslationWrapper(props) {
    const translation = useTranslation();
    return <Component {...props} t={translation.t} currentLanguage={translation.currentLanguage} />;
  };
};

// Initialize on import
i18n.initialize();

export default i18n;