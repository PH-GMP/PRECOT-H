package com.focusr.Precot.mssql.database.model.QcAudit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.mssql.database.model.QC_QaExeAndManager;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "COA_COTTON_BALLS_F26B_HISTORY", schema = AppConstants.schema)
public class CoaCottonBallsF26BHistory extends QC_QaExeAndManager {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HIS_ID")
	private Long his_id;

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

	// NEW

	@Column(name = "WEIGHT_STANDARD")
	private String weight_standard;

	@Column(name = "WEIGHT_ACTUAL")
	private String weight_actual;

	@Column(name = "WEIGHT_REMARKS")
	private String weight_remarks;

	@Column(name = "NO_OF_BALLS_STANDARD")
	private String no_of_balls_standard;

	@Column(name = "NO_OF_BALLS_ACTUAL")
	private String no_of_balls_actual;

	@Column(name = "NO_OF_BALLS_REMARKS")
	private String no_of_balls_remarks;

	@Column(name = "GROSS_WEIGHT_STANDARD")
	private String gross_weight_standard;

	@Column(name = "GROSS_WEIGHT_ACTUAL")
	private String gross_weight_actual;

	@Column(name = "GROSS_WEIGHT_REMARKS")
	private String gross_weight_remarks;

	@Column(name = "PACKING_MATERIAL")
	private String packing_material;

	@Column(name = "FIBRE_SPECIFICATION")
	private String fibre_specification;

	// REASON

	@Column(name = "REASON")
	private String reason;

	// VERSION

	@Column(name = "VERSION")
	private int version;

}
