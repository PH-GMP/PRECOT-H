package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.audit.ControlOfGHpWcHistory;
import com.focusr.Precot.QA.model.audit.ListOfGHpWcHistory;

public interface ListOfGHpWcHistoryRepository extends JpaRepository<ListOfGHpWcHistory, Long> {

	@Query(value = "SELECT MAX(VERSION) FROM precot.LIST_OF_GHPWC_HISTORY WHERE DATE =:date AND DEPARTMENT =:department", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("department") String department);

//	@Query(value = "SELECT * FROM precot.LIST_OF_GHPWC_HISTORY WHERE DATE =:date AND DEPARTMENT =:department", nativeQuery = true)
//	ListOfGHpWcHistory fetchLastSubmittedRecord(@Param("date") String date, @Param("department") String department);

	@Query(value = "SELECT * FROM precot.LIST_OF_GHPWC_HISTORY WHERE DATE =:date AND DEPARTMENT =:department AND VERSION IN (SELECT MAX(VERSION) FROM precot.LIST_OF_GHPWC_HISTORY WHERE DATE =:date AND DEPARTMENT =:department)", nativeQuery = true)
	ListOfGHpWcHistory fetchLastSubmittedRecord(@Param("date") String date, @Param("department") String department);

	@Query(value = "SELECT * FROM precot.LIST_OF_GHPWC_HISTORY WHERE " + " (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:month IS NULL OR :month='' OR MONTH=:month)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) "
			+ " AND (:department IS NULL OR :department='' OR DEPARTMENT=:department)", nativeQuery = true)
	List<ListOfGHpWcHistory> excelReport(@Param("year") String year, @Param("month") String month,
			@Param("from_date") String from_date, @Param("to_date") String to_date,
			@Param("department") String department);

}
