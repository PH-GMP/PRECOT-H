package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.AnnualProductReview;
import com.focusr.Precot.QA.model.BatchReleaseNotesHeader;
import com.focusr.Precot.QA.model.audit.AnnualProductReviewHistory;
import com.focusr.Precot.QA.model.audit.BatchReleaseNotesHeaderHistory;

@Repository
public interface AnnualProductReviewHistoryRepository extends JpaRepository<AnnualProductReviewHistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_ANNUAL_PRODUCT_REVIEW_HISTORY WHERE DATE=:date", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_ANNUAL_PRODUCT_REVIEW_HISTORY WHERE DATE = :date AND VERSION = (SELECT MAX(VERSION) FROM precot.QA_ANNUAL_PRODUCT_REVIEW_HISTORY WHERE DATE = :date)", nativeQuery = true)
	AnnualProductReviewHistory fetchLastSubmittedRecord(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_ANNUAL_PRODUCT_REVIEW_HISTORY WHERE "
		       + "(:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date)", nativeQuery = true)
		List<AnnualProductReviewHistory> excelReport(@Param("from_date") String from_date,
		       @Param("to_date") String to_date);


}
