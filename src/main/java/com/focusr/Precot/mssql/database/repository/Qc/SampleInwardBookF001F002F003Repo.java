package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.ChemicalAnalysisReportARF003;
import com.focusr.Precot.mssql.database.model.Qc.DistilledWaterAnalysisReportARF012;
import com.focusr.Precot.mssql.database.model.Qc.SampleInwardBookF001_F002_F003;
import com.focusr.Precot.mssql.database.model.Qc.SwabMicrobiologicalAnalysisARF008_009_010;

public interface SampleInwardBookF001F002F003Repo extends JpaRepository<SampleInwardBookF001_F002_F003, Long> {

	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE ID = :id ", nativeQuery = true)
	SampleInwardBookF001_F002_F003 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE FORMAT_NO = :formatNo ORDER BY ID DESC",nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE DATE_F001=:dateF001", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findByDateF001(@Param("dateF001") String dateF001);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE DATE_F002=:dateF002", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findByDateF002(@Param("dateF002") String dateF002);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE DATE_F003=:dateF003", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findByDateF003(@Param("dateF003") String dateF003);

	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE CHEMIST_STATUS ='CHEMIST_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findByChemistStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findByMicroStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE ETP_STATUS ='ETP_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findByEtpStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE (CHEMIST_STATUS = 'CHEMIST_APPROVED' OR MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED' OR ETP_STATUS='ETP_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findByChemistOrMicroStatusSubmittedAndHodStatusNotApproved();	
	
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE " +
	        "(:date IS NULL OR DATE_F001 = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) " +  // Added a space here
	        "AND (CHEMIST_STATUS = 'CHEMIST_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findByDateF001MonthYearForPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE " +
	        "(:date IS NULL OR DATE_F002 = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) " +  // Added a space here
	        "AND (MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findByDateF002MonthYearForPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE " +
	        "(:date IS NULL OR DATE_F003 = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) " +  // Added a space here
	        "AND (ETP_STATUS ='ETP_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findByDateF003MonthYearForPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);

	@Query(value = "SELECT * FROM precot.SAMPLE_INWARD_BOOK_F001_F002_F003 WHERE (CHEMIST_STATUS = 'CHEMIST_SAVED' OR MICROBIOLOGIST_STATUS ='MICROBIOLOGIST_SAVED' OR ETP_STATUS ='ETP_SAVED') ORDER BY ID DESC", nativeQuery = true)
	List<SampleInwardBookF001_F002_F003> findAll();
	
}
