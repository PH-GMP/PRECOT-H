package com.focusr.Precot.mssql.database.model.padpunching;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "PADPUNCHING_STOPPAGE_DETAILS_F002", schema = AppConstants.schema)
public class StoppageDetailsF002 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;

	@Column(name = "STOP_TIME")
	private String stopTime;

	@Column(name = "START_TIME")
	private String startTime;

	@Column(name = "TOTAL_MIN")
	private String totalMin;

	@Column(name = "REASON")
	private String reason;

	@Column(name = "ATTEND_BY")
	private String attendBy;
	
	@Column(name = "REMARKS")
	private String remarks;
	
	@Column(name = "REPORT_ID")
	private Long reportId;

}
