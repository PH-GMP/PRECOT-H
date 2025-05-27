package com.focusr.Precot.mssql.database.model.Qc;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.QC_QaExeAndManager;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "COA_COTTON_PADS_F26A", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "PRODUCT", "CUSTOMER", }) })

public class CoaCottonPadsF26A extends QC_QaExeAndManager {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "MATERIAL_DOC_NO")
	private String materialDocNo;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "PRODUCT")
	private String product;

	@Column(name = "CUSTOMER")
	private String customer;

	@Column(name = "INVOICE_NO")
	private String invoice_no;

	@Column(name = "LOT_NO")
	private String lot_no;

	@Column(name = "PRODUCT_DIMENSION")
	private String product_dimension;

	@Column(name = "PATTERN")
	private String pattern;

	@Column(name = "EDGE")
	private String edge;

	// NEW

	@Column(name = "GSM_STANDARD")
	private String gsm_standard;

	@Column(name = "GSM_ACTUAL")
	private String gsm_actual;

	@Column(name = "GSM_REMARKS")
	private String gsm_remarks;

	@Column(name = "NO_OF_PAD_ACTUAL")
	private String no_of_pad_actual;

	@Column(name = "NO_OF_PAD_REMARKS")
	private String no_of_pad_remarks;

	@Column(name = "GROSS_WEIGHT_ACTUAL")
	private String gross_weight_actual;

	@Column(name = "GROSS_WEIGHT_REMARKS")
	private String gross_weight_remarks;

	@Column(name = "PACKING_MATERIAL")
	private String packing_material;
	
	//AMC 
	
	@Column(name = "PPB_STANDARD")
	private String ppb_standard;
	
	@Column(name = "GROSS_WEIGHT_STANDARD")
	private String gross_weight_standard;

	// REASON

	@Column(name = "REASON")
	private String reason;

}
