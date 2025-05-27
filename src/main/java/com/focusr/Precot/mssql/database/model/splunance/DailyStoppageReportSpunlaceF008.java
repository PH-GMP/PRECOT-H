package com.focusr.Precot.mssql.database.model.splunance;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;


@Entity
@Table(name = "SPUNLACE_DAILY_STOPPAGE_DETAILS_F008", schema = AppConstants.schema)
public class DailyStoppageReportSpunlaceF008 extends SpunlaceSaveSumbitSupervisor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "STOPPAGE_ID")
	private Long stoppage_id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "DATE", unique = true)
	private String date;

	@Column(name = "PRODUCT_SUM")
	private String product_sum;

	@Column(name = "LC_SUM")
	private String lc_sum;

	@Column(name = "STRIP_CLEAN_SUM")
	private String strip_clean_sum;

	@Column(name = "GR_CLEAN_SUM")
	private String gr_clean_sum;

	@Column(name = "MIS_SUM")
	private String mis_sum;

	@Column(name = "OTHERS_SUM")
	private String others_sum;

	@Column(name = "DOWNTIME_TOTAL_SUM")
	private String downtime_total_sum;

	@Column(name = "ER_SUM")
	private String er_sum;

	@Column(name = "MR_SUM")
	private String mr_sum;

	@Column(name = "BREAKDOWN_TOTAL_SUM")
	private String breakdown_total_sum;
	//new
	@Column(name = "REASON")
	private String reason;
	
	


//	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "dailyStoppageReport")
//	private List<StoppageDetailsF008> stoppageDetails;
	
//	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH, mappedBy = "dailyStoppageReport")
//    private List<StoppageDetailsF008> stoppageDetails;
	
	 @OneToMany(mappedBy = "dailyStoppageReport", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	    private List<StoppageDetailsF008> stoppageDetails;

	public Long getStoppage_id() {
		return stoppage_id;
	}

	public void setStoppage_id(Long stoppage_id) {
		this.stoppage_id = stoppage_id;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getFormatNo() {
		return formatNo;
	}

	public void setFormatNo(String formatNo) {
		this.formatNo = formatNo;
	}

	public String getFormatName() {
		return formatName;
	}

	public void setFormatName(String formatName) {
		this.formatName = formatName;
	}

	public String getSopNumber() {
		return sopNumber;
	}

	public void setSopNumber(String sopNumber) {
		this.sopNumber = sopNumber;
	}

	public String getRevisionNo() {
		return revisionNo;
	}

	public void setRevisionNo(String revisionNo) {
		this.revisionNo = revisionNo;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getProduct_sum() {
		return product_sum;
	}

	public void setProduct_sum(String product_sum) {
		this.product_sum = product_sum;
	}

	public String getLc_sum() {
		return lc_sum;
	}

	public void setLc_sum(String lc_sum) {
		this.lc_sum = lc_sum;
	}

	public String getStrip_clean_sum() {
		return strip_clean_sum;
	}

	public void setStrip_clean_sum(String strip_clean_sum) {
		this.strip_clean_sum = strip_clean_sum;
	}

	public String getGr_clean_sum() {
		return gr_clean_sum;
	}

	public void setGr_clean_sum(String gr_clean_sum) {
		this.gr_clean_sum = gr_clean_sum;
	}

	public String getMis_sum() {
		return mis_sum;
	}

	public void setMis_sum(String mis_sum) {
		this.mis_sum = mis_sum;
	}

	public String getOthers_sum() {
		return others_sum;
	}

	public void setOthers_sum(String others_sum) {
		this.others_sum = others_sum;
	}

	public String getDowntime_total_sum() {
		return downtime_total_sum;
	}

	public void setDowntime_total_sum(String downtime_total_sum) {
		this.downtime_total_sum = downtime_total_sum;
	}

	public String getEr_sum() {
		return er_sum;
	}

	public void setEr_sum(String er_sum) {
		this.er_sum = er_sum;
	}

	public String getMr_sum() {
		return mr_sum;
	}

	public void setMr_sum(String mr_sum) {
		this.mr_sum = mr_sum;
	}

	public String getBreakdown_total_sum() {
		return breakdown_total_sum;
	}

	public void setBreakdown_total_sum(String breakdown_total_sum) {
		this.breakdown_total_sum = breakdown_total_sum;
	}

	public List<StoppageDetailsF008> getStoppageDetails() {
		return stoppageDetails;
	}

	public void setStoppageDetails(List<StoppageDetailsF008> stoppageDetails) {
		this.stoppageDetails = stoppageDetails;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

}
