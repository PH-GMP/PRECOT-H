package com.focusr.Precot.mssql.database.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "STOPPAGE_DETAILS",schema=AppConstants.schema)
public class Stoppage {
	
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CID")
	private Long cid;

	@Column(name = "PACK_DT")
	private String pack_dt;
	
	@Column(name = "PACK_YEAR")
	private String pack_year;

	@Column(name = "SHIFT_ID")
	private String shift_id;

	@Column(name = "MCN")
	private String mcn;

	@Column(name = "F_TIME")
	private String f_time;

	@Column(name = "T_TIME")
	private String t_time;

	@Column(name = "S_CAUSE")
	private String s_cause;

	@Column(name = "S_REMARKS")
	private String s_remarks;

	@Column(name = "TOT_HRS")
	private String tot_hrs;

	@Column(name = "IS_CONFIRM")
	private String is_confirm;
	
	@Column(name = "IS_SAP_UPLOADED")
	private String is_sap_uploaded;
	
	@Column(name = "SAP_UON")
	private String sap_uon;
	
	@Column(name = "IS_SAPZUPLOAD")
	private String is_sapzupload;
	
	@Column(name = "SAPZU_ON")
	private String sapzu_on;
	
	@Column(name = "CONFIRMED_ON")
	private String confirmed_on;
	
	@Column(name = "MODIFIED_ON")
	private String modified_on;

	public Long getCid() {
		return cid;
	}

	public void setCid(Long cid) {
		this.cid = cid;
	}

	public String getPack_year() {
		return pack_year;
	}

	public void setPack_year(String pack_year) {
		this.pack_year = pack_year;
	}

	public String getShift_id() {
		return shift_id;
	}

	public void setShift_id(String shift_id) {
		this.shift_id = shift_id;
	}

	public String getMcn() {
		return mcn;
	}

	public void setMcn(String mcn) {
		this.mcn = mcn;
	}

	public String getF_time() {
		return f_time;
	}

	public void setF_time(String f_time) {
		this.f_time = f_time;
	}

	public String getT_time() {
		return t_time;
	}

	public void setT_time(String t_time) {
		this.t_time = t_time;
	}

	public String getS_cause() {
		return s_cause;
	}

	public void setS_cause(String s_cause) {
		this.s_cause = s_cause;
	}

	public String getS_remarks() {
		return s_remarks;
	}

	public void setS_remarks(String s_remarks) {
		this.s_remarks = s_remarks;
	}

	public String getTot_hrs() {
		return tot_hrs;
	}

	public void setTot_hrs(String tot_hrs) {
		this.tot_hrs = tot_hrs;
	}

	public String getIs_confirm() {
		return is_confirm;
	}

	public void setIs_confirm(String is_confirm) {
		this.is_confirm = is_confirm;
	}

	public String getIs_sap_uploaded() {
		return is_sap_uploaded;
	}

	public void setIs_sap_uploaded(String is_sap_uploaded) {
		this.is_sap_uploaded = is_sap_uploaded;
	}

	public String getSap_uon() {
		return sap_uon;
	}

	public void setSap_uon(String sap_uon) {
		this.sap_uon = sap_uon;
	}

	public String getIs_sapzupload() {
		return is_sapzupload;
	}

	public void setIs_sapzupload(String is_sapzupload) {
		this.is_sapzupload = is_sapzupload;
	}

	public String getSapzu_on() {
		return sapzu_on;
	}

	public void setSapzu_on(String sapzu_on) {
		this.sapzu_on = sapzu_on;
	}

	public String getConfirmed_on() {
		return confirmed_on;
	}

	public void setConfirmed_on(String confirmed_on) {
		this.confirmed_on = confirmed_on;
	}

	public String getModified_on() {
		return modified_on;
	}

	public void setModified_on(String modified_on) {
		this.modified_on = modified_on;
	}

	public String getPack_dt() {
		return pack_dt;
	}

	public void setPack_dt(String pack_dt) {
		this.pack_dt = pack_dt;
	}


	
}
