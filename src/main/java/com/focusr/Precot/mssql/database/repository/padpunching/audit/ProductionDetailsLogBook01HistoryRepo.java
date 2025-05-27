package com.focusr.Precot.mssql.database.repository.padpunching.audit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.focusr.Precot.mssql.database.model.padpunching.audit.DailyProdPackingDetailsHistoryF004;
import com.focusr.Precot.mssql.database.model.padpunching.audit.ProductionDetailsLogBookHistory01;
import com.focusr.Precot.mssql.database.model.padpunching.audit.PunchingProductChangeOverHistoryF03;

@Repository
public interface ProductionDetailsLogBook01HistoryRepo extends JpaRepository<ProductionDetailsLogBookHistory01, Long> {
	
	
	@Query(value = "SELECT MAX(VERSION) FROM precot.PRODUCTION_DETAILS_LOG_BOOK_F01_HISTORY WHERE DATE=:date AND SHIFT=:shift", nativeQuery = true)
	Optional<Integer> getMaximumVersion(@Param("date") String date, @Param("shift") String shift);

	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAILS_LOG_BOOK_F01_HISTORY WHERE DATE =:date AND SHIFT=:shift AND VERSION IN (SELECT MAX(VERSION) FROM precot.PRODUCTION_DETAILS_LOG_BOOK_F01_HISTORY WHERE DATE =:date AND SHIFT=:shift )", nativeQuery = true)
	ProductionDetailsLogBookHistory01 findLastSubmittedRecord(@Param("date") String date,@Param("shift") String shift);
	
	@Query(value = "SELECT * FROM precot.PRODUCTION_DETAILS_LOG_BOOK_F01_HISTORY WHERE "
			+ "(:from_date IS NULL OR :to_date IS NULL OR DATE BETWEEN :from_date AND :to_date) "
			+ "AND (:f01_shift IS NULL OR SHIFT = :f01_shift) ", nativeQuery = true)
	List<ProductionDetailsLogBookHistory01> findByParams001(@Param("from_date") String from_date,
			@Param("to_date") String to_date,@Param("f01_shift") String f01_shift);

}
