import { CURRENCY, DATE_FORMATS } from './constants';

// Currency formatting
export const formatCurrency = (amount, currency = CURRENCY.CODE) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${CURRENCY.SYMBOL} 0.00`;
  }

  const formatter = new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(amount);
};

export const formatCurrencyWithoutSymbol = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0.00';
  }

  return new Intl.NumberFormat('en-ET', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Date formatting
export const formatDate = (date, format = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };

  if (format === DATE_FORMATS.DISPLAY_WITH_TIME) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return dateObj.toLocaleDateString('en-ET', options);
};

export const formatTime = (date) => {
  if (!date) return '';

  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('en-ET', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Number formatting
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }

  return new Intl.NumberFormat('en-ET').format(
    parseFloat(number).toFixed(decimals)
  );
};

export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }

  return `${parseFloat(value).toFixed(decimals)}%`;
};

// File size formatting
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Phone number formatting
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Format Ethiopian phone numbers
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.startsWith('251')) {
    return `+251 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  } else if (cleaned.startsWith('0')) {
    return `+251 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  return phone;
};

// Text formatting
export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const titleCase = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const snakeToTitle = (str) => {
  if (!str) return '';
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Order and reference number formatting
export const formatOrderNumber = (orderId) => {
  if (!orderId) return '';
  return `ORD-${String(orderId).padStart(6, '0')}`;
};

export const formatDeliveryNumber = (deliveryId) => {
  if (!deliveryId) return '';
  return `DLV-${String(deliveryId).padStart(6, '0')}`;
};

export const formatTransactionNumber = (transactionId) => {
  if (!transactionId) return '';
  return `TXN-${String(transactionId).padStart(8, '0')}`;
};

// Address formatting
export const formatAddress = (address) => {
  if (!address) return '';

  const parts = [];
  if (address.street) parts.push(address.street);
  if (address.city) parts.push(address.city);
  if (address.region) parts.push(address.region);
  
  return parts.join(', ');
};

// Status formatting
export const formatStatus = (status) => {
  if (!status) return '';
  
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Distance formatting
export const formatDistance = (meters) => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

// Duration formatting
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${Math.round(minutes)}min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

// Rating formatting
export const formatRating = (rating) => {
  if (rating === null || rating === undefined) {
    return 'No ratings';
  }

  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  return `${stars} (${rating.toFixed(1)})`;
};

// Quantity formatting with units
export const formatQuantity = (quantity, unit) => {
  if (quantity === null || quantity === undefined || isNaN(quantity)) {
    return `0 ${unit}`;
  }

  const formattedQuantity = parseFloat(quantity).toFixed(2).replace(/\.00$/, '');
  return `${formattedQuantity} ${unit}`;
};

// Social security number formatting (if needed)
export const formatSSN = (ssn) => {
  if (!ssn) return '';
  const cleaned = ssn.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
};

// Credit card number formatting
export const formatCardNumber = (cardNumber) => {
  if (!cardNumber) return '';
  const cleaned = cardNumber.replace(/\D/g, '');
  return cleaned.replace(/(\d{4})/g, '$1 ').trim();
};

// Expiry date formatting
export const formatExpiryDate = (month, year) => {
  if (!month || !year) return '';
  return `${String(month).padStart(2, '0')}/${String(year).slice(-2)}`;
};

// CSV data formatting
export const formatForCSV = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => {
      if (typeof item === 'object' && item !== null) {
        return Object.values(item).map(value => 
          typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
        ).join(',');
      }
      return `"${String(item).replace(/"/g, '""')}"`;
    }).join('\n');
  }
  
  return `"${String(data).replace(/"/g, '""')}"`;
};

// URL formatting
export const formatURL = (url) => {
  if (!url) return '';
  
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  
  return url;
};

// Truncate with ellipsis
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Format array as comma-separated string
export const formatArray = (array, maxItems = 3) => {
  if (!array || !Array.isArray(array)) return '';
  
  if (array.length <= maxItems) {
    return array.join(', ');
  }
  
  return array.slice(0, maxItems).join(', ') + ` and ${array.length - maxItems} more`;
};

// Format boolean as Yes/No
export const formatBoolean = (value) => {
  return value ? 'Yes' : 'No';
};

// Format null or undefined values
export const formatNullable = (value, placeholder = 'N/A') => {
  if (value === null || value === undefined || value === '') {
    return placeholder;
  }
  return value;
};

export default {
  formatCurrency,
  formatCurrencyWithoutSymbol,
  formatDate,
  formatTime,
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatPhoneNumber,
  capitalizeFirst,
  titleCase,
  snakeToTitle,
  formatOrderNumber,
  formatDeliveryNumber,
  formatTransactionNumber,
  formatAddress,
  formatStatus,
  formatDistance,
  formatDuration,
  formatRating,
  formatQuantity,
  formatSSN,
  formatCardNumber,
  formatExpiryDate,
  formatForCSV,
  formatURL,
  truncateText,
  formatArray,
  formatBoolean,
  formatNullable
};