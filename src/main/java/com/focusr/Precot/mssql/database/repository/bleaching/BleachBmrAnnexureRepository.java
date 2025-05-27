package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachBmrAnnexureList;

@Repository
public interface BleachBmrAnnexureRepository extends JpaRepository<BleachBmrAnnexureList, Long>{

	@Query(value = "SELECT * FROM precot.BLEACH_BMR_ANNEXURE WHERE BMR_NO=:bmr_no", nativeQuery = true)
	List<BleachBmrAnnexureList> getAnnexureByBmr(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.BLEACH_BMR_ANNEXURE WHERE ID=:id", nativeQuery = true)
	BleachBmrAnnexureList fetchAnnexureById(@Param("id") Long id);
	
	
		// GET DISTINCT VERIFIER FOR LOV 
	
	@Query(value="SELECT DISTINCT VERIFIED_BY FROM precot.BLEACH_BMR_ANNEXURE", nativeQuery = true)
	List<String> annexureVerfier();
	
}
