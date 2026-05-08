/**
 * Validates an email address.
 * @param {string} email - The email to validate.
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: 'Email is required',
    };
  }
  
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    };
  }
  
  return {
    isValid: true,
    error: '',
  };
};

/**
 * Validates a password.
 * @param {string} password - The password to validate.
 * @returns {object} { isValid: boolean, error: string }
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return {
      isValid: false,
      error: 'Password is required',
    };
  }
  
  if (password.length < 6) {
    return {
      isValid: false,
      error: 'Password must be at least 6 characters',
    };
  }
  
  return {
    isValid: true,
    error: '',
  };
};
