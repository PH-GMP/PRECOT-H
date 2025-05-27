package com.focusr.Precot.QA.model.audit;

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
@Table(name = "QA_PEST_CONTROLLER_TREATMENTS_HISTORY",schema=AppConstants.schema)
public class QaPestControllerTreatmentsHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "AREA_OF_TREATMENTS")
	private String area_of_treatments;

	@Column(name = "TREATMENT_PROVIDED")
	private String treatment_provided;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "HISTORY_ID")
	private Long history_id;
}
