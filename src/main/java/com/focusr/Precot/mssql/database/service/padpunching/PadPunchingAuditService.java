package com.focusr.Precot.mssql.database.service.padpunching;

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

import com.focusr.Precot.mssql.database.model.padpunching.audit.BagMakingSpecificationDetailsHistoryF014;
import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyProdPackingDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyRollConsumptionReportHistoryF002;
import com.focusr.Precot.mssql.database.model.padpunching.audit.MachineCleaningCheckListHistoryF005;
import com.focusr.Precot.mssql.database.model.padpunching.audit.MetalDetectorCheckList007History;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingBagMakingDailyProductionDetailsHistoryF001;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingHouseCleaningCheckListF010History;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingHouseKeepingCleaningCheckListF26History;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingLogBookBagMakingHistoryF003;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailLogBookHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailsLogBookHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingHandSanitationHistoryF24;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingProductChangeOverHistoryF03;
import com.focusr.Precot.mssql.database.model.splunance.audit.SplunanceBaleConsumptionHistoryF01;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.BagMakingSpecificationDetailsHistoryF014Repository;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.DailyProdPackingDetailsHistoryRepositoryF004;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.DailyRollConsumptionReportHistoryRepositoryF002;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.MachineCleaningCheckListHistoryRepositoryF005;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.MetalDetectorCheckList007HistoryRepo;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PadPunchingBagMakingDailyProductionDetailsHistoryRepositoryF001;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PadPunchingHouseKeepingCheckListF010RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PadPunchingHouseKeepingCheckListF26RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PadPunchingLogBookBagMakingRepositoryHistoryF003;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PadPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.ProductionDetailLogBookHistoryRepository01;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.ProductionDetailsLogBook01HistoryRepo;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PunchingHandSanitationHistoryRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.audit.PunchingProductChangeOverRepositoryHistoryF03;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.padpunching.PadPunchingAuditRequest;
import com.focusr.Precot.payload.spulance.SpunlaceAuditRequest;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.padpunching.AppConstantsPadPunching;
import com.focusr.Precot.util.padpunching.PadPunchingExcelUtill;
import com.focusr.Precot.util.splunance.AppConstantsSplunance;
import com.focusr.Precot.util.splunance.SpunlaceExcelUtill;

@Service
public class PadPunchingAuditService {

	Logger logger = LoggerFactory.getLogger(PadPunchingAuditService.class);

	SCAUtil sca = new SCAUtil();

	@Autowired
	private DailyRollConsumptionReportHistoryRepositoryF002 dailyRollConsumptionReportHistoryRepositoryF002;

	@Autowired
	private PunchingProductChangeOverRepositoryHistoryF03 punchingProductChangeOverRepositoryHistoryF03;

	@Autowired
	private DailyProdPackingDetailsHistoryRepositoryF004 dailyProdPackingDetailsHistoryRepositoryF004;

	@Autowired
	private MachineCleaningCheckListHistoryRepositoryF005 machineCleaningCheckListHistoryRepositoryF005;

	@Autowired
	private MetalDetectorCheckList007HistoryRepo metalDetectorCheckList007HistoryRepo;

	@Autowired
	private PunchingHandSanitationHistoryRepository punchingHandSanitationHistoryRepository;

	@Autowired
	private BagMakingSpecificationDetailsHistoryF014Repository bagMakingSpecificationDetailsHistoryF014Repository;

	@Autowired
	private ProductionDetailLogBookHistoryRepository01 productionDetailsLogBook01HistoryRepo;
	
	@Autowired
	private PadPunchingHouseKeepingCheckListF26RepositoryHistory punchingHouseKeepingCheckListF26RepositoryHistory;

	@Autowired
	private PadPunchingHouseKeepingCheckListF010RepositoryHistory padPunchingHouseKeepingCheckListF010RepositoryHistory;

	@Autowired
	private PadPunchingBagMakingDailyProductionDetailsHistoryRepositoryF001 punchingBagMakingDailyProductionDetailsHistoryRepositoryF001;
	
	@Autowired
	private PadPunchingLogBookBagMakingRepositoryHistoryF003 punchingLogBookBagMakingRepositoryHistoryF003 ;
	
	@Autowired
	private PadPunchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21 punchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21;

