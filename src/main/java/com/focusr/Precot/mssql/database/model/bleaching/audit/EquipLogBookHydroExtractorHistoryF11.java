package com.focusr.Precot.mssql.database.model.bleaching.audit;

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
@Table(name = "BLEACH_EQUIPMENT_USAGE_LOGBOOK_HYDRO_EXTRACTOR_HISTORY_F11",schema=AppConstants.schema)
public class EquipLogBookHydroExtractorHistoryF11 extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
	private Long id;
	
	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name = "REVISION_NO")
	private Long revisionNo;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "BMR_NO")
	private String bmrNo;

	@Column(name = "MIXING")
	private String mixing;

	@Column(name = "SUB_BATCH_NO")
	private String subBatchNo;

	@Column(name = "MC_NO")
	private String mcNo;

	@Column(name = "TIMER_SETTING")
	private String timerSetting;

	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "REASON")
	private String reason;
	
		// STATUS
	
	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;
	
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;
	
	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;
	
	@Column(name = "HOD_STATUS")
	private String hod_status;
	
	
}
