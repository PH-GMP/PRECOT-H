package com.focusr.Precot.mssql.database.repository.bleaching;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
 
import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContRawCottonF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContAbsBleachedCottonF18;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
import com.focusr.Precot.mssql.database.model.bleaching.MetalDetectorCheckListF03;
import com.focusr.Precot.util.bleaching.DashboardResponseInterface;
 
@Repository
public interface BleachContRawCottonF05Repository extends JpaRepository<BleachContRawCottonF05,Long>
{
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE ID = :id ", nativeQuery = true)
	BleachContRawCottonF05 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<BleachContRawCottonF05> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE FORMAT_NO =:format_no", nativeQuery = true)
	List<BleachContRawCottonF05> findByListOfF05FormatDetails(@Param("format_no") String formatNo);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE PH_NO =:phNo", nativeQuery = true)
	List<BleachContRawCottonF05> findByPHDetails(@Param("phNo") String phNo);
	
//	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED'", nativeQuery = true)
//	List<BleachContRawCottonF05> findBySupervisorStatusSavedAndNotApproved();
	
//	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' AND SUPERVISOR_SAVED_ID =:supervisor_saved_id", nativeQuery = true)
//	List<BleachContRawCottonF05> findBySupervisorStatusSavedAndNotApproved(@Param("supervisor_saved_id") Long supervisor_saved_id);

	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachContRawCottonF05> findBySupervisorStatusSavedAndNotApproved();

	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachContRawCottonF05> findBySupervisorStatusApprovedAndHodStatusNotApproved();
	
//	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED'", nativeQuery = true)
//	List<BleachContRawCottonF05> findBySupervisorStatusApprovedAndHodStatusNotApproved();
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE DATE = :date AND HOD_STATUS = 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachContRawCottonF05> findByDate(@Param("date") String date);
	
	
//	@Query(value = "SELECT " +
//            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND MONTH(CONVERT(date, DATE, 23)) = :month AND YEAR(CONVERT(date, DATE, 23)) = :year THEN 1 ELSE 0 END) AS supervisiorSubmitted, " +
//            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_APPROVED' AND MONTH(CONVERT(date, DATE, 23)) = :month AND YEAR(CONVERT(date, DATE, 23)) = :year THEN 1 ELSE 0 END) AS hodApproved, " +
//            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_REJECTED' AND MONTH(CONVERT(date, DATE, 23)) = :month AND YEAR(CONVERT(date, DATE, 23)) = :year THEN 1 ELSE 0 END) AS hodRejected " +
//            "FROM precot.BLEACH_CONT_RAWCOTTON_F05", nativeQuery = true)
	@Query(value = "SELECT " +
            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND MONTH(TRY_CONVERT(date, DATE, 103)) = :month AND YEAR(TRY_CONVERT(date, DATE, 103)) = :year THEN 1 ELSE 0 END) AS supervisiorSubmitted, " +
            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_APPROVED' AND MONTH(TRY_CONVERT(date, DATE, 103)) = :month AND YEAR(TRY_CONVERT(date, DATE, 103)) = :year THEN 1 ELSE 0 END) AS hodApproved, " +
            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_REJECTED' AND MONTH(TRY_CONVERT(date, DATE, 103)) = :month AND YEAR(TRY_CONVERT(date, DATE, 103)) = :year THEN 1 ELSE 0 END) AS hodRejected " +
            "FROM precot.BLEACH_CONT_RAWCOTTON_F05", nativeQuery = true)
	DashboardResponseInterface getDashboardCounts(@Param("month") int month, @Param("year") int year, @Param("username") String username);
	
	
	@Query(value = "SELECT " +
            "SUM(CASE WHEN SUPERVISOR_SUBMIT_BY IS NOT NULL AND MONTH(TRY_CONVERT(date, DATE, 103)) = :month AND YEAR(TRY_CONVERT(date, DATE, 103)) = :year THEN 1 ELSE 0 END) AS supervisiorSubmitted, " +
            "SUM(CASE WHEN HOD_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_APPROVED' AND MONTH(TRY_CONVERT(date, DATE, 103)) = :month AND YEAR(TRY_CONVERT(date, DATE, 103)) = :year THEN 1 ELSE 0 END) AS hodApproved, " +
            "SUM(CASE WHEN HOD_SUBMIT_BY = :username AND HOD_STATUS = 'HOD_REJECTED' AND MONTH(TRY_CONVERT(date, DATE, 103)) = :month AND YEAR(TRY_CONVERT(date, DATE, 103)) = :year THEN 1 ELSE 0 END) AS hodRejected " +
            "FROM precot.BLEACH_CONT_RAWCOTTON_F05", nativeQuery = true)
	DashboardResponseInterface getHODDashboardCounts(@Param("month") int month, @Param("year") int year, @Param("username") String username);
	
	
//	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE DATE = :date AND PH_NO = :phNo AND HOD_STATUS = 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
//	List<BleachContRawCottonF05> findByDateNew(@Param("date") String date, @Param("phNo") String phNo);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE PH_NO = :phNo AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<BleachContRawCottonF05> findByDateNew( @Param("phNo") String phNo);
	
	
	@Query(value = "SELECT PH_NO FROM precot.BLEACH_CONT_RAWCOTTON_F05 WHERE HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<String> findApprovedPH();
	

}