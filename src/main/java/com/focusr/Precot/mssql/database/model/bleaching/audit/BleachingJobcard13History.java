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
@Table(name = "BLEACH_JOB_CARD_HISTORY_F13", schema=AppConstants.schema) 
public class BleachingJobcard13History extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HEADER_ID")
	private Long header_id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revision_no;

	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;

	@Column(name = "BMR_NO")
	private String bmr_no;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "FINISH")
	private String finish;

	@Column(name = "MC_NO")
	private String mc_no;

	@Column(name = "SUB_BATCH_NO")
	private String sub_batch_no;

	@Column(name = "START_TIME")
	private String start_time;
	
	@Column(name = "END_DATE")
	private String end_date;

	@Column(name = "END_TIME")
	private String end_time;

	//
	@Column(name = "WETTING")
	private String wetting;

	@Column(name = "SCOURING")
	private String scouring;

	@Column(name = "HOTWASH_ONE")
	private String hotwash_one;

	@Column(name = "HOTWASH_TWO")
	private String hotwash_two;

	@Column(name = "NEWTRALIZING")
	private String newtralizing;

	@Column(name = "FINAL_PROCESS")
	private String final_process;

	//
	
	//new
	
	
	@Column(name = "WETTING_ACT_TEMP")
	private String wetting_act_temp;

	@Column(name = "SCOURING_ACT_TEMP")
	private String scouring_act_temp;

	@Column(name = "HOTWASH_ONE_ACT_TEMP")
	private String hotwash_one_act_temp;

	@Column(name = "HOTWASH_TWO_ACT_TEMP")
	private String hotwash_two_act_temp;

	@Column(name = "NEWTRALIZING_ACT_TEMP")
	private String newtralizing_act_temp;
	
	
	@Column(name = "FINAL_PROCESS_PH_TEMP")
	private String final_process_ph_temp;

	@Column(name = "FINAL_PROCESS_ACT_TEMP")
	private String final_process_act_temp;
	
	
//
	@Column(name = "CAUSTIC_SODA_FLAKES")
	private String caustic_soda_flakes;

	@Column(name = "HAIPOLENE")
	private String haipolene;

	@Column(name = "SAROFOM")
	private String sarofom;

	@Column(name = "HYDROGEN_PEROXIDE")
	private String hydrogen_peroxide;

	@Column(name = "SETILON_KN")
	private String setilon_kn;

	@Column(name = "PERSOFTAL")
	private String persoftal;

	@Column(name = "SETILON_PERSOFTAL_ACTUAL")
	private String setilon_persoftal_actual;

	@Column(name = "CITRIC_ACID")
	private String citric_acid;

	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "REASON")
	private String reason; 
	
		// sTatus
	
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
	
	@Column(name = "QA_STATUS")
	private String qa_status;
	
	@Column(name = "QA_SUBMIT_ON")
	private Date qa_submit_on;

	@Column(name = "QA_SUBMIT_BY")
	private String qa_submit_by;

	@Column(name = "QA_SUBMIT_ID")
	private Long qa_submit_id;

	@Column(name = "QA_SIGN")
	private String qa_sign;
	
}
