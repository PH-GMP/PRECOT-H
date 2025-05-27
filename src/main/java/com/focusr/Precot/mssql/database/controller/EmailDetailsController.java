package com.focusr.Precot.mssql.database.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.EmailDetails;
import com.focusr.Precot.mssql.database.model.MsXoauthSMTP;
import com.focusr.Precot.mssql.database.service.EmailDetailsService;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.payload.ApiResponse;

@RestController
@RequestMapping("/EmailDetails/Service")
@CrossOrigin
public class EmailDetailsController {

	@Autowired
	private EmailDetailsService emailDetailsService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@PostMapping("/CreateOrUpdate")
	public ResponseEntity<?> createOrUpdateEmailDetails(@Valid @RequestBody EmailDetails emailDetails,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		EmailDetails emailDetailsRes = emailDetailsService.saveOrUpdateEmailDetails(emailDetails);

		return new ResponseEntity<EmailDetails>(emailDetailsRes, HttpStatus.CREATED);
	}

	@GetMapping("/all")
	public EmailDetails getAll(Principal principal) {
		return emailDetailsService.findEmailDetails(principal.getName());
	}

	
	
	@PutMapping("/updateSMTP/{id}")
	public ResponseEntity<?> updateSMTP(@PathVariable Long id, @RequestBody EmailDetails emailDetails,
	                                    BindingResult result) {
	    ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
	    if (errorMap != null)
	        return errorMap;

	    boolean updated = emailDetailsService.updateSMTP(id, emailDetails);

	    if (updated) {
	        return new ResponseEntity(new ApiResponse(true, "Updated Successfully!!!"), HttpStatus.OK);

	    } else {
	        return new ResponseEntity(new ApiResponse(false, "Update not successful!"), HttpStatus.BAD_REQUEST);
	    }
	}
	
	
	@GetMapping("/getSMTP/{id}")
	public EmailDetails getById(@PathVariable Long id)
	{
		return emailDetailsService.findById(id);
	}
	
	
	@DeleteMapping("/deleteSmtp/{id}")
	public ResponseEntity<?> deleteById(@PathVariable Long id) {
	    emailDetailsService.deleteById(id);
	    return new ResponseEntity<>("Email Detail with ID " + id + " is deleted successfully", HttpStatus.OK);
	}
	@DeleteMapping("/deleteAll")
	public ResponseEntity<?> deleteAll() {
	    emailDetailsService.deleteAll();
	    return new ResponseEntity<>("Email Details are deleted successfully", HttpStatus.OK);
	}

	@PostMapping("/XOAUTH/CreateOrUpdateSMTP")
	public ResponseEntity<?> createOrUpdateXOAUTHSMTPDetails(@Valid @RequestBody MsXoauthSMTP emailDetails,
			BindingResult result, Principal principal, HttpServletRequest http) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		ResponseEntity<?> emailDetailsRes = emailDetailsService.createOrUpdateXOAUTHSMTPDetails(emailDetails,http);

		return new ResponseEntity<>(emailDetailsRes, HttpStatus.CREATED);
	}

}
