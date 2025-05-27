package com.focusr.Precot.mssql.database.service.bleaching;

import java.math.BigDecimal;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.time.Year;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContRawCottonF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrGeneration;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrLaydownMapping;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookCakePressF09;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookF33;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34;
import com.focusr.Precot.mssql.database.model.bleaching.BleachJobCardF13;
import com.focusr.Precot.mssql.database.model.bleaching.BleachLayDownCheckListF42;
import com.focusr.Precot.mssql.database.model.bleaching.BleachLaydownGeneration;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryProductionDetails;
import com.focusr.Precot.mssql.database.repository.bleaching.BMRSummaryBleachRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContRawCottonF04Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrLaydownMappingRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrSummaryRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogBookCakePressF09Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogBookF33Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachHandSanitizationABPressF41Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachJobCard13Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachLayDownCheckListF42Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachLaydownGenerationRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachMixingChangeMachineCleaningF38Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachingBmrGenerationRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.GoodsHandSanitationRepositoryF13;
import com.focusr.Precot.mssql.database.repository.padpunching.PunchingHandSanitationRepositoryF24;
import com.focusr.Precot.mssql.database.repository.splunance.SpunlaceHandSanitizationReportF025Repository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.BleachingTraceabilityInterface;
import com.focusr.Precot.payload.BleachingTraceabilityResponse;
import com.focusr.Precot.payload.BleachingWasteBaleResponse;
import com.focusr.Precot.payload.BmrLaydownMappingResponse;
import com.focusr.Precot.payload.BmrSummaryRawCottonResponse;
import com.focusr.Precot.payload.LovResponse;
import com.focusr.Precot.payload.RawCottonIssueResponse;
import com.focusr.Precot.payload.TableRMResponse;
import com.focusr.Precot.payload.UpdateBMRResponse;
import com.focusr.Precot.payload.spulance.SplBaleTraceResponse;
import com.focusr.Precot.payload.spulance.SplTraceResponse;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;

@Service
public class GenerationService {

	Logger log = LoggerFactory.getLogger(GenerationService.class);

	@Autowired
	private BleachingBmrGenerationRepository bmrNumberRepository;

	@Autowired
	private BleachLaydownGenerationRepository laydownNumberRepository;

	@Autowired
	private BleachBmrLaydownMappingRepository BleachBmrLaydownMappingRepository;

	@Autowired
	private BleachingBmrGenerationRepository bleachingBmrGenerationRepository;
	@Autowired
	private BleachLaydownGenerationRepository bleachLaydownGenerationRepository;

	@Autowired
	private BleachEquipmentUsageLogBookF33Repository wasteBaleLogBookF33Repository;

	@Autowired
	private BleachMixingChangeMachineCleaningF38Repository mixingCleaningF38Repository;

	@Autowired
	private BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository cardingF34Repository;

	@Autowired
	private BleachBmrSummaryRepository bmrSummaryRepository;
	
	@Autowired
	private BleachBmrSummaryRepository bleachBmrSummaryRepository;

	@Autowired
	private BleachLayDownCheckListF42Repository laydownChecklistRepository;
	
	@Autowired
	private BleachAppliedContRawCottonF04Repository appliedRawCottonF04Repository;
	
	@Autowired
	private BleachJobCard13Repository jobCardRepository;
	
	@Autowired
	private BleachEquipmentUsageLogBookCakePressF09Repository cakePressF09Repository;
	
	@Autowired
	private BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository cardingRepository;
	
	
		// HAND SANITATION REPOSITORY
	
	@Autowired
	private BleachHandSanitizationABPressF41Repository bleachingHandSanitationRepository;
	
	@Autowired
	private PunchingHandSanitationRepositoryF24 punchingHandSanitationRepository;
	
	@Autowired
	private GoodsHandSanitationRepositoryF13 goodsHandSanitationRepository;
	
	@Autowired
	private SpunlaceHandSanitizationReportF025Repository spulanceHandSanitationRepository;
	
