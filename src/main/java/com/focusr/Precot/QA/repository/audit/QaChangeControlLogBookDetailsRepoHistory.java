package com.focusr.Precot.QA.repository.audit;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.ChangeControlLogBookDetailsHistory;
import com.focusr.Precot.mssql.database.model.QcAudit.RawCottenAnalysisReportARF001History;

@Repository
public interface QaChangeControlLogBookDetailsRepoHistory extends JpaRepository<ChangeControlLogBookDetailsHistory, Long>{

	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM precot.CHANGE_CONTROLL_LOG_BOOK_DETAILS_HISTORY WHERE DETAILS_ID = :detailsId", nativeQuery = true)
	void deleteByDetailsId(@Param("detailsId") Long detailsId);

	
	@Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END FROM ChangeControlLogBookDetailsHistory c WHERE c.detailsId = :detailsId")
	boolean existsByDetailsId(@Param("detailsId") Long detailsId);
	
	
	
}
