package com.farmore.market.service;

import java.util.List;

import com.farmore.market.dto.CropDto;
import com.farmore.market.dto.CropListingDto;
import com.farmore.market.model.Crop;

public interface CropService {

	Crop createCrop(CropDto cropdto);

	

	
	List<Crop> getCropsByFarmer(Long farmerId);



	List<CropListingDto> getAllCropsForListing();

}
