package com.focusr.Precot.QA.util.excel;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;

import com.focusr.Precot.QA.model.audit.ChangeControlLogBookDetailsHistory;
import com.focusr.Precot.QA.model.audit.MasterListOfSharpToolDetailsHistory;
import com.focusr.Precot.QA.model.audit.QaChangeControlLogBookF042History;
import com.focusr.Precot.QA.model.audit.QaMasterListOfSharpToolsF060History;
import com.focusr.Precot.QA.model.audit.QaOnlineInspectionReportHistory;
import com.itextpdf.io.IOException;
import com.itextpdf.io.source.ByteArrayOutputStream;

public class ExcelUtilQa {

	public static ByteArrayResource generateF042Excel(List<QaChangeControlLogBookF042History> details)
	        throws IOException, java.io.IOException {
	    try (Workbook workbook = new SXSSFWorkbook()) {
	    	Sheet sheet = workbook.createSheet("Report");

	        // Create header row
	        Row headerRow = sheet.createRow(0);
	        List<String> headers = getF042TitleLabels();
	        int headerColumnIndex = 0;
	        for (String header : headers) {
	            createCell(headerRow, headerColumnIndex++, header, workbook);
	        }

	        // Populate data
	        createF042Values(sheet, workbook, details);

	        // Write the workbook to a byte array
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        workbook.write(baos);
	        return new ByteArrayResource(baos.toByteArray());
	    }
	}
	
