import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function EditCropForm({ crop, onCropUpdated, onCancel }) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        cropName: crop.cropName,
        price: crop.price,
        quantity: crop.quantity,
        location: crop.location,
        landType: crop.landType,
        fertilizersUsed: crop.fertilizersUsed,
        imageUrl: crop.imageUrl || '',
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCropUpdated(crop.id, { ...formData, farmerId: crop.farmerInfo.id });
    };

    return (
        <div>
            <h2 className="h4 mb-4">Edit Crop: {crop.cropName}</h2>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-12"><input type="text" name="cropName" value={formData.cropName} onChange={handleChange} className="form-control" /></div>
                    <div className="col-md-6"><input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" /></div>
                    <div className="col-md-6"><input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="form-control" /></div>
                    <div className="col-12"><input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="form-control" /></div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                    <button type="button" onClick={onCancel} className="btn btn-secondary me-2">Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    );
}
export default EditCropForm;
