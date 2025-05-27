package com.focusr.Precot.util.Qc;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.sql.SQLException;
import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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
import com.focusr.Precot.mssql.database.model.QcAudit.DisposalRecordHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobilogyTestF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobilogyTestF006History;
import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.RequistionHistoryF029;
import com.focusr.Precot.mssql.database.model.QcAudit.briquettesanalysisreportHistoryARF014;
import com.focusr.Precot.mssql.database.model.QcAudit.exfoliatingfabricanalysisreportHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.finishedproductanalysisreporthistory;
import com.focusr.Precot.mssql.database.model.QcAudit.fumigationARF011History;
import com.focusr.Precot.mssql.database.model.QcAudit.fungalIncubatorReportHistoryCLF013;
import com.focusr.Precot.mssql.database.model.QcAudit.mediaDisposalHistoryCLF022;
import com.focusr.Precot.mssql.database.model.QcAudit.microbiologicalAnalyisisReportHistoryF20;
import com.focusr.Precot.mssql.database.model.QcAudit.microbiologicalTestHistoryF002;
import com.focusr.Precot.mssql.database.model.QcAudit.non_woven_F005_history;
import com.focusr.Precot.mssql.database.model.QcAudit.obervationHistoryCLF007;
import com.focusr.Precot.mssql.database.model.QcAudit.observationArF011History;
import com.focusr.Precot.mssql.database.model.QcAudit.observationF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.observationsF006history;
import com.focusr.Precot.mssql.database.model.QcAudit.potableWaterARF013ReportHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.temperatureRelativeHistoryF018;
import com.focusr.Precot.mssql.database.model.QcAudit.turbiditycalibrationreportHistoryCLF009;
import com.focusr.Precot.mssql.database.model.QcAudit.validationAutoclaveHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.weighingscalecalibrationreportHistoryCLF007;
import com.focusr.Precot.mssql.database.repository.Qc.audit.DisposalRecordHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.RequistionHistoryF029Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.absorbentbleachedcottonreportCLF005ParenthistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.briquettesanalysisreportHistoryARF014Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.exfoliatingfabricanalysisreportHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.finishedproductanalysisreportHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.fumigationARF011HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.fungalIncubatorReportHistoryCLF013Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.mediaDisposalHistoryCLF022Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.microbiologicalAnalyisisReportF20HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.non_woven_F005HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.potableWaterARF013ReportHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.qcphysicalTestRepohistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.spectrophotometerReportHistoryClF011Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.temperatureRelativeHistoryF018Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.turbiditycalibrationreportHistoryCLF009Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.validationAutoclaveHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.weighingscalecalibrationreportCLF007HistoryRepo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.QAQCObservationOutput;

@Service
public class qcAutitservice8 {

	@Autowired
	exfoliatingfabricanalysisreportHistoryRepo exfoHistoryRepo;

	@Autowired
	qcphysicalTestRepohistory qcphysicalTestRepohistory;

	@Autowired
	weighingscalecalibrationreportCLF007HistoryRepo weighingscalecalibrationreportHistoryCLF007repo;

	@Autowired
	private finishedproductanalysisreportHistoryRepo finishedproductanalysisreporthistory;

	@Autowired
	fumigationARF011HistoryRepo fumigationARF011HistoryRepo;

	@Autowired
	potableWaterARF013ReportHistoryRepo potableWaterARF013ReportHistoryRepo;

	@Autowired
	briquettesanalysisreportHistoryARF014Repo briquettesanalysisreportHistoryARF014Repo;
	
	@Autowired
	non_woven_F005HistoryRepo non_woven_F005HistoryRepo;
	
	@Autowired
	absorbentbleachedcottonreportCLF005ParenthistoryRepo absorbentbleachedcottonreportCLF005ParenthistoryRepo;
	
	@Autowired
	turbiditycalibrationreportHistoryCLF009Repo turbiditycalibrationreportHistoryCLF009Repo;
	
	@Autowired
	spectrophotometerReportHistoryClF011Repo spectrophotometerReportHistoryClF011Repo;
	
	@Autowired
	fungalIncubatorReportHistoryCLF013Repo fungalIncubatorReportHistoryCLF013Repo;
	
	@Autowired
	DisposalRecordHistoryRepo DisposalRecordHistoryRepo;
	
	@Autowired
	RequistionHistoryF029Repo RequistionHistoryF029Repo;
	
	@Autowired
	mediaDisposalHistoryCLF022Repo mediaDisposalHistoryCLF022Repo;
	
	@Autowired
	microbiologicalAnalyisisReportF20HistoryRepo microbiologicalAnalyisisReportF20HistoryRepo;
	
	@Autowired
	temperatureRelativeHistoryF018Repo temperatureRelativeHistoryF018Repo;
	
	@Autowired
	validationAutoclaveHistoryRepo validationAutoclaveHistoryRepo;
	

//	String[] skipValues = { "test_id", "micro_id", "obs_id", "qAqcObservations", "microbiologicalTest", "lab_id",
//			"physicalandchemicaltest", "MICROBIOLOGICAL TEST", "QAQC OBSERVATIONS", "observations",
//			"microbilogytestf004", "exfoliatingfabricanalysisreporthistory", "microbilogytestf006",
//			"finishedproductanalysisreportF006", "obser", "weighingscalecalibrationreportCLF007", "created_at",
//			"updated_at", "created_by", "updated_by", "qc_", "chemist_", "micro_", "fumigationARF011","CREATED BY","UPDATED BY","UPDATED AT" ,"CREATED AT"};

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



	public String rearrangeDate(String inputDate) {
		// Split the input date by "-"
		String[] dateParts = inputDate.split("-");

		// Rearrange the parts to "dd-MM-yyyy"
		String rearrangedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

		return rearrangedDate;
	}

	
	public ResponseEntity<?> downloadExcel(String batch, String fromdate, String todate, HttpServletResponse response)
	        throws SQLException, IOException, JSONException, ParseException {

	    ObjectMapper objectMapper = new ObjectMapper();
	    fromdate = fromdate != null ? rearrangeDate(fromdate) : fromdate;
	    todate = todate != null ? rearrangeDate(todate) : todate;
	    List<PHYSICALANDCHEMICALTESTHistory> invoices = new ArrayList<>();

	    if (fromdate == null && todate == null && batch == null ) {
	        invoices = qcphysicalTestRepohistory.audit();
	    } else {
	        invoices = qcphysicalTestRepohistory.audit(batch, fromdate, todate);
	    }

	    if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
	    String filename = "";
	    ArrayNode jsonArray = objectMapper.valueToTree(invoices);

	    // Create a Workbook
	    Workbook workbook = new XSSFWorkbook();
	    Sheet sheet = workbook.createSheet("Precot");

	    // Create header row with bold font and background color
	    Row headerRow = sheet.createRow(0);
	    JsonNode firstInvoice = jsonArray.get(0);
	    int colIndex = 0;

	    CellStyle headerStyle = workbook.createCellStyle();
	    Font headerFont = workbook.createFont();
	    headerFont.setBold(true);
	    headerStyle.setFont(headerFont);

	    Map<Integer, Integer> columnWidths = new HashMap<>();

	    // Write parent entity fields (PHYSICALANDCHEMICALTESTHistory)
	    for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext();) {
	        String fieldName = convertCamelCaseToUpperCase(it.next()); 
	        if (fieldName.isEmpty()) {
	            continue;
	        }
	        Cell cell = headerRow.createCell(colIndex);
	        cell.setCellValue(fieldName);
	        cell.setCellStyle(headerStyle);

	        columnWidths.put(colIndex, Math.max(fieldName.length() * 256, 3000)); 
	        colIndex++;
	    }

