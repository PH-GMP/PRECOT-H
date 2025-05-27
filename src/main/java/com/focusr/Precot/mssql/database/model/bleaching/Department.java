package com.focusr.Precot.mssql.database.model.bleaching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name ="DEPARTMENT",schema=AppConstants.schema)
public class Department {
	
	
	@Id
	@Column(name="ID")
	private Long id;
	
	@Column(name="DEPARTMENT")	
	private String department;
	
//	@Column(name="CONTROLLED")
//	private String controlled;
//	
//	@Column(name="UNCONTROLLED")
//	private String unControlled;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

//	public String getControlled() {
//		return controlled;
//	}
//
//	public void setControlled(String controlled) {
//		this.controlled = controlled;
//	}
//
//	public String getUnControlled() {
//		return unControlled;
//	}
//
//	public void setUnControlled(String unControlled) {
//		this.unControlled = unControlled;
//	}
	
	

}
