package com.focusr.Precot.QA.model.audit;

import java.util.Date;
import java.util.List;

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
@Table(name = "QA_CONTAINER_INSPECTION_REPORT_LINES_HISTORY_FO39", schema = AppConstants.schema)
public class QaContainerInspectionReportLinesHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LINE_ID")
	private Long line_id;
	
	@Column(name = "BMR")
	private String bmr;
	
	@Column(name = "CONTAINER_ID")
	private Long containerId;


}
