import { VALIDATION } from './constants';

// Email validation
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }

  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  return { isValid: true, message: '' };
};

// Phone number validation (Ethiopian format)
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, message: 'Phone number is required' };
  }

  // Accept +251 or 0 followed by 9 digits
  if (!VALIDATION.PHONE_REGEX.test(phone)) {
    return { isValid: false, message: 'Please enter a valid Ethiopian phone number' };
  }

  return { isValid: true, message: '' };
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return { 
      isValid: false, 
      message: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long` 
    };
  }

  // Check for at least one number and one letter
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one letter and one number'
    };
  }

  return { isValid: true, message: '' };
};

// Name validation
export const validateName = (name, fieldName = 'Name') => {
  if (!name) {
    return { isValid: false, message: `${fieldName} is required` };
  }

  if (name.length < VALIDATION.NAME_MIN_LENGTH) {
    return {
      isValid: false,
      message: `${fieldName} must be at least ${VALIDATION.NAME_MIN_LENGTH} characters long`
    };
  }

  if (name.length > VALIDATION.NAME_MAX_LENGTH) {
    return {
      isValid: false,
      message: `${fieldName} must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`
    };
  }

  // Only allow letters, spaces, and basic punctuation
  if (!/^[a-zA-Z\s\-'.]+$/.test(name)) {
    return {
      isValid: false,
      message: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`
    };
  }

  return { isValid: true, message: '' };
};

// Required field validation
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, message: `${fieldName} is required` };
  }

  return { isValid: true, message: '' };
};

// Number validation
export const validateNumber = (value, fieldName, options = {}) => {
  const { min, max, required = true } = options;

  if (required && (value === null || value === undefined || value === '')) {
    return { isValid: false, message: `${fieldName} is required` };
  }

  if (!required && (value === null || value === undefined || value === '')) {
    return { isValid: true, message: '' };
  }

  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return { isValid: false, message: `${fieldName} must be a valid number` };
  }

  if (min !== undefined && numValue < min) {
    return { isValid: false, message: `${fieldName} must be at least ${min}` };
  }

  if (max !== undefined && numValue > max) {
    return { isValid: false, message: `${fieldName} must be at most ${max}` };
  }

  return { isValid: true, message: '' };
};

// Price validation
export const validatePrice = (price) => {
  const numberValidation = validateNumber(price, 'Price', { min: 0 });
  if (!numberValidation.isValid) {
    return numberValidation;
  }

  const numPrice = parseFloat(price);
  if (numPrice <= 0) {
    return { isValid: false, message: 'Price must be greater than 0' };
  }

  return { isValid: true, message: '' };
};

// Quantity validation
export const validateQuantity = (quantity) => {
  const numberValidation = validateNumber(quantity, 'Quantity', { min: 0.01 });
  if (!numberValidation.isValid) {
    return numberValidation;
  }

  const numQuantity = parseFloat(quantity);
  if (numQuantity <= 0) {
    return { isValid: false, message: 'Quantity must be greater than 0' };
  }

  return { isValid: true, message: '' };
};

// Product validation
export const validateProduct = (productData) => {
  const errors = {};

  // Validate name
  const nameValidation = validateName(productData.name, 'Product name');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }

  // Validate type
  const typeValidation = validateRequired(productData.type, 'Product type');
  if (!typeValidation.isValid) {
    errors.type = typeValidation.message;
  }

  // Validate price
  const priceValidation = validatePrice(productData.price);
  if (!priceValidation.isValid) {
    errors.price = priceValidation.message;
  }

  // Validate quantity
  const quantityValidation = validateQuantity(productData.quantity);
  if (!quantityValidation.isValid) {
    errors.quantity = quantityValidation.message;
  }

  // Validate unit
  const unitValidation = validateRequired(productData.unit, 'Unit');
  if (!unitValidation.isValid) {
    errors.unit = unitValidation.message;
  }

  return errors;
};

