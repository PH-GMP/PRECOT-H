package com.focusr.Precot.mssql.database.service.engineering;

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
import com.focusr.Precot.mssql.database.model.engineering.BreakdownIntimationSlipF003;
import com.focusr.Precot.mssql.database.model.engineering.WorkOrderRequestFormF020;
import com.focusr.Precot.mssql.database.model.engineering.audit.RootCauseAnalysisHistoryF004;
import com.focusr.Precot.mssql.database.model.engineering.audit.WeightScalesCalibrationHistoryF016;
import com.focusr.Precot.mssql.database.repository.engineering.BreakdownIntimationSlipRepoF003;
import com.focusr.Precot.mssql.database.repository.engineering.WorkOrderRequestFormRepoF020;
import com.focusr.Precot.mssql.database.repository.engineering.audit.RootCauseAnalysisHistoryRepoF004;
import com.focusr.Precot.mssql.database.repository.engineering.audit.WeightScalesCalibrationHistoryRepoF016;
import com.focusr.Precot.mssql.database.service.Store.StoreAuditService;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.StoreAuditRequest;
import com.focusr.Precot.payload.engineering.EngineeringAuditRequest;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Engineering.AppConstantEngineering;
import com.focusr.Precot.util.Engineering.EngineeringExcelUtill;
import com.focusr.Precot.util.Store.AppConstantStore;
import com.focusr.Precot.util.Store.StoreExcelUtill;


@Service
public class EngineeringAuditService {
	
	
	Logger logger = LoggerFactory.getLogger(EngineeringAuditService.class);

	SCAUtil sca = new SCAUtil();
	
	
	@Autowired
	private BreakdownIntimationSlipRepoF003 breakdownSlipRepo;
	
	
	@Autowired
	private RootCauseAnalysisHistoryRepoF004 rootCauseAnalysisRepo;
	
	
	@Autowired 
	private WeightScalesCalibrationHistoryRepoF016 weightScalesHistoryRepo;
	
	
	@Autowired
	private WorkOrderRequestFormRepoF020 workOrderorderRepo;
	
	
	
