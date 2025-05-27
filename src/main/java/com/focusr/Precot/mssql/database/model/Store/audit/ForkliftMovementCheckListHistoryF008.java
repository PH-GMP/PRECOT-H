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
@Table(name = "STORE_FORKLIFT_MOVEMENT_CHECKLIST_HISTORY_F008",schema = AppConstants.schema)
@Data
public class ForkliftMovementCheckListHistoryF008 extends UserDateAudit {
	
	
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

    
    @Column(name = "FORK_LIFT_NO")
    private String forkliftNo; 
    
    @Column(name = "YEAR")
    private String year;
    
    @Column(name = "MONTH")
    private String month;
   

    @Column(name = "START_METER_READING")
    private Double startMeterReading;

    @Column(name = "END_METER_READING")
    private Double endMeterReading;

    @Column(name = "TOTAL_METER_READING")
    private Double totalMeterReading;
    
    @Column(name = "IN_KM")
    private Double inKm;

    @Column(name = "OUT_KM")
    private Double outKm;
    
    @Column(name = "TOTAL_KM")
    private Double totalKm;

    @Column(name = "CHARGE_IN_TIME")
    private String chargeInTime;
    
    @Column(name = "CHARGE_OUT_TIME")
    private String chargeOutTime;
    
    @Column(name = "TOTAL_CHARGE")
    private String totalCharge;
    
    

    @Column(name = "REMARKS", length = 100)
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
    
    @Column(name = "OPERATOR_SIGNATURE")
    private byte[] operator_Signature;
    
   
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
    
    @Column(name = "STORE_IN_CHARGE_SIGNATURE")
    private byte[] store_in_charge_Signature;
    
    

	
	
}
