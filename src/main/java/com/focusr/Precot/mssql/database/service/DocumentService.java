package com.focusr.Precot.mssql.database.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.Buds.util.AppConstantsBuds;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachLayDownCheckListF42Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachSanitizationListF41Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.FormsRequestDTO;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.Qc.AppConstantsQc;
import com.focusr.Precot.util.Store.AppConstantStore;
import com.focusr.Precot.util.drygoods.AppConstantDryGoods;
import com.focusr.Precot.util.padpunching.AppConstantsPadPunching;
import com.focusr.Precot.util.ppc.AppConstantPpc;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;

@Service
public class DocumentService {

	Logger logger = LoggerFactory.getLogger(DocumentService.class);

	// REPOSITORY AUTOWIRES

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private DocumentExcelService documentService;

	// BLEACHING

	@Autowired
	private BleachSanitizationListF41Repository sanitizationRepository;

	public ResponseEntity<?> getSubmittedFormCountsForDepartment(String fromdate, String todate) {

		List<FormsRequestDTO> formCountList = new ArrayList<FormsRequestDTO>();

		try {
			
			
			SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat dbFormat = new SimpleDateFormat("dd/MM/yyyy");

			Date fromDateStr = inputFormat.parse(fromdate); // Input date in yyyy-MM-dd
			String formattedFromDate = dbFormat.format(fromDateStr); // Output in dd/MM/yyyy

			Date toDateStr = inputFormat.parse(todate); // Input date in yyyy-MM-dd
			String formattedToDate = dbFormat.format(toDateStr); // Output in dd/MM/yyyy
			
			System.out.println("From Date Str" + formattedFromDate);
			System.out.println("To Date Str" + formattedToDate);

			long laydownChecklist = sanitizationRepository.laydownChecklistCount(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.laydownFormNumber,
					AppConstants.F42a, fromdate, todate, laydownChecklist));

			long appliedRawCotton = sanitizationRepository.appliedRawCottonCount(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.appliedContaminationFormNumber,
					AppConstants.F04a, fromdate, todate, appliedRawCotton));

