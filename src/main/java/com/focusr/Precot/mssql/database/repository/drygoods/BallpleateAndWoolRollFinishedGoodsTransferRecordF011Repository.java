package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.BudsDailyProductionStoppageLine;
import com.focusr.Precot.mssql.database.model.drygoods.BallpleateAndWoolRollFinishedGoodsTransferRecordF011;
@Repository
public interface BallpleateAndWoolRollFinishedGoodsTransferRecordF011Repository extends JpaRepository<BallpleateAndWoolRollFinishedGoodsTransferRecordF011,Long> {
	@Query(value = "SELECT * FROM precot.DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011 WHERE FINISHED_GOODS_ID = :id", nativeQuery = true)
	BallpleateAndWoolRollFinishedGoodsTransferRecordF011 fetchBaleDetailsbyid(@Param("id") Long id);

	@Query(value = "SELECT * FROM precot.DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011 WHERE " +
	        "(:date IS NULL OR DATE = :date) AND " +
	        "(:shift IS NULL OR SHIFT = :shift) AND " +
	        " SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED'", nativeQuery = true)
	List<BallpleateAndWoolRollFinishedGoodsTransferRecordF011> printParam( @Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011 WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	BallpleateAndWoolRollFinishedGoodsTransferRecordF011 getdetailsbyParam(@Param("date") String date, @Param("shift") String shift);


	@Query(value = "SELECT * FROM precot.DRYGOODS_BALLPLEATE_AND_FINISHED_GOODS_TRANSFER_RECORD_F011 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED' ORDER BY  FINISHED_GOODS_ID DESC", nativeQuery = true)
	List<BallpleateAndWoolRollFinishedGoodsTransferRecordF011> supervisorSummary();
	
	
}
