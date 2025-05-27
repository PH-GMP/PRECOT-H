package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.MomMocKRecallHeader;

public interface MomMocKRecallHeaderRepository  extends JpaRepository<MomMocKRecallHeader, Long>{

	@Query(value = "SELECT * FROM precot.MOM_MOC_RECALL_HEADER WHERE HED_ID = :hed_id", nativeQuery = true)
	MomMocKRecallHeader findFormById(@Param("hed_id") long hed_id);
}
