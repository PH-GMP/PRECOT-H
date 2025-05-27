package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "CHEMICAL_ANALYSIS_REPORT_AR_F003", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "MATERIAL_DOC_NO"}) })
public class NonWovenFleeceAnalysisARF005 extends UserDateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "MATERIAL_DOC_NO")
	private String materialDocNo;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "SUPPLIER")
	private String supplier;
	
	@Column(name = "CHEMICAL_NAME")
	private String chemicalName;
	
	@Column(name = "CHEMICAL_BATCH_NO")
	private String chemicalBatchNo;
	
	@Column(name = "ANALYTICAL_REQUEST_NO")
	private Long analyticalRequestNo;
	
	@Column(name = "TESTED_DATE")
	private String testedDate;
	
	@Column(name = "SAMPLE_DATE")
	private String sampleDate;
	
	@Column(name = "APPEARANCE_SPEC")
	private String appearanceSpec;
	
	@Column(name = "APPEARANCE_OBSR")
	private String appearanceObsr;
	
	@Column(name = "COLOR_SPEC")
	private String colorSpec;
	
	@Column(name = "COLOR_OBSR")
	private String colorObsr;
	
	@Column(name = "ODOUR_SPEC")
	private String odourSpec;
	
	@Column(name = "ODOUR_OBSR")
	private String odourObsr;
	
	@Column(name = "SOLUBILITY_IN_WATER_SPEC")
	private String solubilityInWaterSpec;
	
	@Column(name = "SOLUBILITY_IN_WATER_OBSR")
	private String solubilityInWaterObsr;
	
	@Column(name = "VISIBLE_SPEC")
	private String visibleSpec;
	
	@Column(name = "VISIBLE_OBSR")
	private String visibleObsr;
	
	@Column(name = "PH_SPEC")
	private Double phSpec;
	
	@Column(name = "PH_OBSR")
	private Double phObsr;
	
	@Column(name = "PURITY_SPEC")
	private Double puritySpec;
	
	@Column(name = "PURITY_OBSR")
	private Double purityObsr;
	
	@Column(name = "RELATIVE_DENSITY_SPEC")
	private Double relativeDensitySpec;
	
	@Column(name = "RELATIVE_DENSITY_OBSR")
	private Double relativeDensityObsr;
	
	@Column(name = "SPECIFIC_GRAVITY_SPEC")
	private Double specificGravitySpec;
	
	@Column(name = "SPECIFIC_GRAVITY_OBSR")
	private Double specificGravityObsr;
	
	@Column(name = "TOTAL_SOLIDS_SPEC")
	private Double totalSolidsSpec;
	
	@Column(name = "TOTAL_SOLIDS_OBSR")
	private Double totalSolidsObsr;
	
	@Column(name = "MOISTURE_SPEC")
	private Double moistureSpec;
	
	@Column(name = "MOISTURE_OBSR")
	private Double moistureObsr;
	
	@Column(name = "STANDARDIZED_CHEMICAL_LOTNO")
	private Long standardizedChemicalLotNo;
	
	@Column(name = "CALCULATION")
	private String calculation;
	
	@Column(name = "DISPOSAL_METHOD")
	private String disposalMethod;
	
	@Column(name = "REMARK")
	private String remark;
	
	@Column(name = "QTY_ACCEPTED_IN_KG")
	private Double qtyAcceptedInKg;
	
	@Column(name = "QTY_REJECTED_IN_KG")
	private Double qtyRejectedInKg;
	
	@Column(name = "QTY_ACCEPTED_UNDER_DEVIATION")
	private Double qtyAcceptedUnderDeviation;
	
	@Column(name = "CHEMIST_STATUS")
	private String chemist_status;

	@Column(name = "CHEMIST_SAVED_ON")
	private Date chemist_saved_on;

	@Column(name = "CHEMIST_SAVED_BY")
	private String chemist_saved_by;

	@Column(name = "CHEMIST_SAVED_ID")
	private Long chemist_saved_id;

	@Column(name = "CHEMIST_SUBMIT_ON")
	private Date chemist_submit_on;

	@Column(name = "CHEMIST_SUBMIT_BY")
	private String chemist_submit_by;

	@Column(name = "CHEMIST_SUBMIT_ID")
	private Long chemist_submit_id;

	@Column(name = "CHEMIST_SIGN")
	private String chemist_sign;
	
	@Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SUBMIT_ON")
	private Date qc_submit_on;

	@Column(name = "QC_SUBMIT_BY")
	private String qc_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long qc_submit_id;

	@Column(name = "QC_SIGN")
	private String qc_sign;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	
	
}
