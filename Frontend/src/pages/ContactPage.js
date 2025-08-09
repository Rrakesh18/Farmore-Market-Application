import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import InfoPage from '../components/InfoPage';

function ContactPage() {
    const { t } = useLanguage();
    return (
        <InfoPage title={t('contactTitle')}>
            <p>{t('contactIntro')}</p>
            <ul className="list-unstyled">
                <li><strong>{t('contactEmail')}</strong> <a href="mailto:support@farmoremarket.com" className="text-primary">{t('appName')}@example.com</a></li>
                <li><strong>{t('contactLocation')}</strong> {t('locationAddress')}</li>
            </ul>
            <div className="mt-4">
                <div className="w-100 rounded bg-secondary-subtle d-flex align-items-center justify-content-center" style={{height: '300px'}}>
                    <p className="text-secondary">{t('mapPlaceholder')}</p>
                </div>
            </div>
        </InfoPage>
    );
}
export default ContactPage;
