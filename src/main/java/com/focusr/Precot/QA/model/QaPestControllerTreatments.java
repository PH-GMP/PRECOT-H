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
@Table(name = "QA_PEST_CONTROLLER_TREATMENTS",schema=AppConstants.schema)
public class QaPestControllerTreatments {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;

	@Column(name = "AREA_OF_TREATMENTS")
	private String area_of_treatments;

	@Column(name = "TREATMENT_PROVIDED")
	private String treatment_provided;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "CONTROL_ID")
	private Long control_id;

}
