package com.focusr.Precot.mssql.database.repository.splunance;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.ProductChangeOverCheckListSpunlaceF011;


public interface ProductChangeOverCheckListSpunlaceF011Repository
		extends JpaRepository<ProductChangeOverCheckListSpunlaceF011, Long> {

	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011 WHERE LIST_ID = :listId ", nativeQuery = true)
	ProductChangeOverCheckListSpunlaceF011 findFormById(@Param("listId") long listId);

	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO_FROM = :orderNo ", nativeQuery = true)
	ProductChangeOverCheckListSpunlaceF011 findByDateShiftOrderNo(@Param("date") String date,
			@Param("shift") String shift, @Param("orderNo") String orderNo);

	// orderNo_to
	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO_TO = :orderNo AND QA_STATUS = 'QA_APPROVED' ", nativeQuery = true)
	ProductChangeOverCheckListSpunlaceF011 findByDateShiftOrderNoPrintApi(@Param("date") String date,
			@Param("shift") String shift, @Param("orderNo") String orderNo);

//	// orderNo_from
//	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011 WHERE DATE = :date AND SHIFT = :shift AND ORDER_NO_FROM = :orderNo AND HOD_STATUS = 'HOD_APPROVED' ", nativeQuery = true)
//	ProductChangeOverCheckListSpunlaceF011 findByDateShiftOrderNoPrintApi(@Param("date") String date,
//			@Param("shift") String shift, @Param("orderNo") String orderNo);

//	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' ORDER BY LIST_ID DESC", nativeQuery = true)
//	List<ProductChangeOverCheckListSpunlaceF011> supervisorSummary();
//
//	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
//	List<ProductChangeOverCheckListSpunlaceF011> hodSummary();
//
//	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011 WHERE HOD_STATUS = 'HOD_APPROVED' AND QA_STATUS != 'QA_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
//	List<ProductChangeOverCheckListSpunlaceF011> qaSummary();
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' OR QA_STATUS != 'QA_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
	List<ProductChangeOverCheckListSpunlaceF011> supervisorSummary();

	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST__F011 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND QA_STATUS != 'QA_APPROVED' ORDER BY LIST_ID DESC", nativeQuery = true)
	List<ProductChangeOverCheckListSpunlaceF011> hodQASummary();
	

	
}
