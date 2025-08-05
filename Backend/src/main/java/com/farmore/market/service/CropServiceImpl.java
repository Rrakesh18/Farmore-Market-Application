package com.farmore.market.service;

import com.farmore.market.dto.CropDto;
import com.farmore.market.dto.CropListingDto;
import com.farmore.market.dto.FarmerInfoDto;
import com.farmore.market.model.Crop;
import com.farmore.market.model.User;
import com.farmore.market.repository.CropRepository;
import com.farmore.market.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CropServiceImpl implements CropService {

    @Autowired
    private CropRepository croprepository;

    @Autowired
    private UserRepository userrepository;

    @Override
    public Crop createCrop(CropDto cropdto) {
        User farmer = userrepository.findById(cropdto.getFarmerId())
                .orElseThrow(() -> new RuntimeException("Farmer not found with id: " + cropdto.getFarmerId()));

        Crop crop = new Crop();
        crop.setCropName(cropdto.getCropName());
        crop.setPrice(cropdto.getPrice());
        crop.setQuantity(cropdto.getQuantity());
        crop.setLocation(cropdto.getLocation());
        crop.setLandType(cropdto.getLandType());
        crop.setFertilizersUsed(cropdto.getFertilizersUsed());
        crop.setFarmer(farmer);

        return croprepository.save(crop);
    }

    @Override
    public List<Crop> getCropsByFarmer(Long farmerId) {
        return croprepository.findByFarmerId(farmerId);
    }

    @Override
    public List<CropListingDto> getAllCropsForListing() {
        return croprepository.findAll().stream()
                .map(this::convertToCropListingDto)
                .collect(Collectors.toList());
    }

    // Helper method to convert a Crop entity to a CropListingDto
    private CropListingDto convertToCropListingDto(Crop crop) {
        CropListingDto dto = new CropListingDto();
        dto.setId(crop.getId());
        dto.setCropName(crop.getCropName());
        dto.setPrice(crop.getPrice());
        dto.setQuantity(crop.getQuantity());
        dto.setLocation(crop.getLocation());
        dto.setLandType(crop.getLandType());
        dto.setFertilizersUsed(crop.getFertilizersUsed());
        
        if (crop.getFarmer() != null) {
            User farmer = crop.getFarmer();
            dto.setFarmerInfo(new FarmerInfoDto(farmer.getName(), farmer.getEmail(), farmer.getVillage()));
        }
        
        return dto;
    }
}
