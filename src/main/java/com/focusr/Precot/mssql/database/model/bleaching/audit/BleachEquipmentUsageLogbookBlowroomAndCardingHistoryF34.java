package com.focusr.Precot.mssql.database.model.bleaching.audit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "BLEACH_EQUIPMENT_USAGE_LOGBOOK_BLOWROOM_AND_CARDING_HISTORY_F34",schema=AppConstants.schema)
public class BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34 {

	@Id
    @Column(name = "EQUIPB_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long equipb_id;
	
	@Column(name = "BMR_NUMBER")
	private String bmrNumber;
	
	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name= "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "SOP_NO")
	private String sopNumber;
	
	@Column(name = "REVISION_NO")
	private String revisionNo;
	
    @Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "MIXING")
    private String mixing;
	
	@Column(name = "NO_OF_BALES")
    private String no_of_bales;
	
	@Column(name = "TOTAL_WEIGHT")
    private String total_weight;
	
	@Column(name = "WORKING_AREA")
    private String working_area;
	
	@Column(name = "START_DATE")
    private String start_date;
	
	@Column(name = "START_TIME")
    private String start_time;
	
	@Column(name = "END_DATE")
    private String end_date;
	
	@Column(name = "END_TIME")
    private String end_time;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "REASON")
	private String reason;
	
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
