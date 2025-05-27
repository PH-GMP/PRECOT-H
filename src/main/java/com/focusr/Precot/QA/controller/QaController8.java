package com.focusr.Precot.QA.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.QA.model.batchReleaseChecklist;
import com.focusr.Precot.QA.model.newamplerequestQA;
import com.focusr.Precot.QA.model.productionretainedsampleregister40;
import com.focusr.Precot.QA.service.QaService8;
import com.focusr.Precot.payload.ApproveResponse;

@RestController
@RequestMapping("/api/QA")
public class QaController8 {

	@Autowired
	QaService8 qaservice8;
	
	@PostMapping("/CL01/saveSampleRequest")
	public ResponseEntity<?> saveRPProdReport(
			@Valid @RequestBody newamplerequestQA newSample, HttpServletRequest http) {


		ResponseEntity<?> resp = qaservice8.saveSampleRequest(newSample, http);
		return resp;

	}
	
	@PostMapping("/CL01/submitSampleRequest")
	public ResponseEntity<?> submitRPProdReport(
			 @RequestBody newamplerequestQA newSample, HttpServletRequest http) {

		
	
		

		ResponseEntity<?> resp = qaservice8.submitSampleRequest(newSample, http);
		return resp;

	}
	
	@GetMapping("/CL01/getnewSample/{id}")
	public ResponseEntity<?> getnewSample(@PathVariable Long id) {

		ResponseEntity<?> resp = qaservice8.getTestByIdCLF029(id);
		return resp;

	}
	
	@GetMapping("/CL01/SampleRequest")
	public ResponseEntity<?> getnewSamplebyBatch(@RequestParam(required = false) String sub_batch_id) {

		ResponseEntity<?> resp = qaservice8.getbyRequis(sub_batch_id);
		return resp;

	}

	
	@GetMapping("/CL01/print")
	public ResponseEntity<?> printCL01(@RequestParam(required = false) String requis_no,@RequestParam(required = false) String date,@RequestParam(required = false) String month,@RequestParam(required = false) String year) {

		ResponseEntity<?> resp = qaservice8.printNewSampleRequest(requis_no,date,month,year);
		return resp;

	}
	
	@GetMapping("/CL01/GETALL")
	public ResponseEntity<?> getAllListCL01(HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice8.getallTestCLF029(http);
		return resp;

	}

//-----------------------------------------------------F047---------------------------------------
	
	@PostMapping("/F047/savebatchcheckList")
	public ResponseEntity<?> savebatchrelease(
			@Valid @RequestBody batchReleaseChecklist batchrelease, HttpServletRequest http) {


		ResponseEntity<?> resp = qaservice8.savebatchcheckList( batchrelease, http);
		return resp;

	}
	
	@PostMapping("/F047/submitbatchcheckList")
	public ResponseEntity<?> submitbatchrelease(
			 @RequestBody batchReleaseChecklist batchrelease, HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice8.submitbatchcheckList(batchrelease, http);
		return resp;

	}
	
	@GetMapping("/F047/getbatch/{id}")
	public ResponseEntity<?> getbatch(@PathVariable Long id) {

		ResponseEntity<?> resp = qaservice8.getTestByIdCLF047(id);
		return resp;

	}
	
	@GetMapping("/F047/batchrelease")
	public ResponseEntity<?> getnewSamplebyBatch(@RequestParam(required = false) String bmr,@RequestParam(required = false) String department , @RequestParam(required = false) String year,@RequestParam(required = false) String month) {

		ResponseEntity<?> resp = qaservice8.getbybatchcheck(bmr,department,year,month);
		return resp;

	}
	
	@GetMapping("/F047/details")
	public ResponseEntity<?> getbatchPde( @RequestParam(required = false) String department,@RequestParam(required = false) String bmr) {

		ResponseEntity<?> resp = qaservice8.getPde(department, bmr);
		return resp;

	}

	
	@GetMapping("/F047/print")
	public ResponseEntity<?> printF047(@RequestParam(required = false) String bmr,@RequestParam(required = false) String department) {

		ResponseEntity<?> resp = qaservice8.printNewbatchcheckList(bmr,department);
		return resp;

	}
	
	@GetMapping("/F047/GETALL")
	public ResponseEntity<?> getAllListF047(HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice8.getallTestCLF047(http);
		return resp;

	}
	
	@PostMapping("/F047/approval")
	public ResponseEntity<?> approvalF047(@RequestBody   ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice8.approveF047(approvalResponse, http);
		return resp;

	}
	
	//--------------------------------------------------------------
	
	
	@PostMapping("/F040/saveproductionRetain")
	public ResponseEntity<?> saveproductionRetain(
			@Valid @RequestBody productionretainedsampleregister40 productionRetain, HttpServletRequest http) {


		ResponseEntity<?> resp = qaservice8.saveProduction( productionRetain, http);
		return resp;

	}
	
	@PostMapping("/F040/submitproductionRetain")
	public ResponseEntity<?> submitproductionRetain(
			 @RequestBody productionretainedsampleregister40 productionRetain, HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice8.saveSubmit(productionRetain, http);
		return resp;

	}
	
	@GetMapping("/F040/getProduction/{id}")
	public ResponseEntity<?> getProductionId(@PathVariable Long id) {

		ResponseEntity<?> resp = qaservice8.getProductionById(id);
		return resp;

	}
	
	@DeleteMapping("/F040/deleteChildA/{id}")
	public ResponseEntity<?> deleteChildA(@PathVariable Long id) {

		ResponseEntity<?> resp = qaservice8.deleteA(id);
		return resp;

	}
	
	@DeleteMapping("/F040/deleteChildB/{id}")
	public ResponseEntity<?> deleteChildB(@PathVariable Long id) {

		ResponseEntity<?> resp = qaservice8.deleteB(id);
		return resp;

	}
	
	@GetMapping("/F040/productionRetain")
	public ResponseEntity<?> getProductionUniqueRetain(@RequestParam(required = false) String date,@RequestParam(required = false) String shift) {

		ResponseEntity<?> resp = qaservice8.getProductionUnique(date,shift);
		return resp;

	}

	
	@GetMapping("/F040/print")
	public ResponseEntity<?> printF040(@RequestParam(required = false) String month,@RequestParam(required = false) String year) {

		ResponseEntity<?> resp = qaservice8.printProduction(month,year);
		return resp;

	}
	
	@GetMapping("/F040/GETALL")
	public ResponseEntity<?> getAllListF040(HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice8.getallProduction(http);
		return resp;

	}
	
	@PostMapping("/F040/approval")
	public ResponseEntity<?> approvalF040(@RequestBody   ApproveResponse approvalResponse, HttpServletRequest http) {

		ResponseEntity<?> resp = qaservice8.approveProduction(approvalResponse, http);
		return resp;

	}
	
	
}
