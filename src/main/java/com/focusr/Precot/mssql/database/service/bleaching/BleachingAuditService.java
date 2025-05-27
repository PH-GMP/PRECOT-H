package com.focusr.Precot.mssql.database.service.bleaching;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContAbCottonHistoryF08;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachAppliedContRawCottonHistoryF04;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContAbsBleachedCottonHistoryF18;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachContRawCottonF05History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogBookCakePressHistoryF09;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogBookHistoryF33;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHandSanitizationABPressHistoryF41;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHouseKeepingCheckListHistoryF02;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachHouseKeepingCheckListHistoryF02A;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachLayDownCheckListF42History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMachineCleaningRecordHistoryF16;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMetalDetectorCheckListHistoryF03;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachMixingChangeMachineCleaningHistoryF38;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachSanitizationOfMechineAndSurfaceHistoryF01;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachShiftLogBookHistoryF36;
import com.focusr.Precot.mssql.database.model.bleaching.audit.BleachingJobcard13History;
import com.focusr.Precot.mssql.database.model.bleaching.audit.EquipLogBookHydroExtractorHistoryF11;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachLayDownCheckListF42Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachShiftLogBookF36Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.ActivitiesF01RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachAppliedContAbCottonF08RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachAppliedContRawCottonF04RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachContAbsBleachedCottonF18RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachContRawCottonF05RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachEquipmentUsageLogBookCakePressF09RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachEquipmentUsageLogBookF33RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachEquipmentUsageLogbookBlowroomAndCardingF34RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachHandSanitizationABPressF41RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachHouseKeepingCheckListF02RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachHouseKeepingCheckListHistoryRepositoryF02A;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachJobCard13RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachLayDownCheckListF42RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachMachineCleaningRecordHistoryF16Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachMetalDetectorCheckListHistoryRepositoryF03;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachMixingChangeMachineCleaningF38RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachSanitizationOfMechineAndSurfaceF01RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.BleachShiftLogBookF36RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.audit.EquipLogBookHydroExtractorF11RepositoryHistory;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.bleaching.BleachingExcelUtil;
import com.focusr.Precot.util.bleaching.DashboardRequest;
import com.focusr.Precot.util.bleaching.DashboardResponse;
import com.focusr.Precot.util.bleaching.DashboardResponseInterface;

@Service
public class BleachingAuditService {

	Logger logger = LoggerFactory.getLogger(BleachingAuditService.class);

	@Autowired
	private BleachLayDownCheckListF42Repository layDownCheckListF42Repository;

	@Autowired
	private BleachLayDownCheckListF42RepositoryHistory layDownCheckListF42RepositoryHistory;

	@Autowired
	private EquipLogBookHydroExtractorF11RepositoryHistory equipLogBookHydroExtractorF11Historyrepo;

	@Autowired
	private BleachContAbsBleachedCottonF18RepositoryHistory contAbsBleachedCottonF18RepositoryHistory;

	@Autowired
	private BleachContRawCottonF05RepositoryHistory rawCottonF05RepositoryHistory;

	@Autowired
	private BleachMetalDetectorCheckListHistoryRepositoryF03 metalDetectorCheckListRepoF03;

	@Autowired
	private BleachEquipmentUsageLogBookF33RepositoryHistory equipmentUsageLogBookF33RepositoryHistory;

	@Autowired
	private BleachShiftLogBookF36RepositoryHistory shiftLogBookF36RepositoryHistory;

	@Autowired
	private BleachSanitizationOfMechineAndSurfaceF01RepositoryHistory sanitizationOfMechineAndSurfaceF01HistoryRepo;

	@Autowired
	private ActivitiesF01RepositoryHistory smsActivitiesRepo;

	@Autowired
	private BleachHouseKeepingCheckListF02RepositoryHistory houseKeepingCheckListF02RepositoryHistory;

	@Autowired
	private BleachHouseKeepingCheckListHistoryRepositoryF02A houseKeepingCheckListHistoryRepositoryF02A;

