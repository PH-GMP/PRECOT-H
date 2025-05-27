package com.focusr.Precot.mssql.database.controller.padpunching;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.padpunching.PadPunchingAuditService;
import com.focusr.Precot.payload.padpunching.PadPunchingAuditRequest;

@RestController
@RequestMapping("/api/padpunching/audit")
public class PadPunchingAuditController {
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private PadPunchingAuditService padPunchingAuditService;

	@PostMapping("/getAuditSummary")
	public ResponseEntity<?> getAuditSummary(@RequestBody PadPunchingAuditRequest summeryrequest) {

		ResponseEntity<?> message = padPunchingAuditService.getAuditSummary(summeryrequest);

		return message;
	}

}
