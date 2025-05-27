package com.focusr.Precot.mssql.database.model.bleaching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;


@Entity
@Table(name = "BMR_CHEMICAL_DETAILS",schema=AppConstants.schema)
public class ChemicalDetails_BMR {

	
	@Id
	@Column(name = "CHEMICAL_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long chemicalId;
	
	@Column(name = "CHEMICAL_NAME")
	private String chemicalName;
	
	@Column(name = "CHEMICAL_BATCHNO")
	private String batchNo;
	
	@Column(name = "QUANTITY")
	private String quantity;
	
	@Column(name = "CHEMICAL_MAP_ID")
	private Long chemicalMapId;
	
	@Column(name = "ISSUED_BY")
	private String issuedBy;
	
	@Column(name = "ISSUER_ID")
	private Long issuedId;
	
	@Column(name = "VERIFIED_BY")
	private String verifiedBy;
	
	@Column(name = "VERIFIER_ID")
	private Long verifierId;
	
	@Column(name = "UNIT")
	private String unit;

	public Long getChemicalId() {
		return chemicalId;
	}

	public void setChemicalId(Long chemicalId) {
		this.chemicalId = chemicalId;
	}

	public String getChemicalName() {
		return chemicalName;
	}

	public void setChemicalName(String chemicalName) {
		this.chemicalName = chemicalName;
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

	public Long getChemicalMapId() {
		return chemicalMapId;
	}

	public void setChemicalMapId(Long chemicalMapId) {
		this.chemicalMapId = chemicalMapId;
	}

	public String getIssuedBy() {
		return issuedBy;
	}

	public void setIssuedBy(String issuedBy) {
		this.issuedBy = issuedBy;
	}

	public Long getIssuedId() {
		return issuedId;
	}

	public void setIssuedId(Long issuedId) {
		this.issuedId = issuedId;
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

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	
	
}
