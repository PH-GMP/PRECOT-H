package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.absorbentbleachedcottonreportCLF005Parenthistory;
import com.focusr.Precot.mssql.database.model.QcAudit.absorbentbleachedcottonreportHistoryCLF005;

@Repository
public interface absorbentbleachedcottonreportCLF005ParenthistoryRepo extends JpaRepository<absorbentbleachedcottonreportCLF005Parenthistory, Long>{
	@Query(value = "SELECT MAX(VERSION) FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT_HISTORY WHERE BMR=:BMR", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("BMR") String BMR);
	
	@Query(value = "SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT_HISTORY WHERE BMR=:BMR AND VERSION IN (SELECT MAX(VERSION) FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT_HISTORY WHERE BMR=:BMR)", nativeQuery = true)
	absorbentbleachedcottonreportCLF005Parenthistory fetchLastSubmittedRecordPhNumber(@Param("BMR") String BMR);
	

	@Query(value = "SELECT * FROM precot.[ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT_HISTORY] WHERE (BMR = :sub_batch_no OR :sub_batch_no IS NULL) "
			
   + "AND (" +
    "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
    "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
    "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
			+ ")", nativeQuery = true)
	List<absorbentbleachedcottonreportCLF005Parenthistory> audit(@Param("sub_batch_no") String sub_batch_no,@Param("startDate") String startDate, @Param("endDate") String endDate);

	@Query(value = "SELECT * FROM precot.[ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_PARENT_HISTORY] order by PA_ID desc", nativeQuery = true)
	List<absorbentbleachedcottonreportCLF005Parenthistory> audit();

}
