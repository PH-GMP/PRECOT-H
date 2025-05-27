package com.focusr.Precot.mssql.database.controller.splunance;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.splunance.ProcessSetupDetailsWinterF005;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.splunance.SpulanceService4;
import com.focusr.Precot.payload.ApproveResponse;

/**
 * 
 * @author Sivaprakasam.V
 * 
 * 
 *         F-005
 *
 */

@RestController
@RequestMapping("/api/spulance")
public class SpulanceController4 {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private SpulanceService4 spulanceservice4;

	@PostMapping("/saveWinderF005")
	public ResponseEntity<?> saveWinderF005(@Valid @RequestBody ProcessSetupDetailsWinterF005 details,
			BindingResult result, Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> Response = spulanceservice4.saveWinderF005(details, http);

		return Response;
	}

	@PostMapping("/submitWinderF005")
	public ResponseEntity<?> submitWinderF005(@Valid @RequestBody ProcessSetupDetailsWinterF005 details,
			BindingResult result, Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> Response = spulanceservice4.submitWinderF005(details, http);

		return Response;
	}

	@GetMapping("/getWinderOperatorOrderDetailsF005")
	public ResponseEntity<?> getWinderF005(@RequestParam String order_no, @RequestParam String date,
			@RequestParam String shift) {

		ResponseEntity<?> response = spulanceservice4.getWinderF005(order_no, date, shift);

		return response;
	}

	@GetMapping("/getOperatorSummeryF005")
	public ResponseEntity<?> getOperatorSummeryF005(HttpServletRequest http) {

		ResponseEntity<?> response = spulanceservice4.getOperatorSummeryF005(http);

		return response;
	}

	@GetMapping("/getsupervisorHodSummeryF005")
	public ResponseEntity<?> getsupervisorHodSummeryF005(HttpServletRequest http) {

		ResponseEntity<?> response = spulanceservice4.supervisorHodSummary(http);

		return response;
	}

	@GetMapping("/getWinderPrintDetailsF005")
	public ResponseEntity<?> getWinderPrintDetailsF005(@RequestParam String order_no, @RequestParam String date,
			@RequestParam String shift) {

		ResponseEntity<?> response = spulanceservice4.getWinderPrintDetailsF005(order_no, date, shift);

		return response;
	}

	@PutMapping("/approveOrReject")
	public ResponseEntity<?> approveRejectionReportF07(@Valid @RequestBody ApproveResponse approvalResponse,
			HttpServletRequest http) {

		ResponseEntity<?> resp = spulanceservice4.approveRejectionReport(approvalResponse, http);
		return resp;
	}

}
