package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.QA.model.audit.ManagementOfIncidenceHistory;

@Repository
public interface ManagementOfIncidenceHistoryRepository extends JpaRepository<ManagementOfIncidenceHistory,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_MANAGEMENT_OF_INCIDENCE_HISTORY WHERE DATE=:date AND MONTH =:month AND YEAR =:year", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("month") String month,@Param("year") String year);

	
	@Query(value = "SELECT * FROM precot.QA_MANAGEMENT_OF_INCIDENCE_HISTORY WHERE DATE=:date AND MONTH =:month AND YEAR =:year AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_MANAGEMENT_OF_INCIDENCE_HISTORY WHERE DATE=:date AND MONTH =:month AND YEAR =:year)", nativeQuery = true)
	ManagementOfIncidenceHistory fetchLastSubmittedRecord(@Param("date") String date,@Param("month") String month,@Param("year") String year);
	
	@Query(value = "SELECT * FROM precot.QA_MANAGEMENT_OF_INCIDENCE_HISTORY WHERE "
			+ " (:month IS NULL OR :month='' OR MONTH=:month)"
			+" AND (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)
	List<ManagementOfIncidenceHistory> excelReport(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("month") String month, @Param("year") String year);
}