	private static String createF042Values(Sheet sheet, Workbook workbook,
	        List<QaChangeControlLogBookF042History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (QaChangeControlLogBookF042History history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields
//	        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
//	        createCell(valueRow, columnCount++, String.valueOf(history.getSNo()), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, history.getChangeControlNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDescriptionOfChange(), cellStyle);
	        createCell(valueRow, columnCount++, history.getIssuedToDepartment(), cellStyle);
	        createCell(valueRow, columnCount++, history.getActualClouserDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRemark(), cellStyle);

	        // Initiator fields
	        createCell(valueRow, columnCount++, history.getHodOrDesigneeStatus(), cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getHodOrDesigneeSavedOn(), dateCellStyle);
//	        createCell(valueRow, columnCount++, history.getHodOrDesigneeSavedBy(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getHodOrDesigneeSavedId() != null ? history.getHodOrDesigneeSavedId().toString() : "null", cellStyle);
	        createDateCell(valueRow, columnCount++, history.getHodOrDesigneeSubmittedOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getHodOrDesigneeSubmittedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getHodOrDesigneeSubmittedId() != null ? history.getHodOrDesigneeSubmittedId().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getHodOrDesigneeSign(), cellStyle);

	        // Approver fields
	        createCell(valueRow, columnCount++, history.getMrOrQaManagerStatus(), cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getMrOrQaManagerSavedOn(), dateCellStyle);
//	        createCell(valueRow, columnCount++, history.getMrOrQaManagerSavedBy(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getMrOrQaManagerSavedId() != null ? history.getMrOrQaManagerSavedId().toString() : "null", cellStyle);
	        createDateCell(valueRow, columnCount++, history.getMrOrQaManagerSubmittedOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getMrOrQaManagerSubmittedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMrOrQaManagerSubmittedId() != null ? history.getMrOrQaManagerSubmittedId().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getMrOrQaManagerSign(), cellStyle);

	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	        createCell(valueRow, columnCount++, history.getMail_status(), cellStyle);

	        int startColumnForNestedData = columnCount;

	        // Nested records
	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (ChangeControlLogBookDetailsHistory details : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
	                    rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                // Fill nested data (child columns)
	                createCell(rowForChild, nestedColumnCount++, details.getIssuedBy(), cellStyle);
	                createDateCell(rowForChild, nestedColumnCount++, details.getIssuedAt(), dateCellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getRecivedBy(), cellStyle);
	                createDateCell(rowForChild, nestedColumnCount++, details.getRecivedAt(), dateCellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getChangeInitiationDate(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, details.getTentativeClosureDate(), cellStyle);
	            }
	        } else {
	            int numberOfNestedColumns = 6; // Adjust based on nested fields count
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }
	    return "";
	}

	
	private static List<String> getF042TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Common attributes
//	    list.add("UNIT");
	    list.add("FORMAT_NO");
	    list.add("FORMAT_NAME");
	    list.add("SOP_NO");
	    list.add("REVISION_NO");
//	    list.add("SNO");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("CHANGE_CONTROL_NO");
	    list.add("DESCRIPTION_OF_CHANGE");
	    list.add("ISSUED_TO_DEPARTMENT");
	    list.add("ACTUAL_CLOSURE_DATE");
	    list.add("REMARK");

	    // Initiator attributes
	    list.add("HOD_OR_DESIGNEE_STATUS");
//	    list.add("HOD_OR_DESIGNEE_SAVED_ON");
//	    list.add("HOD_OR_DESIGNEE_SAVED_BY");
//	    list.add("HOD_OR_DESIGNEE_SAVED_ID");
	    list.add("HOD_OR_DESIGNEE_SUBMITTED_ON");
	    list.add("HOD_OR_DESIGNEE_SUBMITTED_BY");
	    list.add("HOD_OR_DESIGNEE_SUBMITTED_ID");
	    list.add("HOD_OR_DESIGNEE_SIGN");

	    // Approver attributes
	    list.add("MR_OR_QA_MANAGER_STATUS");
//	    list.add("MR_OR_QA_MANAGER_SAVED_ON");
//	    list.add("MR_OR_QA_MANAGER_SAVED_BY");
//	    list.add("MR_OR_QA_MANAGER_SAVED_ID");
	    list.add("MR_OR_QA_MANAGER_SUBMITTED_ON");
	    list.add("MR_OR_QA_MANAGER_SUBMITTED_BY");
	    list.add("MR_OR_QA_MANAGER_SUBMITTED_ID");
	    list.add("MR_OR_QA_MANAGER_SIGN");

	    // Additional attributes
	    list.add("VERSION");
	    list.add("MAIL_STATUS");

	    // Child entity fields
	    list.add("ISSUED_BY");
	    list.add("ISSUED_AT");
	    list.add("RECEIVED_BY");
	    list.add("RECEIVED_AT");
	    list.add("CHANGE_INITIATION_DATE");
	    list.add("TENTATIVE_CLOSURE_DATE");

	    return list;
	}

	
	public static ByteArrayResource generateF060Excel(List<QaMasterListOfSharpToolsF060History> details) 
	        throws IOException, java.io.IOException {
	    try (Workbook workbook = new SXSSFWorkbook()) {
	        Sheet sheet = workbook.createSheet("Report");

	        // Create header row
	        Row headerRow = sheet.createRow(0);
	        List<String> headers = getF060TitleLabels();
	        int headerColumnIndex = 0;
	        for (String header : headers) {
	            createCell(headerRow, headerColumnIndex++, header, workbook);
	        }

	        // Populate data
	        createF060Values(sheet, workbook, details);

	        // Write the workbook to a byte array
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        workbook.write(baos);
	        return new ByteArrayResource(baos.toByteArray());
	    }
	}

