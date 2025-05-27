package com.focusr.Precot.mssql.database.service.Qc;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.focusr.Precot.mssql.database.model.Qc.ChemicalAnalysisReportARF003;
import com.focusr.Precot.mssql.database.model.Qc.DistilledWaterAnalysisReportARF012;
import com.focusr.Precot.mssql.database.model.Qc.MediaGrowthDetails;
import com.focusr.Precot.mssql.database.model.Qc.MicrobiologicalTestARF001;
import com.focusr.Precot.mssql.database.model.Qc.MicrobiologicalTestF026;
import com.focusr.Precot.mssql.database.model.Qc.PhysicalAndChemcalTestARF001;
import com.focusr.Precot.mssql.database.model.Qc.PhysicalAndChemicalPropTestF026;
import com.focusr.Precot.mssql.database.model.Qc.QcPhMeterCalibrationReportF006;
import com.focusr.Precot.mssql.database.model.Qc.QcReagentPreparationRecordF017;
import com.focusr.Precot.mssql.database.model.Qc.QcReagentPreparationRecordF017ChemTable;
import com.focusr.Precot.mssql.database.model.Qc.QcShelfLifePeriodPhysicChemMicroF026;
import com.focusr.Precot.mssql.database.model.Qc.QcTdsMeterCalibrationReportF008;
import com.focusr.Precot.mssql.database.model.Qc.Qc_BacterialIncubatorTempCalibrationF012;
import com.focusr.Precot.mssql.database.model.Qc.Qc_CleaningOfAutoclavesF023;
import com.focusr.Precot.mssql.database.model.Qc.Qc_GlasswareBreakageDisposalRegisterF028;
import com.focusr.Precot.mssql.database.model.Qc.Qc_MediaGrowthPromotionTestReportF021;
import com.focusr.Precot.mssql.database.model.Qc.Qc_MediaPreparationAndConsumptionRecordF019;
import com.focusr.Precot.mssql.database.model.Qc.Qc_RawCottenConsolidatedAnalyticalReportF004;
import com.focusr.Precot.mssql.database.model.Qc.Qc_RawCottenConsolidatedDetails;
import com.focusr.Precot.mssql.database.model.Qc.Qc_ValidationForAutoclaveByChemicalIndicatorF014;
import com.focusr.Precot.mssql.database.model.Qc.Qc_WiraFiberFinenessTesterReportF010;
import com.focusr.Precot.mssql.database.model.Qc.RawCottenAnalysisReportARF001;
import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookDetail;
import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookF001_F002_F003;
import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalAnalysisARF008_009_010;
import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalDetails;
import com.focusr.Precot.mssql.database.model.Qc.WiraFiberDetails;
import com.focusr.Precot.mssql.database.model.QcAudit.ChemicalAnalysisReportARF003History;
import com.focusr.Precot.mssql.database.model.QcAudit.DistilledWaterAnalysisReportARF012History;
import com.focusr.Precot.mssql.database.model.QcAudit.MediaGrowthDetailsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobiologicalTestARF001History;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobiologicalTestF026History;
import com.focusr.Precot.mssql.database.model.QcAudit.PhysicalAndChemcalTestARF001History;
import com.focusr.Precot.mssql.database.model.QcAudit.PhysicalAndChemicalPropTestF026History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcPhMeterCalibrationReportF006History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcReagentPreparationRecordF017ChemTableHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.QcReagentPreparationRecordF017History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcShelfLifePeriodPhysicChemMicroF026History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcTdsMeterCalibrationReportF008History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_BacterialIncubatorTempCalibrationF012History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_MediaGrowthPromotionTestReportF021History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_MediaPreparationAndConsumptionRecordF019History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_RawCottenConsolidatedAnalyticalReportF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_RawCottenConsolidatedDetailsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_ValidationForAutoclaveByChemicalIndicatorF014History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_WiraFiberFinenessTesterReportF010History;
import com.focusr.Precot.mssql.database.model.QcAudit.RawCottenAnalysisReportARF001History;
import com.focusr.Precot.mssql.database.model.QcAudit.SampleInwardBookDetailHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.SampleInwardBookF001_F002_F003History;
import com.focusr.Precot.mssql.database.model.QcAudit.SwabMicrobiologicalAnalysisARF008_009_010History;
import com.focusr.Precot.mssql.database.model.QcAudit.SwabMicrobiologicalDetailsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.WiraFiberDetailsHistory;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrLaydownMapping;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.Qc.BacterialIncubatorTempCalibrationRepoF012;
import com.focusr.Precot.mssql.database.repository.Qc.ChemicalAnalysisReportARF003Repository;
import com.focusr.Precot.mssql.database.repository.Qc.CleaningOfAutoclaveF023Repo;
import com.focusr.Precot.mssql.database.repository.Qc.DistilledWaterAnalysisReportARF012Repo;
import com.focusr.Precot.mssql.database.repository.Qc.GlasswareBreakageDisposalRegisterRepoF028;
import com.focusr.Precot.mssql.database.repository.Qc.MediaGrowthDetailsRepo;
import com.focusr.Precot.mssql.database.repository.Qc.MediaGrowthPromotionF021Repo;
import com.focusr.Precot.mssql.database.repository.Qc.MediaPreparationAndConsumptionRecordRepo;
import com.focusr.Precot.mssql.database.repository.Qc.MicrobiologicalTestARF001Repository;
import com.focusr.Precot.mssql.database.repository.Qc.MicrobiologicalTestARF026Repository;
import com.focusr.Precot.mssql.database.repository.Qc.PhMeterCalibrationReportF006Repo;
import com.focusr.Precot.mssql.database.repository.Qc.PhysicalAndChemcalTestARF001Repository;
import com.focusr.Precot.mssql.database.repository.Qc.PhysicalAndChemcalTestARF026Repository;
import com.focusr.Precot.mssql.database.repository.Qc.RawCottenAnalysisReportARF001Repository;
import com.focusr.Precot.mssql.database.repository.Qc.RawCottenConsolidatedRepoF004;
import com.focusr.Precot.mssql.database.repository.Qc.RawCottonConsolidatedDetailsRepo;
import com.focusr.Precot.mssql.database.repository.Qc.ReagentPreparationRecordF017ChemRepo;
import com.focusr.Precot.mssql.database.repository.Qc.RegantPreparationRecordF017Repo;
import com.focusr.Precot.mssql.database.repository.Qc.SampleInwardBookDetailRepository;
import com.focusr.Precot.mssql.database.repository.Qc.SampleInwardBookF001F002F003Repo;
import com.focusr.Precot.mssql.database.repository.Qc.ShelfLifePeriodPhysicChemMicroF026Repo;
import com.focusr.Precot.mssql.database.repository.Qc.SwabMicrobiologicalAnalysisF008F009F010Repo;
import com.focusr.Precot.mssql.database.repository.Qc.SwabMicrobiologicalDetailsRepo;
import com.focusr.Precot.mssql.database.repository.Qc.TdsMeterCalibrationReportF008Repo;
import com.focusr.Precot.mssql.database.repository.Qc.ValidationForAutoclaveByChemicalIndicatorRepo;
import com.focusr.Precot.mssql.database.repository.Qc.WiraFiberDetailsRepo;
import com.focusr.Precot.mssql.database.repository.Qc.WiraFiberFinenessTesterF010Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.BacterialIncubatorTempCalibrationRepoF012History;
import com.focusr.Precot.mssql.database.repository.Qc.audit.ChemicalAnalysisReportARF003HistoryRepository;
import com.focusr.Precot.mssql.database.repository.Qc.audit.DistilledWaterAnalysisReportARF012RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.MediaGrowthDetailRepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.MediaGrowthPromotionF021HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.MediaPreparationAndConsumptionRecordRepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.MicrobiologicalTestARF001RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.MicrobiologicalTestARF026RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.PhMeterCalibrationReportF006RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.PhysicalAndChemcalTestARF001RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.PhysicalAndChemcalTestARF026RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.QcShelfLifePeriodPhysicChemMicroF026RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.RawCottenAnalysisReportARF001RepositoryHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.RawCottenConsolidatedRepoF004History;
import com.focusr.Precot.mssql.database.repository.Qc.audit.RawCottonConsolidatedDetailsRepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.ReagentPreparationRecordF017ChemHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.RegantPreparationRecordF017RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.SampleInvwardBookF001F002F003HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.SampleInwardBookDetailRepositoryHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.SwabMicrobiologicalAnalysisF008F009F010RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.SwabMicrobiologicalDetailsRepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.TdsMeterCalibrationReportF008RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.ValidationForAutoclaveByChemicalIndicatorReopF014History;
import com.focusr.Precot.mssql.database.repository.Qc.audit.WiraFiberDetailsRepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.WiraFiberFinenessTesterF010RepoHistory;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrLaydownMappingRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.RawCottonIssueResponse;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Qc.AppConstantsQc;
import com.focusr.Precot.util.Qc.ChemicalDetailsDTO;
import com.focusr.Precot.util.Qc.CleaningOfAutoclavesF023Response;
import com.focusr.Precot.util.Qc.QcMailFunction;
import com.focusr.Precot.util.Qc.RawCottonConsolidatePayload;
import com.focusr.Precot.util.Qc.RawCottonFetchBatchNo;
import com.focusr.Precot.util.Qc.ShelfLifePeriodLotPayload;
import com.focusr.Precot.util.Qc.TblsupPayloadChemicalAnalysisDTO;
import com.focusr.Precot.util.Qc.TblsupPayloadRawCottonAnalysis;

/**
 * PH-QCL01-ARF-F001
 * PH-QCL01-ARF-F003
 * PH-QCL01-ARF-F008
 * PH-QCL01-ARF-F009
 * PH-QCL01-ARF-F010
 * PH-QCL01-ARF-F012
 * PH-QCL01F-001
 * PH-QCL01F-002
 * PH-QCL01F-003
 * PH-QCL01F-008
 * PH-QCL01/F-010
 * PH-QCL01/F-004
 * PH-QCL01/F-012
 * PH-QCL01/F-028
 * PH-QCL01/F-023
 * PH-QCL01/F-014
 * PH-QCL01/F-006
 * PH-QCL01/F-017
 * PH-QCL01/F-026
 * PH-QCL01/F-021
 * PH-QCL01/F-019
 * @author Jayanth Kumar A.S
 *
 */

@Service
public class QcService7 {

	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RawCottenAnalysisReportARF001Repository rawCottenAnalysisRepo;

	@Autowired
	private RawCottenAnalysisReportARF001RepositoryHistory rawCottenAnalysisRepoHistory;

	@Autowired
	private PhysicalAndChemcalTestARF001Repository physicalAndChemcalRepo;

	@Autowired
	private MicrobiologicalTestARF001Repository microBiologicalRepo;

	@Autowired
	private PhysicalAndChemcalTestARF001RepoHistory physicalAndChemcalTestARF001RepoHistory; 

	@Autowired
	private MicrobiologicalTestARF001RepoHistory microbiologicalTestARF001RepoHistory;

	@Autowired
	private ChemicalAnalysisReportARF003Repository chemicalAnalysisRepo;

	@Autowired
	private ChemicalAnalysisReportARF003HistoryRepository chemicalAnalysisRepoHistory;

	@Autowired
	private SampleInwardBookF001F002F003Repo sampleInwardBookRepo;

	@Autowired
	private SampleInvwardBookF001F002F003HistoryRepo sampleInwardBookRepoHistory;

	@Autowired
	private SampleInwardBookDetailRepository sampleInwardBookDetailRepo;

	@Autowired
	private SampleInwardBookDetailRepositoryHistory sampleInwardBookDetailRepoHistory;

	@Autowired
	private SwabMicrobiologicalAnalysisF008F009F010Repo SwabMicroAnalysisRepo;

	@Autowired
	private SwabMicrobiologicalAnalysisF008F009F010RepoHistory SwabMicrAnalysisRepoHistory;

	@Autowired
	private SwabMicrobiologicalDetailsRepo SwabMicroDetailsRepo;

	@Autowired
	private SwabMicrobiologicalDetailsRepoHistory SwabMicroDetailsRepoHistory;

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private DistilledWaterAnalysisReportARF012Repo distilledWaterAnalysisRepo;

	@Autowired
	private DistilledWaterAnalysisReportARF012RepoHistory distilledWaterAnalysisRepoHistory;

	@Autowired
	private TdsMeterCalibrationReportF008Repo tdsMeterCalibrationRepo;

	@Autowired
	private TdsMeterCalibrationReportF008RepoHistory tdsMeterCalibrationRepoHistory;

	@Autowired
	private WiraFiberFinenessTesterF010Repo wiraFiberFinenessRepo;

	@Autowired
	private WiraFiberFinenessTesterF010RepoHistory WiraFiberFinenessRepoHistory;

	@Autowired
	private RawCottenConsolidatedRepoF004 rawCottenConsolidatedRepoF004;

	@Autowired
	private RawCottenConsolidatedRepoF004History rawCottenConsolidatedRepoHistory;

	@Autowired
	private BacterialIncubatorTempCalibrationRepoF012 bacterialIncubatorTempCalRepo;

	@Autowired
	private BacterialIncubatorTempCalibrationRepoF012History bacterialIncubatorTempCalRepoHistory;

	@Autowired
	private WiraFiberDetailsRepo wiraFiberDetailsRepo;

	@Autowired
	private WiraFiberDetailsRepoHistory wiraFiberDetailsRepoHistory;

	@Autowired
	private GlasswareBreakageDisposalRegisterRepoF028 GlasswareBreakageRepo;

	@Autowired
	private CleaningOfAutoclaveF023Repo cleaningOfAutoclaveRepo;

	@Autowired
	private ValidationForAutoclaveByChemicalIndicatorRepo ValidationForAutoclaveChemRepo;

	@Autowired
	private ValidationForAutoclaveByChemicalIndicatorReopF014History ValidationForAutoclaveChemReopHistory;

	@Autowired
	private PhMeterCalibrationReportF006Repo phMeterCalibRepo;

	@Autowired
	private PhMeterCalibrationReportF006RepoHistory phMeterCalibHistoryRepo;

	@Autowired
	private BleachBmrLaydownMappingRepository bleachBmrLaydownMappingRepo;

	@Autowired
	private RegantPreparationRecordF017Repo regantPreparationRepo;

	@Autowired
	private RegantPreparationRecordF017RepoHistory regantPreparationRepoHistory;

	@Autowired
	private QcShelfLifePeriodPhysicChemMicroF026RepoHistory shelfLifePeriodRepoHistory;

	@Autowired
	private ShelfLifePeriodPhysicChemMicroF026Repo shelfLifePeriodRepo;

	@Autowired
	private PhysicalAndChemcalTestARF026Repository PhysicalAndChemcalRepoF026;

	@Autowired
	private MicrobiologicalTestARF026Repository MicrobiologicalRepoF026;

	@Autowired
	private PhysicalAndChemcalTestARF026RepoHistory physicalAndChemcalF026RepoHistory;

	@Autowired
	private MicrobiologicalTestARF026RepoHistory microbioARF026RepoHistory;

	@Autowired
	private	MediaGrowthPromotionF021Repo mediaGrowthPromotionF021Repo;

	@Autowired
	private	MediaGrowthDetailsRepo mediaGrowthDetailsRepo;

	@Autowired
	private	MediaGrowthPromotionF021HistoryRepo mediaGrowthHistoryRepo;

	@Autowired
	private	MediaGrowthDetailRepoHistory mediaGrowthDetailRepoHistory;

	@Autowired
	private MediaPreparationAndConsumptionRecordRepo mediaPreparationRepo;

	@Autowired
	private MediaPreparationAndConsumptionRecordRepoHistory mediaPreparationRepoHistory;

	@Autowired
	private RawCottonConsolidatedDetailsRepo rawCottonConsolidatedDetailsRepo;

	@Autowired
	private RawCottonConsolidatedDetailsRepoHistory rawCottonConsolidatedDetailsRepoHistory;

	@Autowired
	private QcMailFunction qcMailFunction;

	@Autowired
	private ReagentPreparationRecordF017ChemRepo reagentPreparationRecordF017ChemRepo;
	
	@Autowired
	private ReagentPreparationRecordF017ChemHistoryRepo reagentPreparationRecordF017ChemHistoryRepo;
	
	Logger log = LoggerFactory.getLogger(QcService7.class);


