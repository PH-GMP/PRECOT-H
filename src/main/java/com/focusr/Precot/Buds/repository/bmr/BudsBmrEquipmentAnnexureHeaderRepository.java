package com.focusr.Precot.Buds.repository.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.bmr.BudsBmrEquipmentAnnexureHeader;

@Repository
public interface BudsBmrEquipmentAnnexureHeaderRepository extends JpaRepository<BudsBmrEquipmentAnnexureHeader, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_BMR_EQUIPMENT_ANNEXURE_HEADER WHERE EQUIPMENT_ID=:id", nativeQuery = true)
	BudsBmrEquipmentAnnexureHeader getEquipmentDetailsById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.BUDS_BMR_EQUIPMENT_ANNEXURE_HEADER WHERE BATCH_NO=:batchNumber", nativeQuery = true)
	List<BudsBmrEquipmentAnnexureHeader> getEquipmentDetailsByOrder(@Param("batchNumber") String batchNumber);
	
}
