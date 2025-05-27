package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.FilterBagConsumptionDetailsF004;

public interface FilterBagConsumptionDetailsF004Repository
		extends JpaRepository<FilterBagConsumptionDetailsF004, Long> {

	@Query(value = "SELECT * FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004 WHERE FILTER_ID = :filterId ", nativeQuery = true)
	FilterBagConsumptionDetailsF004 findFormById(@Param("filterId") long filterId);

	@Query(value = "SELECT * FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004 WHERE DATE = :date AND SHIFT = :shift", nativeQuery = true)
	FilterBagConsumptionDetailsF004 findByDateAndShift(@Param("date") String date, @Param("shift") String shift);

//	@Query(value = "SELECT * FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004 WHERE DATE = :date AND SHIFT = :shift AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	FilterBagConsumptionDetailsF004 findByDateAndShiftPrintApi(@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004 WHERE DATE = :date AND HOD_STATUS = 'HOD_APPROVED' AND (:shift IS NULL OR SHIFT = :shift)", nativeQuery = true)
	List<FilterBagConsumptionDetailsF004> findByDateAndShiftPrintApi(@Param("date") String date,
			@Param("shift") String shift);

//	@Query(value = "SELECT * FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' ORDER BY FILTER_ID DESC", nativeQuery = true)
//	List<FilterBagConsumptionDetailsF004> operatorSummary();
//
//	@Query(value = "SELECT * FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND SUPERVISOR_STATUS != 'SUPERVISOR_APPROVED' ORDER BY FILTER_ID DESC", nativeQuery = true)
//	List<FilterBagConsumptionDetailsF004> supervisorSummary();
//
//	@Query(value = "SELECT * FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY FILTER_ID DESC", nativeQuery = true)
//	List<FilterBagConsumptionDetailsF004> hodSummary();
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004 WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY FILTER_ID DESC", nativeQuery = true)
	List<FilterBagConsumptionDetailsF004> operatorSummary();

	@Query(value = "SELECT * FROM precot.SPUNLACE_FILTER_BAG_CONSUMPTION_DETAILS_F004 WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY FILTER_ID DESC", nativeQuery = true)
	List<FilterBagConsumptionDetailsF004> supervisorHodSummary();
}
