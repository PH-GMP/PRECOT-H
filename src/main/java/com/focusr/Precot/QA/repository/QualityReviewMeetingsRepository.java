package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.BmrIssueRegisterF045;
import com.focusr.Precot.QA.model.QaQualityReviewMeetings;

@Repository
public interface QualityReviewMeetingsRepository  extends JpaRepository<QaQualityReviewMeetings, Long>{
	
	@Query(value = "SELECT * FROM precot.QA_QUALITY_REVIEW_MEETINGS_F043 WHERE MEETING_ID = :meetingId ", nativeQuery = true)
	QaQualityReviewMeetings findFormById(@Param("meetingId") long meetingId);
	
	@Query(value = "SELECT * FROM precot.QA_QUALITY_REVIEW_MEETINGS_F043 WHERE DATE=:date", nativeQuery = true)
	List<QaQualityReviewMeetings> getDetailsBaseParam(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.QA_QUALITY_REVIEW_MEETINGS_F043 WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_SAVED' OR QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY MEETING_ID DESC", nativeQuery = true)
    List<QaQualityReviewMeetings> qaInspectorSummary();

	@Query(value = "SELECT * FROM precot.QA_QUALITY_REVIEW_MEETINGS_F043 WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND QA_MR_STATUS != 'QA_MR_APPROVED' ORDER BY MEETING_ID DESC", nativeQuery = true)
    List<QaQualityReviewMeetings> qaManagerMrSummary();
	
	@Query(value = "SELECT * FROM precot.QA_QUALITY_REVIEW_MEETINGS_F043 WHERE MONTH =:month AND YEAR =:year", nativeQuery = true)
	List<QaQualityReviewMeetings> getMonthandYear(@Param("month") String month, @Param("year") String year);
	
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
	
	@Query(value = "SELECT * FROM precot.QA_QUALITY_REVIEW_MEETINGS_F043 " +
            "WHERE (:date IS NULL OR :date = '' OR DATE = :date) " +
            "AND (:month IS NULL OR :month = '' OR MONTH = :month) " +
            "AND (:year IS NULL OR :year = '' OR YEAR = :year) " +
//            "AND (:department IS NULL OR :department = '' OR DEPARTMENT = :department) " +
            "AND QA_MR_STATUS = 'QA_MR_APPROVED'", nativeQuery = true)
List<QaQualityReviewMeetings> printQualityReviewMeeting(
     @Param("date") String date,
     @Param("month") String month, 
     @Param("year") String year);
//     @Param("department") String department);

	
	 //Form Number generation
 	 @Query(value = "SELECT TOP 1 * FROM precot.QA_QUALITY_REVIEW_MEETINGS_F043 ORDER BY CONTAINER_ID DESC", nativeQuery = true)
 	QaQualityReviewMeetings fetchLastGeneratedNo();
 	 
 	//APPROVED CIR NO
 	
 	@Query(value = "SELECT CIR_NO FROM PDE.precot.QA_QUALITY_REVIEW_MEETINGS_F043 WHERE QA_MR_STATUS ='QA_MR_APPROVED'", nativeQuery = true)
 	List<String> approvedCirNo();

}
