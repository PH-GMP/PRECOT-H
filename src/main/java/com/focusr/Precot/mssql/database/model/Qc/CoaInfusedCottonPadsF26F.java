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
@Table(name = "COA_INFUSED_COTTON_PADS_F26F", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "PRODUCT", "CUSTOMER" }) })

public class CoaInfusedCottonPadsF26F extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

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

	@Column(name = "EDGE")
	private String edge;

	// NEW

	@Column(name = "GSM_STANDARD")
	private String gsm_standard;

	@Column(name = "GSM_ACTUAL")
	private String gsm_actual;

	@Column(name = "GSM_REMARKS")
	private String gsm_remarks;

	@Column(name = "NO_OF_PADS_STANDARD")
	private String no_of_pads_standard;

	@Column(name = "NO_OF_PADS_ACTUAL")
	private String no_of_pads_actual;

	@Column(name = "NO_OF_PADS_REMARKS")
	private String no_of_pads_remarks;

	@Column(name = "GROSS_WEIGHT_STANDARD")
	private String gross_weight_standard;

	@Column(name = "GROSS_WEIGHT_ACTUAL")
	private String gross_weight_actual;

	@Column(name = "GROSS_WEIGHT_REMARKS")
	private String gross_weight_remarks;

	@Column(name = "PACKING_MATERIAL")
	private String packing_material;

	// COMMON

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

	// NEW

	@Column(name = "FOREIGN_FIBRES_ACTUAL")
	private String foreign_fibres_actual;

	@Column(name = "FOREIGN_FIBRES_REMARKS")
	private String foreign_fibres_remarks;

	@Column(name = "NEPS_ACTUAL")
	private String neps_actual;

	@Column(name = "NEPS_REMARKS")
	private String neps_remarks;

	@Column(name = "AVERAGE_ACTUAL")
	private String average_actual;

	@Column(name = "AVERAGE_REMARKS")
	private String average_remarks;

	@Column(name = "EXTRACTABLE_ACTUAL")
	private String extractable_actual;

	@Column(name = "EXTRACTABLE_REMARKS")
	private String extractable_remarks;

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

	@Column(name = "PATHOGEN_SPEC")
	private String pathogen_spec;

	// 22

	@Column(name = "BILE_ACTUAL")
	private String bile_actual;

	@Column(name = "BILE_REMARKS")
	private String bile_remarks;

	@Column(name = "ESCHERICHIA_ACTUAL")
	private String escherichia_actual;

	@Column(name = "ESCHERICHIA_REMARKS")
	private String escherichia_remarks;

	@Column(name = "STAPHYLOCOCCUS_ACTUAL")
	private String staphylococcus_actual;

	@Column(name = "STAPHYLOCOCCUS_REMARKS")
	private String staphylococcus_remarks;

	@Column(name = "PSEUDOMONAS_ACTUAL")
	private String pseudomonas_actual;

	@Column(name = "PSEUDOMONAS_REMARKS")
	private String pseudomonas_remarks;

	@Column(name = "SALMONELLA_ACTUAL")
	private String salmonella_actual;

	@Column(name = "SALMONELLA_REMARKS")
	private String salmonella_remarks;

	@Column(name = "BURKHOLDERIA_ACTUAL")
	private String burkholderia_actual;

	@Column(name = "BURKHOLDERIA_REMARKS")
	private String burkholderia_remarks;

	// STATUS FOR ALL ROLES

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

	// REASON

	@Column(name = "REASON")
	private String reason;

}
