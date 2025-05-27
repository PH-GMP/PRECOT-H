package com.focusr.Precot.mssql.database.service.splunance;

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

import com.focusr.Precot.mssql.database.model.splunance.audit.DailyProductionReportHistoryF006;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyRejectionReportHistoryF007;
import com.focusr.Precot.mssql.database.model.splunance.audit.DailyStoppageReportSpunlaceHistoryF008;
import com.focusr.Precot.mssql.database.model.splunance.audit.FilterBagConsumptionDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.splunance.audit.LogbookSpunlacePlanningHistoryF010;
import com.focusr.Precot.mssql.database.model.splunance.audit.MachineCleaningRecordHistoryF023;
import com.focusr.Precot.mssql.database.model.splunance.audit.MetalDetectorCheckListHistoryF020;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupDetailsJetlaceAndDryerHistoryF003;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupDetailsWinterHistoryF005;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationOpeningLineHistoryF002;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationRpBalePressHistoryF013;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProcessSetupVerificationSliterWinderHistoryF016;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProductChangeOverCheckListSpunlaceHistoryF011;
import com.focusr.Precot.mssql.database.model.splunance.audit.SanitizationOfMachineAndSurfacesHistoryF024;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseSliterWinderProdReportHistoryF017;
import com.focusr.Precot.mssql.database.model.splunance.audit.ShiftWiseWasteReportSpunlaceHistoryF019;
import com.focusr.Precot.mssql.database.model.splunance.audit.SplunanceBaleConsumptionHistoryF01;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceGsmAnalysisReportHistoryF009;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceHandSanitizationReportHistoryF025;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceRPBalePressStoppageHistoryF015;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceSampleReportHistoryF012;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceShiftWiseRPProdSupportHistoryF14;
import com.focusr.Precot.mssql.database.model.splunance.audit.SpunlaceShiftWiseStoppageReportHistoryF018;
import com.focusr.Precot.mssql.database.repository.splunance.audit.DailyProductionReportHistoryF006Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.DailyRejectionReportF007RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.splunance.audit.DailyStoppageReportSpunlaceHistoryF008Repository;
import com.focusr.Precot.mssql.database.repository.splunance.audit.FilterBagConsumptionDetailsF004RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.splunance.audit.LogbookSpunlacePlanningHistoryF010Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.MachineCleaningRecordHistoryF023Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.MetalDetectorCheckListHistoryF020Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProcessSetupDetailsJetlaceAndDryerHistoryRepositoryF003;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProcessSetupDetailsWinterHistoryF005Repository;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProcessSetupVerificationOpeningLineHistoryF002Repository;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProcessSetupVerificationRpBalePressHistoryF013Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProcessSetupVerificationSliterWinderHistoryF016Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ProductChangeOverCheckListSpunlaceHistoryF011Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SanitizationOfMachineAndSurfacesHistoryF024Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ShiftWiseSliterWinderProdReportHistoryF017Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.ShiftWiseWasteReportSpunlaceHistoryF019Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SplunanceBaleConsumptionHistoryF01Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceGsmAnalysisReportHistoryF009Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceHandSanitizationReportHistoryF025Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceRPBalePressStoppageHistoryF015Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceSampleReportHistoryF012Repository;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceShiftWiseRPProdSupportHistoryF14Repo;
import com.focusr.Precot.mssql.database.repository.splunance.audit.SpunlaceShiftWiseStoppageReportHistoryF018Repo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.spulance.SpunlaceAuditRequest;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;
import com.focusr.Precot.util.splunance.SpunlaceExcelUtill;

@Service
public class SpunlanceAuditService {

	Logger logger = LoggerFactory.getLogger(SpunlanceAuditService.class);

	SCAUtil sca = new SCAUtil();



	@Autowired
	private SplunanceBaleConsumptionHistoryF01Repo splunancebaleconsumptionhistoryf01repo;

	@Autowired
	private ProcessSetupVerificationOpeningLineHistoryF002Repository processsetupverificationopeninglinehistoryf002repository;

