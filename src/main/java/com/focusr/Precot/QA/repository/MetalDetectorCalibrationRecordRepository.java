package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.MetalDetectorCalibrationRecord;

@Repository
public interface MetalDetectorCalibrationRecordRepository extends JpaRepository<MetalDetectorCalibrationRecord, Long> {

	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS WHERE METAL_ID=:id", nativeQuery = true)
	MetalDetectorCalibrationRecord findFormById(@Param("id") Long id);

//	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS WHERE QA_INSPECTOR_STATUS != 'QA_INSPECTOR_APPROVED' ORDER BY METAL_ID DESC", nativeQuery = true)
//	List<MetalDetectorCalibrationRecord> operatorSummary();

	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS WHERE QA_INSPECTOR_STATUS != 'QA_INSPECTOR_APPROVED' AND DEPARTMENT =:department ORDER BY METAL_ID DESC", nativeQuery = true)
	List<MetalDetectorCalibrationRecord> operatorSummary(@Param("department") String department);

	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND  QA_INSPECTOR_STATUS != 'QA_INSPECTOR_APPROVED' AND DEPARTMENT =:department ORDER BY METAL_ID DESC", nativeQuery = true)
	List<MetalDetectorCalibrationRecord> supervisorSummary(@Param("department") String department);

	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND QA_INSPECTOR_STATUS != 'QA_INSPECTOR_APPROVED' ORDER BY METAL_ID DESC", nativeQuery = true)
	List<MetalDetectorCalibrationRecord> qaInspectorSummary();

	// PRINT

	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS WHERE "
			+ "(:month IS NULL OR :month = '' OR MONTH = :month) "
			+ "AND (:year IS NULL OR :year = '' OR YEAR = :year) "
			+ "AND (:date IS NULL OR :date = '' OR DATE = :date) "
			+ "AND (:eq_id IS NULL OR :eq_id = '' OR EQ_ID = :eq_id) "
			+ "AND QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED'", nativeQuery = true)
	List<MetalDetectorCalibrationRecord> metalDetectorPrint(@Param("month") String month, @Param("year") String year,
			@Param("date") String date, @Param("eq_id") String eq_id);

	// GET BY ID

	@Query(value = "SELECT * FROM precot.METAL_DETECTOR_CALIBRATION_RECORDS WHERE METAL_ID=:id", nativeQuery = true)
	MetalDetectorCalibrationRecord getById(@Param("id") Long id);

}
