package com.focusr.Precot.mssql.database.model.QcAudit;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "MEDIA_DISPOSAL_RECORD_HISTORY", schema = AppConstants.schema)
public class mediaDisposalHistoryCLF022 extends UserDateAudit {

	@Id
	@Column(name = "TEST_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long test_id;

	@Column(name = "FORMAT")
	private String format;

	@Column(name = "TESTED_DATE")
	private String testDate;

	@Column(name = "FORMAT_NO")
	private String format_no;

	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;

	@Column(name = "REVISION_NO")
	private String revision_no;

	@Column(name = "REMARK")
	private String remark;

	@Column(name = "QC_STATUS")
	private String qc_status;

	@Column(name = "QC_SUBMIT_ON")
	private Date qc_submit_on;

	@Column(name = "QC_SUBMIT_BY")
	private String qc_submit_by;

	@Column(name = "QC_SUBMIT_ID")
	private Long qc_submit_id;

	@Column(name = "micro_STATUS")
	private String micro_status;

	@Column(name = "micro_SAVED_ON")
	private Date micro_saved_on;

	@Column(name = "micro_SAVED_BY")
	private String micro_saved_by;

	@Column(name = "micro_SAVED_ID")
	private Long micro_saved_id;

	@Column(name = "micro_SUBMIT_ON")
	private Date micro_submit_on;

	@Column(name = "micro_SUBMIT_BY")
	private String micro_submit_by;

	@Column(name = "micro_SUBMIT_ID")
	private Long micro_submit_id;

	@Column(name = "micro_SIGN")
	private String micro_sign;

	private String reason;

	private String qc_sign;

	// ---------------------------------------------------------

	@Column(name = "Name_of_the_Media")
	private String nameofMedia;

	@Column(name = "Used_for_Testing")
	private String usedForTesting;

	@Column(name = "Load_Number")
	private String loadNumber;

	@Column(name = "Disposed_Date")
	private String disposedDate;

	@Column(name = "Autoclave_Running_Time_From_To")
	private String autoclaveRunningTime;

	@Column(name = "AUTOCLAVERUNNINGTIME_TO")
	private String autoclaveRunningTime_to;

//	    @Column(name = "Setting_for_Discarding_Autoclave")
//	    private String settingForDiscardingAutoclave;
//
//	    @Column(name = "Sign_and_Date")
//	    private String signAndDate;

	@Column(name = "Discarded_By_Name")
	private String discardedBy;

	@Column(name = "Inspected_By")
	private String inspectedBy;

	@Column(name = "Verified_By")
	private String verifiedBy;

	@Column(name = "Temp_In_C")
	private String temperatureInCelsius;

	@Column(name = "Time_In_Min")
	private String timeInMinutes;

	@Column(name = "REMARKS")
	private String remarks;
	// -------------------------------------------------------------------------------------------------

	@Column(name = "NAMEOFMEDIA_C")
	private String nameofMedia_c;

	@Column(name = "USEDFORTESTING_C")
	private String usedForTesting_c;

	@Column(name = "LOADNUMBER_C")
	private String loadNumber_c;

	@Column(name = "DISPOSEDDATE_C")
	private String disposedDate_c;

	@Column(name = "AUTOCLAVERUNNINGTIME_C")
	private String autoclaveRunningTime_c;

	@Column(name = "AUTOCLAVERUNNINGTIME_C_TO")
	private String autoclaveRunningTime_c_to;

//	    @Column(name = "Setting_for_Discarding_Autoclave")
//	    private String settingForDiscardingAutoclave;
//
//	    @Column(name = "Sign_and_Date")
//	    private String signAndDate;

	@Column(name = "DISCARDEDBY_C")
	private String discardedBy_c;

	@Column(name = "TEMPERATUREINCELSIUS_C")
	private String temperatureInCelsius_c;

	@Column(name = "TIMEINMINUTES_C")
	private String timeInMinutes_c;

	@Column(name = "REMARKS_C_D")
	private String remarks_c;

//	     AMC - D 

	@Column(name = "NAMEOFMEDIA_D")
	private String nameofMedia_d;

	@Column(name = "USEDFORTESTING_D")
	private String usedForTesting_d;

	@Column(name = "LOADNUMBER_D")
	private String loadNumber_d;

	@Column(name = "DISPOSEDDATE_D")
	private String disposedDate_d;

	@Column(name = "AUTOCLAVERUNNINGTIME_D")
	private String autoclaveRunningTime_d;

	@Column(name = "AUTOCLAVERUNNINGTIME_D_TO")
	private String autoclaveRunningTime_d_to;

	@Column(name = "DISCARDEDBY_D")
	private String discardedBy_d;

	@Column(name = "TEMPERATUREINCELSIUS_D")
	private String temperatureInCelsius_d;

	@Column(name = "TIMEINMINUTES_D")
	private String timeInMinutes_d;

	@Column(name = "REMARKS_D")
	private String remarks_d;

	@Column(name = "VERSION")
	private int version;

}
