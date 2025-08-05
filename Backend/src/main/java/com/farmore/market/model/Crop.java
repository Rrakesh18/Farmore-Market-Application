package com.farmore.market.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="crops")
public class Crop 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private Long id;
	@Column(nullable=false)
	private String cropName;
	@Column(nullable=false)
	private Double price;
	@Column(nullable=false)
	private Double quantity;
	@Column(nullable=false)
	private String location;
	@Column(nullable=false)
	private String landType;
	@Column(nullable=false)
	private String fertilizersUsed;
	
	@ManyToOne(fetch= FetchType.LAZY)
	@JoinColumn(name="farmer_id",nullable=false)
	@JsonBackReference
	 @JsonProperty("farmerInfo")
	private User farmer;

	@Override
	public String toString() {
		return "Crop [id=" + id + ", cropName=" + cropName + ", price=" + price + ", quantity=" + quantity
				+ ", location=" + location + ", landType=" + landType + ", fertilizersUsed=" + fertilizersUsed
				+ ", farmer=" + farmer + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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
		this.location = location;
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

	public User getFarmer() {
		return farmer;
	}

	public void setFarmer(User farmer) {
		this.farmer = farmer;
	}
	
}