	private static String createF060Values(Sheet sheet, Workbook workbook,
	        List<QaMasterListOfSharpToolsF060History> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (QaMasterListOfSharpToolsF060History history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields
//	        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);

	        // Initiator fields
	        createCell(valueRow, columnCount++, history.getQaInspectorStatus(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQaInspectorSavedOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQaInspectorSavedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQaInspectorSavedId() != null ? history.getQaInspectorSavedId().toString() : "null", cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQaInspectorSubmittedOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQaInspectorSubmittedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQaInspectorSubmittedId() != null ? history.getQaInspectorSubmittedId().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getQaInspectorSign(), cellStyle);

	        // Manager fields
	        createCell(valueRow, columnCount++, history.getManagerStatus(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getManagerSubmittedOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getManagerSubmittedBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getManagerSubmittedId() != null ? history.getManagerSubmittedId().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getManagerSign(), cellStyle);

	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	        createCell(valueRow, columnCount++, history.getMail_status(), cellStyle);

	        int startColumnForNestedData = columnCount;

	        // Nested records
	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            boolean isFirstChild = true;

	            for (MasterListOfSharpToolDetailsHistory detail : history.getDetails()) {
	                Row rowForChild;

	                if (isFirstChild) {
	                    rowForChild = valueRow;
	                    isFirstChild = false;
	                } else {
	                    rowForChild = sheet.createRow(rowCount++);
	                }

	                int nestedColumnCount = startColumnForNestedData;

	                // Fill nested data (child columns)
//	                createCell(rowForChild, nestedColumnCount++, detail.getSno().toString(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, detail.getItemDescription(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, detail.getIdentificationNoOnTheTool(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, detail.getLocation(), cellStyle);
	                createCell(rowForChild, nestedColumnCount++, detail.getRemarks(), cellStyle);
	            }
	        } else {
	            int numberOfNestedColumns = 5; // Adjust based on nested fields count
	            for (int i = 0; i < numberOfNestedColumns; i++) {
	                createCell(valueRow, startColumnForNestedData + i, "", cellStyle);
	            }
	        }
	    }
	    return "";
	}

	private static List<String> getF060TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Main attributes
//	    list.add("UNIT");
	    list.add("FORMAT_NO");
	    list.add("FORMAT_NAME");
	    list.add("SOP_NO");
	    list.add("REVISION_NO");
	    list.add("DATE");
	    list.add("MONTH");
	    list.add("YEAR");
	    list.add("DEPARTMENT");
	    list.add("REASON");

	    // Initiator attributes
	    list.add("QA_INSPECTOR_STATUS");
	    list.add("QA_INSPECTOR_SAVED_ON");
	    list.add("QA_INSPECTOR_SAVED_BY");
	    list.add("QA_INSPECTOR_SAVED_ID");
	    list.add("QA_INSPECTOR_SUBMITTED_ON");
	    list.add("QA_INSPECTOR_SUBMITTED_BY");
	    list.add("QA_INSPECTOR_SUBMITTED_ID");
	    list.add("QA_INSPECTOR_SIGN");

	    // Manager attributes
	    list.add("MANAGER_STATUS");
	    list.add("MANAGER_SUBMITTED_ON");
	    list.add("MANAGER_SUBMITTED_BY");
	    list.add("MANAGER_SUBMITTED_ID");
	    list.add("MANAGER_SIGN");

	    // Additional attributes
	    list.add("VERSION");
	    list.add("MAIL_STATUS");

	    // Child entity fields
//	    list.add("SNO");
	    list.add("ITEM_DESCRIPTION");
	    list.add("IDENTIFICATION_NO_ON_THE_TOOL");
	    list.add("LOCATION");
	    list.add("REMARKS");

	    return list;
	}

	public static ByteArrayResource generateF034Excel(List<QaOnlineInspectionReportHistory> details) 
	        throws IOException, java.io.IOException {
	    try (Workbook workbook = new SXSSFWorkbook()) {
	        Sheet sheet = workbook.createSheet("Report");

	        // Create header row
	        Row headerRow = sheet.createRow(0);
	        List<String> headers = getF034TitleLabels();
	        int headerColumnIndex = 0;
	        for (String header : headers) {
	            createCell(headerRow, headerColumnIndex++, header, workbook);
	        }

	        // Populate data
	        createF034Values(sheet, workbook, details);

	        // Write the workbook to a byte array
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        workbook.write(baos);
	        return new ByteArrayResource(baos.toByteArray());
	    }
	}

	private static List<String> getF034TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Main attributes
	    list.add("FORMAT_NAME");
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("REF_SOP_NO");
	    list.add("PRODUCT_DESCRIPTION");
	    list.add("BMR_NO");
	    list.add("SHIFT");
	    list.add("CUSTOMER_NAME");
	    list.add("PORDER");
	    list.add("DATE");
	    list.add("ITEM_CODE");
	    list.add("MACHINE_NO");
	    list.add("FG_NO");
	    list.add("PO_NO");
	    list.add("AQL_SAMPLE_SIZE");
	    list.add("LOT_NO");
	    list.add("DEPARTMENT");

