package com.focusr.Precot.mssql.database.model.bleaching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
//@Table(name = "BLEACH_BMR_LAYDOWN_MAPPING")

@Table(name = "BLEACH_BMR_LAYDOWN_MAPPING", schema=AppConstants.schema,uniqueConstraints = {
		@UniqueConstraint(columnNames = { "BMR_NO", "LAYDOWN_NO" }) })

public class BleachBmrLaydownMapping extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "BMR_NO")
	private String bmr_no;

	@Column(name = "LAYDOWN_NO")
	private String laydown_no;

	@Column(name = "STATUS")
	private String status;

	@Column(name = "JOB_ORDER_NO")
	private String job_order_no;

	@Column(name = "DEPARTMENT_ID")
	private Long department_id;

	@Column(name = "START_DATE")
	private String startDate;

	@Column(name = "END_DATE")
	private String endDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBmr_no() {
		return bmr_no;
	}

	public void setBmr_no(String bmr_no) {
		this.bmr_no = bmr_no;
	}

	public String getLaydown_no() {
		return laydown_no;
	}

	public void setLaydown_no(String laydown_no) {
		this.laydown_no = laydown_no;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getJob_order_no() {
		return job_order_no;
	}

	public void setJob_order_no(String job_order_no) {
		this.job_order_no = job_order_no;
	}

	public Long getDepartment_id() {
		return department_id;
	}

	public void setDepartment_id(Long department_id) {
		this.department_id = department_id;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

}
