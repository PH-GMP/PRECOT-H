package com.focusr.Precot.mssql.database.model.Qc;

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
@Table(name = "MICROBIOLOGICAL_TEST_AR_F026", schema = AppConstants.schema)
public class MicrobiologicalTestF026 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	@Column(name = "SHELF_LIFE_ID")
	private Long shelfLifeId;

	@Column(name = "SAMPLED_ON")
	private String sampledOn;

	@Column(name = "TEST_INCUBATION_START_ON")
	private String testIncubationStartOn;

	@Column(name = "TOTAL_VIABLE_COUNT")
	private String totalViableCount;

	@Column(name = "TOTAL_FUNGAL_COUNT")
	private String totalFungalCount;

	@Column(name = "GRAM_NEGATIVE_BACTERIA_OR_COLIFORM")
	private String gramNegativeBacteriaOrColiform;

	@Column(name = "ESCHERICHIA_COLI")
	private String escherichiaColi;

	@Column(name = "STAPHYLOCOCCUS_AUREUS")
	private String staphylococcusAureus;

	@Column(name = "PSEUDOMONAS_AERUGINOSA")
	private String pseudomonasAeruginosa;

	@Column(name = "SALMONELLA")
	private String salmonella;

	@Column(name = "MOISTURE_PERCENTAGE")
	private String moisturePercentage;

	@Column(name = "TEST_COMPLETION_DATE")
	private String testCompletionDate;

	@Column(name = "NOTE")
	private String note;

	@Column(name = "REMARK")
	private String remark;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SHELF_LIFE_ID", nullable = false, insertable = false, updatable = false)
	private QcShelfLifePeriodPhysicChemMicroF026 shelfLifePeriodPhysicChemMicroF026;

}