package com.focusr.Precot.mssql.database.service.Store;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.Store.audit.EyeWashConditionChecklistHistoryF009;
import com.focusr.Precot.mssql.database.model.Store.audit.ForkliftMovementCheckListHistoryF008;
import com.focusr.Precot.mssql.database.model.Store.audit.NonReturnableGatePassHistoryF006;
import com.focusr.Precot.mssql.database.model.Store.audit.ReceptionCheckListHistoryF003;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingProductChangeOverHistoryF03;
import com.focusr.Precot.mssql.database.repository.Store.audit.EyeWashConditionChecklistHistoryRepoF009;
import com.focusr.Precot.mssql.database.repository.Store.audit.ForkliftMovementCheckListHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Store.audit.NonReturnableGatePassHistoryRepositoryF006;
import com.focusr.Precot.mssql.database.repository.Store.audit.ReceptionCheckListHistoryRepositoryF003;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.StoreAuditRequest;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Store.AppConstantStore;
import com.focusr.Precot.util.Store.StoreExcelUtill;

@Service
public class StoreAuditService {

	Logger logger = LoggerFactory.getLogger(StoreAuditService.class);

	SCAUtil sca = new SCAUtil();

	@Autowired
	private ReceptionCheckListHistoryRepositoryF003 receptionHistoryRepositoryF003;

	@Autowired
	private NonReturnableGatePassHistoryRepositoryF006 nonReturnableHistoryF006;

	@Autowired
	private ForkliftMovementCheckListHistoryRepo forkliftMovementHistoryRepo;

	@Autowired
	private EyeWashConditionChecklistHistoryRepoF009 eyeWashConditionHistoryRepoF009;

