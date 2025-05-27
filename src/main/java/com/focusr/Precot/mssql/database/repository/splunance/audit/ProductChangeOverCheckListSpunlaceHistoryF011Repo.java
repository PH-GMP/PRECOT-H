package com.focusr.Precot.mssql.database.repository.splunance.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.splunance.ProductChangeOverCheckListSpunlaceF011;
import com.focusr.Precot.mssql.database.model.splunance.audit.ProductChangeOverCheckListSpunlaceHistoryF011;

public interface ProductChangeOverCheckListSpunlaceHistoryF011Repo extends JpaRepository<ProductChangeOverCheckListSpunlaceHistoryF011,Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST_HISTORY_F011 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO_FROM=:orderNo", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST_HISTORY_F011 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO_FROM=:orderNo AND VERSION IN (SELECT MAX(VERSION) FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST_HISTORY_F011 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO_FROM=:orderNo)", nativeQuery = true)
	ProductChangeOverCheckListSpunlaceHistoryF011 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	
	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST_HISTORY_F011 WHERE DATE =:date AND SHIFT=:shift AND ORDER_NO_FROM=:orderNo", nativeQuery = true)
	List<ProductChangeOverCheckListSpunlaceHistoryF011> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("orderNo") String orderNo);
	// audit
	@Query(value = "SELECT * FROM precot.SPUNLACE_PRODUCT_CHANGE_OVER_CHECK_LIST_HISTORY_F011 WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f011_shift IS NULL OR SHIFT = :f011_shift) "
	        + "AND (:f011_order_no IS NULL OR ORDER_NO_TO = :f011_order_no)", nativeQuery = true)
	List<ProductChangeOverCheckListSpunlaceHistoryF011> findByParams11(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f011_shift") String f011_shift,
	        @Param("f011_order_no") String f011_order_no);
}
