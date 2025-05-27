package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BleachContaminationTypesF04;
import com.focusr.Precot.mssql.database.model.bleaching.BleachHandSanitizationABPressF41;

@Repository
public interface BleachContaminationTypesF04Repository extends JpaRepository<BleachContaminationTypesF04, Long>{
	
	
	
	
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_HAND_SANITIZATION_AB_PRESS_F41 WHERE FORMAT_NO =:formatNo", nativeQuery = true)
	List<BleachHandSanitizationABPressF41> findFormatDetailsF41(@Param("formatNo") String formatNo);

}
