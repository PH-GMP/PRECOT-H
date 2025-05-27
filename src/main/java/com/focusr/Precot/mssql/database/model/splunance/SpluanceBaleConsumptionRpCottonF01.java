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
//@Table(name = "SPL_BALE_CONSUMPTION_RPCOTTON_F01", schema = AppConstants.schema)
//public class SpluanceBaleConsumptionRpCottonF01 extends UserDateAudit {
//
//	@Id
//	@Column(name = "SB_RP_ID")
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long sb_rp_id;
//	
//	@Column(name = "BALE_NO")
//	private String baleNo;
//	
//	@Column(name = "WEIGHT")
//	private Double weight;
//
//	public Long getSb_rp_id() {
//		return sb_rp_id;
//	}
//
//	public void setSb_rp_id(Long sb_rp_id) {
//		this.sb_rp_id = sb_rp_id;
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
//	public Double getWeight() {
//		return weight;
//	}
//
//	public void setWeight(Double weight) {
//		this.weight = weight;
//	}
//	
//}
