package com.focusr.Precot.QA.repository.audit;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.QA.model.audit.MinutesOfMRMHistory;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_MINUTES_OF_MRM_LINES_HISTORY", schema = AppConstants.schema)
public class MinutesOfMRMLinesHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
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
	
	@Column(name = "HISTORY_ID")
	private Long historyId;
}
