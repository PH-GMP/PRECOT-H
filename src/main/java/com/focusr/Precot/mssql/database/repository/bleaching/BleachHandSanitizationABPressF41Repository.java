package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;
import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;
import com.focusr.Precot.mssql.database.model.bleaching.BleachShiftLogBookF36;

@Repository
public interface BleachHandSanitizationABPressF41Repository
		extends JpaRepository<BleachHandSanitizationABPressF41, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41 WHERE HAND_SANITIZATION_ID=:id", nativeQuery = true)
	Optional<BleachHandSanitizationABPressF41> getHandSanitizationABPressF41ById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41 WHERE HAND_SANITIZATION_ID=:id", nativeQuery = true)
	BleachHandSanitizationABPressF41 fetchHandSanitizationABPressF41ById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41 WHERE DATE=:date", nativeQuery = true)
	Optional<BleachHandSanitizationABPressF41> getHandSanitizationABPressF41ByDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41 WHERE FORMAT_NO =:formatNo", nativeQuery = true)
	List<BleachHandSanitizationABPressF41> findFormatDetailsF41(@Param("formatNo") String formatNo);

	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41 WHERE SUPERVISIOR_STATUS IN ('SUPERVISIOR_SUBMITTED') AND HOD_APPROVER_STATUS IN ('WAITING_FOR_APPROVAL', 'HOD_SUBMITTED') AND HOD_MAIL_STATUS IN ('WAITING_FOR_APPROVAL', 'HOD_SUBMITTED') ORDER BY HAND_SANITIZATION_ID DESC", nativeQuery = true)
	List<BleachHandSanitizationABPressF41> submittedHandSanitization();

	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41  WHERE DATE = :date AND SHIFT = :shift", nativeQuery = true)
	List<BleachHandSanitizationABPressF41> findByDateAndShift(@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS !='HOD_APPROVED' ORDER BY HAND_SANITIZATION_ID DESC", nativeQuery = true)
	List<BleachHandSanitizationABPressF41> getsummaryForSupervisor();

	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41  WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY HAND_SANITIZATION_ID DESC", nativeQuery = true)
	List<BleachHandSanitizationABPressF41> getsummaryForHod();
	
	
		// FOR DISTINCT ID NUMBER
	
	@Query(value = "SELECT DISTINCT ID_NUMBER FROM precot.BLEACH_SANITIZATION_LIST_F41", nativeQuery = true)
	List<String> fetchBleachingIdNumbers();
	
//	@Query("SELECT b FROM BleachHandSanitizationABPressF41 b WHERE b.supervisor_status = 'SUPERVISOR_APPROVED'")
//	List<BleachHandSanitizationABPressF41> getsummaryForHod();

}
