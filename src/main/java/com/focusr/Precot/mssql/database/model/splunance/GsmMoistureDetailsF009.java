//package com.focusr.Precot.mssql.database.model.splunance;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//
//import com.focusr.Precot.model.audit.UserDateAudit;
//import com.focusr.Precot.util.AppConstants;
//
//import lombok.Data;
//
//@Data
//@Entity
//@Table(name = "SPUNLACE_GSM_MOISTURE_DETAILS_F009", schema = AppConstants.schema)
//public class GsmMoistureDetailsF009 extends UserDateAudit{
//
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "DETAIL_ID")
//	private Long detailId;
//
//	@Column(name = "SHAFT_NO")
//	private String shaftNo;
//	
//	//gsm
//	@Column(name = "GSM_1")
//	private String g_1;
//	
//	@Column(name = "GSM_2")
//	private String g_2;
//	
//	@Column(name = "GSM_3")
//	private String g_3;
//	
//	@Column(name = "GSM_4")
//	private String g_4;
//	
//	@Column(name = "GSM_5")
//	private String g_5;
//	
//	@Column(name = "GSM_6")
//	private String g_6;
//	
//	@Column(name = "GSM_7")
//	private String g_7;
//	
//	@Column(name = "GSM_8")
//	private String g_8;
//	
//	@Column(name = "GSM_9")
//	private String g_9;
//	
//	@Column(name = "GSM_10")
//	private String g_10;
//	
//	@Column(name = "GSM_MAX")
//	private String g_max;
//	
//	@Column(name = "GSM_MIN")
//	private String g_min;
//	
//	@Column(name = "GSM_AVG")
//	private String g_avg;
//	
//	//moisture
//	@Column(name = "MOISTURE_1")
//	private String m_1;
//	
//	@Column(name = "MOISTURE_2")
//	private String m_2;
//	
//	@Column(name = "MOISTURE_3")
//	private String m_3;
//	
//	@Column(name = "MOISTURE_4")
//	private String m_4;
//	
//	@Column(name = "MOISTURE_5")
//	private String m_5;
//	
//	@Column(name = "MOISTURE_6")
//	private String m_6;
//	
//	@Column(name = "MOISTURE_7")
//	private String m_7;
//	
//	@Column(name = "MOISTURE_8")
//	private String m_8;
//	
//	@Column(name = "MOISTURE_9")
//	private String m_9;
//	
//	@Column(name = "MOISTURE_10")
//	private String m_10;
//	
//	@Column(name = "MOISTURE_MAX")
//	private String m_max;
//	
//	@Column(name = "MOISTURE_MIN")
//	private String m_min;
//	
//	@Column(name = "MOISTURE_AVG")
//	private String m_avg;
//	
//	@Column(name = "REPORT_ID")
//	private Long reportId;
//	
//}
