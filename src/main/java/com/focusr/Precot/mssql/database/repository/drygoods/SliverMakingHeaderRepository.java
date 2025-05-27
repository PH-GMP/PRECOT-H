package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingHeader;

public interface SliverMakingHeaderRepository extends JpaRepository<SliverMakingHeader, Long> {
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING WHERE SLIVER_ID=:sliver_id AND FORMAT_NO ='PH-PRD04/F-002'", nativeQuery = true)
	SliverMakingHeader getDetails(@Param("sliver_id") Long sliver_id);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING  WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY  SLIVER_ID DESC", nativeQuery = true)
	List<SliverMakingHeader> hodSummary();
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING WHERE MACHINE_NAME=:machine_name AND DATE=:date AND SHIFT =:shift AND ORDER_NO = :order_no", nativeQuery = true)
	List<SliverMakingHeader> getdetailsbyParam(@Param("machine_name") String machine_name, @Param("date") String date,@Param("shift") String shift, @Param("order_no") String order_no);	
	
	
//	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING_02 WHERE " +
//	        "(:MACHINE_NAME IS NULL OR MACHINE_NAME = :machine_name) AND " +
//	        "(:DATE IS NULL OR DATE = :date) AND " +
//	        "(:SHIFT IS NULL OR SHIFT = :shift) AND " +
//	        " HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
//	List<SliverMakingHeader> printParam( @Param("machine_name") String machine_name, @Param("date") String date,@Param("shift") String shift);

	
	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING WHERE " +
            "(:machine_name IS NULL OR :machine_name = '' OR MACHINE_NAME = :machine_name) AND " +
            "(:date IS NULL OR :date = '' OR DATE = :date) AND " +
            "(:shift IS NULL OR :shift = '' OR SHIFT = :shift) AND " +
            "(:order_no IS NULL OR :order_no = '' OR ORDER_NO = :order_no) AND " +
            "HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
   List<SliverMakingHeader> printParam(@Param("machine_name") String machine_name, 
                                 @Param("date") String date, 
                                 @Param("shift") String shift, @Param("order_no") String order_no);
	
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING WHERE OPERATOR_STATUS ='OPERATOR_SAVE' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY SLIVER_ID DESC", nativeQuery = true)
    List<SliverMakingHeader> OperatorSummary();

	
		// TRACEABLITY
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_SLIVER_MAKING WHERE SLIVER_ID=:sliver_id", nativeQuery = true)
	List<SliverMakingHeader> getData(@Param("sliver_id") Long sliver_id);
	

}
