package com.focusr.Precot.mssql.database.model.Qc;

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
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QC_RAW_COTTON_CONSOLIDATED_ANALYTICAL_REPORT_F004", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "BLEACHING_BMR_NO"}) })
public class Qc_RawCottenConsolidatedAnalyticalReportF004 extends UserDateAudit {
	
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
	
	@Column(name = "BLEACHING_BMR_NO")
	private String bleachingBmrNo;
	
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
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "rawCottenConsolidatedAnalyticalReportF004")
    private List<Qc_RawCottenConsolidatedDetails> details;
	
	
}
