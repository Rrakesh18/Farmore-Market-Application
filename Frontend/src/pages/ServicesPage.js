import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import InfoPage from '../components/InfoPage';

function ServicesPage() {
    const { t } = useLanguage();
    return (
        <InfoPage title={t('servicesTitle')}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{t('service1')}</li>
                <li className="list-group-item">{t('service2')}</li>
                <li className="list-group-item">{t('service3')}</li>
                <li className="list-group-item">{t('service4')}</li>
            </ul>
        </InfoPage>
    );
}

export default ServicesPage;