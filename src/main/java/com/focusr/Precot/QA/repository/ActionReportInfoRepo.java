package com.focusr.Precot.QA.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.ActionReportInfo;
import com.focusr.Precot.QA.model.TrainingSession;

public interface ActionReportInfoRepo extends JpaRepository<ActionReportInfo,Long>{
	@Query(value = "SELECT * FROM precot.QA_ACTION_REPORT_INFO WHERE INFO_ID = :id ", nativeQuery = true)
	ActionReportInfo findActionReportInfoById(@Param("id") long id);
	

}
