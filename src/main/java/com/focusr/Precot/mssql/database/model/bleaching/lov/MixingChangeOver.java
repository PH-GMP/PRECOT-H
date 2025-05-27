package com.focusr.Precot.mssql.database.model.bleaching.lov;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "MIXING",schema=AppConstants.schema)
public class MixingChangeOver {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "MIXING_NUMBER")
	private String mixingNumber;
	
	@Column(name = "MIXING_DESCRIPTION")
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMixingNumber() {
		return mixingNumber;
	}

	public void setMixingNumber(String mixingNumber) {
		this.mixingNumber = mixingNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public MixingChangeOver() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
