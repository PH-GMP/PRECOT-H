package com.focusr.Precot.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContAbCottonF08;
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContRawCottonF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContAbsBleachedCottonF18;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookCakePressF09;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogBookF33;
import com.focusr.Precot.mssql.database.model.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHouseKeepingCheckListF02A;
import com.focusr.Precot.mssql.database.model.bleaching.BleachJobCardF13;
import com.focusr.Precot.mssql.database.model.bleaching.BleachLayDownCheckListF42;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;
import com.focusr.Precot.mssql.database.model.bleaching.BleachSanitizationOfMechineAndSurfaceF01;
import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;
import com.focusr.Precot.mssql.database.model.bleaching.EquipLogBookHydroExtractorF11;
import com.focusr.Precot.mssql.database.model.bleaching.MetalDetectorCheckListF03;
import com.focusr.Precot.mssql.database.repository.EmailDetailsRepository;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.ActivitiesF01Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContAbCottonF08Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContAbCottonTypesF08Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContRawCottonF04Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContAbsBleachedCottonF18Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContRawCottonF05Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogBookCakePressF09Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogBookF33Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachHandSanitizationABPressF41Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachHouseKeepingCheckListF02ARepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachHouseKeepingCheckListF02Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachJobCard13Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachLayDownCheckListF42Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachMixingChangeMachineCleaningF38Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachSanitizationOfMechineAndSurfaceF01Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachShiftLogBookF36Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.EquipLogBookHydroExtractorF11Repository;

import com.focusr.Precot.mssql.database.repository.bleaching.MetalDetectorCheckListF03Repository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.security.JwtTokenProvider;

@Service
public class BleachMailApprovalProcess {

	@Autowired
	BleachShiftLogBookF36Repository bleachshiftlogbookf36repository;
	@Autowired
	BleachSanitizationOfMechineAndSurfaceF01Repository bleachsanitizationofmechineandsurfacef01repository;
	@Autowired
	private EmailDetailsRepository emailDetailsRepository;
	@Autowired
	private UserRepository userrepository;
	@Autowired
	ActivitiesF01Repository activitiesf01repository;
	@Autowired
	private BleachEquipmentUsageLogBookCakePressF09Repository bleachequipmentusagelogbookcakepressf09repository;
	@Autowired
	private BleachEquipmentUsageLogbookBlowroomAndCardingF34Repository bleachequipmentusagelogbookblowroomandcardingf34repository;
	@Autowired
	BleachHandSanitizationABPressF41Repository bleachhandsanitizationabpressf41repository;
	@Autowired
	private JwtTokenProvider tokenProvider;
	@Autowired
	BleachLayDownCheckListF42Repository bleachLayDownCheckListF42Repository;
	@Autowired
	BleachEquipmentUsageLogBookF33Repository bleachEquipmentUsageLogBookF33Repository;
	@Autowired
	private BleachAppliedContRawCottonF04Repository bleachAppliedContRawCottonF04Repository;
	@Autowired
	BleachMixingChangeMachineCleaningF38Repository bleachmixingchangemachinecleaningf38repository;
	@Autowired
	BleachJobCard13Repository bleachingheaderrepository;
	@Autowired
	private BleachAppliedContAbCottonF08Repository bleachappliedcontabcottonf08repository;
	@Autowired
	BleachMailFunction bleachmailfunction;
	@Autowired
	private BleachAppliedContAbCottonTypesF08Repository bleachappliedcontabcottontypesf08repository;

	@Autowired
	BleachJobCard13Repository bleachjobcard13repository;

	@Autowired
	BleachHouseKeepingCheckListF02Repository bleachhousekeepingchecklistf02repository;

	@Autowired
	BleachHouseKeepingCheckListF02ARepository bleachhousekeepingchecklistf02arepository;

	@Autowired
	private BleachContAbsBleachedCottonF18Repository bleachContAbsBleachedCottonF18Repository;

	@Autowired
	private BleachContRawCottonF05Repository bleachContRawCottonF05Repository;

