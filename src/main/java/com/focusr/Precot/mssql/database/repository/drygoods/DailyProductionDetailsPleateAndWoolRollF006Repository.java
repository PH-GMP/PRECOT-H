package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.drygoods.DailyProductionDetailsPleateAndWoolRollF006;

@Repository
public interface DailyProductionDetailsPleateAndWoolRollF006Repository extends JpaRepository<DailyProductionDetailsPleateAndWoolRollF006,Long> {
	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006 WHERE PLEATE_ID = :id", nativeQuery = true)
	DailyProductionDetailsPleateAndWoolRollF006 fetchBaleDetailsbyid(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006 WHERE " +
	        "(:date IS NULL OR :date = '' OR  DATE = :date) AND " +
	        "(:shift IS NULL OR :shift = '' OR SHIFT = :shift) AND " +
	        "(:machine_name IS NULL OR :machine_name = '' OR  PRODUCT_NAME = :machine_name) AND " +
	        "(:order_no IS NULL OR :order_no = '' OR ORDER_NO = :order_no) AND " +
	        " HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<DailyProductionDetailsPleateAndWoolRollF006> printParam( @Param("date") String date, @Param("shift") String shift,@Param("machine_name") String machine_name, @Param("order_no") String order_no);

	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006 WHERE DATE=:date AND SHIFT=:shift AND PRODUCT_NAME =:machine_name AND ORDER_NO = :order_no", nativeQuery = true)
	DailyProductionDetailsPleateAndWoolRollF006 getdetailsbyParam(@Param("date") String date, @Param("shift") String shift,@Param("machine_name") String machine_name, @Param("order_no") String order_no);

	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006  WHERE OPERATOR_STATUS = 'OPERATOR_SAVED' OR HOD_STATUS !='HOD_APPROVED' ORDER BY  PLEATE_ID DESC", nativeQuery = true)
	List<DailyProductionDetailsPleateAndWoolRollF006> operatorSummary();

	@Query(value = "SELECT * FROM precot.DRYGOODS_DAILY_PRODUCTION_PLEATE_AND_WOOL_ROLL_F006  WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY  PLEATE_ID DESC", nativeQuery = true)
	List<DailyProductionDetailsPleateAndWoolRollF006> hodSummary();
}
