package com.focusr.Precot.QA.model;

import java.time.LocalDate;
import java.util.Date;

import lombok.Data;

@Data
public class SupplierAuditReportSummaryDTO {
	private Long reportId;
	private LocalDate reportDate;
	private String supplierName;
	private String auditorStatus;
	private String supplierStatus;
	private String reason;
	
	public SupplierAuditReportSummaryDTO(Long reportId,LocalDate reportDate,String supplierName,String auditorStatus,String supplierStatus,String reason) 
	{
		this.reportId = reportId;
		this.reportDate = reportDate;
		this.supplierName =  supplierName;
		this.auditorStatus = auditorStatus;
		this.supplierStatus = supplierStatus;
		this.reason=reason;
	}
}
