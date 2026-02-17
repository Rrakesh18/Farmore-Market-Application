package com.farmore.market.service;

import com.farmore.market.model.Crop;
import com.farmore.market.model.Farmer;
import com.farmore.market.model.User;
import com.farmore.market.repository.CropRepository;
import com.farmore.market.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CropServiceImpl implements CropService {

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Crop createCrop(Crop crop) {

        Long farmerId = crop.getFarmer().getId();

        User user = userRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        if (!(user instanceof Farmer)) {
            throw new RuntimeException("User is not a farmer");
        }

        crop.setFarmer((Farmer) user);

        return cropRepository.save(crop);
    }

    @Override
    public Crop updateCrop(Long cropId, Crop cropDetails) {

        Crop cropToUpdate = cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        Long farmerId = cropDetails.getFarmer().getId();

        User user = userRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        if (!(user instanceof Farmer)) {
            throw new RuntimeException("User is not a farmer");
        }

        cropToUpdate.setCropName(cropDetails.getCropName());
        cropToUpdate.setPrice(cropDetails.getPrice());
        cropToUpdate.setQuantity(cropDetails.getQuantity());
        cropToUpdate.setLocation(cropDetails.getLocation());
        cropToUpdate.setLandType(cropDetails.getLandType());
        cropToUpdate.setFertilizersUsed(cropDetails.getFertilizersUsed());
        cropToUpdate.setImageUrl(cropDetails.getImageUrl());
        cropToUpdate.setFarmer((Farmer) user);

        return cropRepository.save(cropToUpdate);
    }

    @Override
    public void deleteCrop(Long cropId) {
        if (!cropRepository.existsById(cropId)) {
            throw new RuntimeException("Crop not found");
        }
        cropRepository.deleteById(cropId);
    }

    @Override
    public List<Crop> getCropsByFarmer(Long farmerId) {
        return cropRepository.findByFarmerIdWithFarmer(farmerId);
    }

    @Override
    public List<Crop> getAllCrops() {
        return cropRepository.findAllCropsWithFarmer();
    }
}
