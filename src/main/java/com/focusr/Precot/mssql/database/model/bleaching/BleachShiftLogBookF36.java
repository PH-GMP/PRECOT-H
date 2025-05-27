package com.focusr.Precot.mssql.database.model.bleaching;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.UserDateAudit;
import com.focusr.Precot.util.AppConstants;



@Entity
@Table(name = "BLEACH_SHIFT_LOGBOOK_F36",schema=AppConstants.schema, uniqueConstraints = {
	    @UniqueConstraint(columnNames = {"DATE", "SHIFT"})
	})
public class BleachShiftLogBookF36 extends UserDateAudit{

	
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

    //status
    @Column(name = "MAIL_STATUS")
	private String mail_status;
   
 
   @Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SAVED_ON")
	private Date supervisor_saved_on;

	@Column(name = "SUPERVISOR_SAVED_BY")
	private String supervisor_saved_by;

	@Column(name = "SUPERVISOR_SAVED_ID")
	private Long supervisor_saved_id;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;
    
	// HOD

	@Column(name = "HOD_STATUS")
	private String hod_status;

	@Column(name = "HOD_SAVED_ON")
	private Date hod_saved_on;

	@Column(name = "HOD_SAVED_BY")
	private String hod_saved_by;

	@Column(name = "HOD_SAVED_ID")
	private Long hod_saved_id;

	@Column(name = "HOD_SUBMIT_ON")
	private Date hod_submit_on;

	@Column(name = "HOD_SUBMIT_BY")
	private String hod_submit_by;

	@Column(name = "HOD_SUBMIT_ID")
	private Long hod_submit_id;

	@Column(name = "HOD_SIGN")
	private String hod_sign;

	@Lob
	@Column(name = "SUPERVISIOR_IMAGE")
    private byte[] supervisiorImage;
	
	@Lob
	@Column(name = "HOD_IMAGE")
	private byte[] hodImage;
	
	@Column(name = "REASON")
	private String reason;
    
    //Mappings
//	@OneToMany(targetEntity = BleachStoppageDetailsF36.class, cascade = CascadeType.ALL)
//	@JoinColumn(name = "SLB_ID", referencedColumnName = "SLB_ID")
//	private List<BleachStoppageDetailsF36> stoppageList;

	//getters and setters
	public Long getSlb_id() {
		return slb_id;
	}

