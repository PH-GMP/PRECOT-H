package com.focusr.Precot.mssql.database.model.drygoods;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.focusr.Precot.payload.spulance.SpunlaceSummerySubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "DRYGOODS_BMR_07_MANUFACTURING_STEPS", schema = AppConstants.schema)
public class BMR07GoodsManufacturingStepsCottonBalls {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "BATCH_NO")
	private String batch_no;

	@Column(name = "ORDER_NO")
	private String order_no;

	@Column(name = "FORM_NO")
	private String form_no;

	// RDY01
	@Column(name = "OBSERVATION_01")
	private String observation01;

	@Column(name = "RDY_NO_RDY_01")
	private String rdyNoRdy01;

	@Column(name = "RDY_01_DATE_PROD")
	private String rdy01DateProd;

	@Column(name = "RDY_01_TIME_PROD")
	private String rdy01TimeProd;

	@Column(name = "RDY_01_NAME_PROD")
	private String rdy01NameProd;

	@Column(name = "RDY_01_SIGN_PROD")
	private String rdy01SignProd;

	@Column(name = "RDY_01_DATE_QA")
	private String rdy01DateQa;

	@Column(name = "RDY_01_TIME_QA")
	private String rdy01TimeQa;

	@Column(name = "RDY_01_NAME_QA")
	private String rdy01NameQa;

	@Column(name = "RDY_01_SIGN_QA")
	private String rdy01SignQa;

	// RDY02
	@Column(name = "OBSERVATION_02")
	private String observation02;

	@Column(name = "RDY_NO_RDY_02")
	private String rdyNoRdy02;

	@Column(name = "RDY_02_DATE_PROD")
	private String rdy02DateProd;

	@Column(name = "RDY_02_TIME_PROD")
	private String rdy02TimeProd;

	@Column(name = "RDY_02_NAME_PROD")
	private String rdy02NameProd;

	@Column(name = "RDY_02_SIGN_PROD")
	private String rdy02SignProd;

	@Column(name = "RDY_02_DATE_QA")
	private String rdy02DateQa;

	@Column(name = "RDY_02_TIME_QA")
	private String rdy02TimeQa;

	@Column(name = "RDY_02_NAME_QA")
	private String rdy02NameQa;

	@Column(name = "RDY_02_SIGN_QA")
	private String rdy02SignQa;

	// TC01
	@Column(name = "OBSERVATION_03")
	private String observation03;

	@Column(name = "TC_01_DELV_SPEED")
	private String tc01DelvSpeed;

	@Column(name = "TC_01_DRAFT")
	private String tc01Draft;

	@Column(name = "TC_01_DATE_PROD")
	private String tc01DateProd;

	@Column(name = "TC_01_TIME_PROD")
	private String tc01TimeProd;

	@Column(name = "TC_01_NAME_PROD")
	private String tc01NameProd;

	@Column(name = "TC_01_SIGN_PROD")
	private String tc01SignProd;

	@Column(name = "TC_01_DATE_QA")
	private String tc01DateQa;

	@Column(name = "TC_01_TIME_QA")
	private String tc01TimeQa;

	@Column(name = "TC_01_NAME_QA")
	private String tc01NameQa;

	@Column(name = "TC_01_SIGN_QA")
	private String tc01SignQa;

	// TC02
	@Column(name = "OBSERVATION_04")
	private String observation04;

	@Column(name = "TC_02_DELV_SPEED")
	private String tc02DelvSpeed;

	@Column(name = "TC_02_DRAFT")
	private String tc02Draft;

	@Column(name = "TC_02_DATE_PROD")
	private String tc02DateProd;

	@Column(name = "TC_02_TIME_PROD")
	private String tc02TimeProd;

	@Column(name = "TC_02_NAME_PROD")
	private String tc02NameProd;

	@Column(name = "TC_02_SIGN_PROD")
	private String tc02SignProd;

	@Column(name = "TC_02_DATE_QA")
	private String tc02DateQa;

	@Column(name = "TC_02_TIME_QA")
	private String tc02TimeQa;

	@Column(name = "TC_02_NAME_QA")
	private String tc02NameQa;

	@Column(name = "TC_02_SIGN_QA")
	private String tc02SignQa;

	// Observation and PSD/NO
	@Column(name = "OBSERVATION_05")
	private String observation05;

	@Column(name = "PSD_NO_05")
	private String psdNo05;

	@Column(name = "NO_05_DRAFT")
	private String no05Draft;

	@Column(name = "NO_05_DATE_PROD")
	private String no05DateProd;

	@Column(name = "NO_05_TIME_PROD")
	private String no05TimeProd;

	@Column(name = "NO_05_NAME_PROD")
	private String no05NameProd;

	@Column(name = "NO_05_SIGN_PROD")
	private String no05SignProd;

	@Column(name = "NO_05_DATE_QA")
	private String no05DateQa;

	@Column(name = "NO_05_TIME_QA")
	private String no05TimeQa;

	@Column(name = "NO_05_NAME_QA")
	private String no05NameQa;

	@Column(name = "NO_05_SIGN_QA")
	private String no05SignQa;

	// Observation and PSD/NO 06
	@Column(name = "OBSERVATION_06")
	private String observation06;

	@Column(name = "PSD_NO_06")
	private String psdNo06;

	@Column(name = "NO_06_DRAFT")
	private String no06Draft;

	@Column(name = "NO_06_DATE_PROD")
	private String no06DateProd;

	@Column(name = "NO_06_TIME_PROD")
	private String no06TimeProd;

	@Column(name = "NO_06_NAME_PROD")
	private String no06NameProd;

	@Column(name = "NO_06_SIGN_PROD")
	private String no06SignProd;

	@Column(name = "NO_06_DATE_QA")
	private String no06DateQa;

	@Column(name = "NO_06_TIME_QA")
	private String no06TimeQa;

	@Column(name = "NO_06_NAME_QA")
	private String no06NameQa;

	@Column(name = "NO_06_SIGN_QA")
	private String no06SignQa;

	// RDY07
	@Column(name = "OBSERVATION_07")
	private String observation07;

	@Column(name = "RDY_NO_RDY_07")
	private String rdyNoRdy07;

	@Column(name = "RDY_07_DATE_PROD")
	private String rdy07DateProd;

	@Column(name = "RDY_07_TIME_PROD")
	private String rdy07TimeProd;

	@Column(name = "RDY_07_NAME_PROD")
	private String rdy07NameProd;

	@Column(name = "RDY_07_SIGN_PROD")
	private String rdy07SignProd;

	@Column(name = "RDY_07_DATE_QA")
	private String rdy07DateQa;

	@Column(name = "RDY_07_TIME_QA")
	private String rdy07TimeQa;

	@Column(name = "RDY_07_NAME_QA")
	private String rdy07NameQa;

	@Column(name = "RDY_07_SIGN_QA")
	private String rdy07SignQa;

	// Observation and PSD/NO 08

	@Column(name = "OBSERVATION_08")
	private String observation08;

	@Column(name = "PSD_NO_08")
	private String psdNo08;

	@Column(name = "NO_08_DRAFT")
	private String no08Draft;

	@Column(name = "NO_08_DATE_PROD")
	private String no08DateProd;

	@Column(name = "NO_08_TIME_PROD")
	private String no08TimeProd;

	@Column(name = "NO_08_NAME_PROD")
	private String no08NameProd;

	@Column(name = "NO_08_SIGN_PROD")
	private String no08SignProd;

	@Column(name = "NO_08_DATE_QA")
	private String no08DateQa;

	@Column(name = "NO_08_TIME_QA")
	private String no08TimeQa;

	@Column(name = "NO_08_NAME_QA")
	private String no08NameQa;

	@Column(name = "NO_08_SIGN_QA")
	private String no08SignQa;

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
