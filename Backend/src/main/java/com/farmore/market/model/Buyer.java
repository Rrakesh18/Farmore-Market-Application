package com.farmore.market.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "buyers")
@DiscriminatorValue("buyer")
public class Buyer extends User {

    private String companyName;
    private String businessType;
    private String shippingAddress;

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getBusinessType() { return businessType; }
    public void setBusinessType(String businessType) { this.businessType = businessType; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
	@Override
	protected String getRole() {
		// TODO Auto-generated method stub
		return null;
	}
	
		
		
	
}