	    // Child entity field names
	    List<String> childEntity1Fields = getFieldNames(QAQCObservationOutput.class); 
	    List<String> childEntity2Fields = getFieldNames(microbiologicalTestHistoryF002.class); 

	    for (String childField : childEntity1Fields) {
	        String headerName = convertCamelCaseToUpperCase(childField);
	        if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
	            continue;
	        }
	        Cell cell = headerRow.createCell(colIndex);
	        cell.setCellValue(convertCamelCaseToUpperCase(childField));
	        cell.setCellStyle(headerStyle);
	        columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000)); 
	        colIndex++;
	    }

	    for (String childField : childEntity2Fields) {
	        String headerName = convertCamelCaseToUpperCase(childField);
	        if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
	            continue;
	        }
	        Cell cell = headerRow.createCell(colIndex);
	        cell.setCellValue(convertCamelCaseToUpperCase(childField));
	        cell.setCellStyle(headerStyle);
	        columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000));
	        colIndex++;
	    }

	    // Start writing data
	    int currentRow = 1; // Start after the headero

	    for (int i = 0; i < jsonArray.size(); i++) {
	        JsonNode invoice = jsonArray.get(i);
	        int parentRow = currentRow; // Keep track of where the parent starts
	        Row row = sheet.createRow(parentRow);
	        colIndex = 0;

	        // Write parent entity data
	        for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext();) {
	            Map.Entry<String, JsonNode> field = fields.next();
	            String headerName = convertCamelCaseToUpperCase(field.getKey());
	            if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
	                continue; 
	            }
	            Cell cell = row.createCell(colIndex);
	            String value = field.getValue().asText()!=null?field.getValue().asText().toString():"";
	            if (field.getKey().equalsIgnoreCase("format")) {
	                filename = field.getValue().asText()!=null?field.getValue().asText().toString():"";
	            }
	            cell.setCellValue(value);
	            int lengthInCharacters = value.length();
	            int currentMaxWidth = columnWidths.getOrDefault(colIndex, 3000);
	            columnWidths.put(colIndex, Math.max(lengthInCharacters * 256, currentMaxWidth)); 
	            colIndex++;
	        }

	        // Write child entity 1 (List<QAQCObservationOutput>) data
	        JsonNode childEntity1List = invoice.path("qaqcObservations"); 
	        int maxRows = parentRow; 
	        if (childEntity1List != null && childEntity1List.isArray()) {
	            for (int j = 0; j < childEntity1List.size(); j++) {
	                JsonNode childEntity1 = childEntity1List.get(j);
	                Row childRow = (j == 0) ? row : sheet.createRow(parentRow + j); 
	                int childColIndex = colIndex; 
	                for (String childField : childEntity1Fields) {
	                    Cell cell = childRow.createCell(childColIndex);
	                    String childValue = childEntity1.path(childField).asText();
	                    cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");
	                    int lengthInCharacters = childValue != null ? childValue.length() : 0;
	                    int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
	                    columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));
	                    childColIndex++;
	                }
	            }
	            maxRows = Math.max(maxRows, parentRow + childEntity1List.size() - 1); 
	        }

	        // Write child entity 2 (List<microbiologicalTestHistoryF002>) data
	        JsonNode childEntity2List = invoice.path("microbiologicalTest"); 
	        if (childEntity2List != null && childEntity2List.isArray()) {
	            for (int k = 0; k < childEntity2List.size(); k++) {
	                JsonNode childEntity2 = childEntity2List.get(k);
	                Row childRow = (k == 0 && maxRows == parentRow) ? row : sheet.createRow(maxRows + k); 
	                int childColIndex = colIndex + childEntity1Fields.size(); 
	                for (String childField : childEntity2Fields) {
	                    Cell cell = childRow.createCell(childColIndex);
	                    String childValue = childEntity2.path(childField).asText();
	                    cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");
	                    int lengthInCharacters = childValue != null ? childValue.length() : 0;
	                    int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
	                    columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));
	                    childColIndex++;
	                }
	            }
	            maxRows = Math.max(maxRows, maxRows + childEntity2List.size() - 1); 
	        }

	        // Move to the next parent after the last child row
	        currentRow = maxRows + 1; 
	    }

	    // Apply column widths after writing the data
	    for (Map.Entry<Integer, Integer> entry : columnWidths.entrySet()) {
	        sheet.setColumnWidth(entry.getKey(), Math.min(entry.getValue(), 10000)); 
	    }

	    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
	    try {
	        workbook.write(byteArrayOutputStream);
	    } finally {
	        workbook.close(); 
	    }

	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
	    headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
	    
	    headers.set("Content-Disposition", "attachment; filename=\"absorbent_bleached_cotton_analysis_report.xlsx\"");
	    return ResponseEntity.ok().headers(headers).body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
	}

	
	
	


	public ResponseEntity<?> downloadExcel02(String batch, String fromdate, String todate, HttpServletResponse response)
			throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();

		
		
		List<exfoliatingfabricanalysisreportHistory> invoices = new ArrayList<>();
		
		if( fromdate == null && todate == null && batch == null ) {
			invoices = exfoHistoryRepo.audit();
		}else {
			invoices = exfoHistoryRepo.audit(batch, fromdate, todate);
		}
