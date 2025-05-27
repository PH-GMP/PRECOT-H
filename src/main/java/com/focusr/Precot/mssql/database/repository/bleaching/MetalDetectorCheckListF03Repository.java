package com.focusr.Precot.mssql.database.repository.bleaching;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
 
import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;
import com.focusr.Precot.mssql.database.model.bleaching.EquipLogBookHydroExtractorF11;
import com.focusr.Precot.mssql.database.model.bleaching.MetalDetectorCheckListF03;
 
public interface MetalDetectorCheckListF03Repository extends JpaRepository<MetalDetectorCheckListF03,Long>{
	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CHECK_LIST_F03 WHERE LIST_ID = :listId ", nativeQuery = true)
	MetalDetectorCheckListF03 findFormById(@Param("listId") long listId);
	
//	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CHECK_LIST_F03 WHERE MONTH(DATE) = :month", nativeQuery = true)
//    List<MetalDetectorCheckListF03> findByMonth(@Param("month") int month);
	
//	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CHECK_LIST_F03 " +
//            "WHERE TRY_CONVERT(DATE, DATE, 103) IS NOT NULL " +
//            "AND MONTH(TRY_CONVERT(DATE, DATE, 103)) = :month", nativeQuery = true)
//List<MetalDetectorCheckListF03> findByMonth(@Param("month") int month);
	
//	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CHECK_LIST_F03 WHERE DATE = :date", nativeQuery = true)
//    MetalDetectorCheckListF03 findByDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CHECK_LIST_F03 WHERE DATE = :date AND SECTION = :section", nativeQuery = true)
	MetalDetectorCheckListF03 findByDateAndSection(@Param("date") String date, @Param("section") String section);
	
	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CHECK_LIST_F03 WHERE TRY_CONVERT(DATE, DATE, 103) IS NOT NULL AND MONTH(TRY_CONVERT(DATE, DATE, 103)) = :month AND YEAR(TRY_CONVERT(DATE, DATE, 103)) = :year AND SECTION = :section AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<MetalDetectorCheckListF03> findByMonth(@Param("month") int month, @Param("year") int year,
			@Param("section") String section);
	
//	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CHECK_LIST_F03 WHERE MONTH(DATE) = :month AND YEAR(DATE) = :year AND SECTION = :section AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//    List<MetalDetectorCheckListF03> findByMonth(@Param("month") int month,@Param("year") int year,@Param("section") String section);
	
	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CHECK_LIST_F03 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
	List<MetalDetectorCheckListF03> findBySupervisorStatusSavedAndNotApproved();

	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CHECK_LIST_F03 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
	List<MetalDetectorCheckListF03> findBySupervisorStatusApprovedAndHodStatusNotApproved();
 
 
}