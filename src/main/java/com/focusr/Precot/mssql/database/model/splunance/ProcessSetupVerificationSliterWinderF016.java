package com.focusr.Precot.mssql.database.model.splunance;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.mssql.database.model.SpulanceSaveSubmitOperator;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_PROCESS_SETUP_VERIFICATION_SLITER_WINDER_F016", schema = AppConstants.schema, uniqueConstraints = {
		@UniqueConstraint(columnNames = { "DATE", "SHIFT", "ORDER_NO" }) })
public class ProcessSetupVerificationSliterWinderF016 extends SpulanceSaveSubmitOperator {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PROCESS_ID")
	private Long processId;

	@Column(name = "FORMAT_NAME")
	private String formatName;

	@Column(name = "FORMAT_NO")
	private String formatNo;

	@Column(name = "REVISION_NO")
	private Long revisionNo;

	@Column(name = "REF_SOP_NO")
	private String refSopNo;

	@Column(name = "UNIT")
	private String unit;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "ORDER_NO")
	private String orderNo;
	
	@Column(name = "MIXING")
	private String mixing;
	
	@Column(name = "PRODUCT_NAME")
	private String productName;
	
	@Column(name = "PATTERN")
	private String pattern;
	
	@Column(name = "GSM")
	private String gsm;
	
	@Column(name = "MOISTURE")
	private String moisture;
	
	@Column(name = "WIDTH")
	private String width;
	
	@Column(name = "THICKNESS")
	private String thickness;
	
	
	//
	
	@Column(name = "UNWINDER")
	private String unwinder;
	
	@Column(name = "REWINDER")
	private String rewinder;
	
	@Column(name = "CUTTER_TRIM")
	private String cutterTrim;
	
	@Column(name = "LAYON_TRIM")
	private String layonTrim;
	
	@Column(name = "NO_OF_FLAGS")
	private String noOfFlags;
	
	@Column(name = "PRESSURE")
	private String pressure;
	
	@Column(name = "UW_DATA")
	private String uwData;
	
	@Column(name = "TENSION")
	private String tension;
	
	@Column(name = "DIAMETER")
	private String diameter;
	
	// 
	
//	@Column(name = "UNWINDER")
//	private int unwinder;
//	
//	@Column(name = "REWINDER")
//	private int rewinder;
//	
//	@Column(name = "CUTTER_TRIM")
//	private int cutterTrim;
//	
//	@Column(name = "LAYON_TRIM")
//	private int layonTrim;
//	
//	@Column(name = "NO_OF_FLAGS")
//	private int noOfFlags;
//	
//	@Column(name = "PRESSURE")
//	private float pressure;
//	
//	@Column(name = "UW_DATA")
//	private int uwData;
//	
//	@Column(name = "TENSION")
//	private int tension;
//	
//	@Column(name = "DIAMETER")
//	private int diameter;
	
	// 
	
	@Column(name = "REASON")
	private String reason;

}
