package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.DistributionAndDestructionRecordF003;
import com.focusr.Precot.QA.model.RequestAndIssunceOfDocumentF002;

@Repository
public interface DistributionAndDestructionRecordRepositoryF003 extends JpaRepository<DistributionAndDestructionRecordF003, Long>{

	@Query(value = "SELECT * FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_F003 WHERE DISTRUCTION_ID = :distructionId ", nativeQuery = true)
	DistributionAndDestructionRecordF003 findFormById(@Param("distructionId") long distructionId);
	
	@Query(value = "SELECT * FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_F003 WHERE DATE=:date AND MONTH=:month AND YEAR=:year", nativeQuery = true)
	List<DistributionAndDestructionRecordF003> getDetailsBaseParam(@Param("date") String date,@Param("month") String month,@Param("year") String year);

	@Query(value = "SELECT * FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_F003 WHERE QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY DISTRUCTION_ID DESC", nativeQuery = true)
    List<DistributionAndDestructionRecordF003> qaMrDesigneeSummary();

	@Query(value = "SELECT * FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_F003 WHERE QA_HOD_DESIGNEE_STATUS = 'HOD_DESIGNEE_APPROVED' AND QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY DISTRUCTION_ID DESC", nativeQuery = true)
    List<DistributionAndDestructionRecordF003> qaManagerAndMrSummmary();
	
	@Query(value = "SELECT * FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_F003 WHERE MONTH =:month AND YEAR =:year", nativeQuery = true)
	List<DistributionAndDestructionRecordF003> getMonthandYear(@Param("month") String month, @Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_F003 WHERE QA_MR_STATUS = 'QA_MR_APPROVED' ORDER BY DISTRUCTION_ID DESC", nativeQuery = true)
    List<DistributionAndDestructionRecordF003> getAllIfApproveForDistributionAndDistruction();
	
//	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE date IS NULL OR DATE = :date AND (HOD_STATUS = 'HOD_APPROVED')", nativeQuery = true)
//	List<PadPunchingHouseKeepingCheckListF010> printRPProdReport(@Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.QA_REQUEST_AND_ISSUNCE_OF_DOCUMENT_F002 " +
//            "WHERE (:date IS NULL OR :date='' OR DATE=:date) " +           
//            "AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
//List<RequestAndIssunceOfDocumentF002> printContainerInspectionReport(
//     @Param("date") String date,
//     @Param("month") String month,
//     @Param("year") String year
//    
//);
	
	@Query(value = "SELECT * FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_F003 " +
            "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +           
            "AND (:month IS NULL OR :month='' OR MONTH = :month) " +
            "AND (:year IS NULL OR :year='' OR YEAR= :year) " +
            "AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
List<DistributionAndDestructionRecordF003> printContainerInspectionReport(
     @Param("date") String date,
     @Param("month") String month,
     @Param("year") String year);
}
