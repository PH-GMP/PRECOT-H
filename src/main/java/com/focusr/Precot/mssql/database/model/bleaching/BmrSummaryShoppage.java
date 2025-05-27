//package com.focusr.Precot.mssql.database.model.bleaching;
//
//import java.util.List;
//
//import javax.persistence.CascadeType;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.OneToMany;
//import javax.persistence.Table;
//
//import com.focusr.Precot.model.audit.UserDateAudit;
//import com.focusr.Precot.util.AppConstants;
//
//@Entity
//@Table(name = "BMR_SUMMARY_SHOPPAGE", schema=AppConstants.schema)
//public class BmrSummaryShoppage extends UserDateAudit {
//
//	@Id
//	@Column(name = "ID")
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//	
//	@Column(name = "BMR_NO")
//	private String bmr_no;
//	
//	@OneToMany(targetEntity = BleachBmrCompletionTable.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "ID", referencedColumnName = "ID")
//	private List<BleachBmrCompletionTable> shoppageDetails;
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public String getBmr_no() {
//		return bmr_no;
//	}
//
//	public void setBmr_no(String bmr_no) {
//		this.bmr_no = bmr_no;
//	}
//
//	public List<BleachBmrCompletionTable> getShoppageDetails() {
//		return shoppageDetails;
//	}
//
//	public void setShoppageDetails(List<BleachBmrCompletionTable> shoppageDetails) {
//		this.shoppageDetails = shoppageDetails;
//	}
//	
//	
//}