// Order validation
export const validateOrder = (orderData) => {
  const errors = {};

  // Validate delivery address
  const addressValidation = validateRequired(orderData.delivery_address, 'Delivery address');
  if (!addressValidation.isValid) {
    errors.delivery_address = addressValidation.message;
  }

  // Validate items
  if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
    errors.items = 'At least one item is required';
  }

  // Validate driver selection
  const driverValidation = validateRequired(orderData.driver_id, 'Delivery driver');
  if (!driverValidation.isValid) {
    errors.driver_id = driverValidation.message;
  }

  return errors;
};

// Address validation
export const validateAddress = (address) => {
  const errors = {};

  const streetValidation = validateRequired(address.street, 'Street address');
  if (!streetValidation.isValid) {
    errors.street = streetValidation.message;
  }

  const cityValidation = validateRequired(address.city, 'City');
  if (!cityValidation.isValid) {
    errors.city = cityValidation.message;
  }

  const regionValidation = validateRequired(address.region, 'Region');
  if (!regionValidation.isValid) {
    errors.region = regionValidation.message;
  }

  return errors;
};

// File validation
export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  } = options;

  const errors = [];

  if (!file) {
    return { isValid: false, errors: ['File is required'] };
  }

  if (file.size > maxSize) {
    errors.push(`File size must be less than ${maxSize / 1024 / 1024}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }

  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    errors.push(`File extension must be one of: ${allowedExtensions.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};

  Object.keys(validationRules).forEach(field => {
    const value = formData[field];
    const rules = validationRules[field];

    if (rules.required && !value) {
      errors[field] = rules.message || `${field} is required`;
      return;
    }

    if (rules.pattern && value && !rules.pattern.test(value)) {
      errors[field] = rules.message || `${field} is invalid`;
      return;
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      errors[field] = rules.message || `${field} must be at least ${rules.minLength} characters`;
      return;
    }

    if (rules.maxLength && value && value.length > rules.maxLength) {
      errors[field] = rules.message || `${field} must be at most ${rules.maxLength} characters`;
      return;
    }

    if (rules.min && value && parseFloat(value) < rules.min) {
      errors[field] = rules.message || `${field} must be at least ${rules.min}`;
      return;
    }

    if (rules.max && value && parseFloat(value) > rules.max) {
      errors[field] = rules.message || `${field} must be at most ${rules.max}`;
      return;
    }

    if (rules.custom && value) {
      const customValidation = rules.custom(value);
      if (!customValidation.isValid) {
        errors[field] = customValidation.message;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Async validation for checking unique fields
export const validateUnique = async (value, field, endpoint, token) => {
  try {
    const response = await fetch(`${endpoint}?${field}=${encodeURIComponent(value)}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return {
        isValid: !data.exists,
        message: data.exists ? `${field} already exists` : ''
      };
    }

    return { isValid: true, message: '' };
  } catch (error) {
    console.error('Unique validation error:', error);
    return { isValid: true, message: '' }; // Assume valid if check fails
  }
};

// Composite validation for registration
export const validateRegistration = (userData) => {
  const errors = {};

  // Name validation
  const nameValidation = validateName(userData.name, 'Full name');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }

  // Email validation
  const emailValidation = validateEmail(userData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  // Phone validation
  const phoneValidation = validatePhone(userData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.message;
  }

  // Password validation
  const passwordValidation = validatePassword(userData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }

  // Confirm password
  if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Role validation
  const roleValidation = validateRequired(userData.role, 'Role');
  if (!roleValidation.isValid) {
    errors.role = roleValidation.message;
  }

  return errors;
};

export default {
  validateEmail,
  validatePhone,
  validatePassword,
  validateName,
  validateRequired,
  validateNumber,
  validatePrice,
  validateQuantity,
  validateProduct,
  validateOrder,
  validateAddress,
  validateFileUpload,
  validateForm,
  validateUnique,
  validateRegistration
};