package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.padpunching.audit.BagMakingSpecificationDetailsHistoryF014;

public interface BagMakingSpecificationDetailsHistoryF014Repository extends JpaRepository<BagMakingSpecificationDetailsHistoryF014, Long>{

	@Query(value = "SELECT MAX(VERSION) FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_HISTORY_F014 WHERE DATE =:date AND SHIFT = :shift AND MACHINE_NAME = :machineName AND PRODUCT_NAME = :productName", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date,@Param("shift") String shift,@Param("machineName") String machineName,@Param("productName") String productName);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_HISTORY_F014 WHERE DATE =:date AND SHIFT = :shift AND MACHINE_NAME = :machineName AND PRODUCT_NAME = :productName AND VERSION IN (SELECT MAX(VERSION) FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_HISTORY_F014 WHERE DATE =:date AND SHIFT = :shift AND MACHINE_NAME = :machineName AND PRODUCT_NAME = :productName)", nativeQuery = true)
	BagMakingSpecificationDetailsHistoryF014 fetchLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift,@Param("machineName") String machineName,@Param("productName") String productName);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_HISTORY_F014 WHERE DATE =:date AND SHIFT = :shift AND MACHINE_NAME = :machineName AND PRODUCT_NAME = :productName", nativeQuery = true)
	List<BagMakingSpecificationDetailsHistoryF014> fetchHistory(@Param("date") String date,@Param("shift") String shift,@Param("machineName") String machineName,@Param("productName") String productName);

	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BAG_MAKING_SPECIFICATION_DETAILS_HISTORY_F014 WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:f14_shift IS NULL OR SHIFT = :f14_shift) "
			+ "AND (:f14_machine_name IS NULL OR MACHINE_NAME = :f14_machine_name)"
			+ "AND (:f14_product_name IS NULL OR PRODUCT_NAME = :f14_product_name)", nativeQuery = true)
	List<BagMakingSpecificationDetailsHistoryF014> findByParams014(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("f14_shift") String f14_shift,@Param("f14_machine_name") String f14_machine_name,@Param("f14_product_name") String f14_product_name);
}
