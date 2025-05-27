package com.focusr.Precot.mssql.database.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.payload.FormsRequestDTO;

@Service
public class DocumentExcelService {

//	public ResponseEntity<?> generateExcel(List<Map<String, Object>> list, HttpServletResponse response) throws IOException {
//		
//		Workbook workbook = new XSSFWorkbook();
//		Sheet sheet = workbook.createSheet("Form List");
//	
//		Row headerRow = sheet.createRow(0);
//        String[] columns = {"Department", "Form Number", "Form Name", "Date", "Count"};
//        for (int i = 0; i < columns.length; i++) {
//            Cell cell = headerRow.createCell(i);
//            cell.setCellValue(columns[i]);
//            cell.setCellStyle(createHeaderStyle(workbook));
//        }
//		
//		int rowNum = 1;
//        for (Map<String, Object> record : list) {
//            Row row = sheet.createRow(rowNum++);
//            row.createCell(0).setCellValue(record.get("department").toString());
//            row.createCell(1).setCellValue(record.get("formNumber").toString());
//            row.createCell(2).setCellValue(record.get("formName").toString());
//            row.createCell(3).setCellValue(record.get("date").toString());
//            row.createCell(4).setCellValue(Integer.parseInt(record.get("count").toString()));
//        }
//        
//        for (int i = 0; i < columns.length; i++) {
//            sheet.autoSizeColumn(i);
//        }
//        
//        ByteArrayOutputStream out = new ByteArrayOutputStream();
//        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//        response.setHeader("Content-Disposition", "attachment; filename=DepartmentData.xlsx");
//        workbook.write(response.getOutputStream());
//		workbook.close();
//		
//		ByteArrayResource resource = new ByteArrayResource(out.toByteArray());
//		
//		return ResponseEntity.ok()
//                .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=FormCounts.xlsx")
//                .body(resource);
//		
//	}
	
	
	public ResponseEntity<?> generateExcel(List<FormsRequestDTO> formCountList) throws IOException {
	    Workbook workbook = new XSSFWorkbook();
	    Sheet sheet = workbook.createSheet("Form List");

	    // Create header row
	    Row headerRow = sheet.createRow(0);
	    String[] columns = {"Department", "Form Number", "Form Name", "From Date", "To Date" ,"Count"};
	    for (int i = 0; i < columns.length; i++) {
	        Cell cell = headerRow.createCell(i);
	        cell.setCellValue(columns[i]);
	        cell.setCellStyle(createHeaderStyle(workbook)); // Assuming this method exists
	    }

	    // Fill data rows
	    int rowNum = 1;
	    for (FormsRequestDTO record : formCountList) {
	        Row row = sheet.createRow(rowNum++);
	        row.createCell(0).setCellValue(record.getDepartment());
	        row.createCell(1).setCellValue(record.getFormNumber());
	        row.createCell(2).setCellValue(record.getFormName());
	        row.createCell(3).setCellValue(record.getDate());
	        row.createCell(4).setCellValue(record.getTodate());
	        row.createCell(5).setCellValue(record.getCount());
	    }

	    // Auto-size columns
	    for (int i = 0; i < columns.length; i++) {
	        sheet.autoSizeColumn(i);
	    }

	    // Write workbook to ByteArrayOutputStream
	    ByteArrayOutputStream out = new ByteArrayOutputStream();
	    workbook.write(out);
	    workbook.close();

	    // Prepare ByteArrayResource
	    ByteArrayResource resource = new ByteArrayResource(out.toByteArray());

	    // Return ResponseEntity with the Excel file
	    return ResponseEntity.ok()
	            .contentType(MediaType.APPLICATION_OCTET_STREAM)
	            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=DepartmentData.xlsx")
	            .body(resource);
	}


	
	
	private List<String> getPendingReportTitleLabels() {
		
		List<String> list = new ArrayList<String>();
		
		list.add("Department");
		list.add("Form Number");
		list.add("Form Name");
		list.add("Date");
		list.add("No of Records");
		
		return list;
		
	}
	
	
//	private void createPendingReportTitleRow(Sheet sheet, Workbook workbook) {
//
//		// title row
//		Row titleRow = sheet.createRow(0);
//
//		List<String> labelList = getPendingReportTitleLables();
//
//		int columnCount = 0;
//
//		short shortVal = -1;
//
//		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, true, shortVal);
//
//		for (String label : labelList) {
//
//			Cell titleCell = titleRow.createCell(columnCount++);
//			titleCell.setCellValue(label);
//			titleCell.setCellStyle(cellStyle);
//
//		}
//
//	}

	private CellStyle setValueCellColor(Workbook workbook, HorizontalAlignment align, boolean isBold, short s) {

		XSSFFont font = (XSSFFont) workbook.createFont();

		if (isBold) {

			font.setBold(true);
		}

		CellStyle cellStyle = workbook.createCellStyle();
		cellStyle.setAlignment(align);

		if (s >= 0) {

			cellStyle.setFillForegroundColor(s);
			cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		}

		cellStyle.setFont(font);
		cellStyle.setWrapText(true);
		return cellStyle;

	}
	
	
	private void createCell(Row row, int columnCount, String value, CellStyle cellStyle) {
		Cell cell = row.createCell(columnCount);
		cell.setCellValue(value != null ? value : "");
		cell.setCellStyle(cellStyle);
	}
	
	private CellStyle createHeaderStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setBold(true);
        style.setFont(font);
        return style;
    }
	
}
