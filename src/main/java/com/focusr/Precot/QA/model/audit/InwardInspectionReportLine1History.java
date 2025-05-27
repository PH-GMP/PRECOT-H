package com.focusr.Precot.QA.model.audit;

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
import com.focusr.Precot.QA.model.InwardInspectionReport;
import com.focusr.Precot.QA.model.InwardInspectionReportLine1;
import com.focusr.Precot.util.AppConstants;

import lombok.Data;
@Data
@Entity
@Table(name = "QA_INWARD_INSPECTION_REPORT_LINES_1_HISTORY", schema = AppConstants.schema)
public class InwardInspectionReportLine1History {	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "ID")
		private Long id;
		
		@Column(name = "PARAMETER")
		private String parameter;
		
		@Column(name = "SPECIFICATION")
		private String specification;
		
		@Column(name = "OBSERVATION")
		private String observation;
		
		@Column(name = "HISTORY_ID")
		private Long history_id;
		
//		 @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//		    @JoinColumn(name = "HISTORY_ID", insertable = false, updatable = false)
//		    @JsonIgnore
//		    private  InwardInspectionReportHistory  inwardinspectionreporthistory;
}
