import React, { useState, useCallback, useEffect } from 'react';
import axios from '../Services/api'; // Corrected casing
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Modal from '../components/Modal';

function DashboardPage() {
    const { user } = useAuth();
    const [crops, setCrops] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useLanguage();

    const fetchCrops = useCallback(async () => {
        if (!user || user.role !== 'farmer') return;
        try {
            const { data } = await axios.get(`/api/crops/farmer/${user.id}`);
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

// This form is used only by DashboardPage, so it can live here.
function AddMultipleCropsForm({ onCropsAdded }) {
    const { user } = useAuth();
    const { t } = useLanguage();
    const initialCrop = { id: Date.now(), cropName: '', price: '', quantity: '', location: '', landType: '', fertilizersUsed: '' };
    const [crops, setCrops] = useState([initialCrop]);
    const [error, setError] = useState('');

    const handleInputChange = (index, event) => {
        const values = [...crops];
        values[index][event.target.name] = event.target.value;
        setCrops(values);
    };

    const handleAddRow = () => setCrops([...crops, { ...initialCrop, id: Date.now() }]);
    const handleRemoveRow = (index) => setCrops(crops.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await Promise.all(crops.map(crop => {
                const { id, ...cropData } = crop;
                return axios.post('/api/crops', { ...cropData, farmerId: user.id });
            }));
            onCropsAdded();
        } catch (err) {
            setError(t('errorAddCrops'));
        }
    };

    return (
        <div>
            <h2 className="h4 mb-4">{t('addNewCropListings')}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3" style={{maxHeight: '50vh', overflowY: 'auto'}}>
                    {crops.map((crop, index) => (
                        <div key={crop.id} className="p-3 border rounded-3 mb-3 position-relative bg-light">
                            <div className="row g-3">
                                <div className="col-md-6"><input type="text" name="cropName" placeholder={t('cropName')} value={crop.cropName} onChange={e => handleInputChange(index, e)} className="form-control" required /></div>
                                <div className="col-md-6"><input type="text" name="location" placeholder={t('landLocation')} value={crop.location} onChange={e => handleInputChange(index, e)} className="form-control" required /></div>
                                <div className="col-md-6"><input type="number" name="price" placeholder={t('pricePerKg')} value={crop.price} onChange={e => handleInputChange(index, e)} className="form-control" required /></div>
                                <div className="col-md-6"><input type="number" name="quantity" placeholder={t('quantityKg')} value={crop.quantity} onChange={e => handleInputChange(index, e)} className="form-control" required /></div>
                                <div className="col-md-6"><input type="text" name="landType" placeholder={t('landType')} value={crop.landType} onChange={e => handleInputChange(index, e)} className="form-control" required /></div>
                                <div className="col-md-6"><input type="text" name="fertilizersUsed" placeholder={t('fertilizersUsed')} value={crop.fertilizersUsed} onChange={e => handleInputChange(index, e)} className="form-control" required /></div>
                            </div>
                            {crops.length > 1 && (
                                <button type="button" onClick={() => handleRemoveRow(index)} className="btn-close position-absolute top-0 end-0 mt-2 me-2"></button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" onClick={handleAddRow} className="btn btn-secondary">{t('addAnotherCrop')}</button>
                    <button type="submit" className="btn btn-primary fw-semibold">{t('submitAll')}</button>
                </div>
            </form>
        </div>
    );
}

export default DashboardPage;
