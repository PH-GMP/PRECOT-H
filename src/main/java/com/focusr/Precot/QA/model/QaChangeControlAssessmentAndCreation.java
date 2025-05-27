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
@Table(name = "QA_CHANGE_CONTROL_ASSESSMENT_AND_CREATION", schema = AppConstants.schema)
public class QaChangeControlAssessmentAndCreation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;

	@Column(name = "ACTION_ITEM_NUMBER")
	private String ActionItemNo;

	@Column(name = "ACTION_ITEM_DESCRIPTION")
	private String ActionItemDescription;

	@Column(name = "RESPONSIBLE_DEPARTMENT")
	private String resposibleDepartment;

	@Column(name = "RESPONSIBLE_PERSON")
	private String responsiblePerson;
	
	@Column(name = "FORM_ID")
	private Long formId;
}
