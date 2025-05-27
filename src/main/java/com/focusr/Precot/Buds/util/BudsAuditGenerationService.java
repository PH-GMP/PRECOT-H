package com.focusr.Precot.Buds.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedHashMap;
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
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.Buds.Payload.BudsAuditRequest;
import com.focusr.Precot.QA.model.audit.FinalInspectionReportHistoryF037;
import com.focusr.Precot.QA.repository.audit.FinalInspectionReportHistoryRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;


@Service
public class BudsAuditGenerationService {

	@Autowired
	private FinalInspectionReportHistoryRepository finalInspectionReportHistoryRepository;

	public ResponseEntity<?> generateExcel(HttpServletResponse response, List<?> entities, Class<?> entityClass,
			String entityName) throws IOException {

		try {

			List<String> ignoreFields = Arrays.asList("hodId", "supervisorSavedName", "supervisorSavedDate",
					"supervisorId", "qaId", "createdAt", "createdBy", "updatedAt", "updatedBy", "logId", "id",
					"equipmentId", "supervisor_save_on", "supervisor_save_by", "supervisor_save_id",
					"supervisor_submit_id", "hod_submit_id", "operator_save_on", "operator_save_id", "operator_save_by",
					"operator_submitted_id", "supervisor_submit_id", "hod_sign", "lineId", "stoppageId","operator_sign","supervisor_sign"
					,"qa_inspector_submit_id","qa_mr_submit_id","manPowerAllocation2");

			Workbook workbook = new XSSFWorkbook();
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			Map<String, Integer> headerMap = new LinkedHashMap<>();
			int headerIdx = createHeaderFromEntity(entityClass, headerRow, workbook, headerMap, 0, ignoreFields);

			// Fill data rows
			int rowNum = 1;
			for (Object entity : entities) {
				rowNum = writeEntityData(sheet, entity, rowNum, headerMap, ignoreFields);
			}

			// Write to response
//			response.setContentType("application/octet-stream");
			response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + entityName + ".xlsx\"");
			workbook.write(response.getOutputStream());
			workbook.close();

			return ResponseEntity.ok().build();

		} catch (Exception ex) {

			String msg = ex.getMessage();

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ApiResponse(false, "Unable to get details: ") + msg);
		}

	}

	private int createHeaderFromEntity(Class<?> classRecord, Row headerRow, Workbook workbook,
			Map<String, Integer> headerMap, int colIndex, List<String> ignoreFields) {
		Field[] fields = getAllDeclaredFields(classRecord);

		for (Field field : fields) {
//			String headerName = field.getName().toUpperCase();
			String headerName = formatHeader(field.getName());

			// Ignore specified fields
			if (ignoreFields.contains(field.getName())) {
				continue;
			}

			if (Collection.class.isAssignableFrom(field.getType())
					&& field.isAnnotationPresent(javax.persistence.OneToMany.class)) {
				// Handle OneToMany relationships
				Class<?> childClass = (Class<?>) ((ParameterizedType) field.getGenericType())
						.getActualTypeArguments()[0];
				colIndex = createHeaderFromEntity(childClass, headerRow, workbook, headerMap, colIndex, ignoreFields);
			} else {
				Cell cell = headerRow.createCell(colIndex);
				cell.setCellValue(headerName);
				headerMap.put(field.getName(), colIndex++);

				// Set style (optional)
				CellStyle headerStyle = workbook.createCellStyle();
				Font font = workbook.createFont();
				font.setBold(true);
				headerStyle.setFont(font);
				cell.setCellStyle(headerStyle);
			}
		}

		return colIndex;
	}

	private int writeEntityData(Sheet sheet, Object entity, int rowNum, Map<String, Integer> headerMap,
			List<String> ignoreFields) {
		try {
			Field[] fields = getAllDeclaredFields(entity.getClass());
			int startRow = rowNum;

			for (Field field : fields) {
				field.setAccessible(true);
				Object value = field.get(entity);

				// Ignore specified fields
				if (ignoreFields.contains(field.getName())) {
					continue;
				}

				if (Collection.class.isAssignableFrom(field.getType())
						&& field.isAnnotationPresent(javax.persistence.OneToMany.class)) {
					// Handle OneToMany relationships
					Collection<?> childEntities = (Collection<?>) value;
					if (childEntities != null && !childEntities.isEmpty()) {
//						for (Object childEntity : childEntities) {
//							// Create a new row for each child entity
//							startRow = writeEntityData(sheet, childEntity, startRow, headerMap, ignoreFields);
//							
//						}

						int childRow = rowNum;
						for (Object childEntity : childEntities) {
							childRow = writeEntityData(sheet, childEntity, childRow, headerMap, ignoreFields); // Recursively
																												// write
																												// child
																												// entities
							startRow = Math.max(startRow, childRow); // Track the maximum row to continue filling other
																		// child tables in the same row
						}
					}
				} else {
					// Write field data
					String headerName = field.getName().toUpperCase();
					Integer headerColIndex = headerMap.get(field.getName());

					if (headerColIndex != null) {
						Row row = sheet.getRow(startRow);
						if (row == null) {
							row = sheet.createRow(startRow);
						}
						Cell cell = row.createCell(headerColIndex);
						cell.setCellValue(value != null ? value.toString() : "");
					}
				}
			}

			return startRow + 1;
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return rowNum;
	}

	private Field[] getAllDeclaredFields(Class<?> classRecord) {
		Field[] fields = classRecord.getDeclaredFields();
		Class<?> superclass = classRecord.getSuperclass();
		if (superclass != null) {
			Field[] superclassFields = getAllDeclaredFields(superclass);
			Field[] combined = new Field[fields.length + superclassFields.length];
			System.arraycopy(fields, 0, combined, 0, fields.length);
			System.arraycopy(superclassFields, 0, combined, fields.length, superclassFields.length);
			return combined;
		}
		return fields;
	}

	private String formatHeader(String fieldName) {
		StringBuilder formattedName = new StringBuilder();

		if (fieldName.contains("_")) {
			// Already snake_case: convert to upper case
			formattedName.append(fieldName.toUpperCase());
		} else {
			// Convert camelCase to UPPER_SNAKE_CASE
			for (int i = 0; i < fieldName.length(); i++) {
				char c = fieldName.charAt(i);
				if (Character.isUpperCase(c) && i > 0) {
					formattedName.append("_");
				}
				formattedName.append(Character.toUpperCase(c));
			}
		}

		return formattedName.toString();
	}

	// Final Inspection Report

	public ResponseEntity<?> getAuditSummary(BudsAuditRequest summeryrequest) {

		List<FinalInspectionReportHistoryF037> summary;

		try {
			String formName = summeryrequest.getFormName();

			if (formName.equalsIgnoreCase("final_inspection_report")) {

				String fromDate = summeryrequest.getFromDate().isEmpty() ? null : summeryrequest.getFromDate();
				String toDate = summeryrequest.getToDate().isEmpty() ? null : summeryrequest.getToDate();
				String shift = summeryrequest.getShift().isEmpty() ? null : summeryrequest.getShift();
				String porder = summeryrequest.getOrderNumber().isEmpty() ? null : summeryrequest.getOrderNumber();

				summary = finalInspectionReportHistoryRepository.excelReportBuds(shift, porder, fromDate, toDate);

				if (!summary.isEmpty()) {
					ByteArrayResource resource = generateExcel(summary);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Final_Inspection_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "*** Unable to Get Audit History ***"),
					HttpStatus.BAD_REQUEST);
		}

		return null;

	}

	public static ByteArrayResource generateExcel(
			List<FinalInspectionReportHistoryF037> filterbagconsumptiondetailshistoryf004) throws IOException {
		try (Workbook workbook = new SXSSFWorkbook()) {
			Sheet sheet = workbook.createSheet("Report");

			// Create header row
			Row headerRow = sheet.createRow(0);
			List<String> headers = getTitleLables();
			int headerColumnIndex = 0;
			for (String header : headers) {
				createCell(headerRow, headerColumnIndex++, header, workbook);
			}

			// Populate data
			createValues(sheet, workbook, filterbagconsumptiondetailshistoryf004);

			// Write the workbook to a byte array
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			workbook.write(baos);
			return new ByteArrayResource(baos.toByteArray());
		}
	}

	private static List<String> getTitleLables() {
		List<String> list = new ArrayList<>();

		list.add("FORMAT_NAME");
		list.add("FORMAT_NO");
		list.add("REVISION_NO");
		list.add("REF_SOP_NO");
		list.add("PRODUCT_DESCRIPTION");
//		list.add("SHIFT");
		list.add("BMR_NO");
		list.add("FIR_NO");
		list.add("CUSTOMER_NAME");
		list.add("PORDER");
		list.add("DATE");
		list.add("TOTAL_QUANTITY");
		list.add("ITEM_CODE");
		list.add("FG_NO");
		list.add("AQL_SAMPLE_SIZE");
		list.add("LOT_NO");
		list.add("GENERAL_INSPECTION_LEVEL");
//		list.add("DEPT_NAME");

		// Parameters - Specifications
		list.add("QTY_PACK_SPECIFICATION");
		list.add("WEIGHT_PACK_SPECIFICATION");
		list.add("ARTWORK_PRINTING_SPECIFICATION");
		list.add("NO_OF_PACKS_SPECIFICATION");
		list.add("LENGTH_DIA_SPECIFICATION");

		// Parameters - Sample Size
		list.add("QTY_PACK_SAMPLE_SIZE");
		list.add("WEIGHT_PACK_SAMPLE_SIZE");
		list.add("ARTWORK_PRINTING_SAMPLE_SIZE");
		list.add("NO_OF_PACKS_SAMPLE_SIZE");
		list.add("LENGTH_DIA_SAMPLE_SIZE");

		// Actual Findings
		list.add("QTY_PACK_ACTUAL_FINDINGS");
		list.add("WEIGHT_PACK_ACTUAL_FINDINGS");
		list.add("ARTWORK_PRINTING_ACTUAL_FINDINGS");
		list.add("NO_OF_PACKS_ACTUAL_FINDINGS");
		list.add("LENGTH_DIA__ACTUAL_FINDINGS");

		// Defects - Critical
		list.add("LESSER_QUANTITY");
		list.add("INCORRECT_PACKAGING_MATERIAL");
		list.add("WRONG_MISSING_LOT_NUMBER");
		list.add("METAL_INSECT_CONTAMINATION");
		list.add("SIGNIFICANT_FOREIGN_MATERIAL");
		list.add("INCORRECT_BARCODE_ON_BAG");
		list.add("IMPROPER_SHAPER_SIZE");
		list.add("DISCOLORATION");

		// Defects - Major
		list.add("STIPPLING_BUDS");
		list.add("DUST_CONTAMINATION");
		list.add("IMPROPER_BUDS_ALIGNMENT");
		list.add("IMPROPER_OPEN_DAMAGED_SEALING");
		list.add("NO_COTTON_AT_ENDS");

		// Defects - Minor
		list.add("COLOUR_CONTAMINATION");
		list.add("BLACK_CONTAMINATION");
		list.add("LESS_GSM");
		list.add("EDGE_CONDITION");
		list.add("HARD_BUDS");
		list.add("LESS_COTTON");

		// Total Defects Observed
		list.add("CRITICAL_TOTAL_NO_OF_DEFECTS_OBSERVED");
		list.add("MAJOR_TOTAL_NO_OF_DEFECTS_OBSERVED");
		list.add("MINOR_TOTAL_NO_OF_DEFECTS_OBSERVED");

		// Maximum Defects Observed
		list.add("CRITICAL_MAXIMUM_NO_OF_DEFECTS_OBSERVED");
		list.add("MAJOR_MAXIMUM_NO_OF_DEFECTS_OBSERVED");
		list.add("MINOR_MAXIMUM_NO_OF_DEFECTS_OBSERVED");

		list.add("LOT_STATUS");
		list.add("REMARK");

		// QA Inspector
		list.add("QA_INSPECTOR_STATUS");
		list.add("QA_INSPECTOR_SUBMIT_ON");
		list.add("QA_INSPECTOR_SUBMIT_BY");
		

		// QA Manager
		list.add("QA_MR_STATUS");
		list.add("QA_MR_SUBMIT_ON");
		list.add("QA_MR_SUBMIT_BY");
	

		list.add("REASON");
		list.add("VERSION");

		return list;
	}

	private static String createValues(Sheet sheet, Workbook workbook,
			List<FinalInspectionReportHistoryF037> filterbagconsumptiondetailshistoryf004) {
		int rowCount = 1;
		CellStyle cellStyle = setValueCellColor(workbook, HorizontalAlignment.CENTER, false, (short) -1);
		CellStyle dateCellStyle = createDateCellStyle(workbook);

		for (FinalInspectionReportHistoryF037 history : filterbagconsumptiondetailshistoryf004) {
			int columnCount = 0;

			// Create main record row
			Row valueRow = sheet.createRow(rowCount++);

			// Main record fields
			createCell(valueRow, columnCount++, history.getFormatName(), cellStyle);
			createCell(valueRow, columnCount++, history.getFormatNo(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getRevisionNo()), cellStyle);
			createCell(valueRow, columnCount++, history.getRefSopNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getProductDescription(), cellStyle);
			createCell(valueRow, columnCount++, history.getBmrNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getFirNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getCustomerName(), cellStyle);
			createCell(valueRow, columnCount++, history.getPOrder(), cellStyle);
			createCell(valueRow, columnCount++, history.getDate(), cellStyle);
			createCell(valueRow, columnCount++, history.getTotalQantity(), cellStyle);
			createCell(valueRow, columnCount++, history.getItemCode(), cellStyle);
			createCell(valueRow, columnCount++, history.getFgNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getAqlSampleSize(), cellStyle);
			createCell(valueRow, columnCount++, history.getLotNo(), cellStyle);
			createCell(valueRow, columnCount++, history.getGeneralInspectionLevel(), cellStyle);

			// Parameters - Specifications
			createCell(valueRow, columnCount++, history.getQtyBagSpecification(), cellStyle);
			createCell(valueRow, columnCount++, history.getWeightBagSpecification(), cellStyle);
			createCell(valueRow, columnCount++, history.getFillingHeightSpecification(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoOfFoldsSpecification(), cellStyle);
			createCell(valueRow, columnCount++, history.getMoistureSpecification(), cellStyle);

			// Parameters - Sample Size
			createCell(valueRow, columnCount++, history.getQtyBagSamplesize(), cellStyle);
			createCell(valueRow, columnCount++, history.getWeightBagSamplesize(), cellStyle);
			createCell(valueRow, columnCount++, history.getFillingHeightSamplesize(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoOfFoldsSamplesize(), cellStyle);
			createCell(valueRow, columnCount++, history.getMoistureSamplesize(), cellStyle);

			// Actual Findings
			createCell(valueRow, columnCount++, history.getQtyBagActualFindings(), cellStyle);
			createCell(valueRow, columnCount++, history.getWeightBagActualFindings(), cellStyle);
			createCell(valueRow, columnCount++, history.getFillingHeightActualFindings(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoOfFoldsActualFindings(), cellStyle);
			createCell(valueRow, columnCount++, history.getMoistureActualFindings(), cellStyle);

			// Defects - Critical
			createCell(valueRow, columnCount++, history.getLesserQuantity(), cellStyle);
			createCell(valueRow, columnCount++, history.getIncorrectPackagingMaterial(), cellStyle);
			createCell(valueRow, columnCount++, history.getWrongMissingLotNumber(), cellStyle);
			createCell(valueRow, columnCount++, history.getMetalInsectContamination(), cellStyle);
			createCell(valueRow, columnCount++, history.getSignificantForeignMaterial(), cellStyle);
			createCell(valueRow, columnCount++, history.getIncorrectBarCodeOnBag(), cellStyle);
			createCell(valueRow, columnCount++, history.getImproperShaperSize(), cellStyle);
			createCell(valueRow, columnCount++, history.getMajorDiscoloration(), cellStyle);

			// Defects - Major
			createCell(valueRow, columnCount++, history.getFoldedPads(), cellStyle);
			createCell(valueRow, columnCount++, history.getDustContamination(), cellStyle);
			createCell(valueRow, columnCount++, history.getLowerFillingHeight(), cellStyle);
			createCell(valueRow, columnCount++, history.getImproperOpenDamagedSealing(), cellStyle);
			createCell(valueRow, columnCount++, history.getNoCottonAtEnds(), cellStyle);

			// Defects - Minor
			createCell(valueRow, columnCount++, history.getMinorColourContamination(), cellStyle);
			createCell(valueRow, columnCount++, history.getBlackContamination(), cellStyle);
			createCell(valueRow, columnCount++, history.getLessGsm(), cellStyle);
			createCell(valueRow, columnCount++, history.getEdgeCondition(), cellStyle);
			createCell(valueRow, columnCount++, history.getHardBalls(), cellStyle);
			createCell(valueRow, columnCount++, history.getLessCotton(), cellStyle);

			// Total Defects Observed
			createCell(valueRow, columnCount++, history.getCriticalTotalNoOfDefectObserved(), cellStyle);
			createCell(valueRow, columnCount++, history.getMajorTotalNoOfDefectObserved(), cellStyle);
			createCell(valueRow, columnCount++, history.getMinorTotalNoOfDefectObserved(), cellStyle);

			// Maximum Defects Observed
			createCell(valueRow, columnCount++, history.getCriticalMaximumNoOfDefectObserved(), cellStyle);
			createCell(valueRow, columnCount++, history.getMajorMaximumNoOfDefectObserved(), cellStyle);
			createCell(valueRow, columnCount++, history.getMinorMaximumNoOfDefectObserved(), cellStyle);

			createCell(valueRow, columnCount++, history.getLotStatus(), cellStyle);
			createCell(valueRow, columnCount++, history.getRemarks(), cellStyle);

			// QA Inspector
			createCell(valueRow, columnCount++, history.getQa_inspector_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_inspector_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_inspector_submit_by(), cellStyle);

			// QA Manager
			createCell(valueRow, columnCount++, history.getQa_mr_status(), cellStyle);
			createDateCell(valueRow, columnCount++, history.getQa_mr_submit_on(), cellStyle);
			createCell(valueRow, columnCount++, history.getQa_mr_submit_by(), cellStyle);


			createCell(valueRow, columnCount++, history.getReason(), cellStyle);
			createCell(valueRow, columnCount++, String.valueOf(history.getVersion()), cellStyle);

		}

		return "";
	}

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

//	private static void createDateCell(Row row, int columnIndex, Date value, CellStyle cellStyle) {
//		Cell cell = row.createCell(columnIndex);
//		if (value != null) {
//			cell.setCellValue(value);
//		} else {
//			cell.setCellValue("");
//		}
//		cell.setCellStyle(cellStyle);
//	}
	
	private static void createDateCell(Row row, int columnCount, Date date, CellStyle cellStyle) {
		Cell cell = row.createCell(columnCount);
		if (date != null) {
			String formattedDate = new SimpleDateFormat("dd-MM-yyyy HH:mm").format(date);
			cell.setCellValue(formattedDate);
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
}
