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
@Table(name = "COA_COTTON_ROLL_GOODS_F26E_HISTORY", schema = AppConstants.schema)
public class CoaCottonRollGoodsF26EHistory extends QC_QaExeAndManager {

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

	@Column(name = "REFERENCE_NO")
	private String reference_no;

	@Column(name = "PATTERN")
	private String pattern;

	// NEW

	@Column(name = "GSM_STANDARD")
	private String gsm_standard;

	@Column(name = "GSM_ACTUAL")
	private String gsm_actual;

	@Column(name = "GSM_REMARKS")
	private String gsm_remarks;

	@Column(name = "THICKNESS_STANDARD")
	private String thickness_standard;

	@Column(name = "THICKNESS_ACTUAL")
	private String thickness_actual;

	@Column(name = "THICKNESS_REMARKS")
	private String thickness_remarks;

	@Column(name = "SLIT_STANDARD")
	private String slit_standard;

	@Column(name = "SLIT_ACTUAL")
	private String slit_actual;

	@Column(name = "SLIT_REMARKS")
	private String slit_remarks;

	@Column(name = "MACHINE_SPEC")
	private String machine_spec;

	@Column(name = "MACHINE_ACTUAL")
	private String machine_actual;

	@Column(name = "MACHINE_REMARKS")
	private String machine_remarks;

	@Column(name = "CROSS_DIRECTION_SPEC")
	private String cross_direction_spec;

	@Column(name = "CROSS_DIRECTION_ACTUAL")
	private String cross_direction_actual;

	@Column(name = "CROSS_DIRECTION_REMARKS")
	private String cross_direction_remarks;

	// REASON

	@Column(name = "REASON")
	private String reason;

	// VERSION

	@Column(name = "VERSION")
	private int version;

}
