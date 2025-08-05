import React, { useState } from 'react';
import axios from '../Services/api'; // Corrected casing
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import AuthPageWrapper from '../components/AuthPageWrapper';

function LoginPage({ navigate }) {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { t } = useLanguage();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError('');
        try {
            const { data } = await axios.post('/api/auth/login', formData);
            login(data);
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
            <h2 className="text-center fw-bold mb-4">{t('loginToAccount')}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="email" name="email" placeholder={t('email')} value={formData.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                    <input type="password" name="password" placeholder={t('password')} value={formData.password} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="w-100 btn btn-success fw-semibold">{t('login')}</button>
            </form>
            <button onClick={() => navigate('home')} className="w-100 btn btn-link text-secondary text-decoration-none mt-3">{t('backToHome')}</button>
        </AuthPageWrapper>
    );
}

export default LoginPage;