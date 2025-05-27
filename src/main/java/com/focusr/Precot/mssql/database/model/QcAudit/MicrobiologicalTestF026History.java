package com.focusr.Precot.mssql.database.model.QcAudit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "MICROBIOLOGICAL_TEST_AR_F026_HISTORY", schema = AppConstants.schema)
public class MicrobiologicalTestF026History {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name="SHELF_LIFE_HISTORY_ID")
	private Long shelfLifeHistoryId;

	@Column(name="SAMPLE_TESTED_ON")
	private String sampleTestedOn;

	@Column(name="TEST_COMPLETED_ON")
	private String testCompletedOn;

	@Column(name="SAMPLE_DESCRIPTION")
	private String sampleDescription;

	@Column(name="TVC_RESULT")
	private String tvcResult;

	@Column(name="TVC_STATUS")
	private String tvcStatus;

	@Column(name="TFC_RESULT")
	private String tfcResult;

	@Column(name="TFC_STATUS")
	private String tfcStatus;

	@Column(name="COLOFORMS_RESULT")
	private String coloformsResult;

	@Column(name="COLODORMS_STATUS")
	private String coloformsStatus;

	@Column(name="ECOLI_RESULT")
	private String ecoliResult;

	@Column(name="ECOLI_STATUS")
	private String ecoliStatus;

	@Column(name="SAUR_RESULT")
	private String saurResult;

	@Column(name="SAUR_STATUS")
	private String saurStatus;

	@Column(name="PAUR_RESULT")
	private String paurResult;

	@Column(name="PAUR_STATUS")
	private String paurStatus;

	@Column(name="SALMONELLA_RESULT")
	private String salmonellaResult;

	@Column(name="SALMONELLA_STATUS")
	private String salmonellaStatus;

	
//	@JsonIgnore
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "SHELF_LIFE_ID", nullable = false, insertable = false, updatable = false)
//	private QcShelfLifePeriodPhysicChemMicroF026History shelfLifePeriodPhysicChemMicroF026History;
//	

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SHELF_LIFE_HISTORY_ID", nullable = false, insertable = false, updatable = false)
	private QcShelfLifePeriodPhysicChemMicroF026History shelfLifePeriodPhysicChemMicroF026History;


}
