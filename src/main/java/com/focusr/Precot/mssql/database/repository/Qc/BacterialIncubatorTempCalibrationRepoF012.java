package com.focusr.Precot.mssql.database.repository.Qc;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.ChemicalAnalysisReportARF003;
import com.focusr.Precot.mssql.database.model.Qc.QcTdsMeterCalibrationReportF008;
import com.focusr.Precot.mssql.database.model.Qc.Qc_BacterialIncubatorTempCalibrationF012;
import com.focusr.Precot.util.Qc.TblsupPayloadChemicalAnalysis;

public interface BacterialIncubatorTempCalibrationRepoF012 extends JpaRepository<Qc_BacterialIncubatorTempCalibrationF012, Long> {

	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE ID = :id ", nativeQuery = true)
	Qc_BacterialIncubatorTempCalibrationF012 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE FORMAT_NO = :formatNo ",nativeQuery = true)
	List<Qc_BacterialIncubatorTempCalibrationF012> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE DATE=:date", nativeQuery = true)
	List<Qc_BacterialIncubatorTempCalibrationF012> findByMaterialByDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND "+
	        "(:eqIdNo IS NULL OR EQ_ID_NO = :eqIdNo)", nativeQuery = true)
	List<Qc_BacterialIncubatorTempCalibrationF012> findByDateMonthYearEqNo(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year,
	    @Param("eqIdNo") String eqIdNo);

	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_SAVED' AND (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' AND MANAGER_STATUS != 'MICRO_DESIGNEE_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<Qc_BacterialIncubatorTempCalibrationF012> findByMicroStatusSavedAndNotApproved();

	
	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE MICROBIOLOGIST_STATUS = 'MICROBIOLOGIST_APPROVED' AND (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' AND MANAGER_STATUS != 'MICRO_DESIGNEE_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<Qc_BacterialIncubatorTempCalibrationF012> findByMicroStatusSubmittedAndHodStatusNotApproved();
	
//	@Query(value = "SELECT * FROM precot.CHEMICAL_ANALYSIS_REPORT_AR_F003 WHERE DATE = :date AND MATERIAL_DOC_NO=:materialDocNo AND (QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<ChemicalAnalysisReportARF003> findByDateF003(@Param("date") String date, @Param("materialDocNo") String materialDocNo);

		
	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND "+
	        "(:eqIdNo IS NULL OR EQ_ID_NO = :eqIdNo)"+
	        "AND MICROBIOLOGIST_STATUS= 'MICROBIOLOGIST_APPROVED' AND (MANAGER_STATUS = 'QC_APPROVED' OR MANAGER_STATUS = 'QA_APPROVED' OR MANAGER_STATUS = 'MICRO_DESIGNEE_APPROVED')", nativeQuery = true)
	List<Qc_BacterialIncubatorTempCalibrationF012> findForPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year,
	    @Param("eqIdNo") String eqIdNo);
	
	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' AND MANAGER_STATUS != 'MICRO_DESIGNEE_APPROVED') OR MANAGER_STATUS IS NULL ORDER BY ID DESC", nativeQuery = true)
	List<Qc_BacterialIncubatorTempCalibrationF012> findAll();
	
	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012 WHERE EQ_ID_NO = :eqIdNo AND DATE BETWEEN :startDate AND :endDate", nativeQuery = true)
	List<Qc_BacterialIncubatorTempCalibrationF012> findEntriesForWeek(@Param("eqIdNo") String eqIdNo, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

	


}
