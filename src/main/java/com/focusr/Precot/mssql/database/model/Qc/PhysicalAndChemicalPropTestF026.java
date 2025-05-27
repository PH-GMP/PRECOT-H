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
@Table(name = "PHYSICAL_AND_CHEMICAL_PROP_TESTF026", schema = AppConstants.schema)
public class PhysicalAndChemicalPropTestF026 {
 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	@Column(name="SHELF_LIFE_ID")
	private Long shelfLifeId;
	// NEW
	@Column(name="SAMPLING_DATE")
	private String samplingDate;
 
	@Column(name="TESTED_DATE")
	private String testedDate;
 
	@Column(name="DESCRIPTION_OBSERVATION")
	private String descriptionObservation;
 
	@Column(name="DESCRIPTION_REMARKS")
	private String descriptionRemarks;
 
	@Column(name="IDENTIFICATION_OBSERVATION")
	private String identificationObservation;
 
	@Column(name="IDENTIFICATION_REMARKS")
	private String identificationRemarks;
 
	@Column(name="FIBRE_OBSERVATION")
	private String fibreObservation;
 
	@Column(name="FIBRE_REMARKS")
	private String fibreRemarks;
 
	@Column(name="ACIDITY_OBSERVATION")
	private String acidityObservation;
 
	@Column(name="ACIDITY_REMARKS")
	private String acidityRemarks;
 
	@Column(name="SURFACE_ACTIVITY_OBSERVATION")
	private String surfaceActivityObservation;
 
	@Column(name="SURFACE_ACTIVITY_REMARKS")
	private String surfaceActivityRemarks;
 
	@Column(name="FOREIGN_FIBERS_OBSERVATION")
	private String foreignFibersObservation;
 
	@Column(name="FOREIGN_FIBERS_REMARKS")
	private String foreignFibersRemarks;
 
	@Column(name="FLUORESCENCE_OBSERVATION")
	private String fluorescenceObservation;
 
	@Column(name="FLUORESCENCE_REMARKS")
	private String fluorescenceRemarks;
 
	@Column(name="NEPS_OBSERVATION")
	private String nepsObservation;
 
	@Column(name="NEPS_REMARKS")
	private String nepsRemarks;
 
	@Column(name="NEPS_COUNT_GRAM_OBSERVATION")
	private String nepsCountGramObservation;
 
	@Column(name="NEPS_COUNT_GRAM_REMARKS")
	private String nepsCountGramRemarks;
 
	@Column(name="UPPER_QUARTILE_OBSERVATION")
	private String upperQuartileObservation;
 
	@Column(name="UPPER_QUARTILE_REMARKS")
	private String upperQuartileRemarks;
 
	@Column(name="LENGTH_BY_NUMBER_OBSERVATION")
	private String lengthByNumberObservation;
 
	@Column(name="LENGTH_BY_NUMBER_REMARKS")
	private String lengthByNumberRemarks;
 
	@Column(name="LENGTH_BY_WEIGHT_OBSERVATION")
	private String lengthByWeightObservation;
 
	@Column(name="LENGTH_BY_WEIGHT_REMARKS")
	private String lengthByWeightRemarks;
 
	@Column(name="SHORT_FIBER_CONTENT_BY_NUMBER_OBSERVATION")
	private String shortFiberContentByNumberObservation;
 
	@Column(name="SHORT_FIBER_CONTENT_BY_NUMBER_REMARKS")
	private String shortFiberContentByNumberRemarks;
 
	@Column(name="SHORT_FIBER_CONTENT_BY_WT_OBSERVATION")
	private String shortFiberContentByWtObservation;
 
	@Column(name="SHORT_FIBER_CONTENT_BY_WT__REMARKS")
	private String shortFiberContentByWtRemarks;
 
	@Column(name="MICRONAIRE_OBSERVATION")
	private String micronaireObservation;
 
	@Column(name="MICRONAIRE_REMARKS")
	private String micronaireRemarks;
 
