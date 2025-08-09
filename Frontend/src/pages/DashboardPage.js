import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Modal from '../components/Modal';
import AddMultipleCropsForm from '../components/AddMultipleCropsForm';
import { cropAPI } from '../api/api';

function DashboardPage() {
    const { user } = useAuth();
    const [crops, setCrops] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useLanguage();

    const fetchCrops = useCallback(async () => {
        if (!user || user.role !== 'farmer') return;
        try {
            const { data } = await cropAPI.getByFarmer(user.id);
            setCrops(data);
        } catch (error) { console.error("Failed to fetch crops", error); }
    }, [user]);

    useEffect(() => { fetchCrops(); }, [fetchCrops]);

    const handleCropsAdded = () => {
        fetchCrops();
        setIsModalOpen(false);
    };

    return (
        <div>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <AddMultipleCropsForm onCropsAdded={handleCropsAdded} />
                </Modal>
            )}
            <div className="d-flex justify-content-between align-items-center mb-4">
                 <h2 className="display-5 fw-bold text-white">{t('myDashboard')}</h2>
                {user.role === 'farmer' && (
                    <button onClick={() => setIsModalOpen(true)} className="btn btn-primary fw-bold">{t('addNewCrops')}</button>
                )}
            </div>
            <div className="p-4 rounded-3 shadow" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)'}}>
                <h3 className="h4 mb-3 border-bottom pb-2">
                    {user.role === 'farmer' ? t('myListedCrops') : t('welcomeBuyer')}
                </h3>
                {user.role === 'farmer' ? (
                    <ul className="list-group" style={{maxHeight: '60vh', overflowY: 'auto'}}>
                        {crops.length > 0 ? crops.map(crop => (
                            <li key={crop.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <div className="fw-semibold">{crop.cropName}</div>
                                    <small className="text-muted">{crop.quantity} Kg available</small>
                                </div>
                                <span className="badge bg-success rounded-pill fs-6">₹{crop.price}/Kg</span>
                            </li>
                        )) : <p className="text-muted text-center p-4">{t('noCropsAdded')}</p>}
                    </ul>
                ) : (
                    <p className="text-muted">{t('buyerInstruction')}</p>
                )}
            </div>
        </div>
    );
}
export default DashboardPage;
