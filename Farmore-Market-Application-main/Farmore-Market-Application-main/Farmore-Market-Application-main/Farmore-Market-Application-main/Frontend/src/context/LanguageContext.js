import React, { useState, useContext, createContext } from 'react';
import { translations } from '../dictionary/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const setLang = (lang) => setLanguage(lang);
  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);