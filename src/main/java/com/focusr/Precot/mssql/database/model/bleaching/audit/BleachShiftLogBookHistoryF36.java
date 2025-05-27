package com.focusr.Precot.mssql.database.model.bleaching.audit;

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

@Data
@Entity
@Table(name = "BLEACH_SHIFT_LOGBOOK_HISTORY_F36",schema=AppConstants.schema)
public class BleachShiftLogBookHistoryF36 extends UserDateAudit{

	@Id
    @Column(name = "SLB_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slb_id;

	@Column(name = "UNIT")
	private String unit;
	
	@Column(name = "FORMAT_NO")
	private String formatNo;
	
	@Column(name= "FORMAT_NAME")
	private String formatName;
	
	@Column(name = "SOP_NO")
	private String sopNumber;
	
	@Column(name = "REVISION_NO")
	private String revisionNo;
	
	@Column(name = "BMR_NUMBER")
	private String bmrNumber;
	
    @Column(name = "DATE", nullable = false)
    private String date;

    @Column(name = "SHIFT", nullable = false)
    private String shift;

    @Column(name = "CAKE_PRESS_1")
    private String cakePress1;

    @Column(name = "CAKE_PRESS_2")
    private String cakePress2;

    @Column(name = "LAYDOWN_NO")
    private String laydownNo;

    @Column(name = "KIER_1")
    private String kier1;

    @Column(name = "KIER_2")
    private String kier2;

    @Column(name = "KIER_3")
    private String kier3;

    @Column(name = "HYDRO_1")
    private String hydro1;

    @Column(name = "HYDRO_2")
    private String hydro2;

    @Column(name = "CAKEOPENER_DRYER_AB_BALE_PRESS")
    private String cakeopenerDryerAbBalePress;

    @Column(name = "NO_OF_BALES")
    private String noOfBales;

    @Column(name = "WEIGHT_IN_KG")
    private String weightInKg;

    @Column(name = "REMARKS")
    private String remarks;
    
    @Column(name = "VERSION")
    private int version;
    
    @Column(name = "REASON")
    private String reason;
    
    	// STATUS
    
    @Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;
	
	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;
	
	@Column(name = "HOD_STATUS")
	private String hod_status;
	
	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;
	
}
