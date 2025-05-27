package com.focusr.Precot.QA.model;

import lombok.Data;

@Data
public class FinalInspectionReportSummaryDto {

	private Long finalInspectionId;
    private String date;
    private String shift;
    private String bmrNo;
    private String pOrder;
    private String reason;
    private String qa_inspector_status;
    private String qa_mr_status;
	private String firNo;
	
	
	public FinalInspectionReportSummaryDto(Long finalInspectionId, String date, String shift, String bmrNo,
			String pOrder, String reason, String qa_inspector_status, String qa_mr_status, String firNo) {
		super();
		this.finalInspectionId = finalInspectionId;
		this.date = date;
		this.shift = shift;
		this.bmrNo = bmrNo;
		this.pOrder = pOrder;
		this.reason = reason;
		this.qa_inspector_status = qa_inspector_status;
		this.qa_mr_status = qa_mr_status;
		this.firNo = firNo;
	}

    
}
