import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { cropAPI } from '../api/api';

function AddMultipleCropsForm({ onCropsAdded }) {
    const { user } = useAuth();
    const { t } = useLanguage();
    const initialCrop = { id: Date.now(), cropName: '', price: '', quantity: '', location: '', landType: '', fertilizersUsed: '', imageUrl: '' };
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
            await cropAPI.addMultiple(crops, user.id);
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
                                <div className="col-12"><input type="text" name="imageUrl" placeholder="Image URL (optional)" value={crop.imageUrl} onChange={e => handleInputChange(index, e)} className="form-control" /></div>
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

export default AddMultipleCropsForm;