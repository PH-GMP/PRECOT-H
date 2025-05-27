package com.focusr.Precot.mssql.database.controller.Store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.Store.StoreAuditService;
import com.focusr.Precot.payload.StoreAuditRequest;


@RestController
@RequestMapping("/api/Store/Audit")
public class StoreAuditController {
	
	@Autowired 
	private StoreAuditService auditService;
	

	
	 @PostMapping("/getStoreAuditSummary")
		public ResponseEntity<?> getAuditSummary(@RequestBody StoreAuditRequest summeryrequest) {

		 ResponseEntity<?> message = auditService.getAuditSummary(summeryrequest);

			return message;
		}

}
