package com.focusr.Precot.mssql.database.model.Qc;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "MEDIA_DISPOSAL_RECORD_OBS", schema = AppConstants.schema)
public class mediaDisposalobsF022 {

	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id;
	  
	  @Column(name = "Tested_Date")
	    private String testDate;
	  
	  @Column(name = "MONTH")
	  private String month ;
	  
	  @Column(name = "YEAR")
	  private String year;

	    @Column(name = "Name_of_the_Media")
	    private String nameofMedia;

	    @Column(name = "Used_for_Testing")
	    private String usedForTesting;

	    @Column(name = "Load_Number")
	    private String loadNumber;

	    @Column(name = "Disposed_Date")
	    private Date disposedDate;

	    @Column(name = "Autoclave_Running_Time_From_To")
	    private String autoclaveRunningTime;

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
	    private Double temperatureInCelsius;

	    @Column(name = "Time_In_Min")
	    private Integer timeInMinutes;
	    
	    @Column(name = "REMARKS")
	    private String remarks;
	
//		private String test_date;
//		
//		private String nameofMedia;
		
		 @Column(name = "TEST_ID")
		    private Long test_id;
	   
    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TEST_ID", insertable = false, updatable = false)
	@JsonIgnore
	private mediaDisposalCLF022 mediaDisposalCLF022;
}
