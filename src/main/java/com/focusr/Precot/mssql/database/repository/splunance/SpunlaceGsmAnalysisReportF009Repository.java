package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.SpunlaceGsmAnalysisReportF009;

public interface SpunlaceGsmAnalysisReportF009Repository extends JpaRepository<SpunlaceGsmAnalysisReportF009,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_F009 WHERE REPORT_ID = :reportId ", nativeQuery = true)
	SpunlaceGsmAnalysisReportF009 findFormById(@Param("reportId") long reportId);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_F009 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO = :orderNo", nativeQuery = true)
	SpunlaceGsmAnalysisReportF009 findByDateShiftOrderNo(@Param("date") String date, @Param("shift") String shift,@Param("orderNo") String orderNo);

	@Query(value = "SELECT * FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_F009 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO = :orderNo AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	SpunlaceGsmAnalysisReportF009 findByDateShiftOrderNoPrintApi(@Param("date") String date, @Param("shift") String shift,@Param("orderNo") String orderNo);

	@Query(value = "SELECT * FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_F009 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
    List<SpunlaceGsmAnalysisReportF009> supervisorSummary();

	@Query(value = "SELECT * FROM precot.SPUNLACE_GSM_ANALYSIS_REPORT_F009 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
    List<SpunlaceGsmAnalysisReportF009> hodSummary();

}
