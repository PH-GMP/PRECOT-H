package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.BmrIssueRegisterF045;
import com.focusr.Precot.QA.model.ProductDispositionLogBookF049;
import com.focusr.Precot.QA.model.QaContainerInspectionReport;

@Repository
public interface BmrIssueRegisterRepositoryF045 extends JpaRepository<BmrIssueRegisterF045, Long>{
	
	@Query(value = "SELECT * FROM precot.QA_BMR_ISSUE_REGISTER_F045 WHERE BMRISSUE_ID = :bmrIssueId ", nativeQuery = true)
	BmrIssueRegisterF045 findFormById(@Param("bmrIssueId") long bmrIssueId);
	
	@Query(value = "SELECT * FROM precot.QA_BMR_ISSUE_REGISTER_F045 WHERE DATE=:date AND DEPARTMENT=:department", nativeQuery = true)
	List<BmrIssueRegisterF045> getDetailsBaseParam(@Param("date") String date,@Param("department") String department);

	@Query(value = "SELECT * FROM precot.QA_BMR_ISSUE_REGISTER_F045 WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED' OR SUPERVISOR_STATUS != 'PRODUCTION_SUPERVISOR_APPROVED' ORDER BY BMRISSUE_ID DESC", nativeQuery = true)
    List<BmrIssueRegisterF045> qaInspectorSummary();

	@Query(value = "SELECT * FROM precot.QA_BMR_ISSUE_REGISTER_F045 WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND SUPERVISOR_STATUS != 'PRODUCTION_SUPERVISOR_APPROVED' ORDER BY BMRISSUE_ID DESC", nativeQuery = true)
    List<BmrIssueRegisterF045> qaProdSupervisorSummary();
	
	@Query(value = "SELECT * FROM precot.QA_BMR_ISSUE_REGISTER_F045 WHERE MONTH =:month AND YEAR =:year", nativeQuery = true)
	List<BmrIssueRegisterF045> getMonthandYear(@Param("month") String month, @Param("year") String year);
	
//	@Query(value = "SELECT * FROM precot.PADPUNCHING_HOUSE_KEEP_CLEAN_CHECK_LIST_F010 WHERE date IS NULL OR DATE = :date AND (HOD_STATUS = 'HOD_APPROVED')", nativeQuery = true)
//	List<PadPunchingHouseKeepingCheckListF010> printRPProdReport(@Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.QA_BMR_ISSUE_REGISTER_F045 " +
//            "WHERE (:date IS NULL OR :date='' OR DATE=:date) " +     
//            "AND (:month IS NULL OR :month='' OR MONTH=:month) " + 
//            "AND (:year IS NULL OR :year='' OR YEAR=:year) " + 
//            "AND (:department IS NULL OR :department='' OR DEPARTMENT=:department) " + 
//            "AND SUPERVISOR_STATUS = 'PRODUCTION_SUPERVISOR_APPROVED'", nativeQuery = true)
//List<BmrIssueRegisterF045> printBmrIssueRegisterF045(
//     @Param("date") String date,
//     @Param("month") String month, 
//     @Param("year") String year,
//     @Param("department") String department
//);
	
	@Query(value = "SELECT * FROM precot.QA_BMR_ISSUE_REGISTER_F045 " +
            "WHERE (:date IS NULL OR :date = '' OR DATE = :date) " +
            "AND (:month IS NULL OR :month = '' OR MONTH = :month) " +
            "AND (:year IS NULL OR :year = '' OR YEAR = :year) " +
            "AND (:department IS NULL OR :department = '' OR DEPARTMENT = :department) " +
            "AND SUPERVISOR_STATUS = 'PRODUCTION_SUPERVISOR_APPROVED'", nativeQuery = true)
List<BmrIssueRegisterF045> printBmrIssueRegisterF045(
     @Param("date") String date,
     @Param("month") String month, 
     @Param("year") String year,
     @Param("department") String department);

	
	 //Form Number generation
 	 @Query(value = "SELECT TOP 1 * FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 ORDER BY CONTAINER_ID DESC", nativeQuery = true)
 	BmrIssueRegisterF045 fetchLastGeneratedNo();
 	 
 	//APPROVED CIR NO
 	
 	@Query(value = "SELECT CIR_NO FROM PDE.precot.QA_PRODUCT_DISPOSITION_LOGBOOK_F049 WHERE QA_MR_STATUS ='QA_MR_APPROVED'", nativeQuery = true)
 	List<String> approvedCirNo();
}
