package com.focusr.Precot.QA.model;

import lombok.Data;

@Data
public class TrainingQuestionnaireSummaryDTO {
	private Long questionnaireId;
	private String year;
	private String month;
	private String trainingSessionNumber;
	private String traineeIdNumber;
	private String hodDesigneeStatus;
	private String reason;
	
	public TrainingQuestionnaireSummaryDTO(Long questionnaireId,String year,String month,String trainingSessionNumber,String traineeIdNumber,String hodDesigneeStatus,String reason) 
	{
		this.questionnaireId = questionnaireId;
		this.year = year;
		this.month = month;
		this.trainingSessionNumber = trainingSessionNumber;
		this.traineeIdNumber = traineeIdNumber;
		this.hodDesigneeStatus = hodDesigneeStatus;
		this.reason = reason;
	}

}