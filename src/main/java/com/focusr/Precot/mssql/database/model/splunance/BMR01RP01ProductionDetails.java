package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_BMR_B01_R01_PRODUCTION_DETAILS", schema = AppConstants.schema)
public class BMR01RP01ProductionDetails extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROD_ID")
	private Long prod_id;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	@Column(name = "START_DATE")
	private String start_date;

	@Column(name = "START_TIME")
	private String start_time;

	@Column(name = "END_DATE")
	private String end_date;

	@Column(name = "END_TIME")
	private String end_time;

	@Column(name = "ISSUED_BY")
	private String issued_by;

	@Column(name = "ISSUED_ON")
	private String issued_on;

	@Column(name = "ISSUED_NAME")
	private String issued_name;

	@Column(name = "RECEIVED_BY")
	private String received_by;

	@Column(name = "RECEIVED_ON")
	private String received_on;

	@Column(name = "RECEIVED_NAME")
	private String received_name;

	// ENHANCEMENT

	@Column(name = "BATCH_NO")
	private String batchNo;

	@Column(name = "PO_STATUS")
	private String poStatus;

	@Column(name = "NEXT_BATCH")
	private String nextBatch;

	// NEW
	@Column(name = "STATUS")
	private String status;

	@Column(name = "SUPERVISOR_ID")
	private Long supervisor_id;

	@Column(name = "QA_ID")
	private Long qa_id;

	// New Fields

	@Column(name = "MIXING")
	private String mixing;

	@Column(name = "PRODUCT_DESCRIPTION")
	private String productDescription;

	@Column(name = "No_of_Shaft")
	private String shaftCount;

	@Column(name = "BATCH_QUANTITY")
	private String batchQuantity;

	@Column(name = "WIDTH")
	private String width;

	@Column(name = "NO_OF_ROLLS_SHAFT")
	private String rollShaftCount;

	@Column(name = "PRODUCT_SUPPLY")
	private String productSupply;

	// For Spl Bmr

	@Column(name = "SHAFT_FROM")
	private String shaftFrom;

	@Column(name = "SHAFT_TO")
	private String shaftTo;

	// For Rp Bale

	@Column(name = "BALE_FROM")
	private String BaleFrom;

	@Column(name = "BALE_TO")
	private String BaleTo;

}
