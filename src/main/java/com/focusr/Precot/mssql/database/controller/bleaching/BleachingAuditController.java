package com.focusr.Precot.mssql.database.controller.bleaching;

import java.security.Principal;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.bleaching.BleachingAuditService;
import com.focusr.Precot.payload.BleacfF41Request;
import com.focusr.Precot.util.bleaching.DashboardRequest;

@RestController
@RequestMapping("/api/Bleaching/audit")
public class BleachingAuditController {

	@Autowired
	private BleachingAuditService bleachingAuditService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@GetMapping("/laydownChecklist")
	public ResponseEntity<?> downloadLaydownReport(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String laydownNumber = requestParams.get("laydownNumber");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateLaydownChecklistF42Report(laydownNumber, start, end);

		return resp;
	}

	@GetMapping("/EquipmentF11")
	public ResponseEntity<?> downloadEquipmentF11(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr = requestParams.get("bmr");
		String subBatchNo = requestParams.get("subBatchNo");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateEquipmentF11Report(bmr, subBatchNo, start, end);

		return resp;
	}
	// F-18

	@GetMapping("/bleachConstAbsF18")
	public ResponseEntity<?> downloadbleachConstAbsF18(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr = requestParams.get("bmr");
		String baleNo = requestParams.get("baleNo");
		String batchNo = requestParams.get("batchNo");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateBleachConstAbsF18Report(bmr, baleNo, batchNo, start,
				end);

		return resp;
	}

	// F-05

	@GetMapping("/RawCottonF05")
	public ResponseEntity<?> downloadRawCottonF05(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String phNo = requestParams.get("phNo");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateRawCottonF05Report(phNo, start, end);

		return resp;
	}

	// F-03

	@GetMapping("/MetalDetectorF03")
	public ResponseEntity<?> downloadMetalDetectorF03(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String section = requestParams.get("section");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateMetalDetectorF03Report(section, start, end);

		return resp;
	}

	// F-33

	@GetMapping("/EquipmentUsageF33")
	public ResponseEntity<?> downloadEquipmentUsageF33(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateEquipmentUsageF33Report(start, end);

		return resp;
	}

	// F-36

	@GetMapping("/ShiftLogBookF36")
	public ResponseEntity<?> downloadShiftLogBookF36(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String shift = requestParams.get("shift");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateShiftLogBookF36Report(shift, start, end);

		return resp;
	}

	// F-02

	@GetMapping("/HouseKeepingF02")
	public ResponseEntity<?> downloadHouseKeepingF02(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateHouseKeepingF02Report(start, end);

		return resp;
	}

	// F-02A

	@GetMapping("/HouseKeepingF02A")
	public ResponseEntity<?> downloadHouseKeepingF02A(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateHouseKeepingF02AReport(start, end);

		return resp;
	}

	// F-13

	@GetMapping("/BleachJobcardF13")
	public ResponseEntity<?> downloadBleachJobcardF13(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr = requestParams.get("bmr");
		String subBatchNo = requestParams.get("subBatchNo");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateBleachJobcardF13Report(bmr, subBatchNo, start, end);

		return resp;
	}

	// F-34

	@GetMapping("/BlowroomAndCardingF34")
	public ResponseEntity<?> downloadBlowroomAndCardingF34(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr = requestParams.get("bmr");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateBlowroomAndCardingF34Report(bmr, start, end);

		return resp;
	}

	// F-34

	@GetMapping("/MachineCleaningF38")
	public ResponseEntity<?> downloadMachineCleaningF38(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmrFrom = requestParams.get("bmrFrom");
		String bmrTo = requestParams.get("bmrTo");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateMachineCleaningF38Report(bmrFrom, bmrTo, start, end);

		return resp;
	}

	// DASHBOARD

	@PostMapping("/dashboard")
	public ResponseEntity<?> dashboardTracker(@Valid @RequestBody DashboardRequest dashboardRequest,
			HttpServletRequest http, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = bleachingAuditService.dahsboardTracker(dashboardRequest, http);

		return response;

	}

	//

	// F-09

	@GetMapping("/CakePressF09")
	public ResponseEntity<?> downloadCakePressHistoryF09(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr = requestParams.get("bmr");
		String subBatchNo = requestParams.get("subBatchNo");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateCakePressHistoryF09Report(bmr, subBatchNo, start, end);

		return resp;
	}

	// ONE TO MANY EXCEL DOWNLOAD

	// F-04

	@GetMapping("/RawCottonF04")
	public ResponseEntity<?> downloadRawCottonF04(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String bmr = requestParams.get("bmr");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateRawCottonF04Report(bmr, start, end);

		return resp;
	}

	// F-08

	@GetMapping("/ABCottonF08")
	public ResponseEntity<?> downloadABCottonF08(@RequestParam Map<String, String> requestParams, Principal principal) {

		String bmr = requestParams.get("bmr");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateABCottonF08Report(bmr, start, end);

		return resp;
	}

	// F-01

	@GetMapping("/SanitizationF01")
	public ResponseEntity<?> downloadSanitizationF01(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String month = requestParams.get("month");
		String year = requestParams.get("year");
		String week = requestParams.get("week");
		String start = requestParams.get("start");
		String end = requestParams.get("end");

		ResponseEntity<?> resp = bleachingAuditService.generateSanitizationF01Report(month, year, week, start, end);

		return resp;
	}

	@GetMapping("/handSanitizationF41")
	public ResponseEntity<?> handSanitizationF41(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String from_date = requestParams.get("from_date");
		String to_date = requestParams.get("to_date");
		String shift = requestParams.get("shift");
		
		ResponseEntity<?> message = bleachingAuditService.bleachingHandSanitation(from_date, to_date, shift);

		return message;
	}
	
	@GetMapping("/machineCleaningRecordF16")
	public ResponseEntity<?> machineCleaningRecordF16(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String from_date = requestParams.get("from_date");
		String to_date = requestParams.get("to_date");
		String month = requestParams.get("month");
		String year = requestParams.get("year");
		
		ResponseEntity<?> message = bleachingAuditService.machineCleaningRecordF16(from_date, to_date, month,year);

		return message;
	}

}
