package com.focusr.Precot.mssql.database.repository.ppc;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.PPC.MonthlyPlanExcel;

public interface MonthlyPlanExcelRepo extends JpaRepository<MonthlyPlanExcel, Long> {

//	@Query(value = "SELECT * FROM precot.PPC_MONTHLY_PLAN_EXCEL WHERE DATE = :date", nativeQuery = true)
//	Optional<MonthlyPlanExcel> findByDate(@Param("date") String date);

	@Query(value = "SELECT *  FROM precot.PPC_MONTHLY_PLAN_EXCEL WHERE MONTHYEAR = :monthYear", nativeQuery = true)
	List<MonthlyPlanExcel> findAllByDate(@Param("monthYear") String monthYear);

	@Query(value = "SELECT ID as id, DETAILS as value FROM precot.PPC_MONTHLY_PLAN_EXCEL WHERE MONTHYEAR = :monthYear", nativeQuery = true)
	List<Object[]> findIdAndDetailsByDate(@Param("monthYear") String monthYear);

	@Modifying
	@Query(value = "DELETE FROM precot.PPC_MONTHLY_PLAN_EXCEL WHERE ID = :id", nativeQuery = true)
	void deleteById(@Param("id") Long id);

}
