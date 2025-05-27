package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.productionretainedsampleregister40history;

@Repository
public interface productionretainedsampleregister40HistoryRepo extends JpaRepository<productionretainedsampleregister40history, Long>{

		@Query(value = "SELECT MAX(VERSION) FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT_HISTORY WHERE SHIFT=:shift AND DATE = :date ", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("shift") String shift , @Param("date") String date);
	
//	@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT_HISTORY WHERE SHIFT=:shift AND DATE = :date    AND VERSION IN (SELECT MAX(VERSION) FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT_HISTORY WHERE SHIFT=:shift AND DATE = :date   )", nativeQuery = true)
//	productionretainedsampleregister40history fetchLastSubmittedRecordPhNumber(@Param("shift") String shift , @Param("date") String date , @Param("product") String product);
		
		@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT_HISTORY " +
	               "WHERE SHIFT = :shift AND DATE = :date  " +
	               "AND VERSION = (SELECT MAX(VERSION) " +
	                             "FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT_HISTORY " +
	                             "WHERE SHIFT = :shift AND DATE = :date )", 
	               nativeQuery = true)
	productionretainedsampleregister40history fetchLastSubmittedRecordPhNumber(@Param("shift") String shift, 
	                                                                            @Param("date") String date
	                                                                            );

		@Query(value = "SELECT * FROM precot.PRODUCTION_RETAINED_SAMPLE_REGISTER_PARENT_HISTORY WHERE "
				+ " (:SHIFT IS NULL OR :SHIFT='' OR SHIFT=:SHIFT)"
				+ " AND (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ", nativeQuery = true)

		List<productionretainedsampleregister40history> audit(String from_date, String to_date,@Param("SHIFT") String SHIFT);


}
