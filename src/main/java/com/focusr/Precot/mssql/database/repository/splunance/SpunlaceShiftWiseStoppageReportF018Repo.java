package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.SpunlaceShiftWiseStoppageReportF018;

@Repository
public interface SpunlaceShiftWiseStoppageReportF018Repo
		extends JpaRepository<SpunlaceShiftWiseStoppageReportF018, Long> {

	@Query(value = "SELECT * FROM precot.SHIFT_WISE_STOPPAGE_REPORT_F018 WHERE ID=:id", nativeQuery = true)
	SpunlaceShiftWiseStoppageReportF018 findStoppageReportById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.SHIFT_WISE_STOPPAGE_REPORT_F018 WHERE ORDER_NO=:order AND DATE=:date AND SHIFT=:shift", nativeQuery = true)
	List<SpunlaceShiftWiseStoppageReportF018> fetchStoppageReport(@Param("order") String order,
			@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.SHIFT_WISE_STOPPAGE_REPORT_F018 WHERE DATE=:date AND (HOD_STATUS = 'HOD_APPROVED' OR HOD_MAIL_STATUS = 'HOD_APPROVED')", nativeQuery = true)
	List<SpunlaceShiftWiseStoppageReportF018> printStoppageReport(@Param("date") String date);

//	@Query(value = "SELECT * FROM precot.SHIFT_WISE_STOPPAGE_REPORT_F018 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' AND HOD_MAIL_STATUS != 'HOD_APPROVED'", nativeQuery = true)
//	List<SpunlaceShiftWiseStoppageReportF018> hodSummary();
	
	@Query(value = "SELECT * FROM precot.SHIFT_WISE_STOPPAGE_REPORT_F018 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<SpunlaceShiftWiseStoppageReportF018> hodSummary();

	@Query(value = "SELECT * FROM precot.SHIFT_WISE_STOPPAGE_REPORT_F018 WHERE DATE=:date", nativeQuery = true)
	List<SpunlaceShiftWiseStoppageReportF018> getByDateF018(@Param("date") String date);
}