			long contaminationCheckingCotton = sanitizationRepository.contaminationChecking(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.contaminationFormNumber,
					AppConstants.F05, fromdate, todate, contaminationCheckingCotton));

			long metalDetector = sanitizationRepository.metalDetector(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.metalDetectorFormNumber,
					AppConstants.F03, fromdate, todate, metalDetector));

			long carding = sanitizationRepository.carding(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.cardingFormNumber,
					AppConstants.F34, fromdate, todate, carding));

			long cakepress = sanitizationRepository.cakepress(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.cakepressFormNumber,
					AppConstants.F09, fromdate, todate, cakepress));

			long jobcard = sanitizationRepository.jobcard(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.jobcardFormNumber,
					AppConstants.F13, fromdate, todate, jobcard));

			long hydroExtractor = sanitizationRepository.hydroExtractor(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.hydroFormNumber,
					AppConstants.F11, fromdate, todate, hydroExtractor));

			long sanitation = sanitizationRepository.sanitationMachines(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.machineSanitationFormNumber,
					AppConstants.F01, fromdate, todate, sanitation));

			long handSanitation = sanitizationRepository.handSanitation(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.handSanitationFormNumber,
					AppConstants.F41, fromdate, todate, handSanitation));

			long appliedAb = sanitizationRepository.appliedAbCotton(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.appliedContaminationFormNumber,
					AppConstants.F08, fromdate, todate, appliedAb));

			long contaminationAb = sanitizationRepository.contaminationAbCotton(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.contaminationCheckFormNumber,
					AppConstants.F18, fromdate, todate, contaminationAb));

			long shftlogbook = sanitizationRepository.shiftLogbook(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.logbookFormNumber,
					AppConstants.F36, fromdate, todate, shftlogbook));

			long wasteBale = sanitizationRepository.wasteBale(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.wasteBaleFormNumber,
					AppConstants.F33, fromdate, todate, wasteBale));

			long machineClean = sanitizationRepository.machineCleaning(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.appliedContaminationFormNumber,
					AppConstants.F38, fromdate, todate, machineClean));

			long housekeeping2 = sanitizationRepository.housekeeping2(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.housekeeping2FormNumber,
					AppConstants.F02, fromdate, todate, housekeeping2));

			long housekeeping2A = sanitizationRepository.housekeeping2A(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstants.BLEACHING, AppConstants.housekeeping2AFormNumber,
					AppConstants.F02A, fromdate, todate, housekeeping2A));

			// SPULANCE

			// f001-f005

			long splBale = sanitizationRepository.splBaleConsumption(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.BALE_CONSUMPTION_REPORT, AppConstantsSplunance.F001, fromdate, todate, splBale));

			long splProcessopen = sanitizationRepository.splProcessSetupF02(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.PROCESS_SETUP_VERIFICATION_OPENING_LINE, AppConstantsSplunance.F002, fromdate, todate,
					splProcessopen));

			long splProcessJetlace = sanitizationRepository.splProcessSetupF03(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.PROCESS_SETUP_DETAILS_JETLACE_AND_DRYER, AppConstantsSplunance.F003, fromdate, todate,
					splProcessJetlace));

			long filterBag = sanitizationRepository.splFilterBag(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.FILTER_BAG_CONSUMPTION_DETAILS, AppConstantsSplunance.F004, fromdate, todate, filterBag));

			long winderF05 = sanitizationRepository.splWinterF05(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.PROCESS_SETUP_DETAILS_WINDER, AppConstantsSplunance.F005, fromdate, todate, winderF05));

			// F06 - F010

			long splProduction = sanitizationRepository.splProduction(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.DAILY_PRODUCTION_REPORT_SPUNLACE, AppConstantsSplunance.F006, fromdate, todate,
					splProduction));

			long splRejection = sanitizationRepository.splRejection(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.DAILY_REJECTION_REPORT_SPUNLACE, AppConstantsSplunance.F007, fromdate, todate,
					splRejection));

			long splStoppage = sanitizationRepository.splStoppageF08(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.DAILY_STOPPAGE_REPORT_SPUNLACE, AppConstantsSplunance.F008, fromdate, todate,
					splStoppage));

			long splPdf = sanitizationRepository.splMahloF09(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.SPUNLACE_GSM_ANALYSIS_REPORT, AppConstantsSplunance.F009, fromdate, todate, splPdf));

			long spllOgbook = sanitizationRepository.splLogbookF010(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.LOGBOOK_SPUNLACE_PLANNING, AppConstantsSplunance.F010, fromdate, todate, spllOgbook));

			// F011 - F015

			long splProductChange = sanitizationRepository.splProductChangeOver(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.PRODUCT_CHANGE_OVER_CHECK_LIST_SPUNLACE, AppConstantsSplunance.F011, fromdate, todate,
					splProductChange));

			long splReportSample = sanitizationRepository.splRejection(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.SAMPLE_REPORT_SPUNLACE, AppConstantsSplunance.F012, fromdate, todate, splReportSample));

			long splSetupVerification = sanitizationRepository.splSetupVerifyF13(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.PROCESS_SETUP_VERIFICATION_RP_BALE_PRESS, AppConstantsSplunance.F013, fromdate, todate,
					splSetupVerification));

			long splRpProduction = sanitizationRepository.splRpProdF14(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.SHIFT_WISE_RP_PRODUCTION_REPORT, AppConstantsSplunance.F014, fromdate, todate,
					splRpProduction));

			long splStopaggeF15 = sanitizationRepository.splStoppageF015(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.RP_BALE_PRESS_STOPPAGE_REPORT, AppConstantsSplunance.F015, fromdate, todate,
					splStopaggeF15));

			// F016 - F020

			long splSetUpVerifyF016 = sanitizationRepository.splSetupVerifyF16(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.PROCESS_SETUP_VERIFICATION_SLITTER_WINDER, AppConstantsSplunance.F016, fromdate, todate,
					splProductChange));

			long splSetUpVerifyF017 = sanitizationRepository.splSetupVerifyF17(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.SHIFT_WISE_SLITTER_WINDER_PRODUCTION_REPORT, AppConstantsSplunance.F017, fromdate, todate,
					splReportSample));

			long splStopaggeF18 = sanitizationRepository.splStoppageF018(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.SHIFT_WISE_STOPPAGE_REPORT_SLITTER_WINDER, AppConstantsSplunance.F018, fromdate, todate,
					splSetupVerification));

			long splWasteF19 = sanitizationRepository.splWasteF019(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.SHIFT_WISE_COTTON_WASTE_REPORT_SPUNLACE, AppConstantsSplunance.F019, fromdate, todate,
					splRpProduction));

			long splMetalF20 = sanitizationRepository.splMetalF20(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.METAL_DETECTOR_CHECK_LIST, AppConstantsSplunance.F020, fromdate, todate, splMetalF20));

			// F021-F023

			long splMachineClean = sanitizationRepository.splmachineCleanF023(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.MACHINE_CLEANING_RECORD_DAILY, AppConstantsSplunance.F023, fromdate, todate,
					splMachineClean));

			long splMachineSanitation = sanitizationRepository.splMachineSanityF024(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.SANITIZATION_OF_MACHINES_AND_SURFACES, AppConstantsSplunance.F024, fromdate, todate,
					splMachineSanitation));

			long splHandSanitation = sanitizationRepository.splhandSanityF025(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsSplunance.departmentName,
					AppConstantsSplunance.SPUNLACE_HAND_SANITIZATION_REPORT, AppConstantsSplunance.F025, fromdate, todate,
					splHandSanitation));

			/**
			 * PAD PUNCHING
			 */

			// F001- F005

			long punchLogbookF01 = sanitizationRepository.punchLogbookF01(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F001No,
					AppConstantsPadPunching.F001, fromdate, todate, punchLogbookF01));

			long punchRollF02 = sanitizationRepository.punchRollConsumptionF02(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F002No,
					AppConstantsPadPunching.F002, fromdate, todate, punchRollF02));

			long punchProductF03 = sanitizationRepository.punchProdChangeOverF03(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F003No,
					AppConstantsPadPunching.F003, fromdate, todate, punchProductF03));

			long punchDailyProdF04 = sanitizationRepository.punchDailyProdF04(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F004No,
					AppConstantsPadPunching.F004, fromdate, todate, punchDailyProdF04));

			long punchMachineCleanF05 = sanitizationRepository.punchMachineCleanF05(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F005No,
					AppConstantsPadPunching.F005, fromdate, todate, punchMachineCleanF05));

			// F006- F010

			long punchHandSanitationF06 = sanitizationRepository.punchHandSanitationF06(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F006No,
					AppConstantsPadPunching.F006, fromdate, todate, punchHandSanitationF06));

			long punchMetalDetectF07 = sanitizationRepository.punchMetalDetectF07(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F007No,
					AppConstantsPadPunching.F007, fromdate, todate, punchMetalDetectF07));

			long punchMachineSanityF08 = sanitizationRepository.punchMachineSanityF08(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F008No,
					AppConstantsPadPunching.F008, fromdate, todate, punchMachineSanityF08));

			long punchHousekeepingF09 = sanitizationRepository.punchHousekeepingF09(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F009No,
					AppConstantsPadPunching.F009, fromdate, todate, punchHousekeepingF09));

			long punchLogbookF10 = sanitizationRepository.punchLogbookF10(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F012No,
					AppConstantsPadPunching.F012, fromdate, todate, punchLogbookF10));
			
			
			// BAG MAKING
			
			long punchBagMakingF01 = sanitizationRepository.punchBagMakingF01(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F013No,
					AppConstantsPadPunching.F013, fromdate, todate, punchBagMakingF01));
			
			long punchSpecification = sanitizationRepository.punchSpecification(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F014No,
					AppConstantsPadPunching.F014, fromdate, todate, punchSpecification));
			
			
			long houseKeepingBag = sanitizationRepository.houseKeepingBag(fromdate, todate);
			formCountList.add(new FormsRequestDTO(AppConstantsPadPunching.departmentName, AppConstantsPadPunching.F015No,
					AppConstantsPadPunching.F015, fromdate, todate, houseKeepingBag));

			
			/**
			 * DRY GOODS
			 */
			
			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.BALE_CONSUMPTION_REPORT_PRD04_F001, 
			        AppConstantDryGoods.f001, 
			        fromdate, todate, 
			        sanitizationRepository.goodsBaleCons(fromdate, todate)));

			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.DAILY_PRODUCTION_SLIVER_MAKING_PRD04_F002, 
			        AppConstantDryGoods.f002, 
			        fromdate, todate, 
			        sanitizationRepository.goodsSliverMake(fromdate, todate)));

			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.DAILY_PRODUCTION_COTTON_BALLS_PRD04_F003, 
			        AppConstantDryGoods.f003, 
			        fromdate, todate, 
			        sanitizationRepository.goodsCottonballs(fromdate, todate)));

			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.PRODUCTION_REPORT_MINI_ROLL_PRD04_F005, 
			        AppConstantDryGoods.f005, 
			        fromdate, todate, 
			        sanitizationRepository.goodsMiniRoll(fromdate, todate)));

			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.DAILY_PRODUCTION_PLEAT_WOOL_ROLL_PRD04_F006, 
			        AppConstantDryGoods.f006, 
			        fromdate, todate, 
			        sanitizationRepository.goodsPleatWoll(fromdate, todate)));

			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.PRODUCT_CHANGE_OVER_DRY_GOODS_PRD04_F009, 
			        AppConstantDryGoods.f009, 
			        fromdate, todate, 
			        sanitizationRepository.goodsProductChange(fromdate, todate)));

			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.LOG_BOOK_DRY_GOODS_PRD04_F010, 
			        AppConstantDryGoods.f010, 
			        fromdate, todate, 
			        sanitizationRepository.goodsLogbookDetails(fromdate, todate)));

			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.BALL_PLEAT_WOOL_ROLL_FINISHED_GOODS_TRANSFER_RECORD_PRD04_F011, 
			        AppConstantDryGoods.f011, 
			        fromdate, todate, 
			        sanitizationRepository.goodsTransferRecordF011(fromdate, todate)));

			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.SANITIZATION_OF_MACHINES_SURFACES_DRY_GOODS_PRD04_F012, 
			        AppConstantDryGoods.f012, 
			        fromdate, todate, 
			        sanitizationRepository.goodsSanitationDetails(fromdate, todate)));

			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.HAND_SANITIZATION_REPORT_DRY_GOODS_PRD04_F013, 
			        AppConstantDryGoods.f013, 
			        fromdate, todate, 
			        sanitizationRepository.goodsHandSanitationDetails(fromdate, todate)));

			formCountList.add(new FormsRequestDTO(
			        AppConstantDryGoods.departmentName, 
			        AppConstantDryGoods.HOUSE_KEEPING_CLEANING_CHECK_LIST_DRY_GOODS_HRD01_F004, 
			        AppConstantDryGoods.f014, 
			        fromdate, todate, 
			        sanitizationRepository.goodsHouseKeepingDetails(fromdate, todate)));

			
			
			/**
			 * QA
			 */
			
			
				// F001 - F011
			
			formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-001",
	                "Management of Incidence",
	                fromdate, todate,
	                sanitizationRepository.countManagementOfIncidence(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-002",
	                "Request and Issuance of Document",
	                fromdate, todate,
	                sanitizationRepository.countRequestAndIssuanceOfDocument(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-003",
	                "Distribution and Destruction Record",
	                fromdate, todate,
	                sanitizationRepository.countDistributionAndDestructionRecord(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-005",
	                "Training Need Identification",
	                fromdate, todate,
	                sanitizationRepository.countTrainingNeedIdentification(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-006",
	                "Training Calendar",
	                fromdate, todate,
	                sanitizationRepository.countTrainingCalendar(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-008",
	                "Training Card",
	                fromdate, todate,
	                sanitizationRepository.countTrainingCard(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-009",
	                "Training Questionnaire",
	                fromdate, todate,
	                sanitizationRepository.countTrainingQuestionnaire(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-010",
	                "Internal Audit Schedule",
	                fromdate, todate,
	                sanitizationRepository.countInternalAuditSchedule(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-012",
	                "Internal Audit Report",
	                fromdate, todate,
	                sanitizationRepository.countInternalAuditReport(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-013",
	                "Internal Audit NC Report",
	                fromdate, todate,
	                sanitizationRepository.countInternalAuditNCReport(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-015",
	                "Annual Plan",
	                fromdate, todate,
	                sanitizationRepository.countAnnualPlan(fromdate, todate)));
	        
	        
	        	// F012 - F022
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-016",
	                "Agenda for Management Review Meeting",
	                fromdate, todate,
	                sanitizationRepository.countAgendaForManagementReviewMeeting(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-017",
	                "Minutes of MRM",
	                fromdate, todate,
	                sanitizationRepository.countMinutesOfMRM(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-018",
	                "Customer Complaint Register Form",
	                fromdate, todate,
	                sanitizationRepository.countCustomerComplaintRegisterForm(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-020",
	                "Non-Conformity Report (For Machine Process/ WIP/ Finished Products)",
	                fromdate, todate,
	                sanitizationRepository.countNonConformityReport(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-022",
	                "Supplier Audit Plan",
	                fromdate, todate,
	                sanitizationRepository.countSupplierAuditPlan(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-023",
	                "Supplier Audit Report",
	                fromdate, todate,
	                sanitizationRepository.countSupplierAuditReport(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-025",
	                "Summary of Traceability",
	                fromdate, todate,
	                sanitizationRepository.countSummaryOfTraceability(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-026",
	                "Template for Recall",
	                fromdate, todate,
	                sanitizationRepository.countTemplateForRecall(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-027",
	                "MOM MOC Recall TBL",
	                fromdate, todate,
	                sanitizationRepository.countMOMMOCRecallTbl(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-028",
	                "Annual Product Review",
	                fromdate, todate,
	                sanitizationRepository.countAnnualProductReview(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-029",
	                "New Sample Request",
	                fromdate, todate,
	                sanitizationRepository.countNewSampleRequest(fromdate, todate)));
	        
	        
	        // F030 - F045
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-030",
	                "Inward Inspection Report",
	                fromdate, todate,
	                sanitizationRepository.countInwardInspectionReport2(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-031",
	                "Inward Inspection Report",
	                fromdate, todate,
	                sanitizationRepository.countInwardInspectionReport3(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-032",
	                "Inward Inspection Report",
	                fromdate, todate,
	                sanitizationRepository.countInwardInspectionReport4(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-033",
	                "Inward Inspection Report",
	                fromdate, todate,
	                sanitizationRepository.countInwardInspectionReport5(fromdate, todate)));
	        
//	        formCountList.add(new FormsRequestDTO(
//	                "QA",
//	                "PH-QAD01/F-034",
//	                "Inward Inspection Report",
//	                fromdate, todate,
//	                sanitizationRepository.countInwardInspectionReport5(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-029",
	                "Inward Inspection Report",
	                fromdate, todate,
	                sanitizationRepository.countInwardInspectionReport1(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-034",
	                "Online Inspection Report F034",
	                fromdate, todate,
	                sanitizationRepository.countOnlineInspectionReportF034(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-037",
	                "Final Inspection Report",
	                fromdate, todate,
	                sanitizationRepository.countFinalInspectionReportF037(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F039",
	                "Container Inspection Report F039",
	                fromdate, todate,
	                sanitizationRepository.countContainerInspectionReportF039(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-040",
	                "Production Retained Sample Register Parent",
	                fromdate, todate,
	                sanitizationRepository.countProductionRetainedSampleRegisterParent(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-042",
	                "Change Control Log Book Details",
	                fromdate, todate,
	                sanitizationRepository.countChangeControlLogBookDetails(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-041",
	                "Change Control Form",
	                fromdate, todate,
	                sanitizationRepository.countChangeControlForm(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-043",
	                "Quality Review Meetings F043",
	                fromdate, todate,
	                sanitizationRepository.countQualityReviewMeetingsF043(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-044",
	                "Corrective Action Report",
	                fromdate, todate,
	                sanitizationRepository.countCorrectiveActionReport(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-045",
	                "BMR Issue Register F045",
	                fromdate, todate,
	                sanitizationRepository.countBmrIssueRegisterF045(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-046",
	                "Batch Release Note Header",
	                fromdate, todate,
	                sanitizationRepository.countBatchReleaseNoteHeader(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-047",
	                "Batch Release Checklist",
	                fromdate, todate,
	                sanitizationRepository.countBatchReleaseChecklist(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-048",
	                "Deviation Form",
	                fromdate, todate,
	                sanitizationRepository.countDeviationForm(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-049",
	                "Product Disposition Logbook F049",
	                fromdate, todate,
	                sanitizationRepository.countProductDispositionLogbookF049(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-050",
	                "List of GHPWC",
	                fromdate, todate,
	                sanitizationRepository.countListOfGHPWC(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-051",
	                "Control of GHPWC",
	                fromdate, todate,
	                sanitizationRepository.countControlOfGHPWC(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-052",
	                "Breakage Report",
	                fromdate, todate,
	                sanitizationRepository.countBreakageReport(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-058",
	                "Metal Detector Calibration Records",
	                fromdate, todate,
	                sanitizationRepository.countMetalDetectorCalibrationRecords(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-059",
	                "Metal Detector Pass Report",
	                fromdate, todate,
	                sanitizationRepository.countMetalDetectorPassReport(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-060",
	                "Master List of Sharp Tools F060",
	                fromdate, todate,
	                sanitizationRepository.countMasterListOfSharpToolsF060(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-060",
	                "List of Sharp Tools",
	                fromdate, todate,
	                sanitizationRepository.countListOfSharpTools(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-QAD01/F-076",
	                "Training Session Allotment Register",
	                fromdate, todate,
	                sanitizationRepository.countTrainingSessionAllotmentRegister(fromdate, todate)));
			
			
	        
	        	// QA - HR
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-HRD01/F-013",
	                "RODENT_BOX_CHECK_LIST",
	                fromdate, todate,
	                sanitizationRepository.countRodentCheckbox(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-HRD01-F-014",
	                "PEST CONTROL SERVICE REPORT",
	                fromdate, todate,
	                sanitizationRepository.countPestController14(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-HRD01-F-015",
	                "PEST CONTROL SERVICE REPORT",
	                fromdate, todate,
	                sanitizationRepository.countPestController15(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-HRD01-F-016",
	                "PEST CONTROL SERVICE REPORT",
	                fromdate, todate,
	                sanitizationRepository.countPestController16(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-HRD01-F-017",
	                "PEST CONTROL SERVICE REPORT",
	                fromdate, todate,
	                sanitizationRepository.countPestController17(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-HRD01-F-018",
	                "PEST CONTROL SERVICE REPORT",
	                fromdate, todate,
	                sanitizationRepository.countPestController18(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "QA",
	                "PH-HRD01-F-019",
	                "PEST CONTROL SERVICE REPORT",
	                fromdate, todate,
	                sanitizationRepository.countPestController19(fromdate, todate)));
	        
	        
			/**
			 * QC
			 */
			
				// F001 - F007
			
			long absCottonParent = sanitizationRepository.countAbsorbentBleachedCottonParent(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01-AR-F-002",
	                AppConstantsQc.ARF002, fromdate, todate, absCottonParent));

	        long rawCottonAnalysis = sanitizationRepository.countRawCottonAnalysis(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01-AR-F-001",
	                AppConstantsQc.ARF001, fromdate, todate, rawCottonAnalysis));

	        long absCotton = sanitizationRepository.countAbsorbentBleachedCotton(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "CLF005",
	                "ABSORBENT_BLEACHED_COTTON_REPORT_CLF005", fromdate, todate, absCotton));

	        long chemAnalysis = sanitizationRepository.countChemicalAnalysis(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "AR_F003",
	                "CHEMICAL_ANALYSIS_REPORT_AR_F003", fromdate, todate, chemAnalysis));

	        long exfoliatingFabric = sanitizationRepository.countExfoliatingFabricAnalysis(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "FABRIC",
	                "EXFOLIATING_FABRIC_ANALYSIS_REPORT", fromdate, todate, exfoliatingFabric));

	        long finishedProduct = sanitizationRepository.countFinishedProductAnalysis(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "F006",
	                "FINISHED_PRODUCT_ANALYSIS_REPORT_F006", fromdate, todate, finishedProduct));

	        long waterAnalysis = sanitizationRepository.countWaterAnalysis(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "F007",
	                "WATER_ANALYSIS_REPORT_F007", fromdate, todate, waterAnalysis));

	        long fumigation = sanitizationRepository.countFumigationAnalysis(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "ARF011",
	                "FUMIGATION_AND_MICROBIOLOGICAL_ANALYSIS_ARF011", fromdate, todate, fumigation));
			
	        
	        	// F007 - F010
	        
	     // Distilled Water Analysis Report
	        long distilledWaterCount = sanitizationRepository.countDistilledWaterAnalysis(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01-AR-F-012",
	                "Distilled Water Analysis Report", fromdate, todate, distilledWaterCount));

	        // Potable Water Analysis Report
	        long potableWaterCount = sanitizationRepository.countPotableWaterAnalysis(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01-AR-F-013",
	                "Potable Water Analysis Report", fromdate, todate, potableWaterCount));
	        
	     // Briquettes Analysis Report
	        long briquettesCount = sanitizationRepository.countBriquettesAnalysis(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01-AR-014",
	                "Briquettes Analysis Report", fromdate, todate, briquettesCount));
			
	        
	     // Sample Inward Book
	        long sampleInwardF001 = sanitizationRepository.countSampleInwardBookF001(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01-F-001",
	                "Sample Inward Book - F001", fromdate, todate, sampleInwardF001));

	        long sampleInwardF002 = sanitizationRepository.countSampleInwardBookF002(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01-F-002",
	                "Sample Inward Book - F002", fromdate, todate, sampleInwardF002));

	        long sampleInwardF003 = sanitizationRepository.countSampleInwardBookF003(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01-F-003",
	                "Sample Inward Book - F003", fromdate, todate, sampleInwardF003));
	        
	        
	     // Raw Cotton Consolifromdate, todated Analytical Report
	        long rawCottonConsolifromdate = sanitizationRepository.countRawCottonConsolidated(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01/F-004",
	                "RAW COTTON CONSOLIDATED ANALYTICAL REPORT", fromdate, todate, rawCottonConsolifromdate));

	        // Absorbent Bleached Cotton Consolifromdate, todated Analytical Report
	        long absorbentBleachedConsolifromdate = sanitizationRepository.countAbsorbentBleachedCottonConsolidated(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01/F-005",
	                "ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT", fromdate, todate, absorbentBleachedConsolifromdate));

	        // Calibration Reports
	        long phMeterCalibration = sanitizationRepository.countPhMeterCalibration(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01/F-006",
	                "pH-Meter Calibration Report", fromdate, todate, phMeterCalibration));
	        
	        
	        long weighingScaleCalibration = sanitizationRepository.countWeighingScaleCalibration(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01/F-007",
	                "WEIGHING SCALE CALIBRATION REPORT", fromdate, todate, weighingScaleCalibration));

	        long tdsmeterCalibration = sanitizationRepository.countTdsmeterCalibration(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01/F-008",
	                "TDSMETER CALIBRATION REPORT", fromdate, todate, tdsmeterCalibration));

	        long turbidityCalibration = sanitizationRepository.countTurbidityCalibration(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01/F-009",
	                "TURBIDITY CALIBRATION REPORT", fromdate, todate, turbidityCalibration));
	        
	        
	     // WIRA Fiber Fineness Tester Report
	        long wiraFiberTester = sanitizationRepository.countWiraFiberFinenessTester(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(AppConstantsQc.departmentNameA, "PH-QCL01-F-010",
	                "WIRA FIBER FINENESS TESTER REPORT", fromdate, todate, wiraFiberTester));
	        
	        
	     // 1. Spectrophotometr Report
	        long spectrophotometrReport = sanitizationRepository.countSpectrophotometrReport(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsQc.departmentNameA,
	                "PH-QCL01-F-011",
	                "Spectrophotometr Report",
	                fromdate, todate,
	                spectrophotometrReport
	        ));

	        // 2. Standarization of Chemical Report F016
	        long standarizationChemicalReportF016 = sanitizationRepository.countStandarizationChemicalReportF016(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsQc.departmentNameA,
	                "PH-QCL01-F-016",
	                "Standarization of Chemical Report F016",
	                fromdate, todate,
	                standarizationChemicalReportF016
	        ));

	        // 3. Reagent Preparation Record F017
	        long reagentPreparationRecordF017 = sanitizationRepository.countReagentPreparationRecordF017(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsQc.departmentNameA,
	                "PH-QCL01-AR-F-017",
	                "Reagent Preparation Record F017",
	                fromdate, todate,
	                reagentPreparationRecordF017
	        ));

	        // 4. Shelf Life Period Physical Chemical & Microbiological F026
	        long shelfLifePeriodPhycicalChemMicroF026 = sanitizationRepository.countShelfLifePeriodPhycicalChemMicroF026(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsQc.departmentNameA,
	                "PH-QCL01-AR-F-025",
	                "Shelf Life Period Physical Chemical & Microbiological F026",
	                fromdate, todate,
	                shelfLifePeriodPhycicalChemMicroF026
	        ));

	        // 5. Distilled Water Consumption Report
	        long distilledWaterConsumptionReport = sanitizationRepository.countDistilledWaterConsumptionReport(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsQc.departmentNameA,
	                "PH-QCL01-AR-F-027",
	                "Distilled Water Consumption Report",
	                fromdate, todate,
	                distilledWaterConsumptionReport
	        ));

	        // 6. Glasswares Breakage & Disposal Register F028
	        long glasswaresBreakageDisposalRegisterF028 = sanitizationRepository.countGlasswaresBreakageDisposalRegisterF028(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsQc.departmentNameA,
	                "PH-QCL01/F-028",
	                "Glasswares Breakage & Disposal Register F028",
	                fromdate, todate,
	                glasswaresBreakageDisposalRegisterF028
	        ));
	        
	        
	        
	        // MISSED TABLE
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-018",
	                "TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB",
	                fromdate, todate,
	                sanitizationRepository.countTemperatureCalibration(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-019",
	                "MEDIA PREPARATION & CONSUMPTION RECORD",
	                fromdate, todate,
	                sanitizationRepository.countMediaPreparationRecord(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-020",
	                "MICROBIOLOGICAL ANALYSIS REPORT MISCELLANEOUS",
	                fromdate, todate,
	                sanitizationRepository.countMicrobiologicalAnalysis(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-021",
	                "MEDIA GROWTH PROMOTION TEST REPORT",
	                fromdate, todate,
	                sanitizationRepository.countMediaGrowthDetails(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-022",
	                "MEDIA DISPOSAL RECORD",
	                fromdate, todate,
	                sanitizationRepository.countMediaDisposalRecord(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-023",
	                "CLEANING OF AUTOCLAVES",
	                fromdate, todate,
	                sanitizationRepository.countCleaningOfAutoclaves(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	        		"Quality Control",
	        		"PH-QCL01/F-012",
	        		"BACTERIAL INCUBATOR TEMPERATURE CALIBRAT REPORT",
	        		fromdate, todate,
	        		sanitizationRepository.countBacterialTempReport(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01/F-013",
	                "FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
	                fromdate, todate,
	                sanitizationRepository.countFungalTempReport(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01/F-014",
	                "Validation For AutoClave By Chemical Indicator",
	                fromdate, todate,
	                sanitizationRepository.countChemicalIndicatorTempReport(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01/F-015",
	                "Validation For AutoClave By Biological Indicator",
	                fromdate, todate,
	                sanitizationRepository.countBiologicalIndicatorTempReport(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01/F-022",
	                "Media Disposal Record",
	                fromdate, todate,
	                sanitizationRepository.countDisposalReport(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01/F-030",
	                "DIGITAL COLONY COUNTER CALIBRATION REPORT",
	                fromdate, todate,
	                sanitizationRepository.countDigitalColonyCounterTempReport(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-026 COA",
	                "COA FOR AB COTTON",
	                fromdate, todate,
	                sanitizationRepository.countCOAForCottonAB(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-026A CO",
	                "COA FOR COTTON PADS",
	                fromdate, todate,
	                sanitizationRepository.countCOAForCottonF26A(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-026B CO",
	                "COA FOR COTTON BALLS",
	                fromdate, todate,
	                sanitizationRepository.countCOAForCottonF26B(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-026C CO",
	                "COA FOR COTTON WOOL ROLL",
	                fromdate, todate,
	                sanitizationRepository.countCOAForCottonF26C(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-026D CO",
	                "COA FOR COTTON WOOL PLEAT",
	                fromdate, todate,
	                sanitizationRepository.countCOAForCottonF26D(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-026E CO",
	                "COA FOR COTTON ROLL GOODS",
	                fromdate, todate,
	                sanitizationRepository.countCOAForCottonF26E(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-026F CO",
	                "COA FOR INFUSED COTTON PADS",
	                fromdate, todate,
	                sanitizationRepository.countCOAForCottonF26F(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-026G CO",
	                "COA FOR MOISURE CONTENT (%)",
	                fromdate, todate,
	                sanitizationRepository.countCOAForCottonF26G(fromdate, todate)));
	        
			
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-029",
	                "REQUISITION SAMPLE REPORT",
	                fromdate, todate,
	                sanitizationRepository.countReqSampleReport(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01-AR-F-008",
	                "FLOOR  SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
	                fromdate, todate,
	                sanitizationRepository.countswabMicrobilogy(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01-AR-F-009",
	                "HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
	                fromdate, todate,
	                sanitizationRepository.countswabMicrobilogyDetails(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01-AR-F-010",
	                "MACHINE  SWAB - MICROBIOLOGICAL ANALYSIS  REPORT",
	                fromdate, todate,
	                sanitizationRepository.countswabMicrobilogyMachine(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01F-010",
	                " WIRA Fiber Fineness Tester Calibration REPORT",
	                fromdate, todate,
	                sanitizationRepository.countWiraFiberReport(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01-AR-F-010",
	                "MACHINE  SWAB - MICROBIOLOGICAL ANALYSIS  REPORT",
	                fromdate, todate,
	                sanitizationRepository.countswabMicrobilogyMachine(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01-AR-F-005",
	                "NON-WOVEN FLEECE ANALYSIS REPORT",
	                fromdate, todate,
	                sanitizationRepository.countWovenReport(fromdate, todate)));
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Quality Control",
	                "PH-QCL01-AR-F-004",
	                "EXFOLIATING FABRIC ANALYSIS REPORT",
	                fromdate, todate,
	                sanitizationRepository.countFabricReport(fromdate, todate)));
	        
	        
	        /**
	         * STORE
	         */
	        
	        long receptionChecklistCount = sanitizationRepository.receptionChecklist(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantStore.departmentName, 
	                "PH-STR01F-003", 
	                "Reception CheckList", 
	                fromdate, todate, 
	                receptionChecklistCount));

	        long nonReturnableGatePassCount = sanitizationRepository.nonReturnableGatePass(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantStore.departmentName, 
	                "PH-STR01F-006", 
	                "Non Returnable Gate Pass", 
	                fromdate, todate, 
	                nonReturnableGatePassCount));
	        
	        
	        long forkliftMovementChecklistCount = sanitizationRepository.forkliftMovementChecklist(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantStore.departmentName, 
	                "PH-STR01F-008", 
	                "Fork Lift Movement CheckList", 
	                fromdate, todate, 
	                forkliftMovementChecklistCount));

	        long eyeWashChecklistCount = sanitizationRepository.eyeWashChecklist(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantStore.departmentName, 
	                "PH-STR01F-009", 
	                "Eye Wash with Shower Working Condition CheckList", 
	                fromdate, todate, 
	                eyeWashChecklistCount));
	        
	        
	        /**
	         * COTTON BUDS
	         */
	        
	        long equipmentUsageCount = sanitizationRepository.equipmentUsageLogbook(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsBuds.department, 
	                "PH-PRD06/F-001", 
	                "Equipment Usage Logbook", 
	                fromdate, todate, 
	                equipmentUsageCount));
	        
	        long logBookCount = sanitizationRepository.logBook(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsBuds.department, 
	                "PH-PRD06/F-002", 
	                "Log Book", 
	                fromdate, todate, 
	                logBookCount));

	        long dailyProductionCount = sanitizationRepository.dailyProductionSliverMaking(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsBuds.department, 
	                "PH-PRD06/F-003", 
	                "Daily Production - Sliver Making for Cotton Buds", 
	                fromdate, todate, 
	                dailyProductionCount));
	        
	        long productChangeOverCount = sanitizationRepository.productChangeOver(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsBuds.department, 
	                "PH-PRD04/F-004", 
	                "Product Change Over - Cotton Buds", 
	                fromdate, todate, 
	                productChangeOverCount));

	        long finalInspectionCount = sanitizationRepository.finalInspectionReport(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantsBuds.department, 
	                "PH-QAD01-F-037", 
	                "Final Inspection Report", 
	                fromdate, todate, 
	                finalInspectionCount));
	        
	        
	        
	        /**
	         * PPC
	         */
	        
	        long contractReviewMeetingCount = sanitizationRepository.contractReviewMeetingCount(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantPpc.departmentName, 
	                "PH-PPC01/F-003", 
	                "Contract Review Meeting", 
	                fromdate, todate, 
	                contractReviewMeetingCount));

	        long monthlyPlanSummaryCount = sanitizationRepository.monthlyPlanSummaryCount(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantPpc.departmentName, 
	                "PH-PPC01/F-002", 
	                "Monthly Plan Summary", 
	                fromdate, todate, 
	                monthlyPlanSummaryCount));
	        
	        long preProductionsCount = sanitizationRepository.preProductionsCount(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                AppConstantPpc.departmentName, 
	                "PH-PPC01-/F-004", 
	                "Pre-Productions", 
	                fromdate, todate, 
	                preProductionsCount));
	        
	        
	        /**
	         * DISPATCH
	         */
	        
	        long dispatchCount = sanitizationRepository.dispatchCount(fromdate, todate);
	        formCountList.add(new FormsRequestDTO(
	                "DISPATCH", 
	                "PH-DIS01/F-001", 
	                "FINISHED GOODS STOCK REGISTER", 
	                fromdate, todate, 
	                dispatchCount));
	        
	        
	        /**
	         * ENGINEERING
	         */
	        
	        
	        formCountList.add(new FormsRequestDTO(
	                "Engineering",
	                "PH-ENG01/FC-003",
	                "Breakdown Intimation Slip",
	                fromdate, todate,
	                sanitizationRepository.countBreakdownIntimationSlip(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "Engineering",
	                "PH-ENG01/FC-004",
	                "Root Cause Analysis",
	                fromdate, todate,
	                sanitizationRepository.countRootCauseAnalysis(fromdate, todate)));
	        
	        formCountList.add(new FormsRequestDTO(
	                "Engineering",
	                "PH-ENG01/FC-020",
	                "Work Order Request Form",
	                fromdate, todate,
	                sanitizationRepository.countWorkOrderRequestForm(fromdate, todate)));

	        formCountList.add(new FormsRequestDTO(
	                "Engineering",
	                "PH-ENG01/FC-016",
	                "Weighing Scales Calibration Record",
	                fromdate, todate,
	                sanitizationRepository.countWeighingScalesCalibrationRecord(fromdate, todate)));
	        
	        
	        
			try {
				ResponseEntity<?> excelReport = documentService.generateExcel(formCountList);
				return excelReport;
			} catch (Exception e) {
				return new ResponseEntity(new ApiResponse(false, "Failed to generate Excel Report"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();

			logger.error("***!!! Unable to get submitted reports !!!***" + msg);

			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);

		}

	}

}
