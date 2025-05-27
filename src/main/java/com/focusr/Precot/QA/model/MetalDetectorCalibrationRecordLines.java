package com.focusr.Precot.QA.model;

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
@Table(name = "METAL_DETECTOR_CALIBRATION_RECORDS_LINES", schema = AppConstants.schema)
public class MetalDetectorCalibrationRecordLines {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;

	@Column(name = "DATE")
	private String date;

	@Column(name = "TIME")
	private String time;

	@Column(name = "PRODUCT_NAME")
	private String product_name;

	@Column(name = "POSITION1")
	private String position1;
	
	@Column(name = "POSITION2")
	private String position2;
	
	@Column(name = "POSITION3")
	private String position3;
	
	@Column(name = "POSITION4")
	private String position4;
	
	@Column(name = "POSITION5")
	private String position5;
	
	@Column(name = "POSITION6")
	private String position6;
	
	@Column(name = "POSITION7")
	private String position7;
	
	@Column(name = "POSITION8")
	private String position8;
	
	@Column(name = "POSITION9")
	private String position9;


	@Column(name = "CORRECTIVE_ACTION")
	private String corrective_action;

	@Column(name = "METAL_ID")
	private Long metal_id;

//	  @ManyToOne(fetch = FetchType.EAGER)
//	    @JoinColumn(name = "METAL_ID", insertable = false, updatable = false)
//	    @JsonIgnore
//	    private MetalDetectorCalibrationRecord metaldetectorcalibrationrecord;
}
