package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaOnlineInspectionList;
import com.focusr.Precot.QA.model.audit.QaOnlineInspectionReportHistory;
import com.focusr.Precot.QA.model.audit.QaRodentBoxCheckListHistory;

@Repository
public interface QaOnlineInspectionReportHistoryRepository extends JpaRepository<QaOnlineInspectionReportHistory, Long> {

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_ONLINE_INSPECTION_REPORT_HISTORY_F034 WHERE DATE =:date AND SHIFT =:shift AND MACHINE_NO=:machineNo AND BMR_NO=:bmrNo AND PORDER=:pOrder", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("shift") String shift,@Param("machineNo") String machineNo,@Param("pOrder") String pOrder,@Param("bmrNo") String bmrNo);
		
	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_HISTORY_F034 WHERE DATE =:date AND SHIFT =:shift AND MACHINE_NO=:machineNo AND BMR_NO=:bmrNo AND PORDER=:pOrder AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_ONLINE_INSPECTION_REPORT_HISTORY_F034 WHERE DATE =:date AND SHIFT =:shift AND MACHINE_NO=:machineNo AND BMR_NO=:bmrNo AND PORDER=:pOrder)", nativeQuery = true)
	QaOnlineInspectionReportHistory fetchLastSubmittedRecord(@Param("date") String date, @Param("shift") String shift,@Param("machineNo") String machineNo,@Param("pOrder") String pOrder,@Param("bmrNo") String bmrNo);

	
//	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_HISTORY_F034 WHERE "
//	        + "(:date IS NULL OR DATE = :date) "
//	        + "AND (:shift IS NULL OR SHIFT = :shift) "
//	        + "AND (:machineNo IS NULL OR MACHINE_NO = :machineNo) "
//	        + "AND (:bmrNo IS NULL OR BMR_NO = :bmrNo) "
//	        + "AND (:pOrder IS NULL OR PORDER = :pOrder) "
//	        + "AND (:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)", 
//	        nativeQuery = true)
//	List<QaOnlineInspectionReportHistory> excelReport(
//	        @Param("date") String date,
//	        @Param("shift") String shift,
//	        @Param("machineNo") String machineNo,
//	        @Param("bmrNo") String bmrNo,
//	        @Param("pOrder") String pOrder,
//	        @Param("from_date") String from_date,
//	        @Param("to_date") String to_date);
	@Query(value = "SELECT * FROM precot.QA_ONLINE_INSPECTION_REPORT_HISTORY_F034 WHERE "
	        + " (:shift IS NULL OR :shift='' OR SHIFT = :shift) "
	        + "AND (:machineNo IS NULL OR :machineNo='' OR MACHINE_NO = :machineNo) "
	        + "AND (:bmrNo IS NULL OR :bmrNo='' OR BMR_NO = :bmrNo) "
	        + "AND (:pOrder IS NULL OR :pOrder='' OR PORDER = :pOrder) "
	        + "AND FORMAT_NO = :formatNo "
	        + " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ",
	        nativeQuery = true)
	List<QaOnlineInspectionReportHistory> excelReport(
	        @Param("shift") String shift,
	        @Param("machineNo") String machineNo,
	        @Param("bmrNo") String bmrNo,
	        @Param("pOrder") String pOrder,
	        @Param("formatNo") String formatNo,
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date);

}
