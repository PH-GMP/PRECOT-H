package com.focusr.Precot.mssql.database.model.bleaching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name ="BLEACH_ALL_FORMATS",schema=AppConstants.schema)
public class BleachSummaryReport {
	
	@Id
	@Column(name="ID")
	private Long id;
	
	@Column(name="CONTROLLED_DESCRIPTION")	
	private String controlled;
	
	@Column(name="FORMAT")
	private String format;

	@Column(name ="DEPARTMENT_ID")
	private Long departmentId;
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getControlled() {
		return controlled;
	}

	public void setControlled(String controlled) {
		this.controlled = controlled;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public Long getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}
	
	

	
}
