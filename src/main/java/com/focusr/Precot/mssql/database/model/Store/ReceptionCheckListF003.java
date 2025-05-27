package com.focusr.Precot.mssql.database.model.Store;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;



@Entity
@Table(name = "STORE_RECEPTION_CHECK_LIST_F003",schema = AppConstants.schema, uniqueConstraints = {
        @UniqueConstraint(columnNames = {"INVOICE_NO","DESCRIPTION"})
})
@Data
public class ReceptionCheckListF003 extends UserDateAudit {
	
	
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

    @Column(name = "SUPPLIER_NAME")
    private String supplierName; 

    @Column(name = "INVOICE_NO")
    private String invoiceNo; 

    @Column(name = "TOTAL_QUANTITY")
    private String totalQuantity; 

    @Column(name = "NO_OF_BALES_OR_CANS")
    private String noOfBalesOrCans; 
    
    @Column(name = "NO_OF_BALES_OR_CANS_COUNT")
    private String noOfBalesOrCansCount; 

    @Column(name = "WEIGHT")
    private Double weight; 

    @Column(name = "DESCRIPTION")
    private String description; 

    @Column(name = "VEHICLE_NO")
    private String vehicleNo; 

    @Column(name = "ORGANIC_IDENTIFICATION")
    private String organicIdentification; 

    @Column(name = "VEHICLE_CONDITION")
    private String vehicleCondition; 

    @Column(name = "PACKING_CONDITION")
    private String packingCondition; 

    @Column(name = "WET_CONDITION")
    private String wetCondition; 

    @Column(name = "CONTAMINATION")
    private String contamination; 

    @Column(name = "REMARKS", length = 100)
    private String remarks; 
    
    @Column(name = "OPERATOR_STATUS")
    private String operator_status;

    @Column(name = "OPERATOR_SAVED_ON")
    private Date operator_saved_on;

    @Column(name = "OPERATOR_SAVED_BY")
    private String operator_saved_by;

    @Column(name = "OPERATOR_SAVED_ID")
    private Long operator_saved_id;

    @Column(name = "OPERATOR_SUBMIT_ON")
    private Date operator_submit_on;

    @Column(name = "OPERATOR_SUBMIT_BY")
    private String operator_submit_by;

    @Column(name = "OPERATOR_SUBMIT_ID")
    private Long operator_submit_id;

    @Column(name = "OPERATOR_SIGN")
    private String operator_sign;
    
    @Lob
    @Column(name = "OPERATOR_SIGNATURE")
    private byte[] operator_Signature;
    
   
    @Column(name = "REASON")
    private String reason;

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
    
    
    @Lob
    @Column(name = "STORE_IN_CHARGE_SIGNATURE")
    private byte[] store_in_charge_Signature;
    
    

	
	
}
