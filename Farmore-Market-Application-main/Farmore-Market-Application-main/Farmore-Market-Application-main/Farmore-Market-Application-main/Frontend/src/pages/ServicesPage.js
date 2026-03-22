import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import InfoPage from '../components/InfoPage';

function ServicesPage() {
    const { t } = useLanguage();
    return (
        <InfoPage title={t('servicesTitle')}>
            <ul>
                <li>{t('service1')}</li>
                <li>{t('service2')}</li>
                <li>{t('service3')}</li>
                <li>{t('service4')}</li>
            </ul>
        </InfoPage>
    );
}
export default ServicesPage;
