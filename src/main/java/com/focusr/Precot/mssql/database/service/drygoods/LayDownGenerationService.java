package com.focusr.Precot.mssql.database.service.drygoods;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Year;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrGeneration;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrLaydownMapping;
import com.focusr.Precot.mssql.database.model.bleaching.BleachLaydownGeneration;
import com.focusr.Precot.mssql.database.model.drygoods.DryGoodsLayDownGeneration;
import com.focusr.Precot.mssql.database.model.drygoods.LayDownBaleNoMapping;
import com.focusr.Precot.mssql.database.repository.drygoods.DryGoodsLayDownGenerationRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.LayDownBaleNoMappingRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.BmrLaydownMappingResponse;

import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.drygoods.LaydownBaleNoMappingRequest;


@Service
public class LayDownGenerationService {
	//KAVIYA
	
	Logger log = LoggerFactory.getLogger(LayDownGenerationService.class);
@Autowired
DryGoodsLayDownGenerationRepository drygoodslaydowngenerationrepository;
@Autowired
LayDownBaleNoMappingRepository laydownbalenomappingrepository;

	public ResponseEntity<?> generateLaydownNumber(Long department_id) {

		SCAUtil scaUtil = new SCAUtil();

		DryGoodsLayDownGeneration laydownGeneration = drygoodslaydowngenerationrepository.findLastLaydown();

		DryGoodsLayDownGeneration GenerationObject = new DryGoodsLayDownGeneration();

		String bmrNumber = "";
		int number = 35;
		int year = Year.now().getValue() % 100;

		try {

			if (laydownGeneration != null) {
				String lastBmrNumber = laydownGeneration.getDrygoods_laydown_number();
				String[] parts = lastBmrNumber.split("/");

				int lastYear = Integer.parseInt(parts[0]);

				if (lastYear == year) {
					number = Integer.parseInt(parts[2]) + 1;
				} else {
					number = 35;
				}
			}

	
			String sequenceNumber = String.format("%04d", number);
			String laydown = year + "/DG/" + sequenceNumber;

			GenerationObject.setDrygoods_laydown_number(laydown);
			GenerationObject.setStatus(AppConstants.bmrCreation);
			GenerationObject.setDepartment_id(department_id);

			drygoodslaydowngenerationrepository.save(GenerationObject);

		} catch (Exception ex) {

			String msg = ex.getMessage();

			log.error("**** Unable to generate Laydown ****" + ex);

			return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(GenerationObject, HttpStatus.OK);

	}


//public ResponseEntity<?> generateLaydownNumber(Long department_id) {
//
//    SCAUtil scaUtil = new SCAUtil();
//
//
//    String bmrNumber = "";
//    int number = 1;
//    int year = Year.now().getValue() % 100;
//    int month = LocalDate.now().getMonthValue(); // Get current month
////    int month = 02;
////    DryGoodsLayDownGeneration laydownGeneration = drygoodslaydowngenerationrepository.findLastLaydown();
//    
//    String prevoiusLaydownNumber = drygoodslaydowngenerationrepository.findGeneratingLaydownForMonthYear(year, month);
//    
//    DryGoodsLayDownGeneration GenerationObject = new DryGoodsLayDownGeneration();
//
//    try {
//
//        if (prevoiusLaydownNumber != null || !prevoiusLaydownNumber.isEmpty()) {
//            String lastBmrNumber = prevoiusLaydownNumber;
//            String[] parts = lastBmrNumber.split("/");
//
//            int lastYear = Integer.parseInt(parts[0]);
//            int lastMonth = Integer.parseInt(parts[1]);
//
//            if (lastYear == year && lastMonth == month) {
//                number = Integer.parseInt(parts[2]) + 1; // Increment if same year and month
//            } else {
//                number = 1; // Reset number for a new month or year
//            }
//        }
//
//        String sequenceNumber = String.format("%03d", number); // Format to 3 digits
//        String laydown = String.format("%02d/%02d/%s", year, month, sequenceNumber);
//
//        GenerationObject.setDrygoods_laydown_number(laydown);
//        GenerationObject.setStatus(AppConstants.bmrCreation);
//        GenerationObject.setDepartment_id(department_id);
//
//        drygoodslaydowngenerationrepository.save(GenerationObject);
//
//    } catch (Exception ex) {
//
//        String msg = ex.getMessage();
//
//        log.error("**** Unable to generate Laydown ****" + ex);
//
//        return new ResponseEntity<>(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
//    }
//
//    return new ResponseEntity<>(GenerationObject, HttpStatus.OK);
//}

	
	//GET LAY DOWN

		public ResponseEntity<?> getLaydownByDeptId(Long dept_id) {

			List<DryGoodsLayDownGeneration> laydownList = new ArrayList<>();

			try {
				laydownList = drygoodslaydowngenerationrepository.listOfLaydownByDeptId(dept_id);

			
			} catch (Exception ex) {

				String msg = ex.getMessage();

				log.error("**** Unable to fetch Laydown ****" + ex);

				return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(laydownList, HttpStatus.OK);

		}
		
		
			// SHOW OPEN LAYDOWNS
		
		public ResponseEntity<?> getOpenLaydownByDeptId(Long dept_id) {

			List<DryGoodsLayDownGeneration> laydownList = new ArrayList<>();

			try {
				laydownList = drygoodslaydowngenerationrepository.laydownLovForMapping(dept_id);

			
			} catch (Exception ex) {

				String msg = ex.getMessage();

				log.error("**** Unable to fetch Laydown ****" + ex);

				return new ResponseEntity(new ApiResponse(false, msg), HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity(laydownList, HttpStatus.OK);

		}
		
		
		
		//LayDown Bale No Mapping
		
	/*	public ResponseEntity<?> LaydownBaleNoMapping(LayDownBaleNoMapping response, HttpServletRequest http) {

			
			try {
				DryGoodsLayDownGeneration drygoodslaydowngeneration;

				response.setStatus(AppConstants.bmrOpen);

				Date date = new Date();

				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

				String strDate = formatter.format(date);
				response.setStartDate(strDate);


				// Check and update Laydown status

				drygoodslaydowngeneration = drygoodslaydowngenerationrepository.getLaydown(response.getLaydown_no());

				if (drygoodslaydowngeneration != null) {

					drygoodslaydowngeneration.setStatus(AppConstants.bmrOpen);

				} else {

					return new ResponseEntity<>("Laydown not found", HttpStatus.NOT_FOUND);

				}

				// Save the updated statuses

				drygoodslaydowngenerationrepository.save(drygoodslaydowngeneration);

				// Save the mapping

				laydownbalenomappingrepository.save(response);

				return new ResponseEntity<>(response, HttpStatus.OK);

			} catch (Exception e) {

				return new ResponseEntity<>("Error Mapping: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

			}

		}*/
		public ResponseEntity<?> LaydownBaleNoMapping(LaydownBaleNoMappingRequest request, HttpServletRequest http) {
		    try {
		        // Get the Laydown entity using the provided laydown number
		        DryGoodsLayDownGeneration drygoodslaydowngeneration = drygoodslaydowngenerationrepository.getLaydown(request.getLaydownNo());

		        if (drygoodslaydowngeneration == null) {
		            return new ResponseEntity<>("Laydown not found", HttpStatus.NOT_FOUND);
		        }

		        // Set the status to "Open"
		        drygoodslaydowngeneration.setStatus(AppConstants.bmrOpen);

		        // Get the current date and format it
		        Date date = new Date();
		        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		        String strDate = formatter.format(date);

		        // Update each bale number mapping with the laydown number
		        for (String baleNo : request.getBaleNumbers()) {
		            LayDownBaleNoMapping mapping = new LayDownBaleNoMapping();
		            mapping.setLaydown_no(request.getLaydownNo());
		            mapping.setBale_no(baleNo);
		            mapping.setStatus(AppConstants.bmrOpen);
		            mapping.setStartDate(request.getStartDate());
		            mapping.setShift(request.getShift());
		            
		            // Save each mapping
		            laydownbalenomappingrepository.save(mapping);
		        }

		        // Save the updated laydown generation entity
		        drygoodslaydowngenerationrepository.save(drygoodslaydowngeneration);

		        return new ResponseEntity<>("Mappings created successfully", HttpStatus.OK);

		    } catch (Exception e) {
		        return new ResponseEntity<>("Error Mapping: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		}


		//Laydown Closing
		
		public ResponseEntity<?> laydownClosing(DryGoodsLayDownGeneration request, Principal principal, HttpServletRequest http) {

	    try {
	        // Get current date and time
	        Date date = new Date();
	        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        String formattedDate = formatter.format(date);

	        // Fetch the DryGoodsLayDownGeneration record using the laydown number from the request
	        DryGoodsLayDownGeneration laydownGeneration = drygoodslaydowngenerationrepository
	                .getLaydown(request.getDrygoods_laydown_number());

	        if (laydownGeneration == null) {
	            return new ResponseEntity<>("Laydown not found", HttpStatus.NOT_FOUND);
	        }

	        // Update the status and end date
	        laydownGeneration.setStatus(AppConstants.bmrClosed);
	       

	        // Fetch the corresponding LayDownBaleNoMapping record(s) using the laydown number
	        List<LayDownBaleNoMapping> baleNoMappings = laydownbalenomappingrepository
	                .getLaydownNo(request.getDrygoods_laydown_number());

	        if (baleNoMappings.isEmpty()) {
	            return new ResponseEntity<>("No BaleNo mappings found for the laydown", HttpStatus.NOT_FOUND);
	        }

	        // Update the status and end date for each LayDownBaleNoMapping record
	        for (LayDownBaleNoMapping mapping : baleNoMappings) {
	            mapping.setStatus(AppConstants.bmrClosed);
	            mapping.setEndDate(formattedDate);
	            laydownbalenomappingrepository.save(mapping);
	        }

	        // Save the updated DryGoodsLayDownGeneration record
	        drygoodslaydowngenerationrepository.save(laydownGeneration);

	        return new ResponseEntity<>("LayDown Closed Successfully", HttpStatus.OK);

	    } catch (Exception e) {
	        SCAUtil sca = new SCAUtil();
	        log.error("*** Unable to Close BMR *** " + e);
	        String msg = sca.getErrorMessage(e);
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to Close BMR: " + msg), HttpStatus.BAD_REQUEST);
	    }
	}


		
			// GET LAYDOWN BASED ON DATE & SHIFT
		
		
		public ResponseEntity<?> getLaydownBasedoNDateShift(String date) {
			
			List<String> laydownList = new ArrayList<String>();
			
			List<IdAndValuePair> laydownValuePairList = new ArrayList<IdAndValuePair>();
			
			try {
				
				laydownList = laydownbalenomappingrepository.getLaydownNumberbasedonDateAndShift(date);
				
				Long id = (long) 1; 
				
				for(String temp : laydownList) {
					
					IdAndValuePair valuePairList = new IdAndValuePair();
					valuePairList.setValue(temp);
					valuePairList.setId(id);
				
					laydownValuePairList.add(valuePairList);
					id++;
				}
				
			} catch (Exception e) {
		        SCAUtil sca = new SCAUtil();
		        log.error("*** Unable to get laydown based on date and shift *** " + e);
		        String msg = sca.getErrorMessage(e);
		        return new ResponseEntity<>(new ApiResponse(false, "Unable to get laydown based on date and shift " + msg), HttpStatus.BAD_REQUEST);
		    }
			
			return ResponseEntity.status(HttpStatus.OK).body(laydownValuePairList);
		}
		
		

}
