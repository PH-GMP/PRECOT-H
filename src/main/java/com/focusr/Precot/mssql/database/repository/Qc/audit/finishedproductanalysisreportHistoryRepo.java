package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.briquettesanalysisreportHistoryARF014;
import com.focusr.Precot.mssql.database.model.QcAudit.exfoliatingfabricanalysisreportHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.finishedproductanalysisreporthistory;

@Repository
public interface finishedproductanalysisreportHistoryRepo extends JpaRepository<finishedproductanalysisreporthistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006_HISTORY WHERE BMR_NO=:bmr_no", nativeQuery = true)
	Optional<Integer> getMaximumVersiongetMaximumVersion(@Param("bmr_no") String bmr_no);

	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006_HISTORY WHERE BMR_NO=:bmr_no AND SAMPLE_DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006_HISTORY WHERE BMR_NO=:bmr_no)", nativeQuery = true)
	finishedproductanalysisreporthistory fetchLastSubmittedRecordPhNumber(@Param("bmr_no") String bmr_no,@Param ("date") String date);
	
//	@Query(value = "SELECT * FROM precot.[FINISHED_PRODUCT_ANALYSIS_REPORT_F006_HISTORY] WHERE (BMR_NO = :sub_batch_no OR :sub_batch_no IS NULL) "
//			
//   + "AND (" +
//    "    (CAST(createdAt AS TESTED_ON) BETWEEN CAST(:startTESTED_ON AS TESTED_ON) AND CAST(:endTESTED_ON AS TESTED_ON) " +
//    "    AND :startTESTED_ON IS NOT NULL AND :endTESTED_ON IS NOT NULL) " +
//    "    OR (CAST(createdAt AS TESTED_ON) >= CAST(:startTESTED_ON AS TESTED_ON) AND :startTESTED_ON IS NOT NULL AND :endTESTED_ON IS NULL) " +
//    "    OR (CAST(createdAt AS TESTED_ON) <= CAST(:endTESTED_ON AS TESTED_ON) AND :endTESTED_ON IS NOT NULL AND :startTESTED_ON IS NULL) " +
//    "    OR (:startTESTED_ON IS NULL AND :endTESTED_ON IS NULL)" 
//			+ ")", nativeQuery = true)
//	List<finishedproductanalysisreporthistory> audit(@Param("sub_batch_no") String sub_batch_no, @Param("startTESTED_ON") String startTESTED_ON, @Param("endTESTED_ON") String endTESTED_ON);

	@Query(value = "SELECT * FROM precot.[FINISHED_PRODUCT_ANALYSIS_REPORT_F006_HISTORY] order by TEST_ID desc", nativeQuery = true)
	List<finishedproductanalysisreporthistory> audit();
	
	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006_HISTORY WHERE "
			+ "(BMR_NO = :BMR_NO OR :BMR_NO IS NULL) "
			+ "AND (:from_TESTED_ON IS NULL OR :to_TESTED_ON IS NULL OR (TESTED_ON BETWEEN :from_TESTED_ON AND :to_TESTED_ON)) "
	
            + "", nativeQuery = true)
List<finishedproductanalysisreporthistory> audit( @Param("BMR_NO") String BMR_NO ,@Param("from_TESTED_ON") String from_TESTED_ON,
			@Param("to_TESTED_ON") String to_TESTED_ON);


	
	@Query(value = "SELECT * FROM precot.FINISHED_PRODUCT_ANALYSIS_REPORT_F006_HISTORY WHERE TESTED_ON = :TESTED_ON AND (BMR_NO = :BMR_NO OR :BMR_NO IS NULL)", nativeQuery = true)
	List<finishedproductanalysisreporthistory> audit(@Param("TESTED_ON") String TESTED_ON , @Param("BMR_NO") String BMR_NO);
	 

}
