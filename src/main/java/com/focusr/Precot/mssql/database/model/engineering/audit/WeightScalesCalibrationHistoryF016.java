package com.focusr.Precot.mssql.database.model.engineering.audit;

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
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.focusr.Precot.mssql.database.model.engineering.WeightScalesCalibrationDetail;
import com.focusr.Precot.mssql.database.model.productDevelopment.ProductDevelopmentSheetF001;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;

@Entity
@Table(name = "ENG_WEIGHING_SCALES_CALIBRATION_RECORD_HISTORY_F016",schema = AppConstantsproductdevelopment.schema)
@Data
public class WeightScalesCalibrationHistoryF016 {
	
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id;
	 
	    @Column(name = "FORMAT")
		private String format;
		
		@Column(name = "FORMAT_NO")
		private String format_no;
		
		@Column(name = "REF_SOP_NO")
		private String ref_sop_no;
		
		
		@Column(name = "REVISION_NUMBER")
		private String revisionNo;
		
		@Column(name = "UNIT")
		private String unit;
	
	    @Column(name = "DEPARTMENT")
	    private String department;

	    @Column(name = "CAPACITY")
	    private String capacity;

	    @Column(name = "TOLERANCES")
	    private String tolerances;

	    @Column(name = "MACHINE_ID_NO")
	    private String machineIdNo;
	    
	    @Column(name = "MEASUREMENT_UNIT")
	    private String  Measurementunit;

	    @Column(name = "STD_WT_CAL_CERT_NO")
	    private String stdWtCalCertNo;

	    @Column(name = "DATE")
	    private String date;
//
//	    @Column(name = "WEIGHT_IN_G_KG")
//	    private String weightInGKg;
//
//	    @Column(name = "OBSERVED_WEIGHT_IN_G_KG")
//	    private String observedWeightInGKg;
//
//	    @Column(name = "RANGE_IN_G_KG")
//	    private String rangeInGKg;
//
//	    @Column(name = "STATUS")
//	    private String status; // Pass/Fail
//
//	    @Column(name = "REMARKS")
//	    private String remarks;
	    
	    
	    
	    
	    @OneToMany(mappedBy = "parentRecord", cascade = CascadeType.ALL, orphanRemoval = true)
	    @JsonManagedReference
	    private List<WeightScalesCalibrationDetailHistory> details;
	    
	
	    
	    @Column(name = "ENGINEERINGSUPERVISOR_STATUS")
	    private String engineeringSupervisorStatus;


	    @Column(name = "ENGINEERINGSUPERVISOR_SUBMIT_ON")
	    private Date engineeringSupervisorSubmitOn;

	    @Column(name = "ENGINEERINGSUPERVISOR_SUBMIT_BY")
	    private String engineeringSupervisorSubmitBy;

	    @Column(name = "ENGINEERINGSUPERVISOR_SUBMIT_ID")
	    private Long engineeringSupervisorSubmitId;

	    @Column(name = "ENGINEERINGSUPERVISOR_SIGN")
	    private String engineeringSupervisorSign;

	    // HOD Details
	    @Column(name = "HOD_STATUS")
	    private String hodStatus;

	    @Column(name = "HOD_SUBMIT_ON")
	    private Date hodSubmitOn;

	    @Column(name = "HOD_SUBMIT_BY")
	    private String hodSubmitBy;

	    @Column(name = "HOD_SUBMIT_ID")
	    private Long hodSubmitId;

	    @Column(name = "HOD_SIGN")
	    private String hodSign;

	    
	    @Column(name = "REASON")
	    private String reason;
	    
	    
	    @Column(name = "VERSION")
		private int version;
	    
	    

	
	
	
	
	
	

}
