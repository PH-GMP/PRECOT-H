package com.focusr.Precot.mssql.database.model.dispatch;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.mssql.database.model.drygoods.BMR001GoodsProductionDetails;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DISPATCH_FINISHED_GOODS_STOCK_REGISTER_F001", schema = AppConstants.schema)
public class FinishedGoodsStockRegisterF001 extends UserDateAudit{
	
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
    private String date;

    @Column(name = "SHIFT")
    private String shift;
    
    @Column(name = "PRODUCT")
    private String Product ;
    
    @Column(name = "PRODUCT_NAME")
    private String Productname ;
    
    @Column(name = "CUSTOMER")
    private String Customer ;
    
    @Column(name = "DEPARTMENT")
    private String department ;

    @Column(name = "OPENING_STOCK_NO_OF_CARTONS")
    private Integer openingStockNoOfCartons;

    @Column(name = "RECEIPT_QTY_NO_OF_CARTONS")
    private Integer receiptQtyNoOfCartons;

    @Column(name = "DISPATCHED_QTY_NO_OF_CARTONS")
    private Integer dispatchedQtyNoOfCartons;

    @Column(name = "ISSUED_QTY_NO_OF_CARTONS")
    private Integer issuedQtyNoOfCartons;

    @Column(name = "CLOSING_STOCK_NO_OF_CARTONS")
    private Integer closingStockNoOfCartons;

    @Column(name = "FINISHED_GOODS_SIGN_DATE")
    private String finishedGoodsSignDate;

    @Column(name = "REMARK")
    private String remark;

    @Column(name = "RECEIVED_BY_PRODUCTION")
    private String receivedByProduction;

    @Column(name = "FINISHED_GOODS_SIGN_DATE_DIGITAL")
    private String finishedGoodsSignDateDigital;
    
    
    @Column(name = "DISPATCH_SUPERVISOR_STATUS")
    private String dispatchSupervisorStatus;

    @Column(name = "DISPATCH_SUPERVISOR_SAVED_ON")
    private Date dispatchSupervisorSavedOn;

    @Column(name = "DISPATCH_SUPERVISOR_SAVED_BY")
    private String dispatchSupervisorSavedBy;

    @Column(name = "DISPATCH_SUPERVISOR_SAVED_ID")
    private Long dispatchSupervisorSavedId;

    @Column(name = "DISPATCH_SUPERVISOR_SUBMIT_ON")
    private Date dispatchSupervisorSubmitOn;

    @Column(name = "DISPATCH_SUPERVISOR_SUBMIT_BY")
    private String dispatchSupervisorSubmitBy;

    @Column(name = "DISPATCH_SUPERVISOR_SUBMIT_ID")
    private Long dispatchSupervisorSubmitId;

    @Column(name = "DISPATCH_SUPERVISOR_SIGN")
    private String dispatchSupervisorSign;

   
    
    

}

