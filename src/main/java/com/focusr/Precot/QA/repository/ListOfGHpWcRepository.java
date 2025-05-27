package com.focusr.Precot.QA.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.QA.model.ListOfGHpWc;

public interface ListOfGHpWcRepository extends JpaRepository<ListOfGHpWc, Long> {

	@Query(value = "SELECT * FROM precot.LIST_OF_GHPWC WHERE ID = :id", nativeQuery = true)
	ListOfGHpWc findFormById(@Param("id") long id);

	@Query(value = "SELECT * FROM precot.LIST_OF_GHPWC WHERE  MANAGER_STATUS != 'MANAGER_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<ListOfGHpWc> qaInspectorSummary();

	@Query(value = "SELECT * FROM precot.LIST_OF_GHPWC WHERE QA_INSPECTOR_STATUS = 'QA_INSPECTOR_APPROVED' AND MANAGER_STATUS != 'MANAGER_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<ListOfGHpWc> QaSummary();
	
	
	@Query(value = "SELECT * FROM precot.LIST_OF_GHPWC WHERE"
            + "(:month IS NULL OR :month = '' OR MONTH = :month)"
            + "AND (:year IS NULL OR :year = '' OR YEAR = :year)"
            + "AND (:date IS NULL OR :date = '' OR DATE = :date)"
            + "AND (:department IS NULL OR :department = '' OR DEPARTMENT = :department)"
            + "AND MANAGER_STATUS='MANAGER_APPROVED'", nativeQuery = true)
   List<ListOfGHpWc>Print(@Param("date") String date, @Param("month") String month, @Param("year") String year,@Param("department") String department);
	
	
	
	 @Query(value = "SELECT * FROM precot.LIST_OF_GHPWC WHERE DEPARTMENT =:department AND DATE =:date", nativeQuery = true)
	 ListOfGHpWc findByparam(@Param("date") String date,@Param("department") String department);
	


}
