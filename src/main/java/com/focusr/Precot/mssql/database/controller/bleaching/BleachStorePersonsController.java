package com.focusr.Precot.mssql.database.controller.bleaching;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
import com.focusr.Precot.mssql.database.model.bleaching.BleachStorePersons;
import com.focusr.Precot.mssql.database.service.MapValidationErrorService;
import com.focusr.Precot.mssql.database.service.bleaching.StorePersonService;

@RestController
@RequestMapping("/api/bleaching/bleachStorePersons")
public class BleachStorePersonsController {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
    @Autowired
    private StorePersonService storePersonService;

	@PostMapping("/CreateOrUpdate")
	public ResponseEntity<?> createOrUpdateBleachStorePersons(HttpServletRequest http, @Valid @RequestBody BleachStorePersons storePerson,
			BindingResult result, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		ResponseEntity<?> response = storePersonService.createOrUpdateBleachStorePersons(storePerson, http);

		return response;
	}
    
//    @PostMapping("/CreateOrUpdate")
//	public ResponseEntity<?> createOrUpdateBleachStorePersons(HttpServletRequest http, @Valid @RequestBody BleachStorePersons storePerson,
//			BindingResult result, Principal principal) {
//
//		return storePersonService.createOrUpdateBleachStorePersons(storePerson, http);
//	}

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllBleachStorePersons() {
        return storePersonService.getAllBleachStorePersons();
    }
}
