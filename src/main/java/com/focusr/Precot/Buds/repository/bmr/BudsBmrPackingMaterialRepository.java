package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrPackingMaterialHeader;
import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;

@Repository
public interface BudsBmrPackingMaterialRepository extends JpaRepository<BudsBmrPackingMaterialHeader, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_BMR_PACKING_METERIAL_ISSUE WHERE BATCH_NO=:batch_no", nativeQuery = true)
	List<BudsBmrPackingMaterialHeader> getDetails25(@Param("batch_no") String batch_no);
	
	
	@Query(value = "SELECT ZDATE AS DATE, " + "AUFNR AS orderNo, " + "CHARG AS batchNo, " + "MATNR AS Material, "
			+ "MENGE AS quantity, " + "MEINS AS unit " + "FROM tblmap " + "WHERE AUFNR = :batch_no "
			+ "AND CONVERT(DATE, ZDATE, 104) BETWEEN CONVERT(DATE, :fromDate, 104) AND CONVERT(DATE, :toDate, 104)", nativeQuery = true)
	List<Map<String, Object>> getpackingmeterialpde(@Param("batch_no") String batch_no,
			@Param("fromDate") String fromDate, @Param("toDate") String toDate);
	
}
