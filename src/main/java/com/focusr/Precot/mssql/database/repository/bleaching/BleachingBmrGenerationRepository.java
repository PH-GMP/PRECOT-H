package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrGeneration;

@Repository
public interface BleachingBmrGenerationRepository extends JpaRepository<BleachBmrGeneration, Long>{

//	@Query(value = "SELECT * FROM precot.BLEACHING_BMR_GENERATION_D01 ORDER BY ID DESC", nativeQuery = true)
//	BleachBmrGeneration findLastBMR();
	
	@Query(value = "SELECT TOP 1 * FROM precot.BLEACHING_BMR_GENERATION_D01 ORDER BY ID DESC", nativeQuery = true)
	BleachBmrGeneration findLastBMR();
	
	@Query(value = "SELECT * FROM precot.BLEACHING_BMR_GENERATION_D01 WHERE DEPARTMENT_ID=:department_id AND STATUS IN ('CREATED') ORDER BY ID DESC", nativeQuery = true)
	List<BleachBmrGeneration> listOfBmrByDeptId(@Param("department_id") Long department_id);
	
	@Query(value = "SELECT * FROM precot.BLEACHING_BMR_GENERATION_D01 WHERE BLEACH_BMR_NO=:bmrNo", nativeQuery = true)
	BleachBmrGeneration getBMR(@Param("bmrNo") String bmrNo);
	
	@Query(value = "SELECT * FROM precot.BLEACHING_BMR_GENERATION_D01 WHERE STATUS IN ('CLOSED', 'COMPLETED') ORDER BY ID DESC", nativeQuery = true)
	List<BleachBmrGeneration> listOfClosedBmrByDeptId();
	
	
	@Query(value = "SELECT * FROM precot.BLEACHING_BMR_GENERATION_D01 WHERE BLEACH_BMR_NO=:bmrNo", nativeQuery = true)
	List<BleachBmrGeneration> getBMRDetails(@Param("bmrNo") String bmrNo);
	
}

