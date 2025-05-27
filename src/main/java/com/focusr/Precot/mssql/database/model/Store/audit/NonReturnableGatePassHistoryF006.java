package com.focusr.Precot.mssql.database.model.Store.audit;




import javax.persistence.*;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "STORE_NON_RETURNABLE_GATE_PASS_HISTORY_F006",schema = AppConstants.schema)
@Data
public class NonReturnableGatePassHistoryF006 extends UserDateAudit{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    @Column(name = "UNIT")
	private String unit;
    
    @Column(name = "FORMAT_NO")
    private String formatNo;

    @Column(name = "REVISION_NO")
    private String revisionNo;

    @Column(name = "REF_SOP_NO")
    private String refSopNo;

	@Column(name = "FORMAT_NAME")
	private String formatName;

    @Column(name = "DATE")    
    private String date;

    @Column(name = "GATE_PASS_NO", length = 50)
    private String gatePassNo;

    @Column(name = "GOODS_SENT_TO", length = 200)
    private String goodsSentTo;

    @Column(name = "ADDRESS", length = 200)
    private String address;

    @Column(name = "TRANSPORTER_NAME", length = 100)
    private String transporterName;

    @Column(name = "VEHICLE_NO", length = 50)
    private String vehicleNo;

    @OneToMany(mappedBy = "gatePass", cascade = CascadeType.ALL)
    private List<NonReturnableGoodsDetailHistory> goodsDetails;
    
    
    
    @Column(name = "REMARKS", length = 100)
    private String remark;
    
    @Column(name = "REASON", length = 100)
    private String reason;
    
    
    
//    INCHARGE
    
    
    @Column(name = "STORE_INCHARGE_STATUS")
    private String storeInchargeStatus;

    @Column(name = "STORE_INCHARGE_SAVED_ON")
    private Date storeInchargeSavedOn;

    @Column(name = "STORE_INCHARGE_SAVED_BY")
    private String storeInchargeSavedBy;

    @Column(name = "STORE_INCHARGE_ID")
    private Long storeInchargeSavedId;

    @Column(name = "STORE_INCHARGE_SUBMIT_ON")
    private Date storeInchargeSubmitOn;

    @Column(name = "STORE_INCHARGE_SUBMIT_BY")
    private String storeInchargeSubmitBy;

    @Column(name = "STORE_INCHARGE_SUBMIT_ID")
    private Long storeInchargeSubmitId;

    @Column(name = "STORE_INCHARGE_SIGN")
    private String storeInchargeSign;
    
//    @Column(name = "STORE_INCHARGE_SIGNATURE")
//    private byte[] storeInchargeSignature;
    
    
    
//    Hod 
	@Column(name = "HOD_STATUS")
	private String hod_status;



	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;
	
//	@Column(name = "HOD_SIGNATURE")
//    private byte[] HodSignature;
	
	@Column(name = "VERSION")
	private int version;
    
}