	@Transactional
	public ResponseEntity<?> saveRawCottonAnalysisReport(RawCottenAnalysisReportARF001 rawCottenAnalysisReport,
			HttpServletRequest http) {
		if (rawCottenAnalysisReport == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		RawCottenAnalysisReportARF001 savedReport = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (rawCottenAnalysisReport.getId() != null) {
				// Fetch existing report to preserve certain fields
				savedReport = rawCottenAnalysisRepo.findById(rawCottenAnalysisReport.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				// Update other fields, excluding MILL_BATCH_NO
				BeanUtils.copyProperties(rawCottenAnalysisReport, savedReport, getIgnoredProperties());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				// Set MILL_BATCH_NO to the existing value to prevent changes
				savedReport.setMillBatchNo(savedReport.getMillBatchNo());
			} else {
				// Save new report
				savedReport = rawCottenAnalysisRepo.save(rawCottenAnalysisReport);
			}

			// Handle role-based updates
			if (role.equals("ROLE_CHEMIST")) {
				savedReport.setChemist_saved_by(userName);
				savedReport.setChemist_saved_on(date);
				savedReport.setChemist_saved_id(userId);
				savedReport.setChemist_status(AppConstantsQc.chemistSave);

				if (savedReport.getPhysicalAndChemicalTests() != null) {
					for (PhysicalAndChemcalTestARF001 pcTest : savedReport.getPhysicalAndChemicalTests()) {
						pcTest.setRawCottenAnalysisId(savedReport.getId());
					}
					physicalAndChemcalRepo.saveAll(savedReport.getPhysicalAndChemicalTests());
				}
			} else if (role.equals("ROLE_MICROBIOLOGIST")) {
				savedReport.setMicrobiologist_saved_by(userName);
				savedReport.setMicrobiologist_saved_on(date);
				savedReport.setMicrobiologist_saved_id(userId);
				savedReport.setMicrobiologist_status(AppConstantsQc.microBiologistSave);

				if (savedReport.getMicrobiologicalTests() != null) {
					for (MicrobiologicalTestARF001 microTest : savedReport.getMicrobiologicalTests()) {
						microTest.setRawCottenAnalysisId(savedReport.getId());
					}
					microBiologicalRepo.saveAll(savedReport.getMicrobiologicalTests());
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save the parent object after updating children
			savedReport = rawCottenAnalysisRepo.save(savedReport);

		} catch (Exception ex) {
			log.error("**** Unable to save Raw Cotton Analysis Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Raw Cotton Analysis Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}


	@Transactional
	public ResponseEntity<?> submitRawCottonAnalysisReport(RawCottenAnalysisReportARF001 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		RawCottenAnalysisReportARF001 savedReportObj;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			RawCottenAnalysisReportARF001 reportObj = report.getId() != null 
					? rawCottenAnalysisRepo.findFormById(report.getId()) 
							: new RawCottenAnalysisReportARF001();

			if (report.getId() == null) {
				// New record, set created fields
				setCreatedByAndAtFields(report, reportObj);
				reportObj.setCreatedAt(date);// Set created_at to current date

			} else if (reportObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
			}

			BeanUtils.copyProperties(report, reportObj, getIgnoredProperties());				


			// Handle the role-specific submission logic
			if (role.equals("ROLE_CHEMIST")) {
				handleRoleChemist(reportObj, userName, userId, date);
			} else if (role.equals("ROLE_MICROBIOLOGIST")) {
				handleRoleMicrobiologist(reportObj, userName, userId, date);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only chemist or microbiologist can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save the report object
			savedReportObj = rawCottenAnalysisRepo.save(reportObj);

			// Save the history and send emails
			saveAuditTrackAndSendEmail(savedReportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Raw Cotton Analysis Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Raw Cotton Analysis Report"), HttpStatus.BAD_REQUEST);
		}

		// Return the saved object as a response
		return new ResponseEntity<>(savedReportObj, HttpStatus.OK);
	}




	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRawCottonAnalysisReport(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		RawCottenAnalysisReportARF001 report = new RawCottenAnalysisReportARF001();
		RawCottenAnalysisReportARF001History reportHistory = new RawCottenAnalysisReportARF001History();

		String respStatus;
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = rawCottenAnalysisRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = rawCottenAnalysisRepoHistory.fetchLastSubmittedRecordMillBatchNo(report.getMillBatchNo());
			if (reportHistory == null) {
				reportHistory = new RawCottenAnalysisReportARF001History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id");

			// Get statuses
			String chemistStatus = report.getChemist_status();
			String microbiologistStatus = report.getMicrobiologist_status();
			String qcStatus = report.getQc_status();

			if (chemistStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted) && microbiologistStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted)&&qcStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.QCApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);

						// Update history
						reportHistory.setQc_status(AppConstantsQc.QCApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);


					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.QCRejected);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCRejected);
						//	                    report.setChemist_status(AppConstantsQc.chemistSave);   
						//	                    report.setMicrobiologist_status(AppConstantsQc.microBiologistSave);

						// Update history
						reportHistory.setQc_status(AppConstantsQc.QCRejected);
						reportHistory.setReason(reason);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setQc_sign(userName);
						//	                    reportHistory.setChemist_status(AppConstantsQc.chemistSave);
						//	                    reportHistory.setMicrobiologist_status(AppConstantsQc.microBiologistSave);

					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					rawCottenAnalysisRepo.save(report);
					rawCottenAnalysisRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}

					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.QAApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);

						// Update history
						reportHistory.setQc_status(AppConstantsQc.QAApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);


					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.QAReject);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);
						//	                    report.setChemist_status(AppConstantsQc.chemistSave);   
						//	                    report.setMicrobiologist_status(AppConstantsQc.microBiologistSave);


						// Update history
						reportHistory.setQc_status(AppConstantsQc.QAReject);
						reportHistory.setReason(reason);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setChemist_status(AppConstantsQc.chemistSave);
						reportHistory.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					rawCottenAnalysisRepo.save(report);
					rawCottenAnalysisRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase("QA_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}

					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}
				else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Chemist or Microbiologist status is not correct"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Raw Cotton: " + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getRawCottonAnalysisReportByFormatNo(String formatNo) {
		try {

			List<RawCottenAnalysisReportARF001> listOfRawCottonAnalysisReport = rawCottenAnalysisRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfRawCottonAnalysisReport == null) {

				listOfRawCottonAnalysisReport = new ArrayList<RawCottenAnalysisReportARF001>();
			}

			return new ResponseEntity<>(listOfRawCottonAnalysisReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Raw Cotton Analysis Report By Format No details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getRawCottonAnalysisReportByMillBatchNo(String millBatchNo) {
		try {

			List<RawCottenAnalysisReportARF001> listOfRawCottonAnalysisRep = rawCottenAnalysisRepo.findByMillBatchNo(millBatchNo);

			return new ResponseEntity<>(listOfRawCottonAnalysisRep, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Bleaching Raw Cotton Contamination Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getRawCottonAnalysisReportById(Long id) {
		try {

			Optional<RawCottenAnalysisReportARF001> response = rawCottenAnalysisRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Raw Cotton Analysis Report Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllRawCottonAnalysisReport() {
		SCAUtil sca = new SCAUtil();

		try {

			List<RawCottenAnalysisReportARF001> listOfRawCottonAnalysisRepo = rawCottenAnalysisRepo.findAll();

			if (listOfRawCottonAnalysisRepo == null) {

				listOfRawCottonAnalysisRepo = new ArrayList<RawCottenAnalysisReportARF001>();
			}

			return new ResponseEntity(listOfRawCottonAnalysisRepo, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Raw Cotton Analysis Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Raw Cotton Analysis Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAllChemistAndMicroNotSubmittedF001() {
		SCAUtil sca = new SCAUtil();


		try {

			List<RawCottenAnalysisReportARF001> listOfRawCottenAnalysisRep = rawCottenAnalysisRepo
					.findByChemistOrMicroStatusSavedAndNotApproved();

			if (listOfRawCottenAnalysisRep == null) {

				listOfRawCottenAnalysisRep = new ArrayList<RawCottenAnalysisReportARF001>();
			}

			return new ResponseEntity(listOfRawCottenAnalysisRep, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Chemist and Micro Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Chemist and Micro Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllQcNotSubmittedF001() {
		SCAUtil sca = new SCAUtil();

		try {

			List<RawCottenAnalysisReportARF001> listOfRawCottenAnalysisRepo = rawCottenAnalysisRepo
					.findByChemistAndMicroStatusSubmittedAndQcStatusNotApproved();

			if (listOfRawCottenAnalysisRepo == null) {

				listOfRawCottenAnalysisRepo = new ArrayList<RawCottenAnalysisReportARF001>();
			}

			return new ResponseEntity(listOfRawCottenAnalysisRepo, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateDetailsF001(String date,String millBatchNo) {
		SCAUtil sca = new SCAUtil();

		try {

			List<RawCottenAnalysisReportARF001> listOfRawCottenAnalysisRepo = rawCottenAnalysisRepo.findByDateNewF001(date,millBatchNo);

			return new ResponseEntity(listOfRawCottenAnalysisRepo, HttpStatus.OK);

		} catch (Exception e) {

			log.error("***************** Unable to get List Of All details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getPdeDataARF001(String PH) {
		List<TblsupPayloadRawCottonAnalysis> response = new ArrayList<>();

		try {
			response = rawCottenAnalysisRepo.fetchPdeData(PH);


		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Unable to get Raw Cotton Analysis PDE data : " + msg);

			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Raw Cotton Analysis Details: " + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	public List<RawCottonFetchBatchNo> getBatchNosByLaydownNo(String laydownNo) {
		try {
			return rawCottenAnalysisRepo.FetchRawCottonBatchNo(laydownNo);
		} catch (Exception ex) {
			throw new RuntimeException("Error fetching batch numbers for laydownNo: " + laydownNo, ex);
		}
	}

	public ResponseEntity<?> getRawCottonAnalysisReportByMillBatchNoPrint(String millBatchNo) {
		try {

			List<RawCottenAnalysisReportARF001> listOfRawCottonAnalysisRep = rawCottenAnalysisRepo.findByMillBatchNoForPrint(millBatchNo);

			return new ResponseEntity<>(listOfRawCottonAnalysisRep, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Bleaching Raw Cotton Contamination Details For Print : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}



	public ResponseEntity<?> getBatchNumbersForLast45Days() {
		List<IdAndValuePair> response = new ArrayList<>();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

		try {
			// Fetch all batch numbers and their dates
			List<Object[]> records = rawCottenAnalysisRepo.fetchAllBatchNumbersAndDates();

			// Filter records based on the last 45 days
			LocalDate now = LocalDate.now();
			LocalDate date45DaysAgo = now.minusDays(45);

			// Counter for IDs starting from 1
			final int[] counter = {1}; // Start the counter at 1

			// Fetch only batch numbers from the last 45 days
			response = records.stream()
					.filter(record -> {
						String dateString = (String) record[1]; // Assuming the second column is the date
						LocalDate recordDate = LocalDate.parse(dateString, formatter);
						return !recordDate.isBefore(date45DaysAgo) && !recordDate.isAfter(now); // Ensure the date is within the last 45 days
					})
					.map(record -> {
						IdAndValuePair pair = new IdAndValuePair();
						pair.setValue((String) record[0]); // Assuming the first column is the batch number
						pair.setId((long) counter[0]++); // Incrementing ID for each entry
						return pair;
					})
					.distinct() // Optional: to ensure unique pairs
					.collect(Collectors.toList());

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Unable to get Batch Numbers for the last 45 days: ", ex);

			return new ResponseEntity<>(new ApiResponse(false, "Failed to fetch Batch Numbers: " + msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	public ResponseEntity<?> getRawCottonAnalysisReportByMillBatchNoCompleteApproval(String millBatchNo) {
		try {

			List<RawCottenAnalysisReportARF001> listOfRawCottonAnalysisRep = rawCottenAnalysisRepo.findByMillBatchNoFinalApproval(millBatchNo);

			return new ResponseEntity<>(listOfRawCottonAnalysisRep, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Bleaching Raw Cotton Contamination Details: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}




	//--------------------------------------CHEMICAL ANALYSIS REPORT PH-QCL01-AR-F-003----------------------------------------------------------------	

	@Transactional
	public ResponseEntity<?> saveChemicalAnalysisReport(ChemicalAnalysisReportARF003 chemicalAnalysisReport, HttpServletRequest http) {
		if (chemicalAnalysisReport == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		ChemicalAnalysisReportARF003 savedReport = null;

		try {
			//	        validateChemicalReport(chemicalAnalysisReport);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (role.equals("ROLE_CHEMIST")) {
				chemicalAnalysisReport.setChemist_saved_by(userName);
				chemicalAnalysisReport.setChemist_saved_on(date);
				chemicalAnalysisReport.setChemist_saved_id(userId);
				chemicalAnalysisReport.setChemist_status(AppConstantsQc.chemistSave);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save the report
			if (chemicalAnalysisReport.getId() != null) {
				savedReport = chemicalAnalysisRepo.findById(chemicalAnalysisReport.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(chemicalAnalysisReport, savedReport, getIgnoredPropertiesARF003());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport= chemicalAnalysisRepo.save(savedReport);
			} else {
				savedReport = chemicalAnalysisRepo.save(chemicalAnalysisReport);
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Chemical Analysis Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Chemical Analysis Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}



	@Transactional
	public ResponseEntity<?> submitChemicalAnalysisReport(ChemicalAnalysisReportARF003 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}
		ChemicalAnalysisReportARF003 reportObj;
		try {


			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());



			// Check if the report has an ID and exists in the database
			if (report.getId() != null) {
				reportObj = chemicalAnalysisRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update existing record, retaining some of the original properties
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);	
			} else {
				// Create a new report if no ID exists
				reportObj = new ChemicalAnalysisReportARF003();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}

			// Copy the properties from the provided report to the reportObj (excluding ignored properties)
			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesARF003());

			// Set chemist-specific fields if the user has the right role
			if (role.equals("ROLE_CHEMIST")) {
				reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				reportObj.setChemist_submit_on(date);
				reportObj.setChemist_submit_by(userName);
				reportObj.setChemist_submit_id(userId);
				reportObj.setChemist_sign(userName);
				reportObj.setQc_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				if (reportObj.getQc_sign() != null && !reportObj.getQc_sign().isEmpty()) {
					reportObj.setQc_sign("");
				}
				if (reportObj.getQc_submit_by()!= null && !reportObj.getQc_submit_by().isEmpty()) {
					reportObj.setQc_submit_by("");
				}
				if (reportObj.getQc_submit_id() != null) {
					reportObj.setQc_submit_id(null);
				}
				if (reportObj.getQc_submit_on()!= null) {
					reportObj.setQc_submit_on(null);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only chemist can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report in the database
			reportObj= chemicalAnalysisRepo.save(reportObj);

			// Additional actions like audit tracking and email sending can be added here
			saveAuditTrackAndSendEmailARF003(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Chemical Analysis Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Chemical Analysis Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveChemicalAnalysisReport(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		ChemicalAnalysisReportARF003 report = new ChemicalAnalysisReportARF003();
		ChemicalAnalysisReportARF003History reportHistory = new ChemicalAnalysisReportARF003History();

		String respStatus;
		String userRole = getUserRole();
		System.out.println("user role : "+userRole);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = chemicalAnalysisRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = chemicalAnalysisRepoHistory.fetchLastSubmittedRecordMaterialDocNo(report.getMaterialDocNo());
			if (reportHistory == null) {
				reportHistory = new ChemicalAnalysisReportARF003History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id");

			// Get statuses
			String chemistStatus = report.getChemist_status();
			String qcStatus = report.getQc_status();

			if (chemistStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)&&qcStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.QCApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);
						// Update history
						reportHistory.setQc_status(AppConstantsQc.QCApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.QCRejected);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCRejected);


						// Update history
						reportHistory.setQc_status(AppConstantsQc.QCRejected);
						reportHistory.setReason(reason);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setQc_sign(userName);
						reportHistory.setMail_status(AppConstantsQc.QCRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					chemicalAnalysisRepo.save(report);
					chemicalAnalysisRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.QAApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);
						// Update history
						reportHistory.setQc_status(AppConstantsQc.QAApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.QAReject);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);


						// Update history
						reportHistory.setQc_status(AppConstantsQc.QAReject);
						reportHistory.setReason(reason);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setQc_sign(userName);
						reportHistory.setMail_status(AppConstantsQc.QAReject);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					chemicalAnalysisRepo.save(report);
					chemicalAnalysisRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase("QA_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}
				else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Access Denied For This Role"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Raw Cotton: Chemical Analysis Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getChemicalAnalysisReportByFormatNo(String formatNo) {
		try {

			List<ChemicalAnalysisReportARF003> listOfChemicalAnalysisReport = chemicalAnalysisRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfChemicalAnalysisReport == null) {

				listOfChemicalAnalysisReport = new ArrayList<ChemicalAnalysisReportARF003>();
			}

			return new ResponseEntity<>(listOfChemicalAnalysisReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting All Chemical Analysis Report ARF003 Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getChemicalAnalysisReportByMaterialDocNo(String materialDocNo) {
		try {

			List<ChemicalAnalysisReportARF003> listOfChemicalAnalysisRep = chemicalAnalysisRepo.findByMaterialDocNo(materialDocNo);

			if (listOfChemicalAnalysisRep == null || listOfChemicalAnalysisRep.isEmpty()) {
				return new ResponseEntity<>("No Data Found" , HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfChemicalAnalysisRep, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Chemical Analysis Report Details By Material Doc No: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getChemicalAnalysisReportById(Long id) {
		try {

			Optional<ChemicalAnalysisReportARF003> response = chemicalAnalysisRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Chemical Analysis Report Details By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllChemicalAnalysisReport() {
		SCAUtil sca = new SCAUtil();

		try {

			List<ChemicalAnalysisReportARF003> listOfChemicalAnalysisRepo = chemicalAnalysisRepo.findAll();

			if (listOfChemicalAnalysisRepo == null) {

				listOfChemicalAnalysisRepo = new ArrayList<ChemicalAnalysisReportARF003>();
			}

			return new ResponseEntity(listOfChemicalAnalysisRepo, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Chemical Analysis Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Chemical Analysis Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAllChemistNotSubmittedF003() {
		SCAUtil sca = new SCAUtil();


		try {

			List<ChemicalAnalysisReportARF003> listOfChemicalAnalysisRep = chemicalAnalysisRepo
					.findByChemistStatusSavedAndNotApproved();

			if (listOfChemicalAnalysisRep == null) {

				listOfChemicalAnalysisRep = new ArrayList<ChemicalAnalysisReportARF003>();
			}

			return new ResponseEntity(listOfChemicalAnalysisRep, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Chemist Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Chemist Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllQcNotSubmittedF003() {
		SCAUtil sca = new SCAUtil();

		try {

			List<ChemicalAnalysisReportARF003> listOfChemicalAnalysisRep = chemicalAnalysisRepo
					.findByChemistStatusSubmittedAndHodStatusNotApproved();

			if (listOfChemicalAnalysisRep == null) {

				listOfChemicalAnalysisRep = new ArrayList<ChemicalAnalysisReportARF003>();
			}

			return new ResponseEntity(listOfChemicalAnalysisRep, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getByDateDetailsF003(String date,String materialDocNo) {
		SCAUtil sca = new SCAUtil();

		try {

			List<ChemicalAnalysisReportARF003> listOfChemicalAnalysisRepo = chemicalAnalysisRepo.findByDateF003(date,materialDocNo);

			return new ResponseEntity(listOfChemicalAnalysisRepo, HttpStatus.OK);

		} catch (Exception e) {

			log.error("***************** Unable to get List Of All details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(new ApiResponse(false, "Unable to get List Of All details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getChemicalAnalysisReportForPrint(String materialDocNo) {
		try {

			List<ChemicalAnalysisReportARF003> listOfChemicalAnalysisRep = chemicalAnalysisRepo.findByMaterialDocNoForPrint(materialDocNo);

			if (listOfChemicalAnalysisRep == null || listOfChemicalAnalysisRep.isEmpty()) {
				return new ResponseEntity<>("No data found for Material Doc No: " + materialDocNo, HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfChemicalAnalysisRep, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Chemical Analysis Report Details By Material Doc No For Print: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}


//	public ResponseEntity<?> getPdeData() {
//		List<TblsupPayloadChemicalAnalysis> response = new ArrayList<>();
//
//		try {
//			response = chemicalAnalysisRepo.fetchPdeData();
//
//
//		} catch (Exception ex) {
//			String msg = ex.getMessage();
//			log.error("Unable to get Chemical Analysis Details: " + msg);
//
//			return new ResponseEntity<>(new ApiResponse(false, "Failed to get Chemical Analysis Details: " + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity<>(response, HttpStatus.OK);
//	}
	
	public ResponseEntity<?> getPdeData() {
	    List<TblsupPayloadChemicalAnalysisDTO> response = new ArrayList<>();

	    try {
	        List<Object[]> results = chemicalAnalysisRepo.fetchPdeData();

	        int idCounter = 1;
	        for (Object[] result : results) {
	            TblsupPayloadChemicalAnalysisDTO dto = new TblsupPayloadChemicalAnalysisDTO();
	            dto.setId(idCounter++);  // Set incrementing ID
	            dto.setBatchNo((String) result[0]);
	            dto.setSuplier((String) result[1]);
	            dto.setMatDec((String) result[2]);
	            dto.setMatDoc((String) result[3]);

	            response.add(dto);
	        }

	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        log.error("Unable to get Chemical Analysis Details: " + msg);

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to get Chemical Analysis Details: " + msg),
	                HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	// AMC

		public ResponseEntity<?> getChemicalData(String chemical) {

			try {

				List<Object[]> rawList = chemicalAnalysisRepo.fetchChemicalData(chemical);

				if (rawList.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(false, "No chemical data found"), HttpStatus.NOT_FOUND);
				}

				Object[] row = rawList.get(0);

				ChemicalDetailsDTO dto = new ChemicalDetailsDTO();

				dto.setId(((Number) row[0]).longValue()); // id
				dto.setChemical((String) row[1]);
				dto.setColour((String) row[2]);
				dto.setOdour((String) row[3]);
				dto.setAppearance((String) row[4]);
				dto.setPh((String) row[5]);
				dto.setPurity((String) row[6]);
				dto.setRelativeDensity((String) row[7]);
				dto.setSolubilityInwater((String) row[8]);
				dto.setSpecificGravity((String) row[9]);
				dto.setTotalSolids((String) row[10]);
				dto.setVisualInsolubleImpurity((String) row[11]);

				return new ResponseEntity<>(dto, HttpStatus.OK);

			} catch (Exception ex) {
				String msg = ex.getMessage();
				log.error("Unable to get Chemical Analysis Details: " + msg);

				return new ResponseEntity<>(new ApiResponse(false, "Failed to get Chemical Analysis Details: " + msg),
						HttpStatus.BAD_REQUEST);
			}

		}



	//---------------------------------------SAMPLE_INWARD_BOOK FOR FORMS F001,F002,F003------------------------------------------------------	

	@Transactional
	public ResponseEntity<?> saveSampleInwardBook(SampleInwardBookF001_F002_F003 sampleInwardBook, HttpServletRequest http) {
		if (sampleInwardBook == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		SampleInwardBookF001_F002_F003 savedReport = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Validate and set role-specific fields
			if (sampleInwardBook.getFormatNo().equalsIgnoreCase("PH-QCL01/F-001")) {

				if (role.equals("ROLE_CHEMIST")) {
					sampleInwardBook.setChemist_saved_by(userName);
					sampleInwardBook.setChemist_saved_on(date);
					sampleInwardBook.setChemist_saved_id(userId);
					sampleInwardBook.setChemist_status(AppConstantsQc.chemistSave);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
				}

			} else if (sampleInwardBook.getFormatNo().equalsIgnoreCase("PH-QCL01/F-002")) {

				if (role.equals("ROLE_MICROBIOLOGIST")) {
					sampleInwardBook.setMicrobiologist_saved_by(userName);
					sampleInwardBook.setMicrobiologist_saved_on(date);
					sampleInwardBook.setMicrobiologist_saved_id(userId);
					sampleInwardBook.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
				}

			} else if (sampleInwardBook.getFormatNo().equalsIgnoreCase("PH-QCL01/F-003")) {

				if (role.equals("ROLE_ETP") || role.equals("ROLE_CHEMIST")) {
					sampleInwardBook.setEtp_saved_by(userName);
					sampleInwardBook.setEtp_saved_on(date);
					sampleInwardBook.setEtp_saved_id(userId);
					sampleInwardBook.setEtp_status(AppConstantsQc.EtpSave);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
				}
			}

			// Save the parent entity first
			if (sampleInwardBook.getId() != null) {
				// If parent entity exists, update it
				savedReport = sampleInwardBookRepo.findById(sampleInwardBook.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(sampleInwardBook, savedReport, getIgnoredPropertiesSampleInwardBook());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport = sampleInwardBookRepo.save(savedReport); // Save updated parent
			} else {
				// If parent entity is new, save it first to get an ID
				sampleInwardBook.setCreatedAt(date);
				sampleInwardBook.setCreatedBy(userName);
				savedReport = sampleInwardBookRepo.save(sampleInwardBook);
			}

			// Save or update child entities
			if (sampleInwardBook.getDetails() != null) {
				for (SampleInwardBookDetail detail : sampleInwardBook.getDetails()) {
					if (detail.getId() != null) {
						// If child entity exists, update it
						SampleInwardBookDetail existingDetail = sampleInwardBookDetailRepo.findFormById(detail.getId());
						if (existingDetail != null) {
							BeanUtils.copyProperties(detail, existingDetail, "id", "parentId");
							existingDetail.setUpdatedAt(date);
							existingDetail.setUpdatedBy(userName);
							sampleInwardBookDetailRepo.save(existingDetail); // Save updated child
						} else {
							throw new RuntimeException("Detail not found");
						}
					} else {
						// If child entity is new, set parent ID and save it
						detail.setParentId(savedReport.getId());
						sampleInwardBookDetailRepo.save(detail); // Save new child
					}
				}
			}	

		} catch (Exception ex) {
			log.error("**** Unable to save Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}



	@Transactional
	public ResponseEntity<?> submitSampleInwardBook(SampleInwardBookF001_F002_F003 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		SampleInwardBookF001_F002_F003 reportObj = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Create new or retrieve existing report object
			if (report.getId() != null) {
				reportObj = sampleInwardBookRepo.findById(report.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
			} else {
				reportObj = new SampleInwardBookF001_F002_F003();  // Create a new entity if no ID is provided
			}

			// Validate and update the parent entity based on format
			if (report.getFormatNo().equalsIgnoreCase("PH-QCL01/F-001")) {
				//	            validateSampleInwardBookF001(report);
				if (!role.equals("ROLE_CHEMIST")) {
					return new ResponseEntity<>(new ApiResponse(false, "Only chemist can submit details"), HttpStatus.BAD_REQUEST);
				}
				reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				reportObj.setChemist_submit_on(date);
				reportObj.setChemist_submit_by(userName);
				reportObj.setChemist_submit_id(userId);
				reportObj.setChemist_sign(userName);
				reportObj.setMail_status(AppConstantsQc.chemistSubmitted);


			} else if (report.getFormatNo().equalsIgnoreCase("PH-QCL01/F-002")) {
				//	            validateSampleInwardBookF002(report);
				if (!role.equals("ROLE_MICROBIOLOGIST")) {
					return new ResponseEntity<>(new ApiResponse(false, "Only microbiologist can submit details"), HttpStatus.BAD_REQUEST);
				}
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setMail_status(AppConstantsQc.microBiologistSubmitted);

			} else if (report.getFormatNo().equalsIgnoreCase("PH-QCL01/F-003")) {
				//	            validateSampleInwardBookF003(report);
				if (role.equals("ROLE_ETP") || role.equals("ROLE_CHEMIST")) {
//					return new ResponseEntity<>(new ApiResponse(false, "Only ETP can submit details"), HttpStatus.BAD_REQUEST);
//				}
				reportObj.setEtp_status(AppConstantsQc.EtpSubmitted);
				reportObj.setEtp_submit_on(date);
				reportObj.setEtp_submit_by(userName);
				reportObj.setEtp_submit_id(userId);
				reportObj.setEtp_sign(userName);
				reportObj.setMail_status(AppConstantsQc.EtpSubmitted);

			}} else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid format number"), HttpStatus.BAD_REQUEST);
			}
				

			// Set created or updated timestamps
			if (reportObj.getId() != null) {
				reportObj.setUpdatedBy(userName);
				reportObj.setUpdatedAt(date);
			} else {
				reportObj.setCreatedAt(date);
				reportObj.setCreatedBy(userName);
			}
			if(report.getId() != null) {
				// Copy properties, excluding 'id' and 'details'
				BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesSampleInwardBookSubmit());

			}else {
				BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesSampleInwardBookSave());				
			}

			// Save the parent entity
			reportObj = sampleInwardBookRepo.save(reportObj);

			// Handle child entities
			if (report.getDetails() != null) {
				List<SampleInwardBookDetail> updatedDetails = new ArrayList<>();

				for (SampleInwardBookDetail detail : report.getDetails()) {
					if (detail.getId() == null) {
						detail.setParentId(reportObj.getId()); // Set parent ID for new entities
						updatedDetails.add(detail);
					} else {
						SampleInwardBookDetail existingDetail = sampleInwardBookDetailRepo.findById(detail.getId())
								.orElseThrow(() -> new RuntimeException("Detail not found with id: " + detail.getId()));

						entityManager.detach(existingDetail);

						// Manually update existing detail fields
						existingDetail.setShift(detail.getShift());
						existingDetail.setDescriptionOfMaterial(detail.getDescriptionOfMaterial());
						existingDetail.setQuantity(detail.getQuantity());
						existingDetail.setBmrNo(detail.getBmrNo());
						existingDetail.setUom(detail.getUom());
						existingDetail.setSampleGivenBy(detail.getSampleGivenBy());
						existingDetail.setSampleReceivedBy(detail.getSampleReceivedBy());
						existingDetail.setRemark(detail.getRemark());
						updatedDetails.add(existingDetail);
					}
				}

				// Save all child entities (new and updated)
				sampleInwardBookDetailRepo.saveAll(updatedDetails);
			}

			// Save audit track and send email
			saveAuditTrackAndSendEmailSampleInwardBookF1F2F3(reportObj, role);

		 }   catch (Exception ex) {
			log.error("**** Unable to Submit Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.OK);
	}




	public ResponseEntity<?> getSampleInwardBookByFormatNo(String formatNo) {
		try {

			List<SampleInwardBookF001_F002_F003> listOfsampleInwardBookRepo = sampleInwardBookRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfsampleInwardBookRepo == null) {

				listOfsampleInwardBookRepo = new ArrayList<SampleInwardBookF001_F002_F003>();
			}

			return new ResponseEntity<>(listOfsampleInwardBookRepo, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting list Of sample InwardBook Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getSampleInwardBookByDateF001(String dateF001) {
		try {

			List<SampleInwardBookF001_F002_F003> listOfsampleInwardBookRepo = sampleInwardBookRepo.findByDateF001(dateF001);

			return new ResponseEntity<>(listOfsampleInwardBookRepo, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting sample InwardBook Form's By DateF001: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSampleInwardBookByDateF002(String dateF002) {
		try {

			List<SampleInwardBookF001_F002_F003> listOfsampleInwardBookRepo = sampleInwardBookRepo.findByDateF002(dateF002);

			return new ResponseEntity<>(listOfsampleInwardBookRepo, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting sample InwardBook Form's By DateF002: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSampleInwardBookByDateF003(String dateF003) {
		try {

			List<SampleInwardBookF001_F002_F003> listOfsampleInwardBookRepo = sampleInwardBookRepo.findByDateF003(dateF003);

			return new ResponseEntity<>(listOfsampleInwardBookRepo, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting sample InwardBook Form's By DateF003: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSampleInwardBookById(Long id) {
		try {

			Optional<SampleInwardBookF001_F002_F003> response = sampleInwardBookRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting sample InwardBook Form's By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllSampleInwardBook() {
		SCAUtil sca = new SCAUtil();

		try {
			List<SampleInwardBookF001_F002_F003> listOfSampleInwardBookRepo = sampleInwardBookRepo.findAll();

			if (listOfSampleInwardBookRepo == null) {
				listOfSampleInwardBookRepo = new ArrayList<>();
			}

			// Group the entries by formatNo
			Map<String, List<SampleInwardBookF001_F002_F003>> groupedByFormatNo = listOfSampleInwardBookRepo.stream()
					.collect(Collectors.groupingBy(SampleInwardBookF001_F002_F003::getFormatNo));

			return new ResponseEntity<>(groupedByFormatNo, HttpStatus.OK);

		} catch (Exception e) {
			log.error("***************** Unable to get List Of All Sample InwardBook Form's!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get List Of All Sample InwardBook Form's!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllChemistNotSubmittedSampleInwardBook() {
		SCAUtil sca = new SCAUtil();

		try {
			// Fetching the records where chemist status is saved but not approved
			List<SampleInwardBookF001_F002_F003> listOfSampleInwardBookRepo = sampleInwardBookRepo
					.findByChemistStatusSavedAndNotApproved();

			if (listOfSampleInwardBookRepo == null) {
				listOfSampleInwardBookRepo = new ArrayList<>();
			}

			// Group the entries by formatNo
			Map<String, List<SampleInwardBookF001_F002_F003>> groupedByFormatNo = listOfSampleInwardBookRepo.stream()
					.collect(Collectors.groupingBy(SampleInwardBookF001_F002_F003::getFormatNo));

			return new ResponseEntity<>(groupedByFormatNo, HttpStatus.OK);

		} catch (Exception e) {
			log.error("***************** Unable to get List Of All Sample InwardBook Form's!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get List Of All Sample InwardBook Form's!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllMicroNotSubmittedSampleInwardBook() {
		SCAUtil sca = new SCAUtil();

		try {
			// Fetching the records where chemist status is saved but not approved
			List<SampleInwardBookF001_F002_F003> listOfSampleInwardBookRepo = sampleInwardBookRepo
					.findByMicroStatusSavedAndNotApproved();

			if (listOfSampleInwardBookRepo == null) {
				listOfSampleInwardBookRepo = new ArrayList<>();
			}

			// Group the entries by formatNo
			Map<String, List<SampleInwardBookF001_F002_F003>> groupedByFormatNo = listOfSampleInwardBookRepo.stream()
					.collect(Collectors.groupingBy(SampleInwardBookF001_F002_F003::getFormatNo));

			return new ResponseEntity<>(groupedByFormatNo, HttpStatus.OK);

		} catch (Exception e) {
			log.error("***************** Unable to get List Of All Sample InwardBook Form's!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get List Of All Sample InwardBook Form's!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getMicroSampleInwardBookForPrint(String formatNo, String date, String month, String year) {

		try {
			// Set variables to null if they are empty strings
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<SampleInwardBookF001_F002_F003> listOfSampleInwardBookRepo = null;

			// Check the format number and call the appropriate repository method
			if (formatNo.equalsIgnoreCase("PH-QCL01/F-001")) {
				listOfSampleInwardBookRepo = sampleInwardBookRepo.findByDateF001MonthYearForPrint(date, month, year);    
			} else if (formatNo.equalsIgnoreCase("PH-QCL01/F-002")) {
				listOfSampleInwardBookRepo = sampleInwardBookRepo.findByDateF002MonthYearForPrint(date, month, year);
			} else if (formatNo.equalsIgnoreCase("PH-QCL01/F-003")) {
				listOfSampleInwardBookRepo = sampleInwardBookRepo.findByDateF003MonthYearForPrint(date, month, year);
			}

			return new ResponseEntity<>(listOfSampleInwardBookRepo, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Inward Book Form's By the given parameters: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}



	//---------------------------------SWAB MICROBIOLOGICAL ANALYSIS FOR FORMS AR-F008,AR-F009,AR-F010-------------------------------------------------------------------------

	@Transactional
	public ResponseEntity<?> saveSwabMicrobiologicalAnalysis(SwabMicrobiologicalAnalysisARF008_009_010 swabMicroAnalysis, HttpServletRequest http) {
		if (swabMicroAnalysis == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		SwabMicrobiologicalAnalysisARF008_009_010 savedReport = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Validate and set role-specific fields
			if (swabMicroAnalysis.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-008")) {
				//	        	validateSwabMicroARF008(swabMicroAnalysis);

				if (role.equals("ROLE_MICROBIOLOGIST")) {
					swabMicroAnalysis.setMicrobiologist_saved_by(userName);
					swabMicroAnalysis.setMicrobiologist_saved_on(date);
					swabMicroAnalysis.setMicrobiologist_saved_id(userId);
					swabMicroAnalysis.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
				}

			} else if (swabMicroAnalysis.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-009")) {
				//	        	validateSwabMicroARF009(swabMicroAnalysis);

				if (role.equals("ROLE_MICROBIOLOGIST")) {
					swabMicroAnalysis.setMicrobiologist_saved_by(userName);
					swabMicroAnalysis.setMicrobiologist_saved_on(date);
					swabMicroAnalysis.setMicrobiologist_saved_id(userId);
					swabMicroAnalysis.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
				}

			} else if (swabMicroAnalysis.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-010")) {
				//	        	validateSwabMicroARF010(swabMicroAnalysis);

				if (role.equals("ROLE_MICROBIOLOGIST")) {
					swabMicroAnalysis.setMicrobiologist_saved_by(userName);
					swabMicroAnalysis.setMicrobiologist_saved_on(date);
					swabMicroAnalysis.setMicrobiologist_saved_id(userId);
					swabMicroAnalysis.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
				}
			}else {
				return new ResponseEntity<>(new ApiResponse(false, swabMicroAnalysis.getFormatNo() + " access denied for this format no"), HttpStatus.BAD_REQUEST);
			}

			// Save the parent entity first
			if (swabMicroAnalysis.getId() != null) {
				// If parent entity exists, update it
				savedReport = SwabMicroAnalysisRepo.findById(swabMicroAnalysis.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(swabMicroAnalysis, savedReport, getIgnoredPropertiesSwabMicroAnalysisSave());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport = SwabMicroAnalysisRepo.save(savedReport); // Save updated parent
			} else {
				// If parent entity is new, save it first to get an ID
				swabMicroAnalysis.setCreatedAt(date);
				swabMicroAnalysis.setCreatedBy(userName);
				savedReport = SwabMicroAnalysisRepo.save(swabMicroAnalysis);
			}

			if (swabMicroAnalysis.getDetails() != null) {
				for (SwabMicrobiologicalDetails detail : swabMicroAnalysis.getDetails()) {
					if (detail.getId() != null) {
						// If child entity exists, update it
						SwabMicrobiologicalDetails existingDetail = SwabMicroDetailsRepo.findFormById(detail.getId());
						if (existingDetail != null) {
							BeanUtils.copyProperties(detail, existingDetail, "id", "parentId");
							existingDetail.setUpdatedAt(date);
							existingDetail.setUpdatedBy(userName);
							SwabMicroDetailsRepo.save(existingDetail); // Save updated child
						} else {
							throw new RuntimeException("Detail not found");
						}
					} else {
						// If child entity is new, set parent ID and save it
						detail.setTestedBy(userName);
						detail.setParentId(savedReport.getId());
						SwabMicroDetailsRepo.save(detail); // Save new child
					}
				}
			}	

		} catch (Exception ex) {
			log.error("**** Unable to save Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}

	@Transactional
	public ResponseEntity<?> submitSwabMicrobiologicalAnalysis(SwabMicrobiologicalAnalysisARF008_009_010 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		SwabMicrobiologicalAnalysisARF008_009_010 reportObj = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Retrieve or create the parent entity
			reportObj = report.getId() != null
					? SwabMicroAnalysisRepo.findById(report.getId())
							.orElseThrow(() -> new RuntimeException("Report not found"))
							: new SwabMicrobiologicalAnalysisARF008_009_010();

			// Validate and update the parent entity based on format
			if (report.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-008")) {
				//	        	validateSwabMicroARF008(report);
				if (!role.equals("ROLE_MICROBIOLOGIST")) {
					return new ResponseEntity<>(new ApiResponse(false, "Only microbiologist can submit details"), HttpStatus.BAD_REQUEST);
				}
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setQc_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				if (reportObj.getQc_sign() != null && !reportObj.getQc_sign().isEmpty()) {
					reportObj.setQc_sign("");
				}
				if (reportObj.getQc_submit_by()!= null && !reportObj.getQc_submit_by().isEmpty()) {
					reportObj.setQc_submit_by("");
				}
				if (reportObj.getQc_submit_id() != null) {
					reportObj.setQc_submit_id(null);
				}
				if (reportObj.getQc_submit_on()!= null) {
					reportObj.setQc_submit_on(null);
				}

			} else if (report.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-009")) {
				//	        	validateSwabMicroARF009(report);
				if (!role.equals("ROLE_MICROBIOLOGIST")) {
					return new ResponseEntity<>(new ApiResponse(false, "Only microbiologist can submit details"), HttpStatus.BAD_REQUEST);
				}
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setQc_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				if (reportObj.getQc_sign() != null && !reportObj.getQc_sign().isEmpty()) {
					reportObj.setQc_sign("");
				}
				if (reportObj.getQc_submit_by()!= null && !reportObj.getQc_submit_by().isEmpty()) {
					reportObj.setQc_submit_by("");
				}
				if (reportObj.getQc_submit_id() != null) {
					reportObj.setQc_submit_id(null);
				}
				if (reportObj.getQc_submit_on()!= null) {
					reportObj.setQc_submit_on(null);
				}

			} else if (report.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-010")) {
				//	        	validateSwabMicroARF010(report);
				if (!role.equals("ROLE_MICROBIOLOGIST")) {
					return new ResponseEntity<>(new ApiResponse(false, "Only microbiologist can submit details"), HttpStatus.BAD_REQUEST);
				}
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setQc_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				if (reportObj.getQc_sign() != null && !reportObj.getQc_sign().isEmpty()) {
					reportObj.setQc_sign("");
				}
				if (reportObj.getQc_submit_by()!= null && !reportObj.getQc_submit_by().isEmpty()) {
					reportObj.setQc_submit_by("");
				}
				if (reportObj.getQc_submit_id() != null) {
					reportObj.setQc_submit_id(null);
				}
				if (reportObj.getQc_submit_on()!= null) {
					reportObj.setQc_submit_on(null);
				}

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid format number"), HttpStatus.BAD_REQUEST);
			}

			// Copy other properties and save the parent entity
			if (reportObj.getId() != null) {
				// When updating an existing record, preserve created fields
				reportObj.setUpdatedBy(userName);
				reportObj.setUpdatedAt(date);
			} else {
				// When creating a new record
				reportObj.setCreatedAt(date);
				reportObj.setCreatedBy(userName);
			}


			if(report.getId() != null) {
				// Copy properties, excluding 'id' and 'details'
				BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesSwabMicroAnalysisSubmit());

			}else {
				BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesSwabMicroAnalysisSave());				
			}
			reportObj = SwabMicroAnalysisRepo.save(reportObj);

			// Handle child entities
			// Handle child entities
			if (report.getDetails() != null) {
				List<SwabMicrobiologicalDetails> updatedDetails = new ArrayList<>();

				for (SwabMicrobiologicalDetails detail : report.getDetails()) {
					if (detail.getId() == null) {
						// If ID is null, it's a new entity
						detail.setParentId(reportObj.getId()); // Set parent ID in new child entities
						detail.setTestedBy(userName);
						updatedDetails.add(detail); // Add to the list of entities to be saved
					} else {
						// If ID is not null, fetch the existing entity and update it
						SwabMicrobiologicalDetails existingDetail = SwabMicroDetailsRepo.findById(detail.getId())
								.orElseThrow(() -> new RuntimeException("Detail not found with id: " + detail.getId()));

						// Detach the existingDetail from the Hibernate session
						entityManager.detach(existingDetail);

						// Manually update fields from the new detail to the existing one
						existingDetail.setArNumber(detail.getArNumber());
						existingDetail.setLocation(detail.getLocation());
						if (detail.getEmployeeIdNo()!=null){
							existingDetail.setEmployeeIdNo(detail.getEmployeeIdNo());
						}
						existingDetail.setTotalViableCount(detail.getTotalViableCount());;
						existingDetail.setTotalFungalCount(detail.getTotalFungalCount());
						existingDetail.setTestCompletionDate(detail.getTestCompletionDate());	      
						existingDetail.setRemark(detail.getRemark());
						existingDetail.setTestedBy(detail.getTestedBy());
						// Add updated entity to the list
						updatedDetails.add(existingDetail);
					}
				}

				SwabMicroDetailsRepo.saveAll(updatedDetails);
			}


			// Additional actions like audit tracking and email sending
			saveAuditTrackAndSendEmailSwabMicrobiologicalAnalysis(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.OK);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveSwabMicrobiologicalAnalysis(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		SwabMicrobiologicalAnalysisARF008_009_010 report = new SwabMicrobiologicalAnalysisARF008_009_010();
		SwabMicrobiologicalAnalysisARF008_009_010History reportHistory = new SwabMicrobiologicalAnalysisARF008_009_010History();

		String respStatus;
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = SwabMicroAnalysisRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			String formatNo = report.getFormatNo();
			if (formatNo.equalsIgnoreCase("PH-QCL01-AR-F-008") ||
					formatNo.equalsIgnoreCase("PH-QCL01-AR-F-009") ||
					formatNo.equalsIgnoreCase("PH-QCL01-AR-F-010")) {

				// Fetch or create report history
				if (formatNo.equalsIgnoreCase("PH-QCL01-AR-F-008")) {
					reportHistory = SwabMicrAnalysisRepoHistory.fetchLastSubmittedRecordDateF008(report.getSampledDateF008());
				} else if (formatNo.equalsIgnoreCase("PH-QCL01-AR-F-009")) {
					reportHistory = SwabMicrAnalysisRepoHistory.fetchLastSubmittedRecordDateF009(report.getSampledDateF009());
				} else {
					reportHistory = SwabMicrAnalysisRepoHistory.fetchLastSubmittedRecordDateF010(report.getSampledDateF010());
				}
				if (reportHistory == null) {
					reportHistory = new SwabMicrobiologicalAnalysisARF008_009_010History();
				}

				BeanUtils.copyProperties(report, reportHistory, "id", "version","details");

				// Get statuses
				String microStatus = report.getMicrobiologist_status();
				String qcStatus = report.getQc_status();

				if (microStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted) && qcStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
					if (userRole.equalsIgnoreCase("QC_MANAGER")) {
						if (approvalResponse.getStatus().equals("Approve")) {
							report.setQc_status(AppConstantsQc.QCApprove);
							report.setQc_submit_on(date);
							report.setQc_submit_by(userName);
							report.setQc_sign(userName);
							report.setQc_submit_id(userId);
							report.setMail_status(AppConstantsQc.QCApprove);

							reportHistory.setQc_status(AppConstantsQc.QCApprove);
							reportHistory.setQc_submit_on(date);
							reportHistory.setQc_submit_by(userName);
							reportHistory.setQc_sign(userName);
							reportHistory.setQc_submit_id(userId);
							reportHistory.setMail_status(AppConstantsQc.QCApprove);

						} else if (approvalResponse.getStatus().equals("Reject")) {
							String reason = approvalResponse.getRemarks();
							report.setReason(reason);
							report.setQc_status(AppConstantsQc.QCRejected);
							report.setQc_submit_on(date);
							report.setQc_submit_by(userName);
							report.setQc_sign(userName);
							report.setQc_submit_id(userId);
							report.setMail_status(AppConstantsQc.QCRejected);

							reportHistory.setQc_status(AppConstantsQc.QCRejected);
							reportHistory.setQc_submit_on(date);
							reportHistory.setQc_submit_by(userName);
							reportHistory.setQc_sign(userName);
							reportHistory.setQc_submit_id(userId);
							reportHistory.setMail_status(AppConstantsQc.QCRejected);
						} else {
							return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
						}

						//	                    // Set approvedBy in SwabMicrobiologicalDetails and SwabMicrobiologicalDetailsHistory
						//	                    if (report.getDetails() != null) {
						//	                        for (SwabMicrobiologicalDetails detail : report.getDetails()) {
						//	                            detail.setApprovedBy(userName); // Set approvedBy in child
						//	                            SwabMicroDetailsRepo.save(detail); // Save updated detail record
						//	                        }
						//	                    }
						//
						//	                    // Set approvedBy in SwabMicrobiologicalDetailsHistory
						//	                    if (reportHistory.getDetails() != null) {
						//	                        for (SwabMicrobiologicalDetailsHistory detailHistory : reportHistory.getDetails()) {
						//	                            detailHistory.setApprovedBy(userName); // Set approvedBy in history child
						//	                            SwabMicroDetailsRepoHistory.save(detailHistory); // Save history record
						//	                        }
						//	                    }

						SwabMicroAnalysisRepo.save(report);
						SwabMicrAnalysisRepoHistory.save(reportHistory);
						respStatus = report.getQc_status().equalsIgnoreCase(AppConstantsQc.QCApprove) ? "Approved Successfully" : "Rejected Successfully";
						return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
					}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {

						if (approvalResponse.getStatus().equals("Approve")) {
							report.setQc_status(AppConstantsQc.QAApprove);
							report.setQc_submit_on(date);
							report.setQc_submit_by(userName);
							report.setQc_sign(userName);
							report.setQc_submit_id(userId);
							report.setMail_status(AppConstantsQc.QAApprove);

							reportHistory.setQc_status(AppConstantsQc.QAApprove);
							reportHistory.setQc_submit_on(date);
							reportHistory.setQc_submit_by(userName);
							reportHistory.setQc_sign(userName);
							reportHistory.setQc_submit_id(userId);
							reportHistory.setMail_status(AppConstantsQc.QAApprove);

						} else if (approvalResponse.getStatus().equals("Reject")) {
							String reason = approvalResponse.getRemarks();
							report.setReason(reason);
							report.setQc_status(AppConstantsQc.QAReject);
							report.setQc_submit_on(date);
							report.setQc_submit_by(userName);
							report.setQc_sign(userName);
							report.setQc_submit_id(userId);
							report.setMail_status(AppConstantsQc.QAReject);

							reportHistory.setQc_status(AppConstantsQc.QAReject);
							reportHistory.setQc_submit_on(date);
							reportHistory.setQc_submit_by(userName);
							reportHistory.setQc_sign(userName);
							reportHistory.setQc_submit_id(userId);
							reportHistory.setMail_status(AppConstantsQc.QAReject);
						} else {
							return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
						}

						SwabMicroAnalysisRepo.save(report);
						SwabMicrAnalysisRepoHistory.save(reportHistory);
						respStatus = report.getQc_status().equalsIgnoreCase(AppConstantsQc.QAApprove) ? "Approved Successfully" : "Rejected Successfully";
						return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);



					} else {
						return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
					}
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "Chemist status is not correct"), HttpStatus.BAD_REQUEST);
				}
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new ApiResponse(false, "An error occurred while processing the request"), HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(new ApiResponse(false, "Invalid format number"), HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<?> getSwabMicrobiologicalAnalysisFormatNo(String formatNo) {
		try {

			List<SwabMicrobiologicalAnalysisARF008_009_010> listOfSwabMicrobiologicalAnalysis = SwabMicroAnalysisRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfSwabMicrobiologicalAnalysis == null) {

				listOfSwabMicrobiologicalAnalysis = new ArrayList<SwabMicrobiologicalAnalysisARF008_009_010>();
			}

			return new ResponseEntity<>(listOfSwabMicrobiologicalAnalysis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting list Of Swab Microbiologist Analysis Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getSwabMicrobiologicalByDateF008(String sampleDateF008,String month,String year){
		try {

			if (sampleDateF008 != null && sampleDateF008.isEmpty()) {
				sampleDateF008 = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<SwabMicrobiologicalAnalysisARF008_009_010> listOfSwabMicrobiologicalAnalysis = SwabMicroAnalysisRepo.findByDateF008MonthYear(sampleDateF008,month,year);

			return new ResponseEntity<>(listOfSwabMicrobiologicalAnalysis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Swab Microbiological Analysis Form's By DateF001: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSwabMicrobiologicalByDateF009(String sampleDateF009,String month,String year) {
		try {
			if (sampleDateF009 != null && sampleDateF009.isEmpty()) {
				sampleDateF009 = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}


			List<SwabMicrobiologicalAnalysisARF008_009_010> listOfSwabMicrobiologicalAnalysis = SwabMicroAnalysisRepo.findByDateF009MonthYear(sampleDateF009,month,year);

			return new ResponseEntity<>(listOfSwabMicrobiologicalAnalysis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Swab Microbiological Analysis Form's By DateF002: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSwabMicrobiologicalByDateF010(String sampleDateF010,String month,String year) {
		try {
			if (sampleDateF010 != null && sampleDateF010.isEmpty()) {
				sampleDateF010 = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<SwabMicrobiologicalAnalysisARF008_009_010> listOfSwabMicrobiologicalAnalysis = SwabMicroAnalysisRepo.findByDateF010MonthYear(sampleDateF010,month,year);

			return new ResponseEntity<>(listOfSwabMicrobiologicalAnalysis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Swab Microbiological Analysis Form's By DateF003: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSwabMicrobiologicalById(Long id) {
		try {

			Optional<SwabMicrobiologicalAnalysisARF008_009_010> response = SwabMicroAnalysisRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Swab Microbiological Analysis Form's By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllSwabMicrobiological() {
		SCAUtil sca = new SCAUtil();

		try {
			List<SwabMicrobiologicalAnalysisARF008_009_010> listOfSwabMicrobiologicalAnalysis = SwabMicroAnalysisRepo.findAll();

			if (listOfSwabMicrobiologicalAnalysis == null) {
				listOfSwabMicrobiologicalAnalysis = new ArrayList<>();
			}

			// Group the entries by formatNo
			Map<String, List<SwabMicrobiologicalAnalysisARF008_009_010>> groupedByFormatNo = listOfSwabMicrobiologicalAnalysis.stream()
					.collect(Collectors.groupingBy(SwabMicrobiologicalAnalysisARF008_009_010::getFormatNo));

			return new ResponseEntity<>(groupedByFormatNo, HttpStatus.OK);

		} catch (Exception e) {
			log.error("***************** Unable to get List Of All Swab Microbiological Analysis Form's!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get List Of All Swab Microbiological Analysis Form's!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllMicroNotSubmittedSwabMicrobiological() {
		SCAUtil sca = new SCAUtil();

		try {
			// Fetching the records where chemist status is saved but not approved
			List<SwabMicrobiologicalAnalysisARF008_009_010> listOfSwabMicrobiologicalAnalysis = SwabMicroAnalysisRepo
					.findByMicroStatusSavedAndNotApproved();

			if (listOfSwabMicrobiologicalAnalysis == null) {
				listOfSwabMicrobiologicalAnalysis = new ArrayList<>();
			}

			// Group the entries by formatNo
			Map<String, List<SwabMicrobiologicalAnalysisARF008_009_010>> groupedByFormatNo = listOfSwabMicrobiologicalAnalysis.stream()
					.collect(Collectors.groupingBy(SwabMicrobiologicalAnalysisARF008_009_010::getFormatNo));

			return new ResponseEntity<>(groupedByFormatNo, HttpStatus.OK);

		} catch (Exception e) {
			log.error("***************** Unable to get List Of All Swab Microbiological Analysis Form's!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity<>(
					new ApiResponse(false, "Unable to get List Of All Swab Microbiological Analysis Form's!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}


	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllQcNotSubmittedSwabMicrobiological() {
		SCAUtil sca = new SCAUtil();

		try {
			List<SwabMicrobiologicalAnalysisARF008_009_010> listOfSwabMicrobiologicalAnalysis = SwabMicroAnalysisRepo
					.findByChemistOrMicroStatusSubmittedAndHodStatusNotApproved();

			if (listOfSwabMicrobiologicalAnalysis == null || listOfSwabMicrobiologicalAnalysis.isEmpty()) {
				listOfSwabMicrobiologicalAnalysis = new ArrayList<>();
			}

			// Grouping by formatNo
			Map<String, List<SwabMicrobiologicalAnalysisARF008_009_010>> groupedByFormatNo = listOfSwabMicrobiologicalAnalysis.stream()
					.collect(Collectors.groupingBy(SwabMicrobiologicalAnalysisARF008_009_010::getFormatNo));

			return new ResponseEntity(groupedByFormatNo, HttpStatus.OK);

		} catch (Exception e) {
			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n" + e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getSwabMicrobiologicalForPrint(String formatNo,String date,String month,String year) {

		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}
			List<SwabMicrobiologicalAnalysisARF008_009_010> listOfSwabMicrobiologicalAnalysis = null;
			if(formatNo.equalsIgnoreCase("PH-QCL01-AR-F-008")){
				listOfSwabMicrobiologicalAnalysis = SwabMicroAnalysisRepo.findByDateF008MonthYearForPrint(date,month,year,formatNo);	
			}else if (formatNo.equalsIgnoreCase("PH-QCL01-AR-F-009")) {
				listOfSwabMicrobiologicalAnalysis = SwabMicroAnalysisRepo.findByDateF009MonthYearForPrint(date,month,year,formatNo);
			}else if (formatNo.equalsIgnoreCase("PH-QCL01-AR-F-010")) {
				listOfSwabMicrobiologicalAnalysis = SwabMicroAnalysisRepo.findByDateF010MonthYearForPrint(date,month,year,formatNo);
			}

			return new ResponseEntity<>(listOfSwabMicrobiologicalAnalysis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Swab Microbiological Analysis Form's By the given paramters: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	//-----------------------------------------------DISTILLED WATER ANALYSIS REPORT (ARF012)-----------------------------------------------------------------	


	@Transactional
	public ResponseEntity<?> saveDistilledWaterAnalysis(DistilledWaterAnalysisReportARF012 distilledWaterAnalysis, HttpServletRequest http) {
		if (distilledWaterAnalysis == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		DistilledWaterAnalysisReportARF012 savedReport = null;

		try {
			//	        validateChemicalReport(chemicalAnalysisReport);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (role.equals("ROLE_CHEMIST")) {
				distilledWaterAnalysis.setChemist_saved_by(userName);
				distilledWaterAnalysis.setChemist_saved_on(date);
				distilledWaterAnalysis.setChemist_saved_id(userId);
				distilledWaterAnalysis.setChemist_status(AppConstantsQc.chemistSave);
				distilledWaterAnalysis.setCheckedBy(userName);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save the report
			if (distilledWaterAnalysis.getId() != null) {
				savedReport = distilledWaterAnalysisRepo.findById(distilledWaterAnalysis.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(distilledWaterAnalysis, savedReport, getIgnoredPropertiesdistilledWaterAnalysis());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport= distilledWaterAnalysisRepo.save(savedReport);
			} else {
				savedReport = distilledWaterAnalysisRepo.save(distilledWaterAnalysis);
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Distilled Water Analysis Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Distilled Water Analysis Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}

	@Transactional
	public ResponseEntity<?> submitDistilledWaterAnalysis(DistilledWaterAnalysisReportARF012 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}
		DistilledWaterAnalysisReportARF012 reportObj;
		try {
			// Validate the chemical report
			//	    	validateDistilledWaterAnalysis(report);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());



			// Check if the report has an ID and exists in the database
			if (report.getId() != null) {
				reportObj = distilledWaterAnalysisRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update existing record, retaining some of the original properties
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);	
			} else {
				// Create a new report if no ID exists
				reportObj = new DistilledWaterAnalysisReportARF012();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}

			// Copy the properties from the provided report to the reportObj (excluding ignored properties)
			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesdistilledWaterAnalysis());

			// Set chemist-specific fields if the user has the right role
			if (role.equals("ROLE_CHEMIST")) {
				reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				reportObj.setChemist_submit_on(date);
				reportObj.setChemist_submit_by(userName);
				reportObj.setChemist_submit_id(userId);
				reportObj.setChemist_sign(userName);
				reportObj.setQc_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				if (reportObj.getQc_sign() != null && !reportObj.getQc_sign().isEmpty()) {
					reportObj.setQc_sign("");
				}
				if (reportObj.getQc_submit_by()!= null && !reportObj.getQc_submit_by().isEmpty()) {
					reportObj.setQc_submit_by("");
				}
				if (reportObj.getQc_submit_id() != null) {
					reportObj.setQc_submit_id(null);
				}
				if (reportObj.getQc_submit_on()!= null) {
					reportObj.setQc_submit_on(null);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only chemist can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report in the database
			reportObj= distilledWaterAnalysisRepo.save(reportObj);

			// Additional actions like audit tracking and email sending can be added here
			saveAuditTrackAndSendEmailDistilledWaterAnalysis(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}



	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveDistilledWaterAnalysis(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		DistilledWaterAnalysisReportARF012 report = new DistilledWaterAnalysisReportARF012();
		DistilledWaterAnalysisReportARF012History reportHistory = new DistilledWaterAnalysisReportARF012History();

		String respStatus;
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = distilledWaterAnalysisRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = distilledWaterAnalysisRepoHistory.fetchLastSubmittedRecordDate(report.getDate());
			if (reportHistory == null) {
				reportHistory = new DistilledWaterAnalysisReportARF012History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id");

			// Get statuses
			String chemistStatus = report.getChemist_status();
			String qcStatus = report.getQc_status();

			if (chemistStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)&&qcStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.QCApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);
						report.setApprovedBy(userName);
						// Update history
						reportHistory.setQc_status(AppConstantsQc.QCApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCApprove);
						reportHistory.setApprovedBy(userName);	 

					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.QCRejected);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCRejected);


						// Update history
						reportHistory.setReason(reason);
						reportHistory.setQc_status(AppConstantsQc.QCRejected);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					distilledWaterAnalysisRepo.save(report);
					distilledWaterAnalysisRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.QAApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);
						report.setApprovedBy(userName);
						// Update history
						reportHistory.setQc_status(AppConstantsQc.QAApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAApprove);
						reportHistory.setApprovedBy(userName);	 

					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.QAReject);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);


						// Update history
						reportHistory.setReason(reason);
						reportHistory.setQc_status(AppConstantsQc.QAReject);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAReject);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					distilledWaterAnalysisRepo.save(report);
					distilledWaterAnalysisRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase("QA_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Chemist is not correct"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Raw Cotton: Chemical Analysis Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}



	public ResponseEntity<?> getDistilledWaterAnalysisByDate(String date, String month, String year) {
		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<DistilledWaterAnalysisReportARF012> listOfDistilledWaterAnalysis = distilledWaterAnalysisRepo.findByDateMonthYear(date, month, year);

			if (listOfDistilledWaterAnalysis == null || listOfDistilledWaterAnalysis.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfDistilledWaterAnalysis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Distilled Water Analysis Form's Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getDistilledWaterAnalysisById(Long id) {
		try {

			Optional<DistilledWaterAnalysisReportARF012> response = distilledWaterAnalysisRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Distilled Water Analysis Form's By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllDistilledWaterAnalysis() {
		SCAUtil sca = new SCAUtil();

		try {

			List<DistilledWaterAnalysisReportARF012> listOfDistilledWaterAnalysis = distilledWaterAnalysisRepo.findAll();

			if (listOfDistilledWaterAnalysis == null) {

				listOfDistilledWaterAnalysis = new ArrayList<DistilledWaterAnalysisReportARF012>();
			}

			return new ResponseEntity(listOfDistilledWaterAnalysis, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Distilled Water Analysis Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Distilled Water Analysis Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllChemistNotSubmittedARF012() {
		SCAUtil sca = new SCAUtil();

		try {

			List<DistilledWaterAnalysisReportARF012> listOfDistilledWaterAnalysis = distilledWaterAnalysisRepo
					.findByChemistStatusSavedAndNotApproved();

			if (listOfDistilledWaterAnalysis == null) {

				listOfDistilledWaterAnalysis = new ArrayList<DistilledWaterAnalysisReportARF012>();
			}

			return new ResponseEntity(listOfDistilledWaterAnalysis, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllQcNotSubmittedF012() {
		SCAUtil sca = new SCAUtil();

		try {

			List<DistilledWaterAnalysisReportARF012> listOfDistilledWaterAnalysis = distilledWaterAnalysisRepo
					.findByChemistStatusSubmittedAndHodStatusNotApproved();

			if (listOfDistilledWaterAnalysis == null) {

				listOfDistilledWaterAnalysis = new ArrayList<DistilledWaterAnalysisReportARF012>();
			}

			return new ResponseEntity(listOfDistilledWaterAnalysis, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getDistilledWaterAnalysisForPrint(String date, String month, String year) {
		try {

			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}
			List<DistilledWaterAnalysisReportARF012> listOfDistilledWaterAnalysis = distilledWaterAnalysisRepo.getForReportPrint(date, month, year);

			if (listOfDistilledWaterAnalysis == null || listOfDistilledWaterAnalysis.isEmpty()) {
				return new ResponseEntity<>("No data found" + date, HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfDistilledWaterAnalysis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Distilled Water Analysis Form's By using the given parameters  " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	//-----------------------------------------------------TDS-METER CALIBRATION REPORT PH-QCL01/F-008-----------------------------------------------------------------------------------------

	@Transactional
	public ResponseEntity<?> saveTdsMeterCalibrationReport(QcTdsMeterCalibrationReportF008 tdsMeterCalibrationReport, HttpServletRequest http) {
		if (tdsMeterCalibrationReport == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		QcTdsMeterCalibrationReportF008 savedReport = null;

		try {
			//	        validateChemicalReport(chemicalAnalysisReport);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (role.equals("ROLE_CHEMIST")) {
				tdsMeterCalibrationReport.setChemist_saved_by(userName);
				tdsMeterCalibrationReport.setChemist_saved_on(date);
				tdsMeterCalibrationReport.setChemist_saved_id(userId);
				tdsMeterCalibrationReport.setChemist_status(AppConstantsQc.chemistSave);
				tdsMeterCalibrationReport.setCheckedBy(userName);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save the report
			if (tdsMeterCalibrationReport.getId() != null) {
				savedReport = tdsMeterCalibrationRepo.findById(tdsMeterCalibrationReport.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(tdsMeterCalibrationReport, savedReport, getIgnoredPropertiesARF003());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport= tdsMeterCalibrationRepo.save(savedReport);
			} else {
				savedReport = tdsMeterCalibrationRepo.save(tdsMeterCalibrationReport);
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Chemical Analysis Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Chemical Analysis Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}

	@Transactional
	public ResponseEntity<?> submitTdsMeterCalibrationReport(QcTdsMeterCalibrationReportF008 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}
		QcTdsMeterCalibrationReportF008 reportObj;
		try {
			// Validate the chemical report
			//	    	validateTdsMeterCalibrationReport(report);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());



			// Check if the report has an ID and exists in the database
			if (report.getId() != null) {
				reportObj = tdsMeterCalibrationRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update existing record, retaining some of the original properties
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);	
			} else {
				// Create a new report if no ID exists
				reportObj = new QcTdsMeterCalibrationReportF008();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}

			// Copy the properties from the provided report to the reportObj (excluding ignored properties)
			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesTdsMeterCalibration());

			// Set chemist-specific fields if the user has the right role
			if (role.equals("ROLE_CHEMIST")) {
				reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				reportObj.setChemist_submit_on(date);
				reportObj.setChemist_submit_by(userName);
				reportObj.setChemist_submit_id(userId);
				reportObj.setChemist_sign(userName);
				reportObj.setQc_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				if (reportObj.getQc_sign() != null && !reportObj.getQc_sign().isEmpty()) {
					reportObj.setQc_sign("");
				}
				if (reportObj.getQc_submit_by()!= null && !reportObj.getQc_submit_by().isEmpty()) {
					reportObj.setQc_submit_by("");
				}
				if (reportObj.getQc_submit_id() != null) {
					reportObj.setQc_submit_id(null);
				}
				if (reportObj.getQc_submit_on()!= null) {
					reportObj.setQc_submit_on(null);
				}
				//	            reportObj.setVerifiedBy(userName);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only chemist can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report in the database
			reportObj= tdsMeterCalibrationRepo.save(reportObj);

			// Additional actions like audit tracking and email sending can be added here
			saveAuditTrackAndSendEmailTdsMeterCalibration(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Chemical Analysis Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}



	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveTdsMeterCalibrationReport(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		QcTdsMeterCalibrationReportF008 report = new QcTdsMeterCalibrationReportF008();
		QcTdsMeterCalibrationReportF008History reportHistory = new QcTdsMeterCalibrationReportF008History();

		String respStatus;
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = tdsMeterCalibrationRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = tdsMeterCalibrationRepoHistory.fetchLastSubmittedRecordDate(report.getDate());
			if (reportHistory == null) {
				reportHistory = new QcTdsMeterCalibrationReportF008History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id");

			// Get statuses
			String chemistStatus = report.getChemist_status();
			String qcStatus = report.getQc_status();

			if (chemistStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)&&qcStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.QCApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setQc_status(AppConstantsQc.QCApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.QCRejected);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCRejected);


						// Update history
						reportHistory.setQc_status(AppConstantsQc.QCRejected);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					tdsMeterCalibrationRepo.save(report);
					tdsMeterCalibrationRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.QAApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setQc_status(AppConstantsQc.QAApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.QAReject);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);


						// Update history
						reportHistory.setQc_status(AppConstantsQc.QAReject);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAReject);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					tdsMeterCalibrationRepo.save(report);
					tdsMeterCalibrationRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase(AppConstantsQc.QAApprove)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}else if (userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")) {
					if(report.getChemist_submit_by().equalsIgnoreCase(userName)){
						return new ResponseEntity<>(new ApiResponse(true, "You are not authorized to Approve/Reject this form"), HttpStatus.OK);
					}

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.ChemistDesigneeApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.ChemistDesigneeApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setQc_status(AppConstantsQc.ChemistDesigneeApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.ChemistDesigneeApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.ChemistDesigneeRejected);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.ChemistDesigneeRejected);


						// Update history
						reportHistory.setQc_status(AppConstantsQc.ChemistDesigneeRejected);
						reportHistory.setReason(reason);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.ChemistDesigneeRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					tdsMeterCalibrationRepo.save(report);
					tdsMeterCalibrationRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase(AppConstantsQc.ChemistDesigneeApprove)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);


				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Chemist is not correct"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getTdsMeterCalibrationReportFormatNo(String formatNo) {
		try {



			List<QcTdsMeterCalibrationReportF008> listOfTdsMeterCalibration = tdsMeterCalibrationRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfTdsMeterCalibration == null) {

				listOfTdsMeterCalibration = new ArrayList<QcTdsMeterCalibrationReportF008>();
			}

			return new ResponseEntity<>(listOfTdsMeterCalibration, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Tds Meter Calibration Report Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getTdsMeterCalibrationReportByDateMonthYear(String date, String month, String year) {
		try {
			List<QcTdsMeterCalibrationReportF008> listOfTdsMeterCalibration = tdsMeterCalibrationRepo.findByDateMonthYear(date, month, year);

			if (listOfTdsMeterCalibration == null || listOfTdsMeterCalibration.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfTdsMeterCalibration, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting TDS Meter Calibration Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getTdsMeterCalibrationReportById(Long id) {
		try {

			Optional<QcTdsMeterCalibrationReportF008> response = tdsMeterCalibrationRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Tds Meter Calibration Report Form's By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllTdsMeterCalibrationReport() {
		SCAUtil sca = new SCAUtil();

		try {

			List<QcTdsMeterCalibrationReportF008> listOfTdsMeterCalibration = tdsMeterCalibrationRepo.findAll();

			if (listOfTdsMeterCalibration == null) {

				listOfTdsMeterCalibration = new ArrayList<QcTdsMeterCalibrationReportF008>();
			}

			return new ResponseEntity(listOfTdsMeterCalibration, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Tds Meter Calibration Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Tds Meter Calibration Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllChemistNotSubmittedF008() {
		SCAUtil sca = new SCAUtil();
		//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		//		String userName = userRepository.getUserName(userId);

		try {

			List<QcTdsMeterCalibrationReportF008> listOfTdsMeterCalibration = tdsMeterCalibrationRepo
					.findByChemistStatusSavedAndNotApproved();

			if (listOfTdsMeterCalibration == null) {

				listOfTdsMeterCalibration = new ArrayList<QcTdsMeterCalibrationReportF008>();
			}

			return new ResponseEntity(listOfTdsMeterCalibration, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllQcNotSubmittedF008() {
		SCAUtil sca = new SCAUtil();

		try {

			List<QcTdsMeterCalibrationReportF008> listOfTdsMeterCalibration = tdsMeterCalibrationRepo
					.findByChemistStatusSubmittedAndHodStatusNotApproved();

			if (listOfTdsMeterCalibration == null) {

				listOfTdsMeterCalibration = new ArrayList<QcTdsMeterCalibrationReportF008>();
			}

			return new ResponseEntity(listOfTdsMeterCalibration, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getTdsMeterCalibrationReportForPrint(String date, String month, String year) {
		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<QcTdsMeterCalibrationReportF008> listOfTdsMeterCalibration = tdsMeterCalibrationRepo.getForReportPrint(date, month, year);

			if (listOfTdsMeterCalibration == null || listOfTdsMeterCalibration.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfTdsMeterCalibration, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting TDS Meter Calibration Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//-------------------------------WIRA FIBER FINENESS TESTER CALIBRATION REPORT-------------------------------------------


	@Transactional
	public ResponseEntity<?> saveWiraFiberFinessF010(Qc_WiraFiberFinenessTesterReportF010 wiraFiberFinenessReport, HttpServletRequest http) {
		if (wiraFiberFinenessReport == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_WiraFiberFinenessTesterReportF010 savedReport = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Role-based validation
			if (role.equals("ROLE_CHEMIST")) {
				wiraFiberFinenessReport.setChemist_saved_by(userName);
				wiraFiberFinenessReport.setChemist_saved_on(date);
				wiraFiberFinenessReport.setChemist_saved_id(userId);
				wiraFiberFinenessReport.setChemist_status(AppConstantsQc.chemistSave);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update parent entity
			if (wiraFiberFinenessReport.getId() != null) {
				savedReport = wiraFiberFinenessRepo.findById(wiraFiberFinenessReport.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));

				// Manually set properties to avoid overwriting important fields
				savedReport.setFormatNo(wiraFiberFinenessReport.getFormatNo());
				savedReport.setRevisionNo(wiraFiberFinenessReport.getRevisionNo());
				savedReport.setFormatName(wiraFiberFinenessReport.getFormatName());
				savedReport.setRefSopNo(wiraFiberFinenessReport.getRefSopNo());
				savedReport.setFrequency(wiraFiberFinenessReport.getFrequency());
				savedReport.setEqIdNo(wiraFiberFinenessReport.getEqIdNo());
				savedReport.setCalibrationDate(wiraFiberFinenessReport.getCalibrationDate());
				savedReport.setMonth(wiraFiberFinenessReport.getMonth());
				savedReport.setYear(wiraFiberFinenessReport.getYear());
				savedReport.setSettingBeforeCalibration(wiraFiberFinenessReport.getSettingBeforeCalibration());
				savedReport.setFlowOffset(wiraFiberFinenessReport.getFlowOffset());
				savedReport.setPressureOffSet(wiraFiberFinenessReport.getPressureOffSet());
				savedReport.setPlGain(wiraFiberFinenessReport.getPlGain());
				savedReport.setPhGain(wiraFiberFinenessReport.getPhGain());
				savedReport.setNewPlGainAvg(wiraFiberFinenessReport.getNewPlGainAvg());
				savedReport.setCalibratedFlowOffSet(wiraFiberFinenessReport.getCalibratedFlowOffSet());
				savedReport.setCalibratedPlGain(wiraFiberFinenessReport.getCalibratedPlGain());
				savedReport.setCalibratedPressureOffSet(wiraFiberFinenessReport.getCalibratedPressureOffSet());
				savedReport.setCalibratedPhGain(wiraFiberFinenessReport.getCalibratedPhGain());
				savedReport.setCalibNextDueDate(wiraFiberFinenessReport.getCalibNextDueDate());
				savedReport.setRemarks(wiraFiberFinenessReport.getRemarks());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);

				// Save updated parent
				savedReport = wiraFiberFinenessRepo.save(savedReport);
			} else {
				// Create a new parent entity
				wiraFiberFinenessReport.setCreatedAt(date);
				wiraFiberFinenessReport.setCreatedBy(userName);
				savedReport = wiraFiberFinenessRepo.save(wiraFiberFinenessReport);
			}

			// Save or update child entities
			if (wiraFiberFinenessReport.getDetails() != null) {
				for (WiraFiberDetails detail : wiraFiberFinenessReport.getDetails()) {
					if (detail.getId() != null) {
						// Retrieve existing detail by ID
						WiraFiberDetails existingDetail = wiraFiberDetailsRepo.findById(detail.getId())
								.orElseThrow(() -> new RuntimeException("Detail not found"));

						// Manually set properties to ensure they are updated correctly
						existingDetail.setRefCottonMicroValue(detail.getRefCottonMicroValue());
						existingDetail.setObsr(detail.getObsr());
						existingDetail.setRatio(detail.getRatio());
						existingDetail.setPlGain(detail.getPlGain());
						existingDetail.setNewPlGain(detail.getNewPlGain());
						existingDetail.setUpdatedAt(date);
						existingDetail.setUpdatedBy(userName);

						// Save the updated child
						wiraFiberDetailsRepo.save(existingDetail);
					} else {
						// Create a new child entity and associate it with the parent
						detail.setParentId(savedReport.getId());
						wiraFiberDetailsRepo.save(detail);
					}
				}
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}


	@Transactional
	public ResponseEntity<?> submitWiraFiberFinessF010(Qc_WiraFiberFinenessTesterReportF010 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_WiraFiberFinenessTesterReportF010 reportObj;
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Check if the report has an ID (existing record)
			if (report.getId() != null) {
				reportObj = wiraFiberFinenessRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update the existing record
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);
			} else {
				// New record
				reportObj = new Qc_WiraFiberFinenessTesterReportF010();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}
			if (report.getId() == null) {

				BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF010Save());
			}else {
				// Copy the relevant properties from the input report to the report object
				BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF010Submit());

			}


			// Handle chemist-specific logic
			if ("ROLE_CHEMIST".equals(role)) {
				reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				reportObj.setChemist_submit_on(date);
				reportObj.setChemist_submit_by(userName);
				reportObj.setChemist_submit_id(userId);
				reportObj.setChemist_sign(userName);
				reportObj.setManager_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.ManWaiting);
				reportObj.setCheckedBy(userName);
				if (reportObj.getManager_sign() != null && !reportObj.getManager_sign().isEmpty()) {
					reportObj.setManager_sign("");
				}
				if (reportObj.getManager_submit_by()!= null && !reportObj.getManager_submit_by().isEmpty()) {
					reportObj.setManager_submit_by("");
				}
				if (reportObj.getManager_submit_id() != null) {
					reportObj.setManager_submit_id(null);
				}
				if (reportObj.getManager_submit_on()!= null) {
					reportObj.setManager_submit_on(null);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only chemist can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the parent entity
			reportObj = wiraFiberFinenessRepo.save(reportObj);

			// Handle child entities (Wira Fiber Details)
			if (report.getDetails() != null) {
				List<WiraFiberDetails> updatedDetails = new ArrayList<>();
				for (WiraFiberDetails detail : report.getDetails()) {
					if (detail.getId() == null) {
						// New child entity
						detail.setParentId(reportObj.getId());
						updatedDetails.add(detail);
					} else {
						// Update existing child entity
						WiraFiberDetails existingDetail = wiraFiberDetailsRepo.findById(detail.getId())
								.orElseThrow(() -> new RuntimeException("Detail not found with id: " + detail.getId()));

						// Detach existing detail to avoid Hibernate issues with reattaching
						entityManager.detach(existingDetail);

						// Copy relevant fields from the input detail to the existing detail
						BeanUtils.copyProperties(detail, existingDetail, "id", "parentId");
						updatedDetails.add(existingDetail);
					}
				}
				// Save all updated child entities
				wiraFiberDetailsRepo.saveAll(updatedDetails);
			}

			// Additional actions (audit tracking and email sending)
			saveAuditTrackAndSendEmailwiraFiberFineness(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Wira Fiber Fineness Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}



	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveWiraFiberFinenessF010Report(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		Qc_WiraFiberFinenessTesterReportF010 report = new Qc_WiraFiberFinenessTesterReportF010();
		Qc_WiraFiberFinenessTesterReportF010History reportHistory = new Qc_WiraFiberFinenessTesterReportF010History();

		String respStatus;
		String userRole = getUserRole();
		System.out.println("user role : ");
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = wiraFiberFinenessRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = WiraFiberFinenessRepoHistory.fetchLastSubmittedRecordMonthYear(report.getMonth(),report.getYear());
			if (reportHistory == null) {
				reportHistory = new Qc_WiraFiberFinenessTesterReportF010History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id","details");

			// Get statuses
			String chemistStatus = report.getChemist_status();
			String manager_status = report.getManager_status();

			if (chemistStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)&&manager_status.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QCApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);	    
						report.setManager_sign(userName);	
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QCRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);	    
						report.setManager_sign(userName);	
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCRejected);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					wiraFiberFinenessRepo.save(report);
					WiraFiberFinenessRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QAApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);	    
						report.setManager_sign(userName);	
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QAReject);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);	    
						report.setManager_sign(userName);	
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAReject);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAReject);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					wiraFiberFinenessRepo.save(report);
					WiraFiberFinenessRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QA_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);


				}else if (userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")) {

					if(report.getChemist_submit_by().equalsIgnoreCase(userName)){
						return new ResponseEntity<>(new ApiResponse(true, "You are not authorized to Approve/Reject this form"), HttpStatus.OK);
					}

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.ChemistDesigneeApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.ChemistDesigneeApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.ChemistDesigneeApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.ChemistDesigneeApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.ChemistDesigneeRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.ChemistDesigneeRejected);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.ChemistDesigneeRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.ChemistDesigneeRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					wiraFiberFinenessRepo.save(report);
					WiraFiberFinenessRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase(AppConstantsQc.ChemistDesigneeApprove)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);



				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Chemist is not correct"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getWiraFiberFinenessF010FormatNo(String formatNo) {
		try {

			List<Qc_WiraFiberFinenessTesterReportF010> listOfWiraFiberFinenessF010 = wiraFiberFinenessRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfWiraFiberFinenessF010 == null) {

				listOfWiraFiberFinenessF010 = new ArrayList<Qc_WiraFiberFinenessTesterReportF010>();
			}

			return new ResponseEntity<>(listOfWiraFiberFinenessF010, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting wira fiber fineness Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getWiraFiberFinenessF010ByMonthYear(String month, String year) {
		try {
			if (month.isEmpty()) {
				month=null;
			}
			if (year.isEmpty()) {
				year=null;
			}
			List<Qc_WiraFiberFinenessTesterReportF010> listOfWiraFiberFinenessF010 = wiraFiberFinenessRepo.findByDateMonthYear(month, year);

			if (listOfWiraFiberFinenessF010 == null || listOfWiraFiberFinenessF010.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfWiraFiberFinenessF010, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting wira fiber fineness Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getWiraFiberFinenessF010ById(Long id) {
		try {

			Optional<Qc_WiraFiberFinenessTesterReportF010> response = wiraFiberFinenessRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting wira fiber fineness Report Form's By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllWiraFiberFinenessF010Report() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_WiraFiberFinenessTesterReportF010> listOfWiraFiberFinenessF010 = wiraFiberFinenessRepo.findAll();

			if (listOfWiraFiberFinenessF010 == null) {

				listOfWiraFiberFinenessF010 = new ArrayList<Qc_WiraFiberFinenessTesterReportF010>();
			}

			return new ResponseEntity(listOfWiraFiberFinenessF010, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Wira Fiber Fineness Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Wira Fiber Fineness Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllChemistNotSubmittedF010() {
		SCAUtil sca = new SCAUtil();
		//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		//		String userName = userRepository.getUserName(userId);

		try {

			List<Qc_WiraFiberFinenessTesterReportF010> listOfWiraFiberFinenessF010 = wiraFiberFinenessRepo
					.findByChemistStatusSavedAndNotApproved();

			if (listOfWiraFiberFinenessF010 == null) {

				listOfWiraFiberFinenessF010 = new ArrayList<Qc_WiraFiberFinenessTesterReportF010>();
			}

			return new ResponseEntity(listOfWiraFiberFinenessF010, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Chemist Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Chemist Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllManagerNotSubmittedF010() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_WiraFiberFinenessTesterReportF010> listOfWiraFiberFinenessF010 = wiraFiberFinenessRepo
					.findByChemistStatusSubmittedAndHodStatusNotApproved();

			if (listOfWiraFiberFinenessF010 == null) {

				listOfWiraFiberFinenessF010 = new ArrayList<Qc_WiraFiberFinenessTesterReportF010>();
			}

			return new ResponseEntity(listOfWiraFiberFinenessF010, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Manager Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Manager Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getWiraFiberFinenessF010ReportForPrint(String month, String year) {
		try {

			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<Qc_WiraFiberFinenessTesterReportF010> listOfWiraFiberFinenessF010 = wiraFiberFinenessRepo.getForReportPrint(month, year);

			if (listOfWiraFiberFinenessF010 == null || listOfWiraFiberFinenessF010.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfWiraFiberFinenessF010, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Wira Fiber Fineness Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//-----------------------------------------PH-QCL01/F-004  RAW COTTON CONSOLIDATED ANALYTICAL REPORT--------------------------------------------------------------------


	@Transactional
	public ResponseEntity<?> saveRawCottonConsolidatedReport(Qc_RawCottenConsolidatedAnalyticalReportF004 rawCottenConsolidatedReports, HttpServletRequest http) {
		if (rawCottenConsolidatedReports == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_RawCottenConsolidatedAnalyticalReportF004 savedReport = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Role-based validation
			if (role.equals("ROLE_CHEMIST")) {
				rawCottenConsolidatedReports.setChemist_saved_by(userName);
				rawCottenConsolidatedReports.setChemist_saved_on(date);
				rawCottenConsolidatedReports.setChemist_saved_id(userId);
				rawCottenConsolidatedReports.setChemist_status(AppConstantsQc.chemistSave);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update parent entity
			if (rawCottenConsolidatedReports.getId() != null) {
				savedReport = rawCottenConsolidatedRepoF004.findById(rawCottenConsolidatedReports.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));

				// Manually set properties to avoid overwriting important fields
				savedReport.setFormatNo(rawCottenConsolidatedReports.getFormatNo());
				savedReport.setRevisionNo(rawCottenConsolidatedReports.getRevisionNo());
				savedReport.setFormatName(rawCottenConsolidatedReports.getFormatName());
				savedReport.setRefSopNo(rawCottenConsolidatedReports.getRefSopNo());
				savedReport.setBleachingBmrNo(rawCottenConsolidatedReports.getBleachingBmrNo());
				savedReport.setChemist_status(rawCottenConsolidatedReports.getChemist_status());
				savedReport.setChemist_saved_on(rawCottenConsolidatedReports.getChemist_saved_on());
				savedReport.setChemist_saved_by(rawCottenConsolidatedReports.getChemist_saved_by());
				savedReport.setChemist_saved_id(rawCottenConsolidatedReports.getChemist_saved_id());
				savedReport.setChemist_submit_on(rawCottenConsolidatedReports.getChemist_submit_on());
				savedReport.setChemist_submit_by(rawCottenConsolidatedReports.getChemist_submit_by());
				savedReport.setChemist_submit_id(rawCottenConsolidatedReports.getChemist_submit_id());
				savedReport.setChemist_sign(rawCottenConsolidatedReports.getChemist_sign());
				savedReport.setManager_status(rawCottenConsolidatedReports.getManager_status());
				savedReport.setManager_submit_on(rawCottenConsolidatedReports.getManager_submit_on());
				savedReport.setManager_submit_by(rawCottenConsolidatedReports.getManager_submit_by());
				savedReport.setManager_submit_id(rawCottenConsolidatedReports.getManager_submit_id());
				savedReport.setManager_sign(rawCottenConsolidatedReports.getManager_sign());
				savedReport.setReason(rawCottenConsolidatedReports.getReason());
				savedReport.setMail_status(rawCottenConsolidatedReports.getMail_status());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);

				// Save updated parent
				savedReport = rawCottenConsolidatedRepoF004.save(savedReport);
			} else {
				// Create a new parent entity
				rawCottenConsolidatedReports.setCreatedAt(date);
				rawCottenConsolidatedReports.setCreatedBy(userName);
				savedReport = rawCottenConsolidatedRepoF004.save(rawCottenConsolidatedReports);
			}

			// Save or update child entities
			if (rawCottenConsolidatedReports.getDetails() != null) {
				for (Qc_RawCottenConsolidatedDetails detail : rawCottenConsolidatedReports.getDetails()) {
					if (detail.getId() != null) {
						// Retrieve existing detail by ID
						Qc_RawCottenConsolidatedDetails existingDetail = rawCottonConsolidatedDetailsRepo.findById(detail.getId())
								.orElseThrow(() -> new RuntimeException("Detail not found"));

						// Manually set properties to ensure they are updated correctly
						existingDetail.setDate(detail.getDate());
						existingDetail.setArNo(detail.getArNo());
						existingDetail.setDateOfReceipt(detail.getDateOfReceipt());
						existingDetail.setTestedDate(detail.getTestedDate());
						existingDetail.setMbNo(detail.getMbNo());
						existingDetail.setSupplier(detail.getSupplier());
						existingDetail.setStation(detail.getStation());
						existingDetail.setVerity(detail.getVerity());
						existingDetail.setInvoiceNo(detail.getInvoiceNo());
						existingDetail.setNoOfBale(detail.getNoOfBale());
						existingDetail.setQuantity(detail.getQuantity());
						existingDetail.setFlourescence(detail.getFlourescence());
						existingDetail.setWhiteness(detail.getWhiteness());
						existingDetail.setMicronaire(detail.getMicronaire());
						existingDetail.setNepsCount(detail.getNepsCount());
						existingDetail.setUql(detail.getUql());
						existingDetail.setLengthByWeightMm(detail.getLengthByWeightMm());
						existingDetail.setLengthByNoMm(detail.getLengthByNoMm());
						existingDetail.setSfc_w(detail.getSfc_w());
						existingDetail.setSfc_n(detail.getSfc_n());
						existingDetail.setAsh(detail.getAsh());
						existingDetail.setEss_ext(detail.getEss_ext());
						existingDetail.setMoisture(detail.getMoisture());
						existingDetail.setTrash(detail.getTrash());
						existingDetail.setRemark(detail.getRemark());

						// Save the updated child
						rawCottonConsolidatedDetailsRepo.save(existingDetail);
					} else {
						// Create a new child entity and associate it with the parent
						detail.setParentId(savedReport.getId());
						rawCottonConsolidatedDetailsRepo.save(detail);
					}
				}
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}


	@Transactional
	public ResponseEntity<?> submitRawCottonConsolidatedReport(Qc_RawCottenConsolidatedAnalyticalReportF004 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_RawCottenConsolidatedAnalyticalReportF004 reportObj;
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Check if the report has an ID (existing record)
			if (report.getId() != null) {
				reportObj = rawCottenConsolidatedRepoF004.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update the existing record
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);
			} else {
				// New record
				reportObj = new Qc_RawCottenConsolidatedAnalyticalReportF004();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}
			if (report.getId() == null) {

				BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF004Save());
			}else {
				// Copy the relevant properties from the input report to the report object
				BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF004Submit());

			}


			// Handle chemist-specific logic
			if ("ROLE_CHEMIST".equals(role)) {
				reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				reportObj.setChemist_submit_on(date);
				reportObj.setChemist_submit_by(userName);
				reportObj.setChemist_submit_id(userId);
				reportObj.setChemist_sign(userName);
				reportObj.setManager_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.ManWaiting);
				if (reportObj.getManager_sign() != null && !reportObj.getManager_sign().isEmpty()) {
					reportObj.setManager_sign("");
				}
				if (reportObj.getManager_submit_by()!= null && !reportObj.getManager_submit_by().isEmpty()) {
					reportObj.setManager_submit_by("");
				}
				if (reportObj.getManager_submit_id() != null) {
					reportObj.setManager_submit_id(null);
				}
				if (reportObj.getManager_submit_on()!= null) {
					reportObj.setManager_submit_on(null);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only chemist can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the parent entity
			reportObj = rawCottenConsolidatedRepoF004.save(reportObj);

			// Handle child entities (Wira Fiber Details)
			if (report.getDetails() != null) {
				List<Qc_RawCottenConsolidatedDetails> updatedDetails = new ArrayList<>();
				for (Qc_RawCottenConsolidatedDetails detail : report.getDetails()) {
					if (detail.getId() == null) {
						// New child entity
						detail.setParentId(reportObj.getId());
						updatedDetails.add(detail);
					} else {
						// Update existing child entity
						Qc_RawCottenConsolidatedDetails existingDetail = rawCottonConsolidatedDetailsRepo.findById(detail.getId())
								.orElseThrow(() -> new RuntimeException("Detail not found with id: " + detail.getId()));

						// Detach existing detail to avoid Hibernate issues with reattaching
						entityManager.detach(existingDetail);

						// Copy relevant fields from the input detail to the existing detail
						BeanUtils.copyProperties(detail, existingDetail, "id", "parentId");
						updatedDetails.add(existingDetail);
					}
				}
				// Save all updated child entities
				rawCottonConsolidatedDetailsRepo.saveAll(updatedDetails);
			}

			// Additional actions (audit tracking and email sending)
			saveAuditTrackAndSendEmailF004(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Wira Fiber Fineness Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}


	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRawCottonConsolidatedReport(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		Qc_RawCottenConsolidatedAnalyticalReportF004 report = new Qc_RawCottenConsolidatedAnalyticalReportF004();
		Qc_RawCottenConsolidatedAnalyticalReportF004History reportHistory = new Qc_RawCottenConsolidatedAnalyticalReportF004History();

		String respStatus;
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = rawCottenConsolidatedRepoF004.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = rawCottenConsolidatedRepoHistory.fetchLastSubmittedRecordBmrNo(report.getBleachingBmrNo());
			if (reportHistory == null) {
				reportHistory = new Qc_RawCottenConsolidatedAnalyticalReportF004History();
			}

			// Copy properties, excluding 'id' and 'details' to avoid shared references
			BeanUtils.copyProperties(report, reportHistory, "id", "details");

			// Ensure the details collection in reportHistory is a new collection and clear any existing data
			reportHistory.setDetails(new ArrayList<>());

			// Copy the details into a new list for the reportHistory entity
			if (report.getDetails() != null) {
				List<Qc_RawCottenConsolidatedDetailsHistory> historyDetails = new ArrayList<>();
				for (Qc_RawCottenConsolidatedDetails detail : report.getDetails()) {
					Qc_RawCottenConsolidatedDetailsHistory historyDetail = new Qc_RawCottenConsolidatedDetailsHistory();
					BeanUtils.copyProperties(detail, historyDetail, "id", "parentId");
					historyDetail.setParentId(reportHistory.getId()); // Link to the parent history entity
					historyDetails.add(historyDetail);
				}
				reportHistory.getDetails().addAll(historyDetails); // Set the new list
			}

			// Get statuses
			String chemistStatus = report.getChemist_status();
			String managerStatus = report.getManager_status();

			// Approval logic based on roles and status
			if (chemistStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted) &&
					managerStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QCApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);

						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QCRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCRejected);

						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					rawCottenConsolidatedRepoF004.save(report);
					rawCottenConsolidatedRepoHistory.save(reportHistory);

					respStatus = report.getManager_status().equalsIgnoreCase("QC_APPROVED") ? "Approved Successfully" : "Rejected Successfully";
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				} else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QAApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);

						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QAReject);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);

						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAReject);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAReject);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					rawCottenConsolidatedRepoF004.save(report);
					rawCottenConsolidatedRepoHistory.save(reportHistory);

					respStatus = report.getManager_status().equalsIgnoreCase("QA_APPROVED") ? "Approved Successfully" : "Rejected Successfully";
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Chemist status is not correct"), HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Raw Cotton Consolidated Report: " + msg), HttpStatus.BAD_REQUEST);
		}
	}



	public ResponseEntity<?> getRawCottonConsolidatedReportByFormatNo(String formatNo) {
		try {

			List<Qc_RawCottenConsolidatedAnalyticalReportF004> listOfRawCottonReport = rawCottenConsolidatedRepoF004
					.getDetailsByFormatNo(formatNo);

			if (listOfRawCottonReport == null) {

				listOfRawCottonReport = new ArrayList<Qc_RawCottenConsolidatedAnalyticalReportF004>();
			}

			return new ResponseEntity<>(listOfRawCottonReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting All Raw Cotton Consolidated Report F004 Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getRawCottonConsolidatedByBmrNo(String bleachingBmrNo) {
		try {

			List<Qc_RawCottenConsolidatedAnalyticalReportF004> listOfRawCottonReport = rawCottenConsolidatedRepoF004.findByMillBatchNo(bleachingBmrNo);

			if (listOfRawCottonReport == null || listOfRawCottonReport.isEmpty()) {
				return new ResponseEntity<>("No Data Found" , HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfRawCottonReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Raw Cotton Analysis Report Details By Material Doc No: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getRawCottonConsolidatedReportById(Long id) {
		try {

			Optional<Qc_RawCottenConsolidatedAnalyticalReportF004> response = rawCottenConsolidatedRepoF004.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Raw Cotton Analysis Report Details By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllRawCottonConsolidatedReport() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_RawCottenConsolidatedAnalyticalReportF004> listOfRawCottonReport = rawCottenConsolidatedRepoF004.findAll();

			if (listOfRawCottonReport == null) {

				listOfRawCottonReport = new ArrayList<Qc_RawCottenConsolidatedAnalyticalReportF004>();
			}

			return new ResponseEntity(listOfRawCottonReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Raw Cotton Analysis Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Raw Cotton Analysis Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAllChemistNotSubmittedF004() {
		SCAUtil sca = new SCAUtil();


		try {

			List<Qc_RawCottenConsolidatedAnalyticalReportF004> listOfRawCottonReport = rawCottenConsolidatedRepoF004
					.findByChemistStatusSavedAndNotApproved();

			if (listOfRawCottonReport == null) {

				listOfRawCottonReport = new ArrayList<Qc_RawCottenConsolidatedAnalyticalReportF004>();
			}

			return new ResponseEntity(listOfRawCottonReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Chemist Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Chemist Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllQcNotSubmittedF004() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_RawCottenConsolidatedAnalyticalReportF004> listOfRawCottonReport = rawCottenConsolidatedRepoF004
					.findByChemistStatusSubmittedAndHodStatusNotApproved();

			if (listOfRawCottonReport == null) {

				listOfRawCottonReport = new ArrayList<Qc_RawCottenConsolidatedAnalyticalReportF004>();
			}

			return new ResponseEntity(listOfRawCottonReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getRawCottonConsolidatedReportForPrint(String bleachingBmrNo) {
		try {

			List<Qc_RawCottenConsolidatedAnalyticalReportF004> listOfRawCottonReport = rawCottenConsolidatedRepoF004.findByBmrNoForPrint(bleachingBmrNo);

			if (listOfRawCottonReport == null || listOfRawCottonReport.isEmpty()) {
				return new ResponseEntity<>("No data found for Material Doc No: " + bleachingBmrNo, HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfRawCottonReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Raw Cotton Analysis Report Details By Material Doc No For Print: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getPdeDataRawCottonConsolidatedBmr() {
		List<IdAndValuePair> response = new ArrayList<>();

		try {
			// Fetch all BMR_NO values
			List<Map<String, Object>> result = bleachBmrLaydownMappingRepo.getMappingBmr();

			// Counter for IDs starting from 1
			final int[] counter = {1};

			// Map the BMR_NO values to key-value pairs with incrementing IDs
			response = result.stream()
					.map(map -> {
						IdAndValuePair pair = new IdAndValuePair();
						pair.setValue((String) map.get("BMR_NO")); // Extract BMR_NO value
						pair.setId((long) counter[0]++); // Incrementing ID for each entry
						return pair;
					})
					.collect(Collectors.toList());

		} catch (Exception ex) {
			String msg = ex.getMessage();
			log.error("Unable to get BMR data: ", ex);

			return new ResponseEntity<>(new ApiResponse(false, "Failed to fetch BMR Data: " + msg), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}


	public ResponseEntity<?> getExistingDatasFromRawCottonAnalysis(String bmrNo) {
		try {

			List<BleachBmrLaydownMapping> mappings = bleachBmrLaydownMappingRepo.getLaydownNo(bmrNo);

			if (mappings.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No laydown found for the provided BMR No: " + bmrNo), HttpStatus.NOT_FOUND);
			}

			List<String> laydownNos = mappings.stream()
					.map(BleachBmrLaydownMapping::getLaydown_no)
					.collect(Collectors.toList());

			List<String> batchNos = new ArrayList<>();

			for (String laydownNo : laydownNos) {
				List<RawCottonIssueResponse> cottonResponses = bleachBmrLaydownMappingRepo.rawCottonResponse(laydownNo);

				batchNos.addAll(cottonResponses.stream()
						.map(RawCottonIssueResponse::getbatchNo)
						.collect(Collectors.toList()));
			}

			List<RawCottonConsolidatePayload> payloads = new ArrayList<>();

			for (String batchNo : batchNos) {
				List<RawCottenAnalysisReportARF001> rawCottonAnalysisReports = rawCottenAnalysisRepo.findAllDataByMillBatchNo(batchNo);

				for (RawCottenAnalysisReportARF001 rawCottonAnalysis : rawCottonAnalysisReports) {
					RawCottonConsolidatePayload payload = new RawCottonConsolidatePayload();
					List<PhysicalAndChemcalTestARF001> physicalChemical=rawCottonAnalysis.getPhysicalAndChemicalTests();
					payload.setId(rawCottonAnalysis.getId());
					payload.setFormatNo(rawCottonAnalysis.getFormatNo());
					payload.setRevisionNo(rawCottonAnalysis.getRevisionNo());
					payload.setFormatName(rawCottonAnalysis.getFormatName());
					payload.setRefSopNo(rawCottonAnalysis.getRefSopNo());
					payload.setDate(rawCottonAnalysis.getDate());
					payload.setMbNo(rawCottonAnalysis.getMillBatchNo());
					payload.setBleachingBmrNo(bmrNo);   
					for (PhysicalAndChemcalTestARF001 physicalAndChemicalARF001 : physicalChemical) {
						payload.setArNo(physicalAndChemicalARF001.getArNo());	
						payload.setDateOfReceipt(physicalAndChemicalARF001.getDateOfReceipt());
						payload.setTestedDate(physicalAndChemicalARF001.getTestedDate());
						payload.setSupplier(physicalAndChemicalARF001.getSupplier());
						payload.setStation(physicalAndChemicalARF001.getStation());
						payload.setVerity(physicalAndChemicalARF001.getCottonVaritey());
						payload.setInvoiceNo(physicalAndChemicalARF001.getBillOrInvoiceNo());
						payload.setNoOfBale(physicalAndChemicalARF001.getNoOfBale());
						payload.setQuantity(physicalAndChemicalARF001.getQuantity());
						payload.setFlourescence(physicalAndChemicalARF001.getFlourescenceObsr());
						payload.setWhiteness(physicalAndChemicalARF001.getWhitenessIndicesObsr());
						payload.setMicronaire(physicalAndChemicalARF001.getMicronaireValueObsr());
						payload.setNepsCount(physicalAndChemicalARF001.getNepsObsr());
						payload.setUql(physicalAndChemicalARF001.getUpperQuartileLengthObsr());
						payload.setLengthByWeightMm(physicalAndChemicalARF001.getLengthByWeightObsr());
						payload.setLengthByNoMm(physicalAndChemicalARF001.getLengthByNoObsr());
						payload.setSfc_w(physicalAndChemicalARF001.getShortFiberCntByWtObsr());
						payload.setSfc_n(physicalAndChemicalARF001.getShortFiberContentByNoObsr());
						payload.setAsh(physicalAndChemicalARF001.getAshContentFrResObsr());
						payload.setEss_ext(physicalAndChemicalARF001.getEitherSolSubFrResObsr());
						payload.setMoisture(physicalAndChemicalARF001.getMoistureContentFrResObsr());
						payload.setTrash(physicalAndChemicalARF001.getTrashResObsr());
						payload.setRemark(physicalAndChemicalARF001.getFinalRemark());					
					}

					payloads.add(payload);
				}
			}

			return new ResponseEntity<>(payloads, HttpStatus.OK);

		} catch (Exception ex) {
			log.error("Error fetching data for BMR No: " + bmrNo, ex);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to fetch data: " + ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	//--------------------------------------------BACTERIAL INCUBATOR TEMPERATURE CALIBRATION REPORT - PH-QCL01/F-012------------------------------------------------



	@Transactional
	public ResponseEntity<?> saveBacterialIncubatorTempCalibReportF012(Qc_BacterialIncubatorTempCalibrationF012 BacterialIncubatorRepo, HttpServletRequest http) {
		if (BacterialIncubatorRepo == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_BacterialIncubatorTempCalibrationF012 savedReport = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Only allow microbiologist to save
			if (role.equals("ROLE_MICROBIOLOGIST")) {
				BacterialIncubatorRepo.setMicrobiologist_saved_by(userName);
				BacterialIncubatorRepo.setMicrobiologist_saved_on(date);
				BacterialIncubatorRepo.setMicrobiologist_saved_id(userId);
				BacterialIncubatorRepo.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report
			if (BacterialIncubatorRepo.getId() != null) {
				savedReport = bacterialIncubatorTempCalRepo.findById(BacterialIncubatorRepo.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(BacterialIncubatorRepo, savedReport, getIgnoredPropertiesF012());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport = bacterialIncubatorTempCalRepo.save(savedReport);
			} else {
				savedReport = bacterialIncubatorTempCalRepo.save(BacterialIncubatorRepo);
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Bacterial Incubator Temperature Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Bacterial Incubator Temperature Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}



	@Transactional
	public ResponseEntity<?> submitBacterialIncubatorTempCalibReportF012(Qc_BacterialIncubatorTempCalibrationF012 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_BacterialIncubatorTempCalibrationF012 reportObj;
		try {
			// Validate the report
			//	        validateBacterialIncubatorF012(report);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (report.getId() != null) {
				// Check if the report exists in the database
				reportObj = bacterialIncubatorTempCalRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update existing record
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);
			} else {
				// Check if there is already an entry for the same week for this equipment
				LocalDate startOfWeek = LocalDate.parse(report.getDate()).with(DayOfWeek.MONDAY);
				LocalDate endOfWeek = startOfWeek.plusDays(6);

				List<Qc_BacterialIncubatorTempCalibrationF012> existingEntries = bacterialIncubatorTempCalRepo
						.findEntriesForWeek(report.getEqIdNo(), java.sql.Date.valueOf(startOfWeek), java.sql.Date.valueOf(endOfWeek));

				if (!existingEntries.isEmpty()) {
					return new ResponseEntity<>(new ApiResponse(false, "Data for this week has already been entered!"), HttpStatus.BAD_REQUEST);
				}

				// Create a new report since no entry exists for the week
				reportObj = new Qc_BacterialIncubatorTempCalibrationF012();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}

			// Copy the properties from the provided report to the reportObj
			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF012Submit());

			// Set fields if the user has the microbiologist role
			if (role.equals("ROLE_MICROBIOLOGIST")) {
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setManager_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				reportObj.setCheckedBy(userName);
				if (reportObj.getManager_sign() != null && !reportObj.getManager_sign().isEmpty()) {
					reportObj.setManager_sign("");
				}
				if (reportObj.getManager_submit_by()!= null && !reportObj.getManager_submit_by().isEmpty()) {
					reportObj.setManager_submit_by("");
				}
				if (reportObj.getManager_submit_id() != null) {
					reportObj.setManager_submit_id(null);
				}
				if (reportObj.getManager_submit_on()!= null) {
					reportObj.setManager_submit_on(null);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only Micro can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save the report in the database
			reportObj = bacterialIncubatorTempCalRepo.save(reportObj);

			// Additional actions (e.g., audit tracking and email sending)
			saveAuditTrackAndSendEmailF012(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Bacterial Incubator Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Bacterial Incubator Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}



	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveBacterialIncubatorTempCalibReport(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		Qc_BacterialIncubatorTempCalibrationF012 report = new Qc_BacterialIncubatorTempCalibrationF012();
		Qc_BacterialIncubatorTempCalibrationF012History reportHistory = new Qc_BacterialIncubatorTempCalibrationF012History();

		String respStatus;
		String userRole = getUserRole();
		System.out.println("user role : "+userRole);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = bacterialIncubatorTempCalRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = bacterialIncubatorTempCalRepoHistory.fetchLastSubmittedRecordByDate(report.getDate());
			if (reportHistory == null) {
				reportHistory = new Qc_BacterialIncubatorTempCalibrationF012History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id");

			// Get statuses
			String microStatus = report.getMicrobiologist_status();
			String managerStatus = report.getManager_status();

			if (microStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted)&&managerStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QCApprove);
						report.setManager_submit_on(date);   
						report.setManager_submit_by(userName);
						report.setManager_sign(userName); 
						report.setManager_submit_id(userId);  
						report.setMail_status(AppConstantsQc.QCApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCApprove);
						reportHistory.setVerifiedBy(userName);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QCRejected);
						report.setManager_submit_on(date);   
						report.setManager_submit_by(userName);
						report.setManager_sign(userName); 
						report.setManager_submit_id(userId);  
						report.setMail_status(AppConstantsQc.QCRejected);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					bacterialIncubatorTempCalRepo.save(report);
					bacterialIncubatorTempCalRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QAApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAApprove);
						reportHistory.setVerifiedBy(userName);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QAReject);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAReject);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAReject);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					bacterialIncubatorTempCalRepo.save(report);
					bacterialIncubatorTempCalRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QA_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}else if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {

					if(report.getMicrobiologist_submit_by().equalsIgnoreCase(userName)){
						return new ResponseEntity<>(new ApiResponse(true, "You are not authorized to Approve/Reject this form"), HttpStatus.OK);
					}

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.MicroDesigneeApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.MicroDesigneeApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.MicroDesigneeApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setVerifiedBy(userName);
						reportHistory.setMail_status(AppConstantsQc.MicroDesigneeApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.MicroDesigneeRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.MicroDesigneeRejected);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.MicroDesigneeRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setVerifiedBy(userName);
						reportHistory.setMail_status(AppConstantsQc.MicroDesigneeRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					bacterialIncubatorTempCalRepo.save(report);
					bacterialIncubatorTempCalRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase(AppConstantsQc.MicroDesigneeApprove)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);


				}
				else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Access Denied For This Role"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Raw Cotton: Chemical Analysis Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getBacterialIncubatorTempCalibReportByFormatNo(String formatNo) {
		try {

			List<Qc_BacterialIncubatorTempCalibrationF012> listOfBacteriaIncubatorReport = bacterialIncubatorTempCalRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfBacteriaIncubatorReport == null) {

				listOfBacteriaIncubatorReport = new ArrayList<Qc_BacterialIncubatorTempCalibrationF012>();
			}

			return new ResponseEntity<>(listOfBacteriaIncubatorReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting All Bacterial Incubator Temprature Calibration Report F012 Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getBacterialIncubatorTempCalibReportByDateMonthYearEqNo(String date, String month, String year,String eqIdNo) {
		try {

			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}
			if (eqIdNo != null && eqIdNo.isEmpty()) {
				eqIdNo = null;
			}

			List<Qc_BacterialIncubatorTempCalibrationF012> listOfBacteriaIncubatorReport = bacterialIncubatorTempCalRepo.findByDateMonthYearEqNo(date, month, year,eqIdNo);

			if (listOfBacteriaIncubatorReport == null || listOfBacteriaIncubatorReport.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfBacteriaIncubatorReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Bacterial Incubator Temp Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getBacterialIncubatorTempCalibReportById(Long id) {
		try {

			Optional<Qc_BacterialIncubatorTempCalibrationF012> response = bacterialIncubatorTempCalRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Bacterial Incubator Temp Report Details By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllBacterialIncubatorTempCalibReport() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_BacterialIncubatorTempCalibrationF012> listOfBacteriaIncubatorReport = bacterialIncubatorTempCalRepo.findAll();

			if (listOfBacteriaIncubatorReport == null) {

				listOfBacteriaIncubatorReport = new ArrayList<Qc_BacterialIncubatorTempCalibrationF012>();
			}

			return new ResponseEntity(listOfBacteriaIncubatorReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Bacterial Incubator Temp Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Chemical Analysis Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAllMicroNotSubmittedF012() {
		SCAUtil sca = new SCAUtil();


		try {

			List<Qc_BacterialIncubatorTempCalibrationF012> listOfBacteriaIncubatorReport = bacterialIncubatorTempCalRepo
					.findByMicroStatusSavedAndNotApproved();

			if (listOfBacteriaIncubatorReport == null) {

				listOfBacteriaIncubatorReport = new ArrayList<Qc_BacterialIncubatorTempCalibrationF012>();
			}

			return new ResponseEntity(listOfBacteriaIncubatorReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Micro Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Micro Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllManagerNotSubmittedF012() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_BacterialIncubatorTempCalibrationF012> listOfBacteriaIncubatorReport = bacterialIncubatorTempCalRepo
					.findByMicroStatusSubmittedAndHodStatusNotApproved();

			if (listOfBacteriaIncubatorReport == null) {

				listOfBacteriaIncubatorReport = new ArrayList<Qc_BacterialIncubatorTempCalibrationF012>();
			}

			return new ResponseEntity(listOfBacteriaIncubatorReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Manager Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Manager Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getPrintBacterialIncubatorTemp(String date, String month, String year,String eqIdNo) {
		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}
			if (eqIdNo != null && eqIdNo.isEmpty()) {
				eqIdNo = null;
			}


			List<Qc_BacterialIncubatorTempCalibrationF012> listOfBacteriaIncubatorReport = bacterialIncubatorTempCalRepo.findForPrint(date, month, year,eqIdNo);

			if (listOfBacteriaIncubatorReport == null || listOfBacteriaIncubatorReport.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfBacteriaIncubatorReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Bacterial Incubator Temp Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	//--------------------------------------------GLASSWARES BREAKAGE & DISPOSAL REGISTER PH-QCL01/F-028------------------------------------------------------------------------------------

	@Transactional
	public ResponseEntity<?> saveGlasswaresBreakageDisposalF028(Qc_GlasswareBreakageDisposalRegisterF028 glasswareBreakageDispo, HttpServletRequest http) {
		if (glasswareBreakageDispo == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_GlasswareBreakageDisposalRegisterF028 savedReport = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Only allow microbiologist to save
			if (role.equals("ROLE_CHEMIST")) {
				glasswareBreakageDispo.setChemist_saved_by(userName);
				glasswareBreakageDispo.setChemist_saved_on(date);
				glasswareBreakageDispo.setChemist_saved_id(userId);
				glasswareBreakageDispo.setChemist_status(AppConstantsQc.chemistSave);
				glasswareBreakageDispo.setDisposerSign(userName);
			}else if (role.equals("ROLE_MICROBIOLOGIST")) {
				glasswareBreakageDispo.setMicrobiologist_saved_by(userName);
				glasswareBreakageDispo.setMicrobiologist_saved_on(date);
				glasswareBreakageDispo.setMicrobiologist_saved_id(userId);
				glasswareBreakageDispo.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
				glasswareBreakageDispo.setDisposerSign(userName);

			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report
			if (glasswareBreakageDispo.getId() != null) {
				savedReport = GlasswareBreakageRepo.findById(glasswareBreakageDispo.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(glasswareBreakageDispo, savedReport, getIgnoredPropertiesF028());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport = GlasswareBreakageRepo.save(savedReport);
			} else {
				savedReport = GlasswareBreakageRepo.save(glasswareBreakageDispo);
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Glassware Breakage Disposal Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Bacterial Incubator Temperature Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}

	@Transactional
	public ResponseEntity<?> submitGlasswareBreakageDisposalF028(Qc_GlasswareBreakageDisposalRegisterF028 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}
		Qc_GlasswareBreakageDisposalRegisterF028 reportObj;
		try {


			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());



			// Check if the report has an ID and exists in the database
			if (report.getId() != null) {
				reportObj = GlasswareBreakageRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update existing record, retaining some of the original properties
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);	
			} else {
				// Create a new report if no ID exists
				reportObj = new Qc_GlasswareBreakageDisposalRegisterF028();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}

			// Copy the properties from the provided report to the reportObj (excluding ignored properties)
			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF028());

			// Set chemist-specific fields if the user has the right role
			if (role.equals("ROLE_CHEMIST")) {
				reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				reportObj.setChemist_submit_on(date);
				reportObj.setChemist_submit_by(userName);
				reportObj.setChemist_submit_id(userId);
				reportObj.setChemist_sign(userName);
				reportObj.setMail_status(AppConstantsQc.chemistSubmitted);


			}else if (role.equals("ROLE_MICROBIOLOGIST")) {
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);;
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setMail_status(AppConstantsQc.microBiologistSubmitted);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only Chemist or Micro can submit"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report in the database
			reportObj= GlasswareBreakageRepo.save(reportObj);


		} catch (Exception ex) {
			log.error("**** Unable to Submit Glassware Breakage Disposal Register Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Glassware Breakage Disposal Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> getGlasswareBreakageDisposalF028ByFormatNo(String formatNo) {
		try {

			List<Qc_GlasswareBreakageDisposalRegisterF028> listOfGlasswareBreakageReport = GlasswareBreakageRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfGlasswareBreakageReport == null) {

				listOfGlasswareBreakageReport = new ArrayList<Qc_GlasswareBreakageDisposalRegisterF028>();
			}

			return new ResponseEntity<>(listOfGlasswareBreakageReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Glassware Breakage Disposal Report F012 Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getGlasswareBreakageDisposalF028ById(Long id) {
		try {

			Optional<Qc_GlasswareBreakageDisposalRegisterF028> response = GlasswareBreakageRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Glassware Breakage Disposal Report F028 Details By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllGlasswareBreakageDisposalReport(HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		List<Qc_GlasswareBreakageDisposalRegisterF028> listOfGlasswareBreakageReport = null ;

		try {
			if (role.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
				listOfGlasswareBreakageReport=GlasswareBreakageRepo.findByMicroStatusSavedAndNotApproved();

			} else if (role.equalsIgnoreCase("ROLE_CHEMIST")) {
				listOfGlasswareBreakageReport=GlasswareBreakageRepo.findByChmistStatusSavedAndNotApproved();
			}

			if (listOfGlasswareBreakageReport == null) {

				listOfGlasswareBreakageReport = new ArrayList<Qc_GlasswareBreakageDisposalRegisterF028>();
			}

			return new ResponseEntity(listOfGlasswareBreakageReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Glassware Breakage Disposal Report Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Glassware Breakage Disposal Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getPrintGlasswareBreakageDisposal(String date, String month, String year) {
		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}


			List<Qc_GlasswareBreakageDisposalRegisterF028> listOfGlasswareBreakageReport = GlasswareBreakageRepo.findForPrint(date, month, year);

			if (listOfGlasswareBreakageReport == null || listOfGlasswareBreakageReport.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfGlasswareBreakageReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Glassware Breakage Disposal Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//-------------------------------------CLEANING OF AUTOCLAVES PH-QCL01/F-023-----------------------------------------------------------------------------	

	@Transactional
	public ResponseEntity<?> saveCleaningOfAutoclavesF023(Qc_CleaningOfAutoclavesF023 CleaningOfAutoclavesF023, HttpServletRequest http) {
		if (CleaningOfAutoclavesF023 == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_CleaningOfAutoclavesF023 savedReport = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Only allow microbiologist to save
			if (role.equals("ROLE_MICROBIOLOGIST")) {
				CleaningOfAutoclavesF023.setMicrobiologist_saved_by(userName);
				CleaningOfAutoclavesF023.setMicrobiologist_saved_on(date);
				CleaningOfAutoclavesF023.setMicrobiologist_saved_id(userId);
				CleaningOfAutoclavesF023.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report
			if (CleaningOfAutoclavesF023.getId() != null) {
				savedReport = cleaningOfAutoclaveRepo.findById(CleaningOfAutoclavesF023.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(CleaningOfAutoclavesF023, savedReport, getIgnoredPropertiesF023());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport = cleaningOfAutoclaveRepo.save(savedReport);
			} else {
				savedReport = cleaningOfAutoclaveRepo.save(CleaningOfAutoclavesF023);
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Cleaning Of Autoclaves Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Cleaning Of Autoclaves Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}

	@Transactional
	public ResponseEntity<?> submitCleaningOfAutoclavesF023(Qc_CleaningOfAutoclavesF023 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}
		Qc_CleaningOfAutoclavesF023 reportObj;
		try {


			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());



			// Check if the report has an ID and exists in the database
			if (report.getId() != null) {
				reportObj = cleaningOfAutoclaveRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update existing record, retaining some of the original properties
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);	
			} else {
				// Create a new report if no ID exists
				reportObj = new Qc_CleaningOfAutoclavesF023();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}

			// Copy the properties from the provided report to the reportObj (excluding ignored properties)
			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF023());

			// Set chemist-specific fields if the user has the right role
			if (role.equals("ROLE_MICROBIOLOGIST")) {
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setMail_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setLab3VerifiedBy(userName);	 

			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only Chemist can submit"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report in the database
			reportObj= cleaningOfAutoclaveRepo.save(reportObj);


		} catch (Exception ex) {
			log.error("**** Unable to Submit Cleaning Of Autoclaves Register Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Cleaning Of Autoclaves Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}

	public ResponseEntity<?> getCleaningOfAutoclavesF023ByFormatNo(String formatNo) {
		try {

			List<Qc_CleaningOfAutoclavesF023> listOfCleaningOfAutoclavesF023 = cleaningOfAutoclaveRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfCleaningOfAutoclavesF023 == null) {

				listOfCleaningOfAutoclavesF023 = new ArrayList<Qc_CleaningOfAutoclavesF023>();
			}

			return new ResponseEntity<>(listOfCleaningOfAutoclavesF023, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Cleaning Of Autoclaves Report F023 Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getCleaningOfAutoclavesF023ById(Long id) {
		try {

			Optional<Qc_CleaningOfAutoclavesF023> response = cleaningOfAutoclaveRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Cleaning Of Autoclaves Report F023 Details By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllCleaningOfAutoclavesF023Report() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_CleaningOfAutoclavesF023> listOfCleaningOfAutoclavesF023 = cleaningOfAutoclaveRepo.findAll();

			if (listOfCleaningOfAutoclavesF023 == null) {

				listOfCleaningOfAutoclavesF023 = new ArrayList<Qc_CleaningOfAutoclavesF023>();
			}

			return new ResponseEntity(listOfCleaningOfAutoclavesF023, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Cleaning Of Autoclaves Report F023 Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Cleaning Of Autoclaves Report F023 Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	//	public ResponseEntity<?> getPrintCleaningOfAutoclavesF023(String date, String month, String year,String week) {
	//	    try {
	//	    	if (date != null && date.isEmpty()) {
	//	    		date = null;
	//	        }
	//	    	if (month != null && month.isEmpty()) {
	//	            month = null;
	//	        }
	//	        if (year != null && year.isEmpty()) {
	//	            year = null;
	//	        }
	//	        if (week != null && week.isEmpty()) {
	//	        	week = null;
	//	        }
	//	    	
	//	    	
	//	        List<Qc_CleaningOfAutoclavesF023> listOfCleaningOfAutoclavesF023 = cleaningOfAutoclaveRepo.findForPrint(date, month, year,week);
	//
	//	        if (listOfCleaningOfAutoclavesF023 == null || listOfCleaningOfAutoclavesF023.isEmpty()) {
	//	            return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
	//	        }
	//
	//	        return new ResponseEntity<>(listOfCleaningOfAutoclavesF023, HttpStatus.OK);
	//	    } catch (Exception e) {
	//	        return new ResponseEntity<>("Error getting Cleaning Of Autoclaves Report F023 Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
	//	    }
	//	}

	public ResponseEntity<?> getPrintCleaningOfAutoclavesF023(String date, String month, String year, String week) {
		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}
			if (week != null && week.isEmpty()) {
				week = null;
			}

			List<Qc_CleaningOfAutoclavesF023> listOfCleaningOfAutoclavesF023 = cleaningOfAutoclaveRepo.findForPrint(date, month, year, week);

			if (listOfCleaningOfAutoclavesF023 == null || listOfCleaningOfAutoclavesF023.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			// Transform the fetched entities to the new response structure
			List<CleaningOfAutoclavesF023Response> responseList = listOfCleaningOfAutoclavesF023.stream().map(item -> {
				CleaningOfAutoclavesF023Response response = new CleaningOfAutoclavesF023Response();

				// Set common fields
				response.setCreatedAt(item.getCreatedAt());
				response.setUpdatedAt(item.getUpdatedAt());
				response.setCreatedBy(item.getCreatedBy());
				response.setUpdatedBy(item.getUpdatedBy());
				response.setId(item.getId());
				response.setFormatNo(item.getFormatNo());
				response.setRevisionNo(item.getRevisionNo());
				response.setFormatName(item.getFormatName());
				response.setRefSopNo(item.getRefSopNo());
				response.setDate(item.getDate());
				response.setMonth(item.getMonth());
				response.setYear(item.getYear());
				response.setWeek(item.getWeek());
				response.setMicrobiologist_status(item.getMicrobiologist_status());
				response.setMicrobiologist_saved_on(item.getMicrobiologist_saved_on());
				response.setMicrobiologist_saved_by(item.getMicrobiologist_saved_by());
				response.setMicrobiologist_saved_id(item.getMicrobiologist_saved_id());
				response.setMicrobiologist_submit_on(item.getMicrobiologist_submit_on());
				response.setMicrobiologist_submit_by(item.getMicrobiologist_submit_by());
				response.setMicrobiologist_submit_id(item.getMicrobiologist_submit_id());
				response.setMicrobiologist_sign(item.getMicrobiologist_sign());
				response.setMail_status(item.getMail_status());

				// Group Lab7 details
				Map<String, Object> lab7Details = new HashMap<>();
				lab7Details.put("sno", item.getLab7Sno());
				lab7Details.put("cleanedBy", item.getLab7CleanedBy());
				lab7Details.put("verifiedBy", item.getLabe7VerifiedBY());

				// Add Lab7 details to response
				Map<String, Object> lab7Map = new HashMap<>();
				//	            lab7Map.put(item.getEqIdLab7(), lab7Details);
				lab7Map.put("PH_E_I_LAB07", lab7Details);
				response.setLab7Details(lab7Map);

				// Group Lab3 details
				Map<String, Object> lab3Details = new HashMap<>();
				lab3Details.put("sno", item.getLab3Sno());
				lab3Details.put("cleanedBy", item.getLab3CleanedBy());
				lab3Details.put("verifiedBy", item.getLab3VerifiedBy());

				// Add Lab3 details to response
				Map<String, Object> lab3Map = new HashMap<>();
				//	            lab3Map.put(item.getEqIdLab3(), lab3Details);
				lab3Map.put("PH_E_I_LAB03", lab3Details);
				response.setLab3Details(lab3Map);

				return response;
			}).collect(Collectors.toList());

			return new ResponseEntity<>(responseList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Cleaning Of Autoclaves Report F023 Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}




	public ResponseEntity<?> getCleaningOfAutoclavesF023ByDate(String date, String month, String year) {
		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}


			List<Qc_CleaningOfAutoclavesF023> listOfCleaningOfAutoclavesF023 = cleaningOfAutoclaveRepo.findByDateMonthYear(date, month, year);

			if (listOfCleaningOfAutoclavesF023 == null || listOfCleaningOfAutoclavesF023.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfCleaningOfAutoclavesF023, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Cleaning Of Autoclaves Report F023 Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//---------------------------------------------VALIDATION FOR AUTOCLAVE BY CHEMICAL INDICATOR PH-QCL01/F-014-------------------------------------------------------------------------------------

	@Transactional
	public ResponseEntity<?> saveValidationForAutoclaveByChemicalIndiF014(Qc_ValidationForAutoclaveByChemicalIndicatorF014 validationForAutoclaveF014, HttpServletRequest http) {
		if (validationForAutoclaveF014 == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_ValidationForAutoclaveByChemicalIndicatorF014 savedReport = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Only allow microbiologist to save
			if (role.equals("ROLE_MICROBIOLOGIST")) {
				validationForAutoclaveF014.setMicrobiologist_saved_by(userName);
				validationForAutoclaveF014.setMicrobiologist_saved_on(date);
				validationForAutoclaveF014.setMicrobiologist_saved_id(userId);
				validationForAutoclaveF014.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
				validationForAutoclaveF014.setCheckedBy(userName);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report
			if (validationForAutoclaveF014.getId() != null) {
				savedReport = ValidationForAutoclaveChemRepo.findById(validationForAutoclaveF014.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(validationForAutoclaveF014, savedReport, getIgnoredPropertiesF012());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport = ValidationForAutoclaveChemRepo.save(savedReport);
			} else {
				savedReport = ValidationForAutoclaveChemRepo.save(validationForAutoclaveF014);
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Validation For Autoclave Chemical Indicator F014 Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Bacterial Incubator Temperature Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}



	@Transactional
	public ResponseEntity<?> submitValidationForAutoclaveByChemicalIndiF014(Qc_ValidationForAutoclaveByChemicalIndicatorF014 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_ValidationForAutoclaveByChemicalIndicatorF014 reportObj;
		try {
			// Validate the report
			//	        validateBacterialIncubatorF012(report);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (report.getId() != null) {
				// Check if the report exists in the database
				reportObj = ValidationForAutoclaveChemRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update existing record
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);
			} else {

				// Create a new report since no entry exists for the week
				reportObj = new Qc_ValidationForAutoclaveByChemicalIndicatorF014();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}

			// Copy the properties from the provided report to the reportObj
			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF012Submit());

			// Set fields if the user has the microbiologist role
			if (role.equals("ROLE_MICROBIOLOGIST")) {
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setManager_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				reportObj.setCheckedBy(userName);	
				if (reportObj.getManager_sign() != null && !reportObj.getManager_sign().isEmpty()) {
					reportObj.setManager_sign("");
				}
				if (reportObj.getManager_submit_by()!= null && !reportObj.getManager_submit_by().isEmpty()) {
					reportObj.setManager_submit_by("");
				}
				if (reportObj.getManager_submit_id() != null) {
					reportObj.setManager_submit_id(null);
				}
				if (reportObj.getManager_submit_on()!= null) {
					reportObj.setManager_submit_on(null);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only Micro can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save the report in the database
			reportObj = ValidationForAutoclaveChemRepo.save(reportObj);

			// Additional actions (e.g., audit tracking and email sending)
			saveAuditTrackAndSendEmailF014(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Bacterial Incubator Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Bacterial Incubator Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}



	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveValidationForAutoclaveByChemicaIndiF014(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		Qc_ValidationForAutoclaveByChemicalIndicatorF014 report = new Qc_ValidationForAutoclaveByChemicalIndicatorF014();
		Qc_ValidationForAutoclaveByChemicalIndicatorF014History reportHistory = new Qc_ValidationForAutoclaveByChemicalIndicatorF014History();

		String respStatus;
		String userRole = getUserRole();
		System.out.println("user role : "+userRole);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = ValidationForAutoclaveChemRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = ValidationForAutoclaveChemReopHistory.fetchLastSubmittedRecordByDate(report.getDate());
			if (reportHistory == null) {
				reportHistory = new Qc_ValidationForAutoclaveByChemicalIndicatorF014History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id");

			// Get statuses
			String microStatus = report.getMicrobiologist_status();
			String managerStatus = report.getManager_status();

			if (microStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted)&&managerStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QCApprove);
						report.setManager_submit_on(date);   
						report.setManager_submit_by(userName);
						report.setManager_sign(userName); 
						report.setManager_submit_id(userId);  
						report.setMail_status(AppConstantsQc.QCApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCApprove);
						reportHistory.setVerifiedBy(userName);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QCRejected);
						report.setManager_submit_on(date);   
						report.setManager_submit_by(userName);
						report.setManager_sign(userName); 
						report.setManager_submit_id(userId);  
						report.setMail_status(AppConstantsQc.QCRejected);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					ValidationForAutoclaveChemRepo.save(report);
					ValidationForAutoclaveChemReopHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QAApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAApprove);
						reportHistory.setVerifiedBy(userName);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QAReject);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAReject);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAReject);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					ValidationForAutoclaveChemRepo.save(report);
					ValidationForAutoclaveChemReopHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QA_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}else if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {

					if(report.getMicrobiologist_submit_by().equalsIgnoreCase(userName)){
						return new ResponseEntity<>(new ApiResponse(true, "You are not authorized to Approve/Reject this form"), HttpStatus.OK);
					}

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.MicroDesigneeApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.MicroDesigneeApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.MicroDesigneeApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setVerifiedBy(userName);
						reportHistory.setMail_status(AppConstantsQc.MicroDesigneeApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.MicroDesigneeRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.MicroDesigneeRejected);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.MicroDesigneeRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setVerifiedBy(userName);
						reportHistory.setMail_status(AppConstantsQc.MicroDesigneeRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					ValidationForAutoclaveChemRepo.save(report);
					ValidationForAutoclaveChemReopHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase(AppConstantsQc.MicroDesigneeApprove)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);


				}
				else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Access Denied For This Role"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Raw Cotton: Chemical Analysis Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getValidationForAutoclaveByChemicalIndiF014ByFormatNo(String formatNo) {
		try {

			List<Qc_ValidationForAutoclaveByChemicalIndicatorF014> listOfValidationForAutoclaveReport = ValidationForAutoclaveChemRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfValidationForAutoclaveReport == null) {

				listOfValidationForAutoclaveReport = new ArrayList<Qc_ValidationForAutoclaveByChemicalIndicatorF014>();
			}

			return new ResponseEntity<>(listOfValidationForAutoclaveReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting All Validate For Autoclave By Chemnical Indicator Report F014 Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getValidationForAutoclaveByChemicalIndiF014ByDate(String date,String eqIdNo) {
		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (eqIdNo != null && eqIdNo.isEmpty()) {
				eqIdNo = null;
			}

			List<Qc_ValidationForAutoclaveByChemicalIndicatorF014> listOfValidationForAutoclaveReport = ValidationForAutoclaveChemRepo.findByDateEqNo(date,eqIdNo);

			if (listOfValidationForAutoclaveReport == null || listOfValidationForAutoclaveReport.isEmpty()) {
				return new ResponseEntity<>("No Data Found" , HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfValidationForAutoclaveReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Validate For Autoclave By Chemnical Indicator Report F014 Form's By By Date: " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getValidationForAutoclaveByChemicalIndiF014ById(Long id) {
		try {

			Optional<Qc_ValidationForAutoclaveByChemicalIndicatorF014> response = ValidationForAutoclaveChemRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Validate For Autoclave By Chemnical Indicator Report F014 By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllValidationForAutoclaveByChemicalIndiF014Report() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_ValidationForAutoclaveByChemicalIndicatorF014> listOfValidationForAutoclaveReport = ValidationForAutoclaveChemRepo.findAll();

			if (listOfValidationForAutoclaveReport == null) {

				listOfValidationForAutoclaveReport = new ArrayList<Qc_ValidationForAutoclaveByChemicalIndicatorF014>();
			}

			return new ResponseEntity(listOfValidationForAutoclaveReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Validate For Autoclave By Chemnical Indicator Report F014 Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Validate For Autoclave By Chemnical Indicator Report F014 Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAllMicroNotSubmittedF014() {
		SCAUtil sca = new SCAUtil();


		try {

			List<Qc_ValidationForAutoclaveByChemicalIndicatorF014> listOfValidationForAutoclaveReport = ValidationForAutoclaveChemRepo
					.findByMicroStatusSavedAndNotApproved();

			if (listOfValidationForAutoclaveReport == null) {

				listOfValidationForAutoclaveReport = new ArrayList<Qc_ValidationForAutoclaveByChemicalIndicatorF014>();
			}

			return new ResponseEntity(listOfValidationForAutoclaveReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Micro Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Micro Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllManagerNotSubmittedF014() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_ValidationForAutoclaveByChemicalIndicatorF014> listOfValidationForAutoclaveReport = ValidationForAutoclaveChemRepo
					.findByMicroStatusSubmittedAndHodStatusNotApproved();

			if (listOfValidationForAutoclaveReport == null) {

				listOfValidationForAutoclaveReport = new ArrayList<Qc_ValidationForAutoclaveByChemicalIndicatorF014>();
			}

			return new ResponseEntity(listOfValidationForAutoclaveReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Manager Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Manager Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getPrintValidationForAutoclaveByChemical(String date, String month, String year,String eqIdNo) {
		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}
			if (eqIdNo != null && eqIdNo.isEmpty()) {
				eqIdNo = null;
			}


			List<Qc_ValidationForAutoclaveByChemicalIndicatorF014> listOfValidationForAutoclaveReport = ValidationForAutoclaveChemRepo.findForPrint(date, month, year,eqIdNo);

			if (listOfValidationForAutoclaveReport == null || listOfValidationForAutoclaveReport.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfValidationForAutoclaveReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Validation For Autoclave Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	//----------------------------------------------------PH METER CALIBRATION REPORT PH-QCL01/F-006-------------------------------------------------------------------------------

	@Transactional
	public ResponseEntity<?> savePhMeterCalibrationReport(QcPhMeterCalibrationReportF006 phMeterCalibrationReport, HttpServletRequest http) {
		if (phMeterCalibrationReport == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		QcPhMeterCalibrationReportF006 savedReport = null;

		try {
			//	        validateChemicalReport(chemicalAnalysisReport);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (role.equals("ROLE_CHEMIST")) {
				phMeterCalibrationReport.setChemist_saved_by(userName);
				phMeterCalibrationReport.setChemist_saved_on(date);
				phMeterCalibrationReport.setChemist_saved_id(userId);
				phMeterCalibrationReport.setChemist_status(AppConstantsQc.chemistSave);
				phMeterCalibrationReport.setCheckedBy(userName);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save the report
			if (phMeterCalibrationReport.getId() != null) {
				savedReport = phMeterCalibRepo.findById(phMeterCalibrationReport.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(phMeterCalibrationReport, savedReport, getIgnoredPropertiesF006());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport= phMeterCalibRepo.save(savedReport);
			} else {
				savedReport = phMeterCalibRepo.save(phMeterCalibrationReport);
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Ph Meter Calibration Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save Ph Meter Calibration Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}

	@Transactional
	public ResponseEntity<?> submitPhMeterCalibrationReport(QcPhMeterCalibrationReportF006 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}
		QcPhMeterCalibrationReportF006 reportObj;
		try {
			// Validate the chemical report
			//	    	validateTdsMeterCalibrationReport(report);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());



			// Check if the report has an ID and exists in the database
			if (report.getId() != null) {
				reportObj = phMeterCalibRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update existing record, retaining some of the original properties
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);	
			} else {
				// Create a new report if no ID exists
				reportObj = new QcPhMeterCalibrationReportF006();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}

			// Copy the properties from the provided report to the reportObj (excluding ignored properties)
			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesPhMeterCalibrationSubmit());

			// Set chemist-specific fields if the user has the right role
			if (role.equals("ROLE_CHEMIST")) {
				reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				reportObj.setChemist_submit_on(date);
				reportObj.setChemist_submit_by(userName);
				reportObj.setChemist_submit_id(userId);
				reportObj.setChemist_sign(userName);
				reportObj.setManager_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				if (reportObj.getManager_sign() != null && !reportObj.getManager_sign().isEmpty()) {
					reportObj.setManager_sign("");
				}
				if (reportObj.getManager_submit_by()!= null && !reportObj.getManager_submit_by().isEmpty()) {
					reportObj.setManager_submit_by("");
				}
				if (reportObj.getManager_submit_id() != null) {
					reportObj.setManager_submit_id(null);
				}
				if (reportObj.getManager_submit_on()!= null) {
					reportObj.setManager_submit_on(null);
				}
				//	            reportObj.setVerifiedBy(userName);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only chemist can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report in the database
			reportObj= phMeterCalibRepo.save(reportObj);

			// Additional actions like audit tracking and email sending can be added here
			saveAuditTrackAndSendEmailPhMeterCalibration(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Chemical Analysis Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}



	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approvePhMeterCalibrationReport(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		QcPhMeterCalibrationReportF006 report = new QcPhMeterCalibrationReportF006();
		QcPhMeterCalibrationReportF006History reportHistory = new QcPhMeterCalibrationReportF006History();

		String respStatus;
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = phMeterCalibRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = phMeterCalibHistoryRepo.fetchLastSubmittedRecordDate(report.getDate());
			if (reportHistory == null) {
				reportHistory = new QcPhMeterCalibrationReportF006History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id");

			// Get statuses
			String chemistStatus = report.getChemist_status();
			String managerStatus = report.getManager_status();

			if (chemistStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)&&managerStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QCApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QCRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setVerifiedBy(userName);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setManager_sign(userName);
						reportHistory.setVerifiedBy(userName);
						reportHistory.setMail_status(AppConstantsQc.QCRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					phMeterCalibRepo.save(report);
					phMeterCalibHistoryRepo.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QAApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAApprove);
						report.setVerifiedBy(userName);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QAReject);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setVerifiedBy(userName);
						report.setMail_status(AppConstantsQc.QAReject);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAReject);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setManager_sign(userName);
						reportHistory.setVerifiedBy(userName);
						reportHistory.setMail_status(AppConstantsQc.QAReject);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					phMeterCalibRepo.save(report);
					phMeterCalibHistoryRepo.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase(AppConstantsQc.QAApprove)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				}else if (userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")) {
					if(report.getChemist_submit_by().equalsIgnoreCase(userName)){
						return new ResponseEntity<>(new ApiResponse(true, "You are not authorized to Approve/Reject this form"), HttpStatus.OK);
					}

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.ChemistDesigneeApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.ChemistDesigneeApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.ChemistDesigneeApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.ChemistDesigneeApprove);
						report.setVerifiedBy(userName);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.ChemistDesigneeRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setVerifiedBy(userName);
						report.setMail_status(AppConstantsQc.ChemistDesigneeRejected);

						// Update history
						reportHistory.setManager_status(AppConstantsQc.ChemistDesigneeRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setManager_sign(userName);
						reportHistory.setVerifiedBy(userName);
						reportHistory.setMail_status(AppConstantsQc.ChemistDesigneeRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					phMeterCalibRepo.save(report);
					phMeterCalibHistoryRepo.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase(AppConstantsQc.ChemistDesigneeApprove)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);


				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Chemist is not correct"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getPhMeterCalibrationReportFormatNo(String formatNo) {
		try {



			List<QcPhMeterCalibrationReportF006> listOfPhMeterCalibration = phMeterCalibRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfPhMeterCalibration == null) {

				listOfPhMeterCalibration = new ArrayList<QcPhMeterCalibrationReportF006>();
			}

			return new ResponseEntity<>(listOfPhMeterCalibration, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Ph Meter Calibration Report Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getPhMeterCalibrationReportByDateMonthYear(String date, String month, String year,String eqIdNo) {

		try {

			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}
			if (eqIdNo != null && eqIdNo.isEmpty()) {
				eqIdNo = null;
			}

			List<QcPhMeterCalibrationReportF006> listOfPhMeterCalibration = phMeterCalibRepo.findByDateMonthYear(date, month, year,eqIdNo);

			if (listOfPhMeterCalibration == null || listOfPhMeterCalibration.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfPhMeterCalibration, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Ph Meter Calibration Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getPhMeterCalibrationReportById(Long id) {
		try {

			Optional<QcPhMeterCalibrationReportF006> response = phMeterCalibRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Ph Meter Calibration Report Form's By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllPhMeterCalibrationReport() {
		SCAUtil sca = new SCAUtil();

		try {

			List<QcPhMeterCalibrationReportF006> listOfPhMeterCalibration = phMeterCalibRepo.findAll();

			if (listOfPhMeterCalibration == null) {

				listOfPhMeterCalibration = new ArrayList<QcPhMeterCalibrationReportF006>();
			}

			return new ResponseEntity(listOfPhMeterCalibration, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Ph Meter Calibration Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Ph Meter Calibration Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllChemistNotSubmittedF006() {
		SCAUtil sca = new SCAUtil();


		try {

			List<QcPhMeterCalibrationReportF006> listOfPhMeterCalibration = phMeterCalibRepo
					.findByChemistStatusSavedAndNotApproved();

			if (listOfPhMeterCalibration == null) {

				listOfPhMeterCalibration = new ArrayList<QcPhMeterCalibrationReportF006>();
			}

			return new ResponseEntity(listOfPhMeterCalibration, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllQcNotSubmittedF006() {
		SCAUtil sca = new SCAUtil();

		try {

			List<QcPhMeterCalibrationReportF006> listOfPhMeterCalibration = phMeterCalibRepo
					.findByChemistStatusSubmittedAndHodStatusNotApproved();

			if (listOfPhMeterCalibration == null) {

				listOfPhMeterCalibration = new ArrayList<QcPhMeterCalibrationReportF006>();
			}

			return new ResponseEntity(listOfPhMeterCalibration, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getPhMeterCalibrationReportForPrint(String date, String month, String year,String eqIdNo) {
		try {
			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}
			if (eqIdNo != null && eqIdNo.isEmpty()) {
				eqIdNo = null;
			}

			List<QcPhMeterCalibrationReportF006> listOfPhMeterCalibration = phMeterCalibRepo.getForReportPrint(date, month, year,eqIdNo);

			if (listOfPhMeterCalibration == null || listOfPhMeterCalibration.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfPhMeterCalibration, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting TDS Meter Calibration Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//---------------------------------------- REAGENT PREPARATION RECORD PH-QCL01/F-017------------------------------------------------------------

	@Transactional
	public ResponseEntity<?> saveRegantPreparationReportF017(QcReagentPreparationRecordF017 reagentPreparationRecord, HttpServletRequest http) {
		if (reagentPreparationRecord == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		QcReagentPreparationRecordF017 savedReport = null;

		try {
			//	        validateChemicalReport(chemicalAnalysisReport);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			String month = reagentPreparationRecord.getMonth();
			String year = reagentPreparationRecord.getYear();

			// Check for duplicates
			List<QcReagentPreparationRecordF017> existingRecords = regantPreparationRepo.findByMonthAndYear(month, year);
			if (!existingRecords.isEmpty()) {
				QcReagentPreparationRecordF017 existingRecord = existingRecords.get(0);
				if (reagentPreparationRecord.getId() == null || !existingRecord.getId().equals(reagentPreparationRecord.getId())) {
					return new ResponseEntity<>(new ApiResponse(true, "A record for the same month and year already exists."), HttpStatus.OK);
				}
			}

			if (role.equals("ROLE_CHEMIST")) {
				reagentPreparationRecord.setChemist_saved_by(userName);
				reagentPreparationRecord.setChemist_saved_on(date);
				reagentPreparationRecord.setChemist_saved_id(userId);
				reagentPreparationRecord.setChemist_status(AppConstantsQc.chemistSave);
			}else if (role.equals("ROLE_MICROBIOLOGIST")) {
				reagentPreparationRecord.setMicrobiologist_saved_by(userName);
				reagentPreparationRecord.setMicrobiologist_saved_on(date);
				reagentPreparationRecord.setMicrobiologist_saved_id(userId);
				reagentPreparationRecord.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save the report
			if (reagentPreparationRecord.getId() != null) {
				savedReport = regantPreparationRepo.findById(reagentPreparationRecord.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(reagentPreparationRecord, savedReport, getIgnoredPropertiesF017());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport= regantPreparationRepo.save(savedReport);
				
				// Save Chemical Tables
				if(reagentPreparationRecord.getQcReagentPreparationRecordF017ChemTables()!=null) {
					for(QcReagentPreparationRecordF017ChemTable chemTable: reagentPreparationRecord.getQcReagentPreparationRecordF017ChemTables()) {
						chemTable.setReagentPrepId(reagentPreparationRecord.getId());
						chemTable.setQcReagentPreparationRecordF017(reagentPreparationRecord);
					}
					reagentPreparationRecordF017ChemRepo.saveAll(reagentPreparationRecord.getQcReagentPreparationRecordF017ChemTables());
				}
				
				} else {
				savedReport = regantPreparationRepo.save(reagentPreparationRecord);
				// Save Chemical Tables
				if(reagentPreparationRecord.getQcReagentPreparationRecordF017ChemTables()!=null) {
					for(QcReagentPreparationRecordF017ChemTable chemTable: reagentPreparationRecord.getQcReagentPreparationRecordF017ChemTables()) {
						chemTable.setReagentPrepId(reagentPreparationRecord.getId());
						chemTable.setQcReagentPreparationRecordF017(reagentPreparationRecord);
					}
					reagentPreparationRecordF017ChemRepo.saveAll(reagentPreparationRecord.getQcReagentPreparationRecordF017ChemTables());
				}
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Regent Presentation Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to save Regent Presentation Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}

    // submit version after adding chemical table 
	@Transactional
	public ResponseEntity<?> submitRegantPreparationReportF017(QcReagentPreparationRecordF017 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}
		QcReagentPreparationRecordF017 reportObj;
		try {
			// Validate the chemical report
			//	    	validateTdsMeterCalibrationReport(report);

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());



			// Check if the report has an ID and exists in the database
			if (report.getId() != null) {
				reportObj = regantPreparationRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update existing record, retaining some of the original properties
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);	
			} else {
				// Create a new report if no ID exists
				String month = report.getMonth();
				String year = report.getYear();

				// Check for duplicates
				List<QcReagentPreparationRecordF017> existingRecords = regantPreparationRepo.findByMonthAndYear(month, year);
				if (!existingRecords.isEmpty()) {
					QcReagentPreparationRecordF017 existingRecord = existingRecords.get(0);
					if (report.getId() == null || !existingRecord.getId().equals(report.getId())) {
						return new ResponseEntity<>(new ApiResponse(true, "A record for the same month and year already exists."), HttpStatus.OK);
					}
				}
				reportObj = new QcReagentPreparationRecordF017();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}    

			// Copy the properties from the provided report to the reportObj (excluding ignored properties)
			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF017());

			// Set chemist-specific fields if the user has the right role
			if (role.equals("ROLE_CHEMIST")) {
				reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
				reportObj.setChemist_submit_on(date);
				reportObj.setChemist_submit_by(userName);
				reportObj.setChemist_submit_id(userId);
				reportObj.setChemist_sign(userName);
				reportObj.setManager_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				reportObj.setPreparedBy(userName);
				if (reportObj.getManager_sign() != null && !reportObj.getManager_sign().isEmpty()) {
					reportObj.setManager_sign("");
				}
				if (reportObj.getManager_submit_by()!= null && !reportObj.getManager_submit_by().isEmpty()) {
					reportObj.setManager_submit_by("");
				}
				if (reportObj.getManager_submit_id() != null) {
					reportObj.setManager_submit_id(null);
				}
				if (reportObj.getManager_submit_on()!= null) {
					reportObj.setManager_submit_on(null);
				}
			}else if (role.equals("ROLE_MICROBIOLOGIST")) {
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setManager_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				reportObj.setPreparedBy(userName);
				if (reportObj.getManager_sign() != null && !reportObj.getManager_sign().isEmpty()) {
					reportObj.setManager_sign("");
				}
				if (reportObj.getManager_submit_by()!= null && !reportObj.getManager_submit_by().isEmpty()) {
					reportObj.setManager_submit_by("");
				}
				if (reportObj.getManager_submit_id() != null) {
					reportObj.setManager_submit_id(null);
				}
				if (reportObj.getManager_submit_on()!= null) {
					reportObj.setManager_submit_on(null);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only chemist can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the report in the database
			reportObj= regantPreparationRepo.save(reportObj);

			// Additional actions like audit tracking and email sending can be added here
			saveAuditTrackAndSendEmailRegentPreparationRecord(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Chemical Analysis Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}


	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveRegantPreparationReportF017(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		QcReagentPreparationRecordF017 report = new QcReagentPreparationRecordF017();
		QcReagentPreparationRecordF017History reportHistory = new QcReagentPreparationRecordF017History();

		String respStatus;
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = regantPreparationRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = regantPreparationRepoHistory.fetchLastSubmittedRecordDate(report.getMonth(), report.getYear());
			if (reportHistory == null) {
				reportHistory = new QcReagentPreparationRecordF017History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id");

			// Get statuses
			String chemistStatus = report.getChemist_status();
			String microStatus= report.getMicrobiologist_status();
			String managerStatus = report.getManager_status();

			if (
					(AppConstantsQc.chemistSubmitted.equalsIgnoreCase(chemistStatus) && AppConstantsQc.waitingStatus.equalsIgnoreCase(managerStatus)) ||
					(AppConstantsQc.microBiologistSubmitted.equalsIgnoreCase(microStatus) && AppConstantsQc.waitingStatus.equalsIgnoreCase(managerStatus))
					) {
				if (userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.ChemistDesigneeApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.ChemistDesigneeApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.ChemistDesigneeApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.ChemistDesigneeApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.ChemistDesigneeRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setVerifiedBy(userName);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.ChemistDesigneeRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setManager_sign(userName);
						reportHistory.setVerifiedBy(userName);
						reportHistory.setMail_status(AppConstantsQc.ChemistDesigneeRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					regantPreparationRepo.save(report);
					regantPreparationRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase(AppConstantsQc.ChemistDesigneeApprove)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}else if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.MicroDesigneeApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.MicroDesigneeApprove);
						report.setVerifiedBy(userName);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.MicroDesigneeApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.MicroDesigneeApprove);
						report.setVerifiedBy(userName);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.MicroDesigneeRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setVerifiedBy(userName);
						report.setMail_status(AppConstantsQc.MicroDesigneeRejected);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.MicroDesigneeRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setManager_sign(userName);
						reportHistory.setVerifiedBy(userName);
						reportHistory.setMail_status(AppConstantsQc.MicroDesigneeRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					regantPreparationRepo.save(report);
					regantPreparationRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase(AppConstantsQc.MicroDesigneeApprove)) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);

				} else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "User is not correct"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getRegantPreparationReportByFormatNo(String formatNo) {
		try {



			List<QcReagentPreparationRecordF017> listOfRegentPrepReport = regantPreparationRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfRegentPrepReport == null) {

				listOfRegentPrepReport = new ArrayList<QcReagentPreparationRecordF017>();
			}

			return new ResponseEntity<>(listOfRegentPrepReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Regent Preperation Report Form By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getRegantPreparationReportByDateMonthYear(String date, String month, String year) {

		SCAUtil sca = new SCAUtil();
		//		String userRole = getUserRole();
		//		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		//		String userName = userRepository.getUserName(userId);

		try {

			if (date != null && date.isEmpty()) {
				date = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<QcReagentPreparationRecordF017> listOfRegentPrepReport = regantPreparationRepo.findByDateMonthYear(date, month, year);

			if (listOfRegentPrepReport == null || listOfRegentPrepReport.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfRegentPrepReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Regent Preperation Report : " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getRegantPreparationReportById(Long id) {
		try {

			Optional<QcReagentPreparationRecordF017> response = regantPreparationRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Regent Preperation Report Form's By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllRegantPreparationReport(HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);

		try {
			List<QcReagentPreparationRecordF017> listOfRegentPrepReport = null;
			if(userRole.equalsIgnoreCase("ROLE_CHEMIST")){
				listOfRegentPrepReport = regantPreparationRepo.chemistfindAll(userName);
			}
			else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
				listOfRegentPrepReport = regantPreparationRepo.microfindAll(userName);
			} else if (userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")) {
				listOfRegentPrepReport = regantPreparationRepo.findByChemistStatusSubmitted();
			}else if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {
				listOfRegentPrepReport = regantPreparationRepo.findByMicroStatusSubmitted();
			}

			if (listOfRegentPrepReport == null) {

				listOfRegentPrepReport = new ArrayList<QcReagentPreparationRecordF017>();
			}

			return new ResponseEntity(listOfRegentPrepReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Regent Preperation Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Regent Preperation Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllChemistNotApprovedRegantPreparationReportF017() {
		SCAUtil sca = new SCAUtil();


		try {

			List<QcReagentPreparationRecordF017> listOfRegentPrepReport = regantPreparationRepo
					.findByChemistStatusSavedAndNotApproved();

			if (listOfRegentPrepReport == null) {

				listOfRegentPrepReport = new ArrayList<QcReagentPreparationRecordF017>();
			}

			return new ResponseEntity(listOfRegentPrepReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Chemist Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllQcNotSubmittedF017(HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		List<QcReagentPreparationRecordF017> listOfRegentPrepReport = null;

		try { 
			if (userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")){
				regantPreparationRepo.findByChemistStatusSubmittedAndHodStatusNotApproved();
			}else if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {
				regantPreparationRepo.findByMicroStatusSubmittedAndHodStatusNotApproved();
			}

			//			List<QcReagentPreparationRecordF017> listOfRegentPrepReport = regantPreparationRepo
			//					.findByChemistStatusSubmittedAndHodStatusNotApproved();



			if (listOfRegentPrepReport == null) {

				listOfRegentPrepReport = new ArrayList<QcReagentPreparationRecordF017>();
			}

			return new ResponseEntity(listOfRegentPrepReport, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getRegentPrepReportForPrint(String month, String year,HttpServletRequest http) {
		try {

			SCAUtil sca = new SCAUtil();
			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			List<QcReagentPreparationRecordF017> listOfRegentPrepReport =null;
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}
			if (userRole.equalsIgnoreCase("ROLE_CHEMIST")||userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")){
				listOfRegentPrepReport = regantPreparationRepo.getForReportPrintChemistDesigne(month, year);
			}else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")||userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {
				listOfRegentPrepReport = regantPreparationRepo.getForReportPrintMicroDesigne(month, year);
			}



			if (listOfRegentPrepReport == null || listOfRegentPrepReport.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfRegentPrepReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting TDS Meter Calibration Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//-------------------------------------SHELF LIFE PERIOD PHYSICAL, CHEMICAL & MICROBIOLOGICAL TESTING REPORT DATA   PH-QCL01/F-026------------------------------------------
	
	@Transactional
	public ResponseEntity<?> saveShelfLifePeriodReportData(QcShelfLifePeriodPhysicChemMicroF026 shelfLifePeriodF026,
			HttpServletRequest http) {
		if (shelfLifePeriodF026 == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		QcShelfLifePeriodPhysicChemMicroF026 savedReport = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (shelfLifePeriodF026.getId() != null) {
				// Fetch existing report to preserve certain fields
				savedReport = shelfLifePeriodRepo.findById(shelfLifePeriodF026.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				// Update other fields, excluding MILL_BATCH_NO
				BeanUtils.copyProperties(shelfLifePeriodF026, savedReport, getIgnoredProperties());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport.setLotNumber(savedReport.getLotNumber());
				savedReport.setTestingDate(savedReport.getTestingDate());
				savedReport.setYear(savedReport.getYear());	  
			} else {
				// Save new report
				savedReport = shelfLifePeriodRepo.save(shelfLifePeriodF026);
			}

			// Handle role-based updates
			if (role.equals("ROLE_CHEMIST")) {
				savedReport.setChemist_saved_by(userName);
				savedReport.setChemist_saved_on(date);
				savedReport.setChemist_saved_id(userId);
				savedReport.setChemist_status(AppConstantsQc.chemistSave);

				if (savedReport.getPhysicalAndChemicalTests() != null) {
					for (PhysicalAndChemicalPropTestF026 pcTest : savedReport.getPhysicalAndChemicalTests()) {
						pcTest.setShelfLifeId(savedReport.getId());
					}
					PhysicalAndChemcalRepoF026.saveAll(savedReport.getPhysicalAndChemicalTests());
				}
			} else if (role.equals("ROLE_MICROBIOLOGIST")) {
				savedReport.setMicrobiologist_saved_by(userName);
				savedReport.setMicrobiologist_saved_on(date);
				savedReport.setMicrobiologist_saved_id(userId);
				savedReport.setMicrobiologist_status(AppConstantsQc.microBiologistSave);

				if (savedReport.getMicrobiologicalTests() != null) {
					for (MicrobiologicalTestF026 microTest : savedReport.getMicrobiologicalTests()) {
						microTest.setShelfLifeId(savedReport.getId());
					}
					MicrobiologicalRepoF026.saveAll(savedReport.getMicrobiologicalTests());
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save the parent object after updating children
			savedReport = shelfLifePeriodRepo.save(savedReport);

		} catch (Exception ex) {
			log.error("**** Unable to save Unable to save Shelf Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Unable to save Shelf Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}


	@Transactional
	public ResponseEntity<?> submitShelfLifePeriodReportData(QcShelfLifePeriodPhysicChemMicroF026 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		QcShelfLifePeriodPhysicChemMicroF026 savedReportObj;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			QcShelfLifePeriodPhysicChemMicroF026 reportObj = report.getId() != null 
					? shelfLifePeriodRepo.findFormById(report.getId()) 
							: new QcShelfLifePeriodPhysicChemMicroF026();

			if (report.getId() == null) {
				// New record, set created fields
				setCreatedByAndAtFieldsF026(report, reportObj);
				reportObj.setCreatedAt(date);// Set created_at to current date

			} else if (reportObj == null) {
				return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
			}

			BeanUtils.copyProperties(report, reportObj, getIgnoredProperties());				


			// Handle the role-specific submission logic
			if (role.equals("ROLE_CHEMIST")) {
				handleRoleChemistF026(reportObj, userName, userId, date);
			} else if (role.equals("ROLE_MICROBIOLOGIST")) {
				handleRoleMicrobiologistF026(reportObj, userName, userId, date);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only chemist or microbiologist can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save the report object
			savedReportObj = shelfLifePeriodRepo.save(reportObj);

			// Save the history and send emails
			saveAuditTrackAndSendEmailF026(savedReportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Raw Cotton Analysis Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Raw Cotton Analysis Report"), HttpStatus.BAD_REQUEST);
		}

		// Return the saved object as a response
		return new ResponseEntity<>(savedReportObj, HttpStatus.OK);
	}


	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveShelfLifePeriodReportData(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		QcShelfLifePeriodPhysicChemMicroF026 report = new QcShelfLifePeriodPhysicChemMicroF026();
		QcShelfLifePeriodPhysicChemMicroF026History reportHistory = new QcShelfLifePeriodPhysicChemMicroF026History();

		String respStatus;
		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = shelfLifePeriodRepo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = shelfLifePeriodRepoHistory.fetchLastSubmittedRecordTestingDate(report.getTestingDate());
			if (reportHistory == null) {
				reportHistory = new QcShelfLifePeriodPhysicChemMicroF026History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id","physicalAndChemicalTests","microbiologicalTests");

			// Get statuses
			String chemistStatus = report.getChemist_status();
			String microbiologistStatus = report.getMicrobiologist_status();
			String qcStatus = report.getQc_status();

			if (chemistStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted) && microbiologistStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted)&&qcStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.QCApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);

						// Update history
						reportHistory.setQc_status(AppConstantsQc.QCApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);


					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.QCRejected);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);
//						report.setChemist_status(AppConstantsQc.chemistSave);   
//						report.setMicrobiologist_status(AppConstantsQc.microBiologistSave);

						// Update history
						reportHistory.setQc_status(AppConstantsQc.QCRejected);
						reportHistory.setReason(reason);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_submit_id(userId);
						reportHistory.setQc_sign(userName);
//						reportHistory.setChemist_status(AppConstantsQc.chemistSave);
//						reportHistory.setMicrobiologist_status(AppConstantsQc.microBiologistSave);

					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					shelfLifePeriodRepo.save(report);
					shelfLifePeriodRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}

					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setQc_status(AppConstantsQc.QAApprove);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);

						// Update history
						reportHistory.setQc_status(AppConstantsQc.QAApprove);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);


					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setQc_status(AppConstantsQc.QAReject);
						report.setQc_submit_on(date);
						report.setQc_submit_by(userName);
						report.setQc_sign(userName);
						report.setQc_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);
//						report.setChemist_status(AppConstantsQc.chemistSave);   
//						report.setMicrobiologist_status(AppConstantsQc.microBiologistSave);


						// Update history
						reportHistory.setQc_status(AppConstantsQc.QAReject);
						reportHistory.setReason(reason);
						reportHistory.setQc_submit_on(date);
						reportHistory.setQc_submit_by(userName);
						reportHistory.setQc_sign(userName);
						reportHistory.setQc_submit_id(userId);
//						reportHistory.setChemist_status(AppConstantsQc.chemistSave);
//						reportHistory.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					shelfLifePeriodRepo.save(report);
					shelfLifePeriodRepoHistory.save(reportHistory);
					if (report.getQc_status().equalsIgnoreCase("QA_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}

					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}
				else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Chemist or Microbiologist status is not correct"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Shelf Life Prediod Report: " + msg), HttpStatus.BAD_REQUEST);
		}
	}



	public ResponseEntity<?> getShelfLifePeriodReportDataById(Long id) {
		try {

			Optional<QcShelfLifePeriodPhysicChemMicroF026> response = shelfLifePeriodRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Get Reject Shelf Life Prediod Report Details: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllShelfLifePeriodReport() {
		SCAUtil sca = new SCAUtil();

		try {

			List<QcShelfLifePeriodPhysicChemMicroF026> listOfShelfLifePeriodRepo = shelfLifePeriodRepo.findAll();

			if (listOfShelfLifePeriodRepo == null) {

				listOfShelfLifePeriodRepo = new ArrayList<QcShelfLifePeriodPhysicChemMicroF026>();
			}

			return new ResponseEntity(listOfShelfLifePeriodRepo, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Shelf Life Prediod Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Shelf Life Prediod Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAllChemistAndMicroNotSubmittedF026() {
		SCAUtil sca = new SCAUtil();


		try {

			List<QcShelfLifePeriodPhysicChemMicroF026> listOfShelfLifePeriodRepo = shelfLifePeriodRepo
					.findByChemistOrMicroStatusSavedAndNotApproved();

			if (listOfShelfLifePeriodRepo == null) {

				listOfShelfLifePeriodRepo = new ArrayList<QcShelfLifePeriodPhysicChemMicroF026>();
			}

			return new ResponseEntity(listOfShelfLifePeriodRepo, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Chemist and Micro Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Chemist and Micro Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllQcNotSubmittedF026() {
		SCAUtil sca = new SCAUtil();

		try {

			List<QcShelfLifePeriodPhysicChemMicroF026> listOfShelfLifePeriodRepo = shelfLifePeriodRepo
					.findByChemistAndMicroStatusSubmittedAndQcStatusNotApproved();

			if (listOfShelfLifePeriodRepo == null) {

				listOfShelfLifePeriodRepo = new ArrayList<QcShelfLifePeriodPhysicChemMicroF026>();
			}

			return new ResponseEntity(listOfShelfLifePeriodRepo, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Qc Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Qc Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getShelfLifePeriodReportByDateYear(String productionDate, String testingDate, String year,String lotNo) {

		try {

			if (productionDate != null && productionDate.isEmpty()) {
				productionDate = null;
			}
			if (testingDate != null && testingDate.isEmpty()) {
				testingDate = null;
			}
			if (lotNo != null && lotNo.isEmpty()) {
				lotNo = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<QcShelfLifePeriodPhysicChemMicroF026> listOfShelfLifePeriodReport = shelfLifePeriodRepo.findByProdDateTestingDateYear(productionDate, testingDate, year,lotNo);

			if (listOfShelfLifePeriodReport == null || listOfShelfLifePeriodReport.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfShelfLifePeriodReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Regent Preperation Report : " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getShelfLifePeriodReportForPrint(String productionDate, String testingDate,String lotNo,String year) {
		try {
			if (productionDate != null && productionDate.isEmpty()) {
				productionDate = null;
			}
			if (testingDate != null && testingDate.isEmpty()) {
				testingDate = null;
			}
			if (lotNo != null && lotNo.isEmpty()) {
				lotNo = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<QcShelfLifePeriodPhysicChemMicroF026> listOfShelfLifePeriodReport = shelfLifePeriodRepo.getForReportPrint(productionDate, testingDate,lotNo,year);

			if (listOfShelfLifePeriodReport == null || listOfShelfLifePeriodReport.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfShelfLifePeriodReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Shelf Life Period Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getShelfLifePeriodReportByFormatNo(String formatNo) {
		try {



			List<QcShelfLifePeriodPhysicChemMicroF026> listOfShelfLifePeriodReport = shelfLifePeriodRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfShelfLifePeriodReport == null) {

				listOfShelfLifePeriodReport = new ArrayList<QcShelfLifePeriodPhysicChemMicroF026>();
			}

			return new ResponseEntity<>(listOfShelfLifePeriodReport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Regent Preperation Report Form By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}



	public ResponseEntity<?> getShelfLifePeriodExistingReportByLot(String lotNo) {
		try {
			// Get the raw result
			List<Object[]> result = shelfLifePeriodRepo.findDetailByLot(lotNo);

			// Map the result to the DTO
			List<ShelfLifePeriodLotPayload> response = result.stream().map(row -> {
				ShelfLifePeriodLotPayload payload = new ShelfLifePeriodLotPayload();
				payload.setCustomer((String) row[0]); // CUSTOMER
				payload.setBrand((String) row[1]);    // BRAND
				payload.setProductDescription((String) row[2]); // PRODUCTION_DESCRIPTION
				return payload;
			}).collect(Collectors.toList());

			if (response.isEmpty()) {
				return new ResponseEntity<>(new ApiResponse(false, "No details found for the given lot number."), HttpStatus.NOT_FOUND);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Shelf Life Period Report Details by LotNo: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//--------------------------------------MEDIA GROWTH PROMOTION TEST REPORT (PH-QCL01/F-021)--------------------------------------------------------------

	@Transactional
	public ResponseEntity<?> saveMediaGrowthReport(Qc_MediaGrowthPromotionTestReportF021 mediaGrowthReport, HttpServletRequest http) {
		if (mediaGrowthReport == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_MediaGrowthPromotionTestReportF021 savedReport = null;

		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Role-based validation
			if (role.equals("ROLE_MICROBIOLOGIST")) {
				mediaGrowthReport.setMicrobiologist_saved_by(userName);
				mediaGrowthReport.setMicrobiologist_saved_on(date);
				mediaGrowthReport.setMicrobiologist_saved_id(userId);
				mediaGrowthReport.setMicrobiologist_status(AppConstantsQc.microBiologistSave);		        } else {
					return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
				}

			// Save or update parent entity
			if (mediaGrowthReport.getId() != null) {
				savedReport = mediaGrowthPromotionF021Repo.findById(mediaGrowthReport.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));

				// Manually update relevant fields to avoid overwriting important ones
				savedReport.setFormatNo(mediaGrowthReport.getFormatNo());
				savedReport.setRevisionNo(mediaGrowthReport.getRevisionNo());
				savedReport.setFormatName(mediaGrowthReport.getFormatName());
				savedReport.setRefSopNo(mediaGrowthReport.getRefSopNo());
				savedReport.setSno(mediaGrowthReport.getSno());
				savedReport.setIncubationStartOn(mediaGrowthReport.getIncubationStartOn());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);

				// Save the updated parent report
				savedReport = mediaGrowthPromotionF021Repo.save(savedReport);
			} else {
				// Create a new parent entity
				mediaGrowthReport.setCreatedAt(date);
				mediaGrowthReport.setCreatedBy(userName);
				savedReport = mediaGrowthPromotionF021Repo.save(mediaGrowthReport);
			}

			// Save or update child entities
			if (mediaGrowthReport.getDetails() != null) {
				for (MediaGrowthDetails detail : mediaGrowthReport.getDetails()) {
					if (detail.getId() != null) {
						// Update existing child entity
						MediaGrowthDetails existingDetail = mediaGrowthDetailsRepo.findById(detail.getId())
								.orElseThrow(() -> new RuntimeException("Detail not found"));

						existingDetail.setMediaName(detail.getMediaName());
						existingDetail.setManufacturedDate(detail.getManufacturedDate());
						existingDetail.setLotNo(detail.getLotNo());
						existingDetail.setExpiryDate(detail.getExpiryDate());
						existingDetail.setNameOfCulture(detail.getNameOfCulture());
						existingDetail.setTestCompletionDate(detail.getTestCompletionDate());
						existingDetail.setTestedBy(detail.getTestedBy());
						existingDetail.setApprovedBy(detail.getApprovedBy());
						existingDetail.setRemarks(detail.getRemarks());
						existingDetail.setUpdatedAt(date);
						existingDetail.setUpdatedBy(userName);

						// Save the updated child
						mediaGrowthDetailsRepo.save(existingDetail);
					} else {
						// Create a new child entity and associate it with the parent
						detail.setParentId(savedReport.getId());
						mediaGrowthDetailsRepo.save(detail);
					}
				}
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Media Growth Report Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Report Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}


	@Transactional
	public ResponseEntity<?> submitMediaGrowthReportF021(Qc_MediaGrowthPromotionTestReportF021 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_MediaGrowthPromotionTestReportF021 reportObj;
		try {
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			// Check if the report has an ID (existing record)
			if (report.getId() != null) {
				reportObj = mediaGrowthPromotionF021Repo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update the existing record
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);
			} else {
				// New record
				reportObj = new Qc_MediaGrowthPromotionTestReportF021();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}
			if (report.getId() == null) {

				BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF021Save());
			}else {
				// Copy the relevant properties from the input report to the report object
				BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF021Submit());

			}


			// Handle chemist-specific logic
			if ("ROLE_MICROBIOLOGIST".equals(role)) {
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setManager_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				if (reportObj.getManager_sign() != null && !reportObj.getManager_sign().isEmpty()) {
					reportObj.setManager_sign("");
				}
				if (reportObj.getManager_submit_by()!= null && !reportObj.getManager_submit_by().isEmpty()) {
					reportObj.setManager_submit_by("");
				}
				if (reportObj.getManager_submit_id() != null) {
					reportObj.setManager_submit_id(null);
				}
				if (reportObj.getManager_submit_on()!= null) {
					reportObj.setManager_submit_on(null);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only chemist can submit details"), HttpStatus.BAD_REQUEST);
			}

			// Save or update the parent entity
			reportObj = mediaGrowthPromotionF021Repo.save(reportObj);

			// Handle child entities (Wira Fiber Details)
			if (report.getDetails() != null) {
				List<MediaGrowthDetails> updatedDetails = new ArrayList<>();
				for (MediaGrowthDetails detail : report.getDetails()) {
					if (detail.getId() == null) {
						// New child entity
						detail.setParentId(reportObj.getId());
						updatedDetails.add(detail);
					} else {
						// Update existing child entity
						MediaGrowthDetails existingDetail = mediaGrowthDetailsRepo.findById(detail.getId())
								.orElseThrow(() -> new RuntimeException("Detail not found with id: " + detail.getId()));

						// Detach existing detail to avoid Hibernate issues with reattaching
						entityManager.detach(existingDetail);

						// Copy relevant fields from the input detail to the existing detail
						BeanUtils.copyProperties(detail, existingDetail, "id", "parentId");
						updatedDetails.add(existingDetail);
					}
				}
				// Save all updated child entities
				mediaGrowthDetailsRepo.saveAll(updatedDetails);
			}

			// Additional actions (audit tracking and email sending)
			saveAuditTrackAndSendEmailMediaGrowthReport(reportObj, role);

		} catch (Exception ex) {
			log.error("**** Unable to Submit Wira Fiber Fineness Report ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Report"), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}


	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveMediaGrowthReportF021(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		Qc_MediaGrowthPromotionTestReportF021 report = new Qc_MediaGrowthPromotionTestReportF021();
		Qc_MediaGrowthPromotionTestReportF021History reportHistory = new Qc_MediaGrowthPromotionTestReportF021History();

		String respStatus;
		String userRole = getUserRole();
		System.out.println("user role : ");
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {
			report = mediaGrowthPromotionF021Repo.findFormById(approvalResponse.getId());

			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}

			// Create history entry
			reportHistory = mediaGrowthHistoryRepo.fetchLastSubmittedRecordByIncubationDate(report.getIncubationStartOn());
			if (reportHistory == null) {
				reportHistory = new Qc_MediaGrowthPromotionTestReportF021History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id","details");

			// Get statuses
			String microStatus = report.getMicrobiologist_status();
			String manager_status = report.getManager_status();

			if (microStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted)&&manager_status.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QCApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);	    
						report.setManager_sign(userName);	
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);

						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QCRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);	    
						report.setManager_sign(userName);	
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCRejected);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCRejected);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					mediaGrowthPromotionF021Repo.save(report);
					mediaGrowthHistoryRepo.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QAApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);	    
						report.setManager_sign(userName);	
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAApprove);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QAReject);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);	    
						report.setManager_sign(userName);	
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);


						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAReject);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAReject);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					mediaGrowthPromotionF021Repo.save(report);
					mediaGrowthHistoryRepo.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QA_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);


				}else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "micro is not correct"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}


	public ResponseEntity<?> getMediaGrowthReportF021FormatNo(String formatNo) {
		try {

			List<Qc_MediaGrowthPromotionTestReportF021> listOfMediaGrowthF021 = mediaGrowthPromotionF021Repo
					.getDetailsByFormatNo(formatNo);

			if (listOfMediaGrowthF021 == null) {

				listOfMediaGrowthF021 = new ArrayList<Qc_MediaGrowthPromotionTestReportF021>();
			}

			return new ResponseEntity<>(listOfMediaGrowthF021, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Media Growth Report F021 Form's By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getMediaGrowthReportF021ByIncubationDate(String incubationStartOn) {
		try {
			if (incubationStartOn != null && incubationStartOn.isEmpty()) {
				incubationStartOn = null;
			}

			List<Qc_MediaGrowthPromotionTestReportF021> listOfMediaGrowthReportF021 = mediaGrowthPromotionF021Repo.findByIncubationDate(incubationStartOn);

			if (listOfMediaGrowthReportF021 == null || listOfMediaGrowthReportF021.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfMediaGrowthReportF021, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Media Growth Report F021 Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMediaGrowthReportF021ById(Long id) {
		try {

			Optional<Qc_MediaGrowthPromotionTestReportF021> response = mediaGrowthPromotionF021Repo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Media Growth Report F021 Report Form's By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllMediaGrowthReportF021Report() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_MediaGrowthPromotionTestReportF021> listOfMediaGrowthReportF021 = mediaGrowthPromotionF021Repo.findAll();

			if (listOfMediaGrowthReportF021 == null) {

				listOfMediaGrowthReportF021 = new ArrayList<Qc_MediaGrowthPromotionTestReportF021>();
			}

			return new ResponseEntity(listOfMediaGrowthReportF021, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Media Growth Report F021 Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Media Growth Report F021 Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllMicroNotSubmittedF021() {
		SCAUtil sca = new SCAUtil();
		//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		//			String userName = userRepository.getUserName(userId);

		try {

			List<Qc_MediaGrowthPromotionTestReportF021> listOfMediaGrowthReportF021 = mediaGrowthPromotionF021Repo
					.findByMicroStatusSavedAndNotApproved();

			if (listOfMediaGrowthReportF021 == null) {

				listOfMediaGrowthReportF021 = new ArrayList<Qc_MediaGrowthPromotionTestReportF021>();
			}

			return new ResponseEntity(listOfMediaGrowthReportF021, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Micro Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Micro Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllManagerNotSubmittedF021() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_MediaGrowthPromotionTestReportF021> listOfMediaGrowthReportF021 = mediaGrowthPromotionF021Repo
					.findByMicroStatusSubmittedAndHodStatusNotApproved();

			if (listOfMediaGrowthReportF021 == null) {

				listOfMediaGrowthReportF021 = new ArrayList<Qc_MediaGrowthPromotionTestReportF021>();
			}

			return new ResponseEntity(listOfMediaGrowthReportF021, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Manager Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Manager Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMediaGrowthReportF021ReportForPrint(String incubationStartOn,String month, String year) {
		try {
			if (incubationStartOn != null && incubationStartOn.isEmpty()) {
				incubationStartOn = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<Qc_MediaGrowthPromotionTestReportF021> listOfMediaGrowthReportF021 = mediaGrowthPromotionF021Repo.getForReportPrint(incubationStartOn,month, year);

			if (listOfMediaGrowthReportF021 == null || listOfMediaGrowthReportF021.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfMediaGrowthReportF021, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Media Growth Report F021: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//----------------------------------------------MEDIA PREPARATION & CONSUMPTION RECORD PH-QCL01/F-019--------------------------------------------------------------------------		



	@Transactional
	public ResponseEntity<?> saveMediaPrepRecordF019(Qc_MediaPreparationAndConsumptionRecordF019 mediaPrepRecord, HttpServletRequest http) {
		if (mediaPrepRecord == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}

		Qc_MediaPreparationAndConsumptionRecordF019 savedReport = null;

		try {

			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);

			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			if (role.equals("ROLE_MICROBIOLOGIST")) {
				mediaPrepRecord.setMicrobiologist_saved_by(userName);
				mediaPrepRecord.setMicrobiologist_saved_on(date);
				mediaPrepRecord.setMicrobiologist_saved_id(userId);
				mediaPrepRecord.setMicrobiologist_status(AppConstantsQc.microBiologistSave);
			} else {
				return new ResponseEntity<>(new ApiResponse(false, role + " cannot save details"), HttpStatus.BAD_REQUEST);
			}

			// Save the report
			if (mediaPrepRecord.getId() != null) {
				savedReport = mediaPreparationRepo.findById(mediaPrepRecord.getId())
						.orElseThrow(() -> new RuntimeException("Report not found"));
				BeanUtils.copyProperties(mediaPrepRecord, savedReport, getIgnoredPropertiesF019());
				savedReport.setUpdatedAt(date);
				savedReport.setUpdatedBy(userName);
				savedReport= mediaPreparationRepo.save(savedReport);
			} else {
				savedReport = mediaPreparationRepo.save(mediaPrepRecord);
			}

		} catch (Exception ex) {
			log.error("**** Unable to save Media preparation And Consumption Record Details! ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Save Media preparation And Consumption Record Details! " + ex.getMessage()), HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
	}



	@Transactional
	public ResponseEntity<?> submitMediaPrepRecordF019(Qc_MediaPreparationAndConsumptionRecordF019 report, HttpServletRequest http) {
		if (report == null) {
			return new ResponseEntity<>(new ApiResponse(false, "Please send mandatory fields!"), HttpStatus.BAD_REQUEST);
		}
		Qc_MediaPreparationAndConsumptionRecordF019 reportObj;
		try {
			// Validate the chemical report
			//		    	validateRawCottonConsolidated(report);
 
			Long userId = scaUtil.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			String role = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
 
 
 
			// Check if the report has an ID and exists in the database
			if (report.getId() != null) {
				reportObj = mediaPreparationRepo.findFormById(report.getId());
				if (reportObj == null) {
					return new ResponseEntity<>(new ApiResponse(false, "No Records Found"), HttpStatus.BAD_REQUEST);
				}
				// Update existing record, retaining some of the original properties
				report.setCreatedAt(reportObj.getCreatedAt());
				report.setCreatedBy(reportObj.getCreatedBy());
				report.setUpdatedAt(date);
				report.setUpdatedBy(userName);	
			} else {
				// Create a new report if no ID exists
				reportObj = new Qc_MediaPreparationAndConsumptionRecordF019();
				report.setCreatedAt(date);
				report.setCreatedBy(userName);
			}
 
			// Copy the properties from the provided report to the reportObj (excluding ignored properties)
			BeanUtils.copyProperties(report, reportObj, getIgnoredPropertiesF019Submit());
 
			// Set chemist-specific fields if the user has the right role
			if (role.equals("ROLE_MICROBIOLOGIST")) {
				reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
				reportObj.setMicrobiologist_submit_on(date);
				reportObj.setMicrobiologist_submit_by(userName);
				reportObj.setMicrobiologist_submit_id(userId);
				reportObj.setMicrobiologist_sign(userName);
				reportObj.setScdaPreparedBy(userName);
				reportObj.setSdaPreparedBy(userName);
				reportObj.setVrbaPreparedBy(userName);
				reportObj.setMaccOnPreparedBy(userName);
				reportObj.setCitricPreparedBy(userName);
				reportObj.setVjPreparedBy(userName);
				reportObj.setBgaPreparedBy(userName);
				reportObj.setBufferSolPreparedBy(userName);
				
				
				reportObj.setManager_status(AppConstantsQc.waitingStatus);
				reportObj.setMail_status(AppConstantsQc.waitingStatus);
				if (reportObj.getManager_sign() != null && !reportObj.getManager_sign().isEmpty()) {
					reportObj.setManager_sign("");
				}
				if (reportObj.getManager_submit_by()!= null && !reportObj.getManager_submit_by().isEmpty()) {
					reportObj.setManager_submit_by("");
				}
				if (reportObj.getManager_submit_id() != null) {
					reportObj.setManager_submit_id(null);
				}
				if (reportObj.getManager_submit_on()!= null) {
					reportObj.setManager_submit_on(null);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Only Raw Cotton Consolidated Report details"), HttpStatus.BAD_REQUEST);
			}
 
			// Save or update the report in the database
			reportObj= mediaPreparationRepo.save(reportObj);
 
			// Additional actions like audit tracking and email sending can be added here
			saveAuditTrackAndSendEmailF019(reportObj, role);
 
		} catch (Exception ex) {
			log.error("**** Unable to Media preparation And Consumption Record Details ****", ex);
			return new ResponseEntity<>(new ApiResponse(false, "Unable to Submit Media preparation And Consumption Record Details"), HttpStatus.BAD_REQUEST);
		}
 
		return new ResponseEntity<>(reportObj, HttpStatus.CREATED);
	}
 
	@SuppressWarnings("unchecked")
	public ResponseEntity<?> approveMediaPrepRecordF019(ApproveResponse approvalResponse, HttpServletRequest http) {
 
		SCAUtil sca = new SCAUtil();
		Qc_MediaPreparationAndConsumptionRecordF019 report = new Qc_MediaPreparationAndConsumptionRecordF019();
		Qc_MediaPreparationAndConsumptionRecordF019History reportHistory = new Qc_MediaPreparationAndConsumptionRecordF019History();
 
		String respStatus;
		String userRole = getUserRole();
		System.out.println("user role : "+userRole);
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
 
		try {
			report = mediaPreparationRepo.findFormById(approvalResponse.getId());
 
			if (report == null) {
				return new ResponseEntity<>(new ApiResponse(false, "Report not found"), HttpStatus.NOT_FOUND);
			}
 
			// Create history entry
			reportHistory = mediaPreparationRepoHistory.fetchLastSubmittedRecordByDateAndLoad(report.getPreparationDate(),report.getLoadNo());
			if (reportHistory == null) {
				reportHistory = new Qc_MediaPreparationAndConsumptionRecordF019History();
			}
			BeanUtils.copyProperties(report, reportHistory,"id");
 
			// Get statuses
			String microStatus = report.getMicrobiologist_status();
			String managerStatus = report.getManager_status();
 
			if (microStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted)&&managerStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus)) {
				if (userRole.equalsIgnoreCase("QC_MANAGER")) {
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QCApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCApprove);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCApprove);
						
						report.setScdaVerifiedBy(userName);
						report.setSdaVerifiedBy(userName);
						report.setVrbaVerifiedBy(userName);
						report.setMaccOnVerifiedBy(userName);
						report.setCitricVerifiedBy(userName);
						report.setVjVerifiedBy(userName);
						report.setBgaVerifiedBy(userName);
						report.setBufferSolVerifiedBy(userName);
						
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QCRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QCRejected);
 
 
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QCRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QCRejected);
						
						report.setScdaVerifiedBy(userName);
						report.setSdaVerifiedBy(userName);
						report.setVrbaVerifiedBy(userName);
						report.setMaccOnVerifiedBy(userName);
						report.setCitricVerifiedBy(userName);
						report.setVjVerifiedBy(userName);
						report.setBgaVerifiedBy(userName);
						report.setBufferSolVerifiedBy(userName);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					mediaPreparationRepo.save(report);
					mediaPreparationRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QC_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
 
				}else if (userRole.equalsIgnoreCase("QA_MANAGER")) {
 
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.QAApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAApprove);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAApprove);
						
						report.setScdaVerifiedBy(userName);
						report.setSdaVerifiedBy(userName);
						report.setVrbaVerifiedBy(userName);
						report.setMaccOnVerifiedBy(userName);
						report.setCitricVerifiedBy(userName);
						report.setVjVerifiedBy(userName);
						report.setBgaVerifiedBy(userName);
						report.setBufferSolVerifiedBy(userName);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.QAReject);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.QAReject);
 
 
						// Update history
						reportHistory.setManager_status(AppConstantsQc.QAReject);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.QAReject);
						
						report.setScdaVerifiedBy(userName);
						report.setSdaVerifiedBy(userName);
						report.setVrbaVerifiedBy(userName);
						report.setMaccOnVerifiedBy(userName);
						report.setCitricVerifiedBy(userName);
						report.setVjVerifiedBy(userName);
						report.setBgaVerifiedBy(userName);
						report.setBufferSolVerifiedBy(userName);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					mediaPreparationRepo.save(report);
					mediaPreparationRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("QA_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
 
				}else if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {
 
					if (approvalResponse.getStatus().equals("Approve")) {
						report.setManager_status(AppConstantsQc.MicroDesigneeApprove);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.MicroDesigneeApprove);
						// Update history
						reportHistory.setManager_status(AppConstantsQc.MicroDesigneeApprove);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.MicroDesigneeApprove);
						
						report.setScdaVerifiedBy(userName);
						report.setSdaVerifiedBy(userName);
						report.setVrbaVerifiedBy(userName);
						report.setMaccOnVerifiedBy(userName);
						report.setCitricVerifiedBy(userName);
						report.setVjVerifiedBy(userName);
						report.setBgaVerifiedBy(userName);
						report.setBufferSolVerifiedBy(userName);
					} else if (approvalResponse.getStatus().equals("Reject")) {
						String reason = approvalResponse.getRemarks();
						report.setReason(reason);
						report.setManager_status(AppConstantsQc.MicroDesigneeRejected);
						report.setManager_submit_on(date);
						report.setManager_submit_by(userName);
						report.setManager_sign(userName);
						report.setManager_submit_id(userId);
						report.setMail_status(AppConstantsQc.MicroDesigneeRejected);
 
 
						// Update history
						reportHistory.setManager_status(AppConstantsQc.MicroDesigneeRejected);
						reportHistory.setReason(reason);
						reportHistory.setManager_submit_on(date);
						reportHistory.setManager_submit_by(userName);
						reportHistory.setManager_sign(userName);
						reportHistory.setManager_submit_id(userId);
						reportHistory.setMail_status(AppConstantsQc.MicroDesigneeRejected);
						
						report.setScdaVerifiedBy(userName);
						report.setSdaVerifiedBy(userName);
						report.setVrbaVerifiedBy(userName);
						report.setMaccOnVerifiedBy(userName);
						report.setCitricVerifiedBy(userName);
						report.setVjVerifiedBy(userName);
						report.setBgaVerifiedBy(userName);
						report.setBufferSolVerifiedBy(userName);
					} else {
						return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}
					mediaPreparationRepo.save(report);
					mediaPreparationRepoHistory.save(reportHistory);
					if (report.getManager_status().equalsIgnoreCase("MICRO_DESIGNEE_APPROVED")) {
						respStatus="Approved Successfully";
					}
					else {
						respStatus="Rejected Successfully";
					}
					return new ResponseEntity<>(new ApiResponse(true, respStatus), HttpStatus.OK);
 
				}
				else {
					return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>(new ApiResponse(false, "Access Denied For This Role"), HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			String msg = e.getMessage();
			log.error("Unable to Approve Record: " + msg);
			return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Raw Cotton Consolidated  Report" + msg), HttpStatus.BAD_REQUEST);
		}
	}
	


	public ResponseEntity<?> getMediaPrepRecordF019ByFormatNo(String formatNo) {
		try {

			List<Qc_MediaPreparationAndConsumptionRecordF019> listOfMediaPreparationF019 = mediaPreparationRepo
					.getDetailsByFormatNo(formatNo);

			if (listOfMediaPreparationF019 == null) {

				listOfMediaPreparationF019 = new ArrayList<Qc_MediaPreparationAndConsumptionRecordF019>();
			}

			return new ResponseEntity<>(listOfMediaPreparationF019, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting All Media preparation And Consumption Record F019 By Format No : " + e.getMessage(),
					HttpStatus.BAD_REQUEST);
		}


	}

	public ResponseEntity<?> getMediaPrepRecordF019ByPreparationmDateOrLoadNo(String preparationDate, String loadNo) {
		try {
			if (preparationDate != null && preparationDate.isEmpty()) {
				preparationDate = null;
			}
			if (loadNo != null && loadNo.isEmpty()) {
				loadNo = null;
			}
			List<Qc_MediaPreparationAndConsumptionRecordF019> listOfMediaPreparationF019 = mediaPreparationRepo.findByPreparationDateOrLoadno(preparationDate,loadNo);

			if (listOfMediaPreparationF019 == null || listOfMediaPreparationF019.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfMediaPreparationF019, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Media preparation And Consumption Record F019 Report: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMediaPrepRecordF019ById(Long id) {
		try {

			Optional<Qc_MediaPreparationAndConsumptionRecordF019> response = mediaPreparationRepo.findById(id);

			if (!response.isPresent()) {
				return new ResponseEntity(new ApiResponse(false, "Unable to get details."), HttpStatus.BAD_REQUEST);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error Getting Media preparation And Consumption Record F019 Form's By ID: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllMediaPrepRecordF019Report() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_MediaPreparationAndConsumptionRecordF019> listOfMediaPreparationF019 = mediaPreparationRepo.findAll();

			if (listOfMediaPreparationF019 == null) {

				listOfMediaPreparationF019 = new ArrayList<Qc_MediaPreparationAndConsumptionRecordF019>();
			}

			return new ResponseEntity(listOfMediaPreparationF019, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Media preparation And Consumption Record F019 Report Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Media preparation And Consumption Record F019 Report Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllMicroNotSubmittedF019() {
		SCAUtil sca = new SCAUtil();
		//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		//			String userName = userRepository.getUserName(userId);

		try {

			List<Qc_MediaPreparationAndConsumptionRecordF019> listOfMediaPreparationF019 = mediaPreparationRepo
					.findByMicroStatusSavedAndNotApproved();

			if (listOfMediaPreparationF019 == null) {

				listOfMediaPreparationF019 = new ArrayList<Qc_MediaPreparationAndConsumptionRecordF019>();
			}

			return new ResponseEntity(listOfMediaPreparationF019, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Micro Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Micro Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<?> getAllManagerNotSubmittedF019() {
		SCAUtil sca = new SCAUtil();

		try {

			List<Qc_MediaPreparationAndConsumptionRecordF019> listOfMediaPreparationF019 = mediaPreparationRepo
					.findByMicroStatusSubmittedAndHodStatusNotApproved();

			if (listOfMediaPreparationF019 == null) {

				listOfMediaPreparationF019 = new ArrayList<Qc_MediaPreparationAndConsumptionRecordF019>();
			}

			return new ResponseEntity(listOfMediaPreparationF019, HttpStatus.OK);

		} catch (Exception e) {

			log.error(
					"***************** Unable to get List Of All Manager Not Submitted Details!  *********************\n"
							+ e);

			String msg = sca.getErrorMessage(e);

			return new ResponseEntity(
					new ApiResponse(false, "Unable to get List Of All Manager Not Submitted Details!" + msg),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getMediaPrepRecordF019ReportForPrint(String preparationDate,String loadNo,String month, String year) {
		try {
			if (preparationDate != null && preparationDate.isEmpty()) {
				preparationDate = null;
			}
			if (loadNo != null && loadNo.isEmpty()) {
				loadNo = null;
			}
			if (month != null && month.isEmpty()) {
				month = null;
			}
			if (year != null && year.isEmpty()) {
				year = null;
			}

			List<Qc_MediaPreparationAndConsumptionRecordF019> listOfMediaPreparationF019 = mediaPreparationRepo.getForReportPrint(preparationDate,loadNo,month, year);

			if (listOfMediaPreparationF019 == null || listOfMediaPreparationF019.isEmpty()) {
				return new ResponseEntity<>("No data found for the provided parameters", HttpStatus.OK);
			}

			return new ResponseEntity<>(listOfMediaPreparationF019, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error getting Media Growth Report F021: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	//-----------------------------------------------------------------------------------HELPER METHODS -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------		

	private void setCreatedByAndAtFields(RawCottenAnalysisReportARF001 report, RawCottenAnalysisReportARF001 reportObj) {
		report.setCreatedAt(reportObj.getCreatedAt());
		report.setCreatedBy(reportObj.getCreatedBy());
	}

	private void setCreatedByAndAtFieldsF026(QcShelfLifePeriodPhysicChemMicroF026 report, QcShelfLifePeriodPhysicChemMicroF026 reportObj) {
		report.setCreatedAt(reportObj.getCreatedAt());
		report.setCreatedBy(reportObj.getCreatedBy());
	}

	private String[] getIgnoredProperties() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", "microbiologist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign", "microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign", "qc_status", "qc_saved_on", "qc_saved_by", "qc_saved_id", "qc_submit_on", 
				"qc_submit_by", "qc_submit_id", "qc_sign"};
	}

	private String[] getIgnoredPropertiesSubmit() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", "microbiologist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign", "microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign", "qc_status", "qc_saved_on", "qc_saved_by", "qc_saved_id", "qc_submit_on", 
				"qc_submit_by", "qc_submit_id", "qc_sign","physicalAndChemicalTests","microbiologicalTests"};
	}


	private String[] getIgnoredPropertiesARF003() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign", "qc_status", "qc_submit_on", 
				"qc_submit_by", "qc_submit_id", "qc_sign"};
	}

	private String[] getIgnoredPropertiesF006() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign", "manager_status", "manager_submit_on", 
				"manager_submit_by", "manager_submit_id", "manager_sign"};
	}

	private String[] getIgnoredPropertiesF017() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign","microbiologist_sign","microbiologist_submit_id","microbiologist_submit_by",
				"microbiologist_submit_on","microbiologist_saved_id","microbiologist_saved_by","microbiologist_saved_on","microbiologist_status", "manager_status", "manager_submit_on", 
				"manager_submit_by", "manager_submit_id", "manager_sign"};
	}

	private String[] getIgnoredPropertiesF012Submit() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "manager_sign","manager_submit_id","manager_submit_by",
				"manager_submit_on","manager_status","microbiologist_sign","microbiologist_submit_id","microbiologist_submit_by",
				"microbiologist_submit_on","microbiologist_saved_id","microbiologist_saved_by","microbiologist_saved_on","microbiologist_status"};
	}

	private String[] getIgnoredPropertiesF012() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status","manager_sign","manager_submit_id","manager_submit_by",
				"manager_submit_on","manager_status","microbiologist_sign","microbiologist_submit_id","microbiologist_submit_by",
				"microbiologist_submit_on","microbiologist_saved_id","microbiologist_saved_by","microbiologist_saved_on","microbiologist_status",};
	}


	private String[] getIgnoredPropertiesF028() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status","microbiologist_sign","microbiologist_submit_id","microbiologist_submit_by",
				"microbiologist_submit_on","microbiologist_saved_id","microbiologist_saved_by","microbiologist_saved_on","microbiologist_status",
				"chemist_status","chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign",};
	}

	private String[] getIgnoredPropertiesF023() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status","chemist_status","chemist_submit_by", "chemist_submit_on", "chemist_submit_id"
				, "chemist_saved_by", "chemist_saved_on","chemist_saved_id", "chemist_sign"};
	}

	private String[] getIgnoredPropertiesF004() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign", "qc_status", "qc_submit_on", 
				"qc_submit_by", "qc_submit_id", "qc_sign"};
	}

	private String[] getIgnoredPropertiesF019() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status","microbiologist_status", "microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign","manager_status","manager_submit_on","manager_submit_by","manager_submit_id",
		"manager_sign"};
	}

	private String[] getIgnoredPropertiesF010() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign","manager_status","manager_submit_on","manager_submit_by","manager_submit_id",
		"manager_sign"};
	}

	private String[] getIgnoredPropertiesF010Submit() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign","manager_status","manager_submit_on","manager_submit_by","manager_submit_id",
				"manager_sign","details"};
	}

	private String[] getIgnoredPropertiesF004Submit() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign","manager_status","manager_submit_on","manager_submit_by","manager_submit_id",
				"manager_sign","details"};
	}
	private String[] getIgnoredPropertiesF021Submit() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status","microbiologist_status", "microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign","manager_status","manager_submit_on","manager_submit_by","manager_submit_id",
				"manager_sign","details"};
	}
	private String[] getIgnoredPropertiesF010Save() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign","manager_status","manager_submit_on","manager_submit_by","manager_submit_id",
		"manager_sign"};
	}

	private String[] getIgnoredPropertiesF004Save() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign","manager_status","manager_submit_on","manager_submit_by","manager_submit_id",
		"manager_sign"};
	}
	private String[] getIgnoredPropertiesF021Save() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status","microbiologist_status", "microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign","manager_status","manager_submit_on","manager_submit_by","manager_submit_id",
		"manager_sign"};
	}

	//	private String[] getIgnoredPropertiesF004Submit() {
	//	    return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
	//	            "chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
	//	            "chemist_saved_id", "chemist_sign","manager_status","manager_submit_on","manager_submit_by","manager_submit_id",
	//	            "manager_sign"};
	//	}

	private String[] getIgnoredPropertiesF019Submit() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status","microbiologist_status", "microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign","manager_status","manager_submit_on","manager_submit_by","manager_submit_id",
		"manager_sign"};
	}

	private String[] getIgnoredPropertiesSampleInwardBook() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign","microbiologist_status", "microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign", "qc_status","qc_submit_on", 
				"qc_submit_by", "qc_submit_id", "qc_sign", "dateF001","dateF002","dateF003", "formatName", "formatNo","details"};
	}

	private String[] getIgnoredPropertiesSwabMicroAnalysisSubmit() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "microbiologist_status", 
				"microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign", "qc_status","qc_submit_on", 
				"qc_submit_by", "qc_submit_id", "qc_sign","details"};
	}

	private String[] getIgnoredPropertiesSwabMicroAnalysisSave() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "microbiologist_status", 
				"microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign", "qc_status","qc_submit_on", 
				"qc_submit_by", "qc_submit_id", "qc_sign","details"};
	}

	private String[] getIgnoredPropertiesSampleInwardBookSubmit() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", "microbiologist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign", "microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign", "qc_status","qc_submit_on","etp_status","etp_saved_on","etp_saved_by","etp_saved_id",
				"etp_submit_on","etp_submit_by","etp_submit_id","etp_sign",
				"qc_submit_by", "qc_submit_id", "qc_sign","details"};
	}

	private String[] getIgnoredPropertiesSampleInwardBookSave() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", "microbiologist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign", "microbiologist_submit_by", "microbiologist_submit_on", 
				"microbiologist_submit_id", "microbiologist_saved_by", "microbiologist_saved_on", "microbiologist_saved_id", 
				"microbiologist_sign", "qc_status","qc_submit_on","etp_status","etp_saved_on","etp_saved_by","etp_saved_id",
				"etp_submit_on","etp_submit_by","etp_submit_id","etp_sign",
				"qc_submit_by", "qc_submit_id", "qc_sign"};
	}

	private String[] getIgnoredPropertiesdistilledWaterAnalysis() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign", "qc_status","qc_submit_on", 
				"qc_submit_by", "qc_submit_id", "qc_sign"};
	}

	private String[] getIgnoredPropertiesTdsMeterCalibration() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign", "qc_status","qc_submit_on", 
				"qc_submit_by", "qc_submit_id", "qc_sign"};
	}

	private String[] getIgnoredPropertiesPhMeterCalibrationSubmit() {
		return new String[]{"id", "createdBy", "createdAt", "mail_status", "chemist_status", 
				"chemist_submit_by", "chemist_submit_on", "chemist_submit_id", "chemist_saved_by", "chemist_saved_on", 
				"chemist_saved_id", "chemist_sign", "manager_status","manager_submit_on", 
				"manager_submit_by", "manager_submit_id", "manager_sign"};
	}

	private boolean isRoleChemist(RawCottenAnalysisReportARF001 reportObj, String role) {
		return role.equals("ROLE_CHEMIST") && (reportObj.getChemist_status().equals(AppConstantsQc.chemistSave) );
	}


	private void handleRoleChemist(RawCottenAnalysisReportARF001 reportObj, String userName, Long userId, Date date) {
		// Set Chemist-specific fields
		reportObj.setChemist_submit_by(userName);
		reportObj.setChemist_submit_on(date);
		reportObj.setChemist_submit_id(userId);
		reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
		reportObj.setChemist_sign(userName);

		// Reset QC fields
		reportObj.setQc_status(AppConstantsQc.waitingStatus);
		reportObj.setMail_status(AppConstantsQc.waitingStatus);
		if (reportObj.getQc_sign() != null && !reportObj.getQc_sign().isEmpty()) {
			reportObj.setQc_sign("");
		}
		if (reportObj.getQc_submit_by() != null && !reportObj.getQc_submit_by().isEmpty()) {
			reportObj.setQc_submit_by("");
		}
		if (reportObj.getQc_submit_id() != null) {
			reportObj.setQc_submit_id(null);
		}
		if (reportObj.getQc_submit_on() != null) {
			reportObj.setQc_submit_on(null);
		}

		reportObj= rawCottenAnalysisRepo.save(reportObj);

		// Establish relationship and set RAW_COTTON_ANALYSIS_ID in child entities
		if (reportObj.getPhysicalAndChemicalTests() != null) {
			for (PhysicalAndChemcalTestARF001 test : reportObj.getPhysicalAndChemicalTests()) {
				test.setRawCottenAnalysisId(reportObj.getId()); // Set foreign key
				test.setRawCottenAnalysisReport(reportObj); // Set parent reference
				//                physicalAndChemcalRepo.save(test);
			}

		}

		// Optionally, save the child entities if not relying on Cascade

		physicalAndChemcalRepo.saveAll(reportObj.getPhysicalAndChemicalTests());
	}

	private void handleRoleChemistF026(QcShelfLifePeriodPhysicChemMicroF026 reportObj, String userName, Long userId, Date date) {
		reportObj.setChemist_submit_by(userName);
		reportObj.setChemist_submit_on(date);
		reportObj.setChemist_submit_id(userId);
		reportObj.setChemist_status(AppConstantsQc.chemistSubmitted);
		reportObj.setChemist_sign(userName);

		reportObj.setQc_status(AppConstantsQc.waitingStatus);
		reportObj.setMail_status(AppConstantsQc.waitingStatus);
		if (reportObj.getQc_sign() != null && !reportObj.getQc_sign().isEmpty()) {
			reportObj.setQc_sign("");
		}
		if (reportObj.getQc_submit_by()!= null && !reportObj.getQc_submit_by().isEmpty()) {
			reportObj.setQc_submit_by("");
		}
		if (reportObj.getQc_submit_id() != null) {
			reportObj.setQc_submit_id(null);
		}
		if (reportObj.getQc_submit_on()!= null) {
			reportObj.setQc_submit_on(null);
		}
		reportObj = shelfLifePeriodRepo.save(reportObj);

		if (reportObj.getPhysicalAndChemicalTests() != null) {
			for (PhysicalAndChemicalPropTestF026 test : reportObj.getPhysicalAndChemicalTests()) {
				test.setShelfLifeId(reportObj.getId()); // Set foreign key
				test.setShelfLifePeriodPhysicChemMicroF026(reportObj); // Set parent reference
				//                physicalAndChemcalRepo.save(test);
			}

		}
		PhysicalAndChemcalRepoF026.saveAll(reportObj.getPhysicalAndChemicalTests());
	}


	private void handleRoleMicrobiologist(RawCottenAnalysisReportARF001 reportObj, String userName, Long userId, Date date) {
		// Set Microbiologist-specific fields
		reportObj.setMicrobiologist_submit_by(userName);
		reportObj.setMicrobiologist_submit_on(date);
		reportObj.setMicrobiologist_submit_id(userId);
		reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
		reportObj.setMicrobiologist_sign(userName);

		// Reset QC fields
		reportObj.setQc_status(AppConstantsQc.waitingStatus);
		reportObj.setMail_status(AppConstantsQc.waitingStatus);
		if (reportObj.getQc_sign() != null && !reportObj.getQc_sign().isEmpty()) {
			reportObj.setQc_sign("");
		}
		if (reportObj.getQc_submit_by() != null && !reportObj.getQc_submit_by().isEmpty()) {
			reportObj.setQc_submit_by("");
		}
		if (reportObj.getQc_submit_id() != null) {
			reportObj.setQc_submit_id(null);
		}
		if (reportObj.getQc_submit_on() != null) {
			reportObj.setQc_submit_on(null);
		}

		reportObj= rawCottenAnalysisRepo.save(reportObj);
		// Establish relationship and set RAW_COTTON_ANALYSIS_ID in child entities
		if (reportObj.getMicrobiologicalTests() != null) {
			for (MicrobiologicalTestARF001 test : reportObj.getMicrobiologicalTests()) {
				test.setRawCottenAnalysisId(reportObj.getId()); // Set foreign key
				test.setRawCottenAnalysisReport(reportObj); // Set parent reference
				//                microBiologicalRepo.save(test);
			}
		}

		// Optionally, save the child entities if not relying on Cascade
		microBiologicalRepo.saveAll(reportObj.getMicrobiologicalTests());
	}

	private void handleRoleMicrobiologistF026(QcShelfLifePeriodPhysicChemMicroF026 reportObj, String userName, Long userId, Date date) {
		reportObj.setMicrobiologist_submit_by(userName);
		reportObj.setMicrobiologist_submit_on(date);
		reportObj.setMicrobiologist_submit_id(userId);
		reportObj.setMicrobiologist_status(AppConstantsQc.microBiologistSubmitted);
		reportObj.setMicrobiologist_sign(userName);

		reportObj.setQc_status(AppConstantsQc.waitingStatus);
		reportObj.setMail_status(AppConstantsQc.waitingStatus);
		if (reportObj.getQc_sign() != null && !reportObj.getQc_sign().isEmpty()) {
			reportObj.setQc_sign("");
		}
		if (reportObj.getQc_submit_by()!= null && !reportObj.getQc_submit_by().isEmpty()) {
			reportObj.setQc_submit_by("");
		}
		if (reportObj.getQc_submit_id() != null) {
			reportObj.setQc_submit_id(null);
		}
		if (reportObj.getQc_submit_on()!= null) {
			reportObj.setQc_submit_on(null);
		}
		reportObj = shelfLifePeriodRepo.save(reportObj);

		if (reportObj.getMicrobiologicalTests() != null) {
			for (MicrobiologicalTestF026 test : reportObj.getMicrobiologicalTests()) {
				test.setShelfLifeId(reportObj.getId()); // Set foreign key
				test.setShelfLifePeriodPhysicChemMicroF026(reportObj); // Set parent reference
				//                microBiologicalRepo.save(test);
			}
		}

		// Optionally, save the child entities if not relying on Cascade
		MicrobiologicalRepoF026.saveAll(reportObj.getMicrobiologicalTests());
	}


	private void saveAuditTrackAndSendEmail(RawCottenAnalysisReportARF001 reportObj, String role) {
		RawCottenAnalysisReportARF001History existingHistory = rawCottenAnalysisRepoHistory
				.fetchLastSubmittedRecordMillBatchNo(reportObj.getMillBatchNo());

		RawCottenAnalysisReportARF001History reportHistory = new RawCottenAnalysisReportARF001History();

		if (existingHistory != null) {
			reportHistory.setId(existingHistory.getId()); // Preserve the ID
			reportHistory.setVersion(existingHistory.getVersion()); // Preserve the version
		}

		// Copy properties from the report object to the history entity, excluding ID and version
		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version");

		// Increment the version number for the new history record
		int version = rawCottenAnalysisRepoHistory.getMaximumVersion(reportHistory.getMillBatchNo())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		// Save the history record first
		RawCottenAnalysisReportARF001History savedHistory = rawCottenAnalysisRepoHistory.save(reportHistory);

		// Save the physical and chemical test history if they exist
		if (reportObj.getPhysicalAndChemicalTests() != null) {
			for (PhysicalAndChemcalTestARF001 test : reportObj.getPhysicalAndChemicalTests()) {
				PhysicalAndChemcalTestARF001History testHistory = new PhysicalAndChemcalTestARF001History();
				// Copy properties from the test to testHistory
				BeanUtils.copyProperties(test, testHistory, "id");
				testHistory.setRawCottenAnalysisReportHistory(savedHistory); // Set the parent reference
				testHistory.setRawCottenAnalysisId(savedHistory.getId());	
				physicalAndChemcalTestARF001RepoHistory.save(testHistory);
			}
		}

		// Save the microbiological test history if they exist
		if (reportObj.getMicrobiologicalTests() != null) {
			for (MicrobiologicalTestARF001 test : reportObj.getMicrobiologicalTests()) {
				MicrobiologicalTestARF001History testHistory = new MicrobiologicalTestARF001History();
				// Copy properties from the test to testHistory
				BeanUtils.copyProperties(test, testHistory, "id");
				testHistory.setRawCottenAnalysisReportHistory(savedHistory); // Set the parent reference
				testHistory.setRawCottenAnalysisId(savedHistory.getId());
				microbiologicalTestARF001RepoHistory.save(testHistory);
			}
		}

		//	     Optional email sending logic
		try {
			qcMailFunction.sendEmailToHodARF001(reportObj);
		} catch (Exception ex) {
			log.error("**** Unable to send email after submission ****", ex);
		}
	}


	private void saveAuditTrackAndSendEmailF026(QcShelfLifePeriodPhysicChemMicroF026 reportObj, String role) {
		// Create a new history entity
		QcShelfLifePeriodPhysicChemMicroF026History reportHistory = new QcShelfLifePeriodPhysicChemMicroF026History();

		// Copy properties from reportObj to reportHistory, excluding collections and ID-related fields
		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "physicalAndChemicalTests", "microbiologicalTests");

		// Determine the new version number
		int version = shelfLifePeriodRepoHistory.getMaximumVersion(reportHistory.getTestingDate())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		// Save the new history record
		QcShelfLifePeriodPhysicChemMicroF026History savedHistory = shelfLifePeriodRepoHistory.save(reportHistory);

		// Handle Physical and Chemical Tests
		if (reportObj.getPhysicalAndChemicalTests() != null) {
			List<PhysicalAndChemicalPropTestF026History> physChemTestHistories = new ArrayList<>();
			for (PhysicalAndChemicalPropTestF026 test : reportObj.getPhysicalAndChemicalTests()) {
				PhysicalAndChemicalPropTestF026History testHistory = new PhysicalAndChemicalPropTestF026History();
				// Copy properties from the test to testHistory, excluding ID
				BeanUtils.copyProperties(test, testHistory, "id");
				// Set the parent reference
				testHistory.setShelfLifePeriodPhysicChemMicroF026History(savedHistory);
				testHistory.setShelfLifeHistoryId(savedHistory.getId());
				physChemTestHistories.add(testHistory);
			}
			physicalAndChemcalF026RepoHistory.saveAll(physChemTestHistories);
		}

		// Handle Microbiological Tests
		if (reportObj.getMicrobiologicalTests() != null) {
			List<MicrobiologicalTestF026History> microbioTestHistories = new ArrayList<>();
			for (MicrobiologicalTestF026 test : reportObj.getMicrobiologicalTests()) {
				MicrobiologicalTestF026History testHistory = new MicrobiologicalTestF026History();
				// Copy properties from the test to testHistory, excluding ID
				BeanUtils.copyProperties(test, testHistory, "id");
				// Set the parent reference
				testHistory.setShelfLifePeriodPhysicChemMicroF026History(savedHistory);
				testHistory.setShelfLifeHistoryId(savedHistory.getId());
				microbioTestHistories.add(testHistory);
			}
			microbioARF026RepoHistory.saveAll(microbioTestHistories);
		}

		// Optional: Implement email sending logic here
		try {

			qcMailFunction.sendEmailToSupervisorF026(reportObj);

		} catch (Exception ex) {
			log.error("**** Unable to send email after submission ****", ex);
		}
	}



	private void saveAuditTrackAndSendEmailARF003(ChemicalAnalysisReportARF003 reportObj, String role) {
		ChemicalAnalysisReportARF003History existingHistory = chemicalAnalysisRepoHistory
				.fetchLastSubmittedRecordMaterialDocNo(reportObj.getMaterialDocNo());

		ChemicalAnalysisReportARF003History reportHistory = new ChemicalAnalysisReportARF003History();

		if (existingHistory != null) {
			// Use existing history for properties except ID and version
			reportHistory.setId(existingHistory.getId()); // Preserve the ID
			reportHistory.setVersion(existingHistory.getVersion()); // Preserve the version
		}

		// Copy properties selectively, excluding ID and version
		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version");

		// Increment version number for the new history record
		int version = chemicalAnalysisRepoHistory.getMaximumVersion(reportHistory.getMaterialDocNo())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		// Save the history record
		chemicalAnalysisRepoHistory.save(reportHistory);

		// Email sending logic
		try {

			qcMailFunction.sendEmailToSupervisorARF003(reportObj);

		} catch (Exception ex) {
			log.error("**** Unable to send email after submission ****", ex);
		}
	}


	@Transactional
	private void saveAuditTrackAndSendEmailF004(Qc_RawCottenConsolidatedAnalyticalReportF004 reportObj, String role) {
		Qc_RawCottenConsolidatedAnalyticalReportF004History existingHistory = null;
		Qc_RawCottenConsolidatedAnalyticalReportF004History reportHistory = new Qc_RawCottenConsolidatedAnalyticalReportF004History();

		try {

			existingHistory = rawCottenConsolidatedRepoHistory
					.fetchLastSubmittedRecordBmrNo(reportObj.getBleachingBmrNo());

			if (existingHistory != null) {
				reportHistory = existingHistory;
			}
			else{
				reportHistory=new Qc_RawCottenConsolidatedAnalyticalReportF004History();
			}

			BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

			int version = rawCottenConsolidatedRepoHistory.getMaximumVersion(reportHistory.getBleachingBmrNo())
					.map(temp -> temp + 1)
					.orElse(1);
			reportHistory.setVersion(version);



			// Save the parent entity first to generate an ID
			reportHistory = rawCottenConsolidatedRepoHistory.save(reportHistory);

			// Handle child entities if any
			if (reportObj.getDetails() != null && !reportObj.getDetails().isEmpty()) {
				List<Qc_RawCottenConsolidatedDetailsHistory> detailHistories = new ArrayList<>();
				for (Qc_RawCottenConsolidatedDetails detail : reportObj.getDetails()) {
					Qc_RawCottenConsolidatedDetailsHistory detailHistory = new Qc_RawCottenConsolidatedDetailsHistory();
					BeanUtils.copyProperties(detail, detailHistory, "id", "parentId");
					detailHistory.setParentId(reportHistory.getId()); // Set parent ID in child entities
					detailHistories.add(detailHistory);
				}

				// Save child entities
				rawCottonConsolidatedDetailsRepoHistory.saveAll(detailHistories);
			}

			// Email sending logic (if applicable)
			try {

				qcMailFunction.sendEmailToSupervisorF004(reportObj);

			} catch (Exception ex) {
				log.error("**** Unable to send email after submission ****", ex);
			}

		} catch (Exception ex) {
			log.error("**** Error in saving audit track and sending email ****", ex);
			throw new RuntimeException("Error in saving audit track and sending email", ex);
		}
	}

	private void saveAuditTrackAndSendEmailF019(Qc_MediaPreparationAndConsumptionRecordF019 reportObj, String role) {
		Qc_MediaPreparationAndConsumptionRecordF019History existingHistory = mediaPreparationRepoHistory
				.fetchLastSubmittedRecordByDateAndLoad(reportObj.getPreparationDate(),reportObj.getLoadNo());

		Qc_MediaPreparationAndConsumptionRecordF019History reportHistory = new Qc_MediaPreparationAndConsumptionRecordF019History();

		if (existingHistory != null) {
			// Use existing history for properties except ID and version
			reportHistory.setId(existingHistory.getId()); // Preserve the ID
			reportHistory.setVersion(existingHistory.getVersion()); // Preserve the version
		}

		// Copy properties selectively, excluding ID and version
		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version");

		// Increment version number for the new history record
		int version = mediaPreparationRepoHistory.getMaximumVersion(reportHistory.getPreparationDate(),reportHistory.getLoadNo())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		// Save the history record
		mediaPreparationRepoHistory.save(reportHistory);

		// Email sending logic
		try {

			qcMailFunction.sendEmailToSupervisorF019(reportObj);

		} catch (Exception ex) {
			log.error("**** Unable to send email after submission ****", ex);
		}
	}

	@Transactional
	private void saveAuditTrackAndSendEmailSampleInwardBookF1F2F3(SampleInwardBookF001_F002_F003 reportObj, String role) {
		SampleInwardBookF001_F002_F003History existingHistory = null;
		SampleInwardBookF001_F002_F003History reportHistory = new SampleInwardBookF001_F002_F003History();

		try {
			// Handling history record based on format number
			if (reportObj.getFormatNo().equalsIgnoreCase("PH-QCL01/F-001")) {
				existingHistory = sampleInwardBookRepoHistory
						.fetchLastSubmittedRecordDateF001(reportObj.getDateF001());

				if (existingHistory != null) {
					reportHistory = existingHistory;
				}
				else{
					reportHistory=new SampleInwardBookF001_F002_F003History();
				}

				BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

				int version = sampleInwardBookRepoHistory.getMaximumVersionOfDateF001(reportHistory.getDateF001())
						.map(temp -> temp + 1)
						.orElse(1);
				reportHistory.setVersion(version);

			} else if (reportObj.getFormatNo().equalsIgnoreCase("PH-QCL01/F-002")) {
				existingHistory = sampleInwardBookRepoHistory
						.fetchLastSubmittedRecordDateF002(reportObj.getDateF002());

				if (existingHistory != null) {
					reportHistory = existingHistory;
				}
				BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

				int version = sampleInwardBookRepoHistory.getMaximumVersionOfDateF002(reportHistory.getDateF002())
						.map(temp -> temp + 1)
						.orElse(1);
				reportHistory.setVersion(version);

			} else if (reportObj.getFormatNo().equalsIgnoreCase("PH-QCL01/F-003")) {
				existingHistory = sampleInwardBookRepoHistory
						.fetchLastSubmittedRecordDateF003(reportObj.getDateF003());

				if (existingHistory != null) {
					reportHistory = existingHistory;
				}
				BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

				int version = sampleInwardBookRepoHistory.getMaximumVersionOfDateF003(reportHistory.getDateF003())
						.map(temp -> temp + 1)
						.orElse(1);
				reportHistory.setVersion(version);
			}

			// Save the parent entity first to generate an ID
			reportHistory = sampleInwardBookRepoHistory.save(reportHistory);

			// Handle child entities if any
			if (reportObj.getDetails() != null && !reportObj.getDetails().isEmpty()) {
				List<SampleInwardBookDetailHistory> detailHistories = new ArrayList<>();
				for (SampleInwardBookDetail detail : reportObj.getDetails()) {
					SampleInwardBookDetailHistory detailHistory = new SampleInwardBookDetailHistory();
					BeanUtils.copyProperties(detail, detailHistory, "id", "parentId");
					detailHistory.setHistoryParentId(reportHistory.getId()); // Set parent ID in child entities
					detailHistories.add(detailHistory);
				}

				// Save child entities
				sampleInwardBookDetailRepoHistory.saveAll(detailHistories);
			}

			// Email sending logic (if applicable)
			try {

				qcMailFunction.sendEmailToSupervisorF001_2_3(reportObj);

			} catch (Exception ex) {
				log.error("**** Unable to send email after submission ****", ex);
			}

		} catch (Exception ex) {
			log.error("**** Error in saving audit track and sending email ****", ex);
			throw new RuntimeException("Error in saving audit track and sending email", ex);
		}
	}



	private void saveAuditTrackAndSendEmailDistilledWaterAnalysis(DistilledWaterAnalysisReportARF012 reportObj, String role) {
		DistilledWaterAnalysisReportARF012History existingHistory = distilledWaterAnalysisRepoHistory
				.fetchLastSubmittedRecordDate(reportObj.getDate());

		DistilledWaterAnalysisReportARF012History reportHistory = new DistilledWaterAnalysisReportARF012History();

		if (existingHistory != null) {
			// Use existing history for properties except ID and version
			reportHistory.setId(existingHistory.getId()); // Preserve the ID
			reportHistory.setVersion(existingHistory.getVersion()); // Preserve the version
		}

		// Copy properties selectively, excluding ID and version
		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version");

		// Increment version number for the new history record
		int version = distilledWaterAnalysisRepoHistory.getMaximumVersionOfDate(reportHistory.getDate())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		// Save the history record
		distilledWaterAnalysisRepoHistory.save(reportHistory);

		// Email sending logic
		try {

			qcMailFunction.sendEmailToSupervisorARF012(reportObj);

		} catch (Exception ex) {
			log.error("**** Unable to send email after submission ****", ex);
		}
	}

	private void saveAuditTrackAndSendEmailTdsMeterCalibration(QcTdsMeterCalibrationReportF008 reportObj, String role) {

		QcTdsMeterCalibrationReportF008History existingHistory = tdsMeterCalibrationRepoHistory
				.fetchLastSubmittedRecordDate(reportObj.getDate());

		QcTdsMeterCalibrationReportF008History reportHistory = new QcTdsMeterCalibrationReportF008History();

		if (existingHistory != null) {
			// Use existing history for properties except ID and version
			reportHistory.setId(existingHistory.getId()); // Preserve the ID
			reportHistory.setVersion(existingHistory.getVersion()); // Preserve the version
		}

		// Copy properties selectively, excluding ID and version
		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version");

		// Increment version number for the new history record
		int version = tdsMeterCalibrationRepoHistory.getMaximumVersionOfDate(reportHistory.getDate())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		// Save the history record
		tdsMeterCalibrationRepoHistory.save(reportHistory);

		// Email sending logic
		try {

			qcMailFunction.sendEmailToSupervisorF008(reportObj);

		} catch (Exception ex) {
			log.error("**** Unable to send email after submission ****", ex);
		}
	}

	private void saveAuditTrackAndSendEmailPhMeterCalibration(QcPhMeterCalibrationReportF006 reportObj, String role) {

		QcPhMeterCalibrationReportF006History existingHistory = phMeterCalibHistoryRepo
				.fetchLastSubmittedRecordDate(reportObj.getDate());

		QcPhMeterCalibrationReportF006History reportHistory = new QcPhMeterCalibrationReportF006History();

		if (existingHistory != null) {
			// Use existing history for properties except ID and version
			reportHistory.setId(existingHistory.getId()); // Preserve the ID
			reportHistory.setVersion(existingHistory.getVersion()); // Preserve the version
		}

		// Copy properties selectively, excluding ID and version
		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version");

		// Increment version number for the new history record
		int version = phMeterCalibHistoryRepo.getMaximumVersionOfDate(reportHistory.getDate())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		// Save the history record
		phMeterCalibHistoryRepo.save(reportHistory);

		// Email sending logic
		try {

			qcMailFunction.sendEmailToSupervisorF006(reportObj);

		} catch (Exception ex) {
			log.error("**** Unable to send email after submission ****", ex);
		}
	}


	
	@Transactional 
	private void saveAuditTrackAndSendEmailRegentPreparationRecord(QcReagentPreparationRecordF017 reportObj, String role) {
		QcReagentPreparationRecordF017History existingHistory = regantPreparationRepoHistory
				.fetchLastSubmittedRecordDate(reportObj.getMonth(), reportObj.getYear());
		QcReagentPreparationRecordF017History reportHistory = new QcReagentPreparationRecordF017History();
		if (existingHistory != null) {
			// Use existing history for properties except ID and version
			reportHistory.setId(existingHistory.getId()); // Preserve the ID
			reportHistory.setVersion(existingHistory.getVersion()); // Preserve the version
		}
		// Copy properties selectively, excluding ID and version
		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version");
		// Increment version number for the new history record
//		int version = regantPreparationRepoHistory.getMaximumVersionOfDate(reportHistory.getQcReagentPreparationRecordF017ChemTableHistory().stream()
//              .map(QcReagentPreparationRecordF017ChemTableHistory::getPreparationDate) 
//              .findFirst() 
//              .orElse(null))
		int version = regantPreparationRepoHistory.getMaximumVersionOfDate(reportHistory.getMonth(),reportHistory.getYear())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);
		// Save the history record
		regantPreparationRepoHistory.save(reportHistory);
		if(reportObj.getQcReagentPreparationRecordF017ChemTables()!=null || !reportObj.getQcReagentPreparationRecordF017ChemTables().isEmpty()) {
			List<QcReagentPreparationRecordF017ChemTableHistory> chemHistories=new ArrayList<>();
			for(QcReagentPreparationRecordF017ChemTable data:reportObj.getQcReagentPreparationRecordF017ChemTables()) {
				QcReagentPreparationRecordF017ChemTableHistory chemHistory=new QcReagentPreparationRecordF017ChemTableHistory();
				BeanUtils.copyProperties(data, chemHistory,"sno","reagentPrepHistoryId");	
			    chemHistory.setReagentPrepHistoryId(reportHistory.getId());
			    chemHistories.add(chemHistory);    		
			}
			reagentPreparationRecordF017ChemHistoryRepo.saveAll(chemHistories);
		}
		//Email sending logic
		try {
 
			qcMailFunction.sendEmailToSupervisorF017(reportObj);
 
		} catch (Exception ex) {

			log.error("**** Unable to send email after submission ****", ex);

		}

	}
	

	@Transactional
	private void saveAuditTrackAndSendEmailwiraFiberFineness(Qc_WiraFiberFinenessTesterReportF010 reportObj, String role) {
		Qc_WiraFiberFinenessTesterReportF010History existingHistory = null;
		Qc_WiraFiberFinenessTesterReportF010History reportHistory = new Qc_WiraFiberFinenessTesterReportF010History();

		try {

			existingHistory = WiraFiberFinenessRepoHistory
					.fetchLastSubmittedRecordMonthYear(reportObj.getMonth(), reportObj.getYear());

			if (existingHistory != null) {
				reportHistory = existingHistory;
			}
			else{
				reportHistory=new Qc_WiraFiberFinenessTesterReportF010History();
			}

			BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

			int version = WiraFiberFinenessRepoHistory.getMaximumVersionOfDate(reportHistory.getMonth(), reportHistory.getYear())
					.map(temp -> temp + 1)
					.orElse(1);
			reportHistory.setVersion(version);



			// Save the parent entity first to generate an ID
			reportHistory = WiraFiberFinenessRepoHistory.save(reportHistory);

			// Handle child entities if any
			if (reportObj.getDetails() != null && !reportObj.getDetails().isEmpty()) {
				List<WiraFiberDetailsHistory> detailHistories = new ArrayList<>();
				for (WiraFiberDetails detail : reportObj.getDetails()) {
					WiraFiberDetailsHistory detailHistory = new WiraFiberDetailsHistory();
					BeanUtils.copyProperties(detail, detailHistory, "id", "parentId");
					detailHistory.setParentId(reportHistory.getId()); // Set parent ID in child entities
					detailHistories.add(detailHistory);
				}

				// Save child entities
				wiraFiberDetailsRepoHistory.saveAll(detailHistories);
			}

			// Email sending logic (if applicable)
			try {

				qcMailFunction.sendEmailToSupervisorF010(reportObj);

			} catch (Exception ex) {
				log.error("**** Unable to send email after submission ****", ex);
			}

		} catch (Exception ex) {
			log.error("**** Error in saving audit track and sending email ****", ex);
			throw new RuntimeException("Error in saving audit track and sending email", ex);
		}
	}


	@Transactional
	private void saveAuditTrackAndSendEmailMediaGrowthReport(Qc_MediaGrowthPromotionTestReportF021 reportObj, String role) {
		Qc_MediaGrowthPromotionTestReportF021History existingHistory = null;
		Qc_MediaGrowthPromotionTestReportF021History reportHistory = new Qc_MediaGrowthPromotionTestReportF021History();

		try {

			existingHistory = mediaGrowthHistoryRepo
					.fetchLastSubmittedRecordByIncubationDate(reportObj.getIncubationStartOn());

			if (existingHistory != null) {
				reportHistory = existingHistory;
			}
			else{
				reportHistory=new Qc_MediaGrowthPromotionTestReportF021History();
			}

			BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

			int version = mediaGrowthHistoryRepo.getMaximumVersionOfDate(reportHistory.getIncubationStartOn())
					.map(temp -> temp + 1)
					.orElse(1);
			reportHistory.setVersion(version);



			// Save the parent entity first to generate an ID
			reportHistory = mediaGrowthHistoryRepo.save(reportHistory);

			// Handle child entities if any
			if (reportObj.getDetails() != null && !reportObj.getDetails().isEmpty()) {
				List<MediaGrowthDetailsHistory> detailHistories = new ArrayList<>();
				for (MediaGrowthDetails detail : reportObj.getDetails()) {
					MediaGrowthDetailsHistory detailHistory = new MediaGrowthDetailsHistory();
					BeanUtils.copyProperties(detail, detailHistory, "id", "parentId");
					detailHistory.setParentId(reportHistory.getId()); // Set parent ID in child entities
					detailHistories.add(detailHistory);
				}

				// Save child entities
				mediaGrowthDetailRepoHistory.saveAll(detailHistories);
			}

			// Email sending logic (if applicable)
			try {

				qcMailFunction.sendEmailToSupervisorF021(reportObj);

			} catch (Exception ex) {
				log.error("**** Unable to send email after submission ****", ex);
			}

		} catch (Exception ex) {
			log.error("**** Error in saving audit track and sending email ****", ex);
			throw new RuntimeException("Error in saving audit track and sending email", ex);
		}
	}


	@Transactional
	private void saveAuditTrackAndSendEmailSwabMicrobiologicalAnalysis(SwabMicrobiologicalAnalysisARF008_009_010 reportObj, String role) {
		SwabMicrobiologicalAnalysisARF008_009_010History existingHistory = null;
		SwabMicrobiologicalAnalysisARF008_009_010History reportHistory = new SwabMicrobiologicalAnalysisARF008_009_010History();
		try {
			if (reportObj == null) {
				throw new IllegalArgumentException("Report object cannot be null");
			}
			// Handling history record based on format number
			if (reportObj.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-008")) {
				existingHistory = SwabMicrAnalysisRepoHistory
						.fetchLastSubmittedRecordDateF008(reportObj.getSampledDateF008());

				if (existingHistory != null) {
					reportHistory = existingHistory;
				}
				BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

				int version = SwabMicrAnalysisRepoHistory.getMaximumVersionOfDateF008(reportHistory.getSampledDateF008())
						.map(temp -> temp + 1)
						.orElse(1);
				reportHistory.setVersion(version);

			} else if (reportObj.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-009")) {
				existingHistory = SwabMicrAnalysisRepoHistory
						.fetchLastSubmittedRecordDateF009(reportObj.getSampledDateF009());

				if (existingHistory != null) {
					reportHistory = existingHistory;
				}
				BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

				int version = SwabMicrAnalysisRepoHistory.getMaximumVersionOfDateF009(reportHistory.getSampledDateF009())
						.map(temp -> temp + 1)
						.orElse(1);
				reportHistory.setVersion(version);

			} else if (reportObj.getFormatNo().equalsIgnoreCase("PH-QCL01-AR-F-010")) {
				existingHistory = SwabMicrAnalysisRepoHistory
						.fetchLastSubmittedRecordDateF010(reportObj.getSampledDateF010());

				if (existingHistory != null) {
					reportHistory = existingHistory;
				}
				BeanUtils.copyProperties(reportObj, reportHistory, "id", "version", "details");

				int version = SwabMicrAnalysisRepoHistory.getMaximumVersionOfDateF010(reportHistory.getSampledDateF010())
						.map(temp -> temp + 1)
						.orElse(1);
				reportHistory.setVersion(version);
			}

			// Save the parent entity first to generate an ID
			reportHistory = SwabMicrAnalysisRepoHistory.save(reportHistory);

			// Handle child entities if any
			if (reportObj.getDetails() != null && !reportObj.getDetails().isEmpty()) {
				List<SwabMicrobiologicalDetailsHistory> detailHistories = new ArrayList<>();
				for (SwabMicrobiologicalDetails detail : reportObj.getDetails()) {
					SwabMicrobiologicalDetailsHistory detailHistory = new SwabMicrobiologicalDetailsHistory();
					BeanUtils.copyProperties(detail, detailHistory, "id", "parentId");
					detailHistory.setParentId(reportHistory.getId()); // Set parent ID in child entities
					detailHistories.add(detailHistory);
				}

				// Save child entities
				SwabMicroDetailsRepoHistory.saveAll(detailHistories);
			}

			// Email sending logic (if applicable)
			try {

				qcMailFunction.sendEmailToSupervisorARF008_09_10(reportObj);

			} catch (Exception ex) {
				log.error("**** Unable to send email after submission ****", ex);
			}
		}catch (Exception ex) {
			log.error("Error in saving audit track and sending email", ex);
			throw new RuntimeException("Error in saving audit track and sending email", ex);

		}
	}




	private void saveAuditTrackAndSendEmailF012(Qc_BacterialIncubatorTempCalibrationF012 reportObj, String role) {
		Qc_BacterialIncubatorTempCalibrationF012History existingHistory = bacterialIncubatorTempCalRepoHistory
				.fetchLastSubmittedRecordByDate(reportObj.getDate());

		Qc_BacterialIncubatorTempCalibrationF012History reportHistory = new Qc_BacterialIncubatorTempCalibrationF012History();

		if (existingHistory != null) {
			// Use existing history for properties except ID and version
			reportHistory.setId(existingHistory.getId()); // Preserve the ID
			reportHistory.setVersion(existingHistory.getVersion()); // Preserve the version
		}

		// Copy properties selectively, excluding ID and version
		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version");


		int version = bacterialIncubatorTempCalRepoHistory.getMaximumVersion(reportHistory.getDate())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		// Save the history record
		bacterialIncubatorTempCalRepoHistory.save(reportHistory);

		//	     Email sending logic
		try {

			qcMailFunction.sendEmailToSupervisorF012(reportObj);

		} catch (Exception ex) {
			log.error("**** Unable to send email after submission ****", ex);
		}
	}

	private void saveAuditTrackAndSendEmailF014(Qc_ValidationForAutoclaveByChemicalIndicatorF014 reportObj, String role) {
		Qc_ValidationForAutoclaveByChemicalIndicatorF014History existingHistory = ValidationForAutoclaveChemReopHistory
				.fetchLastSubmittedRecordByDate(reportObj.getDate());

		Qc_ValidationForAutoclaveByChemicalIndicatorF014History reportHistory = new Qc_ValidationForAutoclaveByChemicalIndicatorF014History();

		if (existingHistory != null) {
			// Use existing history for properties except ID and version
			reportHistory.setId(existingHistory.getId()); // Preserve the ID
			reportHistory.setVersion(existingHistory.getVersion()); // Preserve the version
		}

		// Copy properties selectively, excluding ID and version
		BeanUtils.copyProperties(reportObj, reportHistory, "id", "version");


		int version = ValidationForAutoclaveChemReopHistory.getMaximumVersion(reportHistory.getDate())
				.map(temp -> temp + 1)
				.orElse(1);
		reportHistory.setVersion(version);

		// Save the history record
		ValidationForAutoclaveChemReopHistory.save(reportHistory);

		// Email sending logic
		try {

			qcMailFunction.sendEmailToSupervisorF014(reportObj);

		} catch (Exception ex) {
			log.error("**** Unable to send email after submission ****", ex);
		}
	}



	private void validateReport(RawCottenAnalysisReportARF001 report) throws Exception {
		if (report.getFormatNo() == null || report.getRefSopNo() == null || report.getRevisionNo() == null||
				report.getMillBatchNo() == null|| report.getDate() == null) {
			throw new Exception("Mandatory fields missing in RawCottenAnalysisReportARF001");
		}



		if (report.getPhysicalAndChemicalTests() != null) {
			for (PhysicalAndChemcalTestARF001 test : report.getPhysicalAndChemicalTests()) {
				if (test.getSupplier() == null ||test.getStation() == null ||
						test.getBillOrInvoiceNo() == null ||test.getBillOrInvoiceNo() == null ||test.getDateOfReceipt() == null || 
						test.getTestedDate() == null ||test.getArNo() == null || test.getSampleSize() == null || 
						test.getIdentificationTestObsr() == null || test.getIdentificationTestRmrk() == null ||
						test.getMicronaireValueObsr() == null || test.getMicronaireValueRmrk() == null ||
						test.getAvarageLengthObsr() == null || test.getAvarageLengthRmrk() == null ||
						test.getNepsObsr() == null || test.getNepsRmrk() == null ||
						test.getUpperQuartileLengthObsr() == null || test.getUpperQuartileLengthRmrk() == null ||
						test.getLengthByWeightObsr() == null || test.getLengthByWeightRmrk() == null ||
						test.getLengthByNoObsr() == null || test.getLengthByNoRmrk() == null ||
						test.getShortFiberCntByWtObsr() == null || test.getShortFiberContentByWtRmrk() == null ||
						test.getShortFiberContentByNoObsr() == null || test.getShortFiberContentByNoRmrk() == null ||
						test.getWhitenessIndicesObsr() == null || test.getWhitenessIndicesRmrk() == null ||
						test.getFlourescenceObsr() == null || test.getFlourescenceRmrk() == null ||
						test.getAshContentFlWtObsr() == null || test.getAshContentIlWtObsr() == null ||
						test.getAshContentFrBAObsr() == null || test.getAshContentFrResObsr() == null ||
						test.getAshContentRmrk() == null || test.getEitherSolSubFlWtObsr() == null ||
						test.getEitherSolSubIlWtObsr() == null || test.getEitherSolSubFrYXObsr() == null ||
						test.getEitherSolSubFrResObsr() == null || test.getEitherSolSubRmrk() == null ||
						test.getMoistureContentIlWtObsr() == null || test.getMoistureContentFlWtObsr() == null ||
						test.getMoistureContentFrKlObsr() == null || test.getMoistureContentFrResObsr() == null ||
						test.getMoistureContentRmrk() == null || test.getTrashCottonWtMObsr() == null ||
						test.getTrashTrashWtNObsr() == null || test.getTrashResObsr() == null ||
						test.getTrashRemark() == null || test.getFinalRemark() == null ||
						test.getLotStatusAccepted() == null || test.getLotStatusAcceptedUnderDeviation() == null ||
						test.getLotStatusRejected() == null) {
					throw new Exception("Mandatory fields missing in PhysicalAndChemcalTestARF001");
				}
			}
		}

		if (report.getMicrobiologicalTests() != null) {
			for (MicrobiologicalTestARF001 test : report.getMicrobiologicalTests()) {
				if (test.getSampledOn() == null || test.getTestedOrIncubationStartOn() == null ||
						test.getTotalViableCount() == null || test.getTotalFungalCount() == null ||
						test.getColiform() == null || test.getEcoli() == null ||
						test.getSaur() == null || test.getPaer() == null ||
						test.getSal() == null || test.getTestCompletionDate() == null ||
						test.getProduct() == null) {
					throw new Exception("Mandatory fields missing in MicrobiologicalTestARF001");
				}
			}
		}
	}

	private void validateChemicalReport(ChemicalAnalysisReportARF003 report) throws Exception {
		if (report.getMaterialDocNo() == null || report.getMaterialDocNo().isEmpty() ||
				report.getFormatNo() == null || report.getFormatNo().isEmpty() ||
				report.getRevisionNo() == null || report.getRevisionNo().isEmpty() ||
				report.getFormatName() == null || report.getFormatName().isEmpty() ||
				report.getRefSopNo() == null || report.getRefSopNo().isEmpty() ||
				report.getDate() == null || report.getDate().isEmpty() ||
				report.getSupplier() == null || report.getSupplier().isEmpty() ||
				report.getChemicalName() == null || report.getChemicalName().isEmpty() ||
				report.getChemicalBatchNo() == null || report.getChemicalBatchNo().isEmpty() ||
				report.getAnalyticalRequestNo() == null ||
				report.getTestedDate() == null || report.getTestedDate().isEmpty() ||
				report.getSampleDate() == null || report.getSampleDate().isEmpty() ||
				report.getAppearanceSpec() == null || report.getAppearanceSpec().isEmpty() ||
				report.getAppearanceObsr() == null || report.getAppearanceObsr().isEmpty() ||
				report.getColorSpec() == null || report.getColorSpec().isEmpty() ||
				report.getColorObsr() == null || report.getColorObsr().isEmpty() ||
				report.getOdourSpec() == null || report.getOdourSpec().isEmpty() ||
				report.getOdourObsr() == null || report.getOdourObsr().isEmpty() ||
				report.getSolubilityInWaterSpec() == null || report.getSolubilityInWaterSpec().isEmpty() ||
				report.getSolubilityInWaterObsr() == null || report.getSolubilityInWaterObsr().isEmpty() ||
				report.getVisibleSpec() == null || report.getVisibleSpec().isEmpty() ||
				report.getVisibleObsr() == null || report.getVisibleObsr().isEmpty() ||
				report.getPhSpec() == null ||
				report.getPhObsr() == null ||
				report.getPuritySpec() == null ||
				report.getPurityObsr() == null ||
				report.getRelativeDensitySpec() == null ||
				report.getRelativeDensityObsr() == null ||
				report.getSpecificGravitySpec() == null ||
				report.getSpecificGravityObsr() == null ||
				report.getTotalSolidsSpec() == null ||
				report.getTotalSolidsObsr() == null ||
				report.getMoistureSpec() == null ||
				report.getMoistureObsr() == null ||
				report.getStandardizedChemicalLotNo() == null ||
				report.getCalculation() == null || report.getCalculation().isEmpty() ||
				report.getDisposalMethod() == null || report.getDisposalMethod().isEmpty() ||
				report.getRemark() == null || report.getRemark().isEmpty() ||
				report.getQtyAcceptedInKg() == null ||
				report.getQtyRejectedInKg() == null ||
				report.getQtyAcceptedUnderDeviation() == null) {

			throw new Exception("Mandatory fields missing in ChemicalAnalysisReportARF003");
		}
	}

	private void validateBacterialIncubatorF012(Qc_BacterialIncubatorTempCalibrationF012 report) throws Exception {
		if (report.getFormatNo() == null || report.getFormatNo().isEmpty() ||
				report.getRevisionNo() == null || report.getRevisionNo().isEmpty() ||
				report.getFormatName() == null || report.getFormatName().isEmpty() ||
				report.getRefSopNo() == null || report.getRefSopNo().isEmpty() ||
				report.getFrequency() == null || report.getFrequency().isEmpty() ||
				report.getDate() == null ||
				report.getEqIdNo() == null || report.getEqIdNo().isEmpty() ||
				report.getStandTemperature() == null || report.getStandTemperature().isEmpty() ||
				report.getSno() == null ||
				report.getMonth() == null || report.getMonth().isEmpty() ||
				report.getYear() == null || report.getYear().isEmpty() ||
				report.getSetTemperature() == null || report.getSetTemperature().isEmpty() ||
				report.getObserevedTemperature() == null || report.getObserevedTemperature().isEmpty()) {

			throw new Exception("Mandatory fields missing in Qc_BacterialIncubatorTempCalibrationF012");
		}
	}




	private void validateSampleInwardBookF001(SampleInwardBookF001_F002_F003 report) throws Exception {
		// Validate the parent entity fields
		if (report.getFormatNo() == null || report.getFormatNo().isEmpty() ||
				report.getRevisionNo() == null || report.getRevisionNo().isEmpty() ||
				report.getFormatName() == null || report.getFormatName().isEmpty() ||
				report.getRefSopNo() == null || report.getRefSopNo().isEmpty() ||
				report.getDateF001() == null || report.getDateF001().isEmpty()||
				report.getMonth()==null||report.getMonth().isEmpty()||
				report.getYear()==null||report.getYear().isEmpty()) {

			throw new Exception("Mandatory fields missing in SampleInwardBookF001_F002_F003");
		}

		// Validate child entities (SampleInwardBookDetail)
		if (report.getDetails() == null || report.getDetails().isEmpty()) {
			throw new Exception("SampleInwardBookF001_F002_F003 must contain at least one detail.");
		}

		for (SampleInwardBookDetail detail : report.getDetails()) {
			if (detail.getShift() == null ||
					detail.getDescriptionOfMaterial() == null || detail.getDescriptionOfMaterial().isEmpty() ||
					detail.getQuantity() == null ||
					detail.getUom() == null || detail.getUom().isEmpty() ||
					detail.getSampleGivenBy() == null || detail.getSampleGivenBy().isEmpty() ||
					detail.getSampleReceivedBy() == null || detail.getSampleReceivedBy().isEmpty() ||
					detail.getRemark() == null || detail.getRemark().isEmpty()) {

				throw new Exception("Mandatory fields missing in SampleInwardBookDetail");
			}
		}
	}

	private void validateSwabMicroARF008(SwabMicrobiologicalAnalysisARF008_009_010 report) throws Exception {
		// Validate the parent entity fields
		if (report.getFormatNo() == null || report.getFormatNo().isEmpty() ||
				report.getRevisionNo() == null || report.getRevisionNo().isEmpty() ||
				report.getFormatName() == null || report.getFormatName().isEmpty() ||
				report.getRefSopNo() == null || report.getRefSopNo().isEmpty() ||
				report.getSampledDateF008() == null || report.getSampledDateF008().isEmpty()||
				report.getMonth()==null||report.getMonth().isEmpty()||
				report.getYear()==null||report.getYear().isEmpty()) {

			throw new Exception("Mandatory fields missing in SwabMicrobiologicalAnalysisARF008_009_010");
		}

		// Validate child entities (SwabMicrobiologicalDetails)
		if (report.getDetails() == null || report.getDetails().isEmpty()) {
			throw new Exception("SwabMicrobiologicalAnalysisARF008_009_010 must contain at least one detail.");
		}

		for (SwabMicrobiologicalDetails detail : report.getDetails()) {
			if (detail.getArNumber() == null ||
					detail.getLocation() == null || detail.getLocation().isEmpty() ||
					detail.getTotalViableCount() == null ||
					detail.getTotalFungalCount() == null ||
					detail.getTestCompletionDate() == null || detail.getTestCompletionDate().isEmpty() ||
					detail.getRemark() == null || detail.getRemark().isEmpty()) {

				throw new Exception("Mandatory fields missing in SwabMicrobiologicalDetails");
			}
		}
	}


	private void validateSwabMicroARF009(SwabMicrobiologicalAnalysisARF008_009_010 report) throws Exception {
		// Validate the parent entity fields
		if (report.getFormatNo() == null || report.getFormatNo().isEmpty() ||
				report.getRevisionNo() == null || report.getRevisionNo().isEmpty() ||
				report.getFormatName() == null || report.getFormatName().isEmpty() ||
				report.getRefSopNo() == null || report.getRefSopNo().isEmpty() ||
				report.getSampledDateF009() == null || report.getSampledDateF009().isEmpty()||
				report.getMonth()==null||report.getMonth().isEmpty()||
				report.getYear()==null||report.getYear().isEmpty()) {

			throw new Exception("Mandatory fields missing in SwabMicrobiologicalAnalysisARF008_009_010");
		}

		// Validate child entities (SwabMicrobiologicalDetails)
		if (report.getDetails() == null || report.getDetails().isEmpty()) {
			throw new Exception("SwabMicrobiologicalAnalysisARF008_009_010 must contain at least one detail.");
		}

		for (SwabMicrobiologicalDetails detail : report.getDetails()) {
			if (detail.getArNumber() == null ||
					detail.getLocation() == null || detail.getLocation().isEmpty() ||
					detail.getTotalViableCount() == null ||
					detail.getTotalFungalCount() == null ||
					detail.getEmployeeIdNo() == null ||
					detail.getTestCompletionDate() == null || detail.getTestCompletionDate().isEmpty() ||
					detail.getRemark() == null || detail.getRemark().isEmpty()) {

				throw new Exception("Mandatory fields missing in SwabMicrobiologicalDetails");
			}
		}
	}

	private void validateSwabMicroARF010(SwabMicrobiologicalAnalysisARF008_009_010 report) throws Exception {
		// Validate the parent entity fields
		if (report.getFormatNo() == null || report.getFormatNo().isEmpty() ||
				report.getRevisionNo() == null || report.getRevisionNo().isEmpty() ||
				report.getFormatName() == null || report.getFormatName().isEmpty() ||
				report.getRefSopNo() == null || report.getRefSopNo().isEmpty() ||
				report.getSampledDateF010() == null || report.getSampledDateF010().isEmpty()||
				report.getMonth()==null||report.getMonth().isEmpty()||
				report.getYear()==null||report.getYear().isEmpty()) {

			throw new Exception("Mandatory fields missing in SwabMicrobiologicalAnalysisARF008_009_010");
		}

		// Validate child entities (SwabMicrobiologicalDetails)
		if (report.getDetails() == null || report.getDetails().isEmpty()) {
			throw new Exception("SwabMicrobiologicalAnalysisARF008_009_010 must contain at least one detail.");
		}

		for (SwabMicrobiologicalDetails detail : report.getDetails()) {
			if (detail.getArNumber() == null ||
					detail.getLocation() == null || detail.getLocation().isEmpty() ||
					detail.getTotalViableCount() == null ||
					detail.getTotalFungalCount() == null ||
					detail.getTestCompletionDate() == null || detail.getTestCompletionDate().isEmpty() ||
					detail.getRemark() == null || detail.getRemark().isEmpty()) {

				throw new Exception("Mandatory fields missing in SwabMicrobiologicalDetails");
			}
		}
	}


	private void validateDistilledWaterAnalysis(DistilledWaterAnalysisReportARF012 report) throws Exception {
		if (report.getFormatNo() == null || report.getFormatNo().isEmpty() ||
				report.getRevisionNo() == null || report.getRevisionNo().isEmpty() ||
				report.getFormatName() == null || report.getFormatName().isEmpty() ||
				report.getRefSopNo() == null || report.getRefSopNo().isEmpty() ||
				report.getDate() == null || report.getDate().isEmpty() ||
				report.getMonth() == null || report.getMonth().isEmpty() ||
				report.getYear() == null || report.getYear().isEmpty() ||
				report.getSno() == null ||
				report.getAnalyticalRequestNo() == null ||
				report.getPh() == null ||
				report.getTurbidityInNtu() == null ||
				report.getTotalDissolvedSolidsInPpm() == null ||
				report.getHardnessInPpm() == null ||
				report.getRemark() == null || report.getRemark().isEmpty()) {

			throw new Exception("Mandatory fields missing in QcDistilledWaterAnalysisReportARF012");
		}
	}


	private void validateTdsMeterCalibrationReport(QcTdsMeterCalibrationReportF008 report) throws Exception {
		if (report.getFormatNo() == null || report.getFormatNo().isEmpty() ||
				report.getRevisionNo() == null || report.getRevisionNo().isEmpty() ||
				report.getFormatName() == null || report.getFormatName().isEmpty() ||
				report.getRefSopNo() == null || report.getRefSopNo().isEmpty() ||
				report.getDate() == null || report.getDate().isEmpty() ||
				report.getFrequency() == null || report.getFrequency().isEmpty() ||
				report.getEqIdNo() == null || report.getEqIdNo().isEmpty() ||
				report.getMonth() == null || report.getMonth().isEmpty() ||
				report.getYear() == null || report.getYear().isEmpty() ||
				report.getSno() == null ||
				report.getStandardSolution() == null ||
				report.getRemark() == null || report.getRemark().isEmpty()) {

			throw new Exception("Mandatory fields missing in QcTdsMeterCalibrationReportF008");
		}
	}

	private void validateSampleInwardBookF002(SampleInwardBookF001_F002_F003 report) throws Exception {
		// Validate the parent entity fields
		if (report.getFormatNo() == null || report.getFormatNo().isEmpty() ||
				report.getRevisionNo() == null || report.getRevisionNo().isEmpty() ||
				report.getFormatName() == null || report.getFormatName().isEmpty() ||
				report.getRefSopNo() == null || report.getRefSopNo().isEmpty() ||
				report.getDateF002() == null || report.getDateF002().isEmpty()||
				report.getMonth()==null||report.getMonth().isEmpty()||
				report.getYear()==null||report.getYear().isEmpty()) {

			throw new Exception("Mandatory fields missing in SampleInwardBookF001_F002_F003");
		}

		// Validate child entities (SampleInwardBookDetail)
		if (report.getDetails() == null || report.getDetails().isEmpty()) {
			throw new Exception("SampleInwardBookF001_F002_F003 must contain at least one detail.");
		}

		for (SampleInwardBookDetail detail : report.getDetails()) {
			if (detail.getShift() == null ||
					detail.getDescriptionOfMaterial() == null || detail.getDescriptionOfMaterial().isEmpty() ||
					detail.getQuantity() == null ||
					detail.getUom() == null || detail.getUom().isEmpty() ||
					detail.getSampleGivenBy() == null || detail.getSampleGivenBy().isEmpty() ||
					detail.getSampleReceivedBy() == null || detail.getSampleReceivedBy().isEmpty() ||
					detail.getRemark() == null || detail.getRemark().isEmpty()) {

				throw new Exception("Mandatory fields missing in SampleInwardBookDetail");
			}
		}
	}

	private void validateSampleInwardBookF003(SampleInwardBookF001_F002_F003 report) throws Exception {
		// Validate the parent entity fields
		if (report.getFormatNo() == null || report.getFormatNo().isEmpty() ||
				report.getRevisionNo() == null || report.getRevisionNo().isEmpty() ||
				report.getFormatName() == null || report.getFormatName().isEmpty() ||
				report.getRefSopNo() == null || report.getRefSopNo().isEmpty() ||
				report.getDateF003() == null || report.getDateF003().isEmpty()||
				report.getMonth()==null||report.getMonth().isEmpty()||
				report.getYear()==null||report.getYear().isEmpty()) {

			throw new Exception("Mandatory fields missing in SampleInwardBookF001_F002_F003");
		}

		// Validate child entities (SampleInwardBookDetail)
		if (report.getDetails() == null || report.getDetails().isEmpty()) {
			throw new Exception("SampleInwardBookF001_F002_F003 must contain at least one detail.");
		}

		for (SampleInwardBookDetail detail : report.getDetails()) {
			if (detail.getShift() == null ||
					detail.getDescriptionOfMaterial() == null || detail.getDescriptionOfMaterial().isEmpty() ||
					detail.getQuantity() == null ||
					detail.getUom() == null || detail.getUom().isEmpty() ||
					detail.getSampleGivenBy() == null || detail.getSampleGivenBy().isEmpty() ||
					detail.getSampleReceivedBy() == null || detail.getSampleReceivedBy().isEmpty() ||
					detail.getRemark() == null || detail.getRemark().isEmpty()) {

				throw new Exception("Mandatory fields missing in SampleInwardBookDetail");
			}
		}
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