package com.focusr.Precot.mssql.database.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.service.DocumentService;

@RestController
@RequestMapping("/api/document")
public class DocumentController {

	@Autowired
	private DocumentService documentService;
	
	@GetMapping("/formCounts")
	private ResponseEntity<?> formatCounts(@RequestParam Map<String, String> requestParams,
			Principal principal) {
		
		String fromdate = requestParams.get("fromdate");
		String todate = requestParams.get("todate");
		
		ResponseEntity<?> resp = documentService.getSubmittedFormCountsForDepartment(fromdate, todate);
		return resp;
	}
	
}
