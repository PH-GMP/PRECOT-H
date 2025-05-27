package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.non_woven_F005_history;

@Repository
public interface non_woven_F005HistoryRepo extends JpaRepository<non_woven_F005_history, Long> {
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT_HISTORY WHERE BMR_NO=:bmr_no", nativeQuery = true)
	Optional<Integer> getMaximumVersiongetMaximumVersion(@Param("bmr_no")  String bmr_no);

	@Query(value = "SELECT * FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT_HISTORY WHERE BMR_NO=:bmr_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT_HISTORY WHERE BMR_NO=:bmr_no)", nativeQuery = true)
	non_woven_F005_history fetchLastSubmittedRecordPhNumber(@Param("bmr_no")  String bmr_no);
	
//	@Query(value = "SELECT * FROM precot.[NON_WOVEN_FLEECE_ANALYSIS_REPORT_HISTORY] w WHERE (w.BMR_NO = :BMR_NO OR :BMR_NO IS NULL) "
//			+
//			
//    "AND (" +
//    "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
//    "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) " +
//    "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) " +
//    "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) " +
//    "    OR (:startDate IS NULL AND :endDate IS NULL)" 
//			+ ")", nativeQuery = true)
//	List<non_woven_F005_history> audit(@Param("BMR_NO") String BMR_NO, @Param("startDate") String startDate, @Param("endDate") String endDate);

	
	@Query(value = "SELECT * FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT_HISTORY w " +
            "WHERE (w.BMR_NO = :BMR_NO OR :BMR_NO IS NULL) " +
            "AND (:startDate IS NULL OR :endDate IS NULL OR w.DATE BETWEEN :startDate AND :endDate)", 
    nativeQuery = true)
List<non_woven_F005_history> audit(@Param("BMR_NO") String BMR_NO, 
                                @Param("startDate") String startDate, 
                                @Param("endDate") String endDate);


@Query(value = "SELECT * FROM precot.NON_WOVEN_FLEECE_ANALYSIS_REPORT_HISTORY " +
        "WHERE (:startDate IS NULL OR DATE = :startDate) " +
        "AND (BMR_NO = :BMR_NO OR :BMR_NO IS NULL) " +
        "ORDER BY TEST_ID DESC", 
nativeQuery = true)
List<non_woven_F005_history> audit(@Param("BMR_NO") String BMR_NO, 
                            @Param("startDate") String startDate);


}
