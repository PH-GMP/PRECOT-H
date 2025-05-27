package com.focusr.Precot.QA.model.audit;

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
@Table(name = "QA_AUDIT_REPORT_CLAUSE_INFO_HISTORY", schema = AppConstants.schema)
public class AuditReportClauseInfoHistory  extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "CLAUSE_NO")
	private String clauseNo;
	
	@Column(name = "OBSERVATION_EVIDENCE")
	private String observationEvidence;
	
	@Column(name = "FINDING")
	private String finding;
	
	@Column(name = "HISTORY_ID")
	private Long reportId;
}


