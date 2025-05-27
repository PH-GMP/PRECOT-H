package com.focusr.Precot.mssql.database.repository.bleaching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BmrManufacturingOperations;

@Repository
public interface BmrManufacturingOperationsRepository extends JpaRepository<BmrManufacturingOperations, Long>{

	@Query(value = "SELECT * FROM precot.BMR_MANUFACTURER_OPERATION WHERE OPERATION_ID=:operationId", nativeQuery = true)
	BmrManufacturingOperations getRecordDetails(@Param("operationId") Long operationId);

	
}
