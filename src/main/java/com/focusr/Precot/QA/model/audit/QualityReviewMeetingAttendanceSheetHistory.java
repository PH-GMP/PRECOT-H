package com.focusr.Precot.QA.model.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.QA.model.QaQualityReviewMeetingAttendanceSheet;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_QUALITY_REVIEW_MEETINGS_ATTENDANCE_SHEET_HISTORY_F043", schema = AppConstants.schema)
public class QualityReviewMeetingAttendanceSheetHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ATTENDANE_ID")
	private Long attendanceId;	

	@Column(name = "NAMEOF_PARTICIPANTS")
	private String nameOfParticipants;

	@Column(name = "DESIGNATION")
	private String designation;

	@Column(name = "SIGN")
	private String sign;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "MEETING_ID")
	private Long meetingId;	
}