//
		
		if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
		String filename = "";

		ArrayNode jsonArray = objectMapper.valueToTree(invoices);

		// Create a Workbook
		Workbook workbook = new XSSFWorkbook();
		// Create a Sheet
		Sheet sheet = workbook.createSheet("Precot");

		// Create header row with bold font and background color
		Row headerRow = sheet.createRow(0);
		JsonNode firstInvoice = jsonArray.get(0);
		int colIndex = 0;

		// Create a bold font style for the header with background color
		CellStyle headerStyle = workbook.createCellStyle();
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerStyle.setFont(headerFont);

		// Track maximum width for each column
		Map<Integer, Integer> columnWidths = new HashMap<>();

		// Write parent entity fields (PHYSICALANDCHEMICALTESTHistory)
		for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext();) {
			String fieldName = convertCamelCaseToUpperCase(it.next()); // Capitalize the header text
			if (fieldName.isEmpty()) {
				continue; // Skip empty names
			}
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(fieldName);
			cell.setCellStyle(headerStyle); // Apply the bold style with background color

			// Set initial column width based on header length (characters * 256 = width in
			// Excel units)
			columnWidths.put(colIndex, Math.max(fieldName.length() * 256, 3000)); // Minimum 3000 units wide
			colIndex++;
		}

		// Use reflection to dynamically get child entity field names
		List<String> childEntity1Fields = getFieldNames(observationF004History.class); // Replace with your actual class
		List<String> childEntity2Fields = getFieldNames(MicrobilogyTestF004History.class); // Replace with your actual
																							// class

		// Add child entity fields to the header
		for (String childField : childEntity1Fields) {

			String headerName = convertCamelCaseToUpperCase(childField);
			if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
				continue; // Skip this field
			}
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000)); // Ensure minimum column width
			colIndex++;
		}

		for (String childField : childEntity2Fields) {
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000));
			colIndex++;
		}

		// Create data rows for each invoice (parent entity and child entities)
		for (int i = 0; i < jsonArray.size(); i++) {
			JsonNode invoice = jsonArray.get(i);
			int startingRow = i + 1;
			Row row = sheet.createRow(startingRow);
			colIndex = 0;

			// Write parent entity data
			for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext();) {
				Map.Entry<String, JsonNode> field = fields.next();
				String headerName = convertCamelCaseToUpperCase(field.getKey());
				if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
					continue; // Skip this field
				}
				Cell cell = row.createCell(colIndex);
				String value = field.getValue().asText()!=null?field.getValue().asText().toString():"";
				if (field.getKey().equalsIgnoreCase("format")) {
					filename = field.getValue().asText()!=null?field.getValue().asText().toString():"";
				}
				cell.setCellValue(value);

				// Calculate and update maximum column width
				int lengthInCharacters = value.length();
				int currentMaxWidth = columnWidths.getOrDefault(colIndex, 3000);
				columnWidths.put(colIndex, Math.max(lengthInCharacters * 256, currentMaxWidth)); // Update width

				colIndex++;
			}

			// Write child entity 1 (List<QAqcObservationsHistory>) data dynamically
			JsonNode childEntity1List = invoice.path("observations"); // Ensure this field matches your entity's field
																		// name
			int maxRows = startingRow;
			if (childEntity1List != null && childEntity1List.isArray()) {
				for (int j = 0; j < childEntity1List.size(); j++) {
					JsonNode childEntity1 = childEntity1List.get(j);
					Row childRow = (j == 0) ? row : sheet.createRow(startingRow + j); // Use existing row or create new
					int childColIndex = colIndex; // Ensure child columns are written after parent columns
					for (String childField : childEntity1Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity1.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, startingRow + childEntity1List.size() - 1); // Update the max row index
			}

			// Write child entity 2 (List<microbiologicalTestHistoryF002>) data dynamically
			JsonNode childEntity2List = invoice.path("microbilogytestf004"); // Ensure this field matches your entity's
																				// field name
			if (childEntity2List != null && childEntity2List.isArray()) {
				for (int k = 0; k < childEntity2List.size(); k++) {
					JsonNode childEntity2 = childEntity2List.get(k);
					Row childRow = (k == 0 && maxRows == startingRow) ? row : sheet.createRow(maxRows + k); // Create
																											// new row
																											// if needed
					int childColIndex = colIndex + childEntity1Fields.size(); // Ensure columns come after previous
																				// child
					for (String childField : childEntity2Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity2.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, maxRows + childEntity2List.size() - 1); // Update max row index again
			}

			// Move to the next parent record, ensuring proper row advancement
			i = maxRows - 1; // Adjust i to handle expanded rows from child entities
		}

		// Apply column widths after writing the data
		for (Map.Entry<Integer, Integer> entry : columnWidths.entrySet()) {
			sheet.setColumnWidth(entry.getKey(), Math.min(entry.getValue(), 10000)); // Cap column width to avoid
																						// excessive width
		}

		// Set the content type and attachment header
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
			workbook.write(byteArrayOutputStream);
		} finally {
			workbook.close(); // Ensure the workbook is closed
		}

		// Set headers and return the file in the ResponseEntity
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));

		return ResponseEntity.ok().headers(headers).body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));

	}

