package com.focusr.Precot.mssql.database.service.Qc;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.focusr.Precot.mssql.database.model.QcAudit.ChemicalAnalysisReportARF003History;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaAbCottonF26History;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonBallsF26BHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonPadsF26AHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonRollGoodsF26EHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonWoolPleatF26DHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaCottonWoolRollF26CHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaInfusedCottonPadsF26FHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.CoaMoistureF26GHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.DigitalColonyCounterF030History;
import com.focusr.Precot.mssql.database.model.QcAudit.DistilledWaterAnalysisReportARF012History;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobilogyTestF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.MicrobilogyTestF006History;
import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.QcPhMeterCalibrationReportF006History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcReagentPreparationRecordF017History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcShelfLifePeriodPhysicChemMicroF026History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcTdsMeterCalibrationReportF008History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_BacterialIncubatorTempCalibrationF012History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_MediaGrowthPromotionTestReportF021History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_MediaPreparationAndConsumptionRecordF019History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_RawCottenConsolidatedAnalyticalReportF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_ValidationForAutoclaveByChemicalIndicatorF014History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_WiraFiberFinenessTesterReportF010History;
import com.focusr.Precot.mssql.database.model.QcAudit.RawCottenAnalysisReportARF001History;
import com.focusr.Precot.mssql.database.model.QcAudit.SampleInwardBookF001_F002_F003History;
import com.focusr.Precot.mssql.database.model.QcAudit.StandarizationOfChemicalReportF016History;
import com.focusr.Precot.mssql.database.model.QcAudit.SwabMicrobiologicalAnalysisARF008_009_010History;
import com.focusr.Precot.mssql.database.model.QcAudit.WaterAnalysisReportF007History;
import com.focusr.Precot.mssql.database.model.QcAudit.absorbentbleachedcottonreportCLF005Parenthistory;
import com.focusr.Precot.mssql.database.model.QcAudit.exfoliatingfabricanalysisreportHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.finishedproductanalysisreporthistory;
import com.focusr.Precot.mssql.database.model.QcAudit.fumigationARF011History;
import com.focusr.Precot.mssql.database.model.QcAudit.microbiologicalTestHistoryF002;
import com.focusr.Precot.mssql.database.model.QcAudit.obervationHistoryCLF007;
import com.focusr.Precot.mssql.database.model.QcAudit.observationArF011History;
import com.focusr.Precot.mssql.database.model.QcAudit.observationF004History;
import com.focusr.Precot.mssql.database.model.QcAudit.observationsF006history;
import com.focusr.Precot.mssql.database.model.QcAudit.spectrophotometerReportHistoryClF011;
import com.focusr.Precot.mssql.database.model.QcAudit.weighingscalecalibrationreportHistoryCLF007;
import com.focusr.Precot.mssql.database.repository.Qc.CoaAbCottonF26Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.BacterialIncubatorTempCalibrationRepoF012History;
import com.focusr.Precot.mssql.database.repository.Qc.audit.ChemicalAnalysisReportARF003HistoryRepository;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaAbCottonF26HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaCottonBallsF26BHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaCottonPadsF2A6HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaCottonRollGoodsF26EHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaCottonWoolPleatF26DHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaCottonWoolRollF26CHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaInfusedCottonPadsF26FHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.CoaMoistureF26GHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.DigitalColonyCounterF030HistoryRepo;
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
import com.focusr.Precot.mssql.database.repository.Qc.audit.RegantPreparationRecordF017RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.SampleInvwardBookF001F002F003HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.SampleInwardBookDetailRepositoryHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.StandarizationOfChemicalReportF016HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.SwabMicrobiologicalAnalysisF008F009F010RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.SwabMicrobiologicalDetailsRepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.TdsMeterCalibrationReportF008RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.ValidationForAutoclaveByChemicalIndicatorReopF014History;
import com.focusr.Precot.mssql.database.repository.Qc.audit.WaterAnalysisReportF007HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.WiraFiberDetailsRepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.WiraFiberFinenessTesterF010RepoHistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.absorbentbleachedcottonreportCLF005ParenthistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.exfoliatingfabricanalysisreportHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.finishedproductanalysisreportHistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.fumigationARF011HistoryRepo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.qcphysicalTestRepohistory;
import com.focusr.Precot.mssql.database.repository.Qc.audit.spectrophotometerReportHistoryClF011Repo;
import com.focusr.Precot.mssql.database.repository.Qc.audit.weighingscalecalibrationreportCLF007HistoryRepo;
import com.focusr.Precot.payload.ApiResponse;
import com.focusr.Precot.payload.QAQCObservationOutput;
import com.focusr.Precot.util.SCAUtil;
import com.focusr.Precot.util.Qc.AppConstantsQc;
import com.focusr.Precot.util.Qc.QcAuditRequest;
import com.focusr.Precot.util.Qc.QcExcel;
import com.focusr.Precot.util.Qc.QcExcelUtil;
import com.focusr.Precot.util.Qc.qcAutitservice8;

@Service
public class QcAuditService {

	Logger logger = LoggerFactory.getLogger(QcAuditService.class);

	SCAUtil sca = new SCAUtil();

	@Autowired
	private RawCottenAnalysisReportARF001RepositoryHistory rawCottenAnalysisRepoHistory;

	@Autowired
	private PhysicalAndChemcalTestARF001RepoHistory physicalAndChemcalTestARF001RepoHistory;

	@Autowired
	private MicrobiologicalTestARF001RepoHistory microbiologicalTestARF001RepoHistory;
	
	@Autowired
	spectrophotometerReportHistoryClF011Repo spectrophotometerReportHistoryClF011Repo;

	@Autowired
	private ChemicalAnalysisReportARF003HistoryRepository chemicalAnalysisRepoHistory;

	@Autowired
	private SampleInvwardBookF001F002F003HistoryRepo sampleInwardBookRepoHistory;

	@Autowired
	private SampleInwardBookDetailRepositoryHistory sampleInwardBookDetailRepoHistory;

	@Autowired
	private SwabMicrobiologicalAnalysisF008F009F010RepoHistory SwabMicrAnalysisRepoHistory;

	@Autowired
	private SwabMicrobiologicalDetailsRepoHistory SwabMicroDetailsRepoHistory;

	@Autowired
	private DistilledWaterAnalysisReportARF012RepoHistory distilledWaterAnalysisRepoHistory;

	@Autowired
	private TdsMeterCalibrationReportF008RepoHistory tdsMeterCalibrationRepoHistory;

	@Autowired
	private finishedproductanalysisreportHistoryRepo finishedproductanalysisreporthistory;

	@Autowired
	private WiraFiberFinenessTesterF010RepoHistory WiraFiberFinenessRepoHistory;

	@Autowired
	private RawCottenConsolidatedRepoF004History rawCottenConsolidatedRepoHistory;

	@Autowired
	private BacterialIncubatorTempCalibrationRepoF012History bacterialIncubatorTempCalRepoHistory;

	@Autowired
	private WiraFiberDetailsRepoHistory wiraFiberDetailsRepoHistory;

	@Autowired
	private ValidationForAutoclaveByChemicalIndicatorReopF014History ValidationForAutoclaveChemReopHistory;

	@Autowired
	private PhMeterCalibrationReportF006RepoHistory phMeterCalibHistoryRepo;

	@Autowired
	private RegantPreparationRecordF017RepoHistory regantPreparationRepoHistory;

	@Autowired
	private QcShelfLifePeriodPhysicChemMicroF026RepoHistory shelfLifePeriodRepoHistory;

	@Autowired
	private PhysicalAndChemcalTestARF026RepoHistory physicalAndChemcalF026RepoHistory;

	@Autowired
	private MicrobiologicalTestARF026RepoHistory microbioARF026RepoHistory;

	@Autowired
	private MediaGrowthPromotionF021HistoryRepo mediaGrowthHistoryRepo;

	@Autowired
	private MediaGrowthDetailRepoHistory mediaGrowthDetailRepoHistory;

	@Autowired
	private MediaPreparationAndConsumptionRecordRepoHistory mediaPreparationRepoHistory;

	@Autowired
	exfoliatingfabricanalysisreportHistoryRepo exfoHistoryRepo;

	@Autowired
	qcphysicalTestRepohistory qcphysicalTestRepohistory;

	@Autowired
	weighingscalecalibrationreportCLF007HistoryRepo weighingscalecalibrationreportHistoryCLF007repo;
	
	@Autowired
	private CoaAbCottonF26Repo coaAbCottonF26Repo;
 
