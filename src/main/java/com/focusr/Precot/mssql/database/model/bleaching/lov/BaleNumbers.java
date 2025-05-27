package com.focusr.Precot.mssql.database.model.bleaching.lov;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BALE_NUMBERS",schema=AppConstants.schema)
public class BaleNumbers {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "BALE_NUMBER")
	private String baleNumber;
	
	@Column(name = "BALE_DESCRIPTION")
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBaleNumber() {
		return baleNumber;
	}

	public void setBaleNumber(String baleNumber) {
		this.baleNumber = baleNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BaleNumbers() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
