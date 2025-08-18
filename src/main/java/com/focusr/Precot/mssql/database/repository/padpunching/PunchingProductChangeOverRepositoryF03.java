package com.focusr.Precot.mssql.database.repository.padpunching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.PunchingProductChangeOverF03;


@Repository
public interface PunchingProductChangeOverRepositoryF03  extends JpaRepository<PunchingProductChangeOverF03, Long>{

	@Query(value = "SELECT * FROM precot.PUNCHING_PROD_CHANGE_OVER_F03 WHERE PRODUCT_ID=:id", nativeQuery = true)
	PunchingProductChangeOverF03 productChangeoverDetailsById(@Param("id") Long id);
	
	
//	@Query(value = "SELECT * FROM precot.PUNCHING_PROD_CHANGE_OVER_F03 WHERE DATE=:date AND SHIFT=:shift AND MACHINE_NAME=:machine", nativeQuery = true)
//	PunchingProductChangeOverF03 productChangeoverDetailsByDateMachineShift(@Param("date") String date, @Param("shift") String shift, @Param("machine") String machine);
	
	@Query(value = "SELECT * FROM precot.PUNCHING_PROD_CHANGE_OVER_F03 WHERE DATE=:date AND SHIFT=:shift AND MACHINE_NAME=:machine AND ORDER_NO_1 = :order1 AND ORDER_NO_2 = :order2", nativeQuery = true)
	PunchingProductChangeOverF03 productChangeoverDetailsByDateMachineShift(@Param("date") String date, @Param("shift") String shift, @Param("machine") String machine, @Param("order1") String order1 , @Param("order2") String order2);

	
	@Query(value = "SELECT * FROM precot.PUNCHING_PROD_CHANGE_OVER_F03 WHERE SUPERVISOR_STATUS='SUPERVISOR_SAVED' OR QA_STATUS != 'QA_APPROVED' ORDER BY PRODUCT_ID DESC", nativeQuery = true)
	List<PunchingProductChangeOverF03> getPunchingSupervisorSummary();
	
//	@Query(value = "SELECT * FROM precot.PUNCHING_PROD_CHANGE_OVER_F03 WHERE QA_STATUS != 'QA_APPROVED' ORDER BY PRODUCT_ID DESC", nativeQuery = true)
//	List<PunchingProductChangeOverF03> getPunchingHodQASummary();
	
	@Query(value = "SELECT * FROM precot.PUNCHING_PROD_CHANGE_OVER_F03 WHERE HOD_STATUS != 'HOD_APPROVED' ORDER BY PRODUCT_ID DESC", nativeQuery = true)
	List<PunchingProductChangeOverF03> getPunchingHodQASummary();
	
//	@Query(value = "SELECT * FROM precot.PUNCHING_PROD_CHANGE_OVER_F03 " +
//            "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +
//            "AND (:shift IS NULL OR :shift='' OR SHIFT = :shift) " +
//            "AND (:machine IS NULL OR :machine='' OR MACHINE_NAME = :machine)"
//            + "AND QA_STATUS='QA_APPROVED'", nativeQuery = true)
//	List<PunchingProductChangeOverF03> productChangeoverDetailsPrint(@Param("date") String date,@Param("shift") String shift, @Param("machine") String machine);


	@Query(value = "SELECT * FROM precot.PUNCHING_PROD_CHANGE_OVER_F03 " +
            "WHERE (:date IS NULL OR :date='' OR DATE = :date) " +
            "AND (:shift IS NULL OR :shift='' OR SHIFT = :shift) " +
            "AND (:machine IS NULL OR :machine='' OR MACHINE_NAME = :machine)" +
            "AND (:order1 IS NULL OR :order1='' OR ORDER_NO_1 = :order1)" +
            "AND (:order2 IS NULL OR :order2='' OR ORDER_NO_2 = :order2)" +
            "AND HOD_STATUS='HOD_APPROVED'", nativeQuery = true)
	List<PunchingProductChangeOverF03> productChangeoverDetailsPrint(@Param("date") String date,@Param("shift") String shift,
			@Param("machine") String machine,@Param("order1") String order1 , @Param("order2") String order2);

}
