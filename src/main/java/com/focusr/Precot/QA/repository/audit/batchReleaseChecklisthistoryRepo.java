package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.BatchReleaseNotesHeaderHistory;
import com.focusr.Precot.QA.model.audit.batchReleaseChecklisthistory;
import com.focusr.Precot.mssql.database.model.QcAudit.spectrophotometerReportHistoryClF011;

@Repository
public interface batchReleaseChecklisthistoryRepo extends JpaRepository<batchReleaseChecklisthistory, Long>{

		@Query(value = "SELECT MAX(VERSION) FROM precot.BATCH_RELEASE_CHECKLIST_HISTORY WHERE BMR_NO = :BMR_NO AND DEPARTMENT = :DEPARTMENT", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("BMR_NO") String BMR_NO , @Param("DEPARTMENT") String DEPARTMENT);
	
	@Query(value = "SELECT * FROM precot.BATCH_RELEASE_CHECKLIST_HISTORY WHERE BMR_NO = :BMR_NO AND DEPARTMENT = :DEPARTMENT AND VERSION IN (SELECT MAX(VERSION) FROM precot.BATCH_RELEASE_CHECKLIST_HISTORY WHERE BMR_NO = :BMR_NO AND DEPARTMENT = :DEPARTMENT)", nativeQuery = true)
	batchReleaseChecklisthistory fetchLastSubmittedRecordPhNumber(@Param("BMR_NO") String BMR_NO , @Param("DEPARTMENT") String DEPARTMENT);

//	@Query(value = "SELECT * FROM precot.BATCH_RELEASE_CHECKLIST_HISTORY WHERE "
//			+ " (:department IS NULL OR :department='' OR DEPARTMENT=:department)"
//			+ " (:BMR_NO IS NULL OR :BMR_NO='' OR BMR_NO=:BMR_NO)"
//			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
//	List<batchReleaseChecklisthistory> audit(@Param("from_date") String from_date,
//			@Param("to_date") String to_date,@Param("department") String department,@Param("BMR_NO") String BMR_NO);
	
	@Query(value = "SELECT * FROM precot.BATCH_RELEASE_CHECKLIST_HISTORY WHERE "
	        + "(:department IS NULL OR :department='' OR DEPARTMENT=:department) "
	        + "AND (:BMR_NO IS NULL OR :BMR_NO='' OR BMR_NO=:BMR_NO) "
	        + "AND (:from_date IS NULL OR :from_date='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date)", nativeQuery = true)
	List<batchReleaseChecklisthistory> audit(
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date,
	        @Param("department") String department,
	        @Param("BMR_NO") String BMR_NO);

	

}
