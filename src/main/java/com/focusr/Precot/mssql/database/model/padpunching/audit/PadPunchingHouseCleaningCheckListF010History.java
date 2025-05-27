package com.focusr.Precot.mssql.database.model.padpunching.audit;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_HISTORY_F010", schema=AppConstants.schema)
public class PadPunchingHouseCleaningCheckListF010History {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CLEAN_ID")
	private Long clean_id;


	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "FREQUENCY")
	private String frequency;

	@Column(name = "DATE")
	private String date;

	@Column(name = "MONTH")
	private String month;

	@Column(name = "YEAR")
	private String year;
	
	@Column(name = "DEPARTMENT")
	private String department;
	
	@Column(name = "FLOOR_CLEANINH")
	private String floor_cleaning;

	@Column(name = "REMOVEL_UNWANTED_METERIALS")
	private String removel_unwanted_meterials;

	@Column(name = "SIDE_WALL_CORNERS")
	private String side_wall_corners;

	
	@Column(name = "FLOOR_CLEANING_WET")
	private String floor_cleaning_wet;

	@Column(name = "EMERGENCY_DOOR")
	private String emergency_door;

	@Column(name = "FIRE_EXTINGUISHERS")
	private String fire_extinguishers;

	@Column(name = "FIRST_AID_BOX")
	private String first_aid_box;


	
	@Column(name = "FALSE_CEILING")
	private String false_ceiling;
	
	@Column(name = "TRAINED_PERSON")
	private String trained_person;

	/////
	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	

//Sup
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;

	// Hr

	@Column(name = "HR_SUBMIT_ON")
	private Date hr_submit_on;

	@Column(name = "HR_SUBMIT_BY")
	private String hr_submit_by;

	@Column(name = "HR_SUBMIT_ID")
	private Long hr_submit_id;

	@Column(name = "HR_SIGN")
	private String hr_sign;

	@Column(name = "HR_STATUS")
	private String hr_status;
	
	@Column(name = "HR_MAIL_STATUS")
	private String hr_mail_status;


	// Hod

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

	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "REASON")
	private String reason;

}