	public ResponseEntity<?> getAuditSummary(EngineeringAuditRequest summeryrequest) {
		
		

		try {
			String department = summeryrequest.getDepartment();
			String formName = summeryrequest.getForm_name();

			// F003


			 if (AppConstantEngineering.departmentName.equals(department)
				        && AppConstantEngineering.F003.equalsIgnoreCase(formName)) {
				    logger.info("Department: {}", department);
				    logger.info("Form Name: {}", formName);

				    if (summeryrequest == null) {
				        return new ResponseEntity<>(new ApiResponse(false, "Request is null"), HttpStatus.BAD_REQUEST);
				    }

				    String fromDateStr = summeryrequest.getFrom_date();
				    String toDateStr = summeryrequest.getTo_date();
				    String bisNo = summeryrequest.getBisNo();

				    logger.info("From Date: {}", fromDateStr);
				    logger.info("To Date: {}", toDateStr);
				    logger.info("bsi No No: {}",bisNo );

//				    LocalDate fromDate = null;
//				    LocalDate toDate = null;
//
//				    // Convert string dates to LocalDate
//				    try {
//				        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//				        fromDate = fromDateStr.isEmpty() ? null : LocalDate.parse(fromDateStr, dateFormat);
//				        toDate = toDateStr.isEmpty() ? null : LocalDate.parse(toDateStr, dateFormat);
//				    } catch (DateTimeParseException e) {
//				        logger.error("Date parsing error: {}", e.getMessage());
//				        return new ResponseEntity<>(new ApiResponse(false, "Invalid date format"), HttpStatus.BAD_REQUEST);
//				    }
//
//				    List<BreakdownIntimationSlipF003> summaryF04 = breakdownSlipRepo.findByParams003(
//				            fromDate,
//				            toDate,
////				            RcaNo.isEmpty() ? null : RcaNo
//				            (bisNo != null && !bisNo.isEmpty()) ? bisNo : null
//				    );
				    
				    
				    LocalDate fromDate = null;
				    LocalDate toDate = null;
				    try {
				        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
				        fromDate = fromDateStr.isEmpty() ? null : LocalDate.parse(fromDateStr, dateFormat);
				        toDate = toDateStr.isEmpty() ? null : LocalDate.parse(toDateStr, dateFormat);
				    } catch (DateTimeParseException e) {
				        logger.error("Date parsing error: {}", e.getMessage());
				        return new ResponseEntity<>(new ApiResponse(false, "Invalid date format"), HttpStatus.BAD_REQUEST);
				    }

				    // Now call the repository method with LocalDate parameters
				    List<BreakdownIntimationSlipF003> summaryF04 = breakdownSlipRepo.findByParams003(
				        fromDate,
				        toDate,
				        (bisNo != null && !bisNo.isEmpty()) ? bisNo : null
				    );

				    logger.info("breakdownSlipRepo: {}", summaryF04);

				    if (summaryF04 != null && !summaryF04.isEmpty()) {
				        ByteArrayResource resource = EngineeringExcelUtill.generateF003Excel(summaryF04);
				        return ResponseEntity.ok()
				                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=BreakdownIntimation.xlsx")
				                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
				                .body(resource);
				    } else {
				        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				    }
				}

			else if (AppConstantEngineering.departmentName.equals(department)
			        && AppConstantEngineering.F004.equalsIgnoreCase(formName)) {
			    logger.info("Department: {}", department);
			    logger.info("Form Name: {}", formName);

			    if (summeryrequest == null) {
			        return new ResponseEntity<>(new ApiResponse(false, "Request is null"), HttpStatus.BAD_REQUEST);
			    }

			    String fromDateStr = summeryrequest.getFrom_date();
			    String toDateStr = summeryrequest.getTo_date();
			    String rcaNo = summeryrequest.getRcaNo();

			    logger.info("From Date: {}", fromDateStr);
			    logger.info("To Date: {}", toDateStr);
			    logger.info("Rca No: {}",rcaNo );

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

			    List<RootCauseAnalysisHistoryF004> summaryF04 = rootCauseAnalysisRepo.findByParams004(
			            fromDate,
			            toDate,
//			            RcaNo.isEmpty() ? null : RcaNo
			            (rcaNo != null && !rcaNo.isEmpty()) ? rcaNo : null
			    );

			    logger.info("rootCauseAnalysisRepo: {}", summaryF04);

			    if (summaryF04 != null && !summaryF04.isEmpty()) {
			        ByteArrayResource resource = EngineeringExcelUtill.generateF004Excel(summaryF04);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=RootCauseAnalysis.xlsx")
			                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
			

			// F008


			
			else if (AppConstantEngineering.departmentName.equals(department)
			        && AppConstantEngineering.F016.equalsIgnoreCase(formName)) {
			    logger.info("Department: {}", department);
			    logger.info("Form Name: {}", formName);

			    if (summeryrequest == null) {
			        return new ResponseEntity<>(new ApiResponse(false, "Request is null"), HttpStatus.BAD_REQUEST);
			    }

			    String fromDateStr = summeryrequest.getFrom_date();
			    String toDateStr = summeryrequest.getTo_date();
			    String machineIdNo = summeryrequest.getMachineIdNo();

			    logger.info("From Date: {}", fromDateStr);
			    logger.info("To Date: {}", toDateStr);
			    logger.info("machineIdNo: {}", machineIdNo);

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

			    List<WeightScalesCalibrationHistoryF016> summaryF16 = weightScalesHistoryRepo.findByParams016(
			            fromDate,
			            toDate,
			            machineIdNo.isEmpty() ? null : machineIdNo
			    );

			    logger.info("weightScalesHistoryRepo: {}", summaryF16);

			    if (summaryF16 != null && !summaryF16.isEmpty()) {
			        ByteArrayResource resource = EngineeringExcelUtill.generateF016Excel(summaryF16);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=WeightScalesCalibration.xlsx")
			                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
			
//

			// F020
			else if (AppConstantEngineering.departmentName.equals(department)
			        && AppConstantEngineering.F020.equalsIgnoreCase(formName)) {
			    logger.info("Department: {}", department);
			    logger.info("Form Name: {}", formName);

			    if (summeryrequest == null) {
			        return new ResponseEntity<>(new ApiResponse(false, "Request is null"), HttpStatus.BAD_REQUEST);
			    }

			    String fromDateStr = summeryrequest.getFrom_date();
			    String toDateStr = summeryrequest.getTo_date();
			    String worNo = summeryrequest.getWorNo();

			    logger.info("From Date: {}", fromDateStr);
			    logger.info("To Date: {}", toDateStr);
			    logger.info("worNo: {}", worNo);

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

			    List<WorkOrderRequestFormF020> summaryf20 = workOrderorderRepo.findByParams020(
			            fromDate,
			            toDate,
			            worNo.isEmpty() ? null : worNo
			    );

			    logger.info("workOrderorderRepo: {}", summaryf20);

			    if (summaryf20 != null && !summaryf20.isEmpty()) {
			        ByteArrayResource resource = EngineeringExcelUtill.generateF020Excel(summaryf20);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=WorkOrderform.xlsx")
			                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
//
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
