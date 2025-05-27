package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.DistilledWaterAnalysisReportARF012;
import com.focusr.Precot.mssql.database.model.Qc.QcTdsMeterCalibrationReportF008;

public interface TdsMeterCalibrationReportF008Repo extends JpaRepository<QcTdsMeterCalibrationReportF008, Long> {

	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE ID = :id ", nativeQuery = true)
	QcTdsMeterCalibrationReportF008 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<QcTdsMeterCalibrationReportF008> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
//	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE DATE=:date ", nativeQuery = true)
//	List<QcTdsMeterCalibrationReportF008> findByDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year)", nativeQuery = true)
	List<QcTdsMeterCalibrationReportF008> findByDateMonthYear(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);

	
//	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE CHEMIST_STATUS ='CHEMIST_SAVED' OR (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<QcTdsMeterCalibrationReportF008> findByChemistStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE (CHEMIST_STATUS ='CHEMIST_SAVED' OR (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND QC_STATUS != 'CHEMIST_DESIGNEE_APPROVED')) ORDER BY ID DESC", nativeQuery = true)
	List<QcTdsMeterCalibrationReportF008> findByChemistStatusSavedAndNotApproved();

	
	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE  CHEMIST_STATUS = 'CHEMIST_APPROVED' AND (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND QC_STATUS != 'CHEMIST_DESIGNEE_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<QcTdsMeterCalibrationReportF008> findByChemistStatusSubmittedAndHodStatusNotApproved();	
	
//	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE DATE=:date AND CHEMIST_STATUS= 'CHEMIST_APPROVED' AND QC_STATUS = 'QC_APPROVED'", nativeQuery = true)
//	List<QcTdsMeterCalibrationReportF008> getForReportPrint(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND "+
	        "CHEMIST_STATUS= 'CHEMIST_APPROVED' AND (QC_STATUS = 'QC_APPROVED' OR QC_STATUS = 'QA_APPROVED' OR QC_STATUS = 'CHEMIST_DESIGNEE_APPROVED')", nativeQuery = true)
	List<QcTdsMeterCalibrationReportF008> getForReportPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year);
	
	
	
	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED' AND QC_STATUS != 'CHEMIST_DESIGNEE_APPROVED') OR QC_STATUS IS NULL ORDER BY ID DESC", nativeQuery = true)
	List<QcTdsMeterCalibrationReportF008> findAll();

}
