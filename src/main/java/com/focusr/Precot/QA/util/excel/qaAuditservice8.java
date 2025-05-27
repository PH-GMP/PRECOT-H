package com.focusr.Precot.QA.util.excel;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.focusr.Precot.QA.model.audit.batchReleaseChecklisthistory;
import com.focusr.Precot.QA.model.audit.productionretainedsampleregister40history;
import com.focusr.Precot.QA.model.audit.productionretainedsampleregisterHistorychild1;
import com.focusr.Precot.QA.model.audit.productionretainedsampleregisterHistorychild2;
import com.focusr.Precot.QA.payload.QaAuditRequest;
import com.focusr.Precot.QA.repository.audit.batchReleaseChecklisthistoryRepo;
import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.QAqcObservationsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.RequistionHistoryF029;
import com.focusr.Precot.mssql.database.model.QcAudit.microbiologicalTestHistoryF002;
import com.focusr.Precot.mssql.database.repository.Qc.audit.RequistionHistoryF029Repo;
import com.focusr.Precot.payload.ApiResponse;

@Service
public class qaAuditservice8 {

	@Autowired
	RequistionHistoryF029Repo RequistionHistoryF029Repo;
	
	@Autowired
	batchReleaseChecklisthistoryRepo batchReleaseChecklisthistoryRepo;
	
	String[] skipValues = {"unit","unit_h",
		    "test_id", "micro_id", "obs_id", "qAqcObservations", "microbiologicalTest", "lab_id",
		    "physicalandchemicaltest", "MICROBIOLOGICAL TEST", "QAQC OBSERVATIONS", "observations",
		    "microbilogytestf004", "exfoliatingfabricanalysisreporthistory", "microbilogytestf006",
		    "finishedproductanalysisreportF006", "obser", "weighingscalecalibrationreportCLF007", "createdAt",
		    "updatedAt", "createdBy", "updatedBy", "qc_", "chemist_", "micro_", "fumigationARF011", "CREATED BY",
		    "UPDATED BY", "UPDATED AT", "CREATED AT", "chemist_saved_on", "chemist_saved_by", "chemist_saved_id",
		    "microbiologist_saved_on", "microbiologist_saved_by",
		    "microbiologist_saved_id","micro_saved_on",
		    "qa_inspector_saved_on", "qa_inspector_saved_by", "qa_inspector_saved_id", "qa_inspector_submit_on", 
		    "qa_inspector_submit_id", "qa_inspector_sign", "qa_mng_submit_on", "qa_mng_submit_id", "qa_mng_sign", 
		    "ins_saved_on", "ins_saved_by", "ins_saved_id",  "APPROVED_SAMPLE",
		    
		     "potableWaterARF013Report","micro_saved_by","micro_saved_id","test_parameters_specification",""
		};
	
	
	public ResponseEntity<?> downloadExcel15 (String batch, String fromdate, String todate,
			HttpServletResponse response) throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();
		
		
		
		List<RequistionHistoryF029> invoices = new ArrayList<>();
		
	
			invoices = RequistionHistoryF029Repo.audit(batch, fromdate, todate);
	
		if(invoices== null || invoices.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				
		}
		 
//
		String filename = "RequistionReport";

		 ArrayNode jsonArray = objectMapper.valueToTree(invoices);

		    // Create a Workbook
		    Workbook workbook = new XSSFWorkbook();
		    // Create a Sheet
		    Sheet sheet = workbook.createSheet("Precot");

		    // Create a bold header row with background color
		    Row headerRow = sheet.createRow(0);
		    JsonNode firstInvoice = jsonArray.get(0);
		    int headerColIndex = 0;

		    // Create a bold font style for the header with background color
		    CellStyle headerStyle = workbook.createCellStyle();
		    Font headerFont = workbook.createFont();
		    headerFont.setBold(true);
		    headerStyle.setFont(headerFont);

