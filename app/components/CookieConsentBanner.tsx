// app/components/CookieConsentBanner.tsx
'use client';

import React, { useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { FaCookieBite } from 'react-icons/fa';
import Modal from './Modal'; // You'll need to create this component

interface CookieConsentBannerProps {
  onAccept: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onAccept }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        onAccept={onAccept}
        onDecline={() => {
          localStorage.setItem('cookieConsent', 'false');
        }}
        cookieName="siteCookieConsent"
        containerClasses="bg-gray-800 dark:bg-gray-900 p-4 sm:p-6 fixed bottom-0 left-0 right-0 z-40 flex flex-col sm:flex-row items-center justify-between font-[family-name:var(--font-geist-sans)] shadow-lg"
        contentClasses="text-white mb-4 sm:mb-0 text-center sm:text-left flex-grow"
        buttonClasses="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out min-w-[120px]"
        declineButtonClasses="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 transition duration-300 ease-in-out min-w-[120px]"
        expires={150}
        style={{ boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)' }}
        buttonStyle={{ background: "#C5451A", color: "#fff", fontSize: "14px" }}
        declineButtonStyle={{ background: "#C5451A", color: "#fff", fontSize: "14px" }}
        ariaAcceptLabel="Accept cookies"
        ariaDeclineLabel="Decline cookies"
      >
        <div className="flex items-center space-x-3">
          <FaCookieBite className="text-2xl text-yellow-400" aria-hidden="true" />
          <div>
            <h2 className="text-sm sm:text-base font-semibold mb-1">I value your privacy</h2>
            <p className="text-xs sm:text-sm max-w-3xl">
              I use Azure Application Insights to learn and improve my site. No data is shared with third parties other than Microsoft. By clicking &quot;Accept&quot;, you consent to my use of cookies.
              <button 
                onClick={() => setShowModal(true)} 
                className="text-blue-400 hover:text-blue-300 underline ml-1 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                disabled={showModal}
                aria-haspopup="dialog"
              >
                Learn More
              </button>
            </p>
          </div>
        </div>
      </CookieConsent>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="font-[family-name:var(--font-geist-sans)]">
          <h2 id="modal-title" className="text-xl font-bold mb-4">Cookie and Privacy Policy</h2>
          <p className="mb-4">
            I use Azure Application Insights, a service provided by Microsoft, to analyze site usage and improve my website. This helps me understand how visitors interact with my site and assists in debugging any issues that may arise. This is primarily for my personal learning purposes.
          </p>
          <p className="mb-4">
            <strong>Important:</strong> I do not share any data with third parties other than Microsoft (via Azure Application Insights). The data collected is used solely for my learning purposes and to enhance the functionality of this site.
          </p>
          <h3 className="text-lg font-semibold mb-2">What I Collect:</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Basic usage statistics (e.g., page views, session duration)</li>
            <li>Performance data to identify and fix potential issues</li>
            <li>Browser and device information for compatibility purposes</li>
          </ul>
          <p className="mb-4">
            I respect your privacy and aim to be fully transparent about my data practices. The information collected is minimal and used exclusively to improve your experience on this site and for my learning.
          </p>
          <p>
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. Learn more about our &quot;Privacy Policy&quot;.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CookieConsentBanner;
