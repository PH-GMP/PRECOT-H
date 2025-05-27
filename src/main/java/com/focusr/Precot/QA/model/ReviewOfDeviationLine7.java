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
@Table(name = "QA_REVIEW_OF_DEVIATION_LINE_7", schema = AppConstants.schema)
public class ReviewOfDeviationLine7 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "DATE_OR_DEVIATION_NO")
	private String dateOrDeviationNo;
	
	@Column(name = "DETAILS_OF_DEVIATION")
	private String detailsOfDeviation;
	
	@Column(name = "ROOT_CAUSE")
	private String rootCause;
	
	@Column(name = "CAPA")
	private String capa;
	
	@Column(name = "CLOSURE_DATE")
	private String closureDate;
	
	@Column(name = "DEVIATION_REMARKS")
	private String deviationRemarks;
	
	@Column(name = "ID")
	private Long id;
}
