package com.focusr.Precot.mssql.database.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.focusr.Precot.mssql.database.model.bleaching.lov.BMRNumbers;
import com.focusr.Precot.mssql.database.model.bleaching.lov.BaleNumbers;
import com.focusr.Precot.mssql.database.model.bleaching.lov.LaydownNumber;
import com.focusr.Precot.mssql.database.model.bleaching.lov.MixingChangeOver;
import com.focusr.Precot.mssql.database.model.bleaching.lov.PhBasedSupplier;
import com.focusr.Precot.mssql.database.model.bleaching.lov.ShiftDetails;
import com.focusr.Precot.mssql.database.repository.BMRNumberRepository;
import com.focusr.Precot.mssql.database.repository.BaleNumberRepository;
import com.focusr.Precot.mssql.database.repository.LaydownNumberRepository;
import com.focusr.Precot.mssql.database.repository.MixingChangeOverRepository;
import com.focusr.Precot.mssql.database.repository.PhBasedSupplierRepository;
import com.focusr.Precot.mssql.database.repository.RoleRepository;
import com.focusr.Precot.mssql.database.repository.ShiftRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.LovResponse;
import com.focusr.Precot.util.SCAUtil;

@RestController
@RequestMapping("/api/LOV/Service")
public class LOVController {

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private ShiftRepository shiftRepository;
	
	@Autowired
	private BaleNumberRepository baleNumberRepository;
	
	@Autowired
	private BMRNumberRepository bMRNumberRepository;
	
	@Autowired
	private LaydownNumberRepository laydownNumberRepository;
	
	@Autowired
	private MixingChangeOverRepository mixingChangeOverRepository;
	
	@Autowired 
	private PhBasedSupplierRepository phBasedSupplierRepository;
	
	Logger logger = LoggerFactory.getLogger(LOVController.class);
	
	@PostMapping("/createShift")
	public ResponseEntity<?> createShift( @Valid @RequestBody ShiftDetails shiftDetails) {
		
		if(shiftDetails.getShift() == null) {
			return new ResponseEntity(new ApiResponse(false, "Please send mandatory fields"), HttpStatus.BAD_REQUEST);
		}
		
		shiftRepository.save(shiftDetails);
		
		return new ResponseEntity(shiftDetails, HttpStatus.CREATED);
		
	}
	
	@GetMapping("/shiftDetailsLov")
	public ResponseEntity<?> getShiftDetails() {
		
		List<LovResponse> lovResponse = new ArrayList<>();
		
		List<ShiftDetails> shiftList = new ArrayList<>();
		
		try {
			shiftList = shiftRepository.findAll();
			
			if(!shiftList.isEmpty()) {
				
				Long id = (long) 1;
				
				for(ShiftDetails shift : shiftList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(shift.getShift());
					response.setDescription(shift.getDescription());
					
					lovResponse.add(response);
					id++;
				}
				
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Shifts *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Lov" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(lovResponse, HttpStatus.OK);
		
	}
	
	@GetMapping("/baleNumbersLOV")
	public ResponseEntity<?> getBaleNumbers() {
		
		List<LovResponse> lovResponse = new ArrayList<>();
		
		List<BaleNumbers> baleNumberList = new ArrayList<>();
		
		try {
			baleNumberList = baleNumberRepository.findAll();
			
			if(!baleNumberList.isEmpty()) {
				
				Long id = (long) 1;
				
				for(BaleNumbers shift : baleNumberList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(shift.getBaleNumber());
					response.setDescription(shift.getDescription());
					
					lovResponse.add(response);
					id++;
				}
				
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Bale Numbers *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Lov" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(lovResponse, HttpStatus.OK);
		
	}
	
	@GetMapping("/bMRNumbersLOV")
	public ResponseEntity<?> getBMRNumbers() {
		
		List<LovResponse> lovResponse = new ArrayList<>();
		
		List<BMRNumbers> bMRNumberList = new ArrayList<>();
		
		try {
			bMRNumberList = bMRNumberRepository.findAll();
			
			if(!bMRNumberList.isEmpty()) {
				
				Long id = (long) 1;
				
				for(BMRNumbers shift : bMRNumberList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(shift.getBmrNumber());
					response.setDescription(shift.getDescription());
					
					lovResponse.add(response);
					id++;
				}
				
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get BMR Numbers *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Lov" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(lovResponse, HttpStatus.OK);
		
	}
	
	@GetMapping("/laydownNumberLOV")
	public ResponseEntity<?> getLaydownNumbers() {
		
		List<LovResponse> responseList = new ArrayList<>();
		
		List<LaydownNumber> laydownNumberList = new ArrayList<>();
		
		try {
			laydownNumberList = laydownNumberRepository.findAll();
			
			if(!laydownNumberList.isEmpty()) {
				
				Long id = (long) 1;
				
				for(LaydownNumber shift : laydownNumberList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(shift.getLayDownNumber());
					response.setDescription(shift.getDescription());
					
					responseList.add(response);
					id++;
				}
				
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get LayDown Numbers *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Lov" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(responseList, HttpStatus.OK);
		
	}
	
	@GetMapping("/mixingLOV")
	public ResponseEntity<?> getMixingChangeOver() {
		
		List<LovResponse> responseList = new ArrayList<>();
		
		List<MixingChangeOver> mixingChangeOverList = new ArrayList<>();
		
		try {
			mixingChangeOverList = mixingChangeOverRepository.findAll();
			
			if(!mixingChangeOverList.isEmpty()) {
				
				Long id = (long) 1;
				
				for(MixingChangeOver shift : mixingChangeOverList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(shift.getMixingNumber());
					response.setDescription(shift.getDescription());
					
					responseList.add(response);
					id++;
				}
				
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Mixing Change over Numbers *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Lov" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(responseList, HttpStatus.OK);
		
	}
	
	
	@GetMapping("/PhBasedSupplierLOV")
	public ResponseEntity<?> getPhBasedSupplier() {
		
		List<LovResponse> responseList = new ArrayList<>();
		
		List<PhBasedSupplier> phBasedSupplierList = new ArrayList<>();
		
		try {
			phBasedSupplierList = phBasedSupplierRepository.findAll();
			
			if(!phBasedSupplierList.isEmpty()) {
				
				Long id = (long) 1;
				
				for(PhBasedSupplier shift : phBasedSupplierList) {
					LovResponse response = new LovResponse();
					response.setId(id);
					response.setValue(shift.getPhNo());
					response.setDescription(shift.getSupplierName());
					
					responseList.add(response);
					id++;
				}
				
			}
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			logger.error("*** Unable to Get Ph number based Supplier details *** " + e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity(new ApiResponse(false, "Unable to Get Lov" + msg),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity(responseList, HttpStatus.OK);
		
	}
}
