package com.focusr.Precot.mssql.database.model.splunance.audit;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.focusr.Precot.mssql.database.model.SpunlaceQcSaveSubmit;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "SPUNLACE_SAMPLE_REPORT_HISTORY_F012",schema=AppConstants.schema)
public class SpunlaceSampleReportHistoryF012  extends SpunlaceQcSaveSubmit{

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "REPORT_ID")
		private Long report_id;

		@Column(name = "UNIT")
		private String unit;

		@Column(name = "FORMAT_NO")
		private String formatNo;

		@Column(name = "FORMAT_NAME")
		private String formatName;

		@Column(name = "SOP_NO")
		private String sopNumber;

		@Column(name = "REVISION_NO")
		private String revisionNo;

		@Column(name = "DATE")
		private String date;

		@Column(name = "SHIFT")
		private String shift;

		@Column(name = "ORDER_NO")
		private String order_no;
		
		@Column(name = "PRODUCT_NAME")
		private String product_name;

		@Column(name = "MIXING")
		private String mixing;

		@Column(name = "MATERIAL_CODE")
		private String material_code;

		@Column(name = "STD_GSM")
		private String std_gsm;
		
		@Column(name = "STD_THICKNESS")
		private String std_thickness;
		
		@Column(name = "STD_MOISTURE")
		private String std_moisture;
		
		@Column(name = "PATTERN")
		private String pattern;
		
		// new
		@Column(name = "REASON")
		private String reason;
		
		@Column(name = "VERSION")
		private int version;

		
		@OneToMany(targetEntity = SpunlaceSampleReportDetailsHistoryF012.class, cascade = CascadeType.ALL)
		@JoinColumn(name = "REPORT_ID", referencedColumnName = "REPORT_ID")
		private List<SpunlaceSampleReportDetailsHistoryF012> reportDetails;
		
	}



