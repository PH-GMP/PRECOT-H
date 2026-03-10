package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR14RP15ProductRelease;

public interface BMR14RP15ProductReleaseRepository extends JpaRepository<BMR14RP15ProductRelease, Long> {
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR14RP15ProductRelease> getSummaryByOrderNo14(@Param("order_no") String order_no);
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<BMR14RP15ProductRelease> getSummaryByOrderNoRpb15(@Param("order_no") String order_no);

	
	// DASHBOARD
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE \r\n"
			+ "WHERE BATCH_NO =:batchNo and ORDER_NO =:orderNo AND NULLIF(LTRIM(RTRIM(APR_QA_SIGN)), '') IS NOT NULL", nativeQuery = true)
	BMR14RP15ProductRelease getStatus(@Param("batchNo") String batchNo, @Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE " +
            "WHERE NULLIF(LTRIM(RTRIM(APR_QA_SIGN)), '') IS NOT NULL " +
            "AND BATCH_NO IN (:batchNos) " +
            "AND ORDER_NO IN (:orderNos) AND FORM_NO = 'PRD02/F-26'",nativeQuery = true)
	List<BMR14RP15ProductRelease> findAllApprovedByBatchNoAndOrderNo(@Param("batchNos") List<String> batchNos,
			@Param("orderNos") List<String> orderNos);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE " +
            "WHERE NULLIF(LTRIM(RTRIM(APR_QA_SIGN)), '') IS NOT NULL " +
            "AND BATCH_NO IN (:batchNos) " +
            "AND ORDER_NO IN (:orderNos) AND FORM_NO = 'PRD02/F-27'",nativeQuery = true)
	List<BMR14RP15ProductRelease> findAllApprovedByBatchNoAndOrderNo2(@Param("batchNos") List<String> batchNos,
			@Param("orderNos") List<String> orderNos);
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE " +
            "WHERE NULLIF(LTRIM(RTRIM(APR_QA_SIGN)), '') IS NOT NULL AND FORM_NO = 'PRD02/F-26' " +
            "AND BATCH_NO IN (:bmrNos)", nativeQuery = true)
	   List<String> getApprovedProductBmrNosForSpunlace(@Param("bmrNos") List<String> bmrNos);
	
	   @Query(value = "SELECT DISTINCT BATCH_NO FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE " +
            "WHERE NULLIF(LTRIM(RTRIM(APR_QA_SIGN)), '') IS NOT NULL AND FORM_NO = 'PRD02/F-27' " +
            "AND BATCH_NO IN (:bmrNos)", nativeQuery = true)
	   List<String> getApprovedProductBmrNosForSpunlaceRpBale(@Param("bmrNos") List<String> bmrNos);
	   
	   // TEST
	   
		@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE " +
	            "WHERE NULLIF(LTRIM(RTRIM(APR_QA_SIGN)), '') IS NOT NULL " +
	            "AND BATCH_NO = :bmrNo AND FORM_NO = 'PRD02/F-26'",nativeQuery = true)
		BMR14RP15ProductRelease findAllApprovedByBatchNoAndOrderNoTest(@Param("bmrNo") String bmrNo);
		
		@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.SPUNLACE_BMR_14_RP_15_PRODUCT_RELEASE " +
	            "WHERE NULLIF(LTRIM(RTRIM(APR_QA_SIGN)), '') IS NOT NULL AND FORM_NO = 'PRD02/F-26'", nativeQuery = true)
		List<String> getAllApprovedProductBmrNosForSpunlaceForm1Test();

}
