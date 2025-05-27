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
@Table(name = "QA_REVIEW_OF_CHANGE_CONTROL_SYSTEM_LINE_8", schema = AppConstants.schema)
public class ReviewOfChangeControlSystemLine8 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "CHANGE_CONTROL_NUMBER")
	private String changeControlNumber;
	
	@Column(name = "DATE_INITIATED")
	private String dateInitiated;
	
	@Column(name = "DESCRIPTION_PROPOSED_OF_CHANGE")
	private String descriptionProposedOfChange;
	
	@Column(name = "INITIATED_DEPARTMENT")
	private String initiatedDepartment;
	
	@Column(name = "CLOUSER_DATE")
	private String clouserDate;
	
	@Column(name = "ID")
	private Long id;
	

}
