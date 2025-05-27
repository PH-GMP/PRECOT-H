package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.splunance.DailyProductionReportF006;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceSampleReportF012;


@Repository
public interface SpunlaceSampleReportF012Repository extends JpaRepository<SpunlaceSampleReportF012,Long>{
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_SAMPLE_REPORT_F012 WHERE ORDER_NO = :order_no AND SHIFT = :shift AND DATE = :date ", nativeQuery = true)
	List<SpunlaceSampleReportF012> getdetailsbyParam( @Param("order_no") String order_no,@Param("shift") String shift,@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_SAMPLE_REPORT_F012 WHERE ORDER_NO = :order_no AND SHIFT = :shift AND DATE = :date  AND QC_STATUS = 'QC_APPROVED'", nativeQuery = true)
	 List<SpunlaceSampleReportF012> printParam( @Param("order_no") String order_no,@Param("shift") String shift,@Param("date") String date);
	
	 @Query(value = "SELECT * FROM precot.SPUNLACE_SAMPLE_REPORT_F012  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND QC_STATUS != 'QC_APPROVED'  ORDER BY REPORT_ID DESC", nativeQuery = true)
	 List<SpunlaceSampleReportF012> hodSummary();
	 
	 @Query(value = "SELECT * FROM precot.SPUNLACE_SAMPLE_REPORT_F012  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND QC_STATUS != 'QC_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
	 List<SpunlaceSampleReportF012> qcSummary();
	 
	 @Query(value = "SELECT * FROM precot.SPUNLACE_SAMPLE_REPORT_F012  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR QC_STATUS != 'QC_APPROVED' ORDER BY REPORT_ID DESC", nativeQuery = true)
	 List<SpunlaceSampleReportF012> supervisorSummary();

	 @Query(value = "SELECT * FROM precot.SPUNLACE_SAMPLE_REPORT_F012 WHERE REPORT_ID = :report_id ", nativeQuery = true)
	 SpunlaceSampleReportF012 findFormById(@Param("report_id") long report_id);

}