	@Autowired
	private EquipLogBookHydroExtractorF11Repository equipLogBookHydroExtractorF11Repository;

//	@Autowired
//	private EquipmentLogsF11Repository equipmentLogsF11Repository;

	@Autowired
	private MetalDetectorCheckListF03Repository metalDetectorCheckListF03Repository;

	// F42//
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveLayDownCheckF42(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachLayDownCheckListF42 details = bleachLayDownCheckListF42Repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachLayDownCheckListF42Repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F36//
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveShiftLogBookF36(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachShiftLogBookF36 details = bleachshiftlogbookf36repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachshiftlogbookf36repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F01//
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveSanitizationOfMechineAndSurfaceF01(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachSanitizationOfMechineAndSurfaceF01 details = bleachsanitizationofmechineandsurfacef01repository
					.findById(id).orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachsanitizationofmechineandsurfacef01repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F09//
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveEquipmentUsageLogbookCakePressF09(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachEquipmentUsageLogBookCakePressF09 details = bleachequipmentusagelogbookcakepressf09repository
					.findById(id).orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachequipmentusagelogbookcakepressf09repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F34//
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveEquipmentUsageLogbookBAndDF34(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachEquipmentUsageLogbookBlowroomAndCardingF34 details = bleachequipmentusagelogbookblowroomandcardingf34repository
					.findById(id).orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachequipmentusagelogbookblowroomandcardingf34repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F41//
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveHandSanitizationF41(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachHandSanitizationABPressF41 details = bleachhandsanitizationabpressf41repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachhandsanitizationabpressf41repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F33
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveEquimentUsageF33(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();
			String date = bleachEquipmentUsageLogBookF33Repository.getdatebyId(id);

			List<BleachEquipmentUsageLogBookF33> records = bleachEquipmentUsageLogBookF33Repository.findByDate(date);

			for (BleachEquipmentUsageLogBookF33 record : records) {

				String HodStatus = record.getHod_status();
				String MailStatus = record.getMail_status();

				if (HodStatus.equals(AppConstants.hodApprovedStatus)
						|| MailStatus.equals(AppConstants.hodApprovedStatus)) {
					return new ResponseEntity<>(new ApiResponse(true, "HOD Already Approved for date: " + date),
							HttpStatus.OK);
				}

				LocalDateTime now = LocalDateTime.now();

				record.setMail_status(AppConstants.hodApprovedStatus);
				record.setHod_status(AppConstants.hodApprovedStatus);
				record.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
				record.setHod_submit_by(hodDetails.getusername());
				record.setHod_submit_id(hodDetails.getid());
				record.setHod_sign(hodDetails.getusername());

				record.setHod_status(AppConstants.waitingStatus);

				bleachEquipmentUsageLogBookF33Repository.save(record);
			}

		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Lay Down Check List Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F04
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveAppliedRawCottonF04(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachAppliedContRawCottonF04 details = bleachAppliedContRawCottonF04Repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachAppliedContRawCottonF04Repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F08
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveAppliedContaminationF08(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachAppliedContAbCottonF08 details = bleachappliedcontabcottonf08repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachappliedcontabcottonf08repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F38
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveBleachMixingChangeMachineCleaningF38(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachMixingChangeMachineCleaningF38 details = bleachmixingchangemachinecleaningf38repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachmixingchangemachinecleaningf38repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F02 -- HR
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approvehouseKeepingHrF02(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hrDetails = userrepository.getHrDetails();

			BleachHouseKeepingCheckListF02 details = bleachhousekeepingchecklistf02repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hrApprovedStatus.equals(details.getHr_status())
					|| AppConstants.hrApprovedStatus.equals(details.getHr_mail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setHr_mail_status(AppConstants.hrApprovedStatus);
			details.setHr_status(AppConstants.hrApprovedStatus);
			details.setHr_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHr_submit_by(hrDetails.getusername());
			details.setHr_submit_id(hrDetails.getid());
			details.setHr_sign(hrDetails.getusername());

			bleachhousekeepingchecklistf02repository.save(details);
			try {

				bleachmailfunction.sendEmailToHODF02(details);
			} catch (Exception ex) {
				return new ResponseEntity<>(
						new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! " + ex),
						HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F02Hod
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approvehouseKeepingHodF02(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachHouseKeepingCheckListF02 details = bleachhousekeepingchecklistf02repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachhousekeepingchecklistf02repository.save(details);

		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F02A -- Hr
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approvehouseKeepingHrF02A(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hrDetails = userrepository.getHrDetails();

			BleachHouseKeepingCheckListF02A details = bleachhousekeepingchecklistf02arepository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hrApprovedStatus.equals(details.getHr_status())
					|| AppConstants.hrApprovedStatus.equals(details.getHr_mail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setHr_mail_status(AppConstants.hrApprovedStatus);
			details.setHr_status(AppConstants.hrApprovedStatus);
			details.setHr_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHr_submit_by(hrDetails.getusername());
			details.setHr_submit_id(hrDetails.getid());
			details.setHr_sign(hrDetails.getusername());

			bleachhousekeepingchecklistf02arepository.save(details);
			try {

				bleachmailfunction.sendEmailToHODF02A(details);
			} catch (Exception ex) {
				return new ResponseEntity<>(
						new ApiResponse(false, "Supervisor Approved but Unable to send mail to HOD! " + ex),
						HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F02A--Hod
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approvehousekeepingHod02A(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachHouseKeepingCheckListF02A details = bleachhousekeepingchecklistf02arepository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachhousekeepingchecklistf02arepository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F13 -- Hod
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveBleachJobcardHodF13(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachJobCardF13 details = bleachjobcard13repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setQa_status(AppConstants.waitingStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());

			bleachjobcard13repository.save(details);
			try {

				bleachmailfunction.sendEmailToQAF13(details);
			} catch (Exception ex) {
				return new ResponseEntity<>(
						new ApiResponse(false, "HOD Approved but Unable to send mail to QA! " + ex),
						HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}
	
	// F13 --QA	
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveBleachJobcardQaF13(Long id, Long userId,HttpServletRequest http) {
	    try {
	        // Fetch the QA details for the given userId
	        Optional<User> userOptional = userrepository.findById(userId);
	        if (!userOptional.isPresent()) {
	            return new ResponseEntity<>("User not found", HttpStatus.BAD_REQUEST);
	        }
	        User QA = userOptional.get();

	        // Fetching the QA details list
//	        List<BleachHodHrQaDetails> qaDetailsList = userrepository.getQADetails();

	        // Find the QA details for the current user
//	        BleachHodHrQaDetails qaDetails = qaDetailsList.stream()
//	                .filter(qa -> QA.getUsername().equals(qa.getusername()))
//	                .findFirst().orElse(null);

//	        if (qaDetails == null) {
//	            return new ResponseEntity<>("QA Details not found", HttpStatus.BAD_REQUEST);
//	        }

	        // Fetching the job card details
	        Optional<BleachJobCardF13> detailsOptional = bleachjobcard13repository.findById(id);
	        if (!detailsOptional.isPresent()) {
	            return new ResponseEntity<>("Job card details not found", HttpStatus.BAD_REQUEST);
	        }
	        BleachJobCardF13 details = detailsOptional.get();

	        // Check if already approved
	        if (AppConstants.qaApprovedStatus.equals(details.getQa_status())
	                || AppConstants.qaApprovedStatus.equals(details.getQa_mail_status())) {
	            return new ResponseEntity<>("Already Approved", HttpStatus.OK);
	        }

	        // Get the current time
	        LocalDateTime now = LocalDateTime.now();

	        // Update the job card details with the current QA's approval
	        details.setQa_mail_status(AppConstants.qaApprovedStatus);
	        details.setQa_status(AppConstants.qaApprovedStatus);
	        details.setQa_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
	        details.setQa_submit_by(QA.getUsername());
	        details.setQa_submit_id(QA.getId());
	        details.setQa_sign(QA.getUsername());

	        // Save the updated job card
	        bleachjobcard13repository.save(details);

	        return new ResponseEntity<>("Approved Successfully", HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
	    }
	}


	// F18
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveContCheckingReportF18(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachContAbsBleachedCottonF18 details = bleachContAbsBleachedCottonF18Repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());
			details.setHod_status(AppConstants.hodApprovedStatus);

			bleachContAbsBleachedCottonF18Repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F05
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveContRawCttonF05(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			BleachContRawCottonF05 details = bleachContRawCottonF05Repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());
			details.setHod_status(AppConstants.hodApprovedStatus);

			bleachContRawCottonF05Repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

//		@SuppressWarnings("unchecked")
//		public ResponseEntity<?> approveEquimentUsageF11(Long id, HttpServletRequest http) {
//
//			try {
//				BleachHodHrQaDetails hodDetails =  userrepository.getBleachDepartHOD();
//				String date = bleachEquipmentUsageLogBookF33Repository.getdatebyId(id);
//
//				
//				EquipLogBookHydroExtractorF11 records = equipLogBookHydroExtractorF11Repository.findFormById(id);
//				
//				List<EquipmentLogsF11> loglist = records.getEquipmentLogDetails();
//				
//				String HodStatus = records.getStatus();
//				String MailStatus = records.getMailStatus();
//				
//				if (HodStatus.equals(AppConstants.hodApprovedStatus) || MailStatus.equals(AppConstants.hodApprovedStatus)) {
//					return new ResponseEntity<>(
//							new ApiResponse(true, "HOD Already Approved for date: " + date),
//							HttpStatus.OK);
//				}
//				
//				for (EquipmentLogsF11 log : loglist) {
//					
//					LocalDateTime now = LocalDateTime.now();
//		
//					log.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
//					log.setHod_submit_by(hodDetails.getUsername());
//					log.setHod_submit_id(hodDetails.getId());
//					log.setHod_sign(hodDetails.getUsername());
//					
//					log.setHod_status(AppConstants.hodApprovedStatus);
//					equipmentLogsF11Repository.save(log);
//					
//					records.setStatus(AppConstants.hodApprovedStatus);
//					records.setMailStatus(AppConstants.hodApprovedStatus);
//				}
//				equipLogBookHydroExtractorF11Repository.save(records);
//				
//				
//			} catch (Exception e) {
//				return new ResponseEntity<>("Error Approving Lay Down Check List Details: " + e.getMessage(),
//						HttpStatus.BAD_REQUEST);
//			}
//			return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
//		}

//		F11
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveEquimentUsageF11(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			EquipLogBookHydroExtractorF11 details = equipLogBookHydroExtractorF11Repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());
			details.setHod_status(AppConstants.hodApprovedStatus);

			equipLogBookHydroExtractorF11Repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}

	// F03
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveMetalDetectorCheckListF03(Long id, HttpServletRequest http) {

		try {
			BleachHodHrQaDetails hodDetails = userrepository.getBleachDepartHOD();

			MetalDetectorCheckListF03 details = metalDetectorCheckListF03Repository.findById(id)
					.orElseThrow(() -> new Exception("Details not found"));
			if (AppConstants.hodApprovedStatus.equals(details.getHod_status())
					|| AppConstants.hodApprovedStatus.equals(details.getMail_status())) {
				return new ResponseEntity<>("Already Approved", HttpStatus.OK);
			}

			// Get the current time
			LocalDateTime now = LocalDateTime.now();

			details.setMail_status(AppConstants.hodApprovedStatus);
			details.setHod_status(AppConstants.hodApprovedStatus);
			details.setHod_submit_on(Date.from(now.atZone(ZoneId.systemDefault()).toInstant()));
			details.setHod_submit_by(hodDetails.getusername());
			details.setHod_submit_id(hodDetails.getid());
			details.setHod_sign(hodDetails.getusername());
			details.setHod_status(AppConstants.hodApprovedStatus);

			metalDetectorCheckListF03Repository.save(details);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Approving Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("Approved Sucessfully", HttpStatus.OK);
	}
}