	@Autowired
	private CoaCottonPadsF2A6HistoryRepo coaCottonPadsF2A6HistoryRepo;
 
	@Autowired
	private CoaCottonBallsF26BHistoryRepo coaCottonBallsF26BHistoryRepo;
 
	@Autowired
	private CoaAbCottonF26HistoryRepo coaAbCottonF26HistoryRepo;
 
	@Autowired
	private CoaCottonWoolRollF26CHistoryRepo coaCottonWoolRollF26CHistoryRepo;
 
	@Autowired
	private CoaCottonWoolPleatF26DHistoryRepo coaCottonWoolPleatF26DHistoryRepo;
	
	@Autowired
	private CoaCottonRollGoodsF26EHistoryRepo coaCottonRollGoodsF26EHistoryRepo ;
	
	@Autowired
	private CoaInfusedCottonPadsF26FHistoryRepo coaInfusedCottonPadsF26FHistoryRepo ;
	
	@Autowired
	private CoaMoistureF26GHistoryRepo coaMoistureF26GHistoryRepo ;
	
	@Autowired
	private DigitalColonyCounterF030HistoryRepo digitalColonyCounterF030HistoryRepo ;
	
	
	@Autowired
	private StandarizationOfChemicalReportF016HistoryRepo standarizationOfChemicalReportF016HistoryRepo ;

	@Autowired
	fumigationARF011HistoryRepo fumigationARF011HistoryRepo;
	
	// Gayathri
	@Autowired
	private absorbentbleachedcottonreportCLF005ParenthistoryRepo absorbentbleachedcottonreportCLF005ParenthistoryRepo;
	
	@Autowired
	qcAutitservice8 qcAutitservice;
	
	@Autowired
	private WaterAnalysisReportF007HistoryRepo waterAnalysisReportF007HistoryRepo;

	String[] skipValues = {
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

	boolean isthere = false;

	public ResponseEntity<?> getAuditSummary(QcAuditRequest summeryrequest , HttpServletResponse response) {
		List<RawCottenAnalysisReportARF001History> summaryARF001;
		List<QcShelfLifePeriodPhysicChemMicroF026History> summaryF026;
		List<ChemicalAnalysisReportARF003History> summaryARF003;
		List<SampleInwardBookF001_F002_F003History> summaryF001;
		List<SampleInwardBookF001_F002_F003History> summaryF002;
		List<SampleInwardBookF001_F002_F003History> summaryF003;
		List<SwabMicrobiologicalAnalysisARF008_009_010History> summaryARF008;
		List<SwabMicrobiologicalAnalysisARF008_009_010History> summaryARF009;
		List<SwabMicrobiologicalAnalysisARF008_009_010History> summaryARF010;
		List<DistilledWaterAnalysisReportARF012History> summaryARF012;
		List<QcTdsMeterCalibrationReportF008History> summaryF008;
		List<Qc_WiraFiberFinenessTesterReportF010History> summaryF010;
		List<Qc_RawCottenConsolidatedAnalyticalReportF004History> summaryF004;
		List<Qc_BacterialIncubatorTempCalibrationF012History> summaryF012;
		List<Qc_ValidationForAutoclaveByChemicalIndicatorF014History> summaryF014;
		List<QcPhMeterCalibrationReportF006History> summaryF006;
		List<QcReagentPreparationRecordF017History> summaryF017;
		List<Qc_MediaGrowthPromotionTestReportF021History> summaryF021;
		List<Qc_MediaPreparationAndConsumptionRecordF019History> summaryF019;
		
		
		List<CoaAbCottonF26History> summaryF26;
		List<CoaCottonPadsF26AHistory> summaryF026A;
		List<CoaCottonBallsF26BHistory> summaryF026B;
		List<CoaCottonWoolRollF26CHistory> summaryF026C;
		List<CoaCottonWoolPleatF26DHistory> summaryF026D;
		List<CoaCottonRollGoodsF26EHistory> summaryF026E;
		List<CoaInfusedCottonPadsF26FHistory> summaryF026F;
		List<CoaMoistureF26GHistory> summaryF026G;
		List<StandarizationOfChemicalReportF016History> summaryF016;
		List<DigitalColonyCounterF030History> summaryF030;
		List<WaterAnalysisReportF007History> summaryF007 ;
		
		List<PHYSICALANDCHEMICALTESTHistory> physicalChemicalTestSummary;
		List<absorbentbleachedcottonreportCLF005Parenthistory> clF005Summary;
		List<exfoliatingfabricanalysisreportHistory> exfoliatingFabricSummary;
		List<finishedproductanalysisreporthistory> finishedProductSummary;

		try {
			String department = summeryrequest.getDepartment();
			String formName = summeryrequest.getForm_name();


// ARF001

			if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF001.equalsIgnoreCase(formName)) {

			    String fromDate = (summeryrequest.getFrom_date() == null || summeryrequest.getFrom_date().isEmpty())
			            ? null : summeryrequest.getFrom_date();
			    String toDate = (summeryrequest.getTo_date() == null || summeryrequest.getTo_date().isEmpty())
			            ? null : summeryrequest.getTo_date();
				String millBatchNo = (summeryrequest.getMillBatchNo() == null || summeryrequest.getMillBatchNo().isEmpty()) 
						? null 
								: summeryrequest.getMillBatchNo();
				
				   if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
				        // Logic when fromDate and toDate are the same
				        summaryARF001 = rawCottenAnalysisRepoHistory.findFormByDate(fromDate,millBatchNo);
				    } else {
				        // Logic when fromDate and toDate are not the same
				        summaryARF001 = rawCottenAnalysisRepoHistory.findByParamsARF001(fromDate, toDate, millBatchNo);
				    }

				if (!summaryARF001.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateARF001Excel(summaryARF001);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Raw_Cotten_Analysis_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			//F026			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F026.equalsIgnoreCase(formName)) {

			    String fromDate = (summeryrequest.getFrom_date() == null || summeryrequest.getFrom_date().isEmpty())
			            ? null : summeryrequest.getFrom_date();
			    String toDate = (summeryrequest.getTo_date() == null || summeryrequest.getTo_date().isEmpty())
			            ? null : summeryrequest.getTo_date();
				String productionDate = (summeryrequest.getProductionDate() == null || summeryrequest.getProductionDate().isEmpty()) 
						? null 
								: summeryrequest.getProductionDate();
				String lotNo = (summeryrequest.getLotNumber() == null || summeryrequest.getLotNumber().isEmpty()) 
						? null 
								: summeryrequest.getLotNumber();

				  if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
				        // Logic when fromDate and toDate are the same
				        summaryF026 = shelfLifePeriodRepoHistory.findFormByDate(fromDate,lotNo);
				    } else {
				        // Logic when fromDate and toDate are not the same
				    	summaryF026 = shelfLifePeriodRepoHistory.findByParamsF026(fromDate, toDate, productionDate,lotNo);
				    }
				
				

				if (!summaryF026.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateF026Excel(summaryF026);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Shelf_Life_Period_Physical_Chemical_&_Microbiological_Testing_Report_Data.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

// ARF003
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF003.equalsIgnoreCase(formName)) {

			    String fromDate = (summeryrequest.getFrom_date() == null || summeryrequest.getFrom_date().isEmpty())
			            ? null : summeryrequest.getFrom_date();
			    String toDate = (summeryrequest.getTo_date() == null || summeryrequest.getTo_date().isEmpty())
			            ? null : summeryrequest.getTo_date();
				String materialDocNo = (summeryrequest.getMaterialDocNo()== null || summeryrequest.getMaterialDocNo().isEmpty()) 
						? null 
								: summeryrequest.getMaterialDocNo();
				
				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
					// Logic when fromDate and toDate are the same
					summaryARF003 = chemicalAnalysisRepoHistory.findFormByDate(fromDate,materialDocNo);
				} else {
					// Logic when fromDate and toDate are not the same
					summaryARF003 = chemicalAnalysisRepoHistory.findByParamsARF003(fromDate, toDate, materialDocNo);
				}

				

				if (!summaryARF003.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateARF003Excel(summaryARF003);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Chemical_Analysis_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			

//ARF008

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF008.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date()== null || summeryrequest.getFrom_date().isEmpty()) 
						? null 
								: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date()== null || summeryrequest.getTo_date().isEmpty()) 
						? null 
								: summeryrequest.getTo_date();

				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
		    		// Logic when fromDate and toDate are the same
					summaryARF008 = SwabMicrAnalysisRepoHistory.findFormByDate08(fromDate);
		    	} else {
		    		// Logic when fromDate and toDate are not the same
		    		summaryARF008 = SwabMicrAnalysisRepoHistory.findByParamsARF008(fromDate, toDate);			
		    	}

			

