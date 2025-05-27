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
@Table(name = "QA_TRAINING_SESSION_ALLOTMENT_REGISTER_LINE", schema = AppConstants.schema)
public class QaTrainingSessionAllotmentRegisterLine {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;

	@Column(name = "TRAINING_SESSION_NUMBER")
	private String trainingSessionNumber;

	@Column(name = "TOPIC_NAME")
	private String topicName;
	
	@Column(name = "SOP_NUMBER")
	private String sopNumber;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "FORM_ID")
	private Long formId;
}
