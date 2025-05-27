package com.focusr.Precot.mssql.database.model.PPC;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Entity
@Table(name = "PPC_CONTRACT_REVIEW_MEETING_F003",schema = AppConstants.schema, uniqueConstraints = {
        @UniqueConstraint(columnNames = {"DATE", "CUSTOMER_NAME"})
})
@Data
public class ContractReviewMeetingF003  extends UserDateAudit  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "FORMAT_NO")
    private String formatNo;

    @Column(name = "REVISION_NO")
    private String revisionNo;

    @Column(name = "REF_SOP_NO")
    private String refSopNo;

    @Column(name = "DATE")
    private String date; 

    // Department Member Details
    @OneToMany(mappedBy = "contractReviewMeeting", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ContractReviewMeetingDepartmentMemberF003> memberDetails;

    // Customer and Billing Information
    @Column(name = "DETAILS")
    private String details;

    @Column(name = "CUSTOMER_NAME")
    private String customerName;

    @Size(max = 65535)
    @Column(name = "BILLING_ADDRESS")
    private String billingAddress;

    @Size(max = 65535)
    @Column(name = "SHIPPING_ADDRESS")
    private String shippingAddress;

    @Column(name = "INCOTERM")
    private String incoterm;

    @Column(name = "PI_PO_NO")
    private String piPoNo;

    @Column(name = "APPROVED_REQ_NO")
    private String approvedsamplereqNo;

    // Contract Information
    @OneToMany(mappedBy = "contractReviewMeeting", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ContractReviewProductDetailF003> productDetails;

    @Column(name = "PAYMENT_TERM")
    private String paymentTerm;

    @Column(name = "PL_PO_DATE")
    private String plPoDate;

    @Column(name = "FINAL_ARTWORK_APPROVED_DATE")
    private String finalArtworkApprovedDate;

    @Column(name = "DELIVERY_TERM")
    private String deliveryTerm;

    @Column(name = "CUSTOMER_DISPATCH_DATE")
    private String customerDispatchDate;

    @Column(name = "FIRST_PRODUCTION_SAMPLE")
    private String firstProductionSample;

    @Column(name = "PORT_OF_SHIPMENT")
    private String portOfShipment;

    @Column(name = "PLANT_COMMITMENT_DATE")
    private String plantCommitmentDate;

    @Column(name = "PORT_OF_DESTINATION")
    private String portOfDestination;

    @Column(name = "CUSTOMER_MASTER_SAP_NO")
    private String customerMasterSAPNo;

    @Column(name = "SPECIAL_INSTRUCTIONS")
    private String specialInstructions;

    @Column(name = "TRANSPORTER")
    private String transporter;

    @Column(name = "PRICE_UPDATE_STATUS_IN_SAP")
    private String priceUpdateStatusInSap;

    @Column(name = "INSURANCE")
    private String Insurance;

    @Column(name = "CURRENCY")
    private String currency;

    @Column(name = "COA_REQUIREMENTS")
    private String coaRequirements;

    @Column(name = "FREIGHT_LINER")
    private String freightLiner;

    @Column(name = "COMMISSION_DETAILS")
    private String commissionDetails;

    @Column(name = "HS_CODE")
    private String hsCode;
    
    @Column(name = "COMMISSION_SELECTED")
    private String commissionSelected;
    
    

    @Column(name = "INSPECTION_METHOD")
    private String inspectionMethod;
    
    @Column(name = "INSPECTION_METHOD_EXTERNAL")
    private String inspectionMethodExternal;
    
    

    @Column(name = "PENALTY")
    private String Penalty;
    
    
    
    @Column(name = "MARKET_REPRESENTATIVE_STATUS")
    private String marketRepresentativeStatus;

    @Column(name = "MARKET_REPRESENTATIVE_SAVED_ON")
    private Date marketRepresentativeSavedOn;

    @Column(name = "MARKET_REPRESENTATIVE_SAVED_BY")
    private String marketRepresentativeSavedBy;

    @Column(name = "MARKET_REPRESENTATIVE_ID")
    private Long marketRepresentativeId;

    @Column(name = "MARKET_REPRESENTATIVE_SUBMIT_ON")
    private Date marketRepresentativeSubmitOn;

    @Column(name = "MARKET_REPRESENTATIVE_SUBMIT_BY")
    private String marketRepresentativeSubmitBy;

    @Column(name = "MARKET_REPRESENTATIVE_SUBMIT_ID")
    private Long marketRepresentativeSubmitId;

    @Column(name = "MARKET_REPRESENTATIVE_SIGN")
    private String marketRepresentativeSign;

    
    
    @Column(name = "ASSISTANT_STATUS")
    private String assistantStatus;

    @Column(name = "ASSISTANT_SAVED_ON")
    private Date assistantSavedOn;

    @Column(name = "ASSISTANT_SAVED_BY")
    private String assistantSavedBy;

    @Column(name = "ASSISTANT_ID")
    private Long assistantSavedId;

    @Column(name = "ASSISTANT_SUBMIT_ON")
    private Date assistantSubmitOn;

    @Column(name = "ASSISTANT_SUBMIT_BY")
    private String assistantSubmitBy;

    @Column(name = "ASSISTANT_SUBMIT_ID")
    private Long assistantSubmitId;

    @Column(name = "ASSISTANT_SIGN")
    private String assistantSign;
    
    @Column(name = "ASSISTANT_SIGNATURE")
    private byte[] assistantSignature;
    
    
    @Column(name = "REMARKS")
    private String remarks;
    
    
    public ContractReviewMeetingF003() {
    }


}