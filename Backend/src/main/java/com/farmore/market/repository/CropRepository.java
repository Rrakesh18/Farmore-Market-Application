package com.farmore.market.repository;

import com.farmore.market.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // Import Query
import java.util.List;

public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findByFarmerId(Long farmerId);

    // This custom query fetches all crops and their associated farmer in a single database call
    // This is the most efficient way to solve the "Farmer: Unknown" problem without DTOs
    @Query("SELECT c FROM Crop c JOIN FETCH c.farmer")
    List<Crop> findAllCropsWithFarmer();
}
