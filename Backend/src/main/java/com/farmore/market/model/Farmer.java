package com.farmore.market.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "farmers")
@DiscriminatorValue("farmer")
public  class Farmer extends User {

    private Double landSize;
    private Integer experienceYears;

    @OneToMany(mappedBy = "farmer", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("farmer")
    private Set<Crop> crops;

    public Double getLandSize() { return landSize; }
    public void setLandSize(Double landSize) { this.landSize = landSize; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public Set<Crop> getCrops() { return crops; }
    public void setCrops(Set<Crop> crops) { this.crops = crops; }
	@Override
	protected String getRole() {
		
		return null;
	}
}
