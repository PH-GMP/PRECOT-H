package com.focusr.Precot.mssql.database.repository.bleaching;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.bleaching.BMRProcessDeviationRecord;

@Repository
public interface BMRProcessDeviationRecordRepository extends JpaRepository<BMRProcessDeviationRecord, Long> {
	
	@Query(value = "SELECT * FROM precot.PROCESS_DEVIATION_RECORD WHERE BMR_NO=:bmr_no", nativeQuery = true)
	List<BMRProcessDeviationRecord> getBYBMR(@Param("bmr_no") String bmr_no);
	
	@Query(value = "SELECT * FROM precot.PROCESS_DEVIATION_RECORD WHERE ID=:id",nativeQuery = true)
	BMRProcessDeviationRecord fetchByDeviationId(@Param("id") Long id);

}
