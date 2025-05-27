package com.focusr.Precot.mssql.database.model.Store.audit;



import java.time.LocalDate;
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

@Entity
@Table(name = "STORE_EYE_WASH_SHOWER_WORKING_CONDITION_CHECKLIST_HISTORY_F009",schema = AppConstants.schema)
@Data
public class EyeWashConditionChecklistHistoryF009 extends UserDateAudit {
	
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ID")
	    private Long id;
	    
	    
	    @Column(name = "UNIT")
		private String unit;
		
		@Column(name = "FORMAT_NO")
		private String formatNo;
		
		@Column(name= "FORMAT_NAME")
		private String formatName;
		
		@Column(name = "REVISION_NUMBER")
		private String revisionNo;
		
		@Column(name = "SOP_NUMBER")
		private String sopNumber;

	    
	    @Column(name = "DATE")
	    private LocalDate date; 

	    
	    @Column(name = "SHOWER_PULL_ROD")
	    private String showerPullRod; 
	    
	    @Column(name = "PUSH_BOARD")
	    private String pushboard;
	    
	    @Column(name = "WATER_FLOW")
	    private String waterflow;
	   


	    @Column(name = "REMARKS")
	    private String remarks; 
	    
	    @Column(name = "OPERATOR_STATUS")
	    private String operator_status;


	    @Column(name = "OPERATOR_SUBMIT_ON")
	    private Date operator_submit_on;

	    @Column(name = "OPERATOR_SUBMIT_BY")
	    private String operator_submit_by;

	    @Column(name = "OPERATOR_SUBMIT_ID")
	    private Long operator_submit_id;

	    @Column(name = "OPERATOR_SIGN")
	    private String operator_sign;
	    
	  
	    
	   
	    @Column(name = "REASON")
	    private String reason;
	    
	    @Column(name = "VERSION")
		private int version;

	 	// HOD

	    @Column(name = "STORE_IN_CHARGE_STATUS")
	    private String store_in_charge_status;


	    @Column(name = "STORE_IN_CHARGE_SUBMIT_ON")
	    private Date store_in_charge_submit_on;

	    @Column(name = "STORE_IN_CHARGE_SUBMIT_BY")
	    private String store_in_charge_submit_by;

	    @Column(name = "STORE_IN_CHARGE_SUBMIT_ID")
	    private Long store_in_charge_submit_id;

	    @Column(name = "STORE_IN_CHARGE_SIGN")
	    private String store_in_charge_sign;
	    
	    
	    @Column(name = "MAIL_STATUS")
	    private String mailStatus;
	    
	   
	

}
