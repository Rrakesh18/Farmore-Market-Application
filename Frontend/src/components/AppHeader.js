import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function AppHeader({ navigate }) {
    const { user } = useAuth();
    const { t } = useLanguage();
    return (
        <header className="navbar navbar-expand-md navbar-dark bg-success shadow sticky-top">
            <div className="container-fluid">
                <span className="navbar-brand fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate(user.role === 'farmer' ? 'dashboard' : 'all-listings')}>{t('appName')}</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        {user.role === 'farmer' && <li className="nav-item"><button className="nav-link fw-semibold" onClick={() => navigate('dashboard')}>{t('dashboard')}</button></li>}
                        <li className="nav-item"><button className="nav-link" onClick={() => navigate('all-listings')}>{t('allListings')}</button></li>
                        <li className="nav-item"><button className="nav-link" onClick={() => navigate('about')}>{t('aboutUs')}</button></li>
                        <li className="nav-item"><button className="nav-link" onClick={() => navigate('services')}>{t('services')}</button></li>
                        <li className="nav-item"><button className="nav-link" onClick={() => navigate('contact')}>{t('contact')}</button></li>
                    </ul>
                    <div className="d-flex align-items-center ms-md-auto">
                        <button className="nav-link text-white fw-semibold" onClick={() => navigate('profile')}>{t('profile')}</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default AppHeader;