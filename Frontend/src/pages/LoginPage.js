import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import AuthPageWrapper from '../components/AuthPageWrapper';
import { authAPI } from '../api/api';

function LoginPage({ navigate }) {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { t } = useLanguage();
    const handleSubmit = async (e) => {
        e.preventDefault(); setError('');
        try {
            const { data } = await authAPI.login(formData);
            login(data);
        } catch (err) {
            setError(err.response?.data || 'Could not connect to the server.');
        }
    };
    return (
        <AuthPageWrapper>
            <h2 className="text-center fw-bold mb-4">{t('loginToAccount')}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3"><input type="email" placeholder={t('email')} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-control" required /></div>
                <div className="mb-3"><input type="password" placeholder={t('password')} onChange={(e) => setFormData({...formData, password: e.target.value})} className="form-control" required /></div>
                <button type="submit" className="w-100 btn btn-success fw-semibold">{t('login')}</button>
            </form>
            <button onClick={() => navigate('home')} className="w-100 btn btn-link text-secondary text-decoration-none mt-3">{t('backToHome')}</button>
        </AuthPageWrapper>
    );
}
export default LoginPage;