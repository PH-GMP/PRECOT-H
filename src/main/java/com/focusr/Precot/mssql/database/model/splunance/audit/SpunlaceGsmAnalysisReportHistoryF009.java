package com.focusr.Precot.mssql.database.model.splunance.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.mssql.database.model.SpunlaceSaveSumbitSupervisor;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_GSM_ANALYSIS_REPORT_HISTORY_F009", schema = AppConstants.schema)
public class SpunlaceGsmAnalysisReportHistoryF009 extends SpunlaceSaveSumbitSupervisor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "REPORT_ID")
	private Long reportId;

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
	
	@Column(name = "PRODUCT_NAME")
	private String productName;
	
	@Column(name = "MIXING")
	private String mixing;
	
	@Column(name = "MATERIAL_CODE")
	private String materialCode;
	
	@Column(name = "STD_GSM")
	private String stdGsm;

	@Column(name = "STD_MOISTURE")
	private String stdMoisture;

	@Column(name = "PATTERN")
	private String pattern;
	
	@Column(name = "REASON")
	private String reason;
	
	@Column(name = "VERSION")
	private int version;
	
}
