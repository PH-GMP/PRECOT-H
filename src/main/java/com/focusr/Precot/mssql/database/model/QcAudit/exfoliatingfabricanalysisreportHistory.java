package com.focusr.Precot.mssql.database.model.QcAudit;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Table(name = "EXFOLIATING_FABRIC_ANALYSIS_REPORT_HISTORY", schema = AppConstants.schema)
@Entity
@Data
public class exfoliatingfabricanalysisreportHistory extends UserDateAudit{
	
	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long test_id;
	
	@Column(name = "INVOICE_NO")
	private String invoice_no;  //PDE
	
	@Column(name = "PO_NO")
	private String po_no;      //PDE
	
	@Column(name = "DESCRIPTION")
	private String description;  // PDE
	
	@Column(name = "SUPPLIER")
	private String supplier;    //PDE
	
	@Column(name = "NO_ROLLS")
	private String no_rolls;    //PDE
	
	@Column(name = "QUANTITY")
	private String quantity;    //PDE
	
	@Column(name = "TESTED_ON")
	private String tested_on;
	
	@Column(name = "SAMPLE_SIZE")
	private String sample_size;
	
	@Column(name = "FORMAT")
	private String format;
	
	@Column(name = "FORMAT_NO")
	private String format_no;
	
	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;
	
	@Column(name = "REVISION_NO")
	private String revision_no;
	
	@Column(name = "chemist_STATUS")
	private String chemist_status;

	@Column(name = "chemist_SAVED_ON")
	private Date chemist_saved_on;

	@Column(name = "chemist_SAVED_BY")
	private String chemist_saved_by;

	@Column(name = "chemist_SAVED_ID")
	private Long chemist_saved_id;

	@Column(name = "chemist_SUBMIT_ON")
	private Date chemist_submit_on;

	@Column(name = "chemist_SUBMIT_BY")
	private String chemist_submit_by;

	@Column(name = "chemist_SUBMIT_ID")
	private Long chemist_submit_id;

	@Column(name = "chemist_SIGN")
	private String chemist_sign;
	
	//---------------------------------------------------------------------------
	
	@Column(name = "micro_STATUS")
	private String micro_status;

	@Column(name = "MICROBIOLOGIST_SAVED_ON")
	private Date microbiologist_saved_on;

	@Column(name = "MICROBIOLOGIST_SAVED_BY")
	private String microbiologist_saved_by;

	@Column(name = "MICROBIOLOGIST_SAVED_ID")
	private Long microbiologist_saved_id;

	@Column(name = "micro_SUBMIT_ON")
	private Date micro_submit_on;

	@Column(name = "micro_SUBMIT_BY")
	private String micro_submit_by;
	
	@Column(name = "micro_SUBMIT_ID")
	private Long micro_submit_id;

	@Column(name = "micro_SIGN")
	private String micro_sign;

	// HOD

	@Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SUBMIT_ON")
	private Date qc_submit_on;

	@Column(name = "QC_SUBMIT_BY")
	private String qc_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long qc_submit_id;
	
	@Column(name = "PREPARED_BY")
	private String prepared_by;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "QC_SIGN")
	private String qc_sign;
	
	@Column(name = "ACCEPTED_QUANTITY")
	private String accepted_quantity;
	
	@Column(name = "ACCEPTED_DEVIATION_QUANTITY")
	private String accepted_deviation_quantity;
	
	@Column(name = "REJECT_QUANTITY")
	private String reject_quantity;
	
	@Column(name = "REASON")
	private String reason;
	

	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "exfoliatingfabricanalysisreporthistory")
	private List<observationF004History> observations;
	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "exfoliatingfabricanalysisreporthistory")
	private List<MicrobilogyTestF004History> microbilogytestf004;

}
