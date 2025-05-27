package com.focusr.Precot.mssql.database.model.splunance.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.mssql.database.model.splunance.DailyStoppageReportSpunlaceF008;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "SPUNLACE_STOPPAGE_DETAILS_HISTORY_F008", schema = AppConstants.schema)
public class StoppageDetailsHistoryF008 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "STOPPAGE_DETAILS_ID")
	private Long stoppage_details_id;
	
	@Column(name = "SHIFT")
	private String shift;
	
	@Column(name = "PRODUCT_NAME")
	private String product_name;
	
	@Column(name = "ORDER_NUMBER")
	private String order_number;
	
	@Column(name = "PRODUCT_IN_KG")
	private String product_in_kg;
	
	@Column(name = "LC")
	private String lc;
	
	@Column(name = "STRIP_CLEAN")
	private String strip_clean;
	
	@Column(name = "GR_CLEAN")
	private String gr_clean;
	
	@Column(name = "MIS")
	private String mis;
	
	@Column(name = "OTHERS")
	private String others;
	
	@Column(name = "DOWNTIME_TOTAL")
	private String downtime_total;
	
	@Column(name = "ER")
	private String er;
	
	@Column(name = "MR")
	private String mr;
	
	@Column(name = "BREAKDOWN_TOTAL")
	private String breakdown_total;
	
	@Column(name = "STOPPAGE_ID")
	private Long stoppage_id;

	    @ManyToOne(fetch = FetchType.EAGER)
	    @JoinColumn(name = "STOPPAGE_ID", insertable = false, updatable = false)
	    @JsonIgnore
	    private DailyStoppageReportSpunlaceHistoryF008 dailyStoppageReport;
	public Long getStoppage_details_id() {
		return stoppage_details_id;
	}

	public void setStoppage_details_id(Long stoppage_details_id) {
		this.stoppage_details_id = stoppage_details_id;
	}

	public String getShift() {
		return shift;
	}

	public void setShift(String shift) {
		this.shift = shift;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public String getOrder_number() {
		return order_number;
	}

	public void setOrder_number(String order_number) {
		this.order_number = order_number;
	}

	public String getProduct_in_kg() {
		return product_in_kg;
	}

	public void setProduct_in_kg(String product_in_kg) {
		this.product_in_kg = product_in_kg;
	}

	public String getLc() {
		return lc;
	}

	public void setLc(String lc) {
		this.lc = lc;
	}

	public String getStrip_clean() {
		return strip_clean;
	}

	public void setStrip_clean(String strip_clean) {
		this.strip_clean = strip_clean;
	}

	public String getGr_clean() {
		return gr_clean;
	}

	public void setGr_clean(String gr_clean) {
		this.gr_clean = gr_clean;
	}

	public String getMis() {
		return mis;
	}

	public void setMis(String mis) {
		this.mis = mis;
	}

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public String getDowntime_total() {
		return downtime_total;
	}

	public void setDowntime_total(String downtime_total) {
		this.downtime_total = downtime_total;
	}

	public String getEr() {
		return er;
	}

	public void setEr(String er) {
		this.er = er;
	}

	public String getMr() {
		return mr;
	}

	public void setMr(String mr) {
		this.mr = mr;
	}

	public String getBreakdown_total() {
		return breakdown_total;
	}

	public void setBreakdown_total(String breakdown_total) {
		this.breakdown_total = breakdown_total;
	}

	public Long getStoppage_id() {
		return stoppage_id;
	}

	public void setStoppage_id(Long stoppage_id) {
		this.stoppage_id = stoppage_id;
	}
	


	
//	 @ManyToOne
//	    @JoinColumn(name = "STOPPAGE_ID",  insertable = false, updatable = false)
//	    private DailyStoppageReportSpunlaceF008 dailyStoppageReport;



}