//	public String convertCamelCaseToUpperCase(String text) {
//		// Insert a space before each uppercase letter (except for the first one)
//		String withSpaces = text.replaceAll("([a-z])([A-Z])", "$1 $2");
//
//		// Convert the entire string to uppercase
//		List<String> skipList = Arrays.asList(skipValues);
//		boolean isthere = false; // Reset for each field
//
//		// Check if field name matches any in skipValues
//		for (String skipValue : skipList) {
//			if (skipValue.trim().equalsIgnoreCase(withSpaces.toUpperCase()) || skipValue.trim().contains(withSpaces)) {
//				isthere = true;
//				break; // No need to check further if we found a match
//			}
//		}
//
//		if (!isthere) { // Add field name if it's not in skipValues
//			return withSpaces.toUpperCase();
//		}
//
//		return "";
//	}
	
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


	public List<String> getFieldNames(Class<?> clazz) {
		List<String> fieldNames = new ArrayList<>();
		List<String> skipList = Arrays.asList(skipValues); // Convert the array to a list for easy comparison

		for (Field field : clazz.getDeclaredFields()) {
			String fieldName = field.getName();
			boolean isthere = false; // Reset for each field

			// Check if field name matches any in skipValues
			for (String skipValue : skipList) {
				if (skipValue.trim().equalsIgnoreCase(fieldName.toUpperCase())) {
					isthere = true;
					break; // No need to check further if we found a match
				}
			}

			if (!isthere) { // Add field name if it's not in skipValues
				fieldNames.add(fieldName);
			}
		}
		return fieldNames;
	}

	public ResponseEntity<?> downloadExcel04(String batch, String fromdate, String todate, HttpServletResponse response)
			throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();

		
		
		List<finishedproductanalysisreporthistory> invoices = new ArrayList<>();
				
		//
		
		if( fromdate == null && todate == null && batch == null ) {
			invoices = finishedproductanalysisreporthistory.audit();
		}else {
			invoices = finishedproductanalysisreporthistory.audit(batch,fromdate, todate);
		}
		
		if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
		String filename = "";

		ArrayNode jsonArray = objectMapper.valueToTree(invoices);

		// Create a Workbook
		Workbook workbook = new XSSFWorkbook();
		// Create a Sheet
		Sheet sheet = workbook.createSheet("finishedproductanalysisreporthistory");

		// Create header row with bold font and background color
		Row headerRow = sheet.createRow(0);
		JsonNode firstInvoice = jsonArray.get(0);
		int colIndex = 0;

		// Create a bold font style for the header with background color
		CellStyle headerStyle = workbook.createCellStyle();
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerStyle.setFont(headerFont);

		// Track maximum width for each column
		Map<Integer, Integer> columnWidths = new HashMap<>();

		// Write parent entity fields (PHYSICALANDCHEMICALTESTHistory)
		for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext();) {
			String fieldName = convertCamelCaseToUpperCase(it.next()); // Capitalize the header text
			if (fieldName.isEmpty()) {
				continue; // Skip empty names
			}
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(fieldName);
			cell.setCellStyle(headerStyle); // Apply the bold style with background color

			// Set initial column width based on header length (characters * 256 = width in
			// Excel units)
			columnWidths.put(colIndex, Math.max(fieldName.length() * 256, 3000)); // Minimum 3000 units wide
			colIndex++;
		}

		// Use reflection to dynamically get child entity field names
		List<String> childEntity1Fields = getFieldNames(observationsF006history.class); // Replace with your actual
																						// class
		List<String> childEntity2Fields = getFieldNames(MicrobilogyTestF006History.class); // Replace with your actual
																							// class

		// Add child entity fields to the header
		for (String childField : childEntity1Fields) {
			String headerName = convertCamelCaseToUpperCase(childField);
			if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
				continue; // Skip this field
			}
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000)); // Ensure minimum column width
			colIndex++;
		}

		for (String childField : childEntity2Fields) {
			String headerName = convertCamelCaseToUpperCase(childField);
			if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
				continue; // Skip this field
			}
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000));
			colIndex++;
		}

		// Create data rows for each invoice (parent entity and child entities)
		for (int i = 0; i < jsonArray.size(); i++) {
			JsonNode invoice = jsonArray.get(i);
			int startingRow = i + 1;
			Row row = sheet.createRow(startingRow);
			colIndex = 0;

			// Write parent entity data
			for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext();) {
				Map.Entry<String, JsonNode> field = fields.next();
				String headerName = convertCamelCaseToUpperCase(field.getKey());
				if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
					continue; // Skip this field
				}
				Cell cell = row.createCell(colIndex);
				String value = field.getValue().asText()!=null?field.getValue().asText().toString():"";
				if (field.getKey().equalsIgnoreCase("format")) {
					filename = field.getValue().asText()!=null?field.getValue().asText().toString():"";
				}
				cell.setCellValue(value);

				// Calculate and update maximum column width
				int lengthInCharacters = value.length();
				int currentMaxWidth = columnWidths.getOrDefault(colIndex, 3000);
				columnWidths.put(colIndex, Math.max(lengthInCharacters * 256, currentMaxWidth)); // Update width

				colIndex++;
			}

			// Write child entity 1 (List<QAqcObservationsHistory>) data dynamically
			JsonNode childEntity1List = invoice.path("observations"); // Ensure this field matches your entity's field
																		// name
			int maxRows = startingRow;
			if (childEntity1List != null && childEntity1List.isArray()) {
				for (int j = 0; j < childEntity1List.size(); j++) {
					JsonNode childEntity1 = childEntity1List.get(j);
					Row childRow = (j == 0) ? row : sheet.createRow(startingRow + j); // Use existing row or create new
					int childColIndex = colIndex; // Ensure child columns are written after parent columns
					for (String childField : childEntity1Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity1.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, startingRow + childEntity1List.size() - 1); // Update the max row index
			}

			// Write child entity 2 (List<microbiologicalTestHistoryF002>) data dynamically
			JsonNode childEntity2List = invoice.path("microbilogytestf006"); // Ensure this field matches your entity's
																				// field name
			if (childEntity2List != null && childEntity2List.isArray()) {
				for (int k = 0; k < childEntity2List.size(); k++) {
					JsonNode childEntity2 = childEntity2List.get(k);
					Row childRow = (k == 0 && maxRows == startingRow) ? row : sheet.createRow(maxRows + k); // Create
																											// new row
																											// if needed
					int childColIndex = colIndex + childEntity1Fields.size(); // Ensure columns come after previous
																				// child
					for (String childField : childEntity2Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity2.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, maxRows + childEntity2List.size() - 1); // Update max row index again
			}

			// Move to the next parent record, ensuring proper row advancement
			i = maxRows - 1; // Adjust i to handle expanded rows from child entities
		}

		// Apply column widths after writing the data
		for (Map.Entry<Integer, Integer> entry : columnWidths.entrySet()) {
			sheet.setColumnWidth(entry.getKey(), Math.min(entry.getValue(), 10000)); // Cap column width to avoid
																						// excessive width
		}

		// Set the content type and attachment header
		String file = filename + ".xlsx";
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + file + "\"");

		// Write the output to the response output stream
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
			workbook.write(byteArrayOutputStream);
		} finally {
			workbook.close(); // Ensure the workbook is closed
		}

		// Set headers and return the file in the ResponseEntity
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));

		return ResponseEntity.ok().headers(headers).body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));

	}
	
	//new
	public ResponseEntity<?> downloadExcel05(String batch, String fromdate, String todate, HttpServletResponse response)
	        throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();
		
		
		
	    fromdate = fromdate != null ? rearrangeDate(fromdate) : fromdate;
	    todate = todate != null ? rearrangeDate(todate) : todate;
	    List<weighingscalecalibrationreportHistoryCLF007> invoices = new ArrayList<>();

	    if (fromdate == null && todate == null && batch == null ) {
	        invoices = weighingscalecalibrationreportHistoryCLF007repo.audit();
	    } else {
	        invoices = weighingscalecalibrationreportHistoryCLF007repo.audit(batch, fromdate, todate);
	    }
		

			
		
		
		if(invoices== null || invoices.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				
		}
		 
//
		String filename = "WeighReport";

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
		                cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
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

	//old

