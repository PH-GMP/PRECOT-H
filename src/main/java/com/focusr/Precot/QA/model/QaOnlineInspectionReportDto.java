package com.focusr.Precot.QA.model;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QaOnlineInspectionReportDto {
    private Long inspectionId;            // Long for ID (matches long in error)
    private String date;                  // String for date
    private String formatNo;              // String for format number
    private String shift;                 // String for shift
    private String machineNo;             // String for machine number
    private String bmrNo;                 // String for BMR number
    private String pOrder;                // String for production order
    private String reason;                // String for reason
    private String qa_inspector_status;   // String for QA inspector status
    private String prod_supervisor_status; // String for production supervisor status
    private String qa_mr_status;          // String for QA MR status
    private String department;            // String for department
}
