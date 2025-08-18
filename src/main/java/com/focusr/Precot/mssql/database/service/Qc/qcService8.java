package com.focusr.Precot.mssql.database.service.Qc;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.focusr.Precot.mssql.database.model.Qc.DisposalRecord;
import com.focusr.Precot.mssql.database.model.Qc.MicrobilogyTestF004;
import com.focusr.Precot.mssql.database.model.Qc.MicrobilogyTestF006;
import com.focusr.Precot.mssql.database.model.Qc.NonWovenF005Lines;
import com.focusr.Precot.mssql.database.model.Qc.QAqcObservations;
import com.focusr.Precot.mssql.database.model.Qc.RequistionF029;
import com.focusr.Precot.mssql.database.model.Qc.absorbentbleachedcottonreportCLF005;
import com.focusr.Precot.mssql.database.model.Qc.absorbentbleachedcottonreportCLF005Parent;
import com.focusr.Precot.mssql.database.model.Qc.briquettesanalysisreportARF014;
import com.focusr.Precot.mssql.database.model.Qc.distillwaterconsumF27;
import com.focusr.Precot.mssql.database.model.Qc.exfoliatingfabricanalysisreport;
import com.focusr.Precot.mssql.database.model.Qc.finishedproductanalysisreportF006;
import com.focusr.Precot.mssql.database.model.Qc.fumigationARF011;
import com.focusr.Precot.mssql.database.model.Qc.fungalIncubatorReportCLF013;
import com.focusr.Precot.mssql.database.model.Qc.mediaDisposalCLF022;
import com.focusr.Precot.mssql.database.model.Qc.microbiologicalAnalyisisReportF20;
import com.focusr.Precot.mssql.database.model.Qc.microbiologicalTestF002;
import com.focusr.Precot.mssql.database.model.Qc.non_woven_F005;
import com.focusr.Precot.mssql.database.model.Qc.obervationCLF007;
import com.focusr.Precot.mssql.database.model.Qc.observationArF011;
import com.focusr.Precot.mssql.database.model.Qc.observationF004;
import com.focusr.Precot.mssql.database.model.Qc.observationsF006;
import com.focusr.Precot.mssql.database.model.Qc.physicalandchemicaltest;
import com.focusr.Precot.mssql.database.model.Qc.potableWaterARF013Report;
import com.focusr.Precot.mssql.database.model.Qc.spectrophotometerReportClF011;
import com.focusr.Precot.mssql.database.model.Qc.temperatureRelativeF018;
import com.focusr.Precot.mssql.database.model.Qc.turbiditycalibrationreportCLF009;
import com.focusr.Precot.mssql.database.model.Qc.validationAutoclave;
import com.focusr.Precot.mssql.database.model.Qc.weighingscalecalibrationreportCLF007;
import com.focusr.Precot.mssql.database.model.QcAudit.DisposalRecordHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobilogyTestF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobilogyTestF006History;
import com.focusr.Precot.mssql.database.model.QcAudit.NonWovenF005LinesHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.QAqcObservationsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.RequistionHistoryF029;
import com.focusr.Precot.mssql.database.model.QcAudit.absorbentbleachedcottonreportCLF005Parenthistory;
import com.focusr.Precot.mssql.database.model.QcAudit.absorbentbleachedcottonreportHistoryCLF005;
import com.focusr.Precot.mssql.database.model.QcAudit.briquettesanalysisreportHistoryARF014;
import com.focusr.Precot.mssql.database.model.QcAudit.distillwaterconsumhistoryF27;
import com.focusr.Precot.mssql.database.model.QcAudit.exfoliatingfabricanalysisreportHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.finishedproductanalysisreporthistory;
import com.focusr.Precot.mssql.database.model.QcAudit.fumigationARF011History;
import com.focusr.Precot.mssql.database.model.QcAudit.fungalIncubatorReportHistoryCLF013;
import com.focusr.Precot.mssql.database.model.QcAudit.mediaDisposalHistoryCLF022;
import com.focusr.Precot.mssql.database.model.QcAudit.microbiologicalAnalyisisReportHistoryF20;
import com.focusr.Precot.mssql.database.model.QcAudit.microbiologicalTestHistoryF002;
import com.focusr.Precot.mssql.database.model.QcAudit.non_woven_F005_history;
import com.focusr.Precot.mssql.database.model.QcAudit.obervationHistoryCLF007;
import com.focusr.Precot.mssql.database.model.QcAudit.observationArF011History;
import com.focusr.Precot.mssql.database.model.QcAudit.observationF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.observationsF006history;
import com.focusr.Precot.mssql.database.model.QcAudit.potableWaterARF013ReportHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.spectrophotometerReportHistoryClF011;
import com.focusr.Precot.mssql.database.model.QcAudit.temperatureRelativeHistoryF018;
import com.focusr.Precot.mssql.database.model.QcAudit.turbiditycalibrationreportHistoryCLF009;
import com.focusr.Precot.mssql.database.model.QcAudit.validationAutoclaveHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.weighingscalecalibrationreportHistoryCLF007;
import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrLaydownMapping;
import com.focusr.Precot.mssql.database.repository.UserRepository;
import com.focusr.Precot.mssql.database.repository.Qc.DisposalRecordRepo;
import com.focusr.Precot.mssql.database.repository.Qc.MicrobilogyTestRepoF004;
import com.focusr.Precot.mssql.database.repository.Qc.NonWovenF005LinesRepo;
import com.focusr.Precot.mssql.database.repository.Qc.RequistionF029Repo;
import com.focusr.Precot.mssql.database.repository.Qc.absorbentbleachedcottonreportCLF005ParentRepo;
import com.focusr.Precot.mssql.database.repository.Qc.absorbentbleachedcottonreportCLF005Repo;
import com.focusr.Precot.mssql.database.repository.Qc.briquettesanalysisreportARF014Repo;
import com.focusr.Precot.mssql.database.repository.Qc.distillwaterconsumF27Repo;
import com.focusr.Precot.mssql.database.repository.Qc.exfoliatingfabricanalysisreportRepo;
import com.focusr.Precot.mssql.database.repository.Qc.finishedproductanalysisreportF006Repo;
import com.focusr.Precot.mssql.database.repository.Qc.fumigationARF011Repo;
import com.focusr.Precot.mssql.database.repository.Qc.fungalIncubatorReportCLF013Repo;
import com.focusr.Precot.mssql.database.repository.Qc.mediaDisposalCLF022Repo;
import com.focusr.Precot.mssql.database.repository.Qc.mediaDisposalobsF022Repo;
import com.focusr.Precot.mssql.database.repository.Qc.microbiologicalAnalyisisReportF20Repo;
import com.focusr.Precot.mssql.database.repository.Qc.microbiologicalTestRepo;
import com.focusr.Precot.mssql.database.repository.Qc.microbiologyF006Repo;
import com.focusr.Precot.mssql.database.repository.Qc.non_woven_F005Repo;
import com.focusr.Precot.mssql.database.repository.Qc.obervationCLF007Repo;
import com.focusr.Precot.mssql.database.repository.Qc.observationArF011Repo;
import com.focusr.Precot.mssql.database.repository.Qc.observationF006Repo;
import com.focusr.Precot.mssql.database.repository.Qc.observationRepoF004;
import com.focusr.Precot.mssql.database.repository.Qc.potableWaterARF013ReportRepo;
import com.focusr.Precot.mssql.database.repository.Qc.qcObservationsrepo;
import com.focusr.Precot.mssql.database.repository.Qc.qcphysicalTestRepo;
import com.focusr.Precot.mssql.database.repository.Qc.spectrophotometerReportClF011Repo;
import com.focusr.Precot.mssql.database.repository.Qc.temperatureRelativeF018Repo;
import com.focusr.Precot.mssql.database.repository.Qc.turbiditycalibrationreportCLF009Repo;
import com.focusr.Precot.mssql.database.repository.Qc.validationAutoclaveRepo;
import com.focusr.Precot.mssql.database.repository.Qc.weighingscalecalibrationreportCLF007Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.DisposalRecordHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.MicrobilogyTestRepoHistoryF004;
import com.focusr.Precot.mssql.database.repository.Qc.audit.NonWovenF005LinesHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.RequistionHistoryF029Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.absorbentbleachedcottonreportCLF005ParenthistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.absorbentbleachedcottonreportHistoryCLF005Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.briquettesanalysisreportHistoryARF014Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.distillwaterconsumF27HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.exfoliatingfabricanalysisreportHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.finishedproductanalysisreportHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.fumigationARF011HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.fungalIncubatorReportHistoryCLF013Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.mediaDisposalHistoryCLF022Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.microbiologicalAnalyisisReportF20HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.microbiologicalTestRepohistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.microbiologyF006HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.non_woven_F005HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.obervationCLF007HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.observationArF011HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.observationF006HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.observationRepoHistoryF004;
import com.focusr.Precot.mssql.database.repository.Qc.audit.potableWaterARF013ReportHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.qcObservationsrepohistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.qcphysicalTestRepohistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.spectrophotometerReportHistoryClF011Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.temperatureRelativeHistoryF018Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.turbiditycalibrationreportHistoryCLF009Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.validationAutoclaveHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.weighingscalecalibrationreportCLF007HistoryRepo;
import com.focusr.Precot.mssql.database.repository.bleaching.BleachBmrLaydownMappingRepository;
import com.focusr.Precot.mssql.database.repository.bleaching.DepartmentRepository;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.ApproveResponse;
import com.focusr.Precot.payload.MicrobiologicalTestOutput;
import com.focusr.Precot.payload.QAQCObservationOutput;
import com.focusr.Precot.payload.RawCottonIssueResponse;
import com.focusr.Precot.payload.arfo2payload;
import com.focusr.Precot.payload.qc.aboserbentDTO;
import com.focusr.Precot.security.JwtTokenProvider;
import com.focusr.Precot.util.IdAndValuePair;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Qc.AppConstantsQc;
import com.focusr.Precot.util.Qc.QcMailFunction;

/**
 * ARF-F002 
 * ARF-F004 
 * ARF-F005 
 * ARF-F006 
 * ARF-F013 
 * ARF-F011 
 * ARF-F014
 * CL -F007 
 * CL -F005
 * CL -F009
 * CL -F011 
 * CL -F013
 * CL -F014
 * CL -F024
 * CL -F027
 * CL -F018
 * CL -F029
 * CL -F022
 * 
 * @author Gokul.B
 *
 */

@Service
public class qcService8 {

	@Autowired
	qcphysicalTestRepo qcphysicalTestRepo;
	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private SCAUtil scaUtil;

	@Autowired
	qcphysicalTestRepohistory qcphysicalTestRepohistory;

	@Autowired
	qcObservationsrepohistory qcObservationsrepohistory;

	@Autowired
	microbiologicalTestRepohistory microbiologicalTestRepohistory;

	@Autowired
	private non_woven_F005Repo non_woven_F005Repo;
	
	@Autowired
	private NonWovenF005LinesRepo nonWovenF005LinesRepo;

	@Autowired
	private non_woven_F005HistoryRepo non_woven_F005HistoryRepo;
	
	@Autowired
	private NonWovenF005LinesHistoryRepo nonWovenF005LinesHistoryRepo;
	
	@Autowired
	exfoliatingfabricanalysisreportRepo exfoRepo;

	@Autowired
	observationRepoF004 observationRepoF004;

	@Autowired
	MicrobilogyTestRepoF004 microbilogytestrepof004;

	@Autowired
	exfoliatingfabricanalysisreportHistoryRepo exfoHistoryRepo;

	@Autowired
	MicrobilogyTestRepoHistoryF004 microbilogytestrepof004history;

	@Autowired
	observationRepoHistoryF004 observationF004History;

	@Autowired
	fumigationARF011Repo fumigationARF011Repo;

	@Autowired
	observationArF011Repo observationArF011Repo;
	
	

	@Autowired
	fumigationARF011HistoryRepo fumigationARF011HistoryRepo;

	@Autowired
	observationArF011HistoryRepo observationArF011HistoryRepo;

	@Autowired
	private qcObservationsrepo QAqcObservationsrepo;

	@Autowired
	microbiologicalTestRepo microbiologicalTestRepo;

	@Autowired
	private potableWaterARF013ReportRepo potableWaterARF013ReportRepo;

	@Autowired
	private potableWaterARF013ReportHistoryRepo potableWaterARF013ReportHistoryRepo;

	@Autowired
	private finishedproductanalysisreportF006Repo finishedproductanalysisreportF006Repo;

	
	@Autowired
	private finishedproductanalysisreportHistoryRepo finishedproductanalysisreporthistory;

	@Autowired
	private microbiologyF006Repo microbiologyF006Repo;

	@Autowired
	private observationF006Repo observationF006Repo;

	@Autowired
	private microbiologyF006HistoryRepo microbiologyF006HistoryRepo;

	@Autowired
	private observationF006HistoryRepo observationF006HistoryRepo;

	@Autowired
	private weighingscalecalibrationreportCLF007Repo weighingscalecalibrationreportCLF007Repo;

	@Autowired
	private obervationCLF007Repo obervationCLF007Repo;

	@Autowired
	weighingscalecalibrationreportCLF007HistoryRepo weighingscalecalibrationreportHistoryCLF007repo;

	@Autowired
	obervationCLF007HistoryRepo obervationCLF007HistoryRepo;

	@Autowired
	absorbentbleachedcottonreportCLF005ParentRepo absorbentbleachedcottonreportCLF005ParentRepo;

	@Autowired
	absorbentbleachedcottonreportHistoryCLF005Repo absorbentbleachedcottonreportHistoryCLF005Repo;
	
	@Autowired
	absorbentbleachedcottonreportCLF005ParenthistoryRepo abshisRepo;

	@Autowired
	briquettesanalysisreportARF014Repo briquettesanalysisreportARF014Repo;

	@Autowired
	briquettesanalysisreportHistoryARF014Repo briquettesanalysisreportHistoryARF014;
	
	@Autowired
	turbiditycalibrationreportCLF009Repo turbiditycalibrationreportCLF009Repo;
	
	@Autowired
	turbiditycalibrationreportHistoryCLF009Repo turbiditycalibrationreportHistoryCLF009Repo;
	
	@Autowired
	spectrophotometerReportClF011Repo spectrophotometerReportClF011Repo;
	
	@Autowired
	spectrophotometerReportHistoryClF011Repo spectrophotometerReportHistoryClF011Repo;
	
	@Autowired
	fungalIncubatorReportCLF013Repo fungalIncubatorReportCLF013Repo;
	
	@Autowired
	fungalIncubatorReportHistoryCLF013Repo fungalIncubatorReportHistoryCLF013Repo;
	
	@Autowired
	DisposalRecordRepo DisposalRecordRepo;
	
	@Autowired
	DisposalRecordHistoryRepo DisposalRecordHistoryRepo;
	
	
	@Autowired
	validationAutoclaveRepo validationAutoclaveRepo;
	
	@Autowired
	validationAutoclaveHistoryRepo validationAutoclaveHistoryRepo;

	@Autowired
	temperatureRelativeHistoryF018Repo temperatureRelativeHistoryF018Repo;
	
	@Autowired
	temperatureRelativeF018Repo temperatureRelativeF018Repo;
	
	@Autowired
	mediaDisposalCLF022Repo mediaDisposalCLF022Repo;
	@Autowired
	mediaDisposalobsF022Repo mediaDisposalobsF022Repo;

	
	@Autowired
	mediaDisposalHistoryCLF022Repo mediaDisposalHistoryCLF022Repo;
	@Autowired
	distillwaterconsumF27HistoryRepo distillwaterconsumF27HistoryRepo;
	@Autowired
	distillwaterconsumF27Repo      distillwaterconsumF27Repo;
	
	@Autowired
	microbiologicalAnalyisisReportF20Repo microbiologicalAnalyisisReportF20Repo;
	
	@Autowired
	microbiologicalAnalyisisReportF20HistoryRepo microbiologicalAnalyisisReportF20HistoryRepo;
	

	@Autowired
	RequistionF029Repo requistionF029Repo;
	
	@Autowired
	RequistionHistoryF029Repo requistionHistoryF029Repo;
	
	@Autowired
	private BleachBmrLaydownMappingRepository bleachBmrLaydownMappingRepo;
	
	@Autowired
	QcMailFunction qcmailfunction;
	
	
	

	org.jboss.logging.Logger logger = LoggerFactory.logger(qcService8.class);

	String[] IgnoreProps = {
	    "test_id", "micro_id", "obs_id", "qAqcObservations", "microbiologicalTest", "lab_id",
	    "physicalandchemicaltest", "MICROBIOLOGICAL TEST", "QAQC OBSERVATIONS", "observations",
	    "microbilogytestf004", "exfoliatingfabricanalysisreporthistory", "microbilogytestf006",
	    "finishedproductanalysisreportF006", "obser", "weighingscalecalibrationreportCLF007", "createdAt",
	    "updatedAt", "createdBy", "updatedBy", "qc_", "chemist_", "micro_", "fumigationARF011", "CREATED BY",
	    "UPDATED BY", "UPDATED AT", "CREATED AT",

	    // Existing entries from previous code
	    "chemist_status", "chemist_saved_on", "chemist_saved_by", "chemist_saved_id", "chemist_submit_on",
	    "chemist_submit_by", "chemist_submit_id", "chemist_sign", "micro_status", "microbiologist_saved_on",
	    "microbiologist_saved_by", "microbiologist_saved_id", "micro_submit_on", "micro_submit_by",
	    "micro_submit_id", "micro_sign", "qc_status", "qc_submit_on", "qc_submit_by", "qc_submit_id",

	    // New entries from latest code
	    "qa_inspector_status", "qa_inspector_saved_on", "qa_inspector_saved_by", "qa_inspector_saved_id",
	    "qa_inspector_submit_on", "qa_inspector_submit_by", "qa_inspector_submit_id", "qa_inspector_sign",
	    "qa_mng_status", "qa_mng_submit_on", "qa_mng_submit_by", "qa_mng_submit_id", "qa_mng_sign",

	    // Additional new entries
	    "ins_saved_on", "ins_saved_by", "ins_saved_id", "hod_submit_on", "hod_submit_by", "hod_sign", "hod_id",
	    "hod_status", "develop_submit_on", "develop_submit_by", "develop_id", "develop_sign", "develop_status",
	    "qc_status_b", "qc_submit_on_b", "qc_submit_by_b", "qc_sign_b", "qc_submit_id_b", "ins_sign", "ins_status",
	    "ins_submit_on", "ins_submit_by", "ins_submit_id", "potableWaterARF013Report"
	};

	private String getUserRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
//			  mediaDisposalCLF022 mediaDis
			return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).findFirst()
					.orElse(null);
		}
		return null;
	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveChemicalTest(physicalandchemicaltest physical, HttpServletRequest http) {
		physicalandchemicaltest phy = new physicalandchemicaltest();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			List<QAqcObservations> newQAqcObservations = physical.getQaqc();
			List<microbiologicalTestF002> newmicrobiologicalTestF002 = physical.getMicro();
			
			Long id = physical.getTest_id();

			if (id != null) {
				phy = qcphysicalTestRepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			
			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
					
					for (QAqcObservations obs : newQAqcObservations) {

						if (obs.getObs_id() != null) {
							QAqcObservations obe = QAqcObservationsrepo.findById(obs.getObs_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							BeanUtils.copyProperties(obs, obe);
							QAqcObservationsrepo.save(obe);
						} else {
							obs.setTest_id(physical.getTest_id());
							QAqcObservationsrepo.save(obs);
						}
					}
					
					for (microbiologicalTestF002 micro : newmicrobiologicalTestF002) {
						if (micro.getMicro_id() != null) {
							microbiologicalTestF002 obe = microbiologicalTestRepo.findById(micro.getMicro_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							BeanUtils.copyProperties(micro, obe);
							microbiologicalTestRepo.save(obe);
						} else {
							micro.setTest_id(physical.getTest_id());
							microbiologicalTestRepo.save(micro);
						}
					}
					
					BeanUtils.copyProperties(physical, phy, IgnoreProps);
					

					phy.setChemist_saved_on(date);
					phy.setChemist_saved_id(userId);
//					phy.setChemist_sign(userName);
					phy.setChemist_saved_by(userName);
					phy.setPrepared_by(userName);

					phy.setChemist_status(AppConstantsQc.chemistSave);

					qcphysicalTestRepo.save(phy);
					
					physical= phy;

				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					for (microbiologicalTestF002 micro : newmicrobiologicalTestF002) {
						if (micro.getMicro_id() != null) {
							microbiologicalTestF002 obe = microbiologicalTestRepo.findById(micro.getMicro_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							BeanUtils.copyProperties(micro, obe);
							microbiologicalTestRepo.save(obe);
						} else {
							micro.setTest_id(physical.getTest_id());
							microbiologicalTestRepo.save(micro);
						}
					}
					BeanUtils.copyProperties(physical, phy, IgnoreProps);
					phy.setMicrobiologist_saved_on(date);
					phy.setMicrobiologist_saved_id(userId);
//					phy.setMicro_sign(userName);
					phy.setPrepared_by(userName);
					phy.setMicrobiologist_saved_by(userName);
					phy.setMicro_status(AppConstantsQc.microBiologistSave);

					qcphysicalTestRepo.save(phy);

					physical= phy;

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				

				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					physical.setChemist_saved_on(date);
					physical.setChemist_saved_id(userId);
//					physical.setChemist_sign(userName);
					physical.setPrepared_by(userName);

					physical.setChemist_status(AppConstantsQc.chemistSave);

					qcphysicalTestRepo.save(physical);
					for (QAqcObservations obs : physical.getQaqc()) {

						if (obs.getObs_id() != null) {
							QAqcObservations obe = QAqcObservationsrepo.findById(obs.getObs_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							BeanUtils.copyProperties(obs, obe);
							QAqcObservationsrepo.save(obe);
						} else {
							obs.setTest_id(physical.getTest_id());
							QAqcObservationsrepo.save(obs);
						}
					}

					for (microbiologicalTestF002 micro : newmicrobiologicalTestF002) {
						if (micro.getMicro_id() != null) {
							microbiologicalTestF002 obe = microbiologicalTestRepo.findById(micro.getMicro_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							BeanUtils.copyProperties(micro, obe);
							microbiologicalTestRepo.save(obe);
						} else {
							micro.setTest_id(physical.getTest_id());
							microbiologicalTestRepo.save(micro);
						}
					}
					
				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					

					physical.setMicrobiologist_saved_on(date);
					physical.setMicrobiologist_saved_id(userId);
//					physical.setMicro_sign(userName);
					physical.setPrepared_by(userName);
					physical.setMicro_status(AppConstantsQc.microBiologistSave);

					qcphysicalTestRepo.save(physical);

					for (microbiologicalTestF002 micro : physical.getMicro()) {
						if (micro.getMicro_id() != null) {
							microbiologicalTestF002 obe = microbiologicalTestRepo.findById(micro.getMicro_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							BeanUtils.copyProperties(micro, obe);
							microbiologicalTestRepo.save(obe);
						} else {
							micro.setTest_id(physical.getTest_id());
							microbiologicalTestRepo.save(micro);
						}
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
				
				
				
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(physical, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTest( physicalandchemicaltest physical, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		
		physicalandchemicaltest physicalobject = new physicalandchemicaltest();
		List<microbiologicalTestF002> microlist = physical.getMicro();
		List<QAqcObservations> qaqclist = physical.getQaqc();
		
				try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = physical.getTest_id();

			if (id != null) {
				physicalobject = qcphysicalTestRepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

//			physical.setCreatedAt(physicalobject.getCreatedAt());
			physical.setPrepared_by(physicalobject.getPrepared_by());
		
//			modelMapper.map(physical, physicalobject);

					

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
					BeanUtils.copyProperties(physical, physicalobject, IgnoreProps);
					
//					if((physical.getMicro_status()!=null || !physical.getMicro_status().isEmpty()||physical.getMicro_status().equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))) {
//						physicalobject.setQc_status(AppConstantsQc.waitingStatus);
//					}
						

					physicalobject.setChemist_submit_on(date);
					physicalobject.setChemist_submit_id(userId);
					physicalobject.setChemist_submit_by(userName);
					physicalobject.setChemist_sign(userName);
					physicalobject.setReason(null);	
					physicalobject.setMicro(null);
					physicalobject.setQaqc(null);
					physicalobject.setQc_status(AppConstantsQc.waitingStatus);
					physicalobject.setChemist_status(AppConstantsQc.chemistSubmitted);

					qcphysicalTestRepo.save(physicalobject);
					PHYSICALANDCHEMICALTESTHistory physicalandchemicaltestHistory = new PHYSICALANDCHEMICALTESTHistory();
					
					if( qcphysicalTestRepohistory.fetchLastSubmittedRecordPhNumber(physicalobject.getSub_batch_no())!=null) {
						physicalandchemicaltestHistory =  qcphysicalTestRepohistory.fetchLastSubmittedRecordPhNumber(physicalobject.getSub_batch_no());
					};
					BeanUtils.copyProperties(physicalobject, physicalandchemicaltestHistory , "test_id");
//					physicalandchemicaltestHistory.setTest_id(null);
					physicalandchemicaltestHistory.setQAqcObservations(null);
					physicalandchemicaltestHistory.setMicrobiologicalTest(null);
					int version = qcphysicalTestRepohistory.getMaximumVersion(physical.getSub_batch_no())
							.map(temp -> temp + 1).orElse(1);
					physicalandchemicaltestHistory.setVersion(version);
					
					qcphysicalTestRepohistory.save(physicalandchemicaltestHistory);
					
					for (QAqcObservations obs : qaqclist) {
						if (obs.getObs_id() != null) {
							   QAqcObservations obe = QAqcObservationsrepo.findById(obs.getObs_id())
						                .orElseThrow(() -> new EntityNotFoundException("Test not found"));

						        // Create a history entry before updating the original entity
						        QAqcObservationsHistory obehistory = new QAqcObservationsHistory();
						        BeanUtils.copyProperties(obs, obehistory , "obs_id");  // Copy existing entity's properties to history

						        // Update the existing entity with the new values from 'obs'
						        BeanUtils.copyProperties(obs, obe);
						        obehistory.setTest_id(physicalandchemicaltestHistory.getTest_id());	
						        QAqcObservationsrepo.save(obs);  // Save the updated existing entity

						        // Save the history entry
						        
						        obehistory.setObs_id(null);
						        qcObservationsrepohistory.save(obehistory);
						} else {
							obs.setTest_id(physical.getTest_id());
							QAqcObservationsHistory obehistory = new QAqcObservationsHistory();
							BeanUtils.copyProperties(obs, obehistory , "obs_id");
								
							obehistory.setTest_id(physicalandchemicaltestHistory.getTest_id());
							qcObservationsrepohistory.save(obehistory);
							QAqcObservationsrepo.save(obs);

						}
					}

					for (microbiologicalTestF002 micro :microlist){
						if (micro.getMicro_id() != null) {
							microbiologicalTestF002 obe = microbiologicalTestRepo.findById(micro.getMicro_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							microbiologicalTestHistoryF002 microHistory = new microbiologicalTestHistoryF002();
							BeanUtils.copyProperties(micro, obe);
							BeanUtils.copyProperties(micro, microHistory , "micro_id");
							microbiologicalTestRepo.save(obe);
							microHistory.setTest_id(physicalandchemicaltestHistory.getTest_id());	
							microHistory.setMicro_id(null);
							microbiologicalTestRepohistory.save(microHistory);
						} else {
							micro.setTest_id(physical.getTest_id());
							microbiologicalTestHistoryF002 microHistory = new microbiologicalTestHistoryF002();
							BeanUtils.copyProperties(micro, microHistory , "micro_id");
							microHistory.setTest_id(physicalandchemicaltestHistory.getTest_id());
							microbiologicalTestRepohistory.save(microHistory);
							microbiologicalTestRepo.save(micro);
						}
					}
					
					

				  physical =  physicalobject;



				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
					
					BeanUtils.copyProperties(physical, physicalobject, IgnoreProps);
//
//					if((physical.getChemist_status()!=null || !physical.getChemist_status().isEmpty()||physical.getChemist_status().equalsIgnoreCase(AppConstantsQc.chemistSubmitted))) {
//						physicalobject.setQc_status(AppConstantsQc.waitingStatus);
//					}
					

					physicalobject.setMicro_submit_on(date);
					physicalobject.setMicro_submit_id(userId);
					physicalobject.setMicro_sign(userName);
					physicalobject.setMicro_submit_by(userName);;
					physicalobject.setReason(null);	
					physicalobject.setQc_status(AppConstantsQc.waitingStatus);
					physicalobject.setMicro_status(AppConstantsQc.microBiologistSubmitted);
					physicalobject.setMicro(null);
					physicalobject.setQaqc(null);
					qcphysicalTestRepo.save(physicalobject);
				PHYSICALANDCHEMICALTESTHistory physicalandchemicaltestHistory = new PHYSICALANDCHEMICALTESTHistory();
					
				if( qcphysicalTestRepohistory.fetchLastSubmittedRecordPhNumber(physicalobject.getSub_batch_no())!=null) {
					physicalandchemicaltestHistory =  qcphysicalTestRepohistory.fetchLastSubmittedRecordPhNumber(physicalobject.getSub_batch_no());
				};
					BeanUtils.copyProperties(physicalobject, physicalandchemicaltestHistory , "test_id");
					int version = qcphysicalTestRepohistory.getMaximumVersion(physical.getSub_batch_no())
							.map(temp -> temp + 1).orElse(1);
					physicalandchemicaltestHistory.setVersion(version);
					
					qcphysicalTestRepohistory.save(physicalandchemicaltestHistory);
					
					for (QAqcObservations obs : physical.getQaqc()) {
						if (obs.getObs_id() != null) {
							   QAqcObservations obe = QAqcObservationsrepo.findById(obs.getObs_id())
						                .orElseThrow(() -> new EntityNotFoundException("Test not found"));

						        // Create a history entry before updating the original entity
						        QAqcObservationsHistory obehistory = new QAqcObservationsHistory();
						        BeanUtils.copyProperties(obs, obehistory , "obs_id");  // Copy existing entity's properties to history

						        // Update the existing entity with the new values from 'obs'
						        BeanUtils.copyProperties(obs, obe);
						        QAqcObservationsrepo.save(obs);  // Save the updated existing entity

						        // Save the history entry
						        obehistory.setTest_id(physicalandchemicaltestHistory.getTest_id());						        
						        obehistory.setObs_id(null);
						        qcObservationsrepohistory.save(obehistory);
						} else {
							obs.setTest_id(physical.getTest_id());
							QAqcObservationsHistory obehistory = new QAqcObservationsHistory();
							BeanUtils.copyProperties(obs, obehistory , "obs_id");
								
							obehistory.setTest_id(physicalandchemicaltestHistory.getTest_id());
							qcObservationsrepohistory.save(obehistory);
							QAqcObservationsrepo.save(obs);

						}
					}

					for (microbiologicalTestF002 micro : physical.getMicro()) {
						if (micro.getMicro_id() != null) {
							microbiologicalTestF002 obe = microbiologicalTestRepo.findById(micro.getMicro_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							microbiologicalTestHistoryF002 microHistory = new microbiologicalTestHistoryF002();
//							BeanUtils.copyProperties(micro, obe);
							BeanUtils.copyProperties(micro, microHistory , "micro_id");
							microbiologicalTestRepo.save(micro);
							microHistory.setTest_id(physicalandchemicaltestHistory.getTest_id());	
							microHistory.setMicro_id(null);;
							microbiologicalTestRepohistory.save(microHistory);
						} else {
							microbiologicalTestHistoryF002 microHistory = new microbiologicalTestHistoryF002();
							BeanUtils.copyProperties(micro, microHistory , "micro_id");
							microHistory.setTest_id(physicalandchemicaltestHistory.getTest_id());
							microbiologicalTestRepohistory.save(microHistory);
							microbiologicalTestRepo.save(micro);
						}
					}
					
					
					  physical =  physicalobject;

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
//
//					if( (physical.getMicro_status()!=null || !physical.getMicro_status().isEmpty() || physical.getMicro_status().equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))) {
//						physicalobject.setQc_status(AppConstantsQc.waitingStatus);
//					}

					physical.setChemist_submit_on(date);
					physical.setChemist_submit_id(userId);
					physical.setChemist_sign(userName);
					physical.setChemist_submit_by(userName);
					physical.setReason(null);	
					physical.setQc_status(AppConstantsQc.waitingStatus);
					physical.setChemist_status(AppConstantsQc.chemistSubmitted);

					qcphysicalTestRepo.save(physical);
				PHYSICALANDCHEMICALTESTHistory physicalandchemicaltestHistory = new PHYSICALANDCHEMICALTESTHistory();
					
				PHYSICALANDCHEMICALTESTHistory result = qcphysicalTestRepohistory.fetchLastSubmittedRecordPhNumber(physical.getSub_batch_no());
				try {	
					if (result != null && result.getTest_id() != null) { // Check any primary field or version
				    physicalandchemicaltestHistory = result;
				}
					}catch(Exception e ) {}


					BeanUtils.copyProperties(physical, physicalandchemicaltestHistory , "test_id");
					BeanUtils.copyProperties(physical, physicalandchemicaltestHistory , "test_id");
					physicalandchemicaltestHistory.setQAqcObservations(null);
					physicalandchemicaltestHistory.setMicrobiologicalTest(null);
					int version = qcphysicalTestRepohistory.getMaximumVersion(physical.getSub_batch_no())
							.map(temp -> temp + 1).orElse(1);
					
					physicalandchemicaltestHistory.setVersion(version);
					qcphysicalTestRepohistory.save(physicalandchemicaltestHistory);

					for (QAqcObservations obs : qaqclist) {
						if (obs.getObs_id() != null) {
							QAqcObservations obe = QAqcObservationsrepo.findById(obs.getObs_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							QAqcObservationsHistory obehistory = new QAqcObservationsHistory();
							BeanUtils.copyProperties(obs, obehistory , "obs_id");
							BeanUtils.copyProperties(obs, obe);
							QAqcObservationsrepo.save(obe);
							obehistory.setTest_id(physicalandchemicaltestHistory.getTest_id());
							qcObservationsrepohistory.save(obehistory);
						} else {
							obs.setTest_id(physical.getTest_id());
							QAqcObservationsrepo.save(obs);

						}
					}

					for (microbiologicalTestF002 micro : microlist) {
						if (micro.getMicro_id() != null) {
							microbiologicalTestF002 obe = microbiologicalTestRepo.findById(micro.getMicro_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							microbiologicalTestHistoryF002 microHistory = new microbiologicalTestHistoryF002();
							BeanUtils.copyProperties(micro, obe);
							BeanUtils.copyProperties(micro, microHistory , "micro_id");
							microbiologicalTestRepo.save(obe);
							microHistory.setTest_id(physicalandchemicaltestHistory.getTest_id());
							microbiologicalTestRepohistory.save(microHistory);
						} else {
							micro.setTest_id(physical.getTest_id());
							microbiologicalTestRepo.save(micro);
						}
					}

					
				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

//					if((physical.getChemist_status()!=null || !physical.getChemist_status().isEmpty()||physical.getChemist_status().equalsIgnoreCase(AppConstantsQc.chemistSubmitted))) {
//						physicalobject.setQc_status(AppConstantsQc.waitingStatus);
//					}

					physical.setMicro_submit_on(date);
					physical.setMicro_submit_id(userId);
					physical.setMicro_sign(userName);
					physical.setMicro_submit_by(userName);
					physical.setReason(null);	
					physical.setQc_status(AppConstantsQc.waitingStatus);
					physical.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					qcphysicalTestRepo.save(physical);
				PHYSICALANDCHEMICALTESTHistory physicalandchemicaltestHistory = new PHYSICALANDCHEMICALTESTHistory();
					
				
				PHYSICALANDCHEMICALTESTHistory result = qcphysicalTestRepohistory.fetchLastSubmittedRecordPhNumber(physical.getSub_batch_no());
				try {	
					if (result != null && result.getTest_id() != null) { // Check any primary field or version
				    physicalandchemicaltestHistory = result;
				}
					}catch(Exception e ) {}


					BeanUtils.copyProperties(physical, physicalandchemicaltestHistory , "test_id");
					
					int version = qcphysicalTestRepohistory.getMaximumVersion(physical.getSub_batch_no())
							.map(temp -> temp + 1).orElse(1);
					
					
					physicalandchemicaltestHistory.setVersion(version);
					qcphysicalTestRepohistory.save(physicalandchemicaltestHistory);

					for (QAqcObservations obs : physical.getQaqc()) {
						if (obs.getObs_id() != null) {
							QAqcObservations obe = QAqcObservationsrepo.findById(obs.getObs_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							QAqcObservationsHistory obehistory = new QAqcObservationsHistory();
							BeanUtils.copyProperties(obs, obehistory , "obs_id");
							BeanUtils.copyProperties(obs, obe);
							QAqcObservationsrepo.save(obe);
							obehistory.setTest_id(physicalandchemicaltestHistory.getTest_id());
							qcObservationsrepohistory.save(obehistory);
						} else {
							obs.setTest_id(physical.getTest_id());
							QAqcObservationsrepo.save(obs);

						}
					}

					for (microbiologicalTestF002 micro : physical.getMicro()) {
						if (micro.getMicro_id() != null) {
							microbiologicalTestF002 obe = microbiologicalTestRepo.findById(micro.getMicro_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							microbiologicalTestHistoryF002 microHistory = new microbiologicalTestHistoryF002();
							BeanUtils.copyProperties(micro, obe);
							BeanUtils.copyProperties(micro, microHistory , "micro_id");
							microbiologicalTestRepo.save(obe);
							microHistory.setTest_id(physicalandchemicaltestHistory.getTest_id());
							microbiologicalTestRepohistory.save(microHistory);
						} else {
							micro.setTest_id(physical.getTest_id());
							microbiologicalTestRepo.save(micro);
						}
					}

				}
				
				

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
				
				try {

					qcmailfunction.sendEmailToARF002(physical);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}
			
				
				
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(physical, HttpStatus.OK);

	}

	
	public ResponseEntity<?> getTestByBatchId(@Valid String id) {
		
		
		List<physicalandchemicaltest> physicalandchemicaltest = new ArrayList<>();
		
		physicalandchemicaltest=qcphysicalTestRepo.findByBatch(id)!=null ?qcphysicalTestRepo.findByBatch(id):physicalandchemicaltest;
		List<arfo2payload> arfo2payload = new ArrayList<>();
		
		if(!physicalandchemicaltest.isEmpty()){
			for(physicalandchemicaltest js : physicalandchemicaltest) {
				arfo2payload arfo2 = new arfo2payload();
				fromDto(js ,arfo2 );
				arfo2payload.add(arfo2)		;
				}
		}
		
		try {
			return new ResponseEntity(arfo2payload, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	

public ResponseEntity<?> getTestByBatchIdPDE(@Valid String id) {
	List<aboserbentDTO> aboserbentDTO = new ArrayList<>();
		
	List<physicalandchemicaltest> physicalandchemicaltest = new ArrayList<>();
	
	
    List<BleachBmrLaydownMapping> mappings = bleachBmrLaydownMappingRepo.getLaydownNo(id);
    
    if (mappings.isEmpty()) {
    	return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." ),
				HttpStatus.BAD_REQUEST);
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

    
	
    for (String batchNo : batchNos) {
	physicalandchemicaltest=qcphysicalTestRepo.findByBatch(id)!=null ?qcphysicalTestRepo.findByBatch(batchNo):physicalandchemicaltest;
		
		
		if(!physicalandchemicaltest.isEmpty()){
			for(physicalandchemicaltest phy : physicalandchemicaltest) {
				if(!phy.getQaqc().isEmpty()){
					for(QAqcObservations js : phy.getQaqc()) {
						aboserbentDTO absDTO = new aboserbentDTO();
						aboserbentDTOfrom(js ,absDTO );
						aboserbentDTO.add(absDTO)		;
						}
				}
				
				if (!phy.getMicro().isEmpty())	{
					for(microbiologicalTestF002 micro :phy.getMicro() ) {
						
						aboserbentDTOfrom(micro,aboserbentDTO);
					}
					}
				aboserbentDTOfrom(phy,aboserbentDTO);
				
				}
			}
		
}
		
		try {
			return new ResponseEntity(aboserbentDTO, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

public ResponseEntity<?> getTestByBatchIdPDE2(@Valid String id) {
	
	List<aboserbentDTO> aboserbentDTO = new ArrayList<>();

	List<physicalandchemicaltest> physicalandchemicaltest = new ArrayList<>();	
	
	List<String> batchNos = qcphysicalTestRepo.getByBatchBmr(id);
	

	for (String batchNo : batchNos) {
		physicalandchemicaltest = qcphysicalTestRepo.findByBatch(id) != null
				? qcphysicalTestRepo.findByBatch(batchNo)
				: physicalandchemicaltest;

		if (!physicalandchemicaltest.isEmpty()) {
			for (physicalandchemicaltest phy : physicalandchemicaltest) {
				if (!phy.getQaqc().isEmpty()) {
					for (QAqcObservations js : phy.getQaqc()) {
						aboserbentDTO absDTO = new aboserbentDTO();
						aboserbentDTOfrom(js, absDTO);
						aboserbentDTO.add(absDTO);
					}
				}

				if (!phy.getMicro().isEmpty()) {
					for (microbiologicalTestF002 micro : phy.getMicro()) {

						aboserbentDTOfrom(micro, aboserbentDTO);
					}
				}
				aboserbentDTOfrom(phy, aboserbentDTO);

			}
		}

	}

	try {
		return new ResponseEntity(aboserbentDTO, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

}

	private void aboserbentDTOfrom(microbiologicalTestF002 micro, List<aboserbentDTO> aboserbentDTO) {
		
		for(aboserbentDTO js : aboserbentDTO) {
			js.setTotalfungalCount(micro.getTf_count());
			js.setTotalViableCount(micro.getTf_viable_count());	
		}
		
			
		

	
}
	private void aboserbentDTOfrom(physicalandchemicaltest js, List<aboserbentDTO> absDTO) {
		for(aboserbentDTO je : absDTO) {
		je.setSpecification(js.getTested_Date());
		je.setSubBatchNo(js.getSub_batch_no());
		
		}
	}

	private void aboserbentDTOfrom(QAqcObservations js, aboserbentDTO absDTO) {
	
		    // Mapping fields that are present in both QAqcObservations and aboserbentDTO

		absDTO.setPhysicalApp(js.getDescriptionObr());
		
		absDTO.setAcidObsph(js.getAcid_obs());	
		absDTO.setAcidRmk(js.getAcid_rmk());  // acid_obs -> acidObs in DTO
		    absDTO.setSurfaceObs(js.getSurface_obs());  // surface_obs -> surfaceObs in DTO
		    absDTO.setFibreObs(js.getFibre_obs());  // fibre_obs -> fibreObs in DTO
		    absDTO.setForeignObs(js.getForeign_obs());
		    absDTO.setSinking_time(js.getAbs_avg());
		    absDTO.setAbsorbency(js.getAbs_avg_2());  // abs_avg_2 -> absorbency in DTO
		    absDTO.setSulphatedResObr(js.getSulphatedResObr());  // sulphatedResObr -> sulphatedResObr in DTO
		    absDTO.setWatersolubleResObr(js.getWatersolubleResObr());  // watersolubleResObr -> watersolubleResObr in DTO
		    absDTO.setEthersolubleResObr(js.getEthersolubleResObr());  // ethersolubleResObr -> ethersolubleResObr in DTO
		    absDTO.setNepsCountRmk(js.getNeps_count_obs());  // neps_count_rmk -> nepsCountRmk in DTO
		    absDTO.setUQLWRmk(js.getUQL_w_obs());  // uQL_w_rmk -> uQLWRmk in DTO
		    absDTO.setLnRmk(js.getLn_obs());  // ln_rmk -> lnRmk in DTO
		    absDTO.setLwRmk(js.getLw_obs());  // lw_rmk -> lwRmk in DTO
		    absDTO.setSFCNObs(js.getSFC_n_obs());  // sFC_n_obs -> sFCNObs in DTO
		    absDTO.setSFCWObs(js.getSFC_w_obs());  // sFC_w_obs -> sFCWObs in DTO
		    absDTO.setMicronaireObs(js.getMicronaire_obs());  // micronaire_obs -> micronaireObs in DTO
		    absDTO.setWhitenessObs(js.getWhiteness_obs());  // whiteness_obs -> whitenessObs in DTO
		    absDTO.setRemark(js.getRemark());
		    absDTO.setFluronce(js.getFluorescence_obs());
		    absDTO.setExtractable(js.getExtractable_obs());
		    absDTO.setDryingloss(js.getLossondryingResObr()); 
		    absDTO.setAcceptedProduct(js.getProduct());
		    }

	public ResponseEntity<?> print(@Valid String id) {
		List<physicalandchemicaltest> physicalandchemicaltest = qcphysicalTestRepo.print(id);
		List<arfo2payload> arfo2payload = new ArrayList<>();
		for(physicalandchemicaltest js : physicalandchemicaltest) {
			arfo2payload arfo2 = new arfo2payload();
			fromDto(js ,arfo2 );
			arfo2payload.add(arfo2)		;
			}
		
		try {
			return new ResponseEntity(arfo2payload, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	public ResponseEntity<?> getByBmrF002(@Valid String bmr) {
		List<physicalandchemicaltest> physicalandchemicaltest = qcphysicalTestRepo.getByBmr(bmr);
		List<arfo2payload> arfo2payload = new ArrayList<>();
		for(physicalandchemicaltest js : physicalandchemicaltest) {
			arfo2payload arfo2 = new arfo2payload();
			fromDto(js ,arfo2 );
			arfo2payload.add(arfo2)		;
			}
		
		try {
			return new ResponseEntity(arfo2payload, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestById(@Valid Long id) {
		
		physicalandchemicaltest physicalandchemicaltest = qcphysicalTestRepo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(physicalandchemicaltest, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestF002() {
		List<physicalandchemicaltest> physicalandchemicaltest = qcphysicalTestRepo.getAll();
		try {
			return new ResponseEntity(physicalandchemicaltest, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getAllListtF002(HttpServletRequest http) {
		
		List<physicalandchemicaltest> details = new ArrayList<>();
				
				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

				if (userRole.equals("ROLE_CHEMIST")) {

					details = qcphysicalTestRepo.chemistSummary();
				}

				else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
						|| userRole.equalsIgnoreCase("QA_MANAGER")) {
					details = qcphysicalTestRepo.exeManagerSummary();
				} 
				
				else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

					details = qcphysicalTestRepo.microSummary();
				}
							
		
		List<arfo2payload> arfo2payload = new ArrayList<>();
		for(physicalandchemicaltest js : details) {
			arfo2payload arfo2 = new arfo2payload();
			fromDto(js ,arfo2 );
			arfo2payload.add(arfo2)		;
			}
		
		try {
			return new ResponseEntity(arfo2payload, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	public ResponseEntity<?> approveListtF002() {
		List<physicalandchemicaltest> physicalandchemicaltest = qcphysicalTestRepo.getAll();
		List<arfo2payload> arfo2payload = new ArrayList<>();
		for(physicalandchemicaltest js : physicalandchemicaltest) {
			arfo2payload arfo2 = new arfo2payload();
			fromDto(js ,arfo2 );
			arfo2payload.add(arfo2)		;
			}
		
		try {
			return new ResponseEntity(arfo2payload, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> approveChemicalTestF02(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		physicalandchemicaltest physicalTest = new physicalandchemicaltest();
		
		

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			physicalTest = qcphysicalTestRepo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			PHYSICALANDCHEMICALTESTHistory physicalandchemicaltestHistory = new PHYSICALANDCHEMICALTESTHistory();

			String supervisiorStatus = physicalTest.getChemist_status() != null ? physicalTest.getChemist_status()
					: physicalTest.getMicro_status();

			String hodStatus = physicalTest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						physicalTest.setQc_status(AppConstantsQc.QCApprove);
						physicalTest.setQc_submit_on(date);
						physicalTest.setQc_submit_by(userName);
						physicalTest.setQc_submit_id(userId);		
						physicalTest.setQc_sign(userName);

						qcphysicalTestRepo.save(physicalTest);

						physicalandchemicaltestHistory = qcphysicalTestRepohistory
								.fetchLastSubmittedRecordPhNumber(physicalTest.getSub_batch_no());

						physicalandchemicaltestHistory.setQc_status(AppConstantsQc.QCApprove);
						physicalandchemicaltestHistory.setQc_submit_on(date);
						physicalandchemicaltestHistory.setQc_submit_by(userName);
						physicalTest.setQc_submit_id(userId);
						physicalandchemicaltestHistory.setQc_submit_id(userId);
						physicalandchemicaltestHistory.setQc_sign(userName);
						physicalandchemicaltestHistory.setChemist_status(physicalTest.getChemist_status());
						physicalandchemicaltestHistory.setMicro_status(physicalTest.getMicro_status());
						physicalandchemicaltestHistory.setChemist_submit_id(physicalTest.getChemist_submit_id());
						physicalandchemicaltestHistory.setMicro_submit_id(physicalTest.getMicro_submit_id());
								qcphysicalTestRepohistory.save(physicalandchemicaltestHistory);

//						try {
//
//							if (physicalTest.getQc_status() != null) {
//
//								if (physicalTest.getQc_status().equals("QC_APPROVED"))
//
//								{
//									qcmailfunction.sendEmailToManagerARF02(physicalTest);
//								}
//
//							}
//
//						} catch (Exception ex) {
//							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
//									HttpStatus.OK);
//						}
						
						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
						


					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						physicalTest.setReason(reason);
						physicalTest.setQc_status(AppConstantsQc.QCRejected);
						physicalTest.setQc_submit_on(date);
						physicalTest.setQc_submit_by(userName);
						physicalTest.setQc_submit_id(userId);
						physicalTest.setQc_sign(userName);

						qcphysicalTestRepo.save(physicalTest);

						physicalandchemicaltestHistory = qcphysicalTestRepohistory
								.fetchLastSubmittedRecordPhNumber(physicalTest.getSub_batch_no());

						physicalandchemicaltestHistory.setQc_status(AppConstantsQc.QCRejected);
						physicalandchemicaltestHistory.setReason(reason);
						physicalandchemicaltestHistory.setQc_submit_on(date);
						physicalandchemicaltestHistory.setQc_submit_by(userName);
						physicalandchemicaltestHistory.setQc_submit_id(userId);
						physicalandchemicaltestHistory.setQc_sign(userName);
						physicalandchemicaltestHistory.setChemist_status(physicalTest.getChemist_status());
						physicalandchemicaltestHistory.setMicro_status(physicalTest.getMicro_status());
						physicalandchemicaltestHistory.setChemist_submit_id(physicalTest.getChemist_submit_id());
						physicalandchemicaltestHistory.setMicro_submit_id(physicalTest.getMicro_submit_id());
						qcphysicalTestRepohistory.save(physicalandchemicaltestHistory);


						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else if (userRole.equalsIgnoreCase("QA_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						physicalTest.setQc_status(AppConstantsQc.QAApprove);
						physicalTest.setQc_submit_on(date);
						physicalTest.setQc_submit_by(userName);
						physicalTest.setQc_submit_id(userId);
						physicalTest.setQc_sign(userName);

						qcphysicalTestRepo.save(physicalTest);

						physicalandchemicaltestHistory = qcphysicalTestRepohistory
								.fetchLastSubmittedRecordPhNumber(physicalTest.getSub_batch_no());

						physicalandchemicaltestHistory.setQc_status(AppConstantsQc.QAApprove);
						physicalandchemicaltestHistory.setQc_submit_on(date);
						physicalandchemicaltestHistory.setQc_submit_by(userName);
						physicalandchemicaltestHistory.setQc_submit_id(userId);
						physicalandchemicaltestHistory.setQc_sign(userName);
						physicalandchemicaltestHistory.setChemist_status(physicalTest.getChemist_status());
						physicalandchemicaltestHistory.setMicro_status(physicalTest.getMicro_status());
						physicalandchemicaltestHistory.setChemist_submit_id(physicalTest.getChemist_submit_id());
						physicalandchemicaltestHistory.setMicro_submit_id(physicalTest.getMicro_submit_id());

						qcphysicalTestRepohistory.save(physicalandchemicaltestHistory);


						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						physicalTest.setReason(reason);
						physicalTest.setQc_status(AppConstantsQc.QAReject);
						physicalTest.setQc_submit_on(date);
						physicalTest.setQc_submit_id(userId);
						physicalTest.setQc_submit_by(userName);

						physicalTest.setQc_sign(userName);

						qcphysicalTestRepo.save(physicalTest);

						physicalandchemicaltestHistory = qcphysicalTestRepohistory
								.fetchLastSubmittedRecordPhNumber(physicalTest.getSub_batch_no());

						physicalandchemicaltestHistory.setQc_status(AppConstantsQc.QAReject);
						physicalandchemicaltestHistory.setReason(reason);
						physicalandchemicaltestHistory.setQc_submit_on(date);
						physicalandchemicaltestHistory.setQc_submit_by(userName);
						physicalandchemicaltestHistory.setQc_submit_id(userId);				
						physicalandchemicaltestHistory.setQc_sign(userName);
						physicalandchemicaltestHistory.setChemist_status(physicalTest.getChemist_status());
						physicalandchemicaltestHistory.setMicro_status(physicalTest.getMicro_status());
						physicalandchemicaltestHistory.setChemist_submit_id(physicalTest.getChemist_submit_id());
						physicalandchemicaltestHistory.setMicro_submit_id(physicalTest.getMicro_submit_id());

						qcphysicalTestRepohistory.save(physicalandchemicaltestHistory);

//						try {
//
//							if (physicalTest.getQc_status() != null) {
//
//								if (physicalTest.getQc_status().equals("QC_APPROVED"))
//
//								{
//									qcmailfunction.sendEmailToManagerARF02(physicalTest);
//								}
//
//							}
//
//						} catch (Exception ex) {
//							return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail! "),
//									HttpStatus.OK);
//						}
						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}


	
public ResponseEntity<?> pdeData(@Valid String batchNo) {
	String value  = batchNo;
	List<Map<String, Object>> responseList = new ArrayList<>();
		batchNo = batchNo.substring(0, batchNo.length()-2);
		System.out.println("batchNo: "+batchNo);
		
		Long id = Long.parseLong(batchNo);
				try {
		if(batchNo!=null) {
			List<Object[]> orderResponse=qcphysicalTestRepo.getPde(id);
		
		for (Object[] record : orderResponse) {
            Map<String, Object> map = new HashMap<>();
            map.put("bmr_no", record[0]);
            map.put("finishing", record[1]);
            map.put("mixing", record[2]);
            map.put("batchNo", value);            
          
            responseList.add(map);
        }
	}
		return new ResponseEntity(responseList, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to get PDE Data" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}
	
		
	}

// -----------------------------------------------------------------------------------------------------------------   F005    -----------	

@Transactional(rollbackFor = Exception.class)
public ResponseEntity<?> saveNonWoven(non_woven_F005 nonwoven, HttpServletRequest http) {
	non_woven_F005 nwn = new non_woven_F005();
	SCAUtil sca = new SCAUtil();
	try {

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		Long id = nonwoven.getTest_id();

		String[] ignoreProps = { "test_id", "createdBy", "createdAt", "qa_inspector_status",
				"qa_inspector_saved_on", "qa_inspector_saved_by", "qa_inspector_saved_id", "qa_manager_status",
				"qa_manager_saved_on", "qa_manager_saved_by", "qa_manager_saved_id", "qa_inspector_sign",
				" qa_mng_status", "qa_mng_submit_on", "qa_mng_submit_by", "qa_mng_submit_id", "qa_mng_sign",
				"line1" };

		if (id != null) {
			nwn = non_woven_F005Repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Test not found"));

		}

		BeanUtils.copyProperties(nonwoven, nwn, ignoreProps);

		if (id != null) {
			if (userRole.equalsIgnoreCase("ROLE_QA")) {

				nwn.setQa_inspector_saved_on(date);
				nwn.setQa_inspector_saved_id(userId);
				nwn.setQa_inspector_saved_by(userName);
				nwn.setQa_inspector_sign(userName);
				nwn.setQa_inspector_status(AppConstantsQc.QainspecterSAVED);
				non_woven_F005Repo.save(nwn);

				List<NonWovenF005Lines> line1 = nonwoven.getLine1();

				for (NonWovenF005Lines line : line1) {

					line.setTest_id(nonwoven.getTest_id());

					nonWovenF005LinesRepo.save(line);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
						HttpStatus.BAD_REQUEST);
			}
		}

		else {
			if (userRole.equalsIgnoreCase("ROLE_QA")) {

				nonwoven.setQa_inspector_saved_on(date);
				nonwoven.setQa_inspector_saved_id(userId);
				nonwoven.setQa_inspector_saved_by(userName);
				nonwoven.setQa_inspector_sign(userName);
				nonwoven.setQa_inspector_status(AppConstantsQc.QainspecterSAVED);

				non_woven_F005Repo.save(nonwoven);

				List<NonWovenF005Lines> line1 = nonwoven.getLine1();

				for (NonWovenF005Lines line : line1) {

					line.setTest_id(nwn.getTest_id());

					nonWovenF005LinesRepo.save(line);
				}

			}
		}

	} catch (Exception ex) {

		String msg = ex.getMessage();
		logger.error("Unable to Save Non Woven" + msg);

		return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(nonwoven, HttpStatus.OK);

}

@Transactional(rollbackFor = Exception.class)
public ResponseEntity<?> submitNonwoven(@Valid non_woven_F005 nonwoven, HttpServletRequest http) {
	SCAUtil sca = new SCAUtil();
	non_woven_F005 nwn = new non_woven_F005();
	try {

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		Long id = nonwoven.getTest_id();

		if (id != null) {
			nwn = non_woven_F005Repo.findById(id).orElseThrow(() -> new EntityNotFoundException("Test not found"));
		}

		String[] ignoreProps = { "test_id", "createdBy", "createdAt", "qa_inspector_status",
				"qa_inspector_saved_on", "qa_inspector_saved_by", "qa_inspector_saved_id", "qa_manager_status",
				"qa_manager_saved_on", "qa_manager_saved_by", "qa_manager_saved_id", "qa_inspector_sign",
				" qa_mng_status", "qa_mng_submit_on", "qa_mng_submit_by", "qa_mng_submit_id", "qa_mng_sign",
				"line1" };

		BeanUtils.copyProperties(nonwoven, nwn, ignoreProps);

		if (id != null) {
			if (userRole.equalsIgnoreCase("ROLE_QA")) {

				nwn.setQa_mng_status(AppConstantsQc.waitingStatus);
				nwn.setQa_inspector_submit_on(date);
				nwn.setS_no(id);
				nwn.setQa_inspector_submit_id(userId);
				nwn.setQa_inspector_sign(userName);
				nwn.setQa_inspector_submit_by(userName);
				nwn.setQa_inspector_status(AppConstantsQc.QainspecterAPPROVED);
				nwn.setTested_by(userName);
				non_woven_F005Repo.save(nwn);

				List<NonWovenF005Lines> line1 = nonwoven.getLine1();

				for (NonWovenF005Lines line : line1) {

					line.setTest_id(nwn.getTest_id());

					nonWovenF005LinesRepo.save(line);
				}

				// HISTORY

				non_woven_F005_history non_woven_F005_history = new non_woven_F005_history();

				String[] ignoreLine = { "line1", "history_id" };

				BeanUtils.copyProperties(nwn, non_woven_F005_history, ignoreLine);

				int version = non_woven_F005HistoryRepo.getMaximumVersiongetMaximumVersion(nonwoven.getBmr_no())
						.map(temp -> temp + 1).orElse(1);

				non_woven_F005_history.setVersion(version);

				non_woven_F005HistoryRepo.save(non_woven_F005_history);

				List<NonWovenF005Lines> historyline1 = nwn.getLine1();

				for (NonWovenF005Lines line : historyline1) {

					NonWovenF005LinesHistory objHistory = new NonWovenF005LinesHistory();

					BeanUtils.copyProperties(line, objHistory);

					objHistory.setHistory_id(non_woven_F005_history.getHistory_id());

					nonWovenF005LinesHistoryRepo.save(objHistory);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
						HttpStatus.BAD_REQUEST);
			}
		} else {
			if (userRole.equalsIgnoreCase("ROLE_QA")) {

				nonwoven.setQa_mng_status(AppConstantsQc.waitingStatus);

				nonwoven.setQa_inspector_submit_on(date);
				nonwoven.setS_no(id);
				nonwoven.setQa_inspector_submit_id(userId);
				nonwoven.setQa_inspector_sign(userName);
				nonwoven.setQa_inspector_submit_by(userName);
				nonwoven.setQa_inspector_status(AppConstantsQc.QainspecterAPPROVED);
				nonwoven.setTested_by(userName);
				non_woven_F005Repo.save(nonwoven);
//				nonwoven.setS_no(nonwoven.getTest_id());
//				non_woven_F005Repo.save(nonwoven);

				List<NonWovenF005Lines> line1 = nonwoven.getLine1();

				for (NonWovenF005Lines line : line1) {

					line.setTest_id(nonwoven.getTest_id());

					nonWovenF005LinesRepo.save(line);
				}

				// HISTORY

				non_woven_F005_history non_woven_F005_history = new non_woven_F005_history();

				String[] ignoreLine = { "line1", "history_id" };

				BeanUtils.copyProperties(nonwoven, non_woven_F005_history, ignoreLine);

				int version = non_woven_F005HistoryRepo.getMaximumVersiongetMaximumVersion(nonwoven.getBmr_no())
						.map(temp -> temp + 1).orElse(1);

				non_woven_F005_history.setVersion(version);

				non_woven_F005HistoryRepo.save(non_woven_F005_history);

//				List<NonWovenF005Lines> historyline1 = nonwoven.getLine1();
//
//				for (NonWovenF005Lines line : historyline1) {
//
//					NonWovenF005LinesHistory objHistory = new NonWovenF005LinesHistory();
//
//					BeanUtils.copyProperties(line, objHistory);
//
//					objHistory.setHistory_id(non_woven_F005_history.getHistory_id());
//
//					nonWovenF005LinesHistoryRepo.save(objHistory);
//				}
				
				// List<NonWovenF005Lines> historyline1 = nonwoven.getLine1();

				// Do this:
				List<NonWovenF005LinesHistory> historyLines = new ArrayList<>();
				
				for (NonWovenF005Lines originalLine : nonwoven.getLine1()) {
					
				    NonWovenF005LinesHistory historyLine = new NonWovenF005LinesHistory();
				    
				    BeanUtils.copyProperties(originalLine, historyLine);
				    historyLine.setHistory_id(non_woven_F005_history.getHistory_id());
				    historyLines.add(historyLine);
				}
				nonWovenF005LinesHistoryRepo.saveAll(historyLines);


			}

		}

		try {

			qcmailfunction.sendEmailToARF005(nonwoven);
		} catch (Exception ex) {
			return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
					HttpStatus.OK);
		}

	} catch (Exception ex) {

		String msg = ex.getMessage();
		logger.error("Unable to Submit QC Chemical Test" + msg);

		return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
				HttpStatus.BAD_REQUEST);
	}

	return new ResponseEntity(nonwoven, HttpStatus.OK);
}

public ResponseEntity<?> approveF05(ApproveResponse approvalResponse, HttpServletRequest http) {

	SCAUtil sca = new SCAUtil();

	non_woven_F005	 nwn = new non_woven_F005();

	String userRole = getUserRole();
	Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	String userName = userRepository.getUserName(userId);
	LocalDateTime currentDate = LocalDateTime.now();
	Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	try {

		nwn = non_woven_F005Repo.findById(approvalResponse.getId())
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));

		non_woven_F005_history non_woven_F005_history = new non_woven_F005_history();

		String supervisiorStatus = nwn.getQa_inspector_status() != null ? nwn.getQa_inspector_status()
				: nwn.getQa_inspector_status();

		String hodStatus = nwn.getQa_mng_status();

		if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.QCApprove)
				|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.QainspecterAPPROVED))
				&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

			if (userRole.equalsIgnoreCase("QA_MANAGER") || userRole.equalsIgnoreCase("QA_Manager")) {

				if (approvalResponse.getStatus().equals("Approve")) {

					nwn.setQa_mng_status(AppConstantsQc.QAmanagerApproved);
					nwn.setQa_mng_submit_on(date);
					nwn.setQa_mng_submit_by(userName);
					nwn.setQa_mng_submit_id(userId);
					nwn.setQa_mng_sign(userName);
					nwn.setApproved_by(userName);

					non_woven_F005Repo.save(nwn);

					non_woven_F005_history = non_woven_F005HistoryRepo
							.fetchLastSubmittedRecordPhNumber(nwn.getBmr_no());

					non_woven_F005_history.setQa_mng_status(AppConstantsQc.QAmanagerApproved);
					non_woven_F005_history.setQa_mng_submit_on(date);
					non_woven_F005_history.setQa_mng_submit_by(userName);
					non_woven_F005_history.setQa_mng_submit_id(userId);
					non_woven_F005_history.setApproved_by(userName);
					non_woven_F005_history.setReason("");	
					non_woven_F005HistoryRepo.save(non_woven_F005_history);

					return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

				}

				else if (approvalResponse.getStatus().equals("Reject")) {

					String reason = approvalResponse.getRemarks();
					nwn.setReason(reason);
					nwn.setQa_mng_status(AppConstantsQc.QAmanagerRejected);
					nwn.setQa_mng_submit_on(date);
					nwn.setQa_mng_submit_id(userId);
					nwn.setQa_mng_submit_by(userName);
					nwn.setApproved_by(userName);
					nwn.setQa_mng_sign(userName);

					non_woven_F005Repo.save(nwn);

					non_woven_F005_history = non_woven_F005HistoryRepo
							.fetchLastSubmittedRecordPhNumber(nwn.getBmr_no());

					
					non_woven_F005_history.setReason(reason);
					non_woven_F005_history.setQa_mng_status(AppConstantsQc.QAmanagerRejected);
					non_woven_F005_history.setQa_mng_submit_on(date);
					non_woven_F005_history.setQa_mng_submit_id(userId);
					non_woven_F005_history.setQa_mng_submit_by(userName);
					non_woven_F005_history.setApproved_by(userName);

					non_woven_F005HistoryRepo.save(non_woven_F005_history);

					return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
				}

			}

			

			else {
				return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
						HttpStatus.BAD_REQUEST);
			}

		}

		else {
			return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
					HttpStatus.BAD_REQUEST);
		}

	} catch (Exception e) {

		String msg = e.getMessage();
		logger.error("Unable to Approve Record" + msg);

		return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
				HttpStatus.BAD_REQUEST);

	}

}


public ResponseEntity<?> getByBmrF005(String bmr) {

	List<non_woven_F005> non_woven_F005 = non_woven_F005Repo.findbyBmr(bmr);
	try {
		return new ResponseEntity(non_woven_F005, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}
}

public ResponseEntity<?> getByIdF005(Long id) {

	non_woven_F005 non_woven_F005 = non_woven_F005Repo.findById(id).get();
	try {
		return new ResponseEntity(non_woven_F005, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}
}


public ResponseEntity<?> getAllF005() {

	List<non_woven_F005> non_woven_F005 = non_woven_F005Repo.getAll();
	try {
		return new ResponseEntity(non_woven_F005, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

}

public ResponseEntity<?> getapproveListF005() {

	List<non_woven_F005> non_woven_F005 = non_woven_F005Repo.approveList();
	try {
		return new ResponseEntity(non_woven_F005, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

}

public ResponseEntity<?> getsubmitListF005() {
	List<non_woven_F005> non_woven_F005 = non_woven_F005Repo.approveList();
	try {
		return new ResponseEntity(non_woven_F005, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}
}

public ResponseEntity<?> printF005(String bmr) {

	List<non_woven_F005> non_woven_F005 = non_woven_F005Repo.print(bmr);
	try {
		return new ResponseEntity(non_woven_F005, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

}

public ResponseEntity<?> getBatchNumbersForLast45Days() {
    List<IdAndValuePair> response = new ArrayList<>();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    try {
        // Fetch all batch numbers and their dates
        List<Object[]> records = non_woven_F005Repo.fetchAllBatchNumbersAndDates();

        // Filter records based on the last 45 days
        LocalDate now = LocalDate.now();
        LocalDate date45DaysAgo = now.minusDays(45);
        

        // Counter for IDs starting from 1
        final int[] counter = {1}; // Start the counter at 1

        // Fetch only batch numbers from the last 45 days
        response = records.stream()
                .filter(record -> {
                	java.sql.Date sampledate =  (java.sql.Date) record[1]; // Assuming the second column is the date
                	LocalDate recordDate = sampledate.toLocalDate(); ;
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
        logger.error("Unable to get Batch Numbers for the last 45 days: ", ex);

        return new ResponseEntity<>(new ApiResponse(false, "Failed to fetch Batch Numbers: " + msg), HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>(response, HttpStatus.OK);
}



public ResponseEntity<?> pdeDataARF005(String bmr) {
	
	List<Map<String, Object>> responseList = new ArrayList<>();

    try {
        List<Object[]> orderResponse = non_woven_F005Repo.pdeData(bmr);

        // Convert each Object[] to a Map<String, Object>
        for (Object[] record : orderResponse) {
        	
            Map<String, Object> map = new HashMap<>();
            
            map.put("shaftNo", record[0]);
			map.put("product_name", record[1]);
			map.put("mixing", record[2]);
			map.put("gsm", record[3]);
			map.put("pattern", record[4]);
          
            responseList.add(map);
        }
		return new ResponseEntity(responseList, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}
}


public ResponseEntity<?> nonWovenPde(String bmr) {
	
	List<Map<String, Object>> responseList = new ArrayList<>();

    try {
        List<Object[]> orderResponse = non_woven_F005Repo.nonWovenPde(bmr);

        // Convert each Object[] to a Map<String, Object>
        for (Object[] record : orderResponse) {
        	
            Map<String, Object> map = new HashMap<>();
            
            map.put("shaftNo", record[0]);
			map.put("product_name", record[1]);
			map.put("mixing", record[2]);
			map.put("gsm", record[3]);
			map.put("pattern", record[4]);
          
            responseList.add(map);
        }
		return new ResponseEntity(responseList, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}
}


	// --------------------------------------------------------------------------------------------F011
	// -----------------------------------------

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveFumigation(fumigationARF011 fumigation, HttpServletRequest http) {
		fumigationARF011 fum= new fumigationARF011();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = fumigation.getTest_id();

			if (id != null) {
				fum = fumigationARF011Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			
           
           
           
			if (id != null ) {
//				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
//					
//					BeanUtils.copyProperties(fumigation, fum, IgnoreProps);
//					
//
//					fum.setChemist_saved_on(date);
//					fum.setChemist_saved_id(userId);
////					fum.setChemist_sign(userName);
//
//					fum.setChemist_status(AppConstantsQc.chemistSave);
//
//					fumigationARF011Repo.save(fum);
//					
//					for (observationArF011 obs : fumigation.getObser()) {
//
//						if (obs.getId() != null) {
//							observationArF011 obe = observationArF011Repo.findById(obs.getId())
//									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//							BeanUtils.copyProperties(obs, obe);
//							observationArF011Repo.save(obs);
//						} else {
//							obs.setTest_id(fum.getTest_id());
//							observationArF011Repo.save(obs);
//						}
//					}
//					
//
//					
//
//				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")){
//					
//					BeanUtils.copyProperties(fumigation, fum, IgnoreProps);
//					
//
//					fum.setMicrobiologist_saved_on(date);
//					fum.setMicrobiologist_saved_id(userId);
////					fum.setMicro_sign(userName);
//
//					fum.setMicro_status(AppConstantsQc.microBiologistSave);
//
//					fumigationARF011Repo.save(fum);
//
//					for (observationArF011 obs : fumigation.getObser()) {
//
//						if (obs.getId() != null) {
//							observationArF011 obe = observationArF011Repo.findById(obs.getId())
//									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//							BeanUtils.copyProperties(obs, obe);
//							observationArF011Repo.save(obs);
//						} else {
//							obs.setTest_id(fum.getTest_id());
//							observationArF011Repo.save(obs);
//						}
//					}
//					
//
//				
//
//				
//				}
//
//				else {
//					return new ResponseEntity(new ApiResponse(false, userRole + "can not save Details"),
//							HttpStatus.BAD_REQUEST);
//				}
//			}
			if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
				
			    for (observationArF011 obs : fumigation.getObser()) {
			        if (obs.getId() != null) {
//			            // Retrieve existing child entity
//			            observationArF011 obe = observationArF011Repo.findById(obs.getId())
//			                .orElseThrow(() -> new EntityNotFoundException("Test not found"));
//			            // Copy properties from obs to obe
//			            BeanUtils.copyProperties(obs, obe); 
			            // Save the updated child entity
			            observationArF011Repo.save(obs); 
			        } else {
			            // If obs is a new entity
			            obs.setTest_id(fum.getTest_id());
			            observationArF011Repo.save(obs);
			        }
			    }
				
			    BeanUtils.copyProperties(fumigation, fum, IgnoreProps);
			    
//			    fumigationARF011Repo.save(fum);
//			    
//				
//
//				List<observationArF011> list = fumigation.getObser();
//
//				for (observationArF011 detail : list) {
//					detail.setTest_id(fum.getTest_id());
//					observationArF011Repo.save(detail);
//				}

//				fum.setObser(list);

			    fum.setChemist_saved_on(date);
			    fum.setChemist_saved_id(userId);
			    // fum.setChemist_sign(userName);

			    fum.setChemist_status(AppConstantsQc.chemistSave);

			    // Save the parent entity
			    fumigationARF011Repo.save(fum);



			} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
				
			    for (observationArF011 obs : fumigation.getObser()) {
			        if (obs.getId() != null) {
		
			            // Save the updated child entity
			            observationArF011Repo.save(obs);
			        } else {
			            // If obs is a new entity
			            obs.setTest_id(fum.getTest_id());
			            observationArF011Repo.save(obs);
			        }
			    }
			    


			    fum.setMicrobiologist_saved_on(date);
			    fum.setMicrobiologist_saved_id(userId);
			    // fum.setMicro_sign(userName);

			    fum.setMicro_status(AppConstantsQc.microBiologistSave);

			    // Save the parent entity
			    fumigationARF011Repo.save(fum);
	

			    // Save the parent entity
//			    fumigationARF011Repo.save(fum);


			} else {
			    return new ResponseEntity(new ApiResponse(false, userRole + " cannot save Details"),
			                               HttpStatus.BAD_REQUEST);
			}
		
			}
			else {

				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					

					fumigation.setChemist_saved_on(date);
					fumigation.setChemist_saved_id(userId);
//					fumigation.setChemist_sign(userName);

					fumigation.setChemist_status(AppConstantsQc.chemistSave);

					fumigationARF011Repo.save(fumigation);
					for (observationArF011 obs : fumigation.getObser()) {

						if (obs.getId() != null) {
							observationArF011 obe = observationArF011Repo.findById(obs.getId())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							BeanUtils.copyProperties(obs, obe);
							observationArF011Repo.save(obs);
						} else {
							obs.setTest_id(fumigation.getTest_id());
							observationArF011Repo.save(obs);
						}
					}

				}
				
				else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					

					fumigation.setMicrobiologist_saved_on(date);
					fumigation.setMicrobiologist_saved_id(userId);
//					fumigation.setMicro_sign(userName);

					fumigation.setMicro_status(AppConstantsQc.microBiologistSave);

					fumigationARF011Repo.save(fumigation);
					for (observationArF011 obs : fumigation.getObser()) {

						if (obs.getId() != null) {
							observationArF011 obe = observationArF011Repo.findById(obs.getId())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							BeanUtils.copyProperties(obs, obe);
							observationArF011Repo.save(obs);
						} else {
							obs.setTest_id(fumigation.getTest_id());
							observationArF011Repo.save(obs);
						}
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not save Details"),
							HttpStatus.BAD_REQUEST);
				}
			
				
				
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save Fumigation Report" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to save fumigation details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(fumigation, HttpStatus.OK);

	}
 
	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitFumigation(@Valid fumigationARF011 fumigation, HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();

		fumigationARF011 fum = new fumigationARF011();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = fumigation.getTest_id();

			if (id != null) {
				fum = fumigationARF011Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

//			fumigation.setCreatedAt(fum.getCreatedAt());
			

			BeanUtils.copyProperties(fumigation, fum, IgnoreProps);

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
					
					BeanUtils.copyProperties(fumigation, fum, IgnoreProps);

					fum.setQc_status(AppConstantsQc.waitingStatus);

					fum.setChemist_submit_on(date);
					fum.setChemist_submit_id(userId);
					fum.setChemist_sign(userName);
					fum.setChemist_submit_by(userName);	
					fum.setChemist_status(AppConstantsQc.chemistSubmitted);
					fum.setObser(null);
					fumigationARF011Repo.save(fum);
					fumigationARF011History fumigationARF011_History = new fumigationARF011History();
//					if (fumigationARF011HistoryRepo
//							.fetchLastSubmittedRecordPhNumber(fum.getFumigation_date()) != null) {
//						fumigationARF011_History = fumigationARF011HistoryRepo
//								.fetchLastSubmittedRecordPhNumber(fum.getFumigation_date());
//					}
					
					fumigationARF011History result = fumigationARF011HistoryRepo
							.fetchLastSubmittedRecordPhNumber(fum.getFumigation_date());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							fumigationARF011_History = result;
					}
						}catch(Exception e ) {}


						
					BeanUtils.copyProperties(fum, fumigationARF011_History , "test_id","version");
					fumigationARF011_History.setObservationArF011(null);

					int version = fumigationARF011HistoryRepo.getMaximumVersiongetMaximumVersion(fumigation.getBmr_no())
							.map(temp -> temp + 1).orElse(1);
					fumigationARF011_History.setVersion(version);
					fumigationARF011HistoryRepo.save(fumigationARF011_History);

					
					if (fumigation.getObser() != null && !fumigation.getObser().isEmpty()) {
						for (observationArF011 obs : fumigation.getObser()) {
							if (obs.getId() != null) {
								observationArF011 obe = observationArF011Repo.findById(obs.getId())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationArF011History obehistory = new observationArF011History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationArF011Repo.save(obs);
								obehistory.setTest_id(fumigationARF011_History.getTest_id());
								observationArF011HistoryRepo.save(obehistory);
							} else {
								obs.setTest_id(fum.getTest_id());
								observationArF011History obehistory = new observationArF011History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								obehistory.setTest_id(fumigationARF011_History.getTest_id());
								observationArF011HistoryRepo.save(obehistory);
								observationArF011Repo.save(obs);

							}
						}
					}
					
					

				}else if( userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
					
					BeanUtils.copyProperties(fumigation, fum, IgnoreProps);

					fum.setQc_status(AppConstantsQc.waitingStatus);

					fum.setMicro_submit_on(date);
					fum.setMicro_submit_id(userId);
					fum.setMicro_sign(userName);
					fum.setMicro_submit_by(userName);
					fum.setMicro_status(AppConstantsQc.microBiologistSubmitted);
					fum.setObser(null);
					fumigationARF011Repo.save(fum);
					fumigationARF011History fumigationARF011_History = new fumigationARF011History();
//					if (fumigationARF011HistoryRepo
//							.fetchLastSubmittedRecordPhNumber(fum.getFumigation_date()) != null) {
//						fumigationARF011_History = fumigationARF011HistoryRepo
//								.fetchLastSubmittedRecordPhNumber(fum.getFumigation_date());
//					}
					
					fumigationARF011History result = fumigationARF011HistoryRepo
							.fetchLastSubmittedRecordPhNumber(fum.getFumigation_date());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							fumigationARF011_History = result;
					}
						}catch(Exception e ) {}
					
					BeanUtils.copyProperties(fum, fumigationARF011_History , "test_id" , "version");
					fumigationARF011_History.setObservationArF011(null);

					int version = fumigationARF011HistoryRepo.getMaximumVersiongetMaximumVersion(fumigation.getBmr_no())
							.map(temp -> temp + 1).orElse(1);
					fumigationARF011_History.setVersion(version);
					fumigationARF011HistoryRepo.save(fumigationARF011_History);
					
					if (fumigation.getObser() != null && !fumigation.getObser().isEmpty()) {
						for (observationArF011 obs : fumigation.getObser()) {
							if (obs.getId() != null) {
								observationArF011 obe = observationArF011Repo.findById(obs.getId())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationArF011History obehistory = new observationArF011History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationArF011Repo.save(obs);
								obehistory.setTest_id(fumigationARF011_History.getTest_id());
								observationArF011HistoryRepo.save(obehistory);
							} else {
								obs.setTest_id(fum.getTest_id());
								observationArF011History obehistory = new observationArF011History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								obehistory.setTest_id(fumigationARF011_History.getTest_id());
								observationArF011HistoryRepo.save(obehistory);
								observationArF011Repo.save(obs);

							}
						}
					}
					


					
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					fumigation.setQc_status(AppConstantsQc.waitingStatus);

					fumigation.setChemist_submit_on(date);
					fumigation.setChemist_submit_id(userId);
					fumigation.setChemist_sign(userName);
					
					fumigation.setChemist_submit_by(userName);	
					fumigation.setChemist_status(AppConstantsQc.chemistSubmitted);

					fumigationARF011Repo.save(fumigation);
					fumigationARF011History fumigationARF011_History = new fumigationARF011History();
//					if (fumigationARF011HistoryRepo
//							.fetchLastSubmittedRecordPhNumber(fumigation.getFumigation_date()) != null) {
//						fumigationARF011_History = fumigationARF011HistoryRepo
//								.fetchLastSubmittedRecordPhNumber(fumigation.getFumigation_date());
//					}
					
					fumigationARF011History result = fumigationARF011HistoryRepo
							.fetchLastSubmittedRecordPhNumber(fum.getFumigation_date());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							fumigationARF011_History = result;
					}
						}catch(Exception e ) {}
					
					BeanUtils.copyProperties(fumigation, fumigationARF011_History,"test_id");
					fumigationARF011_History.setObservationArF011(null);

					int version = fumigationARF011HistoryRepo.getMaximumVersiongetMaximumVersion(fumigation.getBmr_no())
							.map(temp -> temp + 1).orElse(1);
					fumigationARF011_History.setVersion(version);
					fumigationARF011HistoryRepo.save(fumigationARF011_History);

					if (fumigation.getObser() != null && !fumigation.getObser().isEmpty()) {
						for (observationArF011 obs : fumigation.getObser()) {
							if (obs.getId() != null) {
								observationArF011 obe = observationArF011Repo.findById(obs.getId())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationArF011History obehistory = new observationArF011History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationArF011Repo.save(obs);
								obehistory.setTest_id(fumigationARF011_History.getTest_id());
								observationArF011HistoryRepo.save(obehistory);
							} else {
								obs.setTest_id(fumigation.getTest_id());
								observationArF011History obehistory = new observationArF011History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								obehistory.setTest_id(fumigationARF011_History.getTest_id());
								observationArF011HistoryRepo.save(obehistory);
								observationArF011Repo.save(obs);

							}
						}
					}
				}else 
					if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

						fumigation.setQc_status(AppConstantsQc.waitingStatus);

						fumigation.setMicro_submit_on(date);
						fumigation.setMicro_submit_id(userId);
						fumigation.setMicro_sign(userName);
						fumigation.setMicro_submit_by(userName);
						fumigation.setMicro_status(AppConstantsQc.microBiologistSubmitted);

						fumigationARF011Repo.save(fumigation);
						fumigationARF011History fumigationARF011_History = new fumigationARF011History();
//						if (fumigationARF011HistoryRepo
//								.fetchLastSubmittedRecordPhNumber(fumigation.getFumigation_date()) != null) {
//							fumigationARF011_History = fumigationARF011HistoryRepo
//									.fetchLastSubmittedRecordPhNumber(fumigation.getFumigation_date());
//						}
						
						fumigationARF011History result = fumigationARF011HistoryRepo
								.fetchLastSubmittedRecordPhNumber(fum.getFumigation_date());
						try {	
							if (result != null && result.getTest_id() != null) { // Check any primary field or version
								fumigationARF011_History = result;
						}
							}catch(Exception e ) {}
						
						BeanUtils.copyProperties(fumigation, fumigationARF011_History,"test_id" , "version");
						fumigationARF011_History.setObservationArF011(null);

						int version = fumigationARF011HistoryRepo.getMaximumVersiongetMaximumVersion(fumigation.getBmr_no())
								.map(temp -> temp + 1).orElse(1);
						fumigationARF011_History.setVersion(version);
						fumigationARF011HistoryRepo.save(fumigationARF011_History);

						if (fumigation.getObser() != null && !fumigation.getObser().isEmpty()) {
							for (observationArF011 obs : fumigation.getObser()) {
								if (obs.getId() != null) {
									observationArF011 obe = observationArF011Repo.findById(obs.getId())
											.orElseThrow(() -> new EntityNotFoundException("Test not found"));
									observationArF011History obehistory = new observationArF011History();
									BeanUtils.copyProperties(obs, obehistory , "obs_id");
									BeanUtils.copyProperties(obs, obe);
									observationArF011Repo.save(obs);
									obehistory.setTest_id(fumigationARF011_History.getTest_id());
									observationArF011HistoryRepo.save(obehistory);
								} else {
									obs.setTest_id(fumigation.getTest_id());
									observationArF011History obehistory = new observationArF011History();
									BeanUtils.copyProperties(obs, obehistory , "obs_id");
									obehistory.setTest_id(fumigationARF011_History.getTest_id());
									observationArF011HistoryRepo.save(obehistory);
									observationArF011Repo.save(obs);

								}
							}
						}
					}
				

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}
			
			try {

				qcmailfunction.sendEmailToARF011(fumigation);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Fumigation Report" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(fumigation, HttpStatus.OK);
	}

	public ResponseEntity<?> approveF011(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		fumigationARF011 fum = new fumigationARF011();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			fum = fumigationARF011Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			fumigationARF011History fumigationARF011_History = new fumigationARF011History();

			String supervisiorStatus = fum.getChemist_status() != null ? fum.getChemist_status()
					: fum.getMicro_status();

			String hodStatus = fum.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager") || userRole.equalsIgnoreCase("QA_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						fum.setQc_status(AppConstantsQc.QCApprove);
						fum.setQc_submit_on(date);
						fum.setQc_submit_by(userName);
						fum.setQc_submit_id(userId);
						fum.setQc_sign(userName);

						fumigationARF011Repo.save(fum);

						fumigationARF011_History = fumigationARF011HistoryRepo
								.fetchLastSubmittedRecordPhNumber(fum.getFumigation_date());

						fumigationARF011_History.setQc_status(AppConstantsQc.QCApprove);
						fumigationARF011_History.setQc_submit_on(date);
						fumigationARF011_History.setQc_submit_by(userName);
						fumigationARF011_History.setQc_submit_id(userId);
						fumigationARF011_History.setQc_sign(userName);

						fumigationARF011HistoryRepo.save(fumigationARF011_History);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						fum.setReason(reason);
						fum.setQc_status(AppConstantsQc.QCRejected);
						fum.setQc_submit_on(date);
						fum.setQc_submit_id(userId);
						fum.setQc_submit_by(userName);

						fum.setQc_sign(userName);

						fumigationARF011Repo.save(fum);

						fumigationARF011_History = fumigationARF011HistoryRepo
								.fetchLastSubmittedRecordPhNumber(fum.getFumigation_date());

						fumigationARF011_History.setQc_status(AppConstantsQc.QCRejected);
						fumigationARF011_History.setReason(reason);
						fumigationARF011_History.setQc_submit_on(date);
						fumigationARF011_History.setQc_submit_by(userName);
						fumigationARF011_History.setQc_submit_id(userId);
						fumigationARF011_History.setQc_sign(userName);

						fumigationARF011HistoryRepo.save(fumigationARF011_History);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}

	public ResponseEntity<?> getByFumigationDate(String year, String month, String date) {
		List<fumigationARF011> fumigationARF011List = new ArrayList<>();
	
		year = (year == null || year.trim().isEmpty()) ? null : year;
	    month = (month == null || month.trim().isEmpty()) ? null : month;
	    date = (date == null || date.trim().isEmpty()) ? null : date;
			 fumigationARF011List= fumigationARF011Repo.findbyFumigationDate(year ,month, date);
		

		
		try {
			return new ResponseEntity(fumigationARF011List, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}



	public ResponseEntity<?> printF011(String year, String month, String date) {

		List<fumigationARF011> fumigationARF011List = new ArrayList<>();
	
		year = (year == null || year.trim().isEmpty()) ? null : year;
	    month = (month == null || month.trim().isEmpty()) ? null : month;
	    date = (date == null || date.trim().isEmpty()) ? null : date;
			 fumigationARF011List= fumigationARF011Repo.print(year ,month, date);
		
		try {
			return new ResponseEntity(fumigationARF011List, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	public ResponseEntity<?> getByIdF011(Long Id) {

		fumigationARF011 fumigationARF011List = fumigationARF011Repo.findById(Id).get();
				try {
			return new ResponseEntity(fumigationARF011List, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}


	public ResponseEntity<?> approveListF011() {

		List<fumigationARF011> fumigationARF011List = fumigationARF011Repo.approveList();
		try {
			return new ResponseEntity(fumigationARF011List, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getF011All(HttpServletRequest http) {
		List<fumigationARF011> fumigationARF011List = fumigationARF011Repo.getAll();
		
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		if (userRole.equals("ROLE_CHEMIST")) {

			fumigationARF011List = fumigationARF011Repo.chemistSummary();
		}

		else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			fumigationARF011List = fumigationARF011Repo.exeManagerSummary();
		} 
		
		else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

			fumigationARF011List = fumigationARF011Repo.microSummary();
		}
					
		try {
			return new ResponseEntity(fumigationARF011List, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

//	-----------------------------------------------------------------------------F013 -----------------------------------------------

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> savePotableWaterReport(potableWaterARF013Report potableWaterARF013Report, HttpServletRequest http) {
		potableWaterARF013Report potable = new potableWaterARF013Report();
		SCAUtil sca = new SCAUtil();
		
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = potableWaterARF013Report.getTest_id();

			if (id != null) {
				potable = potableWaterARF013ReportRepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
				
			}

			BeanUtils.copyProperties(potableWaterARF013Report, potable, IgnoreProps);
			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					

					potable.setChemist_saved_on(date);
					potable.setChemist_saved_id(userId);
					potable.setChemist_sign(userName);

					potable.setChemist_status(AppConstantsQc.chemistSave);

					potableWaterARF013ReportRepo.save(potable);

				}
				else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					

					potable.setMicrobiologist_saved_on(date);
					potable.setMicrobiologist_saved_id(userId);
					potable.setMicro_sign(userName);

					potable.setMicro_status(AppConstantsQc.microBiologistSave);

					potableWaterARF013ReportRepo.save(potable);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not save Details"),
							HttpStatus.BAD_REQUEST);
				}
			} 

			else {
				

				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					potableWaterARF013Report.setChemist_saved_on(date);
					potableWaterARF013Report.setChemist_saved_id(userId);
					potableWaterARF013Report.setChemist_sign(userName);

					potableWaterARF013Report.setChemist_status(AppConstantsQc.chemistSave);

					potableWaterARF013ReportRepo.save(potableWaterARF013Report);

				}
				else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					potableWaterARF013Report.setMicrobiologist_saved_on(date);
					potableWaterARF013Report.setMicrobiologist_saved_id(userId);
					potableWaterARF013Report.setMicro_sign(userName);

					potableWaterARF013Report.setMicro_status(AppConstantsQc.microBiologistSave);

					potableWaterARF013ReportRepo.save(potableWaterARF013Report);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not save Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save potable water report" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to save potableWaterARF013Report details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(potableWaterARF013Report, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitPotableWaterARF013Report(@Valid potableWaterARF013Report potableWaterARF013Report,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();


		potableWaterARF013Report potable = new potableWaterARF013Report();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = potableWaterARF013Report.getTest_id();

			if (id != null) {
				potable = potableWaterARF013ReportRepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

//			potableWaterARF013Report.setCreatedAt(potable.getCreatedAt());

			BeanUtils.copyProperties(potableWaterARF013Report, potable, IgnoreProps);

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					potable.setQc_status(AppConstantsQc.waitingStatus);

					potable.setChemist_submit_on(date);
					potable.setChemist_submit_id(userId);
					potable.setChemist_sign(userName);
					potable.setChemist_submit_by(userName);
					
					 
					potable.setChemist_status(AppConstantsQc.chemistSubmitted);
					potable.setReason(null);	
					
					
					potableWaterARF013ReportRepo.save(potable);
					potableWaterARF013ReportHistory potableWaterARF013_History = new potableWaterARF013ReportHistory();
					BeanUtils.copyProperties(potable, potableWaterARF013_History);

					int version = potableWaterARF013ReportHistoryRepo
							.getMaximumVersiongetMaximumVersion(potableWaterARF013Report.getSampled_on())
							.map(temp -> temp + 1).orElse(1);
					potableWaterARF013_History.setVersion(version);
					potableWaterARF013_History.setTest_id(null);
					potableWaterARF013ReportHistoryRepo.save(potableWaterARF013_History);

				}
				else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
					potable.setQc_status(AppConstantsQc.waitingStatus);
					
					potable.setMicro_submit_on(date);
					potable.setMicro_submit_id(userId);
					potable.setMicro_sign(userName);
					potable.setMicro_submit_by(userName);
					potable.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					potableWaterARF013ReportRepo.save(potable);
					potableWaterARF013ReportHistory potableWaterARF013_History = new potableWaterARF013ReportHistory();
					BeanUtils.copyProperties(potable, potableWaterARF013_History);

					int version = potableWaterARF013ReportHistoryRepo
							.getMaximumVersiongetMaximumVersion(potableWaterARF013Report.getSampled_on())
							.map(temp -> temp + 1).orElse(1);
					potableWaterARF013_History.setVersion(version);
					potableWaterARF013_History.setTest_id(null);
					potableWaterARF013ReportHistoryRepo.save(potableWaterARF013_History);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

			else {
				
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					potableWaterARF013Report.setQc_status(AppConstantsQc.waitingStatus);

					potableWaterARF013Report.setChemist_submit_on(date);
					potableWaterARF013Report.setChemist_submit_id(userId);
					potableWaterARF013Report.setChemist_sign(userName);
					potableWaterARF013Report.setChemist_submit_by(userName);
//					potableWaterARF013Report.setMicro_status(AppConstantsQc.waitingStatus);
					potableWaterARF013Report.setChemist_status(AppConstantsQc.chemistSubmitted);


					potableWaterARF013ReportRepo.save(potableWaterARF013Report);
					potableWaterARF013ReportHistory potableWaterARF013_History = new potableWaterARF013ReportHistory();
					BeanUtils.copyProperties(potableWaterARF013Report, potableWaterARF013_History);

					int version = potableWaterARF013ReportHistoryRepo
							.getMaximumVersiongetMaximumVersion(potableWaterARF013Report.getSampled_on())
							.map(temp -> temp + 1).orElse(1);
					potableWaterARF013_History.setVersion(version);
					potableWaterARF013_History.setTest_id(null);
					potableWaterARF013ReportHistoryRepo.save(potableWaterARF013_History);

				}
				else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					potableWaterARF013Report.setQc_status(AppConstantsQc.waitingStatus);

					potableWaterARF013Report.setMicro_submit_on(date);
					potableWaterARF013Report.setMicro_submit_id(userId);
					potableWaterARF013Report.setMicro_sign(userName);
					potableWaterARF013Report.setMicro_submit_by(userName);
					potableWaterARF013Report.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					potableWaterARF013ReportRepo.save(potableWaterARF013Report);
					potableWaterARF013ReportHistory potableWaterARF013_History = new potableWaterARF013ReportHistory();
					BeanUtils.copyProperties(potableWaterARF013Report, potableWaterARF013_History);

					int version = potableWaterARF013ReportHistoryRepo
							.getMaximumVersiongetMaximumVersion(potableWaterARF013Report.getSampled_on())
							.map(temp -> temp + 1).orElse(1);
					potableWaterARF013_History.setVersion(version);
					potableWaterARF013_History.setTest_id(null);
					potableWaterARF013ReportHistoryRepo.save(potableWaterARF013_History);

				}
			}

			try {

				qcmailfunction.sendEmailToARF013(potableWaterARF013Report);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit potable water report " + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(potableWaterARF013Report, HttpStatus.OK);
	}

	public ResponseEntity<?> approveF013(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		potableWaterARF013Report potableWaterARF013Report = new potableWaterARF013Report();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			potableWaterARF013Report = potableWaterARF013ReportRepo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			potableWaterARF013ReportHistory potableWaterARF013_History = new potableWaterARF013ReportHistory();

			String supervisiorStatus = potableWaterARF013Report.getChemist_status() != null
					? potableWaterARF013Report.getChemist_status()
					: potableWaterARF013Report.getMicro_status();

			String hodStatus = potableWaterARF013Report.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_MANAGER") || userRole.equalsIgnoreCase("QA_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						potableWaterARF013Report.setQc_status(AppConstantsQc.QCApprove);
						potableWaterARF013Report.setQc_submit_on(date);
						potableWaterARF013Report.setQc_submit_by(userName);

						potableWaterARF013Report.setQc_sign(userName);

						potableWaterARF013ReportRepo.save(potableWaterARF013Report);

						if(potableWaterARF013ReportHistoryRepo
								.fetchLastSubmittedRecordPhNumber(potableWaterARF013Report.getSampled_on())!=null) {
							
							potableWaterARF013_History = potableWaterARF013ReportHistoryRepo
									.fetchLastSubmittedRecordPhNumber(potableWaterARF013Report.getSampled_on());
						}
					

						potableWaterARF013_History.setQc_status(AppConstantsQc.QCApprove);
						potableWaterARF013_History.setQc_submit_on(date);
						potableWaterARF013_History.setQc_submit_by(userName);
						potableWaterARF013_History.setQc_sign(userName);
						potableWaterARF013Report.setQc_submit_id(userId);  
						potableWaterARF013_History.setQc_submit_id(userId);  
						

						potableWaterARF013ReportHistoryRepo.save(potableWaterARF013_History);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						potableWaterARF013Report.setReason(reason);
						potableWaterARF013Report.setQc_status(AppConstantsQc.QCRejected);
						potableWaterARF013Report.setQc_submit_on(date);
						potableWaterARF013Report.setQc_submit_by(userName);
						potableWaterARF013Report.setQc_submit_id(userId);  
						potableWaterARF013Report.setQc_sign(userName);

						potableWaterARF013ReportRepo.save(potableWaterARF013Report);

						potableWaterARF013_History = potableWaterARF013ReportHistoryRepo
								.fetchLastSubmittedRecordPhNumber(potableWaterARF013Report.getSampled_on());

						potableWaterARF013_History.setQc_status(AppConstantsQc.QCRejected);
						potableWaterARF013_History.setQc_submit_on(date);
						potableWaterARF013_History.setQc_submit_by(userName);
						potableWaterARF013_History.setQc_sign(userName);
						potableWaterARF013_History.setQc_submit_id(userId);  

						potableWaterARF013ReportHistoryRepo.save(potableWaterARF013_History);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject potablw water report " + msg),
					HttpStatus.BAD_REQUEST);

		}
	}

	public ResponseEntity<?> getBySampledDate(String year , String month, String sampled_date) {
		
		if (sampled_date != null && sampled_date.isEmpty()) {
			sampled_date = null;
        }
    	if (month != null && month.isEmpty()) {
            month = null;
        }
        if (year != null && year.isEmpty()) {
            year = null;
        }

		List<potableWaterARF013Report> potableWaterARF013ReportList = new ArrayList<>();
		
			potableWaterARF013ReportList = potableWaterARF013ReportRepo.findbySampledDate(year , month , sampled_date);
		
		try {
			return new ResponseEntity(potableWaterARF013ReportList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<?> getById(Long id) {

		potableWaterARF013Report potableWaterARF013ReportList = potableWaterARF013ReportRepo.findById(id).get();
				try {
			return new ResponseEntity(potableWaterARF013ReportList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

public ResponseEntity<?> printF013(String year , String month, String sampled_date) {
		
		if (sampled_date != null && sampled_date.isEmpty()) {
			sampled_date = null;
        }
    	if (month != null && month.isEmpty()) {
            month = null;
        }
        if (year != null && year.isEmpty()) {
            year = null;
        }
		
		List<potableWaterARF013Report> potableWaterARF013ReportList = new ArrayList<>();
		
			potableWaterARF013ReportList = potableWaterARF013ReportRepo.print(year , month , sampled_date);
		
 
		
		try {
			return new ResponseEntity(potableWaterARF013ReportList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getAllF013(HttpServletRequest http) {

		List<potableWaterARF013Report> potableWaterARF013ReportList = potableWaterARF013ReportRepo.getAll();
		
			
			List<physicalandchemicaltest> details = new ArrayList<>();
					
					String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

					if (userRole.equals("ROLE_CHEMIST")) {

						potableWaterARF013ReportList = potableWaterARF013ReportRepo.chemistSummary();
					}

					else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
							|| userRole.equalsIgnoreCase("QA_MANAGER")) {
						potableWaterARF013ReportList = potableWaterARF013ReportRepo.exeManagerSummary();
					} 
					
					else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

						potableWaterARF013ReportList = potableWaterARF013ReportRepo.microSummary();
					}
								
						
			try {
				return new ResponseEntity(potableWaterARF013ReportList, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
						HttpStatus.BAD_REQUEST);
			}

		}

	

	public ResponseEntity<?> getapproveListF013() {

		List<potableWaterARF013Report> potableWaterARF013ReportList = potableWaterARF013ReportRepo.approveList();
		try {
			return new ResponseEntity(potableWaterARF013ReportList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	// -------------------------------------------------------------------F004----------------------------------------------------



//	QA_Manager
//	ROLE_CHEMIST
//	ROLE_MICROBIOLOGIST

	public ResponseEntity<?> saveexfoliatingTest(@Valid exfoliatingfabricanalysisreport exfo, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		exfoliatingfabricanalysisreport exfoliate = new exfoliatingfabricanalysisreport();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = exfo.getTest_id();

			if (id != null) {
				exfoliate = exfoRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			
			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
					if (exfo.getObser() != null && !exfo.getObser().isEmpty()) {
						for (observationF004 obs : exfo.getObser()) {

							if (obs.getObs_id() != null) {
								observationF004 obe = observationRepoF004.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								BeanUtils.copyProperties(obs, obe);
								observationRepoF004.save(obe);
							} else {
								obs.setTest_id(exfo.getTest_id());
								observationRepoF004.save(obs);
							}
						}
					}
					BeanUtils.copyProperties(exfo, exfoliate, IgnoreProps);

					exfoliate.setChemist_saved_on(date);
					exfoliate.setChemist_saved_id(userId);
//					exfoliate.setChemist_sign(userName);
					exfoliate.setPrepared_by(userName);
					exfoliate.setReason(null);
					exfoliate.setChemist_status(AppConstantsQc.chemistSave);

					exfoRepo.save(exfoliate);



				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					if (exfo.getMicrobilogytestf004() != null && !exfo.getMicrobilogytestf004().isEmpty()) {
						for (MicrobilogyTestF004 micro : exfo.getMicrobilogytestf004()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF004 obe = microbilogytestrepof004.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								BeanUtils.copyProperties(micro, obe);
								microbilogytestrepof004.save(obe);
							} else {
								micro.setTest_id(exfo.getTest_id());
								microbilogytestrepof004.save(micro);
							}
						}
					}
					BeanUtils.copyProperties(exfo, exfoliate, IgnoreProps);

					exfoliate.setMicrobiologist_saved_on(date);
					exfoliate.setMicrobiologist_saved_id(userId);
//					exfoliate.setMicro_sign(userName);
					exfoliate.setPrepared_by(userName);
					exfoliate.setReason(null);
					exfoliate.setMicro_status(AppConstantsQc.microBiologistSave);

					exfoRepo.save(exfoliate);
					

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				

				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					

					exfo.setChemist_saved_on(date);
					exfo.setChemist_saved_id(userId);
//					exfo.setChemist_sign(userName);
					exfo.setPrepared_by(userName);
					exfo.setReason(null);
					exfo.setChemist_status(AppConstantsQc.chemistSave);

					exfoRepo.save(exfo);
					if (exfo.getObser() != null && !exfo.getObser().isEmpty()) {
						for (observationF004 obs : exfo.getObser()) {

							if (obs.getObs_id() != null) {
								observationF004 obe = observationRepoF004.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								BeanUtils.copyProperties(obs, obe);
								observationRepoF004.save(obe);
							} else {
								obs.setTest_id(exfo.getTest_id());
								observationRepoF004.save(obs);
							}
						}
					}


				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					

					exfo.setMicrobiologist_saved_on(date);
					exfo.setMicrobiologist_saved_id(userId);
//					exfo.setMicro_sign(userName);
					exfo.setPrepared_by(userName);
					exfo.setReason(null);
					exfo.setMicro_status(AppConstantsQc.microBiologistSave);

					exfoRepo.save(exfo);
					if (exfo.getMicrobilogytestf004() != null && !exfo.getMicrobilogytestf004().isEmpty()) {
						for (MicrobilogyTestF004 micro : exfo.getMicrobilogytestf004()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF004 obe = microbilogytestrepof004.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								BeanUtils.copyProperties(micro, obe);
								microbilogytestrepof004.save(obe);
							} else {
								micro.setTest_id(exfo.getTest_id());
								microbilogytestrepof004.save(micro);
							}
						}
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
				
			
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save exfoliating details F004 - " + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(exfo, HttpStatus.OK);
	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitExfoliatingF004(@Valid exfoliatingfabricanalysisreport exfo,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		exfoliatingfabricanalysisreport exfoliate = new exfoliatingfabricanalysisreport();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = exfo.getTest_id();

			if (id != null) {
				exfoliate = exfoRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

//			exfo.setCreatedAt(exfoliate.getCreatedAt());
			exfo.setPrepared_by(exfoliate.getPrepared_by());

			

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
					
					
					BeanUtils.copyProperties(exfo, exfoliate, IgnoreProps);

					exfoliate.setQc_status(AppConstantsQc.waitingStatus);

					exfoliate.setChemist_submit_on(date);
					exfoliate.setChemist_submit_id(userId);
					exfoliate.setChemist_sign(userName);
					exfoliate.setReason(null);
					exfoliate.setChemist_status(AppConstantsQc.chemistSubmitted);
					exfoliate.setChemist_submit_by(userName);
					exfoliate.setMicrobilogytestf004(null);
					exfoliate.setObser(null);
					exfoRepo.save(exfoliate);
					exfoliatingfabricanalysisreportHistory exfoandchemicaltestHistory = new exfoliatingfabricanalysisreportHistory();
				
					
//					if (exfoHistoryRepo
//							.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no())!=null) {
//						
//						exfoandchemicaltestHistory = exfoHistoryRepo
//								.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no());
//					}
					
					exfoliatingfabricanalysisreportHistory result = exfoHistoryRepo
							.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							exfoandchemicaltestHistory = result;
					}
						}catch(Exception e ) {}
					
					BeanUtils.copyProperties(exfoliate, exfoandchemicaltestHistory , "test_id");
					exfoandchemicaltestHistory.setObservations(null);
					exfoandchemicaltestHistory.setMicrobilogytestf004(null);
					int version = exfoHistoryRepo.getMaximumVersiongetMaximumVersion(exfo.getInvoice_no())
							.map(temp -> temp + 1).orElse(1);
					exfoandchemicaltestHistory.setVersion(version);
					exfoHistoryRepo.save(exfoandchemicaltestHistory);
					
					if (exfo.getObser() != null && !exfo.getObser().isEmpty()) {
						for (observationF004 obs : exfo.getObser()) {
							if (obs.getObs_id() != null) {
								observationF004 obe = observationRepoF004.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationF004History obehistory = new observationF004History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationRepoF004.save(obe);
								obehistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
										observationF004History.save(obehistory);
							} else {
								obs.setTest_id(exfo.getTest_id());
								observationF004History obehistory = new observationF004History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								obehistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								observationF004History.save(obehistory);
								observationRepoF004.save(obs);
								

							}
						}
					}
					
					if (exfo.getMicrobilogytestf004() != null && !exfo.getMicrobilogytestf004().isEmpty()) {
						for (MicrobilogyTestF004 micro : exfo.getMicrobilogytestf004()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF004 obe = microbilogytestrepof004.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								MicrobilogyTestF004History microHistory = new MicrobilogyTestF004History();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microbilogytestrepof004.save(obe);
								microHistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								microbilogytestrepof004history.save(microHistory);
							} else {
								micro.setTest_id(exfo.getTest_id());
								MicrobilogyTestF004History microHistory = new MicrobilogyTestF004History();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								microbilogytestrepof004history.save(microHistory);
								microbilogytestrepof004.save(micro);
							}
						}
					}






				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
					
					BeanUtils.copyProperties(exfo, exfoliate, IgnoreProps);

					exfoliate.setQc_status(AppConstantsQc.waitingStatus);

					exfoliate.setMicro_submit_on(date);
					exfoliate.setMicro_submit_id(userId);
					exfoliate.setMicro_sign(userName);
					exfoliate.setMicro_submit_by(userName);
					exfoliate.setReason(null);
					exfoliate.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					exfoliate.setMicrobilogytestf004(null);
					exfoliate.setObser(null);
					exfoRepo.save(exfoliate);
					exfoliatingfabricanalysisreportHistory exfoandchemicaltestHistory = new exfoliatingfabricanalysisreportHistory();
//					if (exfoHistoryRepo
//							.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no())!=null) {
//						
//						exfoandchemicaltestHistory = exfoHistoryRepo
//								.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no());
//					}
					
					exfoliatingfabricanalysisreportHistory result = exfoHistoryRepo
							.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							exfoandchemicaltestHistory = result;
					}
						}catch(Exception e ) {}
					
					BeanUtils.copyProperties(exfoliate, exfoandchemicaltestHistory , "test_id");
					exfoandchemicaltestHistory.setObservations(null);
					exfoandchemicaltestHistory.setMicrobilogytestf004(null);
					int version = exfoHistoryRepo.getMaximumVersiongetMaximumVersion(exfo.getInvoice_no())
							.map(temp -> temp + 1).orElse(1);
					exfoandchemicaltestHistory.setVersion(version);
					exfoHistoryRepo.save(exfoandchemicaltestHistory);
					
					if (exfo.getObser() != null && !exfo.getObser().isEmpty()) {
						for (observationF004 obs : exfo.getObser()) {
							if (obs.getObs_id() != null) {
								observationF004 obe = observationRepoF004.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationF004History obehistory = new observationF004History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationRepoF004.save(obe);
								obehistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								observationF004History.save(obehistory);
							} else {
								obs.setTest_id(exfo.getTest_id());
								observationF004History obehistory = new observationF004History();
								obehistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								observationF004History.save(obehistory);
								observationRepoF004.save(obs);

							}
						}
					}
					
					if (exfo.getMicrobilogytestf004() != null && !exfo.getMicrobilogytestf004().isEmpty()) {
						for (MicrobilogyTestF004 micro : exfo.getMicrobilogytestf004()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF004 obe = microbilogytestrepof004.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								MicrobilogyTestF004History microHistory = new MicrobilogyTestF004History();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microbilogytestrepof004.save(obe);
								microHistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								microbilogytestrepof004history.save(microHistory);
							} else {
								micro.setTest_id(exfo.getTest_id());
								MicrobilogyTestF004History microHistory = new MicrobilogyTestF004History();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								microbilogytestrepof004history.save(microHistory);
								microbilogytestrepof004.save(micro);
							}
						}
					}
					


				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				

				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					exfo.setQc_status(AppConstantsQc.waitingStatus);

					exfo.setChemist_submit_on(date);
					exfo.setChemist_submit_id(userId);
					exfo.setChemist_sign(userName);
					exfo.setChemist_submit_by(userName);
					exfo.setReason(null);
					exfo.setChemist_status(AppConstantsQc.chemistSubmitted);
					

					exfoRepo.save(exfo);
					exfoliatingfabricanalysisreportHistory exfoandchemicaltestHistory = new exfoliatingfabricanalysisreportHistory();
//					if (exfoHistoryRepo
//							.fetchLastSubmittedRecordPhNumber(exfo.getInvoice_no())!=null) {
//						
//						exfoandchemicaltestHistory = exfoHistoryRepo
//								.fetchLastSubmittedRecordPhNumber(exfo.getInvoice_no());
//					}
					
					exfoliatingfabricanalysisreportHistory result = exfoHistoryRepo
							.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							exfoandchemicaltestHistory = result;
					}
						}catch(Exception e ) {}
					
					BeanUtils.copyProperties(exfo, exfoandchemicaltestHistory , "test_id");
					exfoandchemicaltestHistory.setObservations(null);
					exfoandchemicaltestHistory.setMicrobilogytestf004(null);
					int version = exfoHistoryRepo.getMaximumVersiongetMaximumVersion(exfo.getInvoice_no())
							.map(temp -> temp + 1).orElse(1);
					exfoandchemicaltestHistory.setVersion(version);
					exfoHistoryRepo.save(exfoandchemicaltestHistory);

					if (exfo.getObser() != null && !exfo.getObser().isEmpty()) {
						for (observationF004 obs : exfo.getObser()) {
							if (obs.getObs_id() != null) {
								observationF004 obe = observationRepoF004.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationF004History obehistory = new observationF004History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationRepoF004.save(obe);
								obehistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								observationF004History.save(obehistory);
							} else {
								obs.setTest_id(exfo.getTest_id());
								observationF004History obehistory = new observationF004History();
								
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								obehistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								observationF004History.save(obehistory);
								observationRepoF004.save(obs);

							}
						}
					}

					if (exfo.getMicrobilogytestf004() != null && !exfo.getMicrobilogytestf004().isEmpty()) {
						for (MicrobilogyTestF004 micro : exfo.getMicrobilogytestf004()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF004 obe = microbilogytestrepof004.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								MicrobilogyTestF004History microHistory = new MicrobilogyTestF004History();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microbilogytestrepof004.save(obe);
								microHistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								microbilogytestrepof004history.save(microHistory);
							} else {
								micro.setTest_id(exfo.getTest_id());
								MicrobilogyTestF004History microHistory = new MicrobilogyTestF004History();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								microbilogytestrepof004history.save(microHistory);
								microbilogytestrepof004.save(micro);
							}
						}
					}

				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					exfo.setQc_status(AppConstantsQc.waitingStatus);

					exfo.setMicro_submit_on(date);
					exfo.setMicro_submit_id(userId);
					exfo.setMicro_sign(userName);
					exfo.setMicro_status(AppConstantsQc.microBiologistSubmitted);
					exfo.setMicro_submit_by(userName);
					exfo.setReason(null);
					exfoRepo.save(exfo);
					exfoliatingfabricanalysisreportHistory exfoandchemicaltestHistory = new exfoliatingfabricanalysisreportHistory();
//					if (exfoHistoryRepo
//							.fetchLastSubmittedRecordPhNumber(exfo.getInvoice_no())!=null) {
//						
//						exfoandchemicaltestHistory = exfoHistoryRepo
//								.fetchLastSubmittedRecordPhNumber(exfo.getInvoice_no());
//					}
					
					exfoliatingfabricanalysisreportHistory result = exfoHistoryRepo
							.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							exfoandchemicaltestHistory = result;
					}
						}catch(Exception e ) {}
					
					BeanUtils.copyProperties(exfo, exfoandchemicaltestHistory , "test_id");
					
					exfoandchemicaltestHistory.setObservations(null);
					exfoandchemicaltestHistory.setMicrobilogytestf004(null);
					int version = exfoHistoryRepo.getMaximumVersiongetMaximumVersion(exfo.getInvoice_no())
							.map(temp -> temp + 1).orElse(1);
					exfoandchemicaltestHistory.setVersion(version);
					exfoHistoryRepo.save(exfoandchemicaltestHistory);

					if (exfo.getObser() != null && !exfo.getObser().isEmpty()) {
						for (observationF004 obs : exfo.getObser()) {
							if (obs.getObs_id() != null) {
								observationF004 obe = observationRepoF004.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationF004History obehistory = new observationF004History();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationRepoF004.save(obe);
								obehistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								observationF004History.save(obehistory);
							} else {
								obs.setTest_id(exfo.getTest_id());
								observationF004History obehistory = new observationF004History();
								
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								obehistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								observationF004History.save(obehistory);
								observationRepoF004.save(obs);

							}
						}
					}

					if (exfo.getMicrobilogytestf004() != null && !exfo.getMicrobilogytestf004().isEmpty()) {
						for (MicrobilogyTestF004 micro : exfo.getMicrobilogytestf004()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF004 obe = microbilogytestrepof004.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								MicrobilogyTestF004History microHistory = new MicrobilogyTestF004History();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microbilogytestrepof004.save(obe);
								microHistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								microbilogytestrepof004history.save(microHistory);
							} else {
								micro.setTest_id(exfo.getTest_id());
								MicrobilogyTestF004History microHistory = new MicrobilogyTestF004History();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setTest_id(exfoandchemicaltestHistory.getTest_id());
								microbilogytestrepof004history.save(microHistory);
								microbilogytestrepof004.save(micro);
							}
						}
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}
			
			try {

				qcmailfunction.sendEmailToARF005(exfo);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(exfo, HttpStatus.OK);

	}

	public ResponseEntity<?> approveExfoliating(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		exfoliatingfabricanalysisreport exfoliate = new exfoliatingfabricanalysisreport();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			exfoliate = exfoRepo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			exfoliatingfabricanalysisreportHistory exfoliatingfabricanalysisreportHistory = new exfoliatingfabricanalysisreportHistory();

			String supervisiorStatus = exfoliate.getChemist_status() != null ? exfoliate.getChemist_status()
					: exfoliate.getMicro_status();

			String hodStatus = exfoliate.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						exfoliate.setQc_status(AppConstantsQc.QCApprove);
						exfoliate.setQc_submit_on(date);
						exfoliate.setQc_submit_by(userName);
						exfoliate.setQc_submit_id(userId);		
						exfoliate.setQc_sign(userName);

						exfoRepo.save(exfoliate);

						exfoliatingfabricanalysisreportHistory = exfoHistoryRepo
								.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no());

						exfoliatingfabricanalysisreportHistory.setQc_status(AppConstantsQc.QCApprove);
						exfoliatingfabricanalysisreportHistory.setQc_submit_on(date);
						exfoliatingfabricanalysisreportHistory.setQc_submit_by(userName);
						exfoliatingfabricanalysisreportHistory.setQc_submit_id(userId);
						exfoliatingfabricanalysisreportHistory.setQc_sign(userName);

						exfoHistoryRepo.save(exfoliatingfabricanalysisreportHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						exfoliate.setReason(reason);
						exfoliate.setQc_status(AppConstantsQc.QCRejected);
						exfoliate.setQc_submit_on(date);
						exfoliate.setQc_submit_id(userId);
						exfoliate.setQc_submit_by(userName);

						exfoliate.setQc_sign(userName);

						exfoRepo.save(exfoliate);

						exfoliatingfabricanalysisreportHistory = exfoHistoryRepo
								.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no());

						exfoliatingfabricanalysisreportHistory.setQc_status(AppConstantsQc.QCRejected);
						exfoliatingfabricanalysisreportHistory.setReason(reason);
						exfoliatingfabricanalysisreportHistory.setQc_submit_on(date);
						exfoliatingfabricanalysisreportHistory.setQc_submit_by(userName);
						exfoliatingfabricanalysisreportHistory.setQc_submit_id(userId);
						exfoliatingfabricanalysisreportHistory.setQc_sign(userName);

						exfoHistoryRepo.save(exfoliatingfabricanalysisreportHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} 
				
				if (userRole.equalsIgnoreCase("QA_Manager")) {
					


					if (approvalResponse.getStatus().equals("Approve")) {

						exfoliate.setQc_status(AppConstantsQc.QAApprove);
						exfoliate.setQc_submit_on(date);
						exfoliate.setQc_submit_by(userName);
						exfoliate.setQc_submit_id(userId);
						exfoliate.setQc_sign(userName);

						exfoRepo.save(exfoliate);

						exfoliatingfabricanalysisreportHistory = exfoHistoryRepo
								.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no());

						exfoliatingfabricanalysisreportHistory.setQc_status(AppConstantsQc.QAApprove);
						exfoliatingfabricanalysisreportHistory.setQc_submit_on(date);
						exfoliatingfabricanalysisreportHistory.setQc_submit_by(userName);
						exfoliatingfabricanalysisreportHistory.setQc_submit_id(userId);
						exfoliatingfabricanalysisreportHistory.setQc_sign(userName);

						exfoHistoryRepo.save(exfoliatingfabricanalysisreportHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						exfoliate.setReason(reason);
						exfoliate.setQc_status(AppConstantsQc.QAReject);
						exfoliate.setQc_submit_on(date);
						exfoliate.setQc_submit_id(userId);
						exfoliate.setQc_submit_by(userName);

						exfoliate.setQc_sign(userName);

						exfoRepo.save(exfoliate);

						exfoliatingfabricanalysisreportHistory = exfoHistoryRepo
								.fetchLastSubmittedRecordPhNumber(exfoliate.getInvoice_no());

						exfoliatingfabricanalysisreportHistory.setQc_status(AppConstantsQc.QAReject);
						exfoliatingfabricanalysisreportHistory.setReason(reason);
						exfoliatingfabricanalysisreportHistory.setQc_submit_on(date);
						exfoliatingfabricanalysisreportHistory.setQc_submit_by(userName);
						exfoliatingfabricanalysisreportHistory.setQc_submit_id(userId);
						exfoliatingfabricanalysisreportHistory.setQc_sign(userName);

						exfoHistoryRepo.save(exfoliatingfabricanalysisreportHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				
					
				}
				

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}


	
	public ResponseEntity<?> getallF004Test(HttpServletRequest http) {
		
		List<exfoliatingfabricanalysisreport> exfoliatingfabricanalysisreport = new ArrayList<>();
				
				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

				if (userRole.equals("ROLE_CHEMIST")) {

					exfoliatingfabricanalysisreport = exfoRepo.chemistSummary();
				}

				else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
						|| userRole.equalsIgnoreCase("QA_MANAGER")) {
					exfoliatingfabricanalysisreport = exfoRepo.exeManagerSummary();
				} 
				
				else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

					exfoliatingfabricanalysisreport = exfoRepo.microSummary();
				}
		
		try {
			return new ResponseEntity(exfoliatingfabricanalysisreport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}



	public ResponseEntity<?> getByInvoiceF004(String invoice) {

		List<exfoliatingfabricanalysisreport> exfoliatingfabricanalysisreport = exfoRepo.findbyInvoice(invoice);
		try {
			return new ResponseEntity(exfoliatingfabricanalysisreport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<?> getByInvoiceF004PDE(String invoice) {

		exfoliatingfabricanalysisreport exfoliatingfabricanalysisreport = exfoRepo.findbyInvoicePDE(invoice);
		try {
			return new ResponseEntity(exfoliatingfabricanalysisreport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> printF004(String invoice) {

		List<exfoliatingfabricanalysisreport> exfoliatingfabricanalysisreport = exfoRepo.print(invoice);
		try {
			return new ResponseEntity(exfoliatingfabricanalysisreport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getapproveLisrF004() {

		List<exfoliatingfabricanalysisreport> exfoliatingfabricanalysisreport = exfoRepo.approveList();
		try {
			return new ResponseEntity(exfoliatingfabricanalysisreport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}
	
	public ResponseEntity<?> PdeARF004() {

		
		List<Map<String, Object>> responseList = new ArrayList<>();
		try {
			
			List<Object[]> orderResponse = exfoRepo.pdeData();
			for (Object[] record : orderResponse) {
	            Map<String, Object> map = new HashMap<>();
	            map.put("pono", record[0]);
	            map.put("supplier", record[1]);
	            map.put("no_of_bags", record[2]);
	            map.put("description", record[3]);
	            map.put("invoice_no", record[4]);
	            map.put("quantity", record[5]);
	            
	          
	            responseList.add(map);
	        }
			return new ResponseEntity(responseList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
		
	}
	
	public ResponseEntity<?> PdeARF004(String invoice) {

		
		List<Map<String, Object>> responseList = new ArrayList<>();
		try {
			
			List<Object[]> orderResponse = exfoRepo.pdeData(invoice);
			for (Object[] record : orderResponse) {
	            Map<String, Object> map = new HashMap<>();
	            
	            map.put("pono", record[0]);
	            map.put("supplier", record[1]);
	            map.put("no_of_bags", record[2]);
	            map.put("description", record[3]);
	            map.put("invoice_no", record[4]);
	            map.put("quantity", record[5]);
	          
	          
	            responseList.add(map);
	        }
			return new ResponseEntity(responseList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
		
	}
	
	public ResponseEntity<?> getByIdF004(Long invoice) {

		exfoliatingfabricanalysisreport exfoliatingfabricanalysisreport = exfoRepo.findById(invoice).get();
		try {
			return new ResponseEntity(exfoliatingfabricanalysisreport, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	// -----------------------------------------------------------------------------F06------------------------------------

	public ResponseEntity<?> saveTest(@Valid finishedproductanalysisreportF006 finished, HttpServletRequest http) {
		finishedproductanalysisreportF006 fpr = new finishedproductanalysisreportF006();
		
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = finished.getTest_id();

			if (id != null) {
				fpr = finishedproductanalysisreportF006Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
					if (finished.getObser() != null && !finished.getObser().isEmpty()) {
						for (observationsF006 obs : finished.getObser()) {

							if (obs.getObs_id() != null) {
								observationsF006 obe = observationF006Repo.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								BeanUtils.copyProperties(obs, obe);
								observationF006Repo.save(obe);
							} else {
								obs.setTest_id(finished.getTest_id());
								observationF006Repo.save(obs);
							}
						}
					}
					
//					if (finished.getMicro() != null && !finished.getMicro().isEmpty()) {
//						for (MicrobilogyTestF006 obs : finished.getMicro()) {
//
//							if (obs.getMicro_id() != null) {
//								MicrobilogyTestF006 obe = microbiologyF006Repo.findById(obs.getMicro_id())
//										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//								BeanUtils.copyProperties(obs, obe);
//								microbiologyF006Repo.save(obe);
//							} else {
//								obs.setTest_id(finished.getTest_id());
//								microbiologyF006Repo.save(obs);
//							}
//						}
//					}
					
					BeanUtils.copyProperties(finished, fpr, IgnoreProps);
					

					fpr.setChemist_saved_on(date);
					fpr.setChemist_saved_id(userId);
//					fpr.setChemist_sign(userName);
					fpr.setPrepared_by(userName);

					fpr.setChemist_status(AppConstantsQc.chemistSave);

					finishedproductanalysisreportF006Repo.save(fpr);



				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					if (finished.getMicro() != null && !finished.getMicro().isEmpty()) {
						for (MicrobilogyTestF006 micro : finished.getMicro()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF006 obe = microbiologyF006Repo.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								BeanUtils.copyProperties(micro, obe);
								microbiologyF006Repo.save(obe);
							} else {
								micro.setTest_id(finished.getTest_id());
								microbiologyF006Repo.save(micro);
							}
						}
					}
					BeanUtils.copyProperties(finished, fpr, IgnoreProps);

					fpr.setMicrobiologist_saved_on(date);
					fpr.setMicrobiologist_saved_id(userId);
//					fpr.setMicro_sign(userName);
					fpr.setPrepared_by(userName);
					fpr.setMicro_status(AppConstantsQc.microBiologistSave);

					finishedproductanalysisreportF006Repo.save(fpr);



				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					

					finished.setChemist_saved_on(date);
					finished.setChemist_saved_id(userId);
//					finished.setChemist_sign(userName);
					finished.setPrepared_by(userName);

					finished.setChemist_status(AppConstantsQc.chemistSave);

					finishedproductanalysisreportF006Repo.save(finished);
					if (finished.getObser() != null && !finished.getObser().isEmpty()) {
						for (observationsF006 obs : finished.getObser()) {

							if (obs.getObs_id() != null) {
								observationsF006 obe = observationF006Repo.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								BeanUtils.copyProperties(obs, obe);
								observationF006Repo.save(obe);
							} else {
								obs.setTest_id(finished.getTest_id());
								observationF006Repo.save(obs);
							}
						}
					}


				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					

					finished.setMicrobiologist_saved_on(date);
					finished.setMicrobiologist_saved_id(userId);
//					finished.setMicro_sign(userName);
					finished.setPrepared_by(userName);
					finished.setMicro_status(AppConstantsQc.microBiologistSave);

					finishedproductanalysisreportF006Repo.save(finished);

					if (finished.getMicro() != null && !finished.getMicro().isEmpty()) {
						for (MicrobilogyTestF006 micro : finished.getMicro()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF006 obe = microbiologyF006Repo.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								BeanUtils.copyProperties(micro, obe);
								microbiologyF006Repo.save(obe);
							} else {
								micro.setTest_id(finished.getTest_id());
								microbiologyF006Repo.save(micro);
							}
						}
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
				
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save F006 - " + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(finished, HttpStatus.OK);
	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitFinished(@Valid finishedproductanalysisreportF006 finished,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		finishedproductanalysisreportF006 fpr = new finishedproductanalysisreportF006();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = finished.getTest_id();

			if (id != null) {
				fpr = finishedproductanalysisreportF006Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

//			finished.setCreatedAt(fpr.getCreatedAt());
			finished.setPrepared_by(fpr.getPrepared_by());

			

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
					
					
					BeanUtils.copyProperties(finished, fpr, IgnoreProps);

					fpr.setQc_status(AppConstantsQc.waitingStatus);

					fpr.setChemist_submit_on(date);
					fpr.setChemist_submit_id(userId);
					fpr.setChemist_sign(userName);
					fpr.setChemist_submit_by(userName);	
					fpr.setChemist_status(AppConstantsQc.chemistSubmitted);
					fpr.setPrepared_by(userName);
					fpr.setObser(null);
					fpr.setMicro(null);
					finishedproductanalysisreportF006Repo.save(fpr);
					finishedproductanalysisreporthistory finishedandchemicaltestHistory = new finishedproductanalysisreporthistory();
					
					
//					if (finishedproductanalysisreporthistory
//							.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no())!=null) {
//						
//						finishedandchemicaltestHistory = finishedproductanalysisreporthistory
//								.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no());
//					}
					
					finishedproductanalysisreporthistory result =finishedproductanalysisreporthistory
							.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no(),fpr.getSample_date());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							finishedandchemicaltestHistory = result;
					}
						}catch(Exception e ) {}
					
					BeanUtils.copyProperties(fpr, finishedandchemicaltestHistory , "test_id");
							
					finishedandchemicaltestHistory.setObservations(null);
					finishedandchemicaltestHistory.setMicrobilogytestf006(null);
					int version = finishedproductanalysisreporthistory
							.getMaximumVersiongetMaximumVersion(finished.getBmr_no()).map(temp -> temp + 1).orElse(1);
					finishedandchemicaltestHistory.setVersion(version);
					finishedproductanalysisreporthistory.save(finishedandchemicaltestHistory);
					
					if (finished.getObser() != null && !finished.getObser().isEmpty()) {
						for (observationsF006 obs : finished.getObser()) {
							if (obs.getObs_id() != null) {
								observationsF006 obe = observationF006Repo.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationsF006history obehistory = new observationsF006history();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationF006Repo.save(obe);
								obehistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								observationF006HistoryRepo.save(obehistory);
							} else {
								obs.setTest_id(finished.getTest_id());
								observationsF006history obehistory = new observationsF006history();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								obehistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								observationF006HistoryRepo.save(obehistory);
								observationF006Repo.save(obs);

							}
						}
					}

					if (finished.getMicro() != null && !finished.getMicro().isEmpty()) {
						for (MicrobilogyTestF006 micro : finished.getMicro()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF006 obe = microbiologyF006Repo.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								MicrobilogyTestF006History microHistory = new MicrobilogyTestF006History();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microbiologyF006Repo.save(obe);
								microHistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								microbiologyF006HistoryRepo.save(microHistory);
							} else {
								micro.setTest_id(finished.getTest_id());
								MicrobilogyTestF006History microHistory = new MicrobilogyTestF006History();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								microbiologyF006HistoryRepo.save(microHistory);
								microbiologyF006Repo.save(micro);
							}
						}
					}

				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
					
					
					BeanUtils.copyProperties(finished, fpr, IgnoreProps);

					fpr.setQc_status(AppConstantsQc.waitingStatus);

					fpr.setMicro_submit_on(date);
					fpr.setMicro_submit_id(userId);
					fpr.setMicro_sign(userName);
					fpr.setMicro_status(AppConstantsQc.microBiologistSubmitted);
					fpr.setMicro_submit_by(userName);
					fpr.setPrepared_by(userName);
					fpr.setObser(null);
					fpr.setMicro(null);
					finishedproductanalysisreportF006Repo.save(fpr);
					finishedproductanalysisreporthistory finishedandchemicaltestHistory = new finishedproductanalysisreporthistory();
//					if (finishedproductanalysisreporthistory
//							.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no())!=null) {
//						
//						finishedandchemicaltestHistory = finishedproductanalysisreporthistory
//								.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no());
//					}
				
					finishedproductanalysisreporthistory result =finishedproductanalysisreporthistory
							.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no(),fpr.getSample_date());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							finishedandchemicaltestHistory = result;
					}
						}catch(Exception e ) {}
					
					finishedandchemicaltestHistory.setObservations(null);
					finishedandchemicaltestHistory.setMicrobilogytestf006(null);
					int version = finishedproductanalysisreporthistory
							.getMaximumVersiongetMaximumVersion(finished.getBmr_no()).map(temp -> temp + 1).orElse(1);
					finishedandchemicaltestHistory.setVersion(version);
					
					finishedproductanalysisreporthistory.save(finishedandchemicaltestHistory);
					
					if (finished.getObser() != null && !finished.getObser().isEmpty()) {
						for (observationsF006 obs : finished.getObser()) {
							if (obs.getObs_id() != null) {
								observationsF006 obe = observationF006Repo.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationsF006history obehistory = new observationsF006history();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationF006Repo.save(obe);
								obehistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								observationF006HistoryRepo.save(obehistory);
							} else {
								obs.setTest_id(finished.getTest_id());
								observationsF006history obehistory = new observationsF006history();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								obehistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								observationF006HistoryRepo.save(obehistory);
								observationF006Repo.save(obs);

							}
						}
					}

					if (finished.getMicro() != null && !finished.getMicro().isEmpty()) {
						for (MicrobilogyTestF006 micro : finished.getMicro()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF006 obe = microbiologyF006Repo.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								MicrobilogyTestF006History microHistory = new MicrobilogyTestF006History();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microbiologyF006Repo.save(obe);
								microHistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								microbiologyF006HistoryRepo.save(microHistory);
							} else {
								micro.setTest_id(finished.getTest_id());
								MicrobilogyTestF006History microHistory = new MicrobilogyTestF006History();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								microbiologyF006HistoryRepo.save(microHistory);
								microbiologyF006Repo.save(micro);
							}
						}
					}




				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				

				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					finished.setQc_status(AppConstantsQc.waitingStatus);

					finished.setChemist_submit_on(date);
					finished.setChemist_submit_id(userId);
					finished.setChemist_sign(userName);
					finished.setChemist_submit_by(userName);
					finished.setPrepared_by(userName);
					finished.setChemist_status(AppConstantsQc.chemistSubmitted);

					finishedproductanalysisreportF006Repo.save(finished);
					finishedproductanalysisreporthistory finishedandchemicaltestHistory = new finishedproductanalysisreporthistory();
//					if (finishedproductanalysisreporthistory
//							.fetchLastSubmittedRecordPhNumber(finished.getBmr_no())!=null) {
//						
//						finishedandchemicaltestHistory = finishedproductanalysisreporthistory
//								.fetchLastSubmittedRecordPhNumber(finished.getBmr_no());
//					}
			
					finishedproductanalysisreporthistory result =finishedproductanalysisreporthistory
							.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no(),fpr.getSample_date());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							finishedandchemicaltestHistory = result;
					}
						}catch(Exception e ) {}
					
					BeanUtils.copyProperties(finished, finishedandchemicaltestHistory , "test_id");
					finishedandchemicaltestHistory.setObservations(null);
					finishedandchemicaltestHistory.setMicrobilogytestf006(null);
					int version = finishedproductanalysisreporthistory
							.getMaximumVersiongetMaximumVersion(finished.getBmr_no()).map(temp -> temp + 1).orElse(1);
					finishedandchemicaltestHistory.setVersion(version);
					finishedproductanalysisreporthistory.save(finishedandchemicaltestHistory);

					if (finished.getObser() != null && !finished.getObser().isEmpty()) {
						for (observationsF006 obs : finished.getObser()) {
							if (obs.getObs_id() != null) {
								observationsF006 obe = observationF006Repo.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationsF006history obehistory = new observationsF006history();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationF006Repo.save(obe);
								obehistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								observationF006HistoryRepo.save(obehistory);
							} else {
								obs.setTest_id(finished.getTest_id());
								observationsF006history obehistory = new observationsF006history();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								obehistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								observationF006HistoryRepo.save(obehistory);
								observationF006Repo.save(obs);

							}
						}
					}

					if (finished.getMicro() != null && !finished.getMicro().isEmpty()) {
						for (MicrobilogyTestF006 micro : finished.getMicro()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF006 obe = microbiologyF006Repo.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								MicrobilogyTestF006History microHistory = new MicrobilogyTestF006History();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microbiologyF006Repo.save(obe);
								microHistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								microbiologyF006HistoryRepo.save(microHistory);
							} else {
								micro.setTest_id(finished.getTest_id());
								MicrobilogyTestF006History microHistory = new MicrobilogyTestF006History();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								microbiologyF006HistoryRepo.save(microHistory);
								microbiologyF006Repo.save(micro);
							}
						}
					}

				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					finished.setQc_status(AppConstantsQc.waitingStatus);

					finished.setMicro_submit_on(date);
					finished.setMicro_submit_id(userId);
					finished.setMicro_sign(userName);
					finished.setMicro_submit_by(userName);
					finished.setPrepared_by(userName);
					finished.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					finishedproductanalysisreportF006Repo.save(finished);
					finishedproductanalysisreporthistory finishedandchemicaltestHistory = new finishedproductanalysisreporthistory();
	
					
//					if (finishedproductanalysisreporthistory
//							.fetchLastSubmittedRecordPhNumber(finished.getBmr_no())!=null) {
//						
//						finishedandchemicaltestHistory = finishedproductanalysisreporthistory
//								.fetchLastSubmittedRecordPhNumber(finished.getBmr_no());
//					}
					
					finishedproductanalysisreporthistory result =finishedproductanalysisreporthistory
							.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no(),fpr.getSample_date());
					try {	
						if (result != null && result.getTest_id() != null) { // Check any primary field or version
							finishedandchemicaltestHistory = result;
					}
						}catch(Exception e ) {}
					
					BeanUtils.copyProperties(finished, finishedandchemicaltestHistory , "test_id");
					finishedandchemicaltestHistory.setObservations(null);
					finishedandchemicaltestHistory.setMicrobilogytestf006(null);
					int version = finishedproductanalysisreporthistory
							.getMaximumVersiongetMaximumVersion(finished.getBmr_no()).map(temp -> temp + 1).orElse(1);
					finishedandchemicaltestHistory.setVersion(version);
					finishedproductanalysisreporthistory.save(finishedandchemicaltestHistory);

					if (finished.getObser() != null && !finished.getObser().isEmpty()) {
						for (observationsF006 obs : finished.getObser()) {
							if (obs.getObs_id() != null) {
								observationsF006 obe = observationF006Repo.findById(obs.getObs_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								observationsF006history obehistory = new observationsF006history();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								BeanUtils.copyProperties(obs, obe);
								observationF006Repo.save(obe);
								obehistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								observationF006HistoryRepo.save(obehistory);
							} else {
								obs.setTest_id(finished.getTest_id());
								observationsF006history obehistory = new observationsF006history();
								BeanUtils.copyProperties(obs, obehistory , "obs_id");
								obehistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								observationF006HistoryRepo.save(obehistory);
								observationF006Repo.save(obs);

							}
						}
					}

					if (finished.getMicro() != null && !finished.getMicro().isEmpty()) {
						for (MicrobilogyTestF006 micro : finished.getMicro()) {
							if (micro.getMicro_id() != null) {
								MicrobilogyTestF006 obe = microbiologyF006Repo.findById(micro.getMicro_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								MicrobilogyTestF006History microHistory = new MicrobilogyTestF006History();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microbiologyF006Repo.save(obe);
								microHistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								microbiologyF006HistoryRepo.save(microHistory);
							} else {
								micro.setTest_id(finished.getTest_id());
								
								MicrobilogyTestF006History microHistory = new MicrobilogyTestF006History();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setTest_id(finishedandchemicaltestHistory.getTest_id());		
								microbiologyF006HistoryRepo.save(microHistory);
								microbiologyF006Repo.save(micro);
							}
						}
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}

			try {

				qcmailfunction.sendEmailToARF006(finished);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit Finished Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(finished, HttpStatus.OK);

	}

	public ResponseEntity<?> approveF006(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		finishedproductanalysisreportF006 fpr = new finishedproductanalysisreportF006();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			fpr = finishedproductanalysisreportF006Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			finishedproductanalysisreporthistory finishedandchemicaltestHistory = new finishedproductanalysisreporthistory();

			String supervisiorStatus = fpr.getChemist_status() != null ? fpr.getChemist_status()
					: fpr.getMicro_status();

			String hodStatus = fpr.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager") ) {

					if (approvalResponse.getStatus().equals("Approve")) {

						fpr.setQc_status(AppConstantsQc.QCApprove);
						fpr.setQc_submit_on(date);
						fpr.setQc_submit_by(userName);
						fpr.setQc_submit_id(userId);		
						fpr.setQc_sign(userName);

						finishedproductanalysisreportF006Repo.save(fpr);

						finishedandchemicaltestHistory = finishedproductanalysisreporthistory
								.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no(),fpr.getSample_date());

						finishedandchemicaltestHistory.setQc_status(AppConstantsQc.QCApprove);
						finishedandchemicaltestHistory.setQc_submit_on(date);
						finishedandchemicaltestHistory.setQc_submit_by(userName);
						finishedandchemicaltestHistory.setQc_submit_id(userId);
						finishedandchemicaltestHistory.setQc_sign(userName);

						finishedproductanalysisreporthistory.save(finishedandchemicaltestHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						fpr.setReason(reason);
						fpr.setQc_status(AppConstantsQc.QCRejected);
						fpr.setQc_submit_on(date);
						fpr.setQc_submit_id(userId);
						fpr.setQc_submit_by(userName);

						fpr.setQc_sign(userName);

						finishedproductanalysisreportF006Repo.save(fpr);

						finishedandchemicaltestHistory = finishedproductanalysisreporthistory
								.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no(),fpr.getSample_date());

						finishedandchemicaltestHistory.setQc_status(AppConstantsQc.QCRejected);
						finishedandchemicaltestHistory.setReason(reason);
						finishedandchemicaltestHistory.setQc_submit_on(date);
						finishedandchemicaltestHistory.setQc_submit_by(userName);
						finishedandchemicaltestHistory.setQc_submit_id(userId);
						finishedandchemicaltestHistory.setQc_sign(userName);

						finishedproductanalysisreporthistory.save(finishedandchemicaltestHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}
				else if (userRole.equalsIgnoreCase("QA_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						fpr.setQc_status(AppConstantsQc.QAApprove);
						fpr.setQc_submit_on(date);
						fpr.setQc_submit_by(userName);
						fpr.setQc_submit_id(userId);
						fpr.setQc_sign(userName);

						finishedproductanalysisreportF006Repo.save(fpr);

						finishedandchemicaltestHistory = finishedproductanalysisreporthistory
								.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no(),fpr.getSample_date());

						finishedandchemicaltestHistory.setQc_status(AppConstantsQc.QAApprove);
						finishedandchemicaltestHistory.setQc_submit_on(date);
						finishedandchemicaltestHistory.setQc_submit_by(userName);
						finishedandchemicaltestHistory.setQc_submit_id(userId);
						finishedandchemicaltestHistory.setQc_sign(userName);

						finishedproductanalysisreporthistory.save(finishedandchemicaltestHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						fpr.setReason(reason);
						fpr.setQc_status(AppConstantsQc.QAReject);
						fpr.setQc_submit_on(date);
						fpr.setQc_submit_id(userId);
						fpr.setQc_submit_by(userName);

						fpr.setQc_sign(userName);

						finishedproductanalysisreportF006Repo.save(fpr);

						finishedandchemicaltestHistory = finishedproductanalysisreporthistory
								.fetchLastSubmittedRecordPhNumber(fpr.getBmr_no(),fpr.getSample_date());

						finishedandchemicaltestHistory.setQc_status(AppConstantsQc.QAReject);
						finishedandchemicaltestHistory.setReason(reason);
						finishedandchemicaltestHistory.setQc_submit_on(date);
						finishedandchemicaltestHistory.setQc_submit_by(userName);
						finishedandchemicaltestHistory.setQc_submit_id(userId);
						finishedandchemicaltestHistory.setQc_sign(userName);

						finishedproductanalysisreporthistory.save(finishedandchemicaltestHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}
				
				
				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}


	
	public ResponseEntity<?> getallTestF006(HttpServletRequest http) {
		
		List<finishedproductanalysisreportF006> finishedproductanalysisreportF006 = new ArrayList<>();
				
				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

				if (userRole.equals("ROLE_CHEMIST")) {

					finishedproductanalysisreportF006 = finishedproductanalysisreportF006Repo.chemistSummary();
				}

				else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
						|| userRole.equalsIgnoreCase("QA_MANAGER")) {
					finishedproductanalysisreportF006 = finishedproductanalysisreportF006Repo.exeManagerSummary();
				} 
				
				else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

					finishedproductanalysisreportF006 = finishedproductanalysisreportF006Repo.microSummary();
				}
		
		try {
			return new ResponseEntity(finishedproductanalysisreportF006, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getApproveListF006() {
		List<finishedproductanalysisreportF006> finishedproductanalysisreportF006 = finishedproductanalysisreportF006Repo
				.approveList();
		try {
			return new ResponseEntity(finishedproductanalysisreportF006, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

//	public ResponseEntity<?> getTestByBmrF006(String bmr) {
//		List<finishedproductanalysisreportF006> finishedproductanalysisreportF006 = finishedproductanalysisreportF006Repo
//				.findbyBMR(bmr);
//		try {
//			return new ResponseEntity(finishedproductanalysisreportF006, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
//					HttpStatus.BAD_REQUEST);
//		}
//
//	}
	
	public ResponseEntity<?> getTestByBmrAndDateF006(String bmr, String date) {
		List<finishedproductanalysisreportF006> finishedproductanalysisreportF006 = finishedproductanalysisreportF006Repo
				.findbyBMRandDate(bmr,date);
		try {
			return new ResponseEntity(finishedproductanalysisreportF006, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> pdeDataARF006(String bmr, String date) {
	
		List<Map<String, Object>> responseList = new ArrayList<>();
		try {
			
			List<Object[]> orderResponse = finishedproductanalysisreportF006Repo.pde(bmr,date);
			for (Object[] record : orderResponse) {
	            Map<String, Object> map = new HashMap<>();
	            map.put("product_description", record[0]);
	            map.put("edgepattern", record[1]);
	            map.put("quantity", record[2]);
	            map.put("fg_no", record[3]);
	            
	          
	            responseList.add(map);
	        }
			return new ResponseEntity(responseList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printF006(String bmr, String date) {
		List<finishedproductanalysisreportF006> finishedproductanalysisreportF006 = finishedproductanalysisreportF006Repo
				.print(bmr,date);
		try {
			return new ResponseEntity(finishedproductanalysisreportF006, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	public ResponseEntity<?> findByIdF006(Long bmr) {
		finishedproductanalysisreportF006 finishedproductanalysisreportF006 = finishedproductanalysisreportF006Repo
				.findById(bmr).get();
		try {
			return new ResponseEntity(finishedproductanalysisreportF006, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	

	// ----------------------------------CL-F001-----------------------------------------

	// ----------------------------------CL-F003-----------------------------------------

//--------------------------------------------CL-F007----------------------------------------------------------------

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveCLF007(weighingscalecalibrationreportCLF007 wigClf007, HttpServletRequest http) {
		weighingscalecalibrationreportCLF007 weigh = new weighingscalecalibrationreportCLF007();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = wigClf007.getLab_id();

			if (id != null) {
				weigh = weighingscalecalibrationreportCLF007Repo.findById(id)
//						mediaDisposalHistoryCLF022 mediahistory
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			
			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					for (obervationCLF007 obs : wigClf007.getObser()) {

						if (obs.getId() != null) {
							obervationCLF007 obe = obervationCLF007Repo.findById(obs.getId())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							BeanUtils.copyProperties(obs, obe);
							obervationCLF007Repo.save(obs);
						} else {
							obs.setLab_id(wigClf007.getLab_id());
							obervationCLF007Repo.save(obs);
						}
					}
					BeanUtils.copyProperties(wigClf007, weigh, IgnoreProps);

					weigh.setChemist_saved_on(date);
					weigh.setChemist_saved_id(userId);
//					weigh.setChemist_sign(userName);

					weigh.setChemist_status(AppConstantsQc.chemistSave);

					weighingscalecalibrationreportCLF007Repo.save(weigh);
					

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					wigClf007.setChemist_saved_on(date);
					wigClf007.setChemist_saved_id(userId);
//					wigClf007.setChemist_sign(userName);

					wigClf007.setChemist_status(AppConstantsQc.chemistSave);

					weighingscalecalibrationreportCLF007Repo.save(wigClf007);
					
					for (obervationCLF007 obs : wigClf007.getObser()) {

						if (obs.getId() != null) {
//							obervationCLF007 obe = obervationCLF007Repo.findById(obs.getId())
//									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//							BeanUtils.copyProperties(obs, obe);
							obervationCLF007Repo.save(obs);
						} else {
							obs.setLab_id(wigClf007.getLab_id());
							obervationCLF007Repo.save(obs);
						}
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save weigh test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(wigClf007, HttpStatus.OK);

	}

public ResponseEntity<?> weighScalePDE(@Valid String id) {

		List<Map<String, Object>> responseList = new ArrayList<>();
		
		id= "%"+id+"%";
		try {
			if(id!=null) {
				List<Object[]> orderResponse=weighingscalecalibrationreportCLF007Repo.pde(id);

			for (Object[] record : orderResponse) {
	            Map<String, Object> map = new HashMap<>();
	            map.put("eqid", record[0]);
	            map.put("biMaxWT", record[1]);
	            map.put("biMinWT", record[2]);
	            map.put("Tol", record[3]);
	            map.put("stdw1", record[4]);
	            map.put("stdw2", record[5]);
	            map.put("stdw3", record[6]);
	            
	            responseList.add(map);
	        }
		}
			return new ResponseEntity(responseList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get PDE Data" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

public ResponseEntity<?> weighScalePDE() {

	List<String> resList = new ArrayList<>();
	List<Map<String, Object>> responseList = new ArrayList<>();
	Map<String, Object> responseObject = new HashMap<>();
	try {        resList = weighingscalecalibrationreportCLF007Repo.pde();
    
    // Convert each string to a map and add to responseList
    for (String record : resList) {
        Map<String, Object> map = new HashMap<>();
        map.put("eqid", record.trim());  // trim to remove unwanted characters like \r\n
        responseList.add(map);
    }
    
    // Return the list of objects directly
    return new ResponseEntity<>(responseList, HttpStatus.OK);} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "Failed to get PDE Data" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}
}


	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitCLF007(@Valid weighingscalecalibrationreportCLF007 wigClf007,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		weighingscalecalibrationreportCLF007 weigh = new weighingscalecalibrationreportCLF007();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = wigClf007.getLab_id();

			if (id != null) {
				weigh = weighingscalecalibrationreportCLF007Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

//		wigClf007.setCreatedAt(weigh.getCreatedAt());

			

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
					
					BeanUtils.copyProperties(wigClf007, weigh, IgnoreProps);

					weigh.setQc_status(AppConstantsQc.waitingStatus);

					weigh.setChemist_submit_on(date);
					weigh.setChemist_submit_id(userId);
					weigh.setChemist_sign(userName);
					weigh.setChemist_submit_by(userName);
					weigh.setRemark("");
					weigh.setObser(null);
					weigh.setChemist_status(AppConstantsQc.chemistSubmitted);

					weighingscalecalibrationreportCLF007Repo.save(weigh);
					weighingscalecalibrationreportHistoryCLF007 weighingscalecalibrationreportHistoryCLF007 = new weighingscalecalibrationreportHistoryCLF007();
					BeanUtils.copyProperties(weigh, weighingscalecalibrationreportHistoryCLF007);
					weighingscalecalibrationreportHistoryCLF007.setObser(null);
					weighingscalecalibrationreportHistoryCLF007.setLab_id(null);;
					int version = weighingscalecalibrationreportHistoryCLF007repo
							.getMaximumVersiongetMaximumVersion(wigClf007.getDate()).map(temp -> temp + 1).orElse(1);
					weighingscalecalibrationreportHistoryCLF007.setVersion(version);
					weighingscalecalibrationreportHistoryCLF007repo.save(weighingscalecalibrationreportHistoryCLF007);
					
					for (obervationCLF007 obs : wigClf007.getObser()) {
						if (obs.getId() != null) {
							obervationCLF007 obe = obervationCLF007Repo.findById(obs.getId())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							obervationHistoryCLF007 obehistory = new obervationHistoryCLF007();
							BeanUtils.copyProperties(obs, obehistory , "obs_id");
							BeanUtils.copyProperties(obs, obe);
							obervationCLF007Repo.save(obs);
							obehistory.setLab_id(weighingscalecalibrationreportHistoryCLF007.getLab_id());;
							obervationCLF007HistoryRepo.save(obehistory);
						} else {
							obs.setLab_id(wigClf007.getLab_id());
							obervationHistoryCLF007 obehistory = new obervationHistoryCLF007();
							BeanUtils.copyProperties(obs, obehistory , "obs_id");
							
							obehistory.setLab_id(weighingscalecalibrationreportHistoryCLF007.getLab_id());;
							obervationCLF007HistoryRepo.save(obehistory);
							obervationCLF007Repo.save(obs);

						}
					}


				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else 
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
					
					BeanUtils.copyProperties(wigClf007, weigh, IgnoreProps);

					wigClf007.setQc_status(AppConstantsQc.waitingStatus);

					wigClf007.setChemist_submit_on(date);
					wigClf007.setChemist_submit_id(userId);
					wigClf007.setChemist_sign(userName);
					wigClf007.setChemist_submit_by(userName);
					wigClf007.setRemark("");
					wigClf007.setChemist_status(AppConstantsQc.chemistSubmitted);

					weighingscalecalibrationreportCLF007Repo.save(wigClf007);
					weighingscalecalibrationreportHistoryCLF007 weighingscalecalibrationreportHistoryCLF007 = new weighingscalecalibrationreportHistoryCLF007();
					BeanUtils.copyProperties(wigClf007, weighingscalecalibrationreportHistoryCLF007);
					weighingscalecalibrationreportHistoryCLF007.setLab_id(null);
					weighingscalecalibrationreportHistoryCLF007.setObser(null);

					int version = weighingscalecalibrationreportHistoryCLF007repo
							.getMaximumVersiongetMaximumVersion(wigClf007.getDate()).map(temp -> temp + 1).orElse(1);
					weighingscalecalibrationreportHistoryCLF007.setVersion(version);
					weighingscalecalibrationreportHistoryCLF007repo.save(weighingscalecalibrationreportHistoryCLF007);
					
					for (obervationCLF007 obs : wigClf007.getObser()) {
						if (obs.getId() != null) {
							obervationCLF007 obe = obervationCLF007Repo.findById(obs.getId())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							obervationHistoryCLF007 obehistory = new obervationHistoryCLF007();
							BeanUtils.copyProperties(obs, obehistory , "obs_id");
							BeanUtils.copyProperties(obs, obe);
							obervationCLF007Repo.save(obs);
							obehistory.setLab_id(weighingscalecalibrationreportHistoryCLF007.getLab_id());
							obervationCLF007HistoryRepo.save(obehistory);
						} else {
							obs.setLab_id(wigClf007.getLab_id());
							obervationHistoryCLF007 obehistory = new obervationHistoryCLF007();
							BeanUtils.copyProperties(obs, obehistory , "obs_id");
							
							obehistory.setLab_id(weighingscalecalibrationreportHistoryCLF007.getLab_id());;
							obervationCLF007HistoryRepo.save(obehistory);
							obervationCLF007Repo.save(obs);

						}
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			

			try {

				qcmailfunction.sendEmailToF007(wigClf007);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(wigClf007, HttpStatus.OK);

	}

	public ResponseEntity<?> getbyDate(String e1_no,String year , String month , String date) {
		List<weighingscalecalibrationreportCLF007> wigClf007 = new ArrayList<>();
		
		try {
			
		    e1_no = (e1_no == null || e1_no.trim().isEmpty()) ? null : e1_no.trim();
		    year = (year == null || year.trim().isEmpty()) ? null : year.trim();
		    month = (month == null || month.trim().isEmpty()) ? null : month.trim();
		    date = (date == null || date.trim().isEmpty()) ? null : date.trim();
			
			wigClf007 = weighingscalecalibrationreportCLF007Repo.getByDate(e1_no,year ,month,date);
			return new ResponseEntity(wigClf007, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Date." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printCLF007(String e1_no,String year , String month , String date) {
		List<weighingscalecalibrationreportCLF007> wigClf007 = new ArrayList<>();


	    e1_no = (e1_no == null || e1_no.trim().isEmpty()) ? null : e1_no.trim();
	    year = (year == null || year.trim().isEmpty()) ? null : year.trim();
	    month = (month == null || month.trim().isEmpty()) ? null : month.trim();
	    date = (date == null || date.trim().isEmpty()) ? null : date.trim();
		
		 wigClf007 = weighingscalecalibrationreportCLF007Repo.print(e1_no,year ,month,date);
	
	
	
	try {
		return new ResponseEntity(wigClf007, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "failed to print data" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}}

	public ResponseEntity<?> getTestByIdCLF007(@Valid Long id) {
		weighingscalecalibrationreportCLF007 wigClf007 = weighingscalecalibrationreportCLF007Repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(wigClf007, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestCLF007(HttpServletRequest http) {
		List<weighingscalecalibrationreportCLF007> wigClf007 = new ArrayList<>();
				
				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

				if (userRole.equals("ROLE_CHEMIST")) {

					wigClf007 = weighingscalecalibrationreportCLF007Repo.chemistSummary();
				}

				else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
						|| userRole.equalsIgnoreCase("QA_MANAGER")|| userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")) {
					wigClf007 = weighingscalecalibrationreportCLF007Repo.exeManagerSummary();
				} 
				
//				else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {
//
//					wigClf007 = weighingscalecalibrationreportCLF007Repo.microSummary();
//				}
		
		try {
			return new ResponseEntity(wigClf007, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	
		
	}

	public ResponseEntity<?> getapproveListCLF007() {
		List<weighingscalecalibrationreportCLF007> wigClf007 = weighingscalecalibrationreportCLF007Repo.approveList();
		try {
			return new ResponseEntity(wigClf007, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> approveCLF07(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		weighingscalecalibrationreportCLF007 wigClf007 = new weighingscalecalibrationreportCLF007();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			wigClf007 = weighingscalecalibrationreportCLF007Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			weighingscalecalibrationreportHistoryCLF007 weighingscalecalibrationreportHistoryCLF007 = new weighingscalecalibrationreportHistoryCLF007();

			String supervisiorStatus = wigClf007.getChemist_status() != null ? wigClf007.getChemist_status()
					: wigClf007.getChemist_status();

			String hodStatus = wigClf007.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager") || userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						wigClf007.setQc_status(AppConstantsQc.QCApprove);
						wigClf007.setQc_submit_on(date);
						wigClf007.setQc_submit_by(userName);
						wigClf007.setQc_submit_id(userId);		
						wigClf007.setQc_sign(userName);

						weighingscalecalibrationreportCLF007Repo.save(wigClf007);

						weighingscalecalibrationreportHistoryCLF007 = weighingscalecalibrationreportHistoryCLF007repo
								.fetchLastSubmittedRecordPhNumber(wigClf007.getDate());

						weighingscalecalibrationreportHistoryCLF007.setQc_status(AppConstantsQc.QCApprove);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_on(date);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_by(userName);
						weighingscalecalibrationreportHistoryCLF007.setQc_sign(userName);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_id(userId);	

						weighingscalecalibrationreportHistoryCLF007repo
								.save(weighingscalecalibrationreportHistoryCLF007);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						wigClf007.setReason(reason);
						wigClf007.setQc_status(AppConstantsQc.QCRejected);
						wigClf007.setQc_submit_on(date);
						wigClf007.setQc_submit_id(userId);	
						wigClf007.setQc_submit_by(userName);

						wigClf007.setQc_sign(userName);

						weighingscalecalibrationreportCLF007Repo.save(wigClf007);

						weighingscalecalibrationreportHistoryCLF007 = weighingscalecalibrationreportHistoryCLF007repo
								.fetchLastSubmittedRecordPhNumber(wigClf007.getDate());

						weighingscalecalibrationreportHistoryCLF007.setQc_status(AppConstantsQc.QCRejected);
						weighingscalecalibrationreportHistoryCLF007.setReason(reason);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_on(date);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_by(userName);
						weighingscalecalibrationreportHistoryCLF007.setQc_sign(userName);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_id(userId);

						weighingscalecalibrationreportHistoryCLF007repo
								.save(weighingscalecalibrationreportHistoryCLF007);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else if (userRole.equalsIgnoreCase("QA_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						wigClf007.setQc_status(AppConstantsQc.QAApprove);
						wigClf007.setQc_submit_on(date);
						wigClf007.setQc_submit_by(userName);
						wigClf007.setQc_submit_id(userId);	
						wigClf007.setQc_sign(userName);

						weighingscalecalibrationreportCLF007Repo.save(wigClf007);

						weighingscalecalibrationreportHistoryCLF007 = weighingscalecalibrationreportHistoryCLF007repo
								.fetchLastSubmittedRecordPhNumber(wigClf007.getDate());

						weighingscalecalibrationreportHistoryCLF007.setQc_status(AppConstantsQc.QAApprove);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_on(date);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_by(userName);
						weighingscalecalibrationreportHistoryCLF007.setQc_sign(userName);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_id(userId);

						weighingscalecalibrationreportHistoryCLF007repo
								.save(weighingscalecalibrationreportHistoryCLF007);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						wigClf007.setReason(reason);
						wigClf007.setQc_status(AppConstantsQc.QAReject);
						wigClf007.setQc_submit_on(date);
						wigClf007.setQc_submit_by(userName);
						wigClf007.setQc_submit_id(userId);	
						wigClf007.setQc_sign(userName);

						weighingscalecalibrationreportCLF007Repo.save(wigClf007);

						weighingscalecalibrationreportHistoryCLF007 = weighingscalecalibrationreportHistoryCLF007repo
								.fetchLastSubmittedRecordPhNumber(wigClf007.getDate());

						weighingscalecalibrationreportHistoryCLF007.setQc_status(AppConstantsQc.QAReject);
						weighingscalecalibrationreportHistoryCLF007.setReason(reason);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_on(date);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_by(userName);
						weighingscalecalibrationreportHistoryCLF007.setQc_sign(userName);
						weighingscalecalibrationreportHistoryCLF007.setQc_submit_id(userId);

						weighingscalecalibrationreportHistoryCLF007repo
								.save(weighingscalecalibrationreportHistoryCLF007);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}
		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}
		return null;

	}
	
	

//-----------------------------------------------------------CL_F05--------------------------------------------------------------

//	@Transactional(rollbackFor = Exception.class)
//	public ResponseEntity<?> saveChemicalTestCLF005(absorbentbleachedcottonreportCLF005 physical, HttpServletRequest http) {
//		absorbentbleachedcottonreportCLF005 physicalobject = new absorbentbleachedcottonreportCLF005();
//		SCAUtil sca = new SCAUtil();
//		try {
//
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			Long id = physical.getTest_id();
//
//			if (id != null) {
//				physicalobject = absorbentbleachedcottonreportCLF005ParentRepo.findById(id)
//						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//			}
//			BeanUtils.copyProperties(physical, physicalobject, IgnoreProps);
//			if(id != null ) {
//				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
//
//					
//
//					physicalobject.setChemist_saved_on(date);
//					physicalobject.setChemist_saved_id(userId);
//					physicalobject.setChemist_sign(userName);
//
//					physicalobject.setChemist_status(AppConstantsQc.chemistSave);
//
//					absorbentbleachedcottonreportCLF005ParentRepo.save(physicalobject);
//				} 
//				else {
//					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
//							HttpStatus.BAD_REQUEST);
//				}
//			} else {
//				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
//
//					
//
//					physical.setChemist_saved_on(date);
//					physical.setChemist_saved_id(userId);
//					physical.setChemist_sign(userName);
//
//					physical.setChemist_status(AppConstantsQc.chemistSave);
//
//					absorbentbleachedcottonreportCLF005ParentRepo.save(physical);
//
//
//				} 
//				
//
//				else {
//					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
//							HttpStatus.BAD_REQUEST);
//				}
//			}
//
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to Save QC Chemical Test" + msg);
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity(physical, HttpStatus.OK);
//
//	}
//
//	@Transactional(rollbackFor = Exception.class)
//	public ResponseEntity<?> submitChemicalTestCLF005(@Valid absorbentbleachedcottonreportCLF005 physical,
//			HttpServletRequest http) {
//		SCAUtil sca = new SCAUtil();
//		absorbentbleachedcottonreportCLF005 physicalobject = new absorbentbleachedcottonreportCLF005();
//		try {
//
//			String userRole = getUserRole();
//			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
//			String userName = userRepository.getUserName(userId);
//			LocalDateTime currentDate = LocalDateTime.now();
//			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
//
//			Long id = physical.getTest_id();
//
//			if (id != null) {
//				physicalobject = absorbentbleachedcottonreportCLF005ParentRepo.findById(id)
//						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//			}
//
////			
//
//			BeanUtils.copyProperties(physical, physicalobject, IgnoreProps);
//
//			if (id != null ) {
//				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
//
//					physicalobject.setQc_status(AppConstantsQc.waitingStatus);
//
//					physicalobject.setChemist_submit_on(date);
//					physicalobject.setChemist_submit_id(userId);
//					physicalobject.setChemist_sign(userName);
//					physicalobject.setChemist_status(AppConstantsQc.chemistSubmitted);
//
//					absorbentbleachedcottonreportCLF005ParentRepo.save(physicalobject);
//					absorbentbleachedcottonreportHistoryCLF005 absorbentbleachedcottonreportCLF005History = new absorbentbleachedcottonreportHistoryCLF005();
//					BeanUtils.copyProperties(physical, absorbentbleachedcottonreportCLF005History);
//					absorbentbleachedcottonreportCLF005History.setTest_id(null);	
//					int version = absorbentbleachedcottonreportHistoryCLF005Repo
//							.getMaximumVersion(physical.getTestedDate()).map(temp -> temp + 1).orElse(1);
//					absorbentbleachedcottonreportCLF005History.setVersion(version);
//					absorbentbleachedcottonreportHistoryCLF005Repo.save(absorbentbleachedcottonreportCLF005History);
//
//				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
//
//					physicalobject.setQc_status(AppConstantsQc.waitingStatus);
//
//					physicalobject.setMicro_submit_on(date);
//					physicalobject.setMicro_submit_id(userId);
//					physicalobject.setMicro_sign(userName);
//					physicalobject.setMicro_status(AppConstantsQc.microBiologistSubmitted);
//
//					absorbentbleachedcottonreportCLF005ParentRepo.save(physicalobject);
//					absorbentbleachedcottonreportHistoryCLF005 absorbentbleachedcottonreportCLF005History = new absorbentbleachedcottonreportHistoryCLF005();
//					BeanUtils.copyProperties(physical, absorbentbleachedcottonreportCLF005History);
//					absorbentbleachedcottonreportCLF005History.setTest_id(null);
//					int version = absorbentbleachedcottonreportHistoryCLF005Repo
//							.getMaximumVersion(physical.getTestedDate()).map(temp -> temp + 1).orElse(1);
//					absorbentbleachedcottonreportCLF005History.setVersion(version);
//					absorbentbleachedcottonreportHistoryCLF005Repo.save(absorbentbleachedcottonreportCLF005History);
//
//				}
//
//				else {
//					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
//							HttpStatus.BAD_REQUEST);
//				}
//			} else {
//				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
//
//					physical.setQc_status(AppConstantsQc.waitingStatus);
//
//					physical.setChemist_submit_on(date);
//					physical.setChemist_submit_id(userId);
//					physical.setChemist_sign(userName);
//					physical.setChemist_status(AppConstantsQc.chemistSubmitted);
//
//					physical = absorbentbleachedcottonreportCLF005ParentRepo.save(physical);
//					absorbentbleachedcottonreportHistoryCLF005 absorbentbleachedcottonreportCLF005History = new absorbentbleachedcottonreportHistoryCLF005();
//					BeanUtils.copyProperties(physical, absorbentbleachedcottonreportCLF005History);
//					absorbentbleachedcottonreportCLF005History.setTest_id(null);
//					int version = absorbentbleachedcottonreportHistoryCLF005Repo
//							.getMaximumVersion(physical.getTestedDate()).map(temp -> temp + 1).orElse(1);
//					absorbentbleachedcottonreportCLF005History.setVersion(version);
//					absorbentbleachedcottonreportHistoryCLF005Repo.save(absorbentbleachedcottonreportCLF005History);
//
//				} else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
//
//					physical.setQc_status(AppConstantsQc.waitingStatus);
//
//					physical.setMicro_submit_on(date);
//					physical.setMicro_submit_id(userId);
//					physical.setMicro_sign(userName);
//					physical.setMicro_status(AppConstantsQc.microBiologistSubmitted);
//
//					physical=	absorbentbleachedcottonreportCLF005ParentRepo.save(physical);
//					absorbentbleachedcottonreportHistoryCLF005 absorbentbleachedcottonreportCLF005History = new absorbentbleachedcottonreportHistoryCLF005();
//					BeanUtils.copyProperties(physical, absorbentbleachedcottonreportCLF005History);
//					absorbentbleachedcottonreportCLF005History.setTest_id(null);
//					int version = absorbentbleachedcottonreportHistoryCLF005Repo
//							.getMaximumVersion(physical.getTestedDate()).map(temp -> temp + 1).orElse(1);
//					absorbentbleachedcottonreportCLF005History.setVersion(version);
//					absorbentbleachedcottonreportHistoryCLF005Repo.save(absorbentbleachedcottonreportCLF005History);
//
//				}
//
//				else {
//					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
//							HttpStatus.BAD_REQUEST);
//				}
//			}
//
//		} catch (Exception ex) {
//
//			String msg = ex.getMessage();
//			logger.error("Unable to Submit QC Chemical Test" + msg);
//
//			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
//					HttpStatus.BAD_REQUEST);
//		}
//
//		return new ResponseEntity(physical, HttpStatus.OK);
//
//	}

	@Autowired
	absorbentbleachedcottonreportCLF005ParenthistoryRepo absorbentbleachedcottonreportCLF005ParenthistoryRepo;
	
	
	


	public ResponseEntity<?> saveChemicalTestCLF005(absorbentbleachedcottonreportCLF005Parent absorbentbleachedcottonreportCLF005, HttpServletRequest http) {
	    SCAUtil sca = new SCAUtil();
	    LocalDateTime currentDate = LocalDateTime.now();
	    Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	    String userRole = getUserRole();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);
	    
	    try {
	        
	    	absorbentbleachedcottonreportCLF005Parent physicalobject = new absorbentbleachedcottonreportCLF005Parent();
	            Long id = absorbentbleachedcottonreportCLF005.getPa_id();

	            if (id != null) {
	                physicalobject = absorbentbleachedcottonreportCLF005ParentRepo.findById(id)
	                        .orElseThrow(() -> new EntityNotFoundException("Test not found"));
	            }
	            BeanUtils.copyProperties(absorbentbleachedcottonreportCLF005, physicalobject, IgnoreProps);

	            if (id != null) {
	            	
					for (absorbentbleachedcottonreportCLF005 micro : absorbentbleachedcottonreportCLF005.getAbsorb()){
						if (micro.getTest_id() != null) {
							absorbentbleachedcottonreportCLF005 obe = absorbentbleachedcottonreportCLF005Repo.findById(micro.getTest_id())
									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
							BeanUtils.copyProperties(micro, obe);
							absorbentbleachedcottonreportCLF005Repo.save(micro);
						} else {
							micro.setPa_id(absorbentbleachedcottonreportCLF005.getPa_id());
							absorbentbleachedcottonreportCLF005Repo.save(micro);
						}
					}
	            	
	            	
	                if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
	                    physicalobject.setChemist_saved_on(date);
	                    physicalobject.setChemist_saved_id(userId);
	                    physicalobject.setChemist_sign(userName);
						physicalobject.setChemist_saved_by(userName);
	                    physicalobject.setChemist_status(AppConstantsQc.chemistSave);
	                    absorbentbleachedcottonreportCLF005ParentRepo.save(physicalobject);
	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, userRole + " cannot submit Details"), HttpStatus.BAD_REQUEST);
	                }
	            } else {
	                if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
	                	absorbentbleachedcottonreportCLF005.setChemist_saved_on(date);
	                	absorbentbleachedcottonreportCLF005.setChemist_saved_id(userId);
	                	absorbentbleachedcottonreportCLF005.setChemist_sign(userName);
	                	absorbentbleachedcottonreportCLF005.setChemist_status(AppConstantsQc.chemistSave);
	                    absorbentbleachedcottonreportCLF005ParentRepo.save(absorbentbleachedcottonreportCLF005);
	                    
	                    for (absorbentbleachedcottonreportCLF005 micro : absorbentbleachedcottonreportCLF005.getAbsorb()){
							if (micro.getTest_id() != null) {
								absorbentbleachedcottonreportCLF005 obe = absorbentbleachedcottonreportCLF005Repo.findById(micro.getTest_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								BeanUtils.copyProperties(micro, obe);
								absorbentbleachedcottonreportCLF005Repo.save(micro);
							} else {
								micro.setPa_id(absorbentbleachedcottonreportCLF005.getPa_id());
								absorbentbleachedcottonreportCLF005Repo.save(micro);
							}
						}
	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, userRole + " cannot submit Details"), HttpStatus.BAD_REQUEST);
	                }
	            }
	        
	        
	        
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to Save QC Chemical Test: " + msg);
	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Submit details: " + msg), HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(absorbentbleachedcottonreportCLF005, HttpStatus.OK);
	}
	
	@Autowired
	absorbentbleachedcottonreportCLF005Repo absorbentbleachedcottonreportCLF005Repo;
	
	

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestCLF005(absorbentbleachedcottonreportCLF005Parent absorbentbleachedcottonreportCLF005, HttpServletRequest http) {
	    SCAUtil sca = new SCAUtil();
	    LocalDateTime currentDate = LocalDateTime.now();
	    Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());
	    String userRole = getUserRole();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);
	    
	    try {
	        
	    	absorbentbleachedcottonreportCLF005Parent physicalobject = new absorbentbleachedcottonreportCLF005Parent();
	            Long id = absorbentbleachedcottonreportCLF005.getPa_id();

	            if (id != null) {
	                physicalobject = absorbentbleachedcottonreportCLF005ParentRepo.findById(id)
	                        .orElseThrow(() -> new EntityNotFoundException("Test not found"));
	            }
	            BeanUtils.copyProperties(absorbentbleachedcottonreportCLF005, physicalobject, IgnoreProps);

	            if (id != null) {
	                if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
	                    physicalobject.setQc_status(AppConstantsQc.waitingStatus);
	                    physicalobject.setChemist_submit_on(date);
	                    physicalobject.setChemist_submit_id(userId);
	                    physicalobject.setChemist_sign(userName);
	                    physicalobject.setChemist_submit_by(userName); 
	                    physicalobject.setChemist_status(AppConstantsQc.chemistSubmitted);
	                    physicalobject.setAbsorb(null); 
	                    absorbentbleachedcottonreportCLF005ParentRepo.save(physicalobject);
	                    
	                            
	                    
	                    absorbentbleachedcottonreportCLF005Parenthistory absorbentbleachedcottonreportCLF005History = new absorbentbleachedcottonreportCLF005Parenthistory();
	       
	            		
//	            		if( absorbentbleachedcottonreportCLF005ParenthistoryRepo
//								.fetchLastSubmittedRecordPhNumber(physicalobject.getBmr())!=null) {
//	            			
//	                 		absorbentbleachedcottonreportCLF005History = absorbentbleachedcottonreportCLF005ParenthistoryRepo
//									.fetchLastSubmittedRecordPhNumber(physicalobject.getBmr());
//	            		}
	            		
	            		absorbentbleachedcottonreportCLF005Parenthistory result =absorbentbleachedcottonreportCLF005ParenthistoryRepo
								.fetchLastSubmittedRecordPhNumber(physicalobject.getBmr());
						try {	
							if (result != null && result.getPa_id() != null) { // Check any primary field or version
								absorbentbleachedcottonreportCLF005History = result;
						}
							}catch(Exception e ) {}
	            		
	            	    BeanUtils.copyProperties(physicalobject, absorbentbleachedcottonreportCLF005History, "pa_id");
	            	    // absorbentbleachedcottonreportCLF005History.setPa_id(null);
	            	    int version = absorbentbleachedcottonreportCLF005ParenthistoryRepo
	            	            .getMaximumVersion(absorbentbleachedcottonreportCLF005.getBmr()).map(temp -> temp + 1).orElse(1);
	            	    absorbentbleachedcottonreportCLF005History.setVersion(version);
	            	    absorbentbleachedcottonreportCLF005ParenthistoryRepo.save(absorbentbleachedcottonreportCLF005History);
	                    
						for (absorbentbleachedcottonreportCLF005 micro :absorbentbleachedcottonreportCLF005.getAbsorb()) {
							if (micro.getTest_id() != null) {
								absorbentbleachedcottonreportCLF005 obe = absorbentbleachedcottonreportCLF005Repo.findById(micro.getTest_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								absorbentbleachedcottonreportHistoryCLF005 microHistory = new absorbentbleachedcottonreportHistoryCLF005();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								absorbentbleachedcottonreportCLF005Repo.save(micro);
								microHistory.setPa_id(absorbentbleachedcottonreportCLF005History.getPa_id());	
								microHistory.setTest_id(null);
								absorbentbleachedcottonreportHistoryCLF005Repo.save(microHistory);
							} else {
								micro.setPa_id(physicalobject.getPa_id());
								absorbentbleachedcottonreportHistoryCLF005 microHistory = new absorbentbleachedcottonreportHistoryCLF005();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setPa_id(absorbentbleachedcottonreportCLF005History.getPa_id());
								absorbentbleachedcottonreportHistoryCLF005Repo.save(microHistory);
								absorbentbleachedcottonreportCLF005Repo.save(micro);
							}
						}
	                    

	                } else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
	                    physicalobject.setQc_status(AppConstantsQc.waitingStatus);
	                    physicalobject.setMicro_submit_on(date);
	                    physicalobject.setMicro_submit_id(userId);
	                    physicalobject.setMicro_sign(userName);
	                    physicalobject.setMicro_submit_by(userName); 
	                    physicalobject.setMicro_status(AppConstantsQc.microBiologistSubmitted);
	                    physicalobject.setAbsorb(null);                  
	                    absorbentbleachedcottonreportCLF005ParentRepo.save(physicalobject);
	                    
	                    absorbentbleachedcottonreportCLF005Parenthistory absorbentbleachedcottonreportCLF005History = new absorbentbleachedcottonreportCLF005Parenthistory();
//	            		if( absorbentbleachedcottonreportCLF005ParenthistoryRepo
//								.fetchLastSubmittedRecordPhNumber(physicalobject.getBmr())!=null) {
//	            			
//	                 		absorbentbleachedcottonreportCLF005History = absorbentbleachedcottonreportCLF005ParenthistoryRepo
//									.fetchLastSubmittedRecordPhNumber(physicalobject.getBmr());
//	            		}
	                    
	                	absorbentbleachedcottonreportCLF005Parenthistory result =absorbentbleachedcottonreportCLF005ParenthistoryRepo
								.fetchLastSubmittedRecordPhNumber(physicalobject.getBmr());
						try {	
							if (result != null && result.getPa_id() != null) { // Check any primary field or version
								absorbentbleachedcottonreportCLF005History = result;
						}
							}catch(Exception e ) {}
	                    
	            	    BeanUtils.copyProperties(physicalobject, absorbentbleachedcottonreportCLF005History, "pa_id");
	            	    // absorbentbleachedcottonreportCLF005History.setPa_id(null);
	            	    int version = absorbentbleachedcottonreportHistoryCLF005Repo
	            	            .getMaximumVersion(absorbentbleachedcottonreportCLF005.getBmr()).map(temp -> temp + 1).orElse(1);
	            	    absorbentbleachedcottonreportCLF005History.setVersion(version);
	            	    absorbentbleachedcottonreportCLF005ParenthistoryRepo.save(absorbentbleachedcottonreportCLF005History);
	                    
						for (absorbentbleachedcottonreportCLF005 micro :absorbentbleachedcottonreportCLF005.getAbsorb()) {
							if (micro.getTest_id() != null) {
								absorbentbleachedcottonreportCLF005 obe = absorbentbleachedcottonreportCLF005Repo.findById(micro.getTest_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								absorbentbleachedcottonreportHistoryCLF005 microHistory = new absorbentbleachedcottonreportHistoryCLF005();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								absorbentbleachedcottonreportCLF005Repo.save(micro);
								microHistory.setPa_id(absorbentbleachedcottonreportCLF005History.getPa_id());	
								microHistory.setTest_id(null);
								absorbentbleachedcottonreportHistoryCLF005Repo.save(microHistory);
							} else {
								micro.setPa_id(physicalobject.getPa_id());
								absorbentbleachedcottonreportHistoryCLF005 microHistory = new absorbentbleachedcottonreportHistoryCLF005();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setPa_id(absorbentbleachedcottonreportCLF005History.getPa_id());
								absorbentbleachedcottonreportHistoryCLF005Repo.save(microHistory);
								absorbentbleachedcottonreportCLF005Repo.save(micro);
							}
						}
	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, userRole + " cannot submit Details"), HttpStatus.BAD_REQUEST);
	                }
	            } else {
	                if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {
	                	absorbentbleachedcottonreportCLF005.setQc_status(AppConstantsQc.waitingStatus);
	                    absorbentbleachedcottonreportCLF005.setChemist_submit_on(date);
	                    absorbentbleachedcottonreportCLF005.setChemist_submit_id(userId);
	                    absorbentbleachedcottonreportCLF005.setChemist_sign(userName);
	                    absorbentbleachedcottonreportCLF005.setChemist_submit_by(userName); 
	                    absorbentbleachedcottonreportCLF005.setChemist_status(AppConstantsQc.chemistSubmitted);
	                    absorbentbleachedcottonreportCLF005 = absorbentbleachedcottonreportCLF005ParentRepo.save(absorbentbleachedcottonreportCLF005);

	                    absorbentbleachedcottonreportCLF005Parenthistory absorbentbleachedcottonreportCLF005History = new absorbentbleachedcottonreportCLF005Parenthistory();
//	            		if( absorbentbleachedcottonreportCLF005ParenthistoryRepo
//								.fetchLastSubmittedRecordPhNumber(absorbentbleachedcottonreportCLF005.getBmr())!=null) {
//	            			
//	                 		absorbentbleachedcottonreportCLF005History = absorbentbleachedcottonreportCLF005ParenthistoryRepo
//									.fetchLastSubmittedRecordPhNumber(absorbentbleachedcottonreportCLF005.getBmr());
//	            		}
	                    
	                	absorbentbleachedcottonreportCLF005Parenthistory result =absorbentbleachedcottonreportCLF005ParenthistoryRepo
								.fetchLastSubmittedRecordPhNumber(physicalobject.getBmr());
						try {	
							if (result != null && result.getPa_id() != null) { // Check any primary field or version
								absorbentbleachedcottonreportCLF005History = result;
						}
							}catch(Exception e ) {}
	                    
	                    BeanUtils.copyProperties(absorbentbleachedcottonreportCLF005, absorbentbleachedcottonreportCLF005History, "pa_id");
	            	    // absorbentbleachedcottonreportCLF005History.setPa_id(null);
	            	    int version = absorbentbleachedcottonreportHistoryCLF005Repo
	            	            .getMaximumVersion(absorbentbleachedcottonreportCLF005.getBmr()).map(temp -> temp + 1).orElse(1);
	            	    absorbentbleachedcottonreportCLF005History.setVersion(version);
	            	    absorbentbleachedcottonreportCLF005ParenthistoryRepo.save(absorbentbleachedcottonreportCLF005History);
	                    
	                    
						for (absorbentbleachedcottonreportCLF005 micro :absorbentbleachedcottonreportCLF005.getAbsorb()) {
							if (micro.getTest_id() != null) {
								absorbentbleachedcottonreportCLF005 obe = absorbentbleachedcottonreportCLF005Repo.findById(micro.getTest_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								absorbentbleachedcottonreportHistoryCLF005 microHistory = new absorbentbleachedcottonreportHistoryCLF005();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								absorbentbleachedcottonreportCLF005Repo.save(micro);
								microHistory.setPa_id(absorbentbleachedcottonreportCLF005History.getPa_id());	
								microHistory.setTest_id(null);
								absorbentbleachedcottonreportHistoryCLF005Repo.save(microHistory);
							} else {
								micro.setPa_id(absorbentbleachedcottonreportCLF005.getPa_id());
								absorbentbleachedcottonreportHistoryCLF005 microHistory = new absorbentbleachedcottonreportHistoryCLF005();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setPa_id(absorbentbleachedcottonreportCLF005History.getPa_id());
								absorbentbleachedcottonreportHistoryCLF005Repo.save(microHistory);
								absorbentbleachedcottonreportCLF005Repo.save(micro);
							}
						}
	                    
	                } else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
	                	absorbentbleachedcottonreportCLF005.setQc_status(AppConstantsQc.waitingStatus);
	                	absorbentbleachedcottonreportCLF005.setMicro_submit_on(date);
	                	absorbentbleachedcottonreportCLF005.setMicro_submit_id(userId);
	                	absorbentbleachedcottonreportCLF005.setMicro_sign(userName);
	                	absorbentbleachedcottonreportCLF005.setMicro_submit_by(userName);
	                	absorbentbleachedcottonreportCLF005.setMicro_status(AppConstantsQc.microBiologistSubmitted);
	                	absorbentbleachedcottonreportCLF005 = absorbentbleachedcottonreportCLF005ParentRepo.save(absorbentbleachedcottonreportCLF005);
	                    
	                	absorbentbleachedcottonreportCLF005Parenthistory absorbentbleachedcottonreportCLF005History = new absorbentbleachedcottonreportCLF005Parenthistory();
//	            		if( absorbentbleachedcottonreportCLF005ParenthistoryRepo
//								.fetchLastSubmittedRecordPhNumber(absorbentbleachedcottonreportCLF005.getBmr())!=null) {
//	            			
//	                 		absorbentbleachedcottonreportCLF005History = absorbentbleachedcottonreportCLF005ParenthistoryRepo
//									.fetchLastSubmittedRecordPhNumber(absorbentbleachedcottonreportCLF005.getBmr());
//	            		}
	                	
	                	absorbentbleachedcottonreportCLF005Parenthistory result =absorbentbleachedcottonreportCLF005ParenthistoryRepo
								.fetchLastSubmittedRecordPhNumber(physicalobject.getBmr());
						try {	
							if (result != null && result.getPa_id() != null) { // Check any primary field or version
								absorbentbleachedcottonreportCLF005History = result;
						}
							}catch(Exception e ) {}
	                	
	                	BeanUtils.copyProperties(absorbentbleachedcottonreportCLF005, absorbentbleachedcottonreportCLF005History, "pa_id");
	            	    // absorbentbleachedcottonreportCLF005History.setPa_id(null);
	            	    int version = absorbentbleachedcottonreportHistoryCLF005Repo
	            	            .getMaximumVersion(absorbentbleachedcottonreportCLF005.getBmr()).map(temp -> temp + 1).orElse(1);
	            	    absorbentbleachedcottonreportCLF005History.setVersion(version);
	            	    absorbentbleachedcottonreportCLF005ParenthistoryRepo.save(absorbentbleachedcottonreportCLF005History);
	                    
						for (absorbentbleachedcottonreportCLF005 micro :absorbentbleachedcottonreportCLF005.getAbsorb()) {
							if (micro.getTest_id() != null) {
								absorbentbleachedcottonreportCLF005 obe = absorbentbleachedcottonreportCLF005Repo.findById(micro.getTest_id())
										.orElseThrow(() -> new EntityNotFoundException("Test not found"));
								absorbentbleachedcottonreportHistoryCLF005 microHistory = new absorbentbleachedcottonreportHistoryCLF005();
								BeanUtils.copyProperties(micro, obe);
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								absorbentbleachedcottonreportCLF005Repo.save(micro);
								microHistory.setPa_id(absorbentbleachedcottonreportCLF005History.getPa_id());	
								microHistory.setTest_id(null);
								absorbentbleachedcottonreportHistoryCLF005Repo.save(microHistory);
							} else {
								micro.setPa_id(absorbentbleachedcottonreportCLF005.getPa_id());
								absorbentbleachedcottonreportHistoryCLF005 microHistory = new absorbentbleachedcottonreportHistoryCLF005();
								BeanUtils.copyProperties(micro, microHistory , "micro_id");
								microHistory.setPa_id(absorbentbleachedcottonreportCLF005History.getPa_id());
								absorbentbleachedcottonreportHistoryCLF005Repo.save(microHistory);
								absorbentbleachedcottonreportCLF005Repo.save(micro);
							}
						}
	                    
	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, userRole + " cannot submit Details"), HttpStatus.BAD_REQUEST);
	                }
	            }
	        
	            
				try {

					qcmailfunction.sendEmailToF005(absorbentbleachedcottonreportCLF005);
				} catch (Exception ex) {
					return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
							HttpStatus.OK);
				}
	            
	    } catch (Exception ex) {
	        String msg = ex.getMessage();
	        logger.error("Unable to Submit QC Chemical Test: " + msg);
	        return new ResponseEntity<>(new ApiResponse(false, "Failed to Submit details: " + msg), HttpStatus.BAD_REQUEST);
	    }

	    return new ResponseEntity<>(absorbentbleachedcottonreportCLF005, HttpStatus.OK);
	}

	private void saveHistory(absorbentbleachedcottonreportCLF005Parent physical) {
	    absorbentbleachedcottonreportHistoryCLF005 absorbentbleachedcottonreportCLF005History = new absorbentbleachedcottonreportHistoryCLF005();
	    BeanUtils.copyProperties(physical, absorbentbleachedcottonreportCLF005History);
	    absorbentbleachedcottonreportCLF005History.setTest_id(null);
	    int version = absorbentbleachedcottonreportHistoryCLF005Repo
	            .getMaximumVersion(physical.getTestedDate()).map(temp -> temp + 1).orElse(1);
	    absorbentbleachedcottonreportCLF005History.setVersion(version);
	    absorbentbleachedcottonreportHistoryCLF005Repo.save(absorbentbleachedcottonreportCLF005History);
	}

	
	
	public ResponseEntity<?> getTestByBatchIdCLF05(@Valid String id,String rg) {
		
		  id = (id == null || id.trim().isEmpty()) ? null : id.trim();
		    rg = (rg == null || rg.trim().isEmpty()) ? null : rg.trim();
		    List<absorbentbleachedcottonreportCLF005Parent> absorbentbleachedcottonreportCLF005 = absorbentbleachedcottonreportCLF005ParentRepo
				.findByBatch(id,rg);
		try {
			return new ResponseEntity(absorbentbleachedcottonreportCLF005, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printCLF05(@Valid String id , String rg) {
	
	    
	    id = (id == null || id.trim().isEmpty()) ? null : id.trim();
	    rg = (rg == null || rg.trim().isEmpty()) ? null : rg.trim();
	    
		
		List<absorbentbleachedcottonreportCLF005Parent> absorbentbleachedcottonreportCLF005 = absorbentbleachedcottonreportCLF005ParentRepo
				.print(id,rg);
		try {
			return new ResponseEntity(absorbentbleachedcottonreportCLF005, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdCLF05(@Valid Long id) {
		absorbentbleachedcottonreportCLF005Parent absorbentbleachedcottonreportCLF005 = absorbentbleachedcottonreportCLF005ParentRepo
				.findById(id).orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(absorbentbleachedcottonreportCLF005, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	public ResponseEntity<?> getPDECLF05(@Valid String id) {
		


		List<Map<String, Object>> responseList = new ArrayList<>();
		
		
		
		try {
			if(id!=null) {
				List<Object[]> orderResponse=absorbentbleachedcottonreportCLF005ParentRepo.pde(id);
			

			for (Object[] record : orderResponse) {
	            Map<String, Object> map = new HashMap<>();
	            map.put("batchno", record[0]);
	            map.put("mixing", record[1]);
	            map.put("softner", record[2]);
	            map.put("local_export", record[2]);
	          
	            responseList.add(map);
	        }
		}
			return new ResponseEntity(responseList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get PDE Data" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getallTestCLF005(HttpServletRequest http) {
		List<absorbentbleachedcottonreportCLF005Parent> absorbentbleachedcottonreportCLF005 = absorbentbleachedcottonreportCLF005ParentRepo
				.getAll();
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		if (userRole.equals("ROLE_CHEMIST")) {

			absorbentbleachedcottonreportCLF005 = absorbentbleachedcottonreportCLF005ParentRepo.chemistSummary();
		}

		else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			absorbentbleachedcottonreportCLF005 = absorbentbleachedcottonreportCLF005ParentRepo.exeManagerSummary();
		} 
		
		else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

			absorbentbleachedcottonreportCLF005 = absorbentbleachedcottonreportCLF005ParentRepo.microSummary();
		}
		
		
		try {
			return new ResponseEntity(absorbentbleachedcottonreportCLF005, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	

	public ResponseEntity<?> approveChemicalTestCLF05(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		absorbentbleachedcottonreportCLF005Parent physicalTest = new absorbentbleachedcottonreportCLF005Parent();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			physicalTest = absorbentbleachedcottonreportCLF005ParentRepo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			absorbentbleachedcottonreportCLF005Parenthistory absorbentbleachedcottonreportCLF005History = new absorbentbleachedcottonreportCLF005Parenthistory();

			String supervisiorStatus = physicalTest.getChemist_status() != null ? physicalTest.getChemist_status()
					: physicalTest.getMicro_status();

			String hodStatus = physicalTest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager") || userRole.equalsIgnoreCase("QA_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						physicalTest.setQc_status(AppConstantsQc.QCApprove);
						physicalTest.setQc_submit_on(date);
						physicalTest.setQc_submit_by(userName);
						physicalTest.setQc_submit_id(userId);	
						physicalTest.setQc_sign(userName);

						absorbentbleachedcottonreportCLF005ParentRepo.save(physicalTest);

						absorbentbleachedcottonreportCLF005History = absorbentbleachedcottonreportCLF005ParenthistoryRepo
								.fetchLastSubmittedRecordPhNumber(physicalTest.getBmr());

						absorbentbleachedcottonreportCLF005History.setQc_status(AppConstantsQc.QCApprove);
						absorbentbleachedcottonreportCLF005History.setQc_submit_on(date);
						absorbentbleachedcottonreportCLF005History.setQc_submit_by(userName);
						absorbentbleachedcottonreportCLF005History.setQc_submit_id(userId);
						absorbentbleachedcottonreportCLF005History.setQc_sign(userName);

						absorbentbleachedcottonreportCLF005ParenthistoryRepo.save(absorbentbleachedcottonreportCLF005History);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						physicalTest.setReason(reason);
						physicalTest.setQc_status(AppConstantsQc.QCRejected);
						physicalTest.setQc_submit_on(date);
						physicalTest.setQc_submit_id(userId);
						physicalTest.setQc_submit_by(userName);

						physicalTest.setQc_sign(userName);

						absorbentbleachedcottonreportCLF005ParentRepo.save(physicalTest);

//						absorbentbleachedcottonreportCLF005History = absorbentbleachedcottonreportCLF005ParenthistoryRepo
//								.fetchLastSubmittedRecordPhNumber(physicalTest.getBmr());

						absorbentbleachedcottonreportCLF005History.setQc_status(AppConstantsQc.QCRejected);
						absorbentbleachedcottonreportCLF005History.setReason(reason);
						absorbentbleachedcottonreportCLF005History.setQc_submit_on(date);
						absorbentbleachedcottonreportCLF005History.setQc_submit_by(userName);
						absorbentbleachedcottonreportCLF005History.setQc_submit_id(userId);
						absorbentbleachedcottonreportCLF005History.setQc_sign(userName);

						absorbentbleachedcottonreportCLF005ParenthistoryRepo.save(absorbentbleachedcottonreportCLF005History);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}

	// ----------------------------------------
	// AR-F014-----------------------------------------------------------------

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveChemicalTestARF014(briquettesanalysisreportARF014 physical, HttpServletRequest http) {

		briquettesanalysisreportARF014 physicalobject = new briquettesanalysisreportARF014();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = physical.getTest_id();

			if (id != null) {
				physicalobject = briquettesanalysisreportARF014Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(physical, physicalobject, IgnoreProps);
			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					

					physicalobject.setFormat("BRIQUETTES ANALYSIS REPORT");
					physicalobject.setFormat_no("PH-QCL01-AR-014");
					physicalobject.setRef_sop_no("PH-QCL01-D-05");
					physicalobject.setChemist_saved_on(date);
					physicalobject.setChemist_saved_id(userId);
					physicalobject.setChemist_sign(userName);

					physicalobject.setChemist_status(AppConstantsQc.chemistSave);

					briquettesanalysisreportARF014Repo.save(physicalobject);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					

					physical.setFormat("BRIQUETTES ANALYSIS REPORT");
					physical.setFormat_no("PH-QCL01-AR-014");
					physical.setRef_sop_no("PH-QCL01-D-05");
					physical.setChemist_saved_on(date);
					physical.setChemist_saved_id(userId);
					physical.setChemist_sign(userName);

					physical.setChemist_status(AppConstantsQc.chemistSave);

					briquettesanalysisreportARF014Repo.save(physical);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(physical, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestARF014(@Valid briquettesanalysisreportARF014 physical,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		briquettesanalysisreportARF014 physicalobject = new briquettesanalysisreportARF014();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = physical.getTest_id();

			if (id != null) {
				physicalobject = briquettesanalysisreportARF014Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

//				physical.setCreatedAt(physicalobject.getCreatedAt());

			BeanUtils.copyProperties(physical, physicalobject, IgnoreProps);

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					physicalobject.setQc_status(AppConstantsQc.waitingStatus);

					physicalobject.setFormat("BRIQUETTES ANALYSIS REPORT");
					physicalobject.setFormat_no("PH-QCL01-AR-014");
					physicalobject.setRef_sop_no("PH-QCL01-D-05");
					physicalobject.setChemist_submit_on(date);
					physicalobject.setChemist_submit_id(userId);
					physicalobject.setChemist_sign(userName);
					physicalobject.setChemist_submit_by(userName);	
					physicalobject.setChemist_status(AppConstantsQc.chemistSubmitted);

					physicalobject.setQc_sign(null);	
					briquettesanalysisreportARF014Repo.save(physicalobject);
					briquettesanalysisreportHistoryARF014 briquettesanalysisreportHistory = new briquettesanalysisreportHistoryARF014();
					BeanUtils.copyProperties(physicalobject, briquettesanalysisreportHistory);

					int version = briquettesanalysisreportHistoryARF014
							.getMaximumVersion(physical.getSupplier_name(), physical.getDate()).map(temp -> temp + 1)
							.orElse(1);
					briquettesanalysisreportHistory.setVersion(version);
					briquettesanalysisreportHistory.setTest_id(null);	
					briquettesanalysisreportHistoryARF014.save(briquettesanalysisreportHistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					physical.setQc_status(AppConstantsQc.waitingStatus);

					physical.setChemist_submit_on(date);
					physical.setChemist_submit_id(userId);
					physical.setChemist_sign(userName);
					physical.setFormat("BRIQUETTES ANALYSIS REPORT");
					physical.setFormat_no("PH-QCL01-AR-014");
					physical.setRef_sop_no("PH-QCL01-D-05");
					physical.setChemist_submit_by(userName);	
					physical.setChemist_status(AppConstantsQc.chemistSubmitted);
					physical.setQc_sign(null);

					briquettesanalysisreportARF014Repo.save(physical);
					briquettesanalysisreportHistoryARF014 absorbentbleachedcottonreportCLF005History = new briquettesanalysisreportHistoryARF014();
					BeanUtils.copyProperties(physical, absorbentbleachedcottonreportCLF005History);

					int version = briquettesanalysisreportHistoryARF014
							.getMaximumVersion(physical.getSupplier_name(), physical.getDate()).map(temp -> temp + 1)
							.orElse(1);
					absorbentbleachedcottonreportCLF005History.setVersion(version);
					absorbentbleachedcottonreportCLF005History.setTest_id(null);	
					briquettesanalysisreportHistoryARF014.save(absorbentbleachedcottonreportCLF005History);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}
			
			try {

				qcmailfunction.sendEmailToARF014(physical);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(physical, HttpStatus.OK);

	}

	public ResponseEntity<?> getTestByBatchIdF014(@Valid String supplier) {
		briquettesanalysisreportARF014 briquettesanalysisreportARF014 = briquettesanalysisreportARF014Repo
				.findByBatch(supplier);
		try {
			return new ResponseEntity(briquettesanalysisreportARF014, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	


	public ResponseEntity<?> getPDEF014() {
		
		List<Map<String, Object>> responseList = new ArrayList<>();
		
		
		
		try {
			
			  List<Object[]> orderResponse = briquettesanalysisreportARF014Repo.pde();
			    Map<String, Map<String, Object>> supplierMap = new HashMap<>();
			    Map<String, Integer> supplierCountMap = new HashMap<>();

			    // First, count the occurrences of each supplier
			    for (Object[] record : orderResponse) {
			        String supplier = (String) record[1]; // supplier (which was invoice_no before swap)
			        supplierCountMap.put(supplier, supplierCountMap.getOrDefault(supplier, 0) + 1);
			    }

			    // Now, process the records and create the final response
			    for (Object[] record : orderResponse) {
			        String supplier = (String) record[1];  // supplier
			        String invoiceNo = (String) record[4]; // invoice_no

			        if (supplierCountMap.get(supplier) > 1) {
			            // If the supplier has multiple invoices, group them
			            if (supplierMap.containsKey(supplier)) {
			                // Supplier already exists, add invoice_no to the existing list
			                Map<String, Object> existingSupplierData = supplierMap.get(supplier);
			                List<Map<String, String>> invoiceList = (List<Map<String, String>>) existingSupplierData.get("invoice_no");

			                // Add the new invoice_no
			                Map<String, String> invoiceMap = new HashMap<>();
			                invoiceMap.put("invoice_no", invoiceNo);
			                invoiceList.add(invoiceMap);
			            } else {
			                // New supplier with multiple invoices, create a new entry with a list for invoice_no
			                Map<String, Object> supplierData = new HashMap<>();
			                supplierData.put("supplier", supplier);

			                // Create a list for invoice_no
			                List<Map<String, String>> invoiceList = new ArrayList<>();
			                Map<String, String> invoiceMap = new HashMap<>();
			                invoiceMap.put("invoice_no", invoiceNo);
			                invoiceList.add(invoiceMap);

			                supplierData.put("invoice_no", invoiceList);
			                supplierMap.put(supplier, supplierData);
			            }
			        } else {
			            // Supplier is unique, add it as a normal object with a single invoice
			            Map<String, Object> supplierData = new HashMap<>();
			            supplierData.put("supplier", supplier);

			            // Create a list with one invoice_no
			            List<Map<String, String>> invoiceList = new ArrayList<>();
			            Map<String, String> invoiceMap = new HashMap<>();
			            invoiceMap.put("invoice_no", invoiceNo);
			            invoiceList.add(invoiceMap);

			            supplierData.put("invoice_no", invoiceList);
			            supplierMap.put(supplier, supplierData);
			        }
			    }

			    // Add all supplier data to the responseList
			    responseList.addAll(supplierMap.values());


			    return new ResponseEntity<>(responseList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get PDE Data" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	
	public ResponseEntity<?> printF014(String invoice ,String supplier) {
		invoice = (invoice == null || invoice.trim().isEmpty()) ? null : invoice.trim();
		supplier = (supplier == null || supplier.trim().isEmpty()) ? null : supplier.trim();

		
		
		List<briquettesanalysisreportARF014> briquettesanalysisreportARF014 = briquettesanalysisreportARF014Repo
				.print(invoice,supplier);
		try {
			return new ResponseEntity(briquettesanalysisreportARF014, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdF014(@Valid Long id) {
		briquettesanalysisreportARF014 briquettesanalysisreportARF014 = briquettesanalysisreportARF014Repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(briquettesanalysisreportARF014, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestF014() {
		List<briquettesanalysisreportARF014> briquettesanalysisreportARF014 = briquettesanalysisreportARF014Repo
				.getAll();
		try {
			return new ResponseEntity(briquettesanalysisreportARF014, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	public ResponseEntity<?> getallTestF014(HttpServletRequest http) {
		
		List<briquettesanalysisreportARF014> briquettesanalysisreportARF014 = new ArrayList<>();
				
				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

				if (userRole.equals("ROLE_CHEMIST")) {

					briquettesanalysisreportARF014 = briquettesanalysisreportARF014Repo.chemistSummary();
				}

				else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
						|| userRole.equalsIgnoreCase("QA_MANAGER")) {
					briquettesanalysisreportARF014 = briquettesanalysisreportARF014Repo.exeManagerSummary();
				} 
				
				else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

					briquettesanalysisreportARF014 = briquettesanalysisreportARF014Repo.microSummary();
				}
		
		try {
			return new ResponseEntity(briquettesanalysisreportARF014, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	public ResponseEntity<?> approveListTestF014() {
		List<briquettesanalysisreportARF014> briquettesanalysisreportARF014 = briquettesanalysisreportARF014Repo
				.approveList();
		try {
			return new ResponseEntity(briquettesanalysisreportARF014, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}


	public ResponseEntity<?> approveCLF014(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		briquettesanalysisreportARF014 physicalTest = new briquettesanalysisreportARF014();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			physicalTest = briquettesanalysisreportARF014Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			briquettesanalysisreportHistoryARF014 absorbentbleachedcottonreportCLF005History = new briquettesanalysisreportHistoryARF014();

			String supervisiorStatus = physicalTest.getChemist_status() != null ? physicalTest.getChemist_status()
					: physicalTest.getChemist_status();

			String hodStatus = physicalTest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager") ) {

					if (approvalResponse.getStatus().equals("Approve")) {

						physicalTest.setQc_status(AppConstantsQc.QCApprove);
						physicalTest.setQc_submit_on(date);
						physicalTest.setQc_submit_by(userName);
						physicalTest.setQc_submit_id(userId);
						physicalTest.setQc_sign(userName);

						briquettesanalysisreportARF014Repo.save(physicalTest);

						absorbentbleachedcottonreportCLF005History = briquettesanalysisreportHistoryARF014
								.fetchLastSubmittedRecordPhNumber(physicalTest.getSupplier_name(),
										physicalTest.getDate());

						absorbentbleachedcottonreportCLF005History.setQc_status(AppConstantsQc.QCApprove);
						absorbentbleachedcottonreportCLF005History.setQc_submit_on(date);
						absorbentbleachedcottonreportCLF005History.setQc_submit_by(userName);
						absorbentbleachedcottonreportCLF005History.setQc_submit_id(userId);
						absorbentbleachedcottonreportCLF005History.setQc_sign(userName);

						briquettesanalysisreportHistoryARF014.save(absorbentbleachedcottonreportCLF005History);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						physicalTest.setReason(reason);
						physicalTest.setQc_status(AppConstantsQc.QCRejected);
						physicalTest.setQc_submit_on(date);
						physicalTest.setQc_submit_id(userId);
						physicalTest.setQc_submit_by(userName);

						physicalTest.setQc_sign(userName);

						briquettesanalysisreportARF014Repo.save(physicalTest);

						absorbentbleachedcottonreportCLF005History = briquettesanalysisreportHistoryARF014
								.fetchLastSubmittedRecordPhNumber(physicalTest.getSupplier_name(),
										physicalTest.getDate());

						absorbentbleachedcottonreportCLF005History.setQc_status(AppConstantsQc.QCRejected);
						absorbentbleachedcottonreportCLF005History.setReason(reason);
						absorbentbleachedcottonreportCLF005History.setQc_submit_on(date);
						absorbentbleachedcottonreportCLF005History.setQc_submit_by(userName);
						absorbentbleachedcottonreportCLF005History.setQc_submit_id(userId);
						absorbentbleachedcottonreportCLF005History.setQc_sign(userName);

						briquettesanalysisreportHistoryARF014.save(absorbentbleachedcottonreportCLF005History);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}
				
				else if (userRole.equalsIgnoreCase("QA_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						physicalTest.setQc_status(AppConstantsQc.QAApprove);
						physicalTest.setQc_submit_on(date);
						physicalTest.setQc_submit_id(userId);
						physicalTest.setQc_submit_by(userName);

						physicalTest.setQc_sign(userName);

						briquettesanalysisreportARF014Repo.save(physicalTest);

						absorbentbleachedcottonreportCLF005History = briquettesanalysisreportHistoryARF014
								.fetchLastSubmittedRecordPhNumber(physicalTest.getSupplier_name(),
										physicalTest.getDate());

						absorbentbleachedcottonreportCLF005History.setQc_status(AppConstantsQc.QAApprove);
						absorbentbleachedcottonreportCLF005History.setQc_submit_on(date);
						absorbentbleachedcottonreportCLF005History.setQc_submit_by(userName);
						absorbentbleachedcottonreportCLF005History.setQc_submit_id(userId);
						absorbentbleachedcottonreportCLF005History.setQc_sign(userName);

						briquettesanalysisreportHistoryARF014.save(absorbentbleachedcottonreportCLF005History);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						physicalTest.setReason(reason);
						physicalTest.setQc_status(AppConstantsQc.QAReject);
						physicalTest.setQc_submit_on(date);
						physicalTest.setQc_submit_id(userId);
						physicalTest.setQc_submit_by(userName);

						physicalTest.setQc_sign(userName);

						briquettesanalysisreportARF014Repo.save(physicalTest);

						absorbentbleachedcottonreportCLF005History = briquettesanalysisreportHistoryARF014
								.fetchLastSubmittedRecordPhNumber(physicalTest.getSupplier_name(),
										physicalTest.getDate());

						absorbentbleachedcottonreportCLF005History.setQc_status(AppConstantsQc.QAReject);
						absorbentbleachedcottonreportCLF005History.setReason(reason);
						absorbentbleachedcottonreportCLF005History.setQc_submit_on(date);
						absorbentbleachedcottonreportCLF005History.setQc_submit_id(userId);
						absorbentbleachedcottonreportCLF005History.setQc_submit_by(userName);
						absorbentbleachedcottonreportCLF005History.setQc_sign(userName);

						briquettesanalysisreportHistoryARF014.save(absorbentbleachedcottonreportCLF005History);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}
	
	//-------------------------------------------------------CL_09----------------------------------------------------------------
	
	
	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveChemicalTestCL09(turbiditycalibrationreportCLF009  turbidity, HttpServletRequest http) {
		turbiditycalibrationreportCLF009 turbidityobject = new turbiditycalibrationreportCLF009();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = turbidity.getLab_id();

			if (id != null) {
				turbidityobject = turbiditycalibrationreportCLF009Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(turbidity, turbidityobject, IgnoreProps);
			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					

					turbidityobject.setChemist_saved_on(date);
					turbidityobject.setChemist_saved_id(userId);
					turbidityobject.setChemist_sign(userName);

					turbidityobject.setChemist_status(AppConstantsQc.chemistSave);

					turbiditycalibrationreportCLF009Repo.save(turbidityobject);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					

					turbidity.setChemist_saved_on(date);
					turbidity.setChemist_saved_id(userId);
					turbidity.setChemist_sign(userName);

					turbidity.setChemist_status(AppConstantsQc.chemistSave);

					turbiditycalibrationreportCLF009Repo.save(turbidity);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(turbidity, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestCLF09(@Valid turbiditycalibrationreportCLF009  turbidity,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		
		turbiditycalibrationreportCLF009 turbidityobject = new turbiditycalibrationreportCLF009();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = turbidity.getLab_id();

			if (id != null) {
				turbidityobject = turbiditycalibrationreportCLF009Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			BeanUtils.copyProperties(turbidity, turbidityobject, IgnoreProps);

			if (id != null && !userName.equalsIgnoreCase(turbidityobject.getChemist_saved_by())) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					turbidityobject.setQc_status(AppConstantsQc.waitingStatus);

					turbidityobject.setChemist_submit_on(date);
					turbidityobject.setChemist_submit_id(userId);
					turbidityobject.setChemist_sign(userName);
					turbidityobject.setChemist_status(AppConstantsQc.chemistSubmitted);
					turbidityobject.setChemist_submit_by(userName);	
					turbidityobject.setChemist_submit_by(userName);
					turbiditycalibrationreportCLF009Repo.save(turbidityobject);
					turbiditycalibrationreportHistoryCLF009 turbidityhistory = new turbiditycalibrationreportHistoryCLF009();
					BeanUtils.copyProperties(turbidityobject, turbidityhistory);

					int version = turbiditycalibrationreportHistoryCLF009Repo
							.getMaximumVersion(turbidity.getEq_id_no(), turbidity.getDate()).map(temp -> temp + 1)
							.orElse(1);
					turbidityhistory.setVersion(version);
					turbiditycalibrationreportHistoryCLF009Repo.save(turbidityhistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else if (!userName.equalsIgnoreCase(turbidityobject.getChemist_saved_by())){
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					turbidity.setQc_status(AppConstantsQc.waitingStatus);

					turbidity.setChemist_submit_on(date);
					turbidity.setChemist_submit_id(userId);
					turbidity.setChemist_sign(userName);
					turbidity.setChemist_submit_by(userName);		
					turbidity.setChemist_status(AppConstantsQc.chemistSubmitted);

					turbiditycalibrationreportCLF009Repo.save(turbidity);
					turbiditycalibrationreportHistoryCLF009 turbidityhistory = new turbiditycalibrationreportHistoryCLF009();
					BeanUtils.copyProperties(turbidity, turbidityhistory);

					int version = turbiditycalibrationreportHistoryCLF009Repo
							.getMaximumVersion(turbidity.getEq_id_no(), turbidity.getDate()).map(temp -> temp + 1)
							.orElse(1);
					turbidityhistory.setVersion(version);
					turbiditycalibrationreportHistoryCLF009Repo.save(turbidityhistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}
			
			try {

				qcmailfunction.sendEmailToF009(turbidity);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(turbidity, HttpStatus.OK);

	}

	public ResponseEntity<?> getTestByBatchClF09(String e1_no ,String year , String month, String date) {
		List<turbiditycalibrationreportCLF009> turbiditycalibrationreportCLF009 = new ArrayList<>();
		

		if (date != null && date.isEmpty()) {
			date = null;
        }
    	if (month != null && month.isEmpty()) {
            month = null;
        }
        if (year != null && year.isEmpty()) {
            year = null;
        }
		
			turbiditycalibrationreportCLF009= turbiditycalibrationreportCLF009Repo.findByBatch(e1_no,year ,month, date);
		
		try {
			return new ResponseEntity(turbiditycalibrationreportCLF009, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printClF09(String e1_no,String year , String month, String date) {
		List<turbiditycalibrationreportCLF009> turbiditycalibrationreportCLF009 = new ArrayList<>();
		
		if (date != null && date.isEmpty()) {
			date = null;
        }
    	if (month != null && month.isEmpty()) {
            month = null;
        }
        if (year != null && year.isEmpty()) {
            year = null;
        }
		
		
			turbiditycalibrationreportCLF009= turbiditycalibrationreportCLF009Repo.print(e1_no,year ,month, date);
		

		
		try {
			return new ResponseEntity(turbiditycalibrationreportCLF009, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdClF09(@Valid Long id) {
		turbiditycalibrationreportCLF009 turbiditycalibrationreportCLF009 = turbiditycalibrationreportCLF009Repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(turbiditycalibrationreportCLF009, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestClF09(HttpServletRequest http) {

		List<turbiditycalibrationreportCLF009> turbiditycalibrationreportCLF009 = new ArrayList<>();
				
				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

				if (userRole.equals("ROLE_CHEMIST")) {

					turbiditycalibrationreportCLF009 = turbiditycalibrationreportCLF009Repo.chemistSummary();
				}

				else if (userRole.equalsIgnoreCase("CHEMIST_DESIGNEE") || userRole.equalsIgnoreCase("QC_MANAGER")
						|| userRole.equalsIgnoreCase("QA_MANAGER")) {
					turbiditycalibrationreportCLF009 = turbiditycalibrationreportCLF009Repo.exeManagerSummary();
				} 
				
				else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

					turbiditycalibrationreportCLF009 = turbiditycalibrationreportCLF009Repo.microSummary();
				}
							
		try {
			return new ResponseEntity(turbiditycalibrationreportCLF009, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	

	}
	
	public ResponseEntity<?> approveListClF09() {
		List<turbiditycalibrationreportCLF009> turbiditycalibrationreportCLF009 = turbiditycalibrationreportCLF009Repo
				.approveList();
		try {
			return new ResponseEntity(turbiditycalibrationreportCLF009, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> approveCLF09(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		turbiditycalibrationreportCLF009 turbidityTest = new turbiditycalibrationreportCLF009();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			turbidityTest = turbiditycalibrationreportCLF009Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			turbiditycalibrationreportHistoryCLF009 turbidityhistory = new turbiditycalibrationreportHistoryCLF009();

			String supervisiorStatus = turbidityTest.getChemist_status() != null ? turbidityTest.getChemist_status()
					: turbidityTest.getChemist_status();

			String hodStatus = turbidityTest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager") || userRole.equalsIgnoreCase("QA_Manager") ) {

					if (approvalResponse.getStatus().equals("Approve")) {

						turbidityTest.setQc_status(AppConstantsQc.QCApprove);
						turbidityTest.setQc_submit_on(date);
						turbidityTest.setQc_submit_by(userName);
						turbidityTest.setQc_submit_id(userId);		
						turbidityTest.setQc_sign(userName);

						turbiditycalibrationreportCLF009Repo.save(turbidityTest);

						turbidityhistory = turbiditycalibrationreportHistoryCLF009Repo
								.fetchLastSubmittedRecordPhNumber(turbidityTest.getEq_id_no(),
										turbidityTest.getDate());

						turbidityhistory.setQc_status(AppConstantsQc.QCApprove);
						turbidityhistory.setQc_submit_on(date);
						turbidityhistory.setQc_submit_by(userName);
						turbidityhistory.setQc_sign(userName);
						turbidityhistory.setQc_submit_id(userId);

						turbiditycalibrationreportHistoryCLF009Repo.save(turbidityhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						turbidityTest.setReason(reason);
						turbidityTest.setQc_status(AppConstantsQc.QCRejected);
						turbidityTest.setQc_submit_on(date);
						turbidityTest.setQc_submit_id(userId);	
						turbidityTest.setQc_submit_by(userName);

						turbidityTest.setQc_sign(userName);

						turbiditycalibrationreportCLF009Repo.save(turbidityTest);

						turbidityhistory = turbiditycalibrationreportHistoryCLF009Repo
								.fetchLastSubmittedRecordPhNumber(turbidityTest.getEq_id_no(),
										turbidityTest.getDate());

						turbidityhistory.setQc_status(AppConstantsQc.QCRejected);
						turbidityhistory.setReason(reason);
						turbidityhistory.setQc_submit_on(date);
						turbidityhistory.setQc_submit_by(userName);
						turbidityhistory.setQc_sign(userName);
						turbidityhistory.setQc_submit_id(userId);

						turbiditycalibrationreportHistoryCLF009Repo.save(turbidityhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} 
				
				else if (userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")) {


					if (approvalResponse.getStatus().equals("Approve")) {

						turbidityTest.setQc_status(AppConstantsQc.ChemistDesigneeApprove);
						turbidityTest.setQc_submit_on(date);
						turbidityTest.setQc_submit_by(userName);
						turbidityTest.setQc_submit_id(userId);	

						turbidityTest.setQc_sign(userName);

						turbiditycalibrationreportCLF009Repo.save(turbidityTest);

						turbidityhistory = turbiditycalibrationreportHistoryCLF009Repo
								.fetchLastSubmittedRecordPhNumber(turbidityTest.getEq_id_no(),
										turbidityTest.getDate());

						turbidityhistory.setQc_status(AppConstantsQc.ChemistDesigneeApprove);
						turbidityhistory.setQc_submit_on(date);
						turbidityhistory.setQc_submit_by(userName);
						turbidityhistory.setQc_sign(userName);
						turbidityhistory.setQc_submit_id(userId);

						turbiditycalibrationreportHistoryCLF009Repo.save(turbidityhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						turbidityTest.setReason(reason);
						turbidityTest.setQc_status(AppConstantsQc.ChemistDesigneeRejected);
						turbidityTest.setQc_submit_on(date);
						turbidityTest.setQc_submit_id(userId);	
						turbidityTest.setQc_submit_by(userName);

						turbidityTest.setQc_sign(userName);

						turbiditycalibrationreportCLF009Repo.save(turbidityTest);

						turbidityhistory = turbiditycalibrationreportHistoryCLF009Repo
								.fetchLastSubmittedRecordPhNumber(turbidityTest.getEq_id_no(),
										turbidityTest.getDate());

						turbidityhistory.setQc_status(AppConstantsQc.ChemistDesigneeRejected);
						turbidityhistory.setReason(reason);
						turbidityhistory.setQc_submit_on(date);
						turbidityhistory.setQc_submit_by(userName);
						turbidityhistory.setQc_sign(userName);
						turbidityhistory.setQc_submit_id(userId);	

						turbiditycalibrationreportHistoryCLF009Repo.save(turbidityhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				
				}

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}
	
	//------------------------------------------------------------CL-F011---------------------------------------------------------------
	
	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveChemicalTestCLF011(spectrophotometerReportClF011 spectrometer, HttpServletRequest http) {
		spectrophotometerReportClF011 spectrometerobject = new spectrophotometerReportClF011();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = spectrometer.getLab_id();

			if (id != null) {
				spectrometerobject = spectrophotometerReportClF011Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(spectrometer, spectrometerobject, IgnoreProps);
			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					

					spectrometerobject.setChemist_saved_on(date);
					spectrometerobject.setChemist_saved_id(userId);
					spectrometerobject.setChemist_sign(userName);

					spectrometerobject.setChemist_status(AppConstantsQc.chemistSave);

					spectrophotometerReportClF011Repo.save(spectrometerobject);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					

					spectrometer.setChemist_saved_on(date);
					spectrometer.setChemist_saved_id(userId);
					spectrometer.setChemist_sign(userName);

					spectrometer.setChemist_status(AppConstantsQc.chemistSave);

					spectrophotometerReportClF011Repo.save(spectrometer);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(spectrometer, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestCLF011(@Valid spectrophotometerReportClF011 spectrometer,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		
		
		spectrophotometerReportClF011 spectrometerobject = new spectrophotometerReportClF011();
		
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = spectrometer.getLab_id();

			if (id != null) {
				spectrometerobject = spectrophotometerReportClF011Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			BeanUtils.copyProperties(spectrometer, spectrometerobject, IgnoreProps);

			if (id != null && userName .equalsIgnoreCase(spectrometer.getChemist_saved_by())) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					spectrometerobject.setQc_status(AppConstantsQc.waitingStatus);

					spectrometerobject.setChemist_submit_on(date);
					spectrometerobject.setChemist_submit_id(userId);
					spectrometerobject.setChemist_sign(userName);
					spectrometerobject.setChemist_status(AppConstantsQc.chemistSubmitted);
					spectrometerobject.setChemist_submit_by(userName);	
					spectrometerobject.setChecked_by(userName);

					spectrophotometerReportClF011Repo.save(spectrometerobject);
					spectrophotometerReportHistoryClF011 spectrometerHistory = new spectrophotometerReportHistoryClF011();
					BeanUtils.copyProperties(spectrometerobject, spectrometerHistory);

					int version = spectrophotometerReportHistoryClF011Repo
							.getMaximumVersion(spectrometer.getEq_id_no(), spectrometer.getDate()).map(temp -> temp + 1)
							.orElse(1);
					spectrometerHistory.setVersion(version);
					spectrophotometerReportHistoryClF011Repo.save(spectrometerHistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} 
			
			else {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					spectrometer.setQc_status(AppConstantsQc.waitingStatus);

					spectrometer.setChemist_submit_on(date);
					spectrometer.setChemist_submit_id(userId);
					spectrometer.setChemist_sign(userName);
					spectrometer.setChecked_by(userName);
					spectrometer.setChemist_submit_by(userName);
					spectrometer.setChemist_status(AppConstantsQc.chemistSubmitted);

					spectrometer =	spectrophotometerReportClF011Repo.save(spectrometer);
					spectrophotometerReportHistoryClF011 spectrometerHistory = new spectrophotometerReportHistoryClF011();
					BeanUtils.copyProperties(spectrometer, spectrometerHistory);

					int version = spectrophotometerReportHistoryClF011Repo
							.getMaximumVersion(spectrometer.getEq_id_no(), spectrometer.getDate()).map(temp -> temp + 1)
							.orElse(1);
					spectrometerHistory.setVersion(version);
					spectrophotometerReportHistoryClF011Repo.save(spectrometerHistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}
			
			try {

				qcmailfunction.sendEmailToF011(spectrometer);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(spectrometer, HttpStatus.OK);

	}

	public ResponseEntity<?> getTestByBatchClF011(String e1_no, String year,String month, String date) {
		List<spectrophotometerReportClF011> spectrometer = new ArrayList<>();
		
		
			spectrometer= spectrophotometerReportClF011Repo.findByBatch(e1_no,year ,month, date);
		
		try {
			return new ResponseEntity(spectrometer, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printClF011(String e1_no, String year,String month, String date) {
		List<spectrophotometerReportClF011> spectrometer = new ArrayList<>();
	    e1_no = (e1_no == null || e1_no.trim().isEmpty()) ? null : e1_no.trim();
	    year = (year == null || year.trim().isEmpty()) ? null : year.trim();
	    month = (month == null || month.trim().isEmpty()) ? null : month.trim();
	    date = (date == null || date.trim().isEmpty()) ? null : date.trim();
	
			spectrometer= spectrophotometerReportClF011Repo.print(e1_no,year ,month, date);
		
		try {
			return new ResponseEntity(spectrometer, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdClF011(@Valid Long id) {
		spectrophotometerReportClF011 spectrometer = spectrophotometerReportClF011Repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(spectrometer, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestClF011(HttpServletRequest http) {
		List<spectrophotometerReportClF011> spectrophotometerReportClF011 = new ArrayList<>();
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		if (userRole.equals("ROLE_CHEMIST")) {

			spectrophotometerReportClF011 = spectrophotometerReportClF011Repo.chemistSummary();
		}

		else if (userRole.equalsIgnoreCase("CHEMIST_DESIGNEE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			spectrophotometerReportClF011 = spectrophotometerReportClF011Repo.exeManagerSummary();
		} 
		
		else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

			spectrophotometerReportClF011 = spectrophotometerReportClF011Repo.microSummary();
		}
					
		try {
			return new ResponseEntity(spectrophotometerReportClF011, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> approvelistF011() {
		List<spectrophotometerReportClF011> spectrophotometerReportClF011 = spectrophotometerReportClF011Repo
				.approveList();
		try {
			return new ResponseEntity(spectrophotometerReportClF011, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> approveCLF011(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		spectrophotometerReportClF011 spectrometertest = new spectrophotometerReportClF011();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			spectrometertest = spectrophotometerReportClF011Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			spectrophotometerReportHistoryClF011 spectrometerHistory = new spectrophotometerReportHistoryClF011();

			String supervisiorStatus = spectrometertest.getChemist_status() != null ? spectrometertest.getChemist_status()
					: spectrometertest.getChemist_status();

			String hodStatus = spectrometertest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager") || userRole.equalsIgnoreCase("QA_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						spectrometertest.setQc_status(AppConstantsQc.QCApprove);
						spectrometertest.setQc_submit_on(date);
						spectrometertest.setQc_submit_by(userName);
						spectrometertest.setQc_submit_id(userId);	
						spectrometertest.setQc_sign(userName);

						spectrophotometerReportClF011Repo.save(spectrometertest);

						spectrometerHistory = spectrophotometerReportHistoryClF011Repo
								.fetchLastSubmittedRecordPhNumber(spectrometertest.getEq_id_no(),
										spectrometertest.getDate());

						spectrometerHistory.setQc_status(AppConstantsQc.QCApprove);
						spectrometerHistory.setQc_submit_on(date);
						spectrometerHistory.setQc_submit_by(userName);
						spectrometerHistory.setQc_sign(userName);
						spectrometerHistory.setQc_submit_id(userId);

						spectrophotometerReportHistoryClF011Repo.save(spectrometerHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						spectrometertest.setReason(reason);
						spectrometertest.setQc_status(AppConstantsQc.QCRejected);
						spectrometertest.setQc_submit_on(date);
						spectrometertest.setQc_submit_id(userId);
						spectrometertest.setQc_submit_by(userName);

						spectrometertest.setQc_sign(userName);

						spectrophotometerReportClF011Repo.save(spectrometertest);

						spectrometerHistory = spectrophotometerReportHistoryClF011Repo
								.fetchLastSubmittedRecordPhNumber(spectrometertest.getEq_id_no(),
										spectrometertest.getDate());

						spectrometerHistory.setQc_status(AppConstantsQc.QCRejected);
						spectrometerHistory.setReason(reason);
						spectrometerHistory.setQc_submit_on(date);
						spectrometerHistory.setQc_submit_by(userName);
						spectrometerHistory.setQc_sign(userName);
						spectrometerHistory.setQc_submit_id(userId);

						spectrophotometerReportHistoryClF011Repo.save(spectrometerHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else if (userRole.equalsIgnoreCase("CHEMIST_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						spectrometertest.setQc_status(AppConstantsQc.ChemistDesigneeApprove);
						spectrometertest.setQc_submit_on(date);
						spectrometertest.setQc_submit_by(userName);
						spectrometertest.setQc_submit_id(userId);
						spectrometertest.setQc_sign(userName);

						spectrophotometerReportClF011Repo.save(spectrometertest);

						spectrometerHistory = spectrophotometerReportHistoryClF011Repo
								.fetchLastSubmittedRecordPhNumber(spectrometertest.getEq_id_no(),
										spectrometertest.getDate());

						spectrometerHistory.setQc_status(AppConstantsQc.ChemistDesigneeApprove);
						spectrometerHistory.setQc_submit_on(date);
						spectrometerHistory.setQc_submit_by(userName);
						spectrometerHistory.setQc_sign(userName);
						spectrometerHistory.setQc_submit_id(userId);

						spectrophotometerReportHistoryClF011Repo.save(spectrometerHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						spectrometertest.setReason(reason);
						spectrometertest.setQc_status(AppConstantsQc.ChemistDesigneeRejected);
						spectrometertest.setQc_submit_on(date);
						spectrometertest.setQc_submit_by(userName);
						spectrometertest.setQc_submit_id(userId);
						spectrometertest.setQc_sign(userName);

						spectrophotometerReportClF011Repo.save(spectrometertest);

						spectrometerHistory = spectrophotometerReportHistoryClF011Repo
								.fetchLastSubmittedRecordPhNumber(spectrometertest.getEq_id_no(),
										spectrometertest.getDate());

						spectrometerHistory.setQc_status(AppConstantsQc.ChemistDesigneeRejected);
						spectrometerHistory.setReason(reason);
						spectrometerHistory.setQc_submit_on(date);
						spectrometerHistory.setQc_submit_by(userName);
						spectrometerHistory.setQc_sign(userName);
						spectrometerHistory.setQc_submit_id(userId);

						spectrophotometerReportHistoryClF011Repo.save(spectrometerHistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}
				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}

	//------------------------------------------------CL-F013------------------------------------------------------
	
	
	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveChemicalTestCLF013(fungalIncubatorReportCLF013 fungalIncubator, HttpServletRequest http) {
		fungalIncubatorReportCLF013 fungalIncubatorObject = new fungalIncubatorReportCLF013();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = fungalIncubator.getLab_id();

			if (id != null) {
				fungalIncubatorObject = fungalIncubatorReportCLF013Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(fungalIncubator, fungalIncubatorObject, IgnoreProps);

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					

					fungalIncubatorObject.setMicro_saved_on(date);
					fungalIncubatorObject.setMicro_saved_id(userId);
					fungalIncubatorObject.setMicro_sign(userName);
					fungalIncubatorObject.setMicro_status(AppConstantsQc.microBiologistSubmitted);
					fungalIncubatorObject.setMicro_saved_by(userName);

					

					fungalIncubatorReportCLF013Repo.save(fungalIncubatorObject);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					

					fungalIncubatorObject.setMicro_saved_on(date);
					fungalIncubatorObject.setMicro_saved_id(userId);
					fungalIncubatorObject.setMicro_sign(userName);
					fungalIncubatorObject.setMicro_status(AppConstantsQc.microBiologistSubmitted);
					fungalIncubatorObject.setMicro_saved_by(userName);


					fungalIncubatorReportCLF013Repo.save(fungalIncubator);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(fungalIncubator, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestCLF013(@Valid fungalIncubatorReportCLF013 fungalIncubator,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();	
		
		
		fungalIncubatorReportCLF013 fungalIncubatorObject = new fungalIncubatorReportCLF013();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = fungalIncubator.getLab_id();

			if (id != null) {
				fungalIncubatorObject = fungalIncubatorReportCLF013Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			BeanUtils.copyProperties(fungalIncubator, fungalIncubatorObject, IgnoreProps);

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					fungalIncubatorObject.setQc_status(AppConstantsQc.waitingStatus);

					
					fungalIncubatorObject.setMicro_submit_on(date);
					fungalIncubatorObject.setMicro_submit_id(userId);
					fungalIncubatorObject.setMicro_sign(userName);
					fungalIncubatorObject.setMicro_status(AppConstantsQc.microBiologistSubmitted);
					fungalIncubatorObject.setMicro_submit_by(userName);

					fungalIncubatorReportCLF013Repo.save(fungalIncubatorObject);
					fungalIncubatorReportHistoryCLF013 fungalIncubatorhistory = new fungalIncubatorReportHistoryCLF013();
					BeanUtils.copyProperties(fungalIncubatorObject, fungalIncubatorhistory);
					fungalIncubatorhistory.setLab_id(null);

					int version = fungalIncubatorReportHistoryCLF013Repo
							.getMaximumVersion(fungalIncubator.getEq_id_no(), fungalIncubator.getDate()).map(temp -> temp + 1)
							.orElse(1);
					fungalIncubatorhistory.setVersion(version);
					fungalIncubatorReportHistoryCLF013Repo.save(fungalIncubatorhistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					fungalIncubator.setQc_status(AppConstantsQc.waitingStatus);

					fungalIncubator.setMicro_submit_on(date);
					fungalIncubator.setMicro_submit_id(userId);
					fungalIncubator.setMicro_sign(userName);
					fungalIncubator.setMicro_submit_by(userName);
					fungalIncubator.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					fungalIncubatorReportCLF013Repo.save(fungalIncubator);
					fungalIncubatorReportHistoryCLF013 fungalIncubatorhistory = new fungalIncubatorReportHistoryCLF013();
					BeanUtils.copyProperties(fungalIncubator, fungalIncubatorhistory);
					fungalIncubatorhistory.setLab_id(null);

					int version = fungalIncubatorReportHistoryCLF013Repo
							.getMaximumVersion(fungalIncubator.getEq_id_no(), fungalIncubator.getDate()).map(temp -> temp + 1)
							.orElse(1);
					fungalIncubatorhistory.setVersion(version);
					fungalIncubatorReportHistoryCLF013Repo.save(fungalIncubatorhistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}
			
			try {

				qcmailfunction.sendEmailToF013(fungalIncubator);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(fungalIncubator, HttpStatus.OK);

	}

	public ResponseEntity<?> getTestByBatchClF013(String e1_no,String year , String month , String date) {
		List<fungalIncubatorReportCLF013> fungalIncubator = new ArrayList<>();
		
	
			fungalIncubator= fungalIncubatorReportCLF013Repo.findByBatch(e1_no,year ,month, date);
		
		try {
			return new ResponseEntity(fungalIncubator, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printClF013(String e1_no,String year , String month , String date) {
	
	    e1_no = (e1_no == null || e1_no.trim().isEmpty()) ? null : e1_no.trim();
	    year = (year == null || year.trim().isEmpty()) ? null : year.trim();
	    month = (month == null || month.trim().isEmpty()) ? null : month.trim();
	    date = (date == null || date.trim().isEmpty()) ? null : date.trim();
		List<fungalIncubatorReportCLF013> fungalIncubator = new ArrayList<>();
	
			fungalIncubator= fungalIncubatorReportCLF013Repo.print(e1_no,year ,month, date);
		
		try {
			return new ResponseEntity(fungalIncubator, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdClF013(@Valid Long id) {
		fungalIncubatorReportCLF013 fungalIncubator = fungalIncubatorReportCLF013Repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(fungalIncubator, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestClF013(HttpServletRequest http) {
		List<fungalIncubatorReportCLF013> fungalIncubatorReportCLF013 = new ArrayList<>();
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		if (userRole.equals("ROLE_CHEMIST")) {

			fungalIncubatorReportCLF013 = fungalIncubatorReportCLF013Repo.chemistSummary();
		}

		else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			fungalIncubatorReportCLF013 = fungalIncubatorReportCLF013Repo.exeManagerSummary();
		} 
		
		else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

			fungalIncubatorReportCLF013 = fungalIncubatorReportCLF013Repo.microSummary();
		}
		
		else 	if (userRole.equals("MICRO_DESIGNEE")) {

			fungalIncubatorReportCLF013 = fungalIncubatorReportCLF013Repo.exeManagerSummary();
		}
		
		try {
			return new ResponseEntity(fungalIncubatorReportCLF013, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}
		

	}
	
	public ResponseEntity<?> getapproveF013() {
		List<fungalIncubatorReportCLF013> fungalIncubatorReportCLF013 = fungalIncubatorReportCLF013Repo
				.approveList();
		try {
			return new ResponseEntity(fungalIncubatorReportCLF013, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> approveCLF013(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		
		
		fungalIncubatorReportCLF013 fungalIncubatortest = new fungalIncubatorReportCLF013();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			fungalIncubatortest = fungalIncubatorReportCLF013Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			fungalIncubatorReportHistoryCLF013 fungalIncubatorhistory = new fungalIncubatorReportHistoryCLF013();

			String supervisiorStatus = fungalIncubatortest.getMicro_status() != null ? fungalIncubatortest.getMicro_status()
					: fungalIncubatortest.getMicro_status();

			String hodStatus = fungalIncubatortest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_MANAGER")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						fungalIncubatortest.setQc_status(AppConstantsQc.QCApprove);
						fungalIncubatortest.setQc_submit_on(date);
						fungalIncubatortest.setQc_submit_by(userName);
						fungalIncubatortest.setQc_submit_id(userId);		
						fungalIncubatortest.setQc_sign(userName);
						fungalIncubatortest.setMicro_status(supervisiorStatus);;
						fungalIncubatorReportCLF013Repo.save(fungalIncubatortest);

						fungalIncubatorhistory = fungalIncubatorReportHistoryCLF013Repo
								.fetchLastSubmittedRecordPhNumber(fungalIncubatortest.getEq_id_no(),
										fungalIncubatortest.getDate());

						fungalIncubatorhistory.setQc_status(AppConstantsQc.QCApprove);
						fungalIncubatorhistory.setQc_submit_on(date);
						fungalIncubatorhistory.setQc_submit_by(userName);
						fungalIncubatorhistory.setQc_sign(userName);
						fungalIncubatorhistory.setQc_submit_id(userId);
						fungalIncubatorhistory.setMicro_status(supervisiorStatus);

						fungalIncubatorReportHistoryCLF013Repo.save(fungalIncubatorhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						fungalIncubatortest.setReason(reason);
						fungalIncubatortest.setQc_status(AppConstantsQc.QCRejected);
						fungalIncubatortest.setQc_submit_on(date);
						fungalIncubatortest.setQc_submit_id(userId);
						fungalIncubatortest.setQc_submit_by(userName);
						fungalIncubatortest.setMicro_status(supervisiorStatus);
						fungalIncubatortest.setQc_sign(userName);

						fungalIncubatorReportCLF013Repo.save(fungalIncubatortest);

						fungalIncubatorhistory = fungalIncubatorReportHistoryCLF013Repo
								.fetchLastSubmittedRecordPhNumber(fungalIncubatortest.getEq_id_no(),
										fungalIncubatortest.getDate());

						fungalIncubatorhistory.setQc_status(AppConstantsQc.QCRejected);
						fungalIncubatorhistory.setReason(reason);
						fungalIncubatorhistory.setQc_submit_on(date);
						fungalIncubatorhistory.setQc_submit_by(userName);
						fungalIncubatorhistory.setQc_sign(userName);
						fungalIncubatorhistory.setQc_submit_id(userId);
						fungalIncubatorhistory.setMicro_status(supervisiorStatus);

						fungalIncubatorReportHistoryCLF013Repo.save(fungalIncubatorhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}
				
				else 			if (userRole.equalsIgnoreCase("QA_MANAGER") ) {

					if (approvalResponse.getStatus().equals("Approve")) {

						fungalIncubatortest.setQc_status(AppConstantsQc.QAApprove);
						fungalIncubatortest.setQc_submit_on(date);
						fungalIncubatortest.setQc_submit_by(userName);
						fungalIncubatortest.setQc_submit_id(userId);
						fungalIncubatortest.setQc_sign(userName);
						fungalIncubatortest.setMicro_status(supervisiorStatus);
						fungalIncubatorReportCLF013Repo.save(fungalIncubatortest);

						fungalIncubatorhistory = fungalIncubatorReportHistoryCLF013Repo
								.fetchLastSubmittedRecordPhNumber(fungalIncubatortest.getEq_id_no(),
										fungalIncubatortest.getDate());

						fungalIncubatorhistory.setQc_status(AppConstantsQc.QAApprove);
						fungalIncubatorhistory.setQc_submit_on(date);
						fungalIncubatorhistory.setQc_submit_by(userName);
						fungalIncubatorhistory.setQc_sign(userName);
						fungalIncubatorhistory.setQc_submit_id(userId);
						fungalIncubatorhistory.setMicro_status(supervisiorStatus);

						fungalIncubatorReportHistoryCLF013Repo.save(fungalIncubatorhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						fungalIncubatortest.setReason(reason);
						fungalIncubatortest.setQc_status(AppConstantsQc.QAReject);
						fungalIncubatortest.setQc_submit_on(date);
						fungalIncubatortest.setQc_submit_id(userId);
						fungalIncubatortest.setQc_submit_by(userName);
						fungalIncubatortest.setMicro_status(supervisiorStatus);
						fungalIncubatortest.setQc_sign(userName);

						fungalIncubatorReportCLF013Repo.save(fungalIncubatortest);

						fungalIncubatorhistory = fungalIncubatorReportHistoryCLF013Repo
								.fetchLastSubmittedRecordPhNumber(fungalIncubatortest.getEq_id_no(),
										fungalIncubatortest.getDate());

						fungalIncubatorhistory.setQc_status(AppConstantsQc.QAReject);
						fungalIncubatorhistory.setReason(reason);
						fungalIncubatorhistory.setQc_submit_on(date);
						fungalIncubatorhistory.setQc_submit_by(userName);
						fungalIncubatorhistory.setQc_sign(userName);
						fungalIncubatorhistory.setQc_submit_id(userId);
						fungalIncubatorhistory.setMicro_status(supervisiorStatus);

						fungalIncubatorReportHistoryCLF013Repo.save(fungalIncubatorhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}
				
				else 			if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						fungalIncubatortest.setQc_status(AppConstantsQc.MicroDesigneeApprove);
						fungalIncubatortest.setQc_submit_on(date);
						fungalIncubatortest.setQc_submit_by(userName);
						fungalIncubatortest.setQc_submit_id(userId);
						fungalIncubatortest.setQc_sign(userName);

						fungalIncubatorReportCLF013Repo.save(fungalIncubatortest);

						fungalIncubatorhistory = fungalIncubatorReportHistoryCLF013Repo
								.fetchLastSubmittedRecordPhNumber(fungalIncubatortest.getEq_id_no(),
										fungalIncubatortest.getDate());

						fungalIncubatorhistory.setQc_status(AppConstantsQc.MicroDesigneeApprove);
						fungalIncubatorhistory.setQc_submit_on(date);
						fungalIncubatorhistory.setQc_submit_by(userName);
						fungalIncubatorhistory.setQc_sign(userName);
						fungalIncubatorhistory.setQc_submit_id(userId);

						fungalIncubatorReportHistoryCLF013Repo.save(fungalIncubatorhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						fungalIncubatortest.setReason(reason);
						fungalIncubatortest.setQc_status(AppConstantsQc.MicroDesigneeRejected);
						fungalIncubatortest.setQc_submit_on(date);
						fungalIncubatortest.setQc_submit_id(userId);
						fungalIncubatortest.setQc_submit_by(userName);

						fungalIncubatortest.setQc_sign(userName);

						fungalIncubatorReportCLF013Repo.save(fungalIncubatortest);

						fungalIncubatorhistory = fungalIncubatorReportHistoryCLF013Repo
								.fetchLastSubmittedRecordPhNumber(fungalIncubatortest.getEq_id_no(),
										fungalIncubatortest.getDate());

						fungalIncubatorhistory.setQc_status(AppConstantsQc.MicroDesigneeRejected);
						fungalIncubatorhistory.setReason(reason);
						fungalIncubatorhistory.setQc_submit_on(date);
						fungalIncubatorhistory.setQc_submit_by(userName);
						fungalIncubatorhistory.setQc_sign(userName);
						fungalIncubatorhistory.setQc_submit_id(userId);

						fungalIncubatorReportHistoryCLF013Repo.save(fungalIncubatorhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}
	
	//---------------------------------------------------------------------------------------------------------------------------------------
	
	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveChemicalTestCLF024(DisposalRecord disposalRecord, HttpServletRequest http) {
		DisposalRecord disposalRecordObject = new DisposalRecord();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = disposalRecord.getTest_id();

			if (id != null) {
				disposalRecordObject = DisposalRecordRepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(disposalRecord, disposalRecordObject, IgnoreProps);

			if (id != null) {
				if (userRole.equalsIgnoreCase("LAB_ASSISTANT")) {

					disposalRecordObject.setChemist_saved_on(date);
					disposalRecordObject.setChemist_saved_id(userId);
					disposalRecordObject.setChemist_sign(userName);

					disposalRecordObject.setChemist_status(AppConstantsQc.LABASSISTANTSaved);

					DisposalRecordRepo.save(disposalRecordObject);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("LAB_ASSISTANT")) {

					

					disposalRecord.setChemist_saved_on(date);
					disposalRecord.setChemist_saved_id(userId);
					disposalRecord.setChemist_sign(userName);

					disposalRecord.setChemist_status(AppConstantsQc.LABASSISTANTSaved);

					DisposalRecordRepo.save(disposalRecord);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(disposalRecord, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestCLF024(@Valid DisposalRecord disposalRecord,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();	
		
		
		DisposalRecord disposalRecordObject = new DisposalRecord();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = disposalRecord.getTest_id();

			if (id != null) {
				disposalRecordObject = DisposalRecordRepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			BeanUtils.copyProperties(disposalRecord, disposalRecordObject, IgnoreProps);

			if (id != null ) {
				if (userRole.equalsIgnoreCase("LAB_ASSISTANT")) {

					disposalRecordObject.setQc_status(AppConstantsQc.waitingStatus);

					disposalRecordObject.setChemist_submit_on(date);
					disposalRecordObject.setChemist_submit_id(userId);
					disposalRecordObject.setChemist_sign(userName);
					disposalRecordObject.setChemist_status(AppConstantsQc.LABASSISTANTApproved);
					disposalRecordObject.setChemist_submit_by(userName);

					DisposalRecordRepo.save(disposalRecordObject);
					DisposalRecordHistory disposalRecordhistory = new DisposalRecordHistory();
					BeanUtils.copyProperties(disposalRecordObject, disposalRecordhistory);

					int version = DisposalRecordHistoryRepo.getMaximumVersion(disposalRecord.getDisposalName()).map(temp -> temp + 1)
							.orElse(1);
					disposalRecordhistory.setVersion(version);
					DisposalRecordHistoryRepo.save(disposalRecordhistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("LAB_ASSISTANT")) {

					disposalRecord.setQc_status(AppConstantsQc.waitingStatus);

					disposalRecord.setChemist_submit_on(date);
					disposalRecord.setChemist_submit_id(userId);
					disposalRecord.setChemist_sign(userName);
					disposalRecord.setChemist_submit_by(userName);
					disposalRecord.setChemist_status(AppConstantsQc.LABASSISTANTApproved);

					DisposalRecordRepo.save(disposalRecord);
					DisposalRecordHistory disposalRecordhistory = new DisposalRecordHistory();
					BeanUtils.copyProperties(disposalRecord, disposalRecordhistory);

					int version = DisposalRecordHistoryRepo
							.getMaximumVersion(disposalRecord.getDisposalName()).map(temp -> temp + 1)
							.orElse(1);
					disposalRecordhistory.setVersion(version);
					DisposalRecordHistoryRepo.save(disposalRecordhistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}

			try {

				qcmailfunction.sendEmailToF024(disposalRecord);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(disposalRecord, HttpStatus.OK);

	}

	public ResponseEntity<?> getTestByBatchClF024(String year,String month,String date) {
		List<DisposalRecord> disposalRecord = new ArrayList<>();
	    
	    year = (year == null || year.trim().isEmpty()) ? null : year.trim();
	    month = (month == null || month.trim().isEmpty()) ? null : month.trim();
	    date = (date == null || date.trim().isEmpty()) ? null : date.trim();

				disposalRecord = DisposalRecordRepo.findByBatch(year ,month,date);
			
		
		try {
			return new ResponseEntity(disposalRecord, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printClF024(String year,String month,String date) {
	
		List<DisposalRecord> disposalRecord = new ArrayList<>();
	    
	    year = (year == null || year.trim().isEmpty()) ? null : year.trim();
	    month = (month == null || month.trim().isEmpty()) ? null : month.trim();
	    date = (date == null || date.trim().isEmpty()) ? null : date.trim();	
		
	
			disposalRecord = DisposalRecordRepo.print(year ,month,date);
		
		
		try {
			return new ResponseEntity(disposalRecord, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdClF024(@Valid Long id) {
		DisposalRecord disposalRecord = DisposalRecordRepo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(disposalRecord, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestClF024(HttpServletRequest http) {
		List<DisposalRecord> disposalRecordReportCLF013 = new ArrayList<>();
		List<physicalandchemicaltest> details = new ArrayList<>();
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

		if (userRole.equals("LAB_ASSISTANT")) {

			disposalRecordReportCLF013 = DisposalRecordRepo.chemistSummary();
		}

		else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			disposalRecordReportCLF013 = DisposalRecordRepo.exeManagerSummary();
		} 
		
		else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

			disposalRecordReportCLF013 = DisposalRecordRepo.microSummary();
		}
		
		try {
			return new ResponseEntity(disposalRecordReportCLF013, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	

	public ResponseEntity<?> approveCLF024(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		
		
		DisposalRecord disposalRecordtest = new DisposalRecord();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			disposalRecordtest = DisposalRecordRepo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			DisposalRecordHistory disposalRecordhistory = new DisposalRecordHistory();

			String supervisiorStatus = disposalRecordtest.getChemist_status() != null ? disposalRecordtest.getChemist_status()
					: disposalRecordtest.getChemist_status();

			String hodStatus = disposalRecordtest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("LAB_ASSISTANT") || userRole.equalsIgnoreCase("LAB_ASSISTANT")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						disposalRecordtest.setQc_status(AppConstantsQc.QCApprove);
						disposalRecordtest.setQc_submit_on(date);
						disposalRecordtest.setQc_submit_by(userName);
						disposalRecordtest.setQc_submit_id(userId);
						disposalRecordtest.setQc_sign(userName);

						DisposalRecordRepo.save(disposalRecordtest);

						disposalRecordhistory = DisposalRecordHistoryRepo
								.fetchLastSubmittedRecordPhNumber(disposalRecordtest.getDisposalName());

						disposalRecordhistory.setQc_status(AppConstantsQc.QCApprove);
						disposalRecordhistory.setQc_submit_on(date);
						disposalRecordhistory.setQc_submit_by(userName);
						disposalRecordhistory.setQc_sign(userName);
						disposalRecordhistory.setQc_submit_id(userId);

						DisposalRecordHistoryRepo.save(disposalRecordhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						disposalRecordtest.setReason(reason);
						disposalRecordtest.setQc_status(AppConstantsQc.QCRejected);
						disposalRecordtest.setQc_submit_on(date);
						disposalRecordtest.setQc_submit_id(userId);
						disposalRecordtest.setQc_submit_by(userName);

						disposalRecordtest.setQc_sign(userName);

						DisposalRecordRepo.save(disposalRecordtest);

						disposalRecordhistory = DisposalRecordHistoryRepo
								.fetchLastSubmittedRecordPhNumber(disposalRecordtest.getDisposalName());

						disposalRecordhistory.setQc_status(AppConstantsQc.QCRejected);
						disposalRecordhistory.setReason(reason);
						disposalRecordhistory.setQc_submit_on(date);
						disposalRecordhistory.setQc_submit_by(userName);
						disposalRecordhistory.setQc_sign(userName);
						disposalRecordhistory.setQc_submit_id(userId);

						DisposalRecordHistoryRepo.save(disposalRecordhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}
	
	//--------------------------------------------------CLF015-----------------------------------------------------
	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveChemicalTestCLF015(validationAutoclave validation, HttpServletRequest http) {
		validationAutoclave validationObject = new validationAutoclave();
		
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = validation.getTest_id();

			if (id != null) {
				validationObject = validationAutoclaveRepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(validation, validationObject, IgnoreProps);

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					validationObject.setMicro_saved_on(date);
					validationObject.setMicro_saved_id(userId);
					validationObject.setMicro_saved_by(userName);
//					validationObject.setMicro_sign(userName);
					
					validationObject.setMicro_status(AppConstantsQc.microBiologistSave);

					validationAutoclaveRepo.save(validationObject);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					validation.setMicro_saved_on(date);
					validation.setMicro_saved_id(userId);
					validation.setMicro_saved_by(userName);
//					validation.setMicro_sign(userName);

					validation.setMicro_status(AppConstantsQc.microBiologistSave);

					validationAutoclaveRepo.save(validation);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(validation, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestCLF015(@Valid validationAutoclave validation,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();	
		
		
		validationAutoclave validationObject = new validationAutoclave();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = validation.getTest_id();

			if (id != null) {
				validationObject = validationAutoclaveRepo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			BeanUtils.copyProperties(validation, validationObject, IgnoreProps);

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					validationObject.setQc_status(AppConstantsQc.waitingStatus);

					validationObject.setMicro_submit_on(date);
					validationObject.setMicro_submit_id(userId);
					validationObject.setMicro_sign(userName);
					validationObject.setMicro_submit_by(userName);
					
					validationObject.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					validationAutoclaveRepo.save(validationObject);
					validationAutoclaveHistory validationhistory = new validationAutoclaveHistory();
					BeanUtils.copyProperties(validationObject, validationhistory);

					int version = validationAutoclaveHistoryRepo.getMaximumVersion(validation.getMonth() ,validation.getYear(), validation.getDate()).map(temp -> temp + 1)
							.orElse(1);
					validationhistory.setVersion(version);
					validationAutoclaveHistoryRepo.save(validationhistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					validation.setQc_status(AppConstantsQc.waitingStatus);

					validation.setMicro_submit_on(date);
					validation.setMicro_submit_id(userId);
					validation.setMicro_sign(userName);
					validation.setMicro_submit_by(userName);
					validation.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					validationAutoclaveRepo.save(validation);
					validationAutoclaveHistory validationhistory = new validationAutoclaveHistory();
					BeanUtils.copyProperties(validation, validationhistory);

					int version = validationAutoclaveHistoryRepo
							.getMaximumVersion(validation.getMonth() ,validation.getYear() , validation.getDate()).map(temp -> temp + 1)
							.orElse(1);
					validationhistory.setVersion(version);
					validationAutoclaveHistoryRepo.save(validationhistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}
			
			try {

				qcmailfunction.sendEmailToF015(validation);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(validation, HttpStatus.OK);

	}

	public ResponseEntity<?> getTestByBatchCLF015(String year,String month,String date , String eqid) {
		List<validationAutoclave> validation = new ArrayList<>();

		 year = (year == null || year.trim().isEmpty()) ? null : year;
		    month = (month == null || month.trim().isEmpty()) ? null : month;
		    date = (date == null || date.trim().isEmpty()) ? null : date;
		    eqid = (eqid == null || eqid.trim().isEmpty()) ? null : eqid;
				validation = validationAutoclaveRepo.findByBatch(year ,month , date , eqid);
			
		
		try {
			return new ResponseEntity(validation, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printCLF015(String year,String month,String date,String eqid) {
	
		List<validationAutoclave> validation = new ArrayList<>();
		 year = (year == null || year.trim().isEmpty()) ? null : year;
		    month = (month == null || month.trim().isEmpty()) ? null : month;
		    date = (date == null || date.trim().isEmpty()) ? null : date;
		    eqid = (eqid == null || eqid.trim().isEmpty()) ? null : eqid;
			validation = validationAutoclaveRepo.print(year ,month , date , eqid);
		
		try {
			return new ResponseEntity(validation, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdCLF015(@Valid Long id) {
		validationAutoclave validation = validationAutoclaveRepo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(validation, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestCLF015(HttpServletRequest http) {
		List<validationAutoclave> validationReportCLF013 = new ArrayList<>();
		List<physicalandchemicaltest> details = new ArrayList<>();
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

//		if (userRole.equals("ROLE_MICROBIOLOGIST")) {
//
//			validationReportCLF013 = validationAutoclaveRepo.chemistSummary();
//		}
//
//		else
			
			if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			validationReportCLF013 = validationAutoclaveRepo.exeManagerSummary();
		} 
		
		else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

			validationReportCLF013 = validationAutoclaveRepo.microSummary();
		}
		
		try {
			return new ResponseEntity(validationReportCLF013, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
			
		}

	}
	
	

	public ResponseEntity<?> approveCLF015(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		
		
		validationAutoclave validationtest = new validationAutoclave();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			validationtest = validationAutoclaveRepo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			validationAutoclaveHistory validationhistory = new validationAutoclaveHistory();

			String supervisiorStatus = validationtest.getMicro_status() != null ? validationtest.getMicro_status()
					: validationtest.getMicro_status();

			String hodStatus = validationtest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager") || userRole.equalsIgnoreCase("QA_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						validationtest.setQc_status(AppConstantsQc.QCApprove);
						validationtest.setQc_submit_on(date);
						validationtest.setQc_submit_by(userName);
						validationtest.setQc_submit_id(userId);			
						validationtest.setQc_sign(userName);

						validationAutoclaveRepo.save(validationtest);

						validationhistory = validationAutoclaveHistoryRepo
								.fetchLastSubmittedRecordPhNumber(validationtest.getMonth(),validationtest.getYear(), validationtest.getDate());

						validationhistory.setQc_status(AppConstantsQc.QCApprove);
						validationhistory.setQc_submit_on(date);
						validationhistory.setQc_submit_by(userName);
						validationhistory.setQc_sign(userName);
						validationhistory.setQc_submit_id(userId);

						validationAutoclaveHistoryRepo.save(validationhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						validationtest.setReason(reason);
						validationtest.setQc_status(AppConstantsQc.QCRejected);
						validationtest.setQc_submit_on(date);
						validationtest.setQc_submit_by(userName);
						validationtest.setQc_submit_id(userId);

						validationtest.setQc_sign(userName);

						validationAutoclaveRepo.save(validationtest);

						validationhistory = validationAutoclaveHistoryRepo
								.fetchLastSubmittedRecordPhNumber(validationtest.getMonth(),validationtest.getYear(), validationtest.getDate());

						validationhistory.setQc_status(AppConstantsQc.QCRejected);
						validationhistory.setReason(reason);
						validationhistory.setQc_submit_on(date);
						validationhistory.setQc_submit_by(userName);
						validationhistory.setQc_sign(userName);
						validationhistory.setQc_submit_id(userId);

						validationAutoclaveHistoryRepo.save(validationhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}
	
	//-----------------------------------------------------------CL-F018----------------------------------------------------------------

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveChemicalTestCLF018(temperatureRelativeF018 temperatureRelat, HttpServletRequest http) {
		temperatureRelativeF018 temperatureRelatObject = new temperatureRelativeF018();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = temperatureRelat.getTest_id();

			if (id != null) {
				temperatureRelatObject = temperatureRelativeF018Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(temperatureRelat, temperatureRelatObject, IgnoreProps);

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					temperatureRelatObject.setMicro_saved_on(date);
					temperatureRelatObject.setMicro_saved_id(userId);
					temperatureRelatObject.setMicro_sign(userName);

					temperatureRelatObject.setMicro_status(AppConstantsQc.microBiologistSave);

					temperatureRelativeF018Repo.save(temperatureRelatObject);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					temperatureRelat.setMicro_saved_on(date);
					temperatureRelat.setMicro_saved_id(userId);
					temperatureRelat.setMicro_sign(userName);

					temperatureRelat.setMicro_status(AppConstantsQc.microBiologistSave);

					temperatureRelativeF018Repo.save(temperatureRelat);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(temperatureRelat, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestCLF018(@Valid temperatureRelativeF018 temperatureRelat,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();	
		
		
		temperatureRelativeF018 temperatureRelatObject = new temperatureRelativeF018();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = temperatureRelat.getTest_id();

			if (id != null) {
				temperatureRelatObject = temperatureRelativeF018Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			BeanUtils.copyProperties(temperatureRelat, temperatureRelatObject, IgnoreProps);

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					temperatureRelatObject.setQc_status(AppConstantsQc.waitingStatus);

					temperatureRelatObject.setMicro_submit_on(date);
					temperatureRelatObject.setMicro_submit_id(userId);
					temperatureRelatObject.setMicro_sign(userName);
					temperatureRelatObject.setMicro_status(AppConstantsQc.microBiologistSubmitted);
					temperatureRelatObject.setMicro_submit_by(userName);
					temperatureRelativeF018Repo.save(temperatureRelatObject);
					temperatureRelativeHistoryF018 temperatureRelathistory = new temperatureRelativeHistoryF018();
					BeanUtils.copyProperties(temperatureRelatObject, temperatureRelathistory);

					int version = temperatureRelativeHistoryF018Repo.getMaximumVersion(temperatureRelat.getEq_no(),temperatureRelat.getDate()).map(temp -> temp + 1)
							.orElse(1);
					temperatureRelathistory.setVersion(version);
					temperatureRelativeHistoryF018Repo.save(temperatureRelathistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					temperatureRelat.setQc_status(AppConstantsQc.waitingStatus);

					temperatureRelat.setMicro_submit_on(date);
					temperatureRelat.setMicro_submit_id(userId);
					temperatureRelat.setMicro_sign(userName);
					temperatureRelat.setMicro_submit_by(userName);
					temperatureRelat.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					temperatureRelat =  temperatureRelativeF018Repo.save(temperatureRelat);
					temperatureRelativeHistoryF018 temperatureRelathistory = new temperatureRelativeHistoryF018();
					BeanUtils.copyProperties(temperatureRelat, temperatureRelathistory);

					int version = temperatureRelativeHistoryF018Repo
							.getMaximumVersion(temperatureRelat.getEq_no(),temperatureRelat.getDate()).map(temp -> temp + 1)
							.orElse(1);
					temperatureRelathistory.setVersion(version);
					temperatureRelativeHistoryF018Repo.save(temperatureRelathistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}

			try {

				qcmailfunction.sendEmailToF018(temperatureRelat);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(temperatureRelat, HttpStatus.OK);

	}

	public ResponseEntity<?> getTestByBatchCLF018(String e1_no,String year,String month,String date) {
		List<temperatureRelativeF018> temperatureRelat = new ArrayList<>();

	    e1_no = (e1_no == null || e1_no.trim().isEmpty()) ? null : e1_no.trim();
	    year = (year == null || year.trim().isEmpty()) ? null : year.trim();
	    month = (month == null || month.trim().isEmpty()) ? null : month.trim();
	    date = (date == null || date.trim().isEmpty()) ? null : date.trim();
				temperatureRelat = temperatureRelativeF018Repo.findByBatch(e1_no,year ,month,date);
			
		
		try {
			return new ResponseEntity(temperatureRelat, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printCLF018(String e1_no,String year,String month,String date) {
	
		List<temperatureRelativeF018> temperatureRelat = new ArrayList<>();
	    e1_no = (e1_no == null || e1_no.trim().isEmpty()) ? null : e1_no.trim();
	    year = (year == null || year.trim().isEmpty()) ? null : year.trim();
	    month = (month == null || month.trim().isEmpty()) ? null : month.trim();
	    date = (date == null || date.trim().isEmpty()) ? null : date.trim();
			temperatureRelat = temperatureRelativeF018Repo.print(e1_no,year ,month,date);
		
		try {
			return new ResponseEntity(temperatureRelat, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdCLF018(@Valid Long id) {
		temperatureRelativeF018 temperatureRelat = temperatureRelativeF018Repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(temperatureRelat, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestCLF018(HttpServletRequest http) {
		
		List<temperatureRelativeF018> temperatureRelatReportCLF018 = new ArrayList<>();
		List<physicalandchemicaltest> details = new ArrayList<>();
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

	 if (userRole.equalsIgnoreCase("MICRO_DESIGNEE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			temperatureRelatReportCLF018 = temperatureRelativeF018Repo.exeManagerSummary();
		} 
		
		else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

			temperatureRelatReportCLF018 = temperatureRelativeF018Repo.microSummary();
		}
		
		try {
			return new ResponseEntity(temperatureRelatReportCLF018, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	

	public ResponseEntity<?> approveCLF018(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		
		
		temperatureRelativeF018 temperatureRelattest = new temperatureRelativeF018();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			temperatureRelattest = temperatureRelativeF018Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			temperatureRelativeHistoryF018 temperatureRelathistory = new temperatureRelativeHistoryF018();

			String supervisiorStatus = temperatureRelattest.getMicro_status() != null ? temperatureRelattest.getMicro_status()
					: temperatureRelattest.getMicro_status();

			String hodStatus = temperatureRelattest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) || hodStatus.equalsIgnoreCase(AppConstantsQc.MicroDesigneeRejected))) {

				if (userRole.equalsIgnoreCase("QC_MANAGER") ) {

					if (approvalResponse.getStatus().equals("Approve")) {

						temperatureRelattest.setQc_status(AppConstantsQc.QCApprove);
						temperatureRelattest.setQc_submit_on(date);
						temperatureRelattest.setQc_submit_by(userName);
						temperatureRelattest.setQc_submit_id(userId);		
						temperatureRelattest.setQc_sign(userName);

						temperatureRelativeF018Repo.save(temperatureRelattest);

						temperatureRelathistory = temperatureRelativeHistoryF018Repo
								.fetchLastSubmittedRecordPhNumber(temperatureRelattest.getEq_no(),temperatureRelattest.getDate());

						temperatureRelathistory.setQc_status(AppConstantsQc.QCApprove);
						temperatureRelathistory.setQc_submit_on(date);
						temperatureRelathistory.setQc_submit_by(userName);
						temperatureRelathistory.setQc_sign(userName);
						temperatureRelathistory.setQc_submit_id(userId);	
						temperatureRelativeHistoryF018Repo.save(temperatureRelathistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						temperatureRelattest.setReason(reason);
						temperatureRelattest.setQc_status(AppConstantsQc.QCRejected);
						temperatureRelattest.setQc_submit_on(date);
						temperatureRelattest.setQc_submit_by(userName);
						temperatureRelattest.setQc_submit_id(userId);
						temperatureRelattest.setQc_sign(userName);

						temperatureRelativeF018Repo.save(temperatureRelattest);

						temperatureRelathistory = temperatureRelativeHistoryF018Repo
								.fetchLastSubmittedRecordPhNumber(temperatureRelattest.getEq_no(),temperatureRelattest.getDate());

						temperatureRelathistory.setQc_status(AppConstantsQc.QCRejected);
						temperatureRelathistory.setReason(reason);
						temperatureRelathistory.setQc_submit_on(date);
						temperatureRelathistory.setQc_submit_by(userName);
						temperatureRelathistory.setQc_sign(userName);
						temperatureRelathistory.setQc_submit_id(userId);
						
						temperatureRelativeHistoryF018Repo.save(temperatureRelathistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} 
				
				else if (userRole.equalsIgnoreCase("QA_MANAGER")) {


					if (approvalResponse.getStatus().equals("Approve")) {

						temperatureRelattest.setQc_status(AppConstantsQc.QAApprove);
						temperatureRelattest.setQc_submit_on(date);
						temperatureRelattest.setQc_submit_by(userName);
						temperatureRelattest.setQc_submit_id(userId);
						temperatureRelattest.setQc_sign(userName);

						temperatureRelativeF018Repo.save(temperatureRelattest);

						temperatureRelathistory = temperatureRelativeHistoryF018Repo
								.fetchLastSubmittedRecordPhNumber(temperatureRelattest.getEq_no(),temperatureRelattest.getDate());

						temperatureRelathistory.setQc_status(AppConstantsQc.QAApprove);
						temperatureRelathistory.setQc_submit_on(date);
						temperatureRelathistory.setQc_submit_by(userName);
						temperatureRelathistory.setQc_sign(userName);
						temperatureRelathistory.setQc_submit_id(userId);

						temperatureRelativeHistoryF018Repo.save(temperatureRelathistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						temperatureRelattest.setReason(reason);
						temperatureRelattest.setQc_status(AppConstantsQc.QAReject);
						temperatureRelattest.setQc_submit_on(date);
						temperatureRelattest.setQc_submit_by(userName);
						temperatureRelattest.setQc_submit_id(userId);
						temperatureRelattest.setQc_sign(userName);

						temperatureRelativeF018Repo.save(temperatureRelattest);

						temperatureRelathistory = temperatureRelativeHistoryF018Repo
								.fetchLastSubmittedRecordPhNumber(temperatureRelattest.getEq_no(),temperatureRelattest.getDate());

						temperatureRelathistory.setQc_status(AppConstantsQc.QAReject);
						temperatureRelathistory.setReason(reason);
						temperatureRelathistory.setQc_submit_on(date);
						temperatureRelathistory.setQc_submit_by(userName);
						temperatureRelathistory.setQc_sign(userName);
						temperatureRelathistory.setQc_submit_id(userId);

						temperatureRelativeHistoryF018Repo.save(temperatureRelathistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

					
				}
				
				else if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {
					

						if (approvalResponse.getStatus().equals("Approve")) {

							temperatureRelattest.setQc_status(AppConstantsQc.MicroDesigneeApprove);
							temperatureRelattest.setQc_submit_on(date);
							temperatureRelattest.setQc_submit_by(userName);
							temperatureRelattest.setQc_submit_id(userId);
							temperatureRelattest.setQc_sign(userName);

							temperatureRelativeF018Repo.save(temperatureRelattest);

							temperatureRelathistory = temperatureRelativeHistoryF018Repo
									.fetchLastSubmittedRecordPhNumber(temperatureRelattest.getEq_no(),temperatureRelattest.getDate());

							temperatureRelathistory.setQc_status(AppConstantsQc.MicroDesigneeApprove);
							temperatureRelathistory.setQc_submit_on(date);
							temperatureRelathistory.setQc_submit_by(userName);
							temperatureRelathistory.setQc_sign(userName);
							temperatureRelathistory.setQc_submit_id(userId);

							temperatureRelativeHistoryF018Repo.save(temperatureRelathistory);

							return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

						}

						else if (approvalResponse.getStatus().equals("Reject")) {

							String reason = approvalResponse.getRemarks();
							temperatureRelattest.setReason(reason);
							temperatureRelattest.setQc_status(AppConstantsQc.MicroDesigneeRejected);
							temperatureRelattest.setQc_submit_on(date);
							temperatureRelattest.setQc_submit_by(userName);
							temperatureRelattest.setQc_submit_id(userId);
							temperatureRelattest.setQc_sign(userName);

							temperatureRelativeF018Repo.save(temperatureRelattest);

							temperatureRelathistory = temperatureRelativeHistoryF018Repo
									.fetchLastSubmittedRecordPhNumber(temperatureRelattest.getEq_no(),temperatureRelattest.getDate());

							temperatureRelathistory.setQc_status(AppConstantsQc.MicroDesigneeRejected);
							temperatureRelathistory.setReason(reason);
							temperatureRelathistory.setQc_submit_on(date);
							temperatureRelathistory.setQc_submit_by(userName);
							temperatureRelathistory.setQc_sign(userName);
							temperatureRelathistory.setQc_submit_id(userId);

							temperatureRelativeHistoryF018Repo.save(temperatureRelathistory);

							return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

						}

						else {
							return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
						}

					}
				

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}
	
	//-----------------------------------------------------f022-------------------------------------------------------

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveCLF022(mediaDisposalCLF022 mediaDis, HttpServletRequest http) {
		mediaDisposalCLF022 medDis = new mediaDisposalCLF022();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = mediaDis.getTest_id();

			if (id != null) {
				medDis = mediaDisposalCLF022Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			
			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

//					for (mediaDisposalobsF022 obs : medDis.getObser()) {
//
//						if (obs.getId() != null) {
//							mediaDisposalobsF022 obe = mediaDisposalobsF022Repo.findById(obs.getId())
//									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//							BeanUtils.copyProperties(obs, obe);
//							mediaDisposalobsF022Repo.save(obe);
//						} else {
//							obs.setTest_id(medDis.getTest_id());
//							mediaDisposalobsF022Repo.save(obs);
//						}
//					}
					BeanUtils.copyProperties(mediaDis, medDis, IgnoreProps);

					medDis.setMicro_saved_on(date);
					medDis.setMicro_saved_id(userId);
					medDis.setMicro_sign(userName);

					medDis.setMicro_status(AppConstantsQc.microBiologistSave);

					mediaDisposalCLF022Repo.save(medDis);
					

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

//					for (mediaDisposalobsF022 obs : medDis.getObser()) {
//
//						if (obs.getId() != null) {
//							mediaDisposalobsF022 obe = mediaDisposalobsF022Repo.findById(obs.getId())
//									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//							BeanUtils.copyProperties(obs, obe);
//							mediaDisposalobsF022Repo.save(obe);
//						} else {
//							obs.setTest_id(medDis.getTest_id());
//							mediaDisposalobsF022Repo.save(obs);
//						}
//					}
					BeanUtils.copyProperties(mediaDis, medDis, IgnoreProps);

					mediaDis.setMicro_saved_on(date);
					mediaDis.setMicro_saved_id(userId);
					mediaDis.setMicro_sign(userName);

					mediaDis.setMicro_status(AppConstantsQc.microBiologistSave);

					mediaDisposalCLF022Repo.save(mediaDis);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save medDis test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(mediaDis, HttpStatus.OK);

	}
	
	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitCLF022(@Valid mediaDisposalCLF022 mediaDis,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();
		mediaDisposalCLF022 medDis = new mediaDisposalCLF022();
		String value = medDis.getMicro_saved_by()!=null ? medDis.getMicro_saved_by():medDis.getMicro_submit_by();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = mediaDis.getTest_id();

			if (id != null) {
				medDis = mediaDisposalCLF022Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

//		mediaDis.setCreatedAt(medDis.getCreatedAt());

			

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
					
					BeanUtils.copyProperties(mediaDis, medDis, IgnoreProps);

					medDis.setQc_status(AppConstantsQc.waitingStatus);

					medDis.setMicro_submit_on(date);
					medDis.setMicro_submit_id(userId);
					medDis.setMicro_sign(userName);
					medDis.setMicro_status(AppConstantsQc.microBiologistSubmitted);
					medDis.setMicro_submit_by(userName);	
//					medDis.setObser(null);
					mediaDisposalCLF022Repo.save(medDis);
					mediaDisposalHistoryCLF022 mediahistory = new mediaDisposalHistoryCLF022();
					BeanUtils.copyProperties(medDis, mediahistory);
					
					mediahistory.setTest_id(null);

//					int version = mediaDisposalHistoryCLF022Repo
//							.getMaximumVersiongetMaximumVersion(mediaDis.getTestDate()).map(temp -> temp + 1).orElse(1);
					
					int versionq = mediaDisposalHistoryCLF022Repo.getMaximumVersion(mediahistory.getTestDate())
							.map(temp -> temp + 1).orElse(1);
					mediahistory.setVersion(versionq);
					mediaDisposalHistoryCLF022Repo.save(mediahistory);
					
//					for (mediaDisposalobsF022 obs : mediaDis.getObser()) {
//						if (obs.getId() != null) {
//							mediaDisposalobsF022 obe = mediaDisposalobsF022Repo.findById(obs.getId())
//									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//							mediaDisposalHistoryCLF022 mediaDisposalobsF022History = new mediaDisposalHistoryCLF022();
//							BeanUtils.copyProperties(obs, mediaDisposalobsF022History);
//							BeanUtils.copyProperties(obs, obe);
//							mediaDisposalobsF022Repo.save(obs);
//							mediaDisposalobsF022History.setTest_id(mediahistory.getTest_id());;
//							mediaDisposalHistoryCLF022Repo.save(mediaDisposalobsF022History);
//						} else {
//							obs.setTest_id(mediaDis.getTest_id());
//							mediaDisposalHistoryCLF022 mediaDisposalobsF022History = new mediaDisposalHistoryCLF022();
//							BeanUtils.copyProperties(obs, mediaDisposalobsF022History);
//							mediaDisposalobsF022History.setTest_id(mediahistory.getTest_id());
//							mediaDisposalHistoryCLF022Repo.save(mediaDisposalobsF022History);
//							mediaDisposalobsF022Repo.save(obs);
//
//						}
//					}


				}
			
				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
				
			} else {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {
					
					BeanUtils.copyProperties(mediaDis, medDis, IgnoreProps);

					mediaDis.setQc_status(AppConstantsQc.waitingStatus);

					mediaDis.setMicro_submit_on(date);
					mediaDis.setMicro_submit_id(userId);
					mediaDis.setMicro_sign(userName);
					mediaDis.setMicro_status(AppConstantsQc.microBiologistSubmitted);
					mediaDis.setMicro_submit_by(userName);

					mediaDisposalCLF022Repo.save(mediaDis);
					mediaDisposalHistoryCLF022 mediahistory = new mediaDisposalHistoryCLF022();
					BeanUtils.copyProperties(mediaDis, mediahistory);
					
					mediahistory.setTest_id(null);

					int version = mediaDisposalHistoryCLF022Repo
							.getMaximumVersiongetMaximumVersion(mediahistory.getTestDate()).map(temp -> temp + 1).orElse(1);
					mediahistory.setVersion(version);
					mediaDisposalHistoryCLF022Repo.save(mediahistory);
					
//					for (mediaDisposalobsF022 obs : mediaDis.getObser()) {
//						if (obs.getId() != null) {
//							mediaDisposalobsF022 obe = mediaDisposalobsF022Repo.findById(obs.getId())
//									.orElseThrow(() -> new EntityNotFoundException("Test not found"));
//							mediaDisposalHistoryCLF022 mediaDisposalobsF022History = new mediaDisposalHistoryCLF022();
//							BeanUtils.copyProperties(obs, mediaDisposalobsF022History);
//							BeanUtils.copyProperties(obs, obe);
//							mediaDisposalobsF022Repo.save(obe);
//							mediaDisposalobsF022History.setTest_id(mediahistory.getTest_id());
//							mediaDisposalHistoryCLF022Repo.save(mediaDisposalobsF022History);
//						} else {
//							obs.setTest_id(mediaDis.getTest_id());
//							mediaDisposalHistoryCLF022 mediaDisposalobsF022History = new mediaDisposalHistoryCLF022();
//							BeanUtils.copyProperties(obs, mediaDisposalobsF022History);
//							mediaDisposalobsF022History.setTest_id(mediahistory.getTest_id());
//							mediaDisposalHistoryCLF022Repo.save(mediaDisposalobsF022History);
//							mediaDisposalobsF022Repo.save(obs);
//
//						}
//					}
					


				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

			
			try {

				qcmailfunction.sendEmailToF022(mediaDis);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(mediaDis, HttpStatus.OK);

	}

	public ResponseEntity<?> getbyDateF022(String year , String month , String date) {
		List<mediaDisposalCLF022> mediaDis = new ArrayList<>();
	    
	    year = (year == null || year.trim().isEmpty()) ? null : year.trim();
	    month = (month == null || month.trim().isEmpty()) ? null : month.trim();
	    date = (date == null || date.trim().isEmpty()) ? null : date.trim();
		try {
			mediaDis = mediaDisposalCLF022Repo.getByDate(year ,month,date);
			return new ResponseEntity(mediaDis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Date." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printCLF022(String e1_no,String year , String month ) {
		List<mediaDisposalCLF022> mediaDis = new ArrayList<>();
	    e1_no = (e1_no == null || e1_no.trim().isEmpty()) ? null : e1_no.trim();
	    year = (year == null || year.trim().isEmpty()) ? null : year.trim();
	    month = (month == null || month.trim().isEmpty()) ? null : month.trim();
	    
	
		 mediaDis = mediaDisposalCLF022Repo.print(e1_no,year ,month);
	
	
	
	try {
		return new ResponseEntity(mediaDis, HttpStatus.OK);
	} catch (Exception e) {
		return new ResponseEntity(new ApiResponse(false, "failed to print data" + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}}

	public ResponseEntity<?> getTestByIdCLF022(@Valid Long id) {
		mediaDisposalCLF022 mediaDis = mediaDisposalCLF022Repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(mediaDis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestCLF022(HttpServletRequest http) {
		List<mediaDisposalCLF022> mediaDis = new ArrayList<>();
				
				String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

				if (userRole.equals("ROLE_CHEMIST")) {

					mediaDis = mediaDisposalCLF022Repo.chemistSummary();
				}

				else if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
						|| userRole.equalsIgnoreCase("QA_MANAGER")) {
					mediaDis = mediaDisposalCLF022Repo.exeManagerSummary();
				} 
				
				else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

					mediaDis = mediaDisposalCLF022Repo.microSummary();
				}
		
		try {
			return new ResponseEntity(mediaDis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	
		
	}

	
	public ResponseEntity<?> approveCLF022(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();

		mediaDisposalCLF022 mediaDis = new mediaDisposalCLF022();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			mediaDis = mediaDisposalCLF022Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

           mediaDisposalHistoryCLF022 mediahistory = new mediaDisposalHistoryCLF022();

			String supervisiorStatus = mediaDis.getMicro_status() != null ? mediaDis.getMicro_status()
					: mediaDis.getMicro_status();

			String hodStatus = mediaDis.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						mediaDis.setQc_status(AppConstantsQc.QCApprove);
						mediaDis.setQc_submit_on(date);
						mediaDis.setQc_submit_by(userName);
						mediaDis.setQc_submit_id(userId);
						
						
						mediaDis.setQc_submit_id(userId);
						mediaDis.setQc_sign(userName);

						mediaDisposalCLF022Repo.save(mediaDis);
//
						mediahistory = mediaDisposalHistoryCLF022Repo
								.fetchLastSubmittedRecordPhNumber(mediaDis.getTestDate());

						mediahistory.setQc_status(AppConstantsQc.QCApprove);
						mediahistory.setQc_submit_on(date);
						mediahistory.setQc_submit_by(userName);
						mediahistory.setQc_submit_id(userId);
						mediahistory.setQc_sign(userName);
//						mediahistory.setQc_sign(userName);

						mediaDisposalHistoryCLF022Repo.save(mediahistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						mediaDis.setReason(reason);
						mediaDis.setQc_status(AppConstantsQc.QCRejected);
						mediaDis.setQc_submit_on(date);
						mediaDis.setQc_submit_by(userName);

						
						mediaDis.setQc_submit_id(userId);
						mediaDis.setQc_sign(userName);

						mediaDisposalCLF022Repo.save(mediaDis);

						mediahistory = mediaDisposalHistoryCLF022Repo.fetchLastSubmittedRecordPhNumber(mediaDis.getTestDate());

						mediahistory.setQc_status(AppConstantsQc.QCRejected);
						mediahistory.setReason(reason);
						mediahistory.setQc_submit_on(date);
						mediahistory.setQc_submit_by(userName);
						mediahistory.setQc_sign(userName);
						mediahistory.setQc_submit_id(userId);
						mediahistory.setQc_sign(userName);

						mediaDisposalHistoryCLF022Repo
								.save(mediahistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else if (userRole.equalsIgnoreCase("QA_Manager") ) {

					if (approvalResponse.getStatus().equals("Approve")) {

						mediaDis.setQc_status(AppConstantsQc.QAApprove);
						mediaDis.setQc_submit_on(date);
						mediaDis.setQc_submit_by(userName);
						mediaDis.setQc_submit_id(userId);
						mediaDis.setQc_sign(userName);
						

						mediaDisposalCLF022Repo.save(mediaDis);

						mediahistory = mediaDisposalHistoryCLF022Repo
								.fetchLastSubmittedRecordPhNumber(mediaDis.getTestDate());

						mediahistory.setQc_status(AppConstantsQc.QAApprove);
						mediahistory.setQc_submit_on(date);
						mediahistory.setQc_submit_by(userName);
						mediahistory.setQc_sign(userName);
						mediahistory.setQc_submit_id(userId);
						mediahistory.setQc_sign(userName);

						mediaDisposalHistoryCLF022Repo
								.save(mediahistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						mediaDis.setReason(reason);
						mediaDis.setQc_status(AppConstantsQc.QAReject);
						mediaDis.setQc_submit_on(date);
						mediaDis.setQc_submit_by(userName);
						mediaDis.setQc_submit_id(userId);
						mediaDis.setQc_sign(userName);

						

						mediaDisposalCLF022Repo.save(mediaDis);

						mediahistory = mediaDisposalHistoryCLF022Repo.fetchLastSubmittedRecordPhNumber(mediaDis.getTestDate());
						

						mediahistory.setQc_status(AppConstantsQc.QAReject);
						mediahistory.setReason(reason);
						mediahistory.setQc_submit_on(date);
						mediahistory.setQc_submit_by(userName);
						mediahistory.setQc_sign(userName);
						mediahistory.setQc_submit_id(userId);
						mediahistory.setQc_sign(userName);

						mediaDisposalHistoryCLF022Repo
								.save(mediahistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

				} else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}
		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}
		return null;

	}
	
	//-------------------------------------------------------CLF018-------------------------------------------------------------
	
	public ResponseEntity<?> saveChemicalTestCLF027(distillwaterconsumF27 distillwat, HttpServletRequest http) {
		distillwaterconsumF27 distillwatObject = new distillwaterconsumF27();
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = distillwat.getTest_id();

			if (id != null) {
				distillwatObject = distillwaterconsumF27Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(distillwat, distillwatObject, IgnoreProps);

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					distillwatObject.setChemist_saved_on(date);
					distillwatObject.setChemist_saved_id(userId);
//					distillwatObject.setChemist_sign(userName);

					distillwatObject.setChemist_status(AppConstantsQc.chemistSave);

					distillwaterconsumF27Repo.save(distillwatObject);
				} 

				else 
					if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

						distillwatObject.setMicro_saved_on(date);
						distillwatObject.setMicro_saved_id(userId);
//						distillwatObject.setChemist_sign(userName);

						distillwatObject.setMicro_status(AppConstantsQc.microBiologistSave);

						distillwaterconsumF27Repo.save(distillwatObject);
					} 

				
				
				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					distillwat.setChemist_saved_on(date);
					distillwat.setChemist_saved_id(userId);
//					distillwat.setChemist_sign(userName);

					distillwat.setChemist_status(AppConstantsQc.chemistSave);

					distillwaterconsumF27Repo.save(distillwat);
				}
				else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					distillwat.setMicro_saved_on(date);
					distillwat.setMicro_saved_id(userId);
//					distillwatObject.setChemist_sign(userName);

					distillwat.setMicro_status(AppConstantsQc.microBiologistSave);

					distillwaterconsumF27Repo.save(distillwat);
				} 

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(distillwat, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestCLF027(@Valid distillwaterconsumF27 distillwat,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();	
		
		
		distillwaterconsumF27 distillwatObject = new distillwaterconsumF27();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = distillwat.getTest_id();

			if (id != null) {
				distillwatObject = distillwaterconsumF27Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			BeanUtils.copyProperties(distillwat, distillwatObject, IgnoreProps);

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					distillwatObject.setQc_status(AppConstantsQc.waitingStatus);

					distillwatObject.setChemist_submit_on(date);
					distillwatObject.setChemist_submit_id(userId);
					distillwatObject.setChemist_sign(userName);
					distillwatObject.setChemist_status(AppConstantsQc.chemistSubmitted);

					distillwaterconsumF27Repo.save(distillwatObject);
					distillwaterconsumhistoryF27 distillwathistory = new distillwaterconsumhistoryF27();
					BeanUtils.copyProperties(distillwatObject, distillwathistory);

					int version = distillwaterconsumF27HistoryRepo.getMaximumVersion(distillwat.getEq_id(),distillwat.getDate()).map(temp -> temp + 1)
							.orElse(1);
					distillwathistory.setVersion(version);
					distillwaterconsumF27HistoryRepo.save(distillwathistory);

				}
				
				else if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					distillwatObject.setQc_status(AppConstantsQc.waitingStatus);

					distillwatObject.setMicro_submit_on(date);
					distillwatObject.setMicro_submit_id(userId);
					distillwatObject.setMicro_sign(userName);
					distillwatObject.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					distillwaterconsumF27Repo.save(distillwatObject);
					distillwaterconsumhistoryF27 distillwathistory = new distillwaterconsumhistoryF27();
					BeanUtils.copyProperties(distillwatObject, distillwathistory);

					int version = distillwaterconsumF27HistoryRepo.getMaximumVersion(distillwat.getEq_id(),distillwat.getDate()).map(temp -> temp + 1)
							.orElse(1);
					distillwathistory.setVersion(version);
					distillwaterconsumF27HistoryRepo.save(distillwathistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_CHEMIST")) {

					distillwat.setQc_status(AppConstantsQc.waitingStatus);

					distillwat.setChemist_submit_on(date);
					distillwat.setChemist_submit_id(userId);
					distillwat.setChemist_sign(userName);
					distillwat.setChemist_status(AppConstantsQc.chemistSubmitted);

					distillwat =  distillwaterconsumF27Repo.save(distillwat);
					distillwaterconsumhistoryF27 distillwathistory = new distillwaterconsumhistoryF27();
					BeanUtils.copyProperties(distillwat, distillwathistory);

					int version = distillwaterconsumF27HistoryRepo
							.getMaximumVersion(distillwat.getEq_id(),distillwat.getDate()).map(temp -> temp + 1)
							.orElse(1);
					distillwathistory.setVersion(version);
					distillwaterconsumF27HistoryRepo.save(distillwathistory);

				} 
				
				else 	 if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					distillwat.setQc_status(AppConstantsQc.waitingStatus);

					distillwat.setMicro_submit_on(date);
					distillwat.setMicro_submit_id(userId);
					distillwat.setMicro_sign(userName);
					distillwat.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					distillwaterconsumF27Repo.save(distillwat);
					distillwaterconsumhistoryF27 distillwathistory = new distillwaterconsumhistoryF27();
					BeanUtils.copyProperties(distillwat, distillwathistory);

					int version = distillwaterconsumF27HistoryRepo.getMaximumVersion(distillwat.getEq_id(),distillwat.getDate()).map(temp -> temp + 1)
							.orElse(1);
					distillwathistory.setVersion(version);
					distillwaterconsumF27HistoryRepo.save(distillwathistory);

				}
				
				

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}
			
			try {

				qcmailfunction.sendEmailToF027(distillwat);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(distillwat, HttpStatus.OK);

	}

	public ResponseEntity<?> getTestByBatchCLF027(String eq_id,String year,String month,String date) {
		List<distillwaterconsumF27> distillwat = new ArrayList<>();

				distillwat = distillwaterconsumF27Repo.findByBatch(eq_id,year ,month,date);
			
		
		try {
			return new ResponseEntity(distillwat, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printCLF027(String eq_id,String year,String month,String date) {
	
		List<distillwaterconsumF27> distillwat = new ArrayList<>();
	
			distillwat = distillwaterconsumF27Repo.print(eq_id,year ,month,date);
		
		try {
			return new ResponseEntity(distillwat, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdCLF027(@Valid Long id) {
		distillwaterconsumF27 distillwat = distillwaterconsumF27Repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(distillwat, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestCLF027(HttpServletRequest http) {
		
		List<distillwaterconsumF27> distillwatReportCLF027 = new ArrayList<>();
		List<physicalandchemicaltest> details = new ArrayList<>();
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

	 if (userRole.equalsIgnoreCase("MICRO_DESIGNEE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			distillwatReportCLF027 = distillwaterconsumF27Repo.exeManagerSummary();
		} 
		
		else 	if (userRole.equals("ROLE_CHEMIST")) {

			distillwatReportCLF027 = distillwaterconsumF27Repo.chemistSummary();
		}
	 
		else 	if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

			distillwatReportCLF027 = distillwaterconsumF27Repo.microSummary();
		}
		
		try {
			return new ResponseEntity(distillwatReportCLF027, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}
	
	

	public ResponseEntity<?> approveCLF027(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		
		
		distillwaterconsumF27 distillwattest = new distillwaterconsumF27();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			distillwattest = distillwaterconsumF27Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			distillwaterconsumhistoryF27 distillwathistory = new distillwaterconsumhistoryF27();

			String supervisiorStatus = distillwattest.getChemist_status() != null ? distillwattest.getChemist_status()
					: distillwattest.getMicro_status();

			String hodStatus = distillwattest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) || hodStatus.equalsIgnoreCase(AppConstantsQc.MicroDesigneeRejected))) {

				if (userRole.equalsIgnoreCase("QC_MANAGER") ) {

					if (approvalResponse.getStatus().equals("Approve")) {

						distillwattest.setQc_status(AppConstantsQc.QCApprove);
						distillwattest.setQc_submit_on(date);
						distillwattest.setQc_submit_by(userName);

						distillwattest.setQc_sign(userName);

						distillwaterconsumF27Repo.save(distillwattest);

						if(distillwaterconsumF27HistoryRepo
								.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate())!=null) {
							distillwathistory = distillwaterconsumF27HistoryRepo
									.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate());
						}

						distillwathistory.setQc_status(AppConstantsQc.QCApprove);
						distillwathistory.setQc_submit_on(date);
						distillwathistory.setQc_submit_by(userName);
						distillwathistory.setQc_sign(userName);

						distillwaterconsumF27HistoryRepo.save(distillwathistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						distillwattest.setReason(reason);
						distillwattest.setQc_status(AppConstantsQc.QCRejected);
						distillwattest.setQc_submit_on(date);
						distillwattest.setQc_submit_by(userName);

						distillwattest.setQc_sign(userName);

						distillwaterconsumF27Repo.save(distillwattest);

						if(distillwaterconsumF27HistoryRepo
								.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate())!=null) {
							distillwathistory = distillwaterconsumF27HistoryRepo
									.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate());
						}

						distillwathistory.setQc_status(AppConstantsQc.QCRejected);
						distillwathistory.setReason(reason);
						distillwathistory.setQc_submit_on(date);
						distillwathistory.setQc_submit_by(userName);
						distillwathistory.setQc_sign(userName);

						distillwaterconsumF27HistoryRepo.save(distillwathistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} 
				
				else if (userRole.equalsIgnoreCase("QA_MANAGER")) {


					if (approvalResponse.getStatus().equals("Approve")) {

						distillwattest.setQc_status(AppConstantsQc.QAApprove);
						distillwattest.setQc_submit_on(date);
						distillwattest.setQc_submit_by(userName);

						distillwattest.setQc_sign(userName);

						distillwaterconsumF27Repo.save(distillwattest);

						if(distillwaterconsumF27HistoryRepo
								.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate())!=null) {
							distillwathistory = distillwaterconsumF27HistoryRepo
									.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate());
						}
						

						distillwathistory.setQc_status(AppConstantsQc.QAApprove);
						distillwathistory.setQc_submit_on(date);
						distillwathistory.setQc_submit_by(userName);
						distillwathistory.setQc_sign(userName);

						distillwaterconsumF27HistoryRepo.save(distillwathistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						distillwattest.setReason(reason);
						distillwattest.setQc_status(AppConstantsQc.QAReject);
						distillwattest.setQc_submit_on(date);
						distillwattest.setQc_submit_by(userName);

						distillwattest.setQc_sign(userName);

						distillwaterconsumF27Repo.save(distillwattest);

						if(distillwaterconsumF27HistoryRepo
								.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate())!=null) {
							distillwathistory = distillwaterconsumF27HistoryRepo
									.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate());
						}

						distillwathistory.setQc_status(AppConstantsQc.QAReject);
						distillwathistory.setReason(reason);
						distillwathistory.setQc_submit_on(date);
						distillwathistory.setQc_submit_by(userName);
						distillwathistory.setQc_sign(userName);

						distillwaterconsumF27HistoryRepo.save(distillwathistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

					
				}
				
				else if (userRole.equalsIgnoreCase("MICRO_DESIGNEE")) {
					

						if (approvalResponse.getStatus().equals("Approve")) {

							distillwattest.setQc_status(AppConstantsQc.MicroDesigneeApprove);
							distillwattest.setQc_submit_on(date);
							distillwattest.setQc_submit_by(userName);

							distillwattest.setQc_sign(userName);

							distillwaterconsumF27Repo.save(distillwattest);

							if(distillwaterconsumF27HistoryRepo
									.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate())!=null) {
								distillwathistory = distillwaterconsumF27HistoryRepo
										.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate());
							}

							distillwathistory.setQc_status(AppConstantsQc.MicroDesigneeApprove);
							distillwathistory.setQc_submit_on(date);
							distillwathistory.setQc_submit_by(userName);
							distillwathistory.setQc_sign(userName);

							distillwaterconsumF27HistoryRepo.save(distillwathistory);

							return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

						}

						else if (approvalResponse.getStatus().equals("Reject")) {

							String reason = approvalResponse.getRemarks();
							distillwattest.setReason(reason);
							distillwattest.setQc_status(AppConstantsQc.MicroDesigneeRejected);
							distillwattest.setQc_submit_on(date);
							distillwattest.setQc_submit_by(userName);

							distillwattest.setQc_sign(userName);

							distillwaterconsumF27Repo.save(distillwattest);

							if(distillwaterconsumF27HistoryRepo
									.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate())!=null) {
								distillwathistory = distillwaterconsumF27HistoryRepo
										.fetchLastSubmittedRecordPhNumber(distillwattest.getEq_id(),distillwattest.getDate());
							}

							distillwathistory.setQc_status(AppConstantsQc.MicroDesigneeRejected);
							distillwathistory.setReason(reason);
							distillwathistory.setQc_submit_on(date);
							distillwathistory.setQc_submit_by(userName);
							distillwathistory.setQc_sign(userName);

							distillwaterconsumF27HistoryRepo.save(distillwathistory);

							return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

						}

						else {
							return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
						}

					}
				

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}
	//-----------------------------------------------------CLF020------------------------------------------------------------------------
	
	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveChemicalTestCLF020(microbiologicalAnalyisisReportF20 microbipReportF20, HttpServletRequest http) {
		microbiologicalAnalyisisReportF20 microbipReportF20Object = new microbiologicalAnalyisisReportF20();
		
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = microbipReportF20.getTest_id();

			if (id != null) {
				microbipReportF20Object = microbiologicalAnalyisisReportF20Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(microbipReportF20, microbipReportF20Object, IgnoreProps);

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					microbipReportF20Object.setMicro_saved_on(date);
					microbipReportF20Object.setMicro_saved_id(userId);
//					microbipReportF20Object.setMicro_sign(userName);

					microbipReportF20Object.setMicro_status(AppConstantsQc.microBiologistSave);

					microbiologicalAnalyisisReportF20Repo.save(microbipReportF20Object);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					microbipReportF20.setMicro_saved_on(date);
					microbipReportF20.setMicro_saved_id(userId);
//					microbipReportF20.setMicro_sign(userName);

					microbipReportF20.setMicro_status(AppConstantsQc.microBiologistSave);

					microbiologicalAnalyisisReportF20Repo.save(microbipReportF20);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(microbipReportF20, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestCLF020(@Valid microbiologicalAnalyisisReportF20 microbipReportF20,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();	
		
		
		microbiologicalAnalyisisReportF20 microbipReportF20Object = new microbiologicalAnalyisisReportF20();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = microbipReportF20.getTest_id();

			if (id != null) {
				microbipReportF20Object = microbiologicalAnalyisisReportF20Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			BeanUtils.copyProperties(microbipReportF20, microbipReportF20Object, IgnoreProps);

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					microbipReportF20Object.setQc_status(AppConstantsQc.waitingStatus);

					microbipReportF20Object.setMicro_submit_on(date);
					microbipReportF20Object.setMicro_submit_id(userId);
					microbipReportF20Object.setMicro_sign(userName);
					microbipReportF20Object.setMicro_submit_by(userName);	
					microbipReportF20Object.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					microbiologicalAnalyisisReportF20Repo.save(microbipReportF20Object);
					microbiologicalAnalyisisReportHistoryF20 validationhistory = new microbiologicalAnalyisisReportHistoryF20();
					BeanUtils.copyProperties(microbipReportF20Object, validationhistory );

					int version = microbiologicalAnalyisisReportF20HistoryRepo.getMaximumVersion(microbipReportF20.getTestedIncubationStartOn()).map(temp -> temp + 1)
							.orElse(1);
					validationhistory.setVersion(version);
					microbiologicalAnalyisisReportF20HistoryRepo.save(validationhistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_MICROBIOLOGIST")) {

					microbipReportF20.setQc_status(AppConstantsQc.waitingStatus);

					microbipReportF20.setMicro_submit_on(date);
					microbipReportF20.setMicro_submit_id(userId);
					microbipReportF20.setMicro_sign(userName);
					microbipReportF20.setMicro_submit_by(userName);
					microbipReportF20.setMicro_status(AppConstantsQc.microBiologistSubmitted);

					microbiologicalAnalyisisReportF20Repo.save(microbipReportF20);
					microbiologicalAnalyisisReportHistoryF20 validationhistory = new microbiologicalAnalyisisReportHistoryF20();
					BeanUtils.copyProperties(microbipReportF20, validationhistory );

					int version = microbiologicalAnalyisisReportF20HistoryRepo
							.getMaximumVersion(microbipReportF20.getTestedIncubationStartOn()).map(temp -> temp + 1)
							.orElse(1);
					validationhistory.setVersion(version);
					microbiologicalAnalyisisReportF20HistoryRepo.save(validationhistory);

				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}

			try {

				qcmailfunction.sendEmailToF020(microbipReportF20);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}
			
		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(microbipReportF20, HttpStatus.OK);

	}

	public ResponseEntity<?> getTestByBatchCLF020(String year,String month,String date ) {
		List<microbiologicalAnalyisisReportF20> microbipReportF20 = new ArrayList<>();
		 year = (year == null || year.trim().isEmpty()) ? null : year;
		    month = (month == null || month.trim().isEmpty()) ? null : month;
		    date = (date == null || date.trim().isEmpty()) ? null : date;

				microbipReportF20 = microbiologicalAnalyisisReportF20Repo.findByBatch(year ,month , date );
			
		
		try {
			return new ResponseEntity(microbipReportF20, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printCLF020(String year,String month,String date) {
	
		List<microbiologicalAnalyisisReportF20> microbipReportF20 = new ArrayList<>();
		 year = (year == null || year.trim().isEmpty()) ? null : year;
		    month = (month == null || month.trim().isEmpty()) ? null : month;
		    date = (date == null || date.trim().isEmpty()) ? null : date;
		
	
			microbipReportF20 = microbiologicalAnalyisisReportF20Repo.print(year ,month , date);
		
		try {
			return new ResponseEntity(microbipReportF20, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdCLF020(@Valid Long id) {
		microbiologicalAnalyisisReportF20 microbipReportF20 = microbiologicalAnalyisisReportF20Repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(microbipReportF20, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestCLF020(HttpServletRequest http) {
		List<microbiologicalAnalyisisReportF20> validationReportCLF013 = new ArrayList<>();
		List<physicalandchemicaltest> details = new ArrayList<>();
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);

//		if (userRole.equals("ROLE_MICROBIOLOGIST")) {
//
//			validationReportCLF013 = microbiologicalAnalyisisReportF20Repo.chemistSummary();
//		}
//
//		else
			
			if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			validationReportCLF013 = microbiologicalAnalyisisReportF20Repo.exeManagerSummary();
		} 
		
		else 	if (userRole.equals("ROLE_MICROBIOLOGIST")) {

			validationReportCLF013 = microbiologicalAnalyisisReportF20Repo.microSummary();
		}
		
		try {
			return new ResponseEntity(validationReportCLF013, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
			
		}

	}
	
	

	public ResponseEntity<?> approveCLF020(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		
		
		microbiologicalAnalyisisReportF20 validationtest = new microbiologicalAnalyisisReportF20();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			validationtest = microbiologicalAnalyisisReportF20Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			microbiologicalAnalyisisReportHistoryF20 validationhistory = new microbiologicalAnalyisisReportHistoryF20();

			String supervisiorStatus = validationtest.getMicro_status() != null ? validationtest.getMicro_status()
					: validationtest.getMicro_status();

			String hodStatus = validationtest.getQc_status();

			if ((supervisiorStatus.equalsIgnoreCase(AppConstantsQc.chemistSubmitted)
					|| supervisiorStatus.equalsIgnoreCase(AppConstantsQc.microBiologistSubmitted))
					&& (hodStatus.equalsIgnoreCase(AppConstantsQc.waitingStatus) || hodStatus.equalsIgnoreCase(AppConstantsQc.QCRejected) ||hodStatus.equalsIgnoreCase(AppConstantsQc.QAReject) )) {

				if (userRole.equalsIgnoreCase("QC_Manager") || userRole.equalsIgnoreCase("QA_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						validationtest.setQc_status(AppConstantsQc.QCApprove);
						validationtest.setQc_submit_on(date);
						validationtest.setQc_submit_by(userName);

						validationtest.setQc_sign(userName);

						microbiologicalAnalyisisReportF20Repo.save(validationtest);

						validationhistory = microbiologicalAnalyisisReportF20HistoryRepo
								.fetchLastSubmittedRecordPhNumber(validationtest.getTestedIncubationStartOn());

						validationhistory.setQc_status(AppConstantsQc.QCApprove);
						validationhistory.setQc_submit_on(date);
						validationhistory.setQc_submit_by(userName);
						validationhistory.setQc_sign(userName);
						validationhistory.setQc_submit_id(userId);		
						microbiologicalAnalyisisReportF20HistoryRepo.save(validationhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						validationtest.setReason(reason);
						validationtest.setQc_status(AppConstantsQc.QCRejected);
						validationtest.setQc_submit_on(date);
						validationtest.setQc_submit_by(userName);

						validationtest.setQc_sign(userName);

						microbiologicalAnalyisisReportF20Repo.save(validationtest);

						validationhistory = microbiologicalAnalyisisReportF20HistoryRepo
								.fetchLastSubmittedRecordPhNumber(validationtest.getTestedIncubationStartOn());
						validationhistory.setQc_status(AppConstantsQc.QCRejected);
						validationhistory.setReason(reason);
						validationhistory.setQc_submit_on(date);
						validationhistory.setQc_submit_by(userName);
						validationhistory.setQc_sign(userName);
						validationhistory.setQc_submit_id(userId);

						microbiologicalAnalyisisReportF20HistoryRepo.save(validationhistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				}

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}

			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}
	
	//------------------------------------------------------F029---------------------------------------------------
	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> saveChemicalTestCLF029(RequistionF029 requis, HttpServletRequest http) {
		RequistionF029 requisObject = new RequistionF029();
		
		SCAUtil sca = new SCAUtil();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = requis.getTest_id();

			if (id != null) {
				requisObject = requistionF029Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}
			BeanUtils.copyProperties(requis, requisObject, IgnoreProps);

			if (id != null) {
				if (userRole.equalsIgnoreCase("ROLE_OPERATOR")) {

					requisObject.setChemist_saved_on(date);
					requisObject.setChemist_saved_id(userId);
//					requisObject.setChemist_sign(userName);

					requisObject.setChemist_status(AppConstantsQc.operatorSAVED);

					requistionF029Repo.save(requisObject);
				}

				else if (userRole.equalsIgnoreCase("ROLE_QA")) {

					requisObject.setIns_saved_on(date);
					requisObject.setIns_saved_id(userId);
//					requisObject.setChemist_sign(userName);

					requisObject.setIns_status(AppConstantsQc.QainspecterSAVED);

					requistionF029Repo.save(requisObject);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				if (userRole.equalsIgnoreCase("ROLE_OPERATOR")) {
					//ROLE_OPERATOR
					requis.setChemist_saved_on(date);
					requis.setChemist_saved_id(userId);
//					requis.setChemist_sign(userName);

					requis.setChemist_status(AppConstantsQc.operatorSAVED);

					requistionF029Repo.save(requis);
				}
				
				else if (userRole.equalsIgnoreCase("ROLE_QA")) {

					requis.setIns_saved_on(date);
					requis.setIns_saved_id(userId);
//					requis.setChemist_sign(userName);

					requis.setIns_status(AppConstantsQc.QainspecterSAVED);

					requistionF029Repo.save(requis);
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Save QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(requis, HttpStatus.OK);

	}

	@Transactional(rollbackFor = Exception.class)
	public ResponseEntity<?> submitChemicalTestCLF029(@Valid RequistionF029 requis,
			HttpServletRequest http) {
		SCAUtil sca = new SCAUtil();	
		
		
		RequistionF029 requisObject = new RequistionF029();
		try {

			String userRole = getUserRole();
			Long userId = sca.getUserIdFromRequest(http, tokenProvider);
			String userName = userRepository.getUserName(userId);
			LocalDateTime currentDate = LocalDateTime.now();
			Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

			Long id = requis.getTest_id();

			if (id != null) {
				requisObject = requistionF029Repo.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Test not found"));
			}

			BeanUtils.copyProperties(requis, requisObject, IgnoreProps);

			if (id != null ) {
				if (userRole.equalsIgnoreCase("ROLE_OPERATOR")) {

//					requisObject.setQc_status(AppConstantsQc.waitingStatus);

					requisObject.setChemist_submit_on(date);
					requisObject.setChemist_submit_id(userId);
					requisObject.setChemist_sign(userName);
					requisObject.setChemist_status(AppConstantsQc.operatorApproved);
					requisObject.setChemist_submit_by(userName);	
					
					requisObject.setIns_status(AppConstantsQc.waitingStatus);
							requistionF029Repo.save(requisObject);
					RequistionHistoryF029 requishistory = new RequistionHistoryF029();
					BeanUtils.copyProperties(requisObject, requishistory);

					int version = requistionHistoryF029Repo.getMaximumVersion(requishistory.getRevision_no()).map(temp -> temp + 1)
							.orElse(1);
					requishistory.setVersion(version);
					requistionHistoryF029Repo.save(requishistory);

				}
				
				else 	if (userRole.equals("ROLE_QA")) {


//					requisObject.setQc_status(AppConstantsQc.waitingStatus);

					requisObject.setIns_submit_on(date);
					requisObject.setIns_submit_id(userId);
					requisObject.setIns_sign(userName);
					requisObject.setIns_status(AppConstantsQc.QainspecterAPPROVED);
					requisObject.setQc_status_b(AppConstantsQc.waitingStatus);	
					requisObject.setIns_submit_by(userName);	
					requistionF029Repo.save(requisObject);
					RequistionHistoryF029 requishistory = new RequistionHistoryF029();
					BeanUtils.copyProperties(requisObject, requishistory);

					int version = requistionHistoryF029Repo.getMaximumVersion(requishistory.getRevision_no()).map(temp -> temp + 1)
							.orElse(1);
					requishistory.setVersion(version);
					requistionHistoryF029Repo.save(requishistory);

				
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			} else {

				if (userRole.equalsIgnoreCase("ROLE_OPERATOR")) {

//					requis.setQc_status(AppConstantsQc.waitingStatus);

					requis.setChemist_submit_on(date);
					requis.setChemist_submit_id(userId);
					requis.setChemist_sign(userName);
					requis.setChemist_status(AppConstantsQc.operatorApproved);
					requis.setIns_status(AppConstantsQc.waitingStatus);
					requis.setChemist_submit_by(userName);	
					requistionF029Repo.save(requis);
					RequistionHistoryF029 requishistory = new RequistionHistoryF029();
					BeanUtils.copyProperties(requis, requishistory);

					int version = requistionHistoryF029Repo
							.getMaximumVersion(requishistory.getRevision_no()).map(temp -> temp + 1)
							.orElse(1);
					requishistory.setVersion(version);
					requistionHistoryF029Repo.save(requishistory);

				}
				
				else 	if (userRole.equals("ROLE_QA")) {
					


//					requis.setQc_status(AppConstantsQc.waitingStatus);

					requis.setIns_submit_on(date);
					requis.setIns_submit_id(userId);
					requis.setIns_sign(userName);
					requis.setIns_status(AppConstantsQc.QainspecterAPPROVED);
					requis.setQc_status_b(AppConstantsQc.waitingStatus);
					requis.setIns_submit_by(userName);
					requistionF029Repo.save(requis);
					RequistionHistoryF029 requishistory = new RequistionHistoryF029();
					BeanUtils.copyProperties(requis, requishistory);

					int version = requistionHistoryF029Repo
							.getMaximumVersion(requishistory.getRevision_no()).map(temp -> temp + 1)
							.orElse(1);
					requishistory.setVersion(version);
					requistionHistoryF029Repo.save(requishistory);
					
				}

				else {
					return new ResponseEntity(new ApiResponse(false, userRole + "can not submit Details"),
							HttpStatus.BAD_REQUEST);
				}
			
			}
			
			try {

				qcmailfunction.sendEmailToF029(requis);
			} catch (Exception ex) {
				return new ResponseEntity<>(new ApiResponse(false, "Approved but Unable to send mail ! "),
						HttpStatus.OK);
			}

		} catch (Exception ex) {

			String msg = ex.getMessage();
			logger.error("Unable to Submit QC Chemical Test" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to Submit details." + msg),
					HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity(requis, HttpStatus.OK);

	}

	public ResponseEntity<?> getTestByBatchCLF029(String year) {
		List<RequistionF029> requis = new ArrayList<>();

		 year = (year == null || year.trim().isEmpty()) ? null : year;

		    
				requis = requistionF029Repo.findByBatch(year);
			
		
		try {
			return new ResponseEntity(requis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> printCLF029(String year) {
	
		List<RequistionF029> requis = new ArrayList<>();
		 year = (year == null || year.trim().isEmpty()) ? null : year;

		    
			requis = requistionF029Repo.print(year );
		
		try {
			return new ResponseEntity(requis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getTestByIdCLF029(@Valid Long id) {
		RequistionF029 requis = requistionF029Repo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Test not found"));
		try {
			return new ResponseEntity(requis, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to Test for this Batch No." + e.getMessage()),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> getallTestCLF029(HttpServletRequest http , String num) {
		List<RequistionF029> validationReportCLF013 = new ArrayList<>();
		List<physicalandchemicaltest> details = new ArrayList<>();
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
			
			if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			validationReportCLF013 = requistionF029Repo.ManagerSummary(num);
			
			if(validationReportCLF013 == null || validationReportCLF013.isEmpty()) {
				validationReportCLF013 = requistionF029Repo.finalManagerSummary(num);	
			}
			
		} 
			
			else if (userRole.equalsIgnoreCase("DEVELOPMENT_MANAGER") ) {
				validationReportCLF013 = requistionF029Repo.ManagerSummarydevelop(num);
			} 
				
				else if (userRole.equalsIgnoreCase("ROLE_HOD") ) {
					validationReportCLF013 = requistionF029Repo.ManagerSummaryhod(num);
				} 
		
		else 	if (userRole.equals("ROLE_QA")) {

			validationReportCLF013 = requistionF029Repo.InspecterManagerSummary();
		}
			
		else 	if (userRole.equals("ROLE_OPERATOR")) {

			validationReportCLF013 = requistionF029Repo.opeartorSummary(num);
		} 
		
		try {
			return new ResponseEntity(validationReportCLF013, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
			
		}

	}
	@Autowired
	DepartmentRepository departmentrepository;
	
	@Autowired
	UserRepository userrepo;
	
	public ResponseEntity<?> getallSummary (HttpServletRequest http) {
		List<RequistionF029> validationReportCLF013 = new ArrayList<>();
		List<physicalandchemicaltest> details = new ArrayList<>();
		
		String userRole = scaUtil.getUserRoleFromRequest(http, tokenProvider);
		String dep1 = scaUtil.getDepId(http, tokenProvider);

			
		
			if (userRole.equalsIgnoreCase("QA_EXECUTIVE") || userRole.equalsIgnoreCase("QC_MANAGER")
				|| userRole.equalsIgnoreCase("QA_MANAGER")) {
			validationReportCLF013 = requistionF029Repo.ManagerSummary();
			
			if(validationReportCLF013 == null || validationReportCLF013.isEmpty()) {
				validationReportCLF013 = requistionF029Repo.finalManagerSummary();	
			}
			
		} 
			
			else if (userRole.equalsIgnoreCase("DEVELOPMENT_MANAGER") ) {
				validationReportCLF013 = requistionF029Repo.ManagerSummarydevelop();
			} 
				
				else if (userRole.equalsIgnoreCase("ROLE_HOD") ) {
					String id = userrepo.getDepartmentByemail(dep1);
					String department = departmentrepository.getDeaprtmentById(Long.parseLong(id));
					System.out.println("department: "+department);
					department = "%"+department+"%";
					validationReportCLF013 = requistionF029Repo.findFilteredReports(department);
				} 
		
		else 	if (userRole.equals("ROLE_QA")) {

			validationReportCLF013 = requistionF029Repo.InspecterManagerSummary();
		}
			
		else 	if (userRole.equals("ROLE_OPERATOR")) {

			validationReportCLF013 = requistionF029Repo.opeartorSummary();
		} 
		
		try {
			return new ResponseEntity(validationReportCLF013, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(new ApiResponse(false, "Failed to get all test" + e.getMessage()),
					HttpStatus.BAD_REQUEST);
			
		}

	}
	
	

	public ResponseEntity<?> approveCLF029(ApproveResponse approvalResponse, HttpServletRequest http) {

		SCAUtil sca = new SCAUtil();
		
		
		RequistionF029 requisTest = new RequistionF029();

		String userRole = getUserRole();
		Long userId = sca.getUserIdFromRequest(http, tokenProvider);
		String userName = userRepository.getUserName(userId);
		LocalDateTime currentDate = LocalDateTime.now();
		Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

		try {

			requisTest = requistionF029Repo.findById(approvalResponse.getId())
					.orElseThrow(() -> new EntityNotFoundException("Test not found"));

			RequistionHistoryF029 requishistory = new RequistionHistoryF029();



			if (requisTest.getHod_status().equalsIgnoreCase(AppConstantsQc.hodApprove) &&  requisTest.getQc_status().equalsIgnoreCase(AppConstantsQc.waitingStatus)) {

				if (userRole.equalsIgnoreCase("QC_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						requisTest.setQc_status(AppConstantsQc.QCApprove);
						requisTest.setQc_submit_on(date);
						requisTest.setQc_submit_by(userName);
						requisTest.setQc_submit_id(userId);
						requisTest.setQc_sign(userName);

						
						requistionF029Repo.save(requisTest);

						requishistory = requistionHistoryF029Repo
								.fetchLastSubmittedRecordPhNumber(requisTest.getRequisitionNo());

						requishistory.setQc_status(AppConstantsQc.QCApprove);
						requishistory.setQc_submit_on(date);
						requishistory.setQc_submit_by(userName);
						requishistory.setQc_submit_id(userId);
						requishistory.setQc_sign(userName);

						requistionHistoryF029Repo.save(requishistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						requisTest.setReason(reason);
						requisTest.setQc_status(AppConstantsQc.QCRejected);
						requisTest.setQc_submit_on(date);
						requisTest.setQc_submit_by(userName);
						requisTest.setChemist_status(AppConstantsQc.waitingStatus);
						requisTest.setIns_status(null);
						requisTest.setDevelop_status(null);
						requisTest.setHod_status(null);
						requisTest.setQc_sign(userName);
						requisTest.setQc_status_b(null);
						requistionF029Repo.save(requisTest);

						requishistory = requistionHistoryF029Repo
								.fetchLastSubmittedRecordPhNumber(requisTest.getRequisitionNo());

						requishistory.setQc_status(AppConstantsQc.QCRejected);
						requishistory.setReason(reason);
						requishistory.setQc_submit_on(date);
						requishistory.setQc_submit_by(userName);
						requishistory.setQc_sign(userName);

						requishistory.setChemist_status(AppConstantsQc.waitingStatus);
						requishistory.setIns_status(null);
						requishistory.setDevelop_status(null);
						requishistory.setHod_status(null);
						requishistory.setQc_status_b(null);
						requishistory.setQc_submit_id(userId);
						requistionHistoryF029Repo.save(requishistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				} 
           
				else if (userRole.equalsIgnoreCase("QA_Manager")) {

					if (approvalResponse.getStatus().equals("Approve")) {

						requisTest.setQc_status(AppConstantsQc.QAApprove);
						requisTest.setQc_submit_on(date);
						requisTest.setQc_submit_by(userName);
						requisTest.setQc_submit_id(userId);
						requisTest.setQc_sign(userName);

						requistionF029Repo.save(requisTest);
//
						requishistory = requistionHistoryF029Repo
								.fetchLastSubmittedRecordPhNumber(requisTest.getRequisitionNo());

						requishistory.setQc_status(AppConstantsQc.QAApprove);
						requishistory.setQc_submit_on(date);
						requishistory.setQc_submit_by(userName);
						requishistory.setQc_sign(userName);
						requishistory.setQc_submit_id(userId);
						requistionHistoryF029Repo.save(requishistory);

						return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);

					}

					else if (approvalResponse.getStatus().equals("Reject")) {

						String reason = approvalResponse.getRemarks();
						requisTest.setReason(reason);
						requisTest.setQc_status(AppConstantsQc.QAReject);
						requisTest.setQc_submit_on(date);
						requisTest.setQc_submit_by(userName);
						requisTest.setChemist_status(AppConstantsQc.waitingStatus);
						requisTest.setIns_status(null);
						requisTest.setQc_status_b(null);
						requisTest.setDevelop_status(null);
						requisTest.setHod_status(null);

						requisTest.setQc_sign(userName);

						requistionF029Repo.save(requisTest);

						requishistory = requistionHistoryF029Repo
								.fetchLastSubmittedRecordPhNumber(requisTest.getRequisitionNo());

						requishistory.setQc_status(AppConstantsQc.QAReject);
						requishistory.setReason(reason);
						requishistory.setQc_submit_on(date);
						requishistory.setQc_submit_by(userName);
						requishistory.setQc_sign(userName);
						requishistory.setChemist_status(AppConstantsQc.waitingStatus);
						requishistory.setIns_status(null);
						requishistory.setQc_status_b(null);
						requishistory.setDevelop_status(null);
						requishistory.setHod_status(null);
						requishistory.setQc_submit_id(userId);
						requistionHistoryF029Repo.save(requishistory);

						return new ResponseEntity<>(new ApiResponse(true, "Rejected Successfully"), HttpStatus.OK);

					}

					else {
						return new ResponseEntity(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
					}

				
				}	
				
				

				else {
					return new ResponseEntity(new ApiResponse(false, "User not authroized to Approve/Reject"),
							HttpStatus.BAD_REQUEST);
				}

			}


			else {
				return new ResponseEntity(new ApiResponse(false, "Supervisior Not yet Approved"),
						HttpStatus.BAD_REQUEST);
			}

		} catch (Exception e) {

			String msg = e.getMessage();
			logger.error("Unable to Approve Record" + msg);

			return new ResponseEntity(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
					HttpStatus.BAD_REQUEST);

		}

	}
	
	
	public ResponseEntity<?> approveCLF029_2(ApproveResponse approvalResponse, HttpServletRequest http) {

	    SCAUtil sca = new SCAUtil();
	    RequistionF029 requisTest = new RequistionF029();

	    String userRole = getUserRole();
	    Long userId = sca.getUserIdFromRequest(http, tokenProvider);
	    String userName = userRepository.getUserName(userId);
	    LocalDateTime currentDate = LocalDateTime.now();
	    Date date = Date.from(currentDate.atZone(ZoneId.systemDefault()).toInstant());

	    try {
	        requisTest = requistionF029Repo.findById(approvalResponse.getId())
	                .orElseThrow(() -> new EntityNotFoundException("Test not found"));

	        RequistionHistoryF029 requishistory = new RequistionHistoryF029();

	        String supervisiorStatus = requisTest.getIns_status() != null ? requisTest.getIns_status() : "";
	        String hodStatus = requisTest.getQc_status();

	        // First check user role, then verify status
	        if (userRole.equalsIgnoreCase("QC_Manager")) {
	            if (requisTest.getQc_status_b().equalsIgnoreCase(AppConstantsQc.waitingStatus) &&  requisTest.getIns_status().equalsIgnoreCase(AppConstantsQc.QainspecterAPPROVED)  ){
	                
	                if (approvalResponse.getStatus().equals("Approve")) {
	                    requisTest.setQc_status_b(AppConstantsQc.QCApprove);
	                    requisTest.setQc_submit_on_b(date);
	                    requisTest.setQc_submit_by_b(userName);
	                    requisTest.setQc_sign_b(userName);
	                    requisTest.setDevelop_status(AppConstantsQc.waitingStatus);
	                    requisTest.setRemarks_a(approvalResponse.getRemarks_a());
	                    requisTest.setSample_requistion(approvalResponse.getSample_requistion());
	                    requistionF029Repo.save(requisTest);

	                    requishistory = requistionHistoryF029Repo
	                            .fetchLastSubmittedRecordPhNumber(requisTest.getRequisitionNo());

	                    requishistory.setQc_status_b(AppConstantsQc.QCApprove);
	                    requishistory.setQc_submit_on_b(date);
	                    requishistory.setQc_submit_by_b(userName);
	                    requishistory.setQc_sign_b(userName);
	                    requishistory.setQc_submit_id_b(userId);
	                    
	                    requishistory.setRemarks_a(approvalResponse.getRemarks_a());
	                    requishistory.setSample_requistion(approvalResponse.getSample_requistion());
	                    requishistory.setDevelop_status(AppConstantsQc.waitingStatus);
	                    requistionHistoryF029Repo.save(requishistory);

	                    return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
	                }
	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "Supervisor Not yet Approved or Invalid HOD Status"), HttpStatus.BAD_REQUEST);
	            }
	        } else if (userRole.equalsIgnoreCase("QA_Manager")) {
	            if (requisTest.getQc_status_b().equalsIgnoreCase(AppConstantsQc.waitingStatus) &&  requisTest.getIns_status().equalsIgnoreCase(AppConstantsQc.QainspecterAPPROVED)  ) {

	                if (approvalResponse.getStatus().equals("Approve")) {
	                    requisTest.setQc_status_b(AppConstantsQc.QAApprove);
	                    requisTest.setQc_submit_on_b(date);
	                    requisTest.setQc_submit_by_b(userName);
	                    requisTest.setRemarks_a(approvalResponse.getRemarks_a());
	                    requisTest.setSample_requistion(approvalResponse.getSample_requistion());
	                    requisTest.setQc_sign_b(userName);
	                    requisTest.setDevelop_status(AppConstantsQc.waitingStatus);
	                    requistionF029Repo.save(requisTest);

	                    requishistory = requistionHistoryF029Repo
	                            .fetchLastSubmittedRecordPhNumber(requisTest.getRequisitionNo());

	                    requishistory.setQc_status_b(AppConstantsQc.QAApprove);
	                    requishistory.setQc_submit_on_b(date);
	                    requishistory.setQc_submit_by_b(userName);
	                    requishistory.setQc_sign_b(userName);
	                    requishistory.setQc_submit_id_b(userId);
	                    requishistory.setRemarks_a(approvalResponse.getRemarks_a());
	                    requishistory.setSample_requistion(approvalResponse.getSample_requistion());
	                    requishistory.setDevelop_status(AppConstantsQc.waitingStatus);
	                    requistionHistoryF029Repo.save(requishistory);

	                    return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
	                }
	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "Supervisor Not yet Approved or Invalid HOD Status"), HttpStatus.BAD_REQUEST);
	            }
	        } else if (userRole.equalsIgnoreCase("DEVELOPMENT_MANAGER")) {
	            if (requisTest.getDevelop_status().equalsIgnoreCase(AppConstantsQc.waitingStatus) &&  (requisTest.getQc_status_b().equalsIgnoreCase(AppConstantsQc.QCApprove) ||requisTest.getQc_status_b().equalsIgnoreCase(AppConstantsQc.QAApprove) ) ) {

	                if (approvalResponse.getStatus().equals("Approve")) {
	                    requisTest.setDevelop_status(AppConstantsQc.developmentManagerApprove);
	                    requisTest.setDevelop_submit_on(date);
	                    requisTest.setDevelop_submit_by(userName);
	                    requisTest.setHod_status(AppConstantsQc.waitingStatus);
	                    requisTest.setDevelop_sign(userName);
	                    requisTest.setDevelop_id(userId);
	                    requistionF029Repo.save(requisTest);

	                    requishistory = requistionHistoryF029Repo
	                            .fetchLastSubmittedRecordPhNumber(requisTest.getRequisitionNo());

	                    requishistory.setDevelop_status(AppConstantsQc.developmentManagerApprove);
	                    requishistory.setDevelop_submit_on(date);
	                    requishistory.setDevelop_submit_by(userName);
	                    requishistory.setDevelop_sign(userName);
	                    requishistory.setDevelop_id(userId);
	                    requishistory.setHod_status(AppConstantsQc.waitingStatus);
	                    requishistory.setDevelop_id(userId);
	                    requistionHistoryF029Repo.save(requishistory);

	                    return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
	                }
	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "Supervisor Not yet Approved or Invalid HOD Status"), HttpStatus.BAD_REQUEST);
	            }
	        } else if (userRole.equalsIgnoreCase("ROLE_HOD")) {
	            if (requisTest.getHod_status().equalsIgnoreCase(AppConstantsQc.waitingStatus) &&  requisTest.getDevelop_status().equalsIgnoreCase(AppConstantsQc.developmentManagerApprove)  ) {

	                if (approvalResponse.getStatus().equals("Approve")) {
	                    requisTest.setHod_status(AppConstantsQc.hodApprove);
	                    requisTest.setHod_submit_on(date);
	                    requisTest.setHod_submit_by(userName);
	                    requisTest.setQc_status(AppConstantsQc.waitingStatus);
	                    requisTest.setHod_sign(userName);
	                    requistionF029Repo.save(requisTest);

	                    requishistory = requistionHistoryF029Repo
	                            .fetchLastSubmittedRecordPhNumber(requisTest.getRequisitionNo());

	                    requishistory.setHod_status(AppConstantsQc.hodApprove);
	                    requishistory.setHod_submit_on(date);
	                    requishistory.setHod_submit_by(userName);
	                    requishistory.setHod_sign(userName);
	                    requishistory.setHod_id(userId);
	                    requishistory.setQc_status(AppConstantsQc.waitingStatus);
	                    requistionHistoryF029Repo.save(requishistory);

	                    return new ResponseEntity<>(new ApiResponse(true, "Approved Successfully"), HttpStatus.OK);
	                } else {
	                    return new ResponseEntity<>(new ApiResponse(false, "Invalid Status"), HttpStatus.BAD_REQUEST);
	                }
	            } else {
	                return new ResponseEntity<>(new ApiResponse(false, "Supervisor Not yet Approved or Invalid HOD Status"), HttpStatus.BAD_REQUEST);
	            }
	        } else {
	            return new ResponseEntity<>(new ApiResponse(false, "User not authorized to Approve/Reject"), HttpStatus.BAD_REQUEST);
	        }

	    } catch (Exception e) {
	        String msg = e.getMessage();
	        logger.error("Unable to Approve Record" + msg);

	        return new ResponseEntity<>(new ApiResponse(false, "Failed to approve/Reject Raw Cotton " + msg),
	                HttpStatus.BAD_REQUEST);
	    }
	}

	
	
	public void fromDto(physicalandchemicaltest dto , arfo2payload arfo2payload) {
    	
		List<MicrobiologicalTestOutput> micro = new ArrayList<>();
	    List<QAQCObservationOutput> qaqw = new ArrayList<>();
		if (dto.getQaqc() != null) {
			arfo2payload.setAr_no(dto.getAr_no());
			arfo2payload.setSamplingDate(dto.getSamplingDate());
			arfo2payload.setTest_id(dto.getTest_id());
			arfo2payload.setTested_Date(dto.getTested_Date());
			arfo2payload.setSub_batch_no(dto.getSub_batch_no());
		       arfo2payload.setInternal_export(dto.getInternal_export());
		        arfo2payload.setFinishing(dto.getFinishing());
		        arfo2payload.setMixing(dto.getMixing());
		        arfo2payload.setRemarks(dto.getRemarks());
		        arfo2payload.setResult(dto.getResult());
		        arfo2payload.setProduct(dto.getProduct());
		        arfo2payload.setMaterial_passes(dto.getMaterial_passes());
		        arfo2payload.setFormat_no(dto.getFormat_no());
		        arfo2payload.setRef_sop_no(dto.getRef_sop_no());
		        arfo2payload.setRevision_no(dto.getRevision_no());
		        arfo2payload.setTest_id(dto.getTest_id());
		        arfo2payload.setAr_no(dto.getAr_no());
		        arfo2payload.setSamplingDate(dto.getSamplingDate());
		        arfo2payload.setTested_Date(dto.getTested_Date());
		        arfo2payload.setSub_batch_no(dto.getSub_batch_no());
		        arfo2payload.setInternal_export(dto.getInternal_export());
		        arfo2payload.setFinishing(dto.getFinishing());
		        arfo2payload.setMixing(dto.getMixing());
		        arfo2payload.setRemarks(dto.getRemarks());
		        arfo2payload.setResult(dto.getResult());
		        arfo2payload.setProduct(dto.getProduct());
		        arfo2payload.setMaterial_passes(dto.getMaterial_passes());
		        arfo2payload.setFormat_no(dto.getFormat_no());
		        arfo2payload.setRef_sop_no(dto.getRef_sop_no());
		        arfo2payload.setRevision_no(dto.getRevision_no());

		        // Mapping newly added fields
		        arfo2payload.setFormat(dto.getFormat());
		        arfo2payload.setReason(dto.getReason());
		        arfo2payload.setQc_sign(dto.getQc_sign());
		        arfo2payload.setChemist_status(dto.getChemist_status());
		        arfo2payload.setChemist_saved_on(dto.getChemist_saved_on());
		        arfo2payload.setChemist_saved_by(dto.getChemist_saved_by());
		        arfo2payload.setChemist_saved_id(dto.getChemist_saved_id());
		        arfo2payload.setChemist_submit_on(dto.getChemist_submit_on());
		        arfo2payload.setChemist_submit_by(dto.getChemist_submit_by());
		        arfo2payload.setChemist_submit_id(dto.getChemist_submit_id());
		        arfo2payload.setChemist_sign(dto.getChemist_sign());
		        arfo2payload.setMicro_status(dto.getMicro_status());
		        arfo2payload.setMICROBIOLOGIST_SAVED_on(dto.getMicrobiologist_saved_on());
		        arfo2payload.setMICROBIOLOGIST_SAVED_by(dto.getMicrobiologist_saved_by());
		        arfo2payload.setMICROBIOLOGIST_SAVED_id(dto.getMicrobiologist_saved_id());
		        arfo2payload.setMicro_submit_on(dto.getMicro_submit_on());
		        arfo2payload.setMicro_submit_by(dto.getMicro_submit_by());
		        arfo2payload.setMicro_submit_id(dto.getMicro_submit_id());
		        arfo2payload.setMicro_sign(dto.getMicro_sign());
		        arfo2payload.setQc_status(dto.getQc_status());
		        arfo2payload.setQc_submit_on(dto.getQc_submit_on());
		        arfo2payload.setQc_submit_by(dto.getQc_submit_by());
		        arfo2payload.setQc_submit_id(dto.getQc_submit_id());
		        arfo2payload.setPrepared_by(dto.getPrepared_by());
		        arfo2payload.setQc_status(dto.getQc_status());
		        arfo2payload.setQc_submit_by(dto.getQc_submit_by());
		        arfo2payload.setQc_submit_id(dto.getQc_submit_id());
		        arfo2payload.setQc_submit_on(dto.getQc_submit_on());
		        arfo2payload.setQc_sign(dto.getQc_sign());
		        arfo2payload.setBmr_no(dto.getBmr_no());		        
		        
		    qaqw = dto.getQaqc().stream()
		            .map(qaqcDto -> {
		            	QAQCObservationOutput qaqc = new QAQCObservationOutput();
		                qaqc.setObs_id(qaqcDto.getObs_id());
		                qaqc.setTest_id(dto.getTest_id()); // Assuming test_id is the same for child

		                // Manually set each field
		                qaqc.setDescriptionObr(qaqcDto.getDescriptionObr());
		                qaqc.setDescriptionremark(qaqcDto.getDescriptionremark());
		                qaqc.setIdentificationObr(qaqcDto.getIdentificationObr());
		                qaqc.setIdentificationrmk(qaqcDto.getIdentificationrmk());
		                qaqc.setFibre_obs(qaqcDto.getFibre_obs());
		                qaqc.setFibre_rmk(qaqcDto.getFibre_rmk());
		                qaqc.setAcid_obs(qaqcDto.getAcid_obs());
		                qaqc.setACID_RMK(qaqcDto.getAcid_rmk());
		                qaqc.setSurface_obs(qaqcDto.getSurface_obs());
		                qaqc.setSurface_rmk(qaqcDto.getSurface_rmk());
		                qaqc.setForeign_obs(qaqcDto.getForeign_obs());
		                qaqc.setForeign_rmk(qaqcDto.getForeign_rmk());
		                qaqc.setFluorescence_obs(qaqcDto.getFluorescence_obs());
		                qaqc.setFluorescence_rmk(qaqcDto.getFluorescence_rmk());
		                qaqc.setNeps_obs(qaqcDto.getNeps_obs());
		                qaqc.setNeps_rmk(qaqcDto.getNeps_rmk());
		                qaqc.setNeps_count_obs(qaqcDto.getNeps_count_obs());
		                qaqc.setNeps_count_rmk(qaqcDto.getNeps_count_rmk());
		                qaqc.setUQL_w_obs(qaqcDto.getUQL_w_obs());
		                qaqc.setUQL_w_rmk(qaqcDto.getUQL_w_rmk());
		                qaqc.setLn_obs(qaqcDto.getLn_obs());
		                qaqc.setLn_rmk(qaqcDto.getLn_rmk());
		                qaqc.setLw_obs(qaqcDto.getLw_obs());
		                qaqc.setLw_rmk(qaqcDto.getLw_rmk());
		                qaqc.setSFC_n_obs(qaqcDto.getSFC_n_obs());
		                qaqc.setSFC_n_rmk(qaqcDto.getSFC_n_rmk());
		                qaqc.setSFC_w_obs(qaqcDto.getSFC_w_obs());
		                qaqc.setSFC_w_rmk(qaqcDto.getSFC_w_rmk());
		                qaqc.setMicronaire_obs(qaqcDto.getMicronaire_obs());
		                qaqc.setMicronaire_rmk(qaqcDto.getMicronaire_rmk());
		                qaqc.setWhiteness_obs(qaqcDto.getWhiteness_obs());
		                qaqc.setWhiteness_rmk(qaqcDto.getWhiteness_rmk());
		                qaqc.setExtractable_obs(qaqcDto.getExtractable_obs());
		                qaqc.setExtractable_rmk(qaqcDto.getExtractable_rmk());
		                qaqc.setAbs_1(qaqcDto.getAbs_1());
		                qaqc.setAbs_2(qaqcDto.getAbs_2());
		                qaqc.setAbs_3(qaqcDto.getAbs_3());
		                qaqc.setAbs_4(qaqcDto.getAbs_4());
		                qaqc.setAbs_5(qaqcDto.getAbs_5());
		                qaqc.setAbs_6(qaqcDto.getAbs_6());
		                qaqc.setAbs_avg(qaqcDto.getAbs_avg());
		                qaqc.setAbs_avg_2(qaqcDto.getAbs_avg_2());
		                qaqc.setRemark(qaqcDto.getRemark());
		                qaqc.setSulphatedFlWtObr(qaqcDto.getSulphatedFlWtObr());
		                qaqc.setSulphatedIlWtObr(qaqcDto.getSulphatedIlWtObr());
		                qaqc.setSulphatedBaObr(qaqcDto.getSulphatedBaObr());
		                qaqc.setSulphatedResObr(qaqcDto.getSulphatedResObr());
		                qaqc.setWatersolubleFlWtObr(qaqcDto.getWatersolubleFlWtObr());
		                qaqc.setWatersolubleIlWtObr(qaqcDto.getWatersolubleIlWtObr());
		                qaqc.setWatersolubleNmObr(qaqcDto.getWatersolubleNmObr());
		                qaqc.setWatersolubleResObr(qaqcDto.getWatersolubleResObr());
		                qaqc.setEthersolubleFlWtObr(qaqcDto.getEthersolubleFlWtObr());
		                qaqc.setEthersolubleIlWtObr(qaqcDto.getEthersolubleIlWtObr());
		                qaqc.setEthersolubleYxObr(qaqcDto.getEthersolubleYxObr());
		                qaqc.setEthersolubleResObr(qaqcDto.getEthersolubleResObr());
		                qaqc.setLossondryingFlWtObr(qaqcDto.getLossondryingFlWtObr());
		                qaqc.setLossondryingIlWtObr(qaqcDto.getLossondryingIlWtObr());
		                qaqc.setLossondryingKlObr(qaqcDto.getLossondryingKlObr());
		                qaqc.setLossondryingResObr(qaqcDto.getLossondryingResObr());
		                qaqc.setFinal_remark(qaqcDto.getFinal_remark());
		                qaqc.setSub_batch_no(qaqcDto.getSub_batch_no());
		                qaqc.setProduct(qaqcDto.getProduct()) ;
		                qaqc.setMaterila_passes(qaqcDto.getMaterila_passes());
		                qaqc.setRemarks_a(qaqcDto.getRemarks_a());
		                qaqc.setRemarks_b(qaqcDto.getRemarks_b());
		                qaqc.setRemarks_c(qaqcDto.getRemarks_c());
		                qaqc.setRemarks_d(qaqcDto.getRemarks_d());
		                qaqc.setRemarks_e(qaqcDto.getRemarks_e());
		                qaqc.setRemarks_f(qaqcDto.getRemarks_f());
		                
		                return qaqc;
		            })
		            .collect(Collectors.toList());
		}
		arfo2payload.setQaqc(qaqw);

		
			micro = dto.getMicro().stream()
		            .map(microDto -> {
		            	MicrobiologicalTestOutput microTest = new MicrobiologicalTestOutput();
		                microTest.setMicro_id(microDto.getMicro_id());
		                microTest.setTest_id(dto.getTest_id()); // Assuming test_id is the same for child
		                microTest.setSampled_on(microDto.getSampled_on());
		                microTest.setTested(microDto.getTested());
		                microTest.setTf_count(microDto.getTf_count());
		                microTest.setTf_viable_count(microDto.getTf_viable_count());
		                microTest.setP_field_a(microDto.getP_field_a());
		                microTest.setP_field_b(microDto.getP_field_b());
		                microTest.setP_field_c(microDto.getP_field_c());
		                microTest.setP_field_d(microDto.getP_field_d());
		                microTest.setP_field_e(microDto.getP_field_e());
		                microTest.setMoisture(microDto.getMoisture());
		                microTest.setSub_batch_no(microDto.getSub_batch_no());
		                microTest.setCompletion_date(microDto.getCompletion_date());
		                microTest.setRemarks(microDto.getRemarks());
		                microTest.setProduct(microDto.getProduct());
		                microTest.setMicro_id(microTest.getMicro_id());
		                microTest.setTest_id(microTest.getTest_id());

		                return microTest;
		            })
		            .collect(Collectors.toList());
		
		arfo2payload.setMicro(micro);
	    }
			

	

	
}
