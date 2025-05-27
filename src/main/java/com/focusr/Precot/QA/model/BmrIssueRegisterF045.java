package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_BMR_ISSUE_REGISTER_F045", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE","DEPARTMENT" }) })
public class BmrIssueRegisterF045 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "BMRISSUE_ID")
	private Long bmrIssueId;
	

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "DEPARTMENT")
	private String departmentName;
	
	

	//QA Inspector
	
		@Column(name = "QA_INSPECTOR_STATUS")
		private String qa_inspector_status;

		@Column(name = "QA_INSPECTOR_SAVE_ON")
		private Date qa_inspector_save_on;

		@Column(name = "QA_INSPECTOR_SAVE_BY")
		private String qa_inspector_save_by;

		@Column(name = "QA_INSPECTOR_SAVE_ID")
		private Long qa_inspector_save_id;

		@Column(name = "QA_INSPECTOR_SUBMIT_ON")
		private Date qa_inspector_submit_on;

		@Column(name = "QA_INSPECTOR_SUBMIT_BY")
		private String qa_inspector_submit_by;

		@Column(name = "QA_INSPECTOR_SUBMIT_ID")
		private Long qa_inspector_submit_id;

		@Column(name = "QA_INSPECTOR_SIGN")
		private String qa_inspector_sign;
		
		//QA MANAGER
		
		@Column(name = "SUPERVISOR_STATUS")
		private String supervisor_status;

		@Column(name = "SUPERVISOR_SUBMIT_ON")
		private Date supervisor_submit_on;

		@Column(name = "SUPERVISOR_SUBMIT_BY")
		private String supervisor_submit_by;

		@Column(name = "SUPERVISOR_SUBMIT_ID")
		private Long supervisor_submit_id;

		@Column(name = "SUPERVISOR_SIGN")
		private String supervisor_sign;
		
		@Lob
		@Column(name = "QA_INSPECTOR_SIGNATURE_IMAGE")
		private byte[] qa_inspector_signature_image;

		@Lob
		@Column(name = "SUPERVISOR_SIGNATURE_IMAGE")
		private byte[] supervisor_signature_image;
		
		
		@OneToMany(targetEntity = BmrIssueRegisterLineF045.class, cascade = CascadeType.ALL)
		@JoinColumn(name = "BMRISSUE_ID", referencedColumnName = "BMRISSUE_ID")
		private List<BmrIssueRegisterLineF045> details;	

}
