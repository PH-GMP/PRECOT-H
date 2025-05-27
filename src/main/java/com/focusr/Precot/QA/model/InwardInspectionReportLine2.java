package com.focusr.Precot.QA.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;

@Data
@Entity
@Table(name = "QA_INWARD_INSPECTION_REPORT_LINES_2", schema = AppConstants.schema)
public class InwardInspectionReportLine2 {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;
	
	@Column(name = "CATEGORY")
	private String category;
	
	@Column(name = "DEFECTS")
	private String defects;
	
	@Column(name = "NO_OF_DEFECTS")
	private String no_of_defects;
	
	@Column(name = "TOTAL_NO_OF_DEFECTS")
	private String total_no_of_defects;
	
	@Column(name = "MAXIMUM_NO_OF_DEFECTS")
	private String maximum_no_of_defects;
	
	// film
	@Column(name = "DEFECT_OBSERVATION")
	private String defect_observation;
	
	@Column(name = "ID")
	private Long id;

//	    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//	    @JoinColumn(name = "ID", insertable = false, updatable = false)
//	    @JsonIgnore
//	    private  InwardInspectionReport  inwardinspectionreport;
}
