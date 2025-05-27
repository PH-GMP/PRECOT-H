package com.focusr.Precot.mssql.database.model.drygoods;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_COTTON_WOLL_ROLL_BMR_07_MANUFACTURING_STEPS", schema = AppConstants.schema)
public class BMR07ManufacturingStepsCottonWoolRoll {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "BATCH_NO")
	private String batch_no;

//	@Column(name = "BATCH_SUB_NO")
//	private String batch_sub_no;
	
	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	// OBSERVATION_01

	@Column(name = "OBSERVATION_01")
	private String observation01;

	@Column(name = "RDY_NO_RDY_01")
	private String rdyNoRdy01;

	@Column(name = "RDY_01_DATE_PROD")
	private String rdy01DateProd;

//    @Column(name = "RDY_01_TIME_PROD")
//    private String rdy01TimeProd;

	@Column(name = "RDY_01_NAME_PROD")
	private String rdy01NameProd;

	@Column(name = "RDY_01_SIGN_PROD")
	private String rdy01SignProd;

	@Column(name = "RDY_01_DATE_QA")
	private String rdy01DateQa;

//    @Column(name = "RDY_01_TIME_QA")
//    private String rdy01TimeQa;

	@Column(name = "RDY_01_NAME_QA")
	private String rdy01NameQa;

	@Column(name = "RDY_01_SIGN_QA")
	private String rdy01SignQa;

	// OBSERVATION_02

	@Column(name = "OBSERVATION_02")
	private String observation02;

	@Column(name = "RDY_NO_RDY_02")
	private String rdyNoRdy02;

	@Column(name = "RDY_02_DATE_PROD")
	private String rdy02DateProd;

//    @Column(name = "RDY_02_TIME_PROD")
//    private String rdy02TimeProd;

	@Column(name = "RDY_02_NAME_PROD")
	private String rdy02NameProd;

	@Column(name = "RDY_02_SIGN_PROD")
	private String rdy02SignProd;

	@Column(name = "RDY_02_DATE_QA")
	private String rdy02DateQa;

//    @Column(name = "RDY_02_TIME_QA")
//    private String rdy02TimeQa;

	@Column(name = "RDY_02_NAME_QA")
	private String rdy02NameQa;

	@Column(name = "RDY_02_SIGN_QA")
	private String rdy02SignQa;

	// OBSERVATION_03

	@Column(name = "OBSERVATION_03")
	private String observation03;

	@Column(name = "CARD_LINE_SPEED")
	private String cardLineSpeed;

	@Column(name = "CARD_GSM")
	private String cardGsm;

	@Column(name = "CARD_WIDTH")
	private String cardWidth;

	@Column(name = "CARD_DATE_PROD")
	private String cardDateProd;

//	@Column(name = "CARD_TIME_PROD")
//	private String tc01TimeProd;

	@Column(name = "CARD_NAME_PROD")
	private String cardNameProd;

	@Column(name = "CARD_SIGN_PROD")
	private String cardSignProd;

	@Column(name = "CARD_DATE_QA")
	private String cardDateQa;

//	@Column(name = "CARD_TIME_QA")
//	private String cardTimeQa;

	@Column(name = "CARD_NAME_QA")
	private String cardNameQa;

	@Column(name = "CARD_SIGN_QA")
	private String cardSignQa;

	// OBSERVATION_04

	@Column(name = "OBSERVATION_04")
	private String observation04;

	@Column(name = "OBSERVATION_04_VALUE")
	private String observation04Value;

	@Column(name = "WOOL_ROLL_DATE_PROD")
	private String woolRollDateProd;

//	@Column(name = "WOOL_ROLL_TIME_PROD")
//	private String woolRollTimeProd;

	@Column(name = "WOOL_ROLL_NAME_PROD")
	private String woolRollNameProd;

	@Column(name = "WOOL_ROLL_SIGN_PROD")
	private String woolRollSignProd;

	@Column(name = "WOOL_ROLL_DATE_QA")
	private String woolRollDateQa;

//	@Column(name = "WOOL_ROLL_TIME_QA")
//	private String woolRollTimeQa;

	@Column(name = "WOOL_ROLL_NAME_QA")
	private String woolRollNameQa;

	@Column(name = "WOOL_ROLL_SIGN_QA")
	private String woolRollSignQa;

	// OBSERVATION_05

	@Column(name = "OBSERVATION_05")
	private String observation05;

	@Column(name = "RDY_NO_RDY_05")
	private String rdyNoRdy05;

	@Column(name = "RDY_05_DATE_PROD")
	private String rdy05DateProd;

//    @Column(name = "RDY_05_TIME_PROD")
//    private String rdy05TimeProd;

	@Column(name = "RDY_05_NAME_PROD")
	private String rdy05NameProd;

	@Column(name = "RDY_05_SIGN_PROD")
	private String rdy05SignProd;

	@Column(name = "RDY_05_DATE_QA")
	private String rdy05DateQa;

//    @Column(name = "RDY_05_TIME_QA")
//    private String rdy05TimeQa;

	@Column(name = "RDY_05_NAME_QA")
	private String rdy05NameQa;

	@Column(name = "RDY_05_SIGN_QA")
	private String rdy05SignQa;

	// OBSERVATION_06

	@Column(name = "OBSERVATION_06")
	private String observation06;

	@Column(name = "PDS_NO_06")
	private String pdsNo06;

	@Column(name = "NO_06_DATE_PROD")
	private String no06DateProd;

//	@Column(name = "NO_06_TIME_PROD")
//	private String no06TimeProd;

	@Column(name = "NO_06_NAME_PROD")
	private String no06NameProd;

	@Column(name = "NO_06_SIGN_PROD")
	private String no06SignProd;

	@Column(name = "NO_06_DATE_QA")
	private String no06DateQa;

//	@Column(name = "NO_06_TIME_QA")
//	private String no06TimeQa;

	@Column(name = "NO_06_NAME_QA")
	private String no06NameQa;

	@Column(name = "NO_06_SIGN_QA")
	private String no06SignQa;

	// SUPERVISOR

	@Column(name = "SUPERVISOR_STATUS")
	private String supervisor_status;

	@Column(name = "SUPERVISOR_SAVE_ON")
	private Date supervisor_save_on;

	@Column(name = "SUPERVISOR_SAVE_BY")
	private String supervisor_save_by;

	@Column(name = "SUPERVISOR_SAVE_ID")
	private Long supervisor_save_id;

	@Column(name = "SUPERVISOR_SUBMIT_ON")
	private Date supervisor_submit_on;

	@Column(name = "SUPERVISOR_SUBMIT_BY")
	private String supervisor_submit_by;

	@Column(name = "SUPERVISOR_SUBMIT_ID")
	private Long supervisor_submit_id;

	@Column(name = "SUPERVISOR_SIGN")
	private String supervisor_sign;

	// QA

	@Column(name = "QA_STATUS")
	private String qa_status;

	@Column(name = "QA_SUBMIT_ON")
	private Date qa_submit_on;

	@Column(name = "QA_SUBMIT_BY")
	private String qa_submit_by;

	@Column(name = "QA_SUBMIT_ID")
	private Long qa_submit_id;

	@Column(name = "QA_SIGN")
	private String qa_sign;

}
