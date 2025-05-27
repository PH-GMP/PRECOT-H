package com.focusr.Precot.QA.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.MasterListOfSharpToolDetails;

public interface QaMaterialOfSharpToolsDetailsRepo extends JpaRepository<MasterListOfSharpToolDetails, Long>{

	
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM precot.MASTER_LIST_OF_SHARP_TOOL_DETAILS WHERE DETAILS_ID = :detailsId", nativeQuery = true)
	void deleteByDetailsId(@Param("detailsId") Long detailsId);


	
//	@Modifying
//    @Transactional
//    @Query("DELETE FROM ChangeControlLogBookDetailsHistory c WHERE c.detailsId = :detailsId")
//    void deleteByDetailsId(@Param("detailsId") Long detailsId);
	
	@Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END FROM MasterListOfSharpToolDetails c WHERE c.detailsId = :detailsId")
	boolean existsByDetailsId(@Param("detailsId") Long detailsId);
}
