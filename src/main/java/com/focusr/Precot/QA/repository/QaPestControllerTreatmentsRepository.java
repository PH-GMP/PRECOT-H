package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaPestControllerTreatments;

@Repository
public interface QaPestControllerTreatmentsRepository extends JpaRepository<QaPestControllerTreatments, Long>{

	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER_TREATMENTS WHERE LINE_ID = :line_id ", nativeQuery = true)
	QaPestControllerTreatments findFormById(@Param("line_id") long line_id);
}
