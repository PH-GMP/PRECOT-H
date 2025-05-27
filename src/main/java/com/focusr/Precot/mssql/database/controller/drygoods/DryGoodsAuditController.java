package com.focusr.Precot.mssql.database.controller.drygoods;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.drygoods.DryGoodsAuditService;
import com.focusr.Precot.payload.spulance.SpunlaceAuditRequest;
import com.focusr.Precot.util.drygoods.DryGoodsAuditRequest;

@RestController
@RequestMapping("/api/Drygoods/audit")
public class DryGoodsAuditController {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private DryGoodsAuditService drygoodsauditservice;

	@PostMapping("/getAuditSummary")
	public ResponseEntity<?> getAuditSummary(@RequestBody DryGoodsAuditRequest summeryrequest) {

		ResponseEntity<?> message = drygoodsauditservice.getAuditSummary(summeryrequest);

		return message;
	}
}
