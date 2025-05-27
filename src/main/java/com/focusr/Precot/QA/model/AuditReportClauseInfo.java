package com.focusr.Precot.QA.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;
import lombok.Data;

@Data
@Entity
@Table(name = "QA_AUDIT_REPORT_CLAUSE_INFO", schema = AppConstants.schema)
public class AuditReportClauseInfo extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CLAUSE_ID")
	private Long clauseId;
	
	@Column(name = "CLAUSE_NO")
	private String clauseNo;
	
	@Column(name = "OBSERVATION_EVIDENCE")
	private String observationEvidence;
	
	@Column(name = "FINDING")
	private String finding;
	
	@Column(name = "REPORT_ID")
	private Long reportId;
}


