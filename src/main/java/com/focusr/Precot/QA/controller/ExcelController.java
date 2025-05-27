package com.focusr.Precot.QA.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.QA.model.audit.AgendaForManagementReviewMeetingHistory;
import com.focusr.Precot.QA.model.audit.AnnualPlanHistory;
import com.focusr.Precot.QA.model.audit.AnnualProductReviewHistory;
import com.focusr.Precot.QA.model.audit.BatchReleaseNotesHeaderHistory;
import com.focusr.Precot.QA.model.audit.BmrIssueRegisterHistoryF045;
import com.focusr.Precot.QA.model.audit.ControlOfGHpWcHistory;
import com.focusr.Precot.QA.model.audit.CorrectiveActionReportHistory;
import com.focusr.Precot.QA.model.audit.DeviationFormHistory;
import com.focusr.Precot.QA.model.audit.DistributionAndDestructionRecordHistoryF003;
import com.focusr.Precot.QA.model.audit.FinalInspectionReportHistoryF037;
import com.focusr.Precot.QA.model.audit.InternalAuditNCReportHistory;
import com.focusr.Precot.QA.model.audit.InternalAuditReportHistory;
import com.focusr.Precot.QA.model.audit.InternalAuditScheduleHistory;
import com.focusr.Precot.QA.model.audit.InwardInspectionReportHistory;
import com.focusr.Precot.QA.model.audit.ListOfGHpWcHistory;
import com.focusr.Precot.QA.model.audit.ListOfSharpToolsHistory;
import com.focusr.Precot.QA.model.audit.ManagementOfIncidenceHistory;
import com.focusr.Precot.QA.model.audit.MetalDetectorCalibrationRecordHistory;
import com.focusr.Precot.QA.model.audit.MetalDetectorPassReportHistory;
import com.focusr.Precot.QA.model.audit.MinutesOfMRMHistory;
import com.focusr.Precot.QA.model.audit.MomMockRecallHistory;
import com.focusr.Precot.QA.model.audit.ProductDispositionLogBookHistoryF049;
import com.focusr.Precot.QA.model.audit.QASummaryOfTraceabilityHistory;
import com.focusr.Precot.QA.model.audit.QaBreakageReportHistory;
import com.focusr.Precot.QA.model.audit.QaContainerInspectionReportHistory;
import com.focusr.Precot.QA.model.audit.QaCustomerComplaintRegisterFormHistory;
import com.focusr.Precot.QA.model.audit.QaNonConformityReportHistory;
import com.focusr.Precot.QA.model.audit.QaOnlineInspectionReportHistory;
import com.focusr.Precot.QA.model.audit.QaPestControllerHistory;
import com.focusr.Precot.QA.model.audit.QaRodentBoxCheckListHistory;
import com.focusr.Precot.QA.model.audit.QaTrainingNeedIdentificationFormHistory;
import com.focusr.Precot.QA.model.audit.QualityReviewMeetingHistory;
import com.focusr.Precot.QA.model.audit.RequestAndIssunceOfDocumentHistoryF002;
import com.focusr.Precot.QA.model.audit.SupplierAuditPlanHistory;
import com.focusr.Precot.QA.model.audit.SupplierAuditReportHistory;
import com.focusr.Precot.QA.model.audit.TemplateForRecallHistory;
import com.focusr.Precot.QA.model.audit.TrainingCalendarHistory;
import com.focusr.Precot.QA.model.audit.TrainingQuestionnaireHistory;
import com.focusr.Precot.QA.model.audit.batchReleaseChecklisthistory;
import com.focusr.Precot.QA.model.audit.productionretainedsampleregister40history;
import com.focusr.Precot.QA.payload.QaAuditRequest;
import com.focusr.Precot.QA.repository.audit.AgendaForManagementReviewMeetingHistoryRepository;
import com.focusr.Precot.QA.repository.audit.AnnualPlanHistoryRepository;
import com.focusr.Precot.QA.repository.audit.AnnualProductReviewHistoryRepository;
import com.focusr.Precot.QA.repository.audit.BatchReleaseNotesHeaderHistoryRepository;
import com.focusr.Precot.QA.repository.audit.BmrIssueRegisterHistoryRepositoryF045;
import com.focusr.Precot.QA.repository.audit.ControlOfGHpWcHistoryRepository;
import com.focusr.Precot.QA.repository.audit.CorrectiveActionReportHistoryRepo;
import com.focusr.Precot.QA.repository.audit.DeviationFormHistoryRepo;
import com.focusr.Precot.QA.repository.audit.DistributionAndDistructionRecordHistoryRespositoryF003;
import com.focusr.Precot.QA.repository.audit.FinalInspectionReportHistoryRepository;
import com.focusr.Precot.QA.repository.audit.InternalAuditNCReportHistoryRepo;
import com.focusr.Precot.QA.repository.audit.InternalAuditReportHistoryRepo;
import com.focusr.Precot.QA.repository.audit.InternalAuditScheduleHistoryRepo;
import com.focusr.Precot.QA.repository.audit.InwardInspectionReportHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ListOfGHpWcHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ListOfSharpToolsHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ManagementOfIncidenceHistoryRepository;
import com.focusr.Precot.QA.repository.audit.MetalDetectorCalibrationRecordHistoryRepository;
import com.focusr.Precot.QA.repository.audit.MetalDetectorPassReportHistoryRepo;
import com.focusr.Precot.QA.repository.audit.MinutesOfMRMHistoryRepository;
import com.focusr.Precot.QA.repository.audit.MomMockRecallHistoryRepository;
import com.focusr.Precot.QA.repository.audit.ProductDispositionLogBookHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QASummaryOfTraceabilityHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaBreakageReportRepositoryHistory;
import com.focusr.Precot.QA.repository.audit.QaContainerInspectionReportHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaCustomerComplaintRegisterFormHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaNonConformityReportHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaOnlineInspectionReportHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaPestControllerHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaRodentBoxCheckListHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QaTrainingNeedIdentificationFormHistoryRepository;
import com.focusr.Precot.QA.repository.audit.QualityReviewMeetingsHisotoryRepository;
import com.focusr.Precot.QA.repository.audit.RequestAndIssunceOfDocumentHistoryRepository;
import com.focusr.Precot.QA.repository.audit.SupplierAuditPlanHistoryRepo;
import com.focusr.Precot.QA.repository.audit.SupplierAuditReportHistoryRepo;
import com.focusr.Precot.QA.repository.audit.TemplateForRecallHistoryRepo;
import com.focusr.Precot.QA.repository.audit.TrainingCalendarHistoryRepo;
import com.focusr.Precot.QA.repository.audit.TrainingQuestionnaireHistoryRepo;
import com.focusr.Precot.QA.repository.audit.batchReleaseChecklisthistoryRepo;
import com.focusr.Precot.QA.repository.audit.productionretainedsampleregister40HistoryRepo;
import com.focusr.Precot.QA.util.excel.ExcelGeneratorService;
import com.focusr.Precot.QA.util.excel.qaAuditservice8;
import com.focusr.Precot.payload.ApiResponse;

