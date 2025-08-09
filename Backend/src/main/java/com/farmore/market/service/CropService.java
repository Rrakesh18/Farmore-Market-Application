package com.farmore.market.service;
import com.farmore.market.model.Crop;
import java.util.List;
import java.util.Map;
import java.util.Optional;
public interface CropService {
    Crop createCrop(Map<String, Object> payload);
    List<Crop> getCropsByFarmer(Long farmerId);
    List<Crop> getAllCrops();
    Optional<Crop> updateCrop(Long cropId, Map<String, Object> payload);
    void deleteCrop(Long cropId);
}
