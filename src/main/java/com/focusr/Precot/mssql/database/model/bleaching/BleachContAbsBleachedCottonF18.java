package com.focusr.Precot.mssql.database.model.bleaching;

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

@Entity
@Table(name = "BLEACH_CONT_ABS_BLEACHED_COTTON_F18",schema=AppConstants.schema,  uniqueConstraints = {
		@UniqueConstraint(columnNames = { "BMR_NO","BALE_NO","BATCH_NO" }) })
public class BleachContAbsBleachedCottonF18 extends UserDateAudit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "DATE")
	private String date;

	@Column(name = "BMR_NO")
	private String bmrNo;

	@Column(name = "QUANTITY")
	private Float quantity;

	@Column(name = "BATCH_NO")
	private Long batchNo;

	@Column(name = "BALE_NO")
	private String baleNo;

	@Column(name = "NO_OF_HAIR")
	private Long noOfHair;

	@Column(name = "REF_HAIR")
	private String refHair;

	@Column(name = "NO_OF_JUTE")
	private Long noOfJute;

	@Column(name = "REF_JUTE")
	private String refJute;

	@Column(name = "NO_OF_COLOUR_THREAD")
	private Long noOfColourThread;

	@Column(name = "REF_COLOUR_THREAD")
	private String refColourThread;

	@Column(name = "NO_OF_WRAPPER")
	private Long noOfWrapper;

	@Column(name = "REF_WRAPPER")
	private String refWrapper;

	@Column(name = "NO_OF_METAL")
	private Long noOfMetal;

	@Column(name = "REF_METAL")
	private String refMetal;

	@Column(name = "NO_OF_RUST")
	private Long noOfRust;

	@Column(name = "REF_RUST")
	private String refRust;

	@Column(name = "NO_OF_PLASTIC")
	private Long noOfPlastic;

	@Column(name = "REF_PLASTIC")
	private String refPlastic;

	@Column(name = "NO_OF_BLACK_COTTON")
	private Long noOfBlackCotton;

	@Column(name = "REF_BLACK_COTTON")
	private String refBlackCotton;
	
	@Column(name = "NO_OF_UNBLEACHED_COTTON")
	private Long noOfUnBleachedCotton;
	
	@Column(name = "REF_UNBLEACHED_COTTON")
	private String refUnBleachedCotton;

	@Column(name = "NO_OF_OIL_COTTON")
	private Long noOfOilCotton;

	@Column(name = "REF_OIL_COTTON")
	private String refOilCotton;

	@Column(name = "NO_OF_SOIL")
	private Long noOfSoil;

	@Column(name = "REF_SOIL")
	private String refSoil;

	@Column(name = "NO_OF_YELLOW_COTTON")
	private Long noOfYellowCotton;

	@Column(name = "REF_YELLOW_COTTON")
	private String refYellowCotton;

	@Column(name = "NO_OF_PAPER")
	private Long noOfPaper;

	@Column(name = "REF_PAPER")
	private String refPaper;

	@Column(name = "NO_OF_STICK")
	private Long noOfStick;

	@Column(name = "REF_STICK")
	private String refStick;

	@Column(name = "NO_OF_FEATHER")
	private Long noOfFeather;

	@Column(name = "REF_FEATHER")
	private String refFeather;

	@Column(name = "NO_OF_CLOTH")
	private Long noOfCloth;

	@Column(name = "REF_CLOTH")
	private String refCloth;

	@Column(name = "NO_OF_WHITE_POLY_PROPYLENE")
	private Long noOfwhitePolyPropylene;

	@Column(name = "REF_WHITE_POLY_PROPYLENE")
	private String refWhitePolyPropylene;

	@Column(name = "NO_OF_COLOUR_POLY_PROPYLENE")
	private Long noOfColourPolyPropylene;

	@Column(name = "REF_COLOUR_POLY_PROPYLENE")
	private String refColourPolyPropylene;

	@Column(name = "NO_OF_RUBBER_PIECE")
	private Long noOfRubberPiece;

	@Column(name = "REF_RUBBER_PIECE")
	private String refRubberPiece;

	@Column(name = "TOTAL")
	private Long total;

	@Column(name = "REF_TOTAL")
	private String refTotal;
	
	@Column(name = "UNIT")
	private String unit;

