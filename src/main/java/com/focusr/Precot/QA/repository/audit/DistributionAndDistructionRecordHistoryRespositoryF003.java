package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.DistributionAndDestructionRecordHistoryF003;
import com.focusr.Precot.QA.model.audit.RequestAndIssunceOfDocumentHistoryF002;

@Repository
public interface DistributionAndDistructionRecordHistoryRespositoryF003 extends JpaRepository<DistributionAndDestructionRecordHistoryF003, Long>{

	
	@Query(value = "SELECT MAX(VERSION) FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_HISTORY_F003 WHERE DATE =:date AND MONTH =:month AND YEAR =:year", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("month") String month,@Param("year") String year);
		
	@Query(value = "SELECT * FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_HISTORY_F003 WHERE DATE =:date AND MONTH =:month AND YEAR =:year AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_HISTORY_F003 WHERE DATE =:date AND MONTH =:month AND YEAR =:year)", nativeQuery = true)
	DistributionAndDestructionRecordHistoryF003 fetchLastSubmittedRecord(@Param("date") String date,@Param("month") String month,@Param("year") String year);

	
//	@Query(value = "SELECT * FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_HISTORY_F003 WHERE "
//	        + "(:date IS NULL OR DATE = :date) "
//	        + "AND (:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date)", 
//	        nativeQuery = true)
//	List<DistributionAndDestructionRecordHistoryF003> excelReport(
//	        @Param("date") String date,
//	        @Param("from_date") String from_date,
//	        @Param("to_date") String to_date);
	@Query(value = "SELECT * FROM precot.QA_DISTRIBUTION_AND_DESTRUCTION_RECORD_HISTORY_F003 WHERE "
			+ " (:month IS NULL OR :month='' OR MONTH=:month)"
			+" AND (:year IS NULL OR :year='' OR YEAR=:year)"
			+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ",
	        nativeQuery = true)
	List<DistributionAndDestructionRecordHistoryF003> excelReport(
	        @Param("month") String month,
	        @Param("year") String year,
	        @Param("from_date") String from_date,
	        @Param("to_date") String to_date);

}
