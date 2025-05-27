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
@Table(name = "PADPUNCHING_MACHINE_DETAILS_F002", schema = AppConstants.schema)
public class MachineDetailsF002 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long lineId;

	@Column(name = "TYPE_OF_PAD")
	private String typeOfPad;

	@Column(name = "PRODUCT_NAME")
	private String productName;

	@Column(name = "BMR_NO")
	private String bmrNo;

	@Column(name = "PATTERN")
	private String pattern;

	@Column(name = "GSM")
	private String gsm;
	
	@Column(name = "EDGE")
	private String edge;
	
	@Column(name = "NO_OF_PADS_STD")
	private String noOfPadsStd;
	
	@Column(name = "NO_OF_PADS_ACT")
	private String noOfPadsAct;

	@Column(name = "REPORT_ID")
	private Long reportId;

}
