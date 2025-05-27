package com.focusr.Precot.QA.model;

import java.util.Date;
import java.util.List;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.model.audit.UserDateAudit;
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
import lombok.Data;

@Data
@Entity
@Table(name="QA_INTERNAL_AUDIT_SCHEDULE",schema=AppConstants.schema,
	uniqueConstraints=@UniqueConstraint(columnNames= {"AUDIT_SCHEDULE_YEAR","AUDIT_SCHEDULE_MONTH"}))
public class InternalAuditSchedule extends UserDateAudit {
	
	@Column(name="SCHEDULE_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//@JsonManagedReference
	private Long scheduleId;
	
	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String sopNumber;
	
	@Column(name = "AUDIT_SCHEDULE_YEAR")
	private String auditScheduleYear;
	
	@Column(name = "AUDIT_SCHEDULE_MONTH")
	private String auditScheduleMonth;

	@Column(name = "AUDIT_SCHEDULE_STATUS")
	private String auditScheduleStatus;

	@Column(name = "SCHEDULE_SAVE_ON")
	private Date scheduleSaveOn;

	@Column(name = "SCHEDULE_SAVE_BY")
	private String scheduleSaveBy;

	@Column(name = "SCHEDULE_SAVE_ID")
	private Long scheduleSaveId;

	@Column(name = "SCHEDULE_SUBMIT_ON")
	private Date scheduleSubmitOn;

	@Column(name = "SCHEDULE_SUBMIT_BY")
	private String scheduleSubmitBy;

	@Column(name = "SCHEDULE_SUBMIT_ID")
	private Long scheduleSubmitId;

	@Column(name = "SCHEDULE_SIGN_NAME")
	private String scheduleSignName;
	
	@OneToMany(targetEntity=InternalAudit.class , cascade  = CascadeType.ALL )
	@JoinColumn(name = "SCHEDULE_ID", referencedColumnName = "SCHEDULE_ID")
	private List<InternalAudit> internalAuditList;
}
