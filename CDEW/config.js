// config.js

// Default API key (fallback if localStorage is not available or no key is stored)
const DEFAULT_API_KEY = '0000000000000000000000000';

// Function to get the API key from localStorage or return the default key
export const getGROQ_API_KEY = () => {
  try {
    // Check if localStorage is available (browser environment)
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedKey = localStorage.getItem('grokApiKey');
      return storedKey || DEFAULT_API_KEY; // Use stored key or fallback to default
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
  }
  return DEFAULT_API_KEY; // Fallback for non-browser environments
};

// Function to set the API key to localStorage
export const setGROQ_API_KEY = (apiKey) => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('grokApiKey', apiKey);
        } else {
            console.error('localStorage is not available.');
        }
    } catch (error) {
        console.error('Error setting localStorage:', error);
    }
};

// Export the API key as a constant (dynamically resolved)
export const GROQ_API_KEY = getGROQ_API_KEY();