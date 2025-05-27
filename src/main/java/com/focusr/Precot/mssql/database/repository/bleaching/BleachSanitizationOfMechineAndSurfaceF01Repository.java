package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachSanitizationOfMechineAndSurfaceF01;
import com.focusr.Precot.util.bleaching.DashboardResponseInterface;

@Repository
public interface BleachSanitizationOfMechineAndSurfaceF01Repository extends JpaRepository<BleachSanitizationOfMechineAndSurfaceF01, Long>{

	 @Query(value = "SELECT * FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01 WHERE SMS_ID = :sms_id", nativeQuery = true)
	 BleachSanitizationOfMechineAndSurfaceF01 getDetailsById(@Param("sms_id") Long sms_id);

	@Query(value = "SELECT * FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01 WHERE FORMAT_NO =:formatNo", nativeQuery = true)
	List<BleachSanitizationOfMechineAndSurfaceF01> findFormatDetailsF36(@Param("formatNo") String formatNo);
	
	 @Query(value= "SELECT * FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01 WHERE MONTH = :month and YEAR = :year ORDER BY WEEK_AND_DATE ASC", nativeQuery = true)
	 List<BleachSanitizationOfMechineAndSurfaceF01> findByMonthAndYear(@Param("month") String month, @Param("year") String year);
	 
	  @Query(value="SELECT * FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS !='HOD_APPROVED' ORDER BY SMS_ID DESC", nativeQuery = true)
	    List<BleachSanitizationOfMechineAndSurfaceF01> getsummaryForSupervisor();

	    @Query(value="SELECT * FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' AND MAIL_STATUS = 'WAITING_FOR_APPROVAL' ORDER BY SMS_ID DESC", nativeQuery = true)
	    List<BleachSanitizationOfMechineAndSurfaceF01> getsummaryForHod();
	    
