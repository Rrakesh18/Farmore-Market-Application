package com.farmore.market.repository;
import com.farmore.market.model.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findByFarmerId(Long farmerId);
    @Query("SELECT c FROM Crop c JOIN FETCH c.farmer")
    List<Crop> findAllCropsWithFarmer();
}