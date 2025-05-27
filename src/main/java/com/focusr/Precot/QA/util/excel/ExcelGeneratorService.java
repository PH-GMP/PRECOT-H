package com.focusr.Precot.QA.util.excel;

import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.util.Arrays;
import java.util.Collection;
import java.util.LinkedHashMap;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.QA.model.audit.QaChangeControlLogBookF042History;
import com.focusr.Precot.QA.model.audit.QaMasterListOfSharpToolsF060History;
import com.focusr.Precot.QA.model.audit.QaOnlineInspectionReportHistory;
import com.focusr.Precot.QA.payload.QaAuditRequest;
import com.focusr.Precot.QA.repository.audit.QaChangeControlLogBookRepoHistory;
import com.focusr.Precot.QA.repository.audit.QaMasterSharpToolsF060HistoryRepo;
import com.focusr.Precot.QA.repository.audit.QaOnlineInspectionReportHistoryRepository;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.mssql.database.service.Qc.QcAuditService;
import com.focusr.Precot.payload.ApiResponse;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Collection;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.ParameterizedType;
import com.focusr.Precot.util.SCAUtil;
import java.util.*;

@Service
public class ExcelGeneratorService {

	Logger logger = LoggerFactory.getLogger(ExcelGeneratorService.class);
	SCAUtil sca = new SCAUtil();

	@Autowired
	private QaChangeControlLogBookRepoHistory qaChangeControlLogBookRepoHistory;

	@Autowired
	private QaMasterSharpToolsF060HistoryRepo masterSharpToolsF060HistoryRepo;

	@Autowired
	private QaOnlineInspectionReportHistoryRepository qaOnlineInspectionReportHistoryRepository;

