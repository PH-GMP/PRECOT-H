package com.focusr.Precot.mssql.database.controller.splunance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.splunance.SpunlanceAuditService;
import com.focusr.Precot.payload.spulance.SpunlaceAuditRequest;

@RestController
@RequestMapping("/api/Spunlace/audit")
public class SpunlanceAuditController {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private SpunlanceAuditService spunlanceauditservice;

	@PostMapping("/getAuditSummary")
	public ResponseEntity<?> getAuditSummary(@RequestBody SpunlaceAuditRequest summeryrequest) {

		ResponseEntity<?> message = spunlanceauditservice.getAuditSummary(summeryrequest);

		return message;
	}



}
