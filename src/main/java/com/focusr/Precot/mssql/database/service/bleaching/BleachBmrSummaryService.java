package com.focusr.Precot.mssql.database.service.bleaching;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.system.ApplicationPid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.bleaching.BMRProcessDeviationRecord;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_MachineOpeartionParameters;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_ManufacturingSteps;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_ProcessDelayEqupment;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_ProcessDelayEqupmentLine;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_QualityRelease;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_Summary_Bleach;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrAnnexureDates;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrAnnexureList;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrCompletionTable;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrGeneration;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrLaydownMapping;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;
import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;
import com.focusr.Precot.mssql.database.model.bleaching.BmrManufacturingOperations;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummary;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryEnclosureList;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryProductionDetails;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryRecordVerification;
import com.focusr.Precot.mssql.database.model.bleaching.BmrSummaryVerification;
import com.focusr.Precot.mssql.database.model.bleaching.ChemicalDetails_BMR;
import com.focusr.Precot.mssql.database.model.bleaching.PackingDetails_BMR;
import com.focusr.Precot.mssql.database.repository.StoppageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BMRProcessDeviationRecordRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BMRSummaryBleachRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BMR_MachineOpeartionParametersRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BMR_ManufacturingStepsRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BMR_ProcessDelayEqupmentLineRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BMR_ProcessDelayEqupmentRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BMR_QualityReleaseRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContAbCottonF08Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContRawCottonF04Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrAnnexureRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrCompletionTableRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrLaydownMappingRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrSummaryRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContAbsBleachedCottonF18Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContRawCottonF05Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogBookCakePressF09Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachHouseKeepingCheckListF02Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachJobCard13Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachLayDownCheckListF42Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachMixingChangeMachineCleaningF38Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachShiftLogBookF36Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachingBmrGenerationRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BmrManufacturingOperationsRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BmrSummaryEnclosureListRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BmrSummaryProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BmrSummaryRecordVerificationRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BmrSummaryVerificationRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.ChemicalDetails_BMRRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.PackingDetails_BMRRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.BMRProductionDetailsResponse;
import com.focusr.Precot.payload.BMRProductionResponseLaydown;
import com.focusr.Precot.payload.BleachingProductionDetailsRequest;
import com.focusr.Precot.payload.BleachingProductionDetailsResponse;
import com.focusr.Precot.payload.BmrSummaryApprovalResponse;
import com.focusr.Precot.payload.BmrSummaryRawCottonResponse;
import com.focusr.Precot.payload.BmrSummaryShoppageDetails;
import com.focusr.Precot.payload.BmrSummaryVerificationRecordResponse;
import com.focusr.Precot.payload.GetStoppageDetailsResponse;
import com.focusr.Precot.payload.LovResponse;
import com.focusr.Precot.payload.ProductReconInterface;
import com.focusr.Precot.payload.RawCottonIssueResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;

@Service
public class BleachBmrSummaryService {

	Logger log = LoggerFactory.getLogger(BleachBmrSummaryService.class);

	@Autowired
	private BleachEquipmentUsageLogBookCakePressF09Repository bleachEquipmentUsageLogBookCakePressF09Repository;

	@Autowired
	private BmrSummaryProductionDetailsRepository productionDetailsRepository;

	@Autowired
	private BleachBmrSummaryRepository bleachSummaryRepository;

	@Autowired
	private BleachBmrLaydownMappingRepository bmrMappingRepository;

	@Autowired
	private BMR_ManufacturingStepsRepository bmr_ManufacturingStepsRepository;

	@Autowired
	private BmrManufacturingOperationsRepository bmrManufacturingOperationsRepository;

	@Autowired
	private BMRSummaryBleachRepository summaryBleachRepository;

	@Autowired
	private BmrSummaryRecordVerificationRepository recordVerificationRepository;

	@Autowired
	private BleachBmrCompletionTableRepository bleachBmrCompletionTableRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BMRProcessDeviationRecordRepository bmrprocessdeviationrecordrepository;

	@Autowired
	private BleachHouseKeepingCheckListF02Repository houseKeepingCheckilistRepository;
	@Autowired
	private BleachShiftLogBookF36Repository shiftLogBookRepository;
	@Autowired
	private BleachMixingChangeMachineCleaningF38Repository mixingChangeOverRepository;

	@Autowired
	private ChemicalDetails_BMRRepository chemicalDetails_BMRRepository;
	@Autowired
	private PackingDetails_BMRRepository packingDetails_BMRRepository;

	@Autowired
	private BMRProcessDeviationRecordRepository processDeviationRecordRepository;

	@Autowired
	private BleachBmrAnnexureRepository annexureRepository;

	@Autowired
	private StoppageDetailsRepository stoppageDetailsRepository;

	@Autowired
	private BleachingBmrGenerationRepository bmrGenerationRepository;

	@Autowired
	private BMR_QualityReleaseRepository bmrQualityReleaseRepository;

	@Autowired
	private BMR_MachineOpeartionParametersRepository bmrMachineOpeartionParametersRepository;

	@Autowired
	private BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository equipmentUsageLogbookBlowroomAndCardingF34Repository;

	@Autowired
	private BmrSummaryVerificationRepository bmrsummaryverificationrepository;

	@Autowired
	private BmrSummaryEnclosureListRepository bmrsummaryenclosurelistrepository;
	
	@Autowired
	private BleachEquipmentUsageLogBookCakePressF09Repository cakePressF09Repository;
	
	@Autowired
	private BleachLayDownCheckListF42Repository laydownChecklistRepository;

	@Autowired
	private BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository cardingRepository;
	
	@Autowired
	private BleachJobCard13Repository jobCardRepository;
	
	@Autowired
	UserImageDetailsRepository imageRepository;

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private BleachJobCard13Repository bleachjobcard13repository;

	@Autowired
	private BMR_ProcessDelayEqupmentRepository bmr_processdelayequpmentrepository;

	@Autowired
	private BMR_ProcessDelayEqupmentLineRepository bmr_processdelayequpmentlinerepository;
	
	@Autowired
	private BleachAppliedContRawCottonF04Repository appliedRawCottonRepository;

	@PersistenceContext
	private EntityManager entityManager;
	
	
	//Applied Contamination report 11 
	@Autowired
	private BleachContRawCottonF05Repository contRawCottonRepository;
	
	
	
//	Bleach contamination check list 12
	
