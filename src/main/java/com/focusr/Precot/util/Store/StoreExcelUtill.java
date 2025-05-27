package com.focusr.Precot.util.Store;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
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

import com.focusr.Precot.mssql.database.model.Store.audit.EyeWashConditionChecklistHistoryF009;
import com.focusr.Precot.mssql.database.model.Store.audit.ForkliftMovementCheckListHistoryF008;
import com.focusr.Precot.mssql.database.model.Store.audit.NonReturnableGatePassHistoryF006;
import com.focusr.Precot.mssql.database.model.Store.audit.NonReturnableGoodsDetailHistory;
import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailLogBookHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailLogBookLinesHistory01;

public class StoreExcelUtill {
	
	
	public static ByteArrayResource generateF003Excel(List<ReceptionCheckListHistoryF003> details)
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
	    list.add("FORMAT NAME");          
	    list.add("FORMAT NO");           
	    list.add("REVISION NO");          
	    list.add("SOP NUMBER");          
	    list.add("UNIT");                 
	    list.add("DATE");                 
	    list.add("SUPPLIER NAME");        
	    list.add("INVOICE NO");           
	    list.add("TOTAL QUANTITY");       
	    list.add("NO OF BALES/CANS");     
	    list.add("WEIGHT");               
	    list.add("DESCRIPTION");          
	    list.add("VEHICLE NO");           
	    list.add("ORGANIC IDENTIFICATION"); 
	    list.add("VEHICLE CONDITION");    
	    list.add("PACKING CONDITION");    
	    list.add("WET CONDITION");       
	    list.add("CONTAMINATION");        
	    list.add("REMARKS");              
	    list.add("REASON"); 
	    
	   

	    // Operator status fields
	    list.add("OPERATOR STATUS");          
	    list.add("OPERATOR SUBMITTED ON");    
	    list.add("OPERATOR SUBMITTED BY");    
	    list.add("OPERATOR SIGN");           

	    // Store in charge/HOD status fields
	    list.add("STORE IN CHARGE STATUS");       
	    list.add("STORE IN CHARGE SUBMITTED ON");  
	    list.add("STORE IN CHARGE SUBMITTED BY");  
	    list.add("STORE IN CHARGE SIGN");          

	                 // VERSION
	    list.add("VERSION"); 

	    return list;
	}

	
	private static String createF003Values(Sheet sheet, Workbook workbook,
	        List<ReceptionCheckListHistoryF003> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (ReceptionCheckListHistoryF003 history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields - match with the entity fields
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);   
	        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);  
	        createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);      
