package com.focusr.Precot.Buds.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.audit.BudsProductChangeOverHistory;

@Repository
public interface BudsProductChangeOverRepositoryHistory extends JpaRepository<BudsProductChangeOverHistory, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.BUDS_BMR_PRODUCT_CHANGE_OVER_HISTORY WHERE ORDER_NO_1=:orderNumber", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("orderNumber") String orderNumber);
	
	@Query(value = "SELECT * FROM precot.BUDS_BMR_PRODUCT_CHANGE_OVER_HISTORY WHERE ORDER_NO_1=:orderNumber  AND VERSION IN (SELECT MAX(VERSION) FROM precot.BUDS_BMR_PRODUCT_CHANGE_OVER_HISTORY WHERE ORDER_NO_1=:orderNumber)", nativeQuery = true)
	BudsProductChangeOverHistory findLastSubmittedRecord(@Param("orderNumber") String orderNumber);
	
	@Query(value = "SELECT * FROM precot.BUDS_BMR_PRODUCT_CHANGE_OVER_HISTORY WHERE "
	        + "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:f09_machineName IS NULL OR MACHINE_NAME = :f09_machineName) "
	        + "AND (:f09_orderNo1 IS NULL OR ORDER_NO_1 = :f09_orderNo1)", nativeQuery = true)
	List<BudsProductChangeOverHistory> findByParams01(@Param("from_date") String from_date,
	        @Param("to_date") String to_date,  @Param("f09_machineName") String f09_machineName,
	        @Param("f09_orderNo1") String f09_orderNo1);
	
	
		// PRODUCT CHANGE OVER EXCEL
	
	@Query(value = "SELECT * FROM precot.BUDS_BMR_PRODUCT_CHANGE_OVER_HISTORY WHERE "
	        + "(:from_date IS NULL OR :from_date = '' OR :to_date IS NULL OR :to_date = '' OR DATE BETWEEN :from_date AND :to_date) "
	        + "AND (:orderNumber IS NULL OR :orderNumber ='' OR ORDER_NO_1 = :orderNumber)", nativeQuery = true)
	List<BudsProductChangeOverHistory> productChangeOverExcel(@Param("from_date") String fromdate,
			@Param("to_date") String todate, @Param("orderNumber") String orderNumber);
	
	
}
