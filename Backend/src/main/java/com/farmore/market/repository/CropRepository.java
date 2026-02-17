package com.farmore.market.repository;

import com.farmore.market.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    
    @Query("SELECT c FROM Crop c JOIN FETCH c.farmer")
    List<Crop> findAllCropsWithFarmer();

    @Query("SELECT c FROM Crop c JOIN FETCH c.farmer WHERE c.farmer.id = :farmerId")
    List<Crop> findByFarmerIdWithFarmer(Long farmerId);
}
