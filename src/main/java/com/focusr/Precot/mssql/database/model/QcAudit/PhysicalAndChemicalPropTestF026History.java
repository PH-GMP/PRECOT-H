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
@Table(name = "PHYSICAL_AND_CHEMICAL_PROP_TESTF026HISTORY", schema = AppConstants.schema)
public class PhysicalAndChemicalPropTestF026History {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name="SHELF_LIFE_HISTORY_ID")
	private Long shelfLifeHistoryId;
	
	@Column(name="FIBER_IDENTIFICATION_RESULT")
	private String fiberIdentificationResult;

	@Column(name="FIBER_IDENTIFICATION_REMARK")
	private String fiberIdentificationRemarks;

	@Column(name="ODUR_RESULT")
	private String odurResult;

	@Column(name="ODUR_REMARK")
	private String odurRemarks;

	@Column(name="FOREIGN_FIBERS_RESULT")
	private String foreignFibersResult;

	@Column(name="FOREIGN_FIBERS_REMARKS")
	private String foreignFibersRemarks;

	@Column(name="FLOURESCENCE_RESULT")
	private String flourescenceResult;

	@Column(name="FLOURESCENCE_REMARK")
	private String flourescenceRemark;

	@Column(name="SINKING_TIME_RESULT")
	private String sinkingTimeResult;
	
	@Column(name = "SINKINGTIMERESULT_A")
	private String  sinkingTimeResulta;
	
	@Column(name = "SINKINGTIMERESULT_B")
	private String  sinkingTimeResultb;
	
	@Column(name = "SINKINGTIMERESULT_C")
	private String  sinkingTimeResultc;

	@Column(name="SINKING_TIME_REMARK")
	private String sinkingTimeRemark;

	@Column(name="ABSORBANCY_RESULT")
	private String absorbancyResult;
	
	//--------------------
		@Column(name="ABSORBANCY_RESULT_A")
		private String absorbancyResulta;
		
		@Column(name="ABSORBANCY_RESULT_B")
		private String absorbancyResultb;
		
		@Column(name="ABSORBANCY_RESULT_C")
		private String absorbancyResultC;

	@Column(name="ABSORBANCY_REMARK")
	private String absorbancyRemark;

	@Column(name="PH_RESULT")
	private String phResult;

	@Column(name="PH_REMARK")
	private String phRemark;

	@Column(name="SURFACE_ACTIVITY_RESULT")
	private String surfaceActivityResult;

	@Column(name="SURFACE_ACTIVITY_REMARK")
	private String surfaceActivityRemark;

	@Column(name="WHITENESS_INDICES_RESULT")
	private String whitenessIndicesResult;

	@Column(name="WHITENESS_INDICES_REMARK")
	private String whitenessIndicesRemark;

	@Column(name="ASH_CONTENT_RESULT")
	private String ashContentResult;

	@Column(name="ASH_CONTENT_REMARK")
	private String ashContentRemark;

	@Column(name="WATER_SOLUABLE_RESULT")
	private String waterSolubleResult;

	@Column(name="WATER_SOLUABLE_REMARK")
	private String waterSolubleRemark;

	@Column(name="ETHER_SOLUABLE_RESULT")
	private String etherSoluableResult;

	@Column(name="ETHER_SOLUABLE_REMARK")
	private String etherSouluableRemark;

	@Column(name="MICRONAIRE_VALUE_RESULT")
	private String micronaireValueResult;

	@Column(name="MICRONAIRE_VALUE_REMARK")
	private String micronaireValueRemark;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SHELF_LIFE_HISTORY_ID", nullable = false, insertable = false, updatable = false)
	private QcShelfLifePeriodPhysicChemMicroF026History shelfLifePeriodPhysicChemMicroF026History;
}