//	        createCell(valueRow, columnCount++, history.getDate(), cellStyle); 
	        
	        createCell(valueRow, columnCount++, history.getDate() != null ? history.getDate().toString() : "", cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getDate() != null ? convertToDate(history.getDate()) : null, dateCellStyle);

	        createCell(valueRow, columnCount++, history.getSupplierName(), cellStyle); 
	        createCell(valueRow, columnCount++, history.getInvoiceNo(), cellStyle);   
	        createCell(valueRow, columnCount++, history.getTotalQuantity(), cellStyle); 
	        createCell(valueRow, columnCount++, history.getNoOfBalesOrCans(), cellStyle); 
	        createCell(valueRow, columnCount++, String.valueOf(history.getWeight()), cellStyle); 
	        createCell(valueRow, columnCount++, history.getDescription(), cellStyle); 
	        createCell(valueRow, columnCount++, history.getVehicleNo(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getOrganicIdentification(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getVehicleCondition(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getPackingCondition(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getWetCondition(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getContamination(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);  
	        

	        // Add operator status fields
	        createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle); // OPERATOR_STATUS
	        createDateCell(valueRow, columnCount++, history.getOperator_submit_on(), dateCellStyle); // OPERATOR_SUBMIT_ON
	        createCell(valueRow, columnCount++, history.getOperator_submit_by(), cellStyle); // OPERATOR_SUBMIT_BY
	        createCell(valueRow, columnCount++, history.getOperator_sign(), cellStyle); // OPERATOR_SIGN

	        // Add HOD/store in charge fields
	        createCell(valueRow, columnCount++, history.getStore_in_charge_status(), cellStyle); // STORE_IN_CHARGE_STATUS
	        createDateCell(valueRow, columnCount++, history.getStore_in_charge_submit_on(), dateCellStyle); // STORE_IN_CHARGE_SUBMIT_ON
	        createCell(valueRow, columnCount++, history.getStore_in_charge_submit_by(), cellStyle); // STORE_IN_CHARGE_SUBMIT_BY
	        createCell(valueRow, columnCount++, history.getStore_in_charge_sign(), cellStyle); // STORE_IN_CHARGE_SIGN

	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle); // VERSION
	    }

	    return "";
	}





	
	
	public static ByteArrayResource generateF006Excel(List<NonReturnableGatePassHistoryF006> details) throws IOException {
	    try (Workbook workbook = new SXSSFWorkbook()) {
	        Sheet sheet = workbook.createSheet("Report");

	        // Create header row
	        Row headerRow = sheet.createRow(0);
	        List<String> headers = get006TitleLabels();
	        int headerColumnIndex = 0;
	        for (String header : headers) {
	            createCell(headerRow, headerColumnIndex++, header, workbook);
	        }

	        // Populate data
	        createF006Values(sheet, workbook, details);

	        // Write the workbook to a byte array
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        workbook.write(baos);
	        return new ByteArrayResource(baos.toByteArray());
	    }
	}

	private static List<String> get006TitleLabels() {
	    List<String> list = new ArrayList<>();
	    
	    // Add entity field titles
	    list.add("FORMAT NAME");
	    list.add("FORMAT NO");
	    list.add("REVISION NO");
	    list.add("REF SOP NO");
	    list.add("UNIT");
	    list.add("DATE");
	    list.add("GATE PASS NO");
	    list.add("GOODS SENT TO");
	    list.add("ADDRESS");
	    list.add("TRANSPORTER NAME");
	    list.add("VEHICLE NO");
	    list.add("REASON");
	    list.add("STORE INCHARGE STATUS");
	    list.add("STORE INCHARGE SUBMITTED ON");
	    list.add("STORE INCHARGE SUBMITTED BY");
	    list.add("STORE INCHARGE SIGN");
	    list.add("HOD STATUS");
	    list.add("HOD SUBMITTED ON");
	    list.add("HOD SUBMITTED BY");
	    list.add("HOD SIGN");
	    list.add("VERSION");
	   
	    
	    // Add goods detail titles
//	    list.add("S_NO");
	    list.add("DESCRIPTION");
	    list.add("QUANTITY");
	    list.add("REASON FOR SENDING OUT");
	    list.add("REMARK");

	    return list;
	}

	private static void createF006Values(Sheet sheet, Workbook workbook, List<NonReturnableGatePassHistoryF006> reportHistory) {
	    int rowCount = 1; // Start from row 1
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (NonReturnableGatePassHistoryF006 history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Populate the main record fields
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, history.getGatePassNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getGoodsSentTo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAddress(), cellStyle);
	        createCell(valueRow, columnCount++, history.getTransporterName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getVehicleNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);

	        // Add store in charge fields
	        createCell(valueRow, columnCount++, history.getStoreInchargeStatus(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getStoreInchargeSubmitOn(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getStoreInchargeSubmitBy(), cellStyle);
	        createCell(valueRow, columnCount++, history.getStoreInchargeSign(), cellStyle);

	        // Add HOD fields
	        createCell(valueRow, columnCount++, history.getHod_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getHod_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getHod_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getHod_sign(), cellStyle);

	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

	        // Add goods details in the same row
	        if (history.getGoodsDetails() != null && !history.getGoodsDetails().isEmpty()) {
	            for (NonReturnableGoodsDetailHistory goodsDetail : history.getGoodsDetails()) {
	                // Continue populating the same row (instead of creating a new one)
//	                createCell(valueRow, columnCount++, goodsDetail.getSno(), cellStyle);
	                createCell(valueRow, columnCount++, goodsDetail.getDescription(), cellStyle);
	                createCell(valueRow, columnCount++, goodsDetail.getQuantity(), cellStyle);
	                createCell(valueRow, columnCount++, goodsDetail.getReasonForSendingOut(), cellStyle);
	                createCell(valueRow, columnCount++, goodsDetail.getRemark(), cellStyle);
	            }
	        }
	    }
	}



	
	public static ByteArrayResource generateF008Excel(List<ForkliftMovementCheckListHistoryF008> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get008TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF008Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}
	
	private static List<String> get008TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Entity Field Titles
	    list.add("FORMAT NAME");          
	    list.add("FORMAT NO");           
	    list.add("REVISION NO");          
	    list.add("SOP NUMBER");          
	    list.add("UNIT");                 
	    list.add("DATE");                 
	    list.add("FORKLIFT NO");  
	    list.add("YEAR");                
	    list.add("MONTH");
	    
	    list.add("START METER READING");   
	    list.add("END METER READING");     
	    list.add("TOTAL METER READING");   
	    list.add("IN KM");                 
	    list.add("OUT KM");                
	    list.add("TOTAL KM");              
	    
	    list.add("CHARGE IN TIME");        
	    list.add("CHARGE OUT TIME");       
	    list.add("TOTAL CHARGE");          
	    
	    list.add("REMARKS");               
	    list.add("REASON");                
	                 
	    
	    // Operator status fields
	    list.add("OPERATOR STATUS");          
	    list.add("OPERATOR SUBMITTED ON");    
	    list.add("OPERATOR SUBMITTED BY");    
	    list.add("OPERATOR SIGN");           

	    // Store in charge/HOD status fields
	    list.add("STORE IN CHARGE STATUS");       
	    list.add("STORE IN CHARGE SUBMITTED ON");  
	    list.add("STORE IN CHARGE SUBMITTED BY");  
	    list.add("STORE IN CHARGE SIGN");    
	    
	    list.add("VERSION"); 
	    
	   
	                 

	    return list;
	}


	
	private static String createF008Values(Sheet sheet, Workbook workbook,
	        List<ForkliftMovementCheckListHistoryF008> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (ForkliftMovementCheckListHistoryF008 history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields - match with the entity fields
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);   
	        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);  
	        createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);      
	        createCell(valueRow, columnCount++, history.getDate() != null ? history.getDate().toString() : "", cellStyle);
	        createCell(valueRow, columnCount++, history.getForkliftNo(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getYear(), cellStyle);       
	        createCell(valueRow, columnCount++, history.getMonth(), cellStyle);      

	        // Meter readings and kilometers
	        createCell(valueRow, columnCount++, String.valueOf(history.getStartMeterReading()), cellStyle);  
	        createCell(valueRow, columnCount++, String.valueOf(history.getEndMeterReading()), cellStyle);   
	        createCell(valueRow, columnCount++, String.valueOf(history.getTotalMeterReading()), cellStyle);  
	        createCell(valueRow, columnCount++, String.valueOf(history.getInKm()), cellStyle);               
	        createCell(valueRow, columnCount++, String.valueOf(history.getOutKm()), cellStyle);              
	        createCell(valueRow, columnCount++, String.valueOf(history.getTotalKm()), cellStyle);            

	        // Charge times
	        createCell(valueRow, columnCount++, history.getChargeInTime(), cellStyle);     
	        createCell(valueRow, columnCount++, history.getChargeOutTime(), cellStyle);    
	        createCell(valueRow, columnCount++, history.getTotalCharge(), cellStyle);     

	        // Remarks and other info
	        createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);         
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);          
	    

	        // Operator status fields
	        createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle); // OPERATOR_STATUS
	        createDateCell(valueRow, columnCount++, history.getOperator_submit_on(), dateCellStyle); // OPERATOR_SUBMIT_ON
	        createCell(valueRow, columnCount++, history.getOperator_submit_by(), cellStyle); // OPERATOR_SUBMIT_BY
	        createCell(valueRow, columnCount++, history.getOperator_sign(), cellStyle); // OPERATOR_SIGN

	        // Store in charge/HOD fields
	        createCell(valueRow, columnCount++, history.getStore_in_charge_status(), cellStyle); // STORE_IN_CHARGE_STATUS
	        createDateCell(valueRow, columnCount++, history.getStore_in_charge_submit_on(), dateCellStyle); // STORE_IN_CHARGE_SUBMIT_ON
	        createCell(valueRow, columnCount++, history.getStore_in_charge_submit_by(), cellStyle); // STORE_IN_CHARGE_SUBMIT_BY
	        createCell(valueRow, columnCount++, history.getStore_in_charge_sign(), cellStyle); // STORE_IN_CHARGE_SIGN
	        
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);  // VERSION

	        
	       
	    }

	    return "";
	}


	


	
	
	public static ByteArrayResource generateF009Excel(List<EyeWashConditionChecklistHistoryF009> details)
			throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = get009TitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createF009Values(sheet, workbook, details);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}
	
	private static List<String> get009TitleLables() {
	    List<String> list = new ArrayList<>();

	    // Entity Field Titles
	    list.add("FORMAT NAME");           // formatName
	    list.add("FORMAT NO");             // formatNo
	    list.add("REVISION NO");           // revisionNo
	    list.add("SOP NUMBER");            // sopNumber
	    list.add("UNIT");                  // unit
	    list.add("DATE");                  // date
	    
	    list.add("SHOWER PULL ROD");       // showerPullRod
	    list.add("PUSH BOARD");            // pushboard
	    list.add("WATER FLOW");            // waterflow
	    
	    list.add("REMARKS");               // remarks
	    list.add("REASON");                // reason
	    list.add("VERSION");               // version

	    // Operator status fields
	    list.add("OPERATOR STATUS");           // operator_status
	    list.add("OPERATOR SUBMITTED ON");     // operator_submit_on
	    list.add("OPERATOR SUBMITTED BY");     // operator_submit_by
	    list.add("OPERATOR SIGN");             // operator_sign

	    // Store in charge/HOD status fields
	    list.add("STORE IN CHARGE STATUS");        // store_in_charge_status
	    list.add("STORE IN CHARGE SUBMITTED ON");  // store_in_charge_submit_on
	    list.add("STORE IN CHARGE SUBMITTED BY");  // store_in_charge_submit_by
	    list.add("STORE IN CHARGE SIGN");          // store_in_charge_sign

	    
	    return list;
	}



	
	private static void createF009Values(Sheet sheet, Workbook workbook, List<EyeWashConditionChecklistHistoryF009> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (EyeWashConditionChecklistHistoryF009 history : reportHistory) {
	        int columnCount = 0;

	        // Create main record row
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main record fields - match with the entity fields
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);   
	        createCell(valueRow, columnCount++, history.getRevisionNo(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getSopNumber(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);      
	        createCell(valueRow, columnCount++, history.getDate() != null ? history.getDate().toString() : "", cellStyle);
//	        createDateCell(valueRow, columnCount++, history.getDate() != null ? convertToDate(history.getDate()) : null, dateCellStyle);
	        

	        // Checklist fields
	        createCell(valueRow, columnCount++, history.getShowerPullRod(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getPushboard(), cellStyle);  
	        createCell(valueRow, columnCount++, history.getWaterflow(), cellStyle);  

	        // Remarks and other info
	        createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);         
	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);          
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);  

	        // Operator status fields
	        createCell(valueRow, columnCount++, history.getOperator_status(), cellStyle); 
	        createDateCell(valueRow, columnCount++, history.getOperator_submit_on(), dateCellStyle); 
	        createCell(valueRow, columnCount++, history.getOperator_submit_by(), cellStyle); 
	        createCell(valueRow, columnCount++, history.getOperator_sign(), cellStyle); 

	        // Store in charge/HOD fields
	        createCell(valueRow, columnCount++, history.getStore_in_charge_status(), cellStyle); 
	        createDateCell(valueRow, columnCount++, history.getStore_in_charge_submit_on(), dateCellStyle); 
	        createCell(valueRow, columnCount++, history.getStore_in_charge_submit_by(), cellStyle); 
	        createCell(valueRow, columnCount++, history.getStore_in_charge_sign(), cellStyle); 

	       
	    }
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
	
	



}
