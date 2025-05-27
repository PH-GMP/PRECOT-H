package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachSummaryReport;

@Repository
public interface BleachSummaryReportRepository extends JpaRepository<BleachSummaryReport, Long> {
	
	
	@Query(value ="SELECT * FROM precot.BLEACH_ALL_FORMATS WHERE DEPARTMENT_ID = :departmentId",nativeQuery=true)
	List<BleachSummaryReport> findByDepartmentId(@Param("departmentId") Long departmentId);
	
	
	@Query(value ="SELECT * FROM precot.BLEACH_ALL_FORMATS WHERE DEPARTMENT_ID = :departmentId and FORMAT = :formatId",nativeQuery=true)
	BleachSummaryReport findByDepartmentBasedFormat(@Param("departmentId") Long departmentId ,@Param("formatId") String formatId);
	
	

}
