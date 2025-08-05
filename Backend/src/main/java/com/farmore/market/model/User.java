package com.farmore.market.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;



@Entity
@Table(name="users")
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private Long id;
	@Column(nullable=false,length=100)
	private String name;
	@Column(nullable=false,unique=true,length=100)
	private String email;
	@Column(nullable=false)
	private String password;
	@Column(nullable=false)
	private String village;
	@Column(nullable=false,length=10)
	private String role;
	
	
	@OneToMany(mappedBy="farmer",cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	
	@JsonManagedReference
	private Set<Crop>crops;
	public User() 
	{
		
		
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", village="
				+ village + ", role=" + role + ", crops=" + crops + "]";
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getVillage() {
		return village;
	}
	public void setVillage(String village) {
		this.village = village;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Set<Crop> getCrops() {
		return crops;
	}
	public void setCrops(Set<Crop> crops) {
		this.crops = crops;
	}

}
