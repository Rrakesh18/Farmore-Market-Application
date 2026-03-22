package com.farmore.market.service;

import com.farmore.market.model.Crop;
import com.farmore.market.model.User;
import com.farmore.market.repository.CropRepository;
import com.farmore.market.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CropServiceImpl implements CropService {

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Crop createCrop(Map<String, Object> payload) {
        Long farmerId = Long.parseLong(payload.get("farmerId").toString());

        User farmer = userRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Crop crop = new Crop();
        crop.setCropName((String) payload.get("cropName"));
        crop.setPrice(Double.parseDouble(payload.get("price").toString()));
        crop.setQuantity(Double.parseDouble(payload.get("quantity").toString()));
        crop.setLocation((String) payload.get("location"));
        crop.setLandType((String) payload.get("landType"));
        crop.setFertilizersUsed((String) payload.get("fertilizersUsed"));
        crop.setImageUrl((String) payload.get("imageUrl"));

        // ✅ Set full User entity, not just ID
        crop.setFarmer(farmer);

        return cropRepository.save(crop);
    }

    @Override
    public List<Crop> getAllCrops() {
        return cropRepository.findAll(); // or use custom query if needed
    }

    @Override
    public List<Crop> getCropsByFarmer(Long farmerId) {
        return cropRepository.findByFarmerId(farmerId); // assumes this method exists
    }

    @Override
    public Optional<Crop> updateCrop(Long cropId, Map<String, Object> payload) {
        return cropRepository.findById(cropId).map(existingCrop -> {
            if (payload.containsKey("cropName")) {
                existingCrop.setCropName((String) payload.get("cropName"));
            }
            if (payload.containsKey("price")) {
                existingCrop.setPrice(Double.parseDouble(payload.get("price").toString()));
            }
            if (payload.containsKey("quantity")) {
                existingCrop.setQuantity(Double.parseDouble(payload.get("quantity").toString()));
            }
            if (payload.containsKey("imageUrl")) {
                existingCrop.setImageUrl((String) payload.get("imageUrl"));
            }
            if (payload.containsKey("location")) {
                existingCrop.setLocation((String) payload.get("location"));
            }
            if (payload.containsKey("landType")) {
                existingCrop.setLandType((String) payload.get("landType"));
            }
            if (payload.containsKey("fertilizersUsed")) {
                existingCrop.setFertilizersUsed((String) payload.get("fertilizersUsed"));
            }
            return cropRepository.save(existingCrop);
        });
    }

    @Override
    public void deleteCrop(Long cropId) {
        cropRepository.deleteById(cropId);
    }
}
