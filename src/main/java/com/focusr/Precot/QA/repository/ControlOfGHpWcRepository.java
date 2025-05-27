package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.ControlOfGHpWc;

public interface ControlOfGHpWcRepository extends JpaRepository<ControlOfGHpWc, Long> {

	@Query(value = "SELECT * FROM precot.CONTROL_OF_GHPWC WHERE ID = :id", nativeQuery = true)
	ControlOfGHpWc findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.CONTROL_OF_GHPWC WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' AND DEPARTMENT =:department ORDER BY ID DESC", nativeQuery = true)
	List<ControlOfGHpWc> supervisorSummary(@Param("department") String department);
	
	@Query(value = "SELECT * FROM precot.CONTROL_OF_GHPWC WHERE  HOD_STATUS != 'HOD_APPROVED' AND DEPARTMENT =:department ORDER BY ID DESC", nativeQuery = true)
	List<ControlOfGHpWc> supSummary(@Param("department") String department);

	@Query(value = "SELECT * FROM precot.CONTROL_OF_GHPWC WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<ControlOfGHpWc> QaSummary();
	
	@Query(value = "SELECT * FROM precot.CONTROL_OF_GHPWC WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' AND DEPARTMENT =:department ORDER BY ID DESC", nativeQuery = true)
	List<ControlOfGHpWc> hodSummary(@Param("department") String department);
	
	
	
//	@Query(value = "SELECT * FROM precot.CONTROL_OF_GHPWC WHERE"
//            + "(:month IS NULL OR :month = '' OR MONTH = :month)"
//            + "AND (:year IS NULL OR :year = '' OR YEAR = :year)"
//            + "AND SUPERVISOR_STATUS='SUPERVISOR_APPROVED'", nativeQuery = true)
//   List<ControlOfGHpWc>PrintControlOfGHpWc(@Param("month") String month, @Param("year") String year);
//	
	
	
	@Query(value = "SELECT * FROM precot.CONTROL_OF_GHPWC WHERE" + " (:month IS NULL OR :month = '' OR MONTH = :month)"
			+ " AND (:year IS NULL OR :year = '' OR YEAR = :year)"
			+ " AND (:department IS NULL OR :department = '' OR DEPARTMENT = :department)"
			+ " AND SUPERVISOR_STATUS='SUPERVISOR_APPROVED'", nativeQuery = true)
	List<ControlOfGHpWc> PrintControlOfGHpWc(@Param("month") String month, @Param("year") String year, @Param("department") String department);
	
	 
	 @Query(value = "SELECT * FROM precot.CONTROL_OF_GHPWC WHERE DATE =:date", nativeQuery = true)
	 ControlOfGHpWc findByparam(@Param("date") String date);
	 
		@Query(value = "SELECT * FROM precot.CONTROL_OF_GHPWC WHERE DATE =:date AND DEPARTMENT =:department", nativeQuery = true)
		ControlOfGHpWc findByparam(@Param("date") String date, @Param("department") String department);


}
