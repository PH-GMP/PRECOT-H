package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.MomMockRecallLines;

public interface MomMockRecallLinesRepository  extends JpaRepository<MomMockRecallLines, Long>{

	@Query(value = "SELECT * FROM precot.MOM_MOC_RECALL_TBL_LINES WHERE LIN_ID = :lin_id", nativeQuery = true)
	MomMockRecallLines findFormById(@Param("lin_id") long lin_id);
}
