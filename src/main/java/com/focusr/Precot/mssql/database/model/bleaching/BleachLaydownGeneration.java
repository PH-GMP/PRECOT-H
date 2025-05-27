package com.focusr.Precot.mssql.database.model.bleaching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_LAYDOWN_GENERATION_D01",schema=AppConstants.schema)
public class BleachLaydownGeneration extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "BLEACH_LAYDOWN_NUMBER")
	private String bleach_laydown_no;

	@Column(name = "STATUS")
	private String status;

	@Column(name = "DEPARTMENT_ID")
	private Long department_id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBleach_laydown_no() {
		return bleach_laydown_no;
	}

	public void setBleach_laydown_no(String bleach_laydown_no) {
		this.bleach_laydown_no = bleach_laydown_no;
	}

	public Long getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(Long department_id) {
		this.department_id = department_id;
	}

	public BleachLaydownGeneration() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