	    // Specifications
	    list.add("SURFACEPATTERN_SPECIFICATION");
	    list.add("AVERAGEGSMWEIGHT_SPECIFICATION");
	    list.add("PRODUCTSIZEDIAOFROLLS_SPECIFICATION");
	    list.add("NOOFFOLDSPLEAT_SPECIFICATION");
	    list.add("ARTWORKPRINTINGONBAGSLABLES_SPECIFICATION");
	    list.add("NOOFBAGSPERCARTON_SPECIFICATION");
	    list.add("MOISTURE_SPECIFICATION");

	    // Observations
	    list.add("SURFACEPATTERN_OBSERVATION");
	    list.add("AVERAGEGSMWEIGHT_OBSERVATION");
	    list.add("PRODUCTSIZEDIAOFROLLS_OBSERVATION");
	    list.add("NOOFFOLDSPLEAT_OBSERVATION");
	    list.add("ARTWORKPRINTINGONBAGSLABLES_OBSERVATION");
	    list.add("NOOFBAGSPERCARTON_OBSERVATION");
	    list.add("MOISTURE_OBSERVATION");
	    list.add("LOT_STATUS");

	    // QA Inspector fields
	    list.add("QA_INSPECTOR_STATUS");
//	    list.add("QA_INSPECTOR_SAVE_ON");
//	    list.add("QA_INSPECTOR_SAVE_BY");
//	    list.add("QA_INSPECTOR_SAVE_ID");
	    list.add("QA_INSPECTOR_SUBMIT_ON");
	    list.add("QA_INSPECTOR_SUBMIT_BY");
	    list.add("QA_INSPECTOR_SUBMIT_ID");
	    list.add("QA_INSPECTOR_SIGN");

	    // Production Supervisor fields
	    list.add("PROD_SUPERVISOR_STATUS");
//	    list.add("PROD_SUPERVISOR_SAVE_ON");
//	    list.add("PROD_SUPERVISOR_SAVE_BY");
//	    list.add("PROD_SUPERVISOR_SAVE_ID");
	    list.add("PROD_SUPERVISOR_SUBMIT_ON");
	    list.add("PROD_SUPERVISOR_SUBMIT_BY");
	    list.add("PROD_SUPERVISOR_SUBMIT_ID");
	    list.add("PROD_SUPERVISOR_SIGN");

	    // QA Manager fields
	    list.add("QA_MR_STATUS");
	    list.add("QA_MR_SUBMIT_ON");
	    list.add("QA_MR_SUBMIT_BY");
	    list.add("QA_MR_SUBMIT_ID");
	    list.add("QA_MR_SIGN");

	    // Additional fields
	    list.add("REMARKS");
	    list.add("REASON");
	    list.add("VERSION");

