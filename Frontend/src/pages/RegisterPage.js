import React, { useState } from 'react';
import axios from '../Services/api'; // Corrected casing
import { useLanguage } from '../context/LanguageContext';
import AuthPageWrapper from '../components/AuthPageWrapper';

function RegisterPage({ navigate }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', village: '', role: 'farmer' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { t } = useLanguage();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setSuccess('');

        if (formData.name.length < 5) {
            setError(t('errorNameLength'));
            return;
        }
        if (formData.password.length < 8) {
            setError(t('errorPasswordLength'));
            return;
        }

        try {
            await axios.post('/api/auth/register', formData);
            setSuccess(t('regSuccess'));
            setTimeout(() => navigate('login'), 2000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || err.response.data || 'An error occurred.');
            } else if (err.request) {
                setError('Could not connect to the server. Please ensure the backend is running.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };
    return (
        <AuthPageWrapper>
            <h2 className="text-center fw-bold mb-4">{t('createAccount')}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label fw-medium">{t('iAmA')}</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="form-select">
                        <option value="farmer">{t('farmer')}</option>
                        <option value="buyer">{t('buyer')}</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input type="text" name="name" placeholder={t('name')} value={formData.name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input type="email" name="email" placeholder={t('email')} value={formData.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input type="text" name="village" placeholder={t('location')} value={formData.village} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" placeholder={t('password')} value={formData.password} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="w-100 btn btn-success fw-semibold">{t('signUp')}</button>
            </form>
            <button onClick={() => navigate('home')} className="w-100 btn btn-link text-secondary text-decoration-none mt-3">{t('backToHome')}</button>
        </AuthPageWrapper>
    );
}

export default RegisterPage;
