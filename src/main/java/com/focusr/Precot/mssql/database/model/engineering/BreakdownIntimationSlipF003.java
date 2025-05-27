package com.focusr.Precot.mssql.database.model.engineering;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.productDevelopment.AppConstantsproductdevelopment;

import lombok.Data;

@Entity
@Table(name = "ENG_BREAKDOWN_INTIMANTIONSLIP_F003",schema = AppConstantsproductdevelopment.schema, uniqueConstraints = {
        @UniqueConstraint(columnNames = {"BIS_No"})
})
@Data
public class BreakdownIntimationSlipF003  extends UserDateAudit{
	
	
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

	    @Column(name = "DATE")
	    private String date;

	    @Column(name = "ISSUER_DEPARTMENT")
	    private String issuerDepartment;

	    @Column(name = "BIS_NO")
	    private String bisNo;

	    @Column(name = "BMR_NO")
	    private String bmrNo;
	    
	    
	    @Column(name = "EQUIPMENT_NAME")
	    private String EquipmentName;

	    @Column(name = "RECEIVER_DEPARTMENT")
	    private String receiverDepartment;

	    @Column(name = "EQUIPMENT_ATTENDED")
	    private String equipmentAttended;

	    @Column(name = "BREAKDOWN_DETAILS")
	    private String breakdownDetails;

	    @Column(name = "SPARE_USED_IF_ANY")
	    private String spareUsedIfAny;

	    @Column(name = "FIRST_INFORMATION_TIME")
	    private String firstInformationTime;

	    @Column(name = "ESTIMATED_REPAIR_TIME")
	    private String estimatedRepairTime;  

	    @Column(name = "REPAIR_START_TIME")
	    private String repairStartTime;

	    @Column(name = "REPAIR_END_TIME")
	    private String repairEndTime;

	    @Column(name = "MACHINE_START_TIME")
	    private String machineStartTime;

	    @Column(name = "PROCESS_STOP_TIME")
	    private String processStopTime;

	    @Column(name = "BREAKDOWN_STOP_TIME")
	    private String breakdownStopTime;

	    @Column(name = "REASONS_FOR_BREAKDOWN")
	    private String reasonsForBreakdown;
	    
	    
	    @Column(name = "SUPERVISOR_STATUS")
	    private String SupervisorStatus;

	    @Column(name = "SUPERVISOR_SAVED_ON")
	    private Date SupervisorSavedOn;

	    @Column(name = "SUPERVISOR_SAVED_BY")
	    private String SupervisorSavedBy;

	    @Column(name = "SUPERVISOR_SAVED_ID")
	    private Long   SupervisorSavedId;

	    @Column(name = "SUPERVISOR_SUBMIT_ON")
	    private Date SupervisorSubmitOn;

	    @Column(name = "SUPERVISOR_SUBMIT_BY")
	    private String SupervisorSubmitBy;

	    @Column(name = "SUPERVISOR_SUBMIT_ID")
	    private Long  SupervisorSubmitId;

	    @Column(name = "SUPERVISOR_SIGN")
	    private String SupervisorSign;
	    
	    
	    @Column(name = "RECEIVER")
	    private String receiver;
	    
	    
	    @Column(name = "RECEIVER_STATUS")
	    private String receiverstatus;
	   
	    
	    @Column(name = "RECEIVER_SUBMIT_BY")
	    private String receiverSubmitBy;

	    @Column(name = "RECEIVER_SUBMIT_ID")
	    private Long receiverSubmitId;
	    
	    @Column(name = "RECEIVER_SUBMIT_ON")
	    private Date receiverSubmiton;

	    @Column(name = "RECEIVER_SIGN")
	    private String receiverSign;
	    
	    
	    
	    
//	    last
	    @Column(name = "ENGINEER_ISSUER_STATUS")
	    private String engineerIssuerStatus;

	    @Column(name = "ENGINEER_ISSUER_SUBMIT_BY")
	    private String engineerIssuerSubmitBy;

	    @Column(name = "ENGINEER_ISSUER_SUBMIT_ID")
	    private Long engineerIssuerSubmitId;

	    @Column(name = "ENGINEER_ISSUER_SUBMIT_ON")
	    private Date engineerIssuerSubmitOn;

	    @Column(name = "ENGINEER_ISSUER_SIGN")
	    private String engineerIssuerSign;

	    
	    @Column(name = "CLOSURE_STATUS")
	    private String closureStatus;

	    @Column(name = "CLOSURE_SUBMIT_BY")
	    private String closureSubmitBy;

	    @Column(name = "CLOSURE_SUBMIT_ID")
	    private Long closureSubmitId;

	    @Column(name = "CLOSURE_SUBMIT_ON")
	    private Date closureSubmitOn;

	    @Column(name = "CLOSURE_SIGN")
	    private String closureSign;


	    
	    
	    
	    
	    
	    
	    
	    

	

}