	public void setSlb_id(Long slb_id) {
		this.slb_id = slb_id;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getFormatNo() {
		return formatNo;
	}

	public void setFormatNo(String formatNo) {
		this.formatNo = formatNo;
	}

	public String getFormatName() {
		return formatName;
	}

	public void setFormatName(String formatName) {
		this.formatName = formatName;
	}

	public String getSopNumber() {
		return sopNumber;
	}

	public void setSopNumber(String sopNumber) {
		this.sopNumber = sopNumber;
	}

	public String getRevisionNo() {
		return revisionNo;
	}

	public void setRevisionNo(String revisionNo) {
		this.revisionNo = revisionNo;
	}

	public String getBmrNumber() {
		return bmrNumber;
	}

	public void setBmrNumber(String bmrNumber) {
		this.bmrNumber = bmrNumber;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getShift() {
		return shift;
	}

	public void setShift(String shift) {
		this.shift = shift;
	}

	public String getCakePress1() {
		return cakePress1;
	}

	public void setCakePress1(String cakePress1) {
		this.cakePress1 = cakePress1;
	}

	public String getCakePress2() {
		return cakePress2;
	}

	public void setCakePress2(String cakePress2) {
		this.cakePress2 = cakePress2;
	}

	public String getLaydownNo() {
		return laydownNo;
	}

	public void setLaydownNo(String laydownNo) {
		this.laydownNo = laydownNo;
	}

	public String getKier1() {
		return kier1;
	}

	public void setKier1(String kier1) {
		this.kier1 = kier1;
	}

	public String getKier2() {
		return kier2;
	}

	public void setKier2(String kier2) {
		this.kier2 = kier2;
	}

	public String getKier3() {
		return kier3;
	}

	public void setKier3(String kier3) {
		this.kier3 = kier3;
	}

	public String getHydro1() {
		return hydro1;
	}

	public void setHydro1(String hydro1) {
		this.hydro1 = hydro1;
	}

	public String getHydro2() {
		return hydro2;
	}

	public void setHydro2(String hydro2) {
		this.hydro2 = hydro2;
	}

	public String getCakeopenerDryerAbBalePress() {
		return cakeopenerDryerAbBalePress;
	}

	public void setCakeopenerDryerAbBalePress(String cakeopenerDryerAbBalePress) {
		this.cakeopenerDryerAbBalePress = cakeopenerDryerAbBalePress;
	}

	public String getNoOfBales() {
		return noOfBales;
	}

	public void setNoOfBales(String noOfBales) {
		this.noOfBales = noOfBales;
	}

	public String getWeightInKg() {
		return weightInKg;
	}

	public void setWeightInKg(String weightInKg) {
		this.weightInKg = weightInKg;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getMail_status() {
		return mail_status;
	}

	public void setMail_status(String mail_status) {
		this.mail_status = mail_status;
	}

	public String getSupervisor_status() {
		return supervisor_status;
	}

	public void setSupervisor_status(String supervisor_status) {
		this.supervisor_status = supervisor_status;
	}

	public Date getSupervisor_saved_on() {
		return supervisor_saved_on;
	}

	public void setSupervisor_saved_on(Date supervisor_saved_on) {
		this.supervisor_saved_on = supervisor_saved_on;
	}

	public String getSupervisor_saved_by() {
		return supervisor_saved_by;
	}

	public void setSupervisor_saved_by(String supervisor_saved_by) {
		this.supervisor_saved_by = supervisor_saved_by;
	}

	public Long getSupervisor_saved_id() {
		return supervisor_saved_id;
	}

	public void setSupervisor_saved_id(Long supervisor_saved_id) {
		this.supervisor_saved_id = supervisor_saved_id;
	}

	public Date getSupervisor_submit_on() {
		return supervisor_submit_on;
	}

	public void setSupervisor_submit_on(Date supervisor_submit_on) {
		this.supervisor_submit_on = supervisor_submit_on;
	}

	public String getSupervisor_submit_by() {
		return supervisor_submit_by;
	}

	public void setSupervisor_submit_by(String supervisor_submit_by) {
		this.supervisor_submit_by = supervisor_submit_by;
	}

	public Long getSupervisor_submit_id() {
		return supervisor_submit_id;
	}

	public void setSupervisor_submit_id(Long supervisor_submit_id) {
		this.supervisor_submit_id = supervisor_submit_id;
	}

	public String getSupervisor_sign() {
		return supervisor_sign;
	}

	public void setSupervisor_sign(String supervisor_sign) {
		this.supervisor_sign = supervisor_sign;
	}

	public String getHod_status() {
		return hod_status;
	}

	public void setHod_status(String hod_status) {
		this.hod_status = hod_status;
	}

	public Date getHod_saved_on() {
		return hod_saved_on;
	}

	public void setHod_saved_on(Date hod_saved_on) {
		this.hod_saved_on = hod_saved_on;
	}

	public String getHod_saved_by() {
		return hod_saved_by;
	}

	public void setHod_saved_by(String hod_saved_by) {
		this.hod_saved_by = hod_saved_by;
	}

	public Long getHod_saved_id() {
		return hod_saved_id;
	}

	public void setHod_saved_id(Long hod_saved_id) {
		this.hod_saved_id = hod_saved_id;
	}

	public Date getHod_submit_on() {
		return hod_submit_on;
	}

	public void setHod_submit_on(Date hod_submit_on) {
		this.hod_submit_on = hod_submit_on;
	}

	public String getHod_submit_by() {
		return hod_submit_by;
	}

	public void setHod_submit_by(String hod_submit_by) {
		this.hod_submit_by = hod_submit_by;
	}

	public Long getHod_submit_id() {
		return hod_submit_id;
	}

	public void setHod_submit_id(Long hod_submit_id) {
		this.hod_submit_id = hod_submit_id;
	}

	public String getHod_sign() {
		return hod_sign;
	}

	public void setHod_sign(String hod_sign) {
		this.hod_sign = hod_sign;
	}

	public byte[] getSupervisiorImage() {
		return supervisiorImage;
	}

	public void setSupervisiorImage(byte[] supervisiorImage) {
		this.supervisiorImage = supervisiorImage;
	}

	public byte[] getHodImage() {
		return hodImage;
	}

	public void setHodImage(byte[] hodImage) {
		this.hodImage = hodImage;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

//	public List<BleachStoppageDetailsF36> getStoppageList() {
//		return stoppageList;
//	}
//
//	public void setStoppageList(List<BleachStoppageDetailsF36> stoppageList) {
//		this.stoppageList = stoppageList;
//	}




	
	





	
	
	
	
	
}
