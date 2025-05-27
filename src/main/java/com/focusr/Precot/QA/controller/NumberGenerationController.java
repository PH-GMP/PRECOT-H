package com.focusr.Precot.QA.controller;

import java.security.Principal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.QA.service.NumberGenerationService;
// ALL FORMS NUMBER GENERATION
//KAVIYA
@RestController
@RequestMapping("/api/qa/number")
public class NumberGenerationController {
	@Autowired
	NumberGenerationService numbergenerationservice;
	@GetMapping("/generation")
	public ResponseEntity<?> numberGeneration(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String formNumber = requestParams.get("formNumber");

		ResponseEntity<?> resp = numbergenerationservice.generateFormNumber(formNumber);
		return resp;
	}
	
	@GetMapping("/generationbasedDpt")
	public ResponseEntity<?> numberGenerationBasedDpt(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String formNumber = requestParams.get("formNumber");
		String department = requestParams.get("department");

		ResponseEntity<?> resp = numbergenerationservice.generateTrainingSessionNumber(formNumber,department);
		return resp;
	}

}
