package com.focusr.Precot.mssql.database.model.bleaching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BMR_PACKING_DETAILS",schema=AppConstants.schema)
public class PackingDetails_BMR {

	@Id
	@Column(name = "PACKING_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long packingId;
	
	@Column(name = "PACKING_NAME")
	private String packingName;
	
	@Column(name = "PACKING_BATCHNO")
	private String batchNo;
	
	@Column(name = "QUANTITY")
	private String quantity;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "PACKING_MAP_ID")
	private Long packingMapId;
	
	@Column(name = "ISSUED_BY")
	private String issuedBy;
	
	@Column(name = "VERIFIED_BY")
	private String verifiedBy;
	
	@Column(name = "VERIFIER_ID")
	private Long verifierId;
	
	@Column(name = "ISSUER_ID")
	private Long issuedId;

	public Long getPackingId() {
		return packingId;
	}

	public void setPackingId(Long packingId) {
		this.packingId = packingId;
	}

	public String getPackingName() {
		return packingName;
	}

	public void setPackingName(String packingName) {
		this.packingName = packingName;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}


	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public PackingDetails_BMR() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getPackingMapId() {
		return packingMapId;
	}

	public void setPackingMapId(Long packingMapId) {
		this.packingMapId = packingMapId;
	}

	public String getIssuedBy() {
		return issuedBy;
	}

	public void setIssuedBy(String issuedBy) {
		this.issuedBy = issuedBy;
	}

	public String getVerifiedBy() {
		return verifiedBy;
	}

	public void setVerifiedBy(String verifiedBy) {
		this.verifiedBy = verifiedBy;
	}

	public Long getVerifierId() {
		return verifierId;
	}

	public void setVerifierId(Long verifierId) {
		this.verifierId = verifierId;
	}

	public Long getIssuedId() {
		return issuedId;
	}

	public void setIssuedId(Long issuedId) {
		this.issuedId = issuedId;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	
}
