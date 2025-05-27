package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR03GoodsPackingMeterialIssue;

public interface BMR03GoodsPackingMeterialIssueRepository extends JpaRepository<BMR03GoodsPackingMeterialIssue, Long> {
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_03_PACKING_METERIAL_ISSUE WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<BMR03GoodsPackingMeterialIssue> getDetails(@Param("batch_no") String batch_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_03_PACKING_METERIAL_ISSUE WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR03GoodsPackingMeterialIssue> getDetails07(@Param("batch_no") String batch_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_03_PACKING_METERIAL_ISSUE WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
	List<BMR03GoodsPackingMeterialIssue> getDetails08(@Param("batch_no") String batch_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_03_PACKING_METERIAL_ISSUE WHERE BATCH_NO=:batch_no AND FORM_NO ='PRD03/F-25'", nativeQuery = true)
	List<BMR03GoodsPackingMeterialIssue> getDetails25(@Param("batch_no") String batch_no);
	
	
//	@Query(value = "SELECT ZDATE AS DATE, " +
//            "AUFNR AS orderNo, " +
//            "CHARG AS batchNo, " +
//            "MATNR AS Material, " +
//            "MENGE AS quantity, " +
//            "MEINS AS unit " +
//            "FROM tblmap " +
//            "WHERE AUFNR = :batch_no " +
//            "AND ZDATE BETWEEN :fromDate AND :toDate", 
//  nativeQuery = true)List<Map<String, Object>> getpackingmeterialpde(
// @Param("batch_no") String batch_no, 
// @Param("fromDate") String fromDate, 
// @Param("toDate") String toDate);
	
	@Query(value = "SELECT ZDATE AS DATE, " +
            "AUFNR AS orderNo, " +
            "CHARG AS batchNo, " +
            "MATNR AS Material, " +
            "MENGE AS quantity, " +
            "MEINS AS unit " +
            "FROM tblmap " +
            "WHERE AUFNR = :batch_no " +
            "AND CONVERT(DATE, ZDATE, 104) BETWEEN CONVERT(DATE, :fromDate, 104) AND CONVERT(DATE, :toDate, 104)", 
nativeQuery = true)
List<Map<String, Object>> getpackingmeterialpde(
@Param("batch_no") String batch_no, 
@Param("fromDate") String fromDate, 
@Param("toDate") String toDate);
	
	
			// TRACEABILITY
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_03_PACKING_METERIAL_ISSUE WHERE BATCH_NO=:batch_no AND FORM_NO =:formNo", nativeQuery = true)
	List<BMR03GoodsPackingMeterialIssue> getDetailsTrace(@Param("batch_no") String batch_no,@Param("formNo") String formNo);
	

	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_03_PACKING_METERIAL_ISSUE WHERE BATCH_NO = :batchNumber", nativeQuery = true)
	List<BMR03GoodsPackingMeterialIssue> getPackingMaterialDetails(@Param("batchNumber") String batchNumber);

}
