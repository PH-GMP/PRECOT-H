package com.focusr.Precot.mssql.database.service.bleaching;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.focusr.Precot.Buds.repository.BudsEquipmentUsuageHeaderRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrProductReleaseRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrProductionDetailsRepository;
import com.focusr.Precot.Buds.repository.bmr.BudsBmrQualityReleaseRepository;
import com.focusr.Precot.QA.repository.ManagementOfIncidenceRepository;
import com.focusr.Precot.mssql.database.model.User;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_Summary_Bleach;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrCompletionTable;
import com.focusr.Precot.mssql.database.model.splunance.BMR13RP14QaRelease;
import com.focusr.Precot.mssql.database.model.splunance.BMR14RP15ProductRelease;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.Qc.RawCottenAnalysisReportARF001Repository;
import com.focusr.Precot.mssql.database.repository.Store.MaterialInwardRegisterRepo;
import com.focusr.Precot.mssql.database.repository.bleaching.BMRSummaryBleachRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BMR_QualityReleaseRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachAppliedContRawCottonF04Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrCompletionTableRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachContRawCottonF05Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachLayDownCheckListF42Repository;
import com.focusr.Precot.mssql.database.repository.bleaching.BmrSummaryProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.MetalDetectorCheckListF03Repository;
import com.focusr.Precot.mssql.database.repository.dispatch.FinishedGoodsStockRegisterRepo;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR001GoodsProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR13GoodsQaReleaserRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BMR14GoodsProductReleaseRepository;
import com.focusr.Precot.mssql.database.repository.drygoods.BaleConsumptionReportDryGoodsF001Repository;
import com.focusr.Precot.mssql.database.repository.engineering.BreakdownIntimationSlipRepoF003;
import com.focusr.Precot.mssql.database.repository.padpunching.ProductionDetailLogBook01Repo;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrProductReleaseRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.padpunching.bmr.PunchingBmrQualityReleaseHeadRepository;
import com.focusr.Precot.mssql.database.repository.ppc.ContractReviewMeetingRepositoryF003;
import com.focusr.Precot.mssql.database.repository.productDevelopment.ProductDevelopmentSheetRepoF001;
import com.focusr.Precot.mssql.database.repository.splunance.BMR01RP01ProductionDetailsRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR13RP14QaReleaseRepository;
import com.focusr.Precot.mssql.database.repository.splunance.BMR14RP15ProductReleaseRepository;
import com.focusr.Precot.mssql.database.repository.splunance.ProcessSetupDetailsJetlaceAndDryerF003Repository;
import com.focusr.Precot.mssql.database.repository.splunance.ProcessSetupVerificationOpeningLineF002Repository;
import com.focusr.Precot.mssql.database.repository.splunance.SpluanceBaleConsumptionRepositoryF01;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.DashboardBmrDTO;
import com.focusr.Precot.payload.DashboardFormDTO;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.SCAUtil;

@Service
public class Dashboard2 {
	
	Logger logger = LoggerFactory.getLogger(Dashboard2.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private JwtTokenProvider tokenProvider;

	// REPO FOR DASHBOARD

	@Autowired
	private MetalDetectorCheckListF03Repository metalDetectorCheckListF03Repository;

	@Autowired
	private BleachAppliedContRawCottonF04Repository bleachAppliedContRawCottonF04Repository;

	@Autowired
	private BleachLayDownCheckListF42Repository layDownCheckListF42Repository;

	@Autowired
	private BleachContRawCottonF05Repository bleachContRawCottonF05Repository;

	// SPUNLACE

	@Autowired
	private SpluanceBaleConsumptionRepositoryF01 baleConsumptionRepository;

	@Autowired
	ProcessSetupVerificationOpeningLineF002Repository processsetupverificationopeninglinef002repository;

	@Autowired
	ProcessSetupDetailsJetlaceAndDryerF003Repository processsetupdetailsjetlaceanddryerf003repository;
	
    // PADPUNCHING
	
	@Autowired  
	ProductionDetailLogBook01Repo productionDetailLogBook01Repo;
	
	// DRYGOODS

	@Autowired  
	BaleConsumptionReportDryGoodsF001Repository baleconsumptionreportdrygoodsf001repository ;
	
	// QUALITY CONTROL
	
	@Autowired
	private RawCottenAnalysisReportARF001Repository rawCottenAnalysisRepo;
	
	// QUALITY ASSURANCE
	
	@Autowired
	private ManagementOfIncidenceRepository managementofincidencerepository;
	
	 @PersistenceContext
	 private EntityManager entityManager;
	 
//	    They appear in Form 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 16 -- Generic query in Bleaching 
	 
	    public List<Object[]> getOneToSixStatusCounts(String tableName) {
	    	
	        String sql = "SELECT " +
	                "SUM(CASE WHEN SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' " +
	                "OR (HOD_STATUS = 'HOD_REJECTED' AND SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED') " +
	                "THEN 1 ELSE 0 END) AS supervisorCount, " +
	                "SUM(CASE WHEN HOD_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS hodCount " +
	                "FROM " + tableName;

	        Query query = entityManager.createNativeQuery(sql);
	        return query.getResultList();
	    }
	    
	    
		private DashboardFormDTO buildForm(String formName, String deptId, String formDescription,
				List<Object> userRole, List<Object[]> countList) {
			List<Long> formStatus = new ArrayList<>();
			if (countList != null && !countList.isEmpty()) {
				Object[] count = countList.get(0);

				if (count == null) {
					formStatus.add(0L);
				} else {

					for (Object obj : count) {
						formStatus.add(obj == null ? 0L : ((Number) obj).longValue());
					}

				}

			} else {
				formStatus.add(0L);
			}
			return new DashboardFormDTO(formName, deptId, formDescription, userRole, formStatus);
		}


	public ResponseEntity<?> dashboard2(HttpServletRequest http) {
	    SCAUtil sca = new SCAUtil();
	    String userRole = getUserRole();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);

	    Map<String, Object> response = new HashMap<>();
	    List<DashboardFormDTO> formsList = new ArrayList<>();

	    try {
	        User user = userRepository.getDetailsByUserName(userName);

	        List<String> departmentIds = userRepository.getDepartmentByIdNew(userId);
	        if (departmentIds == null || departmentIds.isEmpty() || departmentIds.get(0) == null) {
	            departmentIds = userRepository.getDepartmentByIdNew2(userId);
	        }

	        // 🔹 Department 1 (Bleaching)
	        if (departmentIds.contains("1") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getBleachingForms(userRole));
	        }

	        // 🔹 Department 2 (Spunlace)
	        if (departmentIds.contains("2") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getSpunlaceForms(userRole));
	        }
	        