	public ResponseEntity<?> getAuditSummary(StoreAuditRequest summeryrequest) {
		List<ReceptionCheckListHistoryF003> summaryF03;
		List<NonReturnableGatePassHistoryF006> summaryF066;
		List<ForkliftMovementCheckListHistoryF008> summarF089;
		List<EyeWashConditionChecklistHistoryF009> summaryF09;

		try {
			String department = summeryrequest.getDepartment();
			String formName = summeryrequest.getForm_name();

			// F003


			if (AppConstantStore.departmentName.equals(department)
					&& AppConstantStore.F003.equalsIgnoreCase(formName)) {
				logger.info("Department: {}", department);
				logger.info("Form Name: {}", formName);

				if (AppConstantStore.departmentName.equals(department)
						&& AppConstantStore.F003.equalsIgnoreCase(formName)) {
					logger.info("Department: {}", department);
					logger.info("Form Name: {}", formName);

					if (summeryrequest == null) {
						return new ResponseEntity<>(new ApiResponse(false, "Request is null"), HttpStatus.BAD_REQUEST);
					}

					String fromDateStr = summeryrequest.getFrom_date();
					String toDateStr = summeryrequest.getTo_date();
					String Invoice = summeryrequest.getInvoiceNo();
					String Descrption = summeryrequest.getDescription();

					LocalDate fromDate = null;
					LocalDate toDate = null;

					try {
						DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
						fromDate = fromDateStr.isEmpty() ? null : LocalDate.parse(fromDateStr, dateFormat);
						toDate = toDateStr.isEmpty() ? null : LocalDate.parse(toDateStr, dateFormat);
					} catch (DateTimeParseException e) {
						logger.error("Date parsing error: {}", e.getMessage());
						return new ResponseEntity<>(new ApiResponse(false, "Invalid date format"),
								HttpStatus.BAD_REQUEST);
					}

					if (receptionHistoryRepositoryF003 == null) {
						return new ResponseEntity<>(new ApiResponse(false, "Repository is null"),
								HttpStatus.INTERNAL_SERVER_ERROR);
					}

					// Call the repository with the correct parameter types
					List<ReceptionCheckListHistoryF003> summaryF08 = receptionHistoryRepositoryF003
							.findByParams003(fromDate, toDate, Invoice, Descrption);
					logger.info("receptionHistoryRepositoryF003: {}", summaryF08);

					if (summaryF08 != null && !summaryF08.isEmpty()) {
						ByteArrayResource resource = StoreExcelUtill.generateF003Excel(summaryF08);
						return ResponseEntity.ok()
								.header(HttpHeaders.CONTENT_DISPOSITION,
										"attachment; filename=nonReturnableGatePass.xlsx")
								.contentType(MediaType.parseMediaType(
										"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
								.body(resource);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
					}
				}
				return new ResponseEntity<>(new ApiResponse(false, "Invalid department or form name"),
						HttpStatus.BAD_REQUEST);
			}

			else if (AppConstantStore.departmentName.equals(department)
			        && AppConstantStore.F006.equalsIgnoreCase(formName)) {
			    logger.info("Department: {}", department);
			    logger.info("Form Name: {}", formName);

			    if (summeryrequest == null) {
			        return new ResponseEntity<>(new ApiResponse(false, "Request is null"), HttpStatus.BAD_REQUEST);
			    }

			    String fromDateStr = summeryrequest.getFrom_date();
			    String toDateStr = summeryrequest.getTo_date();
			    String gatepassNo = summeryrequest.getGatePassNo();

			    logger.info("From Date: {}", fromDateStr);
			    logger.info("To Date: {}", toDateStr);
			    logger.info("Gate Pass No: {}", gatepassNo);

			    LocalDate fromDate = null;
			    LocalDate toDate = null;

			    // Convert string dates to LocalDate
			    try {
			        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			        fromDate = fromDateStr.isEmpty() ? null : LocalDate.parse(fromDateStr, dateFormat);
			        toDate = toDateStr.isEmpty() ? null : LocalDate.parse(toDateStr, dateFormat);
			    } catch (DateTimeParseException e) {
			        logger.error("Date parsing error: {}", e.getMessage());
			        return new ResponseEntity<>(new ApiResponse(false, "Invalid date format"), HttpStatus.BAD_REQUEST);
			    }

			    List<NonReturnableGatePassHistoryF006> summaryF06 = nonReturnableHistoryF006.findByParams003(
			            fromDate,
			            toDate,
			            gatepassNo.isEmpty() ? null : gatepassNo // Pass null if gatepassNo is empty
			    );

			    logger.info("nonReturnableHistoryF006: {}", summaryF06);

			    if (summaryF06 != null && !summaryF06.isEmpty()) {
			        ByteArrayResource resource = StoreExcelUtill.generateF006Excel(summaryF06);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=nonReturnableGatePass.xlsx")
			                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
			

			// F008


			
			else if (AppConstantStore.departmentName.equals(department)
			        && AppConstantStore.F008.equalsIgnoreCase(formName)) {
			    logger.info("Department: {}", department);
			    logger.info("Form Name: {}", formName);

			    if (summeryrequest == null) {
			        return new ResponseEntity<>(new ApiResponse(false, "Request is null"), HttpStatus.BAD_REQUEST);
			    }

			    String fromDateStr = summeryrequest.getFrom_date();
			    String toDateStr = summeryrequest.getTo_date();
			    String forklftNO = summeryrequest.getForkliftNo();

			    logger.info("From Date: {}", fromDateStr);
			    logger.info("To Date: {}", toDateStr);
			    logger.info("Gate Pass No: {}", forklftNO);

			    LocalDate fromDate = null;
			    LocalDate toDate = null;

			    // Convert string dates to LocalDate
			    try {
			        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			        fromDate = fromDateStr.isEmpty() ? null : LocalDate.parse(fromDateStr, dateFormat);
			        toDate = toDateStr.isEmpty() ? null : LocalDate.parse(toDateStr, dateFormat);
			    } catch (DateTimeParseException e) {
			        logger.error("Date parsing error: {}", e.getMessage());
			        return new ResponseEntity<>(new ApiResponse(false, "Invalid date format"), HttpStatus.BAD_REQUEST);
			    }

			    List<ForkliftMovementCheckListHistoryF008> summaryF06 = forkliftMovementHistoryRepo.findByParams003(
			            fromDate,
			            toDate,
			            forklftNO.isEmpty() ? null : forklftNO // Pass null if gatepassNo is empty
			    );

			    logger.info("forkliftMovementHistoryRepo: {}", summaryF06);

			    if (summaryF06 != null && !summaryF06.isEmpty()) {
			        ByteArrayResource resource = StoreExcelUtill.generateF008Excel(summaryF06);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ForkliftMovementCheckList.xlsx")
			                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
			


			// F009
			else if (AppConstantStore.departmentName.equals(department)
					&& AppConstantStore.F009.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();

				summaryF09 = eyeWashConditionHistoryRepoF009.findByParams009(fromDate, toDate);

				if (!summaryF09.isEmpty()) {
					ByteArrayResource resource = StoreExcelUtill.generateF009Excel(summaryF09);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=EyeWashCondition.xlsx")
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
