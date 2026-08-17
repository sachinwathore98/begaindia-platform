import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    orgName: 'BEGA INDIA',
    orgFullName: 'Business Empowerment and Growth Association',
    orgTagline: 'Growth • Trust • Success',
    philosophy: 'An Association for Business. A Platform for People. A Movement for Social Development.',
    nav: {
      home: 'Home',
      about: 'About Us',
      membership: 'Membership',
      directory: 'Business Directory',
      support: 'Business Support',
      events: 'Events & Expo',
      seva: 'BEGA Seva',
      knowledge: 'Knowledge Centre',
      contact: 'Contact Us',
      login: 'Member Login',
      joinBega: 'JOIN BEGA',
    },
    ctaButtons: {
      joinBega: 'JOIN BEGA',
      membership: 'MEMBERSHIP',
      directory: 'BUSINESS DIRECTORY',
      businessSupport: 'BUSINESS SUPPORT',
      registerIssue: 'REGISTER BUSINESS ISSUE',
      begaSeva: 'BEGA SEVA',
      begaExpo: 'BEGA EXPO',
      mahaadhiveshan: 'BEGA MAHAADHIVESHAN',
      events: 'EVENTS',
      training: 'TRAINING',
      awards: 'AWARDS',
    },
    hero: {
      title: 'Empowering Businesses, Connecting People, Building the Nation',
      subtitle: 'Maharashtra’s comprehensive digital ecosystem for business protection, B2B growth, professional networking, and rural social development.',
      applyMembership: 'Apply for Membership',
      exploreDirectory: 'Explore Directory',
      reportIssue: 'Submit Business Issue',
    },
    pillars: {
      title: 'Six Core Pillars',
      growth: 'Business Growth',
      protection: 'Business Protection',
      govConnect: 'Government Connect',
      resolution: 'Problem Resolution',
      opportunity: 'Business Opportunities',
      development: 'Development & MSME',
    },
    seva: {
      title: 'BEGA Seva — Social Development Wing',
      flagship: 'Flagship Initiative: ONE MONTH – ONE VILLAGE',
      target: 'Target: 12 Villages/Year • 60 Villages in 5 Years',
      desc: 'Measurable, sustainable grassroots development covering cleanliness, tree plantation, education aid, farmer guidance, and health awareness.',
    }
  },
  mr: {
    orgName: 'बेगा इंडिया (BEGA INDIA)',
    orgFullName: 'व्यवसाय सक्षमीकरण व विकास संघटना',
    orgTagline: 'Growth • Trust • Success',
    philosophy: 'व्यावसायिकांसाठी संघटना • लोकांसाठी व्यासपीठ • सामाजिक विकासासाठी चळवळ',
    nav: {
      home: 'मुख्यपृष्ठ',
      about: 'आमच्याबद्दल',
      membership: 'सभासदत्व (Membership)',
      directory: 'व्यवसाय डिरेक्टरी',
      support: 'बिझनेस सपोर्ट',
      events: 'इव्हेंट्स व एक्स्पो',
      seva: 'बेगा सेवा (BEGA Seva)',
      knowledge: 'माहिती केंद्र',
      contact: 'संपर्क',
      login: 'सभासद लॉगिन',
      joinBega: 'बेगामध्ये सहभागी व्हा',
    },
    ctaButtons: {
      joinBega: 'JOIN BEGA',
      membership: 'MEMBERSHIP',
      directory: 'BUSINESS DIRECTORY',
      businessSupport: 'BUSINESS SUPPORT',
      registerIssue: 'REGISTER BUSINESS ISSUE',
      begaSeva: 'BEGA SEVA',
      begaExpo: 'BEGA EXPO',
      mahaadhiveshan: 'BEGA MAHAADHIVESHAN',
      events: 'EVENTS',
      training: 'TRAINING',
      awards: 'AWARDS',
    },
    hero: {
      title: 'उद्योग व व्यवसाय सक्षमीकरण, सामूहिक विकास आणि राष्ट्र उभारणी',
      subtitle: 'उद्योजक, व्यापारी, MSME आणि स्टार्टअप्ससाठी व्यावसायिक मार्गदर्शन, कायदेशीर पाठबळ, B2B नेटवर्किंग आणि सामाजिक विकासाचे डिजिटल व्यासपीठ.',
      applyMembership: 'सभासद नोंदणी करा',
      exploreDirectory: 'बिझनेस डिरेक्टरी शोधा',
      reportIssue: 'तक्रार / अडचण नोंदवा',
    },
    pillars: {
      title: 'संस्थेचे ६ मुख्य आधारस्तंभ',
      growth: 'व्यवसाय वाढ (Growth)',
      protection: 'व्यवसाय संरक्षण (Protection)',
      govConnect: 'शासकीय समन्वय (Govt Connect)',
      resolution: 'समस्या निवारण (Resolution)',
      opportunity: 'व्यावसायिक संधी (Opportunity)',
      development: 'सर्वसमावेशक विकास (Development)',
    },
    seva: {
      title: 'बेगा सेवा (BEGA Seva) — सामाजिक विकास विभाग',
      flagship: 'प्रमुख उपक्रम: एक महिना – एक गाव (One Month – One Village)',
      target: 'ध्येय: १ वर्षात १२ गावे • ५ वर्षात ६० गावे',
      desc: 'केवळ प्रतीकात्मक कार्यक्रम न करता ग्राम सर्वेक्षण, स्वच्छता मोहीम, वृक्षारोपण, विद्यार्थी सहाय्य आणि शेतकरी मार्गदर्शनातून शाश्वत ग्रामविकास.',
    }
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('bega_lang') || 'mr');

  useEffect(() => {
    localStorage.setItem('bega_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);