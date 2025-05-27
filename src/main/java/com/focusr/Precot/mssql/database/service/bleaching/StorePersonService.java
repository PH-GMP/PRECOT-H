package com.focusr.Precot.mssql.database.service.bleaching;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.bleaching.BleachStorePersons;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachStorePersonsRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.util.SCAUtil;

@Service
public class StorePersonService {
	
	@Autowired
	private BleachStorePersonsRepository bleachStorePersonsRepository;

	public ResponseEntity<?> createOrUpdateBleachStorePersons(BleachStorePersons storePerson,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		try {
			Long id = storePerson.getId();

			if (id == null) {
				
				storePerson.setRole("STORE_PERSON");
				bleachStorePersonsRepository.save(storePerson);
			} else {
				BleachStorePersons existStorePerson = bleachStorePersonsRepository.getById(id);
				
				storePerson.setRole("STORE_PERSON");
				existStorePerson.setDepartmentName(storePerson.getDepartmentName());
				existStorePerson.setName(storePerson.getName());
				existStorePerson.setIsActive(storePerson.getIsActive());
				
				bleachStorePersonsRepository.save(existStorePerson);
				
			}
		} catch (Exception e) {
			
			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to save Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(storePerson, HttpStatus.CREATED);
	}
	
	public ResponseEntity<?> getAllBleachStorePersons() {
		SCAUtil sca = new SCAUtil();

		try {

			List<BleachStorePersons> list = bleachStorePersonsRepository.findAll();

			if (list == null) {

				list = new ArrayList<BleachStorePersons>();
			}

			return new ResponseEntity(list, HttpStatus.OK);

		} catch (Exception e) {

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}
}
