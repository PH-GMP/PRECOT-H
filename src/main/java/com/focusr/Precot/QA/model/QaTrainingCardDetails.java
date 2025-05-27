package com.focusr.Precot.QA.model;

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
@Table(name = "QA_TRAINING_CARD_DETAILS",schema=AppConstants.schema)
public class QaTrainingCardDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LINE_ID")
	private Long line_id;
	
	@Column(name = "TRAINING_SESSION_NO")
	private String trainingSessionNo;
	
	@Column(name = "TOPIC_NAME")
	private String topicName;
	
	@Column(name = "SOP_NO")
	private String sopNo;
	
	@Column(name = "TRAINEE_NAME")
	private String traineeName;
	
	@Column(name = "TRAINER_NAME")
	private String trainerName;
	
	@Column(name = "MODE_OF_TRAINING")
	private String modeOfTraining;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "CARD_ID")
	private Long card_id;

}
