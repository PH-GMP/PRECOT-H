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
@Table(name = "QA_METAL_DETECTOR_PASS_REPORT_LINES", schema = AppConstants.schema)

public class MetalDetectorPassReportLines {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;

	@Column(name = "MACHINE_NAME")
	private String machine_name;

	@Column(name = "PRODUCT_DESCRIPTION")
	private String product_description;

	@Column(name = "NO_OF_BAGS_PASSED")
	private String no_of_bags_passed;

	@Column(name = "OK_BAGS")
	private String ok_bags;

	@Column(name = "REJECTED_BAGS")
	private String rejected_bags;

	@Column(name = "METAL_ID")
	private Long metal_id;

}
