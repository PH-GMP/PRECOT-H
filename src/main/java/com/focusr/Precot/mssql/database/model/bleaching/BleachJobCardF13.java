package com.focusr.Precot.mssql.database.model.bleaching;

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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.model.audit.DateAudit;
import com.focusr.Precot.util.AppConstants;

@Entity
@Table(name = "BLEACH_JOB_CARD_F13", schema=AppConstants.schema,uniqueConstraints = {
    @UniqueConstraint(columnNames = { "BMR_NO", "SUB_BATCH_NO" }) 
})
public class BleachJobCardF13 extends DateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HEADER_ID")
	private Long header_id;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private String revision_no;

	@Column(name = "REF_SOP_NO")
	private String ref_sop_no;

	@Column(name = "BMR_NO")
	private String bmr_no;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "FINISH")
	private String finish;

	@Column(name = "MC_NO")
	private String mc_no;

	@Column(name = "SUB_BATCH_NO")
	private String sub_batch_no;

	@Column(name = "START_TIME")
	private String start_time;
	
	@Column(name = "END_DATE")
	private String end_date;

	@Column(name = "END_TIME")
	private String end_time;

	//
	@Column(name = "WETTING")
	private String wetting;

	@Column(name = "SCOURING")
	private String scouring;

	@Column(name = "HOTWASH_ONE")
	private String hotwash_one;

	@Column(name = "HOTWASH_TWO")
	private String hotwash_two;

	@Column(name = "NEWTRALIZING")
	private String newtralizing;

	@Column(name = "FINAL_PROCESS")
	private String final_process;

	//
	
	//new
	
	
	@Column(name = "WETTING_ACT_TEMP")
	private String wetting_act_temp;

	@Column(name = "SCOURING_ACT_TEMP")
	private String scouring_act_temp;

	@Column(name = "HOTWASH_ONE_ACT_TEMP")
	private String hotwash_one_act_temp;

	@Column(name = "HOTWASH_TWO_ACT_TEMP")
	private String hotwash_two_act_temp;

	@Column(name = "NEWTRALIZING_ACT_TEMP")
	private String newtralizing_act_temp;
	
	
	@Column(name = "FINAL_PROCESS_PH_TEMP")
	private String final_process_ph_temp;

	@Column(name = "FINAL_PROCESS_ACT_TEMP")
	private String final_process_act_temp;
	
	