	public ResponseEntity<?> generateExcel(HttpServletResponse response, List<?> entities, Class<?> entityClass,
			String entityName) throws IOException {

		try {
			List<String> ignoreFields = Arrays.asList("history_id", "id", "operator_save_by", "operator_save_on",
					"operator_save_id", "operator_sign", "hod_sign", "hod_signature_image", "operator_signature_image",
					"supervisor_sign", "supervisor_signature_image", "supervisor_save_on", "supervisor_save_by",
					"supervisor_save_id", "createdBy", "updatedBy", "createdAt", "updatedAt", "pci_save_on",
					"pci_save_by", "pci_save_id", "pci_submit_by", "pci_submit_id", "pci_sign", "qa_mr_submit_by",
					"qa_mr_submit_id", "qa_mr_sign", "qa_mr_save_id", "qa_mr_save_by", "qa_mr_save_on", "incidence_id",
					"hod_save_by", "hod_save_on", "hod_save_id", "hod_submit_by", "hod_submit_id",
					"qa_manager_approved_on", "qa_manager_approved_by", "qa_manager_approver_id",
					"qa_manager_approved_by", "qa_manager_sign", "plant_head_approved_on", "plant_head_approved_by",
					"plant_head_approver_id", "plant_head_sign", "line_id", "qa_inspector_saved_on",
					"qa_inspector_saved_by", "qa_inspector_saved_id", "qa_inspector_submitted_by",
					"qa_inspector_submitted_id", "qa_manager_saved_on", "qa_manager_saved_by", "qa_manager_saved_id",
					"qa_manager_submitted_by", "qa_manager_submitted_id", "qa_inspector_sign", "qa_manager_sign",
					"scheduleId", "auditId", "scheduleSubmitBy", "scheduleSubmitId", "scheduleSignName",
					"qa_manager_approved_id", "tabName", "tabStatus", "action", "qaInspectorIdA", "qaInspectorDateA",
					"productionSupervisorIdA", "productionSupervisorDateA", "productionSupervisorIdBCD",
					"productionSupervisorDateBCD", "qaInspectorIdBCD", "qaInspectorDateBCD", "qaInspectorIdE",
					"qaInspectorDateE", "historyId", "productionSupervisorSign", "qaInspectorSign",
					"productionHeadSign", "qaManagerSign", "tabInternalStatus", "mrOrQaManagerSavedOn",
					"mrOrQaManagerSavedBy", "mrOrQaManagerSavedId", "mrOrQaManagerSign", "Id", "sign", "mr_saved_on",
					"mr_saved_by", "mr_saved_id", "mr_sign", "mrOrQaManagerSavedOn", "mrOrQaManagerSavedBy",
					"mrOrQaManagerSavedId", "mrOrQaManagerSign", "qa_hod_designee_save_on", "qa_hod_designee_save_by",
					"qa_hod_designee_save_id", "qa_hod_designee_sign", "qa_mr_sign", "hod_designee_signature_image",
					"qa_mr_signature_image", "requestId", "lineId", "inspectionId", "qa_inspector_save_on",
					"qa_inspector_save_by", "qa_inspector_save_id", "qa_inspector_sign", "prod_supervisor_save_on",
					"prod_supervisor_save_by", "prod_supervisor_save_id", "prod_supervisor_sign",
					"qa_inspector_signature_image", "prod_supervisor_signature_image", "qa_mr_signature_image",
					"line_id", "containerId", "qa_inspector_save_on", "qa_inspector_save_by", "qa_inspector_save_id",
					"security_sign", "dispatch_supervisor_save_on", "dispatch_supervisor_save_by",
					"dispatch_supervisor_save_id", "dispatch_supervisor_sign", "security_signature_image",
					"dispatch_supervisor_signature_image", "finalInspectionId", "distructionId", "distructionId",
					"reportId", "firstAuditorSaveOn", "firstAuditorSaveBy", "firstAuditorSaveId", "firstAuditorSign",
					"auditeeSaveOn", "auditeeSaveBy", "auditeeSaveId", "auditeeSign", "secondAuditorSaveOn",
					"secondAuditorSaveBy", "secondAuditorSaveId", "secondAuditorSign", "qaMrSaveOn", "qaMrSaveBy",
					"qaMrSaveId", "qaMrSign", "auditorSign", "auditorSaveOn", "auditorSaveBy", "auditorSaveId",
					"planId", "designeeSaveOn", "designeeSaveBy", "designeeSaveId", "designeeSign", "qaManagerMrSign",
					"infoId", "category", "DestroyedByDateAndSign", "qa_inspector_status", "qa_inspector_submit_by",
					"qa_inspector_submit_id", "supervisor_status", "supervisor_submit_by", "supervisor_submit_id",
					"sNo", "receivedBy", "issuedBy", "meetingId", "attendanceId", "discussionId", "his_metal_id",
					"DesigneeSaveOn", "qaDesigneeSaveBy", "qaDesigneeSaveId", "qaDesigneeSubmitBy",
					"qaDesigneeSubmitId", "qaDesigneeSign", "sessionId", "hodDesigneeStatus", "hodDesigneeSaveOn",
					"hodDesigneeSaveBy", "hodDesigneeSaveId", "hodDesigneeSubmitBy", "hodDesigneeSubmitId",
					"hodDesigneeSign", "ins_saved_on", "ins_saved_by", "ins_saved_id", "ins_status", "ins_sign",
					"ins_submit_on", "ins_submit_by", "ins_submit_id", "qc_status", "qc_submit_on", "qc_submit_by",
					"qc_submit_id", "qc_sign", "issue_status", "qc_status_b", "qc_submit_on_b", "qc_submit_by_n",
					"qc_submit_id_b", "qc_saved_on", "qc_saved_by", "qc_saved_id", "qc_sign_b", "hodDesigneeSaveId",
					"hodDesigneeSubmitBy", "hodDesigneeSubmitId", "hodDesigneeSign", "returnedByDateAndSign",
					"productionSampleA", "productionSampleB", "productionretainedsampleregister40",
					"generalInspectionLevel", "mom_hist_id", "qaManagerOrDesigneeSaveOn", "qaManagerOrDesigneeSign",
					"qaManagerOrDesigneeSaveId", "signatureOfAuditor", "signatureOfAuditee",
					"qaInspecqaInspectortorSaveOn", "qaInspectorSaveBy", "qaInspectorSaveId", "sec1SupervisorSaveOn",
					"sec1SupervisorSaveBy", "sec1SupervisorSaveId", "sec1QaManagerMrReviewSaveOn",
					"sec1QaManagerMrReviewSaveBy", "sec1QaManagerMrReviewSaveId", "sec1QaManagerMrInvgSaveOn",
					"sec1QaManagerMrInvgSaveBy", "sec1QaManagerMrInvgSaveId", "sec3SupervisorSaveOn",
					"sec2SupervisorSaveBy", "sec2SupervisorSaveId", "sec2QaManagerMrSaveOn", "sec2QaManagerMrSaveBy",
					"sec2QaManagerMrSaveId", "sec2SupervisorSaveOn", "sec3SupervisorSaveBy", "sec3SupervisorSaveId",
					"sec3QaManagerMrSaveOn", "sec3QaManagerMrSaveBy", "sec3QaManagerMrSaveId","hist_id");

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

		} catch (Exception e) {
			// Catch the exception and return the specified response
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get details: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
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

	// Utility method to format field names into "FORMAT_NAME"
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
//___________________________________________________________________________________________________________________________________________________________

	public ResponseEntity<?> getAuditSummary(QaAuditRequest summeryrequest, HttpServletResponse response) {

		List<QaChangeControlLogBookF042History> summaryF042;
		List<QaMasterListOfSharpToolsF060History> summaryF060;
		List<QaOnlineInspectionReportHistory> summaryF034;
		List<QaOnlineInspectionReportHistory> summaryF035;
		List<QaOnlineInspectionReportHistory> summaryF036;

		try {
			String department = summeryrequest.getDepartment();
			String formName = summeryrequest.getForm_name();
			// F042

			if (QaAppConstants.department.equals(department) && QaAppConstants.F042.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date() == null || summeryrequest.getFrom_date().isEmpty())
						? null
						: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date() == null || summeryrequest.getTo_date().isEmpty()) ? null
						: summeryrequest.getTo_date();
				String changeControlNo = (summeryrequest.getChangeControlNo() == null
						|| summeryrequest.getChangeControlNo().isEmpty()) ? null : summeryrequest.getChangeControlNo();

				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
					// Logic when fromDate and toDate are the same
					summaryF042 = qaChangeControlLogBookRepoHistory.findFormByDate(fromDate, changeControlNo);
				} else {
					// Logic when fromDate and toDate are not the same
					summaryF042 = qaChangeControlLogBookRepoHistory.findByParamsF042(fromDate, toDate, changeControlNo);
				}

				if (!summaryF042.isEmpty()) {
					ByteArrayResource resource = ExcelUtilQa.generateF042Excel(summaryF042);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Change_Control_Log_Book.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			} else if (QaAppConstants.department.equals(department) && QaAppConstants.F060.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date() == null || summeryrequest.getFrom_date().isEmpty())
						? null
						: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date() == null || summeryrequest.getTo_date().isEmpty()) ? null
						: summeryrequest.getTo_date();
				String departmentName = (summeryrequest.getDepartmentName() == null
						|| summeryrequest.getDepartmentName().isEmpty()) ? null : summeryrequest.getDepartmentName();

				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
					// Logic when fromDate and toDate are the same
					summaryF060 = masterSharpToolsF060HistoryRepo.findFormByDateAndDepart(fromDate, departmentName);
				} else {
					// Logic when fromDate and toDate are not the same
					summaryF060 = masterSharpToolsF060HistoryRepo.findByParamsF060(fromDate, toDate, departmentName);
				}

