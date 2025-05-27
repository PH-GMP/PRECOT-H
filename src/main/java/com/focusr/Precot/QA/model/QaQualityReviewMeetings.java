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
@Table(name = "QA_QUALITY_REVIEW_MEETINGS_F043", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE"}) })
public class QaQualityReviewMeetings {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "MEETING_ID")
	private Long meetingId;	

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
	
	@Column(name = "VENUE")
	private String venue;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "START_TIME")
	private String startTime;
	
	@Column(name = "END_TIME")
	private String endTime;
	
	@Column(name = "REASON")
	private String reason;
	
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
			
			@Lob
			@Column(name = "QA_INSPECTOR_SIGNATURE_IMAGE")
			private byte[] qa_inspector_signature_image;

			@Lob
			@Column(name = "QA_MR_SIGNATURE_IMAGE")
			private byte[] qa_mr_signature_image;
			
			
			@OneToMany(targetEntity = QaQualityReviewMeetingAttendanceSheet.class, cascade = CascadeType.ALL)
			@JoinColumn(name = "MEETING_ID", referencedColumnName = "MEETING_ID")
			private List<QaQualityReviewMeetingAttendanceSheet> details;
			
			@OneToMany(targetEntity = QaQualityReviewMeetingsDiscussion.class, cascade = CascadeType.ALL)
			@JoinColumn(name = "MEETING_ID", referencedColumnName = "MEETING_ID")
			private List<QaQualityReviewMeetingsDiscussion> detail;

			
		
}