		    // Write headers, skipping fields in skipValues
		    for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext(); ) {
		        String fieldName = convertCamelCaseToUpperCaseformat(it.next().toUpperCase());  // Capitalize the header text

		        // Skip the field if it's in the skip list
		        if (!fieldName.isEmpty() && !isFieldInSkipValues(fieldName)) {
		            Cell cell = headerRow.createCell(headerColIndex++);
		            cell.setCellValue(fieldName);
		            cell.setCellStyle(headerStyle);
		        }
		    }

		    // Write data rows, skipping values for fields in skipValues
		    int dataColIndex;
		    for (int i = 0; i < jsonArray.size(); i++) {
		        JsonNode invoice = jsonArray.get(i);
		        Row row = sheet.createRow(i + 1);
		        dataColIndex = 0;
		        for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext(); ) {
		            Map.Entry<String, JsonNode> field = fields.next();
		            String fieldName = convertCamelCaseToUpperCase(field.getKey().toUpperCase());

		            // Skip the field if it's in the skip list
		            if (!fieldName.isEmpty() && !isFieldInSkipValues(fieldName)) {
		                Cell cell = row.createCell(dataColIndex++);
		                 if (field.getKey().equalsIgnoreCase("APPROVESTATUS")) {
		                	String dbDateTime = invoice.get("qc_sign").asText(); // e.g., "2024-09-26 19:49:05.6110000"

		                	cell.setCellValue(dbDateTime);
		                }else {
		                	String value = formatTimestamp(fieldName , field.getValue().asText());
		                	cell.setCellValue(value!=null?value : "N/A");
		                }
		                
		            }
		        }
		    }

		    // Adjust column width according to the width of the values in each cell
		    for (int i = 0; i < headerColIndex; i++) {
		        sheet.autoSizeColumn(i);
		    }

		    // Set the content type and attachment header
		    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		    response.setHeader("Content-Disposition", "attachment; filename=\"" +filename+".xlsx" + "\"");

		    // Write the output to the response output stream
		    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		    try {
		        workbook.write(byteArrayOutputStream);
		    } catch (IOException e) {
		        e.printStackTrace();
		    } finally {
		        workbook.close();  // Ensure the workbook is closed even if an exception occurs
		    }

		    // Set headers and return the file in the ResponseEntity
		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		    headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));

		    return ResponseEntity.ok().headers(headers).body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
	}
	
	public ResponseEntity<?> downloadbatchChecklist (QaAuditRequest summeryrequest,
			HttpServletResponse response) throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();

		List<batchReleaseChecklisthistory> invoices = new ArrayList<>();
