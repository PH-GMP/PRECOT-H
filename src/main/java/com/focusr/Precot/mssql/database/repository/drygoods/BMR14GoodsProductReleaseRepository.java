package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR14GoodsProductRelease;

public interface BMR14GoodsProductReleaseRepository extends JpaRepository<BMR14GoodsProductRelease, Long> {

	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_14_PRODUCT_RELEASE WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<BMR14GoodsProductRelease> getDetails(@Param("batch_no") String batch_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_14_PRODUCT_RELEASE WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR14GoodsProductRelease> getDetailscp(@Param("batch_no") String batch_no);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_14_PRODUCT_RELEASE WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	List<BMR14GoodsProductRelease> GetProductReleaseWool(@Param("batch_no") String batch_no);
	
	// BMR DASHBOARD
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.DRYGOODS_BMR_14_PRODUCT_RELEASE WHERE STATUS = 'QA_APPROVED' AND FORM_NO = 'PH-PRD04/F-004' AND BATCH_NO IN (:bmrNos)", nativeQuery = true)
	List<String> getAllApprovedProductBmrNosForDryGoodsF004(@Param("bmrNos") List<String> bmrNos);	
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.DRYGOODS_BMR_14_PRODUCT_RELEASE WHERE STATUS = 'QA_APPROVED' AND FORM_NO = 'PH-PRD04/F-007'", nativeQuery = true)
	List<String> getAllApprovedProductBmrNosForDryGoodsF007(@Param("pleatBmrNos") List<String> pleatBmrNos);	
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.DRYGOODS_BMR_14_PRODUCT_RELEASE WHERE STATUS = 'QA_APPROVED' AND FORM_NO = 'PH-PRD04/F-008'", nativeQuery = true)
	List<String> getAllApprovedProductBmrNosForDryGoodsF008(@Param("woolrollBmrNos") List<String> woolrollBmrNos);

}
