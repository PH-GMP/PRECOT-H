package com.focusr.Precot.mssql.database.repository.Qc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.Qc.QcPhMeterCalibrationReportF006;
import com.focusr.Precot.mssql.database.model.Qc.QcTdsMeterCalibrationReportF008;

public interface PhMeterCalibrationReportF006Repo extends JpaRepository<QcPhMeterCalibrationReportF006, Long> {

	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006 WHERE ID = :id ", nativeQuery = true)
	QcPhMeterCalibrationReportF006 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<QcPhMeterCalibrationReportF006> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
//	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE DATE=:date ", nativeQuery = true)
//	List<QcTdsMeterCalibrationReportF008> findByDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND "+
	        "(:eqIdNo IS NULL OR EQ_ID_NO = :eqIdNo)", nativeQuery = true)
	List<QcPhMeterCalibrationReportF006> findByDateMonthYear(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year,
	    @Param("eqIdNo") String eqIdNo);

	
//	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE CHEMIST_STATUS ='CHEMIST_SAVED' OR (QC_STATUS != 'QC_APPROVED' AND QC_STATUS != 'QA_APPROVED') ORDER BY ID DESC", nativeQuery = true)
//	List<QcTdsMeterCalibrationReportF008> findByChemistStatusSavedAndNotApproved();
	
	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006 WHERE (CHEMIST_STATUS ='CHEMIST_SAVED' OR (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' AND MANAGER_STATUS != 'CHEMIST_DESIGNEE_APPROVED')) ORDER BY ID DESC", nativeQuery = true)
	List<QcPhMeterCalibrationReportF006> findByChemistStatusSavedAndNotApproved();

	
	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006 WHERE  CHEMIST_STATUS = 'CHEMIST_APPROVED' AND (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' AND MANAGER_STATUS != 'CHEMIST_DESIGNEE_APPROVED') ORDER BY ID DESC", nativeQuery = true)
	List<QcPhMeterCalibrationReportF006> findByChemistStatusSubmittedAndHodStatusNotApproved();	
	
//	@Query(value = "SELECT * FROM precot.QC_TDSMETER_CALIBRATION_REPORTF008 WHERE DATE=:date AND CHEMIST_STATUS= 'CHEMIST_APPROVED' AND QC_STATUS = 'QC_APPROVED'", nativeQuery = true)
//	List<QcTdsMeterCalibrationReportF008> getForReportPrint(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:month IS NULL OR MONTH = :month) AND " +
	        "(:year IS NULL OR YEAR = :year) AND "+
	        "(:eqIdNo IS NULL OR EQ_ID_NO = :eqIdNo) AND "+
	        "CHEMIST_STATUS= 'CHEMIST_APPROVED' AND (MANAGER_STATUS = 'QC_APPROVED' OR MANAGER_STATUS = 'QA_APPROVED' OR MANAGER_STATUS = 'CHEMIST_DESIGNEE_APPROVED')", nativeQuery = true)
	List<QcPhMeterCalibrationReportF006> getForReportPrint(
	    @Param("date") String date,
	    @Param("month") String month,
	    @Param("year") String year,
	    @Param("eqIdNo") String eqIdNo);
	
	
	
	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006 WHERE (MANAGER_STATUS != 'QC_APPROVED' AND MANAGER_STATUS != 'QA_APPROVED' AND MANAGER_STATUS != 'CHEMIST_DESIGNEE_APPROVED') OR MANAGER_STATUS IS NULL ORDER BY ID DESC", nativeQuery = true)
	List<QcPhMeterCalibrationReportF006> findAll();

}
