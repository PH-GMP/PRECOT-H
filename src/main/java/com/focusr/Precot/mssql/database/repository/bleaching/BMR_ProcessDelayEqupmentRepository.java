package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BMR_ProcessDelayEqupment;
import com.focusr.Precot.mssql.database.model.bleaching.BMR_ProcessDelayEqupmentLine;

public interface BMR_ProcessDelayEqupmentRepository extends JpaRepository<BMR_ProcessDelayEqupment, Long> {

	@Query(value = "SELECT * FROM precot.BMR_PROCESS_DELAY_EQUP WHERE BMR_NO=:bmr_no", nativeQuery = true)
	List<BMR_ProcessDelayEqupment> getprocessDelayEqupment(@Param("bmr_no") String bmr_no);

}
