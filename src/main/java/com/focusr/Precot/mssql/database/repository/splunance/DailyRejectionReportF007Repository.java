package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.DailyRejectionReportF007;

public interface DailyRejectionReportF007Repository extends JpaRepository<DailyRejectionReportF007,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_F007 WHERE REPORT_ID = :reportId ", nativeQuery = true)
	DailyRejectionReportF007 findFormById(@Param("reportId") long reportId);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_F007 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO = :orderNo ", nativeQuery = true)
    DailyRejectionReportF007 findByDateShiftOrderNo(@Param("date") String date, @Param("shift") String shift, @Param("orderNo") String orderNo);

	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_F007 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO = :orderNo AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
    DailyRejectionReportF007 findByDateShiftOrderNoPrintApi(@Param("date") String date, @Param("shift") String shift, @Param("orderNo") String orderNo);

//	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_F007 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
//    List<DailyRejectionReportF007> supervisorSummary();
//
//	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_F007 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
//    List<DailyRejectionReportF007> hodSummary();
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_REJECTION_REPORT_F007 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
    List<DailyRejectionReportF007> SummaryF007();
}