@RestController
@RequestMapping("/api/qa/excel")
public class ExcelController {

	@Autowired
	private ExcelGeneratorService excelGeneratorService;
	
	@Autowired
	qaAuditservice8 qaAuditservice8;

	@Autowired
	private QaPestControllerHistoryRepository qaPestControllerHistoryRepository;
	
	@Autowired
	private QASummaryOfTraceabilityHistoryRepository summaryOfTraceabilityHistoryRepository;
	
	@Autowired
	private AnnualProductReviewHistoryRepository annualProductReviewRepository;
	
	@Autowired
	private BatchReleaseNotesHeaderHistoryRepository batchReleaseNotesHeaderHistoryRepository;
	
	@Autowired
	private batchReleaseChecklisthistoryRepo batchReleaseChecklisthistoryRepo;
	
	@Autowired
	private productionretainedsampleregister40HistoryRepo  productionretainedsampleregister40history;

	@Autowired
	private QaRodentBoxCheckListHistoryRepository qaRodentBoxCheckListHistoryRepository;

	@Autowired
	private QaCustomerComplaintRegisterFormHistoryRepository qaCustomerComplaintRegisterFormHistoryRepository;

	@Autowired
	InwardInspectionReportHistoryRepository inwardinspectionreporthistoryrepository;

