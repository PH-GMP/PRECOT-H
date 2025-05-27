package com.focusr.Precot.mssql.database.controller.drygoods;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.drygoods.DryGoodsLayDownGeneration;
import com.focusr.Precot.mssql.database.repository.drygoods.DryGoodsLayDownGenerationRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.LayDownBaleNoMappingRepository;
import com.focusr.Precot.mssql.database.service.drygoods.LayDownGenerationService;
import com.focusr.Precot.util.drygoods.LaydownBaleNoMappingRequest;

@RestController
@RequestMapping("/api/goodsLaydown")
public class LayDownGenerationController {
	@Autowired
	LayDownGenerationService laydowngenerationservice;
	@Autowired
	DryGoodsLayDownGenerationRepository drygoodslaydowngenerationrepository;
	@Autowired
	LayDownBaleNoMappingRepository layDownBaleNoMappingRepository;

	@GetMapping("/generation")
	public ResponseEntity<?> laydownGeneration(@RequestParam Map<String, String> requestParams, Principal principal) {

		Long department_id = Long.valueOf(requestParams.get("department_id"));

		ResponseEntity<?> resp = laydowngenerationservice.generateLaydownNumber(department_id);
		return resp;
	}

	@GetMapping("/getLaydownByDepartment")
	public ResponseEntity<?> laydownGenerationList(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		Long department_id = Long.valueOf(requestParams.get("department_id"));

		ResponseEntity<?> resp = laydowngenerationservice.getLaydownByDeptId(department_id);
		return resp;
	}

	@GetMapping("/getLaydownForMappingByDepartment")
	public ResponseEntity<?> laydownMappingGenerationList(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		Long department_id = Long.valueOf(requestParams.get("department_id"));

		ResponseEntity<?> resp = laydowngenerationservice.getOpenLaydownByDeptId(department_id);
		return resp;
	}

	@GetMapping("/LaydownLov")
	public ResponseEntity<?> getOpenLaydownList() {

		List<DryGoodsLayDownGeneration> resp = drygoodslaydowngenerationrepository.laydownLovForForms();
		return ResponseEntity.ok(resp);
	}

	@GetMapping("/BaleNoLov")
	public ResponseEntity<?> getBaleNoLov() {

		List<String> resp = drygoodslaydowngenerationrepository.baleNoList();

		List<String> baleNo = layDownBaleNoMappingRepository.getBaleNO();

		List<String> filteredResp = resp.stream().filter(baleNumber -> !baleNo.contains(baleNumber))
				.collect(Collectors.toList());

		return ResponseEntity.ok(filteredResp);
	}

	@PostMapping("/LaydownBaleNoMapping")
	public ResponseEntity<?> LaydownBaleNoMapping(@Valid @RequestBody LaydownBaleNoMappingRequest request,
			HttpServletRequest http) {

		ResponseEntity<?> response = laydowngenerationservice.LaydownBaleNoMapping(request, http);

		return response;
	}

	@PostMapping("/closingLaydown")
	public ResponseEntity<?> LaydownClosing(@Valid @RequestBody DryGoodsLayDownGeneration request, Principal principal,
			HttpServletRequest http) {

		ResponseEntity<?> resp = laydowngenerationservice.laydownClosing(request, principal, http);
		return resp;

	}

	// GET DATE AND SHIFT

	@GetMapping("/getLaydownByDateAndShift")
	public ResponseEntity<?> getLaydownByDateAndShift(@RequestParam Map<String, String> requestParams,
			Principal principal) {

		String date = requestParams.get("date");

		ResponseEntity<?> resp = laydowngenerationservice.getLaydownBasedoNDateShift(date);
		return resp;
	}
	
	

}
