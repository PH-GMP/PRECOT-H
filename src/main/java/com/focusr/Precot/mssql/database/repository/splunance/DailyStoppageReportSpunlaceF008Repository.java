package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.DailyStoppageReportSpunlaceF008;



@Repository
public interface DailyStoppageReportSpunlaceF008Repository extends JpaRepository<DailyStoppageReportSpunlaceF008,Long>{


	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_F008 WHERE DATE = :date", nativeQuery = true)
	List<DailyStoppageReportSpunlaceF008> getdetailsbyParam( @Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_F008 WHERE DATE = :date AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	 List<DailyStoppageReportSpunlaceF008> printParam( @Param("date") String date);


	 @Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_F008  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED'  ORDER BY STOPPAGE_ID DESC", nativeQuery = true)
	 List<DailyStoppageReportSpunlaceF008> hodSummary();
	 
	 @Query(value = "SELECT * FROM precot.SPUNLACE_DAILY_STOPPAGE_DETAILS_F008  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS !='HOD_APPROVED' ORDER BY STOPPAGE_ID DESC", nativeQuery = true)
	 List<DailyStoppageReportSpunlaceF008> supervisorSummary();
}
