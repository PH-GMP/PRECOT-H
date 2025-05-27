package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.absorbentbleachedcottonreportHistoryCLF005;

@Repository
public interface absorbentbleachedcottonreportHistoryCLF005Repo extends JpaRepository<absorbentbleachedcottonreportHistoryCLF005, Long>{
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_HISTORY WHERE BMR=:BMR", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("BMR") String BMR);
	
	@Query(value = "SELECT * FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_HISTORY WHERE BMR=:BMR AND VERSION IN (SELECT MAX(VERSION) FROM precot.ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_HISTORY WHERE BMR=:BMR)", nativeQuery = true)
	absorbentbleachedcottonreportHistoryCLF005 fetchLastSubmittedRecordPhNumber(@Param("BMR") String BMR);
	

	@Query(value = "SELECT * FROM precot.[ABSORBENT_BLEACHED_COTTON_REPORT_CLF005_HISTORY] WHERE (BMR = :sub_batch_no OR :sub_batch_no IS NULL) AND (REGULAR_TRIAL_BATCH = :regular_trial_batch OR :regular_trial_batch IS NULL) AND (CONVERT(DATE, createdAt, 103) BETWEEN CONVERT(DATE, :startDate, 103) AND CONVERT(DATE, :endDate, 103) OR (:startDate IS NULL AND :endDate IS NULL))", nativeQuery = true)
	List<absorbentbleachedcottonreportHistoryCLF005> audit(@Param("sub_batch_no") String sub_batch_no, @Param("regular_trial_batch") String regular_trial_batch,@Param("startDate") String startDate, @Param("endDate") String endDate);



}
