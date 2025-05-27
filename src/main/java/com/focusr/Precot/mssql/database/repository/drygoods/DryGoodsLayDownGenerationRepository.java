package com.focusr.Precot.mssql.database.repository.drygoods;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import com.focusr.Precot.mssql.database.model.drygoods.DryGoodsLayDownGeneration;

@Repository
public interface DryGoodsLayDownGenerationRepository extends JpaRepository<DryGoodsLayDownGeneration, Long> {
	@Query(value = "SELECT  TOP 1 * FROM precot.DRYGOODS_LAYDOWN_GENERATION ORDER BY ID DESC", nativeQuery = true)
	DryGoodsLayDownGeneration findLastLaydown();
	
	
	@Query(value = "SELECT DRYGOODS_LAYDOWN_NUMBER FROM precot.DRYGOODS_LAYDOWN_GENERATION WHERE SUBSTRING(DRYGOODS_LAYDOWN_NUMBER, 1, 2) = :year AND SUBSTRING(DRYGOODS_LAYDOWN_NUMBER, 4, 2) = :month ORDER BY DRYGOODS_LAYDOWN_NUMBER DESC", nativeQuery = true)
	String findGeneratingLaydownForMonthYear(@Param("year") int year, @Param("month") int month);
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_LAYDOWN_GENERATION WHERE DEPARTMENT_ID=:department_id AND STATUS !='CLOSED' ORDER BY ID DESC", nativeQuery = true)
	List<DryGoodsLayDownGeneration> listOfLaydownByDeptId(@Param("department_id") Long department_id);
	
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_LAYDOWN_GENERATION WHERE  DEPARTMENT_ID=:department_id AND STATUS IN ('CREATED') ORDER BY ID DESC", nativeQuery = true)
	List<DryGoodsLayDownGeneration> laydownLovForMapping(@Param("department_id") Long department_id);
	

	@Query(value = "SELECT * FROM precot.DRYGOODS_LAYDOWN_GENERATION WHERE DEPARTMENT_ID= 4 AND STATUS IN ('OPEN')", nativeQuery = true)
	List<DryGoodsLayDownGeneration> laydownLovForForms();
	
	
	@Query(value = " SELECT BLEACH_LAYDOWN_NUMBER FROM precot.DRYGOODS_LAYDOWN_GENERATION WHERE STATUS ='OPEN' ORDER BY ID DESC", nativeQuery = true)
	List<Map<String, Object>> getMappingLaydown();
	
	@Query(value = "SELECT * FROM precot.DRYGOODS_LAYDOWN_GENERATION WHERE DRYGOODS_LAYDOWN_NUMBER=:laydownNo", nativeQuery = true)
	DryGoodsLayDownGeneration getLaydown(@Param("laydownNo") String laydownNo);
	
	//PDE
	//BALE LOV
	
//	@Query(value = "SELECT DISTINCT BaleNo FROM tblBalePack tbp WHERE bmr_no IS NOT NULL AND PackYear = YEAR(GETDATE())", nativeQuery = true)
//	List<String>baleNoLov();
	
	@Query(value = "SELECT DISTINCT BaleNo FROM tblBalePack tbp WHERE PackYear = YEAR(GETDATE())", nativeQuery = true)
	List<String>baleNoLov();
	
	// AMC 
	
	@Query(value = "SELECT DISTINCT BaleNo FROM tblBalePack tbp WHERE PackYear IN (YEAR(GETDATE()), YEAR(GETDATE()) - 1)  AND isCons = 'N' AND isScan = 'N' AND isExport = 'N'", nativeQuery = true)
	List<String>baleNoList();
	
}
