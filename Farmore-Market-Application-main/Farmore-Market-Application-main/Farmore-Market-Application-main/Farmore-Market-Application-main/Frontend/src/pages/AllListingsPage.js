import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Modal from '../components/Modal';
import CropCard from '../components/CropCard';
import EditCropForm from '../components/EditCropForm';
import { cropAPI } from '../services/api';

const CROPS_PER_PAGE = 6;

function AllListingsPage({ isBuyerDashboard = false }) {
    const [allCrops, setAllCrops] = useState([]);
    const [showContact, setShowContact] = useState(null);
    const [editingCrop, setEditingCrop] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useLanguage();

    const pageTitle = isBuyerDashboard ? t('dashboard') : t('allListingsTitle');
    
    const fetchAll = async () => { 
        try { 
            const { data } = await cropAPI.getAll(); 
            setAllCrops(data); 
        } catch (error) { console.error(error); } 
    };

    useEffect(() => { fetchAll(); }, []);

    const handleDelete = async (cropId) => { 
        if (window.confirm("Are you sure?")) { 
            try { 
                await cropAPI.delete(cropId); 
                fetchAll(); 
            } catch (e) { console.error(e); } 
        } 
    };

    const handleUpdate = async (cropId, cropData, farmerId) => { 
        try { 
            await cropAPI.update(cropId, cropData, farmerId); 
            setEditingCrop(null); 
            fetchAll(); 
        } catch (e) { console.error(e); } 
    };
    
    const indexOfLastCrop = currentPage * CROPS_PER_PAGE; 
    const indexOfFirstCrop = indexOfLastCrop - CROPS_PER_PAGE; 
    const currentCrops = allCrops.slice(indexOfFirstCrop, indexOfLastCrop); 
    const totalPages = Math.ceil(allCrops.length / CROPS_PER_PAGE);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container my-4">
            {showContact && <Modal onClose={() => setShowContact(null)}><h2 className="h4">{t('contactFarmer')}</h2><p>{t('toBuy')} <strong>{showContact.cropName}</strong>, {t('contactDirectly')}</p><div className="mt-3 p-3 bg-light rounded"><p className="mb-1"><strong>{t('name')}:</strong> {showContact.farmer.name}</p><p className="mb-1"><strong>{t('contactInfo')}:</strong> <a href={`mailto:${showContact.farmer.email}`} className="text-primary">{showContact.farmer.email}</a> / <a href={`tel:${showContact.farmer.phone}`}>{showContact.farmer.phone}</a></p><p className="mb-0"><strong>{t('location')}:</strong> {showContact.farmer.village}</p></div></Modal>}
            {editingCrop && <Modal onClose={() => setEditingCrop(null)}><EditCropForm crop={editingCrop} onCropUpdated={handleUpdate} onCancel={() => setEditingCrop(null)} /></Modal>}
            <h2 className="display-5 fw-bold text-white mb-4">{pageTitle}</h2>
            { isBuyerDashboard && <p className="text-light lead mb-4">{t('buyerInstruction')}</p>}
            <div className="row g-4">{currentCrops.map(crop => <div className="col-md-6 col-lg-4" key={crop.id}><CropCard crop={crop} onBuyClick={() => setShowContact(crop)} onEditClick={() => setEditingCrop(crop)} onDeleteClick={() => handleDelete(crop.id)} page={isBuyerDashboard ? 'dashboard' : 'all-listings'} /></div>)}</div>
            {totalPages > 1 && (<nav className="d-flex justify-content-center mt-5"><ul className="pagination"><li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}><button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button></li>{[...Array(totalPages).keys()].map(number => (<li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}><button onClick={() => paginate(number + 1)} className="page-link">{number + 1}</button></li>))}<li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}><button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button></li></ul></nav>)}
        </div>
    );
}

export default AllListingsPage;