//
	@Column(name = "CAUSTIC_SODA_FLAKES")
	private String caustic_soda_flakes;

	@Column(name = "HAIPOLENE")
	private String haipolene;

	@Column(name = "SAROFOM")
	private String sarofom;

	@Column(name = "HYDROGEN_PEROXIDE")
	private String hydrogen_peroxide;

	@Column(name = "SETILON_KN")
	private String setilon_kn;

	@Column(name = "PERSOFTAL")
	private String persoftal;

	@Column(name = "SETILON_PERSOFTAL_ACTUAL")
	private String setilon_persoftal_actual;

	@Column(name = "CITRIC_ACID")
	private String citric_acid;

	@Column(name = "REMARKS")
	private String remarks;

	@Column(name = "MAIL_STATUS")
	private String mail_status;
	
	@Lob
	@Column(name = "SUPERVISIOR_SIGNATURE")
	private byte[] supervisisorSignature;
	
	@Lob
	@Column(name = "HOD_SIGNATURE")
	private byte[] hodSignature;
	
	@Lob
	@Column(name = "QA_SIGNATURE")
	private byte[] qaSignature;
	
	@Column(name = "REASON")
	private String reason;

	// Supervisor

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

	// Qa

	@Column(name = "QA_STATUS")
	private String qa_status;

	@Column(name = "QA_SAVED_ON")
	private Date qa_saved_on;

	@Column(name = "QA_SAVED_BY")
	private String qa_saved_by;

	@Column(name = "QA_SAVED_ID")
	private Long qa_saved_id;

	@Column(name = "QA_SUBMIT_ON")
	private Date qa_submit_on;

	@Column(name = "QA_SUBMIT_BY")
	private String qa_submit_by;

	@Column(name = "QA_SUBMIT_ID")
	private Long qa_submit_id;

	@Column(name = "QA_SIGN")
	private String qa_sign;
	
	@Column(name = "QA_MAIL_STATUS")
	private String qa_mail_status;

	public Long getHeader_id() {
		return header_id;
	}

	public void setHeader_id(Long header_id) {
		this.header_id = header_id;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getFormatName() {
		return formatName;
	}

	public void setFormatName(String formatName) {
		this.formatName = formatName;
	}

	public String getFormatNo() {
		return formatNo;
	}

	public void setFormatNo(String formatNo) {
		this.formatNo = formatNo;
	}

	public String getRevision_no() {
		return revision_no;
	}

	public void setRevision_no(String revision_no) {
		this.revision_no = revision_no;
	}

	public String getRef_sop_no() {
		return ref_sop_no;
	}

	public void setRef_sop_no(String ref_sop_no) {
		this.ref_sop_no = ref_sop_no;
	}

	public String getBmr_no() {
		return bmr_no;
	}

	public void setBmr_no(String bmr_no) {
		this.bmr_no = bmr_no;
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

	public String getFinish() {
		return finish;
	}

	public void setFinish(String finish) {
		this.finish = finish;
	}

	public String getMc_no() {
		return mc_no;
	}

	public void setMc_no(String mc_no) {
		this.mc_no = mc_no;
	}

	public String getSub_batch_no() {
		return sub_batch_no;
	}

	public void setSub_batch_no(String sub_batch_no) {
		this.sub_batch_no = sub_batch_no;
	}

	public String getStart_time() {
		return start_time;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	public String getWetting() {
		return wetting;
	}

	public void setWetting(String wetting) {
		this.wetting = wetting;
	}

	public String getScouring() {
		return scouring;
	}

	public void setScouring(String scouring) {
		this.scouring = scouring;
	}

	public String getHotwash_one() {
		return hotwash_one;
	}

	public void setHotwash_one(String hotwash_one) {
		this.hotwash_one = hotwash_one;
	}

	public String getHotwash_two() {
		return hotwash_two;
	}

	public void setHotwash_two(String hotwash_two) {
		this.hotwash_two = hotwash_two;
	}

	public String getNewtralizing() {
		return newtralizing;
	}

	public void setNewtralizing(String newtralizing) {
		this.newtralizing = newtralizing;
	}

	public String getFinal_process() {
		return final_process;
	}

	public void setFinal_process(String final_process) {
		this.final_process = final_process;
	}

	public String getCaustic_soda_flakes() {
		return caustic_soda_flakes;
	}

	public void setCaustic_soda_flakes(String caustic_soda_flakes) {
		this.caustic_soda_flakes = caustic_soda_flakes;
	}

	public String getHaipolene() {
		return haipolene;
	}

	public void setHaipolene(String haipolene) {
		this.haipolene = haipolene;
	}

	public String getSarofom() {
		return sarofom;
	}

	public void setSarofom(String sarofom) {
		this.sarofom = sarofom;
	}

	public String getHydrogen_peroxide() {
		return hydrogen_peroxide;
	}

	public void setHydrogen_peroxide(String hydrogen_peroxide) {
		this.hydrogen_peroxide = hydrogen_peroxide;
	}

	public String getSetilon_kn() {
		return setilon_kn;
	}

	public void setSetilon_kn(String setilon_kn) {
		this.setilon_kn = setilon_kn;
	}

	public String getCitric_acid() {
		return citric_acid;
	}

	public void setCitric_acid(String citric_acid) {
		this.citric_acid = citric_acid;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
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

	public String getQa_status() {
		return qa_status;
	}

	public void setQa_status(String qa_status) {
		this.qa_status = qa_status;
	}

	public Date getQa_saved_on() {
		return qa_saved_on;
	}

	public void setQa_saved_on(Date qa_saved_on) {
		this.qa_saved_on = qa_saved_on;
	}

	public String getQa_saved_by() {
		return qa_saved_by;
	}

	public void setQa_saved_by(String qa_saved_by) {
		this.qa_saved_by = qa_saved_by;
	}

	public Long getQa_saved_id() {
		return qa_saved_id;
	}

	public void setQa_saved_id(Long qa_saved_id) {
		this.qa_saved_id = qa_saved_id;
	}

	public Date getQa_submit_on() {
		return qa_submit_on;
	}

	public void setQa_submit_on(Date qa_submit_on) {
		this.qa_submit_on = qa_submit_on;
	}

	public String getQa_submit_by() {
		return qa_submit_by;
	}

	public void setQa_submit_by(String qa_submit_by) {
		this.qa_submit_by = qa_submit_by;
	}

	public Long getQa_submit_id() {
		return qa_submit_id;
	}

	public void setQa_submit_id(Long qa_submit_id) {
		this.qa_submit_id = qa_submit_id;
	}

	public String getQa_sign() {
		return qa_sign;
	}

	public void setQa_sign(String qa_sign) {
		this.qa_sign = qa_sign;
	}

	public String getMail_status() {
		return mail_status;
	}

	public void setMail_status(String mail_status) {
		this.mail_status = mail_status;
	}

	public String getPersoftal() {
		return persoftal;
	}

	public void setPersoftal(String persoftal) {
		this.persoftal = persoftal;
	}

	public String getSetilon_persoftal_actual() {
		return setilon_persoftal_actual;
	}

	public void setSetilon_persoftal_actual(String setilon_persoftal_actual) {
		this.setilon_persoftal_actual = setilon_persoftal_actual;
	}

	public String getWetting_act_temp() {
		return wetting_act_temp;
	}

	public void setWetting_act_temp(String wetting_act_temp) {
		this.wetting_act_temp = wetting_act_temp;
	}

	public String getScouring_act_temp() {
		return scouring_act_temp;
	}

	public void setScouring_act_temp(String scouring_act_temp) {
		this.scouring_act_temp = scouring_act_temp;
	}

	public String getHotwash_one_act_temp() {
		return hotwash_one_act_temp;
	}

	public void setHotwash_one_act_temp(String hotwash_one_act_temp) {
		this.hotwash_one_act_temp = hotwash_one_act_temp;
	}

	public String getHotwash_two_act_temp() {
		return hotwash_two_act_temp;
	}

	public void setHotwash_two_act_temp(String hotwash_two_act_temp) {
		this.hotwash_two_act_temp = hotwash_two_act_temp;
	}

	public String getNewtralizing_act_temp() {
		return newtralizing_act_temp;
	}

	public void setNewtralizing_act_temp(String newtralizing_act_temp) {
		this.newtralizing_act_temp = newtralizing_act_temp;
	}

	public String getFinal_process_ph_temp() {
		return final_process_ph_temp;
	}

	public void setFinal_process_ph_temp(String final_process_ph_temp) {
		this.final_process_ph_temp = final_process_ph_temp;
	}

	public String getFinal_process_act_temp() {
		return final_process_act_temp;
	}

	public void setFinal_process_act_temp(String final_process_act_temp) {
		this.final_process_act_temp = final_process_act_temp;
	}

	public String getQa_mail_status() {
		return qa_mail_status;
	}

	public void setQa_mail_status(String qa_mail_status) {
		this.qa_mail_status = qa_mail_status;
	}

	public String getEnd_date() {
		return end_date;
	}

	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}

	public byte[] getSupervisisorSignature() {
		return supervisisorSignature;
	}

	public void setSupervisisorSignature(byte[] supervisisorSignature) {
		this.supervisisorSignature = supervisisorSignature;
	}

	public byte[] getHodSignature() {
		return hodSignature;
	}

	public void setHodSignature(byte[] hodSignature) {
		this.hodSignature = hodSignature;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public byte[] getQaSignature() {
		return qaSignature;
	}

	public void setQaSignature(byte[] qaSignature) {
		this.qaSignature = qaSignature;
	}
	
	
	
	

}
