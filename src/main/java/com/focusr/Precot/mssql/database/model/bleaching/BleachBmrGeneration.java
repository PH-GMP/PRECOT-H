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
@Table(name = "BLEACHING_BMR_GENERATION_D01",schema=AppConstants.schema)
public class BleachBmrGeneration  extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "BLEACH_BMR_NO")
	private String bleach_bmr_no;

	@Column(name = "STATUS")
	private String STATUS;

	@Column(name = "DEPARTMENT_ID")
	private Long department_id;
	
	@Column(name = "GENERATED_DATE")
	private String genDate;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBleach_bmr_no() {
		return bleach_bmr_no;
	}

	public void setBleach_bmr_no(String bleach_bmr_no) {
		this.bleach_bmr_no = bleach_bmr_no;
	}

	public String getSTATUS() {
		return STATUS;
	}

	public void setSTATUS(String sTATUS) {
		STATUS = sTATUS;
	}

	public Long getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(Long department_id) {
		this.department_id = department_id;
	}

	public String getGenDate() {
		return genDate;
	}

	public void setGenDate(String genDate) {
		this.genDate = genDate;
	}
	
}
