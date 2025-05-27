package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF010;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingHouseKeepingCheckListF26;

@Repository
public interface PadPunchingHouseKeepingCheckListF010Repository extends JpaRepository<PadPunchingHouseKeepingCheckListF010, Long>{
	
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE DATE = :date", nativeQuery = true)
	List<PadPunchingHouseKeepingCheckListF010> getDetailsBaseDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY CLEAN_ID DESC", nativeQuery = true)
	List<PadPunchingHouseKeepingCheckListF010> getSupervisorSummeryDetails();

	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND  HOD_STATUS != 'HOD_APPROVED' ORDER BY CLEAN_ID DESC", nativeQuery = true)
	List<PadPunchingHouseKeepingCheckListF010> getHrHodSummeryDetails();
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE MONTH =:month AND YEAR =:year", nativeQuery = true)
	List<PadPunchingHouseKeepingCheckListF010> getMonthandYear(@Param("month") String month, @Param("year") String year);
	
//	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE date IS NULL OR DATE = :date AND (HOD_STATUS = 'HOD_APPROVED')", nativeQuery = true)
//	List<PadPunchingHouseKeepingCheckListF010> printRPProdReport(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE (:month IS NULL OR :month='' OR MONTH=:month) AND (:year IS NULL OR :year='' OR YEAR=:year) AND (HOD_STATUS = 'HOD_APPROVED')", nativeQuery = true)
	List<PadPunchingHouseKeepingCheckListF010> printRPProdReport(@Param("month") String month,@Param("year") String year);
	
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE CLEAN_ID =:id", nativeQuery = true)
	List<PadPunchingHouseKeepingCheckListF010> getMonthandYear( @Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE CLEAN_ID=:id", nativeQuery = true)
	PadPunchingHouseKeepingCheckListF010 getHousekeepingRecordById(@Param("id") Long id);

}
