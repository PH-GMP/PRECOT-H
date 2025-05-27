package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;
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
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DISTILLED_WATER_ANALYSIS_REPORT_ARF012", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE"}) })
public class DistilledWaterAnalysisReportARF012 extends UserDateAudit {
	
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
	
	@Column(name = "MONTH")	
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "SNO")
	private Long sno;

	@Column(name = "ANALYTICAL_REQUEST_NO")
	private String analyticalRequestNo;

	@Column(name = "PH")
	private Double ph;

	@Column(name = "TURBIDITY_IN_NTU")
	private Double turbidityInNtu;

	@Column(name = "TOTAL_DISSOLVED_SOLIDS_IN_PPM")
	private Double totalDissolvedSolidsInPpm;

	@Column(name = "HARDNESS_IN_PPM")
	private Double hardnessInPpm;

	@Column(name = "REMARK")
	private String remark;

	@Column(name = "CHECKED_BY")
	private String checkedBy;

	@Column(name = "APPROVED_BY")
	private String approvedBy;
	
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
	
	@Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SUBMIT_ON")
	private Date qc_submit_on;

	@Column(name = "QC_SUBMIT_BY")
	private String qc_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long qc_submit_id;

	@Column(name = "QC_SIGN")
	private String qc_sign;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
}
