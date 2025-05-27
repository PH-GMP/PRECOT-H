package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrEquipmentDetails;

@Repository
public interface PunchingBmrEquipmentDetailsRepository extends JpaRepository<PunchingBmrEquipmentDetails, Long>{

	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_EQUIPMENT_DETAILS WHERE EQUIPMENT_ID=:id", nativeQuery = true)
	PunchingBmrEquipmentDetails getEquipmentDetailsById(@Param("id") Long id);
	
	@Query(value = "SELECT * FROM precot.PADPUNCHING_BMR_EQUIPMENT_DETAILS WHERE BATCH_NO=:order", nativeQuery = true)
	List<PunchingBmrEquipmentDetails> getEquipmentDetailsByOrder(@Param("order") String order);
	
}
