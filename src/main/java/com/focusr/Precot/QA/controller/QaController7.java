package com.focusr.Precot.QA.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.QA.model.QaChangeControlLogBookF042;
import com.focusr.Precot.QA.model.QaMasterListOfSharpToolsF060;
import com.focusr.Precot.QA.model.QaSharpToolsIssueAndVerificationRegisterF062;
import com.focusr.Precot.QA.payload.ApproveResponseF042;
import com.focusr.Precot.QA.service.QaService7;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.payload.ApproveResponse;

@RestController
@RequestMapping("/api/QA/Service")
public class QaController7 {
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@Autowired
	private QaService7 qaService7;
	
	Logger log = LoggerFactory.getLogger(QaController7.class);
	
	
// ***************************** Change control log book - PH-QAD01-F-042 *********************************************************
	
	@PostMapping("/saveChangeControlLogBook")
    public ResponseEntity<?>  saveChangeControlLogBook(@RequestBody QaChangeControlLogBookF042 report, HttpServletRequest request) {
        try {
        	log.info("Received payload: {}", report);
        	ResponseEntity<?> response =  qaService7.saveChangeControlLogBook(report,request);
            return response;
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save Change Control Log Book.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PostMapping("/SubmitChangeControlLogBook")
	public ResponseEntity<?> SubmitChangeControlLogBook(HttpServletRequest http,
			@Valid @RequestBody QaChangeControlLogBookF042 changeControlLogBookF042, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService7.submitChangeControlLogBook(changeControlLogBookF042, http);

		return response;
	}
	
	

	@PutMapping("/approveChangeControlLogBook")
	public ResponseEntity<?> approveChangeControlLogBook(@Valid @RequestBody ApproveResponseF042 approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = qaService7.approveChangeControlLogBook(approvalResponse, http);
		return resp;
	}

//id
	@GetMapping("/changeControlLogBook/GetById/{id}")
	public ResponseEntity<?> getChangeControlLogBookId(@PathVariable Long id) {
		return qaService7.getChangeControlLogBookById(id);
	}
	

	@GetMapping("/changeControlLogBook/GetByChangeControlNO")
	public ResponseEntity<?> getChangeControlLogBookControlNo(@RequestParam String changeControlNo) {
		return qaService7.getChangeControlLogBookByChangeControlNo(changeControlNo);
	}


	@GetMapping("/changeControlLogBook/getAll")
	public ResponseEntity<?> findAllChangeControlLogBook(HttpServletRequest http) {
		return qaService7.getAllChangeControlLogBookReports(http);
	}

	@GetMapping("/changeControlLogBook/GetAllDepartments")
	public ResponseEntity<?> getAllDepartments() {
		 List<String> departments =  qaService7.getAllDepartments();
		 return ResponseEntity.ok(departments);
	}
	
	@GetMapping("/changeControlLogBook/getAllExistingchangeControlNos")
	public ResponseEntity<List<String>> getAllChangeControlNos() {
		List<String> changeControlNos = qaService7.getAllChangeControlNos();
		return ResponseEntity.ok(changeControlNos);
	}
	
	@GetMapping("/changeControlLogBook/PrintForChangeControlLogBook")
	public ResponseEntity<?> getPrintForChangeControlLogBook(
	        @RequestParam(required = false) String month,
	        @RequestParam(required = false) String year) {
	    return qaService7.getPrintChangeControlLogBookByYearAndMonth(month, year);
	}
	
    @DeleteMapping("/changeControlLogBook/deleteChildEntry/{id}")
    public ResponseEntity<?> deleteLogBookDetails(@PathVariable Long id) {
    	 return qaService7.deleteChildEntity(id);
    }
    
// ***************************** Material List Of Sharp Tools - PH-QAD01-F-060 *********************************************************
    
    @PostMapping("/saveMasterListSharpTools")
    public ResponseEntity<?>  saveMasterListSharpTools(@RequestBody QaMasterListOfSharpToolsF060 report, HttpServletRequest request) {
        try {
        	log.info("Received payload: {}", report);
        	ResponseEntity<?> response =  qaService7.saveMasterListSharpF060(report,request);
            return response;
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to save Material List Of Sharp Tools", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PostMapping("/SubmitMasterListSharpTools")
	public ResponseEntity<?> SubmitMasterListSharpTools(HttpServletRequest http,
			@Valid @RequestBody QaMasterListOfSharpToolsF060 masterListOfSharpTools, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService7.submitMasterListSharpF060(masterListOfSharpTools, http);

		return response;
	}
	
	

	@PutMapping("/approveMasterListSharp")
	public ResponseEntity<?> approveMasterListSharp(@Valid @RequestBody ApproveResponse approvalResponse, HttpServletRequest http) {
		
		ResponseEntity<?> resp = qaService7.approveMasterListSharpF060(approvalResponse, http);
		return resp;
	}

//id
	@GetMapping("/MasterListSharpTools/GetById/{id}")
	public ResponseEntity<?> getMasterListSharpById(@PathVariable Long id) {
		return qaService7.getMasterListSharpById(id);
	}
	

	@GetMapping("/MasterListSharpTools/GetByDateAndDept")
	public ResponseEntity<?> getMasterListSharpByDateAndDept(@RequestParam String date,@RequestParam String department) {
		return qaService7.getMasterListSharpByDateAndDept(date,department);
	}


	@GetMapping("/MasterListSharpList/getAll")
	public ResponseEntity<?> findAllMasterListSharpTools(HttpServletRequest http) {
		return qaService7.getAllMasterListSharp(http);
	}


	
	@GetMapping("/MasterListSharpList/PrintForMasterListSharpTools")
	public ResponseEntity<?> getPrintForMasterListSharpTools(
	        @RequestParam(required = false) String month,
	        @RequestParam(required = false) String year,
	        @RequestParam(required = false) String date,
	        @RequestParam(required = false) String department) {
	    return qaService7.getPrintMasterListSharpByYearAndMonthAndDate(month, year,date,department);
	}
	
    @DeleteMapping("/MasterListSharpList/deleteChildEntry/{id}")
    public ResponseEntity<?> deleteLogBookDetailsF060(@PathVariable Long id) {
    	 return qaService7.deleteChildEntityF060(id);
    }
    

// ***************************** Sharp Tools Issue & Verification Register PH-QAD01-F-062 *********************************************************

    @PostMapping("/saveSharpToolsAndVerificationRegister")
    public ResponseEntity<?>  saveSharpToolsIssueVerReg(@RequestBody QaSharpToolsIssueAndVerificationRegisterF062 report, HttpServletRequest request) {
    	try {
    		log.info("Received payload: {}", report);
    		ResponseEntity<?> response =  qaService7.saveSharpToolsF062(report,request);
    		return response;
    	} catch (IllegalArgumentException e) {
    		return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    	} catch (Exception e) {
    		return new ResponseEntity<>("Failed to save Sharp Tools Issue & Verification Register", HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    }
    
	@PostMapping("/SubmitSharpToolsAndVerificationRegister")
	public ResponseEntity<?> SubmitSharpToolsIssueVerReg(HttpServletRequest http,
			@Valid @RequestBody QaSharpToolsIssueAndVerificationRegisterF062 SharpToolsIssueVerReg, BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = qaService7.submitSharpToolsF062(SharpToolsIssueVerReg, http);

		return response;
	}
    
	@GetMapping("/SharpToolsAndVerificationRegister/GetById/{id}")
	public ResponseEntity<?> getSharpToolsIssueVerRegById(@PathVariable Long id) {
		return qaService7.getSharpToolsF062ById(id);
	}
	
	@GetMapping("/SharpToolsAndVerificationRegister/getAll")
	public ResponseEntity<?> findAllSharpToolsIssueVerReg(HttpServletRequest http) {
		return qaService7.getAllSharpToolsF062(http);
	}
	
	@GetMapping("/SharpToolsAndVerificationRegister/getForPrintSharpTools")
	public ResponseEntity<?> getForPrintSharpToolsF062(
			@RequestParam(required = false) String department,
			@RequestParam(required = false) String year,
			@RequestParam(required = false) String month,
			@RequestParam(required = false) String date) {
		if (month != null && month.isEmpty()) {
			month = null;
		}
		if (year != null && year.isEmpty()) {
			year = null;
		}
		if (date != null && date.isEmpty()) {
			date = null;
		}
		if (department != null && department.isEmpty()) {
			department = null;
		}
		return qaService7.getForPrintSharpToolsF062(department,year,month,date);
	}
	
    @DeleteMapping("/SharpToolsAndVerificationRegister/deleteChildEntry/{id}")
    public ResponseEntity<?> deleteLogBookDetailsF062(@PathVariable Long id) {
    	 return qaService7.deleteChildEntityF062(id);
    }
}
	


