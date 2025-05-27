package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.DailyProductionReportF006;

public interface DailyProductionReportF006Repository extends JpaRepository<DailyProductionReportF006,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_F006 WHERE REPORT_ID = :reportId ", nativeQuery = true)
	DailyProductionReportF006 findFormById(@Param("reportId") long reportId);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_F006 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO = :orderNo", nativeQuery = true)
	DailyProductionReportF006 findByDateShiftOrderNo(@Param("date") String date, @Param("shift") String shift,@Param("orderNo") String orderNo);

	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_F006 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO = :orderNo AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	DailyProductionReportF006 findByDateShiftOrderNoPrintApi(@Param("date") String date, @Param("shift") String shift,@Param("orderNo") String orderNo);

//	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_F006 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
//    List<DailyProductionReportF006> operatorSummary();
//	
//	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_F006 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
//    List<DailyProductionReportF006> supervisorSummary();
//
//	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_F006 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
//    List<DailyProductionReportF006> hodSummary();
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_F006 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
    List<DailyProductionReportF006> operatorSummary();
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_PRODUCTION_REPORT_F006 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
    List<DailyProductionReportF006> supervisorHodSummary();

}
