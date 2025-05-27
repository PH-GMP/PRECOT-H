package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.Qc.CoaMoistureF26G;
import com.focusr.Precot.mssql.database.model.Qc.StandarizationOfChemicalReportF016;

@Repository
public interface StandarizationOfChemicalReportF016Repo
		extends JpaRepository<StandarizationOfChemicalReportF016, Long> {
	
//	DATE, SHIFT, NAME_OF_SOLUTION
//	DATE=:date AND SHIFT =:shift AND NAME_OF_SOLUTION = :chemical
	
	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016 WHERE ID =:id ", nativeQuery = true)
	StandarizationOfChemicalReportF016 findFormById(@Param("id") long id);

//	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016 WHERE DATE=:date AND SHIFT =:shift AND NAME_OF_SOLUTION = :chemical", nativeQuery = true)
//	List<StandarizationOfChemicalReportF016> GetAbCottonF26(@Param("date") String date, @Param("shift") String shift, @Param("chemical") String chemical);

	
	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016 WHERE DATE=:date AND SHIFT =:shift AND TO_BE_NAME_OF_SOLUTION = :chemical", nativeQuery = true)
	List<StandarizationOfChemicalReportF016> GetAbCottonF26(@Param("date") String date, @Param("shift") String shift, @Param("chemical") String chemical);
	
	
	// PRINT
	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016 WHERE DATE=:date AND SHIFT =:shift AND NAME_OF_SOLUTION = :chemical AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<StandarizationOfChemicalReportF016> PrintApiF26(@Param("date") String date, @Param("shift") String shift, @Param("chemical") String chemical);
	
	
//	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016 " +
//			 "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +
//	         "AND (:shift IS NULL OR :shift='' OR SHIFT = :shift) " +
//			 "AND (chemical IS NULL OR :chemical OR NAME_OF_SOLUTION = : chemical" +
//			 "AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
//	List<StandarizationOfChemicalReportF016> PrintApiF016(@Param("date") String date, @Param("shift") String shift, @Param("chemical") String chemical);
	
//	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016 " +
//			 "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +
//	         "AND (:shift IS NULL OR :shift='' OR SHIFT = :shift) " +
//			 "AND (:chemical IS NULL OR :chemical='' OR NAME_OF_SOLUTION = :chemical) " +
//			 "AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
//	List<StandarizationOfChemicalReportF016> PrintApiF016(@Param("date") String date, @Param("shift") String shift, @Param("chemical") String chemical);

	
	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016 " +
			 "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +
			 "AND (:shift IS NULL OR :shift='' OR SHIFT = :shift) " +
			 "AND (:chemical IS NULL OR :chemical='' OR TO_BE_NAME_OF_SOLUTION = :chemical) " +
			 "AND MANAGER_STATUS IN ('QC_APPROVED', 'QA_APPROVED')", nativeQuery = true)
	List<StandarizationOfChemicalReportF016> PrintApiF016(@Param("date") String date, @Param("shift") String shift, @Param("chemical") String chemical);
	
	
	// CHEMIST SUMMARY
	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016 WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' OR MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<StandarizationOfChemicalReportF016> chemistSummary();

	// MANAGER SUMMARY
	@Query(value = "SELECT * FROM precot.STANDARIZATION_OF_CHEMICAL_REPORT_F016 WHERE CHEMIST_STATUS = 'CHEMIST_APPROVED' AND MANAGER_STATUS NOT IN ('QC_APPROVED', 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<StandarizationOfChemicalReportF016> exeManagerSummary();

}
