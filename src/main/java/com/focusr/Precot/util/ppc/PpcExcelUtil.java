package com.focusr.Precot.util.ppc;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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

import com.focusr.Precot.mssql.database.model.PPC.audit.MonthlyplanSummaryHistoryF_002;
import com.focusr.Precot.mssql.database.model.PPC.audit.MonthlyplanSummaryProductHistoryF_002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyRollConsumptionReportHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.MachineDetailsHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailLogBookHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.RollConsumptionDetailsHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.StoppageDetailsHistoryF002;

public class PpcExcelUtil {

	
	
	
	public static ByteArrayResource generateF003Excel(List<MonthlyplanSummaryHistoryF_002> summaryF01) throws IOException {
	    try (Workbook workbook = new SXSSFWorkbook()) {
	        Sheet sheet = workbook.createSheet("Report");

	        // Create header row
	        Row headerRow = sheet.createRow(0);
	        List<String> headers = getF003TitleLabels();
	        int headerColumnIndex = 0;
	        for (String header : headers) {
	            createCell(headerRow, headerColumnIndex++, header, workbook);
	        }

	        // Populate data
	        createF003Values(sheet, workbook, summaryF01);

	        // Write the workbook to a byte array
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        workbook.write(baos);
	        return new ByteArrayResource(baos.toByteArray());
	    }
	}

	private static List<String> getF003TitleLabels() {
	    List<String> list = new ArrayList<>();

	    // Main Record Fields
	    list.add("FORMAT NAME");
	    list.add("FORMAT NO");
	    list.add("REVISION NO");
	    list.add("SOP NUMBER");
	    list.add("UNIT");
	    list.add("MONTHYEAR");
	    list.add("DATE");

	    // Status Fields
	    list.add("ASSISTANT STATUS");
	    list.add("ASSISTANT SUBMIT ON");
	    list.add("ASSISTANT SUBMITTED BY");
	    list.add("ASSISTANT SIGN");

	    list.add("PPC_INCHARGE STATUS");
	    list.add("PPC_INCHARGE SUBMIT ON");
	    list.add("PPC_INCHARGE SUBMITTED BY");
	    list.add("PPC_INCHARGE SIGN");
	   

	    list.add("REASON");
	    
	    list.add("VERSION");

	    // Production Data Fields
	    list.add("BLEACHING KG");
	    list.add("SPUNLACE KG");
	    list.add("PAD PUNCHING BAGS");
	    list.add("BALL MAKING BAGS");
	    list.add("PLEAT MAKING BAGS");
	    list.add("BUDS MAKING BAGS");
	    list.add("WOOL ROLL BAGS");
	    list.add("EXTERNAL FLEECE");

	    list.add("TOTAL PROD BLEACHING");
	    list.add("TOTAL PROD SPUNLACE");
	    list.add("TOTAL PROD PAD PUNCHING");
	    list.add("TOTAL PROD BALL MAKING");
	    list.add("TOTAL PROD PLEAT MAKING");
	    list.add("TOTAL PROD BUDS MAKING");
	    list.add("TOTAL PROD WOOL ROLL");
	    list.add("TOTAL PROD EXTERNAL FLEECE");

	    list.add("WORK DAYS BLEACHING");
	    list.add("WORK DAYS SPUNLACE");
	    list.add("WORK DAYS PAD PUNCHING");
	    list.add("WORK DAYS BALL MAKING");
	    list.add("WORK DAYS PLEAT MAKING");
	    list.add("WORK DAYS BUDS MAKING");
	    list.add("WORK DAYS WOOL ROLL");
	    list.add("WORK DAYS EXTERNAL FLEECE");

	    return list;
	}

