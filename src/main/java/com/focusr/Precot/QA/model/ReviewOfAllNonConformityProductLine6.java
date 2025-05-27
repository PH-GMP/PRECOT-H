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
@Table(name = "QA_REVIEW_OF_ALL_NON_CONFORMITY_PRODUCT_LINE_6", schema = AppConstants.schema)
public class ReviewOfAllNonConformityProductLine6 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "PRODUCT")
	private String product;
	
	@Column(name = "REASON_FOR_NC")
	private String reasonForNc;
	
	@Column(name = "IMPLICATION_ON_PASSED_BATCHES")
	private String implicationOnPassedBatches;
	
	@Column(name = "ID")
	private Long id;
}
