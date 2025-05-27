package com.focusr.Precot.Buds.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.mssql.database.model.padpunching.MachineDetailsF002;
import com.focusr.Precot.payload.spulance.SpunlaceSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BUDS_LOGBOOK_HEADER", schema = AppConstants.schema)
public class BudsLogbookHeader extends UserDateAudit {

	@Id
	@Column(name = "LOG_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long logId;
	
	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "FORM_NUMBER")
	private String formNumber;
	
	@Column(name = "LOG_DATE")
	private String logDate;
	
	@Column(name = "LOG_SHIFT")
	private String logShift;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "REJECT_REASON")
	private String rejectReason;
	
		// STOPPAGE DETAILS 
	
	@Column(name = "STOPPAGE_DETAILS")
	private String stoppageDetails;
	
		// PRODUCTION DETAILS
	
	@OneToMany(targetEntity = BudsLogbookProductionLine.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "LOG_ID", referencedColumnName = "LOG_ID")
	private List<BudsLogbookProductionLine> productionLine;
	
	
	// STATUS

	// SUPERVISOR
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SAVE_ON")
	private Date supervisor_save_on;

	@Column(name = "SUPERVISOR_SAVE_BY")
	private String supervisor_save_by;

	@Column(name = "SUPERVISOR_SAVE_ID")
	private Long supervisor_save_id;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;

	// HOD
	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;
	
}
