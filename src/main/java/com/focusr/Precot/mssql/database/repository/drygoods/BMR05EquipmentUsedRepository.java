package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR05GoodsEquipmentUsed;

public interface BMR05EquipmentUsedRepository extends JpaRepository<BMR05GoodsEquipmentUsed, Long> {
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_05_EQUP_USED WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<BMR05GoodsEquipmentUsed> getDetails(@Param("batch_no") String batch_no);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_05_EQUP_USED WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR05GoodsEquipmentUsed> getDetailscp(@Param("batch_no") String batch_no);
	
	
	
	//vijay
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_05_EQUP_USED WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
		List<BMR05GoodsEquipmentUsed> getProcessingEquipmentsWool(@Param("batch_no") String batch_no);

}
