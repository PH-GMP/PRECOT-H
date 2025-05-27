package com.focusr.Precot.mssql.database.repository.ppc;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.PPC.ContractReviewMeetingExcel;

public interface ContractReviewMeetingExcelRepo extends JpaRepository<ContractReviewMeetingExcel, Long> {

	@Query(value = "SELECT *  FROM precot.PPC_CONTRACT_REVIEW_MEETING_EXCEL  WHERE DATE = :date", nativeQuery = true)
	Optional<ContractReviewMeetingExcel> findByDate(@Param("date") String date);

	@Query(value = "SELECT *  FROM precot.PPC_CONTRACT_REVIEW_MEETING_EXCEL  WHERE DATE = :date AND CUSTOMER_NAME = :customer", nativeQuery = true)
	List<ContractReviewMeetingExcel> findAllByDate(@Param("date") String date, @Param("customer") String customer);

	@Query(value = "SELECT ID as id, DETAILS as value FROM precot.PPC_CONTRACT_REVIEW_MEETING_EXCEL WHERE DATE = :date AND CUSTOMER_NAME = :customer", nativeQuery = true)
	List<Object[]> findIdAndDetailsByDate(@Param("date") String date, @Param("customer") String customer);

	@Modifying
	@Query(value = "DELETE FROM precot.PPC_CONTRACT_REVIEW_MEETING_EXCEL WHERE ID = :id", nativeQuery = true)
	void deleteById(@Param("id") Long id);

}
