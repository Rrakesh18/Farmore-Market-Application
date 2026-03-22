import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import InfoPage from '../components/InfoPage';

// This is a placeholder for a real map component
const MapComponent = () => {
    const { t } = useLanguage();
    // In a real app, you would fetch farmer locations and use a library like Leaflet
    return (
        <div className="w-100 rounded bg-secondary-subtle d-flex align-items-center justify-content-center" style={{height: '300px'}}>
            <p className="text-secondary">{t('mapPlaceholder')}</p>
        </div>
    );
}

function ContactPage() {
    const { t } = useLanguage();
    return (
        <InfoPage title={t('contactTitle')}>
            <p>{t('contactIntro')}</p>
            <ul className="list-unstyled">
                <li><strong>{t('contactEmail')}</strong> <a href="mailto:support@farmoremarket.com" className="text-primary">{t('appName')}@example.com</a></li>
                <li><strong>{t('contactLocation')}</strong> {t('locationAddress')}</li>
            </ul>
            <h3 className="h4 mt-4">{t('farmersOnMap')}</h3>
            <div className="mt-3">
               <MapComponent />
            </div>
        </InfoPage>
    );
}
export default ContactPage;