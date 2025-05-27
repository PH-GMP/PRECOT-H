package com.focusr.Precot.mssql.database.controller.splunance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.splunance.ReportService;

@RestController
@RequestMapping("/api/spulance")
public class ReportController {
	
	
	@Autowired
	private ReportService reportservice;

	
	// CR - Logic changes validating based on order also
	
	@GetMapping("/getMahloData")
	public ResponseEntity<?> fetchPDF(@RequestParam String date, String shift, String orderNumber) {
		ResponseEntity<?> resp = reportservice.pdfApproach2(date,shift, orderNumber);
		return resp;
	}	

	
	
	
	
}
