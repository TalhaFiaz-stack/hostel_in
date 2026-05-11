import React, { createContext, useState, useContext } from 'react';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState({
    // Step 1: Signup
    hostel_name: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    country: 'Pakistan',
    area: '',
    registration_number: '',
    registration_certificate: null,
    referral_code: '',
    referral_verified: false,
    
    // Step 2: OTP
    otp_verified: false,
    
    // Step 3: Buildings
    buildings: [],
    
    // Step 4: Rooms
    rooms: [],
    
    // Step 5: Pricing
    pricing: {},
    
    // Step 6: Images
    images: []
  });

  const updateOnboardingData = (newData) => {
    setOnboardingData(prev => ({ ...prev, ...newData }));
  };

  const resetOnboardingData = () => {
    setOnboardingData({
      hostel_name: '',
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      city: '',
      country: 'Pakistan',
      area: '',
      registration_number: '',
      registration_certificate: null,
      referral_code: '',
      referral_verified: false,
      otp_verified: false,
      buildings: [],
      rooms: [],
      pricing: {},
      images: []
    });
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateOnboardingData, resetOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
