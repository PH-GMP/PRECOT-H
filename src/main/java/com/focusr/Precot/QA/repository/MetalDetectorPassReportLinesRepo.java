package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.MetalDetectorPassReportLines;


@Repository
public interface MetalDetectorPassReportLinesRepo extends JpaRepository<MetalDetectorPassReportLines, Long> {

	
	@Query(value = "SELECT * FROM precot.QA_METAL_DETECTOR_PASS_REPORT_LINES WHERE LINE_ID = :line_id ", nativeQuery = true)
	MetalDetectorPassReportLines findFormById(@Param("line_id") Long line_id);
}
