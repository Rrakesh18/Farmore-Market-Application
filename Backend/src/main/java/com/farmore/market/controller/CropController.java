package com.farmore.market.controller;
import com.farmore.market.model.Crop;
import com.farmore.market.service.CropService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/crops")
@CrossOrigin(origins = "*")
public class CropController {
    @Autowired private CropService cropService;

    @PostMapping
    public ResponseEntity<Crop> createCrop(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(cropService.createCrop(payload));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Crop>> getAllCrops() {
        return ResponseEntity.ok(cropService.getAllCrops());
    }
    
    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<Crop>> getCropsByFarmer(@PathVariable Long farmerId) { return ResponseEntity.ok(cropService.getCropsByFarmer(farmerId)); }
    
    @PutMapping("/{id}")
    public ResponseEntity<Crop> updateCrop(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        return cropService.updateCrop(id, payload)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable Long id) {
        cropService.deleteCrop(id);
        return ResponseEntity.noContent().build();
    }
}