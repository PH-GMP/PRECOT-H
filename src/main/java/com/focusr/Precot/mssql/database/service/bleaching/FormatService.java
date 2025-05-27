package com.focusr.Precot.mssql.database.service.bleaching;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.focusr.Precot.mssql.database.model.UserImageDetails;
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContRawCottonF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContAbsBleachedCottonF18;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookF33;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;
import com.focusr.Precot.mssql.database.model.bleaching.BleachJobCardF13;
import com.focusr.Precot.mssql.database.model.bleaching.BleachLayDownCheckListF42;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;
import com.focusr.Precot.mssql.database.model.bleaching.BleachSummaryReport;
import com.focusr.Precot.mssql.database.model.bleaching.Department;
import com.focusr.Precot.mssql.database.model.bleaching.EquipLogBookHydroExtractorF11;
import com.focusr.Precot.mssql.database.repository.UserImageDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContRawCottonF04Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContAbsBleachedCottonF18Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContRawCottonF05Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogBookF33Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachHandSanitizationABPressF41Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachJobCard13Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachLayDownCheckListF42Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachMixingChangeMachineCleaningF38Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachSummaryReportRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.EquipLogBookHydroExtractorF11Repository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.util.AppConstants;
import com.focusr.Precot.util.FormatRequest;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;

@Service
public class FormatService {

	@Autowired
	private BleachMixingChangeMachineCleaningF38Repository bleachmixingchangemachinecleaningf38repository;

	@Autowired
	private DepartmentRepository departmentRepo;

	@Autowired
	private BleachSummaryReportRepository bleachsummaryreportrepository;

	@Autowired
	private BleachHandSanitizationABPressF41Repository bleachhandsanitizationabpressf41repository;

	@Autowired
	private BleachAppliedContRawCottonF04Repository bleachappliedcontrawcottonf04repository;

	@Autowired
	private BleachJobCard13Repository bleachheaderf13repository;

	@Autowired
	private BleachContRawCottonF05Repository bleachContRawCottonF05Repository;

	@Autowired
	private BleachContAbsBleachedCottonF18Repository bleachContAbsBleachedCottonF18Repository;

	@Autowired
	private BleachEquipmentUsageLogBookF33Repository bleachEquipmentUsageLogBookF33Repository;

	@Autowired
	private BleachLayDownCheckListF42Repository bleachLayDownCheckListF42Repository;
	
	@Autowired 
	private EquipLogBookHydroExtractorF11Repository equipLogBookHydroExtractorF11Repository;
	
	@Autowired
	private UserImageDetailsRepository imageDetailsRepository;
	
	@Autowired
	private UserRepository userRepository;


	Logger log = LoggerFactory.getLogger(FormatService.class);

