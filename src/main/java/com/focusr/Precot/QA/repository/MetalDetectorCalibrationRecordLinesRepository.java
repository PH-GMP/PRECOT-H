package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.MetalDetectorCalibrationRecordLines;

@Repository
public interface MetalDetectorCalibrationRecordLinesRepository
		extends JpaRepository<MetalDetectorCalibrationRecordLines, Long> {

	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS_LINES WHERE LINE_ID = :line_id ", nativeQuery = true)
	MetalDetectorCalibrationRecordLines findFormById(@Param("line_id") Long line_id);
}
