import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../dictionary/translations';

function HomePage({ navigate }) {
  const { t, setLang } = useLanguage();
  const handleLangClick = (lang) => {
      setLang(lang);
      navigate('register');
  }
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-3">
      <div className="text-center p-5 rounded-3 shadow-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)'}}>
        <h1 className="display-4 fw-bold text-white mb-4">🌾 {t('appName')}</h1>
        <div className="mb-4">
            <button onClick={() => handleLangClick('en')} className="btn btn-link text-light fs-5 text-decoration-none">{translations.en.langSwitchPrompt}</button>
            <br/>
            <button onClick={() => handleLangClick('te')} className="btn btn-link text-warning fs-5 text-decoration-none">{translations.te.langSwitchPrompt}</button>
        </div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button onClick={() => navigate('login')} className="btn btn-success btn-lg px-4 gap-3">{t('login')}</button>
          <button onClick={() => navigate('register')} className="btn btn-secondary btn-lg px-4">{t('signUp')}</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;