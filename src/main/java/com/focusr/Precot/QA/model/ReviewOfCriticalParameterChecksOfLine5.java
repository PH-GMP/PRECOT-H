package com.focusr.Precot.QA.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_REVIEW_OF_CRITICAL_PARAMETER_CHECKS_OF_LINE_5", schema = AppConstants.schema)
public class ReviewOfCriticalParameterChecksOfLine5 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "REVIEW_PRODUCT_CODE")
	private String reviewProductCode;
	
	@Column(name = "TOTAL_ORDER_NO")
	private String totalOrderNo;
	
	@Column(name = "NO_OF_LOTS_TESTED")
	private String noOfLotsTested;
	
	@Column(name = "PRODUCT_DIMENSION")
	private String productDimension;
	
	@Column(name = "WHITENESS")
	private String whiteness;
	
	@Column(name = "SINKING_TIME")
	private String sinkingTime;
	
	@Column(name = "ABSORPTION_CAPACITY")
	private String absorptionCapacity;
	
	@Column(name = "MOISTURE")
	private String moisture;
	
	@Column(name = "REVIEW_REMARKS")
	private String reviewRemarks;
	
	@Column(name = "ID")
	private Long id;
}