//	public ResponseEntity<?> downloadExcel05(String batch, String fromdate, String todate, HttpServletResponse response)
//			throws SQLException, IOException, JSONException {
//
//		ObjectMapper objectMapper = new ObjectMapper();
//
//		
//		
//		List<weighingscalecalibrationreportHistoryCLF007> invoices = new ArrayList<>();
//		
//		if( fromdate == null && todate == null && batch == null && reg == null) {
//			invoices = weighingscalecalibrationreportHistoryCLF007repo.audit();
//		}else {
//			invoices = weighingscalecalibrationreportHistoryCLF007repo
//					.audit(batch, fromdate, todate);
//		}
//		
//		if(invoices== null || invoices.isEmpty()) {
//			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
//		
//}
// 
//		//
//		String filename = "";
//
//		ArrayNode jsonArray = objectMapper.valueToTree(invoices);
//
//		// Create a Workbook
//		Workbook workbook = new XSSFWorkbook();
//		// Create a Sheet
//		Sheet sheet = workbook.createSheet("weighingscalecalibrationreportHistory");
//
//		// Create header row with bold font and background color
//		Row headerRow = sheet.createRow(0);
//		JsonNode firstInvoice = jsonArray.get(0);
//		int colIndex = 0;
//
//		// Create a bold font style for the header with background color
//		CellStyle headerStyle = workbook.createCellStyle();
//		Font headerFont = workbook.createFont();
//		headerFont.setBold(true);
//		headerStyle.setFont(headerFont);
//
//		// Track maximum width for each column
//		Map<Integer, Integer> columnWidths = new HashMap<>();
//
//		// Write parent entity fields (PHYSICALANDCHEMICALTESTHistory)
//		for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext();) {
//			String fieldName = convertCamelCaseToUpperCase(it.next()); // Capitalize the header text
//			if (fieldName.isEmpty()) {
//				continue; // Skip empty names
//			}
//			Cell cell = headerRow.createCell(colIndex);
//			cell.setCellValue(fieldName);
//			cell.setCellStyle(headerStyle); // Apply the bold style with background color
//
//			// Set initial column width based on header length (characters * 256 = width in
//			// Excel units)
//			columnWidths.put(colIndex, Math.max(fieldName.length() * 256, 3000)); // Minimum 3000 units wide
//			colIndex++;
//		}
//
//		// Use reflection to dynamically get child entity field names
//		List<String> childEntity1Fields = getFieldNames(obervationHistoryCLF007.class); // Replace with your actual
//																						// class
////	    	List<String> childEntity2Fields = getFieldNames(MicrobilogyTestF006History.class);  // Replace with your actual class
//
//		// Add child entity fields to the header
//		for (String childField : childEntity1Fields) {
//			String headerName = convertCamelCaseToUpperCase(childField);
//			if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
//				continue; // Skip this field
//			}
//			Cell cell = headerRow.createCell(colIndex);
//			cell.setCellValue(convertCamelCaseToUpperCase(childField));
//			cell.setCellStyle(headerStyle);
//
//			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000)); // Ensure minimum column width
//			colIndex++;
//		}
//
//		// Create data rows for each invoice (parent entity and child entities)
//		for (int i = 0; i < jsonArray.size(); i++) {
//			JsonNode invoice = jsonArray.get(i);
//			int startingRow = i + 1;
//			Row row = sheet.createRow(startingRow);
//			colIndex = 0;
//
//			// Write parent entity data
//			for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext();) {
//				Map.Entry<String, JsonNode> field = fields.next();
//				String headerName = convertCamelCaseToUpperCase(field.getKey());
//				if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
//					continue; // Skip this field
//				}
//				Cell cell = row.createCell(colIndex);
//				String value = field.getValue().asText()!=null?field.getValue().asText().toString():"";
//				if (field.getKey().equalsIgnoreCase("format")) {
//					filename = field.getValue().asText()!=null?field.getValue().asText().toString():"";
//				}
//				cell.setCellValue(value);
//
//				// Calculate and update maximum column width
//				int lengthInCharacters = value.length();
//				int currentMaxWidth = columnWidths.getOrDefault(colIndex, 3000);
//				columnWidths.put(colIndex, Math.max(lengthInCharacters * 256, currentMaxWidth)); // Update width
//
//				colIndex++;
//			}
//
//			// Write child entity 1 (List<QAqcObservationsHistory>) data dynamically
//			JsonNode childEntity1List = invoice.path("obser"); // Ensure this field matches your entity's field name
//			int maxRows = startingRow;
//			if (childEntity1List != null && childEntity1List.isArray()) {
//				for (int j = 0; j < childEntity1List.size(); j++) {
//					JsonNode childEntity1 = childEntity1List.get(j);
//					Row childRow = (j == 0) ? row : sheet.createRow(startingRow + j); // Use existing row or create new
//					int childColIndex = colIndex; // Ensure child columns are written after parent columns
//					for (String childField : childEntity1Fields) {
//						Cell cell = childRow.createCell(childColIndex);
//						String childValue = childEntity1.path(childField).asText();
//						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");
//
//						// Update column width based on child data length
//						int lengthInCharacters = childValue != null ? childValue.length() : 0;
//						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
//						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));
//
//						childColIndex++;
//					}
//				}
//				maxRows = Math.max(maxRows, startingRow + childEntity1List.size() - 1); // Update the max row index
//			}
//
//			// Write child entity 2 (List<microbiologicalTestHistoryF002>) data dynamically
//
//			// Move to the next parent record, ensuring proper row advancement
//			i = maxRows - 1; // Adjust i to handle expanded rows from child entities
//		}
//
//		// Apply column widths after writing the data
//		for (Map.Entry<Integer, Integer> entry : columnWidths.entrySet()) {
//			sheet.setColumnWidth(entry.getKey(), Math.min(entry.getValue(), 10000)); // Cap column width to avoid
//																						// excessive width
//		}
//
//		// Set the content type and attachment header
//		String file = filename + ".xlsx";
//		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//		response.setHeader("Content-Disposition", "attachment; filename=\"" + file + "\"");
//
//		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//		try {
//			workbook.write(byteArrayOutputStream);
//		} finally {
//			workbook.close(); // Ensure the workbook is closed
//		}
//
//		// Set headers and return the file in the ResponseEntity
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//		headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
//
//		return ResponseEntity.ok().headers(headers).body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
//	}

	public ResponseEntity<?> downloadExcel06(String batch, String fromdate, String todate, HttpServletResponse response)
			throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();
		
		

		List<fumigationARF011History> invoices = fumigationARF011HistoryRepo.audit(batch, fromdate, todate);
		
		if( fromdate == null && todate == null && batch == null ) {
			invoices = fumigationARF011HistoryRepo.audit();
		}else {
			invoices = fumigationARF011HistoryRepo.audit(batch, fromdate, todate);
		}
		
		if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
		//
		String filename = "";

		ArrayNode jsonArray = objectMapper.valueToTree(invoices);

		// Create a Workbook
		Workbook workbook = new XSSFWorkbook();
		// Create a Sheet
		Sheet sheet = workbook.createSheet("fumigationARF011History");

		// Create header row with bold font and background color
		Row headerRow = sheet.createRow(0);
		JsonNode firstInvoice = jsonArray.get(0);
		int colIndex = 0;

		// Create a bold font style for the header with background color
		CellStyle headerStyle = workbook.createCellStyle();
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerStyle.setFont(headerFont);

		// Track maximum width for each column
		Map<Integer, Integer> columnWidths = new HashMap<>();

		// Write parent entity fields (PHYSICALANDCHEMICALTESTHistory)
		for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext();) {
			String fieldName = convertCamelCaseToUpperCase(it.next()); // Capitalize the header text
			if (fieldName.isEmpty()) {
				continue; // Skip empty names
			}
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(fieldName);
			cell.setCellStyle(headerStyle); // Apply the bold style with background color

			// Set initial column width based on header length (characters * 256 = width in
			// Excel units)
			columnWidths.put(colIndex, Math.max(fieldName.length() * 256, 3000)); // Minimum 3000 units wide
			colIndex++;
		}

		// Use reflection to dynamically get child entity field names
		List<String> childEntity1Fields = getFieldNames(observationArF011History.class); // Replace with your actual
																							// class
