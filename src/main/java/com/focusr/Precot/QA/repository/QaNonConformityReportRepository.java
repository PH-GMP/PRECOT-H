package com.focusr.Precot.QA.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.QaCustomerComplaintRegisterForm;
import com.focusr.Precot.QA.model.QaNonConformityReport;

public interface QaNonConformityReportRepository extends JpaRepository<QaNonConformityReport, Long> {

	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT WHERE ID = :id ", nativeQuery = true)
	QaNonConformityReport findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT WHERE NCR_NUMBER =:ncrNumber", nativeQuery = true)
	QaNonConformityReport getByparam(@Param("ncrNumber") String ncrNumber);

	// Summary

	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT WHERE (QA_MANAGER_STATUS IS NULL OR QA_MANAGER_STATUS != 'QA_MR_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<QaNonConformityReport> qaInspectorSummary();

	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT WHERE TAB_STATUS_A = 'SUBMITTED' AND QA_MANAGER_STATUS != 'QA_MR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<QaNonConformityReport> ProdSupSummary();

//	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT WHERE TAB_STATUS = 'SUMBITTED_FOR_APPROVAL' AND QA_MANAGER_STATUS != 'QA_MR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<QaNonConformityReport> prodHeadQaMrSummary();
	
	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT WHERE TAB_STATUS_A = 'SUBMITTED' AND DEPARTMENT =:department  AND QA_MANAGER_STATUS != 'QA_MR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<QaNonConformityReport> ProdSupSummary(@Param("department") String department);
 
	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT WHERE TAB_STATUS = 'SUMBITTED_FOR_APPROVAL' AND DEPARTMENT =:department AND QA_MANAGER_STATUS != 'QA_MR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<QaNonConformityReport> prodHeadSummary(@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT WHERE TAB_STATUS = 'SUMBITTED_FOR_APPROVAL' AND QA_MANAGER_STATUS != 'QA_MR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<QaNonConformityReport> qaMrSummary();

	// NCR NUMBER LOV
	@Query(value = "SELECT NCR_NUMBER FROM precot.QA_NON_CONFORMITY_REPORT", nativeQuery = true)
	List<String> ncrNoLov();

	// Print
	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT WHERE " + " (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:ncrNumber IS NULL OR :ncrNumber='' OR NCR_NUMBER=:ncrNumber)"
			+ " AND QA_MANAGER_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<QaNonConformityReport> printApi(@Param("year") String year, @Param("ncrNumber") String ncrNumber);

	// NCR LOV for Print
	@Query(value = "SELECT NCR_NUMBER FROM precot.QA_NON_CONFORMITY_REPORT WHERE FINANCIAL_YEAR =:financialYear AND QA_MANAGER_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<String> ncrNumberPrintLov(@Param("financialYear") String financialYear);

	// Get list for NC Logbooks

	@Query(value = "SELECT DATE as date, NCR_NUMBER as ncrNumber, DEPARTMENT as department, MACHINE_NAME as machineName,"
			+ "PRODUCT as productName, BATCH_NO as fgNo, NON_CONFORMITY_NATURE as nonConfirmityNature,CLASSIFICATION_MINOR as classificationMinor, CLASSIFICATION_MAJOR as classificationMajor,CLASSIFICATION_CRITICAL as classificationCritical, QA_INSPECTOR_A as qaInspector ,"
			+ " CAPA_DATE as capaDate, STATUS as status"
			+ " FROM precot.QA_NON_CONFORMITY_REPORT  WHERE YEAR=:year", nativeQuery = true)
	List<Map<String, Object>> getForNCLogbook(@Param("year") String year);

	@Query(value = "SELECT * FROM precot.QA_NON_CONFORMITY_REPORT WHERE FINANCIAL_YEAR =:financialYear AND QA_MANAGER_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
	List<QaNonConformityReport> printApiForNCLogbook(@Param("financialYear") String financialYear);

	// Trend chart API

//	@Query(value = "SELECT NON_CONFORMITY_NATURE, COUNT(NON_CONFORMITY_NATURE) " + "FROM precot.QA_NON_CONFORMITY_REPORT  "
//			+ "WHERE (:month IS NULL OR :month='' OR MONTH=:month) " 
//			+ "AND (:year IS NULL OR :year='' OR YEAR=:year) " 
//			+ "AND QA_MANAGER_STATUS = 'QA_MR_APPROVED' "
//			+ "GROUP BY NON_CONFORMITY_NATURE", nativeQuery = true)
//	List<Object[]> trendChartApi(@Param("month") String month, @Param("year") String year);
	
	@Query(value = "SELECT NON_CONFORMITY_NATURE, COUNT(NON_CONFORMITY_NATURE) " + "FROM precot.QA_NON_CONFORMITY_REPORT  "
			+ "WHERE FINANCIAL_YEAR =:financialYear " 
			+ "AND QA_MANAGER_STATUS = 'QA_MR_APPROVED' "
			+ "GROUP BY NON_CONFORMITY_NATURE", nativeQuery = true)
	List<Object[]> trendChartApi(@Param("financialYear") String financialYear);

	
	//Number generation
		 @Query(value = "SELECT TOP 1 * FROM precot.QA_NON_CONFORMITY_REPORT ORDER BY ID DESC", nativeQuery = true)
		 QaNonConformityReport fetchLastGeneratedNo();

		// Bleaching BMR Lov
		 
			@Query(value = "SELECT BMR_NO FROM precot.BLEACH_BMR_LAYDOWN_MAPPING", nativeQuery = true)
			List<String> bleachingBmrLov();

}
