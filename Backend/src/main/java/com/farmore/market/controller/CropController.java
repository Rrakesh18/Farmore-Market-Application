package com.farmore.market.controller;

import com.farmore.market.dto.CropDto;
import com.farmore.market.dto.CropListingDto;
import com.farmore.market.model.Crop;
import com.farmore.market.service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "*")
public class CropController {

    @Autowired
    private CropService cropService;

    @PostMapping
    public ResponseEntity<?> createCrop(@RequestBody CropDto cropDto) {
        try {
            Crop savedCrop = cropService.createCrop(cropDto);
            return new ResponseEntity<>(savedCrop, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<Crop>> getCropsByFarmer(@PathVariable Long farmerId) {
        List<Crop> crops = cropService.getCropsByFarmer(farmerId);
        return ResponseEntity.ok(crops);
    }

    @GetMapping("/all")
    public ResponseEntity<List<CropListingDto>> getAllCrops() {
        List<CropListingDto> crops = cropService.getAllCropsForListing();
        return ResponseEntity.ok(crops);
    }
}