package com.focusr.Precot.QA.model.audit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_MANAGEMENT_OF_INCIDENCE_HISTORY", schema = AppConstants.schema)
public class ManagementOfIncidenceHistory extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "INCIDENCE_ID")
	private Long incidence_id;

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

	@Column(name = "YEAR")
	private String year;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "TIME")
	private String time;

	@Column(name = "DEPARTMENT")
	private String department;

	@Column(name = "INCIDENT_NO")
	private String incident_no;

	@Column(name = "DETAILS_OF_INCIDENCE", length = 1000)
	private String details_of_incidence;

	@Column(name = "INFORMATION_COMMUNICATED_TO", length = 1000)
	private String information_communicated_to;

	@Column(name = "IMPACT_OF_INCIDENCE", length = 1000)
	private String impact_of_incidence;

	@Column(name = "SEVERITY", length = 1000)
	private String severity;

	@Column(name = "ROOT_CAUSE", length = 1000)
	private String root_cause;

	@Column(name = "ACTION_TAKEN", length = 1000)
	private String action_taken;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "STATUS_OF_ACTION_TAKEN")
	private String status_of_action_taken;

	@Column(name = "REASON")
	private String reason;

	// STATUS

	// HOD
	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SAVE_ON")
	private Date hod_save_on;

	@Column(name = "HOD_SAVE_BY")
	private String hod_save_by;

	@Column(name = "HOD_SAVE_ID")
	private Long hod_save_id;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

	// QA MANAGER
	@Column(name = "QA_MANAGER_STATUS")
	private String qa_manager_status;

	@Column(name = "QA_MANAGER_APPROVED_ON")
	private Date qa_manager_approved_on;

	@Column(name = "QA_MANAGER_APPROVED_BY")
	private String qa_manager_approved_by;

	@Column(name = "QA_MANAGER_APPROVER_ID")
	private Long qa_manager_approver_id;

	@Column(name = "QA_MANAGER_SIGN")
	private String qa_manager_sign;

	// PLANT HEAD
	@Column(name = "PLANT_HEAD_STATUS")
	private String plant_head_status;

	@Column(name = "PLANT_HEAD_APPROVED_ON")
	private Date plant_head_approved_on;

	@Column(name = "PLANT_HEAD_APPROVED_BY")
	private String plant_head_approved_by;

	@Column(name = "PLANT_HEAD_APPROVER_ID")
	private Long plant_head_approver_id;

	@Column(name = "PLANT_HEAD_SIGN")
	private String plant_head_sign;
	
	@Column(name = "VERSION")
	private int version;
}
