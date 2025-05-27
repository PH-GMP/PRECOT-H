package com.focusr.Precot.QA.model;

import lombok.Data;

@Data
public class SupplierAuditPlanSummaryDTO {
	private Long planId;
	private String financialYear;
	private String designeeStatus;
	private String qaManagerMrStatus;
	private String reason;
	
	public SupplierAuditPlanSummaryDTO(Long planId,String financialYear,String designeeStatus,String qaManagerMrStatus,String reason) 
	{
		this.planId = planId;
		this.financialYear = financialYear;
		this.designeeStatus = designeeStatus;
		this.qaManagerMrStatus = qaManagerMrStatus;
		this.reason = reason;
	}

}
