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
import com.fasterxml.jackson.annotation.JsonProperty;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Table(name = "MICROBIOLOGICAL_TEST_F006_HISTORY",schema=AppConstants.schema)
@Entity
@Data
public class MicrobilogyTestF006History extends UserDateAudit{
	@Id
	@Column(name = "MICRO_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long micro_id;
	
	@Column(name = "TEST_ID")
	private Long test_id;
	
	@Column(name = "SAMPLED_ON")
	private String sampled_on;
	
	@Column(name = "TESTED_ON")
	private String tested_on;
	
	@Column(name = "TOTAL_VIABLE_COUNT")
	private String total_viable_count;
	
	@Column(name = "TOTAL_FUNGAL_COUNT")
	private String total_fungal_count;
	
	@Column(name = "GRAM")
	private String gram;
	
	@Column(name = "ESCHERECHIA_COLI")
	private String escherechia_coli;
	
	@Column(name = "PSEUDONYMOUS_AEROGENOSA")
	private String pseudonymous_aerogenosa ;
	
	@Column(name = "STAPYLOCOCCUS")
	private String stapylococcus;
	
	@Column(name = "PSEUDOMONAS")
	private String pseudomonas ;
	
	@Column(name = "SALMONELLA")
	private String Salmonella ;
	
	@Column(name = "MOISTURE")
	private String Moisture ;
	
	@Column(name = "TEST_COMPLETION_DATE")
	private String test_completion_date;
	
	@Column(name = "REMARK")
	private String remark;
	
	@Column(name = "PRODUCT")
	private String product;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TEST_ID", insertable = false, updatable = false)
	@JsonIgnore
	private finishedproductanalysisreporthistory finishedproductanalysisreportF006;
	
	
}
