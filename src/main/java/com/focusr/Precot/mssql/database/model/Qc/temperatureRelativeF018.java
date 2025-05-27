package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "TEMPERATURE_RELATIVE_HUMIDITY_RECORD_F018", schema = AppConstants.schema)
@Data
public class temperatureRelativeF018 extends UserDateAudit {
	
	    @Id
		@Column(name = "TEST_ID")
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long test_id;
		
		@Column(name = "FORMAT")
		private String format;
		
		@Column(name = "FORMAT_NO")
		private String format_no;
		
		@Column(name = "REF_SOP_NO")
		private String ref_sop_no;
		
		@Column(name = "UNIT")
		private String unit;
		
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
		
		@Column(name = "QC_STATUS")
		private String qc_status;

		@Column(name = "QC_SUBMIT_ON")
		private Date qc_submit_on;

		@Column(name = "QC_SUBMIT_BY")
		private String qc_submit_by;

		@Column(name = "QC_SUBMIT_ID")
		private Long qc_submit_id;
		
		@Column(name = "QC_SIGN")
		private String qc_sign;
		//
		@Column(name = "REMARKS")
		private String remarks;
				
		@Column(name = "YEAR")
		private String year;
		
		@Column(name = "MONTH")
		private String month;
		
		private String reason;
		
		@Column(name = "DATE")
		private String date;
			
		@Column(name = "TIME")
		private String time;
		
		@Column(name = "BULB_C")
		private String bulb_c;
		
		@Column(name = "WETBULB_C")
		private String wetbulb_c;
		
		@Column(name = "RH")
		private String rh;
		
		
		// AMC 2
		
		@Column(name = "DATE2")
		private String date2;
			
		@Column(name = "TIME2")
		private String time2;
		
		@Column(name = "BULB_D")
		private String bulb_d;
		
		@Column(name = "WETBULB_D")
		private String wetbulb_d;
		
		@Column(name = "RH2")
		private String rh2;
		
		@Column(name = "REMARKS2")
		private String remarks2;
		
		// 
		
		@Column(name = "EQ_NO")
		private String eq_no;
		
		@Column(name = "FREQUENCY")
		private String frequency;
		
		@Column(name = "CHECKED_BY")
		private String checked_by;
		
		@Column(name = "VERIFIED_BY")
		private String verified_by;
		

}
