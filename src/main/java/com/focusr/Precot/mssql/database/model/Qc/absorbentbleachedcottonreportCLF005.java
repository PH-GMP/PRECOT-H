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
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "ABSORBENT_BLEACHED_COTTON_REPORT_CLF005", schema = AppConstants.schema)
@Data
public class absorbentbleachedcottonreportCLF005 extends UserDateAudit {

	    @Id
		@Column(name = "TEST_ID")
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long test_id;
		
		@Column(name = "FORMAT")
		private String format;
		
		@Column(name = "FORMAT_NO")
		private String format_no;
		
		@Column(name = "REF_SOP_NO")
		private String ref_sop_no;
		
		@Column(name = "UNIT")
		private String unit;
		
	    @Column(name = "TESTED_DATE")
	    private String testedDate;
	    
	    @Column(name = "BMR")
	    private String bmr;

	    @Column(name = "REGULAR_TRIAL_BATCH")
	    private String regularOrTrialBatch;

	    @Column(name = "BATCH_NO")
	    private String batchNo;

	    @Column(name = "MIXING")
	    private String mixing;

	    @Column(name = "SOFTENER")
	    private String softener;

	    @Column(name = "LOCAL_EXPORT")
	    private String localOrExport;

	    @Column(name = "PHYSICAL_APPEARANCE")
	    private String physicalAppearance;

	    @Column(name = "ODOR")
	    private String odor;

	    @Column(name = "FIBER_IDENTIFICATION")
	    private String fiberIdentification;

	    @Column(name = "FOREIGN_FIBERS")
	    private String foreignFibers;

	    @Column(name = "PH")
	    private Double ph;

	    @Column(name = "SURFACE_ACTIVITY")
	    private String surfaceActivity;

	    @Column(name = "ACIDITY_ALKALINITY")
	    private String acidityOrAlkalinity;

	    @Column(name = "SINKING_TIME")
	    private Double sinkingTime;

	    @Column(name = "ABSORBENCY_WH_C")
	    private Double absorbencyWhC;

	    @Column(name = "SULPHATE_ASH")
	    private Double sulphateAsh;

	    @Column(name = "WATER_SOLUBLE_SUBSTANCES")
	    private Double waterSolubleSubstances;

	    @Column(name = "ETHER_SOLUBLE_SUBSTANCES")
	    private Double etherSolubleSubstances;

	    @Column(name = "DRYING_LOSS")
	    private Double dryingLoss;

	    @Column(name = "FLUORESCENCE")
	    private String fluorescence;

	    @Column(name = "EXTRACTABLE_COLOURING_MATTER")
	    private String extractableColouringMatter;

	    @Column(name = "NEPS_COUNT_G")
	    private Integer nepsCountPerG;

	    @Column(name = "UQL_MM")
	    private Double uqlMm;

	    @Column(name = "L_N_MM")
	    private Double lNmm;

	    @Column(name = "L_W_MM")
	    private Double lWmm;

	    @Column(name = "FIBER_AVERAGE_LENGTH")
	    private Double fiberAverageLength;

	    @Column(name = "SFC_N")
	    private Double sfcN;

	    @Column(name = "SFC_W")
	    private Double sfcW;

	    @Column(name = "MICRONAIRE_VALUE")
	    private Double micronaireValue;

	    @Column(name = "WHITENESS_INDEX")
	    private Double whitenessIndex;

	    @Column(name = "TOTAL_VIABLE_COUNT_TVC_CFU_G")
	    private Integer totalViableCountTvc;

	    @Column(name = "TOTAL_FUNGAL_COUNT_TFC_CFU_G")
	    private Integer totalFungalCountTfc;

	    @Column(name = "REMARKS")
	    private String remarks;

	    @Column(name = "ACCEPTED")
	    private String accepted;

	    @Column(name = "SPECIFICATION_PASSED")
	    private String specificationPassed;

	    @Column(name = "REPORTED_BY")
	    private String reportedBy;

	    @Column(name = "APPROVED_BY")
	    private String approvedBy;
	    
		@Column(name = "REVISION_NO")
		private String revision_no;
		
		@Column(name = "REPORT_DATE")
		private String report_date;
		
		@Column(name = "FUMIGATION_DATE")
		private String fumigation_date;
		
		@Column(name = "CHEMICAL_NAME")
		private String chemical_name;
		
		@Column(name = "PA_ID")
		private Long pa_id;
		
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "PA_ID", insertable = false, updatable = false)
		@JsonIgnore
		private absorbentbleachedcottonreportCLF005Parent absorbentbleachedcottonreportCLF005Parent;


	    // Getters and Setters
	}


