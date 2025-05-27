package com.focusr.Precot.mssql.database.controller.engineering;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.engineering.EngineeringAuditService;
import com.focusr.Precot.payload.engineering.EngineeringAuditRequest;

@RestController
@RequestMapping("/api/Engineering/Audit")
public class EngineeringAuditController {

	@Autowired 
	private EngineeringAuditService auditService;
	
	
	
	@PostMapping("/getengineeringAuditSummary")
	public ResponseEntity<?> getAuditSummary(@RequestBody EngineeringAuditRequest summeryrequest) {

	 ResponseEntity<?> message = auditService.getAuditSummary(summeryrequest);

		return message;
	}
	
	
	
	
	
	

}
