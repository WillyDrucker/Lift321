// ==========================================================================
// FORMAT UTILITIES
//
// Text and number formatting helpers for display purposes.
// Handles currency, percentages, phone numbers, and text transformations.
//
// Dependencies: None (pure formatting logic)
// Used by: Components, screens displaying formatted data
// ==========================================================================

// === NUMBER FORMATTING ===

/**
 * Formats number with commas (e.g., 1000 -> "1,000")
 */
export const formatNumberWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formats currency (e.g., 1234.56 -> "$1,234.56")
 */
export const formatCurrency = (
  amount: number,
  currencySymbol: string = '$',
): string => {
  const formatted = Math.abs(amount).toFixed(2);
  const withCommas = formatNumberWithCommas(parseFloat(formatted));
  const sign = amount < 0 ? '-' : '';
  return `${sign}${currencySymbol}${withCommas}`;
};

/**
 * Formats percentage (e.g., 0.75 -> "75%")
 */
export const formatPercentage = (
  value: number,
  decimals: number = 0,
): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Formats decimal percentage (e.g., 75 -> "75%")
 */
export const formatDecimalPercentage = (
  value: number,
  decimals: number = 0,
): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formats weight with unit (e.g., 150 -> "150 lbs")
 */
export const formatWeight = (
  weight: number,
  unit: 'lbs' | 'kg' = 'lbs',
): string => {
  return `${weight} ${unit}`;
};

/**
 * Rounds number to specified decimal places
 */
export const roundTo = (num: number, decimals: number): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(num * multiplier) / multiplier;
};

// === TEXT FORMATTING ===

/**
 * Capitalizes first letter of string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalizes first letter of each word
 */
export const titleCase = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Converts string to uppercase
 */
export const toUpperCase = (str: string): string => {
  return str.toUpperCase();
};

/**
 * Converts string to lowercase
 */
export const toLowerCase = (str: string): string => {
  return str.toLowerCase();
};

/**
 * Truncates string to max length with ellipsis
 */
export const truncate = (
  str: string,
  maxLength: number,
  suffix: string = '...',
): string => {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Removes extra whitespace from string
 */
export const normalizeWhitespace = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

// === PHONE NUMBER FORMATTING ===

/**
 * Formats phone number to (XXX) XXX-XXXX format
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  // Format with country code: +X (XXX) XXX-XXXX
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  // Return original if format doesn't match
  return phone;
};

/**
 * Strips formatting from phone number (returns digits only)
 */
export const stripPhoneFormat = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

// === TIME FORMATTING ===

/**
 * Formats seconds to MM:SS
 */
export const formatTimeMMSS = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Formats seconds to HH:MM:SS
 */
export const formatTimeHHMMSS = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Formats duration in a human-readable way (e.g., "5 min", "1 hr 30 min")
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;

  if (remainingMins === 0) {
    return `${hours} hr`;
  }

  return `${hours} hr ${remainingMins} min`;
};

// === PLURALIZATION ===

/**
 * Pluralizes word based on count
 */
export const pluralize = (
  count: number,
  singular: string,
  plural?: string,
): string => {
  if (count === 1) {
    return singular;
  }
  return plural || `${singular}s`;
};

/**
 * Formats count with pluralized word (e.g., "3 workouts")
 */
export const formatCount = (
  count: number,
  singular: string,
  plural?: string,
): string => {
  return `${count} ${pluralize(count, singular, plural)}`;
};

// === INITIALS ===

/**
 * Gets initials from full name (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name: string, maxLength: number = 2): string => {
  if (!name) return '';

  const parts = name.trim().split(/\s+/);
  const initials = parts
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, maxLength)
    .join('');

  return initials;
};

// === SANITIZATION ===

/**
 * Sanitizes string for safe display (basic XSS prevention)
 */
export const sanitizeText = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// === EMAIL OBFUSCATION ===

/**
 * Obfuscates email for privacy (e.g., "john@example.com" -> "j***@example.com")
 */
export const obfuscateEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email;

  const [localPart, domain] = email.split('@');
  if (localPart.length <= 1) return email;

  const obfuscated = localPart[0] + '***';
  return `${obfuscated}@${domain}`;
};