	public ResponseEntity<?> getTheAllFormatSummary(FormatRequest formatRequest, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		List<BleachMixingChangeMachineCleaningF38> mixingingchangedetails = null;

		List<BleachJobCardF13> bleachheaderf13 = null;

		List<BleachHandSanitizationABPressF41> bleachhandsanitizationabpressf41 = null;

		List<BleachAppliedContRawCottonF04> bleachappliedcontrawcottonf04 = null;

		List<BleachContRawCottonF05> bleachRawCottonDetails05 = null;

		List<BleachContAbsBleachedCottonF18> AbsBleachedCottonDetails18 = null;

		List<BleachEquipmentUsageLogBookF33> equipmentUsageLogBook = null;

		List<BleachLayDownCheckListF42> layDownCheckList = null;
		
		List<EquipLogBookHydroExtractorF11> hydroExtractorDetails = null;
		
//		List<BleachMetalDetectorF03> bleachmetaldetectorf03 = null;

		try {

			String formatNo = formatRequest.getFormatNo();

			Long departmentId = formatRequest.getDepertmentId();

			Optional<Department> department = departmentRepo.findById(departmentId);

			if (department.isPresent()) {

				log.debug("Department Is Valid");
				log.debug("Department Id  :" + departmentId);
				log.debug("Format No  :" + formatNo);

				if (departmentId != null && formatNo != null) {

					BleachSummaryReport report = bleachsummaryreportrepository.findByDepartmentBasedFormat(departmentId,
							formatNo);

					String formatName = report.getControlled();

					if (formatName.equalsIgnoreCase(AppConstants.FR38)) {

						mixingingchangedetails = bleachmixingchangemachinecleaningf38repository
								.findByListOfMixF38FormatDetails(formatNo);

					}

					else if (formatName.equalsIgnoreCase(AppConstants.F13)) {

						bleachheaderf13 = bleachheaderf13repository.findByListOfBleachingFormatDetails(formatNo);

					}

					else if (formatName.equalsIgnoreCase(AppConstants.F04)) {

						bleachappliedcontrawcottonf04 = bleachappliedcontrawcottonf04repository
								.findFormatDetailsF04(formatNo);

					}

					else if (formatName.equalsIgnoreCase(AppConstants.F41)) {

						bleachhandsanitizationabpressf41 = bleachhandsanitizationabpressf41repository
								.findFormatDetailsF41(formatNo);

					}

					else if (formatName.equalsIgnoreCase(AppConstants.FR05)) {

						bleachRawCottonDetails05 = bleachContRawCottonF05Repository
								.findByListOfF05FormatDetails(formatNo);

					}

					else if (formatName.equalsIgnoreCase(AppConstants.FR18)) {

						AbsBleachedCottonDetails18 = bleachContAbsBleachedCottonF18Repository
								.findByListOfF18FormatDetails(formatNo);

					}

					else if (formatName.equalsIgnoreCase(AppConstants.F33)) {
						equipmentUsageLogBook = bleachEquipmentUsageLogBookF33Repository
								.findByEquipmentUsageF33details(formatNo);

					} else if (formatName.equalsIgnoreCase(AppConstants.F42)) {

						layDownCheckList = bleachLayDownCheckListF42Repository
								.findByLayDownCheckListF42Details(formatNo);

					}
					
					
					
					if (formatName.equalsIgnoreCase(AppConstants.FR11)) {

						hydroExtractorDetails = equipLogBookHydroExtractorF11Repository
								.findByListOfF11FormatDetails(formatNo);

					}
					
					
					

				}
			}

			else {
				return new ResponseEntity(new ApiResponse(true, "We will soon finalize the remaining Department.!"),
						HttpStatus.ACCEPTED);
			}

		}

		catch (Exception e) {
			log.error("***************** Unable to Getting Summary Details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to Getting Summary Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}

		if (mixingingchangedetails != null) {

			return new ResponseEntity(mixingingchangedetails, HttpStatus.CREATED);

		}

		if (bleachheaderf13 != null) {

			return new ResponseEntity(bleachheaderf13, HttpStatus.CREATED);

		}

		if (bleachhandsanitizationabpressf41 != null) {

			return new ResponseEntity(bleachhandsanitizationabpressf41, HttpStatus.CREATED);

		}

		if (bleachappliedcontrawcottonf04 != null) {

			return new ResponseEntity(bleachappliedcontrawcottonf04, HttpStatus.CREATED);

		}

		if (bleachRawCottonDetails05 != null) {

			return new ResponseEntity(bleachRawCottonDetails05, HttpStatus.CREATED);

		}

		if (AbsBleachedCottonDetails18 != null) {

			return new ResponseEntity(AbsBleachedCottonDetails18, HttpStatus.CREATED);

		}

		if (equipmentUsageLogBook != null) {

			return new ResponseEntity(equipmentUsageLogBook, HttpStatus.CREATED);

		}

		if (layDownCheckList != null) {

			return new ResponseEntity(layDownCheckList, HttpStatus.CREATED);

		}
		
		if (hydroExtractorDetails != null) {

			return new ResponseEntity(hydroExtractorDetails, HttpStatus.CREATED);

		}
		
		
		

		else {
			return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK); // Return an empty list
		}
	}

	
public ResponseEntity<?> pdfApproach2(String path) {
		
		List<List<String>> tableData = new ArrayList<>();
		
		PDDocument document = null;
		
		try {
			
			document = PDDocument.load(new java.io.File(path));
			PDFTextStripper pdfStripper = new PDFTextStripper();
			
			int totalPages = document.getNumberOfPages();
			
			for(int pageNum =1; pageNum <= totalPages; pageNum ++) {
				
				pdfStripper.setStartPage(pageNum);
                pdfStripper.setEndPage(pageNum);
				
                String text = pdfStripper.getText(document);
                
                
			
			boolean tableStarted = false;
			boolean sensorMoistureFound = false;
            boolean zoneFound = false;
			
			String[] lines = text.split(System.lineSeparator());
			
			for(String line : lines) {
				
				if (line.contains("Sensor: Moisture")) {
                    sensorMoistureFound = true;
                }

                if (sensorMoistureFound && line.contains("Zone")) {
                    zoneFound = true;
                }
				
                if (sensorMoistureFound && zoneFound && line.contains("Length Time")) {
                    tableStarted = true;
                    continue;
                }
                
                System.out.println("parTicLeS" + line);
				
				if(tableStarted) {
					
					if(line.trim().isEmpty()) {
						break;
					}
					
					String[] columns = line.split("\\s+");
					
					List<String> rowData = new ArrayList<>();
					
					for(String column : columns) {
						
						rowData.add(column);
						
					}
					
					tableData.add(rowData);
					
				}
				
			}
			}
			
		} catch (Exception ex) {

			String msg = ex.getMessage();

			return new ResponseEntity(
					new ApiResponse(false, "Failed to get Spulance Orders" + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		finally {
			
			if(document != null) {
				try {
					document.close();
				} catch(IOException ex) {
					ex.printStackTrace();
				}
			}
		
			
			
	}
		
		return new ResponseEntity(tableData, HttpStatus.OK);
	
}


	// UPLOAD IMAGE

	public ResponseEntity<?> uploadImage(MultipartFile file, String username) {
		
		UserImageDetails imageDetails = new UserImageDetails();
		
		SCAUtil scaUtil = new SCAUtil();
		
		Long userId = userRepository.getUsernameByUserId(username);
		
		
		try {
			
			long size = file.getSize();
			
			
			imageDetails.setImageName(file.getOriginalFilename());
			imageDetails.setImageSize(size);
			imageDetails.setUsername(username);
			imageDetails.setUserId(userId);
			
			imageDetails.setImage(file.getBytes());
			
			imageDetailsRepository.save(imageDetails);
			
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			String msg = sca.getErrorMessage(e);
			log.error("***** Unable to upload Image: " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to upload Image: " + msg),
					HttpStatus.BAD_REQUEST);
		}
			
		return new ResponseEntity(new ApiResponse(true,"Image Uploaded Successfully"), HttpStatus.OK);
		
	}

	
	public ResponseEntity<String> deleteRecord(String username) {
	    try {
	        Optional<UserImageDetails> imageOptional = imageDetailsRepository.fetchItemDetailsByUsername(username);
	        if (imageOptional.isPresent()) {
	            imageDetailsRepository.delete(imageOptional.get());
	            return new ResponseEntity<>("Image deleted successfully", HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>("Image record not found", HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error deleting image record", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	public ResponseEntity<?> getAllImages() {
		
		List<UserImageDetails> imageDetails = new ArrayList<>();
		
		try {
			
			imageDetails = imageDetailsRepository.findAll();
			
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			String msg = sca.getErrorMessage(e);
			log.error("***** Unable to Get List of Submitted Hand Sanitization: " + msg);
			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to Get List of Submitted Hand Sanitization: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(imageDetails, HttpStatus.OK);
		
	}
	
	public ResponseEntity<?> getImageById(Long id) {
		
		UserImageDetails imageDetails = new UserImageDetails();
		
		try {
			
			imageDetails = imageDetailsRepository.getItemDetails(id);
			
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			String msg = sca.getErrorMessage(e);
			log.error("***** Unable to Get List of Submitted Hand Sanitization: " + msg);
			return new ResponseEntity(
					new ApiResponse(false, "Unable to Get List of Submitted Hand Sanitization: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity(imageDetails, HttpStatus.OK);
		
	}
	
	
	public ResponseEntity<byte[]> getUserSignature(String username) {
		
		UserImageDetails imageDetails = new UserImageDetails();
		
		try {
			
			imageDetails = imageDetailsRepository.getItemDetailsByUsername(username);
			
			if(imageDetails != null && imageDetails.getImage() != null) {
				return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageDetails.getImage());
			} else {
				return new ResponseEntity(
						new ApiResponse(false, "No Signature found: " ),
						HttpStatus.BAD_REQUEST);
			}
			
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			String msg = sca.getErrorMessage(e);
			log.error("***** Unable to Get List of Image: " + msg);
			return new ResponseEntity(
					new ApiResponse(false, "Unable to Get List of Image: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		
		
	}
	
	public ResponseEntity<?> getFormList(Long id) {
		
		List<IdAndValuePair> departmentList = new ArrayList<>();
		
		List<String> formList = new ArrayList<>();
		
		try {
			
			formList = departmentRepo.formNameList(id);
			
			Long dEpid = (long) 1;
			
			if(!formList.isEmpty() || formList.size() >= 0 || formList != null) {
				
				for(String value : formList) {
					
					IdAndValuePair valueList = new IdAndValuePair();
					valueList.setValue(value);
					valueList.setType(value);
					valueList.setId(dEpid);
					
					departmentList.add(valueList);
					
					dEpid++;
					
				}
				
			}
			
			
		} catch (Exception e) {
			SCAUtil sca = new SCAUtil();
			String msg = sca.getErrorMessage(e);
			log.error("***** Unable to Get List of Forms: " + msg);
			return new ResponseEntity(
					new ApiResponse(false, "Unable to Get List of Forms: " + msg),
					HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(departmentList, HttpStatus.OK);
		
	}
	
}
