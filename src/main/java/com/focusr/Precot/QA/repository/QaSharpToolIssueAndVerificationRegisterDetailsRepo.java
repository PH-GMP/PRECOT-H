package com.focusr.Precot.QA.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.SharpToolIssueAndVerificationRegisterDetails;

public interface QaSharpToolIssueAndVerificationRegisterDetailsRepo extends JpaRepository<SharpToolIssueAndVerificationRegisterDetails, Long>{

	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM precot.SHARP_TOOLS_ISSUE_AND_VERIFICATION_REGISTER_DETAILS WHERE DETAILS_ID = :detailsId", nativeQuery = true)
	void deleteByDetailsId(@Param("detailsId") Long detailsId);


	
//	@Modifying
//    @Transactional
//    @Query("DELETE FROM ChangeControlLogBookDetailsHistory c WHERE c.detailsId = :detailsId")
//    void deleteByDetailsId(@Param("detailsId") Long detailsId);
	
	@Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END FROM SharpToolIssueAndVerificationRegisterDetails c WHERE c.detailsId = :detailsId")
	boolean existsByDetailsId(@Param("detailsId") Long detailsId);
}
