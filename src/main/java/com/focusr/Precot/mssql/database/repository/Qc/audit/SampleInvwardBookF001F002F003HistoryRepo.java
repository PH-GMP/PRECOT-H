package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.ChemicalAnalysisReportARF003History;
import com.focusr.Precot.mssql.database.model.QcAudit.SampleInwardBookF001_F002_F003History;

public interface SampleInvwardBookF001F002F003HistoryRepo extends JpaRepository<SampleInwardBookF001_F002_F003History, Long> {

	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F001=:dateF001 AND VERSION IN (SELECT MAX(VERSION) FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F001=:dateF001)", nativeQuery = true)
	SampleInwardBookF001_F002_F003History fetchLastSubmittedRecordDateF001(@Param("dateF001") String dateF001);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F002=:dateF002 AND VERSION IN (SELECT MAX(VERSION) FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F002=:dateF002)", nativeQuery = true)
	SampleInwardBookF001_F002_F003History fetchLastSubmittedRecordDateF002(@Param("dateF002") String dateF002);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F003=:dateF003 AND VERSION IN (SELECT MAX(VERSION) FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F003=:dateF003)", nativeQuery = true)
	SampleInwardBookF001_F002_F003History fetchLastSubmittedRecordDateF003(@Param("dateF003") String dateF003);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F001=:dateF001", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDateF001(@Param("dateF001") String dateF001);

	@Query(value = "SELECT MAX(VERSION) FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F002=:dateF002", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDateF002(@Param("dateF002") String dateF002);

	@Query(value = "SELECT MAX(VERSION) FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F003=:dateF003", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDateF003(@Param("dateF003") String dateF003);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE_F001 BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003History> findByParamsF001(@Param("from_date") String from_date,
			@Param("to_date") String to_date);
	
//	@Query(value = "SELECT sibh.* FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY sibh "
//			+ "JOIN precot.SAMPLE_INWARD_BOOK_DETAIL_HISTORY sibdh ON sibh.ID = sibdh.HISTORY_PARENT_ID "
//			+ "WHERE (:from_date IS NULL OR :to_date IS NULL OR sibh.DATE_F001 BETWEEN :from_date AND :to_date) "
//			+ "AND (:shift IS NULL OR sibdh.SHIFT = :shift)", nativeQuery = true)
//	List<SampleInwardBookF001_F002_F003History> findByParamsF001(
//			@Param("from_date") String from_date,
//			@Param("to_date") String to_date,
//			@Param("shift") Long shift);


	//1
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE_F002 BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003History> findByParamsF002(@Param("from_date") String from_date,
			@Param("to_date") String to_date);

	
//	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE "
//			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE_F003 BETWEEN :from_date AND :to_date) ", nativeQuery = true)
//	List<SampleInwardBookF001_F002_F003History> findByParamsF003(@Param("from_date") String from_date,
//			@Param("to_date") String to_date);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE "
	        + "((:from_date IS NULL AND :to_date IS NULL) OR (DATE_F003 BETWEEN :from_date AND :to_date))", 
	        nativeQuery = true)
	List<SampleInwardBookF001_F002_F003History> findByParamsF003(
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date);


	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F001 IS NOT NULL", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003History> getAllValuesF001();
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F002 IS NOT NULL", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003History> getAllValuesF002();
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F003 IS NOT NULL", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003History> getAllValuesF003();
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F001 = :date ", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003History> findFormByDate01(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F002 = :date ", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003History> findFormByDate02(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003_HISTORY WHERE DATE_F003 = :date ", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003History> findFormByDate03(@Param("date") String date);
	

	
	
}