	    @Query(value = "SELECT * FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01 WHERE MONTH = :month AND YEAR =:year AND WEEK = :week" , nativeQuery = true)
		List< BleachSanitizationOfMechineAndSurfaceF01> getdateSanitizationMechineAndSurfaceDetails(@Param("month") String month,@Param("year") String year, @Param("week") String week);
	  
//	  @Query("SELECT b FROM BleachSanitizationOfMechineAndSurfaceF01 b WHERE b.supervisor_status = 'SUPERVISOR_APPROVED'")
//	    List<BleachSanitizationOfMechineAndSurfaceF01> getsummaryForHod();
	    
	    
//	    @Query(value = "SELECT " +
//	            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND MONTH(CONVERT(date, MONTH, 23)) = :month AND YEAR(CONVERT(date, YEAR, 23)) = :year THEN 1 ELSE 0 END) AS supervisiorSubmitted, " +
//	            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_APPROVED' AND MONTH(CONVERT(date, MONTH, 23)) = :month AND YEAR(CONVERT(date, YEAR, 23)) = :year THEN 1 ELSE 0 END) AS hodApproved, " +
//	            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_REJECTED' AND MONTH(CONVERT(date, MONTH, 23)) = :month AND YEAR(CONVERT(date, YEAR, 23)) = :year THEN 1 ELSE 0 END) AS hodRejected " +
//	            "FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42", nativeQuery = true)
//	    @Query(value = "SELECT " +
//	            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND DATENAME(month, CONVERT(date, MONTH + ' 1 ' + YEAR)) = :month AND YEAR(CONVERT(date, MONTH + ' 1 ' + YEAR)) = :year THEN 1 ELSE 0 END) AS supervisiorSubmitted, " +
//	            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_APPROVED' AND DATENAME(month, CONVERT(date, MONTH + ' 1 ' + YEAR)) = :month AND YEAR(CONVERT(date, MONTH + ' 1 ' + YEAR)) = :year THEN 1 ELSE 0 END) AS hodApproved, " +
//	            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_REJECTED' AND DATENAME(month, CONVERT(date, MONTH + ' 1 ' + YEAR)) = :month AND YEAR(CONVERT(date, MONTH + ' 1 ' + YEAR)) = :year THEN 1 ELSE 0 END) AS hodRejected " +
//	            "FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01", nativeQuery = true)
	    @Query(value = "SELECT " +
	            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND " +
	            "CASE " +
	            "  WHEN MONTH = 'Jan' THEN 1 " +
	            "  WHEN MONTH = 'Feb' THEN 2 " +
	            "  WHEN MONTH = 'Mar' THEN 3 " +
	            "  WHEN MONTH = 'Apr' THEN 4 " +
	            "  WHEN MONTH = 'May' THEN 5 " +
	            "  WHEN MONTH = 'Jun' THEN 6 " +
	            "  WHEN MONTH = 'Jul' THEN 7 " +
	            "  WHEN MONTH = 'Aug' THEN 8 " +
	            "  WHEN MONTH = 'Sep' THEN 9 " +
	            "  WHEN MONTH = 'Oct' THEN 10 " +
	            "  WHEN MONTH = 'Nov' THEN 11 " +
	            "  WHEN MONTH = 'Dec' THEN 12 " +
	            "END = :month AND YEAR = :year THEN 1 ELSE 0 END) AS supervisiorSubmitted, " +
	            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_APPROVED' AND " +
	            "CASE " +
	            "  WHEN MONTH = 'Jan' THEN 1 " +
	            "  WHEN MONTH = 'Feb' THEN 2 " +
	            "  WHEN MONTH = 'Mar' THEN 3 " +
	            "  WHEN MONTH = 'Apr' THEN 4 " +
	            "  WHEN MONTH = 'May' THEN 5 " +
	            "  WHEN MONTH = 'Jun' THEN 6 " +
	            "  WHEN MONTH = 'Jul' THEN 7 " +
	            "  WHEN MONTH = 'Aug' THEN 8 " +
	            "  WHEN MONTH = 'Sep' THEN 9 " +
	            "  WHEN MONTH = 'Oct' THEN 10 " +
	            "  WHEN MONTH = 'Nov' THEN 11 " +
	            "  WHEN MONTH = 'Dec' THEN 12 " +
	            "END = :month AND YEAR = :year THEN 1 ELSE 0 END) AS hodApproved, " +
	            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_REJECTED' AND " +
	            "CASE " +
	            "  WHEN MONTH = 'Jan' THEN 1 " +
	            "  WHEN MONTH = 'Feb' THEN 2 " +
	            "  WHEN MONTH = 'Mar' THEN 3 " +
	            "  WHEN MONTH = 'Apr' THEN 4 " +
	            "  WHEN MONTH = 'May' THEN 5 " +
	            "  WHEN MONTH = 'Jun' THEN 6 " +
	            "  WHEN MONTH = 'Jul' THEN 7 " +
	            "  WHEN MONTH = 'Aug' THEN 8 " +
	            "  WHEN MONTH = 'Sep' THEN 9 " +
	            "  WHEN MONTH = 'Oct' THEN 10 " +
	            "  WHEN MONTH = 'Nov' THEN 11 " +
	            "  WHEN MONTH = 'Dec' THEN 12 " +
	            "END = :month AND YEAR = :year THEN 1 ELSE 0 END) AS hodRejected " +
	            "FROM precot.BLEACH_SANITIZATION_OF_MECHINE_AND_SURFACE_F01", nativeQuery = true)
		DashboardResponseInterface getDashboardCounts(@Param("month") int month, @Param("year") int year, @Param("username") String username);
		
		
		@Query(value = "SELECT SUM(CASE WHEN SUPERVISOR_SUBMIT_BY IS NOT NULL AND MONTH(CONVERT(date, MONTH, 23)) = :month AND YEAR(CONVERT(date, YEAR, 23)) = :year THEN 1 ELSE 0 END) AS supervisiorSubmitted, " +
	            "SUM(CASE WHEN HOD_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_APPROVED' AND MONTH(CONVERT(date, MONTH, 23)) = :month AND YEAR(CONVERT(date, YEAR, 23)) = :year THEN 1 ELSE 0 END) AS hodApproved, " +
	            "SUM(CASE WHEN HOD_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_REJECTED' AND MONTH(CONVERT(date, MONTH, 23)) = :month AND YEAR(CONVERT(date, YEAR, 23)) = :year THEN 1 ELSE 0 END) AS hodRejected " +
	            "FROM precot.BLEACH_LAY_DOWN_CHECK_LIST_F42", nativeQuery = true)
		DashboardResponseInterface getHODDashboardCounts(@Param("month") int month, @Param("year") int year, @Param("username") String username);
	    
}
