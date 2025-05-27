package com.focusr.Precot.mssql.database.repository.Qc.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.QcAudit.QcTdsMeterCalibrationReportF008History;
import com.focusr.Precot.mssql.database.model.QcAudit.Qc_BacterialIncubatorTempCalibrationF012History;

public interface BacterialIncubatorTempCalibrationRepoF012History extends JpaRepository<Qc_BacterialIncubatorTempCalibrationF012History, Long> {

	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012HISTORY WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012HISTORY WHERE DATE=:date)", nativeQuery = true)
	Qc_BacterialIncubatorTempCalibrationF012History fetchLastSubmittedRecordByDate(@Param("date") String date);
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012HISTORY WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:eqIdNo IS NULL OR EQ_ID_NO = :eqIdNo) ", nativeQuery = true)
	List<Qc_BacterialIncubatorTempCalibrationF012History> findByParamsF012(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("eqIdNo") String eqIdNo);
	
//	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012HISTORY WHERE DATE = :date ", nativeQuery = true)
//	List<Qc_BacterialIncubatorTempCalibrationF012History> findFormByDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QC_BACTERIAL_INCUBATOR_TEMP_CALIBRATION_F012HISTORY WHERE "
			+ "DATE = :date "
			+ "AND (:eqIdNo IS NULL OR EQ_ID_NO = :eqIdNo) ", nativeQuery = true)
	List<Qc_BacterialIncubatorTempCalibrationF012History> findFormByDate(@Param("date") String date,@Param("eqIdNo") String eqIdNo);


}
