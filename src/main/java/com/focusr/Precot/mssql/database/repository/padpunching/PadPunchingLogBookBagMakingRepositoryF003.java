package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.BagMakingSpecificationDetailsF014;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingBagMakingDailyProductionDetailsF001;
import com.focusr.Precot.mssql.database.model.padpunching.PadPunchingLogBookBagMakingF003;

@Repository
public interface PadPunchingLogBookBagMakingRepositoryF003 extends JpaRepository<PadPunchingLogBookBagMakingF003,Long>{

	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003 WHERE LOGBOOK_ID = :logBookId ", nativeQuery = true)
	PadPunchingLogBookBagMakingF003 findFormById(@Param("logBookId") long logBookId);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003 WHERE DATE = :date AND SHIFT = :shift", nativeQuery = true)
	PadPunchingLogBookBagMakingF003 findByDateShift(@Param("date") String date,@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003 WHERE (:date IS NULL OR :date='' OR DATE=:date) AND (:shift IS NULL OR :shift='' OR SHIFT=:shift)  AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<PadPunchingLogBookBagMakingF003> findByDateShiftPrintApi(@Param("date") String date,@Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY LOGBOOK_ID DESC", nativeQuery = true)
    List<PadPunchingLogBookBagMakingF003> supervisorSummary();
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY LOGBOOK_ID DESC", nativeQuery = true)
    List<PadPunchingLogBookBagMakingF003> operatorSummary();

	@Query(value = "SELECT * FROM precot.PADPUNCHING_LOG_BOOK_BAG_MAKING_F003 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY LOGBOOK_ID DESC", nativeQuery = true)
    List<PadPunchingLogBookBagMakingF003> hodSummary();
}
