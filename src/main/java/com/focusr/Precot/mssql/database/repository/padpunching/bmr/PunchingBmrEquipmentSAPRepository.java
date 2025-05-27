package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEquipmentSAP;

@Repository
public interface PunchingBmrEquipmentSAPRepository extends JpaRepository<PunchingBmrEquipmentSAP, Long>{

	@Query(value= "SELECT * FROM precot.PUNCHING_BMR_EQUIPMENT_SAP WHERE EQUIPMENT_NAME = :equipName OR MACHINE_NAME = :equipName", nativeQuery = true)
	List<PunchingBmrEquipmentSAP> fetchEquipmentByEquipCode(@Param("equipName") String equipName);
	
	
	@Query(value= "SELECT * FROM precot.PUNCHING_BMR_EQUIPMENT_SAP WHERE EQUIPMENT_NAME = :equipName", nativeQuery = true)
	PunchingBmrEquipmentSAP fetchEquipmentByEquipmentName(@Param("equipName") String equipName);
	
	@Query(value= "SELECT * FROM precot.PUNCHING_BMR_EQUIPMENT_SAP WHERE MACHINE_NAME = :equipName", nativeQuery = true)
	PunchingBmrEquipmentSAP fetchEquipmentByMachineName(@Param("equipName") String equipName);

	
}
