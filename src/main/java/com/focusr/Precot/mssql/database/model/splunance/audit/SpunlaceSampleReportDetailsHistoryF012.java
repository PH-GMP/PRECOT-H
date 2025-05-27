package com.focusr.Precot.mssql.database.model.splunance.audit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.mssql.database.model.splunance.SpunlaceSampleReportDetailsF012;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "SPUNLACE_SAMPLE_REPORT_DETAILS_HISTORY_F012",schema=AppConstants.schema)
public class SpunlaceSampleReportDetailsHistoryF012 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DETAIL_ID")
	private Long detail_id;
	
	@Column(name = "SHAFT_NO")
	private String shaft_no;
	
	@Column(name = "ROLL_NO")
	private String roll_no;
	
	@Column(name = "LENGTH")
	private String length;
	
	@Column(name = "WIDTH")
	private String width;
	
	@Column(name = "NET_WEIGHT")
	private String net_weight;
	
	@Column(name = "ROLL_GSM")
	private String roll_gsm;
	
	@Column(name = "MOISTURE")
	private String moisture;
	
	@Column(name = "ROLL_DAI")
	private String roll_dai;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "REPORT_ID")
	private Long report_id;


}
