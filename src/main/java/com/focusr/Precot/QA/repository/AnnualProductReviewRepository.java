package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.AnnualProductReview;
import com.focusr.Precot.QA.model.AnnualProductReviewGraphDTO;
import com.focusr.Precot.QA.model.BatchReleaseNotesHeader;
import com.focusr.Precot.QA.model.ReviewOfCriticalParameterChecksOfLine5;

@Repository
public interface AnnualProductReviewRepository extends JpaRepository<AnnualProductReview, Long>{

	@Query(value = "SELECT * FROM precot.QA_ANNUAL_PRODUCT_REVIEW WHERE DATE =:date", nativeQuery = true)
	AnnualProductReview getdetailsbyParam(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_ANNUAL_PRODUCT_REVIEW WHERE (:year IS NULL OR :year='' OR YEAR = :year)AND(:month IS NULL OR :month='' OR MONTH = :month)AND (:date IS NULL OR :date='' OR DATE = :date)AND QA_MANAGER_OR_MR_STATUS = 'QA_MANAGER_MR_APPROVED'", nativeQuery = true)
	List<AnnualProductReview> printParam(@Param("year") String year, @Param("month") String month,@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_ANNUAL_PRODUCT_REVIEW WHERE QA_DESIGNEE_STATUS = 'QA_DESIGNIEE_SAVED' OR QA_MANAGER_OR_MR_STATUS != 'QA_MANAGER_MR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<AnnualProductReview> designeeSummary();
	
	@Query(value = "SELECT * FROM precot.QA_ANNUAL_PRODUCT_REVIEW WHERE QA_DESIGNEE_STATUS = 'QA_DESIGNIEE_SUBMITTED' AND QA_MANAGER_OR_MR_STATUS != 'QA_MANAGER_MR_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<AnnualProductReview> managerSummary();
	
	@Query(value = "SELECT PRODUCT_CODE AS productCode ,WHITENESS AS whiteness ,SINKING_TIME AS sinkingTime ,ABSORPTION_CAPACITY AS absorptionCapacity ,MOISTURE AS moisture FROM precot.QA_REVIEW_OF_CRITICAL_PARAMETER_CHECKS_OF_LINE_5 WHERE ID =:id", nativeQuery = true)
	List<AnnualProductReviewGraphDTO> getGraph(@Param("id") Long id);


	
}