	@Autowired
	ManagementOfIncidenceHistoryRepository managementofincidencehistoryrepository;

	@Autowired
	ListOfSharpToolsHistoryRepository listofsharptoolshistoryrepository;

	@Autowired
	private InternalAuditScheduleHistoryRepo auditScheduleHistoryRepo;

	@Autowired
	private QaNonConformityReportHistoryRepository qaNonConformityReportHistoryRepository;

	@Autowired
	private MinutesOfMRMHistoryRepository minutesOfMRMHistoryRepository;
	
	@Autowired
	private QaTrainingNeedIdentificationFormHistoryRepository qaTrainingNeedIdentificationFormHistoryRepository;

	@Autowired
	private AnnualPlanHistoryRepository annualPlanHistoryRepository;

	@Autowired
	private AgendaForManagementReviewMeetingHistoryRepository agendaForManagementReviewMeetingHistoryRepository;

	@Autowired
	private RequestAndIssunceOfDocumentHistoryRepository requestAndIssunceOfDocumentHistoryRepository;

	@Autowired
	private QaOnlineInspectionReportHistoryRepository qaOnlineInspectionReportHistoryRepository;

	@Autowired
	private QaContainerInspectionReportHistoryRepository qaContainerInspectionReportHistoryRepository;

	@Autowired
	private FinalInspectionReportHistoryRepository finalInspectionReportHistoryRepository;

	@Autowired
	private DistributionAndDistructionRecordHistoryRespositoryF003 distributionAndDistructionRecordHistoryRespositoryF003;

	@Autowired
	private InternalAuditNCReportHistoryRepo internalAuditNCReportHistoryRepo;

	@Autowired
	private InternalAuditReportHistoryRepo internalAuditReportHistoryRepo;

	@Autowired
	private SupplierAuditReportHistoryRepo supplierAuditReportHistoryRepo;

	@Autowired
	private SupplierAuditPlanHistoryRepo supplierAuditPlanHistoryRepo;
	
//	@Autowired
//	private QaTrainingNeedIdentificationFormHistoryRepository qaTrainingNeedIdentificationFormHistoryRepository;

	// VIJAY

	@Autowired
	private TemplateForRecallHistoryRepo templateForRecallHistoryRepo;

	@Autowired
	private MetalDetectorCalibrationRecordHistoryRepository metalDetectorCalibrationRecordHistoryRepository;

	@Autowired
	private MetalDetectorPassReportHistoryRepo metalDetectorPassReportHistoryRepo;

	// Siva

	@Autowired
	private QaBreakageReportRepositoryHistory qabreakagereportrepositoryhistory;

	@Autowired
	private ControlOfGHpWcHistoryRepository controlofghpwchistoryrepository;

	@Autowired
	private ListOfGHpWcHistoryRepository listofghpwchistoryrepository;
	
	@Autowired
	private MomMockRecallHistoryRepository mommockrecallhistoryrepository;

//	Menaga
	
	@Autowired
	private ProductDispositionLogBookHistoryRepository productDispositionLogBookHistoryRepository;
	
	@Autowired
	private BmrIssueRegisterHistoryRepositoryF045 bmrIssueRegisterHistoryRepositoryF045;
	
	@Autowired
	private QualityReviewMeetingsHisotoryRepository qualityReviewMeetingsHisotoryRepository;
	
//	Srimathi

	@Autowired
	private TrainingCalendarHistoryRepo trainingCalendarHistoryRepo;
	
	@Autowired
	private TrainingQuestionnaireHistoryRepo trainingQuestionnaireHistoryRepo;

