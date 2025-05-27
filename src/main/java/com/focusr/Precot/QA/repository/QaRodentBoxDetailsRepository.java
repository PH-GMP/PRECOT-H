package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.QaRodentBoxDetails;

@Repository
public interface QaRodentBoxDetailsRepository extends JpaRepository<QaRodentBoxDetails, Long>{

	@Query(value = "SELECT * FROM precot.QA_RODENT_BOX_CHECK_LIST_DETAILS WHERE LINE_ID = :line_id ", nativeQuery = true)
	QaRodentBoxDetails findFormById(@Param("line_id") long line_id);
}
