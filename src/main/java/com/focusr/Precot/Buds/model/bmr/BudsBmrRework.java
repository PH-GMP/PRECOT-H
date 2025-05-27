package com.focusr.Precot.Buds.model.bmr;

import java.util.Date;

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
@Table(name = "BUDS_BMR_REWORK", schema = AppConstants.schema)
public class BudsBmrRework extends UserDateAudit {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "REWORK_DATE")
	private String reworkDate;
	
	@Column(name = "DEPARTMENT_NAME")
	private String departmentName;
	
	@Column(name = "MACHINE_NAME")
	private String machineName;
	
	@Column(name = "BMR_NUMBER")
	private String bmrNumber;
	
	@Column(name = "LOT_NUMBER")
	private String lotNumber;
	
	@Column(name = "REWORK_REASON")
	private String reworkReason;
	
	@Column(name = "REWORK_QUANTITY")
	private String reworkQuantity;
	
	@Column(name = "REFERENCE_NC_NUMBER")
	private String referenceNcNumber;
	
	@Column(name = "ACTION_TAKEN")
	private String actionTaken;
	
	// STATUS
	
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisorStatus;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisorSign;

	@Column(name = "SUPERVISOR_SAVED_BY")
	private String supervisorSaveBy;

	@Column(name = "SUPERVISOR_SAVED_ON")
	private Date supervisorSavedOn;

	@Column(name = "SUPERVISOR_SAVED_ID")
	private Long supervisorSavedId;

	@Column(name = "SUPERVISOR_SUBMITTED_ID")
	private Long supervisorSubmittedId;

	@Column(name = "SUPERVISOR_SUBMITTED_BY")
	private String supervisorSubmittedBy;

	@Column(name = "SUPERVISOR_SUBMITTED_ON")
	private Date supervisorSubmittedOn;

	// hod

	@Column(name = "HOD_STATUS")
	private String hodStatus;

	@Column(name = "HOD_SIGN")
	private String hodSign;

	@Column(name = "HOD_SUBMITTED_BY")
	private String hodSubmittedBy;

	@Column(name = "HOD_SUBMITTED_ID")
	private Long hodSubmittedId;

	@Column(name = "HOD_SUBMITTED_DATE")
	private Date hodSubmittedDate;

	// QA

	@Column(name = "QA_STATUS")
	private String qaStatus;

	@Column(name = "QA_SIGN")
	private String qaSign;

	@Column(name = "QA_SUBMITTED_BY")
	private String qaSubmittedBy;

	@Column(name = "qa_SUBMITTED_ID")
	private Long qaSubmittedId;

	@Column(name = "QA_SUBMITTED_DATE")
	private Date qaSubmittedDate;
		
	@Column(name = "REJECT_REASON")
	private String rejectReason;
	
}
