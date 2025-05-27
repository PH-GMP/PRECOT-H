package com.focusr.Precot.QA.repository.audit;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.productionretainedsampleregisterHistorychild2;

@Repository
public interface productionretainedsampleregister40childBHistoryRepo extends JpaRepository<productionretainedsampleregisterHistorychild2, Long>{

//	@Query(value = "SELECT MAX(VERSION) FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT_CHILD_B_HISTORY WHERE SHIFT=:shift AND DATE = :date   AND PRODUCT = :product", nativeQuery = true)
//	Optional<Integer> getMaximumVersion(@Param("shift") String shift , @Param("date") String date , @Param("product") String product);
	
	@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT_CHILD_B_HISTORY WHERE SHIFT=:shift AND DATE = :date   AND PRODUCT = :product AND TEST_ID = :test_id", nativeQuery = true)
	productionretainedsampleregisterHistorychild2 fetchLastSubmittedRecordPhNumber(@Param("shift") String shift , @Param("date") String date , @Param("product") String product,@Param("test_id") Long test_id);
}