	@Column(name="WHITENESS_INDICES_OBSERVATION")
	private String whitenessIndicesObservation;
 
	@Column(name="WHITENESS_INDICES_REMARKS")
	private String whitenessIndicesRemarks;
 
	@Column(name="EXTRACTABLE_COLOURING_OBSERVATION")
	private String extractableColouringObservation;
 
	@Column(name="EXTRACTABLE_COLOURING_REMARKS")
	private String extractableColouringRemarks;
 
	// 13
	@Column(name="SINKING_TRAIL1")
	private String sinkingTrail1;
 
	@Column(name="SINKING_TRAIL2")
	private String sinkingTrail2;
 
	@Column(name="SINKING_TRAIL3")
	private String sinkingTrail3;
 
	@Column(name="SINKING_TRAIL_AVG")
	private String sinkingTrailAvg;
 
	@Column(name="SINKING_TRAIL_REMARKS")
	private String sinkingTrailRemarks;
 
	@Column(name="ABSORBPTION_TRAIL1")
	private String absorbptionTrail1;
 
	@Column(name="ABSORBPTION_TRAIL2")
	private String absorbptionTrail2;
 
	@Column(name="ABSORBPTION_TRAIL3")
	private String absorbptionTrail3;
 
	@Column(name="ABSORBPTION_TRAIL_AVG")
	private String absorbptionTrailAvg;
 
	@Column(name="ABSORBPTION_TRAIL_REMARKS")
	private String absorbptionTrailRemarks;
 
	@Column(name="SULPHATED_ASH_FINAL")
	private String sulphatedAshFinal;
	@Column(name="SULPHATED_ASH_REMARKS")
	private String sulphatedAshRemarks;
 
	@Column(name="SULPHATED_ASH_INITIAL")
	private String sulphatedAshInitial;
 
	@Column(name="SULPHATED_ASH_BA")
	private String sulphatedAshBa;
 
	@Column(name="SULPHATED_ASH_RESULT")
	private String sulphatedAshResult;
 
	@Column(name="WATER_SOLUBLE_FINAL")
	private String waterSolubleFinal;
	@Column(name="WATER_SOLUBLE_REMARKS")
	private String waterSolubleRemarks;
 
	@Column(name="WATER_SOLUBLE_INITIAL")
	private String waterSolubleInitial;
 
	@Column(name="WATER_SOLUBLE_BA")
	private String waterSolubleBa;
 
	@Column(name="WATER_SOLUBLE_RESULT")
	private String waterSolubleResult;
 
	@Column(name="ETHER_SOLUBLE_FINAL")
	private String etherSolubleFinal;
 
	
	@Column(name="ETHER_SOLUBLE_REMARKS")
	private String etherSolubleRemarks;

	@Column(name="ETHER_SOLUBLE_INITIAL")
	private String etherSolubleInitial;
 
	@Column(name="ETHER_SOLUBLE_BA")
	private String etherSolubleBa;
 
	@Column(name="ETHER_SOLUBLE_RESULT")
	private String etherSolubleResult;
 
	@Column(name="LOSS_ON_DRYING_REMARKS")
	private String lossOnDryingRemarks;
 
	@Column(name="LOSS_ON_DRYING_INITIAL")
	private String lossOnDryingInitial;
 
	@Column(name="LOSS_ON_DRYING_BA")
	private String lossOnDryingBa;
 
	@Column(name="LOSS_ON_DRYING_RESULT")
	private String lossOnDryingResult;
	
	@Column(name="LOSS_ON_DRYING_FINAL")
	private String lossOnDryingFinal;
 
 
	
	@Column(name="REMARKS")
	private String remarks;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "SHELF_LIFE_ID", nullable = false, insertable = false, updatable = false)
	private QcShelfLifePeriodPhysicChemMicroF026 shelfLifePeriodPhysicChemMicroF026;
	
	
}