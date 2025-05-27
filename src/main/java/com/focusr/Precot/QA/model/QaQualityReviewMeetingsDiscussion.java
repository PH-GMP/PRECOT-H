package com.focusr.Precot.QA.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_QUALITY_REVIEW_MEETINGS_DISCUSSION_F043", schema = AppConstants.schema)
public class QaQualityReviewMeetingsDiscussion {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DISCUSSION_ID")
	private Long discussionId;	

	@Column(name = "DISCUSSION_POINTS")
	private String discussionPoints;

	@Column(name = "DESCRIPTION")
	private String description;

	@Column(name = "ACTION_PLAN")
	private String actionPlan;
	
	@Column(name = "RESPONSIBILITY")
	private String responsibility;
	
	@Column(name = "TARGET_DATE")
	private String targetDate;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "MEETING_ID")
	private Long meetingId;	
}
