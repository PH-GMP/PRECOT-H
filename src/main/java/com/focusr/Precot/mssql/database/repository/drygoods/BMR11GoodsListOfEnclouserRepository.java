package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR11GoodsListOfEnclouser;

public interface BMR11GoodsListOfEnclouserRepository extends JpaRepository<BMR11GoodsListOfEnclouser, Long> {
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BNR_11_LIST_OF_ENCLOSURS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<BMR11GoodsListOfEnclouser> getDetails(@Param("batch_no") String batch_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BNR_11_LIST_OF_ENCLOSURS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR11GoodsListOfEnclouser> getDetailscp(@Param("batch_no") String batch_no);
	
	
//	vijay
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BNR_11_LIST_OF_ENCLOSURS WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
		List<BMR11GoodsListOfEnclouser> GetListOfEnclosursWool(@Param("batch_no") String batch_no);

}
