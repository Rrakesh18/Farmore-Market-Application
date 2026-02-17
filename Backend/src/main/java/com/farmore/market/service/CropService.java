package com.farmore.market.service;

import com.farmore.market.model.Crop;
import java.util.List;

public interface CropService {
    Crop createCrop(Crop crop);
    Crop updateCrop(Long cropId, Crop cropDetails);
    void deleteCrop(Long cropId);
    List<Crop> getCropsByFarmer(Long farmerId);
    List<Crop> getAllCrops();
}
