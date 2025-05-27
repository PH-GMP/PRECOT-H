package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaPestControllerAreaOfTreatments;
import com.focusr.Precot.QA.model.QaPestControllerTreatments;

@Repository
public interface QaPestControllerAreaOfTreatmentsRepository extends JpaRepository<QaPestControllerAreaOfTreatments, Long>{

	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER_AREA_OF_TREATMENTS WHERE FORMAT_NO =:format_no", nativeQuery = true)
	List<QaPestControllerAreaOfTreatments> findByFormatNo(@Param("format_no") String format_no);

	@Query(value = "SELECT * FROM precot.QA_PEST_CONTROLLER_AREA_OF_TREATMENTS WHERE ID = :id ", nativeQuery = true)
	QaPestControllerAreaOfTreatments findFormById(@Param("id") long id);
}
