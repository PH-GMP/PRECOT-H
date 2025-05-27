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
@Table(name = "TRAINING_RECORD_LINES", schema = AppConstants.schema)
public class TrainingRecordLines {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;

	@Column(name = "NAME_OF_THE_EMPLOYEE")
	private String name_of_the_employee;

	@Column(name = "EMPLOYEE_ID")
	private String employee_id;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "SIGNATURE")
	private String signature;

	@Column(name = "TRAINING_ID")
	private Long training_id;

}