	        // 🔹 Department 3 (PadPunching)
	        if (departmentIds.contains("3") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getPadPunchingForms(userRole));
	        }
	        
	        // 🔹 Department 4 (DryGoods)
	        if (departmentIds.contains("4") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getDryGoodsForms(userRole));
	        }
	        
	        // 🔹 Department 5 (QualityControl)
	        if (departmentIds.contains("5") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getQcForms(userRole));
	        }
	        
	        // 🔹 Department 6 (QualityAssurance)
	        if (departmentIds.contains("6") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getQaForms(userRole));
	        }
	        
	        // NEW
	        
	        // 🔹 Department 7 (PPC)
	        if (departmentIds.contains("7") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getPpcForms(userRole));
	        }
	        
	        // 🔹 Department 8 (Store)
	        if (departmentIds.contains("8") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getStoreForms(userRole));
	        }
	        
	        // 🔹 Department 9 (Dispatch)
	        if (departmentIds.contains("9") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getDispatchForms(userRole));
	        }
	        
	        // 🔹 Department 10 (ProductDevelopment)
	        if (departmentIds.contains("10") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getDevelopmentForms(userRole));
	        }
	        
	        // 🔹 Department 11 (Engineering)
	        if (departmentIds.contains("1") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getEngineeringForms(userRole));
	        }
	        
	        // 🔹 Department 12 (CottonBuds)
	        if (departmentIds.contains("12") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getCottonBudsForms(userRole));
	        }

	        
	        response.put("forms", formsList);

	        // Optional: debug log
	        String jsonResponse = new ObjectMapper().writeValueAsString(response);
	        System.out.println(jsonResponse);

	    } catch (Exception e) {
	        logger.error("***************** Unable to get List Of Dashboard!  *********************\n" + e);
	        String msg = sca.getErrorMessage(e);
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to get List Of Dashboard! " + msg),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
// BLEACHING
	
	private List<DashboardFormDTO> getBleachingForms(String userRole) {
	    List<DashboardFormDTO> formsList = new ArrayList<>();

	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        // FORM 1
	        String tableName = "precot.BLEACH_LAY_DOWN_CHECK_LIST_F42";
	        List<Object[]> form1Counts = getOneToSixStatusCounts(tableName);
	        formsList.add(buildForm("1St Form", "1",
	            "PH-PRD01/F-001 LAYDOWN CHECKLIST",
	            Arrays.asList("ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form1Counts));

	        // FORM 2
	        List<Object[]> form2Counts = layDownCheckListF42Repository.getMetalDetectorCheckListF03StatusCounts();
	        formsList.add(buildForm("2nd Form", "1",
	            "PH-PRD01/F-002 METAL DETECTOR CHECK LIST",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form2Counts));

	        // FORM 3
	        List<Object[]> form3Counts = layDownCheckListF42Repository.getBleachAppliedContRawCottonF04StatusCounts();
	        formsList.add(buildForm("3rd Form", "1",
	            "PH-PRD01/F-003 APPLIED CONTAMINATION REPORT (RAW COTTON)",
	            Arrays.asList("ROLE_SUPERVISOR" , Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form3Counts));

	        // FORM 4
	        List<Object[]> form4Counts = layDownCheckListF42Repository.getBleachContRawCottonF05StatusCounts();
	        formsList.add(buildForm("4th Form", "1",
	            "PH-PRD01/F-004 CONTAMINATION CHECKING REPORT (RAW COTTON)",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form4Counts));

	        // FORM 5
	        List<Object[]> form5Counts = layDownCheckListF42Repository.getEquipmentUsageLogBookBlowRoomCardingStatusCounts();
	        formsList.add(buildForm("5th Form", "1",
	            "PH-PRD01/F-005 EQUIPMENT USAGE LOG BOOK - BLOW ROOM & CARDING",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form5Counts));

	        // FORM 6
	        List<Object[]> form6Counts = layDownCheckListF42Repository.getEquipmentUsageLogBookCakePressStatusCounts();
	        formsList.add(buildForm("6th Form", "1",
	            "PH-PRD01/F-006 EQUIPMENT USAGE LOG BOOK - CAKE PRESS",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form6Counts));

	        // FORM 7
	        List<Object[]> form7Counts = layDownCheckListF42Repository.getBleachingJobCardStatusCounts();
	        formsList.add(buildForm("7th Form", "1",
	            "PH-PRD01/F-007 BLEACHING JOB CARD",
	            Arrays.asList("ROLE_OPERATOR", "ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form7Counts));

	        // FORM 8
	        List<Object[]> form8Counts = layDownCheckListF42Repository.getEquipmentUsageLogBookHydroExtractorStatusCounts();
	        formsList.add(buildForm("8th Form", "1",
	            "PH-PRD01/F-008 EQUIPMENT USAGE LOG BOOK HYDRO EXTRACTOR",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form8Counts));

	        // FORM 9
	        List<Object[]> form9Counts = layDownCheckListF42Repository.getSanitizationOfMachineAndSurfacesStatusCounts();
	        formsList.add(buildForm("9th Form", "1",
	            "PH-PRD01/F-009 SANITIZATION OF MACHINES & SURFACES",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form9Counts));

	        // FORM 10
	        List<Object[]> form10Counts = layDownCheckListF42Repository.getSanitizationReportAbBalePressMachineStatusCounts();
	        formsList.add(buildForm("10th Form", "1",
	            "PH-PRD01/F-010 BLEACHING HAND SANITIZATION REPORT AB BALE PRESS MACHINE",
	            Arrays.asList("ROLE_SUPERVISOR" , Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form10Counts));

	        // FORM 11
	        List<Object[]> form11Counts = layDownCheckListF42Repository.getAppliedContReportAbCottonStatusCounts();
	        formsList.add(buildForm("11th Form", "1",
	            "PH-PRD01/F-011 APPLIED CONTAMINATION REPORT (ABSORBENT BLEACHED COTTON)",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form11Counts));

	        // FORM 12
	        List<Object[]> form12Counts = layDownCheckListF42Repository.getContCheckingReportAbCottonStatusCounts();
	        formsList.add(buildForm("12th Form", "1",
	            "PH-PRD01/F-012 CONTAMINATION CHECKING REPORT (ABSORBENT BLEACHED COTTON)",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form12Counts));

	        // FORM 13
	        List<Object[]> form13Counts = layDownCheckListF42Repository.getShiftLogBookStatusCounts();
	        formsList.add(buildForm("13th Form", "1",
	            "PH-PRD01/F-013 SHIFT LOG BOOK",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form13Counts));

	        // FORM 14
	        List<Object[]> form14Counts = layDownCheckListF42Repository.getMixingChangeOverAndMachineCheckListStatusCounts();
	        formsList.add(buildForm("14th Form", "1",
	            "PH-PRD01/F-014 MIXING CHANGE OVER & MACHINE CLEANING CHECK LIST BLOW ROOM & BLEACHING",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form14Counts));

	        // FORM 15
	        List<Object[]> form15Counts = layDownCheckListF42Repository.getEquipmentUsageLogBookWasteBalePressStatusCounts();
	        formsList.add(buildForm("15th Form", "1",
	            "PH-PRD01/F-015 EQUIPMENT USAGE LOG BOOK WASTE BALE PRESS",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form15Counts));

	        // FORM 16
	        List<Object[]> form16Counts = layDownCheckListF42Repository.getMachineCleaningRecordStatusCounts();
	        formsList.add(buildForm("16th Form", "1",
	            "PH-PRD01/F-016 MACHINE CLEANING RECORD (DAILY)",
	            Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
	            form16Counts));
	       
	    }
	    
	      if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
		            || userRole.equalsIgnoreCase("ROLE_HOD")
		            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		            || userRole.equalsIgnoreCase("ROLE_QA")
		            || userRole.equalsIgnoreCase("ROLE_HR"))  {
		        	
		        	 // FORM 17
			        List<Object[]> form17Counts = layDownCheckListF42Repository.getHouseKeepingCleaninfCheckListF02StatusCounts();
			        formsList.add(buildForm("17th Form", "1",
			            "PRD01/F-02 HOUSE KEEPING CLEANING CHECKLIST",
			            Arrays.asList("ROLE_HR", "ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
			            form17Counts));

			        // FORM 18
			        List<Object[]> form18Counts = layDownCheckListF42Repository.getHouseKeepingCleaninfCheckListF02AStatusCounts();
			        formsList.add(buildForm("18th Form", "1",
			            "PRD01/F-02A HOUSE KEEPING CLEANING CHECK LIST",
			            Arrays.asList("ROLE_SUPERVISOR", "ROLE_HR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
			            form18Counts));

			        // FORM 19
			        List<Object[]> form19Counts = layDownCheckListF42Repository.getReProcessingReportStatusCounts();
			        formsList.add(buildForm("19th Form", "1",
			            "PH-PRD01/F-016 RE-PROCESSING REPORT",
			            Arrays.asList("ROLE_HR", "ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE")),
			            form19Counts));
		        	
		        }

	    return formsList;
	}

	
	private List<DashboardFormDTO> getSpunlaceForms(String userRole) {
	    List<DashboardFormDTO> formsList = new ArrayList<>();

	    // FORM 1
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleConsumptionRepository.getStatusCounts();
	        formsList.add(buildForm("1St Form", "2",
	                "PH-PRD02/F-001 BALE CONSUMPTION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR", "ROLE_SUPERVISOR", "ROLE_HOD")),
	                countList));
	    }

	    // FORM 2
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupverificationopeninglinef002repository.getStatusCounts();
	        formsList.add(buildForm("2nd Form", "2",
	                "PH-PRD02/F-002 PROCESS SETUP VERIFICATION OPENING LINE",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR", "ROLE_SUPERVISOR", "ROLE_HOD")),
	                countList));
	    }

	    // FORM 3
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getStatusCounts();
	        formsList.add(buildForm("3rd Form", "2",
	                "PH-PRD02/F-003 PROCESS SETUP DETAILS JETLACE & DRYER",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR", "ROLE_SUPERVISOR", "ROLE_HOD")),
	                countList));
	    }

	    // FORM 4
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getFilterBagConsumptionDetailsStatusCounts();
	        formsList.add(buildForm("4th Form", "2",
	                "PH-PRD02/F-004 FILTER BAG CONSUMPTION DETAILS",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR", "ROLE_SUPERVISOR", "ROLE_HOD")),
	                countList));
	    }

	    // FORM 5
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getProcessSetupWinderStatusCounts();
	        formsList.add(buildForm("5th Form", "2",
	                "PH-PRD02/F-005 PROCESS SETUP DETAILS - WINDER",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR", "ROLE_SUPERVISOR", "ROLE_HOD")),
	                countList));
	    }

	    // FORM 6
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getDailyProductionReportStatusCounts();
	        formsList.add(buildForm("6th Form", "2",
	                "PH-PRD02/F-006 DAILY PRODUCTION REPORT - SPUNLACE",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR", "ROLE_SUPERVISOR", "ROLE_HOD")),
	                countList));
	    }

	    // FORM 7
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getDailyRejectionReportStatusCounts();
	        formsList.add(buildForm("7th Form", "2",
	                "PH-PRD02/F-007 DAILY REJECTION REPORT - SPUNLACE",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR", "ROLE_SUPERVISOR", "ROLE_HOD")),
	                countList));
	    }

	    // FORM 8 (no ROLE_OPERATOR)
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getDailyStoppageReportStatusCounts();
	        formsList.add(buildForm("8th Form", "2",
	                "PH-PRD02/F-008 DAILY STOPPAGE REPORT - SPUNLACE",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", "ROLE_HOD")),
	                countList));
	    }

	    // FORM 9
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getGsmAnalysisReportStatusCounts();
	        formsList.add(buildForm("9th Form", "2",
	                "PH-PRD02/F-009 SPUNLACE GSM ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", "ROLE_HOD")),
	                countList));
	    }

	    // FORM 10
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getLogBookSpunlacePlanningStatusCounts();
	        formsList.add(buildForm("10th Form", "2",
	                "PH-QAD01/F-052 LOGBOOK – SPUNLACE PLANNING",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", "ROLE_HOD")),
	                countList));
	    }

	    // FORM 11
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getProductChangeOverCheckListStatusCounts();
	        formsList.add(buildForm("11th Form", "2",
	                "PH-PRD02/F-010 PRODUCT CHANGE OVER CHECK LIST SPUNLACE",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"),"ROLE_QA")),
	                countList));
	    }
	    
	    
	    // FORM 12
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QC")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getSampleReportStatusCounts();
	        formsList.add(buildForm("12th Form", "2",
	                "PH-PRD02/F-011 SAMPLE REPORT - SPUNLACE",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"),"ROLE_QC")),
	                countList));
	    }
	    
	    // FORM 13
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getRpBalePressStoppageStatusCounts();
	        formsList.add(buildForm("13th Form", "2",
	                "PH-PRD02/F-014 RP BALE PRESS STOPPAGE REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 14
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getShiftWiseCottonWasteReportStatusCounts();
	        formsList.add(buildForm("14th Form", "2",
	                "PH-PRD02/F-020 SHIFT WISE COTTON WASTE REPORT OF SPUNLCAE",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 15
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getMetalDetectorCheckListStatusCounts();
	        formsList.add(buildForm("15th Form", "2",
	                "PH-PRD02/F-019 METAL DETECTOR CHECKLIST",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 16
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getMachineCleaningRecordStatusCounts();
	        formsList.add(buildForm("16th Form", "2",
	                "PH-PRD02/F-023 MACHINE CLEANING RECORD (WEEKLY)",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    
	    // FORM 17
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getSanitizationOfMachineAndSurfaceStatusCounts();
	        formsList.add(buildForm("17th Form", "2",
	                "PH-PRD02/F-021 SANITIZATION OF MACHINES & SURFACES",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 18
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getSpunlaceHandSanitizationReportStatusCounts();
	        formsList.add(buildForm("18th Form", "2",
	                "PH-PRD02/F-025 SPUNLACE HAND SANITIASITON REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 19
	    	
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getProcessSetupVerificationRPBalePressStatusCounts();
	        formsList.add(buildForm("19th Form", "2",
	                "PH-PRD02/F-012 PROCESS SETUP VERIFICATION - RP BALE PRESS",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 20
    	
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getShiftWiseRpProductionReportStatusCounts();
	        formsList.add(buildForm("20th Form", "2",
	                "PH-PRD02/F-013 SHIFT WISE RP PRODUCTION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 21
    	
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getProcessSetupVerificationSliterWinderStatusCounts();
	        formsList.add(buildForm("21th Form", "2",
	                "PH-PRD02/F-015 PROCESS SETUP VERIFICATION SLITER WINDER",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 22
    	
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getShiftWiseSliterWinderProductionReportStatusCounts();
	        formsList.add(buildForm("22th Form", "2",
	                "PH-PRD02/F-016 SHIFT WISE SLITER WINDER PRODUCTION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 23
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = processsetupdetailsjetlaceanddryerf003repository.getShiftWiseStoppageReportSliterWinderStatusCounts();
	        formsList.add(buildForm("18th Form", "2",
	                "PH-PRD02/F-017 SHIFT WISE STOPPAGE REPORT OF SLITER WINDER",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    
	    }
	    

	    return formsList;
	}
	
	// PAD-PUNCHING
	
	private List<DashboardFormDTO> getPadPunchingForms(String userRole) {
	    List<DashboardFormDTO> formsList = new ArrayList<>();

	    // FORM 1
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getProductionDetailsLogBookStatusCounts();
	        formsList.add(buildForm("1St Form", "3",
	                "PH-QAD01-F-054 PRODUCTION DETAILS - LOG BOOK",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 2
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getDailyRollConsumptionReportStatusCounts();
	        formsList.add(buildForm("2nd Form", "3",
	                "PH-PRD03/F-002 DAILY ROLL CONSUMPTION REPORT-PAD PUNCHING",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    
	    // FORM 3
	    
	    if ( userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getProductChangeOverStatusCounts();
	        formsList.add(buildForm("3rd Form", "3",
	                "PH-PRD03/F-003 PRODUCT CHANGE OVER",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR","ROLE_QA", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 4
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getDailyProductionPackingDetailsStatusCounts();
	        formsList.add(buildForm("4th Form", "3",
	                "PH-PRD03/F-004 DAILY PRODUCTION PACKING DETAILS",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 5
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getMachineCleaningCheckListStatusCounts();
	        formsList.add(buildForm("5th Form", "3",
	                "PH-PRD03/F-005 MACHINE CLEANING CHECK LIST",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 6
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getHandSanitizationReportStatusCounts();
	        formsList.add(buildForm("6th Form", "3",
	                "PH-HRD01-F-023 HAND SANITISATION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 7
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getArgsMetalDetectorCheckListStatusCounts();
	        formsList.add(buildForm("7th Form", "3",
	                "PH-PRD03-F-006 ARGUS METAL DETECTOR- CHECK LIST",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	 // FORM 8
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getSanitizationOfMachineAndSurfacesStatusCounts();
	        formsList.add(buildForm("8th Form", "3",
	                "PH-PRD03/F-008 SANITIZATION OF MACHINES & SURFACES",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    
	    }
	    
	 // FORM 9
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_HR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getHouseKeepingCleaningCheckListPadPunchingStatusCounts();
	        formsList.add(buildForm("9th Form", "3",
	                "PH-HRD01/F-006 HOUSE KEEPING CLEANING CHECK LIST (Pad Punching)",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR","ROLE_HR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    
	    }
	    
	    
	 // FORM 10
	    
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getLogBookBagMakingStatusCounts();
	        formsList.add(buildForm("10th Form", "3",
	                "PH-PRD05/F-003 LOG BOOK - BAG MAKING",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    
	    }
	    
//	    FORM 11
	    
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getBagMakingDailyProdDetailsStatusCounts();
	        formsList.add(buildForm("11th Form", "3",
	                "PH-PRD05/F-001 BAG MAKING DAILY PRODUCTION DETAILS",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    
	    }
	    
	    
//	    FORM 12
	    
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getBagMakingSpecificationDetailsStatusCounts();
	        formsList.add(buildForm("12th Form", "3",
	                "PH-PRD05/F-002 BAG MAKING - SPECIFICATION DETAILS",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 13
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_HR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productionDetailLogBook01Repo.getHouseKeepingCleaningCheckListBagMakingStatusCounts();
	        formsList.add(buildForm("13th Form", "3",
	                "PH-HRD01/F-010 HOUSE KEEPING CLEANING CHECK LIST (Bag Making)",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", "ROLE_HR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    
	    }
	

	    return formsList;
	}
	
	
	
	// DRY GOODS
	
	private List<DashboardFormDTO> getDryGoodsForms(String userRole) {
	    List<DashboardFormDTO> formsList = new ArrayList<>();

//	    || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    
	    // FORM 1
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getBaleConsumptionReportStatusCounts();
	        formsList.add(buildForm("1St Form", "4",
	                "PH-PRD04/F-001 BALE CONSUMPTION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }

	    // FORM 2
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getDailyProductionSliverMakingStatusCounts();
	        formsList.add(buildForm("2nd Form", "4",
	                "PH-PRD04/F-002 DAILY PRODUCTION - SLIVER MAKING",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 3
	    
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getDailyProductionCottonBallsStatusCounts();
	        formsList.add(buildForm("3rd Form", "4",
	                "PH-PRD04/F-003 DAILY PRODUCTION - COTTON BALLS",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 4
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getProductionReportMiniRollStatusCounts();
	        formsList.add(buildForm("4th Form", "4",
	                "PH-PRD04/F-005 PRODUCTION REPORT - MINI ROLL",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 5
	    
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getDailyProductionPleatWoolRollStatusCounts();
	        formsList.add(buildForm("5th Form", "4",
	                "PH-PRD04/F-006 DAILY PRODUCTION (PLEAT / WOOL ROLL)",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    
	    
	    // FORM 6
	    
	    if ( userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getProductChangeOverDryGoodsStatusCounts();
	        formsList.add(buildForm("6th Form", "4",
	                "PH-PRD04/F-009 PRODUCT CHANGE OVER - DRY GOODS",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"),"ROLE_QA")),
	                countList));
	    }
	    
	    
	    // FORM 7
	    
	    if ( userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getLogBookDryGoodsStatusCounts();
	        formsList.add(buildForm("7th Form", "4",
	                "PH-PRD04/F-010 LOG BOOK - DRY GOODS",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    
	    // FORM 8
	    
	    if ( userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getBallPleatWoolRollFinishedGoodsTransferRecordStatusCounts();
	        formsList.add(buildForm("8th Form", "4",
	                "PH-PRD04/F-011 BALL, PLEAT & WOOL ROLL FINISHED GOODS TRANSFER RECORD",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR")),
	                countList));
	    }
	    
	    
	    // FORM 9
	    
	    if ( userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getSanitizationOfMachineAndSurfacesStatusCounts();
	        formsList.add(buildForm("9th Form", "4",
	                "PH-PRD04/F-012 SANITIZATION OF MACHINES & SURFACES - DRY GOODS",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 10
	    
	    if ( userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getHandSanitizationReportDryGoodsStatusCounts();
	        formsList.add(buildForm("10th Form", "4",
	                "PH-PRD04/F-023 HAND SANITIZATION REPORT - DRY GOODS",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    
	    // FORM 11
	    
	    if ( userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_HR")
	            || userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = baleconsumptionreportdrygoodsf001repository.getHouseKeepingCleaningCheckListDtyGoodsStatusCounts();
	        formsList.add(buildForm("11th Form", "4",
	                "PH-HRD01/F-004 HOUSE KEEPING CLEANING CHECK LIST - DRY GOODS",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR","ROLE_HR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }


	    

	    return formsList;
	}
	
	
								/** 
								 * QUALITY CONTROL (QC)
								 * @param userRole
								 */
	
	private List<DashboardFormDTO> getQcForms(String userRole) {
	    List<DashboardFormDTO> formsList = new ArrayList<>();

	    
	    // FORM 1
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getRawCottonAnalysisReportStatusCounts();
	        formsList.add(buildForm("1St Form", "5",
	                "PH-QCL01-AR-F-001 RAW COTTON ANALYSIS REPORT (VC / CN / CN-2)",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 2
	    if (userRole.equalsIgnoreCase("ROLE_QA")|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getNonWovenFleeceAnalysisReportStatusCounts();
	        formsList.add(buildForm("1St Form", "5",
	                "PH-QCL01-AR-F-005 NON-WOVEN FLEECE ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }

	    // FORM 3
	    
	    if (userRole.equalsIgnoreCase("ROLE_QA")
	    		|| userRole.equalsIgnoreCase("ROLE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("DEVELOPMENT_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getRequsitionSampleAnalysisReportStatusCounts();
	        formsList.add(buildForm("1St Form", "5",
	                "PH-QCL01F-029 - REQUISITION SAMPLE ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_QA",Arrays.asList("QC_MANAGER", "QA_MANAGER"),"DEVELOPMENT_MANAGER","ROLE_HOD",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }

	    // FORM 4
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getAbsorbmentBleachedCottonAnalysisReportStatusCounts();
	        formsList.add(buildForm("4th Form", "5",
	                "PH-QCL01-AR-F-002 ABSORBMENT BLEACHED COTTON ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }

	    
	    
	    // FORM 5  PH-QCL01-AR-F-008
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getFloorSwabReportStatusCounts();
	        formsList.add(buildForm("5th Form", "5",
	                "PH-QCL01-AR-F-008 FLOOR SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    // FORM 6  PH-QCL01-AR-F-009
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getHandlerSwabReportStatusCounts();
	        formsList.add(buildForm("6th Form", "5",
	                "PH-QCL01-AR-F-009 HANDLER'S SWAB - MICROBIOLOGICAL ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	
	    // FORM 7  PH-QCL01-AR-F-010
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getMachineSwabReportStatusCounts();
	        formsList.add(buildForm("7th Form", "5",
	                "PH-QCL01-AR-F-010 MACHINE  SWAB - MICROBIOLOGICAL ANALYSIS  REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    
	    // -- INWARD BOOK
	    
	    // FORM 8  --  PH-QCL01/F-001 --  Physical And Chemical Lab Sample Inward Book 
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getPhysicalAndChemicalLabSampleInwardBookStatusCounts();
	        formsList.add(buildForm("8th Form", "5",
	                "PH-QCL01F-001 PHYSICAL AND CHEMICAL LAB SAMPLE INWARD BOOK",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST")),
	                countList));
	    }
	    
	    
	    // FORM 9  --  PH-QCL01/F-002 --  Microbiology Lab Sample Inward Book
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getMicroBiologyLabSampleInwwardBookStatusCounts();
	        formsList.add(buildForm("9th Form", "5",
	                "PH-QCL01F-002 MICROBIOLOGY LAB SAMPLE INWARD BOOK",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST")),
	                countList));
	    }
	    
	    
	    // FORM 10  --  PH-QCL01/F-003 --  ETP Lab Sample Inward Book
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_ETP")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getEtpLabSampleInwardBookStatusCounts();
	        formsList.add(buildForm("10th Form", "5",
	                "PH-QCL01F-003 ETP LAB SAMPLE INWARD BOOK",
	                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_CHEMIST", "ROLE_ETP"))),
	                countList));
	    }
	    
	    
	    // FORM 11  --  PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("MICRO_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getBacterialIncubatorTempratureCalibrationReportStatusCounts();
	        formsList.add(buildForm("11th Form", "5",
	                "PH-QCL01F-012 BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER","MICRO_DESIGNEE"))),
	                countList));
	    }
	    
	    
	    // FORM 12  -- PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("MICRO_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getFungalIncubatorTempratureCalibrationReportStatusCounts();
	        formsList.add(buildForm("12th Form", "5",
	                "PH-QCL01F-013 FUNGAL INCUBATOR TEMPERATURE CALIBRATION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER", "MICRO_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 13  -- PH-QCL01F-014 VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("MICRO_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getValidationForAutoclaveByChemicalIndicatorStatusCounts();
	        formsList.add(buildForm("13th Form", "5",
	                "PH-QCL01F-014 VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER", "MICRO_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 14
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("MICRO_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getValidationForAutoclaveByBiologicalIndicatorStatusCounts();
	        formsList.add(buildForm("14th Form", "5",
	                "PH-QCL01/F-015 VALIDATION FOR AUTOCLAVE BY BIOLOGICAL INDICATOR",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER", "MICRO_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 15
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("MICRO_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getTempratureRelativeHumidityRecordOfDryAndWetBulbStatusCounts();
	        formsList.add(buildForm("15th Form", "5",
	                "PH-QCL01F-018 TEMPERATURE & RELATIVE HUMIDITY RECORD OF DRY & WET BULB",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER", "MICRO_DESIGNEE"))),
	                countList));
	    }

	    
	    // FORM 16
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("MICRO_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getMediaPreparationAndConsumptionRecordStatusCounts();
	        formsList.add(buildForm("16th Form", "5",
	                "PH-QCL01F-019 MEDIA PREPARATION & CONSUMPTION RECORD",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER", "MICRO_DESIGNEE"))),
	                countList));
	    }

	    
	    // FORM 17
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getMicroBiologicalAnalysisReportForMiscellaneousStatusCounts();
	        formsList.add(buildForm("17th Form", "5",
	                "PH-QCL01/F-020 MICROBIOLOGICAL ANALYSIS REPORT FOR MISCELLANEOUS",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 18
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getMediaGrowthPromotionTestReportStatusCounts();
	        formsList.add(buildForm("18th Form", "5",
	                "PH-QCL01F-021 MEDIA GROWTH PROMOTION TEST REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }

	    // FORM 19
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getMediaDisposalRecordStatusCounts();
	        formsList.add(buildForm("19th Form", "5",
	                "PH-QCL01F-022 - MEDIA DISPOSAL RECORD",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 20
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getCleaningOfAutoClavesStatusCounts();
	        formsList.add(buildForm("20th Form", "5",
	                "PH-QCL01/F-023 CLEANING OF AUTOCLAVES",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST")),
	                countList));
	    }
	    
	    // FORM 21
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getDistilledWaterConsumptionReportStatusCounts();
	        formsList.add(buildForm("21st Form", "5",
	                "PH-QCL01/F-027 DISTILLED WATER CONSUMPTION REPORT",
	                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_CHEMIST","ROLE_MICROBIOLOGIST"))),
	                countList));
	    }
	    
	    // FORM 22
	    
	    if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("MICRO_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = rawCottenAnalysisRepo.getDigitalColonyCounterCalibrationStatusCounts();
	        formsList.add(buildForm("22nd Form", "5",
	                "PH-QCL01/F-030 DIGITAL COLONY COUNTER CALIBRATION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_MICROBIOLOGIST","MICRO_DESIGNEE")),
	                countList));
	    }


	    // FORM 23
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getChemicalAnalysisReportStatusCounts();
	        formsList.add(buildForm("23rd Form", "5",
	                "PH-QCL01-AR-F-003 CHEMICAL ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 24
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getExfoliatingFabricAnalysisReportStatusCounts();
	        formsList.add(buildForm("24th Form", "5",
	                "PH-QCL01-AR-F-004 EXFOLIATING FABRIC ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER","QA_EXECUTIVE"))),
	                countList));
	    }
	    
	    
	    // FORM 25
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getFinishedProductAnalysisReportStatusCounts();
	        formsList.add(buildForm("25th Form", "5",
	                "PH-QCL01-AR-F-006 FINISHED PRODUCT ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER","QA_EXECUTIVE"))),
	                countList));
	    }
	    
	    // FORM 26
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getWaterAnalysisReportStatusCounts();
	        formsList.add(buildForm("26th Form", "5",
	                "PH-QCL01-AR-F-007 WATER ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","QA_EXECUTIVE","ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    // FORM 27
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getFumigationAndMicrobiologicalAnalysisForAirStatusCounts();
	        formsList.add(buildForm("27th Form", "5",
	                "PH-QCL01-AR-F-011 FUMIGATION AND MICROBIOLOGICAL ANALYSIS FOR AIR",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER","QA_EXECUTIVE"))),
	                countList));
	    }
	    
	    
	    // FORM 28
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getDistilledWaterAnalysisReportStatusCounts();
	        formsList.add(buildForm("28th Form", "5",
	                "PH-QCL01-AR-F-012 DISTILLED WATER ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    // FORM 29
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getPotableWaterAnalysisReportStatusCounts();
	        formsList.add(buildForm("29th Form", "5",
	                "PH-QCL01-AR-F-013 POTABLE WATER ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }

	    
	    
	    // FORM 30
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getBriquettesAnalysisReportStatusCounts();
	        formsList.add(buildForm("29th Form", "5",
	                "PH-QCL01-AR-F-014 BRIQUETTES ANALYSIS REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    // FORM 31
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getRawCottonConsolidatedAnalyticalReportStatusCounts();
	        formsList.add(buildForm("31st Form", "5",
	                "PH-QCL01/F-004 RAW COTTON CONSOLIDATED ANALYTICAL REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    // FORM 32
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getAbsorbentBleachedCottonConsolidatedAnalyticalReportStatusCounts();
	        formsList.add(buildForm("32nd Form", "5",
	                "PH-QCL01/F-005  ABSORBENT BLEACHED COTTON CONSOLIDATED ANALYTICAL REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER", "QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 33
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getPhMeterCalibrationReportStatusCounts();
	        formsList.add(buildForm("33rd Form", "5",
	                "PH-QCL01/F-006 PH-METER CALIBRATION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER","CHEMIST_DESIGNEE","QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    // FORM 34
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getWeighingScaleCalibrationReportStatusCounts();
	        formsList.add(buildForm("34th Form", "5",
	                "PH-QCL01/F-007 WEIGHING SCALE CALIBRATION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER","CHEMIST_DESIGNEE","QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 35
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getTdsMeterCalibrationReportStatusCounts();
	        formsList.add(buildForm("35th Form", "5",
	                "PH-QCL01F-008 TDS-METER CALIBRATION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER","CHEMIST_DESIGNEE","QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    // FORM 36
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getTurbidityCalibrationReportStatusCounts();
	        formsList.add(buildForm("36th Form", "5",
	                "PH-QCL01F-009 TURBIDITY CALIBRATION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER","CHEMIST_DESIGNEE","QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    // FORM 37
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getWiraFiberFitnessTesterCalibrationReportStatusCounts();
	        formsList.add(buildForm("37th Form", "5",
	                "PH-QCL01F-010 WIRA FIBER FINENESS TESTER CALIBRATION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER","CHEMIST_DESIGNEE","QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 38
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getSpectroMeterCm3600aCalibrationReportStatusCounts();
	        formsList.add(buildForm("38th Form", "5",
	                "PH-QCL01F-011 SPECTROPHOTOMETR CM-3600A CALIBRATION REPORT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER","CHEMIST_DESIGNEE","QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 39
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getStandardizationOfChemicalSolutionStatusCounts();
	        formsList.add(buildForm("39th Form", "5",
	                "PH-QCL01/F-016 STANDARDIZATION OF CHEMICAL SOLUTION",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("QC_MANAGER","QA_MANAGER"))),
	                countList));
	    }

	    
	    // FORM 40
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("MICRO_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getReagentPreprationRecordStatusCounts();
	        formsList.add(buildForm("40th Form", "5",
	                "PH-QCL01F-017 REAGENT PREPARATION RECORD",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST",Arrays.asList("CHEMIST_DESIGNEE","MICRO_DESIGNEE"))),
	                countList));
	    }

	    
	    // FORM 41
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getShelfLifePeriodPhysicalAndChemicalAndMiceoTestingReportDataStatusCounts();
	        formsList.add(buildForm("41th Form", "5",
	                "PH-QCL01F-025 SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","ROLE_MICROBIOLOGIST",Arrays.asList("QC_MANAGER","QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    
	    // COA 
	    
	    
	    // FORM 42
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getCoaForAbsorbentBleachedCottonStatusCounts();
	        formsList.add(buildForm("42nd Form", "5",
	                "PH-QCL01-F-026 CERTIFICATE OF ANALYSIS FOR ABSORBENT BLEACHED COTTON",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","QA_EXECUTIVE",Arrays.asList("QC_MANAGER","QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 43
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getCoaForCottonPadsStatusCounts();
	        formsList.add(buildForm("43rd Form", "5",
	                "PH-QCL01-F-026A CERTIFICATE OF ANALYSIS FOR COTTON PADS",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","QA_EXECUTIVE",Arrays.asList("QC_MANAGER","QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 44
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getCoaForCottonBallsStatusCounts();
	        formsList.add(buildForm("44th Form", "5",
	                "PH-QCL01/F-026B CERTIFICATE OF ANALYSIS FOR COTTON BALLS",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","QA_EXECUTIVE",Arrays.asList("QC_MANAGER","QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 45
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getCoaForCottonWoolRollStatusCounts();
	        formsList.add(buildForm("45th Form", "5",
	                "PH-QCL01/F-026C CERTIFICATE OF ANALYSIS FOR COTTON WOOL ROLL",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","QA_EXECUTIVE",Arrays.asList("QC_MANAGER","QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 46
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getCoaForCottonPleatStatusCounts();
	        formsList.add(buildForm("46th Form", "5",
	                "PH-QCL01/F-026D CERTIFICATE OF ANALYSIS FOR COTTON PLEAT",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","QA_EXECUTIVE",Arrays.asList("QC_MANAGER","QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 47
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getCoaForCottonRollGoodsStatusCounts();
	        formsList.add(buildForm("47th Form", "5",
	                "PH-QCL01/F-026E CERTIFICATE OF ANALYSIS FOR COTTON ROLL GOODS",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","QA_EXECUTIVE",Arrays.asList("QC_MANAGER","QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 48
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getCoaForInfusedCottonPadsStatusCounts();
	        formsList.add(buildForm("48th Form", "5",
	                "PH-QCL01/F-026F CERTIFICATE OF ANALYSIS FOR INFUSED COTTON PADS",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","QA_EXECUTIVE",Arrays.asList("QC_MANAGER","QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 49
	    
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("QA_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getCoaForMoistureContentStatusCounts();
	        formsList.add(buildForm("49th Form", "5",
	                "PH-QCL01/F-026G CERTIFICATE OF ANALYSIS FOR MOISTURE CONTENT (%)",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","QA_EXECUTIVE",Arrays.asList("QC_MANAGER","QA_MANAGER"))),
	                countList));
	    }
	    
	    
	    
	    // FORM 50
	    	
	    if (userRole.equalsIgnoreCase("ROLE_CHEMIST")
	    		|| userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getGlasswaresBreakageAndDisposalRegisterStatusCounts();
	        formsList.add(buildForm("50th Form", "5",
	                "PH-QCL01F-028 GLASSWARES BREAKAGE & DISPOSAL REGISTER",
	                new ArrayList<>(Arrays.asList("ROLE_CHEMIST","ROLE_MICROBIOLOGIST")),
	                countList));
	    }
	    
	    
	    // FORM 51
    	
	    if (userRole.equalsIgnoreCase("LAB_ASSISTANT")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = rawCottenAnalysisRepo.getDisposalRecordChemicalOrMediaStatusCounts();
	        formsList.add(buildForm("51st Form", "5",
	                "PH-QCL01F-024 DISPOSAL RECORD (CHEMICAL/MEDIA)",
	                new ArrayList<>(Arrays.asList("LAB_ASSISTANT")),
	                countList));
	    }
	    

	    
	    return formsList;
	}
	
	
	
	
	private List<DashboardFormDTO> getQaForms(String userRole) {
	    List<DashboardFormDTO> formsList = new ArrayList<>();

	    
	    // FORM 1
	    if (userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_MR")
	    		|| userRole.equalsIgnoreCase("ROLE_PLANT_HEAD")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = managementofincidencerepository.getManagementOfIncidenceStatusCounts();
	        formsList.add(buildForm("1St Form", "6",
	                "PH-QAD01/F-001 MANAGEMENT OF INCIDENCE",
	                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"),Arrays.asList("QA_MANAGER", "ROLE_MR"), "ROLE_PLANT_HEAD")),
	                countList));
	    }
	    
	    // FORM 2
	    
	    if (userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_MR")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = managementofincidencerepository.getRequestAndIssuanceOfDocumentStatusCounts();
	        formsList.add(buildForm("2nd Form", "6",
	                "PH-QAD01/F-002 REQUEST & ISSUANCE OF DOCUMENT",
	                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE","ROLE_SUPERVISOR"),Arrays.asList("QA_MANAGER", "ROLE_MR"))),
	                countList));
	    }
	    
	    
	    // FORM 3
	    
	    if (userRole.equalsIgnoreCase("ROLE_MR")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = managementofincidencerepository.getDistributionAndDestructionRecordStatusCounts();
	        formsList.add(buildForm("3rd Form", "6",
	                "PH-QAD01/F-003 DISTRIBUTION AND DESTRUCTION RECORD",
	                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_MR", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 4
	    
	    if (userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = managementofincidencerepository.getTrainingNeedIdentificationFormStatusCounts();
	        formsList.add(buildForm("4th Form", "6",
	                "PH-QAD01/F-005 TRAINING NEED IDENTIFICATION FORM",
	                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"),"QA_MANAGER")),
	                countList));
	    }
	    
	    
	    // FORM 5
	    
	    if ( userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_MR")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	

	        List<Object[]> countList = managementofincidencerepository.getTrainingCalanderStatusCounts();
	        formsList.add(buildForm("5th Form", "6",
	                "PH-QAD01/F-006 TRAINING CALENDAR",
	                new ArrayList<>(Arrays.asList("ROLE_DESIGNEE",Arrays.asList("ROLE_MR", "QA_MANAGER"))),
	                countList));
	    }
	    
	    // FORM 6
	    
	    if ( userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("EXTERNAL_TRAINER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_MR")
	    		|| userRole.equalsIgnoreCase("HR_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = managementofincidencerepository.getTrainingRecordStatusCounts();
	        formsList.add(buildForm("6th Form", "6",
	                "PH-QAD01/F-007 TRAINING RECORD",
	                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE","EXTERNAL_TRAINER","QA_MANAGER","ROLE_MR","HR_EXECUTIVE"))),
	                countList));
	    }
	    
	    
	    // FORM 7
	    
	    if ( userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = managementofincidencerepository.getTrainingCardStatusCounts();
	        formsList.add(buildForm("7th Form", "6",
	                "PH-QAD01/F-008 TRAINING CARD",
	                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    
	    // FORM 8
	    
	    if ( userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_MR")
	    		|| userRole.equalsIgnoreCase("HR_EXECUTIVE")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = managementofincidencerepository.getTrainingQuessionnaireStatusCounts();
	        formsList.add(buildForm("8th Form", "6",
	                "PH-QAD01/F-009 TRAINING QUESSIONNAIRE",
	                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE","QA_MANAGER","ROLE_MR","HR_EXECUTIVE"))),
	                countList));
	    }
	    
	    
		    // FORM 9
		    
		    if ( userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getInternalAuditScheduleStatusCounts();
		        formsList.add(buildForm("9th Form", "6",
		                "PH-QAD01/F-010 INTERNAL AUDIT SCHEDULE",
		                new ArrayList<>(Arrays.asList(Arrays.asList("QA_MANAGER","ROLE_MR"))),
		                countList));
		    
	    }
		    
		    // FORM 10
		    
		    if ( userRole.equalsIgnoreCase("ROLE_HOD")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getInternalAuditReportStatusCounts();
		        formsList.add(buildForm("10th Form", "6",
		                "PH-QAD01/F-012 INTERNAL AUDIT REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_HOD","ROLE_HOD",Arrays.asList("ROLE_MR","QA_MANAGER"))),
		                countList));
		    
	    }
		    
		    
		    // FORM 11
		    
		    if ( userRole.equalsIgnoreCase("ROLE_HOD")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getInternalAuditNcReportStatusCounts();
		        formsList.add(buildForm("11th Form", "6",
		                "PH-QAD01/F-013 INTERNAL AUDIT NC REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_HOD","ROLE_HOD","ROLE_HOD",Arrays.asList("ROLE_MR","QA_MANAGER"))),
		                countList));
		    
	    }
		    
		    // FORM 12
		    
		    if ( userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getAnnualPlanStatusCounts();
		        formsList.add(buildForm("12th Form", "6",
		                "PH-QAD01/F-015 ANNUAL PLAN",
		                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_MR","QA_MANAGER"))),
		                countList));
		    
	        }
		    
		    
		    // FORM 13
		    
		    if ( userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getAgendaForManagementReviewMeetingStatusCounts();
		        formsList.add(buildForm("13th Form", "6",
		                "PH-QAD01/F-016 AGENDA FOR MANAGEMENT REVIEW MEETING",
		                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_MR","QA_MANAGER"))),
		                countList));
		    
	        }
		    
		    // FORM 14
		    
		    if ( userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getMinutesOfMrmStatusCounts();
		        formsList.add(buildForm("14th Form", "6",
		                "PH-QAD01/F-017 MINUTES OF MRM",
		                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_MR","QA_MANAGER"))),
		                countList));
		    
	        }
		    
		    // FORM 15
		    
		    if ( userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("ROLE_HOD")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getCustomerComplaintRegisterFormStatusCounts();
		        formsList.add(buildForm("15th Form", "6",
		                "PH-QAD01/F-018 CUSTOMER COMPLAINT REGISTER FORM",
		                new ArrayList<>(Arrays.asList(Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"),"ROLE_HOD", Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
	        }
		    
		    // FORM 16
		    
		    if ( userRole.equalsIgnoreCase("ROLE_CHEMIST")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("ROLE_HOD")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getNonConfirmityReportForMachineStatusCounts();
		        formsList.add(buildForm("16th Form", "6",
		                "PH-QAD01/F-020 NON CONFORMITY REPORT (FOR MACHINE PROCESS/ WIP/ FINISHED PRODUCTS)",
		                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_CHEMIST","ROLE_QA"),"ROLE_SUPERVISOR",Arrays.asList("ROLE_CHEMIST","ROLE_QA"),"ROLE_SUPERVISOR","ROLE_HOD",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
	        }
		    
		    // FORM 17
		    
		    if ( userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getSupplierAuditPlanStatusCounts();
		        formsList.add(buildForm("17th Form", "6",
		                "PH-QAD01/F-022 SUPPLIER'S AUDIT PLAN",
		                new ArrayList<>(Arrays.asList("ROLE_DESIGNEE",Arrays.asList("QA_MANAGER","ROLE_MR"))),
		                countList));
	        }
		    
		    // FORM 18
		    
		    if ( userRole.equalsIgnoreCase("ROLE_HOD")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("QA_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getSupplierAuditReportStatusCounts();
		        formsList.add(buildForm("18th Form", "6",
		                "PH-QAD01/F023 SUPPLIER AUDIT REPORT",
		                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_HOD","QA_MANAGER","ROLE_MR","QA_DESIGNEE"),"ROLE_HOD")),
		                countList));
	        }
		    
		    
		    // FORM 19
		    
		    // PH-QAD01/F-25  SUMMARY OF TRACEABILITY"
		    
		    
		    // FORM 20
		    
		    if ( userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getTemplateForRecallMockRecallStatusCounts();
		        formsList.add(buildForm("20th Form", "6",
		                "PH-QAD01/F-026 TEMPLATE FOR RECALL / MOCK RECALL",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE","ROLE_MR"))),
		                countList));
	        }
		    
		// FORM 21
		    
	    if ( userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("ROLE_PLANT_HEAD")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = managementofincidencerepository.getMinutesOfMeetingMockRecallStatusCounts();
	        formsList.add(buildForm("21st Form", "6",
	                "PH-QAD01/F-027 MINUTES OF MEETING - MOCK RECALL",
	                new ArrayList<>(Arrays.asList(Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"),"ROLE_PLANT_HEAD")),
	                countList));
        }
	    
		// FORM 22
	    
	    if (userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_MR")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
	    	
	        List<Object[]> countList = managementofincidencerepository.getAnnualProductReviewStatusCounts();
	        formsList.add(buildForm("22nd Form", "6",
	                "PH-QAD01/F-028 ANNUAL PRODUCT REVIEW",
	                new ArrayList<>(Arrays.asList("ROLE_DESIGNEE",Arrays.asList("QA_MANAGER","ROLE_MR"))),
	                countList));
	    }
	    
	    
			// FORM 23
		    
		    if (userRole.equalsIgnoreCase("MARKET_REPRESENTATIVE")
		    		|| userRole.equalsIgnoreCase("QC_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getNewSampleRequestStatusCounts();
		        formsList.add(buildForm("23rd Form", "6",
		                "PH-QCL01-F-029 NEW SAMPLE REQUEST",
		                new ArrayList<>(Arrays.asList("MARKET_REPRESENTATIVE","QC_MANAGER")),
		                countList));
		    }
		    
			// FORM 24
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getInwardCartonInspectionReportStatusCounts();
		        formsList.add(buildForm("24th Form", "6",
		                "PH-QAD01/F-029 INWARD(CARTON) INSPECTION REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
			// FORM 25
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getInwardFilmInspectionReportStatusCounts();
		        formsList.add(buildForm("25th Form", "6",
		                "PH-QAD01/F-030 INWARD (FILM) INSPECTION REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
			// FORM 26
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getInwardZipLockInspectionReportStatusCounts();
		        formsList.add(buildForm("26th Form", "6",
		                "PH-QAD01/F-031 INWARD (ZIPLOCK) INSPECTION REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
			// FORM 27
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getInwardStickInspectionStatusCounts();
		        formsList.add(buildForm("27th Form", "6",
		                "PH-QAD01/F-032 INWARD (STICK) INSPECTION",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
			// FORM 28
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getInwardInspectionJarStatusCounts();
		        formsList.add(buildForm("28th Form", "6",
		                "PH-QAD01/F-033 INWARD INSPECTION JAR",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    
		    // FORM 29 PH-QAD01/F-034 INPROCESS INSPECTION REPORT(FOR PADS  PLEATS  ROLLS)

		    
		    // FORM 30 PH-QAD01/F-035 ONLINE INSPECTION FOR BALLS
		    
		    
		    // FORM 31 PH-QAD01/F-036 INPROCESS INSPECTION REPORT  BUDS
		    
		    
		    // FORM 32
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getFinalInspectionF037StatusCounts();
		        formsList.add(buildForm("32nd Form", "6",
		                "PH-QAD01/F-037 FINAL INSPECTION REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    // FORM 33
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getFinalInspectionF038StatusCounts();
		        formsList.add(buildForm("33rd Form", "6",
		                "PH-QAD01/F-038 FINAL INSPECTION REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    // FORM 34
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR")
		    		|| userRole.equalsIgnoreCase("SECURITY")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getContainerInspectionReportStatusCounts();
		        formsList.add(buildForm("34th Form", "6",
		                "PH-QAD01/F-039 CONTAINER INSPECTION REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_QA","DISPATCH_SUPERVISOR","SECURITY",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    // FORM 35
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") ) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getProductionRetainedSampleRegisterStatusCounts();
		        formsList.add(buildForm("35th Form", "6",
		                "PH-QAD01/F-040 PRODUCTION RETAINED SAMPLE REGISTER",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    // FORM 36
		    
		    if ( userRole.equalsIgnoreCase("ROLE_HOD")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getChangeControlFormStatusCounts();
		        formsList.add(buildForm("36th Form", "6",
		                "PH-QAD01/F-041 CHANGE CONTROL FORM",
		                new ArrayList<>(Arrays.asList("ROLE_HOD",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    
		    // FORM 37 
		    
		    if ( userRole.equalsIgnoreCase("ROLE_HOD")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getChangeControlLogBookFormStatusCounts();
		        formsList.add(buildForm("37th Form", "6",
		                "PH-QAD01/F-042 CHANGE CONTROL LOG BOOK",
		                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_HOD","ROLE_DESIGNEE"),Arrays.asList("ROLE_MR","QA_MANAGER"))),
		                countList));
		    }
		    
		    
		    // FORM 38
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")) {
		    	
		        List<Object[]> countList = managementofincidencerepository.getQualityReviewMeetingStatusCounts();
		        formsList.add(buildForm("38th Form", "6",
		                "PH-QAD01/F-043 QUALITY REVIEW MEETING",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE","ROLE_MR"))),
		                countList));
		    }
		    
		    // FORM 39
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE") 
		    	    || userRole.equalsIgnoreCase("QA_MANAGER")
		    	    || userRole.equalsIgnoreCase("ROLE_MR")){
		    	
		        List<Object[]> countList = managementofincidencerepository.getCorrectiveActionReportStatusCounts();
		        formsList.add(buildForm("39th Form", "6",
		                "PH-QAD01/F-044 CORRECTIVE ACTION REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_QA","ROLE_DESIGNEE",Arrays.asList("QA_MANAGER","ROLE_MR"))),
		                countList));
		    }
		    
		    
		    // FORM 40
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR") ){
		    	
		        List<Object[]> countList = managementofincidencerepository.getBmrIssueRegisterStatusCounts();
		        formsList.add(buildForm("40th Form", "6",
		                "PH-QAD01/F-045 BMR - ISSUE REGISTER",
		                new ArrayList<>(Arrays.asList("ROLE_QA","ROLE_SUPERVISOR")),
		                countList));
		    }
		    
		    
		    // FORM 41
		    
		    
		    if ( userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")){
		    	
		        List<Object[]> countList = managementofincidencerepository.getBatchReleaseNoteStatusCounts();
		        formsList.add(buildForm("41st Form", "6",
		                "PH-QAD01/F-046 BATCH RELEASE NOTE",
		                new ArrayList<>(Arrays.asList(Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    
		    // FORM 42
		    
		    if ( userRole.equalsIgnoreCase("ROLE_CHEMIST")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("ROLE_QA")){
		    	
		        List<Object[]> countList = managementofincidencerepository.getBatchReleaseCheckListStatusCounts();
		        formsList.add(buildForm("42nd Form", "6",
		                "PH-QAD01/F-047 BATCH RELEASE CHECKLIST",
		                new ArrayList<>(Arrays.asList("ROLE_QA","ROLE_CHEMIST",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    
		    // FORM 43
		    
//		    if ( userRole.equalsIgnoreCase("ROLE_CHEMIST")
//		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
//		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
//		    		|| userRole.equalsIgnoreCase("ROLE_QA")){
//		    	
//		        List<Object[]> countList = managementofincidencerepository.getDeviationFormStatusCounts();
//		        formsList.add(buildForm("43rd Form", "6",
//		                "PH-QAD01/F-048 DEVIATION FORM",
//		                new ArrayList<>(Arrays.asList("ROLE_QA","ROLE_CHEMIST",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
//		                countList));
//		    }
		    
		    
		  
		    // FORM 44
		    
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("ROLE_MR")){
		    	
		        List<Object[]> countList = managementofincidencerepository.getProductionDispositionLogbookStatusCounts();
		        formsList.add(buildForm("44th Form", "6",
		                "PH-QAD01/F-049 PRODUCTION DISPOSITION LOGBOOK",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE","ROLE_MR"))),
		                countList));
		    }
		    
		    
		    // FORM 45
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")){
		    	
		        List<Object[]> countList = managementofincidencerepository.getListOfGlassHardPlasticStatusCounts();
		        formsList.add(buildForm("45th Form", "6",
		                "PH-QAD01/F-050 LIST OF GLASS /HARD PLASTIC / WOOD / CERAMIC",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    
		    // FORM 46
		    
		    
		    if ( userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
		    		|| userRole.equalsIgnoreCase("ROLE_HOD")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("ROLE_QA") ){
		    	
		        List<Object[]> countList = managementofincidencerepository.getControlOfGlassHardPlasticStatusCounts();
		        formsList.add(buildForm("46th Form", "6",
		                "PH-QAD01/F-051 CONTROL OF GLASS/HARD PLASTIC/WOOD/CERAMIC",
		                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    
		    // FORM 47
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    		|| userRole.equalsIgnoreCase("ROLE_HOD")
		    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		|| userRole.equalsIgnoreCase("QA_MANAGER")){
		    	
		        List<Object[]> countList = managementofincidencerepository.getBrakageReportStatusCounts();
		        formsList.add(buildForm("47th Form", "6",
		                "PH-QAD01/F-052 BREAKAGE REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("ROLE_HOD","ROLE_DESIGNEE"),Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    // FORM 48
		    
		    if ( userRole.equalsIgnoreCase("ROLE_OPERATOR")
		    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
		    		|| userRole.equalsIgnoreCase("ROLE_QA") ){
		    	
		        List<Object[]> countList = managementofincidencerepository.getMetalDetectorCalibrationRecordStatusCounts();
		        formsList.add(buildForm("48th Form", "6",
		                "PH-QAD01/F-058 METAL DETECTOR CALIBRATION RECORD",
		                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_SUPERVISOR","ROLE_QA")),
		                countList));
		    }
		    
		    
		    // FORM 49
		    
		    if ( 1 == 1){
		    	
		        List<Object[]> countList = managementofincidencerepository.getMetalDetectorCalibrationRecordStatusCounts();
		        formsList.add(buildForm("49th Form", "6",
		                "PH-QAD01/F-059 METAL DETECTOR PASS REPORT",
		                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_SUPERVISOR","ROLE_QA")),
		                countList));
		    }
		    
		    
		    // FORM 50
		    
		    if ( userRole.equalsIgnoreCase("ROLE_QA")
		    	|| userRole.equalsIgnoreCase("ROLE_MR")
		    	|| userRole.equalsIgnoreCase("QA_MANAGER")
		    	|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")) {
		    	
		    	
		        List<Object[]> countList = managementofincidencerepository.getMasterListOfSharpToolsStatusCounts();
		        formsList.add(buildForm("50th Form", "6",
		                "PH-QAD01/F-060 MASTER LIST OF SHARP TOOLS",
		                new ArrayList<>(Arrays.asList("ROLE_QA",Arrays.asList("ROLE_MR","QA_MANAGER","ROLE_DESIGNEE"))),
		                countList));
		    }
		    
		    
		    // FORM 51
		    
		    if ( userRole.equalsIgnoreCase("ROLE_HOD")
		    		||userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		||userRole.equalsIgnoreCase("ROLE_QA")) {
			    	
			        List<Object[]> countList = managementofincidencerepository.getTrainingSessionAllotmentRegisterStatusCounts();
			        formsList.add(buildForm("51st Form", "6",
			                "PH-QAD01/F-076 TRAINING SESSION ALLOTMENT REGISTER",
			                new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_HOD","ROLE_DESIGNEE"))),
			                countList));
			    }
		    
		    // FORM 52
		    
		    if ( userRole.equalsIgnoreCase("ROLE_PCI_TRAINED_PERSON")
		    		||userRole.equalsIgnoreCase("QA_MANAGER")
		    		||userRole.equalsIgnoreCase("ROLE_DESIGNEE")
		    		||userRole.equalsIgnoreCase("ROLE_QA")) {
			    	
			        List<Object[]> countList = managementofincidencerepository.getRodentBoxCheckListStatusCounts();
			        formsList.add(buildForm("52nd Form", "6",
			                "PH-HRD01/F-013 RODENT BOX CHECK LIST",
			                new ArrayList<>(Arrays.asList("ROLE_PCI_TRAINED_PERSON",Arrays.asList("QA_MANAGER","ROLE_DESIGNEE"))),
			                countList));
			    }
		    
		    // FORM 53
		    
		    if ( userRole.equalsIgnoreCase("ROLE_PCI_TRAINED_PERSON")
		    		||userRole.equalsIgnoreCase("QA_MANAGER")
		    		||userRole.equalsIgnoreCase("ROLE_QA")) {
			    	
			        List<Object[]> countList = managementofincidencerepository.getPestControlF014StatusCounts();
			        formsList.add(buildForm("53rd Form", "6",
			                "PH-HRD01/F-014 PEST CONTROL SERVICE REPORT - IMM (INTEGRATED MOSQUITO MANAGEMENT) SERVICE FOR MOSQUITOES",
			                new ArrayList<>(Arrays.asList("ROLE_PCI_TRAINED_PERSON","QA_MANAGER")),
			                countList));
			    }
		    
		    // FORM 54
		    
		    if ( userRole.equalsIgnoreCase("ROLE_PCI_TRAINED_PERSON")
		    		||userRole.equalsIgnoreCase("QA_MANAGER")
		    		||userRole.equalsIgnoreCase("ROLE_QA")) {
			    	
			        List<Object[]> countList = managementofincidencerepository.getPestControlF015StatusCounts();
			        formsList.add(buildForm("54th Form", "6",
			                "PH-HRD01/F-015  PEST CONTROL SERVICE REPORT 1 -INTEGRATED FLYING INSECT MANAGEMENT FOR HOUSE FLIES, DRAIN FLIES, FLESH FLIES",
			                new ArrayList<>(Arrays.asList("ROLE_PCI_TRAINED_PERSON","QA_MANAGER")),
			                countList));
			    }
		    
		    // FORM 55
		    
		    if ( userRole.equalsIgnoreCase("ROLE_PCI_TRAINED_PERSON")
		    		||userRole.equalsIgnoreCase("QA_MANAGER")
		    		||userRole.equalsIgnoreCase("ROLE_QA")) {
			    	
			        List<Object[]> countList = managementofincidencerepository.getPestControlF016StatusCounts();
			        formsList.add(buildForm("55th Form", "6",
			                "PH-HRD01/F-016 PEST CONTROL SERVICE REPORT 2 -INTEGRATED LIZARD MANAGEMENT (ILM) SERVICE FOR HOUSE LIZARDS",
			                new ArrayList<>(Arrays.asList("ROLE_PCI_TRAINED_PERSON","QA_MANAGER")),
			                countList));
			    }
		    
		    // FORM 56
		    
		    
		    if ( userRole.equalsIgnoreCase("ROLE_PCI_TRAINED_PERSON")
		    		||userRole.equalsIgnoreCase("QA_MANAGER")
		    		||userRole.equalsIgnoreCase("ROLE_QA")) {
			    	
			        List<Object[]> countList = managementofincidencerepository.getPestControlF017StatusCounts();
			        formsList.add(buildForm("56th Form", "6",
			                "PH-HRD01/F-017 PEST CONTROL SERVICE REPORT 3 -INTEGRATED SPIDER MANAGEMENT SERVICE FOR SPIDER & CRAWLING INSECTS",
			                new ArrayList<>(Arrays.asList("ROLE_PCI_TRAINED_PERSON","QA_MANAGER")),
			                countList));
			    }
		    
		    // FORM 57
		    
		    if ( userRole.equalsIgnoreCase("ROLE_PCI_TRAINED_PERSON")
		    		||userRole.equalsIgnoreCase("QA_MANAGER")
		    		||userRole.equalsIgnoreCase("ROLE_QA")) {
			    	
			        List<Object[]> countList = managementofincidencerepository.getPestControlF018StatusCounts();
			        formsList.add(buildForm("57th Form", "6",
			                "PH-HRD01/F-018 PEST CONTROL SERVICE REPORT 4 -IPM (THERMAL FOGGING) FOR MOSQUITOES",
			                new ArrayList<>(Arrays.asList("ROLE_PCI_TRAINED_PERSON","QA_MANAGER")),
			                countList));
			    }
		    
		    // FORM 58
		    
		    if ( userRole.equalsIgnoreCase("ROLE_PCI_TRAINED_PERSON")
		    		||userRole.equalsIgnoreCase("QA_MANAGER")
		    		||userRole.equalsIgnoreCase("ROLE_QA")) {
			    	
			        List<Object[]> countList = managementofincidencerepository.getPestControlF019StatusCounts();
			        formsList.add(buildForm("58th Form", "6",
			                "PH-HRD01/F-019 PEST CONTROL SERVICE REPORT 5 -PRO-GUARD SERVICE FOR CRAWLING INSECTS",
			                new ArrayList<>(Arrays.asList("ROLE_PCI_TRAINED_PERSON","QA_MANAGER")),
			                countList));
			    }
	    
	    return formsList;
	}
	
	
											//  PPC
	
	
	@Autowired
	private ContractReviewMeetingRepositoryF003 contractReviewMeetingRepositoryF003;
	
	
	private List<DashboardFormDTO> getPpcForms(String userRole) {
	    List<DashboardFormDTO> formsList = new ArrayList<>();
		
		
	    
		// FORM 1 
	    
	    if (userRole.equalsIgnoreCase("PPC_ASSISTANT")
	            || userRole.equalsIgnoreCase("PPC_INCHARGE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = contractReviewMeetingRepositoryF003.getMonthlyPlanSummaryStatusCounts();
	        formsList.add(buildForm("1St Form", "7",
	                "PH-PPC01/F-002 MONTHLY PLAN SUMMARY DETAILS",
	                new ArrayList<>(Arrays.asList("PPC_ASSISTANT","PPC_INCHARGE")),
	                countList));
	    }
	    
	    // FORM 2
	    
	    if (userRole.equalsIgnoreCase("MARKET_REPRESENTATIVE")
	            || userRole.equalsIgnoreCase("PPC_ASSISTANT")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = contractReviewMeetingRepositoryF003.getContractReviewMeetingStatusCounts();
	        formsList.add(buildForm("2nd Form", "7",
	                "PH-PPC01/F-003 CONTRACT REVIEW MEETING",
	                new ArrayList<>(Arrays.asList("MARKET_REPRESENTATIVE","PPC_ASSISTANT")),
	                countList));
	    }
	    
	    // FORM 3
	    
	    if (userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = contractReviewMeetingRepositoryF003.getPreProductionMeetingStatusCounts();
	        formsList.add(buildForm("3rd Form", "7",
	                "PH-PPC01/F-004 PRE-PRODUCTION MEETING",
	                new ArrayList<>(Arrays.asList("ROLE_QA")),
	                countList));
	    }
		
		
			    return formsList;
	}
	
	// STORE
	
	
	 @Autowired
	 private MaterialInwardRegisterRepo materialInwardRepo ;
	
	private List<DashboardFormDTO> getStoreForms(String userRole) {
	    List<DashboardFormDTO> formsList = new ArrayList<>();
		
		// FORM 1 
	    
	    if (userRole.equalsIgnoreCase("STORE_INCHARGE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = materialInwardRepo.getMonthlyPlanSummaryStatusCounts();
	        formsList.add(buildForm("1St Form", "8",
	                "PH-STR01F-001 MATERIAL INWARD REGISTER",
	                new ArrayList<>(Arrays.asList("STORE_INCHARGE")),
	                countList));
	    }
	    
		// FORM 2
	    
	    if (userRole.equalsIgnoreCase("STORE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("STORE_INCHARGE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = materialInwardRepo.getReceptionCheckListStatusCounts();
	        formsList.add(buildForm("2nd Form", "8",
	                "PH-STR01F-003 RECEPTION CHECK LIST",
	                new ArrayList<>(Arrays.asList("STORE_OPERATOR","STORE_INCHARGE")),
	                countList));
	    }
	    
	    
		// FORM 3
	    
	    if (userRole.equalsIgnoreCase("STORE_INCHARGE")
	    		|| userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = materialInwardRepo.getNonReturnableGatePassStatusCounts();
	        formsList.add(buildForm("3rd Form", "8",
	                "PH-STR01F-006 NON RETURNABLE GATE PASS",
	                new ArrayList<>(Arrays.asList(Arrays.asList("STORE_INCHARGE","DISPATCH_SUPERVISOR"),"ROLE_HOD")),
	                countList));
	    }
	    
	    
	    // FORM 4
	    
	    if (userRole.equalsIgnoreCase("STORE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("STORE_INCHARGE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = materialInwardRepo.getEyeWashWithShowerStatusCounts();
	        formsList.add(buildForm("4th Form", "8",
	                "PH-STR01F-009 EYE WASH WITH SHOWER",
	                new ArrayList<>(Arrays.asList("STORE_OPERATOR","STORE_INCHARGE")),
	                countList));
	    }
		
		
			    return formsList;
	}
	
	
	// DISPATCH
	
	@Autowired
	private FinishedGoodsStockRegisterRepo finishedGoodsStockRepo;
	
	private List<DashboardFormDTO> getDispatchForms(String userRole) {
	    List<DashboardFormDTO> formsList = new ArrayList<>();
		
		// FORM 1 
	    
	    if (userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = finishedGoodsStockRepo.getFinishedGoodsStockRegisterStatusCounts();
	        formsList.add(buildForm("1St Form", "9",
	                "PH-DIS01/F-001  FINISHED GOODS STOCK REGISTER",
	                new ArrayList<>(Arrays.asList("DISPATCH_SUPERVISOR")),
	                countList));
	    }
	    
		// FORM 2
	    
	    if (userRole.equalsIgnoreCase("DISPATCH_OPEARTOR")
	    		|| userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = finishedGoodsStockRepo.getForkLiftMovementCheckListStatusCounts();
	        formsList.add(buildForm("2nd Form", "9",
	                "PH-STR01F-008 FORK LIFT MOVEMENT CHECKLIST",
	                new ArrayList<>(Arrays.asList("DISPATCH_OPEARTOR","DISPATCH_SUPERVISOR")),
	                countList));
	    }
	    
		// FORM 3
	    
	    if (userRole.equalsIgnoreCase("STORE_INCHARGE")
	    		|| userRole.equalsIgnoreCase("DISPATCH_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = materialInwardRepo.getNonReturnableGatePassStatusCounts();
	        formsList.add(buildForm("3rd Form", "8",
	                "PH-STR01F-006 NON RETURNABLE GATE PASS",
	                new ArrayList<>(Arrays.asList(Arrays.asList("STORE_INCHARGE","DISPATCH_SUPERVISOR"),"ROLE_HOD")),
	                countList));
	    }
	    
		
	    return formsList;
}
	
	// PRODUCT DEVELOPMENT
	
	@Autowired
	private ProductDevelopmentSheetRepoF001 productDevelopmentRepo;
	
	
	private List<DashboardFormDTO> getDevelopmentForms(String userRole) {
		
	    List<DashboardFormDTO> formsList = new ArrayList<>();
		
		// FORM 1 
	    
	    if (userRole.equalsIgnoreCase("DEVELOPMENT_MANAGER")
	    		|| userRole.equalsIgnoreCase("QC_MANAGER")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = productDevelopmentRepo.getProductDevelopmentSheetStatusCounts();
	        formsList.add(buildForm("1St Form", "10",
	                "PH-DVP01/F-001  PRODUCT DEVELOPMENT SHEET",
	                new ArrayList<>(Arrays.asList("DEVELOPMENT_MANAGER","QC_MANAGER","QA_MANAGER","PPC_HOD","BLEACHING_HOD","SPUNLACE_HOD","PADPUNCHING_HOD","DRYGOODS_HOD")),
	                countList));
	    }
	    

	    return formsList;
}
	
	
	// ENGINEERING
	
	
	@Autowired 
	private BreakdownIntimationSlipRepoF003 breakdownSlipRepo;
	
	private List<DashboardFormDTO> getEngineeringForms(String userRole) {

		List<DashboardFormDTO> formsList = new ArrayList<>();

		// FORM 1

		if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR") || userRole.equalsIgnoreCase("ROLE_ENGINEER")
				|| userRole.equalsIgnoreCase("ROLE_MECHANICAL") || userRole.equalsIgnoreCase("ROLE_ELECTRICAL")
				|| userRole.equalsIgnoreCase("ROLE_QA")) {

			List<Object[]> countList = breakdownSlipRepo.getBrakDownIntimationSlipStatusCounts();
			formsList.add(buildForm("1St Form", "11", "PH-ENG01/FC-003  BREAKDOWN INTIMATION SLIP",
					new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR",
							Arrays.asList("ROLE_ENGINEER", "ROLE_MECHANICAL", "ROLE_ELECTRICAL"),
							Arrays.asList("ROLE_ENGINEER", "ROLE_MECHANICAL", "ROLE_ELECTRICAL"), "ROLE_SUPERVISOR")),
					countList));
		}
		
		// FORM 2
		
		if (userRole.equalsIgnoreCase("ROLE_ENGINEER")
				|| userRole.equalsIgnoreCase("ROLE_MECHANICAL") 
				|| userRole.equalsIgnoreCase("ROLE_ELECTRICAL")
				|| userRole.equalsIgnoreCase("ROLE_HOD")
				|| userRole.equalsIgnoreCase("ROLE_QA")) {

			List<Object[]> countList = breakdownSlipRepo.getRootCauseAnalysisStatusCounts();
			formsList.add(buildForm("2nd Form", "11", "PH-ENG01/FC-004  ROOT CAUSE ANALYSIS",
					new ArrayList<>(Arrays.asList(Arrays.asList("ROLE_ENGINEER", "ROLE_MECHANICAL", "ROLE_ELECTRICAL"),"ROLE_HOD")),
					countList));
		}
		
		// FORM 3
		
		if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
				|| userRole.equalsIgnoreCase("ROLE_HOD")
				|| userRole.equalsIgnoreCase("ROLE_QA")) {

			List<Object[]> countList = breakdownSlipRepo.getWeighingScaleCalibrationRecordStatusCounts();
			formsList.add(buildForm("3rd Form", "11", "PH-ENG01/FC-016 WEIGHING SCALES CALIBRATION RECORD",
					new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR", "ROLE_HOD")),
					countList));
		}
		
		// FORM 4
		
		if (userRole.equalsIgnoreCase("ROLE_HOD")
				|| userRole.equalsIgnoreCase("ROLE_ENGINEER")
				|| userRole.equalsIgnoreCase("ROLE_MECHANICAL")
				|| userRole.equalsIgnoreCase("ROLE_ELECTRICAL")
				|| userRole.equalsIgnoreCase("ROLE_CIVIL")
				|| userRole.equalsIgnoreCase("ROLE_QA")) {

			List<Object[]> countList = breakdownSlipRepo.getWorkOrderRequestStatusCounts();
			formsList.add(buildForm("4th Form", "11", "PH-ENG01/FC-020  WORK ORDER REQUEST FORM",
					new ArrayList<>(Arrays.asList("ROLE_HOD",Arrays.asList("ROLE_ENGINEER", "ROLE_MECHANICAL", "ROLE_ELECTRICAL","ROLE_CIVIL"),"ROLE_HOD")),
					countList));
		}

		return formsList;
	}
	
	// COTTON BUDS
	
	@Autowired
	private BudsEquipmentUsuageHeaderRepository equipmentHeaderRepository;
	
	private List<DashboardFormDTO> getCottonBudsForms(String userRole) {
		
	    List<DashboardFormDTO> formsList = new ArrayList<>();
		
		// FORM 1 
	    
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = equipmentHeaderRepository.getEquipmentUsageLogBookStatusCounts();
	        formsList.add(buildForm("1St Form", "12",
	                "PH-PRD06/F-001 EQUIPMENT USAGE LOGBOOK - COTTON BUDS",
	                new ArrayList<>(Arrays.asList("ROLE_OPERATOR","ROLE_SUPERVISOR","ROLE_HOD")),
	                countList));
	    }
	    
	    // FORM 2
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = equipmentHeaderRepository.getLogBookCottonBudsStatusCounts();
	        formsList.add(buildForm("2nd Form", "12",
	                "PH-PRD06/F-002 LOG BOOK – COTTON BUDS",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    
	    
	    // FORM 3
	    
	    if (userRole.equalsIgnoreCase("ROLE_OPERATOR")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = equipmentHeaderRepository.getDailyProductionSliverMakingStatusCounts();
	        formsList.add(buildForm("3rd Form", "12",
	                "PH-PRD06/F-003 DAILY PRODUCTION - SLIVER MAKING FOR COTTON BUDS",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    
	    // FORM 4
	    
	    if (userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("ROLE_QA")) {

	        List<Object[]> countList = equipmentHeaderRepository.getProductChangeOverStatusCounts();
	        formsList.add(buildForm("4th Form", "12",
	                "PH-PRD04/F-004 PRODUCT CHANGE OVER - COTTON BUDS",
	                new ArrayList<>(Arrays.asList("ROLE_SUPERVISOR","ROLE_QA",Arrays.asList("ROLE_HOD", "ROLE_DESIGNEE"))),
	                countList));
	    }
	    

	    return formsList;
}
	
	
	// BMR
	
	public ResponseEntity<?> dahsboardBmr(HttpServletRequest http) {
	    SCAUtil sca = new SCAUtil();
	    String userRole = getUserRole();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);

	    Map<String, Object> response = new HashMap<>();
	    List<DashboardBmrDTO> formsList = new ArrayList<>();

	    try {
	        User user = userRepository.getDetailsByUserName(userName);

	        List<String> departmentIds = userRepository.getDepartmentByIdNew(userId);
	        if (departmentIds == null || departmentIds.isEmpty() || departmentIds.get(0) == null) {
	            departmentIds = userRepository.getDepartmentByIdNew2(userId);
	        }

	        // 🔹 Department 1 (Bleaching)
	        if (departmentIds.contains("1") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getBleachingBmrFinal(userRole));
	        }
	        
	        // 🔹 Department 2 (Spunlace)
	        
	        if (departmentIds.contains("2") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getTestSpunlaceBmrFinal(userRole));
	        }
	        
	        // 🔹 Department 3 (PadPunching)
	        if (departmentIds.contains("3") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getPadPunchingBmr(userRole));
	        }
	        
	        // 🔹 Department 4 (DryGoods)
	        if (departmentIds.contains("4") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getDryGoodsBmrUpdated(userRole));
	        }
	        
	        // 🔹 Department 12 (CottonBuds)
	        if (departmentIds.contains("12") || userRole.equalsIgnoreCase("ROLE_QA")) {
	            formsList.addAll(getCottonBudsBmr(userRole));
	        }
	        
	        response.put("forms", formsList);

	        // Optional: debug log
	        String jsonResponse = new ObjectMapper().writeValueAsString(response);
	        System.out.println(jsonResponse);

	    } catch (Exception e) {
	        logger.error("***************** Unable to get List Of Dashboard!  *********************\n" + e);
	        String msg = sca.getErrorMessage(e);
	        return new ResponseEntity<>(new ApiResponse(false, "Unable to get List Of Dashboard! " + msg),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@Autowired
	private BmrSummaryProductionDetailsRepository productionDetailsRepository;
	
	@Autowired
	private BMR_QualityReleaseRepository bMR_QualityReleaseRepository ;
	
	@Autowired
	private BMRSummaryBleachRepository summaryBleachRepository;
	
	@Autowired
	private BleachBmrCompletionTableRepository bleachBmrCompletionTableRepository;
	
	private List<DashboardBmrDTO> getBleachingBmr(String userRole) {
		
	    List<DashboardBmrDTO> formsList = new ArrayList<>();
	    
	    if ( userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")) {
	    	
	    	List<String> bmrNumber = productionDetailsRepository.getBmrNumbers();
	    	
	    	 List<String> pendingBmrList = new ArrayList<>();
	    	 
	         int pendingCount = 0;
	    	
	    	for(String bmrNo : bmrNumber)
	    	{
	    		
	    		BMR_Summary_Bleach qaRelease = summaryBleachRepository.getStatus1(bmrNo) ;
	    		
	    		boolean hasApproved = qaRelease != null && qaRelease.getQualityRelease() != null &&
	    				qaRelease.getQualityRelease().stream()
	                        .anyMatch(q -> "QA_APPROVED".equalsIgnoreCase(q.getStatus()));
	    		
	    		BleachBmrCompletionTable productRelease = bleachBmrCompletionTableRepository.getStatus(bmrNo) ;
	    		
	    		if ( !hasApproved || productRelease == null)
	    			
	    		{
	    			 pendingBmrList.add(bmrNo);
	                 pendingCount++;
	    		}
	    	}
	    	
			DashboardBmrDTO dto = new DashboardBmrDTO();
			
			dto.setDepartmentName("Bleaching");
			dto.setDepartmentId("1");
			dto.setFormName("PRD01/F-43 Batch Manufacturing Record");
			dto.setPendingBmrNos(pendingBmrList);
			dto.setPendingCount(pendingCount);
			
			formsList.add(dto);

	    }
	    
	
    return formsList;
}
	
	
	private List<DashboardBmrDTO> getBleachingBmrFinal(String userRole) {

	    List<DashboardBmrDTO> formsList = new ArrayList<>();

	    if (userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_QA")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("QA_MANAGER")) {

	        // Step 1: Get all BMR numbers
	        List<String> allBmrNos = productionDetailsRepository.getBleachingBmrNumbers();

	        if (allBmrNos == null || allBmrNos.isEmpty()) {
	            return formsList;
	        }
	        
	        // Step 2: Production approved
	        List<String> prodApprovedBmrNos = productionDetailsRepository
	                .getApprovedBmr(allBmrNos);

	        // Step 3: QA approved
	        List<String> qaApprovedBmrNos = summaryBleachRepository
	                .getAllQualityReleaseStatus(allBmrNos);

	        // Step 4: Product Release approved
	        List<String> productApprovedBmrNos = bleachBmrCompletionTableRepository
	                .getAllProdReleaseStatus(allBmrNos);


	        // Convert to sets
	        Set<String> prodSet = new HashSet<>(prodApprovedBmrNos);
	        Set<String> qaSet = new HashSet<>(qaApprovedBmrNos);
	        Set<String> productSet = new HashSet<>(productApprovedBmrNos);
	        

	        // Step 5: Find pending BMRs
	        List<String> pendingBmrList = allBmrNos.stream()
	                .filter(bmrNo ->!prodSet.contains(bmrNo) || !qaSet.contains(bmrNo) 
	                		||!productSet.contains(bmrNo) )
	                .collect(Collectors.toList());

	        // Step 6: DTO
	        DashboardBmrDTO dto = new DashboardBmrDTO();
	        dto.setDepartmentName("Bleaching");
	        dto.setDepartmentId("1");
	        dto.setFormName("PRD01/F-43 Batch Manufacturing Record");
	        dto.setPendingBmrNos(pendingBmrList);
	        dto.setPendingCount(pendingBmrList.size());

	        formsList.add(dto);
	    }

	    return formsList;
	}


	
	// FINAL SPUNLACE
	
	private List<DashboardBmrDTO> getTestSpunlaceBmrFinal(String userRole) {

	    List<DashboardBmrDTO> formsList = new ArrayList<>();

	    if (userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_QA")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("QA_MANAGER")) {

	        // Step 1: Get all BMR numbers for Spunlace Form 1 Test
	        List<String> allBmrNos = bmr_01_productiondetailsrepository.getBmrNumbersForSpunlace();

	        if (allBmrNos == null || allBmrNos.isEmpty()) {
	            return formsList; // No data to process
	        }
	        
	        
//	        // Step 2: Production approved
	        List<String> prodApprovedBmrNos = bmr_01_productiondetailsrepository
	                .getApprovedBmrF26(allBmrNos);

	        // Step 2: Fetch approved QA BMR numbers (bulk query)
	        List<String> approvedQaBmrNos = bmr13qareleaserepository
	                .getApprovedQaBmrNosForSpunlace(allBmrNos);

	        // Step 3: Fetch approved Product BMR numbers (bulk query)
	        List<String> approvedProductBmrNos = bmr14productreleaserepository
	                .getApprovedProductBmrNosForSpunlace(allBmrNos);

	        // Step 4: Compare using Sets for fast lookup
	        Set<String> prodSet = new HashSet<>(prodApprovedBmrNos);
	        Set<String> qaSet = new HashSet<>(approvedQaBmrNos);
	        Set<String> productSet = new HashSet<>(approvedProductBmrNos);

	        List<String> pendingBmrList = allBmrNos.stream()
	                .filter(bmrNo -> !qaSet.contains(bmrNo) || !productSet.contains(bmrNo) || !prodSet.contains(bmrNo))
	                .collect(Collectors.toList());

	        DashboardBmrDTO dto = new DashboardBmrDTO();
	        dto.setDepartmentName("Spunlace");
	        dto.setDepartmentId("2");
	        dto.setFormName("PRD02/F-26 Batch Manufacturing Record");
	        dto.setPendingBmrNos(pendingBmrList);
	        dto.setPendingCount(pendingBmrList.size());

	        formsList.add(dto);
			
			
			// RP BALE BMR
			
			// Step 1: Get all BMR numbers for Spunlace Form 1 Test
	        List<String> rpAllBmrNos = bmr_01_productiondetailsrepository.getBmrNumbersForSpunlaceRpBale();

	        if (rpAllBmrNos == null || rpAllBmrNos.isEmpty()) {
	            return formsList; // No data to process
	        }
	        
	        // Step 2: Production approved
	        List<String> prodApprovedRpBmrNos = bmr_01_productiondetailsrepository
	                .getApprovedBmrF27(rpAllBmrNos);

	        // Step 2: Fetch approved QA BMR numbers (bulk query)
	        List<String> approvedQaRpBmrNos = bmr13qareleaserepository
	                .getApprovedQaBmrNosForSpunlaceRpBale(rpAllBmrNos);

	        // Step 3: Fetch approved Product BMR numbers (bulk query)
	        List<String> approvedProductRpBmrNos = bmr14productreleaserepository
	                .getApprovedProductBmrNosForSpunlaceRpBale(rpAllBmrNos);

	        // Step 4: Compare using Sets for fast lookup
	        Set<String> prodRpSet = new HashSet<>(prodApprovedRpBmrNos);
	        Set<String> qaRpSet = new HashSet<>(approvedQaRpBmrNos);
	        Set<String> productRpSet = new HashSet<>(approvedProductRpBmrNos);

	        List<String> pendingRpBmrList = rpAllBmrNos.stream()
	                .filter(bmrNo -> !qaRpSet.contains(bmrNo) || !productRpSet.contains(bmrNo) || !prodRpSet.contains(bmrNo))
	                .collect(Collectors.toList());

	        DashboardBmrDTO dto2 = new DashboardBmrDTO();
	        dto2.setDepartmentName("Spunlace");
	        dto2.setDepartmentId("2");
	        dto2.setFormName("PRD02/F-27 RP Batch Manufacturing Record");
	        dto2.setPendingBmrNos(pendingRpBmrList);
	        dto2.setPendingCount(pendingRpBmrList.size());

	        formsList.add(dto2);
	    }

	    return formsList;
	}
	
	
	private List<DashboardBmrDTO> getTestSpunlaceBmr(String userRole) {
		
	    List<DashboardBmrDTO> formsList = new ArrayList<>();
	    
	    if ( userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")) {
	    	
	    	List<String> bmrNumber =bmr_01_productiondetailsrepository.getBmrNumbersForSpunlace();
	    	
	    	 List<String> pendingBmrList = new ArrayList<>();
	    	 
	         int pendingCount = 0;
	    	
	    	for(String bmrNo : bmrNumber)
	    	{
	    		
	    		BMR13RP14QaRelease qaRelease = bmr13qareleaserepository.findAllApprovedByBatchNoAndOrderNoTest(bmrNo);
	    		
	    		BMR14RP15ProductRelease productRelease = bmr14productreleaserepository.findAllApprovedByBatchNoAndOrderNoTest(bmrNo);
	    		
	    		if ( qaRelease == null || productRelease == null)
	    			
	    		{
	    			 pendingBmrList.add(bmrNo);
	                 pendingCount++;
	    		}
	    	}
	    	
			DashboardBmrDTO dto = new DashboardBmrDTO();
			
			dto.setDepartmentName("Spunlace");
			dto.setDepartmentId("2");
			dto.setFormName("PRD01/F-26 Batch Manufacturing Record");
			dto.setPendingBmrNos(pendingBmrList);
			dto.setPendingCount(pendingCount);
			
			formsList.add(dto);

	    }
	    
	
    return formsList;
}
	
	private List<DashboardBmrDTO> getTestSpunlaceBmrNew(String userRole) {
	    List<DashboardBmrDTO> formsList = new ArrayList<>();

	    if (userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_QA")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("QA_MANAGER")) {

	        // 1. Get all BMR numbers
	        List<String> allBmrNos = bmr_01_productiondetailsrepository.getBmrNumbersForSpunlace();

	        // 2. Get approved lists in one shot
	        List<String> qaApproved = bmr13qareleaserepository.getAllApprovedQaBmrNosForSpunlaceForm1Test();
	        List<String> productApproved = bmr14productreleaserepository.getAllApprovedProductBmrNosForSpunlaceForm1Test();

	        // 3. Use Sets for O(1) lookup
	        Set<String> qaSet = new HashSet<>(qaApproved);
	        Set<String> productSet = new HashSet<>(productApproved);

	        // 4. Find pending BMRs
	        List<String> pendingBmrList = allBmrNos.stream()
	            .filter(bmrNo -> !qaSet.contains(bmrNo) || !productSet.contains(bmrNo))
	            .collect(Collectors.toList());


	        DashboardBmrDTO dto = new DashboardBmrDTO();
	        dto.setDepartmentName("Spunlace");
	        dto.setDepartmentId("2");
	        dto.setFormName("PRD02/F-26 Spunlace Batch Manufacturing Record");
	        dto.setPendingBmrNos(pendingBmrList);
	        dto.setPendingCount(pendingBmrList.size());

	        formsList.add(dto);
	    }

	    return formsList;
	}
	
	// DRYGOODS 
	
	@Autowired
	private BMR001GoodsProductionDetailsRepository bmr001goodsproductiondetailsrepository;
	
	@Autowired
	private BMR13GoodsQaReleaserRepository bmr13goodsqareleaserrepository;
	
	@Autowired
	private BMR14GoodsProductReleaseRepository bmr14goodsproductreleaserepository;
	
	
	private List<DashboardBmrDTO> getDryGoodsBmr(String userRole) {
	    List<DashboardBmrDTO> formsList = new ArrayList<>();

	    if (userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_QA")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("QA_MANAGER")) {
	    	
	    	List<String> allBmrNos =
	    			bmr001goodsproductiondetailsrepository.getDryGoodsBmrNumbersF004();

	        if (allBmrNos == null || allBmrNos.isEmpty()) {
	            return formsList; // nothing to process
	        }

	        // 2️⃣ Fetch all approved QA and Product BMRs in ONE query each
	        List<String> qaApproved =
	        		bmr13goodsqareleaserrepository.getAllApprovedQaBmrNosForDryGoodsF004(allBmrNos);


	        List<String> productApproved =
	        		bmr14goodsproductreleaserepository.getAllApprovedProductBmrNosForDryGoodsF004(allBmrNos);

	        // 3️⃣ Convert to HashSet for O(1) lookup
	        Set<String> qaSet = new HashSet<>(qaApproved);
	        Set<String> productSet = new HashSet<>(productApproved);

	        // 4️⃣ Find pending BMRs (missing QA or Product approval)
	        List<String> pendingBmrList = allBmrNos.stream()
	                .filter(bmrNo -> !qaSet.contains(bmrNo) || !productSet.contains(bmrNo))
	                .collect(Collectors.toList());


	        DashboardBmrDTO dto = new DashboardBmrDTO();
	        dto.setDepartmentName("DryGoods");
	        dto.setDepartmentId("5");
	        dto.setFormName("PRD04/F-004 CottonBall Batch Manufacturing Record");
	        dto.setPendingBmrNos(pendingBmrList);
	        dto.setPendingCount(pendingBmrList.size());

	        formsList.add(dto);
	    }

	    return formsList;
	}
	
	
	
	// UPDATED DRY GOODS 
	
	
	private List<DashboardBmrDTO> getDryGoodsBmrUpdated(String userRole) {
	    List<DashboardBmrDTO> formsList = new ArrayList<>();

	    if (userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_QA")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("QA_MANAGER")) {

	        // ---------- 1️⃣ CottonBall (PRD04/F-004) ----------
	    	
	        List<String> cottonBmrNos =
	                bmr001goodsproductiondetailsrepository.getDryGoodsBmrNumbersF004();

	        if (cottonBmrNos != null && !cottonBmrNos.isEmpty()) {
	        	
		        List<String> cottonBallsProdApprovedBmrNos = bmr001goodsproductiondetailsrepository
		                .getApprovedBmrCottonBalls(cottonBmrNos);
	        	
	            List<String> cottonQaApproved =
	                    bmr13goodsqareleaserrepository.getAllApprovedQaBmrNosForDryGoodsF004(cottonBmrNos);
	            
	            List<String> cottonProductApproved =
	                    bmr14goodsproductreleaserepository.getAllApprovedProductBmrNosForDryGoodsF004(cottonBmrNos);

	            Set<String> prodSet = new HashSet<>(cottonBallsProdApprovedBmrNos);
	            Set<String> qaSet = new HashSet<>(cottonQaApproved);
	            Set<String> productSet = new HashSet<>(cottonProductApproved);

	            List<String> pendingBmrList = cottonBmrNos.stream()
	                    .filter(bmrNo -> !qaSet.contains(bmrNo) || !productSet.contains(bmrNo) || !prodSet.contains(bmrNo))
	                    .collect(Collectors.toList());

	            DashboardBmrDTO dto = new DashboardBmrDTO();
	            dto.setDepartmentName("DryGoods");
	            dto.setDepartmentId("5");
	            dto.setFormName("PRD04/F-004 CottonBall Batch Manufacturing Record");
	            dto.setPendingBmrNos(pendingBmrList);
	            dto.setPendingCount(pendingBmrList.size());
	            formsList.add(dto);
	        }

	        // ---------- 2️⃣ Pleat  (PRD04/F-007) ----------
	        
	        List<String> pleatBmrNos = bmr001goodsproductiondetailsrepository.getDryGoodsBmrNumbersF007();
	        
	        

	        if (pleatBmrNos != null && !pleatBmrNos.isEmpty()) {
	        	
	        	
	        	List<String> pleatProdApprovedBmrNos = bmr001goodsproductiondetailsrepository
			                .getApprovedBmrPleat(pleatBmrNos);
	        	
	            List<String> pleatQaApproved =
	                    bmr13goodsqareleaserrepository.getAllApprovedQaBmrNosForDryGoodsF007(pleatBmrNos);
	            List<String> pleatProductApproved =
	                    bmr14goodsproductreleaserepository.getAllApprovedProductBmrNosForDryGoodsF007(pleatBmrNos);

	            Set<String> prodSet = new HashSet<>(pleatProdApprovedBmrNos);
	            Set<String> qaSet = new HashSet<>(pleatQaApproved);
	            Set<String> productSet = new HashSet<>(pleatProductApproved);

	            List<String> pendingBmrList = pleatBmrNos.stream()
	                    .filter(bmrNo -> !qaSet.contains(bmrNo) || !productSet.contains(bmrNo) || !prodSet.contains(bmrNo))
	                    .collect(Collectors.toList());

	            DashboardBmrDTO dto = new DashboardBmrDTO();
	            dto.setDepartmentName("DryGoods");
	            dto.setDepartmentId("5");
	            dto.setFormName("PRD04/F-007 Pleat Batch Manufacturing Record");
	            dto.setPendingBmrNos(pendingBmrList);
	            dto.setPendingCount(pendingBmrList.size());
	            formsList.add(dto);
	        }

	        // ---------- 3️⃣ Woolroll (PRD04/F-008) ----------
	        
	        List<String> woolrollBmrNos =
	                bmr001goodsproductiondetailsrepository.getDryGoodsBmrNumbersF008();

	        if (woolrollBmrNos != null && !woolrollBmrNos.isEmpty()) {
	        	
	        	
	        	  List<String> cottonBallsProdApprovedBmrNos = 
	        			  bmr001goodsproductiondetailsrepository.getApprovedBmrWoolRoll(woolrollBmrNos);
	        	
	            List<String> woolrollQaApproved =
	                    bmr13goodsqareleaserrepository.getAllApprovedQaBmrNosForDryGoodsF008(woolrollBmrNos);
	            
	            List<String> woolrollProductApproved =
	                    bmr14goodsproductreleaserepository.getAllApprovedProductBmrNosForDryGoodsF008(woolrollBmrNos);

	            Set<String> prodSet = new HashSet<>(cottonBallsProdApprovedBmrNos);
	            Set<String> qaSet = new HashSet<>(woolrollQaApproved);
	            Set<String> productSet = new HashSet<>(woolrollProductApproved);

	            List<String> pendingBmrList = woolrollBmrNos.stream()
	                    .filter(bmrNo -> !qaSet.contains(bmrNo) || !productSet.contains(bmrNo) || !prodSet.contains(bmrNo))
	                    .collect(Collectors.toList());

	            DashboardBmrDTO dto = new DashboardBmrDTO();
	            dto.setDepartmentName("DryGoods");
	            dto.setDepartmentId("5");
	            dto.setFormName("PRD04/F-008 Wool Roll Batch Manufacturing Record");
	            dto.setPendingBmrNos(pendingBmrList);
	            dto.setPendingCount(pendingBmrList.size());
	            formsList.add(dto);
	        }
	    }

	    return formsList;
	}

	
	// SPUNLACE
	
	@Autowired
	BMR01RP01ProductionDetailsRepository bmr_01_productiondetailsrepository;
	
	@Autowired
	BMR13RP14QaReleaseRepository bmr13qareleaserepository;
	
	@Autowired
	BMR14RP15ProductReleaseRepository bmr14productreleaserepository;
	
	private List<DashboardBmrDTO> getSpunlaceBmr(String userRole) {
	    
	    List<DashboardBmrDTO> formsList = new ArrayList<>();
	    
	    if ( userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_QA")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("QA_MANAGER")) {
	        
	    	List<Object[]> results = bmr_01_productiondetailsrepository.getBmrNumbersForSpunlaceForm1();
	    	
	        List<String> pendingBmrList1 = new ArrayList<>();
	        
	        int pendingCount1 = 0;

	    	for (Object[] row : results) {
	    		
	    	    String batchNo = (String) row[0];
	    	    String orderNo = (String) row[1];
	    	    System.out.println("Batch No: " + batchNo + ", Order No: " + orderNo);
	    	    
	    	    BMR13RP14QaRelease qaRelease = bmr13qareleaserepository.getQaReleaseStatus(batchNo,orderNo);
	    	    
	    	    // PRODUCT RELEASE
	    	    
	    	    BMR14RP15ProductRelease productRelease = bmr14productreleaserepository.getStatus(batchNo,orderNo);
	    	    
	    	    if ( qaRelease == null || productRelease == null)
	            {
	                 pendingBmrList1.add("BatchNo :"+ batchNo + " - " + "OrderNO :"+ orderNo);
	                 pendingCount1++;
	            }
	    	    
	    	}
	        
	        DashboardBmrDTO dto1 = new DashboardBmrDTO();
	        dto1.setDepartmentName("Spunlace");
	        dto1.setDepartmentId("2");
	        dto1.setFormName("PRD01/F-43 Spunlace Batch Manufacturing Record");
	        dto1.setPendingBmrNos(pendingBmrList1);
	        dto1.setPendingCount(pendingCount1);
	        formsList.add(dto1);

	        
	    }

	    return formsList;
	}

	
	private List<DashboardBmrDTO> getSpunlaceBmr1(String userRole) {
	    List<DashboardBmrDTO> formsList = new ArrayList<>();

	    if (userRole.equalsIgnoreCase("ROLE_HOD")
	            || userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	            || userRole.equalsIgnoreCase("ROLE_QA")
	            || userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	            || userRole.equalsIgnoreCase("QA_MANAGER")) {

	        // Fetch all batch/order pairs
	        List<Object[]> results = bmr_01_productiondetailsrepository.getBmrNumbersForSpunlaceForm1();

	        if (results == null || results.isEmpty()) {
	            return formsList;
	        }

	        // Collect all batch/order pairs for IN clause
	        List<String> batchNos = new ArrayList<>();
	        List<String> orderNos = new ArrayList<>();

	        for (Object[] row : results) {
	            batchNos.add((String) row[0]);
	            orderNos.add((String) row[1]);
	        }

	        // Fetch all QA Release and Product Release data in batch
	        List<BMR13RP14QaRelease> qaReleases =
	                bmr13qareleaserepository.findAllApprovedByBatchNoAndOrderNo(batchNos, orderNos);

	        List<BMR14RP15ProductRelease> productReleases =
	                bmr14productreleaserepository.findAllApprovedByBatchNoAndOrderNo(batchNos, orderNos);

	        // Convert them to lookup maps
	        Map<String, BMR13RP14QaRelease> qaReleaseMap = new HashMap<>();
	        for (BMR13RP14QaRelease qa : qaReleases) {
	            qaReleaseMap.put(qa.getBatchNo() + "|" + qa.getOrder_no(), qa);
	        }

	        Map<String, BMR14RP15ProductRelease> productReleaseMap = new HashMap<>();
	        for (BMR14RP15ProductRelease pr : productReleases) {
	            productReleaseMap.put(pr.getBatchNo() + "|" + pr.getOrder_no(), pr);
	        }

	        List<String> pendingBmrList1 = new ArrayList<>();
	        int pendingCount1 = 0;

	        // Process results in-memory efficiently
	        for (Object[] row : results) {
	            String batchNo = (String) row[0];
	            String orderNo = (String) row[1];
	            String key = batchNo + "|" + orderNo;

	            BMR13RP14QaRelease qaRelease = qaReleaseMap.get(key);
	            BMR14RP15ProductRelease productRelease = productReleaseMap.get(key);

	            if (qaRelease == null || productRelease == null) {
	                pendingBmrList1.add("BatchNo: " + batchNo + " - OrderNo: " + orderNo);
	                pendingCount1++;
	            }
	        }

	        DashboardBmrDTO dto1 = new DashboardBmrDTO();
	        dto1.setDepartmentName("Spunlace");
	        dto1.setDepartmentId("2");
	        dto1.setFormName("PRD02/F-26 Spunlace Batch Manufacturing Record");
	        dto1.setPendingBmrNos(pendingBmrList1);
	        dto1.setPendingCount(pendingCount1);

	        formsList.add(dto1);
	        
	        
	        
	     // 🔹 For Second BMR Form (PRD01/F-44)
	        
	        
	        // Fetch all batch/order pairs
	        List<Object[]> results2 = bmr_01_productiondetailsrepository.getBmrNumbersForSpunlaceForm2();

	        if (results2 == null || results2.isEmpty()) {
	            return formsList;
	        }

	        // Collect all batch/order pairs for IN clause
	        List<String> batchNos2 = new ArrayList<>();
	        List<String> orderNos2 = new ArrayList<>();

	        for (Object[] row : results2) {
	            batchNos2.add((String) row[0]);
	            orderNos2.add((String) row[1]);
	        }

	        // Fetch all QA Release and Product Release data in batch
	        List<BMR13RP14QaRelease> qaReleases2 =
	                bmr13qareleaserepository.findAllApprovedByBatchNoAndOrderNo2(batchNos2, orderNos2);

	        List<BMR14RP15ProductRelease> productReleases2 =
	                bmr14productreleaserepository.findAllApprovedByBatchNoAndOrderNo2(batchNos2, orderNos2);

	        // Convert them to lookup maps
	        Map<String, BMR13RP14QaRelease> qaReleaseMap2 = new HashMap<>();
	        for (BMR13RP14QaRelease qa : qaReleases2) {
	            qaReleaseMap2.put(qa.getBatchNo() + "|" + qa.getOrder_no(), qa);
	        }

	        Map<String, BMR14RP15ProductRelease> productReleaseMap2 = new HashMap<>();
	        for (BMR14RP15ProductRelease pr : productReleases2) {
	            productReleaseMap2.put(pr.getBatchNo() + "|" + pr.getOrder_no(), pr);
	        }

	        List<String> pendingBmrList2 = new ArrayList<>();
	        int pendingCount2 = 0;

	        // Process results in-memory efficiently
	        for (Object[] row : results2) {
	            String batchNo2 = (String) row[0];
	            String orderNo2 = (String) row[1];
	            String key = batchNo2 + "|" + orderNo2;

	            BMR13RP14QaRelease qaRelease2 = qaReleaseMap2.get(key);
	            BMR14RP15ProductRelease productRelease2 = productReleaseMap2.get(key);

	            if (qaRelease2 == null || productRelease2 == null) {
	                pendingBmrList2.add("BatchNo: " + batchNo2 + " - OrderNo: " + orderNo2);
	                pendingCount2++;
	            }
	        }

	        DashboardBmrDTO dto2 = new DashboardBmrDTO();
	        dto2.setDepartmentName("Spunlace");
	        dto2.setDepartmentId("2");
	        dto2.setFormName("PRD02/F-27 Spunlace Batch Manufacturing Record");
	        dto2.setPendingBmrNos(pendingBmrList2);
	        dto2.setPendingCount(pendingCount2);

	        formsList.add(dto2);
	        
	        
	        
	    }

	    return formsList;
	}


	
	// PAD PUNCHING
	
	@Autowired
	private PunchingBmrProductionDetailsRepository punchingBmrProductionDetailsRepository;
	
	@Autowired
	private PunchingBmrQualityReleaseHeadRepository qualityReleaseHeadRepository;
	
	@Autowired
	private PunchingBmrProductReleaseRepository bmrProductReleaseRepository;
	
	
    private List<DashboardBmrDTO> getPadPunchingBmr(String userRole) {
		
	    List<DashboardBmrDTO> formsList = new ArrayList<>();
	    
	    if ( userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_OPERATOR")) {
	    	
	    	 List<String> allBmrNos =
	    			 punchingBmrProductionDetailsRepository.getPunchingBmrNumbers();
	    	 
//	    	 System.out.println("Total Bmr Count : " + allBmrNos.size());
	    	 

		        if (allBmrNos != null && !allBmrNos.isEmpty()) {
		        	
			        List<String> prodApprovedBmrNos = punchingBmrProductionDetailsRepository
			                .getApprovedBmr(allBmrNos);
			        
			        
//			        System.out.println("Total Production Details Bmr Count : " + prodApprovedBmrNos.size());
		        	
		            List<String> qaApproved =
		            		qualityReleaseHeadRepository.getAllApprovedQaBmrNos(allBmrNos);
		            
//		            System.out.println("Total Quality Release Bmr Count : " + qaApproved.size());
		            
		            List<String> productApproved =
		            		bmrProductReleaseRepository.getAllApprovedProductBmrNos(allBmrNos);
		            

		            Set<String> prodSet = new HashSet<>(prodApprovedBmrNos);
		            Set<String> qaSet = new HashSet<>(qaApproved);
		            Set<String> productSet = new HashSet<>(productApproved);

		            List<String> pendingBmrList = allBmrNos.stream()
		                    .filter(bmrNo -> !qaSet.contains(bmrNo) || !productSet.contains(bmrNo) || !prodSet.contains(bmrNo))
		                    .collect(Collectors.toList());

		            DashboardBmrDTO dto = new DashboardBmrDTO();
		            dto.setDepartmentName("PadPunching");
		            dto.setDepartmentId("3");
		            dto.setFormName("PH-QAD01/F-070 Pad Punching Batch Manufacturing Record");
		            dto.setPendingBmrNos(pendingBmrList);
		            dto.setPendingCount(pendingBmrList.size());
		            formsList.add(dto);
		        }

	    }
	    
	
    return formsList;
}
    
    // COTTON BUDS BMR DASHBOARD
    
	@Autowired
	private BudsBmrProductionDetailsRepository budsBmrProductionDetailsRepository;
	
	@Autowired
	private BudsBmrQualityReleaseRepository budsBmrQualityReleaseRepository;
	
	@Autowired
	private BudsBmrProductReleaseRepository budsBmrProductReleaseRepository;
    
    private List<DashboardBmrDTO> getCottonBudsBmr(String userRole) {
		
	    List<DashboardBmrDTO> formsList = new ArrayList<>();
	    
	    if ( userRole.equalsIgnoreCase("ROLE_HOD")
	    		|| userRole.equalsIgnoreCase("ROLE_SUPERVISOR")
	    		|| userRole.equalsIgnoreCase("ROLE_QA")
	    		|| userRole.equalsIgnoreCase("ROLE_DESIGNEE")
	    		|| userRole.equalsIgnoreCase("QA_MANAGER")
	    		|| userRole.equalsIgnoreCase("ROLE_OPERATOR")) {
	    	
	    	 List<String> allBmrNos =
	    			 budsBmrProductionDetailsRepository.getBudsBmrNumbers();
	    	 
	    	 System.out.println("Total Bmr Count : " + allBmrNos.size());

		        if (allBmrNos != null && !allBmrNos.isEmpty()) {
		        	
			        List<String> prodApprovedBmrNos = budsBmrProductionDetailsRepository
			                .getApprovedBmr(allBmrNos);
			        
			        System.out.println("Total Production Details Bmr Count : " + prodApprovedBmrNos.size());
		        	
		            List<String> qaApproved =
		            		budsBmrQualityReleaseRepository.getAllApprovedQaBmrNos(allBmrNos);
		            
		            System.out.println("Total Quality Release Bmr Count : " + qaApproved.size());
		            
		            List<String> productApproved =
		            		budsBmrProductReleaseRepository.getAllApprovedProductBmrNos(allBmrNos);
		            
		            System.out.println("Total Product Release Bmr Count : " + productApproved.size());
		            

		            Set<String> prodSet = new HashSet<>(prodApprovedBmrNos);
		            Set<String> qaSet = new HashSet<>(qaApproved);
		            Set<String> productSet = new HashSet<>(productApproved);

		            List<String> pendingBmrList = allBmrNos.stream()
		                    .filter(bmrNo -> !qaSet.contains(bmrNo) || !productSet.contains(bmrNo) || !prodSet.contains(bmrNo))
		                    .collect(Collectors.toList());
		            
//		            System.out.println("Pending Bmr Number : " + pendingBmrList);
//		            
//		            System.out.println("Pending Bmr Count : " + pendingBmrList.size());
//		            
//		            List<String> closedBmrList = allBmrNos.stream()
//		                    .filter(bmrNo -> prodSet.contains(bmrNo)
//		                                  && qaSet.contains(bmrNo)
//		                                  && productSet.contains(bmrNo))
//		                    .collect(Collectors.toList());
//		            
//		            
//		            System.out.println("Closed Bmr Number : " + closedBmrList);
//		            
//		            System.out.println("Closed Bmr Count : " + closedBmrList.size());

		            DashboardBmrDTO dto = new DashboardBmrDTO();
		            dto.setDepartmentName("COTTON BUDS");
		            dto.setDepartmentId("12");
		            dto.setFormName("PH-PRD06/F-004 COTTON BUDS BATCH MANUFACTURING RECORD");
		            dto.setPendingBmrNos(pendingBmrList);
		            dto.setPendingCount(pendingBmrList.size());
//		            dto.setClosedBmrNos(closedBmrList);
//		            dto.setClosedCount(closedBmrList.size());
		            formsList.add(dto);
		        }

	    }
	    
	
    return formsList;
}



	  
	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}


}
