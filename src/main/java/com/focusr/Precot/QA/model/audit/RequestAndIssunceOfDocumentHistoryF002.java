package com.focusr.Precot.QA.model.audit;

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

import com.focusr.Precot.QA.model.RequestAndIssunceOfDocumentF002;
import com.focusr.Precot.QA.model.RequestAndIssunceOfLineDocumentsF002;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_HISTORY_F002", schema = AppConstants.schema)

public class RequestAndIssunceOfDocumentHistoryF002 extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "REQUEST_ID")
	private Long requestId;	

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NUMBER")
	private String revisionNumber;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;	
	
	@Column(name = "COMMENTS")
	private String comments;
	
	
	

	//QA HOD DESIGNEE
	
		@Column(name = "QA_HOD_DESIGNEE_STATUS")
		private String qa_hod_designee_status;

		@Column(name = "QA_HOD_DESIGNEE_SAVE_ON")
		private Date qa_hod_designee_save_on;

		@Column(name = "QA_HOD_DESIGNEE_SAVE_BY")
		private String qa_hod_designee_save_by;

		@Column(name = "QA_HOD_DESIGNEE_SAVE_ID")
		private Long qa_hod_designee_save_id;

		@Column(name = "QA_HOD_DESIGNEE_SUBMIT_ON")
		private Date qa_hod_designee_submit_on;

		@Column(name = "QA_HOD_DESIGNEE_SUBMIT_BY")
		private String qa_hod_designee_submit_by;

		@Column(name = "QA_HOD_DESIGNEE_SUBMIT_ID")
		private Long qa_hod_designee_submit_id;

		@Column(name = "QA_HOD_DESIGNEE_SIGN")
		private String qa_hod_designee_sign;
		
		
		//QA MANAGER
		
		@Column(name = "QA_MR_STATUS")
		private String qa_mr_status;

		@Column(name = "QA_MR_SUBMIT_ON")
		private Date qa_mr_submit_on;

		@Column(name = "QA_MR_SUBMIT_BY")
		private String qa_mr_submit_by;

		@Column(name = "QA_MR_SUBMIT_ID")
		private Long qa_mr_submit_id;

		@Column(name = "QA_MR_SIGN")
		private String qa_mr_sign;
		

		// sign image
		
		@Lob
		@Column(name = "QA_HOD_DESIGNEE_SIGNATURE_IMAGE")
		private byte[] hod_designee_signature_image;

		@Lob
		@Column(name = "QA_MR_SIGNATURE_IMAGE")
		private byte[] qa_mr_signature_image;
		
		@Column(name = "REASON")
		private String reason;

		@Column(name = "VERSION")
		private int version;
	
	
	@OneToMany(targetEntity = RequestAndIssunceOfDocumentLinesHisotryF002.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "REQUEST_ID", referencedColumnName = "REQUEST_ID")
	private List<RequestAndIssunceOfDocumentLinesHisotryF002> details;


}
