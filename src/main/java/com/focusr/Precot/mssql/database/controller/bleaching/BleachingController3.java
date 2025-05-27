package com.focusr.Precot.mssql.database.controller.bleaching;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.Stoppage;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookCakePressF09;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34;
import com.focusr.Precot.mssql.database.model.bleaching.BleachSanitizationOfMechineAndSurfaceF01;
import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;
import com.focusr.Precot.mssql.database.repository.StoppageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogBookCakePressF09Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachSanitizationOfMechineAndSurfaceF01Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachShiftLogBookF36Repository;
import com.focusr.Precot.mssql.database.service.bleaching.BleachingService3;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.GetStoppageDetailsResponse;
import com.focusr.Precot.payload.ShoppageDetails;
import com.focusr.Precot.payload.StoppageDetailsRequest;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.SCAUtil;

@RestController
@RequestMapping("/api/bleach")
public class BleachingController3 {

	@Autowired
	BleachingService3 bleachingservice;

	@Autowired
	BleachShiftLogBookF36Repository bleachshiftlogbookf36repository;

	@Autowired
	BleachSanitizationOfMechineAndSurfaceF01Repository bleachsanitizationofmechineandsurfacef01repository;
	@Autowired
	StoppageDetailsRepository stoppagedetailsrepository;

	@Autowired
	private BleachEquipmentUsageLogBookCakePressF09Repository bleachequipmentusagelogbookcakepressf09repository;
	@Autowired
	private BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository bleachequipmentusagelogbookblowroomandcardingf34repository;

	@Autowired
	private JwtTokenProvider tokenProvider;
	SCAUtil sca = new SCAUtil();

	private static final Logger log = LoggerFactory.getLogger(BleachShiftLogBookF36.class);

	// ===========================================Shift log book
	// F36=============================================//
	@PostMapping("/createOrUpdateShiftlogBookF36")
	public ResponseEntity<?> createUpdate_Shiftlogbook(@RequestBody BleachShiftLogBookF36 machineReq,
			HttpServletRequest http) {
		return bleachingservice.createUpdateShiftlogBookF36(machineReq, http);
	}

	@GetMapping("/getShiftlogBookF36Details/{slb_id}")
	public ResponseEntity<?> ShiftlogbookDetails(@PathVariable("slb_id") Long slb_id) {
		ResponseEntity<?> message = bleachingservice.ShiftlogbookDetails(slb_id);
		return message;
	}