				if (!summaryF060.isEmpty()) {
					ByteArrayResource resource = ExcelUtilQa.generateF060Excel(summaryF060);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Master_List_Of_Sharp_Tools.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			} else if (QaAppConstants.department.equals(department) && QaAppConstants.F034.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date() == null || summeryrequest.getFrom_date().isEmpty())
						? null
						: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date() == null || summeryrequest.getTo_date().isEmpty()) ? null
						: summeryrequest.getTo_date();
				String shift = (summeryrequest.getShift() == null || summeryrequest.getShift().isEmpty()) ? null
						: summeryrequest.getShift();
				String machineNo = (summeryrequest.getMachine_no() == null || summeryrequest.getMachine_no().isEmpty())
						? null
						: summeryrequest.getMachine_no();
				String bmrNo = (summeryrequest.getBmr_no() == null || summeryrequest.getBmr_no().isEmpty()) ? null
						: summeryrequest.getBmr_no();
				String pOrder = (summeryrequest.getPorder() == null || summeryrequest.getPorder().isEmpty()) ? null
						: summeryrequest.getPorder();
				String formatNo = "PH-QAD01-F-034";

				summaryF034 = qaOnlineInspectionReportHistoryRepository.excelReport(shift, machineNo, bmrNo, pOrder,
						formatNo, fromDate, toDate);

				if (!summaryF034.isEmpty()) {
					ByteArrayResource resource = ExcelUtilQa.generateF034Excel(summaryF034);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=OnLine_Inspection_Report_Pads_Pleats_Rolls.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			} else if (QaAppConstants.department.equals(department) && QaAppConstants.F035.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date() == null || summeryrequest.getFrom_date().isEmpty())
						? null
						: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date() == null || summeryrequest.getTo_date().isEmpty()) ? null
						: summeryrequest.getTo_date();
				String shift = (summeryrequest.getShift() == null || summeryrequest.getShift().isEmpty()) ? null
						: summeryrequest.getShift();
				String machineNo = (summeryrequest.getMachine_no() == null || summeryrequest.getMachine_no().isEmpty())
						? null
						: summeryrequest.getMachine_no();
				String bmrNo = (summeryrequest.getBmr_no() == null || summeryrequest.getBmr_no().isEmpty()) ? null
						: summeryrequest.getBmr_no();
				String pOrder = (summeryrequest.getPorder() == null || summeryrequest.getPorder().isEmpty()) ? null
						: summeryrequest.getPorder();
				String formatNo = "PH-QAD01-F-035";

				summaryF035 = qaOnlineInspectionReportHistoryRepository.excelReport(shift, machineNo, bmrNo, pOrder,
						formatNo, fromDate, toDate);

				if (!summaryF035.isEmpty()) {
					ByteArrayResource resource = ExcelUtilQa.generateF035Excel(summaryF035);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=OnLine_Inspection_Report_Balls.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			} else if (QaAppConstants.department.equals(department) && QaAppConstants.F036.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date() == null || summeryrequest.getFrom_date().isEmpty())
						? null
						: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date() == null || summeryrequest.getTo_date().isEmpty()) ? null
						: summeryrequest.getTo_date();
				String shift = (summeryrequest.getShift() == null || summeryrequest.getShift().isEmpty()) ? null
						: summeryrequest.getShift();
				String machineNo = (summeryrequest.getMachine_no() == null || summeryrequest.getMachine_no().isEmpty())
						? null
						: summeryrequest.getMachine_no();
				String bmrNo = (summeryrequest.getBmr_no() == null || summeryrequest.getBmr_no().isEmpty()) ? null
						: summeryrequest.getBmr_no();
				String pOrder = (summeryrequest.getPorder() == null || summeryrequest.getPorder().isEmpty()) ? null
						: summeryrequest.getPorder();
				String formatNo = "PH-QAD01-F-036";

				summaryF036 = qaOnlineInspectionReportHistoryRepository.excelReport(shift, machineNo, bmrNo, pOrder,
						formatNo, fromDate, toDate);

				if (!summaryF036.isEmpty()) {
					ByteArrayResource resource = ExcelUtilQa.generateF036Excel(summaryF036);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=OnLine_Inspection_Report_Buds.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid department or form name"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			logger.error("*** Unable to Get Audit History ***", e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "*** Unable to Get Audit History ***" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

}
