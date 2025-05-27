package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.MetalDetectorCalibrationRecordHistory;

@Repository
public interface MetalDetectorCalibrationRecordHistoryRepository
		extends JpaRepository<MetalDetectorCalibrationRecordHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS_HISTORY WHERE METAL_ID =:metal_id", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("metal_id") Long metal_id);

	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS_HISTORY WHERE METAL_ID =:metal_id AND VERSION IN (SELECT MAX(VERSION) FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS_HISTORY WHERE METAL_ID =:metal_id )", nativeQuery = true)
	MetalDetectorCalibrationRecordHistory fetchLastSubmittedRecord(@Param("metal_id") Long metal_id);

	// EXCEL

	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS_HISTORY WHERE"
			+ "(:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<MetalDetectorCalibrationRecordHistory> excelReport(@Param("from_date") String from_date,
			@Param("to_date") String to_date);

}
