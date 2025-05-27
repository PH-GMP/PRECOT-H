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
@Table(name = "QA_QUALITY_REVIEW_MEETINGS_DISCUSSION_POINTS",schema=AppConstants.schema)
public class QaQualityReviewMeetingDiscussionPoints {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "DISCUSSION_POINTS")
	private String discussion_points;

}
