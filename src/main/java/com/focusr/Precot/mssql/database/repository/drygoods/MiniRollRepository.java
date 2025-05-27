package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.MiniRoll;
import com.focusr.Precot.mssql.database.model.drygoods.SliverMakingHeader;

public interface MiniRollRepository extends JpaRepository<MiniRoll, Long> {

	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05 WHERE ROLL_ID=:roll_id AND FORMAT_NO ='PH-PRD04/F-005'", nativeQuery = true)
	MiniRoll getDetails(@Param("roll_id") Long roll_id);

	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05  WHERE OPERATOR_STATUS = 'OPERATOR_APPROVED' AND HOD_STATUS !='HOD_APPROVED' ORDER BY  ROLL_ID DESC", nativeQuery = true)
	List<MiniRoll> hodSummary();

	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05 WHERE DATE=:date AND SHIFT =:shift AND ORDER_NO = :order_no", nativeQuery = true)
	MiniRoll getdetailsbyParam(@Param("date") String date, @Param("shift") String shift, @Param("order_no") String order_no);

	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05 WHERE (:date IS NULL OR :date = '' OR DATE =:date) AND (:shift IS NULL OR :shift  = '' OR SHIFT =:shift) AND (:order_no IS NULL OR :order_no = '' OR ORDER_NO = :order_no) AND HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
	List<MiniRoll> printParam(@Param("date") String date, @Param("shift") String shift, @Param("order_no") String order_no);

	
	
	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05 WHERE OPERATOR_STATUS = 'OPERATOR_SAVE' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ROLL_ID DESC", nativeQuery = true)
    List<MiniRoll> supervisorSummary();
	
	
	@Query(value = "SELECT * FROM precot.MINI_ROLL_F05 WHERE ORDER_NO = :orderNo AND DATE BETWEEN :fromDate AND :toDate", nativeQuery = true)
    List<MiniRoll> getDateAndShift(@Param("orderNo") String orderNo, @Param("fromDate") String fromDate, @Param("toDate") String toDate);

}
