import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AllListingsPage from './pages/AllListingsPage';
import AboutUsPage from './pages/AboutUsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/ProfilePage';

// Import Components
import AppHeader from './components/AppHeader';
import Marquee from './components/Marquee';

function App() {
  const [page, setPage] = useState('home');
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (isAuthenticated) {
        setPage(user.role === 'farmer' ? 'dashboard' : 'all-listings');
    } else {
        setPage('home');
    }
  }, [isAuthenticated, user]);

  const navigate = (newPage) => setPage(newPage);

  const renderPage = () => {
    if (!isAuthenticated) {
        switch (page) {
            case 'login': return <LoginPage navigate={navigate} />;
            case 'register': return <RegisterPage navigate={navigate} />;
            default: return <HomePage navigate={navigate} />;
        }
    }
    
    // Authenticated Routes
    return (
        <div>
            <AppHeader navigate={navigate} />
            <main className="container my-4">
                {page === 'dashboard' && <DashboardPage />}
                {page === 'all-listings' && <AllListingsPage />}
                {page === 'about' && <AboutUsPage />}
                {page === 'services' && <ServicesPage />}
                {page === 'contact' && <ContactPage />}
                {page === 'profile' && <ProfilePage />}
            </main>
        </div>
    );
  };

  return (
      <div className="bg-image-wrapper">
        <div className="bg-overlay">
            <Marquee text={t('tagline')} />
            {renderPage()}
        </div>
      </div>
  );
}

export default App;
