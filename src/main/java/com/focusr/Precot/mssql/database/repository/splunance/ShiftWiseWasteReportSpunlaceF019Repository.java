package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.ShiftWiseWasteReportSpunlaceF019;

public interface ShiftWiseWasteReportSpunlaceF019Repository extends JpaRepository<ShiftWiseWasteReportSpunlaceF019,Long>{

	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_F019 WHERE REPORT_ID = :reportId ", nativeQuery = true)
	ShiftWiseWasteReportSpunlaceF019 findFormById(@Param("reportId") long reportId);

	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_F019 WHERE DATE = :date AND SHIFT = :shift", nativeQuery = true)
	ShiftWiseWasteReportSpunlaceF019 findByDateShift(@Param("date") String date,@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_F019 WHERE DATE = :date AND SHIFT = :shift AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	ShiftWiseWasteReportSpunlaceF019 findByDateShiftPrintApi(@Param("date") String date,@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_F019 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
    List<ShiftWiseWasteReportSpunlaceF019> supervisorSummary();

	@Query(value = "SELECT * FROM precot.SPUNLACE_SHIFT_WISE_COTTON_WASTE_REPORT_F019 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
    List<ShiftWiseWasteReportSpunlaceF019> hodSummary();
}
