package com.focusr.Precot.mssql.database.repository.ppc;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingF003;

@Repository
public interface ContractReviewMeetingRepositoryF003 extends JpaRepository<ContractReviewMeetingF003, Long> {

	@Query(value = "SELECT * FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 WHERE ID=:id", nativeQuery = true)
	ContractReviewMeetingF003 fetchContractReviewMeetingById(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 WHERE DATE = :date AND ASSISTANT_STATUS = 'ASSISANT_APPROVED'", nativeQuery = true)
	List<ContractReviewMeetingF003> getContractReviewMeetingPrint(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 WHERE  DATE=:date AND CUSTOMER_NAME = :customer", nativeQuery = true)
	List<ContractReviewMeetingF003> getContractReviewMeetingByid(@Param("date") String date,
			@Param("customer") String customer);

//	@Query(value = "SELECT * FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 WHERE ASSISTANT_STATUS='ASSISANT_SAVED'  ORDER BY ID DESC", nativeQuery = true)
//	List<ContractReviewMeetingF003> getContractReviewMeeting();

	@Query(value = "SELECT * FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 "
			+ "WHERE MARKET_REPRESENTATIVE_STATUS = 'MARKET_REPRESENTATIVE_APPROVED' "
			+ "AND (ASSISTANT_STATUS != 'ASSISANT_APPROVED' OR ASSISTANT_STATUS IS NULL) "
			+ "ORDER BY ID DESC", nativeQuery = true)
	List<ContractReviewMeetingF003> getContractReviewMeeting();

	@Query(value = "SELECT * FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 WHERE DATE = :date AND ASSISTANT_STATUS = 'ASSISANT_APPROVED'", nativeQuery = true)
	List<ContractReviewMeetingF003> getContractReviewMeetingByDate(@Param("date") String date);

	@Query(value = "SELECT * FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 WHERE YEAR(DATE)=:year AND MONTH(DATE)=:month AND ASSISTANT_STATUS = 'ASSISANT_APPROVED'", nativeQuery = true)
	List<ContractReviewMeetingF003> getContractReviewMeetingByYearAndMonth(@Param("year") String year,
			@Param("month") String month);

	@Query(value = "SELECT * FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 WHERE YEAR(DATE)=:year AND ASSISTANT_STATUS = 'ASSISANT_APPROVED'", nativeQuery = true)
	List<ContractReviewMeetingF003> getContractReviewMeetingByYear(@Param("year") String year);

//    CR
	@Query(value = "SELECT * FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 "
			+ "WHERE ASSISTANT_STATUS != 'ASSISANT_APPROVED' " + "OR ASSISTANT_STATUS IS NULL "
			+ "ORDER BY ID DESC", nativeQuery = true)
	List<ContractReviewMeetingF003> getContractReviewMeetingMarketRepresentative();

	// AMC

	@Query(value = "SELECT * FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003 "
			+ "WHERE (:date IS NULL OR :date = '' OR DATE = :date) "
			+ "AND (:year IS NULL OR :year = '' OR YEAR(DATE) = :year) "
			+ "AND (:month IS NULL OR :month = '' OR MONTH(DATE) = :month) "
			+ "AND (:customer IS NULL OR :customer = '' OR CUSTOMER_NAME = :customer) "
			+ "AND ASSISTANT_STATUS = 'ASSISANT_APPROVED'", nativeQuery = true)
	List<ContractReviewMeetingF003> getContractReviewMeetingFlexible(@Param("year") String year,
			@Param("month") String month, @Param("date") String date, @Param("customer") String customer);

	// AMC

	@Query(value = "SELECT CUSTOMER_NAME from precot.PPC_CONTRACT_REVIEW_MEETING_F003", nativeQuery = true)
	List<String> getCustomerName();
	
	// DASHBOARD
	
	
	// FORM1 
	
	@Query(value = "SELECT SUM(CASE WHEN MARKET_REPRESENTATIVE_STATUS = 'MARKET_REPRESENTATIVE_SAVED' THEN 1 ELSE 0 END) AS marketRepCount,\r\n"
			+ "SUM(CASE WHEN ASSISTANT_STATUS != 'ASSISANT_APPROVED' OR ASSISTANT_STATUS IS NULL THEN 1 ELSE 0 END) AS ppcAssisCount\r\n"
			+ "FROM precot.PPC_CONTRACT_REVIEW_MEETING_F003", nativeQuery = true)
	List<Object[]> getContractReviewMeetingStatusCounts();
	
	
	// FORM 2
	
	@Query(value = "SELECT SUM(CASE WHEN ASSISTANT_STATUS = 'ASSISANT_SAVED'\r\n"
			+ "OR (ASSISTANT_STATUS = 'ASSISANT_APPROVED' AND PPC_INCHARGE_STATUS = 'INCHARGE_REJECTED')THEN 1 ELSE 0 END) AS ppcAssisCount,\r\n"
			+ "SUM(CASE WHEN PPC_INCHARGE_STATUS = 'WAITING_FOR_APPROVAL' THEN 1 ELSE 0 END) AS ppcInchargeCount\r\n"
			+ "FROM precot.PPC_MONTHLY_PLAN_SUMMARY_F002", nativeQuery = true)
	List<Object[]> getMonthlyPlanSummaryStatusCounts();
	
	
	// FORM 3
	
	@Query(value = "SELECT SUM(CASE WHEN ASSISTANT_STATUS = 'ASSISANT_SAVED' THEN 1 ELSE 0 END) AS qaCount\r\n"
			+ "FROM precot.PPC_PRE_PRODUCTIONS_F004", nativeQuery = true)
	List<Object[]> getPreProductionMeetingStatusCounts();


}