package com.farmore.market.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "crops")
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cropName;
    private Double price;
    private Double quantity;
    private String location;
    private String landType;
    private String fertilizersUsed;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    @JsonIgnoreProperties({"crops"})
    private Farmer farmer;

    
    public Crop() {}

    

    public Long getId() { return id; }

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

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Farmer getFarmer() { return farmer; }
    public void setFarmer(Farmer farmer) { this.farmer = farmer; }
}
