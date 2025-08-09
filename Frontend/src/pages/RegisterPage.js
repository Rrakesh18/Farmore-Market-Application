import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import AuthPageWrapper from '../components/AuthPageWrapper';
import { authAPI } from '../api/api';

function RegisterPage({ navigate }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', village: '', role: 'farmer' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { t } = useLanguage();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setSuccess('');
        if (formData.name.length < 5) { setError(t('errorNameLength')); return; }
        if (formData.password.length < 8) { setError(t('errorPasswordLength')); return; }
        try {
            await authAPI.register(formData);
            setSuccess(t('regSuccess'));
            setTimeout(() => navigate('login'), 2000);
        } catch (err) {
            setError(err.response?.data || 'Could not connect to the server.');
        }
    };
    return (
        <AuthPageWrapper>
            <h2 className="text-center fw-bold mb-4">{t('createAccount')}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3"><label className="form-label fw-medium">{t('iAmA')}</label><select name="role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="form-select"><option value="farmer">{t('farmer')}</option><option value="buyer">{t('buyer')}</option></select></div>
                <div className="mb-3"><input type="text" placeholder={t('name')} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-control" required /></div>
                <div className="mb-3"><input type="email" placeholder={t('email')} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-control" required /></div>
                <div className="mb-3"><input type="text" placeholder={t('location')} onChange={(e) => setFormData({...formData, village: e.target.value})} className="form-control" required /></div>
                <div className="mb-3"><input type="password" placeholder={t('password')} onChange={(e) => setFormData({...formData, password: e.target.value})} className="form-control" required /></div>
                <button type="submit" className="w-100 btn btn-success fw-semibold">{t('signUp')}</button>
            </form>
            <button onClick={() => navigate('home')} className="w-100 btn btn-link text-secondary text-decoration-none mt-3">{t('backToHome')}</button>
        </AuthPageWrapper>
    );
}
export default RegisterPage;
