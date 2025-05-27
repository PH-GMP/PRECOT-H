package com.focusr.Precot.util.Engineering;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
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

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.core.io.ByteArrayResource;

import com.focusr.Precot.mssql.database.model.engineering.BreakdownIntimationSlipF003;
import com.focusr.Precot.mssql.database.model.engineering.WorkOrderRequestFormF020;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisCorrectiveActionHistory;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisHistoryF004;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisPreventiveActionHistory;
import com.focusr.Precot.mssql.database.model.engineering.audit.WeightScalesCalibrationDetailHistory;
import com.focusr.Precot.mssql.database.model.engineering.audit.WeightScalesCalibrationHistoryF016;

public class EngineeringExcelUtill {

	
	

	
	public static ByteArrayResource generateF003Excel(List<BreakdownIntimationSlipF003> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get003TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF003Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}
	
	private static List<String> get003TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Entity Field Titles
	    list.add("FORMAT");                    
	    list.add("FORMAT NO");                 
	    list.add("REF SOP NO");                
	    list.add("REVISION NUMBER");                                
	    list.add("DATE");                      
	    list.add("ISSUER DEPARTMENT");         
	    list.add("BIS NO");                    
	    list.add("BMR NO");                    
	    list.add("RECEIVER DEPARTMENT");       
	    list.add("EQUIPMENT ATTENDED");        
	    list.add("BREAKDOWN DETAILS");         
	    list.add("SPARE USED IF ANY");         
	    list.add("FIRST INFORMATION TIME");    
	    list.add("ESTIMATED REPAIR TIME");     
	    list.add("REPAIR START TIME");         
	    list.add("REPAIR END TIME");           
	    list.add("MACHINE START TIME");        
	    list.add("PROCESS STOP TIME");         
	    list.add("BREAKDOWN STOP TIME");       
	    list.add("REASONS FOR BREAKDOWN");     

	    // Supervisor status fields
	    list.add("SUPERVISOR STATUS");                
	    list.add("SUPERVISOR SUBMIT ON");      
	    list.add("SUPERVISOR SUBMIT BY");      
  
	           

	    // Receiver status fields            
	    list.add("RECEIVER STATUS");           
	    list.add("RECEIVER SUBMIT BY");        
	           
	    list.add("RECEIVER SUBMIT ON");        
	                

