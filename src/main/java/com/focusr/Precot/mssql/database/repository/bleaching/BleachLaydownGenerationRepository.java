package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrGeneration;
import com.focusr.Precot.mssql.database.model.bleaching.BleachLaydownGeneration;

@Repository
public interface BleachLaydownGenerationRepository extends JpaRepository<BleachLaydownGeneration, Long>{

	@Query(value = "SELECT  TOP 1 * FROM precot.BLEACH_LAYDOWN_GENERATION_D01 ORDER BY ID DESC", nativeQuery = true)
	BleachLaydownGeneration findLastLaydown();
	
	@Query(value = "SELECT * FROM precot.BLEACH_LAYDOWN_GENERATION_D01 WHERE DEPARTMENT_ID=:department_id AND STATUS IN ('CREATED') ORDER BY ID DESC", nativeQuery = true)
	List<BleachLaydownGeneration> listOfLaydownByDeptId(@Param("department_id") Long department_id);
	
	@Query(value = " SELECT BLEACH_LAYDOWN_NUMBER FROM precot.BLEACH_LAYDOWN_GENERATION_D01 WHERE STATUS ='OPEN' ORDER BY ID DESC", nativeQuery = true)
	List<Map<String, Object>> getMappingLaydown();
	
	@Query(value = "SELECT * FROM precot.BLEACH_LAYDOWN_GENERATION_D01 WHERE BLEACH_LAYDOWN_NUMBER=:laydownNo", nativeQuery = true)
	BleachLaydownGeneration getLaydown(@Param("laydownNo") String laydownNo);
}
