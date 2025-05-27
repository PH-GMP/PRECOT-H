package com.focusr.Precot.QA.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.focusr.Precot.QA.model.AgendaForManagementAttendees;
import com.focusr.Precot.QA.model.AgendaForManagementReviewMeeting;
import com.focusr.Precot.QA.model.AgendaTopicsLines;
import com.focusr.Precot.QA.model.AnnualPlan;
import com.focusr.Precot.QA.model.AnnualPlanLines;
import com.focusr.Precot.QA.model.AnnualProductReview;
import com.focusr.Precot.QA.model.BatchReleaseNotesHeader;
import com.focusr.Precot.QA.model.BatchReleaseNotesLines;
import com.focusr.Precot.QA.model.ComplaintsRejectsAndProductRecallsLine9;
import com.focusr.Precot.QA.model.InwardInspectionReport;
import com.focusr.Precot.QA.model.InwardInspectionReportLine1;
import com.focusr.Precot.QA.model.InwardInspectionReportLine2;
import com.focusr.Precot.QA.model.ListOfEquipmentAndQualificationLine4;
import com.focusr.Precot.QA.model.ListOfSharpTools;
import com.focusr.Precot.QA.model.ListOfSharpToolsLines;
import com.focusr.Precot.QA.model.ManagementOfIncidence;
import com.focusr.Precot.QA.model.MinutesOfMRM;
import com.focusr.Precot.QA.model.MinutesOfMRMLines;
import com.focusr.Precot.QA.model.PackingMaterialDetailsLine3;
import com.focusr.Precot.QA.model.QASummaryOfTraceability;
import com.focusr.Precot.QA.model.RawMaterialsDetailsLine2;
import com.focusr.Precot.QA.model.ReviewMeetingTopics;
import com.focusr.Precot.QA.model.ReviewOfAllNonConformityProductLine6;
import com.focusr.Precot.QA.model.ReviewOfChangeControlSystemLine8;
import com.focusr.Precot.QA.model.ReviewOfCriticalParameterChecksOfLine5;
import com.focusr.Precot.QA.model.ReviewOfDeviationLine7;
import com.focusr.Precot.QA.model.ReviewOfProductRecallLine10;
import com.focusr.Precot.QA.model.SummaryLine1;
import com.focusr.Precot.QA.model.SummaryParametersLine1;
import com.focusr.Precot.QA.model.audit.AgendaForManagementAttendeesHistory;
import com.focusr.Precot.QA.model.audit.AgendaForManagementReviewMeetingHistory;
import com.focusr.Precot.QA.model.audit.AgendaTopicsLinesHistory;
import com.focusr.Precot.QA.model.audit.AnnualPlanHistory;
import com.focusr.Precot.QA.model.audit.AnnualPlanLinesHistory;
import com.focusr.Precot.QA.model.audit.AnnualProductReviewHistory;
import com.focusr.Precot.QA.model.audit.BatchReleaseNotesHeaderHistory;
import com.focusr.Precot.QA.model.audit.BatchReleaseNotesLinesHistory;
import com.focusr.Precot.QA.model.audit.ComplaintsRejectsAndProductRecallsLine9History;
import com.focusr.Precot.QA.model.audit.InwardInspectionReportHistory;
import com.focusr.Precot.QA.model.audit.InwardInspectionReportLine1History;
import com.focusr.Precot.QA.model.audit.InwardInspectionReportLine2History;
import com.focusr.Precot.QA.model.audit.ListOfEquipmentAndQualificationLine4History;
import com.focusr.Precot.QA.model.audit.ListOfSharpToolsHistory;
import com.focusr.Precot.QA.model.audit.ListOfSharpToolsLinesHistory;
import com.focusr.Precot.QA.model.audit.ManagementOfIncidenceHistory;
import com.focusr.Precot.QA.model.audit.MinutesOfMRMHistory;
import com.focusr.Precot.QA.model.audit.PackingMaterialDetailsLine3History;
import com.focusr.Precot.QA.model.audit.QASummaryOfTraceabilityHistory;
import com.focusr.Precot.QA.model.audit.RawMaterialsDetailsLine2History;
import com.focusr.Precot.QA.model.audit.ReviewOfAllNonConformityProductLine6History;
import com.focusr.Precot.QA.model.audit.ReviewOfChangeControlSystemLine8History;
import com.focusr.Precot.QA.model.audit.ReviewOfCriticalParameterChecksOfLine5History;
import com.focusr.Precot.QA.model.audit.ReviewOfDeviationLine7History;
import com.focusr.Precot.QA.model.audit.ReviewOfProductRecallLine10History;
import com.focusr.Precot.QA.model.audit.SummaryLine1History;
import com.focusr.Precot.QA.model.audit.SummaryParametersLine1History;
import com.focusr.Precot.QA.payload.AllBMRDetailsDTO;
import com.focusr.Precot.QA.payload.AllBMRDetailsProjection;
import com.focusr.Precot.QA.payload.BmrDetailsRequest;
import com.focusr.Precot.QA.payload.InwardInspectionDetailsDto;
import com.focusr.Precot.QA.repository.AgendaForManagementAttendeesRepository;
import com.focusr.Precot.QA.repository.AgendaForManagementReviewMeetingRepository;
import com.focusr.Precot.QA.repository.AgendaTopicsLinesRepository;
import com.focusr.Precot.QA.repository.AnnualPlanLinesRepository;
import com.focusr.Precot.QA.repository.AnnualPlanRepository;
import com.focusr.Precot.QA.repository.AnnualProductReviewRepository;
import com.focusr.Precot.QA.repository.BatchReleaseNotesHeaderRepository;
import com.focusr.Precot.QA.repository.BatchReleaseNotesLinesRepository;
import com.focusr.Precot.QA.repository.ComplaintsRejectsAndProductRecallsLine9Repository;
import com.focusr.Precot.QA.repository.InwardInspectionReportLine1Repository;
import com.focusr.Precot.QA.repository.InwardInspectionReportLine2Repository;
import com.focusr.Precot.QA.repository.InwardInspectionReportRepository;
import com.focusr.Precot.QA.repository.ListOfEquipmentAndQualificationLine4Repository;
import com.focusr.Precot.QA.repository.ListOfSharpToolsLinesRepository;
import com.focusr.Precot.QA.repository.ListOfSharpToolsRepository;
import com.focusr.Precot.QA.repository.ManagementOfIncidenceRepository;
import com.focusr.Precot.QA.repository.MinutesOfMRMLinesRepository;
import com.focusr.Precot.QA.repository.MinutesOfMRMRepository;
import com.focusr.Precot.QA.repository.PackingMaterialDetailsLine3Repository;
import com.focusr.Precot.QA.repository.QASummaryOfTraceabilityRepository;
import com.focusr.Precot.QA.repository.RawMaterialsDetailsLine2Repository;
import com.focusr.Precot.QA.repository.ReviewMeetingTopicsRepository;
import com.focusr.Precot.QA.repository.ReviewOfAllNonConformityProductLine6Repository;
import com.focusr.Precot.QA.repository.ReviewOfChangeControlSystemLine8Repository;
import com.focusr.Precot.QA.repository.ReviewOfCriticalParameterChecksOfLine5Repository;
import com.focusr.Precot.QA.repository.ReviewOfDeviationLine7Repository;
import com.focusr.Precot.QA.repository.ReviewOfProductRecallLine10Repository;
import com.focusr.Precot.QA.repository.SummaryLine1Repository;
import com.focusr.Precot.QA.repository.SummaryParametersLine1Repository;
import com.focusr.Precot.QA.repository.audit.AgendaForManagementAttendeesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.AgendaForManagementReviewMeetingHistoryRepository;
import com.focusr.Precot.QA.repository.audit.AgendaTopicsLinesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.AnnualPlanHistoryRepository;
import com.focusr.Precot.QA.repository.audit.AnnualPlanLinesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.AnnualProductReviewHistoryRepository;
import com.focusr.Precot.QA.repository.audit.BatchReleaseNotesHeaderHistoryRepository;
import com.focusr.Precot.QA.repository.audit.BatchReleaseNotesLinesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ComplaintsRejectsAndProductRecallsLine9HistoryRepository;
import com.focusr.Precot.QA.repository.audit.InwardInspectionReportHistoryRepository;
import com.focusr.Precot.QA.repository.audit.InwardInspectionReportLine1HistoryRepository;
import com.focusr.Precot.QA.repository.audit.InwardInspectionReportLine2HistoryRepository;
import com.focusr.Precot.QA.repository.audit.ListOfEquipmentAndQualificationLine4HistoryRepository;
import com.focusr.Precot.QA.repository.audit.ListOfSharpToolsHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ListOfSharpToolsLinesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ManagementOfIncidenceHistoryRepository;
import com.focusr.Precot.QA.repository.audit.MinutesOfMRMHistoryRepository;
import com.focusr.Precot.QA.repository.audit.MinutesOfMRMLinesHistory;
import com.focusr.Precot.QA.repository.audit.MinutesOfMRMLinesHistoryRepository;
import com.focusr.Precot.QA.repository.audit.PackingMaterialDetailsLine3HistoryRepository;
import com.focusr.Precot.QA.repository.audit.QASummaryOfTraceabilityHistoryRepository;
import com.focusr.Precot.QA.repository.audit.RawMaterialsDetailsLine2HistoryRepository;
import com.focusr.Precot.QA.repository.audit.ReviewOfAllNonConformityProductLine6HistoryRepository;
import com.focusr.Precot.QA.repository.audit.ReviewOfChangeControlSystemLine8HistoryRepository;
import com.focusr.Precot.QA.repository.audit.ReviewOfCriticalParameterChecksOfLine5HistoryRepository;
import com.focusr.Precot.QA.repository.audit.ReviewOfDeviationLine7HistoryRepository;
import com.focusr.Precot.QA.repository.audit.ReviewOfProductRecallLine10HistoryRepository;
import com.focusr.Precot.QA.repository.audit.SummaryLine1HistoryRepository;
import com.focusr.Precot.QA.repository.audit.SummaryParametersLine1HistoryRepository;
import com.focusr.Precot.QA.util.QaAppConstants;
import com.focusr.Precot.QA.util.TraceResponseUtil;
import com.focusr.Precot.QA.util.mail.QAMailFunction;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrLaydownMapping;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrLaydownMappingRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR01RP01ProductionDetailsRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.QAUtil;
import com.focusr.Precot.util.SCAUtil;

/*
 * INWARD INSPECTION REPORT (5)
 * MANAGMENT OF INCIDENCE
 * LIST OF SHARP TOOLS
 * ANNUAL PLAN
 * AGENDA FOR MANAGEMENT REVIEW MEETING
 * MINIUTES ON MRM
 */
@Service
public class QAService3 {
	Logger log = LoggerFactory.getLogger(QAService3.class);

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private InwardInspectionReportRepository inwardinspectionreportrepository;

	@Autowired
	InwardInspectionReportLine1Repository inwardinspectionreportline1repository;

	@Autowired
	InwardInspectionReportLine2Repository inwardinspectionreportline2repository;

	@Autowired
	InwardInspectionReportHistoryRepository inwardinspectionreporthistoryrepository;

	@Autowired
	InwardInspectionReportLine1HistoryRepository inwardinspectionreportline1historyrepository;

	@Autowired
	InwardInspectionReportLine2HistoryRepository inwardinspectionreportline2historyrepository;

	@Autowired
	ManagementOfIncidenceRepository managementofincidencerepository;

	@Autowired
	ManagementOfIncidenceHistoryRepository managementofincidencehistoryrepository;

	@Autowired
	ListOfSharpToolsRepository listofsharptoolsrepository;

	@Autowired
	ListOfSharpToolsLinesRepository listofsharptoolslinesrepository;

	@Autowired
	ListOfSharpToolsHistoryRepository listofsharptoolshistoryrepository;

	@Autowired
	ListOfSharpToolsLinesHistoryRepository listofsharptoolslineshistoryrepository;

	@Autowired
	AnnualPlanRepository annualPlanRepository;

	@Autowired
	AnnualPlanLinesRepository annualPlanLinesRepository;

	@Autowired
	AnnualPlanHistoryRepository annualPlanHistoryRepository;

	@Autowired
	AnnualPlanLinesHistoryRepository annualPlanLinesHistoryRepository;

	@Autowired
	AgendaForManagementReviewMeetingRepository agendaformanagementreviewmeetingrepository;

	@Autowired
	AgendaTopicsLinesRepository agendatopicslinesrepository;

	@Autowired
	AgendaForManagementAttendeesRepository agendaformanagementattendeesrepository;

	@Autowired
	AgendaForManagementReviewMeetingHistoryRepository agendaformanagementreviewmeetinghistoryrepository;

	@Autowired
	AgendaTopicsLinesHistoryRepository agendatopicslineshistoryrepository;

	@Autowired
	AgendaForManagementAttendeesHistoryRepository agendaformanagementattendeeshistoryrepository;
	@Autowired
	ReviewMeetingTopicsRepository reviewmeetingtopicsrepository;
	@Autowired
	MinutesOfMRMRepository minutesofmrmrepository;
	@Autowired
	MinutesOfMRMLinesRepository minutesofmrmlinesrepository;
	@Autowired
	MinutesOfMRMHistoryRepository minutesofmrmhistoryrepository;
	@Autowired
	MinutesOfMRMLinesHistoryRepository minutesofmrmlineshistoryrepository;
	@Autowired
	QASummaryOfTraceabilityRepository qasummaryoftraceabilityrepository;
	@Autowired
	QASummaryOfTraceabilityHistoryRepository qasummaryoftraceabilityhistoryrepository;
	@Autowired
	BatchReleaseNotesHeaderRepository batchReleaseNotesHeaderRepository;
	@Autowired
	BatchReleaseNotesLinesRepository batchReleaseNotesLinesRepository;
	@Autowired
	BatchReleaseNotesHeaderHistoryRepository batchReleaseNotesHeaderHistoryRepository;
	@Autowired
	BatchReleaseNotesLinesHistoryRepository batchReleaseNotesLinesHistoryRepository;
	@Autowired
	AnnualProductReviewRepository annualProductReviewRepository;
	@Autowired
	SummaryLine1Repository summaryLine1Repository;
	@Autowired
	SummaryParametersLine1Repository summaryparametersline1repository;
	@Autowired
	RawMaterialsDetailsLine2Repository rawmaterialsdetailsline2repository;
	@Autowired
	PackingMaterialDetailsLine3Repository packingmaterialdetailsline3repository;
	@Autowired
	ListOfEquipmentAndQualificationLine4Repository listofequipmentandqualificationline4repository;
	@Autowired
	ReviewOfCriticalParameterChecksOfLine5Repository reviewofcriticalparameterchecksofline5repository;
	@Autowired
	ReviewOfAllNonConformityProductLine6Repository reviewofallnonconformityproductline6repository;
	@Autowired
	ReviewOfDeviationLine7Repository reviewofdeviationline7repository;
	@Autowired
	ReviewOfChangeControlSystemLine8Repository reviewofchangecontrolsystemline8repository;
	@Autowired
	ComplaintsRejectsAndProductRecallsLine9Repository complaintsrejectsandproductrecallsline9repository;
	@Autowired
	ReviewOfProductRecallLine10Repository reviewofproductrecallline10repository;