				if (!summaryARF008.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateARF008Excel(summaryARF008);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Floor_Swab_Microbiological_Analysis_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			//ARF009

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF009.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date()== null || summeryrequest.getFrom_date().isEmpty()) 
						? null 
								: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date()== null || summeryrequest.getTo_date().isEmpty()) 
						? null 
								: summeryrequest.getTo_date();

				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
		    		// Logic when fromDate and toDate are the same
					summaryARF009 = SwabMicrAnalysisRepoHistory.findFormByDate09(fromDate);
		    	} else {
		    		// Logic when fromDate and toDate are not the same
		    		summaryARF009 = SwabMicrAnalysisRepoHistory.findByParamsARF009(fromDate, toDate);		
		    	}

				

				if (!summaryARF009.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateARF009Excel(summaryARF009);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Handler's_Swab_Microbiological_Analysis_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			//ARF010

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF010.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date()== null || summeryrequest.getFrom_date().isEmpty()) 
						? null 
								: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date()== null || summeryrequest.getTo_date().isEmpty()) 
						? null 
								: summeryrequest.getTo_date();

				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
		    		// Logic when fromDate and toDate are the same
					summaryARF010 = SwabMicrAnalysisRepoHistory.findFormByDate010(fromDate);
		    	} else {
		    		// Logic when fromDate and toDate are not the same
		    		summaryARF010 = SwabMicrAnalysisRepoHistory.findByParamsARF010(fromDate, toDate);	
		    	}

				

				if (!summaryARF010.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateARF010Excel(summaryARF010);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Machine_Swab_Microbiological_Analysis_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// ARF012
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF012.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date()== null || summeryrequest.getFrom_date().isEmpty()) 
						? null 
								: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date()== null || summeryrequest.getTo_date().isEmpty()) 
						? null 
								: summeryrequest.getTo_date();
				
				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
		    		// Logic when fromDate and toDate are the same
					summaryARF012 = distilledWaterAnalysisRepoHistory.findFormByDate(fromDate);
		    	} else {
		    		// Logic when fromDate and toDate are not the same
		    		summaryARF012 = distilledWaterAnalysisRepoHistory.findByParamsARF012(fromDate, toDate);	
		    	}


				if (!summaryARF012.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateARF012Excel(summaryARF012);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Distilled_Water_Analysis.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			// F008
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F008.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date()== null || summeryrequest.getFrom_date().isEmpty()) 
						? null 
								: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date()== null || summeryrequest.getTo_date().isEmpty()) 
						? null 
								: summeryrequest.getTo_date();

				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
		    		// Logic when fromDate and toDate are the same
					summaryF008 = tdsMeterCalibrationRepoHistory.findFormByDate(fromDate);
		    	} else {
		    		// Logic when fromDate and toDate are not the same
		    		summaryF008 = tdsMeterCalibrationRepoHistory.findByParamsF008(fromDate, toDate);	
		    	}
				
				

				if (!summaryF008.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateF008Excel(summaryF008);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Tds_Meter_Calibration_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}


			//F010

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F010.equalsIgnoreCase(formName)) {


				String month = (summeryrequest.getMonth()== null || summeryrequest.getMonth().isEmpty()) 
						? null 
								: summeryrequest.getMonth();
				String year = (summeryrequest.getYear()== null || summeryrequest.getYear().isEmpty()) 
						? null 
								: summeryrequest.getYear();				
				summaryF010 = WiraFiberFinenessRepoHistory.findByParamsF010(month,year);

				if (!summaryF010.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateF010Excel(summaryF010);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Wira_Fiber_Finness_Tester_Calibration_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			//F-004			

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F004.equalsIgnoreCase(formName)) {

				String bleachingBmrNo = (summeryrequest.getBleachingBmrNo()== null || summeryrequest.getBleachingBmrNo().isEmpty()) 
						? null 
								: summeryrequest.getBleachingBmrNo();


				summaryF004 = rawCottenConsolidatedRepoHistory.findByParamsF004(bleachingBmrNo);

				if (!summaryF004.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateF004Excel(summaryF004);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Raw_Cotton_Consolidated_Analytical_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}


			//F-012			

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F012.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date()== null || summeryrequest.getFrom_date().isEmpty()) 
						? null 
								: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date()== null || summeryrequest.getTo_date().isEmpty()) 
						? null 
								: summeryrequest.getTo_date();
				String eqIdNo = (summeryrequest.getEqIdNo()== null || summeryrequest.getEqIdNo().isEmpty()) 
						? null 
								: summeryrequest.getEqIdNo();
				
				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
		    		// Logic when fromDate and toDate are the same
					summaryF012 = bacterialIncubatorTempCalRepoHistory.findFormByDate(fromDate,eqIdNo);
		    	} else {
		    		// Logic when fromDate and toDate are not the same
		    		summaryF012 = bacterialIncubatorTempCalRepoHistory.findByParamsF012(fromDate, toDate, eqIdNo);
		    	}

				if (!summaryF012.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateF012Excel(summaryF012);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Bacterial_Incubator_Temprature_Calibration_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}		

			//F014

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F014.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date()== null || summeryrequest.getFrom_date().isEmpty()) 
						? null 
								: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date()== null || summeryrequest.getTo_date().isEmpty()) 
						? null 
								: summeryrequest.getTo_date();
				String eqIdNo = (summeryrequest.getEqIdNo()== null || summeryrequest.getEqIdNo().isEmpty()) 
						? null 
								: summeryrequest.getEqIdNo();
				
				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
		    		// Logic when fromDate and toDate are the same
					summaryF014 = ValidationForAutoclaveChemReopHistory.findFormByDate(fromDate,eqIdNo);
		    	} else {
		    		// Logic when fromDate and toDate are not the same
		    		summaryF014 = ValidationForAutoclaveChemReopHistory.findByParamsF014(fromDate, toDate, eqIdNo);
		    	}

				

				if (!summaryF014.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateF014Excel(summaryF014);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Validation_For_Autoclave_By_Chemical_Indicator.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}		

			//F006	
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F006.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date()== null || summeryrequest.getFrom_date().isEmpty()) 
						? null 
								: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date()== null || summeryrequest.getTo_date().isEmpty()) 
						? null 
								: summeryrequest.getTo_date();
				String eqIdNo = (summeryrequest.getEqIdNo()== null || summeryrequest.getEqIdNo().isEmpty()) 
						? null 
								: summeryrequest.getEqIdNo();
				String month = (summeryrequest.getMonth()== null || summeryrequest.getMonth().isEmpty()) 
						? null 
								: summeryrequest.getMonth();
				String year = (summeryrequest.getYear()== null || summeryrequest.getYear().isEmpty()) 
						? null 
								: summeryrequest.getYear();

				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
		    		// Logic when fromDate and toDate are the same
					summaryF006 = phMeterCalibHistoryRepo.findFormByDate(fromDate,eqIdNo);
		    	} else {
		    		// Logic when fromDate and toDate are not the same
		    		summaryF006 = phMeterCalibHistoryRepo.findByParamsF006(fromDate, toDate, eqIdNo,month,year);
		    	}

				

				if (!summaryF006.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateF006Excel(summaryF006);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Ph_Meter_Calibration_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}		
			//F017			

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F017.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date()== null || summeryrequest.getFrom_date().isEmpty()) 
						? null 
								: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date()== null || summeryrequest.getTo_date().isEmpty()) 
						? null 
								: summeryrequest.getTo_date();

				String month = (summeryrequest.getMonth()== null || summeryrequest.getMonth().isEmpty()) 
						? null 
								: summeryrequest.getMonth();
				String year = (summeryrequest.getYear()== null || summeryrequest.getYear().isEmpty()) 
						? null 
								: summeryrequest.getYear();


				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
		    		// Logic when fromDate and toDate are the same
					summaryF017 = regantPreparationRepoHistory.findFormByDate(fromDate);
		    	} else {
		    		// Logic when fromDate and toDate are not the same
		    		summaryF017 = regantPreparationRepoHistory.findByParamsF017(fromDate, toDate,month,year);
		    	}

				

				if (!summaryF017.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateF017Excel(summaryF017);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Reagent_Preparation_Record.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}	

			//F021

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F021.equalsIgnoreCase(formName)) {


				String month = (summeryrequest.getMonth()== null || summeryrequest.getMonth().isEmpty()) 
						? null 
								: summeryrequest.getMonth();
				String year = (summeryrequest.getYear()== null || summeryrequest.getYear().isEmpty()) 
						? null 
								: summeryrequest.getYear();



				summaryF021 = mediaGrowthHistoryRepo.findByParamsF021(month,year);

				if (!summaryF021.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateF021Excel(summaryF021);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Media_Growth_Promotion_Test_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}	

			//F019

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F019.equalsIgnoreCase(formName)) {

				String fromDate = (summeryrequest.getFrom_date()== null || summeryrequest.getFrom_date().isEmpty()) 
						? null 
								: summeryrequest.getFrom_date();
				String toDate = (summeryrequest.getTo_date()== null || summeryrequest.getTo_date().isEmpty()) 
						? null 
								: summeryrequest.getTo_date();

				String loadNo = (summeryrequest.getLoadNo()== null || summeryrequest.getLoadNo().isEmpty()) 
						? null 
								: summeryrequest.getLoadNo();

				if (fromDate != null && toDate != null && fromDate.equals(toDate)) {
		    		// Logic when fromDate and toDate are the same
					summaryF019 = mediaPreparationRepoHistory.findFormByDate(fromDate,loadNo);
		    	} else {
		    		// Logic when fromDate and toDate are not the same
		    		summaryF019 = mediaPreparationRepoHistory.findByParamsF019(fromDate, toDate,loadNo);

		    	}


				
				if (!summaryF019.isEmpty()) {
					ByteArrayResource resource = QcExcelUtil.generateF019Excel(summaryF019);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=Media_Preparation_And_Consumption_Record.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}	
	
//--------------------------------------------------------------------------------------------------------------------------------------------			
			// VIJAY
			
			else if (AppConstantsQc.departmentName.equals(department) && AppConstantsQc.F26.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String procuct = summeryrequest.getProduct().isEmpty() ? null : summeryrequest.getProduct();
				String customer = summeryrequest.getCustomer().isEmpty() ? null : summeryrequest.getCustomer();

				summaryF26 = coaAbCottonF26HistoryRepo.findByParamsF026(fromDate, toDate, procuct, customer);

				if (!summaryF26.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF026Excel(summaryF26);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=COA_FOR_AB_COTTON_F026.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}

			} else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F026A.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String procuct = summeryrequest.getProduct().isEmpty() ? null : summeryrequest.getProduct();
				String customer = summeryrequest.getCustomer().isEmpty() ? null : summeryrequest.getCustomer();

				summaryF026A = coaCottonPadsF2A6HistoryRepo.findByParamsF026A(fromDate, toDate, procuct, customer);

				if (!summaryF026A.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF026AExcel(summaryF026A);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=COA_FOR_COTTON_PADS_F026A.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}

			}

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F026B.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String procuct = summeryrequest.getProduct().isEmpty() ? null : summeryrequest.getProduct();
				String customer = summeryrequest.getCustomer().isEmpty() ? null : summeryrequest.getCustomer();

				summaryF026B = coaCottonBallsF26BHistoryRepo.findByParamsF026B(fromDate, toDate, procuct, customer);

				if (!summaryF026B.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF026BExcel(summaryF026B);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=COA_FOR_COTTON_BALLS_F026B.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}

			}

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F026C.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String procuct = summeryrequest.getProduct().isEmpty() ? null : summeryrequest.getProduct();
				String customer = summeryrequest.getCustomer().isEmpty() ? null : summeryrequest.getCustomer();

				summaryF026C = coaCottonWoolRollF26CHistoryRepo.findByParamsF026C(fromDate, toDate, procuct, customer);

				if (!summaryF026C.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF026CExcel(summaryF026C);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=COA_FOR_COTTON_WOOL_ROLL_F026C.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}

			}

			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F026D.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String procuct = summeryrequest.getProduct().isEmpty() ? null : summeryrequest.getProduct();
				String customer = summeryrequest.getCustomer().isEmpty() ? null : summeryrequest.getCustomer();

				summaryF026D = coaCottonWoolPleatF26DHistoryRepo.findByParamsF026D(fromDate, toDate, procuct, customer);

				if (!summaryF026D.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF026DExcel(summaryF026D);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=COA_FOR_COTTON_WOOL_PLEAT_F026D.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}

				
			}
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F026E.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String procuct = summeryrequest.getProduct().isEmpty() ? null : summeryrequest.getProduct();
				String customer = summeryrequest.getCustomer().isEmpty() ? null : summeryrequest.getCustomer();

				summaryF026E = coaCottonRollGoodsF26EHistoryRepo.findByParamsF026E(fromDate, toDate, procuct, customer);

				if (!summaryF026E.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF026EExcel(summaryF026E);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=COA_FOR_COTTON_ROLL_GOODS_F026E.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F026F.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String procuct = summeryrequest.getProduct().isEmpty() ? null : summeryrequest.getProduct();
				String customer = summeryrequest.getCustomer().isEmpty() ? null : summeryrequest.getCustomer();

				summaryF026F = coaInfusedCottonPadsF26FHistoryRepo.findByParamsF026F(fromDate, toDate, procuct, customer);

				if (!summaryF026F.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF026FExcel(summaryF026F);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=COA_FOR_INFUSED_COTTON_PADS_F026F.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}

			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F026G.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String procuct = summeryrequest.getProduct().isEmpty() ? null : summeryrequest.getProduct();
				String customer = summeryrequest.getCustomer().isEmpty() ? null : summeryrequest.getCustomer();

				summaryF026G = coaMoistureF26GHistoryRepo.findByParamsF026G(fromDate, toDate, procuct, customer);

				if (!summaryF026G.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF026GExcel(summaryF026G);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=COA_FOR_MOISTURE_CONTENT_F026G.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F016.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String shift = summeryrequest.getShift().isEmpty() ? null : summeryrequest.getShift();
				String chemical = summeryrequest.getChemical().isEmpty() ? null : summeryrequest.getChemical();

				summaryF016 = standarizationOfChemicalReportF016HistoryRepo.findByParamsF016(fromDate, toDate, shift, chemical);

				if (!summaryF016.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF016Excel(summaryF016);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=STANDARIZATION_OF_CHEMICAL_SOLUTION_F016.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F030.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String month = summeryrequest.getMonth().isEmpty() ? null : summeryrequest.getMonth();
				String year = summeryrequest.getYear().isEmpty() ? null : summeryrequest.getYear();
				String eq_id = summeryrequest.getEq_id().isEmpty() ? null : summeryrequest.getEq_id();

				summaryF030 = digitalColonyCounterF030HistoryRepo.findByParamsF030(fromDate, toDate, month, year, eq_id);

				if (!summaryF030.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF030Excel(summaryF030);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=DIGITAL_COLONY_COUNTER_CALIBRATION_REPORT_F030.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F007.equalsIgnoreCase(formName)) {
 
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
 
				summaryF007 = waterAnalysisReportF007HistoryRepo.findByParamsF007(fromDate, toDate);
 
				if (!summaryF007.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateF007Excel(summaryF007);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=WATER_ANALYSIS_REPORT_F007.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
//			else if (AppConstantsQc.departmentName.equals(department)
//					&& AppConstantsQc.ARF002.equalsIgnoreCase(formName)) {
//				
//				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
//				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
//				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
//				
//			return	qcAutitservice.downloadExcel(sub,fromDate, toDate,  response);
//			}
			
//			else if (AppConstantsQc.departmentName.equals(department)
//					&& AppConstantsQc.ARF004.equalsIgnoreCase(formName)) {
//				
//				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
//				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
//				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
//				
//				return	qcAutitservice.downloadExcel02(sub,fromDate, toDate,  response);
//			}

//			else if (AppConstantsQc.departmentName.equals(department)
//					&& AppConstantsQc.ARF006.equalsIgnoreCase(formName)) {
//				
//				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
//				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
//				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
//				
//				return qcAutitservice.downloadExcel04(sub,fromDate, toDate,  response);
//			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.CLF007.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
				
			    List<weighingscalecalibrationreportHistoryCLF007> invoices = new ArrayList<>();


			    invoices= weighingscalecalibrationreportHistoryCLF007repo.audit(sub,fromDate, toDate);
			    
				
				if (!invoices.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateCalibration(invoices);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=weigh_calibration_report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
				
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF011.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = null;
				

				List<fumigationARF011History> invoices =   new ArrayList<>();


			        invoices = fumigationARF011HistoryRepo.audit(sub,fromDate, toDate);
			    
				
				 
				
				if (!invoices.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateFumigationARF011ReportValues(invoices);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=fumigation_report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
				
				//
			}
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF013.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = null;
				
				return	qcAutitservice.downloadExcel07(sub,fromDate, toDate,  response);
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF014.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
				String reg = summeryrequest.getEq_id().isEmpty() ? null : summeryrequest.getEq_id();
				
				return	qcAutitservice.downloadExcel08(sub,reg,fromDate, toDate,  response);
			}
			
//			else if (AppConstantsQc.departmentName.equals(department)
//					&& AppConstantsQc.F005.equalsIgnoreCase(formName)) {
//				
//				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
//				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
//				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
//				String reg = summeryrequest.getEq_id().isEmpty() ? null : summeryrequest.getEq_id();
//				
//				return	qcAutitservice.downloadExcel09(sub,reg,fromDate, toDate,  response);
//			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF005.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
//				String reg = summeryrequest.getEq_id().isEmpty() ? null : summeryrequest.getEq_id();
				
				return	qcAutitservice.downloadExcel10(sub,fromDate, toDate,  response);
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F009.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = null;
				
				
				return	qcAutitservice.downloadExcel11(sub,fromDate, toDate,  response);
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F011.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = null;
				
				String month =null;
				String year = null;
				List<spectrophotometerReportHistoryClF011> invoices = new ArrayList<>();
				invoices = spectrophotometerReportHistoryClF011Repo.audit(sub, fromDate, toDate , year,month);
				
				if (!invoices.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateSpectroExcel(invoices);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=spectro_Report.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F013.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
				String reg = null;
				
				return	qcAutitservice.downloadExcel13(sub,reg,fromDate, toDate,  response);
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F022.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = null;
//				String reg = summeryrequest.getEq_id().isEmpty() ? null : summeryrequest.getEq_id();
				
				return	qcAutitservice.downloadExcel17(sub,fromDate, toDate,  response);
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F029.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = null;
				
			
				return	qcAutitservice.downloadExcel15(sub,fromDate, toDate,  response);
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F020.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
				
				
				return	qcAutitservice.downloadExcel18(sub,fromDate, toDate,  response);
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F018.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();

				
				return	qcAutitservice.downloadExcel19(sub,fromDate, toDate,  response);
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F015.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String month = summeryrequest.getMonth().isEmpty() ? null : summeryrequest.getMonth();
				String year = summeryrequest.getYear().isEmpty() ? null : summeryrequest.getYear();
				String reg = summeryrequest.getEq_id().isEmpty() ? null : summeryrequest.getEq_id();
				
				return	qcAutitservice.downloadExcel20(reg,year,month,fromDate, toDate,  response);
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F014.equalsIgnoreCase(formName)) {
				
				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String sub = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
				String reg = summeryrequest.getEq_id().isEmpty() ? null : summeryrequest.getEq_id();
				
				return	qcAutitservice.downloadExcel14(sub,reg,fromDate, toDate,  response);
			}
			
			
			// Gayathri
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF002.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String subBatch = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();

				
			    
//
//			    if (fromDate == null && toDate == null && subBatch == null) {
//			    	physicalChemicalTestSummary = qcphysicalTestRepohistory.audit();
//			    } else {
//			    	fromDate =fromDate!=null? rearrangeDate(fromDate) : fromDate;
//			    	
//			    	toDate = toDate!=null ? rearrangeDate(toDate) : toDate;
//			    	
//			    	System.out.println("fromDate: "+fromDate);
//			    	System.out.println("todate: "+toDate);
			    	
			    physicalChemicalTestSummary = qcphysicalTestRepohistory.getPhysicalAndChemicalTestHistory(subBatch, fromDate, toDate);
//			    }

				if (!physicalChemicalTestSummary.isEmpty()) {
					ByteArrayResource resource = QcExcel.generatePhysicalAndChemicalExcel(physicalChemicalTestSummary);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=PHYSICAL_AND_CHEMICAL_TEST_REPORT.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			// 
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.F005.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String subBatch = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();
				

			    	
			    	
			    
				clF005Summary = absorbentbleachedcottonreportCLF005ParenthistoryRepo.audit(subBatch,fromDate,toDate);

				if (!clF005Summary.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateCLF005Excel(clF005Summary);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=ABSORBENT_BLEACHED_COTTON_CONSOLIDATED_ANALYTICAL_REPORT.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF004.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String subBatch = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();


					
					exfoliatingFabricSummary = exfoHistoryRepo.audit(subBatch,fromDate,toDate);
		

				if (!exfoliatingFabricSummary.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateExfoloatingFabricReportExcel(exfoliatingFabricSummary);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=EXFOLIATING_FABRIC_ANALYSIS_REPORT.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			else if (AppConstantsQc.departmentName.equals(department)
					&& AppConstantsQc.ARF006.equalsIgnoreCase(formName)) {

				String fromDate = summeryrequest.getFrom_date().isEmpty() ? null : summeryrequest.getFrom_date();
				String toDate = summeryrequest.getTo_date().isEmpty() ? null : summeryrequest.getTo_date();
				String subBatch = summeryrequest.getSubbatch().isEmpty() ? null : summeryrequest.getSubbatch();

		if((fromDate!=null &&toDate !=null )&&  fromDate.equalsIgnoreCase(toDate)) {
			finishedProductSummary = finishedproductanalysisreporthistory.audit(subBatch,fromDate);
		}else {
			finishedProductSummary = finishedproductanalysisreporthistory.audit(subBatch,fromDate,toDate);
		}
				

				if (!finishedProductSummary.isEmpty()) {
					ByteArrayResource resource = QcExcel.generateFinishedProductReportExcel(finishedProductSummary);
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION,
									"attachment; filename=FINISHED_PRODUCT_ANALYSIS_REPORT.xlsx")
							.contentType(MediaType.parseMediaType(
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
							.body(resource);
				} else {
					return new ResponseEntity<>(new ApiResponse(false, "No data found"), HttpStatus.BAD_REQUEST);
				}
			}
			
			else {
				return new ResponseEntity<>(new ApiResponse(false, "Invalid department or form name"),
						HttpStatus.BAD_REQUEST);
			}
			

		} catch (Exception e) {
			logger.error("*** Unable to Get Audit History ***", e);
			String msg = sca.getErrorMessage(e);
			return new ResponseEntity<>(new ApiResponse(false, "*** Unable to Get Audit History ***" + msg),
					HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> downloadExcel(String batch , String fromdate,String todate, HttpServletResponse response)
			throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();

		List<PHYSICALANDCHEMICALTESTHistory> invoices = qcphysicalTestRepohistory.audit(batch,
				fromdate, todate);
//
		String filename = "";

		ArrayNode jsonArray = objectMapper.valueToTree(invoices);

		// Create a Workbook
		Workbook workbook = new XSSFWorkbook();
		// Create a Sheet
		Sheet sheet = workbook.createSheet("Invoices");

		// Create header row with bold font and background color
		Row headerRow = sheet.createRow(0);
		JsonNode firstInvoice = jsonArray.get(0);
		int colIndex = 0;

		// Create a bold font style for the header with background color
		CellStyle headerStyle = workbook.createCellStyle();
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerStyle.setFont(headerFont);

		// Track maximum width for each column
		Map<Integer, Integer> columnWidths = new HashMap<>();

		// Write parent entity fields (PHYSICALANDCHEMICALTESTHistory)
		for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext();) {
			String fieldName = convertCamelCaseToUpperCase(it.next()); // Capitalize the header text
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(fieldName);
			cell.setCellStyle(headerStyle); // Apply the bold style with background color

			// Set initial column width based on header length (characters * 256 = width in
			// Excel units)
			columnWidths.put(colIndex, Math.max(fieldName.length() * 256, 3000)); // Minimum 3000 units wide
			colIndex++;
		}

		// Use reflection to dynamically get child entity field names
		List<String> childEntity1Fields = getFieldNames(QAQCObservationOutput.class); // Replace with your actual class
		List<String> childEntity2Fields = getFieldNames(microbiologicalTestHistoryF002.class); // Replace with your
																								// actual class

		// Add child entity fields to the header
		for (String childField : childEntity1Fields) {
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000)); // Ensure minimum column width
			colIndex++;
		}

		for (String childField : childEntity2Fields) {
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000));
			colIndex++;
		}

		// Create data rows for each invoice (parent entity and child entities)
		for (int i = 0; i < jsonArray.size(); i++) {
			JsonNode invoice = jsonArray.get(i);
			int startingRow = i + 1;
			Row row = sheet.createRow(startingRow);
			colIndex = 0;

			// Write parent entity data
			for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext();) {
				Map.Entry<String, JsonNode> field = fields.next();
				Cell cell = row.createCell(colIndex);
				String value = field.getValue().asText();
				if (field.getKey().equalsIgnoreCase("format")) {
					filename = field.getValue().asText();
				}
				cell.setCellValue(value);

				// Calculate and update maximum column width
				int lengthInCharacters = value.length();
				int currentMaxWidth = columnWidths.getOrDefault(colIndex, 3000);
				columnWidths.put(colIndex, Math.max(lengthInCharacters * 256, currentMaxWidth)); // Update width

				colIndex++;
			}

			// Write child entity 1 (List<QAqcObservationsHistory>) data dynamically
			JsonNode childEntity1List = invoice.path("qaqcObservations"); // Ensure this field matches your entity's
																			// field name
			int maxRows = startingRow;
			if (childEntity1List != null && childEntity1List.isArray()) {
				for (int j = 0; j < childEntity1List.size(); j++) {
					JsonNode childEntity1 = childEntity1List.get(j);
					Row childRow = (j == 0) ? row : sheet.createRow(startingRow + j); // Use existing row or create new
					int childColIndex = colIndex; // Ensure child columns are written after parent columns
					for (String childField : childEntity1Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity1.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, startingRow + childEntity1List.size() - 1); // Update the max row index
			}

			// Write child entity 2 (List<microbiologicalTestHistoryF002>) data dynamically
			JsonNode childEntity2List = invoice.path("microbiologicalTest"); // Ensure this field matches your entity's
																				// field name
			if (childEntity2List != null && childEntity2List.isArray()) {
				for (int k = 0; k < childEntity2List.size(); k++) {
					JsonNode childEntity2 = childEntity2List.get(k);
					Row childRow = (k == 0 && maxRows == startingRow) ? row : sheet.createRow(maxRows + k); // Create
																											// new row
																											// if needed
					int childColIndex = colIndex + childEntity1Fields.size(); // Ensure columns come after previous
																				// child
					for (String childField : childEntity2Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity2.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, maxRows + childEntity2List.size() - 1); // Update max row index again
			}

			// Move to the next parent record, ensuring proper row advancement
			i = maxRows - 1; // Adjust i to handle expanded rows from child entities
		}

		// Apply column widths after writing the data
		for (Map.Entry<Integer, Integer> entry : columnWidths.entrySet()) {
			sheet.setColumnWidth(entry.getKey(), Math.min(entry.getValue(), 10000)); // Cap column width to avoid
																						// excessive width
		}

		// Set the content type and attachment header
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
	        workbook.write(byteArrayOutputStream);
	    } finally {
	        workbook.close(); // Ensure the workbook is closed
	    }

	    // Set headers and return the file in the ResponseEntity
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
	    headers.setContentDispositionFormData("attachment", filename + ".xlsx");

	    return ResponseEntity.ok()
	            .headers(headers)
	            .body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
	    
	}

	public ResponseEntity<?> downloadExcel02(String batch , String fromdate,String todate, HttpServletResponse response)
			throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();

		List<exfoliatingfabricanalysisreportHistory> invoices = exfoHistoryRepo.audit(batch,
				fromdate, todate);
//
		String filename = "";

		ArrayNode jsonArray = objectMapper.valueToTree(invoices);

		// Create a Workbook
		Workbook workbook = new XSSFWorkbook();
		// Create a Sheet
		Sheet sheet = workbook.createSheet("Invoices");

		// Create header row with bold font and background color
		Row headerRow = sheet.createRow(0);
		JsonNode firstInvoice = jsonArray.get(0);
		int colIndex = 0;

		// Create a bold font style for the header with background color
		CellStyle headerStyle = workbook.createCellStyle();
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerStyle.setFont(headerFont);

		// Track maximum width for each column
		Map<Integer, Integer> columnWidths = new HashMap<>();

		// Write parent entity fields (PHYSICALANDCHEMICALTESTHistory)
		for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext();) {
			String fieldName = convertCamelCaseToUpperCase(it.next()); // Capitalize the header text
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(fieldName);
			cell.setCellStyle(headerStyle); // Apply the bold style with background color

			// Set initial column width based on header length (characters * 256 = width in
			// Excel units)
			columnWidths.put(colIndex, Math.max(fieldName.length() * 256, 3000)); // Minimum 3000 units wide
			colIndex++;
		}

		// Use reflection to dynamically get child entity field names
		List<String> childEntity1Fields = getFieldNames(observationF004History.class); // Replace with your actual class
		List<String> childEntity2Fields = getFieldNames(MicrobilogyTestF004History.class); // Replace with your actual
																							// class

		// Add child entity fields to the header
		for (String childField : childEntity1Fields) {
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000)); // Ensure minimum column width
			colIndex++;
		}

		for (String childField : childEntity2Fields) {
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000));
			colIndex++;
		}

		// Create data rows for each invoice (parent entity and child entities)
		for (int i = 0; i < jsonArray.size(); i++) {
			JsonNode invoice = jsonArray.get(i);
			int startingRow = i + 1;
			Row row = sheet.createRow(startingRow);
			colIndex = 0;

			// Write parent entity data
			for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext();) {
				Map.Entry<String, JsonNode> field = fields.next();
				Cell cell = row.createCell(colIndex);
				String value = field.getValue().asText();
				if (field.getKey().equalsIgnoreCase("format")) {
					filename = field.getValue().asText();
				}
				cell.setCellValue(value);

				// Calculate and update maximum column width
				int lengthInCharacters = value.length();
				int currentMaxWidth = columnWidths.getOrDefault(colIndex, 3000);
				columnWidths.put(colIndex, Math.max(lengthInCharacters * 256, currentMaxWidth)); // Update width

				colIndex++;
			}

			// Write child entity 1 (List<QAqcObservationsHistory>) data dynamically
			JsonNode childEntity1List = invoice.path("observations"); // Ensure this field matches your entity's field
																		// name
			int maxRows = startingRow;
			if (childEntity1List != null && childEntity1List.isArray()) {
				for (int j = 0; j < childEntity1List.size(); j++) {
					JsonNode childEntity1 = childEntity1List.get(j);
					Row childRow = (j == 0) ? row : sheet.createRow(startingRow + j); // Use existing row or create new
					int childColIndex = colIndex; // Ensure child columns are written after parent columns
					for (String childField : childEntity1Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity1.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, startingRow + childEntity1List.size() - 1); // Update the max row index
			}

			// Write child entity 2 (List<microbiologicalTestHistoryF002>) data dynamically
			JsonNode childEntity2List = invoice.path("microbilogytestf004"); // Ensure this field matches your entity's
																				// field name
			if (childEntity2List != null && childEntity2List.isArray()) {
				for (int k = 0; k < childEntity2List.size(); k++) {
					JsonNode childEntity2 = childEntity2List.get(k);
					Row childRow = (k == 0 && maxRows == startingRow) ? row : sheet.createRow(maxRows + k); // Create
																											// new row
																											// if needed
					int childColIndex = colIndex + childEntity1Fields.size(); // Ensure columns come after previous
																				// child
					for (String childField : childEntity2Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity2.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, maxRows + childEntity2List.size() - 1); // Update max row index again
			}

			// Move to the next parent record, ensuring proper row advancement
			i = maxRows - 1; // Adjust i to handle expanded rows from child entities
		}

		// Apply column widths after writing the data
		for (Map.Entry<Integer, Integer> entry : columnWidths.entrySet()) {
			sheet.setColumnWidth(entry.getKey(), Math.min(entry.getValue(), 10000)); // Cap column width to avoid
																						// excessive width
		}

		// Set the content type and attachment header
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
	        workbook.write(byteArrayOutputStream);
	    } finally {
	        workbook.close(); // Ensure the workbook is closed
	    }

	    // Set headers and return the file in the ResponseEntity
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
	    headers.setContentDispositionFormData("attachment", filename + ".xlsx");

	    return ResponseEntity.ok()
	            .headers(headers)
	            .body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
	    
	}

	public String convertCamelCaseToUpperCase(String text) {
		// Insert a space before each uppercase letter (except for the first one)
		String withSpaces = text.replaceAll("([a-z])([A-Z])", "$1 $2");

		// Convert the entire string to uppercase
		List<String> skipList = Arrays.asList(skipValues);
		boolean isthere = false; // Reset for each field

		// Check if field name matches any in skipValues
		for (String skipValue : skipList) {
			if (skipValue.trim().equalsIgnoreCase(withSpaces.toUpperCase()) || skipValue.trim().contains(withSpaces.toUpperCase())) {
				isthere = true;
				break; // No need to check further if we found a match
			}
		}

		if (!isthere) { // Add field name if it's not in skipValues
			return withSpaces.toUpperCase();
		}

		return "";
	}

	public List<String> getFieldNames(Class<?> clazz) {
		List<String> fieldNames = new ArrayList<>();
		List<String> skipList = Arrays.asList(skipValues); // Convert the array to a list for easy comparison

		for (Field field : clazz.getDeclaredFields()) {
			String fieldName = field.getName();
			boolean isthere = false; // Reset for each field

			// Check if field name matches any in skipValues
			for (String skipValue : skipList) {
				if (skipValue.trim().equalsIgnoreCase(fieldName.toUpperCase())) {
					isthere = true;
					break; // No need to check further if we found a match
				}
			}

			if (!isthere) { // Add field name if it's not in skipValues
				fieldNames.add(fieldName);
			}
		}
		return fieldNames;
	}

	public ResponseEntity<?> downloadExcel04(String batch , String fromdate,String todate, HttpServletResponse response)
			throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();

		List<finishedproductanalysisreporthistory> invoices = finishedproductanalysisreporthistory
				.audit(batch,fromdate, todate);
		//
		String filename = "";

		ArrayNode jsonArray = objectMapper.valueToTree(invoices);

		// Create a Workbook
		Workbook workbook = new XSSFWorkbook();
		// Create a Sheet
		Sheet sheet = workbook.createSheet("finishedproductanalysisreporthistory");

		// Create header row with bold font and background color
		Row headerRow = sheet.createRow(0);
		JsonNode firstInvoice = jsonArray.get(0);
		int colIndex = 0;

		// Create a bold font style for the header with background color
		CellStyle headerStyle = workbook.createCellStyle();
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerStyle.setFont(headerFont);

		// Track maximum width for each column
		Map<Integer, Integer> columnWidths = new HashMap<>();

		// Write parent entity fields (PHYSICALANDCHEMICALTESTHistory)
		for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext();) {
			String fieldName = convertCamelCaseToUpperCase(it.next()); // Capitalize the header text
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(fieldName);
			cell.setCellStyle(headerStyle); // Apply the bold style with background color

			// Set initial column width based on header length (characters * 256 = width in
			// Excel units)
			columnWidths.put(colIndex, Math.max(fieldName.length() * 256, 3000)); // Minimum 3000 units wide
			colIndex++;
		}

		// Use reflection to dynamically get child entity field names
		List<String> childEntity1Fields = getFieldNames(observationsF006history.class); // Replace with your actual
																						// class
		List<String> childEntity2Fields = getFieldNames(MicrobilogyTestF006History.class); // Replace with your actual
																							// class

		// Add child entity fields to the header
		for (String childField : childEntity1Fields) {
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000)); // Ensure minimum column width
			colIndex++;
		}

		for (String childField : childEntity2Fields) {
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000));
			colIndex++;
		}

		// Create data rows for each invoice (parent entity and child entities)
		for (int i = 0; i < jsonArray.size(); i++) {
			JsonNode invoice = jsonArray.get(i);
			int startingRow = i + 1;
			Row row = sheet.createRow(startingRow);
			colIndex = 0;

			// Write parent entity data
			for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext();) {
				Map.Entry<String, JsonNode> field = fields.next();
				Cell cell = row.createCell(colIndex);
				String value = field.getValue().asText();
				if (field.getKey().equalsIgnoreCase("format")) {
					filename = field.getValue().asText();
				}
				cell.setCellValue(value);

				// Calculate and update maximum column width
				int lengthInCharacters = value.length();
				int currentMaxWidth = columnWidths.getOrDefault(colIndex, 3000);
				columnWidths.put(colIndex, Math.max(lengthInCharacters * 256, currentMaxWidth)); // Update width

				colIndex++;
			}

			// Write child entity 1 (List<QAqcObservationsHistory>) data dynamically
			JsonNode childEntity1List = invoice.path("observations"); // Ensure this field matches your entity's field
																		// name
			int maxRows = startingRow;
			if (childEntity1List != null && childEntity1List.isArray()) {
				for (int j = 0; j < childEntity1List.size(); j++) {
					JsonNode childEntity1 = childEntity1List.get(j);
					Row childRow = (j == 0) ? row : sheet.createRow(startingRow + j); // Use existing row or create new
					int childColIndex = colIndex; // Ensure child columns are written after parent columns
					for (String childField : childEntity1Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity1.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, startingRow + childEntity1List.size() - 1); // Update the max row index
			}

			// Write child entity 2 (List<microbiologicalTestHistoryF002>) data dynamically
			JsonNode childEntity2List = invoice.path("microbilogytestf006"); // Ensure this field matches your entity's
																				// field name
			if (childEntity2List != null && childEntity2List.isArray()) {
				for (int k = 0; k < childEntity2List.size(); k++) {
					JsonNode childEntity2 = childEntity2List.get(k);
					Row childRow = (k == 0 && maxRows == startingRow) ? row : sheet.createRow(maxRows + k); // Create
																											// new row
																											// if needed
					int childColIndex = colIndex + childEntity1Fields.size(); // Ensure columns come after previous
																				// child
					for (String childField : childEntity2Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity2.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, maxRows + childEntity2List.size() - 1); // Update max row index again
			}

			// Move to the next parent record, ensuring proper row advancement
			i = maxRows - 1; // Adjust i to handle expanded rows from child entities
		}

		// Apply column widths after writing the data
		for (Map.Entry<Integer, Integer> entry : columnWidths.entrySet()) {
			sheet.setColumnWidth(entry.getKey(), Math.min(entry.getValue(), 10000)); // Cap column width to avoid
																						// excessive width
		}

		// Set the content type and attachment header
		String file = filename + ".xlsx";
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + file + "\"");

		// Write the output to the response output stream
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
	        workbook.write(byteArrayOutputStream);
	    } finally {
	        workbook.close(); // Ensure the workbook is closed
	    }

	    // Set headers and return the file in the ResponseEntity
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
	    headers.setContentDispositionFormData("attachment", filename + ".xlsx");

	    return ResponseEntity.ok()
	            .headers(headers)
	            .body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
	    
	}
	public ResponseEntity<?> downloadExcel05(String batch , String fromdate,String todate, HttpServletResponse response)
			throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();

		List<weighingscalecalibrationreportHistoryCLF007> invoices = weighingscalecalibrationreportHistoryCLF007repo.audit(batch,fromdate, todate);
		//
		String filename = "";

		ArrayNode jsonArray = objectMapper.valueToTree(invoices);

		// Create a Workbook
		Workbook workbook = new XSSFWorkbook();
		// Create a Sheet
		Sheet sheet = workbook.createSheet("weighingscalecalibrationreportHistory");

		// Create header row with bold font and background color
		Row headerRow = sheet.createRow(0);
		JsonNode firstInvoice = jsonArray.get(0);
		int colIndex = 0;

		// Create a bold font style for the header with background color
		CellStyle headerStyle = workbook.createCellStyle();
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerStyle.setFont(headerFont);

		// Track maximum width for each column
		Map<Integer, Integer> columnWidths = new HashMap<>();

		// Write parent entity fields (PHYSICALANDCHEMICALTESTHistory)
		for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext();) {
			String fieldName = convertCamelCaseToUpperCase(it.next()); // Capitalize the header text
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(fieldName);
			cell.setCellStyle(headerStyle); // Apply the bold style with background color

			// Set initial column width based on header length (characters * 256 = width in
			// Excel units)
			columnWidths.put(colIndex, Math.max(fieldName.length() * 256, 3000)); // Minimum 3000 units wide
			colIndex++;
		}

		// Use reflection to dynamically get child entity field names
		List<String> childEntity1Fields = getFieldNames(obervationHistoryCLF007.class); // Replace with your actual
																						// class
