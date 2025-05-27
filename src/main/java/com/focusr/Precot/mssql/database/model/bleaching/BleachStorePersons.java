package com.focusr.Precot.mssql.database.model.bleaching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_STORE_PERSONS",schema=AppConstants.schema)
public class BleachStorePersons {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
	private Long id;
	
	@Column(name = "DEPARTMENT_NAME")
	private String departmentName;
	
	@Column(name = "NAME")
	private String name;
	
	@Column(name = "IS_ACTIVE")
	private String isActive;
	
	@Column(name = "ROLE")
	private String role;

	public BleachStorePersons() {
		super();
	}

	public BleachStorePersons(Long id, String departmentName, String name, String isActive, String role) {
		super();
		this.id = id;
		this.departmentName = departmentName;
		this.name = name;
		this.isActive = isActive;
		this.role = role;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIsActive() {
		return isActive;
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "BleachStorePersons [id=" + id + ", departmentName=" + departmentName + ", name=" + name + ", isActive="
				+ isActive + ", role=" + role + "]";
	}
	
	

}
