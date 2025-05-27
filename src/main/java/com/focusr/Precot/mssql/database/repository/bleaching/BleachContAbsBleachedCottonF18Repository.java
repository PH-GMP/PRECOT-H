package com.focusr.Precot.mssql.database.repository.bleaching;

import java.math.BigInteger;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.focusr.Precot.mssql.database.model.bleaching.BleachContAbsBleachedCottonF18;
import com.focusr.Precot.mssql.database.model.bleaching.BleachContRawCottonF05;


public interface BleachContAbsBleachedCottonF18Repository extends JpaRepository<BleachContAbsBleachedCottonF18,Long>
{
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE ID = :id ", nativeQuery = true)
	BleachContAbsBleachedCottonF18 findFormById(@Param("id") long id);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE FORMAT_NO = :formatNo",nativeQuery = true)
	List<BleachContAbsBleachedCottonF18> getDetailsByFormatNo(@Param("formatNo") String formatNo);
	
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE FORMAT_NO =:format_no", nativeQuery = true)
	List<BleachContAbsBleachedCottonF18> findByListOfF18FormatDetails(@Param("format_no") String formatNo);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE BMR_NO = :bmrNo ", nativeQuery = true)
	List<BleachContAbsBleachedCottonF18> findByBmrList(@Param("bmrNo") String bmrNo);
	
//	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_SAVED'", nativeQuery = true)
//	List<BleachContAbsBleachedCottonF18> findBySupervisorStatusSavedAndNotApproved();
	
//	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' AND SUPERVISOR_SAVED_ID =:supervisor_saved_id", nativeQuery = true)
//	List<BleachContAbsBleachedCottonF18> findBySupervisorStatusSavedAndNotApproved(@Param("supervisor_saved_id") Long supervisor_saved_id);
	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE SUPERVISOR_STATUS ='SUPERVISOR_SAVED' OR HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachContAbsBleachedCottonF18> findBySupervisorStatusSavedAndNotApproved();

	
	@Query(value = "SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE SUPERVISOR_STATUS = 'SUPERVISOR_APPROVED' AND HOD_STATUS != 'HOD_APPROVED' ORDER BY ID DESC", nativeQuery = true)
	List<BleachContAbsBleachedCottonF18> findBySupervisorStatusApprovedAndHodStatusNotApproved();

	@Query(value="SELECT * FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE BMR_NO = :bmrNo AND BATCH_NO = :batchNo AND BALE_NO = :baleNo ORDER BY ID DESC",nativeQuery = true)
	 List<BleachContAbsBleachedCottonF18> findByBmrNoAndBatchNoAndBaleNo(@Param("bmrNo") String bmrNo, @Param("batchNo") Long batchNo, @Param("baleNo") String baleNo);

	//Lov
		@Query(value="SELECT DISTINCT BATCH_NO FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE BMR_NO = :bmrNo",nativeQuery = true)
		 List<BigInteger> bmrBasedBatchNoLov(@Param("bmrNo") String bmrNo);
	 
		@Query(value="SELECT DISTINCT BALE_NO FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE BMR_NO = :bmrNo AND BATCH_NO = :batchNo",nativeQuery = true)
		 List<String> batchBasedBaleNoLov(@Param("bmrNo") String bmrNo,@Param("batchNo") Long batchNo);
		// Bmr Lov
		
				@Query(value="SELECT DISTINCT BMR_NO FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE HOD_STATUS = 'HOD_APPROVED'",nativeQuery = true)
				 List<String> bmrLov();
				
				
				
				@Query(value = "SELECT DISTINCT BMR_NO FROM precot.BLEACH_CONT_ABS_BLEACHED_COTTON_F18 WHERE HOD_STATUS = 'HOD_APPROVED'", nativeQuery = true)
				List<String> findApprovedPH();
		 
}
