import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import InfoPage from '../components/InfoPage';

function AboutUsPage() {
    const { t } = useLanguage();
    return (
        <InfoPage title={t('aboutTitle')}>
            <p>{t('aboutPara1')}</p><p>{t('aboutPara2')}</p><h3 className="h4 mt-4">{t('howItWorks')}</h3>
             <ul>
                <li><strong>{t('forFarmers')}</strong> {t('forFarmersDesc')}</li>
                <li><strong>{t('forBuyers')}</strong> {t('forBuyersDesc')}</li>
            </ul>
        </InfoPage>
    );
}
export default AboutUsPage;