	    return list;
	}


	
	private static String createF003Values(Sheet sheet, Workbook workbook,
	        List<BreakdownIntimationSlipF003> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (BreakdownIntimationSlipF003 history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields - match with the entity fields
	        createCell(valueRow, columnCount++, history.getFormat(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getIssuerDepartment(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBisNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBmrNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReceiverDepartment(), cellStyle);
	        createCell(valueRow, columnCount++, history.getEquipmentAttended(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBreakdownDetails(), cellStyle);
	        createCell(valueRow, columnCount++, history.getSpareUsedIfAny(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFirstInformationTime(), cellStyle);
	        createCell(valueRow, columnCount++, history.getEstimatedRepairTime(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRepairStartTime(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRepairEndTime(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMachineStartTime(), cellStyle);
	        createCell(valueRow, columnCount++, history.getProcessStopTime(), cellStyle);
	        createCell(valueRow, columnCount++, history.getBreakdownStopTime(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReasonsForBreakdown(), cellStyle);

	        // Supervisor status fields
	        createCell(valueRow, columnCount++, history.getSupervisorStatus(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getSupervisorSubmitOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getSupervisorSubmitBy(), cellStyle);
	       
	       

	        // Receiver status fields
	    
	        createCell(valueRow, columnCount++, history.getReceiverstatus(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReceiverSubmitBy(), cellStyle);

	        createDateCell(valueRow, columnCount++, history.getReceiverSubmiton(), dateCellStyle);
	        
	    }

	    return "";
	}
	
	
	
	public static ByteArrayResource generateF004Excel(List<RootCauseAnalysisHistoryF004> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get004TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF004Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}
	
	private static List<String> get004TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Entity Field Titles
	    list.add("FORMAT");                    
	    list.add("FORMAT NO");                 
	    list.add("REF SOP NO");                
	    list.add("REVISION NUMBER");                                
	    list.add("RCA NO");                    
	    list.add("BIS NO");                    
	    list.add("DATE");                      
	    list.add("DEPARTMENT");                
	    list.add("PRODUCT");                   
	    list.add("PRODUCTION LOSS MT");        
	    list.add("BATCH TIME LOST");           
	    list.add("RCA OWNER");                 
	    list.add("RCA TEAM MEMBERS");          
	    list.add("PROBLEM DESCRIPTION");       
	    list.add("WHY 1");                     
	    list.add("WHY 2");                     
	    list.add("WHY 3");                     
	    list.add("WHY 4");                     
	    list.add("WHY 5");                     
	    list.add("ROOT CAUSE"); 
	    
	 
	    // Corrective Action Fields
	    list.add("CORRECTIVE ACTION");
	    list.add("CORRECTIVE TARGET DATE");
	    list.add("CORRECTIVE RESPONSIBILITY");
	    list.add("CORRECTIVE STATUS");

	    // Preventive Action Fields
	    list.add("PREVENTIVE ACTION");
	    list.add("PREVENTIVE TARGET DATE");
	    list.add("PREVENTIVE RESPONSIBILITY");
	    list.add("PREVENTIVE STATUS");
	    
	    
	    list.add("SUPERVISOR STATUS");         
	    list.add("SUPERVISOR SUBMIT ON");      
	    list.add("SUPERVISOR SUBMIT BY");      
	          

	    // HOD Status Fields
	    list.add("HOD STATUS");                
	    list.add("HOD SUBMIT ON");             
	    list.add("HOD SUBMIT BY");             
	      
	    
	    
	    list.add("REASON");                    
	    list.add("VERSION");           


	    return list;
	}


	
//	private static String createF004Values(Sheet sheet, Workbook workbook,
//	        List<RootCauseAnalysisHistoryF004> reportHistory) {
//	    int rowCount = 1;
//	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
//	    CellStyle dateCellStyle = createDateCellStyle(workbook);
//
//	    for (RootCauseAnalysisHistoryF004 history : reportHistory) {
//	        int columnCount = 0;
//
//	        // Create main record row
//	        Row valueRow = sheet.createRow(rowCount++);
//
//	        // Main record fields - match with the entity fields
//	        createCell(valueRow, columnCount++, history.getFormat(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getRcaNo(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getBisNo(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getProduct(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getProductionLossMt(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getBatchTimeLost(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getRcaOwner(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getRcaTeamMembers(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getProblemDescription(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getWhy1(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getWhy2(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getWhy3(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getWhy4(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getWhy5(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getRootCause(), cellStyle);
//	        
//	        // Corrective Actions - add to the same row after main record fields
//	        for (RootCauseAnalysisCorrectiveActionHistory correctiveAction : history.getCorrectiveActions()) {
//	            createCell(valueRow, columnCount++, correctiveAction.getCorrectiveaction(), cellStyle);
//	            createCell(valueRow, columnCount++, correctiveAction.getCorrectivetargetDate(), cellStyle);
//	            createCell(valueRow, columnCount++, correctiveAction.getCorrectiveresponsibility(), cellStyle);
//	            createCell(valueRow, columnCount++, correctiveAction.getCorrectivestatus(), cellStyle);
//	        }
//
//	        // Preventive Actions - add to the same row after corrective actions
//	        for (RootCauseAnalysisPreventiveActionHistory preventiveAction : history.getPreventiveActions()) {
//	            createCell(valueRow, columnCount++, preventiveAction.getPreventiveaction(), cellStyle);
//	            createCell(valueRow, columnCount++, preventiveAction.getPreventivetargetDate(), cellStyle);
//	            createCell(valueRow, columnCount++, preventiveAction.getPreventiveresponsibility(), cellStyle);
//	            createCell(valueRow, columnCount++, preventiveAction.getPreventivestatus(), cellStyle);
//	        }
//
//	        // Supervisor status fields
//	        createCell(valueRow, columnCount++, history.getSupervisorStatus(), cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getSupervisorSubmitOn(), dateCellStyle);
//	        createCell(valueRow, columnCount++, history.getSupervisorSubmitBy(), cellStyle);
//
//
//	        // HOD status fields
//	        createCell(valueRow, columnCount++, history.getHodStatus(), cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getHodSubmitOn(), dateCellStyle);
//	        createCell(valueRow, columnCount++, history.getHodSubmitBy(), cellStyle);
//
//
//	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
//	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
//	    }
//
//	    return "";
//	}
	
	private static String createF004Values(Sheet sheet, Workbook workbook, List<RootCauseAnalysisHistoryF004> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (RootCauseAnalysisHistoryF004 history : reportHistory) {
	        // Get the maximum number of corrective and preventive actions
	        int maxActions = Math.max(history.getCorrectiveActions().size(), history.getPreventiveActions().size());
	        
	        // Loop for the maximum number of corrective or preventive actions
	        for (int i = 0; i < maxActions; i++) {
	            int columnCount = 0;
	            Row valueRow = sheet.createRow(rowCount++);

	            // Populate the main fields only on the first row for this history entry
	            if (i == 0) {
	                createCell(valueRow, columnCount++, history.getFormat(), cellStyle);
	                createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);
	                createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);
	                createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	                createCell(valueRow, columnCount++, history.getRcaNo(), cellStyle);
	                createCell(valueRow, columnCount++, history.getBisNo(), cellStyle);
	                createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	                createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);
	                createCell(valueRow, columnCount++, history.getProduct(), cellStyle);
	                createCell(valueRow, columnCount++, history.getProductionLossMt(), cellStyle);
	                createCell(valueRow, columnCount++, history.getBatchTimeLost(), cellStyle);
	                createCell(valueRow, columnCount++, history.getRcaOwner(), cellStyle);
	                createCell(valueRow, columnCount++, history.getRcaTeamMembers(), cellStyle);
	                createCell(valueRow, columnCount++, history.getProblemDescription(), cellStyle);
	                createCell(valueRow, columnCount++, history.getWhy1(), cellStyle);
	                createCell(valueRow, columnCount++, history.getWhy2(), cellStyle);
	                createCell(valueRow, columnCount++, history.getWhy3(), cellStyle);
	                createCell(valueRow, columnCount++, history.getWhy4(), cellStyle);
	                createCell(valueRow, columnCount++, history.getWhy5(), cellStyle);
	                createCell(valueRow, columnCount++, history.getRootCause(), cellStyle);
	            } else {
	                columnCount += 20; // Skip the main fields for subsequent rows
	            }

	            // Corrective Action fields
	            if (i < history.getCorrectiveActions().size()) {
	                RootCauseAnalysisCorrectiveActionHistory correctiveAction = history.getCorrectiveActions().get(i);
	                createCell(valueRow, columnCount++, correctiveAction.getCorrectiveaction(), cellStyle);
	                createCell(valueRow, columnCount++, correctiveAction.getCorrectivetargetDate(), cellStyle);
	                createCell(valueRow, columnCount++, correctiveAction.getCorrectiveresponsibility(), cellStyle);
	                createCell(valueRow, columnCount++, correctiveAction.getCorrectivestatus(), cellStyle);
	            } else {
	                columnCount += 4; // Skip columns if no corrective action for this row
	            }

	            // Preventive Action fields
	            if (i < history.getPreventiveActions().size()) {
	                RootCauseAnalysisPreventiveActionHistory preventiveAction = history.getPreventiveActions().get(i);
	                createCell(valueRow, columnCount++, preventiveAction.getPreventiveaction(), cellStyle);
	                createCell(valueRow, columnCount++, preventiveAction.getPreventivetargetDate(), cellStyle);
	                createCell(valueRow, columnCount++, preventiveAction.getPreventiveresponsibility(), cellStyle);
	                createCell(valueRow, columnCount++, preventiveAction.getPreventivestatus(), cellStyle);
	            } else {
	                columnCount += 4; // Skip columns if no preventive action for this row
	            }

	            // Supervisor status fields (only on the first row for this history entry)
	            if (i == 0) {
	                createCell(valueRow, columnCount++, history.getSupervisorStatus(), cellStyle);
	                createDateCell(valueRow, columnCount++, history.getSupervisorSubmitOn(), dateCellStyle);
	                createCell(valueRow, columnCount++, history.getSupervisorSubmitBy(), cellStyle);

	                // HOD status fields
	                createCell(valueRow, columnCount++, history.getHodStatus(), cellStyle);
	                createDateCell(valueRow, columnCount++, history.getHodSubmitOn(), dateCellStyle);
	                createCell(valueRow, columnCount++, history.getHodSubmitBy(), cellStyle);

	                createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	                createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	            }
	        }
	    }
	    return "";
	}




	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	=============================================================================================================================================
// common
	private static void createCell(Row row, int columnIndex, String value, Workbook workbook) {
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		Cell cell = row.createCell(columnIndex);
		cell.setCellValue(value != null ? value : "");
		cell.setCellStyle(cellStyle);
	}

	private static void createCell(Row row, int columnIndex, String value, CellStyle cellStyle) {
		Cell cell = row.createCell(columnIndex);
		cell.setCellValue(value != null ? value : "");
		cell.setCellStyle(cellStyle);
	}

	private static void createDateCell(Row row, int columnIndex, Date value, CellStyle cellStyle) {
		Cell cell = row.createCell(columnIndex);
		if (value != null) {
			cell.setCellValue(value);
		} else {
			cell.setCellValue("");
		}
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

	private static CellStyle createDateCellStyle(Workbook workbook) {
		CellStyle cellStyle = workbook.createCellStyle();
		DataFormat format = workbook.createDataFormat();
		cellStyle.setDataFormat(format.getFormat("yyyy-MM-dd HH:mm"));
//		cellStyle.setDataFormat(format.getFormat("dd-MM-yyyy HH:mm"));
		return cellStyle;
	}
	
	
	public static ByteArrayResource generateF016Excel(List<WeightScalesCalibrationHistoryF016> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get016TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF016Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}
	
	private static List<String> get016TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Entity Field Titles
	    list.add("FORMAT");                    
	    list.add("FORMAT NO");                 
	    list.add("REF SOP NO");                
	    list.add("REVISION NUMBER");                               
	    list.add("DEPARTMENT");                
	    list.add("CAPACITY");                  
	    list.add("TOLERANCES");                
	    list.add("MACHINE ID NO");             
	    list.add("STD WT CAL CERT NO");        
	    list.add("DATE");     
	    list .add("MEASUREMENT_UNIT");
	    list.add("WEIGHT IN G/KG");            
	    list.add("OBSERVED WEIGHT IN G/KG");   
	    list.add("RANGE IN G/KG");             
	    list.add("STATUS");                    
	    list.add("REMARKS");                   

	    // Supervisor Status Fields
	    list.add("ENGINEERING SUPERVISOR STATUS");                
	    list.add("ENGINEERING SUPERVISOR SUBMIT ON");      
	    list.add("ENGINEERING SUPERVISOR SUBMIT BY");      
	   

	    // HOD Status Fields
	    list.add("HOD STATUS");                
	    list.add("HOD SUBMIT ON");             
	    list.add("HOD SUBMIT BY");             
	 

	    // Additional Metadata Fields
	    list.add("REASON");                   
	    list.add("VERSION");                  

	    return list;
	}



	
	private static String createF016Values(Sheet sheet, Workbook workbook,
	        List<WeightScalesCalibrationHistoryF016> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (WeightScalesCalibrationHistoryF016 history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields - match with the entity fields
	        createCell(valueRow, columnCount++, history.getFormat(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);
	        createCell(valueRow, columnCount++, history.getCapacity(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTolerances(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMachineIdNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getStdWtCalCertNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMeasurementunit(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getWeightInGKg(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getObservedWeightInGKg(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getRangeInGKg(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getStatus(), cellStyle);
//	        createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);
	        
	        if (history.getDetails() != null && !history.getDetails().isEmpty()) {
	            for (WeightScalesCalibrationDetailHistory detail : history.getDetails()) {
	                // Add child fields to the same row in subsequent columns
	                createCell(valueRow, columnCount++, detail.getWeightInGKg(), cellStyle);
	                createCell(valueRow, columnCount++, detail.getObservedWeightInGKg(), cellStyle);
	                createCell(valueRow, columnCount++, detail.getRangeInGKg(), cellStyle);
	                createCell(valueRow, columnCount++, detail.getStatus(), cellStyle);
	                createCell(valueRow, columnCount++, detail.getRemarks(), cellStyle);
	            }
	        }

	        // Supervisor status fields
	        createCell(valueRow, columnCount++, history.getEngineeringSupervisorStatus(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getEngineeringSupervisorSubmitOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getEngineeringSupervisorSubmitBy(), cellStyle);


	        // HOD status fields
	        createCell(valueRow, columnCount++, history.getHodStatus(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getHodSubmitOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getHodSubmitBy(), cellStyle);


	        // Additional Metadata Fields
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);
	    }

	    return "";
	}
	
	
	public static ByteArrayResource generateF020Excel(List<WorkOrderRequestFormF020> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get020TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF020Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}
	
	private static List<String> get020TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Entity Field Titles based on WorkOrderRequestFormF020 fields
	    list.add("FORMAT");
	    list.add("FORMAT NO");
	    list.add("REF SOP NO");
	    list.add("REVISION NUMBER");
	    list.add("DATE OF REQUEST");
	    list.add("WOR NO");
	    list.add("DEPARTMENT");
	    list.add("AREA");
	    list.add("TARGET DATE");
	    list.add("DETAILS OF WORK");
	    list.add("ASSIGNED DEPARTMENT");
	    list.add("CLOSURE DATE");
	    list.add("COMMENTS");
	    list.add("REQUESTER STATUS");
	    list.add("REQUESTER SUBMIT ON");
	    list.add("REQUESTER SUBMIT BY");
	 
	    
	    list.add("RECEIVER");
	    list.add("RECEIVER STATUS");
	    list.add("RECEIVER SUBMIT BY");
	    list.add("RECEIVER SUBMIT ON");
	   
	    list.add("HOD STATUS");
	    list.add("HOD SUBMIT ON");
	    list.add("HOD SUBMIT BY");
	   

	    return list;
	}




	
	private static String createF020Values(Sheet sheet, Workbook workbook,
	        List<WorkOrderRequestFormF020> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (WorkOrderRequestFormF020 history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Map each field to a column in the Excel sheet
	        createCell(valueRow, columnCount++, history.getFormat(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDateOfRequest(), cellStyle);
	        createCell(valueRow, columnCount++, history.getWorNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDepartment(), cellStyle);
	        createCell(valueRow, columnCount++, history.getArea(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTargetDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDetailsOfWork(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAssignedDepartment(), cellStyle);
	        createCell(valueRow, columnCount++, history.getClosureDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getComments(), cellStyle);
	        
	        createCell(valueRow, columnCount++, history.getRequesterStatus(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getRequesterSubmitOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getRequesterSubmitBy(), cellStyle);
	        

	        
	        createCell(valueRow, columnCount++, history.getReceiver(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReceiverstatus(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReceiverSubmitBy(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getReceiverSubmiton(), dateCellStyle);
	        
	        createCell(valueRow, columnCount++, history.getHodStatus(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getHodSubmitOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getHodSubmitBy(), cellStyle);

	    }

	    return "";
	}


	

}