	@Autowired
	AnnualProductReviewHistoryRepository annualProductReviewHistoryRepository;
	@Autowired
	SummaryLine1HistoryRepository summaryLine1HistoryRepository;
	@Autowired
	SummaryParametersLine1HistoryRepository summaryParametersLine1HistoryRepository;
	@Autowired
	RawMaterialsDetailsLine2HistoryRepository rawmaterialsdetailsline2historyrepository;
	@Autowired
	PackingMaterialDetailsLine3HistoryRepository packingmaterialdetailsline3historyrepository;
	@Autowired
	ListOfEquipmentAndQualificationLine4HistoryRepository listofequipmentandqualificationline4historyrepository;
	@Autowired
	ReviewOfCriticalParameterChecksOfLine5HistoryRepository reviewofcriticalparameterchecksofline5historyrepository;
	@Autowired
	ReviewOfAllNonConformityProductLine6HistoryRepository reviewofallnonconformityproductline6historyrepository;
	@Autowired
	ReviewOfDeviationLine7HistoryRepository reviewofdeviationline7historyrepository;
	@Autowired
	ReviewOfChangeControlSystemLine8HistoryRepository reviewofchangecontrolsystemline8historyrepository;
	@Autowired
	ComplaintsRejectsAndProductRecallsLine9HistoryRepository complaintsrejectsandproductrecallsline9historyrepository;
	@Autowired
	ReviewOfProductRecallLine10HistoryRepository reviewofproductrecallline10historyrepository;
	@Autowired
	QAMailFunction qamailfunction;

	@Autowired
	BMR01RP01ProductionDetailsRepository bmr_01_productiondetailsrepository;

	@Autowired
	BleachBmrLaydownMappingRepository mappingRepository;

	// -----------------INWARD INSPECTION REPORT FORMS-----------------//
	// SAVE
	public ResponseEntity<?> saveInwardInspectionReport(InwardInspectionReport details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}
		// For Fetching Current Date
		LocalDateTime currentDate = LocalDateTime.now();
		InwardInspectionReport listObj = null;
		try {
			// Get user details
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			// Check if updating or creating new record
			if (details.getId() != null) {
				listObj = inwardinspectionreportrepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Report not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "qa_inspector_status", "qa_inspector_saved_on",
						"qa_inspector_saved_by", "qa_inspector_saved_id", "qa_manager_status", "qa_manager_saved_on",
						"qa_manager_saved_by", "qa_manager_saved_id", "line1", "line2" };

				BeanUtils.copyProperties(details, listObj, ignoreProps);
			} else {
				listObj = details;
			}

			if (role.equals("ROLE_QA")) {
				// Save the main report
				inwardinspectionreportrepository.save(listObj);

				// Save line items for Line1
				List<InwardInspectionReportLine1> line1 = details.getLine1();
				for (InwardInspectionReportLine1 line : line1) {
					line.setId(listObj.getId());
					inwardinspectionreportline1repository.save(line);
				}

				// Save line items for Line2
				List<InwardInspectionReportLine2> line2 = details.getLine2();
				for (InwardInspectionReportLine2 line : line2) {
					line.setId(listObj.getId());
					inwardinspectionreportline2repository.save(line);
				}

				// Set QA Inspector save details
				listObj.setLine1(line1);
				listObj.setLine2(line2);
				listObj.setQa_inspector_saved_by(userName);
				listObj.setQa_inspector_saved_on(date);
				listObj.setQa_inspector_saved_id(userId);
				listObj.setQa_inspector_status(QaAppConstants.qaInspectorSave);

				inwardinspectionreportrepository.save(listObj);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Inward Inspection Report details! ****", ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(listObj, HttpStatus.CREATED);
	}

//SUBMIT

	/*
	 * public ResponseEntity<?> submitInwardInspectionReport(InwardInspectionReport
	 * details, HttpServletRequest http) { try { String userRole =
	 * scaUtil.getUserRoleFromRequest(http, tokenProvider); Long userId =
	 * scaUtil.getUserIdFromRequest(http, tokenProvider); String userName =
	 * userRepository.getUserName(userId); // For Fetching Current Date
	 * LocalDateTime currentDate = LocalDateTime.now(); Date date =
	 * QAUtil.convertLocalDateTimeToDate(currentDate); // Validate mandatory fields
	 * if (details == null) { return new ResponseEntity(new ApiResponse(false,
	 * "Please send mandatory fields!"), HttpStatus.BAD_REQUEST); }
	 * 
	 * InwardInspectionReport report; if (details.getId() != null) { report =
	 * inwardinspectionreportrepository.findById(details.getId()).orElse(new
	 * InwardInspectionReport());
	 * 
	 * String[] ignoreProps = { "id", "createdBy",
	 * "createdAt","qa_inspector_status", "qa_inspector_saved_on",
	 * "qa_inspector_saved_by", "qa_inspector_saved_id", "qa_manager_status",
	 * "qa_manager_submitted_on", "qa_manager_submitted_by",
	 * "qa_manager_submitted_id","qa_manager_sign", "line1", "line2" };
	 * 
	 * BeanUtils.copyProperties(details, report, ignoreProps); } else { report =
	 * details; }
	 * 
	 * // Allow only QA Inspector to submit if
	 * (userRole.equalsIgnoreCase("ROLE_QA")) { // // Update report details //
	 * report.setQa_inspector_status(QaAppConstants.qaInspectorSubmit); //
	 * report.setQa_inspector_submitted_by(userName); //
	 * report.setQa_inspector_submitted_on(date); //
	 * report.setQa_inspector_submitted_id(userId); //
	 * report.setQa_inspector_sign(userName); //
	 * report.setQa_manager_status(AppConstants.waitingStatus);
	 * 
	 * 
	 * // Save report inwardinspectionreportrepository.save(report);
	 * 
	 * // // Save Line1 Items // if (details.getLine1() != null &&
	 * !details.getLine1().isEmpty()) { // for (InwardInspectionReportLine1 line1 :
	 * details.getLine1()) { // line1.setId(report.getId()); //
	 * inwardinspectionreportline1repository.save(line1); // } // } // // // Save
	 * Line2 Items // if (details.getLine2() != null &&
	 * !details.getLine2().isEmpty()) { // for (InwardInspectionReportLine2 line2 :
	 * details.getLine2()) { // line2.setId(report.getId()); //
	 * inwardinspectionreportline2repository.save(line2); // } // } // Save line
	 * items for Line1 List<InwardInspectionReportLine1> line1 = details.getLine1();
	 * for (InwardInspectionReportLine1 line : line1) { line.setId(report.getId());
	 * inwardinspectionreportline1repository.save(line); }
	 * 
	 * // Save line items for Line2 List<InwardInspectionReportLine2> line2 =
	 * details.getLine2(); for (InwardInspectionReportLine2 line : line2) {
	 * line.setId(report.getId()); inwardinspectionreportline2repository.save(line);
	 * } report.setLine1(line1); report.setLine2(line2); // Update report details
	 * report.setQa_inspector_status(QaAppConstants.qaInspectorSubmit);
	 * report.setQa_inspector_submitted_by(userName);
	 * report.setQa_inspector_submitted_on(date);
	 * report.setQa_inspector_submitted_id(userId);
	 * report.setQa_inspector_sign(userName);
	 * report.setQa_manager_status(AppConstants.waitingStatus);
	 * inwardinspectionreportrepository.save(report);
	 * 
	 * 
	 * 
	 * // Save History Record InwardInspectionReportHistory history = new
	 * InwardInspectionReportHistory(); BeanUtils.copyProperties(report, history);
	 * String formatNo = report.getFormatNo(); String reportDate =
	 * report.getGr_date(); String suplierName = report.getSupplier_name(); String
	 * invoice = report.getInvoice_no(); String iirNo = report.getIir_no(); int
	 * version = inwardinspectionreporthistoryrepository.getMaximumVersion(formatNo,
	 * reportDate, suplierName,invoice,iirNo) .map(v -> v + 1).orElse(1);
	 * history.setVersion(version);
	 * 
	 * inwardinspectionreporthistoryrepository.save(history);
	 * 
	 * List<InwardInspectionReportLine1> line1List = details.getLine1(); // Save
	 * Line1 History Items if (details.getLine1() != null &&
	 * !details.getLine1().isEmpty()) { for (InwardInspectionReportLine1 lines1 :
	 * line1List) { InwardInspectionReportLine1History line1History = new
	 * InwardInspectionReportLine1History(); // BeanUtils.copyProperties(lines1,
	 * line1History);
	 * 
	 * try { BeanUtils.copyProperties(lines1, line1History); } catch (Exception e) {
	 * System.err.println("Exception in copyProperties: " + e.getMessage());
	 * e.printStackTrace(); } line1History.setHistory_id(history.getHistory_id());
	 * try { inwardinspectionreportline1historyrepository.save(line1History); }
	 * catch (Exception e) { System.err.println("Exception in savingProperties: " +
	 * e.getMessage()); e.printStackTrace(); } } }
	 * 
	 * List<InwardInspectionReportLine2> line2List = details.getLine2(); // Save
	 * Line2 History Items if (details.getLine2() != null &&
	 * !details.getLine2().isEmpty()) { for (InwardInspectionReportLine2 lines2 :
	 * line2List) { InwardInspectionReportLine2History line2History = new
	 * InwardInspectionReportLine2History(); BeanUtils.copyProperties(lines2,
	 * line2History); line2History.setHistory_id(history.getHistory_id());
	 * inwardinspectionreportline2historyrepository.save(line2History); } }
	 * 
	 * inwardinspectionreporthistoryrepository.save(history);
	 * 
	 * // Send email notification (optional)
	 * 
	 * } else { return new ResponseEntity<>(new ApiResponse(false,
	 * "Unauthorized to submit report"), HttpStatus.FORBIDDEN); }
	 * 
	 * } catch (Exception e) { return new ResponseEntity<>(new ApiResponse(false,
	 * "Submission failed: " + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR); }
	 * 
	 * return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"),
	 * HttpStatus.OK); }
	 */

