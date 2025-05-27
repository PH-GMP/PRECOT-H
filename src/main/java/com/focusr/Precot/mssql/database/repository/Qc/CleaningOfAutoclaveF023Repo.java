package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.Qc_CleaningOfAutoclavesF023;

public interface CleaningOfAutoclaveF023Repo extends JpaRepository<Qc_CleaningOfAutoclavesF023, Long> {

	@Query(value = "SELECT * FROM precot.QC_CLEANING_OF_AUTOCLAVESF023 WHERE ID = :id ", nativeQuery = true)
	Qc_CleaningOfAutoclavesF023 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_CLEANING_OF_AUTOCLAVESF023 WHERE FORMAT_NO = :formatNo ",nativeQuery = true)
	List<Qc_CleaningOfAutoclavesF023> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.QC_CLEANING_OF_AUTOCLAVESF023 WHERE DATE=:date", nativeQuery = true)
	List<Qc_CleaningOfAutoclavesF023> findByBrakageDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_CLEANING_OF_AUTOCLAVESF023 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year)", nativeQuery = true)
	List<Qc_CleaningOfAutoclavesF023> findByDateMonthYear(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);

	@Query(value = "SELECT * FROM precot.QC_CLEANING_OF_AUTOCLAVESF023 WHERE MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<Qc_CleaningOfAutoclavesF023> findByMicroStatusSavedAndNotApproved();
	
//	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE DATE = :date AND MATERIAL_DOC_NO=:materialDocNo AND (QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<ChemicalAnalysisReportARF003> findByDateF003(@Param("date") String date, @Param("materialDocNo") String materialDocNo);

		
	@Query(value = "SELECT * FROM precot.QC_CLEANING_OF_AUTOCLAVESF023 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND " +
	        "(:week IS NULL OR WEEK = :week) AND " +
	        "(MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED')", 
	        nativeQuery = true)
	List<Qc_CleaningOfAutoclavesF023> findForPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year,
	    @Param("week") String week);

	
	@Query(value = "SELECT * FROM precot.QC_CLEANING_OF_AUTOCLAVESF023 WHERE MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<Qc_CleaningOfAutoclavesF023> findAll();
	

}
