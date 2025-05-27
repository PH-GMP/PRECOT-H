package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_MASTER_LIST_OF_SHARP_TOOLS_F060", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = {"DATE","DEPARTMENT"}) })
public class QaMasterListOfSharpToolsF060 extends UserDateAudit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	// common for all
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

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	//initiator	
	@Column(name = "QA_INSPECTOR_STATUS")
	private String qaInspectorStatus;

	@Column(name = "QA_INSPECTOR_SAVED_ON")
	private Date qaInspectorSavedOn;

	@Column(name = "QA_INSPECTOR_SAVED_BY")
	private String qaInspectorSavedBy;

	@Column(name = "QA_INSPECTOR_SAVED_ID")
	private Long qaInspectorSavedId;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ON")
	private Date qaInspectorSubmittedOn;

	@Column(name = "QA_INSPECTOR_SUBMITTED_BY")
	private String qaInspectorSubmittedBy;

	@Column(name = "QA_INSPECTOR_SUBMITTED_ID")
	private Long qaInspectorSubmittedId;

	@Column(name = "QA_INSPECTOR_SIGN")
	private String qaInspectorSign;
//manager	
	@Column(name = "MANAGER_STATUS")
	private String managerStatus;

	@Column(name = "MANAGER_SUBMITTED_ON")
	private Date managerSubmittedOn;

	@Column(name = "MANAGER_SUBMITTED_BY")
	private String managerSubmittedBy;

	@Column(name = "MANAGER_SUBMITTED_ID")
	private Long managerSubmittedId;

	@Column(name = "MANAGER_SIGN")
	private String managerSign;
	
	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	@Column(name = "REASON")
	private String reason;
	
	@OneToMany(targetEntity = MasterListOfSharpToolDetails.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "ID", referencedColumnName = "ID")
	private List<MasterListOfSharpToolDetails> details;


}
