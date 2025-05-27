package com.focusr.Precot.mssql.database.repository.bleaching;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BMR_MachineOpeartionParameters;

@Repository
public interface BMR_MachineOpeartionParametersRepository extends JpaRepository<BMR_MachineOpeartionParameters, Long>{

	@Query(value = "SELECT * FROM precot.BMR_MACHINE_OPERATION_PARAMETERS WHERE MACHINE_OPERATION_ID=:machineOperationId", nativeQuery = true)
	BMR_MachineOpeartionParameters getRecordDetails(@Param("machineOperationId") Long machineOperationId);

}
