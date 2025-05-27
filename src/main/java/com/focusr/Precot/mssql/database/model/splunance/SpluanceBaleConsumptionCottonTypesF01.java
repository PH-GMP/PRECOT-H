//package com.focusr.Precot.mssql.database.model.splunance;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//
//import com.focusr.Precot.model.audit.UserDateAudit;
//import com.focusr.Precot.util.AppConstants;
//
//@Entity
//@Table(name = "SPL_BALE_CONSUMPTION_ABCOTTON_F01", schema = AppConstants.schema)
//public class SpluanceBaleConsumptionCottonTypesF01 extends UserDateAudit{
//
//	@Id
//	@Column(name = "SB_AB_ID")
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long sb_ab_id;
//	
//	@Column(name = "BALE_NO")
//	private String baleNo;
//	
//	@Column(name = "BATCH_NO")
//	private String batchNo;
//	
//	@Column(name = "WEIGHT")
//	private Double weight;
//
//	
//
//	public Long getSb_ab_id() {
//		return sb_ab_id;
//	}
//
//	public void setSb_ab_id(Long sb_ab_id) {
//		this.sb_ab_id = sb_ab_id;
//	}
//
//	public String getBaleNo() {
//		return baleNo;
//	}
//
//	public void setBaleNo(String baleNo) {
//		this.baleNo = baleNo;
//	}
//
//	public String getBatchNo() {
//		return batchNo;
//	}
//
//	public void setBatchNo(String batchNo) {
//		this.batchNo = batchNo;
//	}
//
//	public Double getWeight() {
//		return weight;
//	}
//
//	public void setWeight(Double weight) {
//		this.weight = weight;
//	}
//
//	
//}
