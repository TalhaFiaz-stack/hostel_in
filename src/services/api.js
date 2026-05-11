import axios from 'axios';

const API_BASE_URL = 'https://api.hostelin.pk/api/public';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Public Data
  getFeaturedHostels: async () => {
    const response = await apiClient.get('/featured-hostels');
    return response.data;
  },
  
  getBuildings: async (params = {}) => {
    const response = await apiClient.get('/buildings', { params });
    return response.data;
  },

  getHostelDetail: async (id) => {
    const response = await apiClient.get(`/hostels/${id}`);
    return response.data;
  },

  // Onboarding & Auth
  verifyReferralCode: async (code) => {
    // API: https://api.hostelin.pk/api/website/auth/verify-referral-code?code=QWERT1234
    const response = await axios.get(`https://api.hostelin.pk/api/website/auth/verify-referral-code?code=${code}`);
    return response.data;
  },

  signup: async (data) => {
    // API: https://api.hostelin.pk/api/website/auth/signup
    const response = await axios.post('https://api.hostelin.pk/api/website/auth/signup', data);
    return response.data;
  },

  sendOtp: async (phone) => {
    // API: https://api.hostelin.pk/api/website/auth/send-otp
    const response = await axios.post('https://api.hostelin.pk/api/website/auth/send-otp', { phone });
    return response.data;
  },

  verifyOtp: async (phone, code) => {
    // API: https://api.hostelin.pk/api/website/auth/verify-otp
    const response = await axios.post('https://api.hostelin.pk/api/website/auth/verify-otp', { phone, code });
    return response.data;
  },

  setupOnboarding: async (data) => {
    // API: https://api.hostelin.pk/api/website/onboarding/setup
    const response = await axios.post('https://api.hostelin.pk/api/website/onboarding/setup', data);
    return response.data;
  }
};

export default apiClient;
