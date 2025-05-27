package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.BudsDailyProductionStoppageLine;
import com.focusr.Precot.mssql.database.model.drygoods.FinishedGoodsTransferRecordLineF011;

@Repository
public interface FinishedGoodsTransferRecordLineF011Repository extends JpaRepository<FinishedGoodsTransferRecordLineF011, Long> {

	// LINE ENTRY DELETE
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_FINISHED_GOODS_TRANSFER_RECORD_LINE_F011 WHERE LINE_GOODS_ID=:id", nativeQuery = true)
	FinishedGoodsTransferRecordLineF011 productionLineById(@Param("id") Long id);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM precot.DRYGOODS_FINISHED_GOODS_TRANSFER_RECORD_LINE_F011 WHERE LINE_GOODS_ID = :id", nativeQuery = true)
	void deleteProductionLineById(@Param("id") Long id);
	
	
	@Query(value = "SELECT DISTINCT FG_NAME FROM precot.DRYGOODS_FINISHED_GOODS_TRANSFER_RECORD_LINE_F011", nativeQuery = true)
	List<String> fetchFinishTransferSignature();
	
}
