package com.focusr.Precot.mssql.database.model.Qc;

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
@Table(name = "QC_WIRA_FIBER_FINENESS_TESTER_REPORT_F010", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "YEAR","MONTH"}) })
public class Qc_WiraFiberFinenessTesterReportF010 extends UserDateAudit {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revisionNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;
	
	@Column(name = "FREQUENCY")
	private String frequency;

	@Column(name = "EQ_ID_NO")
	private String eqIdNo;

	@Column(name = "CALIBRATION_DATE")
	private String calibrationDate;
	
	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;

	@Column(name = "SETTING_BEFORE_CALIBRATION")
	private Long settingBeforeCalibration;

	@Column(name = "FLOW_OFFSET")
	private String flowOffset;

	@Column(name = "PRESSURE_OFFSET")
	private Long pressureOffSet;

	@Column(name = "PL_GAIN")
	private Long plGain;

	@Column(name = "PH_GAIN")
	private Long phGain;

	@Column(name = "NEW_PL_GAIN_AVG")
	private Double newPlGainAvg;

	@Column(name = "CALIBRATED_FLOW_OFFSET")
	private Long calibratedFlowOffSet;

	@Column(name = "CALIBRATED_PL_GAIN")
	private Long calibratedPlGain;

	@Column(name = "CALIBRATED_PRESSURE_OFFSET")
	private Long calibratedPressureOffSet;

	@Column(name = "CALIBRATED_PH_GAIN")
	private Long calibratedPhGain;

	@Column(name = "CALIB_NEXT_DUE_DATE")
	private String calibNextDueDate;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "CHECKED_BY")
	private String checkedBy;

	@Column(name = "VERIFIED_BY")
	private String verifiedBy;

	@Column(name = "CHEMIST_STATUS")
	private String chemist_status;

	@Column(name = "CHEMIST_SAVED_ON")
	private Date chemist_saved_on;

	@Column(name = "CHEMIST_SAVED_BY")
	private String chemist_saved_by;

	@Column(name = "CHEMIST_SAVED_ID")
	private Long chemist_saved_id;

	@Column(name = "CHEMIST_SUBMIT_ON")
	private Date chemist_submit_on;

	@Column(name = "CHEMIST_SUBMIT_BY")
	private String chemist_submit_by;

	@Column(name = "CHEMIST_SUBMIT_ID")
	private Long chemist_submit_id;

	@Column(name = "CHEMIST_SIGN")
	private String chemist_sign;
	
	@Column(name = "MANAGER_STATUS")
	private String manager_status;
 
	@Column(name = "MANAGER_SUBMIT_ON")
	private Date manager_submit_on;
 
	@Column(name = "MANAGER_SUBMIT_BY")
	private String manager_submit_by;
 
	@Column(name = "MANAGER_SUBMIT_ID")
	private Long manager_submit_id;
 
	@Column(name = "MANAGER_SIGN")
	private String manager_sign;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	@OneToMany(cascade = CascadeType.REFRESH, mappedBy = "wiraFiberFinenessTesterReportF010")
    private List<WiraFiberDetails> details;
	
}
