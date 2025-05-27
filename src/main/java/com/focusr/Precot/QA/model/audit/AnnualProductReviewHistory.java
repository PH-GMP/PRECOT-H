package com.focusr.Precot.QA.model.audit;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_ANNUAL_PRODUCT_REVIEW_HISTORY", schema = AppConstants.schema)
public class AnnualProductReviewHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long historyId;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "SOP_NO")
	private String sopNumber;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;
	
	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "PRODUCT_NAME")
	private String productName;
	
	@Column(name = "PRODUCT_CODE")
	private String productCode;
	
	@Column(name = "SHELF_LIFE")
	private String shelfLife;
	
	@Column(name = "PACK_SIZE")
	private String packSize;
	
	@Column(name = "NO_OF_BATCHES")
	private String noOfBatches;
	
	@Column(name = "REVIEW_PERIOD")
	private String reviewPeriod;
	
	@Column(name = "PREPARED_BY")
	private String preparedBy;
	
	@Column(name = "PREPARED_DATE")
	private String preparedDate;
	
	@Column(name = "REVIEWED_BY")
	private String reviewedBy;
	
	@Column(name = "REVIEWD_DATE")
	private String reviewdDate;
	
	@Column(name = "APPROVED_BY")
	private String approvedBy;
	
	@Column(name = "APPROVED_DATE")
	private String approvedDate;
	
	@Column(name = "PRODUCT_NAME_A")
	private String productNameA;
	
	@Column(name = "PRODUCT_CODE_A")
	private String productCodeA;
	
	@Column(name = "SHELF_LIFE_A")
	private String shelfLifeA;
	
	@Column(name = "PACK_SIZE_A")
	private String packSizeA;
	
	@Column(name = "NO_OF_BATCHES_A")
	private String noOfBatchesA;
	
	@Column(name = "REVIEW_PERIOD_A")
	private String reviewPeriodA;
	
	@Column(name = "PREPARED_BY_A")
	private String preparedByA;
	
	@Column(name = "PREPARED_DATE_A")
	private String preparedDateA;
	
	@Column(name = "REVIEWED_BY_A")
	private String reviewedByA;
	
	@Column(name = "REVIEWD_DATE_A")
	private String reviewdDateA;
	
	@Column(name = "APPROVED_BY_A")
	private String approvedByA;
	
	@Column(name = "APPROVED_DATE_A")
	private String approvedDateA;
	
	@Column(name = "MAXIMUM_VALUE_ORDER_NO")
	private String maximumValueOrderNo;
	
	@Column(name = "MAXIMUM_VALUE_LOTS_TESTED")
	private String maximumValueLotsTested;
	
	@Column(name = "MAXIMUM_VALUE_PRODUCT")
	private String maximumValueProduct;
	
	@Column(name = "MAXIMUM_VALUE_WHITENESS")
	private String maximumValueWhiteness;
	
	@Column(name = "MAXIMUM_VALUE_SINKING")
	private String maximumValueSinking;
	
	@Column(name = "MAXIMUM_VALUE_ABSORPTION")
	private String maximumValueAbsorption;
	
	@Column(name = "MAXIMUM_VALUE_MOISTURE")
	private String maximumValueMoisture;
	
	@Column(name = "MINIMUM_VALUE_ORDER_NO")
	private String minimumValueOrderNo;
	
	@Column(name = "MINIMUM_VALUE_LOTS_TESTED")
	private String minimumValueLotsTested;
	
	@Column(name = "MINIMUM_VALUE_PRODUCT")
	private String minimumValueProduct;
	
	@Column(name = "MINIMUM_VALUE_WHITENESS")
	private String minimumValueWhiteness;
	
	@Column(name = "MINIMUM_VALUE_SINKING")
	private String minimumValueSinking;
	
	@Column(name = "MINIMUM_VALUE_ABSORPTION")
	private String minimumValueAbsorption;
	
	@Column(name = "MINIMUM_VALUE_MOISTURE")
	private String minimumValueMoisture;
	
	@Column(name = "AVEREGE_ORDER_NO")
	private String averageOrderNo;
	
	@Column(name = "AVEREGE_LOTS_TESTED")
	private String averageLotsTested;
	
	@Column(name = "AVEREGE_PRODUCT")
	private String averageProduct;
	
	@Column(name = "AVEREGE_WHITENESS")
	private String averageWhiteness;
	
	@Column(name = "AVEREGE_SINKING")
	private String averageSinking;
	
	@Column(name = "AVERAGE_ABSORPTION")
	private String averageAbsorption;
	
	@Column(name = "AVERAGE_MOISTURE")
	private String averageMoisture;
	
	@Column(name = "RECOMMENDATIONS")
	private String recommendations;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
	
	// STATUS

	// QA_MANAGER_OR_DESIGNEE
	@Column(name = "QA_DESIGNEE_STATUS")
	private String qaDesigneeStatus;

	@Column(name = "QA_DESIGNEE_SAVE_ON")
	private Date qaDesigneeSaveOn;

	@Column(name = "QA_DESIGNEE_SAVE_BY")
	private String qaDesigneeSaveBy;

	@Column(name = "QA_DESIGNEE_SAVE_ID")
	private Long qaDesigneeSaveId;

	@Column(name = "QA_DESIGNEE_SUBMIT_ON")
	private Date qaDesigneeSubmitOn;

	@Column(name = "QA_DESIGNEE_SUBMIT_BY")
	private String qaDesigneeSubmitBy;

	@Column(name = "QA_DESIGNEE_SUBMIT_ID")
	private Long qaDesigneeSubmitId;

	@Column(name = "QA_DESIGNEE_SIGN")
	private String qaDesigneeSign;
	
	// QA_MANAGER_OR_MR_STATUS
	@Column(name = "QA_MANAGER_OR_MR_STATUS")
	private String qaManagerOrMrStatus;

	@Column(name = "QA_MANAGER_OR_MR_APPROVED_ON")
	private Date qaManagerOrMrApprovedOn;

	@Column(name = "QA_MANAGER_OR_MR_APPROVED_BY")
	private String qaManagerOrMrApprovedBy;

	@Column(name = "QA_MANAGER_OR_MR_APPROVER_ID")
	private Long qaManagerOrMrApproverId;

	@Column(name = "QA_MANAGER_OR_MR_SIGN")
	private String qaManagerOrMrSign;

	@OneToMany(targetEntity = SummaryLine1History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<SummaryLine1History> summaryline1history;
	
	@OneToMany(targetEntity = SummaryParametersLine1History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<SummaryParametersLine1History> summaryparametersline1history;
	
	@OneToMany(targetEntity = RawMaterialsDetailsLine2History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<RawMaterialsDetailsLine2History> rawmaterialsdetailsline2history;
	
	@OneToMany(targetEntity = PackingMaterialDetailsLine3History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<PackingMaterialDetailsLine3History> packingmaterialdetailsline3history;
	
	@OneToMany(targetEntity = ListOfEquipmentAndQualificationLine4History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<ListOfEquipmentAndQualificationLine4History> listofequipmentandqualificationline4history;

	@OneToMany(targetEntity = ReviewOfCriticalParameterChecksOfLine5History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<ReviewOfCriticalParameterChecksOfLine5History> reviewofcriticalparameterchecksofline5history;
	
	@OneToMany(targetEntity = ReviewOfAllNonConformityProductLine6History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<ReviewOfAllNonConformityProductLine6History> reviewofallnonconformityproductline6history;
	
	@OneToMany(targetEntity = ReviewOfDeviationLine7History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<ReviewOfDeviationLine7History> reviewofdeviationline7history;

	@OneToMany(targetEntity = ReviewOfChangeControlSystemLine8History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<ReviewOfChangeControlSystemLine8History> reviewofchangecontrolsystemline8history;

	@OneToMany(targetEntity = ComplaintsRejectsAndProductRecallsLine9History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<ComplaintsRejectsAndProductRecallsLine9History> complaintsrejectsandproductrecallsline9history;

	@OneToMany(targetEntity = ReviewOfProductRecallLine10History.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<ReviewOfProductRecallLine10History> reviewofproductrecallline10history;

}
