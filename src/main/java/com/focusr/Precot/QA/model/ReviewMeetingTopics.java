package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

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
@Table(name = "QA_REVIEW_MEETING_TOPICS", schema = AppConstants.schema)
public class ReviewMeetingTopics {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "TOPICS", length = 1000)
	private String topics;
	
	@Column(name = "HEADINGS", length = 1000)
	private String headings;

}
