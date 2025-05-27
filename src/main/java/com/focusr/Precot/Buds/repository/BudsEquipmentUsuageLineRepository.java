package com.focusr.Precot.Buds.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.Buds.model.BudsEquipmentUsuageLine;

@Repository
public interface BudsEquipmentUsuageLineRepository extends JpaRepository<BudsEquipmentUsuageLine, Long>{

	@Query(value = "SELECT * FROM precot.BUDS_EQUIPMENT_USUAGE_LINE WHERE ID=:id", nativeQuery = true)
	BudsEquipmentUsuageLine equipmentUsuageLineById(@Param("id") Long id);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM precot.BUDS_EQUIPMENT_USUAGE_LINE WHERE ID = :id", nativeQuery = true)
	void deleteEquipmentLineById(@Param("id") Long id);
	
}
