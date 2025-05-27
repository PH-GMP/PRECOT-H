package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.QcAudit.StandarizationOfChemicalReportF016History;

@Repository
public interface StandarizationOfChemicalReportF016HistoryRepo
		extends JpaRepository<StandarizationOfChemicalReportF016History, Long> {

//	DATE=:date AND SHIFT =:shift AND NAME_OF_SOLUTION = :chemical
//			DATE, SHIFT, NAME_OF_SOLUTION

//	@Query(value = "SELECT MAX(VERSION) FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016_HISTORY WHERE DATE=:date1 AND SHIFT =:shift AND NAME_OF_SOLUTION = :chemical", nativeQuery = true)
//	Optional<Integer> getMaximumVersion(@Param("date1") String date1, @Param("shift") String shift,
//			@Param("chemical") String chemical);

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016_HISTORY WHERE DATE=:date1 AND SHIFT =:shift AND TO_BE_NAME_OF_SOLUTION = :chemical", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date1") String date1, @Param("shift") String shift,
			@Param("chemical") String chemical);
	
//	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016_HISTORY WHERE DATE=:date1 AND SHIFT =:shift AND NAME_OF_SOLUTION = :chemical AND VERSION IN (SELECT MAX(VERSION) FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016_HISTORY WHERE DATE=:date1 AND SHIFT =:shift AND NAME_OF_SOLUTION = :chemical)", nativeQuery = true)
//	StandarizationOfChemicalReportF016History fetchLastSubmittedRecord(@Param("date1") String date1,
//			@Param("shift") String shift, @Param("chemical") String chemical);
	
	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016_HISTORY WHERE DATE=:date1 AND SHIFT =:shift AND TO_BE_NAME_OF_SOLUTION = :chemical AND VERSION IN (SELECT MAX(VERSION) FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016_HISTORY WHERE DATE=:date1 AND SHIFT =:shift AND TO_BE_NAME_OF_SOLUTION = :chemical)", nativeQuery = true)
	StandarizationOfChemicalReportF016History fetchLastSubmittedRecord(@Param("date1") String date1,
			@Param("shift") String shift, @Param("chemical") String chemical);

	// AUDIT

	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)"
			+ "AND (:shift IS NULL OR SHIFT = :shift)"
			+ "AND (:chemical IS NULL OR NAME_OF_SOLUTION = :chemical)", nativeQuery = true)
	List<StandarizationOfChemicalReportF016History> findByParamsF016(@Param("from_date") String from_date,
			@Param("to_date") String to_date, @Param("shift") String shift, @Param("chemical") String chemical);

}