//
//		if(summeryrequest.getFrom_date().equalsIgnoreCase(summeryrequest.getTo_date())) {
//			invoices = batchReleaseChecklisthistoryRepo.audit(summeryrequest.getBmr_no(), summeryrequest.getDepartment(),summeryrequest.getFrom_date(), summeryrequest.getTo_date());
//		}else if (!summeryrequest.getFrom_date().equalsIgnoreCase(summeryrequest.getTo_date())){
//			invoices = batchReleaseChecklisthistoryRepo.audit(summeryrequest.getBmr_no(), summeryrequest.getDepartment(),summeryrequest.getFrom_date(), summeryrequest.getTo_date());
//		}else {
//			invoices = batchReleaseChecklisthistoryRepo.audit();
//		}
		
	
		if(invoices== null || invoices.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				
		}

		String filename = "batchChecklistreport";

		 ArrayNode jsonArray = objectMapper.valueToTree(invoices);

		    // Create a Workbook
		    Workbook workbook = new XSSFWorkbook();
		    // Create a Sheet
		    Sheet sheet = workbook.createSheet("Precot");

		    // Create a bold header row with background color
		    Row headerRow = sheet.createRow(0);
		    JsonNode firstInvoice = jsonArray.get(0);
		    int headerColIndex = 0;

		    // Create a bold font style for the header with background color
		    CellStyle headerStyle = workbook.createCellStyle();
		    Font headerFont = workbook.createFont();
		    headerFont.setBold(true);
		    headerStyle.setFont(headerFont);

		    // Write headers, skipping fields in skipValues
		    for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext(); ) {
		        String fieldName = convertCamelCaseToUpperCaseformat(it.next().toUpperCase());  // Capitalize the header text

		        // Skip the field if it's in the skip list
		        if (!fieldName.isEmpty() && !isFieldInSkipValues(fieldName)) {
		            Cell cell = headerRow.createCell(headerColIndex++);
		            cell.setCellValue(fieldName);
		            cell.setCellStyle(headerStyle);
		        }
		    }

		    // Write data rows, skipping values for fields in skipValues
		    int dataColIndex;
		    for (int i = 0; i < jsonArray.size(); i++) {
		        JsonNode invoice = jsonArray.get(i);
		        Row row = sheet.createRow(i + 1);
		        dataColIndex = 0;
		        for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext(); ) {
		            Map.Entry<String, JsonNode> field = fields.next();
		            String fieldName = convertCamelCaseToUpperCase(field.getKey().toUpperCase());

		            // Skip the field if it's in the skip list
		            if (!fieldName.isEmpty() && !isFieldInSkipValues(fieldName)) {
		                Cell cell = row.createCell(dataColIndex++);
		                 if (field.getKey().equalsIgnoreCase("APPROVESTATUS")) {
		                	String dbDateTime = invoice.get("qc_sign").asText(); // e.g., "2024-09-26 19:49:05.6110000"

		                	cell.setCellValue(dbDateTime);
		                }else {
		                	String value = formatTimestamp(fieldName , field.getValue().asText());
		                	cell.setCellValue(value!=null?value : "N/A");
		                }
		                
		            }
		        }
		    }

		    // Adjust column width according to the width of the values in each cell
		    for (int i = 0; i < headerColIndex; i++) {
		        sheet.autoSizeColumn(i);
		    }

		    // Set the content type and attachment header
		    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		    response.setHeader("Content-Disposition", "attachment; filename=\"" +filename+".xlsx" + "\"");

		    // Write the output to the response output stream
		    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		    try {
		        workbook.write(byteArrayOutputStream);
		    } catch (IOException e) {
		        e.printStackTrace();
		    } finally {
		        workbook.close();  // Ensure the workbook is closed even if an exception occurs
		    }

		    // Set headers and return the file in the ResponseEntity
		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		    headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));

		    return ResponseEntity.ok().headers(headers).body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
	}
	
	public boolean isFieldInSkipValues(String fieldName) {
	    // List of fields to skip
	    List<String> skipList = Arrays.asList(skipValues);

	    // Check if the field name matches any in skipValues
	    for (String skipValue : skipList) {
	        if (skipValue.trim().equalsIgnoreCase(fieldName)) {
	            return true; // If it matches, return true to skip this field
	        }
	    }
	    return false; // If no match, return false
	}
	
	   public  String formatTimestamp(String timestamp) {
	        try {
	            // Parse the string as a long to represent milliseconds
	            long millis = Long.parseLong(timestamp);

	            // Convert milliseconds to LocalDateTime
	            LocalDateTime dateTime = Instant.ofEpochMilli(millis)
	                                             .atZone(ZoneId.systemDefault())
	                                             .toLocalDateTime();

	            // Format to desired output, e.g., "yyyy-MM-dd HH:mm:ss"
	            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	            return dateTime.format(formatter);

	        } catch (NumberFormatException e) {
	            System.out.println("Invalid timestamp: " + timestamp);
	            return null; // or return a default value if preferred
	        }
	    }
	   
	   public  String formatTimestamp(String fildname , String timestamp) {
	        try {
	            // Parse the string as a long to represent milliseconds
	        	if((!fildname.equalsIgnoreCase("sampled_on") && !fildname.equalsIgnoreCase("tested_on"))&&( fildname.contains("_on") || fildname.endsWith("_on") || fildname.contains("_ON") || fildname.endsWith("_ON"))) {
	        	    long millis = Long.parseLong(timestamp);

		            // Convert milliseconds to LocalDateTime
		            LocalDateTime dateTime = Instant.ofEpochMilli(millis)
		                                             .atZone(ZoneId.systemDefault())
		                                             .toLocalDateTime();

		            // Format to desired output, e.g., "yyyy-MM-dd HH:mm:ss"
		            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		            return dateTime.format(formatter);
	        	}else if (timestamp!=null){
	        		return timestamp;
	        	}else 
	        	{
	        		return "N/A";
	        	}
	        

	        } catch (NumberFormatException e) {
	            System.out.println("Invalid timestamp: " + timestamp);
	            return null; // or return a default value if preferred
	        }
	    }
	   
		
		public String convertCamelCaseToUpperCaseformat(String text) {
		    // Insert a space before each uppercase letter (except for the first one)
		    String withSpaces = text.replaceAll("([a-z])([A-Z])", "$1 $2");

		    // Convert the entire string to uppercase
		    String formattedFieldName = withSpaces.toUpperCase();

		    // List of fields to skip
		    List<String> skipList = Arrays.asList(skipValues);

		    // Check if field name matches or contains any value in skipList
		    for (String skipValue : skipList) {
		        String trimmedSkipValue = skipValue.trim().toUpperCase();

		        // If the field name matches or contains the skip value, return an empty string
		        if (formattedFieldName.equalsIgnoreCase(trimmedSkipValue)) {
		            return "";
		        }
		    }

		    // Return the formatted field name if it is not in the skip list
		    if(formattedFieldName.equalsIgnoreCase("FORMAT")) {
		    	formattedFieldName = "FORMAT_NAME";
		    }
		    return formattedFieldName;
		}

		public String convertCamelCaseToUpperCase(String text) {
		    // Insert a space before each uppercase letter (except for the first one)
		    String withSpaces = text.replaceAll("([a-z])([A-Z])", "$1 $2");

		    // Convert the entire string to uppercase
		    String formattedFieldName = withSpaces.toUpperCase();

		    // List of fields to skip
		    List<String> skipList = Arrays.asList(skipValues);

		    // Check if field name matches or contains any value in skipList
		    for (String skipValue : skipList) {
		        String trimmedSkipValue = skipValue.trim().toUpperCase();

		        // If the field name matches or contains the skip value, return an empty string
		        if (formattedFieldName.equalsIgnoreCase(trimmedSkipValue)) {
		            return "";
		        }
		    }

		    // Return the formatted field name if it is not in the skip list
		    return formattedFieldName;
		}
		
		public ResponseEntity<?> generateProductionRetain(List<productionretainedsampleregister40history> details, HttpServletResponse response)
				throws IOException {
			try (Workbook workbook = new SXSSFWorkbook()) {
				Sheet sheet = workbook.createSheet("Report");
				
				// Create header row
				Row headerRow = sheet.createRow(0);
				List<String> headers = getProductionRetain();
				int headerColumnIndex = 0;
				for (String header : headers) {
					createCell(headerRow, headerColumnIndex++, header, workbook);
				}

				// Populate data
				createproductionRetain(sheet, workbook,details);

				// Write the workbook to a byte array
				ByteArrayOutputStream baos = new ByteArrayOutputStream();
				workbook.write(baos);
				ByteArrayResource byteArrayResource = new ByteArrayResource(baos.toByteArray());
				return getProdcution(byteArrayResource);
				
			}
		}
		
		public ResponseEntity<?> getProdcution(ByteArrayResource bytevalue){
			
			
			try {
				
				ByteArrayResource resource = bytevalue;
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION,
							"attachment; filename=productionRetains.xlsx")
					.contentType(MediaType.parseMediaType(
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
					.body(resource);
		} catch(Exception e ) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		}
		}
		
		
		private static void createCell(Row row, int columnIndex, String value, CellStyle cellStyle) {
			Cell cell = row.createCell(columnIndex);
			cell.setCellValue(value != null ? value : "");
			cell.setCellStyle(cellStyle);
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
		private static List<String> getProductionRetain() {
			List<String> list = new ArrayList<>();
	 
		
			   
		        list.add("FORMAT");
		        list.add("FORMAT_NO");
		        list.add("REF_SOP_NO");
		        list.add("SHIFT");
		        list.add("DATE");
		        list.add("YEAR");
		        list.add("MONTH");
		        list.add("SAMPLE_RETAINED_BY");
		        list.add("APPROVED_BY");

		        list.add("ISSUE_STATUS");
		        list.add("VERSION");
		        list.add("REASON");
			
	        list.add("SHIFT");
	        list.add("DATE");
	        list.add("YEAR");
	        list.add("MONTH");
//	        list.add("PRODUCT");
	        list.add("FG_NO_BATCH_NO");
	        list.add("PRODUCT_DESCRIPTION");
	        list.add("QUANTITY_IN_NOS");
	        list.add("BOX_NO");
	        list.add("SAMPLE_DISPOSAL_DATE");
//	        list.add("SAMPLE_RETAINED_BY");
//	        list.add("APPROVED_BY");
	        list.add("SHIFT");
	        list.add("DATE");
	        list.add("YEAR");
	        list.add("MONTH");
	        list.add("DISPOSAL_METHOD");
	        list.add("DISPOSED_BY");
	        list.add("BAG_OPENED_ON");
	        list.add("REASON");
	        list.add("REQUESTED_BY");
//	        list.add("APPROVED_BY");
//	        list.add("RECEIVED_BY");
	        list.add("REMARKS");
			
			return list;
			
		}
		
		private static CellStyle createDateCellStyle(Workbook workbook) {
			CellStyle cellStyle = workbook.createCellStyle();
			DataFormat format = workbook.createDataFormat();
			cellStyle.setDataFormat(format.getFormat("yyyy-MM-dd HH:mm"));
			return cellStyle;
		}
		
		private static void createproductionRetain(Sheet sheet, Workbook workbook,
				List<productionretainedsampleregister40history> reportHistory) {
			int rowCount = 1;
			CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
			CellStyle dateCellStyle = createDateCellStyle(workbook);
	 
			for (productionretainedsampleregister40history history : reportHistory) {
				int columnCount = 0;
	 
				// Create main record row
				Row valueRow = sheet.createRow(rowCount++);
	 
				// Main record fields
				createCell(valueRow, columnCount++, history.getFormat(), cellStyle);
				createCell(valueRow, columnCount++, history.getFormat_no(), cellStyle);
				createCell(valueRow, columnCount++, history.getRef_sop_no(), cellStyle);
				createCell(valueRow, columnCount++, history.getShift(), cellStyle);
				createCell(valueRow, columnCount++, history.getDate(), cellStyle);
				createCell(valueRow, columnCount++, history.getYear(), cellStyle);
				createCell(valueRow, columnCount++, history.getMonth(), cellStyle);
				createCell(valueRow, columnCount++, history.getSampleRetainedBy(), cellStyle);
	 
				createCell(valueRow, columnCount++, history.getApprovedBy(), cellStyle);
				createCell(valueRow, columnCount++, history.getIssue_status(), dateCellStyle);
				createCell(valueRow, columnCount++, String.valueOf(history.getVersion()) , cellStyle);
	 
				createCell(valueRow, columnCount++, history.getReason(), cellStyle);
	 

	 
				// Separate starting column indexes for nested data
				int mainColumn = columnCount;
				int childColumn = mainColumn + 9; // Number of columns for QAqcObservationsHistory
	 
				// Fill QAqcObservationsHistory data
				if (history.getProductionSampleA() != null && !history.getProductionSampleA().isEmpty()) {
					for (productionretainedsampleregisterHistorychild1 details : history.getProductionSampleA()) {
						Row nestedRow = sheet.createRow(rowCount++);
						int nestedColumnCount = mainColumn;
						
						createCell(nestedRow, nestedColumnCount++, details.getShift(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getDate(), cellStyle);
            			createCell(nestedRow, nestedColumnCount++, details.getMonth(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getYear(), cellStyle);
//						createCell(nestedRow, nestedColumnCount++, details.getProduct(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getFgNoBatchNo(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getProductDescription(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getQuantityInNos(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getBoxNo(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getSampleDisposalDate(), cellStyle);
//						createCell(nestedRow, nestedColumnCount++, details.getSampleRetainedBy(), cellStyle);
//						createCell(nestedRow, nestedColumnCount++, details.getApprovedBy(), cellStyle);

	 
					}
				} else {
					// Add empty cells for MachineDetails if none exist
					for (int i = 0; i < 9; i++) {
						createCell(valueRow, mainColumn + i, "", cellStyle);
					}
				}
	 
				// Fill RollConsumptionDetailsHistoryF002 data
				if (history.getProductionSampleB() != null && !history.getProductionSampleB().isEmpty()) {
					for (productionretainedsampleregisterHistorychild2 details : history.getProductionSampleB()) {
						Row nestedRow = sheet.createRow(rowCount++);
						int nestedColumnCount = childColumn;
	 
						
						createCell(nestedRow, nestedColumnCount++, details.getShift(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getDate(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getYear(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getMonth(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getDisposalMethod(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getDisposedBy(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getBagOpenedOn(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getReason(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getRequestedBy(), cellStyle);
//						createCell(nestedRow, nestedColumnCount++, details.getApprovedBy(), cellStyle);
//						createCell(nestedRow, nestedColumnCount++, details.getReceivedBy(), cellStyle);
						createCell(nestedRow, nestedColumnCount++, details.getRemarks(), cellStyle);
	 
					}
				} else {
					// Add empty cells for RollConsumptionDetails if none exist
					for (int i = 0; i < 10; i++) {
						createCell(valueRow, childColumn + i, "", cellStyle);
					}
				}
	 
			}
		}

			
}