//	@Column(name = "STATUS")
//	private String status;
//
//	@Column(name = "MAIL_STATUS")
//	private String mailStatus;
//
//	@Column(name = "SUPERVISOR_STATUS")
//	private String supervisiorStatus;
//
//	@Column(name = "SUPERVISOR_SUBMITTED_ON")
//	private Date supervisiorSubmittedOn;
//
//	@Column(name = "SUPERVISOR_SIGNATURE")
//	private String supervisiorSignature;
//
//	@Column(name = "HOD_APPROVER_STATUS")
//	private String hodApproverStatus;
//
//	@Column(name = "HOD_MAIL_STATUS")
//	private String hodMailStatus;
//
//	@Column(name = "HOD_SUBMITTED_ON")
//	private Date hodSubmittedOn;
//
//	@Column(name = "HOD_APPROVED_ON")
//	private Date hodApprovedOn;
//
//	@Column(name = "HOD_SIGNATURE")
//	private String hodSignature;
	
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
	@Column(name = "SUPERVISIOR_SIGNATURE")
	private byte[] supervisiorSignature;
	
	@Lob
	@Column(name = "HOD_SIGNATURE")
	private byte[] hodSignature;
	
	@Column(name = "REASON")
	private String reason;
	
	public BleachContAbsBleachedCottonF18() {
	}

	public BleachContAbsBleachedCottonF18(Long id, String formatName, String formatNo, Long revisionNo, String refSopNo,
			String date, String bmrNo, Float quantity, Long batchNo, String baleNo, Long noOfHair, String refHair,
			Long noOfJute, String refJute, Long noOfColourThread, String refColourThread, Long noOfWrapper,
			String refWrapper, Long noOfMetal, String refMetal, Long noOfRust, String refRust, Long noOfPlastic,
			String refPlastic, Long noOfBlackCotton, String refBlackCotton, Long noOfUnBleachedCotton,
			String refUnBleachedCotton, Long noOfOilCotton, String refOilCotton, Long noOfSoil, String refSoil,
			Long noOfYellowCotton, String refYellowCotton, Long noOfPaper, String refPaper, Long noOfStick,
			String refStick, Long noOfFeather, String refFeather, Long noOfCloth, String refCloth,
			Long noOfwhitePolyPropylene, String refWhitePolyPropylene, Long noOfColourPolyPropylene,
			String refColourPolyPropylene, Long noOfRubberPiece, String refRubberPiece, Long total, String refTotal,
			String unit, String mail_status, String supervisor_status, Date supervisor_saved_on,
			String supervisor_saved_by, Long supervisor_saved_id, Date supervisor_submit_on,
			String supervisor_submit_by, Long supervisor_submit_id, String supervisor_sign, String hod_status,
			Date hod_saved_on, String hod_saved_by, Long hod_saved_id, Date hod_submit_on, String hod_submit_by,
			Long hod_submit_id, String hod_sign) {
		super();
		this.id = id;
		this.formatName = formatName;
		this.formatNo = formatNo;
		this.revisionNo = revisionNo;
		this.refSopNo = refSopNo;
		this.date = date;
		this.bmrNo = bmrNo;
		this.quantity = quantity;
		this.batchNo = batchNo;
		this.baleNo = baleNo;
		this.noOfHair = noOfHair;
		this.refHair = refHair;
		this.noOfJute = noOfJute;
		this.refJute = refJute;
		this.noOfColourThread = noOfColourThread;
		this.refColourThread = refColourThread;
		this.noOfWrapper = noOfWrapper;
		this.refWrapper = refWrapper;
		this.noOfMetal = noOfMetal;
		this.refMetal = refMetal;
		this.noOfRust = noOfRust;
		this.refRust = refRust;
		this.noOfPlastic = noOfPlastic;
		this.refPlastic = refPlastic;
		this.noOfBlackCotton = noOfBlackCotton;
		this.refBlackCotton = refBlackCotton;
		this.noOfUnBleachedCotton = noOfUnBleachedCotton;
		this.refUnBleachedCotton = refUnBleachedCotton;
		this.noOfOilCotton = noOfOilCotton;
		this.refOilCotton = refOilCotton;
		this.noOfSoil = noOfSoil;
		this.refSoil = refSoil;
		this.noOfYellowCotton = noOfYellowCotton;
		this.refYellowCotton = refYellowCotton;
		this.noOfPaper = noOfPaper;
		this.refPaper = refPaper;
		this.noOfStick = noOfStick;
		this.refStick = refStick;
		this.noOfFeather = noOfFeather;
		this.refFeather = refFeather;
		this.noOfCloth = noOfCloth;
		this.refCloth = refCloth;
		this.noOfwhitePolyPropylene = noOfwhitePolyPropylene;
		this.refWhitePolyPropylene = refWhitePolyPropylene;
		this.noOfColourPolyPropylene = noOfColourPolyPropylene;
		this.refColourPolyPropylene = refColourPolyPropylene;
		this.noOfRubberPiece = noOfRubberPiece;
		this.refRubberPiece = refRubberPiece;
		this.total = total;
		this.refTotal = refTotal;
		this.unit = unit;
		this.mail_status = mail_status;
		this.supervisor_status = supervisor_status;
		this.supervisor_saved_on = supervisor_saved_on;
		this.supervisor_saved_by = supervisor_saved_by;
		this.supervisor_saved_id = supervisor_saved_id;
		this.supervisor_submit_on = supervisor_submit_on;
		this.supervisor_submit_by = supervisor_submit_by;
		this.supervisor_submit_id = supervisor_submit_id;
		this.supervisor_sign = supervisor_sign;
		this.hod_status = hod_status;
		this.hod_saved_on = hod_saved_on;
		this.hod_saved_by = hod_saved_by;
		this.hod_saved_id = hod_saved_id;
		this.hod_submit_on = hod_submit_on;
		this.hod_submit_by = hod_submit_by;
		this.hod_submit_id = hod_submit_id;
		this.hod_sign = hod_sign;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Long getRevisionNo() {
		return revisionNo;
	}

	public void setRevisionNo(Long revisionNo) {
		this.revisionNo = revisionNo;
	}

	public String getRefSopNo() {
		return refSopNo;
	}

	public void setRefSopNo(String refSopNo) {
		this.refSopNo = refSopNo;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getBmrNo() {
		return bmrNo;
	}

	public void setBmrNo(String bmrNo) {
		this.bmrNo = bmrNo;
	}

	public Float getQuantity() {
		return quantity;
	}

	public void setQuantity(Float quantity) {
		this.quantity = quantity;
	}

	public Long getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(Long batchNo) {
		this.batchNo = batchNo;
	}

	public String getBaleNo() {
		return baleNo;
	}

	public void setBaleNo(String baleNo) {
		this.baleNo = baleNo;
	}

	public Long getNoOfHair() {
		return noOfHair;
	}

	public void setNoOfHair(Long noOfHair) {
		this.noOfHair = noOfHair;
	}

	public String getRefHair() {
		return refHair;
	}

	public void setRefHair(String refHair) {
		this.refHair = refHair;
	}

	public Long getNoOfJute() {
		return noOfJute;
	}

	public void setNoOfJute(Long noOfJute) {
		this.noOfJute = noOfJute;
	}

	public String getRefJute() {
		return refJute;
	}

	public void setRefJute(String refJute) {
		this.refJute = refJute;
	}

	public Long getNoOfColourThread() {
		return noOfColourThread;
	}

	public void setNoOfColourThread(Long noOfColourThread) {
		this.noOfColourThread = noOfColourThread;
	}

	public String getRefColourThread() {
		return refColourThread;
	}

	public void setRefColourThread(String refColourThread) {
		this.refColourThread = refColourThread;
	}

	public Long getNoOfWrapper() {
		return noOfWrapper;
	}

	public void setNoOfWrapper(Long noOfWrapper) {
		this.noOfWrapper = noOfWrapper;
	}

	public String getRefWrapper() {
		return refWrapper;
	}

	public void setRefWrapper(String refWrapper) {
		this.refWrapper = refWrapper;
	}

	public Long getNoOfMetal() {
		return noOfMetal;
	}

	public void setNoOfMetal(Long noOfMetal) {
		this.noOfMetal = noOfMetal;
	}

	public String getRefMetal() {
		return refMetal;
	}

	public void setRefMetal(String refMetal) {
		this.refMetal = refMetal;
	}

	public Long getNoOfRust() {
		return noOfRust;
	}

	public void setNoOfRust(Long noOfRust) {
		this.noOfRust = noOfRust;
	}

	public String getRefRust() {
		return refRust;
	}

	public void setRefRust(String refRust) {
		this.refRust = refRust;
	}

	public Long getNoOfPlastic() {
		return noOfPlastic;
	}

	public void setNoOfPlastic(Long noOfPlastic) {
		this.noOfPlastic = noOfPlastic;
	}

	public String getRefPlastic() {
		return refPlastic;
	}

	public void setRefPlastic(String refPlastic) {
		this.refPlastic = refPlastic;
	}

	public Long getNoOfBlackCotton() {
		return noOfBlackCotton;
	}

	public void setNoOfBlackCotton(Long noOfBlackCotton) {
		this.noOfBlackCotton = noOfBlackCotton;
	}

	public String getRefBlackCotton() {
		return refBlackCotton;
	}

	public void setRefBlackCotton(String refBlackCotton) {
		this.refBlackCotton = refBlackCotton;
	}

	public Long getNoOfOilCotton() {
		return noOfOilCotton;
	}

	public void setNoOfOilCotton(Long noOfOilCotton) {
		this.noOfOilCotton = noOfOilCotton;
	}

	public String getRefOilCotton() {
		return refOilCotton;
	}

	public void setRefOilCotton(String refOilCotton) {
		this.refOilCotton = refOilCotton;
	}

	public Long getNoOfSoil() {
		return noOfSoil;
	}

	public void setNoOfSoil(Long noOfSoil) {
		this.noOfSoil = noOfSoil;
	}

	public String getRefSoil() {
		return refSoil;
	}

	public void setRefSoil(String refSoil) {
		this.refSoil = refSoil;
	}

	public Long getNoOfYellowCotton() {
		return noOfYellowCotton;
	}

	public void setNoOfYellowCotton(Long noOfYellowCotton) {
		this.noOfYellowCotton = noOfYellowCotton;
	}

	public String getRefYellowCotton() {
		return refYellowCotton;
	}

	public void setRefYellowCotton(String refYellowCotton) {
		this.refYellowCotton = refYellowCotton;
	}

	public Long getNoOfPaper() {
		return noOfPaper;
	}

	public void setNoOfPaper(Long noOfPaper) {
		this.noOfPaper = noOfPaper;
	}

	public String getRefPaper() {
		return refPaper;
	}

	public void setRefPaper(String refPaper) {
		this.refPaper = refPaper;
	}

	public Long getNoOfStick() {
		return noOfStick;
	}

	public void setNoOfStick(Long noOfStick) {
		this.noOfStick = noOfStick;
	}

	public String getRefStick() {
		return refStick;
	}

	public void setRefStick(String refStick) {
		this.refStick = refStick;
	}

	public Long getNoOfFeather() {
		return noOfFeather;
	}

	public void setNoOfFeather(Long noOfFeather) {
		this.noOfFeather = noOfFeather;
	}

	public String getRefFeather() {
		return refFeather;
	}

	public void setRefFeather(String refFeather) {
		this.refFeather = refFeather;
	}

	public Long getNoOfCloth() {
		return noOfCloth;
	}

	public void setNoOfCloth(Long noOfCloth) {
		this.noOfCloth = noOfCloth;
	}

	public String getRefCloth() {
		return refCloth;
	}

	public void setRefCloth(String refCloth) {
		this.refCloth = refCloth;
	}

	public Long getNoOfwhitePolyPropylene() {
		return noOfwhitePolyPropylene;
	}

	public void setNoOfwhitePolyPropylene(Long noOfwhitePolyPropylene) {
		this.noOfwhitePolyPropylene = noOfwhitePolyPropylene;
	}

	public String getRefWhitePolyPropylene() {
		return refWhitePolyPropylene;
	}

	public void setRefWhitePolyPropylene(String refWhitePolyPropylene) {
		this.refWhitePolyPropylene = refWhitePolyPropylene;
	}

	public Long getNoOfColourPolyPropylene() {
		return noOfColourPolyPropylene;
	}

	public void setNoOfColourPolyPropylene(Long noOfColourPolyPropylene) {
		this.noOfColourPolyPropylene = noOfColourPolyPropylene;
	}

	public String getRefColourPolyPropylene() {
		return refColourPolyPropylene;
	}

	public void setRefColourPolyPropylene(String refColourPolyPropylene) {
		this.refColourPolyPropylene = refColourPolyPropylene;
	}

	public Long getNoOfRubberPiece() {
		return noOfRubberPiece;
	}

	public void setNoOfRubberPiece(Long noOfRubberPiece) {
		this.noOfRubberPiece = noOfRubberPiece;
	}

	public String getRefRubberPiece() {
		return refRubberPiece;
	}

	public void setRefRubberPiece(String refRubberPiece) {
		this.refRubberPiece = refRubberPiece;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public String getRefTotal() {
		return refTotal;
	}

	public void setRefTotal(String refTotal) {
		this.refTotal = refTotal;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
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

	public Long getNoOfUnBleachedCotton() {
		return noOfUnBleachedCotton;
	}

	public void setNoOfUnBleachedCotton(Long noOfUnBleachedCotton) {
		this.noOfUnBleachedCotton = noOfUnBleachedCotton;
	}

	public String getRefUnBleachedCotton() {
		return refUnBleachedCotton;
	}

	public void setRefUnBleachedCotton(String refUnBleachedCotton) {
		this.refUnBleachedCotton = refUnBleachedCotton;
	}

	@Override
	public String toString() {
		return "BleachContAbsBleachedCottonF18 [id=" + id + ", formatName=" + formatName + ", formatNo=" + formatNo
				+ ", revisionNo=" + revisionNo + ", refSopNo=" + refSopNo + ", date=" + date + ", bmrNo=" + bmrNo
				+ ", quantity=" + quantity + ", batchNo=" + batchNo + ", baleNo=" + baleNo + ", noOfHair=" + noOfHair
				+ ", refHair=" + refHair + ", noOfJute=" + noOfJute + ", refJute=" + refJute + ", noOfColourThread="
				+ noOfColourThread + ", refColourThread=" + refColourThread + ", noOfWrapper=" + noOfWrapper
				+ ", refWrapper=" + refWrapper + ", noOfMetal=" + noOfMetal + ", refMetal=" + refMetal + ", noOfRust="
				+ noOfRust + ", refRust=" + refRust + ", noOfPlastic=" + noOfPlastic + ", refPlastic=" + refPlastic
				+ ", noOfBlackCotton=" + noOfBlackCotton + ", refBlackCotton=" + refBlackCotton
				+ ", noOfUnBleachedCotton=" + noOfUnBleachedCotton + ", refUnBleachedCotton=" + refUnBleachedCotton
				+ ", noOfOilCotton=" + noOfOilCotton + ", refOilCotton=" + refOilCotton + ", noOfSoil=" + noOfSoil
				+ ", refSoil=" + refSoil + ", noOfYellowCotton=" + noOfYellowCotton + ", refYellowCotton="
				+ refYellowCotton + ", noOfPaper=" + noOfPaper + ", refPaper=" + refPaper + ", noOfStick=" + noOfStick
				+ ", refStick=" + refStick + ", noOfFeather=" + noOfFeather + ", refFeather=" + refFeather
				+ ", noOfCloth=" + noOfCloth + ", refCloth=" + refCloth + ", noOfwhitePolyPropylene="
				+ noOfwhitePolyPropylene + ", refWhitePolyPropylene=" + refWhitePolyPropylene
				+ ", noOfColourPolyPropylene=" + noOfColourPolyPropylene + ", refColourPolyPropylene="
				+ refColourPolyPropylene + ", noOfRubberPiece=" + noOfRubberPiece + ", refRubberPiece=" + refRubberPiece
				+ ", total=" + total + ", refTotal=" + refTotal + ", unit=" + unit + ", mail_status=" + mail_status
				+ ", supervisor_status=" + supervisor_status + ", supervisor_saved_on=" + supervisor_saved_on
				+ ", supervisor_saved_by=" + supervisor_saved_by + ", supervisor_saved_id=" + supervisor_saved_id
				+ ", supervisor_submit_on=" + supervisor_submit_on + ", supervisor_submit_by=" + supervisor_submit_by
				+ ", supervisor_submit_id=" + supervisor_submit_id + ", supervisor_sign=" + supervisor_sign
				+ ", hod_status=" + hod_status + ", hod_saved_on=" + hod_saved_on + ", hod_saved_by=" + hod_saved_by
				+ ", hod_saved_id=" + hod_saved_id + ", hod_submit_on=" + hod_submit_on + ", hod_submit_by="
				+ hod_submit_by + ", hod_submit_id=" + hod_submit_id + ", hod_sign=" + hod_sign + "]";
	}

	public byte[] getSupervisiorSignature() {
		return supervisiorSignature;
	}

	public void setSupervisiorSignature(byte[] supervisiorSignature) {
		this.supervisiorSignature = supervisiorSignature;
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
	
	
	
}
