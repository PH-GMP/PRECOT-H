package com.focusr.Precot.QA.model;

import java.time.LocalDate;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;
import lombok.Data;

@Data
@Entity
@Table(name = "QA_TRAINING_QUESTIONNAIRE", schema = AppConstants.schema,
uniqueConstraints=@UniqueConstraint(columnNames= {"TRAINING_SESSION_NUMBER","TRAINEE_ID_NUMBER"}))
public class TrainingQuestionnaire extends UserDateAudit{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "QUESTIONNAIRE_ID")
	private Long questionnaireId;
	
	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String sopNumber;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "TRAINING_DATE")
	private LocalDate trainingDate;
	
	@Column(name = "TRAINING_SESSION_NUMBER")
	private String trainingSessionNumber;
	
	@Column(name = "TOPIC_NAME")
	private String topicName;
	
	@Column(name = "TRAINING_SOP_NUMBER")
	private String trainingSopNumber;
	
	@Column(name = "TRAINING_REVISION_NUMBER")
	private String trainingRevisionNumber;
	
	@Column(name = "DEPARTMENT_NAME")
	private String departmentName;
	
	@Column(name = "TRAINER_NAME")
	private String trainerName;
	
	@Column(name = "TRAINEE_NAME")
	private String traineeName;
	
	@Column(name = "TRAINEE_ID_NUMBER")
	private String traineeIdNumber;
	
	@Column(name = "VENUE")
	private String venue;
	
	@Column(name = "MARKS")
	private String marks;
	
	@Column(name = "REASON")
	private String reason;
	
	@Transient
	private String questionsBase64;
		
	@Lob
	@Column(name="QUESTIONS")
	private byte[] questions;
	
	@Transient
	private String assessmentBase64;
	
	@Lob
	@Column(name="ASSESSMENT_OF_QUESTIONNAIRE")
	private byte[] assessmentOfQuestionnaire;
	
	//HOD DESIGNEE INFO
	@Column(name = "HOD_DESIGNEE_STATUS")
	private String hodDesigneeStatus;
			
	@Column(name = "HOD_DESIGNEE_SAVE_ON")
	private Date hodDesigneeSaveOn;

	@Column(name = "HOD_DESIGNEE_SAVE_BY")
	private String hodDesigneeSaveBy;

	@Column(name = "HOD_DESIGNEE_SAVE_ID")
	private Long hodDesigneeSaveId;
			
	@Column(name = "HOD_DESIGNEE_SUBMIT_ON")
	private Date hodDesigneeSubmitOn;

	@Column(name = "HOD_DESIGNEE_SUBMIT_BY")
	private String hodDesigneeSubmitBy;

	@Column(name = "HOD_DESIGNEE_SUBMIT_ID")
	private Long hodDesigneeSubmitId;

	@Column(name = "HOD_DESIGNEE_SIGN")
	private String hodDesigneeSign;
	
}