	@Autowired
	private BleachContAbsBleachedCottonF18Repository bleachContAbsBleachedCottonF18Repository;
	
	
	
	
	@Autowired
	private BleachAppliedContAbCottonF08Repository bleachappliedcontabcottonf08repository;


	

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getBatchByBMR(String bmr_no) {
		List<String> batchNoList = new ArrayList<>();

		List<LovResponse> bmrBatchList = new ArrayList<>();

		try {

			batchNoList = bleachEquipmentUsageLogBookCakePressF09Repository.getBatchByBMR(bmr_no);

			Long id = (long) 1;

			for (String temp : batchNoList) {
				LovResponse response = new LovResponse();
				response.setId(id);
				response.setValue(temp);
				response.setDescription(bmr_no);

				bmrBatchList.add(response);
				id++;
			}

		} catch (Exception e) {

			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Batch based BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Batch by BMR" + msg),
					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(bmrBatchList, HttpStatus.OK);

	}

//

//	public ResponseEntity<?> createChemical_PackingDetails(BmrSummary summarPack, HttpServletRequest http) {
//		Long id = summarPack.getId();
//		try {
//			if(id == null) {
//				String value = "";
//				if(summarPack.getBmr_no() == null) {
//					value = "bmrNo";
//				} 
//				if(summarPack.getDate() == null) {
//					value = "date";
//				}
//				if(!"".equals(value)) {
//					return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value), HttpStatus.BAD_REQUEST);
//				}
//				
//				summarPack.setStatus("SAVE");
//				List<ChemicalDetails_BMR> chemicalList = summarPack.getChemicalDetails();
//				for(ChemicalDetails_BMR detail : chemicalList)
//				{
////				
//					User verifier = userRepository.getDetailsByUserName(detail.getVerifiedBy());
//					detail.setVerifierId(verifier.getId());
//					chemicalDetails_BMRRepository.save(detail);
//				}
//				summarPack.setChemicalDetails(chemicalList);
//				List<PackingDetails_BMR> packingList = summarPack.getPackingDetails();
//				for(PackingDetails_BMR detail : packingList)
//				{
//
//					User verifier = userRepository.getDetailsByUserName(detail.getVerifiedBy());
//					packingDetails_BMRRepository.save(detail);
//				}
//				summarPack.setPackingDetails(packingList);
//				bleachSummaryRepository.save(summarPack);
//			}
//
//		} catch(Exception ex) {
//			SCAUtil sca = new SCAUtil();
//			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
//			String msg = sca.getErrorMessage(ex);
//			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//		return new ResponseEntity(summarPack, HttpStatus.CREATED);
//	}	

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> createChemical_PackingDetails(BmrSummary summarPack, HttpServletRequest http) {
		Long id = summarPack.getId();
		try {
			if (id == null) {
				String value = "";
				if (summarPack.getBmr_no() == null) {
					value = "bmrNo";
				}
				if (summarPack.getDate() == null) {
					value = "date";
				}
				if (!"".equals(value)) {
					return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields: " + value),
							HttpStatus.BAD_REQUEST);
				}

			}

			summarPack.setStatus("SAVE");
			// Update chemical details
			List<ChemicalDetails_BMR> chemicalList = summarPack.getChemicalDetails();

			for (ChemicalDetails_BMR detail : chemicalList) {
				if (detail.getChemicalId() != null) {
					// Existing record, fetch it and update
					ChemicalDetails_BMR existingDetail = chemicalDetails_BMRRepository.findById(detail.getChemicalId())
							.orElse(null);
					if (existingDetail != null) {
						existingDetail.setChemicalName(detail.getChemicalName());
						existingDetail.setBatchNo(detail.getBatchNo());
						existingDetail.setQuantity(detail.getQuantity());
						existingDetail.setVerifiedBy(detail.getVerifiedBy());
//						existingDetail.setVerifierId(verifier.getId());
						// Update other fields as necessary
						chemicalDetails_BMRRepository.save(existingDetail);
					} else {
						// If no existing record is found, save as new
						User verifier = userRepository.getDetailsByUserName(detail.getVerifiedBy());
						detail.setVerifierId(verifier.getId());
						chemicalDetails_BMRRepository.save(detail);
					}
				} else {
					// New record
//					detail.setVerifierId(verifier.getId());
					chemicalDetails_BMRRepository.save(detail);
				}
			}
			summarPack.setChemicalDetails(chemicalList);

			// Update packing details
			List<PackingDetails_BMR> packingList = summarPack.getPackingDetails();
			for (PackingDetails_BMR detail : packingList) {
				if (detail.getPackingId() != null) {
					// Existing record, fetch it and update
					PackingDetails_BMR existingDetail = packingDetails_BMRRepository.findById(detail.getPackingId())
							.orElse(null);
					if (existingDetail != null) {
						existingDetail.setPackingName(detail.getPackingName());
						existingDetail.setBatchNo(detail.getBatchNo());
						existingDetail.setQuantity(detail.getQuantity());
						existingDetail.setVerifiedBy(detail.getVerifiedBy());
//						existingDetail.setVerifierId(verifier.getId());
						// Update other fields as necessary
						packingDetails_BMRRepository.save(existingDetail);
					} else {
						// If no existing record is found, save as new
//						detail.setVerifierId(verifier.getId());
						packingDetails_BMRRepository.save(detail);
					}
				} else {
					// New record
//					detail.setVerifierId(verifier.getId());
					packingDetails_BMRRepository.save(detail);
				}
			}
			summarPack.setPackingDetails(packingList);

			bleachSummaryRepository.save(summarPack);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(summarPack, HttpStatus.CREATED);
	}

	// SUBMIT

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> SubmitChemicals(BmrSummary summarPack, HttpServletRequest http) {
		Long id = summarPack.getId();
		try {
			if (id == null) {
				String value = "";
				if (summarPack.getBmr_no() == null) {
					value = "bmrNo";
				}
				if (summarPack.getDate() == null) {
					value = "date";
				}
				if (!"".equals(value)) {
					return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields: " + value),
							HttpStatus.BAD_REQUEST);
				}

			}

			summarPack.setStatus("SUBMIT");
			// Update chemical details
			List<ChemicalDetails_BMR> chemicalList = summarPack.getChemicalDetails();

			for (ChemicalDetails_BMR detail : chemicalList) {
				if (detail.getChemicalId() != null) {
					// Existing record, fetch it and update
					ChemicalDetails_BMR existingDetail = chemicalDetails_BMRRepository.findById(detail.getChemicalId())
							.orElse(null);
					if (existingDetail != null) {
						existingDetail.setChemicalName(detail.getChemicalName());
						existingDetail.setBatchNo(detail.getBatchNo());
						existingDetail.setQuantity(detail.getQuantity());
						existingDetail.setVerifiedBy(detail.getVerifiedBy());
						User verifier = userRepository.getDetailsByUserName(detail.getVerifiedBy());
						existingDetail.setVerifierId(verifier.getId());
						// Update other fields as necessary
						chemicalDetails_BMRRepository.save(existingDetail);
					} else {
						// If no existing record is found, save as new
						User verifier = userRepository.getDetailsByUserName(detail.getVerifiedBy());
						detail.setVerifierId(verifier.getId());
						chemicalDetails_BMRRepository.save(detail);
					}
				} else {
					// New record
					User verifier = userRepository.getDetailsByUserName(detail.getVerifiedBy());
					detail.setVerifierId(verifier.getId());
					chemicalDetails_BMRRepository.save(detail);
				}
			}
			summarPack.setChemicalDetails(chemicalList);

			// Update packing details
			List<PackingDetails_BMR> packingList = summarPack.getPackingDetails();
			for (PackingDetails_BMR detail : packingList) {
				if (detail.getPackingId() != null) {
					// Existing record, fetch it and update
					PackingDetails_BMR existingDetail = packingDetails_BMRRepository.findById(detail.getPackingId())
							.orElse(null);
					if (existingDetail != null) {
						existingDetail.setPackingName(detail.getPackingName());
						existingDetail.setBatchNo(detail.getBatchNo());
						existingDetail.setQuantity(detail.getQuantity());
						existingDetail.setVerifiedBy(detail.getVerifiedBy());
						User verifier = userRepository.getDetailsByUserName(detail.getVerifiedBy());
						existingDetail.setVerifierId(verifier.getId());
						// Update other fields as necessary
						packingDetails_BMRRepository.save(existingDetail);
					} else {
						// If no existing record is found, save as new
						User verifier = userRepository.getDetailsByUserName(detail.getVerifiedBy());
						detail.setVerifierId(verifier.getId());
						packingDetails_BMRRepository.save(detail);
					}
				} else {
					// New record
					User verifier = userRepository.getDetailsByUserName(detail.getVerifiedBy());
					detail.setVerifierId(verifier.getId());
					packingDetails_BMRRepository.save(detail);
				}
			}
			summarPack.setPackingDetails(packingList);

			bleachSummaryRepository.save(summarPack);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Save Chemical & Packing Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save " + msg), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(summarPack, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getChemicalDetailsByDateBMR(String bmr_no, String date) {
		List<BmrSummary> bmrSummaryDateList;
		try {
			bmrSummaryDateList = bleachSummaryRepository.getSummaryByDateAndBMR(date, bmr_no);
			if (bmrSummaryDateList == null || bmrSummaryDateList.isEmpty()) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found !!!"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Chemical & Packing Details by Date and BMR*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Chemical Details " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(bmrSummaryDateList, HttpStatus.OK);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getChemicalDetailsByBMR(String bmr_no) {
		List<BmrSummary> bmrSummaryDateList;
		try {

			bmrSummaryDateList = bleachSummaryRepository.getSummaryByBMR(bmr_no);
			if (bmrSummaryDateList == null || bmrSummaryDateList.isEmpty()) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found !!!"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Chemical & Packing Details by Date and BMR*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Chemical Details " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(bmrSummaryDateList, HttpStatus.OK);
	}

	// PRODUCTION DETAILS
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getProductionDetails(String bmr_no) {

		BleachingProductionDetailsResponse response = new BleachingProductionDetailsResponse();
		BMRProductionDetailsResponse productionResponseSAP;
		BMRProductionResponseLaydown productionResponseLaydown;
		BleachBmrLaydownMapping bmrLaydownMapping;

		try {

			BleachBmrLaydownMapping bmrGenerationObj = bmrMappingRepository.getBMRNoResponse(bmr_no);
			String order = bmrGenerationObj.getJob_order_no();

			System.out.println("Laydow" + order);

			String quantity = bmrMappingRepository.quantity(bmr_no);
			productionResponseSAP = bmrMappingRepository.productionDetailsResponse(bmr_no);
			productionResponseLaydown = bmrMappingRepository.productionResponseLaydown(order);

			System.out.println("prod" + productionResponseLaydown.getfinishing() + productionResponseLaydown.getmixing()
					+ productionResponseLaydown.getquantity());

			bmrLaydownMapping = bmrMappingRepository.getBMRNoResponse(bmr_no);

			System.out.println("Quantity" + quantity);

//			String startTime = bmrGenerationObj.getStartDate();

			String startTime = equipmentUsageLogbookBlowroomAndCardingF34Repository.equipmentStartDate(bmr_no);
			String endTime = bmrGenerationObj.getEndDate();

			System.out.println("Start" + startTime);

//			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
			DateTimeFormatter formatterObj = DateTimeFormatter.ISO_DATE_TIME;

			LocalDateTime startDateTime = LocalDateTime.parse(startTime, formatter);
			LocalDateTime endDateTime = LocalDateTime.parse(endTime, formatterObj);

			// Parse date and time
			LocalDate startLocalDate = startDateTime.toLocalDate();
			LocalDate endLocalDate = endDateTime.toLocalDate();

			LocalTime startLocalTime = startDateTime.toLocalTime();
			LocalTime endLocalTime = endDateTime.toLocalTime();

			// Define the formatter for formatting
			DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
			DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

			// Convert back to strings
			String startDateString = startLocalDate.format(dateFormatter);
			String endDateString = endLocalDate.format(dateFormatter);
			String startTimeString = startLocalTime.format(timeFormatter);
			String endTimeString = endLocalTime.format(timeFormatter);

			System.out.println("TTT");

//			productionDetailsList = null;
			response.setBmr_no(bmr_no);
			response.setBatchNo(bmr_no);
			response.setBaleCount(productionResponseSAP.getbaleCount());
			response.setBatchCount(productionResponseSAP.getbatchCount());
			response.setStartSubBatch(productionResponseSAP.getstartSubBatch());
			response.setEndSubBatch(productionResponseSAP.getendSubBatch());
			response.setIsExport(productionResponseSAP.getisExport());
			response.setIsHouse(productionResponseSAP.getisHouse());
			response.setLaydown_no(bmrLaydownMapping.getLaydown_no());

			System.out.println("HH");

			response.setBatchQuantity(quantity);

			System.out.println("resp" + response);

			response.setMixing(productionResponseLaydown.getmixing());
			response.setFinishing(productionResponseLaydown.getfinishing());
			response.setSupply(productionResponseSAP.getisExport());

			System.out.println("resp" + response.getMixing() + response.getSupply());

			response.setStartDate(startDateString);
			response.setEndDate(endDateString);
			response.setStartTime(startTimeString);
			response.setEndTime(endTimeString);

			System.out.println("E" + response.getEndDate());

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Production Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Production Details for BMR: " + bmr_no),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(response, HttpStatus.OK);

	}

	// SUBMIT PROUCTION DETAILS STEPS
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> submitProductionDetails(BmrSummaryProductionDetails bmrSummaryProductionDetails) {

		SCAUtil sca = new SCAUtil();
		
		String userRole = getUserRole();
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {

			String value = "";

			if (bmrSummaryProductionDetails.getStartSubBatch() == null) {
				value = "startSubBatch";
			}
			
			if(userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {
				
				bmrSummaryProductionDetails.setStatus(AppConstants.supervisorApprovedStatus);
				bmrSummaryProductionDetails.setSupervisiorStatus(AppConstants.supervisorApprovedStatus);
				productionDetailsRepository.save(bmrSummaryProductionDetails);
				
			} else if(userRole.equals("ROLE_QA")) {
				bmrSummaryProductionDetails.setStatus(AppConstants.qaApprovedStatus);
				bmrSummaryProductionDetails.setQaStatus(AppConstants.qaApprovedStatus);
				productionDetailsRepository.save(bmrSummaryProductionDetails);
			}
			else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to Submit production details"), HttpStatus.BAD_REQUEST);
			}


		} catch (Exception ex) {
			
			log.error("*** Unable to Submit Production Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Production Details for BMR: "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(bmrSummaryProductionDetails, HttpStatus.OK);

	}
	
	
	public ResponseEntity<?> saveProductionDetails(BmrSummaryProductionDetails bmrSummaryProductionDetails, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {

			String value = "";

			if (bmrSummaryProductionDetails.getStartSubBatch() == null) {
				value = "startSubBatch";
			}
			
			if(userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_HOD") || userRole.equals("ROLE_DESIGNEE")) {
				
				bmrSummaryProductionDetails.setStatus(AppConstants.supervisorSave);
				bmrSummaryProductionDetails.setSupervisiorStatus(AppConstants.supervisorSave);
				productionDetailsRepository.save(bmrSummaryProductionDetails);
				
			} else if(userRole.equals("ROLE_QA")) {
				bmrSummaryProductionDetails.setStatus(AppConstants.qaSave);
				bmrSummaryProductionDetails.setQaStatus(AppConstants.qaSave);
				productionDetailsRepository.save(bmrSummaryProductionDetails);
			}
			else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to save production details"), HttpStatus.BAD_REQUEST);
			}


		} catch (Exception ex) {
			
			log.error("*** Unable to Save Production Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Save Production Details for BMR: "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(bmrSummaryProductionDetails, HttpStatus.OK);

	}
	

	// GET PROUCTION DETAILS STEPS
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getProductionStepsByBMR(String bmr_no) {

		List<BmrSummaryProductionDetails> productDetails = new ArrayList<>();
		try {

			productDetails = productionDetailsRepository.productionDetailsBMR(bmr_no);

			if (productDetails.isEmpty() || productDetails == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found for BMR: " + bmr_no),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get PROUCTION Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get PROUCTION Details for BMR: "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(productDetails, HttpStatus.OK);
	}

	// SUBMIT MANUFATURER STEPS

	// SAVE MANUFATURER STEPS

	public ResponseEntity<?> saveManufacturerSteps(BMR_ManufacturingSteps bmrManufacturingSteps,
			HttpServletRequest http) {

		Long id = bmrManufacturingSteps.getManufacturingId();
		BMR_ManufacturingSteps checkObj = new BMR_ManufacturingSteps();

		try {
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {
				checkObj = bmr_ManufacturingStepsRepository.getRecordDetails(id);
			} else {
				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity<>(new ApiResponse(false, role + " cannot submit new details"),
							HttpStatus.BAD_REQUEST);
				}
			}

			String[] ignoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
					"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
					"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by", "qa_save_id",
					"qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
					"supervisor_signature_image", "qa_signature_image", "form_no" };

			BeanUtils.copyProperties(bmrManufacturingSteps, checkObj, ignoreProps);

			if (role.equals("ROLE_SUPERVISOR")) {
				BleachBmrCompletionTable bmrCompletionTable2 = bleachBmrCompletionTableRepository
						.getVerificationRecordForBMR(bmrManufacturingSteps.getBmr_no());

				if (bmrManufacturingSteps.getKey().equals("VERIFICATION")) {
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorSave);
				}

				bmr_ManufacturingStepsRepository.save(checkObj);

				if (checkObj.getManufacturingOperations() != null && !checkObj.getManufacturingOperations().isEmpty()) {
					for (BmrManufacturingOperations summary : checkObj.getManufacturingOperations()) {
						Long summaryId = summary.getOperationId();
						BmrManufacturingOperations summaryObj = (summaryId != null)
								? bmrManufacturingOperationsRepository.getRecordDetails(summaryId)
								: new BmrManufacturingOperations();

						summaryObj.setOperation(summary.getOperation());
						summaryObj.setObservation1(summary.getObservation1());
						summaryObj.setObservation2(summary.getObservation2());
						summaryObj.setPerformBy(summary.getPerformBy());
						summaryObj.setCleanedBy(summary.getCleanedBy());
						summaryObj.setDate1(summary.getDate1());
						summaryObj.setDate2(summary.getDate2());
						summaryObj.setManufacturingId(checkObj.getManufacturingId());

//									summaryObj.seterformBy("RECORD_VERIFICATION_DONE");
//									summaryObj.setSupervisiorSubmittedOn(date);

						bmrManufacturingOperationsRepository.save(summaryObj);
					}
				}

				if (bmrCompletionTable2 == null) {
					bmrCompletionTable2 = new BleachBmrCompletionTable();
					bmrCompletionTable2.setBmrNo(bmrManufacturingSteps.getBmr_no());
					bmrCompletionTable2.setForm("VERIFICATION OF RECORDS");
					bleachBmrCompletionTableRepository.save(bmrCompletionTable2);
				}

			} else if (role.equals("ROLE_QA")) {
				if (checkObj.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {
					checkObj.setQa_submit_by(userName);
					checkObj.setQa_submit_on(date);
					checkObj.setQa_submit_id(userId);
					checkObj.setQa_status(AppConstants.qaApprovedStatus);

					bmr_ManufacturingStepsRepository.save(checkObj);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("***  Unable to Submit Manufacturing step details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Manufacturing step details For BMR."),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(checkObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> submitManufacturerSteps(BMR_ManufacturingSteps bmrManufacturingSteps,

			HttpServletRequest http) {

		Long id = bmrManufacturingSteps.getManufacturingId();

		BMR_ManufacturingSteps checkObj = new BMR_ManufacturingSteps();

		try {

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = bmr_ManufacturingStepsRepository.getRecordDetails(id);

			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {

					return new ResponseEntity<>(new ApiResponse(false, role + " cannot submit new details"),

							HttpStatus.BAD_REQUEST);

				}

			}

			String[] ignoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
					"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
					"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by", "qa_save_id",
					"qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
					"supervisor_signature_image", "qa_signature_image", "form_no" };

			BeanUtils.copyProperties(bmrManufacturingSteps, checkObj, ignoreProps);

			if (role.equals("ROLE_SUPERVISOR")) {

				BleachBmrCompletionTable bmrCompletionTable2 = bleachBmrCompletionTableRepository

						.getVerificationRecordForBMR(bmrManufacturingSteps.getBmr_no());

				if (bmrManufacturingSteps.getKey().equals("VERIFICATION")) {

					checkObj.setSupervisor_submit_by(userName);

					checkObj.setSupervisor_submit_on(date);

					checkObj.setSupervisor_submit_id(userId);

					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				}

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				bmr_ManufacturingStepsRepository.save(checkObj);

				if (checkObj.getManufacturingOperations() != null && !checkObj.getManufacturingOperations().isEmpty()) {

					for (BmrManufacturingOperations summary : checkObj.getManufacturingOperations()) {

						Long summaryId = summary.getOperationId();

						BmrManufacturingOperations summaryObj = (summaryId != null)

								? bmrManufacturingOperationsRepository.getRecordDetails(summaryId)

								: new BmrManufacturingOperations();

						summaryObj.setOperation(summary.getOperation());
						summaryObj.setObservation1(summary.getObservation1());
						summaryObj.setObservation2(summary.getObservation2());
						summaryObj.setPerformBy(summary.getPerformBy());
						summaryObj.setCleanedBy(summary.getCleanedBy());
						summaryObj.setDate1(summary.getDate1());
						summaryObj.setDate2(summary.getDate2());
						summaryObj.setManufacturingId(checkObj.getManufacturingId());

//									summaryObj.seterformBy("RECORD_VERIFICATION_DONE");
//									summaryObj.setSupervisiorSubmittedOn(date);

						bmrManufacturingOperationsRepository.save(summaryObj);

					}

				}

				if (bmrCompletionTable2 == null) {

					bmrCompletionTable2 = new BleachBmrCompletionTable();

					bmrCompletionTable2.setBmrNo(bmrManufacturingSteps.getBmr_no());

					bmrCompletionTable2.setForm("VERIFICATION OF RECORDS");

					bleachBmrCompletionTableRepository.save(bmrCompletionTable2);

				}

			} else if (role.equals("ROLE_QA")) {

				if (checkObj.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {

					checkObj.setQa_submit_by(userName);

					checkObj.setQa_submit_on(date);

					checkObj.setQa_submit_id(userId);

					checkObj.setQa_status(AppConstants.qaApprovedStatus);

					Optional<UserImageDetails> imageDetailsOpt = imageRepository

							.fetchItemDetailsByUsername(userName);

					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

					checkObj.setQa_signature_image(signature);

					bmr_ManufacturingStepsRepository.save(checkObj);

				} else {

					return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);

				}

			}

		} catch (Exception ex) {

			SCAUtil sca = new SCAUtil();

			log.error("***  Unable to Submit Manufacturing step details For BMR *** " + ex);

			String msg = sca.getErrorMessage(ex);

			return new ResponseEntity<>(

					new ApiResponse(false, "Unable to Submit Manufacturing step details For BMR."),

					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity<>(checkObj, HttpStatus.CREATED);

	}

//	public ResponseEntity<?> submitManufacturerSteps(BMR_ManufacturingSteps bmrManufacturingSteps) {
//
//		try {
//
//			bmr_ManufacturingStepsRepository.save(bmrManufacturingSteps);
//			
//			BleachBmrCompletionTable bmrCompletionTable = new BleachBmrCompletionTable();
//			bmrCompletionTable.setBmrNo(bmrManufacturingSteps.getBmr_no());
//			bmrCompletionTable.setForm("MANUFACTURING STEPS");
//			
//			bleachBmrCompletionTableRepository.save(bmrCompletionTable);
//
//		} catch (Exception ex) {
//			SCAUtil sca = new SCAUtil();
//			log.error("*** Unable to Submit Manufacturing Details For BMR *** " + ex);
//			String msg = sca.getErrorMessage(ex);
//			return new ResponseEntity(new ApiResponse(false, "Unable to Submit Manufacture Details for BMR: "),
//					HttpStatus.BAD_REQUEST);
//		}
//		return new ResponseEntity(bmrManufacturingSteps, HttpStatus.CREATED);
//
//	}

	// GET MANUFACTURER STEPS
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getManufacturerStepsByBMR(String bmr_no) {

		List<BMR_ManufacturingSteps> manufacturingStepsList = new ArrayList<>();
		try {

			manufacturingStepsList = bmr_ManufacturingStepsRepository.manufactureStepsBMR(bmr_no);

			if (manufacturingStepsList.isEmpty() || manufacturingStepsList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found for BMR: " + bmr_no),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Manufacturing Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Manufacture Details for BMR:" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(manufacturingStepsList, HttpStatus.OK);
	}

	// GET MACHINE OPERATIONS BY BMR
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getMachineOperationsByBMR(String bmr_no) {

		List<BMR_Summary_Bleach> manufacturingStepsList = new ArrayList<>();
		try {

			manufacturingStepsList = summaryBleachRepository.getBMRSummaryByBMR(bmr_no);

			if (manufacturingStepsList.isEmpty() || manufacturingStepsList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found for BMR: " + bmr_no),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Machine Operation Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Machine Operation Details for BMR:" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(manufacturingStepsList, HttpStatus.OK);
	}

	// SAVE RECORD VERIFICATION
	public ResponseEntity<?> saveMachineOperations(BMR_Summary_Bleach summary_Bleach, HttpServletRequest http) {

		Long id = summary_Bleach.getSummaryId();
		BMR_Summary_Bleach checkObj = new BMR_Summary_Bleach();

		try {
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {
				checkObj = summaryBleachRepository.findSummaryBleachById(id);
			} 

			String[] ignoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
					"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
					"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by", "qa_save_id",
					"qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
					"supervisor_signature_image", "qa_signature_image", "form_no" };

			BeanUtils.copyProperties(summary_Bleach, checkObj, ignoreProps);

			if (role.equals("ROLE_SUPERVISOR") || role.equals("QA_MANAGER") || role.equals("QA_DESIGNEE")) {
				BleachBmrCompletionTable bmrCompletionTable2 = bleachBmrCompletionTableRepository
						.getVerificationRecordForBMR(summary_Bleach.getBmrNo());

				if (summary_Bleach.getKey().equals("VERIFICATION")) {
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorSave);
				}

				summaryBleachRepository.save(checkObj);

				if (checkObj.getQualityRelease() != null && !checkObj.getQualityRelease().isEmpty() && !summary_Bleach.getKey().equals("VERIFICATION")) {
					for (BMR_QualityRelease summary : checkObj.getQualityRelease()) {
						Long summaryId = summary.getQualityId();
						BMR_QualityRelease summaryObj = (summaryId != null)
								? bmrQualityReleaseRepository.getRecordDetails(summaryId)
								: new BMR_QualityRelease();

						summaryObj.setDescription(summary.getDescription());
						summaryObj.setStatus1(summary.getStatus1());
						summaryObj.setStatus2(summary.getStatus2());
						summaryObj.setSignature(summary.getSignature());
						summaryObj.setSignatureId(summary.getSignatureId());
						summaryObj.setDate(summary.getDate());
						summaryObj.setSummaryId(checkObj.getSummaryId());
						
						

						bmrQualityReleaseRepository.save(summaryObj);
					}
				}

				if (checkObj.getOperations() != null && !checkObj.getOperations().isEmpty()) {
					for (BMR_MachineOpeartionParameters enclosure : checkObj.getOperations()) {
						Long enclosureId = enclosure.getMachineOperationId();
						BMR_MachineOpeartionParameters enclosureObj = (enclosureId != null)
								? bmrMachineOpeartionParametersRepository.getRecordDetails(enclosureId)
								: new BMR_MachineOpeartionParameters();

						enclosureObj.setDescription(enclosure.getDescription());
						enclosureObj.setStdRange(enclosure.getStdRange());
						enclosureObj.setObservation1(enclosure.getObservation1());
						enclosureObj.setObservation2(enclosure.getObservation2());
						enclosureObj.setSummaryId(checkObj.getSummaryId());

						bmrMachineOpeartionParametersRepository.save(enclosureObj);
					}
				}

				if (bmrCompletionTable2 == null) {
					bmrCompletionTable2 = new BleachBmrCompletionTable();
					bmrCompletionTable2.setBmrNo(summary_Bleach.getBmrNo());
					bmrCompletionTable2.setForm("VERIFICATION OF RECORDS");
					bleachBmrCompletionTableRepository.save(bmrCompletionTable2);
				}

			} else if (role.equals("ROLE_QA") || role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("QA_DESIGNEE") || role.equalsIgnoreCase("QA_INSPECTOR")) {
//				if (checkObj.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {} else {
//					return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//				}
				checkObj.setQa_submit_by(userName);
				checkObj.setQa_submit_on(date);
				checkObj.setQa_submit_id(userId);
				checkObj.setQa_status(AppConstants.qaApprovedStatus);

				
				if(!checkObj.getQualityRelease().isEmpty() || checkObj.getQualityRelease() != null) {
					
					for(BMR_QualityRelease qualityRelease : checkObj.getQualityRelease()) {
						qualityRelease.setStatus(AppConstants.qaSave);
						
//						bmrQualityReleaseRepository.save(qualityRelease);
						
					}
					
				}
				
				
				summaryBleachRepository.save(checkObj);
			
				
			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("***  Unable to Submit Machine Operation Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Save Machine Operation Details For BMR" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(checkObj, HttpStatus.CREATED);
	}
	
	
	
		// Machine Operations Save 
	
	
	public ResponseEntity<?> machineOperationsQualitySaveForm(BMR_Summary_Bleach summaryOperationBleach, HttpServletRequest http) {
		
		Long id = summaryOperationBleach.getSummaryId();
		BMR_Summary_Bleach checkObj = new BMR_Summary_Bleach();
		
		try {
			
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {
				checkObj = summaryBleachRepository.findSummaryBleachById(id);
			} 
			
			String[] ignoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
					"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
					"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by", "qa_save_id",
					"qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
					"supervisor_signature_image", "qa_signature_image", "form_no" };

			BeanUtils.copyProperties(summaryOperationBleach, checkObj, ignoreProps);
			
			if(summaryOperationBleach.getKey().equalsIgnoreCase("VERIFICATION")) {
				
				// For Manufacturing Operations
				
				if(role.equalsIgnoreCase("ROLE_SUPERVISOR")) {
					
					BleachBmrCompletionTable bmrCompletionTable2 = null;
					
					if(id != null) {
						bmrCompletionTable2 = bleachBmrCompletionTableRepository
								.getVerificationRecordForBMR(summaryOperationBleach.getBmrNo());
					}
					
					
					if (summaryOperationBleach.getKey().equals("VERIFICATION")) {
						checkObj.setSupervisor_submit_by(userName);
						checkObj.setSupervisor_submit_on(date);
						checkObj.setSupervisor_submit_id(userId);
						checkObj.setSupervisor_status(AppConstants.supervisorSave);
					}

					summaryBleachRepository.save(checkObj);
					
					
					if (checkObj.getOperations() != null && !checkObj.getOperations().isEmpty()) {
						for (BMR_MachineOpeartionParameters enclosure : checkObj.getOperations()) {
							Long enclosureId = enclosure.getMachineOperationId();
							BMR_MachineOpeartionParameters enclosureObj = (enclosureId != null)
									? bmrMachineOpeartionParametersRepository.getRecordDetails(enclosureId)
									: new BMR_MachineOpeartionParameters();

							enclosureObj.setDescription(enclosure.getDescription());
							enclosureObj.setStdRange(enclosure.getStdRange());
							enclosureObj.setObservation1(enclosure.getObservation1());
							enclosureObj.setObservation2(enclosure.getObservation2());
							enclosureObj.setSummaryId(checkObj.getSummaryId());

							bmrMachineOpeartionParametersRepository.save(enclosureObj);
						}
					}
					
					if (bmrCompletionTable2 == null) {
						bmrCompletionTable2 = new BleachBmrCompletionTable();
						bmrCompletionTable2.setBmrNo(summaryOperationBleach.getBmrNo());
						bmrCompletionTable2.setForm("VERIFICATION OF RECORDS");
						bleachBmrCompletionTableRepository.save(bmrCompletionTable2);
					}
					
				} else if (role.equalsIgnoreCase("ROLE_QA") || role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("QA_DESIGNEE")) {
					
					checkObj.setQa_submit_by(userName);
					checkObj.setQa_submit_on(date);
					checkObj.setQa_submit_id(userId);
					checkObj.setQa_status(AppConstants.qaApprovedStatus);
					
					summaryBleachRepository.save(checkObj);
					
				} else {
					return new ResponseEntity(new ApiResponse(false, role + " cannot save machine operations for bmr"), HttpStatus.BAD_REQUEST);
				}
				
			} else {
				
				// For Quality Release
				
				if(role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("QA_DESIGNEE")) {
					
					if (checkObj.getQualityRelease() != null && !checkObj.getQualityRelease().isEmpty()) {
						for (BMR_QualityRelease summary : checkObj.getQualityRelease()) {
							Long summaryId = summary.getQualityId();
							BMR_QualityRelease summaryObj = (summaryId != null)
									? bmrQualityReleaseRepository.getRecordDetails(summaryId)
									: new BMR_QualityRelease();

							summaryObj.setDescription(summary.getDescription());
							summaryObj.setStatus1(summary.getStatus1());
							summaryObj.setStatus2(summary.getStatus2());
							summaryObj.setSignature(summary.getSignature());
							summaryObj.setSignatureId(summary.getSignatureId());
							summaryObj.setDate(summary.getDate());
							summaryObj.setSummaryId(checkObj.getSummaryId());
							
							summaryObj.setStatus(AppConstants.qaSave);

							bmrQualityReleaseRepository.save(summaryObj);
						}
					}
					
				}
				
			}
			
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("***  Unable to Save Machine Operation Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Save Machine Operation Details For BMR" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(checkObj, HttpStatus.CREATED);
		
	}
	
	
	
	// SUBMIT MACHINE OPERATIONS

	public ResponseEntity<?> submitMachineOperations(BMR_Summary_Bleach summary_Bleach, HttpServletRequest http) {

		Long id = summary_Bleach.getSummaryId();

		BMR_Summary_Bleach checkObj = new BMR_Summary_Bleach();

		try {

			LocalDateTime currentDate = LocalDateTime.now();

			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);

			String userName = userRepository.getUserName(userId);

			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {

				checkObj = summaryBleachRepository.findSummaryBleachById(id);

			} else {

				if (!role.equals("ROLE_SUPERVISOR")) {

					return new ResponseEntity<>(new ApiResponse(false, role + " cannot submit new details"),

							HttpStatus.BAD_REQUEST);

				}

			}

			String[] ignoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
					"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
					"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by", "qa_save_id",
					"qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
					"supervisor_signature_image", "qa_signature_image", "form_no" };

			BeanUtils.copyProperties(summary_Bleach, checkObj, ignoreProps);

			if (role.equals("ROLE_SUPERVISOR")) {

				BleachBmrCompletionTable bmrCompletionTable2 = bleachBmrCompletionTableRepository

						.getVerificationRecordForBMR(summary_Bleach.getBmrNo());

				if (summary_Bleach.getKey().equals("VERIFICATION")) {

					checkObj.setSupervisor_submit_by(userName);

					checkObj.setSupervisor_submit_on(date);

					checkObj.setSupervisor_submit_id(userId);

					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);

				}

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setSupervisor_signature_image(signature);

				summaryBleachRepository.save(checkObj);

				if (checkObj.getQualityRelease() != null && !checkObj.getQualityRelease().isEmpty()) {

					for (BMR_QualityRelease summary : checkObj.getQualityRelease()) {

						Long summaryId = summary.getQualityId();

						BMR_QualityRelease summaryObj = (summaryId != null)

								? bmrQualityReleaseRepository.getRecordDetails(summaryId)

								: new BMR_QualityRelease();

						summaryObj.setDescription(summary.getDescription());
						summaryObj.setStatus1(summary.getStatus1());
						summaryObj.setStatus2(summary.getStatus2());
						summaryObj.setSignature(summary.getSignature());
						summaryObj.setSignatureId(summary.getSignatureId());
						summaryObj.setDate(summary.getDate());
						summaryObj.setSummaryId(checkObj.getSummaryId());

						bmrQualityReleaseRepository.save(summaryObj);

					}

				}

				if (checkObj.getOperations() != null && !checkObj.getOperations().isEmpty()) {

					for (BMR_MachineOpeartionParameters enclosure : checkObj.getOperations()) {

						Long enclosureId = enclosure.getMachineOperationId();

						BMR_MachineOpeartionParameters enclosureObj = (enclosureId != null)

								? bmrMachineOpeartionParametersRepository.getRecordDetails(enclosureId)

								: new BMR_MachineOpeartionParameters();

						enclosureObj.setDescription(enclosure.getDescription());
						enclosureObj.setStdRange(enclosure.getStdRange());
						enclosureObj.setObservation1(enclosure.getObservation1());
						enclosureObj.setObservation2(enclosure.getObservation2());
						enclosureObj.setSummaryId(checkObj.getSummaryId());

						bmrMachineOpeartionParametersRepository.save(enclosureObj);

					}

				}

				if (bmrCompletionTable2 == null) {

					bmrCompletionTable2 = new BleachBmrCompletionTable();

					bmrCompletionTable2.setBmrNo(summary_Bleach.getBmrNo());

					bmrCompletionTable2.setForm("VERIFICATION OF RECORDS");

					bleachBmrCompletionTableRepository.save(bmrCompletionTable2);

				}

			} else if (role.equals("ROLE_QA") || role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("QA_DESIGNEE") || role.equalsIgnoreCase("QA_INSPECTOR")) {

				checkObj.setQa_submit_by(userName);

				checkObj.setQa_submit_on(date);

				checkObj.setQa_submit_id(userId);

				checkObj.setQa_status(AppConstants.qaApprovedStatus);

				Optional<UserImageDetails> imageDetailsOpt = imageRepository

						.fetchItemDetailsByUsername(userName);

				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);

				checkObj.setQa_signature_image(signature);
				
				if (!checkObj.getQualityRelease().isEmpty() || checkObj.getQualityRelease() != null) {

					for (BMR_QualityRelease qualityRelease : checkObj.getQualityRelease()) {
						qualityRelease.setStatus(AppConstants.qaApprovedStatus);
					}

				}

				summaryBleachRepository.save(checkObj);

			

//				if (checkObj.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {} else {
//
//					return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
//
//				}

			}

		} catch (Exception ex) {

			SCAUtil sca = new SCAUtil();

			log.error("***  Unable to Submit Machine Operation Details For BMR *** " + ex);

			String msg = sca.getErrorMessage(ex);

			return new ResponseEntity<>(

					new ApiResponse(false, "Unable to Submit Machine Operation Details For BMR."),

					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity<>(checkObj, HttpStatus.CREATED);

	}

//		/ SAVE RECORD VERIFICATION 
	
	public ResponseEntity<?> SaveRecordVerification(BmrSummaryRecordVerification summaryRecordVerification,
			HttpServletRequest http) {

		Long id = summaryRecordVerification.getSummaryRecordId();
		BmrSummaryRecordVerification checkObj = new BmrSummaryRecordVerification();

		try {
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {
				checkObj = recordVerificationRepository.getRecordDetails(id);
			} else {
				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity<>(new ApiResponse(false, role + " cannot submit new details"),
							HttpStatus.BAD_REQUEST);
				}
			}

			String[] ignoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
					"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
					"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by", "qa_save_id",
					"qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
					"supervisor_signature_image", "qa_signature_image", "form_no" };

			BeanUtils.copyProperties(summaryRecordVerification, checkObj, ignoreProps);

			if (role.equals("ROLE_SUPERVISOR")) {
				BleachBmrCompletionTable bmrCompletionTable2 = bleachBmrCompletionTableRepository
						.getVerificationRecordForBMR(summaryRecordVerification.getBmr_no());

				if (summaryRecordVerification.getKey().equals("VERIFICATION")) {
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorSave);
				}

				recordVerificationRepository.save(checkObj);

				if (checkObj.getSummaryVerification() != null && !checkObj.getSummaryVerification().isEmpty()) {
					for (BmrSummaryVerification summary : checkObj.getSummaryVerification()) {
						Long summaryId = summary.getSummaryVerficationId();
						BmrSummaryVerification summaryObj = (summaryId != null)
								? bmrsummaryverificationrepository.getSummaryRecordById(summaryId)
								: new BmrSummaryVerification();

						summaryObj.setDate1(summary.getDate1());
						summaryObj.setDate2(summary.getDate2());
						summaryObj.setRecordName(summary.getRecordName());
						summaryObj.setStatus(summary.getStatus());
						summaryObj.setStatus2(summary.getStatus2());
						summaryObj.setSupervisorStatus("RECORD_VERIFICATION_DONE");
						summaryObj.setSupervisiorSubmittedOn(date);
						summaryObj.setSummary_record_id(checkObj.getSummaryRecordId());

						bmrsummaryverificationrepository.save(summaryObj);
					}
				}

				if (checkObj.getEnclosureList() != null && !checkObj.getEnclosureList().isEmpty()) {
					for (BmrSummaryEnclosureList enclosure : checkObj.getEnclosureList()) {
						Long enclosureId = enclosure.getEnclosureId();
						BmrSummaryEnclosureList enclosureObj = (enclosureId != null)
								? bmrsummaryenclosurelistrepository.getSummaryRecordById(enclosureId)
								: new BmrSummaryEnclosureList();

						enclosureObj.setRemark1(enclosure.getRemark1());
						enclosureObj.setRemark2(enclosure.getRemark2());
						enclosureObj.setTitle(enclosure.getTitle());
						enclosureObj.setStatus(AppConstants.supervisorSave);
						enclosureObj.setSummary_record_id(checkObj.getSummaryRecordId());

//						enclosureObj = entityManager.merge(enclosureObj);
						
						bmrsummaryenclosurelistrepository.save(enclosureObj);
					}
				}

				if (bmrCompletionTable2 == null) {
					bmrCompletionTable2 = new BleachBmrCompletionTable();
					bmrCompletionTable2.setBmrNo(summaryRecordVerification.getBmr_no());
					bmrCompletionTable2.setForm("VERIFICATION OF RECORDS");
					bleachBmrCompletionTableRepository.save(bmrCompletionTable2);
				}

			} else if (role.equals("ROLE_QA")) {
				if (checkObj.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {
					checkObj.setQa_submit_by(userName);
					checkObj.setQa_submit_on(date);
					checkObj.setQa_submit_id(userId);
					checkObj.setQa_status(AppConstants.qaApprovedStatus);

					
					
					recordVerificationRepository.save(checkObj);
					
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("***  Unable to Submit Record verification Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Submit Record verification Details For BMR." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(checkObj, HttpStatus.CREATED);
	}

	// SUBMIT RECORD VERIFICATION
	
	public ResponseEntity<?> SubmitRecordVerification(BmrSummaryRecordVerification summaryRecordVerification,
			HttpServletRequest http) {

		Long id = summaryRecordVerification.getSummaryRecordId();
		BmrSummaryRecordVerification checkObj = new BmrSummaryRecordVerification();

		try {
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			if (id != null) {
				checkObj = recordVerificationRepository.getRecordDetails(id);
			} else {
				if (!role.equals("ROLE_SUPERVISOR")) {
					return new ResponseEntity<>(new ApiResponse(false, role + " cannot submit new details"),
							HttpStatus.BAD_REQUEST);
				}
			}

			String[] ignoreProps = { "id", "createdBy", "createdAt", "supervisor_status", "supervisor_save_on",
					"supervisor_save_by", "supervisor_save_id", "supervisor_submit_on", "supervisor_submit_by",
					"supervisor_submit_id", "supervisor_sign", "qa_status", "qa_save_on", "qa_save_by", "qa_save_id",
					"qa_submit_on", "qa_submit_by", "qa_submit_id", "qa_mail_status", "qa_sign",
					"supervisor_signature_image", "qa_signature_image", "form_no" };

			BeanUtils.copyProperties(summaryRecordVerification, checkObj, ignoreProps);

			if (role.equals("ROLE_SUPERVISOR")) {
				BleachBmrCompletionTable bmrCompletionTable2 = bleachBmrCompletionTableRepository
						.getVerificationRecordForBMR(summaryRecordVerification.getBmr_no());

				if (summaryRecordVerification.getKey().equals("VERIFICATION")) {
					checkObj.setSupervisor_submit_by(userName);
					checkObj.setSupervisor_submit_on(date);
					checkObj.setSupervisor_submit_id(userId);
					checkObj.setSupervisor_status(AppConstants.supervisorApprovedStatus);
				}

				Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
				byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
				checkObj.setSupervisor_signature_image(signature);

				recordVerificationRepository.save(checkObj);

				if (checkObj.getSummaryVerification() != null && !checkObj.getSummaryVerification().isEmpty()) {
					for (BmrSummaryVerification summary : checkObj.getSummaryVerification()) {
						Long summaryId = summary.getSummaryVerficationId();
						BmrSummaryVerification summaryObj = (summaryId != null)
								? bmrsummaryverificationrepository.getSummaryRecordById(summaryId)
								: new BmrSummaryVerification();

						summaryObj.setDate1(summary.getDate1());
						summaryObj.setDate2(summary.getDate2());
						summaryObj.setRecordName(summary.getRecordName());
						summaryObj.setStatus(summary.getStatus());
						summaryObj.setStatus2(summary.getStatus2());
						summaryObj.setSupervisorStatus("RECORD_VERIFICATION_DONE");
						summaryObj.setSupervisiorSubmittedOn(date);
						summaryObj.setSummary_record_id(checkObj.getSummaryRecordId());
						
						

						bmrsummaryverificationrepository.save(summaryObj);
					}
				}

				if (checkObj.getEnclosureList() != null && !checkObj.getEnclosureList().isEmpty()) {
					for (BmrSummaryEnclosureList enclosure : checkObj.getEnclosureList()) {
						Long enclosureId = enclosure.getEnclosureId();
						BmrSummaryEnclosureList enclosureObj = (enclosureId != null)
								? bmrsummaryenclosurelistrepository.getSummaryRecordById(enclosureId)
								: new BmrSummaryEnclosureList();

						enclosureObj.setRemark1(enclosure.getRemark1());
						enclosureObj.setRemark2(enclosure.getRemark2());
						enclosureObj.setTitle(enclosure.getTitle());
						enclosureObj.setStatus(AppConstants.supervisorApprovedStatus);
						enclosureObj.setSummary_record_id(checkObj.getSummaryRecordId());

//						enclosureObj = entityManager.merge(enclosureObj);
						
						bmrsummaryenclosurelistrepository.save(enclosureObj);
					}
				}

				if (bmrCompletionTable2 == null) {
					bmrCompletionTable2 = new BleachBmrCompletionTable();
					bmrCompletionTable2.setBmrNo(summaryRecordVerification.getBmr_no());
					bmrCompletionTable2.setForm("VERIFICATION OF RECORDS");
					bleachBmrCompletionTableRepository.save(bmrCompletionTable2);
				}

			} else if (role.equals("ROLE_QA")) {
				if (checkObj.getSupervisor_status().equalsIgnoreCase(AppConstants.supervisorApprovedStatus)) {
					checkObj.setQa_submit_by(userName);
					checkObj.setQa_submit_on(date);
					checkObj.setQa_submit_id(userId);
					checkObj.setQa_status(AppConstants.qaApprovedStatus);

					Optional<UserImageDetails> imageDetailsOpt = imageRepository.fetchItemDetailsByUsername(userName);
					byte[] signature = imageDetailsOpt.map(UserImageDetails::getImage).orElse(null);
					checkObj.setQa_signature_image(signature);

					
//					if (checkObj.getEnclosureList() != null && !checkObj.getEnclosureList().isEmpty()) {
//						for (BmrSummaryEnclosureList enclosure : checkObj.getEnclosureList()) {
//							Long enclosureId = enclosure.getEnclosureId();
//							BmrSummaryEnclosureList enclosureObj = (enclosureId != null)
//									? bmrsummaryenclosurelistrepository.getSummaryRecordById(enclosureId)
//									: new BmrSummaryEnclosureList();
//
//							enclosureObj.setRemark1(enclosure.getRemark1());
//							enclosureObj.setRemark2(enclosure.getRemark2());
//							enclosureObj.setTitle(enclosure.getTitle());
//							enclosureObj.setStatus(AppConstants.qaApprovedStatus);
//							enclosureObj.setSummary_record_id(checkObj.getSummaryRecordId());
//
////							enclosureObj = entityManager.merge(enclosureObj);
//							
//							bmrsummaryenclosurelistrepository.save(enclosureObj);
//						}
//					}
					
					if(!checkObj.getEnclosureList().isEmpty() || checkObj.getEnclosureList() != null) {
						
						for(BmrSummaryEnclosureList enclosure : checkObj.getEnclosureList()) {
							
							enclosure.setStatus(AppConstants.qaApprovedStatus);
							
//							bmrsummaryenclosurelistrepository.save(enclosure);
						}
						
					}
					
					recordVerificationRepository.save(checkObj);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("***  Unable to Submit Record verification Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Submit Record verification Details For BMR." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(checkObj, HttpStatus.CREATED);
	}

	// GET Record OPERATIONS BY BMR
	@SuppressWarnings({ "unchecked", "unchecked", "unchecked", "unchecked" })
	public ResponseEntity<?> getRecordVerificationByBMR(String bmr_no) {

		BmrSummaryRecordVerification manufacturingStepsList;
		try {

			manufacturingStepsList = recordVerificationRepository.getBMRSummaryVerfication(bmr_no);

			if (manufacturingStepsList == null) {
				return new ResponseEntity(new ApiResponse(false, "No Data Found for BMR: " + bmr_no),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Record verifiaction Details For BMR *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(
					new ApiResponse(false, "Unable to Get Record verifiaction Details for BMR:" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(manufacturingStepsList, HttpStatus.OK);
	}

	// GET SHOPPAGE DETAILS

	@SuppressWarnings("rawtypes")
	public ResponseEntity<?> getShoppageDetailsForDate(String date, String date2) {

		List<GetStoppageDetailsResponse> shoppageDetails = new ArrayList<>();

		try {

			shoppageDetails = stoppageDetailsRepository.findByDate(date, date2);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Shoppage Details for Date *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Shoppage Details for Date "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(shoppageDetails, HttpStatus.OK);

	}

	public ResponseEntity<?> submitBmrCompletion(BleachBmrCompletionTable bleachBmrCompletion) {

		try {
//
//			User qa = userRepository.getDetailsByUserName(bleachBmrCompletion.getQaName());
//
//			bleachBmrCompletion.setQaId(qa.getId());
//
//			User hod = userRepository.getDetailsByUserName(bleachBmrCompletion.getHodName());
//
//			bleachBmrCompletion.setHodId(hod.getId());
//
//			User supervisor = userRepository.getDetailsByUserName(bleachBmrCompletion.getSupervisorName());
//
//			bleachBmrCompletion.setSupervisorId(supervisor.getId());
			
			String role = getUserRole();

			BleachBmrGeneration bmrGeneration = new BleachBmrGeneration();
			BleachBmrLaydownMapping bmrMapping = new BleachBmrLaydownMapping();

			if (bleachBmrCompletion.getForm().equalsIgnoreCase("PRODUCTION RELEASE")) {
				
				if(role.equalsIgnoreCase("ROLE_QA")) {
					
					bleachBmrCompletion.setStatus("QA_INSPECTOR_SUBMITTED");
					
					bleachBmrCompletionTableRepository.save(bleachBmrCompletion);
					
				} else if(role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("QA_DESIGNEE")) {
					
					if(bleachBmrCompletion.getStatus().equalsIgnoreCase("QA_INSPECTOR_SUBMITTED")) {
						
						System.out.println("Hii there i am using Precot");
						
						BleachBmrCompletionTable completionTableObj = bleachBmrCompletionTableRepository.getProductReleaseForBMR(bleachBmrCompletion.getBmrNo());
						
						System.out.println("Completion Table" + completionTableObj.getBmrNo());
						
						
						completionTableObj.setQaName(bleachBmrCompletion.getQaName());
						completionTableObj.setShoppageDate2(bleachBmrCompletion.getShoppageDate2());
						completionTableObj.setStatus("QA_MANAGER_APPROVED");
						
						String bmrNumber = completionTableObj.getBmrNo();
						bmrGeneration = bmrGenerationRepository.getBMR(bmrNumber);
						bmrMapping = bmrMappingRepository.getBMRNoResponse(bmrNumber);

						bmrGeneration.setSTATUS(AppConstants.bmrSummaryCompletion);
						bmrMapping.setStatus(AppConstants.bmrSummaryCompletion);

						bmrGenerationRepository.save(bmrGeneration);
						bmrMappingRepository.save(bmrMapping);
						
						bleachBmrCompletionTableRepository.save(completionTableObj);
						
					} else {
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "QA inspector not yet submitted !!!"));
					}
					
				}
				
			} else if(bleachBmrCompletion.getForm().equalsIgnoreCase("POST PRODUCTOIN DETAILS")) {
			
				if(role.equalsIgnoreCase("ROLE_SUPERVISOR")) {
					
					bleachBmrCompletion.setStatus("SUPERVISOR_APPROVED");
					bleachBmrCompletionTableRepository.save(bleachBmrCompletion);
				} else if(role.equalsIgnoreCase("ROLE_HOD") || role.equalsIgnoreCase("ROLE_DESIGNEE") && bleachBmrCompletion.getStatus().equalsIgnoreCase("SUPERVISOR_APPROVED")) {
					
					bleachBmrCompletion.setStatus("HOD_APPROVED");
					bleachBmrCompletionTableRepository.save(bleachBmrCompletion);
				} 
				else if(role.equalsIgnoreCase("ROLE_QA") || role.equalsIgnoreCase("QA_MANAGER") || role.equalsIgnoreCase("QA_DESIGNEE")  && bleachBmrCompletion.getStatus().equalsIgnoreCase("HOD_APPROVED")) {
					
					bleachBmrCompletion.setStatus("QA_APPROVED");
					bleachBmrCompletionTableRepository.save(bleachBmrCompletion);
				}
				else {
					return new ResponseEntity(new ApiResponse(false, role + "cannot submit post production details"), HttpStatus.BAD_REQUEST);
				}
			}
			else {
				
				bleachBmrCompletionTableRepository.save(bleachBmrCompletion);
			}


		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Submit BMR Completion Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Submit BMR Completion Details:" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(bleachBmrCompletion, HttpStatus.OK);

	}

	public ResponseEntity<?> submitAnnexureForBMR(BleachBmrAnnexureList annexureList) {

		try {
//
//			User qa = userRepository.getDetailsByUserName(bleachBmrCompletion.getQaName());
//
//			bleachBmrCompletion.setQaId(qa.getId());
//
//			User hod = userRepository.getDetailsByUserName(bleachBmrCompletion.getHodName());
//
//			bleachBmrCompletion.setHodId(hod.getId());
//
//			User supervisor = userRepository.getDetailsByUserName(bleachBmrCompletion.getSupervisorName());
//
//			bleachBmrCompletion.setSupervisorId(supervisor.getId());

			annexureRepository.save(annexureList);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Submit BMR Completion Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Submit BMR Completion Details: "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(annexureList, HttpStatus.OK);
	}
	
		// SAVE BMR ANNEXURE
	
	public ResponseEntity<?> saveAnnexureBmr(BleachBmrAnnexureList annexureList, HttpServletRequest http) {

	    SCAUtil sca = new SCAUtil();
	    String userRole = getUserRole();
	    LocalDateTime currentDate = LocalDateTime.now();
	    Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	    try {
	        Long id = annexureList.getId();

	        if (userRole.equals("ROLE_SUPERVISOR") || userRole.equalsIgnoreCase("ROLE_QA")) {

	            if (id != null) {
	                BleachBmrAnnexureList annexureExistingObj = annexureRepository.fetchAnnexureById(id);
	                annexureList.setCreatedAt(annexureExistingObj.getCreatedAt());
	                annexureList.setCreatedBy(annexureExistingObj.getCreatedBy());
	            }

	            annexureList.setStatus(AppConstants.supervisorSave);
	            log.info("**** Saving Annexure List ****" + annexureList);


	            
	            if (annexureList.getAnnexureDates() != null) {
	                for (BleachBmrAnnexureDates dates : annexureList.getAnnexureDates()) {
	                   dates.setAnnexureList(annexureList);
	                }
	            }
	            
	            annexureRepository.save(annexureList);

	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, userRole + " not authorized to save equipment Annexure form"), HttpStatus.BAD_REQUEST);
	        }

	    } catch (Exception ex) {
	        log.error("*** Unable to Save Annexure Details ***", ex);
	        String msg = sca.getErrorMessage(ex);
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Annexure Details: " + msg), HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(new ApiResponse(true, "Annexure BMR saved successfully"), HttpStatus.OK);
	}
	
	
	// SUBMIT BMR ANNEXURE

	public ResponseEntity<?> submitAnnexureBmr(BleachBmrAnnexureList annexureList, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		String userRole = getUserRole();
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			Long id = annexureList.getId();

			if (userRole.equals("ROLE_SUPERVISOR") || userRole.equals("ROLE_QA")) {

				if (id != null) {
					BleachBmrAnnexureList annexureExistingObj = annexureRepository.fetchAnnexureById(id);
					annexureList.setCreatedAt(annexureExistingObj.getCreatedAt());
					annexureList.setCreatedBy(annexureExistingObj.getCreatedBy());
				}

				annexureList.setStatus(AppConstants.supervisorApprovedStatus);

				if (annexureList.getAnnexureDates() != null) {
					for (BleachBmrAnnexureDates dates : annexureList.getAnnexureDates()) {
						dates.setAnnexureList(annexureList);
					}
				}

				annexureRepository.save(annexureList);

			} else {
				return new ResponseEntity<>(
						new ApiResponse(false, userRole + " not authorized to submit equipment Annexure form"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {
			log.error("*** Unable to Submit Annexure Details ***", ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Annexure Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(new ApiResponse(true, "Annexure BMR Submitted successfully"), HttpStatus.OK);
	}


	public ResponseEntity<?> getAnnexureByBmr(String bmr_no) {

		List<BleachBmrAnnexureList> annexureListBmr = new ArrayList<>();

		try {

			annexureListBmr = annexureRepository.getAnnexureByBmr(bmr_no);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get Annexure Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get BMR Completion Details: "),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(annexureListBmr, HttpStatus.OK);

	}
	
	
	
		// GET DISTINCT VERIFIED NAME BY ANNEXURE BMR 
	
	
	public ResponseEntity<?> getDistinctAnnexureVerifiedNames() {
		
		List<String> annexureList = new ArrayList<String>();
		
		List<IdAndValuePair> annexureValueList = new ArrayList<IdAndValuePair>();
		
		try {
			
			annexureList = annexureRepository.annexureVerfier();
			
			Long id = (long) 1;
			
			for(String temp : annexureList) {
				
				IdAndValuePair valueList = new IdAndValuePair();
				valueList.setValue(temp);
				valueList.setId(id);
				
				annexureValueList.add(valueList);
			}
			
			id++;
			
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to get Annexure Verifier Details *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Annexure Verifier Details: "),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(annexureValueList, HttpStatus.OK);
	}
	
	

	// K
	public List<BMRProcessDeviationRecord> submitProcessDeviationRecord(List<BMRProcessDeviationRecord> request) {
		// Check for mandatory fields
		for (BMRProcessDeviationRecord record : request) {
			if (record.getDeviationLogNo() == null) {
				throw new IllegalArgumentException("Deviation Log No is mandatory!");
			}
//	        record.setSignDate(new Date());
//	        record.setQa_saved_on(new Date());
			bmrprocessdeviationrecordrepository.save(record);
		}
		return request;
	}
	
	
	
	
		// SAVE PROCESS DEVIATION RECORD - CR
	
	public ResponseEntity<?> saveProcessDeviationRecord(List<BMRProcessDeviationRecord> record) {
		
		SCAUtil sca = new SCAUtil();
		String userRole = getUserRole();
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
		
		try {
			
			BMRProcessDeviationRecord deviationRecord;
			
			if(userRole.equals("ROLE_SUPERVISOR")) {
				
				if(!record.isEmpty() || record != null) {
					
					for(BMRProcessDeviationRecord deviation : record) {
						if("".equals(deviation.getDeviationLogNo()) || deviation.getDeviationLogNo() == null) {
							return new ResponseEntity(new ApiResponse(false, "Deviation Log Number should be mandatory"), HttpStatus.BAD_REQUEST);
						}
						
						if(deviation.getId() != null) {
							deviationRecord = bmrprocessdeviationrecordrepository.fetchByDeviationId(deviation.getId());
							deviation.setCreatedAt(deviationRecord.getCreatedAt());
							deviation.setCreatedBy(deviation.getCreatedBy());
						}
						
						deviation.setStatus(AppConstants.supervisorSave);
						
						bmrprocessdeviationrecordrepository.save(deviation);
						
					}
					
				}
				
			} else if(userRole.equals("ROLE_QA")) {
				
				if(!record.isEmpty() || record != null) {
					
					for(BMRProcessDeviationRecord deviation : record) {
						if("".equals(deviation.getDeviationLogNo()) || deviation.getDeviationLogNo() == null) {
							return new ResponseEntity(new ApiResponse(false, "Deviation Log Number should be mandatory"), HttpStatus.BAD_REQUEST);
						}
						
						if(deviation.getId() != null) {
							deviationRecord = bmrprocessdeviationrecordrepository.fetchByDeviationId(deviation.getId());
							deviation.setCreatedAt(deviationRecord.getCreatedAt());
							deviation.setCreatedBy(deviation.getCreatedBy());
						}
						
						deviation.setStatus(AppConstants.qaSave);
						
						bmrprocessdeviationrecordrepository.save(deviation);
						
					}
					
				}
				
			} else {
				return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to save process deviation"), HttpStatus.BAD_REQUEST);
			}
			
		} catch(Exception ex) {
			
			String msg = ex.getMessage();
			log.error("*** !!! Unable to save process deviation record !!!***" + ex);
			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(new ApiResponse(true, "Process Deviation Record Saved Successfully"), HttpStatus.OK);
		
	}
	
	
	// SUBMIT PROCESS DEVIATION RECORD - CR

	public ResponseEntity<?> submitProcessDeviationRecords(List<BMRProcessDeviationRecord> record) {

		SCAUtil sca = new SCAUtil();
		String userRole = getUserRole();
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			BMRProcessDeviationRecord deviationRecord;

			if (userRole.equals("ROLE_SUPERVISOR")) {

				if (!record.isEmpty() || record != null) {

					for (BMRProcessDeviationRecord deviation : record) {
						if ("".equals(deviation.getDeviationLogNo()) || deviation.getDeviationLogNo() == null) {
							return new ResponseEntity(
									new ApiResponse(false, "Deviation Log Number should be mandatory"),
									HttpStatus.BAD_REQUEST);
						}

						if (deviation.getId() != null) {
							deviationRecord = bmrprocessdeviationrecordrepository.fetchByDeviationId(deviation.getId());
							deviation.setCreatedAt(deviationRecord.getCreatedAt());
							deviation.setCreatedBy(deviation.getCreatedBy());
						}

						deviation.setStatus(AppConstants.supervisorApprovedStatus);

						bmrprocessdeviationrecordrepository.save(deviation);

					}

				}

			} else if (userRole.equals("ROLE_QA")) {

				if (!record.isEmpty() || record != null) {

					for (BMRProcessDeviationRecord deviation : record) {
						if ("".equals(deviation.getDeviationLogNo()) || deviation.getDeviationLogNo() == null) {
							return new ResponseEntity(
									new ApiResponse(false, "Deviation Log Number should be mandatory"),
									HttpStatus.BAD_REQUEST);
						}

						if (deviation.getId() != null) {
							deviationRecord = bmrprocessdeviationrecordrepository.fetchByDeviationId(deviation.getId());
							deviation.setCreatedAt(deviationRecord.getCreatedAt());
							deviation.setCreatedBy(deviation.getCreatedBy());
						}

						deviation.setStatus(AppConstants.qaApprovedStatus);

						bmrprocessdeviationrecordrepository.save(deviation);

					}

				}

			} else {
				return new ResponseEntity(
						new ApiResponse(false, userRole + " not authroized to save process deviation"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			log.error("*** !!! Unable to save process deviation record !!!***" + ex);
			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(new ApiResponse(true, "Process Deviation Record Saved Successfully"), HttpStatus.OK);

	}
	
	

//	public ResponseEntity<?> getProductReconillation(String bmr_no) {
//
//		BMRProductionResponseLaydown productionResponseLaydown;
//
//		List<RawCottonIssueResponse> rawCottonResponse = new ArrayList<>();
//
//		ProductReconInterface productRecon = null;
//
//		try {
//
//			BleachBmrLaydownMapping bmrGenerationObj = bmrMappingRepository.getBMRNoResponse(bmr_no);
//
//			String order = bmrGenerationObj.getJob_order_no();
//
//			productionResponseLaydown = bmrMappingRepository.productionResponseLaydown(order);
//
//			String quantity = productionResponseLaydown.getquantity();
//
//			
//
//			String laydown = bmrGenerationObj.getLaydown_no();
//
//			System.out.println("Laydown" + laydown);
//
//			rawCottonResponse = bmrMappingRepository.rawCottonResponse(laydown);
//
//			BigDecimal rQuantity = null;
//
//			
//			
//			BigDecimal result;
//			List<RawCottonIssueResponse> responseList = new ArrayList<>();
//			List<BmrSummaryRawCottonResponse> rawCottonResponse1 = new ArrayList<>();
//			
//			BigDecimal totalBaleCount = BigDecimal.ZERO;
//	        BigDecimal totalWeight = BigDecimal.ZERO;
//	        BmrSummaryRawCottonResponse resps = new BmrSummaryRawCottonResponse();
//	        
//			for(RawCottonIssueResponse resp : responseList) {
//				
//				totalWeight = totalWeight.add(resp.getweight());
//	            totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(resp.getbalesCount()));
//			}
//			
//			resps.setIssueResponse(responseList);
//			resps.setTotalBales(totalBaleCount);
//			resps.setTotalWeight(totalWeight);
//
//
////			result = bigDecimal.multiply(resps.getTotalWeight()).divide(resps.getTotalBales().valueOf(100));
//
////			System.out.println("Result" + result);
//
////			productRecon.setquantity1(bigDecimal);
//
//			productRecon.setquantity2(rQuantity);
//
////			productRecon.setresult(result);
//
//		} catch (Exception ex) {
//
//			SCAUtil sca = new SCAUtil();
//
//			log.error("*** Unable to Apply Product Reconillation *** " + ex);
//
//			String msg = sca.getErrorMessage(ex);
//
//			return new ResponseEntity(new ApiResponse(false, "Unable to Apply Product Reconillation "),
//
//					HttpStatus.BAD_REQUEST);
//
//		}

//		return new ResponseEntity(productRecon, HttpStatus.OK);
//
//	}

	// GET PRODUCT RECONILLATION
	public ResponseEntity<?> getProductReconillation2(String bmr_no) {

		List<RawCottonIssueResponse> rawCottonResponse = new ArrayList<>();
		BMRProductionResponseLaydown productionResponseLaydown;
		BleachBmrLaydownMapping bmrGenerationObj = bmrMappingRepository.getBMRNoResponse(bmr_no);
		BMRProductionDetailsResponse productionResponseSAP;
		ProductReconInterface productReconillationInterface = new ProductReconInterface();

		try {

			String order = bmrGenerationObj.getJob_order_no();

			productionResponseLaydown = bmrMappingRepository.productionResponseLaydown(order);
			String laydown_no = bmrGenerationObj.getLaydown_no();

			// FOR GET TOTAL WEIGHT USING LAYDOWN (INPUT QTY)
			rawCottonResponse = bmrMappingRepository.rawCottonResponse(laydown_no);

			BigDecimal totalBaleCount = BigDecimal.ZERO;
			BigDecimal totalWeight = BigDecimal.ZERO;
			BigDecimal produtionQuantity = BigDecimal.ZERO;

			for (RawCottonIssueResponse resp : rawCottonResponse) {

				totalWeight = totalWeight.add(resp.getweight());
				totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(resp.getbalesCount()));
			}

			// FOR GET QUANTITY FROM PRODUCTION DETAILS IN BMR 1.0 (OUTPUT QTY)

			productionResponseSAP = bmrMappingRepository.productionDetailsResponse(bmr_no);
			productionResponseLaydown = bmrMappingRepository.productionResponseLaydown(order);

			String quantity = productionResponseLaydown.getquantity();
			produtionQuantity = new BigDecimal(quantity);

			// YIELD CALCULATION
			BigDecimal yieldCals = BigDecimal.ZERO;
			yieldCals = produtionQuantity.divide(totalWeight, 4, BigDecimal.ROUND_HALF_UP)
					.multiply(BigDecimal.valueOf(100));

			System.out.println("Yield" + yieldCals);

			// SETTING RESPONSE

			productReconillationInterface.setInputQuantity(totalWeight);
			productReconillationInterface.setOutputQuantity(produtionQuantity);
			productReconillationInterface.setYieldQuantity(yieldCals);

		} catch (Exception ex) {

			SCAUtil sca = new SCAUtil();

			log.error("*** Unable to Apply Product Reconillation *** " + ex);

			String msg = sca.getErrorMessage(ex);

			return new ResponseEntity(new ApiResponse(false, "Unable to Apply Product Reconillation " + msg),

					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(productReconillationInterface, HttpStatus.OK);

	}

	public ResponseEntity<?> verficationRecords(String date, String shift) {
		System.out.println("Shift" + shift + "Date: " + date);
		List<BleachHouseKeepingCheckListF02> housekeepingCleaning = new ArrayList<>();
		List<BleachShiftLogBookF36> shiftLogbook = new ArrayList<>();
		List<BleachMixingChangeMachineCleaningF38> machineCleaning = new ArrayList<>();
		BmrSummaryVerificationRecordResponse recordVerification = new BmrSummaryVerificationRecordResponse();
		try {
			housekeepingCleaning = houseKeepingCheckilistRepository.getDetailsBaseDate(date);
			shiftLogbook = shiftLogBookRepository.findByDateAndShift(date, shift);
			machineCleaning = mixingChangeOverRepository.getDateBaseSummDetails(date);
			for (BleachHouseKeepingCheckListF02 housekeeping : housekeepingCleaning) {
				recordVerification.setHouseSupervisior(housekeeping.getSupervisor_submit_by());
				recordVerification.setHouseApprover(housekeeping.getHod_submit_by());
			}
			for (BleachShiftLogBookF36 housekeeping : shiftLogbook) {
				recordVerification.setShiftLogSupervisior(housekeeping.getSupervisor_submit_by());
				recordVerification.setShiftLogApprover(housekeeping.getHod_submit_by());
			}
			for (BleachMixingChangeMachineCleaningF38 housekeeping : machineCleaning) {
				recordVerification.setMachineSupervisior(housekeeping.getSupervisor_submit_by());
				recordVerification.setMachineHod(housekeeping.getHod_submit_by());
			}
		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Fetch Verification Records *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Fetch Verification Records " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(recordVerification, HttpStatus.OK);
	}

	// BMR COMPLETION GET SUMMARY

//	public ResponseEntity<?> getFullBMRSummary(String bmr_no) {
//		
//		BmrSummaryApprovalResponse approvalResponse = new BmrSummaryApprovalResponse();
//		
//		Object resp1;
//		
//		String laydownNo = "";
//		BleachingProductionDetailsResponse response = new BleachingProductionDetailsResponse();
//		BleachingProductionDetailsRequest producTionDetailsRequest = new BleachingProductionDetailsRequest();
//		
//		List<BleachingProductionDetailsRequest> productDetailsRequestList = new ArrayList<>();
//		List<BleachingProductionDetailsResponse> tempResponse = new ArrayList<>();
//		List<BMRProductionDetailsResponse> productionDetailsResponses = new ArrayList<>();
//		List<RawCottonIssueResponse> rawCottonResponseList = new ArrayList<>();
//		List<BmrSummary> bmrSummary = new ArrayList<>();
//		List<BMR_Summary_Bleach> manufacturingOperationsList = new ArrayList<>();
//		List<BMR_ManufacturingSteps> manufacturingStepsList = new ArrayList<>();
//		List<BleachBmrCompletionTable> bmrCompletionTable = new ArrayList<>();
//		
//		
//		BleachBmrCompletionTable bmrCompletionObject = new BleachBmrCompletionTable();
//		BmrSummaryRawCottonResponse rawCottonResponseObject = new BmrSummaryRawCottonResponse();
//		List<BmrSummaryRawCottonResponse> rawCottonResponseBMRList = new ArrayList<>();
//		
//		List<ShoppageDetails> stoppageDetailsInterface = new ArrayList<>();
//		List<BmrSummaryShoppageDetails> stoppageDetailsList = new ArrayList<>();
//		BmrSummaryShoppageDetails bmrSummaryShoppageDetailsObject = new BmrSummaryShoppageDetails();
//		ProductReconInterface productionReconillationInterface = new ProductReconInterface();
//		BmrSummaryRecordVerification summaryRecordVerificationList = new BmrSummaryRecordVerification();
//		List<BMRProcessDeviationRecord> processDeviationList = new ArrayList<>();
//		
//		try {
//			
//			resp1 = getProductionDetails(bmr_no).getBody();
//			bmrSummary = bleachSummaryRepository.getSummaryByBMR(bmr_no);
//			manufacturingStepsList = bmr_ManufacturingStepsRepository.manufactureStepsBMR(bmr_no);
//			manufacturingOperationsList = summaryBleachRepository.getBMRSummaryByBMR(bmr_no);
//			bmrCompletionTable = bleachBmrCompletionTableRepository.getCompletionTable(bmr_no);
//			summaryRecordVerificationList = recordVerificationRepository.getBMRSummaryVerfication(bmr_no);
//			processDeviationList = processDeviationRecordRepository.getBYBMR(bmr_no);
//			
//			
//			BeanUtils.copyProperties(resp1, response);
//			
//			tempResponse.add(response);
//			
//			producTionDetailsRequest.setBleachProductionDetailsResponses(tempResponse);
//			
//					// GET BmrSummaryProductionDetails
//			BleachBmrCompletionTable bmrCompletionTable2 = new BleachBmrCompletionTable();
//			bmrCompletionTable2 = bleachBmrCompletionTableRepository.getProductionDetailsForBMR(bmr_no);
//			
//			if(bmrCompletionTable2 != null) {
//				String qa = bmrCompletionTable2.getQaName();
//				String production = bmrCompletionTable2.getSupervisorName();
//				
//				producTionDetailsRequest.setReviewedBy(production);
//				producTionDetailsRequest.setVerifiedBy(qa);
//			}
//			
//			
//			productDetailsRequestList.add(producTionDetailsRequest);
//			
//			String quantity = "";
//			BigDecimal batchQuantity = BigDecimal.ZERO;
//			for(BleachingProductionDetailsResponse temp : tempResponse) {
//				laydownNo = temp.getLaydown_no();
//				quantity = temp.getBatchQuantity();
//			}
//			
//			batchQuantity = new BigDecimal(quantity);
//			rawCottonResponseList = bmrMappingRepository.rawCottonResponse(laydownNo);
//			
//			BigDecimal totalBaleCount = BigDecimal.ZERO;
//	        BigDecimal totalWeight = BigDecimal.ZERO;
//			for(RawCottonIssueResponse resp : rawCottonResponseList) {
//				totalWeight = totalWeight.add(resp.getweight());
//	            totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(resp.getbalesCount()));
//			}
//			
//			rawCottonResponseObject.setIssueResponse(rawCottonResponseList);
//			rawCottonResponseObject.setTotalBales(totalBaleCount);
//			rawCottonResponseObject.setTotalWeight(totalWeight);
//			
//			rawCottonResponseBMRList.add(rawCottonResponseObject);
//			
//				// PRODUCT RECONILLATION
//			BigDecimal yield = BigDecimal.ZERO;
//			yield = batchQuantity.divide(totalWeight, 4, BigDecimal.ROUND_HALF_UP).multiply(BigDecimal.valueOf(100));
//			
//			productionReconillationInterface.setInputQuantity(totalWeight);
//			productionReconillationInterface.setOutputQuantity(batchQuantity);
//			productionReconillationInterface.setYieldQuantity(yield);
//			
//				// STOPPAGE DETAILS
//			bmrCompletionObject = bleachBmrCompletionTableRepository.getShoppageDetailsForBMR(bmr_no);
//			
//			if(bmrCompletionObject != null) {
//				stoppageDetailsInterface = laydownMappingRepository.getShoppageDetailsForDate(bmrCompletionObject.getDate());
//				bmrSummaryShoppageDetailsObject.setBmr_no(bmr_no);
//				bmrSummaryShoppageDetailsObject.setReviewedBy(bmrCompletionObject.getSupervisorName());
//				bmrSummaryShoppageDetailsObject.setShoppageDetails(stoppageDetailsInterface);
//				stoppageDetailsList.add(bmrSummaryShoppageDetailsObject);
//			}
//			
////			stoppageDetailsInterface = laydownMappingRepository.getShoppageDetailsForDate(bmrCompletionObject.getDate());
////			bmrSummaryShoppageDetailsObject.setBmr_no(bmr_no);
////			bmrSummaryShoppageDetailsObject.setReviewedBy(bmrCompletionObject.getSupervisorName());
////			bmrSummaryShoppageDetailsObject.setShoppageDetails(stoppageDetailsInterface);
////			
////			stoppageDetailsList.add(bmrSummaryShoppageDetailsObject);
//			
//				
//			
//			approvalResponse.setProductionDetailsResponses(productDetailsRequestList); // Step 1
//			approvalResponse.setRawCottonResponse(rawCottonResponseBMRList); // Step 2
//			approvalResponse.setBmrSummary(bmrSummary); // Step 3 and Step 4
//			approvalResponse.setManufacturingOperationsList(manufacturingOperationsList); // Step 9 and Step 15
//			approvalResponse.setManufacturingStepsList(manufacturingStepsList); // Step 8
//			approvalResponse.setProductionReconillation(productionReconillationInterface); // Step 10
//			approvalResponse.setShoppageDetailsList(stoppageDetailsList); // Step 11
//			approvalResponse.setSummaryRecordVerificationList(summaryRecordVerificationList); // Step 7 and Step 13
//			approvalResponse.setBmrCompletionTable(bmrCompletionTable);
//			approvalResponse.setProcessDeviationRecords(processDeviationList); // Step 12
//			
//			
//		} catch (Exception ex) {
//			SCAUtil sca = new SCAUtil();
//			log.error("*** Unable to Get BMR Records *** " + ex);
//			String msg = sca.getErrorMessage(ex);
//			return new ResponseEntity(new ApiResponse(false, "Unable to Fetch BMR Records " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//		
//		return new ResponseEntity(approvalResponse, HttpStatus.OK);
//	}

	public ResponseEntity<?> getFullSummary(String bmr_no) {

		BmrSummaryApprovalResponse bmrApprovalResponse = new BmrSummaryApprovalResponse();
		
		List<BmrSummaryProductionDetails> productionDetailsList = new ArrayList<>();

		List<BleachingProductionDetailsResponse> tempResponse = new ArrayList<>();
		BleachBmrLaydownMapping bmrLaydownMapping = new BleachBmrLaydownMapping();
		BleachingProductionDetailsResponse response = new BleachingProductionDetailsResponse();
		BleachingProductionDetailsRequest producTionDetailsRequest = new BleachingProductionDetailsRequest();
		List<BleachingProductionDetailsRequest> productDetailsRequestList = new ArrayList<>();

		List<RawCottonIssueResponse> rawCottonResponseList = new ArrayList<>();
		List<BMR_ProcessDelayEqupment> stoppageDetailsList = new ArrayList<>();
//	

		List<BmrSummary> bmrSummary = new ArrayList<>();
		List<BleachBmrAnnexureList> annexuBleachBmrAnnexureList = new ArrayList<>();

		BmrSummaryRawCottonResponse rawCottonResponseObject = new BmrSummaryRawCottonResponse();
		List<BmrSummaryRawCottonResponse> rawCottonResponseBMRList = new ArrayList<>();
		ProductReconInterface productionReconillationInterface = new ProductReconInterface();

		List<GetStoppageDetailsResponse> results = new ArrayList<>();
		List<BMR_Summary_Bleach> manufacturingOperationsList = new ArrayList<>();
		List<BMR_ManufacturingSteps> manufacturingStepsList = new ArrayList<>();
		List<BleachBmrCompletionTable> bmrCompletionTable = new ArrayList<>();
		BmrSummaryRecordVerification summaryRecordVerificationList = new BmrSummaryRecordVerification();
		List<BMRProcessDeviationRecord> processDeviationList = new ArrayList<>();
		
		BmrSummaryShoppageDetails bmrSummaryShoppageDetailsObject = new BmrSummaryShoppageDetails();

		try {
			bmrLaydownMapping = bmrMappingRepository.getBMRNoResponse(bmr_no);
			String laydownNumber = bmrLaydownMapping.getLaydown_no();
			String bmrStatus = bmrLaydownMapping.getStatus();

			// GET RAW MATERIAL ISSUE
//			Object laydownResp = generationService.getRawCottonIssue(laydownNumber).getBody();
//			BeanUtils.copyProperties(laydownResp, rawMaterialList);
//			
//			System.out.println("layd" + laydownResp);
//			
//			BleachBmrCompletionTable rawMaterialCompletionTable = new BleachBmrCompletionTable();
//			rawMaterialCompletionTable = bleachBmrCompletionTableRepository.getRawMaterialIssueForBMR(bmr_no);
//			rawMaterialRequest.setRawIssueCottonResponse(rawMaterialList);
//			if(rawMaterialCompletionTable != null) {
//				
//				String storePerson = rawMaterialCompletionTable.getStore();
//				String productionName = rawMaterialCompletionTable.getSupervisorName();
//				
//				
//				rawMaterialRequest.setIssuedBy(storePerson);
//				rawMaterialRequest.setRecievedBy(productionName);
//			}
//			
//			rawMaterialRequestList.add(rawMaterialRequest);

			// GET CHEMICAL AND PACKING ISSSUES
//			bmrSummary = bleachSummaryRepository.getSummaryByBMR(bmr_no);

			// GET ANNEXURE

			annexuBleachBmrAnnexureList = annexureRepository.getAnnexureByBmr(bmr_no);

			// GET VERFIICATION OF RECORDS

			// STOPPAGE DETAILS

			BleachBmrCompletionTable shoppageDetailsComp = new BleachBmrCompletionTable();

//			List<BleachBmrCompletionTable> shoppageDetailsRange = new ArrayList<>();
//
//			shoppageDetailsComp = bleachBmrCompletionTableRepository.getShoppageDetailsForBMR(bmr_no);
//
//			if (shoppageDetailsComp != null) {
//
//				String date1 = shoppageDetailsComp.getShoppageDate();
//
//				String date2 = shoppageDetailsComp.getShoppageDate2();
//				results = stoppageDetailsRepository.findByDate(date1, date2);
//
//				bmrSummaryShoppageDetailsObject.setBmr_no(bmr_no);
//				bmrSummaryShoppageDetailsObject.setReviewedBy(shoppageDetailsComp.getSupervisorName());
//				bmrSummaryShoppageDetailsObject.setShoppageDetails(results);
//				bmrSummaryShoppageDetailsObject.setStartDate(date1);
//				bmrSummaryShoppageDetailsObject.setEndDate(date2);
//				stoppageDetailsList.add(bmrSummaryShoppageDetailsObject);
//
//			}

			stoppageDetailsList = bmr_processdelayequpmentrepository.getprocessDelayEqupment(bmr_no);
			
			
			manufacturingStepsList = bmr_ManufacturingStepsRepository.manufactureStepsBMR(bmr_no);
			manufacturingOperationsList = summaryBleachRepository.getBMRSummaryByBMR(bmr_no);
			bmrCompletionTable = bleachBmrCompletionTableRepository.getCompletionTable(bmr_no);
			summaryRecordVerificationList = recordVerificationRepository.getBMRSummaryVerfication(bmr_no);
			processDeviationList = processDeviationRecordRepository.getBYBMR(bmr_no);

			if (bmrStatus.equals(AppConstants.bmrClosed) || bmrStatus.equals(AppConstants.bmrSummaryCompletion)) {
				
				bmrSummary = bleachSummaryRepository.getSummaryByBMR(bmr_no);
				
				Object resp1 = getProductionDetails(bmr_no).getBody();

				System.out.println("RRRR111" + resp1);

				BeanUtils.copyProperties(resp1, response);
				tempResponse.add(response);
				producTionDetailsRequest.setBleachProductionDetailsResponses(tempResponse);

				System.out.println("pp" + producTionDetailsRequest.getBleachProductionDetailsResponses());

				BleachBmrCompletionTable bmrCompletionTable2 = new BleachBmrCompletionTable();
				bmrCompletionTable2 = bleachBmrCompletionTableRepository.getProductionDetailsForBMR(bmr_no);

				System.out.println("BBBB" + bmrCompletionTable2);
				productionDetailsList = productionDetailsRepository.productionDetailsBMR(bmr_no);
				
				if(productionDetailsList.isEmpty() || productionDetailsList == null) {
					
					BmrSummaryProductionDetails summaryProductions = new BmrSummaryProductionDetails();
					
					summaryProductions.setBaleCount(response.getBaleCount());
					summaryProductions.setBatchNo(bmr_no);
					summaryProductions.setBmr_no(bmr_no);
					summaryProductions.setBatchCount(response.getBatchCount());
					summaryProductions.setStartSubBatch(response.getStartSubBatch());
					summaryProductions.setEndSubBatch(response.getEndSubBatch());
					summaryProductions.setIsExport(response.getIsExport());
					summaryProductions.setIsHouse(response.getIsHouse());
					summaryProductions.setBatchQuantity(response.getBatchQuantity());
					summaryProductions.setMixing(response.getMixing());
					summaryProductions.setFinishing(response.getFinishing());
					summaryProductions.setSupply(response.getIsExport());
					summaryProductions.setStartDate(response.getStartDate());
					summaryProductions.setEndDate(response.getEndDate());
					summaryProductions.setStartTime(response.getStartTime());
					summaryProductions.setEndTime(response.getEndTime());
					
					productionDetailsList.add(summaryProductions);
					
					System.out.println("From Date and To Date" + summaryProductions.getStartDate() + summaryProductions.getEndDate());
					
//					DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
//			        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//			        
//			        LocalDate localStartdate = LocalDate.parse(summaryProductions.getStartDate(), inputFormatter);
//			        LocalDate localEnddate = LocalDate.parse(summaryProductions.getEndDate(), inputFormatter);
//			        
//			        String startLocalDate = localStartdate.format(outputFormatter);
//			        String startEndDate = localEnddate.format(outputFormatter);
//			        
//			        System.out.println("LOCAL From Date and To Date" + startLocalDate + startEndDate);
//					
//					if(stoppageDetailsList.isEmpty() || stoppageDetailsList == null) {
//						
//						List<GetStoppageDetailsResponse> shoppageDetails = new ArrayList<>();
//						
//						shoppageDetails = stoppageDetailsRepository.findByDate(startLocalDate, startEndDate);
//						
//						
//						
//						System.out.println(shoppageDetails.size());
//						
//					}
					
				}
				
//				List<BmrSummaryProductionDetails> summaryProdDetailsObj = productionDetailsRepository.productionDetailsBMR(bmr_no);
//				
//				if(!summaryProdDetailsObj.isEmpty() || summaryProdDetailsObj != null) {
//					for(BmrSummaryProductionDetails details : summaryProdDetailsObj) {
//						
//						String qa = details.getQaName();
//						String production = details.getSupervisiorName();
//						
//						producTionDetailsRequest.setReviewedBy(production);
//						producTionDetailsRequest.setVerifiedBy(qa);
//						
//					}
//				}

				if (bmrCompletionTable2 != null) {
					String qa = bmrCompletionTable2.getQaName();
					String production = bmrCompletionTable2.getSupervisorName();

					producTionDetailsRequest.setReviewedBy(production);
					producTionDetailsRequest.setVerifiedBy(qa);
				}

				productDetailsRequestList.add(producTionDetailsRequest);

				System.out.println("List" + producTionDetailsRequest);

				// PRODUCT RECONCILIATION

				String quantity = "";
				BigDecimal batchQuantity = BigDecimal.ZERO;
				String laydownNo = "";

				System.out.println("Temp" + tempResponse.size());

				for (BleachingProductionDetailsResponse temp : tempResponse) {
					laydownNo = temp.getLaydown_no();
					quantity = temp.getBatchQuantity();
				}

				System.out.println("Quantity" + quantity);

				if (quantity == null) {
					batchQuantity = BigDecimal.ZERO;
				} else {
					batchQuantity = new BigDecimal(quantity);
				}

				rawCottonResponseList = bmrMappingRepository.rawCottonResponseCakePress(laydownNo);

				System.out.println("Quantity1" + batchQuantity);

				BigDecimal totalBaleCount = BigDecimal.ZERO;
				BigDecimal totalWeight = BigDecimal.ZERO;
				for (RawCottonIssueResponse resp : rawCottonResponseList) {

					Long baleCount = resp.getbalesCount();
					if (baleCount == null) {
						baleCount = (long) 0;
					}

					totalWeight = totalWeight.add(resp.getweight());
					totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(baleCount));
				}

				rawCottonResponseObject.setIssueResponse(rawCottonResponseList);
				rawCottonResponseObject.setTotalBales(totalBaleCount);
				rawCottonResponseObject.setTotalWeight(totalWeight);

				System.err.println(rawCottonResponseObject.getTotalWeight());

				rawCottonResponseBMRList.add(rawCottonResponseObject);

				System.out.println("GGGG");

				BigDecimal yield = BigDecimal.ZERO;
				if (totalWeight.compareTo(BigDecimal.ZERO) != 0) {
					yield = batchQuantity.divide(totalWeight, 4, BigDecimal.ROUND_HALF_UP)
							.multiply(BigDecimal.valueOf(100));
				} else {
					// Handle the case where totalWeight is zero
					yield = BigDecimal.ZERO; // or any other default value or error handling
				}

				productionReconillationInterface.setInputQuantity(totalWeight);
				productionReconillationInterface.setOutputQuantity(batchQuantity);
				productionReconillationInterface.setYieldQuantity(yield);

				// SET INTO APPROVAL RESPONSE

				// bmrApprovalResponse.setProductionDetailsResponses(productDetailsRequestList);
				// bmrApprovalResponse.setRawCottonResponse(rawCottonResponseBMRList);
				// bmrApprovalResponse.setBmrSummary(bmrSummary);
				// bmrApprovalResponse.setBmrCompletionTable(bmrCompletionTable);
				// bmrApprovalResponse.setManufacturingOperationsList(manufacturingOperationsList);
				// bmrApprovalResponse.setManufacturingStepsList(manufacturingStepsList);
				// bmrApprovalResponse.setProcessDeviationRecords(processDeviationList);
				// bmrApprovalResponse.setProductionReconillation(productionReconillationInterface);

			} else {

				System.out.println("Lydown" + laydownNumber);
				rawCottonResponseList = bmrMappingRepository.rawCottonResponseCakePress(laydownNumber);

				System.out.println("Raw" + rawCottonResponseList.size());

				if (!rawCottonResponseList.isEmpty() || rawCottonResponseList != null) {

					BigDecimal totalBaleCount = BigDecimal.ZERO;
					BigDecimal totalWeight = BigDecimal.ZERO;
					for (RawCottonIssueResponse resp : rawCottonResponseList) {

						Long baleCount = resp.getbalesCount();
						if (baleCount == null) {
							baleCount = (long) 0;
						}

						totalWeight = totalWeight.add(resp.getweight());
						totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(baleCount));
					}

					rawCottonResponseObject.setIssueResponse(rawCottonResponseList);
					rawCottonResponseObject.setTotalBales(totalBaleCount);
					rawCottonResponseObject.setTotalWeight(totalWeight);

					rawCottonResponseBMRList.add(rawCottonResponseObject);

				}
				
				// stoppage 
				
//				DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
//		        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//		        
//		        LocalDate localStartdate = LocalDate.parse(summaryProductions.getStartDate(), inputFormatter);
//		        LocalDate localEnddate = LocalDate.parse(summaryProductions.getEndDate(), inputFormatter);
//		        
//		        String startLocalDate = localStartdate.format(outputFormatter);
//		        String startEndDate = localEnddate.format(outputFormatter);
//		        
//		        System.out.println("LOCAL From Date and To Date" + startLocalDate + startEndDate);
//				
//				if(stoppageDetailsList.isEmpty() || stoppageDetailsList == null) {
//					
//					List<GetStoppageDetailsResponse> shoppageDetails = new ArrayList<>();
//					
//					shoppageDetails = stoppageDetailsRepository.findByDate(startLocalDate, startEndDate);
//					
//					System.out.println(shoppageDetails.size());
//					
//				}
				

			}

//			if(bmrStatus.equals(AppConstants.bmrClosed)) {
//				
//				Object resp1 = getProductionDetails(bmr_no).getBody();
//				BeanUtils.copyProperties(resp1, response);
//				tempResponse.add(response);
//				producTionDetailsRequest.setBleachProductionDetailsResponses(tempResponse);
//				
//				BleachBmrCompletionTable bmrCompletionTable2 = new BleachBmrCompletionTable();
//				bmrCompletionTable2 = bleachBmrCompletionTableRepository.getProductionDetailsForBMR(bmr_no);
//				
//				if(bmrCompletionTable2 != null) {
//					String qa = bmrCompletionTable2.getQaName();
//					String production = bmrCompletionTable2.getSupervisorName();
//					
//					producTionDetailsRequest.setReviewedBy(production);
//					producTionDetailsRequest.setVerifiedBy(qa);
//				}
//				
//				productDetailsRequestList.add(producTionDetailsRequest);
//				
//					// PRODUCT RECONILLATION
//				
//				String quantity = "";
//				BigDecimal batchQuantity = BigDecimal.ZERO;
//				String laydownNo = "";
//				for(BleachingProductionDetailsResponse temp : tempResponse) {
//					laydownNo = temp.getLaydown_no();
//					quantity = temp.getBatchQuantity();
//				}
//				
//				batchQuantity = new BigDecimal(quantity);
//				rawCottonResponseList = bmrMappingRepository.rawCottonResponse(laydownNo);
//				
//				BigDecimal totalBaleCount = BigDecimal.ZERO;
//		        BigDecimal totalWeight = BigDecimal.ZERO;
//				for(RawCottonIssueResponse resp : rawCottonResponseList) {
//					
//					Long baleCount = resp.getbalesCount();
//					if(baleCount == null) {
//						baleCount = (long) 0;
//					} 
//					
//					totalWeight = totalWeight.add(resp.getweight());
//		            totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(baleCount));
//				}
//				
//				rawCottonResponseObject.setIssueResponse(rawCottonResponseList);
//				rawCottonResponseObject.setTotalBales(totalBaleCount);
//				rawCottonResponseObject.setTotalWeight(totalWeight);
//				
//				rawCottonResponseBMRList.add(rawCottonResponseObject);
//				
//				BigDecimal yield = BigDecimal.ZERO;
//				yield = batchQuantity.divide(totalWeight, 4, BigDecimal.ROUND_HALF_UP).multiply(BigDecimal.valueOf(100));
//				
//				productionReconillationInterface.setInputQuantity(totalWeight);
//				productionReconillationInterface.setOutputQuantity(batchQuantity);
//				productionReconillationInterface.setYieldQuantity(yield);
//				
//				
//				// SET INTO APPROVAL RESPONSE
//				
////				bmrApprovalResponse.setProductionDetailsResponses(productDetailsRequestList);
////				bmrApprovalResponse.setRawCottonResponse(rawCottonResponseBMRList);
////				bmrApprovalResponse.setBmrSummary(bmrSummary);
////				bmrApprovalResponse.setBmrCompletionTable(bmrCompletionTable);
////				bmrApprovalResponse.setManufacturingOperationsList(manufacturingOperationsList);
////				bmrApprovalResponse.setManufacturingStepsList(manufacturingStepsList);
////				bmrApprovalResponse.setProcessDeviationRecords(processDeviationList);
////				bmrApprovalResponse.setProductionReconillation(productionReconillationInterface);
//				
//			} else {
//				
//				System.out.println("Lydown" + laydownNumber);
//				rawCottonResponseList = bmrMappingRepository.rawCottonResponse(laydownNumber);
//				
//				if(!rawCottonResponseList.isEmpty() || rawCottonResponseList != null) {
//					
//					BigDecimal totalBaleCount = BigDecimal.ZERO;
//			        BigDecimal totalWeight = BigDecimal.ZERO;
//					for(RawCottonIssueResponse resp : rawCottonResponseList) {
//						
//						Long baleCount = resp.getbalesCount();
//						if(baleCount == null) {
//							baleCount = (long) 0;
//						} 
//						
//						totalWeight = totalWeight.add(resp.getweight());
//			            totalBaleCount = totalBaleCount.add(BigDecimal.valueOf(baleCount));
//					}
//					
//					rawCottonResponseObject.setIssueResponse(rawCottonResponseList);
//					rawCottonResponseObject.setTotalBales(totalBaleCount);
//					rawCottonResponseObject.setTotalWeight(totalWeight);
//					
//					rawCottonResponseBMRList.add(rawCottonResponseObject);
//					
//				}
//				
//				
//			}

			System.out.println("Stoppage List " + stoppageDetailsList.size());
			
			bmrApprovalResponse.setProductionDetailsResponses(productDetailsRequestList); // Step 1
			bmrApprovalResponse.setProductionDetails(productionDetailsList); // STEP 1
			bmrApprovalResponse.setRawCottonResponse(rawCottonResponseBMRList); // Step 2
			bmrApprovalResponse.setBmrSummary(bmrSummary); // Step 3 and Step 4
			bmrApprovalResponse.setManufacturingOperationsList(manufacturingOperationsList); // Step 9 and Step 15
			bmrApprovalResponse.setManufacturingStepsList(manufacturingStepsList); // Step 8
			bmrApprovalResponse.setProductionReconillation(productionReconillationInterface); // Step 10
			bmrApprovalResponse.setShoppageDetailsList(stoppageDetailsList); // Step 11
			bmrApprovalResponse.setSummaryRecordVerificationList(summaryRecordVerificationList); // Step 7 and Step 13
			bmrApprovalResponse.setBmrCompletionTable(bmrCompletionTable);
			bmrApprovalResponse.setProcessDeviationRecords(processDeviationList); // Step 12
			bmrApprovalResponse.setAnnexureBleachBmrAnnexureLists(annexuBleachBmrAnnexureList);

		} catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get BMR Records *** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity(new ApiResponse(false, "Unable to Fetch BMR Records " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(bmrApprovalResponse, HttpStatus.OK);

	}

	// kaviya
	public ResponseEntity<?> getBatchByCakepress(String bmr_no) {
		List<String> batchNoList = new ArrayList<>();

		List<LovResponse> bmrBatchList = new ArrayList<>();

		try {

			batchNoList = bleachEquipmentUsageLogBookCakePressF09Repository.getBatchByBMRForBleacingJobcard(bmr_no);

			Long id = (long) 1;

			for (String temp : batchNoList) {
				LovResponse response = new LovResponse();
				response.setId(id);
				response.setValue(temp);
				response.setDescription(bmr_no);

				bmrBatchList.add(response);
				id++;
			}

		} catch (Exception e) {

			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Batch based BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Batch by BMR" + msg),
					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(bmrBatchList, HttpStatus.OK);

	}

	// kaviya
	public ResponseEntity<?> getBatchByBleachjobcard(String bmr_no) {
		List<String> batchNoList = new ArrayList<>();

		List<LovResponse> bmrBatchList = new ArrayList<>();

		try {

			batchNoList = bleachjobcard13repository.getBatchByBMRForHydroExtractor(bmr_no);

			Long id = (long) 1;

			for (String temp : batchNoList) {
				LovResponse response = new LovResponse();
				response.setId(id);
				response.setValue(temp);
				response.setDescription(bmr_no);

				bmrBatchList.add(response);
				id++;
			}

		} catch (Exception e) {

			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get Batch based BMR *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Batch by BMR" + msg),
					HttpStatus.BAD_REQUEST);

		}

		return new ResponseEntity(bmrBatchList, HttpStatus.OK);

	}

	// N.of bale and net wt for shift log book from sap

	public ResponseEntity<Map<String, Object>> getBaleDetailsByDateShiftOrder(String date, String shift) {
		Map<String, Object> response = new HashMap<>();

		try {

			Object[] result = shiftLogBookRepository.getBaleAndWeight(date, shift);

			System.out.println("Query result: " + Arrays.deepToString(result));

			if (result != null && result.length > 0) {

				Object[] innerResult = (Object[]) result[0];
				if (innerResult.length == 2) {
					response.put("TotalNetWeight", innerResult[0] != null ? innerResult[0].toString() : "0");
					response.put("BaleCount", innerResult[1] != null ? innerResult[1].toString() : "0");
				} else {
					response.put("TotalNetWeight", "0");
					response.put("BaleCount", "0");
				}
			} else {
				response.put("TotalNetWeight", "0");
				response.put("BaleCount", "0");
			}

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception ex) {
			response.put("success", false);
			response.put("message",
					"Failed to get bale details for date: " + date + " and shift: " + shift + ". " + ex.getMessage());
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	// New Approch
//
//	@SuppressWarnings("unchecked")
//	public ResponseEntity<?> ProcessDelayEqupment(BMR_ProcessDelayEqupment details) {
//		Long id = details.getProcess_id();
//		try {
//			if (id == null) {
//				String value = "";
//				if (details.getBmr_no() == null) {
//					value = "BMR_NO";
//				}
//
//				if (!"".equals(value)) {
//					return new ResponseEntity(new ApiResponse(false, "Should Fill Mandatory Fields" + value),
//							HttpStatus.BAD_REQUEST);
//				}
//
//				bmr_processdelayequpmentrepository.save(details);
//
//				for (BMR_ProcessDelayEqupmentLine lineDetails : details.getDetails()) {
//
//					Long detailsList = details.getProcess_id();
//
//					lineDetails.setProcess_id(detailsList);
//
//					bmr_processdelayequpmentlinerepository.save(lineDetails);
//
//				}
//
//			}
//
//		} catch (Exception ex) {
//			SCAUtil sca = new SCAUtil();
//			log.error("*** Unable to Save*** " + ex);
//			String msg = sca.getErrorMessage(ex);
//			return new ResponseEntity(new ApiResponse(false, "Unable to Save" + msg), HttpStatus.BAD_REQUEST);
//		}
//		return new ResponseEntity(details, HttpStatus.CREATED);
//	}

	public ResponseEntity<?> ProcessDelayEqupment(String bmr_no) {

		List<BMR_ProcessDelayEqupment> detailsList;

		try {
			detailsList = bmr_processdelayequpmentrepository.getprocessDelayEqupment(bmr_no);

			return new ResponseEntity<>(detailsList, HttpStatus.OK);

		}

		catch (Exception ex) {
			SCAUtil sca = new SCAUtil();
			log.error("*** Unable to Get*** " + ex);
			String msg = sca.getErrorMessage(ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Get" + msg), HttpStatus.BAD_REQUEST);
		}
	}
	
	
	// SAVE STOPPAGE 
		public ResponseEntity<?> saveStoppage(BMR_ProcessDelayEqupment delayEquipments) {
			SCAUtil sca = new SCAUtil();
			String userRole = getUserRole();
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
			try {
				if(userRole.equals("ROLE_SUPERVISOR")) {
					if(delayEquipments.getBmr_no() == null || "".equals(delayEquipments.getBmr_no())) {
						return new ResponseEntity(new ApiResponse(false, "Bmr Should be mandatory"), HttpStatus.BAD_REQUEST);
					}
					delayEquipments.setStatus(AppConstants.supervisorSave);
					if(delayEquipments.getDetails() != null || !delayEquipments.getDetails().isEmpty()) {
						for(BMR_ProcessDelayEqupmentLine stoppageLine : delayEquipments.getDetails()) {
							stoppageLine.setDelayDetails(delayEquipments);
						}
					}
					bmr_processdelayequpmentrepository.save(delayEquipments);
				} else {
					return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to save stoppage reports"), HttpStatus.BAD_REQUEST);
				}
			} catch (Exception ex) {
				log.error("*** Unable to Save Stoppage Details *** " + ex);
				String msg = sca.getErrorMessage(ex);
				return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Stoppage Details " + msg), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(delayEquipments, HttpStatus.OK);
		}

		// SUBMIT STOPPAGE
	 
		public ResponseEntity<?> submitStoppage(BMR_ProcessDelayEqupment delayEquipments) {
	 
			SCAUtil sca = new SCAUtil();
			String userRole = getUserRole();
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	 
			try {
	 
				if (userRole.equals("ROLE_SUPERVISOR")) {
	 
					if (delayEquipments.getBmr_no() == null || "".equals(delayEquipments.getBmr_no())) {
						return new ResponseEntity(new ApiResponse(false, "Bmr Should be mandatory"),
								HttpStatus.BAD_REQUEST);
					}
	 
					delayEquipments.setStatus(AppConstants.supervisorApprovedStatus);
	 
					if (delayEquipments.getDetails() != null || !delayEquipments.getDetails().isEmpty()) {
						for (BMR_ProcessDelayEqupmentLine stoppageLine : delayEquipments.getDetails()) {
							stoppageLine.setDelayDetails(delayEquipments);
						}
					}
	 
					bmr_processdelayequpmentrepository.save(delayEquipments);
	 
				} else {
					return new ResponseEntity(new ApiResponse(false, userRole + " not authroized to save stoppage reports"),
							HttpStatus.BAD_REQUEST);
				}
	 
			} catch (Exception ex) {
	 
				log.error("*** Unable to Save Stoppage Details *** " + ex);
				String msg = sca.getErrorMessage(ex);
				return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Stoppage Details " + msg),
						HttpStatus.BAD_REQUEST);
			}
	 
			return new ResponseEntity(delayEquipments, HttpStatus.OK);
		}
	

	// GET USER ROLE
		private String getUserRole() {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			if (authentication != null && authentication.isAuthenticated()) {
				return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
						.orElse(null);
			}
			return null;
		}
	
		
			// GET LOV OF QA INSPECTOR
		
		public ResponseEntity<?> getQAInspectorLOV(Long dept_id) {
			
			List<String> inspectorList = new ArrayList<String>();
			
			List<IdAndValuePair> inspectorValueList = new ArrayList<IdAndValuePair>();
			
			try {
				
				inspectorList = bmrQualityReleaseRepository.getQaInspectorByDepartment(dept_id);
				
				Long id =  (long) 1;
				
				for(String temp : inspectorList) {
					
					IdAndValuePair value = new IdAndValuePair();
					value.setValue(temp);
					value.setId(id);
					
					id++;
					
					inspectorValueList.add(value);
				}
				
			} catch(Exception ex) {
				
				SCAUtil sca = new SCAUtil();
				
				log.error("*** Unable to get QA inspector Details *** " + ex);
				String msg = sca.getErrorMessage(ex);
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Unable to get QA inspector Details !!!") + ex.getMessage());
				
			}
			
			return ResponseEntity.status(HttpStatus.OK).body(inspectorValueList);
			
		}
		
		
		// GET LOV OF QA INSPECTOR
		
				public ResponseEntity<?> getQAManagerLOV(Long dept_id) {
					
					List<String> inspectorList = new ArrayList<String>();
					
					List<IdAndValuePair> inspectorValueList = new ArrayList<IdAndValuePair>();
					
					try {
						
						inspectorList = bmrQualityReleaseRepository.getQaManagerByDepartment(dept_id);
						
						Long id =  (long) 1;
						
						for(String temp : inspectorList) {
							
							IdAndValuePair value = new IdAndValuePair();
							value.setValue(temp);
							value.setId(id);
							
							id++;
							
							inspectorValueList.add(value);
						}
						
					} catch(Exception ex) {
						
						SCAUtil sca = new SCAUtil();
						
						log.error("*** Unable to get QA Manager Details *** " + ex);
						String msg = sca.getErrorMessage(ex);
						return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Unable to get QA Manager Details !!!") + ex.getMessage());
						
					}
					
					return ResponseEntity.status(HttpStatus.OK).body(inspectorValueList);
					
				}
		
		
		// LOV OF APPROVED RECORDS

		public ResponseEntity<?> approvedBMR(String formNumber) {

			List<IdAndValuePair> bmrList = new ArrayList<>();
			List<String> rawCottonList = new ArrayList<>();

			try {

				if (formNumber.equals("PRD01/F04")) {
					rawCottonList = appliedRawCottonRepository.approvedBMRforAppliedRawCottonF04();

				}
				
				else if (formNumber.equals("PRD01/F05")) {
					rawCottonList = contRawCottonRepository.findApprovedPH();
				}
				
				else if(formNumber.equals("PH-PRD01/F09")) {
					System.out.println("Cakepress");
					rawCottonList = cakePressF09Repository.getHodApproveBmr();
					
					System.out.println("Cakepres 8899s");
				}
				
				else if (formNumber.equals("PH-PRD01/F-011")) {
					
					System.out.println("System");
					
					rawCottonList = bleachappliedcontabcottonf08repository.findApprovedPH();
					
//					rawCottonList = bleachContAbsBleachedCottonF18Repository.findApprovedPH();
					
				}
				
				else if (formNumber.equals("PH-PRD01/F-012")) {
					
					rawCottonList = bleachContAbsBleachedCottonF18Repository.findApprovedPH();
				}
				
				else if(formNumber.equalsIgnoreCase("PH-PRD01/F01")) {
					
					rawCottonList = laydownChecklistRepository.getLayDownNumberList();
				} else if(formNumber.equals("PH-PRD01/F34")) {
					
					rawCottonList = cardingRepository.approvedBMR();
					
				} else if(formNumber.equals("PH-PRD01/F13")) {
					
					rawCottonList = jobCardRepository.approvedBmr();
				}
				
				Long id = (long) 1;
				for (String list : rawCottonList) {

					IdAndValuePair mail = new IdAndValuePair();
					mail.setValue(list);
					mail.setId(id);
					id++;

					bmrList.add(mail);
				}

			} catch (Exception ex) {
				SCAUtil sca = new SCAUtil();
				log.error("*** Unable to Get BMR for Selected Form *** " + ex);
				String msg = sca.getErrorMessage(ex);
				return new ResponseEntity<>(new ApiResponse(false, "Unable to Get" + msg), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity(bmrList, HttpStatus.OK);

		}
		
		
		
}
