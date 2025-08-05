import React, { useState, useEffect } from 'react';
import axios from '../Services/api'; // Corrected casing
import { useLanguage } from '../context/LanguageContext';
import Modal from '../components/Modal';
import CropCard from '../components/CropCard';

function AllListingsPage() {
    const [allCrops, setAllCrops] = useState([]);
    const [showContact, setShowContact] = useState(null);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const { data } = await axios.get('/api/crops/all');
                setAllCrops(data);
            } catch (error) { console.error(error); }
        };
        fetchAll();
    }, []);

    return (
        <div>
            {showContact && (
                <Modal onClose={() => setShowContact(null)}>
                    <h2 className="h4">{t('contactFarmer')}</h2>
                    <p>{t('toBuy')} <strong>{showContact.cropName}</strong>, {t('contactDirectly')}</p>
                    <div className="mt-3 p-3 bg-light rounded">
                        <p className="mb-1"><strong>{t('name')}:</strong> {showContact.farmerInfo.name}</p>
                        <p className="mb-1"><strong>{t('email')}:</strong> <a href={`mailto:${showContact.farmerInfo.email}`} className="text-primary">{showContact.farmerInfo.email}</a></p>
                        <p className="mb-0"><strong>{t('location')}:</strong> {showContact.farmerInfo.village}</p>
                    </div>
                </Modal>
            )}
            <h2 className="display-5 fw-bold text-white mb-4">{t('allListingsTitle')}</h2>
            <div className="row g-4">
                {allCrops.map(crop => (
                    <div className="col-md-6 col-lg-4" key={crop.id}>
                        <CropCard crop={crop} onBuyClick={() => setShowContact(crop)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllListingsPage;
