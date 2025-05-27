package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BleachMixingChangeMachineCleaningF38;

public interface BleachMixingChangeMachineCleaningF38Repository
		extends JpaRepository<BleachMixingChangeMachineCleaningF38, Long> {

	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE FORMAT_NO =:format_no", nativeQuery = true)
	List<BleachMixingChangeMachineCleaningF38> findByListOfMixF38FormatDetails(@Param("format_no") String formatNo);

	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE ID =:id", nativeQuery = true)
	List<BleachMixingChangeMachineCleaningF38> getAlldetails(@Param("id") Long formatNo);
	
	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE ID =:id", nativeQuery = true)
	BleachMixingChangeMachineCleaningF38 getMachineCleanF38(@Param("id") Long id);

//	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE HOD_APPROVE_STATUS = WAITING FOR APPROVAL", nativeQuery = true)
//	List<BleachMixingChangeMachineCleaningF38> getHodSummery();

	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE HOD_APPROVE_STATUS = 'WAITING_FOR_APPROVAL' ORDER BY ID DESC", nativeQuery = true)
	List<BleachMixingChangeMachineCleaningF38> getHodSummery();

	
	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE " +
            "(:date IS NULL OR :date = '' OR [DATE] = :date) " +
            "AND (:month IS NULL OR :month = '' OR MONTH(CONVERT(DATE, [DATE], 103)) = :month) " +
            "AND (:year IS NULL OR :year = '' OR YEAR(CONVERT(DATE, [DATE], 103)) = :year)",
    nativeQuery = true)
List<BleachMixingChangeMachineCleaningF38> getDateBaseSummDetailsPrint(@Param("date") String date,
                                                                    @Param("month") String month,
                                                                    @Param("year") String year);	
	
	
//	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' AND SUPERVISOR_SAVED_ID =:supervisor_saved_id", nativeQuery = true)
//	List<BleachMixingChangeMachineCleaningF38> getSupervisorSummeryDetails(
//			@Param("supervisor_saved_id") Long supervisor_saved_id);

	
	
	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' OR HOD_STATUS!= 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachMixingChangeMachineCleaningF38> getSupervisorSummeryDetails();
	
	
//	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE SUPERVISOR_STATUS ='SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED'", nativeQuery = true)
//	List<BleachMixingChangeMachineCleaningF38> getHodSummeryDetails();
//	

//	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE DATE = :date AND SUPERVISOR_STATUS ='SUPERVISOR_SAVED' AND SUPERVISOR_SAVED_ID =:supervisor_saved_id ", nativeQuery = true)
//	List<BleachMixingChangeMachineCleaningF38> getDetailsBaseDate(@Param("date") String date,@Param("supervisor_saved_id") Long supervisor_saved_id);

	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE DATE = :date AND SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' AND SUPERVISOR_SAVED_ID = :supervisorSavedId", nativeQuery = true)
	List<BleachMixingChangeMachineCleaningF38> getDetailsBaseDate(@Param("date") String date,
			@Param("supervisorSavedId") Long supervisorSavedId);


	
//	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE DATE = :date AND (SUPERVISOR_SAVED_ID = :supervisorSavedId OR SUPERVISOR_SUBMIT_ID = :supervisorSavedId) AND BMR_NO_FROM = :bmrFrom AND BMR_NO_TO = :bmrTo", nativeQuery = true)
//	List<BleachMixingChangeMachineCleaningF38> getDetailsbmrFromTo(@Param("date") String date,
//	        @Param("supervisorSavedId") Long supervisorSavedId, @Param("bmrFrom") String bmrFrom,
//	        @Param("bmrTo") String bmrTo);


//	 @Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' AND DATE = :date", nativeQuery = true)
//	 List<BleachMixingChangeMachineCleaningF38> getDateBaseSummDetails(@Param("date") String date);

	// Change
	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE SUPERVISOR_STATUS ='SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachMixingChangeMachineCleaningF38> getHodSummeryDetails();

	// Change
	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE DATE = :date", nativeQuery = true)
	List<BleachMixingChangeMachineCleaningF38> getDateBaseSummDetails(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE DATE = :date AND BMR_NO_FROM = :bmrFrom AND BMR_NO_TO = :bmrTo", nativeQuery = true)
	List<BleachMixingChangeMachineCleaningF38> getDetailsbmrFromTo(@Param("date") String date, @Param("bmrFrom") String bmrFrom,
	        @Param("bmrTo") String bmrTo);
	
	// Approved Records
	
	@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE HOD_STATUS IN ('HOD_APPROVED')", nativeQuery = true)
	List<BleachMixingChangeMachineCleaningF38> getApprovedHODRecords();
	
	// DELETE RECORDS
	
		@Transactional
		@Modifying
		@Query(value = "DELETE FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE ID = :id", nativeQuery = true)
		void deleteMachineCleaningLineById(@Param("id") Long id);
		
		
		// CR 
		
		@Query(value = "SELECT * FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE "
				+ "(:date IS NULL OR :date = '' OR [DATE] = :date) "
				+ "AND (:month IS NULL OR :month = '' OR MONTH(CONVERT(DATE, [DATE], 103)) = :month) "
				+ "AND (:year IS NULL OR :year = '' OR YEAR(CONVERT(DATE, [DATE], 103)) = :year)"
				+ "AND (:fromBmr IS NULL OR :fromBmr = '' OR BMR_NO_FROM = :fromBmr)"
				+ "AND (:toBmr IS NULL OR :toBmr = '' OR BMR_NO_TO = :toBmr)"
				, nativeQuery = true)
		List<BleachMixingChangeMachineCleaningF38> getSummaryF38(@Param("date") String date,
				@Param("month") String month, @Param("year") String year,
				@Param("fromBmr") String fromBmr, @Param("toBmr") String toBmr);
	 
		// FROM BMR
		@Query(value = "SELECT BMR_NO_FROM FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE "
				+ "(:date IS NULL OR :date = '' OR [DATE] = :date) "
				+ "AND (:month IS NULL OR :month = '' OR MONTH(CONVERT(DATE, [DATE], 103)) = :month) "
				+ "AND (:year IS NULL OR :year = '' OR YEAR(CONVERT(DATE, [DATE], 103)) = :year)", nativeQuery = true)
		List<Map<String, Object>> getFromBmr(@Param("date") String date,
				@Param("month") String month, @Param("year") String year);
		// TO BMR
		@Query(value = "SELECT BMR_NO_TO FROM precot.BLEACH_MIXCHANGE_MACHINECLEAN_F38 WHERE "
				+ "(:date IS NULL OR :date = '' OR [DATE] = :date) "
				+ "AND (:month IS NULL OR :month = '' OR MONTH(CONVERT(DATE, [DATE], 103)) = :month) "
				+ "AND (:year IS NULL OR :year = '' OR YEAR(CONVERT(DATE, [DATE], 103)) = :year)", nativeQuery = true)
		List<Map<String, Object>> getToBmr(@Param("date") String date,
				@Param("month") String month, @Param("year") String year);
		
	
}
