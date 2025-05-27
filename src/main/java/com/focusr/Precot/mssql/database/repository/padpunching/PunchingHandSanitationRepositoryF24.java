package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;
import com.focusr.Precot.mssql.database.model.padpunching.PunchingHandSanitationF24;

@Repository
public interface PunchingHandSanitationRepositoryF24 extends JpaRepository<PunchingHandSanitationF24, Long>{

	@Query(value = "SELECT * FROM precot.PUNCHING_HAND_SANITIZATION_AB_PRESS_F24 WHERE HAND_SANITIZATION_ID=:id", nativeQuery = true)
	PunchingHandSanitationF24 fetchHandSanitizationABPressF41ById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.PUNCHING_HAND_SANITIZATION_AB_PRESS_F24 WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	PunchingHandSanitationF24 handSanitationDetailsByDate(@Param("date") String date, @Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.PUNCHING_HAND_SANITIZATION_AB_PRESS_F24 WHERE SUPERVISOR_STATUS='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY HAND_SANITIZATION_ID DESC", nativeQuery = true)
	List<PunchingHandSanitationF24> getPunchingSupervisorSummary();
	
	@Query(value = "SELECT * FROM precot.PUNCHING_HAND_SANITIZATION_AB_PRESS_F24 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY HAND_SANITIZATION_ID DESC", nativeQuery = true)
	List<PunchingHandSanitationF24> getPunchingHodSummary();
	
	
	@Query(value = "SELECT * FROM precot.PUNCHING_HAND_SANITIZATION_AB_PRESS_F24 WHERE (:date IS NULL OR :date='' OR DATE=:date) AND (:shift IS NULL OR :shift='' OR SHIFT=:shift) AND HOD_STATUS='HOD_APPROVED'", nativeQuery = true)
	List<PunchingHandSanitationF24> getHandSanitationPrint(@Param("date") String date,@Param("shift") String shift);

	
	// FOR DISTINCT ID NUMBER
	
	@Query(value = "SELECT DISTINCT ID_NUMBER FROM precot.PUNCHING_SANITIZATION_LIST_F24", nativeQuery = true)
	List<String> fetchBleachingIdNumbers();
	
	// FOR DISTINCT NAME
	@Query(value = "SELECT DISTINCT NAME FROM precot.PUNCHING_SANITIZATION_LIST_F24", nativeQuery = true)
	List<String> fetchName();
	
}