	@Autowired
	private BleachJobCard13RepositoryHistory jobCard13RepositoryHistory;

	@Autowired
	private BleachEquipmentUsageLogbookBlowroomAndCardingF34RepositoryHistory blowroomAndCardingF34RepositoryHistory;

	@Autowired
	private BleachMixingChangeMachineCleaningF38RepositoryHistory machineCleaningF38RepositoryHistory;

	// TEST

	@Autowired
	private BleachShiftLogBookF36Repository shiftLogBookF36Repository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private BleachEquipmentUsageLogBookCakePressF09RepositoryHistory cakePressF09RepositoryHistory;

	@Autowired
	private BleachAppliedContRawCottonF04RepositoryHistory contRawCottonF04RepositoryHistory;

	@Autowired
	private BleachAppliedContAbCottonF08RepositoryHistory contAbCottonF08RepositoryHistory;

	@Autowired
	private BleachHandSanitizationABPressF41RepositoryHistory bleachhandsanitizationabpressf41repositoryhistory;
	
	@Autowired
	private BleachMachineCleaningRecordHistoryF16Repository bleachMachineCleaningRecordHistoryF16Repository;


	public ResponseEntity<?> generateLaydownChecklistF42Report(String laydownNo, String start, String end) {

		List<BleachLayDownCheckListF42History> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (laydownNo == null || "".equals(laydownNo)) {
				laydownNo = "%";
			} else {

				laydownNo = laydownNo;
			}

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {
				start = layDownCheckListF42RepositoryHistory.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {
				end = layDownCheckListF42RepositoryHistory.findMaximumCreationDate();

			} else {
				end = end;
			}

			layDownCheckListF42Histories = layDownCheckListF42RepositoryHistory.fetchLaydownHistories1(laydownNo, start,
					end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.laydownCheckListAuditReport(layDownCheckListF42Histories,
							laydownNo);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// EXCEL EQUIPMENT F11

	public ResponseEntity<?> generateEquipmentF11Report(String bmr, String subBatchNo, String start, String end) {

		List<EquipLogBookHydroExtractorHistoryF11> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (bmr == null || "".equals(bmr)) {
				bmr = "%";
			} else {

				bmr = bmr;
			}

			if (subBatchNo == null || "".equals(subBatchNo)) {
				subBatchNo = "%";
			} else {

				subBatchNo = subBatchNo;
			}

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {
				start = equipLogBookHydroExtractorF11Historyrepo.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {
				end = equipLogBookHydroExtractorF11Historyrepo.findMaximumCreationDate();

			} else {
				end = end + " 23:59:00";

				System.out.println("FORM 11 END_DATE :" + end);
			}

			layDownCheckListF42Histories = equipLogBookHydroExtractorF11Historyrepo.fetchHydroExtractor(bmr, subBatchNo,
					start, end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.laydownCheckListAuditReportF11(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// EXCEL EQUIPMENT F18

	public ResponseEntity<?> generateBleachConstAbsF18Report(String bmr, String baleNo, String batchNo, String start,
			String end) {

		List<BleachContAbsBleachedCottonHistoryF18> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (bmr == null || "".equals(bmr)) {
				bmr = "%";
			} else {

				bmr = bmr;
			}

			if (baleNo == null || "".equals(baleNo)) {
				baleNo = "%";
			} else {

				baleNo = baleNo;
			}

			if (batchNo == null || "".equals(batchNo)) {
				batchNo = "%";
			} else {

				batchNo = batchNo;
			}

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {
				start = contAbsBleachedCottonF18RepositoryHistory.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {
				end = contAbsBleachedCottonF18RepositoryHistory.findMaximumCreationDate();

			} else {
				end = end;
			}

			layDownCheckListF42Histories = contAbsBleachedCottonF18RepositoryHistory.fetchBleachedCottonHistories(bmr,
					baleNo, batchNo, start, end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.laydownCheckListAuditReportF18(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// F-05 EXCEL DOWNLOAD
	
	
	public ResponseEntity<?> generateRawCottonF05Report(String phNo, String start, String end) {
		 
		List<BleachContRawCottonF05History> layDownCheckListF42Histories = new ArrayList<>();
 
		try {
 
			if (phNo == null || "".equals(phNo)) {
				phNo = "%";
			} else {
 
				phNo = phNo;
			}
 
			// Null value checking in FROM DATE
 
			if (start == null || "".equals(start)) {
				start = rawCottonF05RepositoryHistory.findMinimumCreationDate();
 
			} else {
				start = start;
			}
 
			// Null value checking in TO DATE
 
			if (end == null || "".equals(end)) {
				end = rawCottonF05RepositoryHistory.findMaximumCreationDate();
 
			} else {
				end = end;
			}
 
			layDownCheckListF42Histories = rawCottonF05RepositoryHistory.fetchRawCottonHistories(phNo, start, end);
 
			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {
 
				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);
 
			} else {
 
				BleachingExcelUtil excelUtil = new BleachingExcelUtil();
 
				try {
 
					ResponseEntity<?> resp = excelUtil.RawCottonAuditReportF05(layDownCheckListF42Histories);
					return resp;
 
				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}
 
			}
 
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
	

//	public ResponseEntity<?> generateRawCottonF05Report(String phNo, String start, String end) {
//
//		List<BleachContRawCottonF05History> layDownCheckListF42Histories = new ArrayList<>();
//
//		try {
//
//			if (phNo != null && phNo.isEmpty()) {
//				phNo = null;
//	        }
//			
//			if (start == null || "".equals(start)) {
//				start = "%";
//			} else {
//
//				start = start;
//			}
//			
//			if (end == null || "".equals(end)) {
//				end = "%";
//			} else {
//
//				end = end;
//			}
//
//			layDownCheckListF42Histories = rawCottonF05RepositoryHistory.fetchContaminationHistory(phNo, start, end);
//
//			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
//					|| layDownCheckListF42Histories.size() == 0) {
//
//				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
//						HttpStatus.BAD_REQUEST);
//
//			} else {
//
//				BleachingExcelUtil excelUtil = new BleachingExcelUtil();
//
//				try {
//
//					ResponseEntity<?> resp = excelUtil.RawCottonAuditReportF05(layDownCheckListF42Histories);
//					return resp;
//
//				} catch (Exception e) {
//					SCAUtil sca = new SCAUtil();
//					logger.error("*** Unable to Generate Excel Report *** " + e);
//					String msg = sca.getErrorMessage(e);
//					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
//							HttpStatus.BAD_REQUEST);
//				}
//
//			}
//
//		} catch (Exception e) {
//			SCAUtil sca = new SCAUtil();
//			logger.error("*** Unable to Get Audit History *** " + e);
//			String msg = sca.getErrorMessage(e);
//			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	// F-03 EXCEL DOWNLOAD

	public ResponseEntity<?> generateMetalDetectorF03Report(String section, String start, String end) {

		List<BleachMetalDetectorCheckListHistoryF03> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (section == null || "".equals(section)) {
				section = "%";
			} else {

				section = section;
			}

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {

				start = metalDetectorCheckListRepoF03.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {
				end = metalDetectorCheckListRepoF03.findMaximumCreationDate();

			} else {
				end = end;
			}

			layDownCheckListF42Histories = metalDetectorCheckListRepoF03.fetchMetalDetectorHistories(section, start,
					end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.MetalDetectorReportF03(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// F-33 EXCEL DOWNLOAD

	public ResponseEntity<?> generateEquipmentUsageF33Report(String start, String end) {

		List<BleachEquipmentUsageLogBookHistoryF33> layDownCheckListF42Histories = new ArrayList<>();

		try {

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {

				start = equipmentUsageLogBookF33RepositoryHistory.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {
				end = equipmentUsageLogBookF33RepositoryHistory.findMaximumCreationDate();

			} else {
				end = end;
			}

			layDownCheckListF42Histories = equipmentUsageLogBookF33RepositoryHistory.fetchEquipmentUsageHistories(start,
					end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.EquipmentUsageReportF33(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// F-36 EXCEL DOWNLOAD

	public ResponseEntity<?> generateShiftLogBookF36Report(String shift, String start, String end) {

		List<BleachShiftLogBookHistoryF36> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (shift == null || "".equals(shift)) {
				shift = "%";
			} else {

				shift = shift;
			}

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {

				start = shiftLogBookF36RepositoryHistory.findMinimumCreationDate();
//				start = shiftLogBookF36Repository.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {

				end = shiftLogBookF36RepositoryHistory.findMaximumCreationDate();
//				end = shiftLogBookF36Repository.findMaximumCreationDate();

			} else {
				end = end;
			}

			layDownCheckListF42Histories = shiftLogBookF36RepositoryHistory.fetchShiftLogHistories(shift, start, end);

//			layDownCheckListF42Histories = shiftLogBookF36Repository.fetchLaydownHistories(shift, start,
//					end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found !"), HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.ShiftLogBookReportF36(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// F-02 EXCEL DOWNLOAD

	public ResponseEntity<?> generateHouseKeepingF02Report(String start, String end) {

		List<BleachHouseKeepingCheckListHistoryF02> layDownCheckListF42Histories = new ArrayList<>();

		try {

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {

				start = houseKeepingCheckListF02RepositoryHistory.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {

				end = houseKeepingCheckListF02RepositoryHistory.findMaximumCreationDate();

			} else {
				end = end;
			}

			layDownCheckListF42Histories = houseKeepingCheckListF02RepositoryHistory.fetchhouseKeepingHistories(start,
					end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found !"), HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.HouseKeepingReportF02(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// F-02A EXCEL DOWNLOAD

	public ResponseEntity<?> generateHouseKeepingF02AReport(String start, String end) {

		List<BleachHouseKeepingCheckListHistoryF02A> layDownCheckListF42Histories = new ArrayList<>();

		try {

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {

				start = houseKeepingCheckListHistoryRepositoryF02A.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {

				end = houseKeepingCheckListHistoryRepositoryF02A.findMaximumCreationDate();

			} else {
				end = end;
			}

			layDownCheckListF42Histories = houseKeepingCheckListHistoryRepositoryF02A.fetchhouseKeepingHistories(start,
					end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found !"), HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.HouseKeepingReportF02A(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// EXCEL BLEACH JOB CARD F13

	public ResponseEntity<?> generateBleachJobcardF13Report(String bmr, String subBatchNo, String start, String end) {

		List<BleachingJobcard13History> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (bmr == null || "".equals(bmr)) {
				bmr = "%";
			} else {

				bmr = bmr;
			}

			if (subBatchNo == null || "".equals(subBatchNo)) {
				subBatchNo = "%";
			} else {

				subBatchNo = subBatchNo;
			}

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {
				start = jobCard13RepositoryHistory.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {
				end = jobCard13RepositoryHistory.findMaximumCreationDate();

			} else {
				end = end;

			}

			layDownCheckListF42Histories = jobCard13RepositoryHistory.fetchJobCardHistories(bmr, subBatchNo, start,
					end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.JobCardReportF13(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// EXCEL BLEACH JOB CARD F34

	public ResponseEntity<?> generateBlowroomAndCardingF34Report(String bmr, String start, String end) {
		 
		List<BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34> layDownCheckListF42Histories = new ArrayList<>();
 
		try {
 
			if (bmr == null || "".equals(bmr)) {
				bmr = "%";
			} else {
 
				bmr = bmr;
			}
 
			// Null value checking in FROM DATE
 
			if (start == null || "".equals(start)) {
				start = blowroomAndCardingF34RepositoryHistory.findMinimumCreationDate();
 
			} else {
				start = start;
			}
 
			// Null value checking in TO DATE
 
			if (end == null || "".equals(end)) {
				end = blowroomAndCardingF34RepositoryHistory.findMaximumCreationDate();
 
			} else {
				end = end;
 
			}
 
			layDownCheckListF42Histories = blowroomAndCardingF34RepositoryHistory.fetchBlowroomAndCardingHistories(bmr,
					start, end);
 
			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {
 
				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);
 
			} else {
 
				BleachingExcelUtil excelUtil = new BleachingExcelUtil();
 
				try {
 
					ResponseEntity<?> resp = excelUtil.BlowroomAndCardingF34(layDownCheckListF42Histories);
					return resp;
 
				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}
 
			}
 
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
	
//	public ResponseEntity<?> generateBlowroomAndCardingF34Report(String bmr, String start, String end) {
//
//		List<BleachEquipmentUsageLogbookBlowroomAndCardingHistoryF34> layDownCheckListF42Histories = new ArrayList<>();
//
//		try {
//
////			if (bmr == null || "".equals(bmr)) {
////				bmr = "%";
////			} else {
////
////				bmr = bmr;
////			}
////
////			// Null value checking in FROM DATE
////
////			if (start == null || "".equals(start)) {
////				start = blowroomAndCardingF34RepositoryHistory.findMinimumCreationDate();
////
////			} else {
////				start = start;
////			}
////
////			// Null value checking in TO DATE
////
////			if (end == null || "".equals(end)) {
////				end = blowroomAndCardingF34RepositoryHistory.findMaximumCreationDate();
////
////			} else {
////				end = end;
////
////			}
//			
//			if (bmr != null && bmr.isEmpty()) {
//	            bmr = null;
//	        }
//			
//			if (start == null || "".equals(start)) {
//				start = "%";
//			} else {
//
//				start = start;
//			}
//			
//			if (end == null || "".equals(end)) {
//				end = "%";
//			} else {
//
//				end = end;
//			}
//
//			layDownCheckListF42Histories = blowroomAndCardingF34RepositoryHistory.fetchBlowroomAndCardingHistories(bmr,
//					start, end);
//
//			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
//					|| layDownCheckListF42Histories.size() == 0) {
//
//				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
//						HttpStatus.BAD_REQUEST);
//
//			} else {
//
//				BleachingExcelUtil excelUtil = new BleachingExcelUtil();
//
//				try {
//
//					ResponseEntity<?> resp = excelUtil.BlowroomAndCardingF34(layDownCheckListF42Histories);
//					return resp;
//
//				} catch (Exception e) {
//					SCAUtil sca = new SCAUtil();
//					logger.error("*** Unable to Generate Excel Report *** " + e);
//					String msg = sca.getErrorMessage(e);
//					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
//							HttpStatus.BAD_REQUEST);
//				}
//
//			}
//
//		} catch (Exception e) {
//			SCAUtil sca = new SCAUtil();
//			logger.error("*** Unable to Get Audit History *** " + e);
//			String msg = sca.getErrorMessage(e);
//			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}

	// EXCEL BLEACH JOB CARD F38

	public ResponseEntity<?> generateMachineCleaningF38Report(String bmrFrom, String bmrTo, String start, String end) {

		List<BleachMixingChangeMachineCleaningHistoryF38> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (bmrFrom == null || "".equals(bmrFrom)) {
				bmrFrom = "%";
			} else {

				bmrFrom = bmrFrom;
			}

			if (bmrTo == null || "".equals(bmrTo)) {
				bmrTo = "%";
			} else {

				bmrTo = bmrTo;
			}

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {
				start = machineCleaningF38RepositoryHistory.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {
				end = machineCleaningF38RepositoryHistory.findMaximumCreationDate();

			} else {
				end = end;

			}

			layDownCheckListF42Histories = machineCleaningF38RepositoryHistory.fetchMachineCleaningHistories(bmrFrom,
					bmrTo, start, end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.machineCleaningF38(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// DASHBOARD

	public ResponseEntity<?> dahsboardTracker(DashboardRequest dashboardRequest, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		DashboardResponseInterface dashboardResponseInterface;
		DashboardResponse response = new DashboardResponse();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			User user = userRepository.getDetailsByUserName(userName);

			if (userRole.equals("ROLE_SUPERVISOR")) {

				String supervisiorName = userName;

				dashboardResponseInterface = layDownCheckListF42Repository
						.getDashboardCounts(dashboardRequest.getMonth(), dashboardRequest.getYear(), userName);

				response.setSupervisiorSubmitted(dashboardResponseInterface.getsupervisiorSubmitted());
				response.setHodApproved(dashboardResponseInterface.gethodApproved());
				response.setHodRejected(dashboardResponseInterface.gethodRejected());

			} else if (userRole.equals("ROLE_HOD")) {

				String hodName = userName;

				dashboardResponseInterface = layDownCheckListF42Repository
						.getHODDashboardCounts(dashboardRequest.getMonth(), dashboardRequest.getYear(), hodName);

				response.setSupervisiorSubmitted(dashboardResponseInterface.getsupervisiorSubmitted());
				response.setHodApproved(dashboardResponseInterface.gethodApproved());
				response.setHodRejected(dashboardResponseInterface.gethodRejected());

			}

		} catch (Exception e) {

			logger.error("***************** Unable to get List Of Dashboard!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of Dashboard! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		response.setFormatName(AppConstants.F42a);

		return new ResponseEntity<>(response, HttpStatus.OK);

	}

	// EXCEL CAKE PRESS HISTORY F-09

	public ResponseEntity<?> generateCakePressHistoryF09Report(String bmr, String subBatchNo, String start,
			String end) {

		List<BleachEquipmentUsageLogBookCakePressHistoryF09> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (bmr == null || "".equals(bmr)) {
				bmr = "%";
			} else {

				bmr = bmr;
			}

			if (subBatchNo == null || "".equals(subBatchNo)) {
				subBatchNo = "%";
			} else {

				subBatchNo = subBatchNo;
			}

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {
				start = cakePressF09RepositoryHistory.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {
				end = cakePressF09RepositoryHistory.findMaximumCreationDate();

			} else {
				end = end;

			}

			layDownCheckListF42Histories = cakePressF09RepositoryHistory.fetchCakePress(bmr, subBatchNo, start, end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.CakePressReportF09(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// EXCEL RAW COTTON HISTORY F-04

	public ResponseEntity<?> generateRawCottonF04Report(String bmr, String start, String end) {

		List<BleachAppliedContRawCottonHistoryF04> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (bmr != null && bmr.isEmpty()) {
	            bmr = null;
	        }
			
			if (start == null || "".equals(start)) {
				start = "%";
			} else {

				start = start;
			}
			
			if (end == null || "".equals(end)) {
				end = "%";
			} else {

				end = end;
			}
			

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {
//				start = contRawCottonF04RepositoryHistory.findMinimumCreationDate();

			} 

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {
//				end = contRawCottonF04RepositoryHistory.findMaximumCreationDate();

			} 

			layDownCheckListF42Histories = contRawCottonF04RepositoryHistory.fetchRawCottonExcel(bmr, start, end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);

			} else {

				
				
				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.ContRawCottonReportF04(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// EXCEL APPLIED CONT AB COTTON HISTORY F-08

	public ResponseEntity<?> generateABCottonF08Report(String bmr, String start, String end) {

		List<BleachAppliedContAbCottonHistoryF08> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (bmr == null || "".equals(bmr)) {
				bmr = "%";
			} else {

				bmr = bmr;
			}

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {
				start = contAbCottonF08RepositoryHistory.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {
				end = contAbCottonF08RepositoryHistory.findMaximumCreationDate();

			} else {
				end = end;

			}
			System.out.println("BMR" + bmr);
			layDownCheckListF42Histories = contAbCottonF08RepositoryHistory.fetchConsABCotton(bmr, start, end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found for this Selection !"),
						HttpStatus.BAD_REQUEST);

			} else {

				BleachingExcelUtil excelUtil = new BleachingExcelUtil();

				try {

					ResponseEntity<?> resp = excelUtil.ContABCottonReportF08(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	// ONE TO MANY

	// F01 EXCEL DOWNLOAD month, year, week, start, end

	public ResponseEntity<?> generateSanitizationF01Report(String month, String year, String week, String start,
			String end) {

		List<BleachSanitizationOfMechineAndSurfaceHistoryF01> layDownCheckListF42Histories = new ArrayList<>();

		try {

			if (month == null || "".equals(month)) {
				month = "%";
			} else {

				month = month;
			}

			if (year == null || "".equals(year)) {
				year = "%";
			} else {

				year = year;
			}

			if (week == null || "".equals(week)) {
				week = "%";
			} else {

				week = week;
			}

			// Null value checking in FROM DATE

			if (start == null || "".equals(start)) {

				start = sanitizationOfMechineAndSurfaceF01HistoryRepo.findMinimumCreationDate();

			} else {
				start = start;
			}

			// Null value checking in TO DATE

			if (end == null || "".equals(end)) {

				end = sanitizationOfMechineAndSurfaceF01HistoryRepo.findMaximumCreationDate();

			} else {
				end = end + " 23:59:00";
				;
			}

			layDownCheckListF42Histories = sanitizationOfMechineAndSurfaceF01HistoryRepo.fetchLaydownHistories(week,
					month, year, start, end);

			if (layDownCheckListF42Histories.isEmpty() || layDownCheckListF42Histories == null
					|| layDownCheckListF42Histories.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found !"), HttpStatus.BAD_REQUEST);

			} else {

				try {

					BleachingExcelUtil excelUtil = new BleachingExcelUtil();

					ResponseEntity<?> resp = excelUtil.SanitizationF01(layDownCheckListF42Histories);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Audit History *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> bleachingHandSanitation(String from_date, String to_date, String shift) {
		
		List<BleachHandSanitizationABPressHistoryF41> handSanitationSUmmary = new ArrayList<>();
		
		try {
			
			if (from_date == null || "".equals(from_date)) {
				from_date = "%";
			} else {

				from_date = from_date;
			}
			
			if (to_date == null || "".equals(to_date)) {
				to_date = "%";
			} else {

				to_date = to_date;
			}
			
			if (shift != null && shift.isEmpty()) {
	            shift = null;
	        }
			
			
			
			handSanitationSUmmary = bleachhandsanitizationabpressf41repositoryhistory.fetchHandSanitationHistory(from_date, to_date, shift);
			
			if (handSanitationSUmmary.isEmpty() || handSanitationSUmmary == null
					|| handSanitationSUmmary.size() == 0) {

				return new ResponseEntity(new ApiResponse(false, "No Record Found !"), HttpStatus.BAD_REQUEST);

			} else {

				try {

					BleachingExcelUtil excelUtil = new BleachingExcelUtil();

					ResponseEntity<?> resp = excelUtil.createHandSanitationReport(handSanitationSUmmary);
					return resp;

				} catch (Exception e) {
					SCAUtil sca = new SCAUtil();
					logger.error("*** Unable to Generate Excel Report *** " + e);
					String msg = sca.getErrorMessage(e);
					return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
							HttpStatus.BAD_REQUEST);
				}

			}
			
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Hand Sanitation Report *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Hand Sanitation Report" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
	}
	
//	public ResponseEntity<?> handSanitizationF41(String from_date, String to_date, String shift) {
//
//		List<BleachHandSanitizationABPressHistoryF41> summaryF41;
//
//		try {
//
//			if (from_date == null || "".equals(from_date)) {
//				from_date = "%";
//			} else {
//
//				from_date = from_date;
//			}
//			
//			if (to_date == null || "".equals(to_date)) {
//				to_date = "%";
//			} else {
//
//				to_date = to_date;
//			}
//			
//			if (shift == null || "".equals(shift)) {
//				shift = "%";
//			} else {
//
//				shift = shift;
//			}
//			
//
//			summaryF41 = bleachhandsanitizationabpressf41repositoryhistory.findRecords(from_date, to_date, shift);
//
//			if (!summaryF41.isEmpty()) {
//				Map<String, String> fieldMapping = new HashMap<>();
//				fieldMapping.put("Unit", "unit");
//				fieldMapping.put("Format Number", "formatNo");
//				fieldMapping.put("Form Name", "formatName");
//				fieldMapping.put("Reference SOP Number", "revisionNo");
//				fieldMapping.put("Date", "date");
//				fieldMapping.put("Shift", "shift");
//				fieldMapping.put("Reason", "reason");
//				fieldMapping.put("Version", "version");
//				// Status
//				fieldMapping.put("Supervisor Status", "supervisor_status");
//				fieldMapping.put("Supervisor Submit On ", "supervisor_submit_on");
//				fieldMapping.put("Supervisor Submit By", "supervisor_submit_by");
//				fieldMapping.put("Supervisor Sign", "supervisor_sign");
//				fieldMapping.put("Hod Status", "hod_status");
//				fieldMapping.put("Hod Submit On", "hod_submit_on");
//				fieldMapping.put("Hod Submit By", "hod_submit_by");
//				fieldMapping.put("Hod Sign", "hod_sign");
//				
//				//
//				
//
//
//				ByteArrayResource resource = BleachingExcelUtil.generateDynamicExcel(summaryF41, fieldMapping);
//				return ResponseEntity.ok()
//						.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=BleachingHandSanitization.xlsx")
//						.contentType(MediaType
//								.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
//						.body(resource);
//			} else {
//				return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
//			}
//
//		}
//
//		catch (Exception e) {
//			SCAUtil sca = new SCAUtil();
//			logger.error("*** Unable to Get Audit History *** " + e);
//			String msg = sca.getErrorMessage(e);
//			return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//	}
	
	//F16
		public ResponseEntity<?> machineCleaningRecordF16(String from_date, String to_date, String month, String year) {

			List<BleachMachineCleaningRecordHistoryF16> machineCleaningHistories = new ArrayList<>();

			try {

				if (month == null || "".equals(month)) {
					month = null;
				} else {

					month = month;
				}

				if (year == null || "".equals(year)) {
					year = null;
				} else {

					year = year;
				}

				// Null value checking in FROM DATE

				if (from_date == null || "".equals(from_date)) {

					from_date = null;

				} else {
					from_date = from_date;
				}

				// Null value checking in TO DATE

				if (to_date == null || "".equals(to_date)) {

					to_date = null;

				} else {
					to_date = to_date;
				}

				machineCleaningHistories = bleachMachineCleaningRecordHistoryF16Repository.findByParams16(from_date,
						to_date, month, year);

				if (machineCleaningHistories.isEmpty() || machineCleaningHistories == null
						|| machineCleaningHistories.size() == 0) {

					return new ResponseEntity(new ApiResponse(false, "No Record Found !"), HttpStatus.BAD_REQUEST);

				} else {

					try {

						BleachingExcelUtil excelUtil = new BleachingExcelUtil();

						ResponseEntity<?> resp = excelUtil.MachineCleaningRecordF16(machineCleaningHistories);
						return resp;

					} catch (Exception e) {
						SCAUtil sca = new SCAUtil();
						logger.error("*** Unable to Generate Excel Report *** " + e);
						String msg = sca.getErrorMessage(e);
						return new ResponseEntity(new ApiResponse(false, "Unable to Generate Excel" + msg),
								HttpStatus.BAD_REQUEST);
					}

				}

			} catch (Exception e) {
				SCAUtil sca = new SCAUtil();
				logger.error("*** Unable to Get Audit History *** " + e);
				String msg = sca.getErrorMessage(e);
				return new ResponseEntity(new ApiResponse(false, "Unable to Get Audit History" + msg),
						HttpStatus.BAD_REQUEST);
			}
		}


	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

}
