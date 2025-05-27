package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.RP02AnnexerInputDetailsProductionDetails;

public interface RP02AnnexerInputDetailsProductionDetailsRepository  extends JpaRepository<RP02AnnexerInputDetailsProductionDetails, Long> {
	
	
	@Query(value = "SELECT * FROM precot.RPB_02_INPUT_DETAILS WHERE BATCH_NO=:batch_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<RP02AnnexerInputDetailsProductionDetails> getSummaryByOrderNo02(@Param("batch_no") String batch_no);


}