//	    	List<String> childEntity2Fields = getFieldNames(MicrobilogyTestF006History.class);  // Replace with your actual class

		// Add child entity fields to the header
		for (String childField : childEntity1Fields) {
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000)); // Ensure minimum column width
			colIndex++;
		}

		// Create data rows for each invoice (parent entity and child entities)
		for (int i = 0; i < jsonArray.size(); i++) {
			JsonNode invoice = jsonArray.get(i);
			int startingRow = i + 1;
			Row row = sheet.createRow(startingRow);
			colIndex = 0;

			// Write parent entity data
			for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext();) {
				Map.Entry<String, JsonNode> field = fields.next();
				Cell cell = row.createCell(colIndex);
				String value = field.getValue().asText();
				if (field.getKey().equalsIgnoreCase("format")) {
					filename = field.getValue().asText();
				}
				cell.setCellValue(value);

				// Calculate and update maximum column width
				int lengthInCharacters = value.length();
				int currentMaxWidth = columnWidths.getOrDefault(colIndex, 3000);
				columnWidths.put(colIndex, Math.max(lengthInCharacters * 256, currentMaxWidth)); // Update width

				colIndex++;
			}

			// Write child entity 1 (List<QAqcObservationsHistory>) data dynamically
			JsonNode childEntity1List = invoice.path("obser"); // Ensure this field matches your entity's field name
			int maxRows = startingRow;
			if (childEntity1List != null && childEntity1List.isArray()) {
				for (int j = 0; j < childEntity1List.size(); j++) {
					JsonNode childEntity1 = childEntity1List.get(j);
					Row childRow = (j == 0) ? row : sheet.createRow(startingRow + j); // Use existing row or create new
					int childColIndex = colIndex; // Ensure child columns are written after parent columns
					for (String childField : childEntity1Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity1.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, startingRow + childEntity1List.size() - 1); // Update the max row index
			}

			// Write child entity 2 (List<microbiologicalTestHistoryF002>) data dynamically

			// Move to the next parent record, ensuring proper row advancement
			i = maxRows - 1; // Adjust i to handle expanded rows from child entities
		}

		// Apply column widths after writing the data
		for (Map.Entry<Integer, Integer> entry : columnWidths.entrySet()) {
			sheet.setColumnWidth(entry.getKey(), Math.min(entry.getValue(), 10000)); // Cap column width to avoid
																						// excessive width
		}

		// Set the content type and attachment header
		String file = filename + ".xlsx";
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + file + "\"");

		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
	        workbook.write(byteArrayOutputStream);
	    } finally {
	        workbook.close(); // Ensure the workbook is closed
	    }

	    // Set headers and return the file in the ResponseEntity
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
	    headers.setContentDispositionFormData("attachment", filename + ".xlsx");

	    return ResponseEntity.ok()
	            .headers(headers)
	            .body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
	}


	public ResponseEntity<?> downloadExcel06(String batch , String fromdate,String todate, HttpServletResponse response)
			throws SQLException, IOException, JSONException {

		ObjectMapper objectMapper = new ObjectMapper();

		List<fumigationARF011History> invoices = fumigationARF011HistoryRepo.audit(batch,fromdate, todate);
		//
		String filename = "";

		ArrayNode jsonArray = objectMapper.valueToTree(invoices);

		// Create a Workbook
		Workbook workbook = new XSSFWorkbook();
		// Create a Sheet
		Sheet sheet = workbook.createSheet("fumigationARF011History");

		// Create header row with bold font and background color
		Row headerRow = sheet.createRow(0);
		JsonNode firstInvoice = jsonArray.get(0);
		int colIndex = 0;

		// Create a bold font style for the header with background color
		CellStyle headerStyle = workbook.createCellStyle();
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerStyle.setFont(headerFont);

		// Track maximum width for each column
		Map<Integer, Integer> columnWidths = new HashMap<>();

		// Write parent entity fields (PHYSICALANDCHEMICALTESTHistory)
		for (Iterator<String> it = firstInvoice.fieldNames(); it.hasNext();) {
			String fieldName = convertCamelCaseToUpperCase(it.next()); // Capitalize the header text
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(fieldName);
			cell.setCellStyle(headerStyle); // Apply the bold style with background color

			// Set initial column width based on header length (characters * 256 = width in
			// Excel units)
			columnWidths.put(colIndex, Math.max(fieldName.length() * 256, 3000)); // Minimum 3000 units wide
			colIndex++;
		}

		// Use reflection to dynamically get child entity field names
		List<String> childEntity1Fields = getFieldNames(observationArF011History.class); // Replace with your actual
																							// class
//	    	List<String> childEntity2Fields = getFieldNames(MicrobilogyTestF006History.class);  // Replace with your actual class

		// Add child entity fields to the header
		for (String childField : childEntity1Fields) {
			Cell cell = headerRow.createCell(colIndex);
			cell.setCellValue(convertCamelCaseToUpperCase(childField));
			cell.setCellStyle(headerStyle);

			columnWidths.put(colIndex, Math.max(childField.length() * 256, 3000)); // Ensure minimum column width
			colIndex++;
		}

		// Create data rows for each invoice (parent entity and child entities)
		for (int i = 0; i < jsonArray.size(); i++) {
			JsonNode invoice = jsonArray.get(i);
			int startingRow = i + 1;
			Row row = sheet.createRow(startingRow);
			colIndex = 0;

			// Write parent entity data
			for (Iterator<Map.Entry<String, JsonNode>> fields = invoice.fields(); fields.hasNext();) {
				Map.Entry<String, JsonNode> field = fields.next();
				Cell cell = row.createCell(colIndex);
				String value = field.getValue().asText();
				if (field.getKey().equalsIgnoreCase("format")) {
					filename = field.getValue().asText();
				}
				cell.setCellValue(value);

				// Calculate and update maximum column width
				int lengthInCharacters = value.length();
				int currentMaxWidth = columnWidths.getOrDefault(colIndex, 3000);
				columnWidths.put(colIndex, Math.max(lengthInCharacters * 256, currentMaxWidth)); // Update width

				colIndex++;
			}

			// Write child entity 1 (List<QAqcObservationsHistory>) data dynamically
			JsonNode childEntity1List = invoice.path("observationArF011"); // Ensure this field matches your entity's
																			// field name
			int maxRows = startingRow;
			if (childEntity1List != null && childEntity1List.isArray()) {
				for (int j = 0; j < childEntity1List.size(); j++) {
					JsonNode childEntity1 = childEntity1List.get(j);
					Row childRow = (j == 0) ? row : sheet.createRow(startingRow + j); // Use existing row or create new
					int childColIndex = colIndex; // Ensure child columns are written after parent columns
					for (String childField : childEntity1Fields) {
						Cell cell = childRow.createCell(childColIndex);
						String childValue = childEntity1.path(childField).asText();
						cell.setCellValue(childValue != null && !childValue.isEmpty() ? childValue : "");

						// Update column width based on child data length
						int lengthInCharacters = childValue != null ? childValue.length() : 0;
						int currentMaxWidth = columnWidths.getOrDefault(childColIndex, 3000);
						columnWidths.put(childColIndex, Math.max(lengthInCharacters * 256, currentMaxWidth));

						childColIndex++;
					}
				}
				maxRows = Math.max(maxRows, startingRow + childEntity1List.size() - 1); // Update the max row index
			}

			// Write child entity 2 (List<microbiologicalTestHistoryF002>) data dynamically

			// Move to the next parent record, ensuring proper row advancement
			i = maxRows - 1; // Adjust i to handle expanded rows from child entities
		}

		// Apply column widths after writing the data
		for (Map.Entry<Integer, Integer> entry : columnWidths.entrySet()) {
			sheet.setColumnWidth(entry.getKey(), Math.min(entry.getValue(), 10000)); // Cap column width to avoid
																						// excessive width
		}

		// Set the content type and attachment header
		String file = filename + ".xlsx";
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + file + "\"");

		// Write the output to the response output stream
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		try {
	        workbook.write(byteArrayOutputStream);
	    } finally {
	        workbook.close(); // Ensure the workbook is closed
	    }

	    // Set headers and return the file in the ResponseEntity
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
	    headers.setContentDispositionFormData("attachment", filename + ".xlsx");

	    return ResponseEntity.ok()
	            .headers(headers)
	            .body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
	}
	
	public String rearrangeDate(String inputDate) {
		// Split the input date by "-"
		String[] dateParts = inputDate.split("-");

		// Rearrange the parts to "dd-MM-yyyy"
		String rearrangedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

		return rearrangedDate;
	}

}
