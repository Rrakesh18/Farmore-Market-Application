package com.farmore.market.dto;

public class CropDto {
    private String cropName;
    private Double price;
    private Double quantity;
    private String location;
    private String landType;
    private String fertilizersUsed;
    private Long farmerId;

    // Getters and Setters
    public String getCropName() {
        return cropName;
    }

    public void setCropName(String cropName) {
        this.cropName = cropName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location; // Corrected this line
    }

    public String getLandType() {
        return landType;
    }

    public void setLandType(String landType) {
        this.landType = landType;
    }

    public String getFertilizersUsed() {
        return fertilizersUsed;
    }
    
    public void setFertilizersUsed(String fertilizersUsed) {
        this.fertilizersUsed = fertilizersUsed;
    }
    
    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }
    
    @Override
    public String toString() {
        return "CropDto{" +
                "cropName='" + cropName + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", location='" + location + '\'' +
                ", landType='" + landType + '\'' +
                ", fertilizersUsed='" + fertilizersUsed + '\'' +
                ", farmerId=" + farmerId +
                '}';
    }
}