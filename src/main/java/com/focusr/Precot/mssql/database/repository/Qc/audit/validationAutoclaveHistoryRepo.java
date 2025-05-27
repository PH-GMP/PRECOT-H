package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.validationAutoclave;
import com.focusr.Precot.mssql.database.model.QcAudit.PHYSICALANDCHEMICALTESTHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.validationAutoclaveHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.temperatureRelativeHistoryF018;
import com.focusr.Precot.mssql.database.model.QcAudit.validationAutoclaveHistory;



@Repository
public interface validationAutoclaveHistoryRepo extends JpaRepository<validationAutoclaveHistory, Long>{
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014_HISTORY WHERE MONTH=:month AND YEAR = :year AND DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("month") String month,@Param("year") String year , @Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014_HISTORY WHERE MONTH=:month AND YEAR = :year AND DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014_HISTORY WHERE MONTH=:month AND YEAR = :year AND DATE=:date)", nativeQuery = true)
	validationAutoclaveHistory fetchLastSubmittedRecordPhNumber(@Param("month") String month,@Param("year") String year ,@Param("date") String date);

//	@Query(value = "SELECT * FROM precot.[VALIDATION_FOR_AUTOCLAVE_CLF014_HISTORY] WHERE "
//	        + "(EQ_ID = :eq_id OR :eq_id IS NULL) "
//	        + "AND (YEAR = :year OR :year IS NULL) "
//	        + "AND (MONTH = :month OR :month IS NULL) "
//	        + "AND ("
//	        + "    (CAST(createdAt AS DATE) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) "
//	        + "    AND :startDate IS NOT NULL AND :endDate IS NOT NULL) "
//	        + "    OR (CAST(createdAt AS DATE) >= CAST(:startDate AS DATE) AND :startDate IS NOT NULL AND :endDate IS NULL) "
//	        + "    OR (CAST(createdAt AS DATE) <= CAST(:endDate AS DATE) AND :endDate IS NOT NULL AND :startDate IS NULL) "
//	        + "    OR (:startDate IS NULL AND :endDate IS NULL)"
//	        + ")", nativeQuery = true)
//	List<validationAutoclaveHistory> audit(
//	    @Param("eq_id") String eq_id,
//	    @Param("year") String year,
//	    @Param("month") String month,
//	    @Param("startDate") String startDate,
//	    @Param("endDate") String endDate);
	
//	@Query(value = "SELECT * FROM precot.[VALIDATION_FOR_AUTOCLAVE_CLF014_HISTORY] WHERE "
//	        + "(EQ_ID = :eq_id OR :eq_id IS NULL) "
//	        + "AND (YEAR = :year OR :year IS NULL) "
//	        + "AND (MONTH = :month OR :month IS NULL) "
//	        + "AND ("
//	        + "    (:startDate IS NOT NULL AND :endDate IS NOT NULL AND Date BETWEEN :startDate AND :endDate) "
//	        + "    OR (:startDate IS NOT NULL AND :endDate IS NULL AND Date >= :startDate) "
//	        + "    OR (:endDate IS NOT NULL AND :startDate IS NULL AND Date <= :endDate) "
//	        + "    OR (:startDate IS NULL AND :endDate IS NULL)"
//	        + ")", nativeQuery = true)
//	List<validationAutoclaveHistory> audit(
//	        @Param("eq_id") String eq_id,
//	        @Param("year") String year,
//	        @Param("month") String month,
//	        @Param("startDate") String startDate,
//	        @Param("endDate") String endDate
//	);

	
	@Query(value = "SELECT * FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014_HISTORY WHERE "
			+ "(EQ_ID = :eq_id OR :eq_id IS NULL) "
			+ "AND (:from_date IS NULL OR :to_date IS NULL OR (DATE BETWEEN :from_date AND :to_date)) "
			+ "AND (YEAR = :year OR :year IS NULL) "
            + "AND (MONTH = :month OR :month IS NULL)", nativeQuery = true)
List<validationAutoclaveHistory> audit( @Param("eq_id") String eq_id, @Param("from_date") String from_date,
			@Param("to_date") String to_date, @Param("month") String month, @Param("year") String year);


	
	@Query(value = "SELECT * FROM precot.VALIDATION_FOR_AUTOCLAVE_CLF014_HISTORY WHERE DATE = :date AND (EQ_ID = :eq_id OR :eq_id IS NULL)", nativeQuery = true)
	List<validationAutoclaveHistory> audit(@Param("date") String date,@Param("eq_id") String eq_id);


	
	@Query(value = "SELECT * FROM precot.[VALIDATION_FOR_AUTOCLAVE_CLF014_HISTORY] order by TEST_ID desc", nativeQuery = true)
	List<validationAutoclaveHistory> audit();

}
