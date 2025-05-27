package com.focusr.Precot.mssql.database.model.QcAudit;

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
@Table(name = "QC_SHELF_LIFE_PERIOD_PHYCICAL_CHEM_MICROF026_HSITORY", schema = AppConstants.schema)
public class QcShelfLifePeriodPhysicChemMicroF026History extends UserDateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "CUSTOMER")
	private String customer;

	@Column(name = "BRAND")
	private String brand;

	@Column(name = "PRODUCTION_DESCRIPTION")
	private String productDescription;

	@Column(name = "SHAPE")
	private String shape;

	@Column(name = "LOT_NUMBER")
	private String lotNumber;

	@Column(name = "PRODUCTION_DATE")
	private String productionDate;

	@Column(name = "TESTING_DATE")
	private String testingDate;

	@Column(name = "DIMENSION_STD")
	private String dimensionStd;

	@Column(name = "DIMENSION_T1_ACTUAL")
	private String dimensionT1Actual;

	@Column(name = "DIMENSION_T1_STATUS")
	private String dimensionT1Status;

	@Column(name = "DIMENSION_T2_ACTUAL")
	private String dimensionT2Actual;

	@Column(name = "DIMENSION_T2_STATUS")
	private String dimensionT2Status;

	@Column(name = "DIMENSION_T3_ACTUAL")
	private String dimensionT3Actual;

	@Column(name = "DIMENSION_T3_STATUS")
	private String dimensionT3Status;

	@Column(name = "DIMENSION_T4_ACTUAL")
	private String dimensionT4Actual;

	@Column(name = "DIMENSION_T4_STATUS")
	private String dimensionT4Status;

	@Column(name = "DIMENSION_T5_ACTUAL")
	private String dimensionT5Actual;

	@Column(name = "DIMENSION_T5_STATUS")
	private String dimensionT5Status;

	@Column(name = "DIMENSION_AVG_ACTUAL")
	private String dimensionAvgActual;

	@Column(name = "DIMENSION_AVG_STATUS")
	private String dimensionAvgStatus;

	@Column(name = "WEIGHT_STD")
	private String  weightStd;

	@Column(name = "WEIGHT_T1_ACTUAL")
	private String weightT1Actual;

	@Column(name = "WEIGHT_T1_STATUS")
	private String weightT1Status;

	@Column(name = "WEIGHT_T2_ACTUAL")
	private String weightT2Actual;

	@Column(name = "WEIGHT_T2_STATUS")
	private String weightT2Status;

	@Column(name = "WEIGHT_T3_ACTUAL")
	private String weightT3Actual;

	@Column(name = "WEIGHT_T3_STATUS")
	private String weightT3Status;

	@Column(name = "WEIGHT_T4_ACTUAL")
	private String weightT4Actual;

	@Column(name = "WEIGHT_T4_STATUS")
	private String weightT4Status;

	@Column(name = "WEIGHT_T5_ACTUAL")
	private String weightT5Actual;

	@Column(name = "WEIGHT_T5_STATUS")
	private String weightT5Status;

	@Column(name = "WEIGHT_AVG_ACTUAL")
	private String weightAvgActual;

	@Column(name = "WEIGHT_AVG_STATUS")
	private String weightAvgStatus;

	@Column(name = "THICKNESS_STD")
	private String  thicknessStd;

	@Column(name = "THICKNESS_T1_ACTUAL")
	private String thicknessT1Actual;

	@Column(name = "THICKNESS_T1_STATUS")
	private String thicknessT1Status;

	@Column(name = "THICKNESS_T2_ACTUAL")
	private String thicknessT2Actual;

	@Column(name = "THICKNESS_T2_STATUS")
	private String thicknessT2Status;

	@Column(name = "THICKNESS_T3_ACTUAL")
	private String thicknessT3Actual;

	@Column(name = "THICKNESS_T3_STATUS")
	private String thicknessT3Status;

	@Column(name = "THICKNESS_T4_ACTUAL")
	private String thicknessT4Actual;

	@Column(name = "THICKNESS_T4_STATUS")
	private String thicknessT4Status;

	@Column(name = "THICKNESS_T5_ACTUAL")
	private String thicknessT5Actual;

	@Column(name = "THICKNESS_T5_STATUS")
	private String thicknessT5Status;

	@Column(name = "THICKNESS_AVG_ACTUAL")
	private String thicknessAvgActual;

	@Column(name = "THICKNESS_AVG_STATUS")
	private String thicknessAvgStatus;

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

	@Column(name = "MICROBIOLOGIST_STATUS")
	private String microbiologist_status;

	@Column(name = "MICROBIOLOGIST_SAVED_ON")
	private Date microbiologist_saved_on;

	@Column(name = "MICROBIOLOGIST_SAVED_BY")
	private String microbiologist_saved_by;

	@Column(name = "MICROBIOLOGIST_SAVED_ID")
	private Long microbiologist_saved_id;

	@Column(name = "MICROBIOLOGIST_SUBMIT_ON")
	private Date microbiologist_submit_on;

	@Column(name = "MICROBIOLOGIST_SUBMIT_BY")
	private String microbiologist_submit_by;

	@Column(name = "MICROBIOLOGIST_SUBMIT_ID")
	private Long microbiologist_submit_id;

	@Column(name = "MICROBIOLOGIST_SIGN")
	private String microbiologist_sign;
	
	@Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SAVED_ON")
	private Date qc_saved_on;

	@Column(name = "QC_SAVED_BY")
	private String qc_saved_by;

	@Column(name = "QC_SAVED_ID")
	private Long qc_saved_id;

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
	
	@Column(name = "VERSION")
	private int version;

	
	@OneToMany(mappedBy = "shelfLifePeriodPhysicChemMicroF026History", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PhysicalAndChemicalPropTestF026History> physicalAndChemicalTests;

	@OneToMany(mappedBy = "shelfLifePeriodPhysicChemMicroF026History", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<MicrobiologicalTestF026History> microbiologicalTests;
	
	
	
}
