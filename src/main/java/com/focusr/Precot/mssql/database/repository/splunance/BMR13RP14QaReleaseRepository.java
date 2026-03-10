package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.BMR13RP14QaRelease;

public interface BMR13RP14QaReleaseRepository  extends JpaRepository<BMR13RP14QaRelease, Long>{
	
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-26'", nativeQuery = true)
	List<BMR13RP14QaRelease> getSummaryByOrderNo13(@Param("order_no") String order_no);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE WHERE BATCH_NO=:order_no AND FORM_NO ='PRD02/F-27'", nativeQuery = true)
	List<BMR13RP14QaRelease> getSummaryByOrderNoRPB14(@Param("order_no") String order_no);
	
	
	// DASHBOARD
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE WHERE BATCH_NO =:batchNo AND ORDER_NO =:orderNo AND STATUS ='QA_APPROVED'", nativeQuery = true)
	BMR13RP14QaRelease getQaReleaseStatus(@Param("batchNo") String batchNo, @Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE WHERE STATUS = 'QA_APPROVED' "
			+ "AND BATCH_NO IN (:batchNos) AND ORDER_NO IN (:orderNos) AND FORM_NO = 'PRD02/F-26'", nativeQuery = true)
	List<BMR13RP14QaRelease> findAllApprovedByBatchNoAndOrderNo(@Param("batchNos") List<String> batchNos,
			@Param("orderNos") List<String> orderNos);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE WHERE STATUS = 'QA_APPROVED' "
			+ "AND BATCH_NO IN (:batchNos) AND ORDER_NO IN (:orderNos) AND FORM_NO = 'PRD02/F-27'", nativeQuery = true)
	List<BMR13RP14QaRelease> findAllApprovedByBatchNoAndOrderNo2(@Param("batchNos") List<String> batchNos,
			@Param("orderNos") List<String> orderNos);
	
	// FINAL
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE " +
            "WHERE STATUS = 'QA_APPROVED' AND FORM_NO = 'PRD02/F-26' " +
            "AND BATCH_NO IN (:bmrNos)", nativeQuery = true)
	List<String> getApprovedQaBmrNosForSpunlace(@Param("bmrNos") List<String> bmrNos);
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE " +
            "WHERE STATUS = 'QA_APPROVED' AND FORM_NO = 'PRD02/F-27' " +
            "AND BATCH_NO IN (:bmrNos)", nativeQuery = true)
	List<String> getApprovedQaBmrNosForSpunlaceRpBale(@Param("bmrNos") List<String> bmrNos);
	
	// TEST
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE WHERE STATUS = 'QA_APPROVED' "
			+ "AND BATCH_NO = :bmrNo AND FORM_NO = 'PRD02/F-26'", nativeQuery = true)
	BMR13RP14QaRelease findAllApprovedByBatchNoAndOrderNoTest(@Param("bmrNo") String bmrNo);
	
	@Query(value = "SELECT DISTINCT BATCH_NO FROM precot.SPUNLACE_BMR_13_RP_14_QA_RELEASE " +
            "WHERE STATUS = 'QA_APPROVED' AND FORM_NO = 'PRD02/F-26'", nativeQuery = true)
	List<String> getAllApprovedQaBmrNosForSpunlaceForm1Test();


}