	@Autowired
	private CorrectiveActionReportHistoryRepo correctiveActionReportHistoryRepo;
	
	@Autowired
	private DeviationFormHistoryRepo deviationFormHistoryRepo;
	
	@PostMapping("/download")
	public ResponseEntity<?> downloadExcel(@RequestBody QaAuditRequest summeryrequest, HttpServletResponse response)
			throws IOException {

		// Get the appropriate repository and entity class dynamically based on the
		// entityName
		Class<?> entityClass = getEntityClass(summeryrequest.getForm_name());
		JpaRepository<?, ?> repository = getRepository(summeryrequest.getForm_name());

		// Fetch the filtered entities by date range
		List<?> entities = fetchEntitiesByDateRange(summeryrequest, repository);

		// Check if entities list is empty
		if (entities == null || entities.isEmpty()) {
//			return new ResponseEntity(new ApiResponse(true, "No data"), HttpStatus.OK);
			return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
		}
		
		if(summeryrequest.getForm_name().equalsIgnoreCase("production_retained_sample_register")) {
			List<productionretainedsampleregister40history> details= productionretainedsampleregister40history.audit(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date(),summeryrequest.getShift());
			 return qaAuditservice8. generateProductionRetain(details,response);
		}

		// Call the generic Excel generator with the dynamic entity class and list of
		// entities
		return excelGeneratorService.generateExcel(response, entities, entityClass, summeryrequest.getForm_name());
	}

	@PostMapping("/getAuditSummary")
	public ResponseEntity<?> getAuditSummary(@RequestBody QaAuditRequest summeryrequest, HttpServletResponse res) {

		ResponseEntity<?> message = excelGeneratorService.getAuditSummary(summeryrequest, res);

		return message;
	}

	// Method to map entity name to the actual class
	private Class<?> getEntityClass(String entityName) {
		switch (entityName.toLowerCase()) {

		case "pest_controller":
			return QaPestControllerHistory.class;
		case "rodent_box_check_list":
			return QaRodentBoxCheckListHistory.class;
		case "customer_complaint_register_form":
			return QaCustomerComplaintRegisterFormHistory.class;
		case "inward_inspection_report":
			return InwardInspectionReportHistory.class;
		case "management_of_incidence":
			return ManagementOfIncidenceHistory.class;
		case "list_of_sharp_tools":
			return ListOfSharpToolsHistory.class;
		case "internal_audit_schedule":
			return InternalAuditScheduleHistory.class;
		case "non_conformity_report":
			return QaNonConformityReportHistory.class;
		case "minutes_of_mrm":
			return MinutesOfMRMHistory.class;
		case "annual_plan":
			return AnnualPlanHistory.class;
		case "agenda_for_management_review_meeting":
			return AgendaForManagementReviewMeetingHistory.class;
		case "request_and_issuance_of_document":
			return RequestAndIssunceOfDocumentHistoryF002.class;
		case "container_inspection_report":
			return QaContainerInspectionReportHistory.class;
		case "final_inspection_report":
			return FinalInspectionReportHistoryF037.class;
		case "distribution_and_destruction_record":
			return DistributionAndDestructionRecordHistoryF003.class;
		case "internal_audit_nc_report":
			return InternalAuditNCReportHistory.class;
		case "internal_audit_report":
			return InternalAuditReportHistory.class;
		case "supplier_audit_report":
			return SupplierAuditReportHistory.class;
		case "supplier_audit_plan":
			return SupplierAuditPlanHistory.class;
		case "trainning_need_identification_form":
			return QaTrainingNeedIdentificationFormHistory.class;

		// VIJAY

		case "template_for_mock_recall":
			return TemplateForRecallHistory.class;
		case "metal_detector_calibration_record":
			return MetalDetectorCalibrationRecordHistory.class;
		case "metal_detector_pass_report":
			return MetalDetectorPassReportHistory.class;

		// Siva
		case "breakage_report":
			return QaBreakageReportHistory.class;

		case "control_of_glass_hard_plastic_wood_ceramic":
			return ControlOfGHpWcHistory.class;
 
		case "list_of_glass_hard_plastic_wood_ceramic":
			return ListOfGHpWcHistory.class;
			
			
			
			
			
			
		case "minutes_of_meeting_mock_recall":
			return MomMockRecallHistory.class;

//			Menaga

		case "product_disposition_logbook":
			return ProductDispositionLogBookHistoryF049.class;

		case "bmr_issue_register":
			return BmrIssueRegisterHistoryF045.class;

		case "quality_review_meetings":
			return QualityReviewMeetingHistory.class;
			
//			Srimathi

		case "training_calender":
			return TrainingCalendarHistory.class;
			
		case "training_questionnaire":
			return TrainingQuestionnaireHistory.class;
		case "corrective_action_report":
			return CorrectiveActionReportHistory.class;	
		case "deviation_form":
			return DeviationFormHistory.class;		

		// Gayathri

		case "training_need_identification_form":
			return QaTrainingNeedIdentificationFormHistory.class;
			
			//GOKUL 
			
		case "production_retained_sample_register":
			return productionretainedsampleregister40history.class;
			
		case "batch_release_checklist":
			return batchReleaseChecklisthistory.class;
			
			
//			Giri
		case "summary_traceability":
			return QASummaryOfTraceabilityHistory.class;
			
		case "annual_product_review":
			return AnnualProductReviewHistory.class;
			
		case "batch_release_notes":
			return BatchReleaseNotesHeaderHistory.class;
			

		default:
			throw new IllegalArgumentException("Entity not found: " + entityName);
		}
	}