	@Autowired
	private ProcessSetupDetailsJetlaceAndDryerHistoryRepositoryF003 processsetupdetailsjetlaceanddryerhistoryrepositoryf003;

	@Autowired
	private FilterBagConsumptionDetailsF004RepositoryHistory filterbagconsumptiondetailsf004repositoryhistory;

	@Autowired
	private ProcessSetupDetailsWinterHistoryF005Repository processsetupdetailswinterhistoryf005repository;

	@Autowired
	private DailyProductionReportHistoryF006Repo dailyproductionreporthistoryf006repo;

	@Autowired
	private DailyRejectionReportF007RepositoryHistory dailyrejectionreportf007repositoryhistory;

	@Autowired
	private DailyStoppageReportSpunlaceHistoryF008Repository dailystoppagereportspunlacehistoryf008repository;

	@Autowired
	private SpunlaceGsmAnalysisReportHistoryF009Repo spunlacegsmanalysisreporthistoryf009repo;

	@Autowired
	private LogbookSpunlacePlanningHistoryF010Repo logbookspunlaceplanninghistoryf010repo;

	// kAVIYA

	@Autowired
	ProductChangeOverCheckListSpunlaceHistoryF011Repo productchangeoverchecklistspunlacehistoryf011repo;

	@Autowired
	ProcessSetupVerificationRpBalePressHistoryF013Repo processsetupverificationrpbalepresshistoryf013repo;
	
	@Autowired
	SpunlaceShiftWiseRPProdSupportHistoryF14Repo spunlaceshiftwiserpprodsupporthistoryf14repo;
	
	@Autowired
	SpunlaceRPBalePressStoppageHistoryF015Repo spunlacerpbalepressstoppagehistoryf015repo;
	
	@Autowired
	ProcessSetupVerificationSliterWinderHistoryF016Repo processsetupverificationsliterwinderhistoryf016repo;
	
	@Autowired
	ShiftWiseSliterWinderProdReportHistoryF017Repo shiftwisesliterwinderprodreporthistoryf017repo;

	@Autowired
	SpunlaceSampleReportHistoryF012Repository spunlacesamplereporthistoryf012repository;
	
	@Autowired
	SpunlaceShiftWiseStoppageReportHistoryF018Repo spunlaceshiftwisestoppagereporthistoryf018repo;
	
	// Gayathri

	@Autowired
	MachineCleaningRecordHistoryF023Repo machineCleaningRecordHistoryF023Repo;

	@Autowired
	SpunlaceHandSanitizationReportHistoryF025Repo spunlaceHandSanitizationReportHistoryF025Repo;

	@Autowired
	MetalDetectorCheckListHistoryF020Repo metalDetectorCheckListHistoryF020Repo;
	
	@Autowired
	SanitizationOfMachineAndSurfacesHistoryF024Repo sanitizationOfMachineAndSurfacesHistoryF024Repo;
	
	@Autowired
	ShiftWiseWasteReportSpunlaceHistoryF019Repo shiftWiseWasteReportSpunlaceHistoryF019Repo;

