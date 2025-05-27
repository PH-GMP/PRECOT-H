package com.focusr.Precot.mssql.database.model.Store;

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
@Table(name = "STORE_MATERIAL_INWARD_REGISTER_F001",schema = AppConstants.schema, uniqueConstraints = {
        @UniqueConstraint(columnNames = {"DATE"})
})
@Data
public class MaterialInwardRegister extends UserDateAudit {
	
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

		@Column(name = "S_NO")
		private String Sno; 
		 
	    @Column(name = "DATE")
	    private String date; 
	    
	    @Column(name = "IN_TIME")
	    private String Intime; 
	    
	    @Column(name = "OUT_TIME")
	    private String Outtime;
	    
	    @Column(name="VEHICLE_NUMBER")
	    private String vehicleNumber;
	    
	    @Column(name = "SUPPLIER_NAME")
	    private String supplierName;

	    @Column(name = "INVOICE_DC_NO")
	    private String invoiceDcNo;

//	    @Column(name = "INVOICE_DATE")
//	    private String invoiceDate;

	    @Column(name = "ITEM_DESCRIPTION")
	    private String itemDescription;

	    @Column(name = "QUANTITY")
	    private String quantity;

	    @Column(name = "SECURITY_SIGN_DATE")
	    private String securitySignDate;

	    @Column(name = "GRN_NUMBER")
	    private String grnNumber;

	    
	    
	    @Column(name = "STORE_IN_CHARGE_STATUS")
	    private String store_in_charge_status;
	 
	    
	    @Column(name = "STORE_IN_CHARGE_SAVED_ON")
	    private Date store_in_charge_saved_on;

	    @Column(name = "STORE_IN_CHARGE_SAVED_BY")
	    private String store_in_charge_saved_by;

	    @Column(name = "STORE_IN_CHARGE_SAVED_ID")
	    private Long store_in_charge_saved_id;

	   
	    @Column(name = "STORE_IN_CHARGE_SUBMIT_ON")
	    private Date store_in_charge_submit_on;

	    @Column(name = "STORE_IN_CHARGE_SUBMIT_BY")
	    private String store_in_charge_submit_by;

	    @Column(name = "STORE_IN_CHARGE_SUBMIT_ID")
	    private Long store_in_charge_submit_id;

	    @Column(name = "STORE_IN_CHARGE_SIGN")
	    private String store_in_charge_sign;
	    
	    
	    
	

	

}
