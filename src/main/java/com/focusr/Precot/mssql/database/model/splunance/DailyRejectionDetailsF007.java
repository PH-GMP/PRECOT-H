//package com.focusr.Precot.mssql.database.model.splunance;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//
//import com.focusr.Precot.util.AppConstants;
//
//@Entity
//@Table(name = "SPUNLACE_DAILY_REJECTION_REPORT_DETAILS_F007",schema=AppConstants.schema)
//public class DailyRejectionDetailsF007 {
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "DETAIL_ID")
//	private Long detailId;
//	
//	@Column(name = "PRODUCT_NAME")
//	private String productName;
//	
//	@Column(name = "PATTERN")
//	private String pattern;
//	
//	@Column(name = "ORDER_NO")
//	private String orderNo;
//	
//	@Column(name = "SHAFT_NO")
//	private String shaftNo;
//	
//	@Column(name = "ROLL_NO")
//	private String rollNo;
//	
//	@Column(name = "LENGTH")
//	private String length;
//	
//	@Column(name = "NET_WT")
//	private String netWt;
//	
//	@Column(name = "ROLL_GSM")
//	private String rollGsm;
//	
//	@Column(name = "MOISTURE")
//	private String moisture;
//	
//	@Column(name = "ROLL_DIA")
//	private String rollDia;
//	
//	@Column(name = "REPORT_ID")
//	private Long reportId;
//
//	public DailyRejectionDetailsF007() {
//		super();
//	}
//
//	public DailyRejectionDetailsF007(Long detailId, String productName, String pattern, String orderNo, String shaftNo,
//			String rollNo, String length, String netWt, String rollGsm, String moisture, String rollDia) {
//		super();
//		this.detailId = detailId;
//		this.productName = productName;
//		this.pattern = pattern;
//		this.orderNo = orderNo;
//		this.shaftNo = shaftNo;
//		this.rollNo = rollNo;
//		this.length = length;
//		this.netWt = netWt;
//		this.rollGsm = rollGsm;
//		this.moisture = moisture;
//		this.rollDia = rollDia;
//	}
//
//	public Long getDetailId() {
//		return detailId;
//	}
//
//	public void setDetailId(Long detailId) {
//		this.detailId = detailId;
//	}
//
//	public String getProductName() {
//		return productName;
//	}
//
//	public void setProductName(String productName) {
//		this.productName = productName;
//	}
//
//	public String getPattern() {
//		return pattern;
//	}
//
//	public void setPattern(String pattern) {
//		this.pattern = pattern;
//	}
//
//	public String getOrderNo() {
//		return orderNo;
//	}
//
//	public void setOrderNo(String orderNo) {
//		this.orderNo = orderNo;
//	}
//
//	public String getShaftNo() {
//		return shaftNo;
//	}
//
//	public void setShaftNo(String shaftNo) {
//		this.shaftNo = shaftNo;
//	}
//
//	public String getRollNo() {
//		return rollNo;
//	}
//
//	public void setRollNo(String rollNo) {
//		this.rollNo = rollNo;
//	}
//
//	public String getLength() {
//		return length;
//	}
//
//	public void setLength(String length) {
//		this.length = length;
//	}
//
//	public String getNetWt() {
//		return netWt;
//	}
//
//	public void setNetWt(String netWt) {
//		this.netWt = netWt;
//	}
//
//	public String getRollGsm() {
//		return rollGsm;
//	}
//
//	public void setRollGsm(String rollGsm) {
//		this.rollGsm = rollGsm;
//	}
//
//	public String getMoisture() {
//		return moisture;
//	}
//
//	public void setMoisture(String moisture) {
//		this.moisture = moisture;
//	}
//
//	public String getRollDia() {
//		return rollDia;
//	}
//
//	public void setRollDia(String rollDia) {
//		this.rollDia = rollDia;
//	}
//
//	public Long getReportId() {
//		return reportId;
//	}
//
//	public void setReportId(Long reportId) {
//		this.reportId = reportId;
//	}
//
//	@Override
//	public String toString() {
//		return "DailyRejectionDetailsF007 [detailId=" + detailId + ", productName=" + productName + ", pattern="
//				+ pattern + ", orderNo=" + orderNo + ", shaftNo=" + shaftNo + ", rollNo=" + rollNo + ", length="
//				+ length + ", netWt=" + netWt + ", rollGsm=" + rollGsm + ", moisture=" + moisture + ", rollDia="
//				+ rollDia + ", reportId=" + reportId + "]";
//	}
//
//}
