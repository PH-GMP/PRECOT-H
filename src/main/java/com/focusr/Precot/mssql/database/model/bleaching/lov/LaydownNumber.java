package com.focusr.Precot.mssql.database.model.bleaching.lov;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "LAYDOWN_NUMBER",schema=AppConstants.schema)
public class LaydownNumber {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "LAYDOWN_NUMBER")
	private String layDownNumber;
	
	@Column(name = "LAYDOWN_DESCRIPTION")
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getLayDownNumber() {
		return layDownNumber;
	}

	public void setLayDownNumber(String layDownNumber) {
		this.layDownNumber = layDownNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
}
