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

@Table(name = "NON_WOVEN_FLEECE_ANALYSIS_REPORT", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "BMR_NO" }) })
@Entity
@Data
public class non_woven_F005 extends UserDateAudit {

	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long test_id;

	@Column(name = "FORMAT")
	private String format;

	@Column(name = "FORMAT_NO")
	private String format_no;

	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;

	@Column(name = "BMR_NO")
	private String bmr_no;

	@Column(name = "REVISION_NO")
	private String revision_no;

	@Column(name = "TESTED_BY")
	private String tested_by;

	@Column(name = "APPROVED_BY")
	private String approved_by;

//	--------------------

	@Column(name = "qa_inspector_STATUS")
	private String qa_inspector_status;

	@Column(name = "qa_inspector_SAVED_ON")
	private Date qa_inspector_saved_on;

	@Column(name = "qa_inspector_SAVED_BY")
	private String qa_inspector_saved_by;

	@Column(name = "qa_inspector_SAVED_ID")
	private Long qa_inspector_saved_id;

	@Column(name = "qa_inspector_SUBMIT_ON")
	private Date qa_inspector_submit_on;

	@Column(name = "qa_inspector_SUBMIT_BY")
	private String qa_inspector_submit_by;

	@Column(name = "qa_inspector_SUBMIT_ID")
	private Long qa_inspector_submit_id;

	@Column(name = "qa_inspector_SIGN")
	private String qa_inspector_sign;

	// ---------------------------------------------------------------------------

	// HOD

	@Column(name = "QA_MNG_STATUS")
	private String qa_mng_status;

	@Column(name = "QA_MNG_SUBMIT_ON")
	private Date qa_mng_submit_on;

	@Column(name = "QA_MNG_SUBMIT_BY")
	private String qa_mng_submit_by;

	@Column(name = "QA_MNG_SUBMIT_ID")
	private Long qa_mng_submit_id;

	@Column(name = "QA_MNG_SIGN")
	private String qa_mng_sign;

	@Column(name = "REASON")
	private String reason;

	@Column(name = "S_NO")
	private Long s_no;
	
	@OneToMany(targetEntity = NonWovenF005Lines.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "TEST_ID", referencedColumnName = "TEST_ID")
	private List<NonWovenF005Lines> line1;

}