	public ResponseEntity<?> getAuditSummary(SpunlaceAuditRequest summeryrequest) {
		List<SplunanceBaleConsumptionHistoryF01> summaryF01;
		List<ProcessSetupVerificationOpeningLineHistoryF002> summaryF02;
		List<ProcessSetupDetailsJetlaceAndDryerHistoryF003> summaryF03;
		List<FilterBagConsumptionDetailsHistoryF004> summaryF04;
		List<ProcessSetupDetailsWinterHistoryF005> summaryF05;
		List<DailyProductionReportHistoryF006> summaryF06;
		List<DailyRejectionReportHistoryF007> summaryF07;
		List<DailyStoppageReportSpunlaceHistoryF008> summaryF08;
		List<SpunlaceGsmAnalysisReportHistoryF009> summaryF09;
		List<LogbookSpunlacePlanningHistoryF010> summaryF10;
		//KAVIYA
		List<ProductChangeOverCheckListSpunlaceHistoryF011> summaryF011;
		List<ProcessSetupVerificationRpBalePressHistoryF013> summaryF013;
        List<SpunlaceShiftWiseRPProdSupportHistoryF14> summaryF014;
        List<SpunlaceRPBalePressStoppageHistoryF015> summaryF015;
        List<ProcessSetupVerificationSliterWinderHistoryF016> summaryF016;
        List<ShiftWiseSliterWinderProdReportHistoryF017> summaryF017;
        List<SpunlaceSampleReportHistoryF012> summaryF012;
        List<SpunlaceShiftWiseStoppageReportHistoryF018> summaryF018;
		
		// GAYATHRI
		List<MachineCleaningRecordHistoryF023> summaryF023;
		List<SpunlaceHandSanitizationReportHistoryF025> summaryF025;
		List<MetalDetectorCheckListHistoryF020> summaryF020;
		List<SanitizationOfMachineAndSurfacesHistoryF024> summaryF024;
		List<ShiftWiseWasteReportSpunlaceHistoryF019> summaryF019;

		try {
			String department = summeryrequest.getDepartment();
			String formName = summeryrequest.getFrom_name();

			if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F001.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF01_shift().isEmpty() ? null : summeryrequest.getF01_shift();
				String orderNo = summeryrequest.getF01_order_no().isEmpty() ? null : summeryrequest.getF01_order_no();

				summaryF01 = splunancebaleconsumptionhistoryf01repo.findByParams01(fromDate, toDate, shift, orderNo);

				if (!summaryF01.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF01Excel(summaryF01);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Bale_Consumption_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// 02
			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F002.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF02_shift().isEmpty() ? null : summeryrequest.getF02_shift();
				String orderNo = summeryrequest.getF02_order_no().isEmpty() ? null : summeryrequest.getF02_order_no();

				summaryF02 = processsetupverificationopeninglinehistoryf002repository.findByParams02(fromDate, toDate,
						shift, orderNo);

				if (!summaryF02.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF02Excel(summaryF02);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Process_Setup_Verification_Opening_Line.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// 03

			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F003.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF03_shift().isEmpty() ? null : summeryrequest.getF03_shift();
				String orderNo = summeryrequest.getF03_order_no().isEmpty() ? null : summeryrequest.getF03_order_no();

				summaryF03 = processsetupdetailsjetlaceanddryerhistoryrepositoryf003.findByParams03(fromDate, toDate,
						shift, orderNo);

				if (!summaryF03.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF03Excel(summaryF03);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Process_Setup_Details_Jetlace&Dryer.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// 04

			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F004.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF04_shift().isEmpty() ? null : summeryrequest.getF04_shift();

				summaryF04 = filterbagconsumptiondetailsf004repositoryhistory.findByParams04(fromDate, toDate, shift);

				if (!summaryF04.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF04Excel(summaryF04);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Filter_Bag_Consumption_Details.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// 05

			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F005.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF05_shift().isEmpty() ? null : summeryrequest.getF05_shift();
				String orderNo = summeryrequest.getF05_order_no().isEmpty() ? null : summeryrequest.getF05_order_no();

				System.out.println("BEJPOY" + summeryrequest);

				summaryF05 = processsetupdetailswinterhistoryf005repository.findByParams05(fromDate, toDate, shift,
						orderNo);

				if (!summaryF05.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF05Excel(summaryF05);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Process_Setup_Details_Winder.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// 06

			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F006.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF06_shift().isEmpty() ? null : summeryrequest.getF06_shift();
				String orderNo = summeryrequest.getF06_order_no().isEmpty() ? null : summeryrequest.getF06_order_no();

				summaryF06 = dailyproductionreporthistoryf006repo.findByParams06(fromDate, toDate, shift, orderNo);

				if (!summaryF06.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF06Excel(summaryF06);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Daily_Production_Report_Spunlace.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}

			}

			// 07

			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F007.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF07_shift().isEmpty() ? null : summeryrequest.getF07_shift();
				String orderNo = summeryrequest.getF07_order_no().isEmpty() ? null : summeryrequest.getF07_order_no();

				summaryF07 = dailyrejectionreportf007repositoryhistory.findByParams07(fromDate, toDate, shift, orderNo);

				if (!summaryF07.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF07Excel(summaryF07);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Daily_Rejection_Report_Spunlace.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// 08

			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F008.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();

				summaryF08 = dailystoppagereportspunlacehistoryf008repository.findByParams08(fromDate, toDate);

				if (!summaryF08.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF08Excel(summaryF08);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Daily_Stoppage_Report_Spunlace.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F09

			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F009.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF09_shift().isEmpty() ? null : summeryrequest.getF09_shift();
				String orderNo = summeryrequest.getF09_order_no().isEmpty() ? null : summeryrequest.getF09_order_no();

				summaryF09 = spunlacegsmanalysisreporthistoryf009repo.findByParams09(fromDate, toDate, shift, orderNo);

				if (!summaryF09.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF09Excel(summaryF09);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Spunlace_GSM_Analysis_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F10

			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F010.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();

				summaryF10 = logbookspunlaceplanninghistoryf010repo.findByParams10(fromDate, toDate);

				if (!summaryF10.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF10Excel(summaryF10);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Logbook_Spunlace_Planning.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// KAVIYA(F11)

			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F011.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF011_shift().isEmpty() ? null : summeryrequest.getF011_shift();
				String orderNo = summeryrequest.getF011_order_no().isEmpty() ? null : summeryrequest.getF011_order_no();

				logger.info(
						"Fetching F011 summary with parameters - From Date: {}, To Date: {}, Shift: {}, Order No: {}",
						fromDate, toDate, shift, orderNo);

				summaryF011 = productchangeoverchecklistspunlacehistoryf011repo.findByParams11(fromDate, toDate, shift,
						orderNo);

				logger.info("F011 summary size: {}", summaryF011.size());

				if (!summaryF011.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF011Excel(summaryF011);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=SPUNLACE_DAILY_STOPPAGE_DETAILS.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					logger.warn("No data found for the provided parameters.");
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
 //F013
			
			else if (AppConstantsSplunance.departmentName.equals(department)
			        && AppConstantsSplunance.F013.equalsIgnoreCase(formName)) {

			    String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
			    String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
			    String shift = summeryrequest.getF013_shift().isEmpty() ? null : summeryrequest.getF013_shift();
			    String orderNo = summeryrequest.getF013_order_no().isEmpty() ? null : summeryrequest.getF013_order_no();

			    logger.info("Fetching F013 summary with parameters - From Date: {}, To Date: {}, Shift: {}, Order No: {}", 
			                 fromDate, toDate, shift, orderNo);

			    summaryF013 = processsetupverificationrpbalepresshistoryf013repo.findByParams13(fromDate, toDate, shift, orderNo);

			    logger.info("F013 summary size: {}", summaryF013.size());

			    if (!summaryF013.isEmpty()) {
			        ByteArrayResource resource = SpunlaceExcelUtill.generateF013Excel(summaryF013);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=SPUNLACE_PROCESS_SETUP_VERIFICATION_RP_BALEPRESS.xlsx")
			                .contentType(MediaType.parseMediaType(
			                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        logger.warn("No data found for the provided parameters.");
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
             //F014
			
			else if (AppConstantsSplunance.departmentName.equals(department)
			        && AppConstantsSplunance.F014.equalsIgnoreCase(formName)) {

			    String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
			    String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
			    String shift = summeryrequest.getF014_shift().isEmpty() ? null : summeryrequest.getF014_shift();
			    String orderNo = summeryrequest.getF014_order_no().isEmpty() ? null : summeryrequest.getF014_order_no();

			    logger.info("Fetching F013 summary with parameters - From Date: {}, To Date: {}, Shift: {}, Order No: {}", 
			                 fromDate, toDate, shift, orderNo);

			    summaryF014 = spunlaceshiftwiserpprodsupporthistoryf14repo.findByParams14(fromDate, toDate, shift, orderNo);

			    logger.info("F014 summary size: {}", summaryF014.size());

			    if (!summaryF014.isEmpty()) {
			        ByteArrayResource resource = SpunlaceExcelUtill.generateF14Excel(summaryF014);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=SPUNLACE_SHIFTWISE_RP_PRODUCTION.xlsx")
			                .contentType(MediaType.parseMediaType(
			                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        logger.warn("No data found for the provided parameters.");
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
           //F015
			
			else if (AppConstantsSplunance.departmentName.equals(department)
			        && AppConstantsSplunance.F015.equalsIgnoreCase(formName)) {

			    String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
			    String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
			  
			    logger.info("Fetching F015 summary with parameters - From Date: {}, To Date: {}, Shift: {}, Order No: {}", 
			                 fromDate, toDate);

			    summaryF015 = spunlacerpbalepressstoppagehistoryf015repo.findByParams15(fromDate, toDate);

			    logger.info("F015 summary size: {}", summaryF015.size());

			    if (!summaryF015.isEmpty()) {
			        ByteArrayResource resource = SpunlaceExcelUtill.generateF15Excel(summaryF015);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=SPUNLACE_RP_BALE_PRESS_STOPPAGE_REPORT.xlsx")
			                .contentType(MediaType.parseMediaType(
			                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        logger.warn("No data found for the provided parameters.");
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
              //F016
			
			else if (AppConstantsSplunance.departmentName.equals(department)
			        && AppConstantsSplunance.F016.equalsIgnoreCase(formName)) {

			    String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
			    String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
			    String shift = summeryrequest.getF016_shift().isEmpty() ? null : summeryrequest.getF016_shift();
			    String orderNo = summeryrequest.getF016_order_no().isEmpty() ? null : summeryrequest.getF016_order_no();

			    logger.info("Fetching F016 summary with parameters - From Date: {}, To Date: {}, Shift: {}, Order No: {}", 
			                 fromDate, toDate);

			    summaryF016 = processsetupverificationsliterwinderhistoryf016repo.findByParams16(fromDate, toDate, shift, orderNo);

			    logger.info("F016 summary size: {}", summaryF016.size());

			    if (!summaryF016.isEmpty()) {
			        ByteArrayResource resource = SpunlaceExcelUtill.generateF016Excel(summaryF016);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=PROCESS_SETUP_VERIFICATION_SLITER_WINDER.xlsx")
			                .contentType(MediaType.parseMediaType(
			                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        logger.warn("No data found for the provided parameters.");
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
			
			//F017

			else if (AppConstantsSplunance.departmentName.equals(department)
			        && AppConstantsSplunance.F017.equalsIgnoreCase(formName)) {

			    String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
			    String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
			    String shift = summeryrequest.getF017_shift().isEmpty() ? null : summeryrequest.getF017_shift();
			    String orderNo = summeryrequest.getF017_order_no().isEmpty() ? null : summeryrequest.getF017_order_no();

			    logger.info("Fetching F017 summary with parameters - From Date: {}, To Date: {}, Shift: {}, Order No: {}", 
			                 fromDate, toDate);

			    summaryF017 = shiftwisesliterwinderprodreporthistoryf017repo.findByParams17(fromDate, toDate, shift, orderNo);

			    logger.info("F017 summary size: {}", summaryF017.size());

			    if (!summaryF017.isEmpty()) {
			        ByteArrayResource resource = SpunlaceExcelUtill.generateF017Excel(summaryF017);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=SPUNLACE_SHIFT_WISE_SLITER_WINDER_PRODUCTION_REPORT.xlsx")
			                .contentType(MediaType.parseMediaType(
			                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        logger.warn("No data found for the provided parameters.");
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
			//F012

			else if (AppConstantsSplunance.departmentName.equals(department)
			        && AppConstantsSplunance.F012.equalsIgnoreCase(formName)) {

			    String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
			    String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
			    String shift = summeryrequest.getF012_shift().isEmpty() ? null : summeryrequest.getF012_shift();
			    String orderNo = summeryrequest.getF012_order_no().isEmpty() ? null : summeryrequest.getF012_order_no();

			    logger.info("Fetching F012 summary with parameters - From Date: {}, To Date: {}, Shift: {}, Order No: {}", 
			                 fromDate, toDate);

			    summaryF012 = spunlacesamplereporthistoryf012repository.findByParams12(fromDate, toDate, shift, orderNo);

			    logger.info("F012 summary size: {}", summaryF012.size());

			    if (!summaryF012.isEmpty()) {
			        ByteArrayResource resource = SpunlaceExcelUtill.generateF012Excel(summaryF012);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=SPUNLACE_SAMPLE_REPORT.xlsx")
			                .contentType(MediaType.parseMediaType(
			                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        logger.warn("No data found for the provided parameters.");
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}
			//F018

			else if (AppConstantsSplunance.departmentName.equals(department)
			        && AppConstantsSplunance.F018.equalsIgnoreCase(formName)) {

			    String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
			    String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
			   
			    logger.info("Fetching F018 summary with parameters - From Date: {}, To Date: {}, Shift: {}, Order No: {}", 
			                 fromDate, toDate);

			    summaryF018 = spunlaceshiftwisestoppagereporthistoryf018repo.findByParams18(fromDate, toDate);

			    logger.info("F018 summary size: {}", summaryF018.size());

			    if (!summaryF018.isEmpty()) {
			        ByteArrayResource resource = SpunlaceExcelUtill.generateF018Excel(summaryF018);
			        return ResponseEntity.ok()
			                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=SHIFT_WISE_STOPPAGE_REPORT_OF_SLITER_WINDER.xlsx")
			                .contentType(MediaType.parseMediaType(
			                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			                .body(resource);
			    } else {
			        logger.warn("No data found for the provided parameters.");
			        return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
			    }
			}


			// GAYATHRI(23-25-20 -24-19)

			// F23
			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F023.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String month = summeryrequest.getF023_month().isEmpty() ? null : summeryrequest.getF023_month();
				String year = summeryrequest.getF023_year().isEmpty() ? null : summeryrequest.getF023_year();

				summaryF023 = machineCleaningRecordHistoryF023Repo.findByParams023(fromDate, toDate, month, year);

				if (!summaryF023.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF023Excel(summaryF023);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=MACHINE_CLEANING_RECORD.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F25
			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F025.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF025_shift().isEmpty() ? null : summeryrequest.getF025_shift();

				summaryF025 = spunlaceHandSanitizationReportHistoryF025Repo.findByParams025(fromDate, toDate, shift);

				if (!summaryF025.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF025Excel(summaryF025);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment;filename=SPUNLACE_HAND_SANITIZATION_REPORT.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			// F20
			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F020.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String month = summeryrequest.getF020_month().isEmpty() ? null : summeryrequest.getF020_month();
				String year = summeryrequest.getF020_year().isEmpty() ? null : summeryrequest.getF020_year();

				summaryF020 = metalDetectorCheckListHistoryF020Repo.findByParams020(fromDate, toDate, month, year);

				if (!summaryF020.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF020Excel(summaryF020);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment;filename=METAL_DETECTOR_CHECK_LIST.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			//24
			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F024.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String month = summeryrequest.getF024_month().isEmpty() ? null : summeryrequest.getF024_month();
				String year = summeryrequest.getF024_year().isEmpty() ? null : summeryrequest.getF024_year();
				String week = summeryrequest.getF024_week().isEmpty() ? null : summeryrequest.getF024_week();

				summaryF024 = sanitizationOfMachineAndSurfacesHistoryF024Repo.findByParams024(fromDate, toDate,
						month, year,week);

				if (!summaryF024.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF024Excel(summaryF024);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment;filename=SANITIZATION_OF_MACHINES_AND_SURFACES.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			//19
			else if (AppConstantsSplunance.departmentName.equals(department)
					&& AppConstantsSplunance.F019.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF019_shift().isEmpty() ? null : summeryrequest.getF019_shift();

				summaryF019 = shiftWiseWasteReportSpunlaceHistoryF019Repo.findByParams019(fromDate, toDate,
						shift);

				if (!summaryF019.isEmpty()) {
					ByteArrayResource resource = SpunlaceExcelUtill.generateF019Excel(summaryF019);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment;filename=SHIFT_WISE_COTTON_WASTE_REPORT_OF_SPUNLCAE.xlsx")
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