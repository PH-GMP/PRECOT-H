package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.drygoods.BMR10GoodsProcessDelayEqupment;

public interface BMR10GoodsProcessDelayEqupmentRepository extends JpaRepository<BMR10GoodsProcessDelayEqupment, Long> {
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_10_PROCESS_DELAY_EQUP WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-004'", nativeQuery = true)
	List<BMR10GoodsProcessDelayEqupment> getDetails(@Param("batch_no") String batch_no);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_10_PROCESS_DELAY_EQUP WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-007'", nativeQuery = true)
	List<BMR10GoodsProcessDelayEqupment> getDetailscp(@Param("batch_no") String batch_no);

	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_BMR_10_PROCESS_DELAY_EQUP WHERE BATCH_NO=:batch_no AND FORM_NO ='PH-PRD04/F-008'", nativeQuery = true)
		List<BMR10GoodsProcessDelayEqupment> GetProcessDelayEquipmentWool(@Param("batch_no") String batch_no);
}
