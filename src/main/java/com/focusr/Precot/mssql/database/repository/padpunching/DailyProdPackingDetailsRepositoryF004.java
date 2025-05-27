package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.DailyProdPackingDetailsF004;
public interface DailyProdPackingDetailsRepositoryF004 extends JpaRepository<DailyProdPackingDetailsF004, Long>{

	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_F004 WHERE DETAIL_ID = :detailId ", nativeQuery = true)
	DailyProdPackingDetailsF004 findFormById(@Param("detailId") long detailId);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_F004 WHERE DATE = :date AND SHIFT = :shift", nativeQuery = true)
	DailyProdPackingDetailsF004 findByDateShift(@Param("date") String date,@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_F004 WHERE DATE = :date AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<DailyProdPackingDetailsF004> findByDatePrintApi(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_DAILY_PRODUCTION_PACKING_DETAILS_F004 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY DETAIL_ID DESC", nativeQuery = true)
    List<DailyProdPackingDetailsF004> supervisorHodSummary();
}
