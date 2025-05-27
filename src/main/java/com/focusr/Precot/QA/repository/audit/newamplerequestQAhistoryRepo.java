package com.focusr.Precot.QA.repository.audit;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.newamplerequestQAhistory;


@Repository
public interface newamplerequestQAhistoryRepo extends JpaRepository<newamplerequestQAhistory, Long>{

		@Query(value = "SELECT MAX(VERSION) FROM precot.NEW_SAMPLE_REQUEST_F029_HISTORY WHERE REQUISITION_NO=:requisition_no", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("requisition_no") String requisition_no);
	
	@Query(value = "SELECT * FROM precot.NEW_SAMPLE_REQUEST_F029_HISTORY WHERE REQUISITION_NO=:requisition_no AND VERSION IN (SELECT MAX(VERSION) FROM precot.NEW_SAMPLE_REQUEST_F029_HISTORY WHERE REQUISITION_NO=:requisition_no)", nativeQuery = true)
	newamplerequestQAhistory fetchLastSubmittedRecordPhNumber(@Param("requisition_no") String requisition_no);

}