	    return list;
	}

	private static String createF034Values(Sheet sheet, Workbook workbook,
	        List<QaOnlineInspectionReportHistory> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (QaOnlineInspectionReportHistory history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo().toString(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);

	        createCell(valueRow, columnCount++, history.getProductDescription(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBmrNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getShift(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCustomerName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPOrder(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getItemCode(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMachineNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFgNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPoNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAqlSampleSize(), cellStyle);
	        createCell(valueRow, columnCount++, history.getLotNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);

	        // Specification fields
	        createCell(valueRow, columnCount++, history.getSurfacePatternSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAverageGsmWeightSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getProductSizeDiaOfRollsSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoOfFoldsPleatSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getArtworkPrintingOnBagsLablesSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoofBagsPerCartonSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMoistureSpecification(), cellStyle);

	        // Observation fields
	        createCell(valueRow, columnCount++, history.getSurfacePatternObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAverageGsmWeightObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getProductSizeDiaOfRollsObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoOfFoldsPleatObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getArtworkPrintingOnBagsLablesObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoofBagsPerCartonObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMoistureObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getLotNo(), cellStyle);

	        // Inspector and Supervisor fields
	        createCell(valueRow, columnCount++, history.getQa_inspector_status(), cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getQa_inspector_save_on(), dateCellStyle);
//	        createCell(valueRow, columnCount++, history.getQa_inspector_save_by(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getQa_inspector_save_id() != null ? history.getQa_inspector_save_id().toString() : "null", cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQa_inspector_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQa_inspector_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_inspector_submit_id() != null ? history.getQa_inspector_submit_id().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_inspector_sign(), cellStyle);

	        // PROD SUPERVISOR fields
	        createCell(valueRow, columnCount++, history.getProd_supervisor_status(), cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getProd_supervisor_save_on(), dateCellStyle);
//	        createCell(valueRow, columnCount++, history.getProd_supervisor_save_by(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getProd_supervisor_save_id() != null ? history.getProd_supervisor_save_id().toString() : "null", cellStyle);
	        createDateCell(valueRow, columnCount++, history.getProd_supervisor_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getProd_supervisor_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getProd_supervisor_submit_id() != null ? history.getProd_supervisor_submit_id().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getProd_supervisor_sign(), cellStyle);

	        // QA MANAGER fields
	        createCell(valueRow, columnCount++, history.getQa_mr_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQa_mr_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQa_mr_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_mr_submit_id() != null ? history.getQa_mr_submit_id().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_mr_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getRemark(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	        
	    }
	    return "";
	}

	public static ByteArrayResource generateF035Excel(List<QaOnlineInspectionReportHistory> details) 
	        throws IOException, java.io.IOException {
	    try (Workbook workbook = new SXSSFWorkbook()) {
	        Sheet sheet = workbook.createSheet("Report");

	        // Create header row
	        Row headerRow = sheet.createRow(0);
	        List<String> headers = getF035TitleLabels();
	        int headerColumnIndex = 0;
	        for (String header : headers) {
	            createCell(headerRow, headerColumnIndex++, header, workbook);
	        }

	        // Populate data
	        createF035Values(sheet, workbook, details);

	        // Write the workbook to a byte array
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        workbook.write(baos);
	        return new ByteArrayResource(baos.toByteArray());
	    }
	}
	
	private static List<String> getF035TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Main attributes
	    list.add("FORMAT_NAME");
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("REF_SOP_NO");
	    list.add("PRODUCT_DESCRIPTION");
	    list.add("BMR_NO");
	    list.add("SHIFT");
	    list.add("CUSTOMER_NAME");
	    list.add("PORDER");
	    list.add("DATE");
	    list.add("ITEM_CODE");
	    list.add("MACHINE_NO");
	    list.add("FG_NO");
	    list.add("PO_NO");
	    list.add("AQL_SAMPLE_SIZE");
	    list.add("LOT_NO");
	    list.add("DEPARTMENT");

	    // Specifications
	    list.add("BAGWEIGHT_SPECIFICATION");
	    list.add("AVERAGEWEIGHTOFBALLS_SPECIFICATION");
	    list.add("NOOFBALLSPERPACK_SPECIFICATION");
	    list.add("BALLSDIA_SPECIFICATION");
	    list.add("ARTWORKPRINTINGONBAGSLABELS_SPECIFICATION");
	    list.add("NOOFPACKPERCARTON35_SPECIFICATION");
	    list.add("BAGWEIGHT_OBSERVATION");

	    // Observations
	    list.add("AVERAGEWEIGHTOFBALLS_OBSERVATION");
	    list.add("NOOFBALLSPERPACK_OBSERVATION");
	    list.add("BALLSDIA_OBSERVATION");
	    list.add("ARTWORKPRINTINGONBAGSLABELS_OBSERVATION");
	    list.add("NOOFPACKPERCARTON35_OBSERVATION");
	    list.add("LOT_STATUS");

	    // QA Inspector fields
	    list.add("QA_INSPECTOR_STATUS");
//	    list.add("QA_INSPECTOR_SAVE_ON");
//	    list.add("QA_INSPECTOR_SAVE_BY");
//	    list.add("QA_INSPECTOR_SAVE_ID");
	    list.add("QA_INSPECTOR_SUBMIT_ON");
	    list.add("QA_INSPECTOR_SUBMIT_BY");
	    list.add("QA_INSPECTOR_SUBMIT_ID");
	    list.add("QA_INSPECTOR_SIGN");

	    // Production Supervisor fields
	    list.add("PROD_SUPERVISOR_STATUS");
//	    list.add("PROD_SUPERVISOR_SAVE_ON");
//	    list.add("PROD_SUPERVISOR_SAVE_BY");
//	    list.add("PROD_SUPERVISOR_SAVE_ID");
	    list.add("PROD_SUPERVISOR_SUBMIT_ON");
	    list.add("PROD_SUPERVISOR_SUBMIT_BY");
	    list.add("PROD_SUPERVISOR_SUBMIT_ID");
	    list.add("PROD_SUPERVISOR_SIGN");

	    // QA Manager fields
	    list.add("QA_MR_STATUS");
	    list.add("QA_MR_SUBMIT_ON");
	    list.add("QA_MR_SUBMIT_BY");
	    list.add("QA_MR_SUBMIT_ID");
	    list.add("QA_MR_SIGN");

	    // Additional fields
	    list.add("REMARKS");
	    list.add("REASON");
	    list.add("VERSION");

	    return list;
	}
	
	private static String createF035Values(Sheet sheet, Workbook workbook,
	        List<QaOnlineInspectionReportHistory> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (QaOnlineInspectionReportHistory history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo().toString(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);

	        createCell(valueRow, columnCount++, history.getProductDescription(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBmrNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getShift(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCustomerName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPOrder(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getItemCode(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMachineNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFgNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPoNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAqlSampleSize(), cellStyle);
	        createCell(valueRow, columnCount++, history.getLotNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);

	        // Specification fields
	        createCell(valueRow, columnCount++, history.getBagWeightSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAverageWeightOfBallsSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoOfBallsPerPackSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBallsDiaSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getArtworkPrintingOnBagsLabelsSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoOfPackPerCotton35Specification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBagWeightObservation(), cellStyle);

	        // Observation fields
	        createCell(valueRow, columnCount++, history.getAverageWeightOfBallsObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoOfBallsPerPackObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBallsDiaObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getArtworkPrintingOnBagsLabelsObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoOfPackPerCotton35Observation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getLotNo(), cellStyle);


	        // Inspector and Supervisor fields
	        createCell(valueRow, columnCount++, history.getQa_inspector_status(), cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getQa_inspector_save_on(), dateCellStyle);
//	        createCell(valueRow, columnCount++, history.getQa_inspector_save_by(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getQa_inspector_save_id() != null ? history.getQa_inspector_save_id().toString() : "null", cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQa_inspector_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQa_inspector_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_inspector_submit_id() != null ? history.getQa_inspector_submit_id().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_inspector_sign(), cellStyle);

	        // PROD SUPERVISOR fields
	        createCell(valueRow, columnCount++, history.getProd_supervisor_status(), cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getProd_supervisor_save_on(), dateCellStyle);
//	        createCell(valueRow, columnCount++, history.getProd_supervisor_save_by(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getProd_supervisor_save_id() != null ? history.getProd_supervisor_save_id().toString() : "null", cellStyle);
	        createDateCell(valueRow, columnCount++, history.getProd_supervisor_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getProd_supervisor_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getProd_supervisor_submit_id() != null ? history.getProd_supervisor_submit_id().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getProd_supervisor_sign(), cellStyle);

	        // QA MANAGER fields
	        createCell(valueRow, columnCount++, history.getQa_mr_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQa_mr_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQa_mr_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_mr_submit_id() != null ? history.getQa_mr_submit_id().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_mr_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getRemark(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	        
	    }
	    return "";
	}

	public static ByteArrayResource generateF036Excel(List<QaOnlineInspectionReportHistory> details) 
	        throws IOException, java.io.IOException {
	    try (Workbook workbook = new SXSSFWorkbook()) {
	        Sheet sheet = workbook.createSheet("Report");

	        // Create header row
	        Row headerRow = sheet.createRow(0);
	        List<String> headers = getF036TitleLabels();
	        int headerColumnIndex = 0;
	        for (String header : headers) {
	            createCell(headerRow, headerColumnIndex++, header, workbook);
	        }

	        // Populate data
	        createF036Values(sheet, workbook, details);

	        // Write the workbook to a byte array
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        workbook.write(baos);
	        return new ByteArrayResource(baos.toByteArray());
	    }
	}
	
	private static List<String> getF036TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Main attributes
	    list.add("FORMAT_NAME");
	    list.add("FORMAT_NO");
	    list.add("REVISION_NO");
	    list.add("REF_SOP_NO");
	    list.add("PRODUCT_DESCRIPTION");
	    list.add("BMR_NO");
	    list.add("SHIFT");
	    list.add("CUSTOMER_NAME");
	    list.add("PORDER");
	    list.add("DATE");
	    list.add("ITEM_CODE");
	    list.add("MACHINE_NO");
	    list.add("FG_NO");
	    list.add("PO_NO");
	    list.add("AQL_SAMPLE_SIZE");
	    list.add("LOT_NO");
	    list.add("DEPARTMENT");

	    // Specifications
	    list.add("BAGBOXWEIGHT_SPECIFICATION");
	    list.add("AVERAGEWEIGHTOFBUDS_SPECIFICATION");
	    list.add("NOOFBUDSPERPACK_SPECIFICATION");
	    list.add("BUDSSIZEDIAMETER_SPECIFICATION");
	    list.add("ARTWORKPRINTINGONBUDSLABELS_SPECIFICATION");
	    list.add("NOOFPACKPERCARTON36_SPECIFICATION");
	    list.add("BAGBOXWEIGHT_OBSERVATION");

	    // Observations
	    list.add("AVERAGEWEIGHTOFBUDS_OBSERVATION");
	    list.add("NOOFBUDSPERPACK_OBSERVATION");
	    list.add("BUDSSIZEDIAMETER_OBSERVATION");
	    list.add("ARTWORKPRINTINGONBUDSLABELS_OBSERVATION");
	    list.add("NOOFPACKPERCARTON36_OBSERVATION");
	    list.add("LOT_STATUS");

	    // QA Inspector fields
	    list.add("QA_INSPECTOR_STATUS");
//	    list.add("QA_INSPECTOR_SAVE_ON");
//	    list.add("QA_INSPECTOR_SAVE_BY");
//	    list.add("QA_INSPECTOR_SAVE_ID");
	    list.add("QA_INSPECTOR_SUBMIT_ON");
	    list.add("QA_INSPECTOR_SUBMIT_BY");
	    list.add("QA_INSPECTOR_SUBMIT_ID");
	    list.add("QA_INSPECTOR_SIGN");

	    // Production Supervisor fields
	    list.add("PROD_SUPERVISOR_STATUS");
//	    list.add("PROD_SUPERVISOR_SAVE_ON");
//	    list.add("PROD_SUPERVISOR_SAVE_BY");
//	    list.add("PROD_SUPERVISOR_SAVE_ID");
	    list.add("PROD_SUPERVISOR_SUBMIT_ON");
	    list.add("PROD_SUPERVISOR_SUBMIT_BY");
	    list.add("PROD_SUPERVISOR_SUBMIT_ID");
	    list.add("PROD_SUPERVISOR_SIGN");

	    // QA Manager fields
	    list.add("QA_MR_STATUS");
	    list.add("QA_MR_SUBMIT_ON");
	    list.add("QA_MR_SUBMIT_BY");
	    list.add("QA_MR_SUBMIT_ID");
	    list.add("QA_MR_SIGN");

	    // Additional fields
	    list.add("REMARKS");
	    list.add("REASON");
	    list.add("VERSION");

	    return list;
	}
	
	
	private static String createF036Values(Sheet sheet, Workbook workbook,
	        List<QaOnlineInspectionReportHistory> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (QaOnlineInspectionReportHistory history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo().toString(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);

	        createCell(valueRow, columnCount++, history.getProductDescription(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBmrNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getShift(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCustomerName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPOrder(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getItemCode(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMachineNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFgNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPoNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAqlSampleSize(), cellStyle);
	        createCell(valueRow, columnCount++, history.getLotNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);

	        // Specification fields
	        createCell(valueRow, columnCount++, history.getBagBoxWeightSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAverageWeightOfBudsSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoOfBudsPerPackSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBudssizedDiameterSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getArtworkPrintingOnBudsLabelsSpecification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoOfPackPerCotton36Specification(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBagBoxWeightObservation(), cellStyle);

	        // Observation fields
	        createCell(valueRow, columnCount++, history.getAverageWeightOfBudsObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoOfBudsPerPackObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBudssizedDiameterObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getArtworkPrintingOnBudsLabelsObservation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getNoOfPackPerCotton36Observation(), cellStyle);
	        createCell(valueRow, columnCount++, history.getLotNo(), cellStyle);

	        // Inspector and Supervisor fields
	        createCell(valueRow, columnCount++, history.getQa_inspector_status(), cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getQa_inspector_save_on(), dateCellStyle);
//	        createCell(valueRow, columnCount++, history.getQa_inspector_save_by(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getQa_inspector_save_id() != null ? history.getQa_inspector_save_id().toString() : "null", cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQa_inspector_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQa_inspector_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_inspector_submit_id() != null ? history.getQa_inspector_submit_id().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_inspector_sign(), cellStyle);

	        // PROD SUPERVISOR fields
	        createCell(valueRow, columnCount++, history.getProd_supervisor_status(), cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getProd_supervisor_save_on(), dateCellStyle);
//	        createCell(valueRow, columnCount++, history.getProd_supervisor_save_by(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getProd_supervisor_save_id() != null ? history.getProd_supervisor_save_id().toString() : "null", cellStyle);
	        createDateCell(valueRow, columnCount++, history.getProd_supervisor_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getProd_supervisor_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getProd_supervisor_submit_id() != null ? history.getProd_supervisor_submit_id().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getProd_supervisor_sign(), cellStyle);

	        // QA MANAGER fields
	        createCell(valueRow, columnCount++, history.getQa_mr_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getQa_mr_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getQa_mr_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_mr_submit_id() != null ? history.getQa_mr_submit_id().toString() : "null", cellStyle);
	        createCell(valueRow, columnCount++, history.getQa_mr_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getRemark(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	        
	    }
	    return "";
	}
//______________________________________________________________________________________________
	
	private static void createHeaderCell(Row headerRow, int columnIndex, String header) {
		Cell cell = headerRow.createCell(columnIndex);
		cell.setCellValue(header);
		CellStyle style = headerRow.getSheet().getWorkbook().createCellStyle();
		org.apache.poi.ss.usermodel.Font font = headerRow.getSheet().getWorkbook().createFont();
		font.setBold(true);
		style.setFont(font);
		style.setAlignment(HorizontalAlignment.CENTER); 
		cell.setCellStyle(style);
	}
	
	private static void createCell(Row row, int columnIndex, String value, Workbook workbook) {
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		Cell cell = row.createCell(columnIndex);
		cell.setCellValue(value != null ? value : "");
		cell.setCellStyle(cellStyle);
	}

	private static CellStyle setValueCellColor(Workbook workbook, HorizontalAlignment alignment, boolean wrapText,
			short color) {
		CellStyle cellStyle = workbook.createCellStyle();
		cellStyle.setAlignment(alignment);
		cellStyle.setWrapText(wrapText);
		// Set additional styling here, if needed
		return cellStyle;
	}

	private static void createCell(Row row, int columnIndex, String value, CellStyle cellStyle) {
		Cell cell = row.createCell(columnIndex);
		cell.setCellValue(value != null ? value : "");
		cell.setCellStyle(cellStyle);
	}

	public static void createDateCell(Row row, int columnCount, java.util.Date date, CellStyle dateCellStyle) {
		Cell cell = row.createCell(columnCount++);
		if (date != null) {
			cell.setCellValue(date);
			cell.setCellStyle(dateCellStyle);
		} else {
			cell.setCellValue("");
			cell.setCellStyle(dateCellStyle);
		}
	}


	private static CellStyle createDateCellStyle(Workbook workbook) {
		CellStyle cellStyle = workbook.createCellStyle();
		DataFormat format = workbook.createDataFormat();
		cellStyle.setDataFormat(format.getFormat("yyyy-MM-dd HH:mm"));
		return cellStyle;
	}
}
