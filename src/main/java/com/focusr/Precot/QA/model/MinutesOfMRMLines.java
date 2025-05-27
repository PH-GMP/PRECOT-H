package com.focusr.Precot.QA.model;

import java.util.Date;

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
@Table(name = "QA_MINUTES_OF_MRM_LINES", schema = AppConstants.schema)
public class MinutesOfMRMLines {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;
	
//	@Column(name = "PARTICIPANTS")
//	private String participants;

	@Column(name = "TOPICS", length = 1000)
	private String topics;

	@Column(name = "DETAILS_OF_DISCUSSION", length = 1000)
	private String details_of_discussion;

	@Column(name = "ACTIONS_DECIDED", length = 1000)
	private String actions_decided;

	@Column(name = "RESPONSIBILITY", length = 1000)
	private String responsibility;

	@Column(name = "TARGET_DATE")
	private String target_date;
	
	@Column(name = "REMARK")
	private String remark;
	
	@Column(name = "ID")
	private Long id;
	
	
}
