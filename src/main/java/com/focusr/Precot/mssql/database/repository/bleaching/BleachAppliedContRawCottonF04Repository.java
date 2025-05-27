package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContRawCottonF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;

@Repository
public interface BleachAppliedContRawCottonF04Repository extends JpaRepository<BleachAppliedContRawCottonF04, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE RAW_ID =:id", nativeQuery = true)
	BleachAppliedContRawCottonF04 appliedRawCottonById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE FORMAT_NO =:id", nativeQuery = true)
	List<BleachAppliedContRawCottonF04> appliedRawCottonByFormId(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE FORMAT_NO =:formatNo", nativeQuery = true)
	List<BleachAppliedContRawCottonF04> findFormatDetailsF04(@Param("formatNo") String formatNo);

	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE SUPERVISIOR_STATUS IN ('SUPERVISIOR_SUBMITTED') AND HOD_APPROVER_STATUS IN ('WAITING_FOR_APPROVAL', 'HOD_SUBMITTED') AND HOD_MAIL_STATUS IN ('WAITING_FOR_APPROVAL', 'HOD_SUBMITTED') ORDER BY RAW_ID DESC", nativeQuery = true)
	List<BleachAppliedContRawCottonF04> submittedAppliedRawCotton();

//	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE BMR_NUMBER =:bmr", nativeQuery = true)
//	BleachAppliedContRawCottonF04 appliedRawCottonByBMR(@Param("bmr") String bmr);

	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE BMR_NUMBER =:bmr", nativeQuery = true)
	List<BleachAppliedContRawCottonF04> appliedRawCottonByBMR(@Param("bmr") String bmr);

	// Backup
//	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE BMR_NUMBER = :bmr AND (SUPERVISOR_SAVED_ID = :supervisorSavedId OR SUPERVISOR_SUBMIT_ID = :supervisorSavedId)", nativeQuery = true)
//	List<BleachAppliedContRawCottonF04> appliedRawCottonByBMR(@Param("bmr") String bmr, @Param("supervisorSavedId") Long supervisorSavedId);

//	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' AND SUPERVISOR_SAVED_ID =:supervisor_saved_id", nativeQuery = true)
//	List<BleachAppliedContRawCottonF04> getSupervisorSummeryDetails(
//			@Param("supervisor_saved_id") Long supervisor_saved_id);

	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY RAW_ID DESC", nativeQuery = true)
	List<BleachAppliedContRawCottonF04> getSupervisorSummeryDetails();

	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE SUPERVISOR_STATUS ='SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY RAW_ID DESC", nativeQuery = true)
	List<BleachAppliedContRawCottonF04> getHodSummeryDetails();

//	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE SUPERVISOR_STATUS ='SUPERVISOR_APPROVED'", nativeQuery = true)
//	List<BleachAppliedContRawCottonF04> getHodSummeryDetails();

	@Query(value = "SELECT * FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE BMR_NUMBER =:bmr AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<BleachAppliedContRawCottonF04> getBmrDetailsF04(@Param("bmr") String bmr);
	
	
	@Query(value = "SELECT DISTINCT BMR_NUMBER FROM precot.BLEACH_APPLIED_CONT_RAW_COTTON_F04 WHERE HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<String> approvedBMRforAppliedRawCottonF04();
	

}
