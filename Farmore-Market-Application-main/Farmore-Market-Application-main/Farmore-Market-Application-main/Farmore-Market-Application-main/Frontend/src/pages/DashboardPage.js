import React, { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Modal from '../components/Modal';
import AddMultipleCropsForm from '../components/AddMultipleCropsForm';
import AllListingsPage from './AllListingsPage'; // Import AllListingsPage for buyers
import CropCard from '../components/CropCard';
import { cropAPI } from '../services/api';

function DashboardPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    
    // Hooks must be at the top level
    const [myCrops, setMyCrops] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchMyCrops = useCallback(async () => {
        // Logic moved inside the hook
        if (user && user.role === 'farmer') { 
            try { 
                const { data } = await cropAPI.getByFarmer(user.id); 
                setMyCrops(data); 
            } catch (error) { console.error("Failed to fetch crops", error); }
        }
    }, [user]); // Dependency on user is correct

    // This effect runs when the component mounts or fetchMyCrops changes
    useEffect(() => {
        fetchMyCrops(); 
    }, [fetchMyCrops]);

    const handleCropsAdded = () => { 
        fetchMyCrops(); 
        setIsModalOpen(false); 
    };

    // Farmer's Dashboard
    if (user.role === 'farmer') {
        return (
             <div>
                {isModalOpen && (<Modal onClose={() => setIsModalOpen(false)}><AddMultipleCropsForm onCropsAdded={handleCropsAdded} /></Modal>)}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="display-5 fw-bold text-white">{t('myDashboard')}</h2>
                    <button onClick={() => setIsModalOpen(true)} className="btn btn-primary fw-bold">{t('addNewCrops')}</button>
                </div>
                <div className="p-4 rounded-3 shadow" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)'}}>
                    <h3 className="h4 mb-3 border-bottom pb-2">{t('myListedCrops')}</h3>
                    <div className="row g-4">
                        {myCrops.length > 0 ? myCrops.map(crop => (
                            <div className="col-md-6 col-lg-4" key={crop.id}>
                                <CropCard crop={crop} page="dashboard" />
                            </div>
                        )) : <div className="col-12"><p className="text-muted text-center p-4">{t('noCropsAdded')}</p></div>}
                    </div>
                </div>
            </div>
        );
    }
    
    // Buyer's Dashboard is the All Listings page
    if (user.role === 'buyer') {
        return <AllListingsPage isBuyerDashboard={true} />;
    }

    return null; // Handle case where user role is not set
}

export default DashboardPage;