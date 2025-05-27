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

//@Entity
//@Table(name = "BLEACH_BMR_COMPLETION_TABLE",schema=AppConstants.schema)
@Entity
@Table(name = "BLEACH_BMR_COMPLETION_TABLE", schema=AppConstants.schema,uniqueConstraints = {@UniqueConstraint(columnNames = {"BMR_NO", "FORM"})})
public class BleachBmrCompletionTable extends UserDateAudit
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
	private Long id;
	
	@Column(name = "FORM")
	private String form;
	
	@Column(name = "QA_NAME")
	private String qaName;
	
	@Column(name = "QA_ID")
	private Long qaId;
	
	@Column(name = "HOD_NAME")
	private String hodName;
	
	@Column(name = "HOD_ID")
	private Long hodId;
	
	@Column(name = "SUPERVISOR_NAME")
	private String supervisorName;
	
	@Column(name = "SUPERVISOR_ID")
	private Long supervisorId;
	
	@Column(name = "BMR_NO")
	private String bmrNo;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "STORE")
	private String store;

	@Column(name = "SHOPPAGE_DATE")
	private String shoppageDate;
	
	@Column(name = "SHOPPAGE_DATE2")
	private String shoppageDate2;
	
	@Column(name = "STATUS")
	private String status;
	
	
	
	public BleachBmrCompletionTable() {
		super();
	}

	public BleachBmrCompletionTable(Long id, String form, String qaName, Long qaId, String hodName, Long hodId,
			String supervisorName, Long supervisorId, String bmrNo, String date, String store) {
		super();
		this.id = id;
		this.form = form;
		this.qaName = qaName;
		this.qaId = qaId;
		this.hodName = hodName;
		this.hodId = hodId;
		this.supervisorName = supervisorName;
		this.supervisorId = supervisorId;
		this.bmrNo = bmrNo;
		this.date = date;
		this.store = store;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getForm() {
		return form;
	}

	public void setForm(String form) {
		this.form = form;
	}

	public String getQaName() {
		return qaName;
	}

	public void setQaName(String qaName) {
		this.qaName = qaName;
	}

	public String getHodName() {
		return hodName;
	}

	public void setHodName(String hodName) {
		this.hodName = hodName;
	}

	public String getSupervisorName() {
		return supervisorName;
	}

	public void setSupervisorName(String supervisorName) {
		this.supervisorName = supervisorName;
	}

	public Long getQaId() {
		return qaId;
	}

	public void setQaId(Long qaId) {
		this.qaId = qaId;
	}

	public Long getHodId() {
		return hodId;
	}

	public void setHodId(Long hodId) {
		this.hodId = hodId;
	}

	public Long getSupervisorId() {
		return supervisorId;
	}

	public void setSupervisorId(Long supervisorId) {
		this.supervisorId = supervisorId;
	}

	public String getBmrNo() {
		return bmrNo;
	}

	public void setBmrNo(String bmrNo) {
		this.bmrNo = bmrNo;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getStore() {
		return store;
	}

	public void setStore(String store) {
		this.store = store;
	}


	public String getShoppageDate() {
		return shoppageDate;
	}

	public void setShoppageDate(String shoppageDate) {
		this.shoppageDate = shoppageDate;
	}

	public String getShift() {
		return shift;
	}

	public void setShift(String shift) {
		this.shift = shift;
	}

	public String getShoppageDate2() {
		return shoppageDate2;
	}

	public void setShoppageDate2(String shoppageDate2) {
		this.shoppageDate2 = shoppageDate2;
	}
	
	@Override
	public String toString() {
		return "BleachBmrCompletionTable [id=" + id + ", form=" + form + ", qaName=" + qaName + ", qaId=" + qaId
				+ ", hodName=" + hodName + ", hodId=" + hodId + ", supervisorName=" + supervisorName + ", supervisorId="
				+ supervisorId + ", bmrNo=" + bmrNo + ", date=" + date + ", store=" + store + "]";
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}
