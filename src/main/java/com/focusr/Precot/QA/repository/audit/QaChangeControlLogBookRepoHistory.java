package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.AgendaForManagementReviewMeetingHistory;
import com.focusr.Precot.QA.model.audit.ChangeControlLogBookDetailsHistory;
import com.focusr.Precot.QA.model.audit.QaChangeControlLogBookF042History;

@Repository
public interface QaChangeControlLogBookRepoHistory extends JpaRepository<QaChangeControlLogBookF042History, Long> {
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042_HISTORY WHERE CHANGE_CONTROL_NO =:changeControlNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("changeControlNo") String changeControlNo);
	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042_HISTORY WHERE CHANGE_CONTROL_NO=:changeControlNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042_HISTORY WHERE CHANGE_CONTROL_NO=:changeControlNo)", nativeQuery = true)
	QaChangeControlLogBookF042History fetchLastSubmittedRecordChangeControlNo(@Param("changeControlNo") String changeControlNo);

	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR ACTUAL_CLOSURE_DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:changeControlNo IS NULL OR CHANGE_CONTROL_NO = :changeControlNo)", nativeQuery = true)
	List<QaChangeControlLogBookF042History> findByParamsF042(
			@Param("from_date") String from_date,
			@Param("to_date") String to_date,
			@Param("changeControlNo") String changeControlNo);

	
	@Query(value = "SELECT * FROM precot.QA_CHANGE_CONTROL_LOG_BOOK_F042_HISTORY WHERE "
			+ "ACTUAL_CLOSURE_DATE = :date "
			+ "AND (:changeControllNo IS NULL OR CHANGE_CONTROL_NO = :changeControllNo)", nativeQuery = true)
	List<QaChangeControlLogBookF042History> findFormByDate(@Param("date") String date, @Param("changeControllNo") String changeControllNo);

	
}
