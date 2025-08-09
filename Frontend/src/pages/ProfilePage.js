import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import InfoPage from '../components/InfoPage';

function ProfilePage() {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    return (
        <InfoPage title={t('myProfile')}>
            <ul className="list-group list-group-flush fs-5">
                <li className="list-group-item"><strong>{t('name')}:</strong> {user.name}</li>
                <li className="list-group-item"><strong>{t('email')}:</strong> {user.email}</li>
                <li className="list-group-item"><strong>{t('location')}:</strong> {user.village}</li>
                <li className="list-group-item"><strong>{t('role')}:</strong> <span className="text-capitalize fw-semibold">{t(user.role)}</span></li>
            </ul>
            <div className="text-center mt-4">
                <button onClick={logout} className="btn btn-danger">{t('logout')}</button>
            </div>
        </InfoPage>
    );
}
export default ProfilePage;