	@GetMapping("/getShiftlogBookF36Details")
	public ResponseEntity<?> ShiftlogbookDetails() {
		List<BleachShiftLogBookF36> logbookDetails = new ArrayList<>();
		try {
			logbookDetails = bleachshiftlogbookf36repository.findAll();

		} catch (Exception e) {
			log.error("***************** Unable to get list Of Shift Log Book Details *********************\n", e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get list Of Shift Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(logbookDetails, HttpStatus.OK);
	}

	/*
	 * @PostMapping("/findByDateAndShift") public ResponseEntity<Object>
	 * findByDateAndShift(@RequestBody BleachShiftLogBookF36 request) {
	 * List<BleachShiftLogBookF36> results =
	 * bleachshiftlogbookf36repository.findByDateAndShift(request.getDate(),
	 * request.getShift());
	 * 
	 * if (results.isEmpty()) { Map<String, String> noDataResponse = new
	 * HashMap<>(); noDataResponse.put("status", "No Data"); return new
	 * ResponseEntity<>(noDataResponse, HttpStatus.OK); }
	 * 
	 * return new ResponseEntity<>(results, HttpStatus.OK); }
	 */
	@PostMapping("/findByDateAndShift")
	public ResponseEntity<Object> findByDateAndShift(@RequestBody BleachShiftLogBookF36 request) {
		List<BleachShiftLogBookF36> results = bleachshiftlogbookf36repository.findByDateAndShift(request.getDate(),
				request.getShift());

		if (results.isEmpty()) {
			List<Map<String, String>> noDataResponse = new ArrayList<>();
			Map<String, String> noDataMap = new HashMap<>();
			noDataMap.put("status", "No Data");
			noDataResponse.add(noDataMap);
			return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	@PutMapping("/approveOrRejectShiftlogBookF36Details")
	public ResponseEntity<?> approveOrRejectShiftlogBookF36Details(HttpServletRequest http,
			@Valid @RequestBody BleachShiftLogBookF36 approveResponse, BindingResult result, Principal principal) {
		ResponseEntity<?> response = bleachingservice.approveShiftLogBook(approveResponse, http);
		return response;
	}
	
	@PutMapping("/approveOrRejectHOD")
	public ResponseEntity<?> approveOrRejectShiftlogBookF36DetailsHOD(HttpServletRequest http,
			@Valid @RequestBody ApproveResponse approveResponse, BindingResult result, Principal principal) {
		ResponseEntity<?> response = bleachingservice.approveShiftLogBookF36(approveResponse, http);
		return response;
	}

	// GET SUMMARY FOR F36

	@GetMapping("/ShiftlogBookF36SummaryForSupervisor")
	public ResponseEntity<Object> getShiftlogBookF36SummaryForSupervisor(HttpServletRequest http) {
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		List<BleachShiftLogBookF36> results = bleachshiftlogbookf36repository.getsummaryForSupervisor();

		if (results.isEmpty()) {
			Map<String, String> noDataResponse = new HashMap<>();
			noDataResponse.put("status", "No Data");
			return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	@GetMapping("/ShiftlogBookF36SummaryForHod")
	public ResponseEntity<Object> getShiftlogBookF36SummaryForHod(HttpServletRequest http) {
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		List<BleachShiftLogBookF36> results = bleachshiftlogbookf36repository.getsummaryForHod();

		if (results.isEmpty()) {
			Map<String, String> noDataResponse = new HashMap<>();
			noDataResponse.put("status", "No Data");
			return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	// =============================================Sanitization of machine and
	// surfaces F01========================================================//
	@PostMapping("/saveSanitizationMechineAndSurface")
	public ResponseEntity<?> saveSanitizationRecord(@RequestBody BleachSanitizationOfMechineAndSurfaceF01 record,
			HttpServletRequest http) {
		ResponseEntity<?> createdRecord = bleachingservice.saveSanitizationMachineSurfaces(record, http);
		return createdRecord;
	}

	@PostMapping("/submitSanitizationMechineAndSurface")
	public ResponseEntity<?> submitSanitizationRecord(@RequestBody BleachSanitizationOfMechineAndSurfaceF01 record,
			HttpServletRequest http) {
		ResponseEntity<?> createdRecord = bleachingservice.submitSanitizationMachineSurface(record, http);
		return createdRecord;
	}

	@GetMapping("/getSanitizationMechineAndSurfaceDetails/{sms_id}")
	public ResponseEntity<?> getSanitizationMechineAndSurfaceDetails(@PathVariable("sms_id") Long sms_id) {

		ResponseEntity<?> sanitationDetails = bleachingservice.getSanitizationMachineSurface(sms_id);

		return sanitationDetails;
	}
	
//	@GetMapping("/getMonthYearSanitizationMechineAndSurfaceDetails")
	@GetMapping("/getdateSanitizationMechineAndSurfaceDetails/{month}/{year}/{week}")
	public ResponseEntity<?> getdateSanitizationMechineAndSurfaceDetails(@PathVariable("month") String month, @PathVariable("year") String year , @PathVariable("week") String week) {
 
		ResponseEntity<?> sanitationDetails = bleachingservice.getdateSanitizationMechineAndSurfaceDetails(month,year,week);
 
		return sanitationDetails;
	}

	@PostMapping("/findSanitizationMechineAndSurfaceByMonthYear")
	public ResponseEntity<Object> getSanitizationRecordByMonthAndYear(
			@RequestBody BleachSanitizationOfMechineAndSurfaceF01 request) {
		List<BleachSanitizationOfMechineAndSurfaceF01> results = bleachsanitizationofmechineandsurfacef01repository
				.findByMonthAndYear(request.getMonth(), request.getYear());

		if (results.isEmpty()) {
			Map<String, String> noDataResponse = new HashMap<>();
			noDataResponse.put("status", "No Data");
			return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	@GetMapping("/getSanitizationMechineAndSurfaceDetails")
	public ResponseEntity<?> getSanitizationMechineAndSurfaceAllDetails() {
		List<BleachSanitizationOfMechineAndSurfaceF01> allsanitizationDetails = new ArrayList<>();
		try {
			allsanitizationDetails = bleachsanitizationofmechineandsurfacef01repository.findAll();

		} catch (Exception e) {
			log.error("***************** Unable to get list Of Shift Log Book Details *********************\n", e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to get list Of Shift Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(allsanitizationDetails, HttpStatus.OK);
	}

	  @PutMapping("/approveOrRejectSanitizationMechineAndSurfaceDetails")
		public ResponseEntity<?> approveOrRejectSanitizationMechineAndSurfaceDetails(@Valid @RequestBody ApproveResponse approveResponse, BindingResult result, Principal principal, HttpServletRequest http)
		{
			ResponseEntity<?> response = bleachingservice.approveSanitizationLog(approveResponse, http);
			return response;
		}

	// GET STOPPAGE DETAIL FOR FORM 36 FROM CLIENT DB

	@PostMapping("/findStoppageByDateAndShift")
	public ResponseEntity<Object> findStoppageDetailsByDateAndShift(@RequestBody StoppageDetailsRequest request) {
		
		long shiftNumber = Long.parseLong(request.getShift_id());
		System.out.println(shiftNumber);
		
		List<GetStoppageDetailsResponse> results = stoppagedetailsrepository.findByDateAndShift(request.getPack_dt(),
				shiftNumber);

		if (results.isEmpty()) {
			Map<String, String> noDataResponse = new HashMap<>();
			noDataResponse.put("status", "No Data");
			return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	// GET SUMMARY FOR F01

	@GetMapping("/SanitizationMechineAndSurfaceSummaryForSupervisor")
	public ResponseEntity<Object> getSanitizationRecordSummaryForSupervisor(HttpServletRequest http) {
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		List<BleachSanitizationOfMechineAndSurfaceF01> results = bleachsanitizationofmechineandsurfacef01repository
				.getsummaryForSupervisor();

		if (results.isEmpty()) {
			Map<String, String> noDataResponse = new HashMap<>();
			noDataResponse.put("status", "No Data");
			return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	@GetMapping("/SanitizationMechineAndSurfaceSummaryForHod")
	public ResponseEntity<Object> getSanitizationMechineAndSurfaceSummaryForHod(HttpServletRequest http) {
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		List<BleachSanitizationOfMechineAndSurfaceF01> results = bleachsanitizationofmechineandsurfacef01repository
				.getsummaryForHod();

		if (results.isEmpty()) {
			Map<String, String> noDataResponse = new HashMap<>();
			noDataResponse.put("status", "No Data");
			return new ResponseEntity<>(noDataResponse, HttpStatus.OK);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	// ===========Form 09==============//
	@PostMapping("/saveEquipmentUsagelogbookCakepressF09")
	public ResponseEntity<?> saveEquipmentUsagelogbookCakepressF09(
			@RequestBody BleachEquipmentUsageLogBookCakePressF09 record, HttpServletRequest http) {
		ResponseEntity<?> createdRecord = bleachingservice.createUpdateEquipmentUsageLogBookF09(record, http);
		return createdRecord;
	}

	@PostMapping("/submitEquipmentUsagelogbookCakepressF09")
	public ResponseEntity<?> submitEquipmentUsagelogbookCakepressF09(
			@RequestBody BleachEquipmentUsageLogBookCakePressF09 record, HttpServletRequest http) {
		ResponseEntity<?> createdRecord = bleachingservice.submitEquipmentUsageLogBookF09(record, http);
		return createdRecord;
	}

	@GetMapping("/getEquipmentUsagelogbookCakepressF09/{equipc_id}")
	public ResponseEntity<?> getEquipmentUsagelogbookCakepressF09(@PathVariable("equipc_id") Long equipc_id) {

		ResponseEntity<?> sanitationDetails = bleachingservice.getbleachequipmentusagelogbookcakepressf09(equipc_id);

		return sanitationDetails;
	}

	@GetMapping("/getEquipmentUsagelogbookCakepressF09")
	public ResponseEntity<?> getEquipmentUsagelogbookCakepressF09() {
		List<BleachEquipmentUsageLogBookCakePressF09> allDetails = new ArrayList<>();
		try {
			allDetails = bleachequipmentusagelogbookcakepressf09repository.findAll();

		} catch (Exception e) {
			log.error(
					"***************** Unable to get list Of Equipment Usage Log Book Details *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of Equipment Usage Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(allDetails, HttpStatus.OK);
	}
	// GET SUMMARY FOR F09

	@GetMapping("/bleachequipmentusagelogbookf09SummaryForSupervisor")
	public ResponseEntity<Object> getbleachequipmentusagelogbookf09SummaryForSupervisor(HttpServletRequest http) {
		List<BleachEquipmentUsageLogBookCakePressF09> results = new ArrayList<>();
				
		try {
			results = bleachequipmentusagelogbookcakepressf09repository.getsummaryForSupervisor();
		}
		catch (Exception e) {
			log.error(
					"***************** Unable to get list *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}
	
	@PutMapping("/approveOrRejectF34")
	public ResponseEntity<?> approveOrRejectF34(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingservice.approveRejectF34(approveResponse, http);
		return resp;
	}
	
	@PutMapping("/approveOrRejectF09")
	public ResponseEntity<?> approveOrRejectF09(@Valid @RequestBody ApproveResponse approveResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = bleachingservice.approveRejectF09(approveResponse, http);
		return resp;
	}

	@GetMapping("/bleachequipmentusagelogbookf09SummaryForHod")
	public ResponseEntity<?> getbleachequipmentusagelogbookf09SummaryForHod(HttpServletRequest http) {

		List<BleachEquipmentUsageLogBookCakePressF09> allDetails = new ArrayList<>();
		try {
			allDetails = bleachequipmentusagelogbookcakepressf09repository.getsummaryForHod();

		} catch (Exception e) {
			log.error(
					"***************** Unable to get list *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(allDetails, HttpStatus.OK);
	}

	@GetMapping("/bleachequipmentusagelogbookf09byBMR")
	public ResponseEntity<?> getbleachequipmentusagelogbookf09byBMR(
			@RequestBody BleachEquipmentUsageLogBookCakePressF09 request) {
		
		List<BleachEquipmentUsageLogBookCakePressF09> allDetails = new ArrayList<>();
		try {
			allDetails = bleachequipmentusagelogbookcakepressf09repository
					.getDetailsByBMR(request.getBmrNumber());

		} catch (Exception e) {
			log.error(
					"***************** Unable to get list *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(allDetails, HttpStatus.OK);
	}
	
	
	// ======================================F34============================================================//

	@PostMapping("/savebleachequipmentusagelogbookf34")
	public ResponseEntity<?> saveEquipmentUsagelogbookBlowroomAndCardingF34(
			@RequestBody BleachEquipmentUsageLogbookBlowroomAndCardingF34 record, HttpServletRequest http) {
		ResponseEntity<?> createdRecord = bleachingservice.createUpdateEquipmentUsageLogBookF34(record, http);
		return createdRecord;
	}

	@PostMapping("/submitbleachequipmentusagelogbookf34")
	public ResponseEntity<?> submitEquipmentUsagelogbookBlowroomAndCardingF34(
			@RequestBody BleachEquipmentUsageLogbookBlowroomAndCardingF34 record, HttpServletRequest http) {
		ResponseEntity<?> createdRecord = bleachingservice.submitEquipmentUsageLogBookF34(record, http);
		return createdRecord;
	}

	@GetMapping("/getbleachequipmentusagelogbookf34/{equipb_id}")
	public ResponseEntity<?> getEquipmentUsageLogBookF34ById(@PathVariable Long equipb_id) {
		Optional<BleachEquipmentUsageLogbookBlowroomAndCardingF34> logBookEntry = bleachequipmentusagelogbookblowroomandcardingf34repository
				.findById(equipb_id);

		if (logBookEntry.isPresent()) {
			return ResponseEntity.ok(logBookEntry.get());
		} else {
			return new ResponseEntity<>(new ApiResponse(false, "Log book entry not found with id: " + equipb_id),
					HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getbleachequipmentusagelogbookf34")
	public ResponseEntity<?> getbleachequipmentusagelogbookf34() {
		List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> allDetails = new ArrayList<>();
		try {
			allDetails = bleachequipmentusagelogbookblowroomandcardingf34repository.findAll();

		} catch (Exception e) {
			log.error(
					"***************** Unable to get list Of Equipment Usage Log Book Details *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of Equipment Usage Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(allDetails, HttpStatus.OK);
	}

	// GET SUMMARY FOR F34

	@GetMapping("/bleachequipmentusagelogbookf34SummaryForSupervisor")
	public ResponseEntity<Object> getbleachequipmentusagelogbookf34SummaryForSupervisor(HttpServletRequest http) {
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> results = new ArrayList<>();

		try {
			results = bleachequipmentusagelogbookblowroomandcardingf34repository.getsummaryForSupervisor();

		} catch (Exception e) {
			log.error(
					"***************** Unable to get list Of Equipment Usage Log Book Details *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of Equipment Usage Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	@GetMapping("/bleachequipmentusagelogbookf34SummaryForHod")
	public ResponseEntity<?> getbleachequipmentusagelogbookf34SummaryForHod(HttpServletRequest http) {
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> results = new ArrayList<>();
		try {
			results = bleachequipmentusagelogbookblowroomandcardingf34repository.getsummaryForHod();
		} catch (Exception e) {
			log.error(
					"***************** Unable to get list Of Equipment Usage Log Book Details *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of Equipment Usage Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}
	
	
	

	@GetMapping("/bleachequipmentusagelogbookf09ByBmrRange")
	public ResponseEntity<?> getEquipmentByBmrNumberRange(@RequestParam("fromBmr") String fromBmr,
			@RequestParam("toBmr") String toBmr) {
		List<BleachEquipmentUsageLogBookCakePressF09> results = new ArrayList<>();
		try {
			results = bleachequipmentusagelogbookcakepressf09repository.findByBmrNumberRange(fromBmr, toBmr);

		} catch (Exception e) {
			log.error(
					"***************** Unable to get list Of Equipment Usage Log Book Details *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of Equipment Usage Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	/*
	 * @GetMapping("/bleachequipmentusagelogbookByBatchAndBmr") public
	 * ResponseEntity<?> getEquipmentByBatchAndBmrNumber(
	 * 
	 * @RequestParam("bmrNumber") String bmrNumber,
	 * 
	 * @RequestParam("subbatchNo") String subbatchNo ) {
	 * List<BleachEquipmentUsageLogBookCakePressF09> results = new ArrayList<>();
	 * try { results = bleachequipmentusagelogbookcakepressf09repository.
	 * findByBmrNumberAndSubbatch_no(bmrNumber, subbatchNo); } catch (Exception e) {
	 * log.
	 * error("***************** Unable to get list Of Equipment Usage Log Book Details *********************\n"
	 * , e); String msg = "Error: " + e.getMessage(); // Adjust this to your method
	 * of error message retrieval return new ResponseEntity<>(new ApiResponse(false,
	 * "Unable to get list Of Equipment Usage Log Book Details! " + msg),
	 * HttpStatus.BAD_REQUEST); } return new ResponseEntity<>(results,
	 * HttpStatus.OK); }
	 */
	@GetMapping("/bleachequipmentusagelogbookByBatchAndBmr")
	public ResponseEntity<?> getEquipmentByBatchAndBmrNumber(@RequestParam("bmrNumber") String bmrNumber,
			@RequestParam("subbatchNo") String subbatchNo) {
		Map<String, Object> response = new HashMap<>();
		BleachEquipmentUsageLogBookCakePressF09 results = new BleachEquipmentUsageLogBookCakePressF09();
		try {
			results = bleachequipmentusagelogbookcakepressf09repository.findByBmrNumberAndSubbatch_no(bmrNumber,
					subbatchNo);
			return new ResponseEntity<>(results, HttpStatus.OK);
		} catch (Exception e) {
			log.error(
					"***************** Unable to get list Of Equipment Usage Log Book Details *********************\n",
					e);
			String msg = "Error: " + e.getMessage();

			return new ResponseEntity<>(msg, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/bleachequipmentusagelogbookf34ByBmrNo")
	public ResponseEntity<?> getEquipmentByBmrNumber(@RequestParam("bmrNumber") String bmrNumber) {
		BleachEquipmentUsageLogbookBlowroomAndCardingF34 results = new BleachEquipmentUsageLogbookBlowroomAndCardingF34();
		try {
			results = bleachequipmentusagelogbookblowroomandcardingf34repository.getByBmrNo(bmrNumber);

		} catch (Exception e) {
			log.error(
					"***************** Unable to get list Of Equipment Usage Log Book Details *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of Equipment Usage Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(results, HttpStatus.OK);
	}

	@GetMapping("/bleachequipmentusagelogbookf34ByBmrRange")
	public ResponseEntity<?> getEquipmentByBmrNumberRangeF34(@RequestParam("fromBmr") String fromBmr,
			@RequestParam("toBmr") String toBmr) {
		List<BleachEquipmentUsageLogbookBlowroomAndCardingF34> results = new ArrayList<>();
		try {
			results = bleachequipmentusagelogbookblowroomandcardingf34repository.findByBmrNumberRange(fromBmr, toBmr);

		} catch (Exception e) {
			log.error(
					"***************** Unable to get list Of Equipment Usage Log Book Details *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of Equipment Usage Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(results, HttpStatus.OK);
	}
	//=======================================SUMMARY PRINT=========================================================================//
	// Get F36
	@GetMapping("/Print/ShiftlogBookF36")
	public ResponseEntity<Object> getPrintShiftlogBookF36(HttpServletRequest http) {
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		List<BleachShiftLogBookF36> results = new ArrayList<>();

		try {
			results = bleachshiftlogbookf36repository.getsummaryPrint();

		} catch (Exception e) {
			log.error(
					"***************** Unable to get list Of Equipment Usage Log Book Details *********************\n",
					e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get list Of Equipment Usage Log Book Details! " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(results, HttpStatus.OK);
	}
	
	@GetMapping("/getLastSubbatchNo")
	public ResponseEntity<?> getLastSubbatchNoF09() {
		ResponseEntity<?> response = bleachingservice.getLastSubbatchNoDetails();
		return response;
	}
	
	
	@GetMapping("/getLastSubbatchNo34")
	public ResponseEntity<?> getLastSubbatchNo34() {
		ResponseEntity<?> response = bleachingservice.getLastSubbatchNo34();
		return response;
	}

}
