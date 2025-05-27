package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.BagMakingSpecificationDetailsF014;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingBagMakingDailyProductionDetailsF001;
import com.focusr.Precot.mssql.database.model.splunance.SpunlaceHandSanitizationReportF025;

@Repository
public interface PadPunchingBagMakingDailyProductionDetailsRepositoryF001 extends JpaRepository<PadPunchingBagMakingDailyProductionDetailsF001,Long>{

	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAGMAKING_DAILYPRODUCTION_DETAILS_F001 WHERE BAG_MAKING_ID = :bagmakingId ", nativeQuery = true)
	PadPunchingBagMakingDailyProductionDetailsF001 findFormById(@Param("bagmakingId") long bagmakingId);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAGMAKING_DAILYPRODUCTION_DETAILS_F001 WHERE DATE = :date AND SHIFT = :shift", nativeQuery = true)
	PadPunchingBagMakingDailyProductionDetailsF001 findByDateShift(@Param("date") String date,@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAGMAKING_DAILYPRODUCTION_DETAILS_F001 WHERE (:date IS NULL OR :date='' OR DATE=:date) AND (:shift IS NULL OR :shift='' OR SHIFT=:shift)  AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<PadPunchingBagMakingDailyProductionDetailsF001> findByDateShiftPrintApi(@Param("date") String date,@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAGMAKING_DAILYPRODUCTION_DETAILS_F001 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY BAG_MAKING_ID DESC", nativeQuery = true)
    List<PadPunchingBagMakingDailyProductionDetailsF001> operatorSummary();

	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAGMAKING_DAILYPRODUCTION_DETAILS_F001 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY BAG_MAKING_ID DESC", nativeQuery = true)
    List<PadPunchingBagMakingDailyProductionDetailsF001> hodSummary();
}
