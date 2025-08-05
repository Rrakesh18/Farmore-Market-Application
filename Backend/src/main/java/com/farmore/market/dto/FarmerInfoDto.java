package com.farmore.market.dto;

public class FarmerInfoDto 
{
	
	    private String name;
	    private String email;
	    private String village;

	    // Constructors
	    public FarmerInfoDto() {
	    }

	    public FarmerInfoDto(String name, String email, String village) {
	        this.name = name;
	        this.email = email;
	        this.village = village;
	    }

	    // Getters and Setters
	    public String getName() { return name; }
	    public void setName(String name) { this.name = name; }
	    public String getEmail() { return email; }
	    public void setEmail(String email) { this.email = email; }
	    public String getVillage() { return village; }
	    public void setVillage(String village) { this.village = village; }
	
	

}
