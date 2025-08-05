import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

function CropCard({ crop, onBuyClick }) {
    const { user } = useAuth();
    const [showDetails, setShowDetails] = useState(false);
    const { t } = useLanguage();

    // This check prevents the error. If farmerInfo is missing, it provides a default.
    const farmerInfo = crop.farmerInfo || { name: 'Unknown', email: 'N/A', village: 'N/A' };

    return (
        <div className="card h-100 shadow" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)'}}>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{crop.cropName}</h5>
                <p className="card-text fs-5 text-success fw-semibold">₹{crop.price} / Kg</p>
                <p className="card-text text-muted mb-2">{crop.quantity} Kg available</p>
                <hr className="my-2"/>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <button onClick={() => setShowDetails(!showDetails)} className="btn btn-link p-0 text-decoration-none">
                        {showDetails ? t('hideDetails') : t('showDetails')}
                    </button>
                    {user && user.role === 'buyer' && (
                        <button onClick={onBuyClick} className="btn btn-success btn-sm fw-bold">{t('buy')}</button>
                    )}
                </div>
                {showDetails && (
                    <div className="mt-3 p-3 bg-light rounded small">
                        <p className="mb-1"><strong>{t('farmerInfo')}:</strong> {farmerInfo.name}</p>
                        <p className="mb-1"><strong>{t('contactInfo')}:</strong> {farmerInfo.email}</p>
                        <p className="mb-1"><strong>{t('villageInfo')}:</strong> {farmerInfo.village}</p>
                        <p className="mb-1"><strong>{t('farmLocationInfo')}:</strong> {crop.location}</p>
                        <p className="mb-1"><strong>{t('landTypeInfo')}:</strong> {crop.landType}</p>
                        <p className="mb-0"><strong>{t('fertilizersInfo')}:</strong> {crop.fertilizersUsed}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default CropCard;