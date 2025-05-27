package com.focusr.Precot.QA.repository.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.QA.model.audit.ProductDispositionLogBookHistoryF049;
@Repository
public interface ProductDispositionLogBookHistoryRepository extends JpaRepository<ProductDispositionLogBookHistoryF049, Long>{
		
		@Query(value = "SELECT MAX(VERSION) FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_HISTORY_F039 WHERE DATE =:date", nativeQuery = true)
		Optional<Integer> getMaximumVersion(@Param("date") String date);
			
		@Query(value = "SELECT * FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_HISTORY_F039 WHERE DATE =:date AND VERSION IN (SELECT MAX(VERSION) FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_HISTORY_F039 WHERE DATE =:date )", nativeQuery = true)
		ProductDispositionLogBookHistoryF049 fetchLastSubmittedRecord(@Param("date") String date);

		
		@Query(value = "SELECT * FROM precot.QA_PRODUCT_DISPOSITION_LOGBOOK_HISTORY_F039 WHERE "	             
		        + " (:from_date IS NULL OR :from_date ='' OR :to_date IS NULL OR :to_date='' OR DATE BETWEEN :from_date AND :to_date) ",
		        nativeQuery = true)
		List<ProductDispositionLogBookHistoryF049> excelReport(
		        
		        @Param("from_date") String from_date,
		        @Param("to_date") String to_date);

}
