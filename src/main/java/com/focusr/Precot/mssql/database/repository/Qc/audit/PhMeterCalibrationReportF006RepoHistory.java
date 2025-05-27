package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.QcPhMeterCalibrationReportF006History;
import com.focusr.Precot.mssql.database.model.QcAudit.QcTdsMeterCalibrationReportF008History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_ValidationForAutoclaveByChemicalIndicatorF014History;

public interface PhMeterCalibrationReportF006RepoHistory extends JpaRepository<QcPhMeterCalibrationReportF006History, Long> {

	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006_HISTORY WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.QC_PHMETER_CALIBRATION_REPORTF006_HISTORY WHERE DATE=:date)", nativeQuery = true)
	QcPhMeterCalibrationReportF006History fetchLastSubmittedRecordDate(@Param("date") String date);
		
	@Query(value = "SELECT MAX(VERSION) FROM precot.QC_PHMETER_CALIBRATION_REPORTF006_HISTORY WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersionOfDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:eqIdNo IS NULL OR EQ_ID_NO = :eqIdNo) "
			+ "AND (:month IS NULL OR MONTH = :month) "
			+ "AND (:year IS NULL OR YEAR = :year) ", nativeQuery = true)
	List<QcPhMeterCalibrationReportF006History> findByParamsF006(
			@Param("from_date") String from_date,
			@Param("to_date") String to_date,
			@Param("eqIdNo") String eqIdNo,
			@Param("month") String month,
			@Param("year") String year);
	
//	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006_HISTORY WHERE DATE = :date ", nativeQuery = true)
//	List<QcPhMeterCalibrationReportF006History> findFormByDate(@Param("date") String date);
	
	@Query(value = "SELECT * FROM precot.QC_PHMETER_CALIBRATION_REPORTF006_HISTORY WHERE WHERE "
			+ "DATE = :date "
			+ "AND (:eqIdNo IS NULL OR EQ_ID_NO = :eqIdNo) ", nativeQuery = true)
	List<QcPhMeterCalibrationReportF006History> findFormByDate(@Param("date") String date,@Param("eqIdNo") String eqIdNo);



}
