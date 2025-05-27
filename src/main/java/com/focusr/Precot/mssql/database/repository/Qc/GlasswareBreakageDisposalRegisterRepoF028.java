package com.focusr.Precot.mssql.database.repository.Qc;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.Qc_BacterialIncubatorTempCalibrationF012;
import com.focusr.Precot.mssql.database.model.Qc.Qc_GlasswareBreakageDisposalRegisterF028;
import com.focusr.Precot.util.Qc.TblsupPayloadChemicalAnalysis;

public interface GlasswareBreakageDisposalRegisterRepoF028 extends JpaRepository<Qc_GlasswareBreakageDisposalRegisterF028, Long> {

	@Query(value = "SELECT * FROM precot.QC_GLASSWARES_BREAKAGE_DISPOSAL_REGISTER_F028 WHERE ID = :id ", nativeQuery = true)
	Qc_GlasswareBreakageDisposalRegisterF028 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_GLASSWARES_BREAKAGE_DISPOSAL_REGISTER_F028 WHERE FORMAT_NO = :formatNo ",nativeQuery = true)
	List<Qc_GlasswareBreakageDisposalRegisterF028> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.QC_GLASSWARES_BREAKAGE_DISPOSAL_REGISTER_F028 WHERE BRAKAGE_DATE=:date", nativeQuery = true)
	List<Qc_GlasswareBreakageDisposalRegisterF028> findByBrakageDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_GLASSWARES_BREAKAGE_DISPOSAL_REGISTER_F028 WHERE " +
	        "(:date IS NULL OR BRAKAGE_DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND)", nativeQuery = true)
	List<Qc_GlasswareBreakageDisposalRegisterF028> findByDateMonthYear(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);

	@Query(value = "SELECT * FROM precot.QC_GLASSWARES_BREAKAGE_DISPOSAL_REGISTER_F028 WHERE MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<Qc_GlasswareBreakageDisposalRegisterF028> findByMicroStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.QC_GLASSWARES_BREAKAGE_DISPOSAL_REGISTER_F028 WHERE CHEMIST_STATUS = 'CHEMIST_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<Qc_GlasswareBreakageDisposalRegisterF028> findByChmistStatusSavedAndNotApproved();
	
//	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE DATE = :date AND MATERIAL_DOC_NO=:materialDocNo AND (QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<ChemicalAnalysisReportARF003> findByDateF003(@Param("date") String date, @Param("materialDocNo") String materialDocNo);

		
	@Query(value = "SELECT * FROM precot.QC_GLASSWARES_BREAKAGE_DISPOSAL_REGISTER_F028 WHERE " +
	        "(:date IS NULL OR BRAKAGE_DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND " +
	        "(MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' OR CHEMIST_STATUS = 'CHEMIST_APPROVED')", 
	        nativeQuery = true)
	List<Qc_GlasswareBreakageDisposalRegisterF028> findForPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);

	
	@Query(value = "SELECT * FROM precot.QC_GLASSWARES_BREAKAGE_DISPOSAL_REGISTER_F028 WHERE (CHEMIST_STATUS != 'CHEMIST_APPROVED' AND MICROBIOLOGIST_STATUS != 'MICROBIOLOGIST_APPROVED') OR MANAGER_STATUS IS NULL ORDER BY ID DESC", nativeQuery = true)
	List<Qc_GlasswareBreakageDisposalRegisterF028> findAll();
	
	


}
