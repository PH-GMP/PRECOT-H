package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "SPUNLACE_DAILY_PRODUCTION_REPORT_DETAILS_F006", schema = AppConstants.schema)
public class DailyProductionDetailsF006 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DETAIL_ID")
	private Long detailId;
	
	@Column(name = "SHAFT_NO")
	private String shaftNo;
	
	@Column(name = "ROLL_NO")
	private String rollNo;
	
	@Column(name = "LENGTH")
	private String length;
	
	@Column(name = "WIDTH")
	private String width;
	
	@Column(name = "NET_WT")
	private String netWt;
	
	@Column(name = "ROLL_GSM")
	private String rollGsm;
	
	@Column(name = "MOISTURE")
	private String moisture;
	
	@Column(name = "ROLL_DIA")
	private String rollDia;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "REPORT_ID")
	private Long reportId;

	public DailyProductionDetailsF006() {
		super();
	}

	public DailyProductionDetailsF006(Long detailId, String shaftNo, String rollNo, String length, String width,
			String netWt, String rollGsm, String moisture, String rollDia, String remarks, Long reportId) {
		super();
		this.detailId = detailId;
		this.shaftNo = shaftNo;
		this.rollNo = rollNo;
		this.length = length;
		this.width = width;
		this.netWt = netWt;
		this.rollGsm = rollGsm;
		this.moisture = moisture;
		this.rollDia = rollDia;
		this.remarks = remarks;
		this.reportId = reportId;
	}

	public Long getDetailId() {
		return detailId;
	}

	public void setDetailId(Long detailId) {
		this.detailId = detailId;
	}

	public String getShaftNo() {
		return shaftNo;
	}

	public void setShaftNo(String shaftNo) {
		this.shaftNo = shaftNo;
	}

	public String getRollNo() {
		return rollNo;
	}

	public void setRollNo(String rollNo) {
		this.rollNo = rollNo;
	}

	public String getLength() {
		return length;
	}

	public void setLength(String length) {
		this.length = length;
	}

	public String getWidth() {
		return width;
	}

	public void setWidth(String width) {
		this.width = width;
	}

	public String getNetWt() {
		return netWt;
	}

	public void setNetWt(String netWt) {
		this.netWt = netWt;
	}

	public String getRollGsm() {
		return rollGsm;
	}

	public void setRollGsm(String rollGsm) {
		this.rollGsm = rollGsm;
	}

	public String getMoisture() {
		return moisture;
	}

	public void setMoisture(String moisture) {
		this.moisture = moisture;
	}

	public String getRollDia() {
		return rollDia;
	}

	public void setRollDia(String rollDia) {
		this.rollDia = rollDia;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Long getReportId() {
		return reportId;
	}

	public void setReportId(Long reportId) {
		this.reportId = reportId;
	}

	@Override
	public String toString() {
		return "DailyProductionDetailsF006 [detailId=" + detailId + ", shaftNo=" + shaftNo + ", rollNo=" + rollNo
				+ ", length=" + length + ", width=" + width + ", netWt=" + netWt + ", rollGsm=" + rollGsm
				+ ", moisture=" + moisture + ", rollDia=" + rollDia + ", remarks=" + remarks + ", reportId=" + reportId
				+ "]";
	}

}
