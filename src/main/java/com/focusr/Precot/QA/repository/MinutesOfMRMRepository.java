package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.focusr.Precot.QA.model.MinutesOfMRM;

@Repository
public interface MinutesOfMRMRepository extends JpaRepository<MinutesOfMRM, Long>{
	@Query(value = "SELECT * FROM precot.QA_MINUTES_OF_MRM WHERE (:year IS NULL OR :year='' OR YEAR = :year)AND(:month IS NULL OR :month='' OR MONTH = :month)AND MR_OR_QA_MANAGER_STATUS = 'MR_OR QA_MANAGER_SUBMITTED'", nativeQuery = true)
	List<MinutesOfMRM> printParam(@Param("year") String year , @Param("month") String month);

	@Query(value = "SELECT * FROM precot.QA_MINUTES_OF_MRM WHERE YEAR = :year AND MONTH =:month AND HEADINGS =:headings", nativeQuery = true)
	MinutesOfMRM getdetailsbyParam(@Param("year") String year , @Param("month") String month, @Param("headings") String headings);

	@Query(value = "SELECT * FROM precot.QA_MINUTES_OF_MRM WHERE MR_OR_QA_MANAGER_STATUS = 'MR_OR QA_MANAGER_SAVED' ORDER BY ID DESC", nativeQuery = true)
	List<MinutesOfMRM> summary();
}
