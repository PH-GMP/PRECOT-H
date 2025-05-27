package com.focusr.Precot.QA.model;

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
@Table(name = "QA_INWARD_INSPECTION_REPORT_LINES_1", schema = AppConstants.schema)
public class InwardInspectionReportLine1 {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;
	
	@Column(name = "PARAMETER")
	private String parameter;
	
	@Column(name = "SPECIFICATION")
	private String specification;
	
	@Column(name = "OBSERVATION")
	private String observation;
	
	@Column(name = "ID")
	private Long id;
	
//	 @ManyToOne(fetch = FetchType.EAGER)
//	    @JoinColumn(name = "ID", insertable = false, updatable = false)
//	    @JsonIgnore
//	    private  InwardInspectionReport  inwardinspectionreport;
}
