package com.farmore.market.dto;

public class CropListingDto 
{

	private Long id;
    private String cropName;
    private Double price;
    private Double quantity;
    private String location;
    private String landType;
    private String fertilizersUsed;
    private FarmerInfoDto farmerInfo; // Nested object for farmer details

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getLandType() { return landType; }
    public void setLandType(String landType) { this.landType = landType; }
    public String getFertilizersUsed() { return fertilizersUsed; }
    public void setFertilizersUsed(String fertilizersUsed) { this.fertilizersUsed = fertilizersUsed; }
    public FarmerInfoDto getFarmerInfo() { return farmerInfo; }
    public void setFarmerInfo(FarmerInfoDto farmerInfo) { this.farmerInfo = farmerInfo; }

}
