package com.focusr.Precot.Buds.model;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import com.focusr.Precot.model.audit.UserDateAudit;

import lombok.Data;

@Data
@MappedSuperclass
public class BudsBmrSignature extends UserDateAudit{

		// SUPERVISOR 
	
	@Column(name = "SUPERVISOR_NAME")
	private String supervisorName;
	
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisorStatus;
	
	@Column(name = "SUPERVISOR_ID")
	private Long supervisorId;
	
	@Column(name = "SUPERVISOR_DATE")
	private String supervisorDate;
	
	
		// QA
	
	@Column(name = "QA_NAME")
	private String qaName;
	
	@Column(name = "QA_STATUS")
	private String qaStatus;
	
	@Column(name = "QA_ID")
	private Long qaId;
	
	@Column(name = "QA_DATE")
	private String qaDate;
	
	
		// COMMON FIELDS
	
	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "FORMAT_NUMBER")
	private String formatNumber;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "BATCH_NO")
	private String batchNo;
	
	@Column(name = "ORDER_NO")
	private String orderNo;
	
	
}
