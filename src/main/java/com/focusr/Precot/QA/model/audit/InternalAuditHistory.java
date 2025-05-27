package com.focusr.Precot.QA.model.audit;


import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

@Data
@Entity
@Table(name="QA_INTERNAL_AUDIT_HISTORY" ,schema=AppConstants.schema)
public class InternalAuditHistory extends UserDateAudit  {
	
	@Column(name="ID")
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long auditId;
	
	@Column(name="DEPARTMENT")
	private String department;
	
	@Column(name="AUDITEE")
	private String auditee;
	
	@Column(name="AUDITOR")
	private String auditor;
	
	@Column(name="AUDIT_TYPE")
	private String auditType;
	
	@Column(name="AUDIT_DATE")
	private String auditDate;
	
	@Column(name="AUDIT_TIME")
	private String auditTime;
	
	@Column(name="HISTORY_ID")
	private Long scheduleId; 
}
