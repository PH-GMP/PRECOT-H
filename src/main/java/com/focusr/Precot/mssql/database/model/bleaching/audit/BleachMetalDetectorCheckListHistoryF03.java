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
@Table(name = "BLEACH_METAL_DETECTOR_CHECK_LIST_HISTORY_F03",schema=AppConstants.schema)
public class BleachMetalDetectorCheckListHistoryF03 extends UserDateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LIST_ID")
	private Long listId;
	
	@Column(name = "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name = "REVISION_NO")
	private Long revisionNo;
	
	@Column(name = "REF_SOP_NO")
	private String refSopNo;
	
	@Column(name = "UNIT")
	private String unit ;
	
	@Column(name = "SECTION")
	private String section;
	
	@Column(name = "EQUIPMENT_NAME")
	private String equipmentName;
	
	@Column(name = "FREQUENCY")
	private String frequency;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "DATE")
	private String date;
	
	@Column(name = "METAL_CONTAMINATED_MATERIALS")
	private String metalContaminatedMaterials;
	
	@Column(name = "NO_OF_METAL_CONTAMINANTS")
	private String noOfMetalContaminants;
	
	@Column(name = "FUNCTION_CHECK")
	private String functionCheck;
	
	@Column(name = "CLEANED_BY")
	private String cleanedBy;
	
	@Column(name = "VERSION")
	private int version;
	
	@Column(name = "REASON")
	private String reason;
	
		// STATUS
	
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
