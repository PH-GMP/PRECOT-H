package com.focusr.Precot.mssql.database.model.bleaching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BMR_MANUFACTURER_OPERATION",schema=AppConstants.schema)
public class BmrManufacturingOperations {

	@Column(name = "OPERATION_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long operationId;
	
	@Column(name = "OPERATION")
	private String operation;
	
	@Column(name = "OBSERVATION1")
	private String observation1;
	
	@Column(name = "OBSERVATION2")
	private String observation2;
	
	@Column(name = "PERFORM_BY")
	private String performBy;
	
	@Column(name = "CLEANED_BY")
	private String cleanedBy;
	
	@Column(name = "DATE1")
	private String date1;
	
	@Column(name = "DATE2")
	private String date2;
	
	@Column(name = "MANUFACTURING_ID")
	private Long manufacturingId;

	public Long getOperationId() {
		return operationId;
	}

	public void setOperationId(Long operationId) {
		this.operationId = operationId;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public String getPerformBy() {
		return performBy;
	}

	public void setPerformBy(String performBy) {
		this.performBy = performBy;
	}

	public String getCleanedBy() {
		return cleanedBy;
	}

	public void setCleanedBy(String cleanedBy) {
		this.cleanedBy = cleanedBy;
	}

	public String getObservation1() {
		return observation1;
	}

	public void setObservation1(String observation1) {
		this.observation1 = observation1;
	}

	public String getObservation2() {
		return observation2;
	}

	public void setObservation2(String observation2) {
		this.observation2 = observation2;
	}

	public BmrManufacturingOperations() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getDate1() {
		return date1;
	}

	public void setDate1(String date1) {
		this.date1 = date1;
	}

	public String getDate2() {
		return date2;
	}

	public void setDate2(String date2) {
		this.date2 = date2;
	}
	
}
