package com.focusr.Precot.QA.model.audit;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.QA.model.ListOfSharpTools;
import com.focusr.Precot.QA.model.ListOfSharpToolsLines;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.mssql.database.model.DryGoodsSuperHodSubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_LIST_OF_SHARP_TOOLS_HISTORY", schema = AppConstants.schema)

public class ListOfSharpToolsHistory extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HISTORY_ID")
	private Long history_id;

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
	
	@Column(name = "DEPARTMENT")
	private String department;

	// Status
	// QA INSPECTOR
	@Column(name = "QA_INSPECTOR_STATUS")
	private String qa_inspector_status;

	@Column(name = "QA_INSPECTOR_SAVED_ON")
	private Date qa_inspector_saved_on;

	@Column(name = "QA_INSPECTOR_SAVED_BY")
	private String qa_inspector_saved_by;

	@Column(name = "QA_INSPECTOR_SAVED_ID")
	private Long qa_inspector_saved_id;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ON")
	private Date qa_inspector_submitted_on;

	@Column(name = "QA_INSPECTOR_SUBMITTED_BY")
	private String qa_inspector_submitted_by;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ID")
	private Long qa_inspector_submitted_id;

	@Column(name = "QA_INSPECTOR_SIGN")
	private String qa_inspector_sign;

	// QA MANAGER
	@Column(name = "QA_MANAGER_STATUS")
	private String qa_manager_status;

	@Column(name = "QA_MANAGER_APPROVED_ON")
	private Date qa_manager_approved_on;

	@Column(name = "QA_MANAGER_APPROVED_BY")
	private String qa_manager_approved_by;

	@Column(name = "QA_MANAGER_APPROVED_ID")
	private Long qa_manager_approved_id;

	@Column(name = "QA_MANAGER_SIGN")
	private String qa_manager_sign;
	
	@Column(name = "REASON")
	private String reason;

	@Column(name = "VERSION")
	private int version;

//	@OneToMany(mappedBy = "listofsharptoolshistory", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//	private List<ListOfSharpToolsLinesHistory> listofsharptoolslineshistory;
	@OneToMany(targetEntity = ListOfSharpToolsLinesHistory.class, cascade = CascadeType.ALL)
		@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
		private List<ListOfSharpToolsLinesHistory> listofsharptoolslineshistory;
}
