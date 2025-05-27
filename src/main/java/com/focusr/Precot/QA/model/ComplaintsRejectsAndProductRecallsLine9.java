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
@Table(name = "QA_COMPLAINTS_REJECT_AND_PRODUCT_RECALL_LINE_9", schema = AppConstants.schema)
public class ComplaintsRejectsAndProductRecallsLine9 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;
	
	@Column(name = "COMPLAINT_DATE")
	private String complaintDate;
	
	@Column(name = "COMPLAINT_CAPA")
	private String complaintCapa;
	
	@Column(name = "DESCRIPTION")
	private String description;
	
	@Column(name = "CORRECTIVE_OR_PREVENTIVE_ACTION")
	private String correctiveOrPreventiveAction;
	
	@Column(name = "OPEN_OR_CLOSED")
	private String openOrClosed;
	
	@Column(name = "COMPLAINT_REMARKS")
	private String complaintRemarks;
	
	@Column(name = "ID")
	private Long id;
	
}
