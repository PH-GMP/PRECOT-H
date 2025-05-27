package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;

@Repository
public interface qcphysicalTestRepohistory extends JpaRepository<PHYSICALANDCHEMICALTESTHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.PHYSICAL_AND_CHEMCAL_TEST_HISTORY WHERE SUB_BATCH_NO=:sub_batch_no", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("sub_batch_no") String sub_batch_no);
	
	@Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST_HISTORY WHERE SUB_BATCH_NO=:sub_batch_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.PHYSICAL_AND_CHEMCAL_TEST_HISTORY WHERE SUB_BATCH_NO=:sub_batch_no)", nativeQuery = true)
	PHYSICALANDCHEMICALTESTHistory fetchLastSubmittedRecordPhNumber(@Param("sub_batch_no") String sub_batch_no);
	
//	@Query(value = "SELECT * FROM precot.[PHYSICAL_AND_CHEMCAL_TEST_HISTORY] WHERE CONVERT(DATE,createdAt) = CONVERT(DATE,:sub_batch_no, 103)", nativeQuery = true)
//	List<PHYSICALANDCHEMICALTESTHistory> audit(@Param("sub_batch_no") String sub_batch_no);
	
//	@Query(value = "SELECT * FROM precot.[PHYSICAL_AND_CHEMCAL_TEST_HISTORY] WHERE (SUB_BATCH_NO = :sub_batch_no OR :sub_batch_no IS NULL) AND (CONVERT(DATE, createdAt, 103) BETWEEN CONVERT(DATE, :startDate, 103) AND CONVERT(DATE, :endDate, 103) OR (:startDate IS NULL AND :endDate IS NULL))", nativeQuery = true)
//	List<PHYSICALANDCHEMICALTESTHistory> audit(@Param("sub_batch_no") String sub_batch_no, @Param("startDate") String startDate, @Param("endDate") String endDate);
	
	
	@Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST_HISTORY " +
            "WHERE (SUB_BATCH_NO = :subBatchNo OR :subBatchNo IS NULL) " +
            "AND (" +
                "(CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
                "AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
                "OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) " +
                "AND :startDate IS NOT NULL AND :endDate IS NULL) " +
                "OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) " +
                "AND :endDate IS NOT NULL AND :startDate IS NULL) " +
                "OR (:startDate IS NULL AND :endDate IS NULL))", 
    nativeQuery = true)
	List<PHYSICALANDCHEMICALTESTHistory> audit( @Param("subBatchNo") String subBatchNo,@Param("startDate") String startDate, @Param("endDate") String endDate);
	
	@Query(value = "SELECT * FROM precot.PHYSICAL_AND_CHEMCAL_TEST_HISTORY " +
		       "WHERE "
		       + "(SUB_BATCH_NO = :subBatchNo OR :subBatchNo IS NULL) " +
		       "AND (" +
		       "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
		       "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
		       "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
		       "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
		       "    OR (:startDate IS NULL AND :endDate IS NULL)" +
		       ")",
		       nativeQuery = true)
		List<PHYSICALANDCHEMICALTESTHistory> getPhysicalAndChemicalTestHistory(
		    @Param("subBatchNo") String subBatchNo,
		    @Param("startDate") String startDate,
		    @Param("endDate") String endDate);


	
	@Query(value = "SELECT * FROM precot.[PHYSICAL_AND_CHEMCAL_TEST_HISTORY] order by TEST_ID desc", nativeQuery = true)
	List<PHYSICALANDCHEMICALTESTHistory> audit();


}