	// new submit
	public ResponseEntity<?> submitInwardInspectionReport(InwardInspectionReport details, HttpServletRequest http) {
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			// For Fetching Current Date
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);
			// Validate mandatory fields
			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields!"),
						HttpStatus.BAD_REQUEST);
			}
			InwardInspectionReport report;

			String[] ignoreProps = { "id", "createdBy", "createdAt", "qa_inspector_status", "qa_inspector_saved_on",
					"qa_inspector_saved_by", "qa_inspector_saved_id", "qa_manager_status", "qa_manager_submitted_on",
					"qa_manager_submitted_by", "qa_manager_submitted_id", "qa_manager_sign", "line1", "line2" };

			if (details.getId() != null) {
				report = inwardinspectionreportrepository.findById(details.getId())
						.orElse(new InwardInspectionReport());

				BeanUtils.copyProperties(details, report, ignoreProps);
			} else {
				report = details;
			}

			// Allow only QA Inspector to submit
			if (userRole.equalsIgnoreCase("ROLE_QA")) {
//	            // Update report details
				report.setQa_inspector_status(QaAppConstants.qaInspectorSubmit);
				report.setQa_inspector_submitted_by(userName);
				report.setQa_inspector_submitted_on(date);
				report.setQa_inspector_submitted_id(userId);
				report.setQa_inspector_sign(userName);
				report.setQa_manager_status(AppConstants.waitingStatus);

				// Save report
				inwardinspectionreportrepository.save(report);

				// Save Line1 Items
				if (details.getLine1() != null && !details.getLine1().isEmpty()) {
					for (InwardInspectionReportLine1 line1 : details.getLine1()) {
						line1.setId(report.getId());
						inwardinspectionreportline1repository.save(line1);
					}
				}

				// Save Line2 Items
				if (details.getLine2() != null && !details.getLine2().isEmpty()) {
					for (InwardInspectionReportLine2 line2 : details.getLine2()) {
						line2.setId(report.getId());
						inwardinspectionreportline2repository.save(line2);
					}
				}

				// Save History Record
				InwardInspectionReportHistory history = new InwardInspectionReportHistory();
				String[] ignoreLine = { "line1", "line2", "history_id" };
				BeanUtils.copyProperties(report, history, ignoreLine);
				String formatNo = report.getFormatNo();
				String reportDate = report.getGr_date();
				String suplierName = report.getSupplier_name();
				String invoice = report.getInvoice_no();
				String iirNo = report.getIir_no();
				int version = inwardinspectionreporthistoryrepository
						.getMaximumVersion(formatNo, reportDate, suplierName, invoice, iirNo).map(v -> v + 1).orElse(1);
				history.setVersion(version);

				inwardinspectionreporthistoryrepository.save(history);

				List<InwardInspectionReportLine1> historyline1 = report.getLine1();

				for (InwardInspectionReportLine1 obj : historyline1) {

					InwardInspectionReportLine1History objHistory = new InwardInspectionReportLine1History();

//					BeanUtils.copyProperties(obj, objHistory);
					objHistory.setObservation(obj.getObservation());
					objHistory.setParameter(obj.getParameter());
					objHistory.setSpecification(obj.getSpecification());
					objHistory.setHistory_id(history.getHistory_id());
					inwardinspectionreportline1historyrepository.save(objHistory);

				}

				List<InwardInspectionReportLine2> historyline2 = report.getLine2();

				for (InwardInspectionReportLine2 obj : historyline2) {

					InwardInspectionReportLine2History objHistory = new InwardInspectionReportLine2History();

//						BeanUtils.copyProperties(obj, objHistory);
					objHistory.setCategory(obj.getCategory());
					objHistory.setDefect_observation(obj.getDefect_observation());
					objHistory.setDefects(obj.getDefects());
					objHistory.setMaximum_no_of_defects(obj.getMaximum_no_of_defects());
					objHistory.setNo_of_defects(obj.getNo_of_defects());
					objHistory.setTotal_no_of_defects(obj.getTotal_no_of_defects());
					objHistory.setHistory_id(history.getHistory_id());
					inwardinspectionreportline2historyrepository.save(objHistory);

				}

				inwardinspectionreporthistoryrepository.save(history);

				try {

					qamailfunction.sendMailToQaManagerInward(report);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(true, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " cannot submit details"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Submission failed: " + e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity(new ApiResponse(true, "Submitted Sucessfully"), HttpStatus.OK);
	}

//APPROVE /REJECT
	public ResponseEntity<?> approveRejectInwardInspection(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		InwardInspectionReport object = new InwardInspectionReport();

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		// For Fetching Current Date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);
		try {

			object = inwardinspectionreportrepository.getFormById(approvalResponse.getId());

			InwardInspectionReportHistory objHistory = new InwardInspectionReportHistory();

			String qaInspectorStatus = object.getQa_inspector_status();

			String qaManagerStatus = object.getQa_manager_status();

			String status = "";

			if (qaInspectorStatus.equalsIgnoreCase(QaAppConstants.qaInspectorSubmit)
					&& qaManagerStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

					String reason = approvalResponse.getRemarks();

					String format_no = object.getFormatNo();

					String formatNo = object.getFormatNo();
					String reportDate = object.getGr_date();
					String suplierName = object.getSupplier_name();
					String invoice = object.getInvoice_no();
					String iirNo = object.getIir_no();

					if (format_no.equals(QaAppConstants.inward_formt_carton)
							|| format_no.equals(QaAppConstants.inward_format_film)
							|| format_no.equals(QaAppConstants.inward_format_ziplock)
							|| format_no.equals(QaAppConstants.inward_format_stick)
							|| format_no.equals(QaAppConstants.inward_format_jar)) {
						objHistory = inwardinspectionreporthistoryrepository.fetchLastSubmittedRecord(formatNo,
								reportDate, suplierName, invoice, iirNo);
					}

					if (approvalResponse.getStatus().equals("Approve")) {
						object.setQa_manager_status(QaAppConstants.qaMrApprovedStatus);
						objHistory.setQa_manager_status(QaAppConstants.qaMrApprovedStatus);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						object.setReason(reason);
						object.setQa_manager_status(QaAppConstants.qaMrRejectedStatus);
						objHistory.setReason(reason);
						objHistory.setQa_manager_status(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					object.setQa_manager_submitted_on(date);
					object.setQa_manager_submitted_by(userName);
					object.setQa_manager_submitted_id(userId);
					object.setQa_manager_sign(userName);

					inwardinspectionreportrepository.save(object);

					objHistory.setQa_manager_submitted_on(date);
					objHistory.setQa_manager_submitted_by(userName);
					objHistory.setQa_manager_submitted_id(userId);
					objHistory.setQa_manager_sign(userName);

					inwardinspectionreporthistoryrepository.save(objHistory);

					return new ResponseEntity<>(
							new ApiResponse(true, "QA_MANAGER/ROLE_DESIGNEE" + status + " Successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			} else {
				return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			log.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Approve/Reject Record " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	// GET BY PARAM

	public ResponseEntity<?> getByParamInwardInspection(String formatNo, String date, String supplierName,
			String itemCode, String item_description) {
		try {

			InwardInspectionReport list = inwardinspectionreportrepository.getdetailsbyParam(formatNo, date,
					supplierName, itemCode, item_description);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR PRINT
	public ResponseEntity<?> getByPrintInwardInspection(String formatNo, String gr_date, String supplierName,
			String invoice_no, String iirNo) {
		/*
		 * try {
		 * 
		 * List<InwardInspectionReport> list =
		 * inwardinspectionreportrepository.printParam(formatNo, gr_date, supplierName,
		 * invoice_no,iirNo);
		 * 
		 * if (list == null || list.isEmpty()) { return new ResponseEntity(new
		 * ApiResponse(true, "No data"), HttpStatus.OK); }
		 * 
		 * return new ResponseEntity<>(list, HttpStatus.OK); } catch (Exception e) {
		 * log.error("Unable to get Details!", e); return new
		 * ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST); } }
		 */

		InwardInspectionDetailsDto response = new InwardInspectionDetailsDto();

		// Step 1: Retrieve Supplier Names based on GR Date
		if (supplierName == null) {
			List<String> suppliers = inwardinspectionreportrepository.getSuppliersByGrDateInward(formatNo, gr_date);
			response.setSuppliers(suppliers);
		}

		// Step 2: Retrieve Invoice Numbers based on GR Date and Supplier
		else if (invoice_no == null) {
			List<String> invoices = inwardinspectionreportrepository.getInvoicesByDateAndSupplierInward(formatNo,
					gr_date, supplierName);
			response.setInvoices(invoices);
		}

		// Step 3: Retrieve IIR Numbers based on GR Date, Supplier, and Invoice
		else if (iirNo == null) {
			List<String> iirNumbers = inwardinspectionreportrepository.getIirByDateSupplierAndInvoice(formatNo, gr_date,
					supplierName, invoice_no);
			response.setIirNumbers(iirNumbers);
		}

		// Step 4: Retrieve Details based on GR Date, Supplier, Invoice, and IIR No
		else {
			List<InwardInspectionReport> details = inwardinspectionreportrepository.getDetailsByIir(formatNo, gr_date,
					supplierName, invoice_no, iirNo);

			// Check if results are not null and contain at least one row
			if (details != null && !details.isEmpty()) {
				response.setInspectionDetails(details);
			} else {
				response.setInspectionDetails(null);
			}
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	// GET FOR SUMMARY
	public ResponseEntity<?> getSummary(String formatNo, HttpServletRequest http) {

		List<InwardInspectionReport> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_QA")) {

				details = inwardinspectionreportrepository.inspectorSummary(formatNo);
			} else if (userRole.equals("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = inwardinspectionreportrepository.managerSummary(formatNo);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// --------------------------MANAGMENT OF INCIDENCE---------------------//
	// SAVE
	public ResponseEntity<?> saveManagementOfIncidence(ManagementOfIncidence details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}
		// For Fetching Current Date
		LocalDateTime currentDate = LocalDateTime.now();
		ManagementOfIncidence incidenceObj = null;
		try {
			// Get user details
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			// Current date
			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			// Check if updating or creating new record
			if (details.getIncidence_id() != null) {
				incidenceObj = managementofincidencerepository.findById(details.getIncidence_id()).orElseThrow(
						() -> new RuntimeException("Incidence not found with id " + details.getIncidence_id()));

				String[] ignoreProps = { "incidence_id", "createdBy", "createdAt", "hod_save_by", "hod_save_on",
						"hod_submit_by", "hod_submit_on", "qa_manager_status", "qa_manager_approved_on" };
				BeanUtils.copyProperties(details, incidenceObj, ignoreProps);
			} else {
				incidenceObj = details;
			}

			// Handle save action for HOD role
			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {
				incidenceObj.setHod_status(QaAppConstants.hodSaved);
				incidenceObj.setHod_save_by(userName);
				incidenceObj.setHod_save_on(date);
				incidenceObj.setHod_save_id(userId);

				managementofincidencerepository.save(incidenceObj);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			log.error("Unable to save Management Of Incidence details!", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(incidenceObj, HttpStatus.CREATED);
	}

	// SUBMIT
	public ResponseEntity<?> submitManagementOfIncidence(ManagementOfIncidence details, HttpServletRequest http) {
		try {
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			// For Fetching Current Date
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			// Validate mandatory fields
			if (details == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
						HttpStatus.BAD_REQUEST);
			}

			ManagementOfIncidence incidence;
			if (details.getIncidence_id() != null) {
				incidence = managementofincidencerepository.findById(details.getIncidence_id()).orElseThrow(
						() -> new RuntimeException("Incidence not found with id " + details.getIncidence_id()));
				String[] ignoreProps = { "incidence_id", "createdBy", "createdAt", "hod_save_by", "hod_save_on",
						"hod_submit_by", "hod_submit_on", "qa_manager_status", "qa_manager_approved_on" };
				BeanUtils.copyProperties(details, incidence, ignoreProps);

			} else {
				incidence = details;
			}

			// Allow only HOD to submit
			if (role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {
				// Update incidence details
				incidence.setHod_status(QaAppConstants.hodSubmitted);
				incidence.setHod_submit_by(userName);
				incidence.setHod_submit_on(date);
				incidence.setHod_submit_id(userId);
				incidence.setHod_sign(userName);
				incidence.setQa_manager_status(AppConstants.waitingStatus);
				incidence.setPlant_head_status("");
				managementofincidencerepository.save(incidence);

				// Save History Record
				ManagementOfIncidenceHistory history = new ManagementOfIncidenceHistory();
				BeanUtils.copyProperties(incidence, history);
				String incidenceDate = incidence.getDate();
				String month = incidence.getMonth();
				String year = incidence.getYear();
				int version = managementofincidencehistoryrepository.getMaximumVersion(incidenceDate, month, year)
						.map(v -> v + 1).orElse(1);
				history.setVersion(version);

				managementofincidencehistoryrepository.save(history);

				// MAIL
				try {

					qamailfunction.sendMailToQaManagerIncidence(incidence);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(true, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit incidence"),
						HttpStatus.FORBIDDEN);
			}

		} catch (Exception e) {
			log.error("**** Unable to submit Management of Incidence details! ****", e);
			return new ResponseEntity<>(new ApiResponse(false, "Submission failed: " + e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Incidence submitted successfully"), HttpStatus.OK);
	}

	// APPROVE
	public ResponseEntity<?> approveRejectManagementOfIncidence(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ManagementOfIncidence incidenceObj = null;

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		// Fetching current date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		try {
			// Fetching the incidence object by ID
			incidenceObj = managementofincidencerepository.findById(approvalResponse.getId())
					.orElseThrow(() -> new RuntimeException("Incidence not found with id " + approvalResponse.getId()));
			;

			// Fetching the current status of the HOD and QA Manager
			String hodStatus = incidenceObj.getHod_status();
			String qaManagerStatus = incidenceObj.getQa_manager_status();
			String plantHeadStatus = incidenceObj.getPlant_head_status();

			String status = "";
			ManagementOfIncidenceHistory objHistory = new ManagementOfIncidenceHistory();
			// First level of approval/rejection by QA Manager
			if (hodStatus.equalsIgnoreCase(QaAppConstants.hodSubmitted)
					&& qaManagerStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_MR")) {

					String reason = approvalResponse.getRemarks();
					objHistory = managementofincidencehistoryrepository.fetchLastSubmittedRecord(incidenceObj.getDate(),
							incidenceObj.getMonth(), incidenceObj.getYear());

					if (approvalResponse.getStatus().equals("Approve")) {
						incidenceObj.setQa_manager_status(QaAppConstants.qaMrApprovedStatus);
						incidenceObj.setPlant_head_status(AppConstants.waitingStatus);
						;
						incidenceObj.setStatus_of_action_taken(approvalResponse.getStatus_of_action_taken());
						objHistory.setQa_manager_status(QaAppConstants.qaMrApprovedStatus);
						objHistory.setStatus_of_action_taken(approvalResponse.getStatus_of_action_taken());
						status = "Approved";

						// MAIL
//						try {
//
//							qamailfunction.sendMailToPlantHeadIncidence(incidenceObj);
//						} catch (Exception ex) {
//							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
//									HttpStatus.OK);
//						}
					} else if (approvalResponse.getStatus().equals("Reject")) {
						incidenceObj.setReason(reason);
						incidenceObj.setQa_manager_status(QaAppConstants.qaMrRejectedStatus);
						objHistory.setReason(reason);
						objHistory.setQa_manager_status(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					incidenceObj.setQa_manager_approved_on(date);
					incidenceObj.setQa_manager_approved_by(userName);
					incidenceObj.setQa_manager_approver_id(userId);
					incidenceObj.setQa_manager_sign(userName);
					// Save the updated incidence object
					managementofincidencerepository.save(incidenceObj);
					// History
					objHistory.setQa_manager_approved_on(date);
					objHistory.setQa_manager_approved_by(userName);
					objHistory.setQa_manager_approver_id(userId);
					objHistory.setQa_manager_sign(userName);
					// Save the updated incidence object
					managementofincidencehistoryrepository.save(objHistory);
					
					try {

						qamailfunction.sendMailToPlantHeadIncidence(incidenceObj);
					} catch (Exception ex) {
						return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
								HttpStatus.OK);
					}

					return new ResponseEntity<>(new ApiResponse(true, "QA Manager " + status + " successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to approve/reject"),
							HttpStatus.FORBIDDEN);
				}

				// Second level of approval/rejection by Plant Head
			} else if (qaManagerStatus.equalsIgnoreCase(QaAppConstants.qaMrApprovedStatus)
					&& plantHeadStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("ROLE_PLANT_HEAD")) {
					objHistory = managementofincidencehistoryrepository.fetchLastSubmittedRecord(incidenceObj.getDate(),
							incidenceObj.getMonth(), incidenceObj.getYear());

					String reason = approvalResponse.getRemarks();

					if (approvalResponse.getStatus().equals("Approve")) {
						incidenceObj.setPlant_head_status(QaAppConstants.plantHeadApprove);
						objHistory.setPlant_head_status(QaAppConstants.plantHeadApprove);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						incidenceObj.setReason(reason);
						incidenceObj.setPlant_head_status(QaAppConstants.plantHeadReject);
						objHistory.setReason(reason);
						objHistory.setPlant_head_status(QaAppConstants.plantHeadReject);
						status = "Rejected";
					}

					incidenceObj.setPlant_head_approved_on(date);
					incidenceObj.setPlant_head_approved_by(userName);
					incidenceObj.setPlant_head_approver_id(userId);
					incidenceObj.setPlant_head_sign(userName);

					// Save the updated incidence object
					managementofincidencerepository.save(incidenceObj);

					objHistory.setPlant_head_approved_on(date);
					objHistory.setPlant_head_approved_by(userName);
					objHistory.setPlant_head_approver_id(userId);
					objHistory.setPlant_head_sign(userName);

					// Save the updated incidence object
					managementofincidencehistoryrepository.save(objHistory);

					return new ResponseEntity<>(new ApiResponse(true, "Plant Head " + status + " successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to approve/reject"),
							HttpStatus.FORBIDDEN);
				}

			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, "Invalid status or no pending approval for this user"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			log.error("Unable to approve/reject Management of Incidence", e);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// GET BY PARAM

	public ResponseEntity<?> getByParamIncidenceManagement(String date) {
		try {

			ManagementOfIncidence list = managementofincidencerepository.getdetailsbyParam(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR PRINT
	public ResponseEntity<?> getByPrintManagementOfIncidence(String year) {
		try {

			List<ManagementOfIncidence> list = managementofincidencerepository.printParam(year);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR SUMMARY
	public ResponseEntity<?> getSummaryManagmentOfIncidence(String department, HttpServletRequest http) {

		List<ManagementOfIncidence> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_HOD") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {

				details = managementofincidencerepository.hodSummary(department);
			} else if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")
					|| userRole.equals("ROLE_PLANT_HEAD")) {

				details = managementofincidencerepository.plantHeadSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// ---------------LIST OF SHARPTOOLS-------------------//
	public ResponseEntity<?> saveSharpTools(ListOfSharpTools details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}
		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		// For Fetching Current Date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);
		ListOfSharpTools savedTool = null;
		try {

			if (details.getTool_id() != null) {
				savedTool = listofsharptoolsrepository.findById(details.getTool_id())
						.orElseThrow(() -> new RuntimeException("Tool not found with id " + details.getTool_id()));

				// Copy properties, ignoring certain fields
				String[] ignoreProps = { "tool_id", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_saved_on", "qa_inspector_saved_by", "qa_inspector_saved_id", "qa_manager_status",
						"qa_manager_saved_on", "qa_manager_saved_by", "qa_manager_saved_id", "listofsharptoolslines" };
				BeanUtils.copyProperties(details, savedTool, ignoreProps);
			} else {
				savedTool = details;
			}
			if (role.equals("ROLE_QA")) {
				// Save the main tool details
				savedTool = listofsharptoolsrepository.save(savedTool);

				// Save associated line items
				List<ListOfSharpToolsLines> lineItems = details.getListofsharptoolslines();
				if (lineItems != null) {
					for (ListOfSharpToolsLines line : lineItems) {
						line.setTool_id(savedTool.getTool_id());
						listofsharptoolslinesrepository.save(line);
					}
				}

				savedTool.setQa_inspector_saved_by(userName);
				savedTool.setQa_inspector_saved_on(date);
				savedTool.setQa_inspector_saved_id(userId);
				savedTool.setQa_inspector_status(QaAppConstants.qaInspectorSave);

				listofsharptoolsrepository.save(savedTool);

			} else {
				return new ResponseEntity(new ApiResponse(false, role + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedTool, HttpStatus.CREATED);
	}

//Submit
	public ResponseEntity<?> submitSharpTools(ListOfSharpTools details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}
		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		// For Fetching Current Date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);
		ListOfSharpTools savedTool = null;
		try {

			if (details.getTool_id() != null) {
				savedTool = listofsharptoolsrepository.findById(details.getTool_id())
						.orElseThrow(() -> new RuntimeException("Tool not found with id " + details.getTool_id()));

				// Copy properties, ignoring certain fields
				String[] ignoreProps = { "tool_id", "createdBy", "createdAt", "qa_inspector_status",
						"qa_inspector_saved_on", "qa_inspector_saved_by", "qa_inspector_saved_id", "qa_manager_status",
						"qa_manager_saved_on", "qa_manager_saved_by", "qa_manager_saved_id", "listofsharptoolslines" };
				BeanUtils.copyProperties(details, savedTool, ignoreProps);
			} else {
				savedTool = details;
			}
			if (role.equals("ROLE_QA")) {
				// Save the main tool details

				// Update report details
				savedTool.setQa_inspector_status(QaAppConstants.qaInspectorSubmit);
				savedTool.setQa_inspector_submitted_by(userName);
				savedTool.setQa_inspector_submitted_on(date);
				savedTool.setQa_inspector_submitted_id(userId);
				savedTool.setQa_inspector_sign(userName);
				savedTool.setQa_manager_status(AppConstants.waitingStatus);
				listofsharptoolsrepository.save(savedTool);

				// Save associated line items
				List<ListOfSharpToolsLines> lineItems = details.getListofsharptoolslines();
				if (lineItems != null) {
					for (ListOfSharpToolsLines line : lineItems) {
						line.setTool_id(savedTool.getTool_id());
						listofsharptoolslinesrepository.save(line);
					}
				}
				// Save History Record
				ListOfSharpToolsHistory history = new ListOfSharpToolsHistory();
				BeanUtils.copyProperties(savedTool, history);
				String reportDate = savedTool.getDate();
				String department = savedTool.getDepartment();
				int version = listofsharptoolshistoryrepository.getMaximumVersion(reportDate, department)
						.map(v -> v + 1).orElse(1);
				history.setVersion(version);

				listofsharptoolshistoryrepository.save(history);

				// Save Line1 History Items
				if (details.getListofsharptoolslines() != null && !details.getListofsharptoolslines().isEmpty()) {
					for (ListOfSharpToolsLines line1 : details.getListofsharptoolslines()) {
						ListOfSharpToolsLinesHistory line1History = new ListOfSharpToolsLinesHistory();
						BeanUtils.copyProperties(line1, line1History);
						line1History.setHistory_id(history.getHistory_id());
						listofsharptoolslineshistoryrepository.save(line1History);
					}
				}

				// MAIL
				try {

					qamailfunction.sendMailToQaManagerListOfSharptools(savedTool);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
							HttpStatus.OK);
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit report"),
						HttpStatus.FORBIDDEN);
			}

		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Submission failed: " + e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"), HttpStatus.OK);
	}

	// APPROVE
	public ResponseEntity<?> approveRejectListOfSharpTools(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		ListOfSharpTools Obj = null;

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		// Fetching current date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		try {
			// Fetching the incidence object by ID
			Obj = listofsharptoolsrepository.findById(approvalResponse.getId())
					.orElseThrow(() -> new RuntimeException("Report not found with id " + approvalResponse.getId()));
			;

			// Fetching the current status of the HOD and QA Manager
			String qaInspectorStatus = Obj.getQa_inspector_status();

			String qaManagerStatus = Obj.getQa_manager_status();

			String status = "";
			ListOfSharpToolsHistory objHistory = new ListOfSharpToolsHistory();
			// First level of approval/rejection by QA Manager
			if (qaInspectorStatus.equalsIgnoreCase(QaAppConstants.qaInspectorSubmit)
					&& qaManagerStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
						|| userRole.equalsIgnoreCase("ROLE_MR")) {

					String reason = approvalResponse.getRemarks();
					objHistory = listofsharptoolshistoryrepository.fetchLastSubmittedRecord(Obj.getDate(),
							Obj.getDepartment());

					if (approvalResponse.getStatus().equals("Approve")) {
						Obj.setQa_manager_status(QaAppConstants.qaMrApprovedStatus);
						objHistory.setQa_manager_status(QaAppConstants.qaMrApprovedStatus);
						status = "Approved";
					} else if (approvalResponse.getStatus().equals("Reject")) {
						Obj.setReason(reason);
						Obj.setQa_manager_status(QaAppConstants.qaMrRejectedStatus);
						objHistory.setReason(reason);
						objHistory.setQa_manager_status(QaAppConstants.qaMrRejectedStatus);
						status = "Rejected";
					}

					Obj.setQa_manager_approved_on(date);
					Obj.setQa_manager_approved_by(userName);
					Obj.setQa_manager_approved_id(userId);
					Obj.setQa_manager_sign(userName);
					// Save the updated incidence object
					listofsharptoolsrepository.save(Obj);
					// History
					Obj.setQa_manager_approved_on(date);
					Obj.setQa_manager_approved_by(userName);
					Obj.setQa_manager_approved_id(userId);
					Obj.setQa_manager_sign(userName);
					// Save the updated incidence object
					listofsharptoolshistoryrepository.save(objHistory);

					return new ResponseEntity<>(new ApiResponse(true, userRole + " " + status + " successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to approve/reject"),
							HttpStatus.FORBIDDEN);
				}

			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, "Invalid status or no pending approval for this user"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			log.error("Unable to approve/reject List Of Sharp Tools", e);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// GET BY PARAM

	public ResponseEntity<?> getByParamListOfSharpTools(String date, String department) {
		try {

			ListOfSharpTools list = listofsharptoolsrepository.getdetailsbyParam(date, department);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR PRINT
	public ResponseEntity<?> getByPrintListOfSharpTools(String date, String department) {
		try {

			List<ListOfSharpTools> list = listofsharptoolsrepository.printParam(date, department);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR SUMMARY
	public ResponseEntity<?> getSummaryListOfSharpTools(HttpServletRequest http) {

		List<ListOfSharpTools> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_QA")) {

				details = listofsharptoolsrepository.qaInspectorSummary();
			} else if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_DESIGNEE")
					|| userRole.equalsIgnoreCase("ROLE_MR")) {

				details = listofsharptoolsrepository.qaManagerSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// ----------------------ANNUAL PLAN-------------------------//
	// SAVE
	public ResponseEntity<?> saveAnnualPlan(AnnualPlan details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		AnnualPlan savedPlan = null;
		try {
			// If the AnnualPlan already exists, fetch it and update details
			if (details.getId() != null) {
				savedPlan = annualPlanRepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Plan not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "mr_status", "mr_saved_on", "mr_saved_by",
						"mr_saved_id", "mr_submitted_on", "mr_submitted_by", "mr_submitted_id", "mr_sign",
						"annualplanlines" };
				BeanUtils.copyProperties(details, savedPlan, ignoreProps);
			} else {
				savedPlan = details;
			}

			// Allow only specific roles to save
			if (role.equals("QA_MANAGER") || role.equals("ROLE_MR")) {
				// Save the AnnualPlan
				savedPlan = annualPlanRepository.save(savedPlan);

				// Save the related AnnualPlanLines
				List<AnnualPlanLines> lines = details.getAnnualplanlines();
				if (lines != null) {
					for (AnnualPlanLines line : lines) {
						line.setId(savedPlan.getId());
						annualPlanLinesRepository.save(line);
					}
				}

				// Update save metadata
				savedPlan.setMr_saved_by(userName);
				savedPlan.setMr_saved_on(date);
				savedPlan.setMr_saved_id(userId);
				savedPlan.setMR_status(QaAppConstants.mrSaved);

				// Save updated AnnualPlan
				annualPlanRepository.save(savedPlan);

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedPlan, HttpStatus.CREATED);
	}

	// SUBMIT
	public ResponseEntity<?> submitAnnualPlan(AnnualPlan details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		AnnualPlan savedPlan = null;
		try {
			// Fetch existing plan details
			if (details.getId() != null) {
				savedPlan = annualPlanRepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Plan not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "mr_status", "mr_saved_on", "mr_saved_by",
						"mr_saved_id", "mr_submitted_on", "mr_submitted_by", "mr_submitted_id", "mr_sign",
						"annualplanlines" };
				BeanUtils.copyProperties(details, savedPlan, ignoreProps);
			} else {
				savedPlan = details;
			}

			// Allow only ROLE_QA role to submit
			if (role.equals("QA_MANAGER") || role.equals("ROLE_MR")) {
				// Update the AnnualPlan submission status
				savedPlan.setMR_status(QaAppConstants.mrSubmitted);
				savedPlan.setMr_submitted_by(userName);
				savedPlan.setMr_submitted_on(date);
				savedPlan.setMr_submitted_id(userId);
				savedPlan.setMr_sign(userName);

				// Save the updated AnnualPlan
				annualPlanRepository.save(savedPlan);

				// Save related lines
				List<AnnualPlanLines> lines = details.getAnnualplanlines();
				if (lines != null) {
					for (AnnualPlanLines line : lines) {
						line.setId(savedPlan.getId());
						annualPlanLinesRepository.save(line);
					}
				}

				// Save History Record
				AnnualPlanHistory history = new AnnualPlanHistory();
				BeanUtils.copyProperties(savedPlan, history);
				String reportYear = savedPlan.getYear();
				int version = annualPlanHistoryRepository.getMaximumVersion(reportYear).map(v -> v + 1).orElse(1);
				history.setVersion(version);

				annualPlanHistoryRepository.save(history);

				// Save Line1 History Items
				if (details.getAnnualplanlines() != null && !details.getAnnualplanlines().isEmpty()) {
					for (AnnualPlanLines line1 : details.getAnnualplanlines()) {
						AnnualPlanLinesHistory line1History = new AnnualPlanLinesHistory();
						BeanUtils.copyProperties(line1, line1History);
						line1History.setHistory_id(history.getHistory_id());
						annualPlanLinesHistoryRepository.save(line1History);
					}
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit report"),
						HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Submission failed: " + e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"), HttpStatus.OK);
	}

	// GET BY PARAM

	public ResponseEntity<?> getByParamAnnualReport(String year) {
		try {

			AnnualPlan list = annualPlanRepository.getdetailsbyParam(year);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR PRINT
	public ResponseEntity<?> getByPrintAnnualReport(String year) {
		try {

			List<AnnualPlan> list = annualPlanRepository.printParam(year);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR SUMMARY
	public ResponseEntity<?> getSummaryAnnualPlan(HttpServletRequest http) {

		List<AnnualPlan> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")) {

				details = annualPlanRepository.mrSummary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

//---------AGENDA FOR MANAGEMENT REVIEW MEETING----------------//		
	// SAVE
	public ResponseEntity<?> saveAgendaForManagementReviewMeeting(AgendaForManagementReviewMeeting details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		AgendaForManagementReviewMeeting savedMeeting = null;
		try {

			if (details.getId() != null) {
				savedMeeting = agendaformanagementreviewmeetingrepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Plan not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "mrOrQaManagerStatus", "mrOrQaManagerSavedOn",
						"mrOrQaManagerSavedBy", "mrOrQaManagerSavedId", "mrOrQaManagerSubmittedOn",
						"mrOrQaManagerSubmittedBy", "mrOrQaManagerSubmittedId", "mrOrQaManagerSign",
						"agendatopicslines", "agendaformanagementattendees" };
				BeanUtils.copyProperties(details, savedMeeting, ignoreProps);
			} else {
				savedMeeting = details;
			}

			// Allow only specific roles to save
			if (role.equals("QA_MANAGER") || role.equals("ROLE_MR")) {

				savedMeeting = agendaformanagementreviewmeetingrepository.save(savedMeeting);

				// Save the related Lines
				List<AgendaTopicsLines> lines = details.getAgendatopicslines();
				if (lines != null) {
					for (AgendaTopicsLines line : lines) {
						line.setId(savedMeeting.getId());
						agendatopicslinesrepository.save(line);
					}
				}

				List<AgendaForManagementAttendees> lines1 = details.getAgendaformanagementattendees();
				if (lines != null) {
					for (AgendaForManagementAttendees line : lines1) {
						line.setId(savedMeeting.getId());
						agendaformanagementattendeesrepository.save(line);
					}
				}

				// Update save metadata
				savedMeeting.setMrOrQaManagerSavedBy(userName);
				savedMeeting.setMrOrQaManagerSavedOn(date);
				savedMeeting.setMrOrQaManagerSavedId(userId);
				savedMeeting.setMrOrQaManagerStatus(QaAppConstants.mrOrQaManagerSaved);

				// Save updated AnnualPlan
				agendaformanagementreviewmeetingrepository.save(savedMeeting);

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedMeeting, HttpStatus.CREATED);
	}

	// SUBMIT
	/*
	 * public ResponseEntity<?>
	 * submitAgendaForManagementReviewMeeting(AgendaForManagementReviewMeeting
	 * details, HttpServletRequest http) { if (details == null) { return new
	 * ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
	 * HttpStatus.BAD_REQUEST); }
	 * 
	 * String role = scaUtil.getUserRoleFromRequest(http, tokenProvider); Long
	 * userId = scaUtil.getUserIdFromRequest(http, tokenProvider); String userName =
	 * userRepository.getUserName(userId);
	 * 
	 * LocalDateTime currentDate = LocalDateTime.now(); Date date =
	 * QAUtil.convertLocalDateTimeToDate(currentDate);
	 * 
	 * AgendaForManagementReviewMeeting savedMeeting = null; try { // Fetch existing
	 * plan details if (details.getId() != null) { savedMeeting =
	 * agendaformanagementreviewmeetingrepository.findById(details.getId())
	 * .orElseThrow(() -> new RuntimeException("Plan not found with id " +
	 * details.getId()));
	 * 
	 * String[] ignoreProps = { "id", "createdBy", "createdAt",
	 * "mrOrQaManagerStatus", "mrOrQaManagerSavedOn", "mrOrQaManagerSavedBy",
	 * "mrOrQaManagerSavedId","mrOrQaManagerSubmittedOn","mrOrQaManagerSubmittedBy",
	 * "mrOrQaManagerSubmittedId","mrOrQaManagerSign",
	 * "agendatopicslines","agendaformanagementattendees"};
	 * BeanUtils.copyProperties(details, savedMeeting, ignoreProps); } else {
	 * savedMeeting = details; }
	 * 
	 * 
	 * if (role.equals("QA_MANAGER")||role.equals("ROLE_MR")) {
	 * 
	 * savedMeeting.setMrOrQaManagerStatus(QaAppConstants.mrOrQaManagerSubmitted);
	 * savedMeeting.setMrOrQaManagerSubmittedBy(userName);
	 * savedMeeting.setMrOrQaManagerSubmittedOn(date);
	 * savedMeeting.setMrOrQaManagerSubmittedId(userId);
	 * savedMeeting.setMrOrQaManagerSign(userName);
	 * 
	 * // Save the updated AnnualPlan
	 * agendaformanagementreviewmeetingrepository.save(savedMeeting);
	 * 
	 * // Save the related Lines List<AgendaTopicsLines> lines =
	 * details.getAgendatopicslines(); if (lines != null) { for (AgendaTopicsLines
	 * line : lines) { line.setId(savedMeeting.getId());
	 * agendatopicslinesrepository.save(line); } }
	 * 
	 * List<AgendaForManagementAttendees> lines1 =
	 * details.getAgendaformanagementattendees(); if (lines != null) { for
	 * (AgendaForManagementAttendees line : lines1) {
	 * line.setId(savedMeeting.getId());
	 * agendaformanagementattendeesrepository.save(line); } }
	 * 
	 * // Save History Record AgendaForManagementReviewMeetingHistory history = new
	 * AgendaForManagementReviewMeetingHistory();
	 * BeanUtils.copyProperties(savedMeeting, history); String year =
	 * savedMeeting.getYear(); String month = savedMeeting.getMonth(); int version =
	 * agendaformanagementreviewmeetinghistoryrepository.getMaximumVersion(year,
	 * month) .map(v -> v + 1).orElse(1); history.setVersion(version);
	 * 
	 * agendaformanagementreviewmeetinghistoryrepository.save(history);
	 * 
	 * // Save Line1 History Items if (details.getAgendatopicslines() != null &&
	 * !details.getAgendatopicslines().isEmpty()) { for (AgendaTopicsLines line1 :
	 * details.getAgendatopicslines()) { AgendaTopicsLinesHistory line1History = new
	 * AgendaTopicsLinesHistory(); BeanUtils.copyProperties(line1, line1History);
	 * line1History.setHistoryId(history.getHistoryId());
	 * agendatopicslineshistoryrepository.save(line1History); } } // Save Line2
	 * History Items if (details.getAgendaformanagementattendees() != null &&
	 * !details.getAgendaformanagementattendees().isEmpty()) { for
	 * (AgendaForManagementAttendees line1 :
	 * details.getAgendaformanagementattendees()) {
	 * AgendaForManagementAttendeesHistory line1History = new
	 * AgendaForManagementAttendeesHistory(); BeanUtils.copyProperties(line1,
	 * line1History); line1History.setHistoryId(history.getHistoryId());
	 * agendaformanagementattendeeshistoryrepository.save(line1History); } }
	 * 
	 * } else { return new ResponseEntity<>(new ApiResponse(false,
	 * "Unauthorized to submit report"), HttpStatus.FORBIDDEN); } } catch (Exception
	 * e) { return new ResponseEntity<>(new ApiResponse(false, "Submission failed: "
	 * + e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR); }
	 * 
	 * return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"),
	 * HttpStatus.OK); }
	 */

	// SUBMIT
	public ResponseEntity<?> submitAgendaForManagementReviewMeeting(AgendaForManagementReviewMeeting details,
			HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		AgendaForManagementReviewMeeting savedMeeting = null;
		try {
			// Fetch existing plan details
			if (details.getId() != null) {
				savedMeeting = agendaformanagementreviewmeetingrepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Plan not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "mrOrQaManagerStatus", "mrOrQaManagerSavedOn",
						"mrOrQaManagerSavedBy", "mrOrQaManagerSavedId", "mrOrQaManagerSubmittedOn",
						"mrOrQaManagerSubmittedBy", "mrOrQaManagerSubmittedId", "mrOrQaManagerSign",
						"agendatopicslines", "agendaformanagementattendees" };
				BeanUtils.copyProperties(details, savedMeeting, ignoreProps);
			} else {
				savedMeeting = details;
			}

			// Role-based validation and setting of QA Manager/MR details
			if (role.equals("QA_MANAGER") || role.equals("ROLE_MR")) {
				savedMeeting.setMrOrQaManagerStatus(QaAppConstants.mrOrQaManagerSubmitted);
				savedMeeting.setMrOrQaManagerSubmittedBy(userName);
				savedMeeting.setMrOrQaManagerSubmittedOn(date);
				savedMeeting.setMrOrQaManagerSubmittedId(userId);
				savedMeeting.setMrOrQaManagerSign(userName);

				// Save the updated meeting details
				agendaformanagementreviewmeetingrepository.save(savedMeeting);

				// Save related Topics Lines
				List<AgendaTopicsLines> lines = details.getAgendatopicslines();
				if (lines != null) {
					for (AgendaTopicsLines line : lines) {
						line.setId(savedMeeting.getId());
						agendatopicslinesrepository.save(line);
					}
				}

				// Save related Attendees
				List<AgendaForManagementAttendees> attendees = details.getAgendaformanagementattendees();
				if (attendees != null) {
					for (AgendaForManagementAttendees attendee : attendees) {
						attendee.setId(savedMeeting.getId());
						agendaformanagementattendeesrepository.save(attendee);
					}
				}

				// Save the history record
				AgendaForManagementReviewMeetingHistory history = new AgendaForManagementReviewMeetingHistory();
				BeanUtils.copyProperties(savedMeeting, history);
				String year = savedMeeting.getYear();
				String month = savedMeeting.getMonth();
				int version = agendaformanagementreviewmeetinghistoryrepository.getMaximumVersion(year, month)
						.map(v -> v + 1).orElse(1);
				history.setVersion(version);

				agendaformanagementreviewmeetinghistoryrepository.save(history);

				// Save Topics Lines History
				if (details.getAgendatopicslines() != null && !details.getAgendatopicslines().isEmpty()) {
					for (AgendaTopicsLines line1 : details.getAgendatopicslines()) {
						AgendaTopicsLinesHistory line1History = new AgendaTopicsLinesHistory();
						BeanUtils.copyProperties(line1, line1History);
						line1History.setHistoryId(history.getHistoryId());
						agendatopicslineshistoryrepository.save(line1History);
					}
				}

				// Save Attendees History
				if (details.getAgendaformanagementattendees() != null
						&& !details.getAgendaformanagementattendees().isEmpty()) {
					for (AgendaForManagementAttendees attendee : details.getAgendaformanagementattendees()) {
						AgendaForManagementAttendeesHistory attendeeHistory = new AgendaForManagementAttendeesHistory();
						BeanUtils.copyProperties(attendee, attendeeHistory);
						attendeeHistory.setHistoryId(history.getHistoryId());
						agendaformanagementattendeeshistoryrepository.save(attendeeHistory);
					}
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit report"),
						HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Submission failed: " + e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"), HttpStatus.OK);
	}

	// GET BY PARAM

	public ResponseEntity<?> getByParamAgendaForManagementReview(String year, String month, String headings) {
		try {

			AgendaForManagementReviewMeeting list = agendaformanagementreviewmeetingrepository.getdetailsbyParam(year,
					month, headings);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR PRINT
	public ResponseEntity<?> getByPrintAgendaForManagementReview(String year, String month) {
		try {

			List<AgendaForManagementReviewMeeting> list = agendaformanagementreviewmeetingrepository.printParam(year,
					month);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR SUMMARY
	public ResponseEntity<?> getSummaryAgendaForManagementReview(HttpServletRequest http) {

		List<AgendaForManagementReviewMeeting> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")) {

				details = agendaformanagementreviewmeetingrepository.summary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// delete api
	public ResponseEntity<?> deleteAgendaDetailsLines(Long id) {
		try {

			Optional<AgendaTopicsLines> details = agendatopicslinesrepository.findById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			agendatopicslinesrepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

//-------ADD TOPICS BY HEADING--//
	public ResponseEntity<?> SaveAgendaTopics(ReviewMeetingTopics details, HttpServletRequest http) {

		try {

			reviewmeetingtopicsrepository.save(details);

		} catch (Exception ex) {

			log.error(" **** Unable to save Details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to Save Details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(details, HttpStatus.CREATED);
	}

	public ResponseEntity<?> getAgendaTopics(String heading) {
		try {

			List<ReviewMeetingTopics> list = reviewmeetingtopicsrepository.findByHeading(heading);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> deleteAgendaTopics(Long id) {
		try {

			Optional<ReviewMeetingTopics> details = reviewmeetingtopicsrepository.findById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			reviewmeetingtopicsrepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	// ---------------MINUTES OF MRM------------------------------------//
	// SAVE
	public ResponseEntity<?> saveMOM(MinutesOfMRM details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		MinutesOfMRM savedMeeting = null;
		try {

			if (details.getId() != null) {
				savedMeeting = minutesofmrmrepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Plan not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "mrOrQaManagerStatus", "mrOrQaManagerSavedOn",
						"mrOrQaManagerSavedBy", "mrOrQaManagerSavedId", "mrOrQaManagerSubmittedOn",
						"mrOrQaManagerSubmittedBy", "mrOrQaManagerSubmittedId", "mrOrQaManagerSign",
						"agendatopicslines", "minutesofmrmlines" };
				BeanUtils.copyProperties(details, savedMeeting, ignoreProps);
			} else {
				savedMeeting = details;
			}

			// Allow only specific roles to save
			if (role.equals("QA_MANAGER") || role.equals("ROLE_MR")) {

				savedMeeting = minutesofmrmrepository.save(savedMeeting);

				// Save the related Lines
				List<MinutesOfMRMLines> lines = details.getMinutesofmrmlines();
				if (lines != null) {
					for (MinutesOfMRMLines line : lines) {
						line.setId(savedMeeting.getId());
						minutesofmrmlinesrepository.save(line);
					}
				}

				// Update save metadata
				savedMeeting.setMrOrQaManagerSavedBy(userName);
				savedMeeting.setMrOrQaManagerSavedOn(date);
				savedMeeting.setMrOrQaManagerSavedId(userId);
				savedMeeting.setMrOrQaManagerStatus(QaAppConstants.mrOrQaManagerSaved);

				// Save updated AnnualPlan
				minutesofmrmrepository.save(savedMeeting);

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedMeeting, HttpStatus.CREATED);
	}

	// SUBMIT
	public ResponseEntity<?> submitMOM(MinutesOfMRM details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		MinutesOfMRM savedMeeting = null;
		try {
			// Fetch existing plan details
			if (details.getId() != null) {
				savedMeeting = minutesofmrmrepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Plan not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "mrOrQaManagerStatus", "mrOrQaManagerSavedOn",
						"mrOrQaManagerSavedBy", "mrOrQaManagerSavedId", "mrOrQaManagerSubmittedOn",
						"mrOrQaManagerSubmittedBy", "mrOrQaManagerSubmittedId", "mrOrQaManagerSign",
						"agendatopicslines", "agendaformanagementattendees" };
				BeanUtils.copyProperties(details, savedMeeting, ignoreProps);
			} else {
				savedMeeting = details;
			}

			// Role-based validation and setting of QA Manager/MR details
			if (role.equals("QA_MANAGER") || role.equals("ROLE_MR")) {
				savedMeeting.setMrOrQaManagerStatus(QaAppConstants.mrOrQaManagerSubmitted);
				savedMeeting.setMrOrQaManagerSubmittedBy(userName);
				savedMeeting.setMrOrQaManagerSubmittedOn(date);
				savedMeeting.setMrOrQaManagerSubmittedId(userId);
				savedMeeting.setMrOrQaManagerSign(userName);

				// Save the updated meeting details
				minutesofmrmrepository.save(savedMeeting);

				// Save related Topics Lines
				List<MinutesOfMRMLines> lines = details.getMinutesofmrmlines();
				if (lines != null) {
					for (MinutesOfMRMLines line : lines) {
						line.setId(savedMeeting.getId());
						minutesofmrmlinesrepository.save(line);
					}
				}

				// Save the history record
				MinutesOfMRMHistory history = new MinutesOfMRMHistory();
				BeanUtils.copyProperties(savedMeeting, history);
				String year = savedMeeting.getYear();
				String month = savedMeeting.getMonth();
				int version = minutesofmrmhistoryrepository.getMaximumVersion(year, month).map(v -> v + 1).orElse(1);
				history.setVersion(version);

				minutesofmrmhistoryrepository.save(history);

				// Save Topics Lines History
				if (details.getMinutesofmrmlines() != null && !details.getMinutesofmrmlines().isEmpty()) {
					for (MinutesOfMRMLines line1 : details.getMinutesofmrmlines()) {
						MinutesOfMRMLinesHistory line1History = new MinutesOfMRMLinesHistory();
						BeanUtils.copyProperties(line1, line1History);
						line1History.setHistoryId(history.getHistoryId());
						minutesofmrmlineshistoryrepository.save(line1History);
					}
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit report"),
						HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "Submission failed: " + e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"), HttpStatus.OK);
	}

	// GET BY PARAM

	public ResponseEntity<?> getByParamMOM(String year, String month, String headings) {
		try {

			MinutesOfMRM list = minutesofmrmrepository.getdetailsbyParam(year, month, headings);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}
	// GET BY PARAM agenda topics

	public ResponseEntity<?> getByParamAgendaTopicMOM(String year, String month, String headings) {
		List<AgendaForManagementReviewMeeting> list = new ArrayList<>();
		try {
			if (headings == null || headings.isEmpty()) {
				list = agendaformanagementreviewmeetingrepository.printParam(year, month);
			} else {
				list = agendaformanagementreviewmeetingrepository.forMomParam(year, month, headings);
			}

			if (list == null || list.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR PRINT
	public ResponseEntity<?> getByPrintMOM(String year, String month) {
		try {

			List<MinutesOfMRM> list = minutesofmrmrepository.printParam(year, month);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR SUMMARY
	public ResponseEntity<?> getSummaryMOM(HttpServletRequest http) {

		List<MinutesOfMRM> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("QA_MANAGER") || userRole.equals("ROLE_MR")) {

				details = minutesofmrmrepository.summary();
			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// -------------QA SUMMARY OF TRACEABILITY-------//
	// SAVE
	public ResponseEntity<?> saveQASummaryOfTraceability(QASummaryOfTraceability details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		LocalDateTime currentDate = LocalDateTime.now();
		QASummaryOfTraceability summaryObj;
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			if (details.getId() != null) {
				summaryObj = qasummaryoftraceabilityrepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Summary not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "qaManagerOrDesigneeSaveBy",
						"qaManagerOrDesigneeSaveOn", "qaManagerOrDesigneeSubmitBy", "qaManagerOrDesigneeSubmitOn" };
				BeanUtils.copyProperties(details, summaryObj, ignoreProps);
			} else {
				summaryObj = details;
			}

			if (role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {
				summaryObj.setQaManagerOrDesigneeStatus(QaAppConstants.designeeOrQaManagerSaved);
				summaryObj.setQaManagerOrDesigneeSaveBy(userName);
				summaryObj.setQaManagerOrDesigneeSaveOn(date);
				summaryObj.setQaManagerOrDesigneeSaveId(userId);

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}

			qasummaryoftraceabilityrepository.save(summaryObj);
		} catch (Exception ex) {
			log.error("Unable to save QA Summary of Traceability details!", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(summaryObj, HttpStatus.CREATED);
	}

//SUBMIT
	public ResponseEntity<?> submitQASummaryOfTraceability(QASummaryOfTraceability details, HttpServletRequest http) {
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			if (details == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
						HttpStatus.BAD_REQUEST);
			}

			QASummaryOfTraceability summary;
			if (details.getId() != null) {
				summary = qasummaryoftraceabilityrepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Summary not found with id " + details.getId()));
				String[] ignoreProps = { "id", "createdBy", "createdAt", "qaManagerOrDesigneeSaveBy",
						"qaManagerOrDesigneeSaveOn", "qaManagerOrDesigneeSubmitBy", "qaManagerOrDesigneeSubmitOn" };
				BeanUtils.copyProperties(details, summary, ignoreProps);
			} else {
				summary = details;
			}

			if (role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {
				summary.setQaManagerOrDesigneeStatus(QaAppConstants.designeeOrQaManagerSubmitted);
				summary.setQaManagerOrDesigneeSubmitBy(userName);
				summary.setQaManagerOrDesigneeSubmitOn(date);
				summary.setQaManagerOrDesigneeSubmitId(userId);
				summary.setQaManagerOrDesigneeSign(userName);
				summary.setQaManagerOrMrStatus(AppConstants.waitingStatus);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit summary"),
						HttpStatus.FORBIDDEN);
			}

			qasummaryoftraceabilityrepository.save(summary);

			// Save History Record
			QASummaryOfTraceabilityHistory history = new QASummaryOfTraceabilityHistory();

			BeanUtils.copyProperties(summary, history, "id");
			String summaryDate = summary.getDate();
			String department = summary.getDepartment();
			String bmrNo = summary.getBmrNo();
			int version = qasummaryoftraceabilityhistoryrepository.getMaximumVersion(summaryDate, department, bmrNo)
					.map(v -> v + 1).orElse(1);

			history.setVersion(version);

			qasummaryoftraceabilityhistoryrepository.save(history);

			// send mail or create history record if needed
			try {
				qamailfunction.sendMailToQaManagerF025(summary);
				qamailfunction.sendMailToMrManagerF025(summary);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
				HttpStatus.OK);
			}

		} catch (Exception e) {
			log.error("Unable to submit QA Summary of Traceability details!", e);
			return new ResponseEntity<>(new ApiResponse(false, "Submission failed: " + e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(new ApiResponse(true, "submitted successfully"), HttpStatus.OK);
	}

	// APPROVE

	public ResponseEntity<?> approveRejectQASummaryOfTraceability(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil scaUtil = new SCAUtil();
		QASummaryOfTraceability summary = null;

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		// Fetching current date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		try {
			// Fetch the QASummaryOfTraceability entity by ID
			summary = qasummaryoftraceabilityrepository.findById(approvalResponse.getId())
					.orElseThrow(() -> new RuntimeException("Summary not found with ID " + approvalResponse.getId()));

			String qaManagerOrMrStatus = summary.getQaManagerOrMrStatus();
			String status = "";
			QASummaryOfTraceabilityHistory history = new QASummaryOfTraceabilityHistory();

			// QA Manager or Designee approval/rejection logic
			if (qaManagerOrMrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_MR")) {

					String reason = approvalResponse.getRemarks();
					history = qasummaryoftraceabilityhistoryrepository.fetchLastSubmittedRecord(summary.getDate(),
							summary.getDepartment(), summary.getBmrNo());

					if (approvalResponse.getStatus().equalsIgnoreCase("Approve")) {
						summary.setQaManagerOrMrStatus(QaAppConstants.qaManagerMrApproved);
						history.setQaManagerOrMrStatus(QaAppConstants.qaManagerMrApproved);
						status = "Approved";
					} else if (approvalResponse.getStatus().equalsIgnoreCase("Reject")) {
						summary.setReason(reason);
						summary.setQaManagerOrMrStatus(QaAppConstants.qaManagerMrRejected);
						history.setReason(reason);
						history.setQaManagerOrMrStatus(QaAppConstants.qaManagerMrRejected);
						status = "Rejected";
					}

					summary.setQaManagerOrMrApprovedOn(date);
					summary.setQaManagerOrMrApprovedBy(userName);
					summary.setQaManagerOrMrApproverId(userId);
					summary.setQaManagerOrMrSign(userName);
					//history
					history.setQaManagerOrMrApprovedOn(date);
					history.setQaManagerOrMrApprovedBy(userName);
					history.setQaManagerOrMrApproverId(userId);
					history.setQaManagerOrMrSign(userName);

					// Save the updated QASummaryOfTraceability entity
					qasummaryoftraceabilityrepository.save(summary);

					// Save the updated history
					qasummaryoftraceabilityhistoryrepository.save(history);

					return new ResponseEntity<>(new ApiResponse(true, userRole + " " + status + " successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to approve/reject"),
							HttpStatus.FORBIDDEN);
				}

			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, "Invalid status or no pending approval for this user"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			log.error("Unable to approve/reject QA Summary of Traceability", e);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}
	// GET BY PARAM

	public ResponseEntity<?> getByParamSummaryOfTraceability(String date, String department, String bmrNo) {
		try {

			QASummaryOfTraceability list = qasummaryoftraceabilityrepository.getdetailsbyParam(date, department, bmrNo);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR PRINT
	public ResponseEntity<?> getByPrintSummaryOfTraceability(String year, String month) {
		try {

			List<QASummaryOfTraceability> list = qasummaryoftraceabilityrepository.printParam(year, month);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR SUMMARY
	public ResponseEntity<?> getSummaryTracebility(HttpServletRequest http) {

		List<QASummaryOfTraceability> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_MR")) {

				details = qasummaryoftraceabilityrepository.mrSummary();

			} else if (userRole.equals("ROLE_DESIGNEE") || userRole.equals("QA_MANAGER")) {

				details = qasummaryoftraceabilityrepository.designeeSummary();

			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// ======TRACEABILITY BMR DETAILS===============//
	public List<AllBMRDetailsDTO> fetchBmrData(String department, String batchNo) {
		List<AllBMRDetailsProjection> projectionList = null;
		List<AllBMRDetailsDTO> bmrDetails = new ArrayList<>();

		switch (department.toLowerCase()) {
		case "pad_punching":
			projectionList = qasummaryoftraceabilityrepository.fetchBmrDataPunching(batchNo);
			break;
		case "spunlace":

			List<AllBMRDetailsProjection> projectionList1 = null;

			List<Map<String, Object>> bmr01rp01productiondetailsSap;

			if (batchNo.contains("-")) {

				System.out.println("It is Spulance BMR");

				projectionList1 = qasummaryoftraceabilityrepository.spulanceOrderDetailsResponse(batchNo);

				if (!projectionList1.isEmpty() || projectionList1 != null) {

					/*for (AllBMRDetailsProjection projection : projectionList1) {
						AllBMRDetailsDTO dto = new AllBMRDetailsDTO();
						dto.setOrderNo(projection.getOrderNo());
						dto.setLotNo(projection.getLotNo());
						dto.setPoNo(projection.getPoNo());

						bmr01rp01productiondetailsSap = bmr_01_productiondetailsrepository
								.getRGoodsSummaryByPOrder(dto.getOrderNo(), dto.getLotNo(), dto.getPoNo());

						if (!bmr01rp01productiondetailsSap.isEmpty()) {
							Map<String, Object> details = bmr01rp01productiondetailsSap.get(0);

							BmrDetailsRequest request = new BmrDetailsRequest();

							// Set values in DTO based on query results
							request.setProductDescription((String) details.get("Product_Description"));
							request.setStartShaft((Integer) details.get("Shaft_Number_Start_From"));
							request.setEndShaft((Integer) details.get("Shaft_Number_Ended"));
							request.setBatchQuantity((Double) details.get("Batch_Quantity"));

							AllBMRDetailsDTO detailsDTO = new AllBMRDetailsDTO();
							detailsDTO.setOrderNo(dto.getOrderNo());
							detailsDTO.setProduct(request.getProductDescription());
							detailsDTO.setCustomer(String.valueOf(request.getBatchQuantity()));
							detailsDTO.setLotNo(String.valueOf(request.getStartShaft()));
							detailsDTO.setPoNo(String.valueOf(request.getEndShaft()));

							bmrDetails.add(detailsDTO);
						}

					}*/
				
					    for (AllBMRDetailsProjection projection : projectionList1) {
					        AllBMRDetailsDTO dto = new AllBMRDetailsDTO();
					        dto.setOrderNo(projection.getOrderNo());
					        dto.setLotNo(projection.getLotNo());
					        dto.setPoNo(projection.getPoNo());

					        bmr01rp01productiondetailsSap = bmr_01_productiondetailsrepository
					            .getRGoodsSummaryByPOrder(dto.getOrderNo(), dto.getLotNo(), dto.getPoNo());

					        if (bmr01rp01productiondetailsSap != null && !bmr01rp01productiondetailsSap.isEmpty()) {
					            Map<String, Object> details = bmr01rp01productiondetailsSap.get(0);

					            BmrDetailsRequest request = new BmrDetailsRequest();
					            request.setProductDescription((String) details.get("Product_Description"));

					            // Check for null before casting and setting values
					            request.setStartShaft(details.get("Shaft_Number_Start_From") != null 
					                ? ((BigDecimal) details.get("Shaft_Number_Start_From")).intValue() : null);
					            request.setEndShaft(details.get("Shaft_Number_Ended") != null 
					                ? ((BigDecimal) details.get("Shaft_Number_Ended")).intValue() : null);
					            request.setBatchQuantity(details.get("Batch_Quantity") != null 
					                ? ((BigDecimal) details.get("Batch_Quantity")).doubleValue() : null);

					            AllBMRDetailsDTO detailsDTO = new AllBMRDetailsDTO();
					            detailsDTO.setOrderNo(dto.getOrderNo());
					            detailsDTO.setProduct(request.getProductDescription());
					            detailsDTO.setCustomer(request.getBatchQuantity() != null ? String.valueOf(request.getBatchQuantity()) : "");
					            detailsDTO.setLotNo(request.getStartShaft() != null ? String.valueOf(request.getStartShaft()) : "");
					            detailsDTO.setPoNo(request.getEndShaft() != null ? String.valueOf(request.getEndShaft()) : "");

					            bmrDetails.add(detailsDTO);
					        }
					    }
					



				}

			} else {

				System.out.println("It is RP BALE BMR");

				projectionList1 = qasummaryoftraceabilityrepository.spulanceOrderDetailsResponse(batchNo);

				if (!projectionList1.isEmpty() || projectionList1 != null) {

					for (AllBMRDetailsProjection projection : projectionList1) {
						AllBMRDetailsDTO dto = new AllBMRDetailsDTO();
						dto.setOrderNo(projection.getOrderNo());
						dto.setLotNo(projection.getLotNo());
						dto.setPoNo(projection.getPoNo());

						bmr01rp01productiondetailsSap = bmr_01_productiondetailsrepository
								.getRGoodsSummaryByPOrder(dto.getOrderNo(), dto.getLotNo(), dto.getPoNo());

						if (!bmr01rp01productiondetailsSap.isEmpty()) {
							Map<String, Object> details = bmr01rp01productiondetailsSap.get(0);

							BmrDetailsRequest request = new BmrDetailsRequest();

							// Set values in DTO based on query results
							request.setProductDescription((String) details.get("Product_Description"));
							request.setStartShaft((Integer) details.get("Shaft_Number_Start_From"));
							request.setEndShaft((Integer) details.get("Shaft_Number_Ended"));
							request.setBatchQuantity((Double) details.get("Batch_Quantity"));

							AllBMRDetailsDTO detailsDTO = new AllBMRDetailsDTO();
							detailsDTO.setOrderNo(dto.getOrderNo());
							detailsDTO.setProduct(request.getProductDescription());
							detailsDTO.setCustomer(String.valueOf(request.getBatchQuantity()));
							detailsDTO.setLotNo(String.valueOf(request.getStartShaft()));
							detailsDTO.setPoNo(String.valueOf(request.getEndShaft()));

							bmrDetails.add(detailsDTO);
						}
					}

				}

			}

			break;
		case "dry_goods":
			projectionList = qasummaryoftraceabilityrepository.fetchBmrDataDryGoods(batchNo);
			break;
		case "cotton_buds":
			projectionList = qasummaryoftraceabilityrepository.BudsBmrRequest(batchNo);
			break;
		case "bleaching":
			// Uncomment when method is defined
			projectionList = qasummaryoftraceabilityrepository.fetchBmrDataBleaching(batchNo);
			break;
		default:
			throw new IllegalArgumentException("Invalid department: " + department);
		}

		if (!department.equalsIgnoreCase("SPUNLACE")) {
			if (projectionList != null) {
				for (AllBMRDetailsProjection projection : projectionList) {
					AllBMRDetailsDTO dto = new AllBMRDetailsDTO();

					System.out.println("hello" + projection);

					dto.setOrderNo(projection.getOrderNo());
					dto.setLotNo(projection.getLotNo());
					dto.setPoNo(projection.getPoNo());
					dto.setCartons(projection.getCartons());
					dto.setBags(projection.getBags());

					if (department.equalsIgnoreCase(QaAppConstants.bleaching)) {

						BleachBmrLaydownMapping bmrMapping = mappingRepository.getBMRNoResponse(batchNo);
						/*	String jobOrder = bmrMapping.getJob_order_no();

						dto.setOrderNo(jobOrder);*/
						if (bmrMapping != null) {
						    String jobOrder = bmrMapping.getJob_order_no();
						    if (jobOrder != null) {
						        dto.setOrderNo(jobOrder);
						    } else {
						        // Handle the case where jobOrder is null, e.g., set a default value or log a warning
						        dto.setOrderNo(""); // or handle as appropriate
						        System.out.println("Warning: jobOrder is null for bmrMapping.");
						    }
						} else {
						    // Handle the case where bmrMapping itself is null
						    System.out.println("Warning: bmrMapping is null.");
						    dto.setOrderNo(""); // or handle as appropriate
						}

					}

					if (dto.getOrderNo() != null) {
						List<Object[]> resultList = qasummaryoftraceabilityrepository.getCustomer(dto.getOrderNo());

						if (!resultList.isEmpty()) {
							for (Object[] result : resultList) {
								// Ensure indexes correspond to your SELECT order
								String product = result[0] != null ? result[0].toString() : null;
								String customer = result[1] != null ? result[1].toString() : null;

								dto.setProduct(product);
								dto.setCustomer(customer);
							}
						}
						bmrDetails.add(dto);
					}
				}
			}

		}

		return bmrDetails;

	}

//---BATCH RELEASE NOTES---------//
	// SAVE
	public ResponseEntity<?> saveBatchReleaseNotes(BatchReleaseNotesHeader details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		LocalDateTime currentDate = LocalDateTime.now();
		BatchReleaseNotesHeader headerObj;
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			if (details.getId() != null) {
				headerObj = batchReleaseNotesHeaderRepository.findById(details.getId()).orElseThrow(
						() -> new RuntimeException("Batch release note not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "qaManagerOrDesigneeSaveBy",
						"qaManagerOrDesigneeSaveId", "qaManagerOrDesigneeSaveOn", "qaManagerOrDesigneeSubmitBy",
						"qaManagerOrDesigneeSubmitOn", "qaManagerOrDesigneeSubmitId", "qaManagerOrDesigneeSign" };
				BeanUtils.copyProperties(details, headerObj, ignoreProps);
			} else {
				headerObj = details;
			}

			if (role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {
				headerObj.setQaManagerOrDesigneeStatus(QaAppConstants.designeeOrQaManagerSaved);
				headerObj.setQaManagerOrDesigneeSaveBy(userName);
				headerObj.setQaManagerOrDesigneeSaveOn(date);
				headerObj.setQaManagerOrDesigneeSaveId(userId);
				
				batchReleaseNotesHeaderRepository.save(headerObj);

				// Save lines
				List<BatchReleaseNotesLines> lines = details.getBatchreleasenoteslines();
				if (lines != null) {
					for (BatchReleaseNotesLines line : lines) {
						line.setId(headerObj.getId());
						batchReleaseNotesLinesRepository.save(line);
					}
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}

			batchReleaseNotesHeaderRepository.save(headerObj);
		} catch (Exception ex) {
			log.error("Unable to save Batch Release Notes Header details!", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(headerObj, HttpStatus.CREATED);
	}

	// SUBMIT
	public ResponseEntity<?> submitBatchReleaseNotes(BatchReleaseNotesHeader details, HttpServletRequest http) {
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			if (details == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
						HttpStatus.BAD_REQUEST);
			}

			BatchReleaseNotesHeader header;
			if (details.getId() != null) {
				header = batchReleaseNotesHeaderRepository.findById(details.getId()).orElseThrow(
						() -> new RuntimeException("Batch release note not found with id " + details.getId()));
				String[] ignoreProps = { "id", "createdBy", "createdAt", "qaManagerOrDesigneeSaveBy",
						"qaManagerOrDesigneeSaveId", "qaManagerOrDesigneeSaveOn", "qaManagerOrDesigneeSubmitBy",
						"qaManagerOrDesigneeSubmitOn", "qaManagerOrDesigneeSubmitId", "qaManagerOrDesigneeSign" };
				BeanUtils.copyProperties(details, header, ignoreProps);
			} else {
				header = details;
			}

			if (role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("ROLE_DESIGNEE")) {
				header.setQaManagerOrDesigneeStatus(QaAppConstants.designeeOrQaManagerSubmitted);
				header.setQaManagerOrDesigneeSubmitBy(userName);
				header.setQaManagerOrDesigneeSubmitOn(date);
				header.setQaManagerOrDesigneeSubmitId(userId);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Unauthorized to submit details"),
						HttpStatus.FORBIDDEN);
			}

			batchReleaseNotesHeaderRepository.save(header);

			// Save lines
			List<BatchReleaseNotesLines> lines = details.getBatchreleasenoteslines();
			if (lines != null) {
				for (BatchReleaseNotesLines line : lines) {
					line.setId(header.getId());
					batchReleaseNotesLinesRepository.save(line);
				}
			}

			// Save the history record
			BatchReleaseNotesHeaderHistory history = new BatchReleaseNotesHeaderHistory();
			BeanUtils.copyProperties(header, history, "historyId");
			String batchdate = header.getDate();
			String department = header.getDepartment();
			int version = batchReleaseNotesHeaderHistoryRepository.getMaximumVersion(batchdate, department)
					.map(v -> v + 1).orElse(1);
			history.setVersion(version);

			batchReleaseNotesHeaderHistoryRepository.save(history);

			// Save Topics Lines History
			if (details.getBatchreleasenoteslines() != null && !details.getBatchreleasenoteslines().isEmpty()) {
				for (BatchReleaseNotesLines line1 : details.getBatchreleasenoteslines()) {
					BatchReleaseNotesLinesHistory line1History = new BatchReleaseNotesLinesHistory();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					batchReleaseNotesLinesHistoryRepository.save(line1History);
				}
			}
		} catch (Exception e) {
			log.error("Unable to submit Batch Release Notes Header details!", e);
			return new ResponseEntity<>(new ApiResponse(false, "Submission failed: " + e.getMessage()),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"), HttpStatus.OK);
	}

	// GET BY PARAM

	public ResponseEntity<?> getByParamBatchReleaseNotes(String date) {
		try {

			BatchReleaseNotesHeader list = batchReleaseNotesHeaderRepository.getdetailsbyParam(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR PRINT
	public ResponseEntity<?> getByPrintBatchReleaseNotes(String year, String month, String date) {
		try {

			List<BatchReleaseNotesHeader> list = batchReleaseNotesHeaderRepository.printParam(year, month, date);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR SUMMARY
	public ResponseEntity<?> getBatchReleaseNotesSummary(HttpServletRequest http) {

		List<BatchReleaseNotesHeader> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_DESIGNEE") || userRole.equals("QA_MANAGER")) {

				details = batchReleaseNotesHeaderRepository.designeeSummary();

			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// DELETE API FOR BATCH RELEASE NOTES
	public ResponseEntity<?> deleteBatchReleaseNotesLines(Long id) {
		try {

			Optional<BatchReleaseNotesLines> details = batchReleaseNotesLinesRepository.findById(id);

			if (details == null) {
				return new ResponseEntity(new ApiResponse(false, "No data for the id : " + id), HttpStatus.BAD_REQUEST);
			}

			batchReleaseNotesLinesRepository.deleteById(id);

		} catch (Exception ex) {

			log.error(" **** Unable to delete details! **** " + ex);

			String msg = ex.getMessage();

			return new ResponseEntity(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

//-------------ANNUAL PRODUCT REVIEW-----------------------//
//	@Transactional
	public ResponseEntity<?> saveAnnualProductReview(AnnualProductReview details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		LocalDateTime currentDate = LocalDateTime.now();
		AnnualProductReview reviewObj;
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			if (details.getId() != null) {
				reviewObj = annualProductReviewRepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Review not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "qaDesigneeSaveBy", "qaDesigneeSaveOn",
						"qaDesigneeSaveId", "qaDesigneeSubmitBy", "qaDesigneeSubmitOn" };
				BeanUtils.copyProperties(details, reviewObj, ignoreProps);
			} else {
				reviewObj = details;
			}

			if (userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
				reviewObj.setQaDesigneeStatus(QaAppConstants.qaDesigneeSaved);
				reviewObj.setQaDesigneeSaveBy(userName);
				reviewObj.setQaDesigneeSaveOn(date);
				reviewObj.setQaDesigneeSaveId(userId);

			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}

			annualProductReviewRepository.save(reviewObj);
			// --SummaryLine1--//
			List<SummaryLine1> lines1 = details.getSummaryline1();
			if (lines1 != null) {
				for (SummaryLine1 line : lines1) {
					line.setId(reviewObj.getId());
					summaryLine1Repository.save(line);
				}
			}
			// --SummaryParametersLine1--//
			List<SummaryParametersLine1> lines2 = details.getSummaryparametersline1();
			if (lines2 != null) {
				for (SummaryParametersLine1 line : lines2) {
					line.setId(reviewObj.getId());
					summaryparametersline1repository.save(line);
				}
			}
			// --RawMaterialsDetailsLine2--//
			List<RawMaterialsDetailsLine2> lines3 = details.getRawmaterialsdetailsline2();
			if (lines3 != null) {
				for (RawMaterialsDetailsLine2 line : lines3) {
					line.setId(reviewObj.getId());
					rawmaterialsdetailsline2repository.save(line);
				}
			}
			// --PackingMaterialDetailsLine3--//
			List<PackingMaterialDetailsLine3> lines4 = details.getPackingmaterialdetailsline3();
			if (lines4 != null) {
				for (PackingMaterialDetailsLine3 line : lines4) {
					line.setId(reviewObj.getId());
					packingmaterialdetailsline3repository.save(line);
				}
			}
			// --ListOfEquipmentAndQualificationLine4--//
			List<ListOfEquipmentAndQualificationLine4> lines5 = details.getListofequipmentandqualificationline4();
			if (lines5 != null) {
				for (ListOfEquipmentAndQualificationLine4 line : lines5) {
					line.setId(reviewObj.getId());
					listofequipmentandqualificationline4repository.save(line);
				}
			}
			// --ReviewOfCriticalParameterChecksOfLine5--//
			List<ReviewOfCriticalParameterChecksOfLine5> lines6 = details.getReviewofcriticalparameterchecksofline5();
			if (lines6 != null) {
				for (ReviewOfCriticalParameterChecksOfLine5 line : lines6) {
					line.setId(reviewObj.getId());
					reviewofcriticalparameterchecksofline5repository.save(line);
				}
			}
			// --ReviewOfAllNonConformityProductLine6--//
			List<ReviewOfAllNonConformityProductLine6> lines7 = details.getReviewofallnonconformityproductline6();
			if (lines7 != null) {
				for (ReviewOfAllNonConformityProductLine6 line : lines7) {
					line.setId(reviewObj.getId());
					reviewofallnonconformityproductline6repository.save(line);
				}
			}
			// --ReviewOfDeviationLine7--//
			List<ReviewOfDeviationLine7> lines8 = details.getReviewofdeviationline7();
			if (lines8 != null) {
				for (ReviewOfDeviationLine7 line : lines8) {
					line.setId(reviewObj.getId());
					reviewofdeviationline7repository.save(line);
				}
			}
			// --ReviewOfChangeControlSystemLine8--//
			List<ReviewOfChangeControlSystemLine8> lines9 = details.getReviewofchangecontrolsystemline8();
			if (lines9 != null) {
				for (ReviewOfChangeControlSystemLine8 line : lines9) {
					line.setId(reviewObj.getId());
					reviewofchangecontrolsystemline8repository.save(line);
				}
			}
			// --ComplaintsRejectsAndProductRecallsLine9--//
			List<ComplaintsRejectsAndProductRecallsLine9> lines10 = details
					.getComplaintsrejectsandproductrecallsline9();
			if (lines10 != null) {
				for (ComplaintsRejectsAndProductRecallsLine9 line : lines10) {
					line.setId(reviewObj.getId());
					complaintsrejectsandproductrecallsline9repository.save(line);
				}
			}
			// --ReviewOfProductRecallLine10--//
			List<ReviewOfProductRecallLine10> lines11 = details.getReviewofproductrecallline10();
			if (lines11 != null) {
				for (ReviewOfProductRecallLine10 line : lines11) {
					line.setId(reviewObj.getId());
					reviewofproductrecallline10repository.save(line);
				}
			}

		} catch (Exception ex) {
			log.error("Unable to save Annual Product Review details!", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reviewObj, HttpStatus.CREATED);
	}

//SUBMIT
	public ResponseEntity<?> submitAnnualProductReview(AnnualProductReview details, HttpServletRequest http) {
		if (details == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"),
					HttpStatus.BAD_REQUEST);
		}

		LocalDateTime currentDate = LocalDateTime.now();
		AnnualProductReview reviewObj;
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

			if (details.getId() != null) {
				reviewObj = annualProductReviewRepository.findById(details.getId())
						.orElseThrow(() -> new RuntimeException("Review not found with id " + details.getId()));

				String[] ignoreProps = { "id", "createdBy", "createdAt", "qaDesigneeSaveBy", "qaDesigneeSaveOn",
						"qaDesigneeSaveId", "qaDesigneeSubmitBy", "qaDesigneeSubmitOn" };
				BeanUtils.copyProperties(details, reviewObj, ignoreProps);
			} else {
				reviewObj = details;
			}

			if (userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
				reviewObj.setQaDesigneeStatus(QaAppConstants.qaDesigneeSubmitted);
				reviewObj.setQaDesigneeSubmitBy(userName);
				reviewObj.setQaDesigneeSubmitOn(date);
				reviewObj.setQaDesigneeSubmitId(userId);
				reviewObj.setQaDesigneeSign(userName);
				reviewObj.setQaManagerOrMrStatus(AppConstants.waitingStatus);

			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not allowed to save details"),
						HttpStatus.BAD_REQUEST);
			}

			annualProductReviewRepository.save(reviewObj);
			// --SummaryLine1--//
			List<SummaryLine1> lines1 = details.getSummaryline1();
			if (lines1 != null) {
				for (SummaryLine1 line : lines1) {
					line.setId(reviewObj.getId());
					summaryLine1Repository.save(line);
				}
			}
			// --SummaryParametersLine1--//
			List<SummaryParametersLine1> lines2 = details.getSummaryparametersline1();
			if (lines2 != null) {
				for (SummaryParametersLine1 line : lines2) {
					line.setId(reviewObj.getId());
					summaryparametersline1repository.save(line);
				}
			}
			// --RawMaterialsDetailsLine2--//
			List<RawMaterialsDetailsLine2> lines3 = details.getRawmaterialsdetailsline2();
			if (lines3 != null) {
				for (RawMaterialsDetailsLine2 line : lines3) {
					line.setId(reviewObj.getId());
					rawmaterialsdetailsline2repository.save(line);
				}
			}
			// --PackingMaterialDetailsLine3--//
			List<PackingMaterialDetailsLine3> lines4 = details.getPackingmaterialdetailsline3();
			if (lines4 != null) {
				for (PackingMaterialDetailsLine3 line : lines4) {
					line.setId(reviewObj.getId());
					packingmaterialdetailsline3repository.save(line);
				}
			}
			// --ListOfEquipmentAndQualificationLine4--//
			List<ListOfEquipmentAndQualificationLine4> lines5 = details.getListofequipmentandqualificationline4();
			if (lines5 != null) {
				for (ListOfEquipmentAndQualificationLine4 line : lines5) {
					line.setId(reviewObj.getId());
					listofequipmentandqualificationline4repository.save(line);
				}
			}
			// --ReviewOfCriticalParameterChecksOfLine5--//
			List<ReviewOfCriticalParameterChecksOfLine5> lines6 = details.getReviewofcriticalparameterchecksofline5();
			if (lines6 != null) {
				for (ReviewOfCriticalParameterChecksOfLine5 line : lines6) {
					line.setId(reviewObj.getId());
					reviewofcriticalparameterchecksofline5repository.save(line);
				}
			}
			// --ReviewOfAllNonConformityProductLine6--//
			List<ReviewOfAllNonConformityProductLine6> lines7 = details.getReviewofallnonconformityproductline6();
			if (lines7 != null) {
				for (ReviewOfAllNonConformityProductLine6 line : lines7) {
					line.setId(reviewObj.getId());
					reviewofallnonconformityproductline6repository.save(line);
				}
			}
			// --ReviewOfDeviationLine7--//
			List<ReviewOfDeviationLine7> lines8 = details.getReviewofdeviationline7();
			if (lines8 != null) {
				for (ReviewOfDeviationLine7 line : lines8) {
					line.setId(reviewObj.getId());
					reviewofdeviationline7repository.save(line);
				}
			}
			// --ReviewOfChangeControlSystemLine8--//
			List<ReviewOfChangeControlSystemLine8> lines9 = details.getReviewofchangecontrolsystemline8();
			if (lines9 != null) {
				for (ReviewOfChangeControlSystemLine8 line : lines9) {
					line.setId(reviewObj.getId());
					reviewofchangecontrolsystemline8repository.save(line);
				}
			}
			// --ComplaintsRejectsAndProductRecallsLine9--//
			List<ComplaintsRejectsAndProductRecallsLine9> lines10 = details
					.getComplaintsrejectsandproductrecallsline9();
			if (lines10 != null) {
				for (ComplaintsRejectsAndProductRecallsLine9 line : lines10) {
					line.setId(reviewObj.getId());
					complaintsrejectsandproductrecallsline9repository.save(line);
				}
			}
			// --ReviewOfProductRecallLine10--//
			List<ReviewOfProductRecallLine10> lines11 = details.getReviewofproductrecallline10();
			if (lines11 != null) {
				for (ReviewOfProductRecallLine10 line : lines11) {
					line.setId(reviewObj.getId());
					reviewofproductrecallline10repository.save(line);
				}
			}
			// Save the history record
			AnnualProductReviewHistory history = new AnnualProductReviewHistory();
			BeanUtils.copyProperties(reviewObj, history, "historyId");
			String reviewdate = reviewObj.getDate();
			int version = annualProductReviewHistoryRepository.getMaximumVersion(reviewdate).map(v -> v + 1).orElse(1);
			history.setVersion(version);

			annualProductReviewHistoryRepository.save(history);

			// Save Topics Lines History
			// SummaryLine1
			if (details.getSummaryline1() != null && !details.getSummaryline1().isEmpty()) {
				for (SummaryLine1 line1 : details.getSummaryline1()) {
					SummaryLine1History line1History = new SummaryLine1History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					summaryLine1HistoryRepository.save(line1History);
				}
			}
			// Summary parameter
			if (details.getSummaryparametersline1() != null && !details.getSummaryparametersline1().isEmpty()) {
				for (SummaryParametersLine1 line1 : details.getSummaryparametersline1()) {
					SummaryParametersLine1History line1History = new SummaryParametersLine1History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					summaryParametersLine1HistoryRepository.save(line1History);
				}
			}
			// Raw material details
			if (details.getRawmaterialsdetailsline2() != null && !details.getRawmaterialsdetailsline2().isEmpty()) {
				for (RawMaterialsDetailsLine2 line1 : details.getRawmaterialsdetailsline2()) {
					RawMaterialsDetailsLine2History line1History = new RawMaterialsDetailsLine2History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					rawmaterialsdetailsline2historyrepository.save(line1History);
				}
			}
			// Packing material
			if (details.getPackingmaterialdetailsline3() != null
					&& !details.getPackingmaterialdetailsline3().isEmpty()) {
				for (PackingMaterialDetailsLine3 line1 : details.getPackingmaterialdetailsline3()) {
					PackingMaterialDetailsLine3History line1History = new PackingMaterialDetailsLine3History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					packingmaterialdetailsline3historyrepository.save(line1History);
				}
			}
			// List of equipment and qualification
			if (details.getListofequipmentandqualificationline4() != null
					&& !details.getListofequipmentandqualificationline4().isEmpty()) {
				for (ListOfEquipmentAndQualificationLine4 line1 : details.getListofequipmentandqualificationline4()) {
					ListOfEquipmentAndQualificationLine4History line1History = new ListOfEquipmentAndQualificationLine4History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					listofequipmentandqualificationline4historyrepository.save(line1History);
				}
			}
			// Review of critical parameter
			if (details.getReviewofcriticalparameterchecksofline5() != null
					&& !details.getReviewofcriticalparameterchecksofline5().isEmpty()) {
				for (ReviewOfCriticalParameterChecksOfLine5 line1 : details
						.getReviewofcriticalparameterchecksofline5()) {
					ReviewOfCriticalParameterChecksOfLine5History line1History = new ReviewOfCriticalParameterChecksOfLine5History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					reviewofcriticalparameterchecksofline5historyrepository.save(line1History);
				}
			}
			// Review of All Non Conformity Product
			if (details.getReviewofallnonconformityproductline6() != null
					&& !details.getReviewofallnonconformityproductline6().isEmpty()) {
				for (ReviewOfAllNonConformityProductLine6 line1 : details.getReviewofallnonconformityproductline6()) {
					ReviewOfAllNonConformityProductLine6History line1History = new ReviewOfAllNonConformityProductLine6History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					reviewofallnonconformityproductline6historyrepository.save(line1History);
				}
			}
			// Review of deviation
			if (details.getReviewofdeviationline7() != null && !details.getReviewofdeviationline7().isEmpty()) {
				for (ReviewOfDeviationLine7 line1 : details.getReviewofdeviationline7()) {
					ReviewOfDeviationLine7History line1History = new ReviewOfDeviationLine7History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					reviewofdeviationline7historyrepository.save(line1History);
				}
			}
			// Review Of Change Control System
			if (details.getReviewofchangecontrolsystemline8() != null
					&& !details.getReviewofchangecontrolsystemline8().isEmpty()) {
				for (ReviewOfChangeControlSystemLine8 line1 : details.getReviewofchangecontrolsystemline8()) {
					ReviewOfChangeControlSystemLine8History line1History = new ReviewOfChangeControlSystemLine8History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					reviewofchangecontrolsystemline8historyrepository.save(line1History);
				}
			}
			// ComplaintsRejectsAndProductRecallsLine9
			if (details.getComplaintsrejectsandproductrecallsline9() != null
					&& !details.getComplaintsrejectsandproductrecallsline9().isEmpty()) {
				for (ComplaintsRejectsAndProductRecallsLine9 line1 : details
						.getComplaintsrejectsandproductrecallsline9()) {
					ComplaintsRejectsAndProductRecallsLine9History line1History = new ComplaintsRejectsAndProductRecallsLine9History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					complaintsrejectsandproductrecallsline9historyrepository.save(line1History);
				}
			}
			// Review of Product Recalls Line
			if (details.getReviewofproductrecallline10() != null
					&& !details.getReviewofproductrecallline10().isEmpty()) {
				for (ReviewOfProductRecallLine10 line1 : details.getReviewofproductrecallline10()) {
					ReviewOfProductRecallLine10History line1History = new ReviewOfProductRecallLine10History();
					BeanUtils.copyProperties(line1, line1History);
					line1History.setHistoryId(history.getHistoryId());
					reviewofproductrecallline10historyrepository.save(line1History);
				}
			}
			
			try {
				qamailfunction.sendMailToQaManagerF028(reviewObj);
				qamailfunction.sendMailToMrManagerF028(reviewObj);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Submitted but Unable to send mail! "),
				HttpStatus.OK);
			}
		} catch (Exception ex) {
			log.error("Unable to save Annual Product Review details!", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Submitted successfully"), HttpStatus.OK);
	}
	// GET BY PARAM

	public ResponseEntity<?> getByParamAnnualProductReview(String date) {
		try {

			AnnualProductReview list = annualProductReviewRepository.getdetailsbyParam(date);

			if (list == null) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR PRINT
	public ResponseEntity<?> getByPrintAnnualProductReview(String year, String month, String date) {
		try {

			List<AnnualProductReview> list = annualProductReviewRepository.printParam(year, month, date);

			if (list == null || list.isEmpty()) {
				return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			}

			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Unable to get Details!", e);
			return new ResponseEntity<>("Error Getting Details.", HttpStatus.BAD_REQUEST);
		}
	}

	// GET FOR SUMMARY
	public ResponseEntity<?> getAnnualProductReviewSummary(HttpServletRequest http) {

		List<AnnualProductReview> details = null;
		try {
			String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (userRole.equals("ROLE_DESIGNEE")) {

				details = annualProductReviewRepository.designeeSummary();
			} else if (userRole.equals("ROLE_MR") || userRole.equals("QA_MANAGER")) {

				details = annualProductReviewRepository.managerSummary();

			} else {
				return new ResponseEntity<>(new ApiResponse(false, userRole + " is not authorize to access the form."),
						HttpStatus.FORBIDDEN);
			}

			return new ResponseEntity<>(details, HttpStatus.OK);
		} catch (Exception e) {

			log.error("Unable to get Details!", e);

			return new ResponseEntity<>("Unable to get Details! ", HttpStatus.BAD_REQUEST);
		}
	}

	// DELETE API FOR BATCH RELEASE NOTES
	public ResponseEntity<?> deleteAnnualProductReview(String listName, Long lineItemId) {
		try {
			// Fetch the main AnnualProductReview object
//			Optional<AnnualProductReview> detailsOpt = annualProductReviewRepository.findById(lineItemId);
//
//			if (!detailsOpt.isPresent()) {
//				return new ResponseEntity<>(new ApiResponse(false, "No data found for the id: " + lineItemId),
//						HttpStatus.BAD_REQUEST);
//			}
//
//			AnnualProductReview details = detailsOpt.get();

			// Handle deletion based on list name
			switch (listName) {
			case "summaryline1":
				summaryLine1Repository.deleteById(lineItemId);
				break;

			case "summaryparametersline1":
				summaryparametersline1repository.deleteById(lineItemId);
				break;

			case "rawmaterialsdetailsline2":
				rawmaterialsdetailsline2repository.deleteById(lineItemId);
				break;

			case "packingmaterialdetailsline3":
				packingmaterialdetailsline3repository.deleteById(lineItemId);
				break;

			case "listofequipmentandqualificationline4":
				listofequipmentandqualificationline4repository.deleteById(lineItemId);
				break;

			case "reviewofcriticalparameterchecksofline5":
				reviewofcriticalparameterchecksofline5repository.deleteById(lineItemId);
				break;

			case "reviewofallnonconformityproductline6":
				reviewofallnonconformityproductline6repository.deleteById(lineItemId);
				break;

			case "reviewofdeviationline7":
				reviewofdeviationline7repository.deleteById(lineItemId);
				break;

			case "reviewofchangecontrolsystemline8":
				reviewofchangecontrolsystemline8repository.deleteById(lineItemId);
				break;

			case "complaintsrejectsandproductrecallsline9":
				complaintsrejectsandproductrecallsline9repository.deleteById(lineItemId);
				;
				break;

			case "reviewofproductrecallline10":
				reviewofproductrecallline10repository.deleteById(lineItemId);
				break;

			default:
				return new ResponseEntity<>(new ApiResponse(false, "Invalid list name or/id: " + listName + lineItemId),
						HttpStatus.BAD_REQUEST);
			}

//			// Save the modified AnnualProductReview entity
//			annualProductReviewRepository.save(details);

		} catch (Exception ex) {
			log.error(" **** Unable to delete details! **** " + ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to delete details!"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Deleted successfully"), HttpStatus.OK);
	}

	// APPROVE/REJECT

	public ResponseEntity<?> approveRejectAnnualProductReview(ApproveResponse approvalResponse,
			HttpServletRequest http) {

		SCAUtil scaUtil = new SCAUtil();
		AnnualProductReview summary = null;

		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		// Fetching current date
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = QAUtil.convertLocalDateTimeToDate(currentDate);

		try {
			// Fetch the QASummaryOfTraceability entity by ID
			summary = annualProductReviewRepository.findById(approvalResponse.getId())
					.orElseThrow(() -> new RuntimeException("Summary not found with ID " + approvalResponse.getId()));

			String qaManagerOrMrStatus = summary.getQaManagerOrMrStatus();
			String status = "";
			AnnualProductReviewHistory history = new AnnualProductReviewHistory();

			// QA Manager or Designee approval/rejection logic
			if (qaManagerOrMrStatus.equalsIgnoreCase(AppConstants.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("ROLE_MR")) {

					String reason = approvalResponse.getRemarks();
					String recommendations = approvalResponse.getRecommendations();
					history = annualProductReviewHistoryRepository.fetchLastSubmittedRecord(summary.getDate());

					if (approvalResponse.getStatus().equalsIgnoreCase("Approve")) {
						summary.setQaManagerOrMrStatus(QaAppConstants.qaManagerMrApproved);
						summary.setRecommendations(recommendations);
						history.setQaManagerOrMrStatus(QaAppConstants.qaManagerMrApproved);
						history.setRecommendations(recommendations);
						status = "Approved";
					} else if (approvalResponse.getStatus().equalsIgnoreCase("Reject")) {
						summary.setReason(reason);
						summary.setQaManagerOrMrStatus(QaAppConstants.qaManagerMrRejected);
						history.setReason(reason);
						history.setQaManagerOrMrStatus(QaAppConstants.qaManagerMrRejected);
						status = "Rejected";
					}

					summary.setQaManagerOrMrApprovedOn(date);
					summary.setQaManagerOrMrApprovedBy(userName);
					summary.setQaManagerOrMrApproverId(userId);
					summary.setQaManagerOrMrSign(userName);
					
					//history
					history.setQaManagerOrMrApprovedOn(date);
					history.setQaManagerOrMrApprovedBy(userName);
					history.setQaManagerOrMrApproverId(userId);
					history.setQaManagerOrMrSign(userName);


					// Save the updated QASummaryOfTraceability entity
					annualProductReviewRepository.save(summary);

					// Save the updated history
					annualProductReviewHistoryRepository.save(history);

					return new ResponseEntity<>(new ApiResponse(true, userRole + " " + status + " successfully"),
							HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to approve/reject"),
							HttpStatus.FORBIDDEN);
				}

			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, "Invalid status or no pending approval for this user"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			log.error("Unable to approve/reject AnnualProductReview", e);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// GET BMR NUMBER

	public ResponseEntity<?> getAllBmrNumbers(String Date) {

		List<String> bleachingBmrList = new ArrayList<>();

		List<String> spulanceBmrList1 = new ArrayList<>();

		List<String> spulanceBmrList2 = new ArrayList<>();

		List<String> punchingBmrList = new ArrayList<>();

		List<String> goodsBmrList = new ArrayList<>();
		
		List<String> budsBmrList = new ArrayList<>();

		List<String> totalBmrList = new ArrayList<>();
		
		

		List<TraceResponseUtil> valuePairList = new ArrayList<>();

		try {

//			bleachingBmrList = batchReleaseNotesHeaderRepository.fetchBleachBatchNumber();
//
//			spulanceBmrList1 = batchReleaseNotesHeaderRepository.fetchSpulanceBatchNumber1();
//
//			spulanceBmrList2 = batchReleaseNotesHeaderRepository.fetchSpulanceBatchNumber2();
//
//			punchingBmrList = batchReleaseNotesHeaderRepository.fetchPadpunchingBatchNumber();
//
//			goodsBmrList = batchReleaseNotesHeaderRepository.fetchDrygoodsBatchNumber();

			bleachingBmrList = batchReleaseNotesHeaderRepository.fetchBleachingDetails(Date);

			spulanceBmrList1 = batchReleaseNotesHeaderRepository.fetchSpunlace1Details(Date);

			spulanceBmrList2 = batchReleaseNotesHeaderRepository.fetchSpunlace2Details(Date);

			punchingBmrList = batchReleaseNotesHeaderRepository.fetchPunchingBatchDetails(Date);

			goodsBmrList = batchReleaseNotesHeaderRepository.fetchDrygoodsDetsils(Date);
			
			budsBmrList = batchReleaseNotesHeaderRepository.fetchBudsDetails(Date);

//			totalBmrList.addAll(bleachingBmrList);
//			totalBmrList.addAll(spulanceBmrList1);
//			totalBmrList.addAll(spulanceBmrList2);
//			totalBmrList.addAll(punchingBmrList);
//			totalBmrList.addAll(goodsBmrList);
//
//			Long id = (long) 1;
//
//			for (String temp : totalBmrList) {
//				TraceResponseUtil values = new TraceResponseUtil();
//				values.setValue(temp);
//				values.setId(id);
//
//				valuePairList.add(values);
//				id++;
//			}
			
			Long id = 1L; // Start ID

			// For each list, specify the department name when adding to valuePairList
			for (String temp : bleachingBmrList) {
			    TraceResponseUtil values = new TraceResponseUtil();
			    values.setValue(temp);
			    values.setId(id);
			    values.setDepartment("bleaching");
			    valuePairList.add(values);
			    id++;
			}

			for (String temp : spulanceBmrList1) {
			    TraceResponseUtil values = new TraceResponseUtil();
			    values.setValue(temp);
			    values.setId(id);
			    values.setDepartment("spunlace");
			    valuePairList.add(values);
			    id++;
			}

			for (String temp : spulanceBmrList2) {
			    TraceResponseUtil values = new TraceResponseUtil();
			    values.setValue(temp);
			    values.setId(id);
			    values.setDepartment("spunlace");
			    valuePairList.add(values);
			    id++;
			}

			for (String temp : punchingBmrList) {
			    TraceResponseUtil values = new TraceResponseUtil();
			    values.setValue(temp);
			    values.setId(id);
			    values.setDepartment("pad_punching");
			    valuePairList.add(values);
			    id++;
			}

			for (String temp : goodsBmrList) {
			    TraceResponseUtil values = new TraceResponseUtil();
			    values.setValue(temp);
			    values.setId(id);
			    values.setDepartment("dry_goods");
			    valuePairList.add(values);
			    id++;
			}

			for (String temp : budsBmrList) {
			    TraceResponseUtil values = new TraceResponseUtil();
			    values.setValue(temp);
			    values.setId(id);
			    values.setDepartment("Buds");
			    valuePairList.add(values);
			    id++;
			}



		} catch (Exception e) {
			log.error("Unable to approve/reject QA Summary of Traceability", e);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/reject: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.status(HttpStatus.OK).body(valuePairList);
	}

	//GET ALL BMR DETAILS BY BATCH NO BATCH RELEASE NOTES
	public ResponseEntity<?> getBatchNumber(String batchNumber) {

		List<AllBMRDetailsProjection> bmrList = new ArrayList<>();
		List<BmrDetailsRequest> bmrList1 = new ArrayList<>();

		try {

			if (batchNumber.contains("-")) {
				//spn1
				if( batchReleaseNotesHeaderRepository.isExistSpunlace1(batchNumber)) {
					bmrList = qasummaryoftraceabilityrepository.spulanceOrderDetailsResponse(batchNumber);
				}
				//dry
			    if( batchReleaseNotesHeaderRepository.isExistDrygoods(batchNumber)) {
					bmrList = qasummaryoftraceabilityrepository.fetchBmrDataDryGoods(batchNumber);
				}
			   // punch
			    if( batchReleaseNotesHeaderRepository.isExistPunching(batchNumber)) {
					bmrList = qasummaryoftraceabilityrepository.fetchBmrDataPunching(batchNumber);
				}
			    
			    // buds
			    if( batchReleaseNotesHeaderRepository.isExistBuds(batchNumber)) {
					bmrList = qasummaryoftraceabilityrepository.BudsBmrRequest(batchNumber);
				}
				

			} 
			else if (batchNumber.contains("/")) {
            	  // bleach
			    if( batchReleaseNotesHeaderRepository.isExistBleaching(batchNumber)) {
			    	bmrList = qasummaryoftraceabilityrepository.bleachingBmrResponse(batchNumber);
				}

			}
		  else {
				
			  // spun2
			    if( batchReleaseNotesHeaderRepository.isExistSpunlace2(batchNumber)) {
			    	bmrList = qasummaryoftraceabilityrepository.spulanceRPOrderDetailsResponse(batchNumber);
				}
			}

		} catch (Exception e) {
			log.error("Unable to get Bmr Details", e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Failed to get Bmr Details: " + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

		return ResponseEntity.status(HttpStatus.OK).body(bmrList);
	}

}