	private static void createF003Values(Sheet sheet, Workbook workbook, List<MonthlyplanSummaryHistoryF_002> reportHistory) {
	    int rowCount = 1;
	    CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
	    CellStyle dateCellStyle = createDateCellStyle(workbook);

	    for (MonthlyplanSummaryHistoryF_002 history : reportHistory) {
	        int columnCount = 0;
	        Row valueRow = sheet.createRow(rowCount++);

	        // Main Record Fields
	        createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
	        createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
	        createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
	        createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
	        createCell(valueRow, columnCount++, history.getUnit(), cellStyle);
	        createCell(valueRow, columnCount++, history.getMonthyear(), cellStyle);
	        createCell(valueRow, columnCount++, history.getDate(), cellStyle);
	        createCell(valueRow, columnCount++, formatDateString(history.getDate()), cellStyle);


	        // Status Fields
	        createCell(valueRow, columnCount++, history.getAssistant_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getAssistant_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getAssistant_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getAssistant_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getPpc_Incharge_status(), cellStyle);
	        createDateCell(valueRow, columnCount++, history.getPpc_Incharge_submit_on(), dateCellStyle);
	        createCell(valueRow, columnCount++, history.getPpc_Incharge_submit_by(), cellStyle);
	        createCell(valueRow, columnCount++, history.getPpc_Incharge_sign(), cellStyle);

	        createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	        
	        createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

	        
	        
	        

	        
	     // Production Data
	        if (history.getProductionData() != null && !history.getProductionData().isEmpty()) {
	            for (MonthlyplanSummaryProductHistoryF_002 product : history.getProductionData()) {
	                // Fill production data on the same row
	                createCell(valueRow, columnCount++, product.getBleachingKg(), cellStyle);
	                createCell(valueRow, columnCount++, product.getSpunlaceKg(), cellStyle);
	                createCell(valueRow, columnCount++, product.getPadPunchingBags(), cellStyle);
	                createCell(valueRow, columnCount++, product.getBallMakingBags(), cellStyle);
	                createCell(valueRow, columnCount++, product.getPleatMakingBags(), cellStyle);
	                createCell(valueRow, columnCount++, product.getBudsMakingBags(), cellStyle);
	                createCell(valueRow, columnCount++, product.getWoolRollBags(), cellStyle);
	                createCell(valueRow, columnCount++, product.getExternalFleece(), cellStyle);

	                createCell(valueRow, columnCount++, product.getTotalProdBleaching(), cellStyle);
	                createCell(valueRow, columnCount++, product.getTotalProdSpunlace(), cellStyle);
	                createCell(valueRow, columnCount++, product.getTotalProdPadPunching(), cellStyle);
	                createCell(valueRow, columnCount++, product.getTotalProdBallMaking(), cellStyle);
	                createCell(valueRow, columnCount++, product.getTotalProdPleatMaking(), cellStyle);
	                createCell(valueRow, columnCount++, product.getTotalProdBudsMaking(), cellStyle);
	                createCell(valueRow, columnCount++, product.getTotalProdWoolRoll(), cellStyle);
	                createCell(valueRow, columnCount++, product.getTotalProdExternalFleece(), cellStyle);

	                createCell(valueRow, columnCount++, product.getWorkDaysBleaching(), cellStyle);
	                createCell(valueRow, columnCount++, product.getWorkDaysSpunlace(), cellStyle);
	                createCell(valueRow, columnCount++, product.getWorkDaysPadPunching(), cellStyle);
	                createCell(valueRow, columnCount++, product.getWorkDaysBallMaking(), cellStyle);
	                createCell(valueRow, columnCount++, product.getWorkDaysPleatMaking(), cellStyle);
	                createCell(valueRow, columnCount++, product.getWorkDaysBudsMaking(), cellStyle);
	                createCell(valueRow, columnCount++, product.getWorkDaysWoolRoll(), cellStyle);
	                createCell(valueRow, columnCount++, product.getWorkDaysExternalFleece(), cellStyle);
	            }
	        }

	    }
	}


	
	
//	****************************************** Common *********************************************8
	
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
		return cellStyle;
	}

//
	
//	private static String formatDateString(String dateStr) {
//        if (dateStr == null || dateStr.isEmpty()) {
//            return ""; // Return empty or some default value if the input is invalid
//        }
//
//        // Trim leading/trailing whitespace
//        dateStr = dateStr.trim();
//
//        // Define the input format and output format
//        SimpleDateFormat inputFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
//        SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
//
//        try {
//            Date date = inputFormat.parse(dateStr); // Parse the input date string
//            return outputFormat.format(date); // Return the formatted date
//        } catch (ParseException e) {
//            // If parsing fails, log an error and return the original string
//            System.err.println("Unparseable date: " + dateStr);
//            return dateStr; // Return original if parsing fails
//        }
//    }
	
	private static String formatDateString(String dateStr) {
	    SimpleDateFormat inputFormat = new SimpleDateFormat("dd/MM/yyyy"); // Input format (what you currently have)
	    SimpleDateFormat outputFormat = new SimpleDateFormat("yyyy-MM-dd"); // Desired output format
	    try {
	        Date date = inputFormat.parse(dateStr); // Parse the input string to a Date
	        return outputFormat.format(date); // Format it into the new format
	    } catch (ParseException e) {
	        e.printStackTrace();
	        return dateStr; // Return the original string if parsing fails
	    }
	}

}