	// Method to map entity name to the repository
	private JpaRepository<?, ?> getRepository(String entityName) {
		switch (entityName.toLowerCase()) {
		case "pest_controller":
			return qaPestControllerHistoryRepository;
		case "rodent_box_check_list":
			return qaRodentBoxCheckListHistoryRepository;
		case "customer_complaint_register_form":
			return qaCustomerComplaintRegisterFormHistoryRepository;
		case "inward_inspection_report":
			return inwardinspectionreporthistoryrepository;
		case "management_of_incidence":
			return managementofincidencehistoryrepository;
		case "list_of_sharp_tools":
			return listofsharptoolshistoryrepository;
		case "internal_audit_schedule":
			return auditScheduleHistoryRepo;
		case "non_conformity_report":
			return qaNonConformityReportHistoryRepository;
		case "minutes_of_mrm":
			return minutesOfMRMHistoryRepository;
		case "annual_plan":
			return annualPlanHistoryRepository;
		case "agenda_for_management_review_meeting":
			return agendaForManagementReviewMeetingHistoryRepository;
		case "request_and_issuance_of_document":
			return requestAndIssunceOfDocumentHistoryRepository;
//triple form			
//		case "online_inspection_report_pads":
//			return qaOnlineInspectionReportHistoryRepository;
//		case "online_inspection_report_balls":
//			return qaOnlineInspectionReportHistoryRepository;
//		case "online_inspection_report_buds":
//			return qaOnlineInspectionReportHistoryRepository;	
			
		case "container_inspection_report":
			return qaContainerInspectionReportHistoryRepository;
		case "final_inspection_report":
			return finalInspectionReportHistoryRepository;
		case "distribution_and_destruction_record":
			return distributionAndDistructionRecordHistoryRespositoryF003;
		case "internal_audit_nc_report":
			return internalAuditNCReportHistoryRepo;
		case "internal_audit_report":
			return internalAuditReportHistoryRepo;
		case "supplier_audit_report":
			return supplierAuditReportHistoryRepo;
		case "supplier_audit_plan":
			return supplierAuditPlanHistoryRepo;
		case "trainning_need_identification_form":
			return qaTrainingNeedIdentificationFormHistoryRepository;

		// VIJAY

		case "template_for_mock_recall":
			return templateForRecallHistoryRepo;

		case "metal_detector_calibration_record":
			return metalDetectorCalibrationRecordHistoryRepository;

		case "metal_detector_pass_report":
			return metalDetectorPassReportHistoryRepo;

		// Siva
		case "breakage_report":
			return qabreakagereportrepositoryhistory;

		case "control_of_glass_hard_plastic_wood_ceramic":
			return controlofghpwchistoryrepository;

		case "list_of_glass_hard_plastic_wood_ceramic":
			return listofghpwchistoryrepository;

			
		case "minutes_of_meeting_mock_recall":
			return mommockrecallhistoryrepository;
			
//			Menaga

		case "product_disposition_logbook":
			return productDispositionLogBookHistoryRepository;

		case "bmr_issue_register":
			return bmrIssueRegisterHistoryRepositoryF045;

//		case "quality_review_meetings":
//			return qualityReviewMeetingsHisotoryRepository;
			
//			Srimathi

		case "training_calender":
			return trainingCalendarHistoryRepo;
		case "corrective_action_report":
			return correctiveActionReportHistoryRepo;	
		case "deviation_form":
			return deviationFormHistoryRepo;	
			// Gayathri
			
		case "training_need_identification_form":
			return qaTrainingNeedIdentificationFormHistoryRepository;	

			
		case "training_questionnaire":
			return trainingQuestionnaireHistoryRepo;

		case "quality_review_meetings":
			return qualityReviewMeetingsHisotoryRepository;

//			Giri
			
		case "summary_traceability":
			return summaryOfTraceabilityHistoryRepository;
			
		case "annual_product_review":
			return annualProductReviewRepository;
			
		case "batch_release_notes":
			return batchReleaseNotesHeaderHistoryRepository;
			
			//GOKUL
			
		case "batch_release_checklist":
			return batchReleaseChecklisthistoryRepo;
			
		case "production_retained_sample_register":
			return productionretainedsampleregister40history;
			
			
			

		default:
			throw new IllegalArgumentException("Repository not found for entity: " + entityName);
		}
	}