//	    	List<String> childEntity2Fields = getFieldNames(MicrobilogyTestF006History.class);  // Replace with your actual class

		// Add child entity fields to the header
		for (String childField : childEntity1Fields) {
			String headerName = convertCamelCaseToUpperCase(childField);
			if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
				continue; // Skip this field
			}
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000)); // Ensure minimum column width
			colIndex++;
		}

		// Create data rows for each invoice (parent entity and child entities)
		for (int i = 0; i < jsonArray.size(); i++) {
			JsonNode invoice = jsonArray.get(i);
			int startingRow = i + 1;
			Row row = sheet.createRow(startingRow);
			colIndex = 0;

			// Write parent entity data
			for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext();) {
				Map.Entry<String, JsonNode> field = fields.next();
				String headerName = convertCamelCaseToUpperCase(field.getKey());
				if (headerName.isEmpty() || Arrays.asList(skipValues).contains(headerName.toUpperCase())) {
					continue; // Skip this field
				}
				Cell cell = row.createCell(colIndex);
				String value = field.getValue().asText()!=null?field.getValue().asText().toString():"";
				if (field.getKey().equalsIgnoreCase("format")) {
					filename = field.getValue().asText()!=null?field.getValue().asText().toString():"";
				}
				cell.setCellValue(value);

				// Calculate and update maximum column width
				int lengthInCharacters = value.length();
				int currentMaxWidth = columnWidths.getOrDefault(colIndex, 3000);
				columnWidths.put(colIndex, Math.max(lengthInCharacters * 256, currentMaxWidth)); // Update width

				colIndex++;
			}

			// Write child entity 1 (List<QAqcObservationsHistory>) data dynamically
			JsonNode childEntity1List = invoice.path("observationArF011"); // Ensure this field matches your entity's
																			// field name
			int maxRows = startingRow;
			if (childEntity1List != null && childEntity1List.isArray()) {
				for (int j = 0; j < childEntity1List.size(); j++) {
					JsonNode childEntity1 = childEntity1List.get(j);
					Row childRow = (j == 0) ? row : sheet.createRow(startingRow + j); // Use existing row or create new
					int childColIndex = colIndex; // Ensure child columns are written after parent columns
					for (String childField : childEntity1Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity1.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, startingRow + childEntity1List.size() - 1); // Update the max row index
			}

			// Write child entity 2 (List<microbiologicalTestHistoryF002>) data dynamically

			// Move to the next parent record, ensuring proper row advancement
			i = maxRows - 1; // Adjust i to handle expanded rows from child entities
		}

		// Apply column widths after writing the data
		for (Map.Entry<Integer, Integer> entry : columnWidths.entrySet()) {
			sheet.setColumnWidth(entry.getKey(), Math.min(entry.getValue(), 10000)); // Cap column width to avoid
																						// excessive width
		}

		// Set the content type and attachment header
		String file = filename + ".xlsx";
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + file + "\"");

		// Write the output to the response output stream
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
			workbook.write(byteArrayOutputStream);
		} finally {
			workbook.close(); // Ensure the workbook is closed
		}

		// Set headers and return the file in the ResponseEntity
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));

		return ResponseEntity.ok().headers(headers).body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
	}

	public ResponseEntity<?> downloadExcel07(String batch, String fromdate, String todate, HttpServletResponse response)
			throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();

		List<potableWaterARF013ReportHistory> invoices = new ArrayList<>();
		
		if((fromdate!=null && todate!=null) && fromdate == todate) {
			invoices = potableWaterARF013ReportHistoryRepo.audit(fromdate);
		}else {
			invoices = potableWaterARF013ReportHistoryRepo.audit(fromdate, todate);
		}

			
		
		
		if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
