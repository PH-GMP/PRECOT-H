package com.focusr.Precot.mssql.database.repository.padpunching.bmr;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.bmr.PunchingBmrStoppageHeader;

@Repository
public interface PunchingBmrStoppageHeadRepository extends JpaRepository<PunchingBmrStoppageHeader, Long>{

	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_STOPPAGE_HEADER WHERE FROM_DATE=:from_date AND TO_DATE=:to_date AND MACHINE_NAME=:machineName", nativeQuery = true)
	List<PunchingBmrStoppageHeader> getStoppageHeader(@Param("from_date") String from_date, @Param("to_date") String to_date, @Param("machineName") String machineName);
	
	
	
	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_STOPPAGE_HEADER WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<PunchingBmrStoppageHeader> getStoppageBatchNo(@Param("batchNo") String batchNo );
	
	@Query(value = "SELECT * FROM precot.PUNCHING_BMR_STOPPAGE_HEADER WHERE BATCH_NO=:batchNo", nativeQuery = true)
	List<PunchingBmrStoppageHeader> fetchStoppageByBatchNo(@Param("batchNo") String batchNo);
	
}