	public ResponseEntity<?> generateBMRNumber(Long department_id) {


		BleachBmrGeneration bmrGeneration = bmrNumberRepository.findLastBMR();

		BleachBmrGeneration blGenerationObject = new BleachBmrGeneration();

		int number = 1;

		int year = Year.now().getValue() % 100;

		try {

			if (bmrGeneration != null) {
				String lastBmrNumber = bmrGeneration.getBleach_bmr_no();
				String[] parts = lastBmrNumber.split("/");

				int lastYear = Integer.parseInt(parts[0]);

				if (lastYear == year) {
					number = Integer.parseInt(parts[2]) + 1;
				} else {
					number = 1;
				}

			}

			String sequenceNumber = String.format("%04d", number);
			String bmrValue = year + "/AB/" + sequenceNumber;

			Date genDate = new Date();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			sdf.setTimeZone(TimeZone.getTimeZone("Asia/Kolkata"));
			
			String istTime = sdf.format(genDate);
			
			blGenerationObject.setBleach_bmr_no(bmrValue);
			blGenerationObject.setSTATUS(AppConstants.bmrCreation);
			blGenerationObject.setDepartment_id(department_id);
			blGenerationObject.setGenDate(istTime);

			bmrNumberRepository.save(blGenerationObject);

		} catch (Exception ex) {

			String msg = ex.getMessage();

			log.error("**** Unable to generate BMR ****" + ex);

			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(blGenerationObject, HttpStatus.OK);

	}

	public ResponseEntity<?> generateLaydownNumber(Long department_id) {


		BleachLaydownGeneration laydownGeneration = laydownNumberRepository.findLastLaydown();

		BleachLaydownGeneration blGenerationObject = new BleachLaydownGeneration();

		int number = 1;
		int year = Year.now().getValue() % 100;

		try {

			if (laydownGeneration != null) {
				String lastBmrNumber = laydownGeneration.getBleach_laydown_no();
				String[] parts = lastBmrNumber.split("/");

				int lastYear = Integer.parseInt(parts[0]);

				if (lastYear == year) {
					number = Integer.parseInt(parts[2]) + 1;
				} else {
					number = 1;
				}
			}

			// String year = String.valueOf(Year.now().getValue() % 100);
			String sequenceNumber = String.format("%04d", number);
			String laydown = year + "/PH/" + sequenceNumber;

			blGenerationObject.setBleach_laydown_no(laydown);
			blGenerationObject.setStatus(AppConstants.bmrCreation);
			blGenerationObject.setDepartment_id(department_id);

			laydownNumberRepository.save(blGenerationObject);

		} catch (Exception ex) {

			String msg = ex.getMessage();

			log.error("**** Unable to generate Laydown ****" + ex);

			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(blGenerationObject, HttpStatus.OK);

	}

	// GET BMR
	public ResponseEntity<?> getBMRListByDeptId(Long dept_id) {

		List<BleachBmrGeneration> bleachBmrList = new ArrayList<>();

		try {
			bleachBmrList = bmrNumberRepository.listOfBmrByDeptId(dept_id);

			Date genDate = new Date();
			
			
//			if (bleachBmrList.isEmpty() || bleachBmrList == null) {
//				return new ResponseEntity(new ApiResponse(false, "No BMR Found"), HttpStatus.BAD_REQUEST);
//			}
		} catch (Exception ex) {

			String msg = ex.getMessage();

			log.error("**** Unable to fetch BMR ****" + ex);

			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(bleachBmrList, HttpStatus.OK);

	}

	// GET LAYDOWN
	public ResponseEntity<?> getLaydownByDeptId(Long dept_id) {

		List<BleachLaydownGeneration> bleachBmrList = new ArrayList<>();

		try {
			bleachBmrList = laydownNumberRepository.listOfLaydownByDeptId(dept_id);

//			if (bleachBmrList.isEmpty() || bleachBmrList == null) {
//				return new ResponseEntity(new ApiResponse(false, "No Laydown Found"), HttpStatus.BAD_REQUEST);
//			}
		} catch (Exception ex) {

			String msg = ex.getMessage();

			log.error("**** Unable to fetch Laydown ****" + ex);

			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(bleachBmrList, HttpStatus.OK);

	}

	/*
	 * public ResponseEntity<?> BmrLaydownMapping( BmrLaydownMappingResponse
	 * response, HttpServletRequest http) { try {
	 * 
	 * BleachBmrLaydownMapping mapping = new BleachBmrLaydownMapping();
	 * 
	 * mapping.setBmr_no(response.getBmrNo());
	 * mapping.setLaydown_no(response.getLaydownNo());
	 * mapping.setJob_order_no(response.getJoborderNo());
	 * mapping.setDepartment_id(response.getDepartmentId());
	 * mapping.setStatus("OPEN");
	 * 
	 * BleachBmrLaydownMappingRepository.save(mapping);
	 * 
	 * return new ResponseEntity(mapping, HttpStatus.OK);
	 * 
	 * }
	 * 
	 * catch (Exception e) { return new ResponseEntity<>("Error Mapping" +
	 * e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); }
	 * 
	 * }
	 */

	@SuppressWarnings("unused")

	public ResponseEntity<?> BmrLaydownMapping(BmrLaydownMappingResponse response, HttpServletRequest http) {

		try {

			BleachBmrLaydownMapping mapping = new BleachBmrLaydownMapping();

			BleachBmrGeneration updateBmrStatus;

			BleachLaydownGeneration updateLaydownStatus;

			mapping.setBmr_no(response.getBmrNo());

			mapping.setLaydown_no(response.getLaydownNo());

			mapping.setJob_order_no(response.getJoborderNo());

			mapping.setDepartment_id(response.getDepartmentId());

			mapping.setStatus(AppConstants.bmrOpen);

			Date date = new Date();

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

			String strDate = formatter.format(date);
			mapping.setStartDate(strDate);

			// Check and update BMR status

			updateBmrStatus = bleachingBmrGenerationRepository.getBMR(response.getBmrNo());

			if (updateBmrStatus != null) {

				updateBmrStatus.setSTATUS(AppConstants.bmrOpen);

			} else {

				return new ResponseEntity<>("BMR not found", HttpStatus.NOT_FOUND);

			}

			// Check and update Laydown status

			updateLaydownStatus = bleachLaydownGenerationRepository.getLaydown(response.getLaydownNo());

			if (updateLaydownStatus != null) {

				updateLaydownStatus.setStatus(AppConstants.bmrOpen);

			} else {

				return new ResponseEntity<>("Laydown not found", HttpStatus.NOT_FOUND);

			}

			// Save the updated statuses

			bleachingBmrGenerationRepository.save(updateBmrStatus);

			bleachLaydownGenerationRepository.save(updateLaydownStatus);

			// Save the mapping

			BleachBmrLaydownMappingRepository.save(mapping);

			return new ResponseEntity<>(mapping, HttpStatus.OK);

		} catch (Exception e) {

			return new ResponseEntity<>("Error Mapping: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}

	// CARDING START DATE

	public ResponseEntity<?> getCardingStartDate(String bmrNo) {

		BleachEquipmentUsageLogbookBlowroomAndCardingF34 cardingList;

		try {

			cardingList = cardingF34Repository.getByBmrNo(bmrNo);

			if (cardingList == null) {
				return new ResponseEntity<>("Carding not yet Submitted for this BMR !!! ", HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			log.error("Error while fetch Start Date for BMR");

			return new ResponseEntity<>("Error while fetch Start Date for BMR " + e.getMessage(),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity(cardingList, HttpStatus.OK);

	}

	public ResponseEntity<?> getLaydown(String MappingBmr_No) {

		try {

			List<BleachBmrLaydownMapping> getMappingDetails = BleachBmrLaydownMappingRepository
					.getLaydownNo(MappingBmr_No);

			if (getMappingDetails == null) {

				getMappingDetails = new ArrayList<BleachBmrLaydownMapping>();
			}

			return new ResponseEntity<>(getMappingDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Job Laydown no " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	public ResponseEntity<?> getBMR(String MappingBmr_No) {

		try {

			List<BleachBmrLaydownMapping> getMappingDetails = BleachBmrLaydownMappingRepository
					.getBMRNumber(MappingBmr_No);

			if (getMappingDetails == null) {

				getMappingDetails = new ArrayList<BleachBmrLaydownMapping>();
			}

			return new ResponseEntity<>(getMappingDetails, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Job Laydown no " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	public ResponseEntity<?> getCloseBMR() {

		List<BleachBmrGeneration> getMappingDetails = new ArrayList<>();

		List<LovResponse> lovResponse = new ArrayList<>();

		try {

			Long id = (long) 1;

			getMappingDetails = bleachingBmrGenerationRepository.listOfClosedBmrByDeptId();

			for (BleachBmrGeneration generation : getMappingDetails) {

				LovResponse response = new LovResponse();
				response.setId(id);
				response.setValue(generation.getBleach_bmr_no());
				response.setDescription(generation.getSTATUS());

				lovResponse.add(response);
				id++;

			}

			return new ResponseEntity<>(getMappingDetails, HttpStatus.OK);
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get closed BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get closed BMR" + msg), HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getBaleByBMR(String bmr_no) {

		List<String> baleList = new ArrayList<>();

		List<LovResponse> finalResponseList = new ArrayList<>();

		try {

			baleList = BleachBmrLaydownMappingRepository.fetchBaleFromBMR(bmr_no);

			if (baleList.isEmpty() || baleList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found"), HttpStatus.BAD_REQUEST);
			} else {
				Long id = (long) 1;
				for (String bale : baleList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(bale);
					response.setDescription(bale);

					finalResponseList.add(response);
					id++;
				}
			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Bale, Batch based BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Bale by BMR" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(finalResponseList, HttpStatus.OK);
	}

	public ResponseEntity<?> getBatchByBMR(String bmr_no) {

		List<BigDecimal> baleList = new ArrayList<>();

		List<LovResponse> finalResponseList = new ArrayList<>();

		try {

			baleList = BleachBmrLaydownMappingRepository.fetchBatchNoFromBMR(bmr_no);

			if (baleList.isEmpty() || baleList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found"), HttpStatus.BAD_REQUEST);
			} else {
				Long id = (long) 1;
				for (BigDecimal bale : baleList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(bale.toString());
					response.setDescription(bale.toString());

					finalResponseList.add(response);
					id++;
				}
			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Bale, Batch based BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Batch by BMR" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(finalResponseList, HttpStatus.OK);
	}

	public ResponseEntity<?> getBatchFromSAP() {

		List<BigDecimal> baleList = new ArrayList<>();

		List<LovResponse> finalResponseList = new ArrayList<>();

		try {

			baleList = BleachBmrLaydownMappingRepository.fetchBMRfromSAP2();

			if (baleList.isEmpty() || baleList == null) {

				return new ResponseEntity(new ApiResponse(false, "No Data Found"), HttpStatus.BAD_REQUEST);
			} else {
				Long id = (long) 1;
				for (BigDecimal bale : baleList) {

					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(bale.toString());
					response.setDescription(bale.toString());

					finalResponseList.add(response);
					id++;
				}
			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Bale, Batch based BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Batch by BMR" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(finalResponseList, HttpStatus.OK);
	}
	
	
		// CR - Batch Number format change with year
	
	public ResponseEntity<?> getBatchNumberwithYearFromSAP() {

		List<String> baleList = new ArrayList<>();

		List<LovResponse> finalResponseList = new ArrayList<>();

		try {

			baleList = BleachBmrLaydownMappingRepository.fetchBatchwithYear();

			if (baleList.isEmpty() || baleList == null) {

				return new ResponseEntity(new ApiResponse(false, "No Data Found"), HttpStatus.BAD_REQUEST);
			} else {
				Long id = (long) 1;
				for (String bale : baleList) {

					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(bale);
					response.setDescription(bale);

					finalResponseList.add(response);
					id++;
				}
			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Bale, Batch based BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Batch by BMR" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(finalResponseList, HttpStatus.OK);
	}
	
	
	
	public ResponseEntity<?> getBatchFromSAP1() {

		List<BigDecimal> baleList = new ArrayList<>();

		List<LovResponse> finalResponseList = new ArrayList<>();

		try {

			baleList = BleachBmrLaydownMappingRepository.fetchBMRfromSAP1();

			if (baleList.isEmpty() || baleList == null) {

				return new ResponseEntity(new ApiResponse(false, "No Data Found"), HttpStatus.BAD_REQUEST);
			} else {
				Long id = (long) 1;
				for (BigDecimal bale : baleList) {

					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(bale.toString());
					response.setDescription(bale.toString());

					finalResponseList.add(response);
					id++;
				}
			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Bale, Batch based BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Batch by BMR" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(finalResponseList, HttpStatus.OK);
	}

	public ResponseEntity<?> fetchBaleFromSAP() {
		
		List<String> baleList = new ArrayList<>();

		List<LovResponse> finalResponseList = new ArrayList<>();

		try {

			baleList = BleachBmrLaydownMappingRepository.fetchBalefromSAP();

			if (baleList.isEmpty() || baleList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found"), HttpStatus.BAD_REQUEST);
			} else {
				Long id = (long) 1;
				for (String bale : baleList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(bale);
					response.setDescription(bale);

					finalResponseList.add(response);
					id++;
				}
			}

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Bale, Batch based BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Bale by BMR" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(finalResponseList, HttpStatus.OK);
		
	}
	
//	public ResponseEntity<?> getBaleByBatch(Long batch_no) {
//		
//		List<String> baleList = new ArrayList<>();
//		
//		List<LovResponse> finalResponseList = new ArrayList<>();
//		
//		try {
//			
//			BigDecimal value = BigDecimal.valueOf(batch_no);
//			
//			baleList = BleachBmrLaydownMappingRepository.fetchBaleNoFromBatch(value);
//			
//			if(baleList.isEmpty() || baleList == null) {
//				return new ResponseEntity(new ApiResponse(false, "No Data Found"),
//						HttpStatus.BAD_REQUEST);
//			} else {
//				Long id = (long) 1;
//				for(String bale : baleList) {
//					LovResponse response = new LovResponse();
//					response.setId(id);
//					response.setValue(bale);
//					response.setDescription(bale);
//					
//					finalResponseList.add(response);
//					id++;
//				}
//			}
//			
//		} catch (Exception e) {
//			SCAUtil sca = new SCAUtil();
//			log.error("*** Unable to Get Bale, Bale based Batch *** " + e);
//			String msg = sca.getErrorMessage(e);
//			return new ResponseEntity(new ApiResponse(false, "Unable to Get Batch by BMR" + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//		return new ResponseEntity(finalResponseList, HttpStatus.OK);
//	}

	public ResponseEntity<?> getBaleByBatch(Long batch_no, String bmr_no) {
		List<String> baleList = new ArrayList<>();
		List<LovResponse> finalResponseList = new ArrayList<>();
		try {
			BigDecimal value = BigDecimal.valueOf(batch_no);
			baleList = BleachBmrLaydownMappingRepository.fetchBaleNoFromBatch(value, bmr_no);
			if (baleList.isEmpty() || baleList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found"), HttpStatus.BAD_REQUEST);
			} else {
				Long id = (long) 1;
				for (String bale : baleList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(bale);
					response.setDescription(bale);
					finalResponseList.add(response);
					id++;
				}
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Bale, Bale based Batch *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Batch by BMR" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(finalResponseList, HttpStatus.OK);
	}
	
	
		// FETCH BLEACHING DATA BY BAtch NUmber
	
	public ResponseEntity<?> fetchBleachingDataByBatchNumber(Long batchNumber) {
		
		List<IdAndValuePair> valuePairList = new ArrayList<IdAndValuePair>();
		
		try {
			
			Set<String> bmrNumber = BleachBmrLaydownMappingRepository.fetchBmrByBatchNumber(batchNumber);
			
			IdAndValuePair idValuePair = new IdAndValuePair();
			
			Long id = (long) 1;
			
			for(String bmr : bmrNumber) {
				
				idValuePair.setValue(bmr);
				idValuePair.setId(id);
				valuePairList.add(idValuePair);
				
				id++;
			}
			
			
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Bleaching data by Batch Number *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Bleaching data by Batch Number" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(valuePairList);
		
	}
	
	
	
	public ResponseEntity<?> getSpunBatch() {
		List<String> baleList = new ArrayList<>();
		List<LovResponse> finalResponseList = new ArrayList<>();
		try {
			
			baleList = BleachBmrLaydownMappingRepository.getBaleNo();
			if (baleList.isEmpty() || baleList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found"), HttpStatus.BAD_REQUEST);
			} else {
				Long id = (long) 1;
				for (String bale : baleList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(bale);
					response.setDescription(bale);
					finalResponseList.add(response);
					id++;
				}
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("***Unable to Get Spunlace-Bale*** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Spunlace-Bale" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(finalResponseList, HttpStatus.OK);
	}

	public ResponseEntity<?> bmrClosing(UpdateBMRResponse request, Principal principal, HttpServletRequest http) {

		List<Integer> fetchBatchNumbersfromSAP = new ArrayList<>();

		BleachBmrLaydownMapping bleachBMRMapping = new BleachBmrLaydownMapping();
		BleachBmrGeneration bmrGeneration = new BleachBmrGeneration();
		
		List<BmrSummary> chemicalMaterialList = new ArrayList<BmrSummary>();

		
		List<BleachLayDownCheckListF42> laydownChecklist = new ArrayList<BleachLayDownCheckListF42>();
		
		List<BleachAppliedContRawCottonF04> appliedRawCottonF04 = new ArrayList<BleachAppliedContRawCottonF04>();
		
		List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> cardingList = new ArrayList<BleachEquipmentUsageLogbookBlowroomAndCardingF34>();
		
		List<BleachEquipmentUsageLogBookCakePressF09> cakepressList = new ArrayList<BleachEquipmentUsageLogBookCakePressF09>();
		
		List<BleachJobCardF13> jobcardList = new ArrayList<BleachJobCardF13>();
		
		
		try {

			Date date = new Date();

			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

			fetchBatchNumbersfromSAP = BleachBmrLaydownMappingRepository.fetchBMRfromSAP();

			System.out.println("BMR No" + request.getBmrNo());
			
			chemicalMaterialList = bmrSummaryRepository.getSummaryByBMR(request.getBmrNo());
			
			laydownChecklist = laydownChecklistRepository.getLayDowndetailsByBMR(request.getBmrNo());
			
			appliedRawCottonF04 = appliedRawCottonF04Repository.appliedRawCottonByBMR(request.getBmrNo());
			
			cardingList = cardingF34Repository.cardingLogbookList(request.getBmrNo());
					
			cakepressList = cakePressF09Repository.getDetailsByBMR(request.getBmrNo());
			
			jobcardList = jobCardRepository.getBmrDetails(request.getBmrNo());
			
			if(chemicalMaterialList.isEmpty() || chemicalMaterialList == null) {
				return new ResponseEntity(new ApiResponse(false, "Chemical Material not yet submitted for Bmr " + request.getBmrNo()), HttpStatus.BAD_REQUEST);
			}

			if(laydownChecklist.isEmpty() || laydownChecklist == null) {
				return new ResponseEntity(new ApiResponse(false, "Laydown Checklist not yet submitted for Bmr " + request.getBmrNo()), HttpStatus.BAD_REQUEST);
			}
			
			if(appliedRawCottonF04.isEmpty() || appliedRawCottonF04 == null) {
				return new ResponseEntity(new ApiResponse(false, "Applied Raw Cotton Form 03 not yet submitted for Bmr " + request.getBmrNo()), HttpStatus.BAD_REQUEST);
			}
			
			if(cardingList.isEmpty() || cardingList == null) {
				return new ResponseEntity(new ApiResponse(false, "Carding not yet submitted for Bmr " + request.getBmrNo()), HttpStatus.BAD_REQUEST);
			}
			
			if(cakepressList.isEmpty() || cakepressList == null) {
				return new ResponseEntity(new ApiResponse(false, "Cakepress not yet submitted for Bmr " + request.getBmrNo()), HttpStatus.BAD_REQUEST);
			}
			
			if(jobcardList.isEmpty() || jobcardList == null) {
				return new ResponseEntity(new ApiResponse(false, "Job card not yet submitted for Bmr " + request.getBmrNo()), HttpStatus.BAD_REQUEST);
			}
			
			
			if(request.getBatchNos().isEmpty() || request.getBatchNos() == null)
			{
				return new ResponseEntity(new ApiResponse(false, " Please select the Batch No for closing Bmr " + request.getBmrNo()), HttpStatus.BAD_REQUEST);
				
			}
			
			try {
				
				
				
				int temp = BleachBmrLaydownMappingRepository.updateBmrNo(request.getBmrNo(), request.getBatchNos());
			} catch (Exception ex) {
				SCAUtil sca = new SCAUtil();
				log.error("*** Unable to Update BMR *** " + ex);
				String msg = sca.getErrorMessage(ex);
				return new ResponseEntity(new ApiResponse(false, "Unable to Update BMR" + msg), HttpStatus.BAD_REQUEST);
			}

			bleachBMRMapping = BleachBmrLaydownMappingRepository.getBMRNoResponse(request.getBmrNo());

			bleachBMRMapping.setStatus(AppConstants.bmrClosed);

			bmrGeneration = bmrNumberRepository.getBMR(request.getBmrNo());

			bmrGeneration.setSTATUS(AppConstants.bmrClosed);

			bleachBMRMapping.setEndDate(request.getEndDate());

		}

		catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Close BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Close BMR" + msg), HttpStatus.BAD_REQUEST);
		}

		BleachBmrLaydownMappingRepository.save(bleachBMRMapping);
		bmrNumberRepository.save(bmrGeneration);

		return new ResponseEntity("BMR Closed Successfully", HttpStatus.OK);
	}

	public ResponseEntity<?> tableRMData() {
		List<TableRMResponse> responseList = new ArrayList<>();
		try {

			SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

			responseList = BleachBmrLaydownMappingRepository.rmDataList();
			if (responseList.isEmpty() || responseList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found !!! "), HttpStatus.BAD_REQUEST);
			} else {
				String dateSAP;
				Date revisedDate;
				String revisedDateString;
				for (TableRMResponse date : responseList) {
					System.out.println("Response" + date);

					dateSAP = date.getDate();
					revisedDate = dateFormat.parse(dateSAP);
					revisedDateString = dateFormat.format(revisedDate);

					date.setDate(revisedDateString);

				}

			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(responseList, HttpStatus.OK);
	}

	public ResponseEntity<?> getRawCottonIssue(String laydown_no) {

		List<RawCottonIssueResponse> responseList = new ArrayList<>();

		List<BmrSummaryRawCottonResponse> rawCottonResponse = new ArrayList<>();
		BmrSummaryRawCottonResponse resps = new BmrSummaryRawCottonResponse();

		try {
			responseList = BleachBmrLaydownMappingRepository.rawCottonResponse(laydown_no);

			BigDecimal totalBaleCount = BigDecimal.ZERO;
			BigDecimal totalWeight = BigDecimal.ZERO;

//			for(RawCottonIssueResponse resp : responseList) {
//				
//				totalWeight = totalWeight.add(resp.getweight());
//	            totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(resp.getbalesCount()));
//			}

			Long balesCount = (long) 0;
			for (RawCottonIssueResponse resp : responseList) {
				balesCount = (resp.getbalesCount() != null) ? resp.getbalesCount() : 0;
				totalWeight = totalWeight.add(resp.getweight());
				totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(balesCount));
			}

			resps.setIssueResponse(responseList);
			resps.setTotalBales(totalBaleCount);
			resps.setTotalWeight(totalWeight);

			rawCottonResponse.add(resps);

			if (responseList.isEmpty() || responseList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found !!! "), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Raw Cotton Issue" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(rawCottonResponse, HttpStatus.OK);
	}

	public ResponseEntity<?> getRawCotton(String laydown_no) {

		List<RawCottonIssueResponse> responseList = new ArrayList<>();

		List<BmrSummaryRawCottonResponse> rawCottonResponse = new ArrayList<>();
		BmrSummaryRawCottonResponse resps = new BmrSummaryRawCottonResponse();

		try {
			responseList = BleachBmrLaydownMappingRepository.rawCottonResponseCakePress(laydown_no);

			BigDecimal totalBaleCount = BigDecimal.ZERO;
			BigDecimal totalWeight = BigDecimal.ZERO;

//			for(RawCottonIssueResponse resp : responseList) {
//				
//				totalWeight = totalWeight.add(resp.getweight());
//	            totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(resp.getbalesCount()));
//			}

			Long balesCount = (long) 0;
			for (RawCottonIssueResponse resp : responseList) {
				balesCount = (resp.getbalesCount() != null) ? resp.getbalesCount() : 0;
				totalWeight = totalWeight.add(resp.getweight());
				totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(balesCount));
			}

			resps.setIssueResponse(responseList);
			resps.setTotalBales(totalBaleCount);
			resps.setTotalWeight(totalWeight);

			rawCottonResponse.add(resps);

			if (responseList.isEmpty() || responseList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found !!! "), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Raw Cotton Issue" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(rawCottonResponse, HttpStatus.OK);
	}

	/**
	 * For Waste Bale Press - tblrejBale
	 */
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getWasteBalePress(String date) {
		List<BleachingWasteBaleResponse> wastePressResponseList = new ArrayList<>();
		try {
			wastePressResponseList = BleachBmrLaydownMappingRepository.wastePressBaleResponse(date);
			if (wastePressResponseList.isEmpty() || wastePressResponseList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found for this Date : " + date),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get Waste Bale *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Waste Bale " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(wastePressResponseList, HttpStatus.OK);
	}

	public ResponseEntity<?> getWasteBalePressSAP() {
		List<BleachingWasteBaleResponse> wastePressResponseList = new ArrayList<>();
		try {
			wastePressResponseList = BleachBmrLaydownMappingRepository.wastePressBaleResponsenew();
			if (wastePressResponseList.isEmpty() || wastePressResponseList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found for this Date : "),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get Waste Bale *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Waste Bale " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(wastePressResponseList, HttpStatus.OK);
	}

	/**
	 * FETCH HOD APPROVED RECORDS
	 */

	public ResponseEntity<?> fetchApprovedRecords(String name) {

		List<BleachEquipmentUsageLogBookF33> approvedWasteBaleRecords = new ArrayList<>();

		List<BleachMixingChangeMachineCleaningF38> approvedMixingRecords = new ArrayList<>();

		try {

			if (name.equalsIgnoreCase(AppConstants.F33a)) {
				approvedWasteBaleRecords = wasteBaleLogBookF33Repository.getHODApprovedRecords();

				return new ResponseEntity(approvedWasteBaleRecords, HttpStatus.OK);
			} else if (name.equals(AppConstants.F38)) {
				approvedMixingRecords = mixingCleaningF38Repository.getApprovedHODRecords();

				return new ResponseEntity(approvedMixingRecords, HttpStatus.OK);
			} else {
				return new ResponseEntity(new ApiResponse(false, "Unable to get Values "), HttpStatus.BAD_REQUEST);
			}

		}

		catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get Waste Bale *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Waste Bale " + msg),
					HttpStatus.BAD_REQUEST);
		}

	}

	/**
	 * TRACEABILITY
	 */

//	public ResponseEntity<?> bleachingTrace(String baleNo, String batchNo) {
//		
//		List<String> supplierList = new ArrayList<>();
//		List<String> phNumberList = new ArrayList<>();
//		String laydownNumber = "";
//		BigDecimal laydownWeight = BigDecimal.ZERO;
//		
//		BleachingTraceabilityResponse response = new BleachingTraceabilityResponse();
//		
//		List<BleachingTraceabilityResponse> responseList = new ArrayList<>();
//		
//		List<BmrSummary> packingDetailsList = new ArrayList<>();
//		
//		try {
//			
//			if(baleNo.equals(null) || "".equals(baleNo)) {
//				
//				if(!batchNo.equals(null)) {
//					
////					BleachingTraceabilityInterface traceabilityObj = BleachBmrLaydownMappingRepository.bleachTraceByBatch(batchNo);
////					laydownNumber = BleachBmrLaydownMappingRepository.getLaydownByBmr(traceabilityObj.getbmrNo());
////					
////					// GET SUPPLIER AND PH NUMBER
////					
////					supplierList = BleachBmrLaydownMappingRepository.getSupplierByLaydown(laydownNumber);
////					phNumberList = BleachBmrLaydownMappingRepository.getPHByLaydown(laydownNumber);
////					
////					laydownWeight = BleachBmrLaydownMappingRepository.laydownWeight(laydownNumber);
////					
////					response.setBaleNumber(traceabilityObj.getbaleNo());
////					response.setBatchNumber(traceabilityObj.getbatchNo());
////					response.setBmrNumber(traceabilityObj.getbmrNo());
////					response.setLaydownNumber(traceabilityObj.getlaydownNo());
////					response.setDate(traceabilityObj.getdateprod());
////					response.setOrderNumber(traceabilityObj.getorderNumber());
////					response.setWeight(laydownWeight);
////					response.setSupplier(supplierList);
////					response.setPhBatchNumber(phNumberList);
//					
//					List<BleachingTraceabilityInterface> traceabilityInterfaceList = BleachBmrLaydownMappingRepository.bleachTraceByBatch(batchNo);
//					
//					for(BleachingTraceabilityInterface trace : traceabilityInterfaceList) {
//						
//						laydownNumber = BleachBmrLaydownMappingRepository.getLaydownByBmr(trace.getbmrNo());
//						
//							// GET SUPPLIER AND PH NUMBER
//						
//						supplierList = BleachBmrLaydownMappingRepository.getSupplierByLaydown(laydownNumber);
//						phNumberList = BleachBmrLaydownMappingRepository.getPHByLaydown(laydownNumber);
////						
//						laydownWeight = BleachBmrLaydownMappingRepository.laydownWeight(laydownNumber);
////						
//						response.setBaleNumber(trace.getbaleNo());
//						response.setBatchNumber(trace.getbatchNo());
//						response.setBmrNumber(trace.getbmrNo());
//						response.setDate(trace.getdateprod());
//						response.setOrderNumber(trace.getorderNumber());
//						response.setWeight(laydownWeight);
//						response.setSupplier(supplierList);
//						response.setPhBatchNumber(phNumberList);
//						response.setLaydownNumber(laydownNumber);
//						
//						packingDetailsList = bmrSummaryRepository.getSummaryByBMR(trace.getbmrNo());
//						response.setSummaryBleach(packingDetailsList);
//						responseList.add(response);
//						
//						
//					}
//					
//					
//				} else {
//					return new ResponseEntity(new ApiResponse(false, "please provide Batch number or Bale Number for Traceability "),
//							HttpStatus.BAD_REQUEST);
//				}
//				
//			} else {
//				
////				BleachingTraceabilityInterface traceabilityObj = BleachBmrLaydownMappingRepository.bleachTraceByBale(baleNo);
////				laydownNumber = BleachBmrLaydownMappingRepository.getLaydownByBmr(traceabilityObj.getbmrNo());
////				
////				// GET SUPPLIER AND PH NUMBER
////				
////				supplierList = BleachBmrLaydownMappingRepository.getSupplierByLaydown(laydownNumber);
////				phNumberList = BleachBmrLaydownMappingRepository.getPHByLaydown(laydownNumber);
////				
////				laydownWeight = BleachBmrLaydownMappingRepository.laydownWeight(laydownNumber);
////				
////				
////				
////				response.setBaleNumber(traceabilityObj.getbaleNo());
////				response.setBatchNumber(traceabilityObj.getbatchNo());
////				response.setBmrNumber(traceabilityObj.getbmrNo());
////				response.setLaydownNumber(traceabilityObj.getlaydownNo());
////				response.setDate(traceabilityObj.getdateprod());
////				response.setOrderNumber(traceabilityObj.getorderNumber());
////				response.setWeight(laydownWeight);
////				response.setSupplier(supplierList);
////				response.setPhBatchNumber(phNumberList);
//				
//				List<BleachingTraceabilityInterface> traceabilityInterfaceList = BleachBmrLaydownMappingRepository.bleachTraceByBale(baleNo);
//				
//				for(BleachingTraceabilityInterface trace : traceabilityInterfaceList) {
//					
//					laydownNumber = BleachBmrLaydownMappingRepository.getLaydownByBmr(trace.getbmrNo());
//					
//					System.out.println("Laydown" + laydownNumber);
//					
//						// GET SUPPLIER AND PH NUMBER
//					
//					supplierList = BleachBmrLaydownMappingRepository.getSupplierByLaydown(laydownNumber);
//					phNumberList = BleachBmrLaydownMappingRepository.getPHByLaydown(laydownNumber);
////					
//					laydownWeight = BleachBmrLaydownMappingRepository.laydownWeight(laydownNumber);
////					
//					response.setBatchNumber(trace.getbatchNo());
//					response.setBatchNumber(trace.getbatchNo());
//					response.setBmrNumber(trace.getbmrNo());
//					response.setDate(trace.getdateprod());
//					response.setOrderNumber(trace.getorderNumber());
//					response.setWeight(laydownWeight);
//					response.setSupplier(supplierList);
//					response.setPhBatchNumber(phNumberList);
//					response.setLaydownNumber(laydownNumber);
//					
//					packingDetailsList = bmrSummaryRepository.getSummaryByBMR(trace.getbmrNo());
//					response.setSummaryBleach(packingDetailsList);
//					responseList.add(response);
//				}
//				
//			}
//			
//		} catch (Exception e) {
//			SCAUtil sca = new SCAUtil();
//			log.error("*** Unable to get Bleach Traceability *** " + e);
//			String msg = sca.getErrorMessage(e);
//			return new ResponseEntity(new ApiResponse(false, "Unable to get Bleach Trace " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//		
//		return new ResponseEntity(responseList, HttpStatus.OK);
//		
//	}

	public ResponseEntity<?> bleachingTraceability(String batchNo, String baleNo) {

		// VALIDATIONS

		Long batchNumber = null;
		if (batchNo != null && !batchNo.trim().isEmpty()) {

			batchNumber = Long.valueOf(batchNo);
		}

		if ((batchNo == null || "".equals(batchNo) || batchNo.trim().isEmpty())
				&& (baleNo == null || baleNo.trim().isEmpty())) {
			return new ResponseEntity<>(new ApiResponse(false, "Either batchNo or baleNo must be provided"),
					HttpStatus.BAD_REQUEST);
		}

		List<String> supplierList = new ArrayList<>();
		List<String> phNumberList = new ArrayList<>();
		String laydownNumber = "";
		BigDecimal laydownWeight = BigDecimal.ZERO;
		List<BmrSummary> packingDetailsList = new ArrayList<>();

		BleachingTraceabilityResponse response = new BleachingTraceabilityResponse();

		try {

			BleachingTraceabilityInterface respInterface = BleachBmrLaydownMappingRepository
					.bleachTraceInterface(baleNo, batchNumber);

			response.setBmrNumber(respInterface.getbmrNo());
			response.setOrderNumber(respInterface.getorderNumber());
			response.setBatchNumber(respInterface.getbatchNo());

			List<String> baleNumberList = new ArrayList<>();
			List<Date> dateList = new ArrayList<>();

			if (baleNo == null || baleNo.trim().isEmpty()) {

				baleNumberList = BleachBmrLaydownMappingRepository.getBatchNo(batchNo);
				dateList = BleachBmrLaydownMappingRepository.getPackingDate(batchNo);

				response.setBaleNumber(baleNumberList);
				response.setDate(dateList);
			} else {
				baleNumberList.add(baleNo);
				response.setBaleNumber(baleNumberList);

				dateList = BleachBmrLaydownMappingRepository.getPackingDateByBale(baleNo);
				response.setDate(dateList);
			}

			String batchW = BleachBmrLaydownMappingRepository.baleWeight(response.getBatchNumber());
			response.setBatchWeight(batchW);

			laydownNumber = BleachBmrLaydownMappingRepository.getLaydownByBmr(response.getBmrNumber());
			response.setLaydownNumber(laydownNumber);
			supplierList = BleachBmrLaydownMappingRepository.getSupplierByLaydown(laydownNumber);
			phNumberList = BleachBmrLaydownMappingRepository.getPHByLaydown(laydownNumber);
			laydownWeight = BleachBmrLaydownMappingRepository.laydownWeight(laydownNumber);

			response.setSupplier(supplierList);
			response.setPhBatchNumber(phNumberList);
			response.setWeight(laydownWeight);

			packingDetailsList = bmrSummaryRepository.getSummaryByBMR(response.getBmrNumber());
			response.setSummaryBleach(packingDetailsList);

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get Bleach Traceability *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to get Bleach Trace " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(response, HttpStatus.OK);

	}

	/**
	 * SPULANCE TRACEABILITY
	 */

	public ResponseEntity<?> spulanceTraceability(String rollNumber) {
		if (rollNumber == null || rollNumber.trim().isEmpty()) {
			return new ResponseEntity<>(new ApiResponse(false, "Roll Number must be provided"), HttpStatus.BAD_REQUEST);
		}

		List<Map<String, Object>> spulanceResponseList = new ArrayList<>();
		Map<String, Object> splResponseMap = new HashMap<>();
		Map<String, Object> splOrderList = new HashMap<>();

		List<SplBaleTraceResponse> orderResponse = new ArrayList<>();
		List<SplBaleTraceResponse> orderResponse1 = new ArrayList<>();

		List<Map<String, Object>> orderList = new ArrayList<>();
		List<String> phNumberList = new ArrayList<>();
		List<String> bmrNumberList = new ArrayList<>();
		List<BmrSummary> packingDetailsList = new ArrayList<>();
		List<List<BmrSummary>> details = new ArrayList<>();

		SplTraceResponse spulanceTrace = new SplTraceResponse();

		try {
			splResponseMap = BleachBmrLaydownMappingRepository.spulanceTraceByRoll(rollNumber);

			String orderNo = (String) splResponseMap.get("orderNo");
			Date date = (Date) splResponseMap.get("packdate");
			String brand = (String) splResponseMap.get("brand");
			BigDecimal shaft = (BigDecimal) splResponseMap.get("shaft");
			String pattern = (String) splResponseMap.get("pattern");
			String batchNumbers = (String) splResponseMap.get("batchNo");

			String shaftno = String.valueOf(shaft);

			// Convert BigDecimal to String
			String length1 = String.valueOf(splResponseMap.get("lengths"));
			String weight1 = String.valueOf(splResponseMap.get("weight"));

			// Format Date to String
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			String dateString = formatter.format(date);

			System.out.println("Order" + orderNo + "dsfgh" + date + "String" + dateString);

			splOrderList = BleachBmrLaydownMappingRepository.gsmByOrder(orderNo);

			String gsm = String.valueOf(splOrderList.get("gsm"));
			String material = (String) splOrderList.get("material");

			spulanceResponseList = BleachBmrLaydownMappingRepository.baleByOrder(orderNo, dateString);

			for (Map<String, Object> result : spulanceResponseList) {
				String baleNo = (String) result.get("bale");
				String wei = String.valueOf(result.get("netWeight"));

				SplBaleTraceResponse response = new SplBaleTraceResponse();
				response.setBaleNo(baleNo);
				response.setNetWeight(wei);
				response.setOrderNumber(orderNo);

				if (baleNo.startsWith("B")) {
					orderList = BleachBmrLaydownMappingRepository.fetchBatchByBale(baleNo);

					System.out.println("orderList" + orderList.size());

					for (Map<String, Object> temp : orderList) {
						String batchNo = String.valueOf(temp.get("batch"));
						String bmr = (String) temp.get("bmrNumber");

						response.setBmrNumber(bmr);
						response.setBatchNo(batchNo);

						System.out.println("lay" + response.getBatchNo());

						String laydownNumber = BleachBmrLaydownMappingRepository
								.getLaydownByBmr(response.getBmrNumber());

//						phNumberList = BleachBmrLaydownMappingRepository.getPHByLaydownDate(laydownNumber, dateString);
						phNumberList = BleachBmrLaydownMappingRepository.getPHByLaydownDate(laydownNumber);
						packingDetailsList = bmrSummaryRepository.getSummaryByBMR(response.getBmrNumber());

						response.setLaydownNumber(laydownNumber);
						response.setPhNumber(phNumberList);
						response.setSummaryDetails(packingDetailsList);
						orderResponse.add(response);
					}
				} else {
					orderResponse1.add(response);
				}
			}

			spulanceTrace.setBleachingData(orderResponse);
			spulanceTrace.setSpulanceData(orderResponse1);
			spulanceTrace.setRollNo(rollNumber);
			spulanceTrace.setDate(dateString);
			spulanceTrace.setOrderNo(orderNo);
			spulanceTrace.setShaftNo(shaftno);
			spulanceTrace.setMaterial(material);
			spulanceTrace.setBrand(brand);
			spulanceTrace.setNetWeight(weight1);
			spulanceTrace.setGsm(gsm);
			spulanceTrace.setPattern(pattern);
			spulanceTrace.setLength(length1);
			spulanceTrace.setBatchNo(batchNumbers);

		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get Spulance Traceability *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Spulance Traceability " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(spulanceTrace, HttpStatus.OK);
	}
	
	
	
			// FETCH NAME OF HAND SANITATION LIST
	
	public ResponseEntity<?> getHandSanitationByDepartment(Long department) {
		
		List<String> employeeList = new ArrayList<>();
		
		List<IdAndValuePair> handSanitationList = new ArrayList<>();
		
		try {
			
			if(department == 1) {
				employeeList = bleachingHandSanitationRepository.fetchBleachingIdNumbers();
			} else if(department == 2) {
				employeeList = spulanceHandSanitationRepository.getSpulanceIdNumbers();
			} else if(department == 3) {
				employeeList = punchingHandSanitationRepository.fetchBleachingIdNumbers();
			} else if(department == 4) {
				employeeList = goodsHandSanitationRepository.fetchBleachingIdNumbers();
			}
			
			Long id = (long) 1;
			
			for(String temp : employeeList) {
				
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(temp);
				value.setId(id);
				
				id++;
				
				handSanitationList.add(value);
			}
			
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get Hand Sanitation *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Hand Sanitation " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(handSanitationList, HttpStatus.OK);
		
	}
	
	// FETCH DISTINCT NAME
public ResponseEntity<?> getName() {
		
		List<String> employeeList = new ArrayList<>();
		
		List<IdAndValuePair> handSanitationList = new ArrayList<>();
		
		try {
			
				employeeList = punchingHandSanitationRepository.fetchName();
	
			Long id = (long) 1;
			
			for(String temp : employeeList) {
				
				IdAndValuePair value = new IdAndValuePair();
				value.setValue(temp);
				value.setId(id);
				
				id++;
				
				handSanitationList.add(value);
			}
			
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get Name *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get Name " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(handSanitationList, HttpStatus.OK);
		
	}	


		// GENERATED BMR DETAILS


	public ResponseEntity<?> generatedProductionDetailsByBmr(String bmrNumber) {
		
		List<BleachBmrGeneration> generationBmr = new ArrayList<BleachBmrGeneration>();
		
		try {
			
			generationBmr = bleachingBmrGenerationRepository.getBMRDetails(bmrNumber);
			
		} catch(Exception e) {
			
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get bmr number *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get bmr number " + msg),
					HttpStatus.BAD_REQUEST);
			
		}
		
		return ResponseEntity.ok(generationBmr);
		
	}


}