//
		String filename = "potableWaterReport";

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
		                cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
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


	
	public ResponseEntity<?> downloadExcel08(String batch, String reg, String fromdate, String todate,
	        HttpServletResponse response) throws SQLException, IOException, JSONException {
		


		ObjectMapper objectMapper = new ObjectMapper();
	
				
	    List<briquettesanalysisreportHistoryARF014> invoices = new ArrayList<>();

	if((fromdate!=null && todate!=null) && fromdate == todate) {
		invoices = briquettesanalysisreportHistoryARF014Repo.audit(fromdate,batch);
	}else {
		invoices = briquettesanalysisreportHistoryARF014Repo.audit(batch, reg, fromdate, todate);
	}
	        
	    

	    if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
		 
//
		String filename = "briquettesanalysisreport";

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
		                if(field.getKey().equalsIgnoreCase("TESTED_SIGN_DATE") ){
		                	String dbDateTime = invoice.get("chemist_submit_on").asText();
		                   	String formattedDateTime = formatTimestamp(dbDateTime);
		                	cell.setCellValue(formattedDateTime);
		                }
		                else if(field.getKey().equalsIgnoreCase("TESTED_SIGN") ){
		                	String dbDateTime = invoice.get("chemist_sign").asText();
		                   	
		                	cell.setCellValue(dbDateTime);
		                }
		                
		                else if (field.getKey().equalsIgnoreCase("APPROVED_DATE")) {
		                	

		                	String dbDateTime = invoice.get("qc_submit_on").asText(); // e.g., "2024-09-26 19:49:05.6110000"
//		                	DateTimeFormatter dbFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSSS"); // Match the format of your database string
//		                	LocalDateTime dateTime = LocalDateTime.parse(dbDateTime, dbFormatter);
//
//		                	// Format it to a readable string for Excel
//		                	DateTimeFormatter excelFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		                	String formattedDateTime = formatTimestamp(dbDateTime);
		                	cell.setCellValue(formattedDateTime);
		                
		                }
		                
		                else if (field.getKey().equalsIgnoreCase("APPROVED_SIGN")) {
		                	

		                	String dbDateTime = invoice.get("qc_sign").asText(); // e.g., "2024-09-26 19:49:05.6110000"

		                	cell.setCellValue(dbDateTime);
		                
		                }
		                
		                else if (field.getKey().equalsIgnoreCase("TESTED_SIGN_DATE")) {
		                	String dbDateTime = invoice.get("chemist_submit_on").asText(); // e.g., "2024-09-26 19:49:05.6110000"
//		                	DateTimeFormatter dbFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSSS"); // Match the format of your database string
//		                	LocalDateTime dateTime = LocalDateTime.parse(dbDateTime, dbFormatter);
//
//		                	// Format it to a readable string for Excel
//		                	DateTimeFormatter excelFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		                	String formattedDateTime = formatTimestamp(dbDateTime);
		                	cell.setCellValue(formattedDateTime);
		                }

		                else if (field.getKey().equalsIgnoreCase("TESTED_BY")) {
		                	String dbDateTime = invoice.get("chemist_sign").asText(); // e.g., "2024-09-26 19:49:05.6110000"

		                	cell.setCellValue(dbDateTime);
		                }
		                
		                else if (field.getKey().equalsIgnoreCase("APPROVED_BY")) {
		                	String dbDateTime = invoice.get("qc_sign").asText(); // e.g., "2024-09-26 19:49:05.6110000"

		                	cell.setCellValue(dbDateTime);
		                }
		                else {
		                	cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
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

	


	

	public ResponseEntity<?> downloadExcel10(String batch, String fromdate, String todate,
			HttpServletResponse response) throws SQLException, IOException, JSONException {
		

		ObjectMapper objectMapper = new ObjectMapper();
		
		
		
		List<non_woven_F005_history> invoices = new ArrayList<>();
		
		if((fromdate!=null && todate!=null) && fromdate == todate) {
			
					invoices = non_woven_F005HistoryRepo.audit( fromdate,batch);
		}else {
			invoices = non_woven_F005HistoryRepo.audit(batch, fromdate, todate);
		}

		
		if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
		
		String filename = "Non_Wowen_Report";

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
		                 if(field.getKey().equalsIgnoreCase("TESTED_BY") || field.getKey().equalsIgnoreCase("TESTED_SIGN")){
			                	cell.setCellValue(invoice.get("qa_inspector_sign").asText());
			                }			                

			                else {
			                	cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
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
	
	
	public ResponseEntity<?> downloadExcel11(String batch, String fromdate, String todate,
			HttpServletResponse response) throws SQLException, IOException, JSONException {
		

		ObjectMapper objectMapper = new ObjectMapper();
		
		

		
		List<turbiditycalibrationreportHistoryCLF009> invoices = new ArrayList<>();
//

			invoices = turbiditycalibrationreportHistoryCLF009Repo.audit(batch, fromdate, todate);
		
		
		if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
		String filename = "turbidityReport";

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
		                if(field.getKey().equalsIgnoreCase("VERIFIED_BY") || field.getKey().equalsIgnoreCase("TESTED_SIGN")){
		                	cell.setCellValue(invoice.get("qc_sign").asText());
		                }
		                else if (field.getKey().equalsIgnoreCase("APPROVED_BY")|| field.getKey().equalsIgnoreCase("APPROVED_SIGN")) {
		                	cell.setCellValue(invoice.get("qc_sign").asText());
		                }
		                
		                else if (field.getKey().equalsIgnoreCase("TESTED_SIGN_DATE")) {
		                	cell.setCellValue(invoice.get("chemist_submit_on").asText());
		                }
		                
		                else if (field.getKey().equalsIgnoreCase("CHECKED_BY")) {
		                	cell.setCellValue(invoice.get("chemist_submit_by").asText());
		                }
		                
		                else if (field.getKey().equalsIgnoreCase("TESTED_SIGN_DATE")) {
		                	cell.setCellValue(invoice.get("APPROVED_DATE").asText());
		                }
		                else {
		                	cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
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
	
	
	
	
	


	

	
//	public ResponseEntity<?> downloadExcel12(String batch, String reg, String fromdate, String todate,
//			HttpServletResponse response) throws SQLException, IOException, JSONException {
//		
//
//		ObjectMapper objectMapper = new ObjectMapper();
//		
//		
//		
//		
//		List<spectrophotometerReportHistoryClF011> invoices = new ArrayList<>();
////
//		
//
//			invoices = spectrophotometerReportHistoryClF011Repo.audit(batch, fromdate, todate);
//		
//		
//		if(invoices== null || invoices.isEmpty()) {
//			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
//		
//}
// 
//		
//		String filename = "spectrophotometerReport";
//
//		 ArrayNode jsonArray = objectMapper.valueToTree(invoices);
//
//		    // Create a Workbook
//		    Workbook workbook = new XSSFWorkbook();
//		    // Create a Sheet
//		    Sheet sheet = workbook.createSheet("Precot");
//
//		    // Create a bold header row with background color
//		    Row headerRow = sheet.createRow(0);
//		    JsonNode firstInvoice = jsonArray.get(0);
//		    int headerColIndex = 0;
//
//		    // Create a bold font style for the header with background color
//		    CellStyle headerStyle = workbook.createCellStyle();
//		    Font headerFont = workbook.createFont();
//		    headerFont.setBold(true);
//		    headerStyle.setFont(headerFont);
//
//		    // Write headers, skipping fields in skipValues
//		    for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext(); ) {
//		        String fieldName = convertCamelCaseToUpperCaseformat(it.next().toUpperCase());  // Capitalize the header text
//
//		        // Skip the field if it's in the skip list
//		        if (!fieldName.isEmpty() && !isFieldInSkipValues(fieldName)) {
//		            Cell cell = headerRow.createCell(headerColIndex++);
//		            cell.setCellValue(fieldName);
//		            cell.setCellStyle(headerStyle);
//		        }
//		    }
//
//		    // Write data rows, skipping values for fields in skipValues
//		    int dataColIndex;
//		    for (int i = 0; i < jsonArray.size(); i++) {
//		        JsonNode invoice = jsonArray.get(i);
//		        Row row = sheet.createRow(i + 1);
//		        dataColIndex = 0;
//		        for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext(); ) {
//		            Map.Entry<String, JsonNode> field = fields.next();
//		            String fieldName = convertCamelCaseToUpperCase(field.getKey().toUpperCase());
//
//		            // Skip the field if it's in the skip list
//		            if (!fieldName.isEmpty() && !isFieldInSkipValues(fieldName)) {
//		                Cell cell = row.createCell(dataColIndex++);
//		                cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
//		            }
//		        }
//		    }
//
//		    // Adjust column width according to the width of the values in each cell
//		    for (int i = 0; i < headerColIndex; i++) {
//		        sheet.autoSizeColumn(i);
//		    }
//
//		    // Set the content type and attachment header
//		    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//		    response.setHeader("Content-Disposition", "attachment; filename=\"" +filename+".xlsx" + "\"");
//
//		    // Write the output to the response output stream
//		    ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//		    try {
//		        workbook.write(byteArrayOutputStream);
//		    } catch (IOException e) {
//		        e.printStackTrace();
//		    } finally {
//		        workbook.close();  // Ensure the workbook is closed even if an exception occurs
//		    }
//
//		    // Set headers and return the file in the ResponseEntity
//		    HttpHeaders headers = new HttpHeaders();
//		    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//		    headers.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
//
//		    return ResponseEntity.ok().headers(headers).body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
//	
//		
//	
//	}
	
	public ResponseEntity<?> downloadExcel13(String batch, String reg, String fromdate, String todate,
			HttpServletResponse response) throws SQLException, IOException, JSONException {
		


		ObjectMapper objectMapper = new ObjectMapper();
		
		
		
		List<fungalIncubatorReportHistoryCLF013> invoices = new ArrayList<>();
//
		if((fromdate!=null && todate!=null) && fromdate == todate) {
			invoices = fungalIncubatorReportHistoryCLF013Repo.audit(batch, fromdate);
		}else {
			invoices = fungalIncubatorReportHistoryCLF013Repo.audit(batch, fromdate, todate);
		}
			
		
		
		if(invoices== null || invoices.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				
		}
		 
//
		String filename = "fungal_report";

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
		                 if (field.getKey().equalsIgnoreCase("VERIFIED_BY")) {
		                	String dbDateTime = invoice.get("qc_sign").asText(); // e.g., "2024-09-26 19:49:05.6110000"

		                	cell.setCellValue(dbDateTime);
		                }
		                 		                 
		                 else   if (field.getKey().equalsIgnoreCase("micro_submit_by") || field.getKey().equalsIgnoreCase("checked_by")) {
			                	String dbDateTime = invoice.get("micro_sign").asText(); // e.g., "2024-09-26 19:49:05.6110000"

			                	cell.setCellValue(dbDateTime);
			                }
		                 else {
		                	cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
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
	
	
	
	
	public ResponseEntity<?> downloadExcel14 (String batch, String reg, String fromdate, String todate,
			HttpServletResponse response) throws SQLException, IOException, JSONException {
		



		ObjectMapper objectMapper = new ObjectMapper();
		
		
		
		List<DisposalRecordHistory> invoices = new ArrayList<>();
		

			invoices = DisposalRecordHistoryRepo.audit( batch,fromdate, todate);
		
		
		if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
//
		String filename = "DisposalRecordreport";

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
		                cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
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
		                	cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
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
	
	public ResponseEntity<?> downloadExcel17 (String batch,  String fromdate, String todate,
			HttpServletResponse response) throws SQLException, IOException, JSONException {


		ObjectMapper objectMapper = new ObjectMapper();
		
		
				
		List<mediaDisposalHistoryCLF022> invoices = new ArrayList<>();
		
	if((fromdate!=null && todate!=null)&&!fromdate.equalsIgnoreCase(todate)) {
		invoices = mediaDisposalHistoryCLF022Repo.audit( fromdate, todate);	
	}else if ((fromdate!=null && todate!=null)&& fromdate.equalsIgnoreCase(todate)){
		invoices = mediaDisposalHistoryCLF022Repo.audit( fromdate);
	}else {
		invoices = mediaDisposalHistoryCLF022Repo.audit();
	}
			
		
		
		if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
//
		String filename = "mediaDisposalCLF022Report";
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
		                if(field.getKey().equalsIgnoreCase("inspectedBy") || field.getKey().equalsIgnoreCase("micro_submit_by")){
		                	cell.setCellValue(invoice.get("micro_sign").asText());
		                }
		                else if (field.getKey().equalsIgnoreCase("verifiedBy")) {
		                	cell.setCellValue(invoice.get("qc_sign").asText());
		                }
		                else {
		                	cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
		                	
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
	
	public ResponseEntity<?> downloadExcel18(String batch,  String fromdate, String todate, 
		    HttpServletResponse response) throws SQLException, IOException, JSONException {

		    ObjectMapper objectMapper = new ObjectMapper();
		    

		    List<microbiologicalAnalyisisReportHistoryF20> invoices = new ArrayList<>();


		        invoices = microbiologicalAnalyisisReportF20HistoryRepo.audit(fromdate, todate);
		    

		    if (invoices == null || invoices.isEmpty()) {
		        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		    }

		    String filename = "microbiologicalAnalyisisReport.xlsx";
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
		                if(field.getKey().equalsIgnoreCase("tested_by_sign_date") || field.getKey().equalsIgnoreCase("micro_submit_by") || field.getKey().equalsIgnoreCase("TESTEDBYSIGNDATE") ){
		                	cell.setCellValue(invoice.get("micro_sign").asText());
		                }
		                else if (field.getKey().equalsIgnoreCase("approved_by_sign_date") ||  field.getKey().equalsIgnoreCase("APPROVEDBYSIGNDATE")) {
		                	cell.setCellValue(invoice.get("qc_sign").asText());
		                }
		                else {
		                	cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
		                	
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



	
	public ResponseEntity<?> downloadExcel19 (String batch, String fromdate, String todate,
			HttpServletResponse response) throws SQLException, IOException, JSONException {


		ObjectMapper objectMapper = new ObjectMapper();
		
		
		
		List<temperatureRelativeHistoryF018> invoices = new ArrayList<>();
		

			invoices = temperatureRelativeHistoryF018Repo.audit( fromdate, todate);
		
		 
//
		
		if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
		String filename = "temperatureRelativeReport";

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
	                if(field.getKey().equalsIgnoreCase("VERIFIED_BY") || field.getKey().equalsIgnoreCase("TESTED_SIGN")){
	                	cell.setCellValue(invoice.get("qc_sign").asText());
	                }
	                
	                else {
	                	cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
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
	
	public ResponseEntity<?> downloadExcel20 (String eq_id,String year,String month, String fromdate, String todate,
			HttpServletResponse response) throws SQLException, IOException, JSONException {


		ObjectMapper objectMapper = new ObjectMapper();
		
		

		
		List<validationAutoclaveHistory> invoices = new ArrayList<>();
		

		if((fromdate!=null && todate!=null) && fromdate == todate) {
			invoices = validationAutoclaveHistoryRepo.audit( eq_id,fromdate);
		}else {
			invoices = validationAutoclaveHistoryRepo.audit( eq_id,fromdate, todate ,month, year);
		}
			
		
		 
//
		
		if(invoices== null || invoices.isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		
}
 
		String filename = "validationAutoClaveReport";

		 ArrayNode jsonArray = objectMapper.valueToTree(invoices);
List<String> fied = new ArrayList<>(); 
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
		        fied.add(fieldName);
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
		                if(field.getKey().equalsIgnoreCase("TESTED_BY")){
		                	cell.setCellValue(invoice.get("chemist_sign").asText());
		                }
		                else if (field.getKey().equalsIgnoreCase("APPROVED_BY")) {
		                	cell.setCellValue(invoice.get("qc_sign").asText());
		                }
		                else {
		                	cell.setCellValue(formatTimestamp(fieldName , field.getValue().asText()));
		                	
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
	        	}else {
	        		return timestamp;
	        	}
	        

	        } catch (NumberFormatException e) {
	            System.out.println("Invalid timestamp: " + timestamp);
	            return null; // or return a default value if preferred
	        }
	    }
	   
	   
	
}
