package com.focusr.Precot.mssql.database.repository.bleaching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachAppliedContAbCottonTypesF08;

@Repository
public interface BleachAppliedContAbCottonTypesF08Repository extends JpaRepository<BleachAppliedContAbCottonTypesF08, Long>{
	
	
	
	
	
	
//	@Query(value = "SELECT * FROM BLEACH_HAND_SANITIZATION_AB_PRESS_F41 WHERE FORMAT_NO =:formatNo", nativeQuery = true)
//	List<BleachHandSanitizationABPressF41> findFormatDetailsF41(@Param("formatNo") String formatNo);

}
