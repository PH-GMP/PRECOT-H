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
@Table(name = "MICROBIOLOGICAL_TEST_AR_F001", schema = AppConstants.schema)
public class MicrobiologicalTestARF001 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name="RAW_COTTON_ANALYSIS_ID")
	private Long rawCottenAnalysisId;

	@Column(name = "SAMPLED_ON")
	private String sampledOn;

	@Column(name = "TESTED_OR_INCUBATION_STARTON")
	private String testedOrIncubationStartOn;

	@Column(name = "TOTAL_VIABLE_COUNT")
	private Long totalViableCount;

	@Column(name = "TOTAL_FUNGAL_COUNT")
	private Long totalFungalCount;

	@Column(name = "COLIFORM")
	private String coliform;

	@Column(name = "E_COLI")
	private String ecoli;
	
	@Column(name = "S_AUR")
	private String saur;

	@Column(name = "P_AER")
	private String paer;

	@Column(name = "SAL")
	private String sal;

	@Column(name = "TEST_COMPLETION_DATE")
	private String testCompletionDate;

	@Column(name = "NOTE")
	private String note;

	@Column(name = "REMARK")
	private String remark;

	@Column(name = "PRODUCT")
	private String product;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RAW_COTTON_ANALYSIS_ID", nullable = false, insertable = false, updatable = false)
	private RawCottenAnalysisReportARF001 rawCottenAnalysisReport;
	

}