	private List<?> fetchEntitiesByDateRange(QaAuditRequest summeryrequest, JpaRepository<?, ?> repository) {

		// Use the repository to query data based on date range

		if ("pest_controller".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((QaPestControllerHistoryRepository) repository).excelReport(summeryrequest.getForm_no(),
					summeryrequest.getFrom_date(), summeryrequest.getTo_date(), summeryrequest.getMonth(),
					summeryrequest.getYear());
		} else if ("rodent_box_check_list".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((QaRodentBoxCheckListHistoryRepository) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date(), summeryrequest.getMonth(), summeryrequest.getYear());
		} else if ("customer_complaint_register_form".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((QaCustomerComplaintRegisterFormHistoryRepository) repository).excelReport(
					summeryrequest.getFrom_date(), summeryrequest.getTo_date(), summeryrequest.getCcf_no(),
					summeryrequest.getMonth(), summeryrequest.getYear());
		} else if ("inward_inspection_report".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((InwardInspectionReportHistoryRepository) repository).excelReport(summeryrequest.getForm_no(),
					summeryrequest.getFrom_date(), summeryrequest.getTo_date(), summeryrequest.getGr_date(),
					summeryrequest.getSupplier_name(), summeryrequest.getInvoice_no(), summeryrequest.getIir_no());
		} else if ("management_of_incidence".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((ManagementOfIncidenceHistoryRepository) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date(), summeryrequest.getMonth(), summeryrequest.getYear());
		} else if ("list_of_sharp_tools".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((ListOfSharpToolsHistoryRepository) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date(), summeryrequest.getDepartment());
		} else if ("internal_audit_schedule".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((InternalAuditScheduleHistoryRepo) repository).excelReport(summeryrequest.getMonth(),
					summeryrequest.getYear());
		} else if ("non_conformity_report".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((QaNonConformityReportHistoryRepository) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date(), summeryrequest.getMonth(), summeryrequest.getYear());
		} else if ("minutes_of_mrm".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((MinutesOfMRMHistoryRepository) repository).excelReport(summeryrequest.getMonth(),
					summeryrequest.getYear(), summeryrequest.getFrom_date(), summeryrequest.getTo_date());
		} else if ("annual_plan".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((AnnualPlanHistoryRepository) repository).excelReport(summeryrequest.getYear());
		} else if ("agenda_for_management_review_meeting".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((AgendaForManagementReviewMeetingHistoryRepository) repository).excelReport(
					summeryrequest.getMonth(), summeryrequest.getYear(), summeryrequest.getFrom_date(),
					summeryrequest.getTo_date());
		} else if ("request_and_issuance_of_document".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((RequestAndIssunceOfDocumentHistoryRepository) repository).excelReport(summeryrequest.getMonth(),
					summeryrequest.getYear(), summeryrequest.getFrom_date(), summeryrequest.getTo_date());
			
		} 
//		else if ("online_inspection_report_pads".equalsIgnoreCase(summeryrequest.getForm_name())) {
//			return ((QaOnlineInspectionReportHistoryRepository) repository).excelReportF034(summeryrequest.getShift(),
//					summeryrequest.getMachine_no(), summeryrequest.getBmr_no(), summeryrequest.getPorder(),
//					summeryrequest.getForm_no(), summeryrequest.getFrom_date(), summeryrequest.getTo_date());
//		}
		
		else if ("container_inspection_report".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((QaContainerInspectionReportHistoryRepository) repository).excelReport(summeryrequest.getCir_no(),
					summeryrequest.getFrom_date(), summeryrequest.getTo_date());
		} else if ("final_inspection_report".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((FinalInspectionReportHistoryRepository) repository).excelReport(summeryrequest.getShift(),
					summeryrequest.getPorder(), summeryrequest.getFrom_date(), summeryrequest.getTo_date());
		} else if ("distribution_and_destruction_record".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((DistributionAndDistructionRecordHistoryRespositoryF003) repository).excelReport(
					summeryrequest.getMonth(), summeryrequest.getYear(), summeryrequest.getFrom_date(),
					summeryrequest.getTo_date());
		} else if ("internal_audit_nc_report".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((InternalAuditNCReportHistoryRepo) repository).excelReport(summeryrequest.getYear(),
					summeryrequest.getFrom_date(), summeryrequest.getTo_date(), summeryrequest.getDepartment());
		} else if ("internal_audit_report".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((InternalAuditReportHistoryRepo) repository).excelReport(summeryrequest.getMonth(),
					summeryrequest.getYear(), summeryrequest.getFrom_date(), summeryrequest.getTo_date(),
					summeryrequest.getDepartment());
		} else if ("supplier_audit_report".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((SupplierAuditReportHistoryRepo) repository).excelReport(summeryrequest.getSupplier_name(),
					summeryrequest.getFrom_date(), summeryrequest.getTo_date());
		} else if ("supplier_audit_plan".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((SupplierAuditPlanHistoryRepo) repository).excelReport(summeryrequest.getYear());
		}
		 else if ("trainning_need_identification_form".equalsIgnoreCase(summeryrequest.getForm_name())) {
				String fromDate = (summeryrequest.getFrom_date() == null || summeryrequest.getFrom_date().isEmpty())
						? null
						: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date() == null || summeryrequest.getTo_date().isEmpty()) ? null
						: summeryrequest.getTo_date();
				String department = (summeryrequest.getDepartment() == null
						|| summeryrequest.getDepartment().isEmpty()) ? null : summeryrequest.getDepartment();
				String year = (summeryrequest.getYear() == null
						|| summeryrequest.getYear().isEmpty()) ? null : summeryrequest.getYear();

			 
				return ((QaTrainingNeedIdentificationFormHistoryRepository) repository).excelReport(fromDate,toDate,department,year);
			}

