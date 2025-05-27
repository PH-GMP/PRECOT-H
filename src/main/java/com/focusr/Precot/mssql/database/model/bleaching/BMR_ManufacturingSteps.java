package com.focusr.Precot.mssql.database.model.bleaching;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.payload.BleachBmrSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BMR_MANUFACTURING_STEPS",schema=AppConstants.schema)
public class BMR_ManufacturingSteps extends BleachBmrSummerySubmit {

	@Column(name = "MANUFACTURING_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long manufacturingId;
	
	@Column(name = "STAGE")
	private String stage;
	
	@Column(name = "OPERATION")
	private String operation;
	
	@Column(name = "BMR_NO")
	private String bmr_no;
	
	@OneToMany(targetEntity = BmrManufacturingOperations.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "MANUFACTURING_ID", referencedColumnName = "MANUFACTURING_ID")
	private List<BmrManufacturingOperations> manufacturingOperations;

	@Column(name = "FORM_KEY")
	private String key;
	
	public Long getManufacturingId() {
		return manufacturingId;
	}

	public void setManufacturingId(Long manufacturingId) {
		this.manufacturingId = manufacturingId;
	}

	public String getStage() {
		return stage;
	}

	public void setStage(String stage) {
		this.stage = stage;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public List<BmrManufacturingOperations> getManufacturingOperations() {
		return manufacturingOperations;
	}

	public void setManufacturingOperations(List<BmrManufacturingOperations> manufacturingOperations) {
		this.manufacturingOperations = manufacturingOperations;
	}

	public String getBmr_no() {
		return bmr_no;
	}

	public void setBmr_no(String bmr_no) {
		this.bmr_no = bmr_no;
	}

	public BMR_ManufacturingSteps() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
