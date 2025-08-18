package com.focusr.Precot.mssql.database.model.Qc;

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
@Table(name = "NON_WOVEN_FLEECE_ANALYSIS_REPORT_LINES", schema = AppConstants.schema)
public class NonWovenF005Lines {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;

	@Column(name = "ANALYSIS_REQUEST_NUMBER")
	private String analysis_request_number;

	@Column(name = "DATE")
	private String date;

	@Column(name = "SHIFT")
	private String shift;

	@Column(name = "PRODUCT_NAME")
	private String product_name;

	@Column(name = "SHAFT_NO")
	private String shaft_no;

	@Column(name = "JETLACE_PARAMETERS_PRESSURE")
	private String jetlace_parameters_pressure;

	@Column(name = "JETLACE_PARAMETERS_TEXT")
	private String jetlace_parameters_text;

	@Column(name = "MIXING")
	private String mixing;

	@Column(name = "GSM")
	private String gsm;

	@Column(name = "PATTERN")
	private String pattern;

	@Column(name = "MOISTURE_MAHLO")
	private String moisture_mahlo;

	@Column(name = "MOISTURE_PHOBE")
	private String moisture_phobe;

	@Column(name = "THICKNESS")
	private String thickness;

	@Column(name = "STRENGTH_CROSS_DIRECTION")
	private String strength_cross_direction;

	@Column(name = "STRENGTH_MACHINE_DIRECTION")
	private String strength_machine_direction;

	@Column(name = "FRICTION")
	private String friction;

	@Column(name = "APPEARANCE")
	private String appearance;
	
	@Column(name = "TEST_ID")
	private Long test_id;

}
