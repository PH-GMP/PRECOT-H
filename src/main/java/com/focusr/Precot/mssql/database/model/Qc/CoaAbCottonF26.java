package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "COA_AB_COTTON_F26", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "PRODUCT", "CUSTOMER", }) })
public class CoaAbCottonF26 extends UserDateAudit {

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

	@Column(name = "RAW_MATERIAL")
	private String raw_material;

	@Column(name = "INVOICE_NO")
	private String invoice_no;

	@Column(name = "LOT_NO")
	private String lot_no;

	@Column(name = "PRODUCTION_DATE")
	private String production_date;

	@Column(name = "BALE_NO")
	private String bale_no;

	// CONTENT

	@Column(name = "BALE_ACTUAL")
	private String bale_actual;

	@Column(name = "BALE_REMARKS")
	private String bale_remarks;

	@Column(name = "FIBRE_ACTUAL")
	private String fibre_actual;

	@Column(name = "FIBRE_REMARKS")
	private String fibre_remarks;

	@Column(name = "SURFACE_ACTUAL")
	private String surface_actual;

	@Column(name = "SURFACE_REMARKS")
	private String surface_remarks;

	@Column(name = "SINKING_ACTUAL")
	private String sinking_actual;

	@Column(name = "SINKING_REMARKS")
	private String sinking_remarks;

	@Column(name = "ABSORPTION_ACTUAL")
	private String absorption_actual;

	@Column(name = "ABSORPTION_REMARKS")
	private String absorption_remarks;

	@Column(name = "WHITENESS_ACTUAL")
	private String whiteness_actual;

	@Column(name = "WHITENESS_REMARKS")
	private String whiteness_remarks;

	@Column(name = "PH_ACTUAL")
	private String ph_actual;

	@Column(name = "PH_REMARKS")
	private String ph_remarks;

	@Column(name = "LOSS_ACTUAL")
	private String loss_actual;

	@Column(name = "LOSS_REMARKS")
	private String loss_remarks;

	@Column(name = "FLUORESCENCE_ACTUAL")
	private String fluorescence_actual;

	@Column(name = "FLUORESCENCE_REMARKS")
	private String fluorescence_remarks;

	@Column(name = "WATER_ACTUAL")
	private String water_actual;

	@Column(name = "WATER_REMARKS")
	private String water_remarks;

	@Column(name = "ETHER_ACTUAL")
	private String ether_actual;

	@Column(name = "ETHER_REMARKS")
	private String ether_remarks;

	@Column(name = "SULPHATED_ACTUAL")
	private String sulphated_actual;

	@Column(name = "SULPHATED_REMARKS")
	private String sulphated_remarks;

	@Column(name = "TOTAL_VIABLE_STANDARD")
	private String total_viable_standard;

	@Column(name = "TOTAL_VIABLE_ACTUAL")
	private String total_viable_actual;

	@Column(name = "TOTAL_VIABLE_REMARKS")
	private String total_viable_remarks;

	@Column(name = "TOTAL_FUNGAL_STANDARD")
	private String total_fungal_standard;

	@Column(name = "TOTAL_VFUNGAL_ACTUAL")
	private String total_vfungal_actual;

	@Column(name = "TOTAL_FUNGAL_REMARKS")
	private String total_fungal_remarks;

	@Column(name = "PATHOGEN_STANDARD")
	private String pathogen_standard;

	@Column(name = "PATHOGEN_ACTUAL")
	private String pathogen_actual;

	@Column(name = "PATHOGEN_REMARKS")
	private String pathogen_remarks;

	//

	@Column(name = "ODOR_ACTUAL")
	private String odor_actual;

	@Column(name = "ODOR_REMARKS")
	private String odor_remarks;

	@Column(name = "MICRONAIRE_ACTUAL")
	private String micronaire_actual;

	@Column(name = "MICRONAIRE_REMARKS")
	private String micronaire_remarks;

	@Column(name = "UQL_ACTUAL")
	private String uql_actual;

	@Column(name = "UQL_REMARKS")
	private String uql_remarks;

	@Column(name = "L_ACTUAL")
	private String l_actual;

	@Column(name = "L_REMARKS")
	private String l_remarks;

	// REASON

	@Column(name = "REASON")
	private String reason;

	// CHEMIST

	@Column(name = "CHEMIST_STATUS")
	private String chemist_status;

	@Column(name = "CHEMIST_SAVED_ON")
	private Date chemist_saved_on;

	@Column(name = "CHEMIST_SAVED_BY")
	private String chemist_saved_by;

	@Column(name = "CHEMIST_SAVED_ID")
	private Long chemist_saved_id;

	@Column(name = "CHEMIST_SUBMIT_ON")
	private Date chemist_submit_on;

	@Column(name = "CHEMIST_SUBMIT_BY")
	private String chemist_submit_by;

	@Column(name = "CHEMIST_SUBMIT_ID")
	private Long chemist_submit_id;

	@Column(name = "CHEMIST_SIGN")
	private String chemist_sign;

	// QA EXECUTIVE

	@Column(name = "QA_EXE_STATUS")
	private String qa_exe_status;

	@Column(name = "QA_EXE_SUBMIT_ON")
	private Date qa_exe_submit_on;

	@Column(name = "QA_EXE_SUBMIT_BY")
	private String qa_exe_submit_by;

	@Column(name = "QA_EXE_SUBMIT_ID")
	private Long qa_exe_submit_id;

	@Column(name = "QA_EXE_SIGN")
	private String qa_exe_sign;

	// QC

//	@Column(name = "QC_STATUS")
//	private String qc_status;
//
//	@Column(name = "QC_SUBMIT_ON")
//	private Date qc_submit_on;
//
//	@Column(name = "QC_SUBMIT_BY")
//	private String qc_submit_by;
//
//	@Column(name = "QC_SUBMIT_ID")
//	private Long qc_submit_id;
//
//	@Column(name = "QC_SIGN")
//	private String qc_sign;

	@Column(name = "MANAGER_STATUS")
	private String manager_status;

	@Column(name = "MANAGER_SUBMIT_ON")
	private Date manager_submit_on;

	@Column(name = "MANAGER_SUBMIT_BY")
	private String manager_submit_by;

	@Column(name = "MANAGER_SUBMIT_ID")
	private Long manager_submit_id;

	@Column(name = "MANAGER_SIGN")
	private String manager_sign;

}
