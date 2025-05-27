package com.focusr.Precot.mssql.database.service.bleaching;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.payload.ApiResponse;

@Service
public class BleachingExcelGenerationService {

	public ResponseEntity<?> generateExcel(HttpServletResponse response, List<?> entities, Class<?> entityClass, String entityName) {
		
		try {
			
			List<String> ignoreFields = Arrays.asList("supervisorSaveBy", "supervisorSavedOn", 
				    "supervisorSavedId", "supervisorSubmittedId", 
				   "hodSubmittedId", 
				    "qaSubmittedId", "id", "createdBy", "createdAt", "updatedAt", "updatedBy");
			
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
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + entityName + ".xlsx\"");
			workbook.write(response.getOutputStream());
			workbook.close();

			return ResponseEntity.ok().build();
			
		} catch(Exception ex) {
			
			String msg = ex.getMessage();
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Unable to get details: ") + msg);
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
	
	
}