	public ResponseEntity<?> getAuditSummary(PadPunchingAuditRequest summeryrequest) {
		List<ProductionDetailLogBookHistory01> summaryF01;
		List<DailyRollConsumptionReportHistoryF002> summaryF02;
		List<PunchingProductChangeOverHistoryF03> summaryF03;
		List<DailyProdPackingDetailsHistoryF004> summaryF04;
		List<MachineCleaningCheckListHistoryF005> summaryF05;
		List<PunchingHandSanitationHistoryF24> summaryF06;
		List<MetalDetectorCheckList007History> summaryF07;
		List<BagMakingSpecificationDetailsHistoryF014> summaryF14;
        
		List<PadPunchingHouseKeepingCleaningCheckListF26History> summaryF26;
		List<PadPunchingHouseCleaningCheckListF010History> summaryF10;
		List<PadPunchingBagMakingDailyProductionDetailsHistoryF001> summaryF001;
		List<PadPunchingLogBookBagMakingHistoryF003> summaryF003 ;
		List<PadPunchingSanitizationOfMachinesAndSurfacesHistoryF21>summaryF21 ;
		
		try {
			String department = summeryrequest.getDepartment();
			String formName = summeryrequest.getForm_name();

			// F001
			if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F001.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF01_shift().isEmpty() ? null : summeryrequest.getF01_shift();

				summaryF01 = productionDetailsLogBook01HistoryRepo.findByParams001(fromDate, toDate, shift);

				if (!summaryF01.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF001Excel(summaryF01);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Production_Details_Log_Book.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F002
			else if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F002.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF02_shift().isEmpty() ? null : summeryrequest.getF02_shift();
				String machineName = summeryrequest.getF02_machine_name().isEmpty() ? null
						: summeryrequest.getF02_machine_name();

				summaryF02 = dailyRollConsumptionReportHistoryRepositoryF002.findByParams002(fromDate, toDate, shift,
						machineName);

				if (!summaryF02.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF002Excel(summaryF02);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Daily_Roll_Consumption_Report_Pad_Punching.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F003
			else if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F003.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF03_shift().isEmpty() ? null : summeryrequest.getF03_shift();
				String machineName = summeryrequest.getF03_machine_name().isEmpty() ? null
						: summeryrequest.getF03_machine_name();

				summaryF03 = punchingProductChangeOverRepositoryHistoryF03.findByParams003(fromDate, toDate, shift,
						machineName);

				if (!summaryF03.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF003Excel(summaryF03);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Product_Change_Over.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F004
			else if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F004.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF04_shift().isEmpty() ? null : summeryrequest.getF04_shift();

				summaryF04 = dailyProdPackingDetailsHistoryRepositoryF004.findByParams004(fromDate, toDate, shift);

				if (!summaryF04.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF004Excel(summaryF04);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Daily_Production_Packing_Details.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F005
			if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F005.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
//				String shift = summeryrequest.getF05_shift().isEmpty() ? null : summeryrequest.getF05_shift();
				String machineName = summeryrequest.getF05_machine_name().isEmpty() ? null
						: summeryrequest.getF05_machine_name();

				summaryF05 = machineCleaningCheckListHistoryRepositoryF005.findByParams005(fromDate, toDate, 
						machineName);

				if (!summaryF05.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF005Excel(summaryF05);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Machine_Cleaning_Check_List.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F006
			if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F006.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF06_shift().isEmpty() ? null : summeryrequest.getF06_shift();

				summaryF06 = punchingHandSanitationHistoryRepository.findByParams006(fromDate, toDate, shift);

				if (!summaryF06.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF006Excel(summaryF06);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Hand_Sanitization_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F007
			if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F007.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();

				summaryF07 = metalDetectorCheckList007HistoryRepo.findByParams007(fromDate, toDate);

				if (!summaryF07.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF007Excel(summaryF07);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Argus_Metal_Detector_Check_List.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F014
			if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F014.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getF14_shift().isEmpty() ? null : summeryrequest.getF14_shift();
				String machineName = summeryrequest.getF14_machine_name().isEmpty() ? null
						: summeryrequest.getF14_machine_name();
				String productName = summeryrequest.getF14_product_name().isEmpty() ? null
						: summeryrequest.getF14_product_name();

				summaryF14 = bagMakingSpecificationDetailsHistoryF014Repository.findByParams014(fromDate, toDate, shift,
						machineName, productName);

				if (!summaryF14.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF014Excel(summaryF14);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Bag_Making_Specification_Details.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			
			// VIJAY

			// F015 -F26 - House Keeping Cleaning Check List

			else if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F009.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();

				summaryF26 = punchingHouseKeepingCheckListF26RepositoryHistory.findByDate(fromDate, toDate);

				if (!summaryF26.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF26Excel(summaryF26);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=House_Keeping_Cleaning_Check_List.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F10(CODE) - F009(APP_CON) - House Keeping Cleaning Check List

			else if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F015.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();

				summaryF10 = padPunchingHouseKeepingCheckListF010RepositoryHistory.findByDate(fromDate, toDate);

				if (!summaryF10.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF10Excel(summaryF10);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=House_Keeping_Cleaning_Check_List_1.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// AppConstant - F013 - CODE - F001 - (Bag Making Daily Production Details)

			else if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F013.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getShift().isEmpty() ? null : summeryrequest.getShift();

				summaryF001 = punchingBagMakingDailyProductionDetailsHistoryRepositoryF001.findByDate(fromDate, toDate,
						shift);

				if (!summaryF001.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateBagMakingF001Excel(summaryF001);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Bag_Making_Daily_Production_Details.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// AppConstant - F012 - CODE - F003 - ( Log Book - Bag Making)

			else if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F012.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getShift().isEmpty() ? null : summeryrequest.getShift();

				summaryF003 = punchingLogBookBagMakingRepositoryHistoryF003.findByDateF003(fromDate, toDate,
						shift);

				if (!summaryF003.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateExcelLogBookF003(summaryF003);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Log_Book_Bag_Making.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			
			// AppConstant - F008 - CODE - F21 - (Sanitization Of Machines & Surfaces)

			else if (AppConstantsPadPunching.departmentName.equals(department)
					&& AppConstantsPadPunching.F008.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String machine = summeryrequest.getMachine().isEmpty() ? null : summeryrequest.getMachine();
				String week = summeryrequest.getWeek().isEmpty() ? null : summeryrequest.getWeek();
				String month = summeryrequest.getMonth().isEmpty() ? null : summeryrequest.getMonth();
				String year = summeryrequest.getYear().isEmpty() ? null : summeryrequest.getYear();

				summaryF21 = punchingSanitizationOfMachinesAndSurfacesRepositoryHistoryF21.findByDateF21(fromDate, toDate,
						 machine,week,month,year);

				if (!summaryF21.isEmpty()) {
					ByteArrayResource resource = PadPunchingExcelUtill.generateF21Excel(summaryF21);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Sanitization_Of_Machines_And_Surfaces.xlsx")
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
