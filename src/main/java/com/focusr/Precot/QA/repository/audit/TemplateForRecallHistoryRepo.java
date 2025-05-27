package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.TemplateForRecallHistory;

@Repository
public interface TemplateForRecallHistoryRepo extends JpaRepository<TemplateForRecallHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.TEMPLATE_FOR_RECALL_HISTORY WHERE DATE=:formDate ", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("formDate") String formDate);
	
	@Query(value = "SELECT * FROM precot.TEMPLATE_FOR_RECALL_HISTORY WHERE DATE=:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.TEMPLATE_FOR_RECALL_HISTORY WHERE DATE=:date)", nativeQuery = true)
	TemplateForRecallHistory fetchLastSubmittedRecord(@Param("date") String date);
	
	// EXCEL
	
	@Query(value = "SELECT * FROM precot.TEMPLATE_FOR_RECALL_HISTORY WHERE"
			+ "(:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<TemplateForRecallHistory> excelReport(@Param("from_date") String from_date, @Param("to_date") String to_date);

}
