package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.MetalDetectorPassReport;

@Repository
public interface MetalDetectorPassReportRepo extends JpaRepository<MetalDetectorPassReport, Long> {

	@Query(value = "SELECT * FROM precot.QA_METAL_DETECTOR_PASS_REPORT WHERE METAL_ID=:id", nativeQuery = true)
	MetalDetectorPassReport findFormById(@Param("id") Long id);

//	@Query(value = "SELECT * FROM precot.QA_METAL_DETECTOR_PASS_REPORT WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' AND  QA_INSPECTOR_STATUS != 'QA_INSPECTOR_APPROVED' AND DEPARTMENT =:department ORDER BY METAL_ID DESC", nativeQuery = true)
//	List<MetalDetectorPassReport> supervisorSummary(@Param("dapartemnt") String department);

//	@Query(value = "SELECT * FROM precot.QA_METAL_DETECTOR_PASS_REPORT WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND QA_INSPECTOR_STATUS != 'QA_INSPECTOR_APPROVED' ORDER BY METAL_ID DESC", nativeQuery = true)
//	List<MetalDetectorPassReport> qaInspectorSummary();

	@Query(value = "SELECT * FROM precot.QA_METAL_DETECTOR_PASS_REPORT WHERE"
			+ "(:date IS NULL OR :date = '' OR DATE = :date)"
			+ "AND QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED'", nativeQuery = true)
	List<MetalDetectorPassReport> metalDetectorPassPrint(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_METAL_DETECTOR_PASS_REPORT WHERE METAL_ID=:id", nativeQuery = true)
	MetalDetectorPassReport getByIdPass(@Param("id") Long id);

	// NEW SUMMARY

//	@Query(value = "SELECT * FROM precot.QA_METAL_DETECTOR_PASS_REPORT WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR  QA_INSPECTOR_STATUS != 'QA_INSPECTOR_APPROVED' AND DEPARTMENT =:department ORDER BY METAL_ID DESC", nativeQuery = true)
//	List<MetalDetectorPassReport> supervisorSummary(@Param("department") String department);

	@Query(value = "SELECT * FROM precot.QA_METAL_DETECTOR_PASS_REPORT WHERE QA_INSPECTOR_STATUS != 'QA_INSPECTOR_APPROVED' AND DEPARTMENT =:department ORDER BY METAL_ID DESC", nativeQuery = true)
	List<MetalDetectorPassReport> supervisorSummary(@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.QA_METAL_DETECTOR_PASS_REPORT WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND QA_INSPECTOR_STATUS != 'QA_INSPECTOR_APPROVED' ORDER BY METAL_ID DESC", nativeQuery = true)
	List<MetalDetectorPassReport> qaInspectorSummary();

}
