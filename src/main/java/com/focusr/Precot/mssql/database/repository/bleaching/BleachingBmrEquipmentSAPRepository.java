package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachingBmrEquipmentSAP;

@Repository
public interface BleachingBmrEquipmentSAPRepository extends JpaRepository<BleachingBmrEquipmentSAP, Long> {

	@Query(value = "SELECT * FROM precot.BLEACHING_BMR_EQUIPMENT_SAP", nativeQuery = true)
	List<BleachingBmrEquipmentSAP> fetchEquipmentDetails();

}
