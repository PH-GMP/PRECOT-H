package com.focusr.Precot.QA.model.audit;


import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;
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
@Table(name="QA_INTERNAL_AUDIT_SCHEDULE_HISTORY",schema=AppConstants.schema)
public class InternalAuditScheduleHistory extends UserDateAudit {
	
	@Column(name="HISTORY_ID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	@Column(name = "SCHEDULE_SUBMIT_ON")
	private Date scheduleSubmitOn;

	@Column(name = "SCHEDULE_SUBMIT_BY")
	private String scheduleSubmitBy;

	@Column(name = "SCHEDULE_SUBMIT_ID")
	private Long scheduleSubmitId;

	@Column(name = "SCHEDULE_SIGN_NAME")
	private String scheduleSignName;
	
	@Column(name = "VERSION")
	private int version;
	
	@OneToMany(targetEntity=InternalAuditHistory.class , cascade  = CascadeType.ALL )
	@JoinColumn(name = "HISTORY_ID", referencedColumnName = "HISTORY_ID")
	private List<InternalAuditHistory> internalAuditHistoryList;
	
}