		// VIJAY

		else if ("template_for_mock_recall".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((TemplateForRecallHistoryRepo) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date());
		} else if ("metal_detector_calibration_record".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((MetalDetectorCalibrationRecordHistoryRepository) repository)
					.excelReport(summeryrequest.getFrom_date(), summeryrequest.getTo_date());
		} else if ("metal_detector_pass_report".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((MetalDetectorPassReportHistoryRepo) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date());
		}

		// Siva

		else if ("breakage_report".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((QaBreakageReportRepositoryHistory) repository).excelReport(summeryrequest.getSeq_no(),
					summeryrequest.getDepartment(), summeryrequest.getFrom_date(), summeryrequest.getTo_date());
		}

		else if ("control_of_glass_hard_plastic_wood_ceramic".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((ControlOfGHpWcHistoryRepository) repository).excelReport(summeryrequest.getYear(),
					summeryrequest.getMonth(), summeryrequest.getFrom_date(), summeryrequest.getTo_date(),
					summeryrequest.getDepartment());
		}

		else if ("list_of_glass_hard_plastic_wood_ceramic".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((ListOfGHpWcHistoryRepository) repository).excelReport(summeryrequest.getYear(),
					summeryrequest.getMonth(), summeryrequest.getFrom_date(), summeryrequest.getTo_date(),
					summeryrequest.getDepartment());
		}

//		Menaga

		else if ("product_disposition_logbook".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((ProductDispositionLogBookHistoryRepository) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date());
		}

		else if ("bmr_issue_register".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((BmrIssueRegisterHistoryRepositoryF045) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date(), summeryrequest.getDepartment());
		}

		else if ("quality_review_meetings".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((QualityReviewMeetingsHisotoryRepository) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date());
		}

//		Srimathi

		else if ("training_calender".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((TrainingCalendarHistoryRepo) repository).excelReport(summeryrequest.getYear());
		}
		
		else if ("training_questionnaire".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((TrainingQuestionnaireHistoryRepo) repository).excelReport(summeryrequest.getYear(),
					summeryrequest.getMonth(),summeryrequest.getTraineeIdNumber());
		}
		else if ("corrective_action_report".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((CorrectiveActionReportHistoryRepo) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date());
		}
		else if ("deviation_form".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((DeviationFormHistoryRepo) repository).excelReport(summeryrequest.getYear(),
					summeryrequest.getMonth(),summeryrequest.getDateOfInitiation(),summeryrequest.getDeviationNumber());
		}
		// Gayathri

		else if ("training_need_identification_form".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((QaTrainingNeedIdentificationFormHistoryRepository) repository).excelReport(
					summeryrequest.getFrom_date(), summeryrequest.getTo_date(), summeryrequest.getDepartment(),
					summeryrequest.getYear());
		}

//		Giri
		else if ("summary_traceability".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((QASummaryOfTraceabilityHistoryRepository) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date(),summeryrequest.getDepartment(),summeryrequest.getBmr_no());
		}
		
		else if ("annual_product_review".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((AnnualProductReviewHistoryRepository) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date());
		}
		
		else if ("batch_release_notes".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((BatchReleaseNotesHeaderHistoryRepository) repository).excelReport(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date(),summeryrequest.getDepartment());
		}

		else if ("minutes_of_meeting_mock_recall".equalsIgnoreCase(summeryrequest.getForm_name())) {
			 
			return ((MomMockRecallHistoryRepository) repository).excelReport(summeryrequest.getYear(),
					summeryrequest.getMonth(), summeryrequest.getFrom_date(), summeryrequest.getTo_date());
			
		}
		
		//GOKUL
		
		else if ("batch_release_checklist".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((batchReleaseChecklisthistoryRepo) repository).audit(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date(),summeryrequest.getDepartment() ,summeryrequest.getBmr_no() );
		}
		
		else if ("production_retained_sample_register".equalsIgnoreCase(summeryrequest.getForm_name())) {
			return ((productionretainedsampleregister40HistoryRepo) repository).audit(summeryrequest.getFrom_date(),
					summeryrequest.getTo_date(),summeryrequest.getShift());
		}

		throw new IllegalArgumentException("Invalid entity for date filtering: " + summeryrequest.getForm_name());
	}

}
